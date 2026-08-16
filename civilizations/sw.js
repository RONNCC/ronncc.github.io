/* Civilization Readers — service worker
 * Cache-first (stale-while-revalidate) so the site works offline,
 * e.g. in a museum basement with no signal.
 */
const CACHE = "civ-readers-v6";
const ASSETS = [
  "./",
  "./index.html",
  "./reader.html",
  "./met.html",
  "./routes.html",
  "./world.js",
  "./sf.html",
  "./smithsonian.html",
  "./london.html",
  "./paris.html",
  "./berlin.html",
  "./template.html",
  "./objects.html",
  "./tours.html",
  "./guide.html",
  "./styles.css",
  "./app.js",
  "./data.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then((cached) => {
      const network = fetch(e.request)
        .then((res) => {
          if (res && res.status === 200 && (res.type === "basic" || res.type === "cors")) {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
