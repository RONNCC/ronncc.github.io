# TERM Lab Park

An interactive tissue-engineering walkthrough. A construct moves through 15 stations from donor-tissue procurement to surgical implantation; each station opens a short, source-informed explainer.

## Run locally

Serve the repository from its root with any static HTTP server, then open `/apps/tissue-roadmap-sim/`.

## Controls

- Drag the canvas to pan, scroll or pinch to zoom, and use `+`, `-`, or fit to reframe the line.
- Click a station or its chip to inspect it and fly the camera there; mobile presents the inspector as a bottom sheet.
- The bottom dock starts/restarts a unit, pauses, explicitly advances/continues the current station, sets speed, and toggles follow and labels. Keyboard shortcuts: `Space`, `S`, `R`, `F`, and `L`.

## Development checks

Run JavaScript syntax checks after editing the simulation:

```sh
for file in apps/tissue-roadmap-sim/{iso,factory,spec,sim,render,ui,main}.js; do
  node --check "$file"
done
node apps/tissue-roadmap-sim/smoke-test.js
```

`tissue-engineering-roadmap.md` contains the expanded lesson content and references used for the experience.
