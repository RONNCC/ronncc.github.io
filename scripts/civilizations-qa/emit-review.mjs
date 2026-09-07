// Retain review evidence in the existing CI log without a new workflow/action.
// No tokens or private data are read: only screenshots of this public static app.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const engine = process.argv[2];
if (!['chromium', 'firefox', 'webkit'].includes(engine)) throw new Error('Unknown browser');
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'artifacts', engine);
try {
  const report = JSON.parse(await fs.readFile(path.join(dir, 'summary.json'), 'utf8'));
  console.log('CIV_SUMMARY ' + JSON.stringify(report));
  if (process.env.GITHUB_ACTIONS === 'true') {
    const message = JSON.stringify({ engine, status: report.status, target: report.target, layouts: report.layouts, accessibility: report.accessibility, links: report.links, error: report.error || null });
    const escape = value => value.replaceAll('%', '%25').replaceAll('\r', '%0D').replaceAll('\n', '%0A');
    console.log(`::${report.status === 'passed' ? 'notice' : 'error'} title=Civilization Readers ${engine}::${escape(message)}`);
  }
} catch { console.log(`No ${engine} summary was generated.`); }
console.log('::group::Civilization Readers visual review (extractable image data)');
for (const name of ['routes-390.png', 'map-390-dark.png', 'index-1440.png', 'reader-1440.png', 'graph-canvas-390.png', 'failure.png']) {
  let image;
  try { image = await fs.readFile(path.join(dir, name)); } catch { continue; }
  console.log(`CIV_REVIEW_BEGIN ${engine}/${name}`);
  const data = image.toString('base64');
  for (let i = 0; i < data.length; i += 768) console.log('CIV_REVIEW_DATA ' + data.slice(i, i + 768));
  console.log('CIV_REVIEW_END');
}

console.log('::endgroup::');
