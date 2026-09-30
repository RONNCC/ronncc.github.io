# Deep Vein Thrombosis, Up Close

An interactive, textbook-style anatomy plate explaining deep vein thrombosis (DVT) in the calf:
what a clot is, the veins it lives in, what it looks like on an ultrasound, why it happens, what
could happen next, how it is treated, and — finally — what the phrases in your own report are
actually telling you.

Built as a static, dependency-free page — the same standalone-file pattern as the other apps in
this repo (`layout: standalone` + `permalink:` front matter so GitHub Pages injects analytics).

## Run locally

Serve the repository root with any static server, then open `/apps/dvt-explainer/`.
`dev-server.js` is a zero-dependency option that also strips the Jekyll front matter the way
GitHub Pages does (a plain static server would otherwise print the front matter as page text):

```sh
node apps/dvt-explainer/dev-server.js 8080
# -> http://localhost:8080/apps/dvt-explainer/
```

## The twelve plates

| # | Figure | What the reader does |
|---|--------|----------------------|
| 1 | Scale explorer | Zooms the whole calf → a slice → one vein → the valve pocket where clots start |
| 2 | Veins of the calf | Clicks any of nine vessels for what it drains and why it matters; toggles the proximal/distal line |
| 3 | Symptoms | Switches symptom findings on and off, drags a tape measure to see the ≥3 cm rule |
| 4 | Ultrasound simulator | Presses a probe into the calf and watches a healthy vein collapse while a clotted one does not |
| 5 | Virchow's triad | Picks an arm, then any of 22 risk factors to see which arms it pulls on |
| 6 | Timeline | The natural history from clot formation to post-thrombotic syndrome |
| 7 | The journey | Steps a clot from the calf vein to the pulmonary artery, with a small-vs-large comparison |
| 8 | Management trade-off | Ticks their own situation to see why a care team treats or watches |
| 9 | Wells score | Scores the pre-test probability checklist they were assessed with |
| 10 | Calf muscle pump | Compares flow while walking versus sitting still; ankle pumps, in animation form |
| 11 | Report decoder | Picks a phrase — or pastes their own report — and reads what it means plus the question worth asking; vessel names jump back to Fig. 2 |
| 12 | Glossary | Filters thirty terms by word or by definition |

## Files

- `index.html` — the page shell: prose, chapter structure, plate markup, front matter.
- `data.js` — `window.DVTData`: every number, panel, caption and citation. No DOM, no side effects.
- `figures.js` — `window.DVTFigures`: pure SVG string builders, one per plate, plus shared geometry
  helpers (leg outline, route walking, vein squeeze).
- `app.js` — `window` controllers: renders plates from state and wires interaction, animation and
  the reading-progress/TOC chrome.
- `styles.css` — the design system (paper/ink palette, serif headings, plate styling).
- `smoke-test.js` — offline checks (below).
- `dev-server.js` — static preview server.
- `../../scripts/dvt-explainer-qa/` — jsdom regression suite and PNG plate rasteriser (see below).

## Development checks

```sh
for file in apps/dvt-explainer/{data,figures,app}.js; do node --check "$file"; done
node apps/dvt-explainer/smoke-test.js
bash script/check-analytics.sh
```

`scripts/dvt-explainer-qa/` adds a second, heavier layer: it loads the real `index.html` in jsdom,
runs the three scripts, and drives every plate the way a reader would (36 checks), then optionally
rasterises all nineteen plate states to PNG for visual review — that is how the label collisions and
the pump caption bug were caught.

```sh
cd scripts/dvt-explainer-qa && npm ci && npm test
npm run render   # artifacts/*.png, gitignored
```

`smoke-test.js` runs without a browser and verifies:

1. **Data integrity** — unique ids, every risk factor mapped to a real arm of the triad, embolus
   steps anchored to route segments, management paths covering every branch `app.js` can pick.
2. **Markup** — every figure builder returns well-formed, balanced SVG (or HTML for the timeline),
   with no `undefined`/`NaN` and no duplicate ids.
3. **Contract** — every `[data-figure]` stage has a builder, every `#id` `app.js` queries exists,
   scripts load in dependency order.
4. **Geometry** — route walking returns the endpoints and climbs monotonically, and `squeeze()`
   empties a normal vein while sparing a clotted one.
5. **Decoder data** — every phrase has a lowercase, unique match alias that belongs to only one
   entry, a plain-language line and a question to ask; vessel cross-links resolve to real veins;
   every category has enough phrases to be worth a tab.
6. **Self-contained figures** — a figure whose styling depends on its mode (the pump) must emit
   that state itself, and the decoder/glossary plates only use classes that exist in `styles.css`.

## Editorial policy

- **Educational, not medical advice.** This is stated in the page's own banner and again in the
  closing note; nothing here is personalised.
- **Every claim is sourced.** `data.js → sources` carries 15 citations (CDC, CHEST 2021, ESVS 2021,
  Blood, JCI, Merck, Medscape, Cleveland Clinic Journal of Medicine, Thrombosis Canada, and others)
  each annotated with exactly what it was used for; the page renders them as an in-page reference
  list under chapter 11.
- **Disagreement is shown, not hidden.** Where guidelines genuinely differ — notably whether to
  anticoagulate an uncomplicated calf clot or to watch it with repeat scans — the page presents
  both branches and says plainly that good clinicians disagree.
- **Red flags come first.** Pulmonary embolism warning signs appear in chapter 1, are repeated at
  the point where the embolus route is explained, and are written as actions ("say out loud that
  you have a diagnosed DVT").
- **Nothing is uploaded.** The report decoder matches phrases in the browser; the page says so next
  to the box, and the plate carries the same "a decoder cannot read your scan" caveat as the rest
  of the page.
- **Numbers are rounded and attributed.** 8–15% proximal extension, ~50% of DVTs asymptomatic,
  900,000 VTE events a year in the US, one third to one half developing post-thrombotic
  complications, 40–60% of calf venous volume ejected per contraction.
