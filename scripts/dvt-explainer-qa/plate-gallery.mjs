#!/usr/bin/env node
/* Build a single reviewable page containing every plate in the app.
 *
 *   cd scripts/dvt-explainer-qa && npm run gallery
 *   -> artifacts/plate-gallery.html
 *
 * The plate builders emit standalone SVG/HTML, so they can be reassembled
 * outside the app shell and looked at all at once — useful for spotting a
 * plate that only looks wrong in company. The file is gitignored; it is a
 * review aid, not part of the deliverable. With the dev server running it
 * is reachable at /scripts/dvt-explainer-qa/artifacts/plate-gallery.html
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(here, '..', '..', 'apps', 'dvt-explainer');
const OUT = path.join(here, 'artifacts');

const context = { window: {}, console };
vm.createContext(context);
for (const file of ['data.js', 'figures.js']) {
  vm.runInContext(fs.readFileSync(path.join(APP, file), 'utf8'), context, { filename: file });
}
const Data = context.window.DVTData;
const Fig = context.window.DVTFigures;

const css = fs.readFileSync(path.join(APP, 'styles.css'), 'utf8');
const allSymptoms = Data.symptoms.map((s) => s.id);

const plates = [
  ['Fig. 1 — Scale explorer', 'step 1: the whole calf', Fig.scale(0)],
  ['Fig. 1 — Scale explorer', 'step 2: a slice through the calf', Fig.scale(1)],
  ['Fig. 1 — Scale explorer', 'step 3: one vein, opened', Fig.scale(2)],
  ['Fig. 1 — Scale explorer', 'step 4: the valve pocket where clots start', Fig.scale(3)],
  ['Fig. 2 — Veins of the calf', 'default state', Fig.calfVeins({ valves: true, labels: true })],
  ['Fig. 2 — Veins of the calf', 'proximal / distal zones revealed', Fig.calfVeins({ valves: true, labels: true, zones: true })],
  ['Fig. 3 — Symptoms', 'all findings on, 3 cm of swelling', Fig.legs({ diff: 3, symptoms: allSymptoms })],
  ['Fig. 4 — Ultrasound', 'clot, transverse, probe relaxed', Fig.ultrasound({ patient: 'dvt', view: 'transverse', doppler: true, labels: true, pressure: 0 })],
  ['Fig. 4 — Ultrasound', 'clot, transverse, probe pressing hard', Fig.ultrasound({ patient: 'dvt', view: 'transverse', doppler: true, labels: true, pressure: 100 })],
  ['Fig. 4 — Ultrasound', 'healthy vein, transverse, pressing hard', Fig.ultrasound({ patient: 'normal', view: 'transverse', doppler: true, labels: true, pressure: 100 })],
  ['Fig. 4 — Ultrasound', 'clot in long view, with calipers', Fig.ultrasound({ patient: 'dvt', view: 'long', doppler: true, labels: true })],
  ['Fig. 4 — Ultrasound', 'healthy vein in long view', Fig.ultrasound({ patient: 'normal', view: 'long', doppler: true, labels: true })],
  ['Fig. 5 — Virchow&rsquo;s triad', 'stasis selected', Fig.triad({ active: 'stasis' })],
  ['Fig. 6 — Timeline', 'natural history', Fig.timeline()],
  ['Fig. 7 — The journey', 'step 1, clot still in the calf', Fig.embolus({ step: 0 })],
  ['Fig. 7 — The journey', 'step 4, clot in the thigh', Fig.embolus({ step: 3 })],
  ['Fig. 7 — The journey', 'step 6, clot lodged in the lung', Fig.embolus({ step: 5 })],
  ['Fig. 8 — Calf muscle pump', 'walking', Fig.pump({ mode: 'walk' })],
  ['Fig. 8 — Calf muscle pump', 'sitting still', Fig.pump({ mode: 'still' })],
  ['Fig. 11 — Report decoder', 'nothing selected', Fig.decoder({})],
  ['Fig. 11 — Report decoder', 'a phrase opened', Fig.decoder({ entry: Data.reportPhrases.filter((p) => p.id === 'freefloating')[0] })],
  ['Fig. 11 — Report decoder', 'a phrase that names vessels', Fig.decoder({ entry: Data.reportPhrases.filter((p) => p.id === 'axial')[0] })],
  ['Fig. 11 — Report decoder', 'a whole report pasted in', Fig.decoder({ matches: Data.reportPhrases.filter((p) => ['acute', 'nonocclusive', 'axial', 'popliteal', 'extensive'].indexOf(p.id) !== -1) })],
  ['Fig. 11 — Report decoder', 'phrase chips for one category', Fig.decoderChips({ category: 'location' })],
  ['Fig. 12 — Glossary', 'everything', Fig.glossary({})],
  ['Fig. 12 — Glossary', 'filtered to "clot"', Fig.glossary({ query: 'clot' })],
  ['Fig. 12 — Glossary', 'no matches', Fig.glossary({ query: 'zzz' })],
  ['Print appendix', 'what goes on paper', Fig.decoderSheet()]
];

const sections = plates.map(([title, note, markup]) => `
  <section class="shot">
    <h3>${title} <span class="note">${note}</span></h3>
    ${markup}
  </section>`).join('');

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>DVT explainer — plate gallery</title>
<style>
${css}
</style>
<style>
  /* review chrome only; never part of the app */
  body { background: #eef1f6; }
  .gallery { max-width: 1180px; margin: 0 auto; padding: 32px 20px 80px; }
  .gallery h1 { font-size: 1.6rem; margin: 0 0 .3em; }
  .gallery .lede { color: var(--ink-3); max-width: 70ch; }
  .shot {
    background: var(--paper-2); border: 1px solid var(--rule); border-radius: 8px;
    padding: 16px 18px; margin: 22px 0; box-shadow: 0 1px 3px rgba(0,0,0,.06);
  }
  .shot > h3 {
    margin: 0 0 12px; font-size: .82rem; font-family: var(--sans); letter-spacing: .06em;
    text-transform: uppercase; color: var(--ink-3); border-bottom: 1px solid var(--rule); padding-bottom: 8px;
  }
  .shot .note { text-transform: none; letter-spacing: 0; color: var(--thrombus); font-weight: 600; }
  .shot .fig-svg { max-width: 620px; margin: 0 auto; }
  .shot .gloss-group, .shot .decode-card { max-width: 620px; }
  @media print {
    body { background: #fff; }
    .shot { break-inside: avoid; }
  }
</style>
</head>
<body>
<div class="gallery">
  <h1>Deep Vein Thrombosis, Up Close — every plate</h1>
  <p class="lede">
    Generated from <code>apps/dvt-explainer/figures.js</code> with the app&rsquo;s own
    <code>styles.css</code>, so what you see here is what the page renders. Use this page to
    review plates side by side; the live app is at
    <a href="/apps/dvt-explainer/">/apps/dvt-explainer/</a>.
    Regenerate with <code>npm run gallery</code>.
  </p>
  ${sections}
</div>
</body>
</html>
`;

fs.mkdirSync(OUT, { recursive: true });
fs.writeFileSync(path.join(OUT, 'plate-gallery.html'), page);
console.log('gallery written: ' + path.join(OUT, 'plate-gallery.html') + ' (' + plates.length + ' states)');
