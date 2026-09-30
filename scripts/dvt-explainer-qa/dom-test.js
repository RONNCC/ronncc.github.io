#!/usr/bin/env node
/* DOM regression suite for apps/dvt-explainer.
 *
 *   cd scripts/dvt-explainer-qa && npm ci && npm test
 *
 * Loads the real index.html (front matter stripped, as Jekyll does), runs
 * data.js + figures.js + app.js through jsdom, then drives every interactive
 * plate the way a reader would: clicking pills, dragging sliders, pasting
 * report text, filtering the glossary, stepping the embolus, scoring Wells.
 *
 * Complements apps/dvt-explainer/smoke-test.js, which checks the data model
 * and the generated markup offline with no DOM at all.
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const APP = path.resolve(__dirname, '..', '..', 'apps', 'dvt-explainer');
const SCRIPTS = ['data.js', 'figures.js', 'app.js'];

let pass = 0;
let fail = 0;
const problems = [];

function ok(label) { pass += 1; console.log('  ok   ' + label); }
function bad(label, message) { fail += 1; console.log('  FAIL ' + label + ' :: ' + message); }
function t(label, fn) {
  try { fn(); ok(label); } catch (error) { bad(label, error.message || error); }
}
function assert(condition, message) {
  if (!condition) throw new Error(message || 'assertion failed');
}
function read(file) { return fs.readFileSync(path.join(APP, file), 'utf8'); }

/* ---------- boot the page ---------- */
let html = read('index.html').replace(/^---\n[\s\S]*?\n---\n/, '');
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', (e) => problems.push('jsdomError: ' + (e.detail || e.message || e)));
virtualConsole.on('error', (...args) => problems.push('console.error: ' + args.join(' ')));

const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  pretendToBeVisual: true,
  url: 'https://sghose.me/apps/dvt-explainer/',
  virtualConsole
});
const { window } = dom;
const doc = window.document;
window.addEventListener('error', (e) => problems.push('window error: ' + e.message));

for (const file of SCRIPTS) {
  const script = doc.createElement('script');
  script.textContent = read(file);
  doc.head.appendChild(script);
}
doc.dispatchEvent(new window.Event('DOMContentLoaded'));

function click(node) {
  assert(node, 'nothing to click');
  node.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
}
function type(node, value) {
  assert(node, 'nothing to type into');
  node.value = value;
  node.dispatchEvent(new window.Event('input', { bubbles: true }));
}
function stage(name) {
  const node = doc.querySelector('[data-figure="' + name + '"]');
  assert(node, 'no stage for ' + name);
  return node;
}

/* ==========================================================
 * render
 * ========================================================== */
console.log('\nrender');

t('every declared plate rendered and cleared its fallback', () => {
  const stages = Array.from(doc.querySelectorAll('[data-figure]'));
  assert(stages.length === 10, 'expected 10 plates, saw ' + stages.length);
  stages.forEach((s) => {
    const name = s.getAttribute('data-figure');
    assert(s.innerHTML.length > 300, 'stage ' + name + ' is empty');
    assert(!s.querySelector('.fig-fallback'), 'fallback still showing in ' + name);
  });
});

t('svg plates are present with viewBoxes', () => {
  const svgs = doc.querySelectorAll('.fig-svg');
  assert(svgs.length === 7, 'expected 7 svg plates, saw ' + svgs.length);
  svgs.forEach((s) => assert(s.getAttribute('viewBox'), 'missing viewBox'));
});

t('vein map exposes 9 vessels and 9 chips', () => {
  assert(doc.querySelectorAll('.vein-group').length === 9,
    'expected 9 vein groups, saw ' + doc.querySelectorAll('.vein-group').length);
  assert(doc.querySelectorAll('[data-vein-chip]').length === 9, 'expected 9 chips');
});

t('sources rendered with https links and annotations', () => {
  const links = doc.querySelectorAll('#source-list .source-link');
  assert(links.length >= 14, 'expected >= 14 sources, saw ' + links.length);
  assert(/^https:/.test(links[0].getAttribute('href')), 'first source is not https');
  assert(doc.querySelectorAll('#source-list .source-used').length === links.length,
    'every source needs a "used for" line');
});

t('decoder opens on the first category with a hint', () => {
  assert(doc.querySelectorAll('[data-decode]').length >= 7, 'phrase chips missing');
  assert(doc.querySelector('#decode-chips .decode-hint'), 'category hint missing');
  assert(doc.querySelector('[data-figure="decoder"] .decode-empty'), 'empty state missing');
});

t('glossary renders every group with a live count', () => {
  assert(doc.querySelectorAll('.gloss-entry').length >= 25, 'glossary entries missing');
  assert(doc.querySelectorAll('.gloss-group').length === 5, 'expected 5 groups');
  assert(/\d+ of \d+ terms/.test(doc.querySelector('#glossary-status').textContent),
    'status line missing: ' + doc.querySelector('#glossary-status').textContent);
});

t('timeline and Wells list render', () => {
  assert(doc.querySelectorAll('.tl-item').length >= 5, 'timeline items missing');
  assert(doc.querySelectorAll('input[data-wells]').length === 10, 'expected 10 Wells criteria');
});

/* ==========================================================
 * existing plates
 * ========================================================== */
console.log('\nplates');

t('scale explorer steps and updates its readout', () => {
  click(doc.querySelector('[data-scale-go="3"]'));
  assert(doc.querySelector('[data-figure="scale"] .v-scene').getAttribute('data-scene') === '3',
    'scene did not change');
  assert(doc.querySelector('#scale-readout').textContent.includes('Where it usually starts'),
    'readout did not follow');
  click(doc.querySelector('[data-scale-out]'));
  assert(doc.querySelector('#scale-readout').textContent.includes('Open, then filled'),
    'step-out failed');
});

t('vein chip fills the panel and marks the vessel', () => {
  click(doc.querySelector('[data-vein-chip="peroneal"]'));
  assert(doc.querySelector('#vein-panel').textContent.includes('Peroneal'), 'panel did not update');
  assert(doc.querySelector('.vein-group[data-vein="peroneal"]').classList.contains('is-selected'),
    'no selection class');
});

t('vein zone toggle hides and shows the proximal/distal layer', () => {
  const btn = doc.querySelector('[data-vein-toggle="zones"]');
  click(btn);
  assert(btn.getAttribute('aria-pressed') === 'true', 'aria-pressed not set');
  assert(!doc.querySelector('.v-layer--zones').classList.contains('is-hidden'), 'zones still hidden');
  assert(doc.querySelector('.v-zone--distal') && doc.querySelector('.v-zone--proximal'),
    'zone shapes missing');
  click(btn);
  assert(doc.querySelector('.v-layer--zones').classList.contains('is-hidden'), 'zones not hidden again');
});

t('clear selection resets the panel', () => {
  click(doc.querySelector('[data-vein-clear]'));
  assert(doc.querySelector('#vein-panel').textContent.includes('Click a vein'), 'panel not reset');
  assert(!doc.querySelector('.vein-group.is-selected'), 'selection not cleared');
});

t('symptom toggles add and remove layers', () => {
  const btn = doc.querySelector('[data-sym="tenderness"]');
  click(btn);
  assert(btn.getAttribute('aria-pressed') === 'true', 'symptom not pressed');
  assert(doc.querySelector('.sym-tenderness.is-on'), 'layer not switched on');
  click(btn);
  assert(!doc.querySelector('.sym-tenderness.is-on'), 'layer not switched off');
});

t('swell slider drives the readout and the Wells badge', () => {
  const slider = doc.querySelector('#swell-slider');
  type(slider, '1');
  assert(doc.querySelector('#swell-readout').textContent.includes('1.0 cm'), 'readout wrong');
  assert(doc.querySelector('#swell-badge').getAttribute('data-state') === 'off',
    'badge should be off below 3 cm');
  type(slider, '4.5');
  assert(doc.querySelector('#swell-badge').getAttribute('data-state') === 'on',
    'badge should be on at 4.5 cm');
});

t('ultrasound: a clotted vein resists the probe, a healthy one collapses', () => {
  const biggest = () => Array.from(doc.querySelectorAll('[data-us-part="vein-wall"]'))
    .sort((a, b) => Number(b.getAttribute('data-ry')) - Number(a.getAttribute('data-ry')))[0];
  const slider = doc.querySelector('#us-pressure');
  type(slider, '100');
  assert(Number(biggest().getAttribute('ry')) > 30,
    'clotted vein compressed too far: ' + biggest().getAttribute('ry'));
  assert(doc.querySelector('#us-lumen').textContent.match(/\d+%/), 'lumen readout missing');
  click(doc.querySelector('[data-us-patient="normal"]'));
  assert(Number(biggest().getAttribute('ry')) < 6,
    'healthy vein should be obliterated, ry=' + biggest().getAttribute('ry'));
});

t('ultrasound: long view, doppler and labels all re-render', () => {
  click(doc.querySelector('[data-us-patient="dvt"]'));
  click(doc.querySelector('[data-us-view="long"]'));
  assert(doc.querySelector('.v-us-caliper'), 'long view should show calipers');
  assert(doc.querySelector('.v-us-thrombus--long'), 'long view should show the clot');
  click(doc.querySelector('[data-us-toggle="doppler"]'));
  assert(doc.querySelector('.v-us-flowlayer'), 'no doppler layer');
  click(doc.querySelector('[data-us-toggle="labels"]'));
  assert(!doc.querySelector('.v-us-leader'), 'labels should be hidden');
  click(doc.querySelector('[data-us-toggle="doppler"]'));
  click(doc.querySelector('[data-us-view="transverse"]'));
  assert(doc.querySelector('.v-us-thrombus'), 'no thrombus in dvt mode');
});

t('triad arm and risk factor both update the panel', () => {
  click(doc.querySelector('[data-triad="hyper"]'));
  assert(doc.querySelector('#triad-panel').textContent.includes('Hypercoagulability'),
    'triad panel wrong');
  click(doc.querySelector('[data-risk-chip="Smoking"]'));
  assert(doc.querySelector('#triad-panel').textContent.includes('Risk factor'), 'risk panel wrong');
  assert(doc.querySelector('.tri-node[data-triad="hyper"]').classList.contains('is-active'),
    'arm not highlighted');
});

t('embolus steps advance the panel, counter and highlight', () => {
  click(doc.querySelector('[data-emb-step="1"]'));
  assert(doc.querySelector('#emb-counter').textContent.includes('Step 2 of 6'),
    'counter: ' + doc.querySelector('#emb-counter').textContent);
  assert(doc.querySelector('#emb-panel').textContent.includes('popliteal'), 'panel did not advance');
  assert(doc.querySelectorAll('.emb-seg.is-live').length === 2, 'expected 2 live segments');
  assert(/translate\(/.test(doc.querySelector('[data-emb-dot]').getAttribute('transform')),
    'traveller not positioned');
});

t('embolus play toggles', () => {
  const play = doc.querySelector('#emb-play');
  click(play);
  assert(play.textContent === 'Pause', 'play did not start');
  click(play);
  assert(play.textContent === 'Play the journey', 'play did not stop');
});

t('management tree switches branch, including the bleeding-risk path', () => {
  const tick = (selector) => {
    const input = doc.querySelector(selector);
    input.checked = true;
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
  };
  tick('input[name="risk"][value="cancer"]');
  assert(doc.querySelector('#tree-output').textContent.includes('Anticoagulate'),
    'should recommend treatment');
  tick('input[name="bleed"][value="high"]');
  assert(doc.querySelector('#tree-output').textContent.includes('bleeding risk is high'),
    'bleed branch not taken');
});

t('Wells score adds and subtracts correctly and tiers', () => {
  const tick = (id, on) => {
    const input = doc.querySelector('input[data-wells="' + id + '"]');
    input.checked = on;
    input.dispatchEvent(new window.Event('change', { bubbles: true }));
  };
  tick('calf', true);
  assert(doc.querySelector('.wells-score-num').textContent.trim() === '1', 'score should be 1');
  assert(doc.querySelector('.wells-tier').textContent.includes('unlikely'), 'should be unlikely at 1');
  tick('cancer', true);
  tick('prior', true);
  assert(doc.querySelector('.wells-score-num').textContent.trim() === '3', 'score should be 3');
  assert(doc.querySelector('.wells-tier').textContent.includes('likely'), 'should be likely at 3');
  tick('alt', true);
  assert(doc.querySelector('.wells-score-num').textContent.trim() === '1', '−2 should give 1');
});

t('pump modes switch copy and root state', () => {
  click(doc.querySelector('[data-pump-mode="still"]'));
  assert(stage('pump').querySelector('.fig-pump').getAttribute('data-mode') === 'still',
    'root mode not set');
  assert(doc.querySelector('#pump-panel').textContent.includes('the pump is off'), 'copy wrong');
  click(doc.querySelector('[data-pump-mode="walk"]'));
  assert(doc.querySelector('#pump-panel').textContent.includes('the pump is working'), 'copy wrong');
  assert(doc.querySelectorAll('.pump-particle').length >= 18, 'particles missing');
});

/* ==========================================================
 * report decoder
 * ========================================================== */
console.log('\ndecoder');

t('category tabs swap the phrase chips', () => {
  const before = doc.querySelectorAll('[data-decode]').length;
  click(doc.querySelector('[data-decode-tab="plan"]'));
  assert(doc.querySelector('[data-decode-tab="plan"]').getAttribute('aria-pressed') === 'true',
    'tab not pressed');
  assert(doc.querySelector('[data-decode="anticoagulation"]'), 'plan phrases missing');
  assert(doc.querySelectorAll('[data-decode]').length !== before || before > 0, 'chips did not change');
});

t('clicking a phrase shows its decoded card', () => {
  click(doc.querySelector('[data-decode="anticoagulation"]'));
  const card = doc.querySelector('[data-figure="decoder"] .decode-card');
  assert(card, 'no decoded card rendered');
  assert(card.textContent.includes('Anticoagulation'), 'card is for the wrong phrase');
  assert(card.querySelector('.decode-ask'), 'card should carry a question to ask');
});

t('vessel phrases offer a cross-link that selects the vessel on the map', () => {
  click(doc.querySelector('[data-decode-tab="location"]'));
  click(doc.querySelector('[data-decode="axial"]'));   // "peroneal / posterior tibial"
  const link = doc.querySelector('[data-figure="decoder"] [data-vein-link]');
  assert(link, 'no cross-link rendered');
  click(link);
  assert(doc.querySelector('.vein-group[data-vein="peroneal"]').classList.contains('is-selected'),
    'cross-link did not select the vessel');
  assert(doc.querySelector('#vein-panel').textContent.includes('Peroneal'),
    'cross-link did not update the vein panel');
});

t('pasting a report decodes it, in the order the phrases appear', () => {
  const sample = 'Acute non-occlusive thrombus within the left peroneal and posterior tibial '
    + 'veins, extending to within 1.5 cm of the popliteal vein. No extension on repeat scan.';
  type(doc.querySelector('#decode-input'), sample);
  const results = doc.querySelector('[data-figure="decoder"] .decode-results');
  assert(results, 'no results panel rendered');
  const text = results.textContent;
  assert(/Acute/.test(text), 'should recognise "acute"');
  assert(/Non-occlusive/.test(text), 'should recognise "non-occlusive"');
  assert(/Peroneal/.test(text), 'should recognise "peroneal"');
  assert(/Popliteal/.test(text), 'should recognise "popliteal vein"');
  assert(/Extensive/.test(text), 'should recognise "extending"');
  assert(doc.querySelector('#decode-scan-status').textContent.includes('Recognised'),
    'status line did not update');
});

t('word-boundary matching does not fire on substrings', () => {
  // "subacute" must not match "acute"; "internal" must not match "inr"
  type(doc.querySelector('#decode-input'), 'Subacute presentation. No internal bleeding.');
  const results = doc.querySelector('[data-figure="decoder"] .decode-results, '
    + '[data-figure="decoder"] .decode-none');
  assert(results, 'no output rendered');
  assert(!/Acute/.test(results.textContent), '"subacute" incorrectly matched "acute"');
  assert(!/INR/.test(results.textContent), '"internal" incorrectly matched "inr"');
});

t('unrecognised text explains itself rather than failing silently', () => {
  type(doc.querySelector('#decode-input'), 'Lorem ipsum dolor sit amet, consectetur.');
  assert(doc.querySelector('[data-figure="decoder"] .decode-none'),
    'should show the nothing-recognised message');
  assert(doc.querySelector('#decode-scan-status').textContent.includes('No listed phrases'),
    'status line wrong');
});

t('clear empties the box and restores the empty state', () => {
  click(doc.querySelector('#decode-clear'));
  assert(doc.querySelector('#decode-input').value === '', 'textarea not cleared');
  assert(doc.querySelector('[data-figure="decoder"] .decode-empty'), 'empty state not restored');
  assert(doc.querySelector('#decode-scan-status').textContent.includes('never leaves this page'),
    'status not reset');
});

t('every phrase in the data can be decoded without throwing', () => {
  const phrase = doc.querySelector('[data-decode-tab="extent"]');
  click(phrase);
  Array.from(doc.querySelectorAll('[data-decode]')).forEach((chip) => {
    click(chip);
    const card = doc.querySelector('[data-figure="decoder"] .decode-card');
    assert(card, 'no card for ' + chip.getAttribute('data-decode'));
    assert(card.textContent.length > 80, 'card too thin for ' + chip.getAttribute('data-decode'));
  });
});

/* ==========================================================
 * glossary
 * ========================================================== */
console.log('\nglossary');

t('filter narrows the list and reports the count', () => {
  const total = doc.querySelectorAll('.gloss-entry').length;
  type(doc.querySelector('#glossary-filter'), 'stocking');
  const shown = doc.querySelectorAll('.gloss-entry').length;
  assert(shown > 0 && shown < total, 'filter did not narrow: ' + shown + '/' + total);
  assert(doc.querySelector('#glossary-status').textContent.trim()
    === shown + ' of ' + total + ' terms', 'count line wrong');
});

t('filtering searches definitions, not just terms', () => {
  type(doc.querySelector('#glossary-filter'), 'popliteal');
  const text = doc.querySelector('[data-figure="glossary"]').textContent;
  assert(/Distal/.test(text) || /Popliteal/.test(text), 'expected matches for "popliteal"');
});

t('a filter with no matches says so instead of rendering blank', () => {
  type(doc.querySelector('#glossary-filter'), 'zzzzqqq');
  assert(doc.querySelector('.gloss-none'), 'no empty-state message');
  assert(doc.querySelector('#glossary-status').textContent.trim().startsWith('0 of'),
    'count should be zero');
});

t('clearing the filter restores every term', () => {
  type(doc.querySelector('#glossary-filter'), '');
  assert(doc.querySelectorAll('.gloss-entry').length === 30,
    'expected 30 terms, saw ' + doc.querySelectorAll('.gloss-entry').length);
});

/* ==========================================================
 * chrome + animation
 * ========================================================== */
setTimeout(() => {
  console.log('\nchrome');

  t('table of contents links all resolve', () => {
    const links = Array.from(doc.querySelectorAll('#toc-list a'));
    assert(links.length === 11, 'expected 11 chapters, saw ' + links.length);
    links.forEach((a) => {
      const id = a.getAttribute('href').slice(1);
      assert(doc.getElementById(id), 'missing chapter #' + id);
    });
  });

  t('the reading-progress bar has a width', () => {
    const fill = doc.querySelector('#readbar-fill');
    assert(fill && fill.style.width !== '', 'progress bar not initialised');
  });

  t('no runtime errors were reported during the whole run', () => {
    assert(problems.length === 0, problems.join(' | '));
  });

  console.log('\n' + pass + ' passed, ' + fail + ' failed');
  if (problems.length) console.log('problems:\n - ' + problems.join('\n - '));
  process.exit(fail ? 1 : 0);
}, 350);
