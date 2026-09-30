/* Deep Vein Thrombosis, Up Close — controllers (app.js)
 * Renders every plate from the pure builders in figures.js, then wires the
 * interactive bits: the zoom explorer, the vein map, the symptom toggle set,
 * the ultrasound simulator, the triad, the embolus route, the decision tools
 * and the calf pump.
 */
(function () {
  'use strict';

  var Data = window.DVTData;
  var Fig = window.DVTFigures;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel));
  };

  var reduceMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var state = {
    scale: 0,
    veins: { selected: null, zones: false, valves: true, labels: true },
    legs: { diff: 3, symptoms: ['swelling', 'warmth', 'erythema'] },
    us: { patient: 'dvt', view: 'transverse', doppler: false, labels: true, pressure: 0 },
    triad: { active: null },
    emb: { step: 0, playing: false, distance: 0 },
    pump: { mode: 'walk', speed: 1, steps: 0, fill: 0 },
    decode: { category: 'location', selected: null, matches: null },
    glossary: { query: '' }
  };

  var stages = {};

  function render(name, html) {
    var node = stages[name];
    if (!node) return null;
    node.innerHTML = html;
    return node;
  }

  /* ==================================================================
   * 1. Scale explorer
   * ================================================================== */

  function renderScale() {
    render('scale', Fig.scale(state.scale));
    $$('[data-scale-go]').forEach(function (btn) {
      var i = Number(btn.getAttribute('data-scale-go'));
      btn.setAttribute('aria-pressed', String(i === state.scale));
    });
    var level = Data.scaleLevels[state.scale];
    var out = $('#scale-readout');
    if (out && level) {
      out.innerHTML = '<b>' + level.title + '</b> — ' + level.caption
        + ' <span class="readout-scale">Scale bar: ' + level.scaleBar + ' = '
        + level.scaleLabel + '</span>';
    }
  }

  function scaleStep(delta) {
    var next = Math.max(0, Math.min(Fig.scaleSceneCount - 1, state.scale + delta));
    if (next === state.scale) return;
    state.scale = next;
    renderScale();
  }

  /* ==================================================================
   * 2. Vein map
   * ================================================================== */

  function renderVeins() {
    render('calfVeins', Fig.calfVeins(state.veins));
    if (state.veins.selected) paintVein(state.veins.selected);
    renderVeinChips();
  }

  function renderVeinChips() {
    var host = $('#vein-chips');
    if (!host) return;
    host.innerHTML = Data.veins.map(function (v) {
      return '<button type="button" class="chip chip--' + v.type + '" data-vein-chip="' + v.id + '">'
        + '<span class="chip-dot" aria-hidden="true"></span>' + v.name + '</button>';
    }).join('');
  }

  function paintVein(id) {
    $$('.vein-group').forEach(function (g) {
      g.classList.toggle('is-selected', g.getAttribute('data-vein') === id);
    });
    $$('[data-vein-chip]').forEach(function (c) {
      var on = c.getAttribute('data-vein-chip') === id;
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-pressed', String(on));
    });
  }

  function selectVein(id) {
    var vein = Data.veins.filter(function (v) { return v.id === id; })[0];
    var panel = $('#vein-panel');
    if (!vein || !panel) return;
    state.veins.selected = id;
    panel.innerHTML = [
      '<div class="panel-head">',
      '<p class="panel-kicker">', vein.typeLabel, '</p>',
      '<h4>', vein.name, '</h4>',
      '</div>',
      '<p class="panel-body">', vein.drains, '</p>',
      '<div class="panel-why">',
      '<p class="panel-why-title">Why it matters</p>',
      '<p>', vein.why, '</p>',
      '</div>',
      '<p class="panel-ask"><span>Ask your team</span>', vein.ask, '</p>',
      /* The chip row is the keyboard-and-screen-reader route to the other
       * eight vessels, so it has to survive a selection: rebuild it here
       * rather than leaving the reader with a dead end. */
      '<div class="chip-row chip-row--switch" id="vein-chips"></div>',
      '<p class="panel-hint panel-hint--small">Jump to another vessel, or press '
      + '<button type="button" class="linkish" data-vein-clear>clear</button>.'
      + ' <span class="panel-hint-kbd">Tab reaches these chips and every vessel on the plate.</span></p>'
    ].join('');
    renderVeinChips();
    paintVein(id);
  }

  function clearVein() {
    state.veins.selected = null;
    paintVein(null);
    var panel = $('#vein-panel');
    if (panel) {
      panel.innerHTML = '<p class="panel-hint">Click a vein on the plate — or one of these chips — '
        + 'to see what it drains and why it matters.</p><div class="chip-row" id="vein-chips"></div>';
      renderVeinChips();
    }
  }

  /* ==================================================================
   * 3. Legs & symptoms
   * ================================================================== */

  function renderLegs() {
    render('legs', Fig.legs(state.legs));
    $$('[data-sym]').forEach(function (btn) {
      var id = btn.getAttribute('data-sym');
      btn.setAttribute('aria-pressed', String(state.legs.symptoms.indexOf(id) !== -1));
    });
    var readout = $('#swell-readout');
    if (readout) {
      readout.innerHTML = state.legs.diff === 0
        ? 'Both calves measure the same — no asymmetry.'
        : 'Right calf is <strong>' + state.legs.diff.toFixed(1) + ' cm</strong> larger than the left.';
    }
    var badge = $('#swell-badge');
    if (badge) {
      badge.setAttribute('data-state', state.legs.diff >= 3 ? 'on' : 'off');
      badge.innerHTML = state.legs.diff >= 3
        ? '≥3 cm difference = <strong>+1 point</strong> in the Wells clinical probability score'
        : 'Under 3 cm — this measurement alone would not add a point.';
    }
    var note = $('#sym-note');
    if (note) {
      var last = state.legs.symptoms[state.legs.symptoms.length - 1];
      var item = Data.symptoms.filter(function (s) { return s.id === last; })[0];
      note.innerHTML = item
        ? '<b>' + item.label + '</b> — ' + item.note
        : 'Switch a finding on to read what it means.';
    }
  }

  /* ==================================================================
   * 4. Ultrasound
   * ================================================================== */

  function currentUsStage() { return stages.ultrasound; }

  function renderUltrasound() {
    var stage = render('ultrasound', Fig.ultrasound(state.us));
    if (stage) applyPressure(state.us.pressure);
    $$('[data-us-patient]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-us-patient') === state.us.patient));
    });
    $$('[data-us-view]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-us-view') === state.us.view));
    });
    $$('[data-us-toggle]').forEach(function (b) {
      var key = b.getAttribute('data-us-toggle');
      b.setAttribute('aria-pressed', String(Boolean(state.us[key])));
    });
    renderUsVerdict();
    renderUsLegend();
  }

  function applyPressure(value) {
    state.us.pressure = value;
    var stage = currentUsStage();
    if (stage) {
      var q = Fig.helpers.squeeze(state.us.patient, value);
      $$('[data-us-part]', stage).forEach(function (node) {
        var rx = Number(node.getAttribute('data-rx'));
        var ry = Number(node.getAttribute('data-ry'));
        node.setAttribute('rx', Math.max(0.7, rx * q.rxFactor).toFixed(2));
        node.setAttribute('ry', Math.max(0.5, ry * q.ryFactor).toFixed(2));
        node.style.opacity = q.obliterated && node.getAttribute('data-us-part') !== 'thrombus'
          ? '0.35' : '1';
      });
      var probe = $('.v-us-probebar', stage);
      if (probe) probe.setAttribute('transform', 'translate(0 ' + (value / 100 * 10).toFixed(2) + ')');
      var arrows = $('.v-us-arrows', stage);
      if (arrows) arrows.setAttribute('opacity', (0.2 + value / 100 * 0.8).toFixed(2));
    }
    var slider = $('#us-pressure');
    if (slider && Number(slider.value) !== value) slider.value = value;
    var lumen = $('#us-lumen');
    if (lumen) {
      var q2 = Fig.helpers.squeeze(state.us.patient, value);
      lumen.textContent = q2.lumenPercent + '%';
      lumen.setAttribute('data-open', String(!q2.obliterated));
    }
  }

  function renderUsVerdict() {
    var host = $('#us-verdict');
    if (!host) return;
    var mode = Data.ultrasound.modes[state.us.patient];
    var stage = Data.ultrasound.pressureStages.filter(function (s) {
      return state.us.pressure <= s.max;
    })[0] || Data.ultrasound.pressureStages[Data.ultrasound.pressureStages.length - 1];
    var q = Fig.helpers.squeeze(state.us.patient, state.us.pressure);
    var longView = state.us.view === 'long' ? Data.ultrasound.longView[state.us.patient] : null;
    host.innerHTML = [
      '<h4 class="us-verdict-title us-verdict-title--' + (state.us.patient === 'dvt' ? 'alert' : 'ok') + '">',
      mode.verdict.title,
      '</h4>',
      '<p>', mode.verdict.body, '</p>',
      '<p class="us-stage-note"><span>At this pressure</span>' + stage.text + '</p>',
      '<p class="us-lumen-note">' + (q.obliterated
        ? '<b>Lumen obliterated.</b> The walls have met — this is what compressibility looks like.'
        : '<b>Lumen is still open (' + q.lumenPercent + '%).</b> ' + mode.lumenNote) + '</p>',
      longView ? '<div class="us-longview-note"><h5>' + longView.title + '</h5><p>'
        + longView.body + '</p></div>' : ''
    ].join('');
  }

  function renderUsLegend() {
    var host = $('#us-legend');
    if (!host) return;
    host.innerHTML = '<p class="legend-title">What you are looking at</p>'
      + Data.ultrasound.legend.map(function (item) {
        return '<span class="legend-item"><i class="sw sw--' + item.swatch + '"></i>'
          + item.label + '</span>';
      }).join('');
  }

  /* ==================================================================
   * 5. Virchow's triad
   * ================================================================== */

  function renderTriad() {
    render('triad', Fig.triad(state.triad));
    renderTriadPanel();
    renderRiskChips();
  }

  function renderTriadPanel() {
    var host = $('#triad-panel');
    if (!host) return;
    if (!state.triad.active) {
      host.innerHTML = '<p class="panel-hint">Pick an arm of the triangle — or a risk factor below — '
        + 'to see how it pushes blood toward clotting.</p>';
      return;
    }
    var arm = Data.triad.filter(function (t) { return t.id === state.triad.active; })[0];
    if (!arm) return;
    host.innerHTML = [
      '<div class="panel-head"><p class="panel-kicker">Virchow\'s triad</p><h4>', arm.name, '</h4></div>',
      '<p class="panel-body">', arm.body, '</p>',
      '<p class="panel-note">', arm.detail, '</p>'
    ].join('');
  }

  function renderRiskChips() {
    var host = $('#risk-chips');
    if (!host) return;
    host.innerHTML = Data.riskFactors.map(function (f) {
      return '<button type="button" class="chip chip--risk" data-risk-chip="'
        + f.label.replace(/"/g, '&quot;') + '" data-arms="' + f.arms.join(' ') + '">'
        + f.label + '</button>';
    }).join('');
  }

  function highlightArms(arms, note, label) {
    $$('.tri-node').forEach(function (node) {
      node.classList.toggle('is-active', arms.indexOf(node.getAttribute('data-triad')) !== -1);
    });
    $$('.tri-edge').forEach(function (edge) {
      var ids = edge.getAttribute('data-edge').split('-');
      edge.classList.toggle('is-active', arms.indexOf(ids[0]) !== -1 && arms.indexOf(ids[1]) !== -1);
    });
    var host = $('#triad-panel');
    if (host && label) {
      host.innerHTML = '<div class="panel-head"><p class="panel-kicker">Risk factor</p><h4>'
        + label + '</h4></div><p class="panel-body">' + note + '</p>'
        + '<p class="panel-note">Arms of the triad involved: <b>'
        + arms.map(function (a) {
          return (Data.triad.filter(function (t) { return t.id === a; })[0] || {}).name;
        }).join(', ') + '</b>.</p>';
    }
  }

  /* ==================================================================
   * 6. Timeline
   * ================================================================== */

  function renderTimeline() {
    render('timeline', Fig.timeline());
  }

  /* ==================================================================
   * 7. Embolus route
   * ================================================================== */

  var embRoute = Fig.routes ? Fig.routes.embolus : [];
  var embOrder = Fig.routes ? Fig.routes.embolusOrder : [];
  var embTotal = Fig.helpers.routeLength(embRoute);
  var embSegments = Fig.routes ? Fig.routes.embolusSegments : {};

  function segEndDistance(id) {
    var points = embSegments[id];
    var end = points[points.length - 1];
    var distance = 0;
    var target = 0;
    for (var i = 1; i < embRoute.length; i++) {
      var a = embRoute[i - 1];
      var b = embRoute[i];
      distance += Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (b[0] === end[0] && b[1] === end[1]) target = distance;
    }
    return target;
  }

  /* The marker parks in the middle of the segment being described, so
   * "calf veins" reads as the calf rather than as the knee it ends at. */
  function segMidDistance(id) {
    var end = segEndDistance(id);
    var start = embSegments[id][0];
    var travelled = 0;
    var from = 0;
    for (var i = 1; i < embRoute.length; i++) {
      var a = embRoute[i - 1];
      var b = embRoute[i];
      travelled += Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (!from && a[0] === start[0] && a[1] === start[1]) from = travelled;
    }
    return from + (end - from) / 2;
  }

  function renderEmbolus() {
    render('embolus', Fig.embolus(state.emb));
    moveEmbolusDot(state.emb.distance);
    renderEmbPanel();
    var counter = $('#emb-counter');
    if (counter) counter.textContent = 'Step ' + (state.emb.step + 1) + ' of ' + Data.embolusSteps.length;
    $$('.emb-seg').forEach(function (seg) {
      var id = seg.getAttribute('data-seg');
      seg.classList.toggle('is-live', embOrder.indexOf(id) <= state.emb.step);
    });
  }

  function moveEmbolusDot(distance) {
    var stage = stages.embolus;
    if (!stage || !embRoute.length) return;
    var dot = $('[data-emb-dot]', stage);
    if (!dot) return;
    var point = Fig.helpers.pointAtDistance(embRoute, distance);
    dot.setAttribute('transform', 'translate(' + point[0].toFixed(2) + ' ' + point[1].toFixed(2) + ')');
  }

  function renderEmbPanel() {
    var host = $('#emb-panel');
    if (!host) return;
    var step = Data.embolusSteps[state.emb.step];
    if (!step) return;
    host.innerHTML = [
      '<div class="panel-head"><p class="panel-kicker">Step ' + (state.emb.step + 1) + ' of '
        + Data.embolusSteps.length + '</p><h4>', step.title, '</h4></div>',
      '<p class="panel-body">', step.body, '</p>',
      '<p class="panel-tag">', step.stat, '</p>'
    ].join('');
  }

  function setStep(index, moveDot) {
    var max = Data.embolusSteps.length - 1;
    state.emb.step = Math.max(0, Math.min(max, index));
    if (moveDot !== false) {
      state.emb.distance = segMidDistance(embOrder[state.emb.step]);
    }
    renderEmbolus();
  }

  function embolusFrame(dt) {
    if (!state.emb.playing) return;
    state.emb.distance += dt * (embTotal / 7.5);
    if (state.emb.distance >= embTotal) {
      state.emb.distance = embTotal;
      state.emb.playing = false;
      var btn = $('#emb-play');
      if (btn) btn.textContent = 'Play the journey';
    }
    var travelled = 0;
    var step = 0;
    for (var i = 0; i < embOrder.length; i++) {
      travelled = segEndDistance(embOrder[i]);
      if (state.emb.distance <= travelled + 0.001) { step = i; break; }
      step = i;
    }
    if (step !== state.emb.step) {
      state.emb.step = step;
      renderEmbolus();
      return;
    }
    moveEmbolusDot(state.emb.distance);
  }

  /* ==================================================================
   * 8. Management trade-off
   * ================================================================== */

  function buildTreeForm() {
    var form = $('#tree-form');
    if (!form) return;
    form.addEventListener('change', updateTree);
    updateTree();
  }

  function updateTree() {
    var out = $('#tree-output');
    var form = $('#tree-form');
    if (!out || !form) return;
    var severe = form.querySelector('input[name="symptoms"]:checked');
    severe = severe && severe.value === 'severe';
    var risks = $$('input[name="risk"]:checked', form).map(function (i) {
      return i.parentNode.textContent.trim();
    });
    var bleed = $$('input[name="bleed"]:checked', form).length > 0;
    var path;
    var reasons = [];
    if (bleed && (severe || risks.length)) {
      path = Data.managementPaths.surveilBleed;
      reasons = ['high bleeding risk'];
      if (severe) reasons.push('significant symptoms');
      if (risks.length) reasons.push(risks.length + ' risk factor' + (risks.length > 1 ? 's' : '') + ' for extension');
    } else if (severe || risks.length) {
      path = Data.managementPaths.treat;
      if (severe) reasons.push('significant symptoms');
      if (risks.length) reasons.push(risks.length + ' risk factor' + (risks.length > 1 ? 's' : '') + ' for extension');
    } else {
      path = Data.managementPaths.surveil;
      reasons = ['no severe symptoms and no risk factors for extension'];
    }
    out.innerHTML = [
      '<p class="tree-badge tree-badge--' + path.tone + '">', path.badge, '</p>',
      '<h4 class="tree-title">', path.title, '</h4>',
      '<p class="tree-reason"><span>Because:</span> ' + reasons.join(', ') + '.</p>',
      '<p class="tree-body">', path.body, '</p>',
      '<ul class="tight">' + path.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join('') + '</ul>',
      '<p class="tree-caveat">Teaching model only — guidelines describe populations, your clinician '
        + 'treats a person, and your preferences are part of the decision.</p>'
    ].join('');
  }

  /* ==================================================================
   * 9. Wells score
   * ================================================================== */

  function buildWells() {
    var host = $('#wells-list');
    if (!host) return;
    host.innerHTML = Data.wells.map(function (item) {
      return '<label class="check check--wells">'
        + '<input type="checkbox" data-wells="' + item.id + '" data-points="' + item.points + '" />'
        + '<span><b class="wells-label">' + item.label + '</b>'
        + '<i class="wells-hint">' + item.hint + '</i></span>'
        + '<em class="wells-points">' + (item.points > 0 ? '+' + item.points : item.points) + '</em>'
        + '</label>';
    }).join('');
    host.addEventListener('change', updateWells);
    updateWells();
  }

  function updateWells() {
    var host = $('#wells-output');
    var list = $('#wells-list');
    if (!host || !list) return;
    var score = 0;
    $$('input[data-wells]', list).forEach(function (input) {
      if (input.checked) score += Number(input.getAttribute('data-points'));
    });
    var tier = score >= 2
      ? { name: 'DVT likely', tone: 'likely', next: 'The usual next step is a compression ultrasound — imaging first, rather than a D-dimer test alone.' }
      : { name: 'DVT unlikely', tone: 'unlikely', next: 'The usual next step is a D-dimer blood test. If it is negative, a DVT can be ruled out without imaging in most people.' };
    var maxScore = Data.wells.reduce(function (a, b) { return a + Math.max(0, b.points); }, 0);
    var pct = Math.max(0, Math.min(100, ((score + 2) / (maxScore + 2)) * 100));
    host.innerHTML = [
      '<div class="wells-score"><span class="wells-score-num">', score, '</span>',
      '<span class="wells-score-den">/ ' + maxScore + '</span></div>',
      '<p class="wells-tier wells-tier--', tier.tone, '">', tier.name, '</p>',
      '<div class="wells-bar" aria-hidden="true"><i style="width:' + pct.toFixed(1) + '%"></i></div>',
      '<p class="wells-next">', tier.next, '</p>',
      '<p class="wells-caveat">A probability estimate, not a diagnosis — and it performs less well in '
      + 'cancer patients, inpatients, and people with a previous DVT. Nothing here replaces the '
      + 'assessment you were actually given.</p>'
    ].join('');
  }

  /* ==================================================================
   * 10. Sources
   * ================================================================== */

  /* ==================================================================
   * 11. Report decoder + glossary
   * ================================================================== */

  function escapeRe(text) {
    return String(text).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /* Whole-word alias matching, so "acute" does not fire inside "subacute"
   * and "inr" does not fire inside "internal". */
  function aliasPattern(alias) {
    var escaped = escapeRe(alias).replace(/[\s-]+/g, '[\\s-]+');
    return new RegExp('(^|[^\\w-])' + escaped + '(?![\\w-])', 'i');
  }

  var compiledPhrases = null;
  function phrasePatterns() {
    if (compiledPhrases) return compiledPhrases;
    compiledPhrases = Data.reportPhrases.map(function (entry) {
      return {
        entry: entry,
        patterns: (entry.match || []).map(aliasPattern)
      };
    });
    return compiledPhrases;
  }

  function decodeText(text) {
    var haystack = String(text || '');
    if (!haystack.trim()) return [];
    var found = [];
    phrasePatterns().forEach(function (item) {
      for (var i = 0; i < item.patterns.length; i++) {
        var hit = item.patterns[i].exec(haystack);
        if (hit) {
          found.push({ entry: item.entry, at: hit.index });
          return;
        }
      }
    });
    // order by where they first appear in the text
    found.sort(function (a, b) { return a.at - b.at; });
    return found.map(function (item) { return item.entry; });
  }

  function renderDecoder() {
    var stage = render('decoder', Fig.decoder({
      entry: state.decode.selected,
      matches: state.decode.matches
    }));
    var chips = $('#decode-chips');
    if (chips) chips.innerHTML = Fig.decoderChips({ category: state.decode.category });
    $$('[data-decode-tab]').forEach(function (btn) {
      btn.setAttribute('aria-pressed',
        String(btn.getAttribute('data-decode-tab') === state.decode.category));
    });
    $$('[data-decode]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(
        state.decode.selected && btn.getAttribute('data-decode') === state.decode.selected.id));
    });
    return stage;
  }

  function renderDecoderSheet() {
    var host = $('#print-decoder');
    if (!host) return;
    host.insertAdjacentHTML('beforeend', Fig.decoderSheet());
  }

  function renderGlossary() {
    render('glossary', Fig.glossary({ query: state.glossary.query }));
    var status = $('#glossary-status');
    if (status) {
      var count = state.glossary.query
        ? Data.glossary.filter(function (t) {
          return (t.term + ' ' + t.def).toLowerCase().indexOf(state.glossary.query.toLowerCase()) !== -1;
        }).length
        : Data.glossary.length;
      status.textContent = count + ' of ' + Data.glossary.length + ' terms';
    }
  }

  function showDecode(id) {
    var entry = Data.reportPhrases.filter(function (p) { return p.id === id; })[0];
    if (!entry) return;
    state.decode.selected = entry;
    state.decode.category = entry.category;
    state.decode.matches = null;
    renderDecoder();
    var card = $('#decoder [data-figure="decoder"] .decode-card');
    if (card) card.setAttribute('tabindex', '-1');
  }

  function runScan() {
    var box = $('#decode-input');
    if (!box) return;
    var text = box.value;
    var matches = decodeText(text);
    state.decode.matches = matches;
    state.decode.selected = null;
    renderDecoder();
    var summary = $('#decode-scan-status');
    if (summary) {
      summary.textContent = !text.trim()
        ? 'Nothing pasted yet — your text never leaves this page.'
        : matches.length
          ? 'Recognised ' + matches.length + ' phrase' + (matches.length === 1 ? '' : 's') + '.'
          : 'No listed phrases recognised in that text.';
    }
    var results = $('#decoder .decode-results');
    if (results) results.setAttribute('tabindex', '-1');
  }

  function renderSourcesList() {
    var host = $('#source-list');
    if (!host) return;
    host.innerHTML = Data.sources.map(function (s) {
      return '<li class="source"><a class="source-link" href="' + s.url + '" rel="noopener">'
        + '<span class="source-label">' + s.label + '</span>'
        + '<span class="source-pub">' + s.publisher + '</span></a>'
        + '<p class="source-used">Used for: ' + s.used + '</p></li>';
    }).join('');
  }

  /* ==================================================================
   * 12. Calf pump
   * ================================================================== */

  var particles = [];

  function buildPump() {
    render('pump', Fig.pump(state.pump));
    var stage = stages.pump;
    if (!stage) return;
    var host = $('[data-pump-particles]', stage);
    if (!host) return;
    var geo = Fig.pumpGeometry;
    particles = [];
    var rand = (function () { var s = 99; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; })();
    for (var i = 0; i < 22; i++) {
      var inLeft = i % 2 === 0;
      var node = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      node.setAttribute('r', (2.4 + rand() * 2.2).toFixed(2));
      node.setAttribute('class', 'pump-particle' + (rand() > 0.72 ? ' pump-particle--slow' : ''));
      host.appendChild(node);
      particles.push({
        node: node,
        x: inLeft ? geo.leftX : geo.rightX,
        span: (inLeft ? geo.halfL : geo.halfR) - 5,
        t: rand(),
        jitter: (rand() - 0.5) * 2,
        speed: 0.75 + rand() * 0.5
      });
    }
    setPumpMode(state.pump.mode);
  }

  function setPumpMode(mode) {
    state.pump.mode = mode;
    $$('[data-pump-mode]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-pump-mode') === mode));
    });
    var stage = stages.pump;
    if (stage) {
      var root = $('.fig-pump', stage);
      if (root) root.setAttribute('data-mode', mode);
      var title = $('.pump-mode-title', stage);
      if (title) title.textContent = mode === 'still' ? 'Sitting still' : 'Walking';
    }
    renderPumpPanel();
  }

  function renderPumpPanel() {
    var host = $('#pump-panel');
    if (!host) return;
    var mode = Data.pump.modes[state.pump.mode];
    var flow = state.pump.mode === 'still' ? 6 : 82 * Math.min(1, state.pump.speed / 1.4 + 0.35);
    host.innerHTML = [
      '<div class="panel-head"><p class="panel-kicker">Calf muscle pump</p><h4>', mode.title, '</h4></div>',
      '<p class="panel-body">', mode.body, '</p>',
      '<ul class="tight">' + mode.stats.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>',
      '<div class="flow-meter" data-mode="', state.pump.mode, '">',
      '<p class="flow-label">Relative flow through the deep veins</p>',
      '<div class="flow-bar"><i style="width:', flow.toFixed(0), '%"></i></div>',
      '<p class="flow-note">', state.pump.mode === 'still'
        ? 'A trickle. This is stasis — one arm of Virchow\'s triad, switched on by a chair.'
        : 'A pulse of flow with every step: the pump emptying the deep veins against gravity.',
      '</p></div>'
    ].join('');
  }

  function pumpFrame(dt) {
    var stage = stages.pump;
    var mode = state.pump.mode;
    var seconds = performance.now() / 1000;
    var cycle = 1.5 / Math.max(0.2, state.pump.speed);
    var phase = (seconds % cycle) / cycle;
    var contracting = mode === 'walk' && phase < 0.42;
    if (!stage || !particles.length) return;
    var root = $('.fig-pump', stage);
    if (root) root.classList.toggle('is-contracting', contracting);

    // One step per pump cycle while walking.
    var cycleCount = Math.floor(seconds / cycle);
    if (mode === 'walk' && cycleCount !== state.pump.lastCycle) {
      if (state.pump.lastCycle !== undefined) {
        state.pump.steps += 1;
        var steps = $('#pump-steps');
        if (steps) steps.textContent = String(state.pump.steps);
      }
      state.pump.lastCycle = cycleCount;
    }

    var geo = Fig.pumpGeometry;
    particles.forEach(function (p) {
      if (mode === 'walk') {
        // a squeeze on contraction, a slow drift on refill
        p.t += dt * (contracting ? 0.78 : 0.14) * p.speed * state.pump.speed;
        if (p.t > 1) p.t -= 1;
      } else {
        // stasis: barely any motion, and most of it is swirling, not rising
        p.t += dt * 0.01 * Math.sin(seconds / 900 + p.jitter);
        p.t = Math.max(0.02, Math.min(0.99, p.t));
      }
      var x = p.x + Math.sin(seconds / (mode === 'still' ? 2.2 : 0.9) + p.jitter) * (mode === 'still' ? 4 : 2);
      var y = geo.bottom - p.t * (geo.bottom - geo.top);
      p.node.setAttribute('cx', x.toFixed(1));
      p.node.setAttribute('cy', y.toFixed(1));
      p.node.setAttribute('opacity', mode === 'still' ? '0.45' : '0.95');
    });
  }

  /* ==================================================================
   * 13. Chrome: TOC spy, reading progress, keyboard
   * ================================================================== */

  function initChrome() {
    var fill = $('#readbar-fill');
    var ticking = false;
    function update() {
      ticking = false;
      if (!fill) return;
      var doc = document.documentElement;
      var max = doc.scrollHeight - window.innerHeight;
      var pct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      fill.style.width = pct.toFixed(2) + '%';
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();

    var links = $$('#toc-list a');
    var sections = links.map(function (a) {
      return document.getElementById(a.getAttribute('href').slice(1));
    }).filter(Boolean);
    if ('IntersectionObserver' in window && sections.length) {
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.id;
          links.forEach(function (a) {
            a.classList.toggle('is-current', a.getAttribute('href') === '#' + id);
          });
        });
      }, { rootMargin: '-25% 0px -65% 0px', threshold: 0 });
      sections.forEach(function (s) { obs.observe(s); });
    }
  }

  /* ==================================================================
   * 14. Wiring
   * ================================================================== */

  function bind() {
    // ---- scale ----
    document.addEventListener('click', function (event) {
      var go = event.target.closest && event.target.closest('[data-scale-go]');
      if (go) { state.scale = Number(go.getAttribute('data-scale-go')); renderScale(); return; }
      if (event.target.closest && event.target.closest('[data-scale-in]')) { scaleStep(1); return; }
      if (event.target.closest && event.target.closest('[data-scale-out]')) { scaleStep(-1); return; }

      // ---- veins ----
      var veinEl = event.target.closest && event.target.closest('[data-vein]');
      if (veinEl) { selectVein(veinEl.getAttribute('data-vein')); return; }
      var chip = event.target.closest && event.target.closest('[data-vein-chip]');
      if (chip) { selectVein(chip.getAttribute('data-vein-chip')); return; }
      if (event.target.closest && event.target.closest('[data-vein-clear]')) { clearVein(); return; }
      var toggle = event.target.closest && event.target.closest('[data-vein-toggle]');
      if (toggle) {
        var key = toggle.getAttribute('data-vein-toggle');
        state.veins[key] = !state.veins[key];
        toggle.setAttribute('aria-pressed', String(state.veins[key]));
        render('calfVeins', Fig.calfVeins(state.veins));
        if (state.veins.selected) paintVein(state.veins.selected);
        return;
      }

      // ---- symptoms ----
      var sym = event.target.closest && event.target.closest('[data-sym]');
      if (sym) {
        var id = sym.getAttribute('data-sym');
        var i = state.legs.symptoms.indexOf(id);
        if (i === -1) state.legs.symptoms.push(id); else state.legs.symptoms.splice(i, 1);
        renderLegs();
        return;
      }

      // ---- ultrasound ----
      var pat = event.target.closest && event.target.closest('[data-us-patient]');
      if (pat) { state.us.patient = pat.getAttribute('data-us-patient'); renderUltrasound(); return; }
      var view = event.target.closest && event.target.closest('[data-us-view]');
      if (view) { state.us.view = view.getAttribute('data-us-view'); renderUltrasound(); return; }
      var usToggle = event.target.closest && event.target.closest('[data-us-toggle]');
      if (usToggle) {
        var k = usToggle.getAttribute('data-us-toggle');
        state.us[k] = !state.us[k];
        renderUltrasound();
        return;
      }

      // ---- triad ----
      var node = event.target.closest && event.target.closest('[data-triad]');
      if (node) {
        var tri = node.getAttribute('data-triad');
        state.triad.active = state.triad.active === tri ? null : tri;
        renderTriad();
        return;
      }
      var riskChip = event.target.closest && event.target.closest('[data-risk-chip]');
      if (riskChip) {
        var label = riskChip.getAttribute('data-risk-chip');
        var factor = Data.riskFactors.filter(function (f) { return f.label === label; })[0];
        highlightArms((riskChip.getAttribute('data-arms') || '').split(' '), factor ? factor.note : '', label);
        return;
      }

      // ---- embolus ----
      var stepBtn = event.target.closest && event.target.closest('[data-emb-step]');
      if (stepBtn) {
        state.emb.playing = false;
        var playBtn = $('#emb-play');
        if (playBtn) playBtn.textContent = 'Play the journey';
        setStep(state.emb.step + Number(stepBtn.getAttribute('data-emb-step')));
        return;
      }
      var play = event.target.closest && event.target.closest('#emb-play');
      if (play) {
        if (state.emb.playing) {
          state.emb.playing = false;
          play.textContent = 'Play the journey';
        } else {
          if (state.emb.distance >= embTotal) state.emb.distance = 0;
          state.emb.playing = true;
          play.textContent = 'Pause';
        }
        return;
      }

      // ---- pump ----
      var pumpMode = event.target.closest && event.target.closest('[data-pump-mode]');
      if (pumpMode) { setPumpMode(pumpMode.getAttribute('data-pump-mode')); return; }

      // ---- report decoder ----
      var tab = event.target.closest && event.target.closest('[data-decode-tab]');
      if (tab) {
        state.decode.category = tab.getAttribute('data-decode-tab');
        state.decode.selected = null;
        state.decode.matches = null;
        renderDecoder();
        return;
      }
      var phrase = event.target.closest && event.target.closest('[data-decode]');
      if (phrase) { showDecode(phrase.getAttribute('data-decode')); return; }
      var veinLink = event.target.closest && event.target.closest('[data-vein-link]');
      if (veinLink) {
        // jump the reader to the anatomy plate with that vessel selected
        selectVein(veinLink.getAttribute('data-vein-link'));
        var plate = $('#fig-veins');
        if (plate && plate.scrollIntoView) {
          plate.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
        }
        return;
      }
    });

    document.addEventListener('keydown', function (event) {
      var target = event.target;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return;
      var veinEl = target && target.closest ? target.closest('[data-vein]') : null;
      if (veinEl && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        selectVein(veinEl.getAttribute('data-vein'));
        return;
      }
      var triNode = target && target.closest ? target.closest('[data-triad]') : null;
      if (triNode && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        triNode.click();
        return;
      }
    });

    var slider = $('#swell-slider');
    if (slider) {
      slider.addEventListener('input', function () {
        state.legs.diff = Number(slider.value);
        renderLegs();
      });
    }
    var usSlider = $('#us-pressure');
    if (usSlider) {
      usSlider.addEventListener('input', function () { applyPressure(Number(usSlider.value)); });
    }
    var pressBtn = $('#us-press-hold');
    if (pressBtn) {
      var ramp;
      var start = function (event) {
        event.preventDefault();
        if (ramp) window.clearInterval(ramp);
        ramp = window.setInterval(function () {
          var next = Math.min(100, state.us.pressure + 9);
          applyPressure(next);
          if (next >= 100) { window.clearInterval(ramp); ramp = null; }
        }, 45);
      };
      var stop = function () {
        if (ramp) { window.clearInterval(ramp); ramp = null; }
      };
      pressBtn.addEventListener('pointerdown', start);
      pressBtn.addEventListener('pointerup', stop);
      pressBtn.addEventListener('pointerleave', stop);
      pressBtn.addEventListener('pointercancel', stop);
      pressBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); start(e); }
      });
      pressBtn.addEventListener('keyup', stop);
    }
    var releaseBtn = $('#us-release');
    if (releaseBtn) {
      releaseBtn.addEventListener('click', function () { applyPressure(0); });
    }
    var decodeInput = $('#decode-input');
    if (decodeInput) {
      decodeInput.addEventListener('input', runScan);
      decodeInput.addEventListener('change', runScan);
    }
    var decodeClear = $('#decode-clear');
    if (decodeClear) {
      decodeClear.addEventListener('click', function () {
        if (decodeInput) decodeInput.value = '';
        state.decode.matches = null;
        state.decode.selected = null;
        renderDecoder();
        var summary = $('#decode-scan-status');
        if (summary) summary.textContent = 'Nothing pasted yet — your text never leaves this page.';
        if (decodeInput) decodeInput.focus();
      });
    }
    var glossaryFilter = $('#glossary-filter');
    if (glossaryFilter) {
      glossaryFilter.addEventListener('input', function () {
        state.glossary.query = glossaryFilter.value;
        renderGlossary();
      });
    }
    var pumpSpeed = $('#pump-speed');
    if (pumpSpeed) {
      pumpSpeed.addEventListener('input', function () {
        state.pump.speed = Number(pumpSpeed.value);
        renderPumpPanel();
      });
    }
  }

  /* ==================================================================
   * 15. Boot
   * ================================================================== */

  function init() {
    stages.scale = $('[data-figure="scale"]');
    stages.calfVeins = $('[data-figure="calfVeins"]');
    stages.legs = $('[data-figure="legs"]');
    stages.ultrasound = $('[data-figure="ultrasound"]');
    stages.triad = $('[data-figure="triad"]');
    stages.timeline = $('[data-figure="timeline"]');
    stages.embolus = $('[data-figure="embolus"]');
    stages.pump = $('[data-figure="pump"]');
    stages.decoder = $('[data-figure="decoder"]');
    stages.glossary = $('[data-figure="glossary"]');

    renderScale();
    renderVeins();
    renderLegs();
    renderUltrasound();
    renderTriad();
    renderTimeline();
    setStep(0);
    buildTreeForm();
    buildWells();
    renderSourcesList();
    buildPump();
    renderDecoder();
    renderDecoderSheet();
    renderGlossary();
    bind();
    initChrome();

    var note = $('#sym-note');
    if (note) {
      var first = Data.symptoms.filter(function (s) { return s.id === 'erythema'; })[0];
      note.innerHTML = first ? '<b>' + first.label + '</b> — ' + first.note : '';
    }

    /* The two animated plates are far down a long page, so only run their
     * frames while they are actually on screen and the tab is visible. */
    var visible = { embolus: false, pump: false };
    function watchPlate(name, node) {
      if (!node) return;
      if (!('IntersectionObserver' in window)) { visible[name] = true; return; }
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { visible[name] = entry.isIntersecting; });
      }, { rootMargin: '120px' }).observe(node);
    }

    var loop = function (now) {
      var dt = Math.min(0.05, (now - (loop.last || now)) / 1000);
      loop.last = now;
      var active = !document.hidden && !reduceMotion;
      if (active && visible.embolus) embolusFrame(dt);
      if (active && visible.pump) pumpFrame(dt);
      if (reduceMotion && state.emb.playing) state.emb.playing = false;
      window.requestAnimationFrame(loop);
    };
    watchPlate('embolus', stages.embolus);
    watchPlate('pump', stages.pump);
    if (!('IntersectionObserver' in window)) {
      // no observer support: animation is on, but the frame cost is tiny
      visible.embolus = true;
      visible.pump = true;
    }
    window.requestAnimationFrame(loop);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
