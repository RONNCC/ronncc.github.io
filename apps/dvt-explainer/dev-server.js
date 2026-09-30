#!/usr/bin/env node
/* Tiny static server for local preview of the standalone pages in this repo.
 *
 * The apps here are raw HTML files with Jekyll front matter (they carry
 * `layout: standalone` + `permalink:` so GitHub Pages injects analytics).
 * Jekyll strips that block; a plain static server would render it as visible
 * text. This server strips it on the fly so the page looks the way it will on
 * the live site.
 *
 *   node apps/dvt-explainer/dev-server.js [port]
 *   -> http://localhost:8080/apps/dvt-explainer/
 */
'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const port = Number(process.argv[2] || process.env.PORT || 8080);
const host = process.env.HOST || '0.0.0.0';

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.md': 'text/plain; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.pdf': 'application/pdf',
  '.woff2': 'font/woff2'
};

function stripFrontMatter(text) {
  if (text.slice(0, 3) !== '---') return text;
  const end = text.indexOf('\n---', 3);
  if (end === -1) return text;
  return text.slice(text.indexOf('\n', end + 1) + 1);
}

function resolveFile(urlPath) {
  let target = path.join(repoRoot, decodeURIComponent(urlPath.split('?')[0]));
  if (!target.startsWith(repoRoot)) return null; // no traversal
  try {
    const stat = fs.statSync(target);
    if (stat.isDirectory()) target = path.join(target, 'index.html');
  } catch (error) {
    if (!path.extname(target)) target += '.html';
  }
  if (!fs.existsSync(target) || !fs.statSync(target).isFile()) return null;
  return target;
}

const server = http.createServer((req, res) => {
  const file = resolveFile(req.url === '/' ? '/index.html' : req.url);
  if (!file) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 — not found: ' + req.url + '\n');
    return;
  }
  const ext = path.extname(file).toLowerCase();
  let body = fs.readFileSync(file);
  if (ext === '.html') body = Buffer.from(stripFrontMatter(body.toString('utf8')), 'utf8');
  res.writeHead(200, {
    'Content-Type': TYPES[ext] || 'application/octet-stream',
    'Cache-Control': 'no-store'
  });
  res.end(body);
});

server.listen(port, host, () => {
  console.log('serving ' + repoRoot);
  console.log('http://localhost:' + port + '/apps/dvt-explainer/');
  console.log('front matter is stripped from .html responses (as Jekyll would)');
});
