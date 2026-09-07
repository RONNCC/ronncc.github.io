/* Test-only fixture: the v7 cache-first shell has no app.js/update listener.
 * This file lives under excluded scripts/, never on the production site.
 */
const CACHE = 'civ-readers-v7';
const html = `<!doctype html><html lang="en"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Legacy Civilization Reader</title><link rel="stylesheet" href="styles.css"><body><main id="legacy-reader"><h1>Legacy reader</h1><p>Broken cached layout</p></main><script>window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', {updateViaCache: 'none'}));</script></body></html>`;
self.addEventListener('install', event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  for (const file of ['./', './index.html', './reader.html']) {
    await cache.put(new URL(file, self.registration.scope).href, new Response(html, { headers: { 'Content-Type': 'text/html' } }));
  }
  await cache.put(new URL('styles.css', self.registration.scope).href, new Response('body { font-family: serif; }', { headers: { 'Content-Type': 'text/css' } }));
  await self.skipWaiting();
})()));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.open(CACHE).then(async cache => (await cache.match(event.request, { ignoreSearch: true })) || fetch(event.request)));
});
