# Snoopy deck: browser review

The site is still a standalone Jekyll page. The presentation needs no Node build,
Tailwind runtime, external fonts, or remote image host. Node is used only for this
optional preview and review suite. `scripts/` is excluded from the Jekyll build.

## Reproduce the checks

Requires Node 22:

```sh
cd scripts/snoopy-qa
npm ci
npx playwright install --with-deps chromium
npm test
```

The test starts and closes its own static preview on an available port. It strips
Jekyll front matter; production analytics injection is covered separately by the
repository's existing `bash script/check-analytics.sh` and Pages build.

For an interactive preview:

```sh
npm run preview
# http://localhost:4173/presentations/snoopy.html#slide12
```

The preview binds to `0.0.0.0`, accepts proxied hosts, and uses only same-origin
asset URLs. `BASE_URL=https://sghose.me npm test` can target the deployed site in
an environment with access to that origin. `ARTIFACT_DIR` overrides the output
directory. `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` optionally supplies an already
installed compatible Chromium binary.

## What is checked

- All **19 slides** at **320×568, 390×844, 430×932, 768×1024, 844×390,
  1366×768, and 1440×900** (133 viewport/slide combinations).
- Another 19 layouts with **200% text sizing**: **152 layout checks** total.
- Actual viewport screenshots of every slide at every size, plus separate
  full-scroll captures of the image-heavy slides. A full-scroll image is **not**
  used as evidence that all content fits in the initial phone viewport.
- No sideways page or slide overflow; reachable headings and bottom content;
  navigation in its own row, never covering content.
- All slides fit the two desktop presentation viewports without vertical scrolling.
  Phones, tablets, and short landscape screens scroll instead of shrinking text.
- Local images load, have alt text, remain inside the slide, and use `contain`.
  The family has **seven distinct portraits**, including both Molly and Rover.
- Main body copy is at least **16 CSS pixels**.
- **44 axe scans**: every slide on phone and desktop, the index, notes, and image
  dialogs, including small-screen, landscape, and 200%-text image dialogs.
- Keyboard arrows/Home/End, boundaries, deep links, back/forward, scroll reset,
  and native Space activation in the slide index.
- Full-size image viewing, fit/zoom/pan, close-button visibility, Escape, focus
  return, and suppression of slide navigation while a dialog is open.
- At least **44×44 CSS-pixel** primary controls.
- Real Chromium touch gestures: sideways swipe, vertical/diagonal reading, and
  multi-touch that does not accidentally change the slide.
- Reduced-motion configuration, readable no-JavaScript fallback, and a visible
  message when an image cannot load (not silent disappearance).

`artifacts/review/results.json` holds the detailed measurements and failures.
The complete screenshot set is generated into `artifacts/`, which is ignored by
Git. Tests do not replace visual inspection of the artwork and layouts.

## Reviewed evidence · September 7, 2026

The final run passed **152 layout checks and 44 accessibility scans**, with no
reported violations or resource/JavaScript errors. It used Chromium 149.0.7827.0
with phone/tablet viewport and touch emulation; this is **not** a claim of testing
on physical iPhones, Android devices, or Safari.

All 19 desktop and phone slides were visually reviewed using screenshots/contact
sheets. The family page, image viewer, index, smaller phone, and landscape views
were also examined separately. Review caught and fixed:

1. Cropped 120×150 family thumbnails, including a tile showing only Spike's hat.
2. 11.84px family descriptions and tiny mobile navigation dots.
3. An image-enlarge badge covering artwork.
4. A desktop family layout requiring scrolling.
5. A visible native focus outline around deep-linked slides.
6. Font-dependent arrow glyphs missing in the browser.
7. Scrollable text-only slides without a keyboard-focusable heading.
8. Large-text overflow in the title and statistics.
9. Short landscape layouts and image-dialog control space.

Four deliberately retained screenshots (~1.4 MB) document the requested visual
review; they are not published by Jekyll. `review/summary.json` records the run and
hashes of the exact HTML, CSS, and JavaScript reviewed.

- [Before / after mobile comparison](review/mobile-comparison.png)
- [Mobile family viewport](review/mobile-family.png)
- [Desktop family viewport](review/desktop-family.png)
- [Mobile image detail](review/mobile-image-detail.png)

The baseline was captured from commit `5bf4dc6`. Its Tailwind and font requests
were fulfilled from matching locally installed packages because external CDNs
were inaccessible in the sandbox; the original family images and cropping were
unchanged. The new deck was tested without such substitutions.

The repository's existing analytics and GitHub Pages workflows are unchanged.
This suite was run locally; it has not been wired into Actions because the
connected GitHub App does not have workflow-edit permission.
