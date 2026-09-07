# Civilization Readers regression audit

The September 2026 index refactor replaced a stylesheet used by every reader,
museum route, tour, and guide with index-only CSS. This suite tests the **whole
application**, not just the landing page.

## Run

```sh
cd scripts/civilizations-qa
npm ci
npx playwright install --with-deps chromium firefox webkit
npm test
BROWSER=firefox npm test
BROWSER=webkit npm test
```

`npm run preview` serves the standalone Jekyll pages at
`http://localhost:4174/civilizations/`. The server binds to `0.0.0.0`, accepts
preview hosts, and strips front matter. It does not emulate Jekyll analytics
injection; the existing analytics guard and the post-deployment run cover that
production shell.

To audit the actual deployment (including byte-for-byte CSS/JS/cache-version
checks), use `BASE_URL=https://sghose.me npm test`. The checkout must match the
commit being deployed. `CHROMIUM_EXECUTABLE_PATH` can point to a separately
installed Chromium binary in a constrained sandbox.

## Coverage

- All 13 HTML page shells at 320, 390, 768, 844 (landscape), 1024, 1440, and 1920
  CSS-pixel widths; all 53 civilization readers at phone and desktop widths.
- No horizontal page overflow or clipped content (only intentional, bounded
  timeline/filter/TOC scrollers); consistent shared styling, landmarks, heading
  structure, desktop top navigation and phone bottom navigation.
- Collision-free, physical 44px map targets in World and Fit modes; selection,
  closing/Escape, city alternatives, and links to the exact museum building.
- Timeline event counts, non-overlapping event labels, keyboard selection,
  persistent collapsed panels, sticky TOC/scroll-spy, anchored section clearance,
  deep links, reduced motion, and print expansion/restoration.
- Search combined with region filters, masterpiece-name search, empty results,
  object/glossary searches, theme persistence, graph inspection/filtering/time,
  zoom/reset/drag, and opt-in touch panning (normal page scroll by default).
- Axe WCAG 2 A/AA and 2.1 AA scans of every page in light and dark mode, plus open
  map/graph details. Every internal reader, museum, gallery, and section link is
  checked against the rendered destination.
- Offline loading of precached pages/readers never visited before; app-scoped
  caches; automatic migration of a broken v7 page with **no update listener**.
  The legacy worker fixture is only served by the test server, never production.
- Layout/interaction contexts block third-party requests, proving the app works
  without a CDN. Worker tests use native networking (interception can break
  WebKit's offline navigation). All contexts set Google's measurement opt-out
  before page scripts execute, so the live audit does not send analytics.

Screenshots and `summary.json` go under ignored `artifacts/<browser>/`.
`script/check-civilizations.sh` runs all three engines. In GitHub Actions it is
called by the existing `script/check-analytics.sh`, so both the PR validation and
Pages deployment workflows gate on the browser suite **without changing workflow
permissions or YAML**. Local `check-analytics.sh` stays a fast analytics-only guard.

After Pages deploys, manually dispatch **Check analytics coverage** on the deployed
commit/branch to repeat the audit against `https://sghose.me` (the script detects
that validation workflow's `workflow_dispatch` event). A manual dispatch of the
**deployment** workflow still tests locally before publishing.

Each CI run writes browser summaries as check annotations, and selected review
images into a collapsed job-log group; no new artifact action or extra GitHub permission is needed. Extract:

```sh
gh run view RUN_ID --log > artifacts/ci.log
python extract-review.py artifacts/ci.log artifacts/ci-review
```

`TEST_FILTER='sticky reader' npm test` is useful for a focused local debugging run;
a partial run is explicitly labelled in `summary.json`. CI never sets this flag.

Production content still belongs under `civilizations/`. Keep test fixtures,
browser binaries, and generated screenshots out of the published site and Git.

### Native offline networking

Offline contexts use an origin-restricted HTTP/HTTPS proxy. After precaching, the
proxy closes its connections and rejects new ones. An uncached probe must fail,
then all seven cached/unvisited pages must still load normally. This tests a real
network failure consistently in all engines, rather than WebKit's virtual offline
flag (which can reject navigation before asking its service worker). HTTPS uses
an opaque CONNECT tunnel; no certificates or responses are modified. Third-party
traffic is blocked and Google's measurement opt-out is set before page scripts.

### Post-deployment audit without workflow-dispatch permission

After Pages finishes deploying the same app assets as your branch, push a commit
whose subject includes `[civilizations-live-audit]`. An empty commit is sufficient:

```bash
git commit --allow-empty -m "[civilizations-live-audit] Verify deployed readers"
git push
```

Only a **push** in **Check analytics coverage** opts into the live target. PR checks
and the Pages build still validate the checkout locally. No workflow edits or new
GitHub permissions are required. Do not use this marker before the corresponding
app assets are deployed: the byte-for-byte check should fail on an older release.
The live audit also repeats a cold-start dark page and waits for completed paints
before accessibility analysis; contrast rules are never disabled.
