# Civilization Readers

A pocket primer for the museum. Pick a civilization, scan the **visual timeline**, read
the **context**, then **go deeper** period by period — with a cheat sheet for what you'll
actually see on display (and where to see it, e.g. the de Young or the Met).

## Built for use inside a museum

- **Works offline** — a service worker caches the whole site, so it loads with no signal
  (e.g. in a museum basement). On phones it's installable ("Add to Home Screen") via the
  web app manifest.
- **Dark / low-light mode** — tap the 🌙 toggle for dimly lit galleries; it also follows
  your system preference and remembers your choice.
- **"In 30 seconds" quick read** — four glanceable bullets at the top of every reader.
- **"At the Met" line** — actual Met gallery numbers for each civilization (e.g. Egyptian
  Art is Galleries 100–138, the Temple of Dendur is Gallery 131).
- **Met floor-by-floor route** (`met.html`) — the Met's galleries mapped to the readers that
  cover them, grouped by floor (including The Met Cloisters). The Rockefeller Wing is split
  into Arts of Africa, the Ancient Americas, and Oceania.
- **SF & Smithsonian routes** — `sf.html` (de Young, Legion of Honor, Asian Art Museum,
  Rosicrucian Egyptian Museum) and `smithsonian.html` (Natural History, Asian Art, African
  Art, American Indian).
- **A graph view** (`routes.html`) — museums, galleries, and civilizations are structured
  internally as a graph (`MUSEUMS` + `CIV_RELATIONS` in `data.js`), then rendered as an
  interactive force-directed network: hover to inspect, click to open, drag to pan, scroll
  to zoom, and filter by node type or region.

## Coverage

32 civilizations across six regions — the Mediterranean and Near East, Asia, **Africa**
(including peoples and cultures like the Yoruba & Ife, the Ewe, the Asante, the Dogon, the
Fang, and the Kongo — not just kingdoms), the Americas, **Oceania** (the Māori and the
Asmat), and the medieval world.

## Structure

- `index.html` — landing page (cards grouped by region, plus a search box and a master "all civilizations at a glance" timeline)
- `reader.html` — the reader template; load with `?c=<slug>` (e.g. `reader.html?c=egypt`)
- `routes.html` — museums + graph hub; `met.html` / `sf.html` / `smithsonian.html` — route pages
- `data.js` — all civilization content plus the `MUSEUMS` (route graph) and `CIV_RELATIONS` (relationship edges)
- `data.js` — all civilization content (edit this to add or change civilizations)
- `app.js` — rendering logic (cards, timeline, world ruler, master timeline, search, detail sections, theme)
- `styles.css` — styling (light + dark)
- `sw.js` — service worker (offline cache); `manifest.webmanifest` + `icons/` — installable app
- `metadata.json` — app metadata

## Adding a civilization

Add an entry to the `CIVILIZATIONS` array in `data.js` following the existing schema:

```js
{
  slug: "my-civ",
  name: "...",
  emoji: "...",
  accent: "#hexcolor",
  group: "...",
  region: "...",
  start: <numeric year, BCE negative>,
  end: <numeric year, CE positive>,
  spanLabel: "...",
  tagline: "...",
  overview: "...",
  quick: ["four short glanceable bullets"],
  met: "At the Met — gallery numbers and a don't-miss tip",
  context: { bigPicture, geography, keyIdeas: [{t,d}], spotIt: [{t,d}] },
  periods: [{ name, years, start, end, summary, detail }],
  events: [{ year, label, detail }],
  museum: { see: [...], lingo: [{t,d}], where: [...] }
}
```

Year convention: BCE is negative (e.g. `-3100` = 3100 BCE), CE is positive.

Group display order on the landing page is controlled by the `GROUP_ORDER` array in
`data.js`; any group not listed there is appended at the end.

> Note: bump the `CACHE` version in `sw.js` when you change content so returning visitors
> get fresh data.
