// Preview the standalone Civilization Readers pages without a Jekyll install.
// Front matter is stripped; production analytics injection is checked separately.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.webmanifest': 'application/manifest+json', '.png': 'image/png'
};
export function serve(port = 4174, { fixtures = false } = {}) {
  const server = http.createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url, 'http://preview.invalid').pathname);
      if (pathname === '/' || pathname === '/civilizations') {
        response.writeHead(302, { Location: '/civilizations/' }).end();
        return;
      }
      if (!pathname.startsWith('/civilizations/') || pathname.split('/').some(p => p.startsWith('.'))) {
        response.writeHead(404).end();
        return;
      }
      if (fixtures && pathname === '/civilizations/__qa_legacy_sw.js') {
        response.writeHead(200, { 'Content-Type': types['.js'], 'Cache-Control': 'no-store' });
        response.end(await fs.readFile(path.join(root, 'scripts/civilizations-qa/legacy-sw.js')));
        return;
      }
      if (pathname.endsWith('/')) pathname += 'index.html';
      const file = path.resolve(root, `.${pathname}`);
      if (!file.startsWith(`${root}/civilizations/`)) {
        response.writeHead(404).end();
        return;
      }
      let body = await fs.readFile(file);
      if (path.extname(file) === '.html') {
        body = body.toString().replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
      }
      response.writeHead(200, {
        'Content-Type': types[path.extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store'
      });
      response.end(body);
    } catch {
      response.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  });
  return new Promise(resolve => server.listen(port, '0.0.0.0', () => {
    console.log(`Civilization Readers preview: http://0.0.0.0:${server.address().port}/civilizations/`);
    resolve(server);
  }));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await serve(Number(process.env.PORT || 4174));
