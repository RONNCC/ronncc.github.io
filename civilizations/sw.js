/* Civilization Readers — atomic, versioned offline app shell.
 * Bump CACHE whenever a shipped HTML/CSS/JS asset changes. A complete release is
 * cached before activation, so a reader never mixes an old shell with new styles.
 * Only this app's assets/caches are touched; analytics and other apps pass through.
 */
const CACHE_PREFIX = "civ-readers-";
const CACHE = "civ-readers-v8";
const ASSETS = [
  "./", "./index.html", "./reader.html", "./met.html", "./routes.html",
  "./world.js", "./sf.html", "./smithsonian.html", "./london.html",
  "./paris.html", "./berlin.html", "./template.html", "./objects.html",
  "./tours.html", "./guide.html", "./styles.css", "./app.js", "./data.js",
  "./manifest.webmanifest", "./icons/icon-180.png", "./icons/icon-192.png",
  "./icons/icon-512.png", "./icons/maskable-512.png"
];
const assetURLs = new Set(ASSETS.map((asset) => new URL(asset, self.registration.scope).href));

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.addAll(ASSETS.map((asset) => new Request(asset, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const oldCaches = (await caches.keys()).filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE);
    // v7's broken index did not load app.js, so it has no update listener.
    // Recover those already-open legacy pages once, without touching other apps.
    const recoverLegacy = oldCaches.includes("civ-readers-v7");
    await Promise.all(oldCaches.map((key) => caches.delete(key)));
    await self.clients.claim();
    if (recoverLegacy) {
      const clients = await self.clients.matchAll({ type: "window" });
      // Do not await navigation inside activate: its fetch waits for activation
      // to finish, so awaiting it here would deadlock the legacy upgrade.
      clients.filter((client) => client.url.startsWith(self.registration.scope))
        .forEach((client) => { client.navigate(client.url).catch(() => {}); });
    }
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  // Query parameters choose content within the reader shell; they are not new assets.
  url.search = "";
  url.hash = "";
  if (!assetURLs.has(url.href)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    return (await cache.match(url.href)) || fetch(event.request);
  })());
});
