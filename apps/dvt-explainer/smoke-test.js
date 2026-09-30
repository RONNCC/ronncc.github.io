#!/usr/bin/env node
/* Offline regression checks for the DVT explainer.
 *   node apps/dvt-explainer/smoke-test.js
 *
 * Verifies, without a browser:
 *   1. content/data.js is internally consistent (ids, arms, routes, sources)
 *   2. every figure builder still returns markup
 *   3. every generated plate is well-formed, balanced XML
 *   4. ids are unique across all plates and the page shell
 *   5. every element id app.js looks up actually exists somewhere
 *   6. the shared geometry helpers behave (route walking, vein squeeze)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const context = { window: {}, console };
vm.createContext(context);

for (const file of ['data.js', 'figures.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

const Data = context.window.DVTData;
const Fig = context.window.DVTFigures;
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

let failures = 0;
function check(label, fn) {
  try {
    fn();
    console.log('  ok   ' + label);
  } catch (error) {
    failures += 1;
    console.error('  FAIL ' + label + '\n       ' + error.message);
  }
}
function assert(condition, message) {
  if (!condition) throw new Error(message || 'assertion failed');
}

/* ---------- 1. data integrity ---------- */

console.log('\ndata');
check('scale explorer has 4 levels with captions and scale bars', () => {
  assert(Data.scaleLevels.length === 4, 'expected 4 scale levels');
  Data.scaleLevels.forEach((level) => {
    assert(level.chip && level.title && level.caption && level.scaleBar, 'incomplete level: ' + level.id);
  });
});

check('veins have unique ids, a type, and clinical copy', () => {
  const ids = new Set();
  Data.veins.forEach((v) => {
    assert(!ids.has(v.id), 'duplicate vein id ' + v.id);
    ids.add(v.id);
    assert(['proximal', 'axial', 'muscular', 'superficial'].includes(v.type), 'bad type on ' + v.id);
    assert(v.name && v.typeLabel && v.drains && v.why && v.ask, 'incomplete vein ' + v.id);
  });
  assert(Data.veins.some((v) => v.id === 'popliteal'), 'popliteal vein missing');
});

check('symptoms have unique ids and notes', () => {
  const ids = new Set();
  Data.symptoms.forEach((s) => {
    assert(!ids.has(s.id), 'duplicate symptom ' + s.id);
    ids.add(s.id);
    assert(s.label && s.note, 'incomplete symptom ' + s.id);
  });
});

check('risk factors reference real arms of the triad', () => {
  const arms = Data.triad.map((t) => t.id);
  assert(arms.length === 3, 'triad should have three arms');
  Data.riskFactors.forEach((f) => {
    assert(f.label && f.note, 'incomplete risk factor');
    assert(f.arms.length > 0, 'risk factor without a triad arm: ' + f.label);
    f.arms.forEach((a) => assert(arms.includes(a), 'unknown arm ' + a + ' on ' + f.label));
  });
});

check('timeline bars stay inside 0–100%', () => {
  assert(Data.timeline.length >= 4, 'timeline too short');
  Data.timeline.forEach((item) => {
    assert(item.fill >= 0 && item.fill <= 100, 'bad bar fill for ' + item.title);
    assert(item.when && item.span && item.title && item.body, 'incomplete timeline item');
  });
});

check('embolus steps line up with the route segments', () => {
  const order = Fig.routes.embolusOrder;
  assert(Data.embolusSteps.length === order.length, 'step/segment count mismatch');
  Data.embolusSteps.forEach((step, i) => {
    assert(step.title && step.body && step.stat, 'incomplete embolus step ' + i);
    assert(step.anchor === order[i], 'step ' + i + ' anchor ' + step.anchor + ' != ' + order[i]);
    assert(Fig.routes.embolusSegments[order[i]], 'missing segment for ' + order[i]);
  });
});

check('management paths cover the three branches app.js can pick', () => {
  ['treat', 'surveil', 'surveilBleed'].forEach((key) => {
    const p = Data.managementPaths[key];
    assert(p && p.id === key && p.badge && p.title && p.body && p.bullets.length, 'bad path ' + key);
  });
});

check('Wells criteria carry points and hints', () => {
  assert(Data.wells.length === 10, 'expected 10 criteria');
  assert(Data.wells.filter((w) => w.points === -2).length === 1, 'expected exactly one -2 item');
  Data.wells.forEach((w) => assert(w.label && w.hint && typeof w.points === 'number', 'bad criterion ' + w.id));
});

check('sources are https, uniquely identified, and annotated', () => {
  const ids = new Set();
  assert(Data.sources.length >= 8, 'expected a useful source list');
  Data.sources.forEach((s) => {
    assert(!ids.has(s.id), 'duplicate source ' + s.id);
    ids.add(s.id);
    assert(/^https:\/\//.test(s.url), 'non-https source ' + s.id);
    assert(s.label && s.publisher && s.used && s.used.length > 40, 'thin annotation on ' + s.id);
  });
});

check('ultrasound copy covers both patients and both views', () => {
  ['normal', 'dvt'].forEach((p) => {
    assert(Data.ultrasound.modes[p].verdict.title, 'missing verdict for ' + p);
    assert(Data.ultrasound.labels[p].length >= 4, 'missing labels for ' + p);
    assert(Data.ultrasound.longView[p].title, 'missing long view for ' + p);
  });
  assert(Data.ultrasound.pressureStages.length >= 3, 'need pressure staging copy');
});

/* ---------- 2 + 3. figures render as well-formed markup ---------- */

function validateMarkup(markup, label) {
  const re = /<\/?([a-zA-Z][\w:-]*)((?:"[^"]*"|[^>"])*?)(\/?)>/g;
  const stack = [];
  let match;
  while ((match = re.exec(markup)) !== null) {
    const tag = match[1];
    const closing = markup[match.index + 1] === '/';
    const selfClosing = match[3] === '/';
    if (closing) {
      const open = stack.pop();
      if (open !== tag) throw new Error(label + ': </' + tag + '> closes <' + open + '>');
    } else if (!selfClosing) {
      stack.push(tag);
    }
  }
  if (stack.length) throw new Error(label + ': unclosed ' + stack.join(' > '));
  if (/<[a-zA-Z][^>]*\s[a-zA-Z-]+=(?!"|')/.test(markup)) {
    throw new Error(label + ': unquoted attribute value');
  }
}

const plates = {
  scale: [0, 1, 2, 3].map((i) => ['scale[' + i + ']', Fig.scale(i)]),
  calfVeins: [['calfVeins', Fig.calfVeins({ zones: true, valves: true, labels: true })]],
  legs: [['legs', Fig.legs({ diff: 3, symptoms: Data.symptoms.map((s) => s.id) })]],
  ultrasound: [
    ['ultrasound/transverse/dvt', Fig.ultrasound({ patient: 'dvt', view: 'transverse', doppler: true, labels: true, pressure: 0 })],
    ['ultrasound/transverse/normal', Fig.ultrasound({ patient: 'normal', view: 'transverse', doppler: false, labels: false, pressure: 100 })],
    ['ultrasound/long/dvt', Fig.ultrasound({ patient: 'dvt', view: 'long', labels: true })],
    ['ultrasound/long/normal', Fig.ultrasound({ patient: 'normal', view: 'long', doppler: true })]
  ],
  triad: [['triad', Fig.triad({ active: 'stasis' })]],
  timeline: [['timeline', Fig.timeline()]],
  embolus: Data.embolusSteps.map((s, i) => ['embolus[' + i + ']', Fig.embolus({ step: i })]),
  pump: [['pump/walk', Fig.pump({ mode: 'walk' })], ['pump/still', Fig.pump({ mode: 'still' })]],
  decoder: [
    ['decoder/empty', Fig.decoder({})],
    ['decoder/entry', Fig.decoder({ entry: Data.reportPhrases[0] })],
    ['decoder/entry+vessels', Fig.decoder({ entry: Data.reportPhrases.filter((p) => p.veins && p.veins.length)[0] })],
    ['decoder/matches', Fig.decoder({ matches: Data.reportPhrases.slice(0, 4) })],
    ['decoder/none', Fig.decoder({ matches: [] })],
    ['decoder/chips', Fig.decoderChips({ category: 'location' })]
  ],
  glossary: [
    ['glossary/all', Fig.glossary({})],
    ['glossary/filtered', Fig.glossary({ query: 'clot' })],
    ['glossary/no-matches', Fig.glossary({ query: 'zzz' })]
  ]
};

console.log('\nfigures');
Object.keys(plates).forEach((name) => {
  plates[name].forEach(([label, markup]) => {
    check(label + ' renders + parses', () => {
      const floor = (name === 'decoder' || name === 'glossary') ? 60 : 200;
      assert(typeof markup === 'string' && markup.length > floor, 'suspiciously small output');
      if (name === 'timeline') {
        assert(markup.startsWith('<ol'), 'timeline should be an HTML list');
      } else if (name === 'decoder' || name === 'glossary') {
        assert(!markup.includes('<svg'), name + ' should be an HTML plate');
      } else {
        assert(markup.startsWith('<svg'), 'expected an <svg> root');
        assert(markup.includes('viewBox='), 'missing viewBox');
      }
      validateMarkup(markup, label);
      assert(!/undefined|NaN/.test(markup), 'markup contains undefined/NaN');
    });
  });
});

/* ---------- 4. id uniqueness across the whole page ---------- */

check('no plate reuses an id inside itself', () => {
  Object.keys(plates).forEach((name) => {
    plates[name].forEach(([label, markup]) => {
      const seen = new Set();
      let match;
      const re = /\sid="([^"]+)"/g;
      while ((match = re.exec(markup)) !== null) {
        assert(!seen.has(match[1]), label + ' uses id "' + match[1] + '" twice');
        seen.add(match[1]);
      }
    });
  });
});

check('ids are unique across page shell and the rendered plates', () => {
  // One render per plate family — the same plate re-rendered with new state
  // legitimately reuses its ids.
  const all = [html].concat(Object.keys(plates).map((name) => plates[name][0][1])).join('\n');
  const seen = new Map();
  const re = /\sid="([^"]+)"/g;
  let match;
  while ((match = re.exec(all)) !== null) {
    const id = match[1];
    if (seen.has(id)) throw new Error('duplicate id "' + id + '"');
    seen.set(id, true);
  }
  assert(seen.size > 10, 'expected to find element ids');
});

/* ---------- 5. app.js lookups resolve ---------- */

check('every id app.js queries exists in the shell or a plate', () => {
  const haystack = [html].concat(
    Object.keys(plates).reduce((acc, name) => acc.concat(plates[name].map((p) => p[1])), [])
  ).join('\n');
  const ids = new Set();
  let match;
  const re = /\$\(\s*'#([A-Za-z0-9_-]+)'/g;
  while ((match = re.exec(appJs)) !== null) ids.add(match[1]);
  const re2 = /getElementById\(\s*'([A-Za-z0-9_-]+)'/g;
  while ((match = re2.exec(appJs)) !== null) ids.add(match[1]);
  assert(ids.size > 5, 'expected app.js to look up several ids');
  ids.forEach((id) => {
    if (haystack.indexOf('id="' + id + '"') === -1 && appJs.indexOf('id="' + id + '"') === -1) {
      throw new Error('app.js looks up #' + id + ' but nothing defines it');
    }
  });
});

check('every [data-figure] stage in the shell has a builder', () => {
  const names = new Set();
  let match;
  const re = /data-figure="([^"]+)"/g;
  while ((match = re.exec(html)) !== null) names.add(match[1]);
  assert(names.size >= 7, 'expected the page to declare its plates');
  names.forEach((name) => {
    assert(typeof Fig[name] === 'function', 'no builder registered for ' + name);
  });
});

check('figure builders referenced by app.js exist', () => {
  const used = new Set();
  let match;
  const re = /Fig\.([a-zA-Z]+)\(/g;
  while ((match = re.exec(appJs)) !== null) used.add(match[1]);
  used.forEach((name) => {
    assert(typeof Fig[name] === 'function' || typeof Fig.helpers[name] === 'function',
      'app.js calls Fig.' + name + ' which does not exist');
  });
});

/* There is no bundler or linter in this app, so a mistyped local helper would
 * only surface as a runtime ReferenceError. Walk every `name(` call that is not
 * a method call and check it resolves to a declaration in the same file. */
check('every bare function call in app.js resolves to a declaration', () => {
  const KEYWORDS = new Set([
    'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case',
    'break', 'continue', 'throw', 'try', 'catch', 'finally', 'new', 'delete',
    'typeof', 'void', 'in', 'of', 'instanceof', 'var', 'let', 'const', 'class',
    'this', 'super', 'await', 'yield', 'import', 'export'
  ]);
  const BROWSER_GLOBALS = new Set([
    'document', 'window', 'performance', 'navigator', 'console', 'Math', 'Number',
    'String', 'Boolean', 'Array', 'Object', 'JSON', 'Date', 'Set', 'Map',
    'setTimeout', 'setInterval', 'clearInterval', 'clearTimeout', 'parseInt',
    'parseFloat', 'isNaN', 'requestAnimationFrame', 'IntersectionObserver'
  ]);
  // strip comments and string literals so prose never looks like a call
  const code = appJs
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1 ')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""');

  const declared = new Set();
  code.replace(/\bfunction\s+([A-Za-z_$][\w$]*)\s*\(/g, (m, name) => {
    declared.add(name);
    return m;
  });
  code.replace(/\b(?:var|let|const)\s+([A-Za-z_$][\w$]*)\s*=\s*(?:function|\()/g, (m, name) => {
    declared.add(name);
    return m;
  });

  const called = new Set();
  code.replace(/(^|[^.\w$])([a-z_$][\w$]*)\s*\(/g, (m, pre, name) => {
    if (KEYWORDS.has(name)) return m;
    called.add(name);
    return m;
  });

  const missing = [...called].filter((name) => !declared.has(name) && !BROWSER_GLOBALS.has(name));
  assert(missing.length === 0, 'app.js calls undeclared helpers: ' + missing.join(', '));
  assert(declared.size > 20, 'expected to find app.js helper declarations, saw ' + declared.size);
});

/* ---------- 6. shared geometry ---------- */

console.log('\ngeometry');
check('leg outline produces a closed path', () => {
  const d = Fig.helpers.legOutline(200, 0.5);
  assert(d.startsWith('M') && d.trim().endsWith('Z'), 'leg path should be closed');
  assert(!/NaN/.test(d), 'NaN in leg path');
});

check('route walking returns the ends and strides monotonically', () => {
  const route = Fig.routes.embolus;
  const total = Fig.helpers.routeLength(route);
  assert(total > 500, 'route too short to be the body map');
  const start = Fig.helpers.pointAtDistance(route, 0);
  assert(start[0] === route[0][0] && start[1] === route[0][1], 'distance 0 should be the first point');
  const end = Fig.helpers.pointAtDistance(route, total);
  const last = route[route.length - 1];
  assert(Math.abs(end[0] - last[0]) < 0.001 && Math.abs(end[1] - last[1]) < 0.001,
    'total distance should be the last point');
  let previousY = Infinity;
  for (let i = 0; i <= 10; i++) {
    const point = Fig.helpers.pointAtDistance(route, total * (i / 10));
    assert(point[1] <= previousY + 0.001, 'route should climb steadily toward the heart');
    previousY = point[1];
  }
  const clamped = Fig.helpers.pointAtDistance(route, total * 5);
  assert(Math.abs(clamped[0] - last[0]) < 0.001, 'over-distance should clamp to the end');
});

check('squeeze() empties a normal vein and spares a clotted one', () => {
  const normalFull = Fig.helpers.squeeze('normal', 100);
  const clotFull = Fig.helpers.squeeze('dvt', 100);
  const normalSoft = Fig.helpers.squeeze('normal', 0);
  assert(normalSoft.lumenPercent === 100, 'a relaxed normal vein should be fully open');
  assert(normalFull.obliterated && normalFull.lumenPercent < 12, 'normal vein must collapse');
  assert(!clotFull.obliterated && clotFull.lumenPercent > 80, 'clotted vein must stay open');
  assert(clotFull.lumenPercent < 100, 'clotted vein should give slightly under pressure');
});

check('embolus segments are drawn from points on the route', () => {
  const route = Fig.routes.embolus;
  Fig.routes.embolusOrder.forEach((id) => {
    Fig.routes.embolusSegments[id].forEach((point) => {
      const onRoute = route.some((p) => Math.abs(p[0] - point[0]) < 0.001 && Math.abs(p[1] - point[1]) < 0.001);
      assert(onRoute, 'segment ' + id + ' uses a point off the route: ' + point.join(','));
    });
  });
});

/* ---------- 6. report decoder data ---------- */

check('every decoder phrase is complete and well-formed', () => {
  assert(Data.reportPhrases.length >= 30, 'expected at least 30 phrases');
  const ids = new Set();
  const categories = new Set(Data.reportCategories.map((c) => c.id));
  Data.reportPhrases.forEach((p) => {
    assert(!ids.has(p.id), 'duplicate phrase id ' + p.id);
    ids.add(p.id);
    assert(categories.has(p.category), p.id + ' has unknown category ' + p.category);
    assert(['neutral', 'info', 'watch', 'good'].includes(p.tone), p.id + ' has odd tone ' + p.tone);
    assert(p.term && p.term.length > 2, p.id + ' needs a term');
    assert(p.plain && p.plain.length > 40, p.id + ' needs a real explanation');
    assert(p.ask && p.ask.length > 20, p.id + ' needs a question to ask');
    assert(p.match && p.match.length, p.id + ' needs at least one match alias');
    const seen = new Set();
    p.match.forEach((alias) => {
      assert(alias === alias.toLowerCase(), p.id + ' alias must be lowercase: ' + alias);
      assert(alias.trim() === alias, p.id + ' alias has stray whitespace: ' + alias);
      assert(!seen.has(alias), p.id + ' repeats the alias ' + alias);
      assert(alias.length > 1, p.id + ' has a one-character alias');
      seen.add(alias);
    });
  });
});

check('match aliases only ever point at one phrase', () => {
  // Two entries claiming the same word would make the decoder's output depend
  // on data order, which is exactly the kind of ambiguity the plate explains.
  const owner = new Map();
  Data.reportPhrases.forEach((p) => {
    p.match.forEach((alias) => {
      if (owner.has(alias)) {
        throw new Error('alias "' + alias + '" is claimed by ' + owner.get(alias) + ' and ' + p.id);
      }
      owner.set(alias, p.id);
    });
  });
});

check('phrases that name vessels point at real vessels', () => {
  const veinIds = new Set(Data.veins.map((v) => v.id));
  Data.reportPhrases.forEach((p) => {
    (p.veins || []).forEach((id) => {
      assert(veinIds.has(id), p.id + ' links to unknown vein ' + id);
    });
  });
  assert(Data.reportPhrases.some((p) => p.veins && p.veins.length),
    'at least one phrase should cross-link to the anatomy map');
});

check('the decoder covers every category and warns about numbers', () => {
  Data.reportCategories.forEach((c) => {
    assert(c.label && c.hint, c.id + ' needs a label and a hint');
    assert(Data.reportPhrases.filter((p) => p.category === c.id).length >= 5,
      c.id + ' has too few phrases to be worth a tab');
  });
  assert(Data.reportNumberNote && Data.reportNumberNote.body.length > 60,
    'the plate needs its "numbers need context" note');
});

check('glossary terms are grouped, unique and self-explaining', () => {
  const groups = new Set(Data.glossaryGroups.map((g) => g.id));
  assert(groups.size === Data.glossaryGroups.length, 'duplicate glossary group id');
  const seen = new Set();
  Data.glossary.forEach((t) => {
    const key = t.term.toLowerCase();
    assert(!seen.has(key), 'duplicate glossary term ' + t.term);
    seen.add(key);
    assert(groups.has(t.group), t.term + ' has unknown group ' + t.group);
    assert(t.def && t.def.length > 30, t.term + ' needs a fuller definition');
  });
  Data.glossaryGroups.forEach((g) => {
    assert(Data.glossary.some((t) => t.group === g.id), g.id + ' group is empty');
  });
});

check('a stateful figure carries its own state, not just app.js', () => {
  // The pump's still/walking caption is styled off the figure root, so the
  // builder has to emit the attribute itself; relying on app.js to set it
  // afterwards silently loses the caption anywhere the figure is rendered
  // on its own.
  assert(Fig.pump({ mode: 'still' }).includes('data-mode="still"'), 'pump/still must emit its mode');
  assert(Fig.pump({ mode: 'walk' }).includes('data-mode="walk"'), 'pump/walk must emit its mode');
});

check('the decoder and glossary plates only use styled classes', () => {
  const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
  const markup = plates.decoder.concat(plates.glossary)
    .map(([label, m]) => m)
    .join('\n');
  const classes = new Set();
  let match;
  const re = /class="([^"]+)"/g;
  while ((match = re.exec(markup)) !== null) {
    match[1].split(/\s+/).forEach((c) => classes.add(c));
  }
  assert(classes.size > 8, 'suspiciously few classes found');
  classes.forEach((c) => {
    assert(css.includes('.' + c), 'class "' + c + '" is not styled in styles.css');
  });
});

/* ---------- summary ---------- */

console.log('');
if (failures) {
  console.error(failures + ' check(s) failed\n');
  process.exit(1);
}
console.log('all checks passed\n');
