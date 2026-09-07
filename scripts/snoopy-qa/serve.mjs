// Lightweight preview of the standalone Jekyll deck; no production build changes.
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css', '.js':'text/javascript', '.webp':'image/webp', '.png':'image/png', '.jpg':'image/jpeg', '.woff2':'font/woff2', '.json':'application/json' };
export function serve(port = 4173) {
  const server = http.createServer(async (request, response) => {
    try {
      let pathname = decodeURIComponent(new URL(request.url, 'http://preview.invalid').pathname);
      if (pathname === '/') {
        response.writeHead(302, { Location: '/presentations/snoopy.html' }).end(); return;
      }
      if (pathname.split('/').some(part => part.startsWith('.') || ['scripts', 'script'].includes(part))) {
        response.writeHead(404).end(); return;
      }
      const hub = pathname === '/presentations/' || pathname === '/presentations';
      if (hub) pathname = '/presentations/index.md';
      const file = path.resolve(root, `.${pathname}`);
      if (!file.startsWith(`${root}${path.sep}`)) { response.writeHead(404).end(); return; }
      let body = await fs.readFile(file);
      if (path.extname(file) === '.html' || hub) {
        body = body.toString().replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '').replaceAll('{{ site.baseurl }}', '');
        if (hub) body = `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Presentations</title><link rel="stylesheet" href="/presentations/snoopy.css"><main style="max-width:800px;margin:40px auto;padding:24px"><h1>Presentations</h1>${body}</main></html>`;
      }
      response.writeHead(200, { 'Content-Type': hub ? types['.html'] : types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
      response.end(body);
    } catch {
      response.writeHead(404, { 'Content-Type':'text/plain' }).end('Not found');
    }
  });
  return new Promise(resolve => server.listen(port, '0.0.0.0', () => {
    console.log(`Snoopy deck preview listening on 0.0.0.0:${server.address().port}`);
    resolve(server);
  }));
}
if (process.argv[1] === fileURLToPath(import.meta.url)) await serve(Number(process.env.PORT || 4173));
