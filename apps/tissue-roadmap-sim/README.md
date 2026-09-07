# TERM Lab Park

An interactive tissue-engineering walkthrough. A construct moves through 15 stations from donor-tissue procurement to surgical implantation; each station opens a short, source-informed explainer.

## Run locally

Serve the repository from its root with any static HTTP server, then open `/apps/tissue-roadmap-sim/`.

## Learning structure

- `LEARNING-GUIDE.md` is the module map: 5 modules (objectives, prerequisites,
  animation beats, exit checks) over 15 stations (role, takeaway, watch).
- Station roles drive the animation contract: `build` grows the construct
  (metrics move), `verify` stamps the lot-record release gates (construct
  held), `prepare`/`deliver` stage the carrier. Cell counts come from a
  logistic model gated on isolation/expansion progress — the sim shows the
  growth-curve shape, not full clinical scale-up.
- Each module ends with a 2-question exit quiz in the inspector (recorded,
  non-blocking) sourced from `Factory.QUIZ`; release gates come from
  `Spec.compute().gates`.
- `guides/tissue-textbook.md` is generated from `factory.js` — never edit it
  by hand. Regenerate with `node apps/tissue-roadmap-sim/generate-textbook.js`.

## Controls

- Drag the canvas to pan, scroll or pinch to zoom, and use `+`, `-`, or fit to reframe the line.
- Click a station or its chip to **inspect** it: the camera flies there and the card is marked INSPECTING. Inspecting never moves the pipeline; the construct keeps running. Tap empty floor to resume following the pipeline.
- The pipeline has one advance action with a phase-aware label: `Skip travel ⏩` while moving, `Finish work ⏩` while working, `Continue → <next>` while paused for review. The dock button and the inspector Continue button do the same thing. Keyboard shortcuts: `Space` (pause), `S` (advance), `R` (restart), `F` (follow), `L` (labels).
- HUD Station shows the construct's 1-based position (`3 / 15`); Traveller `n / 15 done` shows completed count. The green ring on the canvas glows only while the construct is at a station; the progress arc shows dwell work filling. Belt dashes freeze when paused.

## Development checks

Run JavaScript syntax checks after editing the simulation:

```sh
for file in apps/tissue-roadmap-sim/{iso,factory,spec,sim,render,ui,main}.js; do
  node --check "$file"
done
node apps/tissue-roadmap-sim/smoke-test.js
```

`tissue-engineering-roadmap.md` contains the expanded lesson content and references used for the experience.
