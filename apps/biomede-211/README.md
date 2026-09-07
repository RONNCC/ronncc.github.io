# BIOMEDE 211 Lab

Interactive chapter-by-chapter companion to Belmont's *Notes on BIOMEDE 211:
Circuits, Systems, & Signals in Biomedical Engineering* (W19, 356 pp).

- `index.html` — standalone app shell (`/apps/biomede-211/`)
- `chapters.js` — 22 chapters: lede, concepts, worksheet checks, widget binding
- `app.js` — nav, scoring, canvas plot helper, 22 widgets
- `styles.css`

Every chapter ships one working example (e.g. op-amp designer with
saturation, pole-zero → step response, convolution visualizer, Hodgkin–Huxley
AP lab, Nyquist/quantizer, NOR gate lab, device classifier).

## Checks

```sh
node --check apps/biomede-211/chapters.js
node --check apps/biomede-211/app.js
```
