# dvt-explainer QA

Browser-free regression checks for `apps/dvt-explainer`. Companion to
`apps/dvt-explainer/smoke-test.js`, which tests the data model and generated
markup with no DOM at all.

```sh
cd scripts/dvt-explainer-qa
npm ci
npm test      # 40 DOM checks
npm run render   # optional: rasterise every plate to artifacts/*.png
```

## What `npm test` covers

Loads the real `index.html` (front matter stripped, the way Jekyll serves it),
runs `data.js` + `figures.js` + `app.js` through jsdom, then drives the page
the way a reader would.

- **Render** — every declared plate fills its stage and clears the no-JS
  fallback; SVG plates carry a `viewBox`; sources, timeline and glossary all
  produce content.
- **Plates** — the scale explorer steps, vein selection and clearing, the
  zone toggle, symptom layers, the tape-measure slider and its Wells badge,
  and the ultrasound simulator's core claim: at full probe pressure a healthy
  vein is obliterated while a clotted one is not.
- **Decoder** — category tabs, phrase cards, vessel cross-links that select
  the matching vessel in the anatomy map, paste-and-decode ordering, and
  word-boundary matching (a report saying "subacute" must not trigger the
  "acute" entry, nor "internal" trigger "INR").
- **Glossary** — filtering by term and by definition text, live counts, and
  the no-matches empty state.
- **Chrome** — every table-of-contents link resolves to a chapter, and no
  `jsdomError`, `console.error` or uncaught window error is raised during the
  entire run.

`npm run render` writes PNGs to `artifacts/` (gitignored). It resolves the CSS
custom properties from `styles.css` first, because resvg does not evaluate
`var()` itself. Reviewing those images is how the label collisions, clipped
callouts and the pump's stray surface vein were caught.

## Not wired into CI

`script/check-civilizations.sh` runs a Playwright suite for the Civilization
Readers on every CI run. This suite is deliberately jsdom-based and much
cheaper, but it is still not part of the analytics gate. To add it, append to
`script/check-analytics.sh`:

```sh
(cd scripts/dvt-explainer-qa && npm ci --silent && npm test)
```
