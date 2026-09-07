import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium, firefox, webkit } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { serve } from './serve.mjs';
import { networkGate } from './network-gate.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const site = path.resolve(here, '../../civilizations');
const engine = process.env.BROWSER || 'chromium';
const artifacts = path.resolve(process.env.ARTIFACT_DIR || path.join(here, 'artifacts', engine));
await fs.mkdir(artifacts, { recursive: true });
const server = process.env.BASE_URL ? null : await serve(0, { fixtures: true });
const base = new URL('/civilizations/', process.env.BASE_URL || `http://127.0.0.1:${server.address().port}`);
const browser = await ({ chromium, firefox, webkit })[engine].launch(
  engine === 'chromium' && process.env.CHROMIUM_EXECUTABLE_PATH ? {
    executablePath: process.env.CHROMIUM_EXECUTABLE_PATH,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader']
  } : {}
);
const files = (await fs.readdir(site)).filter(f => f.endsWith('.html'));
const report = { engine, target: base.href, filter: process.env.TEST_FILTER || null, started: new Date().toISOString(), layouts: 0, accessibility: 0, links: 0, tests: [], screenshots: [] };
const errors = [], documents = new Map(), links = new Set();
let activePage;
const gates = [], workerNetworks = new WeakMap();

function key(url) {
  const u = new URL(url, base);
  const file = u.pathname.replace(base.pathname, '') || 'index.html';
  return file === 'reader.html' ? `${file}?c=${u.searchParams.get('c') || 'egypt'}` : file;
}
async function context(options = {}) {
  let gate;
  if (options.serviceWorkers === 'allow') {
    gate = await networkGate(base);
    gates.push(gate);
    options = { ...options, proxy: { server: gate.url } };
  }
  const ctx = await browser.newContext({ serviceWorkers: 'block', reducedMotion: 'reduce', ...options });
  if (gate) workerNetworks.set(ctx, gate);
  // Use native worker networking and a real disconnect. Opt out of Google
  // measurement before scripts execute; the worker proxy also blocks outsiders.
  await ctx.addInitScript(() => { window['ga-disable-G-WL390Z0Q0Y'] = true; });
  if (options.serviceWorkers !== 'allow') {
    await ctx.route('**/*', route => new URL(route.request().url()).origin === base.origin ? route.continue() : route.abort());
  }
  ctx.on('page', page => {
    activePage = page;
    page.setDefaultTimeout(12000);
    page.on('pageerror', error => errors.push(`${page.url()}: ${error.message}`));
    page.on('response', response => {
      if (response.url().startsWith(base.href) && response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
    });
  });
  return ctx;
}
async function disconnect(ctx, page) {
  workerNetworks.get(ctx).disconnect();
  // Prove the browser cannot bypass the disconnected proxy or silently fetch
  // from the origin. This URL is deliberately outside the worker's asset list.
  assert.ok(await page.evaluate(async () => {
    try { await fetch('__qa_offline_probe'); return false; } catch { return true; }
  }), 'An uncached request must fail after disconnecting the network');
}
async function visit(page, file) {
  const response = await page.goto(new URL(file, base).href, { waitUntil: 'load' });
  assert.equal(response.status(), 200, `HTTP status: ${file}`);
  await page.locator('#app h1').waitFor();
}
async function layout(page, label) {
  const result = await page.evaluate(() => {
    const allowed = '.tl-scroll, .toc-nav, .filter-pills-wrap, .graph-filters, .tour-cards';
    const overflow = [...document.querySelectorAll('#app *, .site-header, main')].filter(el => {
      if (el.closest('svg')) return false;
      const scroll = el.parentElement?.closest(allowed);
      if (scroll) return false; // Wide charts/rails scroll locally; their own bounds are still checked.
      const box = el.getBoundingClientRect();
      return box.width && (box.right > innerWidth + 1 || box.left < -1);
    }).map(el => `${el.tagName}.${el.className}`);
    const ids = [...document.querySelectorAll('[id]')].map(el => el.id);
    const nav = document.getElementById('site-nav');
    const box = nav.getBoundingClientRect();
    return {
      width: document.documentElement.scrollWidth, viewport: innerWidth, overflow,
      duplicates: ids.filter((id, index) => ids.indexOf(id) !== index),
      ids, links: [...document.querySelectorAll('a[href]')].map(a => a.href),
      font: getComputedStyle(document.body).fontFamily, size: parseFloat(getComputedStyle(document.body).fontSize),
      main: document.querySelectorAll('main').length, headings: document.querySelectorAll('h1').length,
      nav: { position: getComputedStyle(nav).position, top: box.top, bottom: box.bottom, height: innerHeight },
      smallNav: [...nav.querySelectorAll('a')].some(a => a.clientWidth < 44 || a.clientHeight < 44),
      css: [...document.querySelectorAll('link[rel="stylesheet"]')].map(l => l.href)
    };
  });
  assert.ok(result.width <= result.viewport + 1, `${label}: horizontal page scroll ${result.width}/${result.viewport}`);
  assert.deepEqual(result.overflow, [], `${label}: content outside the viewport`);
  assert.deepEqual(result.duplicates, [], `${label}: duplicate IDs`);
  assert.equal(result.main, 1, `${label}: main landmark`);
  assert.equal(result.headings, 1, `${label}: main heading`);
  assert.match(result.font, /Segoe|Roboto|Helvetica|Arial|system/i, `${label}: shared typography missing`);
  assert.ok(result.size >= 16, `${label}: base text too small`);
  assert.equal(result.nav.position, 'fixed', `${label}: navigation stylesheet missing`);
  assert.equal(result.smallNav, false, `${label}: navigation targets under 44px`);
  assert.ok(result.viewport <= 860 ? Math.abs(result.nav.bottom - result.nav.height) <= 1 : Math.abs(result.nav.top) <= 1, `${label}: navigation anchoring`);
  assert.deepEqual(result.css, [new URL('styles.css', base).href], `${label}: one shared, local stylesheet`);
  documents.set(key(page.url()), new Set(result.ids));
  result.links.filter(link => link.startsWith(base.href)).forEach(link => links.add(link));
  report.layouts++;
}
async function axe(page, label) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  assert.deepEqual(result.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, summary: n.failureSummary })) })), [], `${label}: accessibility violations`);
  report.accessibility++;
}
async function shot(page, name, target) {
  if (target) await page.locator(target).evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.screenshot({ path: path.join(artifacts, `${name}.png`) });
  report.screenshots.push(`${name}.png`);
}
async function test(name, fn) {
  if (process.env.TEST_FILTER && !name.includes(process.env.TEST_FILTER)) return;
  process.stdout.write(`${engine}: ${name} … `);
  await fn();
  assert.deepEqual(errors, [], 'Browser runtime / same-origin network errors');
  report.tests.push(name);
  console.log('OK');
}

try {
  await test('served assets match this checkout', async () => {
    const ctx = await context();
    for (const file of ['styles.css', 'app.js', 'data.js', 'world.js', 'sw.js', 'manifest.webmanifest']) {
      const response = await ctx.request.get(new URL(file, base).href, { headers: { 'Cache-Control': 'no-cache' } });
      assert.equal(response.status(), 200, file);
      assert.equal(await response.text(), await fs.readFile(path.join(site, file), 'utf8'), `${file}: stale/wrong deployment`);
    }
    await ctx.close();
  });

  const viewports = [[320, 740], [390, 844], [768, 1024], [844, 390], [1024, 768], [1440, 1000], [1920, 1080]];
  await test(`all ${files.length} page shells at ${viewports.length} viewport sizes`, async () => {
    for (const [width, height] of viewports) {
      const ctx = await context({ viewport: { width, height }, hasTouch: width < 861 });
      const page = await ctx.newPage();
      for (const file of files) {
        await visit(page, file === 'reader.html' ? 'reader.html?c=egypt' : file);
        await layout(page, `${file} ${width}×${height}`);
        if ([390, 1440].includes(width) && ['routes.html', 'index.html', 'reader.html', 'met.html', 'objects.html', 'tours.html', 'guide.html'].includes(file)) {
          await shot(page, `${file.replace('.html', '')}-${width}`);
        }
      }
      await ctx.close();
    }
  });

  await test('all 53 civilization readers, dates, links, and timelines', async () => {
    for (const width of [320, 1440]) {
      const ctx = await context({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await visit(page, 'index.html');
      const slugs = await page.evaluate(() => CIVILIZATIONS.map(c => c.slug));
      assert.equal(slugs.length, 53);
      for (const slug of slugs) {
        await visit(page, `reader.html?c=${slug}`);
        await layout(page, `${slug} ${width}`);
        const chart = await page.evaluate(() => {
          const events = [...document.querySelectorAll('.tl-event-hit')].map(el => el.getBBox());
          const labels = [...document.querySelectorAll('.tl-event-hit')].map(el => {
            const r = el.getBBox(); return { x: r.x, y: r.y, width: r.width, height: r.height };
          });
          const collision = labels.some((a, i) => labels.slice(i + 1).some(b => a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y));
          return { count: events.length, expected: getCiv(getSlug()).events.length, collision, minHeight: Math.min(...events.map(r => r.height)), toc: [...document.querySelectorAll('.toc-nav a')].every(a => document.querySelector(a.getAttribute('href'))) };
        });
        assert.equal(chart.count, chart.expected, `${slug}: missing timeline events`);
        assert.equal(chart.collision, false, `${slug}: overlapping event labels`);
        assert.ok(chart.minHeight >= 44, `${slug}: timeline label tap target`);
        assert.ok(chart.toc, `${slug}: broken section link`);
      }
      await ctx.close();
    }
  });

  await test('light/dark accessibility on every page', async () => {
    for (const colorScheme of ['light', 'dark']) {
      const ctx = await context({ viewport: { width: 390, height: 844 }, colorScheme });
      const page = await ctx.newPage();
      for (const file of files) {
        await visit(page, file);
        await axe(page, `${file} ${colorScheme}`);
        assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme);
      }
      await visit(page, 'reader.html?c=maya');
      await page.locator('#theme-toggle').click();
      await visit(page, 'index.html');
      assert.equal(await page.locator('html').getAttribute('data-theme'), colorScheme === 'dark' ? 'light' : 'dark', 'Theme persists across pages');
      await shot(page, `index-theme-from-${colorScheme}`);
      await ctx.close();
    }
  });

  await test('search AND region filtering, empty states, objects, glossary', async () => {
    const ctx = await context({ viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await visit(page, 'index.html');
    await page.locator('[data-filter="asia"]').click();
    await page.locator('#civ-search').fill('japan');
    let visible = await page.locator('.card:visible').evaluateAll(cards => cards.map(c => ({ group: c.dataset.group, hay: c.dataset.search })));
    assert.ok(visible.length > 0 && visible.every(c => c.group === 'Asia' && c.hay.includes('japan')));
    await page.locator('#civ-search').fill('no-such-civilization-xyz');
    assert.equal(await page.locator('.card:visible').count(), 0);
    assert.ok(await page.locator('#no-results').isVisible());
    await page.locator('#civ-search').fill('');
    await page.locator('[data-filter="all"]').click();
    assert.equal(await page.locator('.card:visible').count(), 53);
    await page.locator('#civ-search').fill('rosetta');
    assert.ok(await page.locator('.card[href="reader.html?c=egypt"]').isVisible(), 'Search includes masterpiece names');
    await page.locator('#civ-search').fill('');
    await page.locator('[data-filter="africa"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('[data-filter="africa"]').getAttribute('aria-pressed'), 'true');
    await page.locator('#civ-search').fill('no-such-civilization-xyz');
    await shot(page, 'index-empty-state-390');
    for (const [file, input, items, query] of [['objects.html', '#obj-search', '.mp-card', 'rosetta'], ['guide.html', '#guide-search', '.gloss', 'faience']]) {
      await visit(page, file);
      await page.locator(input).fill(query);
      assert.ok(await page.locator(`${items}:visible`).count() > 0);
      assert.ok(await page.locator(`${items}:visible`).evaluateAll((elements, q) => elements.every(el => el.dataset.search.includes(q)), query));
      await page.locator(input).fill('no-such-result-xyz');
      assert.ok(await page.locator('#no-results').isVisible());
    }
    await ctx.close();
  });

  await test('map selection, disjoint 44px pins, World/Fit, museum deep links', async () => {
    for (const [width, colorScheme] of [[320, 'light'], [390, 'dark'], [1440, 'light']]) {
      const ctx = await context({ viewport: { width, height: 900 }, colorScheme });
      const page = await ctx.newPage();
      await visit(page, 'routes.html');
      assert.equal(await page.locator('.map-pin').count(), 6);
      assert.equal(await page.locator('.museum-card').count(), 13); // 12 museums + the template
      assert.equal(await page.locator('.graph-svg').count(), 0, 'Graph is lazy, not on the initial rendering path');
      for (const mode of ['map-world', 'map-fit']) {
        await page.locator(`#${mode}`).click();
        const hit = await page.locator('.map-hit').evaluateAll(elements => elements.map(el => {
          const b = el.getBoundingClientRect(); return { x: b.x, y: b.y, width: b.width, height: b.height };
        }));
        hit.forEach((a, i) => {
          assert.ok(a.width >= 43.9 && a.height >= 43.9, `${mode}: marker must stay 44px at ${width}`);
          for (const b of hit.slice(i + 1)) assert.ok(a.x + a.width <= b.x || b.x + b.width <= a.x || a.y + a.height <= b.y || b.y + b.height <= a.y, `${mode}: markers overlap at ${width}`);
        });
      }
      for (let i = 0; i < 6; i++) {
        const pin = page.locator(`.map-pin[data-i="${i}"]`);
        await pin.focus(); await page.keyboard.press('Enter');
        assert.equal(await pin.getAttribute('aria-pressed'), 'true');
        assert.equal(await page.locator('.map-pin.on').count(), 1);
        const count = i === 1 || i === 2 ? 4 : 1;
        assert.equal(await page.locator('.map-info-list a').count(), count);
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.map-info.active').count(), 0);
      }
      await page.locator('.map-city-btn[data-i="1"]').click();
      const hrefs = await page.locator('.map-info-list a').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')));
      assert.deepEqual(hrefs, ['sf.html#deyoung', 'sf.html#legion', 'sf.html#aam', 'sf.html#rosicrucian']);
      await layout(page, `map with detail ${width}`);
      await axe(page, `map with detail ${width}`);
      await shot(page, `map-${width}-${colorScheme}`, '.map-panel');
      await shot(page, `map-details-${width}-${colorScheme}`, '#map-info');
      await page.locator('.map-info-list a[href="sf.html#legion"]').click();
      await page.waitForURL('**/sf.html#legion');
      await page.waitForFunction(() => document.getElementById('legion').getBoundingClientRect().top < 150);
      await ctx.close();
    }
  });

  await test('graph controls, inspector, keyboard filters, pan, zoom, and time', async () => {
    for (const [width, colorScheme] of [[390, 'light'], [1440, 'dark']]) {
      const ctx = await context({ viewport: { width, height: 900 }, colorScheme, hasTouch: width < 861 });
      const page = await ctx.newPage();
      await visit(page, 'routes.html#graph');
      await page.locator('.graph-picker').waitFor();
      assert.ok(await page.locator('#graph').getAttribute('open') !== null);
      await page.locator('#graph-node-select').selectOption('met');
      assert.match(await page.locator('.graph-info-title').textContent(), /Metropolitan Museum/);
      assert.equal(await page.locator('.graph-info a').getAttribute('href'), 'met.html#met');
      await page.locator('.graph-info-close').click();
      await page.locator('#graph-node-select').selectOption('met'); // Selecting the same node after closing used to fail.
      assert.ok(await page.locator('.graph-info').isVisible());
      const galleries = page.locator('.filt-chip[data-type="gallery"]');
      assert.equal(await galleries.getAttribute('aria-pressed'), 'true', 'Inspecting a museum reveals its galleries');
      await galleries.focus(); await page.keyboard.press('Enter');
      assert.equal(await galleries.getAttribute('aria-pressed'), 'false');
      await page.keyboard.press('Enter');
      assert.equal(await galleries.getAttribute('aria-pressed'), 'true');
      assert.ok(await page.locator('.g-node[data-museum="met"]:visible').count() > 0);
      await page.locator('[data-toggle="met"]').click();
      assert.equal(await page.locator('.g-node[data-museum="met"]:visible').count(), 0);
      await page.locator('[data-toggle="met"]').click();
      assert.ok(await page.locator('.g-node[data-museum="met"]:visible').count() > 0);
      await page.locator('#time-range').evaluate(el => { el.value = '-1000'; el.dispatchEvent(new Event('input', { bubbles: true })); });
      assert.equal(await page.locator('#time-out').textContent(), '1000 BCE');
      assert.ok(await page.locator('.g-node.out-of-time').count() > 0);
      await page.locator('#time-play').click();
      assert.equal(await page.locator('#time-play').getAttribute('aria-label'), 'Pause');
      await page.locator('#time-reset').click();
      assert.equal(await page.locator('#time-out').textContent(), 'all time');
      assert.equal(await page.locator('.g-node.out-of-time').count(), 0);
      let transform = await page.locator('.graph-view').getAttribute('transform');
      await page.locator('#graph-zoom-in').click();
      assert.notEqual(await page.locator('.graph-view').getAttribute('transform'), transform);
      await page.locator('#graph-zoom-out').click();
      await page.locator('#graph-reset').click();
      transform = await page.locator('.graph-view').getAttribute('transform');
      await page.locator('.graph-stage').evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      const box = await page.locator('.graph-stage').boundingBox();
      await page.mouse.move(box.x + 40, box.y + 50); await page.mouse.down();
      await page.mouse.move(box.x + 110, box.y + 100, { steps: 6 }); await page.mouse.up();
      assert.notEqual(await page.locator('.graph-view').getAttribute('transform'), transform, 'Mouse drag pans graph');
      await page.locator('#graph-interact').click();
      assert.equal(await page.locator('.graph-stage').evaluate(el => getComputedStyle(el).touchAction), 'none');
      await page.locator('#graph-interact').click();
      assert.equal(await page.locator('.graph-stage').evaluate(el => getComputedStyle(el).touchAction), 'pan-y');
      // Restore a readable selected view for the visual audit.
      await page.locator('#graph-node-select').selectOption('egypt');
      await layout(page, `graph ${width}`);
      await axe(page, `graph ${width}`);
      await shot(page, `graph-controls-${width}`, '.graph-picker');
      await shot(page, `graph-canvas-${width}`, '.graph-controls');
      await shot(page, `graph-inspector-${width}`, '#graph-info');
      await ctx.close();
    }
  });

  await test('sticky reader navigation, deep links, collapsed panels, print, reduced motion', async () => {
    for (const width of [320, 768, 1024, 1440]) {
      const ctx = await context({ viewport: { width, height: 900 } });
      const page = await ctx.newPage();
      await visit(page, 'reader.html?c=egypt');
      await page.locator('#sec-timeline > summary').click();
      assert.equal(await page.locator('#sec-timeline').getAttribute('open'), null);
      await page.waitForFunction(() => localStorage.getItem('civ-readers-collapsed:reader-timeline') === '1');
      await page.reload();
      assert.equal(await page.locator('#sec-timeline').getAttribute('open'), null, 'Collapsed preference persists');
      await page.locator('.toc-nav [href="#sec-timeline"]').click();
      assert.notEqual(await page.locator('#sec-timeline').getAttribute('open'), null, 'TOC reopens a collapsed timeline');
      await page.locator('.tl-event').last().focus(); await page.keyboard.press('Enter');
      assert.equal(await page.locator('.tl-event[aria-pressed="true"]').count(), 1);
      await page.locator('.toc-nav [href="#sec-context"]').click();
      await page.waitForFunction(() => document.querySelector('.toc-nav [href="#sec-context"]').getAttribute('aria-current') === 'location');
      const position = await page.evaluate(() => {
        const section = document.getElementById('sec-context').getBoundingClientRect();
        const toc = document.getElementById('reader-toc').getBoundingClientRect();
        const nav = document.getElementById('site-nav').getBoundingClientRect();
        return { section: section.top, chrome: innerWidth >= 1080 ? nav.bottom : toc.bottom, toc: toc.top, width: innerWidth };
      });
      assert.ok(position.section >= position.chrome - 1, `TOC covers section at ${width}: ${JSON.stringify(position)}`);
      assert.ok(Math.abs(position.toc - (width >= 1080 ? 82 : width >= 861 ? 64 : 0)) <= 3, `TOC not sticky at ${width}`);
      await layout(page, `reader scrolled ${width}`);
      await page.locator('.toc-nav [href="#museum"]').click();
      await page.waitForFunction(() => document.querySelector('.toc-nav [href="#museum"]').getAttribute('aria-current') === 'location');
      await shot(page, `reader-cheat-sheet-${width}`);
      await visit(page, 'reader.html?c=maya#sec-context');
      await page.waitForFunction(() => document.getElementById('sec-context').getBoundingClientRect().top < 180);
      await page.locator('#sec-timeline > summary').click();
      const closed = await page.locator('details:not([open])').count();
      await page.waitForFunction(() => localStorage.getItem('civ-readers-collapsed:reader-timeline') === (document.getElementById('sec-timeline').open ? '0' : '1'));
      const preferences = await page.evaluate(() => JSON.stringify(localStorage));
      await page.emulateMedia({ media: 'print' });
      await page.evaluate(() => window.dispatchEvent(new Event('beforeprint')));
      assert.equal(await page.locator('details:not([open])').count(), 0, 'Print includes collapsed periods and timelines');
      await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));
      await page.emulateMedia({ media: 'screen' });
      assert.equal(await page.locator('details:not([open])').count(), closed, 'Print restores collapsed panels');
      assert.equal(await page.evaluate(() => JSON.stringify(localStorage)), preferences, 'Printing must not overwrite reading preferences');
      assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto', 'Reduced motion respected');
      await ctx.close();
    }
  });

  await test('every internal page/reader/gallery/section link resolves', async () => {
    for (const link of links) {
      const url = new URL(link);
      const file = key(url);
      assert.ok(documents.has(file), `Unknown internal target ${url.href}`);
      if (url.hash) assert.ok(documents.get(file).has(decodeURIComponent(url.hash.slice(1))), `Broken anchor ${url.href}`);
      report.links++;
    }
  });

  await test('complete offline shell, unvisited readers, no cross-app cache deletion', async () => {
    const ctx = await context({ serviceWorkers: 'allow', viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    await visit(page, 'index.html');
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.waitForFunction(() => navigator.serviceWorker.controller?.state === 'activated');
    await page.evaluate(async () => {
      const cache = await caches.open('unrelated-app-v1');
      await cache.put('/unrelated-sentinel', new Response('keep'));
    });
    await disconnect(ctx, page);
    for (const file of ['index.html', 'reader.html?c=maya', 'routes.html', 'objects.html', 'guide.html', 'tours.html', 'sf.html']) {
      await visit(page, file);
      await layout(page, `offline ${file}`);
      if (file === 'routes.html') assert.equal(await page.locator('.map-pin').count(), 6);
    }
    assert.ok(await page.evaluate(async () => (await caches.keys()).includes('unrelated-app-v1')));
    const cacheURLs = await page.evaluate(async () => (await (await caches.open('civ-readers-v8')).keys()).map(r => r.url));
    assert.ok(cacheURLs.length >= 23 && cacheURLs.every(url => url.startsWith(base.href)), 'Only the complete local app shell is cached');
    await ctx.close();
  });

  if (server) await test('automatic recovery of an already-open broken v7 reader', async () => {
    const ctx = await context({ serviceWorkers: 'allow', viewport: { width: 390, height: 844 } });
    const page = await ctx.newPage();
    // A JSON page establishes the origin without booting the current app worker.
    await page.goto(new URL('metadata.json', base).href);
    await page.evaluate(async () => {
      await navigator.serviceWorker.register('__qa_legacy_sw.js', { scope: './' });
      await navigator.serviceWorker.ready;
      const cache = await caches.open('unrelated-app-v1');
      await cache.put('/unrelated-sentinel', new Response('keep'));
    });
    await page.waitForFunction(() => navigator.serviceWorker.controller?.state === 'activated');
    const response = await page.goto(new URL('reader.html?c=maya#sec-context', base).href);
    assert.match(await response.text(), /legacy-reader/, 'The visit must initially use the broken legacy shell');
    await page.locator('body[data-page="reader"] #sec-context').waitFor({ timeout: 30000 });
    assert.match(page.url(), /reader\.html\?c=maya#sec-context$/, 'Upgrade preserves the reader and section URL');
    await page.waitForFunction(async () => (await caches.keys()).includes('civ-readers-v8') && !(await caches.keys()).includes('civ-readers-v7'));
    assert.ok(await page.evaluate(async () => (await caches.keys()).includes('unrelated-app-v1')), 'Upgrade must not delete another app’s cache');
    await layout(page, 'legacy recovered');
    await disconnect(ctx, page);
    await visit(page, 'index.html');
    assert.equal(await page.locator('.card').count(), 53);
    await ctx.close();
  });

  report.status = 'passed';
} catch (error) {
  report.status = 'failed';
  report.error = error.stack;
  if (activePage && !activePage.isClosed()) report.diagnostics = await activePage.evaluate(async () => {
    const box = selector => {
      const el = document.querySelector(selector);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, height: r.height, margin: getComputedStyle(el).scrollMarginTop };
    };
    return {
      url: location.href, width: innerWidth, height: innerHeight, scrollY,
      context: box('#sec-context'), toc: box('#reader-toc'), nav: box('#site-nav'),
      controller: navigator.serviceWorker?.controller?.state,
      caches: typeof caches !== 'undefined' ? await caches.keys() : []
    };
  }).catch(() => null);
  if (activePage && !activePage.isClosed()) await activePage.screenshot({ path: path.join(artifacts, 'failure.png') }).catch(() => {});
  console.error(error);
  process.exitCode = 1;
} finally {
  report.finished = new Date().toISOString();
  report.browserErrors = errors;
  await fs.writeFile(path.join(artifacts, 'summary.json'), JSON.stringify(report, null, 2) + '\n');
  await browser.close();
  await Promise.all(gates.map(gate => gate.close()));
  if (server) await new Promise(resolve => server.close(resolve));
  console.log(`${report.status}: ${report.layouts} layout checks, ${report.accessibility} accessibility scans, ${report.links} internal links. Artifacts: ${artifacts}`);
}
