#!/usr/bin/env node
/* Rasterise every plate of apps/dvt-explainer to PNG so the layout can be
 * reviewed without a browser.
 *
 *   cd scripts/dvt-explainer-qa && npm run render
 *   -> artifacts/*.png   (gitignored)
 *
 * The CSS custom properties are resolved from styles.css before handing the
 * SVG to resvg, which does not evaluate them itself. This is how the label
 * collisions, clipped callouts and the pump's stray surface vein were found.
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = path.dirname(fileURLToPath(import.meta.url));
const APP = path.resolve(here, '..', '..', 'apps', 'dvt-explainer');
const OUT = path.join(here, 'artifacts');

fs.mkdirSync(OUT, { recursive: true });

const context = { window: {}, console };
vm.createContext(context);
for (const file of ['data.js', 'figures.js']) {
  vm.runInContext(fs.readFileSync(path.join(APP, file), 'utf8'), context, { filename: file });
}
const Data = context.window.DVTData;
const Fig = context.window.DVTFigures;

/* --- resolve :root custom properties for the renderer --- */
const css = fs.readFileSync(path.join(APP, 'styles.css'), 'utf8');
const vars = {};
const rootBlock = css.match(/:root\s*\{([\s\S]*?)\}/);
if (rootBlock) {
  rootBlock[1].replace(/(--[\w-]+)\s*:\s*([^;]+);/g, (m, name, value) => {
    vars[name] = value.trim();
    return m;
  });
}
const resolveVars = (text) => text.replace(/var\((--[\w-]+)(?:\s*,\s*([^)]+))?\)/g,
  (m, name, fallback) => vars[name] || (fallback ? fallback.trim() : '#888'));

/* drop the page-chrome rules but keep everything the plates use */
const plateCss = resolveVars(css.replace(/:root\s*\{[\s\S]*?\}/, ''));

function wrap(svg) {
  return svg
    .replace(/>/, '><rect x="-9999" y="-9999" width="40000" height="40000" fill="#faf7f2"/>')
    .replace(/<svg([^>]*)>/, '<svg$1><style type="text/css"><![CDATA[' + plateCss + ']]></style>');
}

const allSymptoms = Data.symptoms.map((s) => s.id);
const jobs = [
  ['01-scale-leg', Fig.scale(0)],
  ['02-scale-slice', Fig.scale(1)],
  ['03-scale-vein', Fig.scale(2)],
  ['04-scale-valve', Fig.scale(3)],
  ['05-veins-plain', Fig.calfVeins({ valves: true, labels: true })],
  ['06-veins-zones', Fig.calfVeins({ valves: true, labels: true, zones: true })],
  ['07-legs-symptoms', Fig.legs({ diff: 3, symptoms: allSymptoms })],
  ['08-us-dvt-transverse', Fig.ultrasound({ patient: 'dvt', view: 'transverse', doppler: true, labels: true, pressure: 0 })],
  ['09-us-dvt-pressed', Fig.ultrasound({ patient: 'dvt', view: 'transverse', doppler: true, labels: true, pressure: 100 })],
  ['10-us-normal-transverse', Fig.ultrasound({ patient: 'normal', view: 'transverse', doppler: true, labels: true, pressure: 0 })],
  ['11-us-normal-pressed', Fig.ultrasound({ patient: 'normal', view: 'transverse', doppler: true, labels: true, pressure: 100 })],
  ['12-us-long-dvt', Fig.ultrasound({ patient: 'dvt', view: 'long', doppler: true, labels: true })],
  ['13-us-long-normal', Fig.ultrasound({ patient: 'normal', view: 'long', doppler: true, labels: true })],
  ['14-triad', Fig.triad({ active: 'stasis' })],
  ['15-embolus-start', Fig.embolus({ step: 0 })],
  ['16-embolus-mid', Fig.embolus({ step: 3 })],
  ['17-embolus-lung', Fig.embolus({ step: 5 })],
  ['18-pump-walk', Fig.pump({ mode: 'walk' })],
  ['19-pump-still', Fig.pump({ mode: 'still' })]
];

for (const [name, svg] of jobs) {
  const resvg = new Resvg(wrap(svg), {
    fitTo: { mode: 'width', value: 900 },
    font: { loadSystemFonts: true }
  });
  fs.writeFileSync(path.join(OUT, name + '.png'), resvg.render().asPng());
}

/* the HTML plates are dumped as text so their content can be eyeballed too */
fs.writeFileSync(path.join(OUT, 'timeline.html'), Fig.timeline());
fs.writeFileSync(path.join(OUT, 'decoder.html'), Fig.decoder({}));

console.log('rendered ' + jobs.length + ' plates + 2 html dumps to ' + OUT);
