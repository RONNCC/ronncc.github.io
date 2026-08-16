# Civilization Readers

A pocket primer for the museum. Pick a civilization, scan the **visual timeline**, read
the **context**, then **go deeper** period by period — with a cheat sheet for what you'll
actually see on display (and where to see it, e.g. the de Young, the Met, or the British
Museum).

## Built for use inside a museum

Assume the reader is one-handed, on a phone, standing in a dim gallery with no signal in
front of an object whose label says "Figure. Wood." That assumption drives every choice
below.

- **Mobile-first** — a thumb-reachable bottom tab bar on phones (it becomes a top pill bar
  on desktop), 44px+ tap targets, horizontally scrolling section jump-chips, single-column
  grids on narrow screens, and wide SVG timelines in proper scroll containers.
- **Works offline** — a service worker caches the whole site, so it loads with no signal
  (e.g. in a museum basement). On phones it's installable ("Add to Home Screen") via the
  web app manifest.
- **Dark / low-light mode** — tap the 🌙 toggle for dimly lit galleries; it also follows
  your system preference and remembers your choice.
- **"In 30 seconds" quick read** — four glanceable bullets at the top of every reader,
  with a **Listen** button that speaks them aloud using the browser's built-in speech
  synthesis (no network, no key — so it still works offline).
- **Gallery numbers** — actual gallery/room numbers for each civilization (e.g. the Temple
  of Dendur is Met Gallery 131; the Rosetta Stone is British Museum Room 4).
- **Print-friendly** — printing strips the navigation and graph and force-opens every
  collapsed period, so you can carry a paper copy.

## What's in it

- **53 civilizations and peoples** across six regions — the Mediterranean and Near East
  (including the Hittites, Phoenicia & Carthage, the Etruscans, and Saba/ancient Yemen),
  Asia (the Cholas, Srivijaya, the Mughals, the Ottomans), **Africa** (Aksum, Igbo-Ukwu,
  the Yoruba & Ife, the Bamana, the Senufo, the Chokwe, the Dogon, the Fang, the Kongo —
  peoples and cultures, not just kingdoms), the **Americas** (Chavín, Nazca, Moche, Chimú,
  the Taíno), **Oceania** (Rapa Nui, Tonga, Aboriginal Australia, the Sepik peoples, the
  Māori, the Asmat), and the medieval world.
- **Masterpiece deep dives** (`objects.html`) — one iconic object per civilization with a
  60-second read and a "look for this" list: the Rosetta Stone, the Ishtar Gate, a Benin
  plaque, a Yaxchilán lintel, the Nataraja, a moai, the Standard of Ur, and more.
- **"Start here" tours** (`tours.html`) — timed routes with stop-by-stop directions: 90
  minutes at the Met, 75 at the de Young, 120 across the Smithsonian, 90 at the British
  Museum, 120 at the Louvre.
- **Museum route pages** — `met.html` (floor by floor, including The Met Cloisters),
  `sf.html` (de Young, Legion of Honor, Asian Art Museum, Rosicrucian Egyptian Museum),
  `smithsonian.html` (Natural History, Asian Art, African Art, American Indian),
  `london.html` (British Museum, room by room), `paris.html` (the Louvre, wing by wing),
  `berlin.html` (Museum Island & the Humboldt Forum), and `template.html` — a generic
  "encyclopedic museum" skeleton you can copy to add your own.
- **A geographic museum map** (`routes.html`) — every museum plotted where it actually
  stands — New York, the Bay Area, Washington DC, London, Paris, and Berlin — on an
  offline map bundled with the site (`world.js`, Natural Earth 1:110m land polygons
  projected to equirectangular). Museums within ~1.1° of each other share one pin (the
  four Smithsonian buildings, the four Bay Area museums); tap a pin for the museums
  there, and use **Fit museums** / **World** to zoom the view.
- **A connection graph** (`routes.html`, below the map) — museums, galleries,
  civilizations, **and objects** are structured internally as a graph (`MUSEUMS`,
  `CIV_RELATIONS`, `MASTERPIECES` in `data.js`) and rendered as an interactive
  force-directed network. Edges are typed and colour-coded: neighbour, contemporary,
  successor/predecessor, influence, region, **trade** (Indus–Mesopotamia), **script**
  (Phoenician→Greek), **conquest** (Persia→Egypt), and **religious spread**
  (Gupta→Southeast Asia). There's a **time slider** that fades civs in and out as the
  years scroll, **drill-down** (tap a museum twice to collapse or expand its galleries
  in place), type/region filters, pinch-zoom and one-finger pan.
- **A how-to-read-a-museum guide** (`guide.html`) — what to do when the label is thin, a
  20-term glossary of the words labels use without explaining (repoussé, faience, slip,
  provenance…), and a reference list of further reading and collection databases.

## Structure

- `index.html` — landing page (cards grouped by region, a search box, and a master "all
  civilizations at a glance" timeline)
- `reader.html` — the reader template; load with `?c=<slug>` (e.g. `reader.html?c=egypt`)
- `objects.html` / `tours.html` / `guide.html` — masterpieces, timed tours, and the
  how-to-read/glossary/references guide
- `routes.html` — museums on a geographic map, plus the connection graph hub
- `met.html`, `sf.html`, `smithsonian.html`, `london.html`, `paris.html`, `berlin.html`,
  `template.html` — museum route pages
- `data.js` — all content: `CIVILIZATIONS`, `MUSEUMS` (the route graph, with `lat`/`lon`
  for the map), `CIV_RELATIONS` (typed relationship edges), `MASTERPIECES`, `TOURS`,
  `RESOURCES`, `GLOSSARY`
- `world.js` — Natural Earth 1:110m land polygons (public domain), projected to
  equirectangular and simplified, used only by the map on `routes.html`
- `app.js` — rendering logic (cards, timelines, world ruler, graph, tours, search,
  narration, theme)
- `styles.css` — styling (light + dark, mobile-first)
- `sw.js` — service worker (offline cache); `manifest.webmanifest` + `icons/` — installable
- `metadata.json` — app metadata

Every HTML page is the same shell: it differs only by `<title>`, its meta description, and
its `data-page` attribute, which `app.js` uses to dispatch to the right render function.

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

To put the new civilization on a museum page, add its slug to the relevant area's `civs`
array in `MUSEUMS`. To give it a deep-dive card, add an entry to `MASTERPIECES` with
`civ: "my-civ"`. To connect it in the graph, add edges to `CIV_RELATIONS` using one of the
types in `REL_LABELS`.

## Adding a museum

Copy `template.html`, change its `<title>`, meta description, and `data-page`; add a
`MUSEUMS` entry (`{id, name, city, emoji, tagline, note, floors: [{id, name, note, areas:
[{id, name, galleries, note, civs: [slug]}]}]}`); map the id to the page in `MUSEUM_PAGE`
in `app.js`; and register the page in the `PAGES` dispatch map. Optionally add a `TOURS`
entry pointing at your area ids.

> Note: bump the `CACHE` version in `sw.js` when you change content — and add any new HTML
> file to its `ASSETS` list — so returning visitors get fresh data.
