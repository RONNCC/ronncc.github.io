import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import { serve } from './serve.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const output = process.env.ARTIFACT_DIR || path.join(here, 'artifacts/review');
await fs.mkdir(output, { recursive: true });
const server = process.env.BASE_URL ? null : await serve(0);
const origin = process.env.BASE_URL || `http://127.0.0.1:${server.address().port}`;
const url = `${origin.replace(/\/$/, '')}/presentations/snoopy.html`;
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH } : {}),
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const failures = [];
const measurements = [];
const resources = new Set();
let axeScans = 0;
const check = (condition, message, detail = '') => {
  if (!condition) failures.push({ message, detail });
};
const sizes = [
  { name:'small-phone', width:320, height:568, mobile:true },
  { name:'phone', width:390, height:844, mobile:true },
  { name:'large-phone', width:430, height:932, mobile:true },
  { name:'tablet', width:768, height:1024, mobile:true },
  { name:'landscape', width:844, height:390, mobile:true },
  { name:'laptop', width:1366, height:768 },
  { name:'desktop', width:1440, height:900 }
];

async function contextFor(size, extra = {}) {
  const context = await browser.newContext({
    viewport:{ width:size.width, height:size.height },
    deviceScaleFactor:size.mobile ? 2 : 1,
    isMobile:Boolean(size.mobile), hasTouch:Boolean(size.mobile),
    reducedMotion:'reduce', ...extra
  });
  const page = await context.newPage();
  page.on('pageerror', error => failures.push({ message:`${size.name}: JavaScript error`, detail:error.message }));
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      failures.push({ message:`${size.name}: HTTP ${response.status()}`, detail:response.url() });
    }
  });
  page.on('request', request => resources.add(request.url()));
  return { context, page };
}
async function ready(page) {
  await page.locator('html.js').waitFor();
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all([...document.querySelectorAll('.slide.active img')].map(image => image.decode()));
  });
}
async function go(page, n) {
  await page.evaluate(n => { location.hash = `#slide${n}`; }, n);
  await page.locator(`#slide${n}.active`).waitFor();
  await ready(page);
}
async function layout(page, name, n) {
  const result = await page.locator('.slide.active').evaluate(slide => {
    const rect = element => {
      const r = element.getBoundingClientRect();
      return { x:r.x, y:r.y, width:r.width, height:r.height, right:r.right, bottom:r.bottom };
    };
    const smallText = [...slide.querySelectorAll('.story-list p,.panel p,.character-copy p,.persona-card p,.era p')]
      .filter(el => parseFloat(getComputedStyle(el).fontSize) < 16).map(el => el.textContent);
    return {
      viewport:innerWidth, bodyWidth:document.body.scrollWidth, documentWidth:document.documentElement.scrollWidth,
      slideWidth:slide.scrollWidth, clientWidth:slide.clientWidth,
      scrollHeight:slide.scrollHeight, clientHeight:slide.clientHeight,
      heading:rect(slide.querySelector('h2')), slide:rect(slide), nav:rect(document.querySelector('.deck-nav')),
      activeSlides:document.querySelectorAll('.slide:not([hidden])').length,
      hiddenSafe:[...document.querySelectorAll('.slide[hidden]')].every(el => el.inert && getComputedStyle(el).display === 'none'),
      smallText,
      images:[...slide.querySelectorAll('img')].map(image => ({
        alt:image.alt, width:image.naturalWidth, height:image.naturalHeight,
        fit:getComputedStyle(image).objectFit, rect:rect(image),
        frame:rect(image.closest('button')), source:new URL(image.currentSrc).pathname
      }))
    };
  });
  check(result.bodyWidth <= result.viewport + 1 && result.documentWidth <= result.viewport + 1, `${name} slide ${n}: page overflows sideways`, result);
  check(result.slideWidth <= result.clientWidth + 1, `${name} slide ${n}: slide overflows sideways`, result);
  check(result.heading.y >= result.slide.y - 1, `${name} slide ${n}: heading clipped at top`, result);
  check(result.slide.bottom <= result.nav.y + 1, `${name} slide ${n}: controls overlap slide`, result);
  check(result.activeSlides === 1 && result.hiddenSafe, `${name} slide ${n}: inactive slides are not inert/hidden`);
  check(result.smallText.length === 0, `${name} slide ${n}: body copy smaller than 16px`, result.smallText);
  for (const image of result.images) {
    check(image.width > 0 && image.height > 0, `${name} slide ${n}: broken image`, image);
    check(image.fit === 'contain', `${name} slide ${n}: cropped artwork`, image);
    check(image.rect.x >= result.slide.x && image.rect.right <= result.slide.right + 1, `${name} slide ${n}: image outside slide`, image);
    // Image badges use their own layout row; family portraits have no overlay.
  }
  if (['desktop','laptop'].includes(name)) check(result.scrollHeight <= result.clientHeight + 1, `${name} slide ${n}: should fit a presentation viewport`, result);
  await page.locator('.slide.active').evaluate(slide => { slide.scrollTop = slide.scrollHeight; });
  const bottom = await page.locator('.slide.active .content').evaluate(el => el.getBoundingClientRect().bottom);
  check(bottom <= result.nav.y + 1, `${name} slide ${n}: bottom content cannot be scrolled above controls`, { bottom, nav:result.nav.y });
  await page.locator('.slide.active').evaluate(slide => { slide.scrollTop = 0; });
  measurements.push({ name, slide:n, ...result });
}
async function fullSlide(page, file) {
  // A separate full-scroll capture, NOT a substitute for the actual viewport screenshot.
  await page.evaluate(() => {
    for (const el of [document.body, document.querySelector('.deck'), document.querySelector('.slide.active')]) {
      el.dataset.qaStyle = el.getAttribute('style') || '';
      el.style.height = 'auto'; el.style.overflow = 'visible'; el.style.display = 'block';
    }
  });
  await page.screenshot({ path:file, fullPage:true });
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[data-qa-style]')) {
      el.setAttribute('style', el.dataset.qaStyle); delete el.dataset.qaStyle;
    }
  });
}
async function checkImageDialog(page, label) {
  const boxes = await page.locator('#image-viewer').evaluate(dialog => {
    const rect = el => { const r = el.getBoundingClientRect(); return { top:r.top, right:r.right, bottom:r.bottom, left:r.left }; };
    return { width:innerWidth, height:innerHeight, overflow:dialog.scrollWidth > dialog.clientWidth + 1,
      close:rect(dialog.querySelector('[data-close-dialog]')), header:rect(dialog.querySelector('.dialog-header')),
      image:rect(dialog.querySelector('.image-viewport')), caption:rect(dialog.querySelector('.image-caption')) };
  });
  check(!boxes.overflow, `${label}: image dialog overflows sideways`, boxes);
  check(boxes.close.right <= boxes.width && boxes.close.left >= 0 && boxes.close.bottom <= boxes.height && boxes.close.top >= 0, `${label}: close control is offscreen`, boxes);
  check(boxes.image.top >= boxes.header.bottom - 1 && boxes.image.bottom <= boxes.caption.top + 1, `${label}: viewer controls overlap the image`, boxes);
}

async function scan(page, label) {
  const result = await new AxeBuilder({ page }).withTags(['wcag2a','wcag2aa','wcag21aa','best-practice']).analyze();
  axeScans++;
  check(result.violations.length === 0, `${label}: axe accessibility violations`, result.violations.map(v => ({ id:v.id, nodes:v.nodes.map(n => n.target) })));
}

try {
  for (const size of sizes) {
    const { context, page } = await contextFor(size);
    await page.goto(url, { waitUntil:'networkidle' });
    for (let n = 1; n <= 19; n++) {
      await go(page, n);
      await layout(page, size.name, n);
      await page.screenshot({ path:path.join(output, `${size.name}-${String(n).padStart(2,'0')}.png`) });
      if (['phone','desktop'].includes(size.name)) await scan(page, `${size.name} slide ${n}`);
      if (['phone','desktop'].includes(size.name) && [6,12,15,16].includes(n)) {
        await fullSlide(page, path.join(output, `${size.name}-${n}-full.png`));
      }
    }
    console.log(`Reviewed all 19 slides at ${size.width} × ${size.height} (${size.name})`);
    await context.close();
  }

  const { context, page } = await contextFor(sizes[1]);
  await page.goto(`${url}#slide12`); await ready(page);
  assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '12');
  assert.equal(await page.locator('#slide12 .image-button').count(), 7, 'All seven siblings need distinct portraits');

  // Keyboard, history, boundary states, and resetting a long slide's scroll position.
  await page.keyboard.press('ArrowRight'); await page.locator('#slide13.active').waitFor();
  await page.goBack(); await page.locator('#slide12.active').waitFor();
  await page.goForward(); await page.locator('#slide13.active').waitFor();
  await page.keyboard.press('ArrowLeft'); await page.locator('#slide12.active').waitFor();
  await page.locator('#slide12').evaluate(el => { el.scrollTop = 500; });
  await page.locator('#next-slide').click(); await page.locator('#slide13.active').waitFor();
  await page.keyboard.press('ArrowLeft'); await page.locator('#slide12.active').waitFor();
  assert.equal(await page.locator('#slide12').evaluate(el => el.scrollTop), 0);
  await page.keyboard.press('Home'); await page.locator('#slide1.active').waitFor();
  assert.equal(await page.locator('#previous-slide').isDisabled(), true);
  await page.keyboard.press('ArrowLeft'); assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '1');
  await page.keyboard.press('End'); await page.locator('#slide19.active').waitFor();
  assert.equal(await page.locator('#next-slide').isDisabled(), true);
  await page.keyboard.press('ArrowRight'); assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '19');

  // Native dialog focus, section hierarchy, current page, keyboard activation.
  await page.locator('#open-index').click();
  assert.equal(await page.locator('#slide-index .index-section').count(), 4);
  assert.equal(await page.locator('#slide-index [data-slide-target]').count(), 19);
  assert.equal(await page.locator('#slide-index [aria-current]').getAttribute('data-slide-target'), '19');
  await scan(page, 'slide index');
  await page.screenshot({ path:path.join(output, 'phone-index.png') });
  await page.locator('#slide-index [data-slide-target="12"]').focus();
  await page.keyboard.press('Space'); await page.locator('#slide12.active').waitFor();
  assert.equal(await page.locator('#slide-index').evaluate(el => el.open), false);
  assert.equal(await page.evaluate(() => document.activeElement.tagName), 'H2');

  // Every portrait can be enlarged. Navigation keys must not move the underlying deck.
  const pictures = page.locator('#slide12 .image-button');
  for (let i = 0; i < await pictures.count(); i++) {
    const button = pictures.nth(i);
    const name = await button.getAttribute('data-name');
    await button.click();
    await page.locator('#image-viewer[open]').waitFor();
    assert.equal(await page.locator('#image-title').textContent(), name);
    await page.locator('#viewer-image').evaluate(image => image.decode());
    await checkImageDialog(page, name);
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '12');
    await page.locator('#zoom-image').click();
    assert.equal(await page.locator('#zoom-image').getAttribute('aria-pressed'), 'true');
    assert.equal(await page.locator('#image-viewport').evaluate(el => el.scrollWidth > el.clientWidth), true);
    await page.locator('#zoom-image').click();
    if (name === 'Belle') {
      await page.screenshot({ path:path.join(output, 'phone-belle-detail.png') });
      await scan(page, 'image viewer');
    }
    await page.keyboard.press('Escape');
    assert.equal(await button.evaluate(el => el === document.activeElement), true, 'Closing the viewer returns focus to the portrait');
  }
  await page.locator('#open-notes').click();
  assert.match(await page.locator('#notes-body').textContent(), /Molly and Rover/);
  await scan(page, 'notes and sources');
  await page.screenshot({ path:path.join(output, 'phone-notes.png') });
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#open-notes').evaluate(el => el === document.activeElement), true);

  // Measurable touch targets, including the index trigger and both arrows.
  for (const selector of ['#previous-slide','#next-slide','#open-index','#open-notes','.back-link']) {
    const rect = await page.locator(selector).boundingBox();
    assert.ok(rect.height >= 44 && rect.width >= 44, `${selector} is at least 44 × 44 CSS pixels`);
  }

  // Real touch events: a diagonal/vertical scroll is not a horizontal slide swipe.
  await go(page, 12);
  const cdp = await context.newCDPSession(page);
  async function swipe(from, to) {
    await cdp.send('Input.dispatchTouchEvent', { type:'touchStart', touchPoints:[{ x:from[0], y:from[1] }] });
    for (let i = 1; i <= 6; i++) {
      await cdp.send('Input.dispatchTouchEvent', { type:'touchMove', touchPoints:[{ x:from[0]+(to[0]-from[0])*i/6, y:from[1]+(to[1]-from[1])*i/6 }] });
    }
    await cdp.send('Input.dispatchTouchEvent', { type:'touchEnd', touchPoints:[] });
  }
  await swipe([300,620],[200,290]);
  assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '12');
  assert.ok(await page.locator('#slide12').evaluate(el => el.scrollTop > 0), 'Vertical touch scroll actually moves content');
  await page.locator('#slide12').evaluate(el => { el.scrollTop = 0; });
  await swipe([320,135],[75,141]); await page.locator('#slide13.active').waitFor();
  await go(page, 12);
  await page.evaluate(() => {
    const el = document.querySelector('#slide12 h2');
    const touches = [new Touch({ identifier:1, target:el, clientX:100, clientY:140 }), new Touch({ identifier:2, target:el, clientX:220, clientY:140 })];
    el.dispatchEvent(new TouchEvent('touchstart', { touches, bubbles:true }));
    el.dispatchEvent(new TouchEvent('touchend', { touches:[], changedTouches:touches, bubbles:true }));
  });
  assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), '12', 'Pinch does not navigate');

  // Text resize (not a screenshot scale): every slide must still reflow at 200%.
  await page.evaluate(() => { document.documentElement.style.fontSize = '32px'; });
  for (let n = 1; n <= 19; n++) { await go(page, n); await layout(page, 'phone-text-200-percent', n); }
  await go(page, 12); await page.screenshot({ path:path.join(output, 'phone-text-200-percent.png') });
  await go(page, 10);
  await page.locator('#slide10 .image-button').click();
  await checkImageDialog(page, '200% text');
  await scan(page, '200% text image dialog');
  await page.keyboard.press('Escape');
  await page.evaluate(() => { document.documentElement.style.fontSize = ''; });
  for (const hash of ['#slide999','#slide0','#not-a-slide']) {
    await page.goto(url + hash); await ready(page);
    assert.equal(await page.locator('.slide.active').getAttribute('data-slide'), hash === '#slide999' ? '19' : '1');
  }
  await context.close();

  for (const size of [sizes[0], sizes[4]]) {
    const review = await contextFor(size);
    await review.page.goto(`${url}#slide10`); await ready(review.page);
    await review.page.locator('#slide10 .image-button').click();
    await checkImageDialog(review.page, size.name);
    await scan(review.page, `${size.name} image dialog`);
    await review.page.screenshot({ path:path.join(output, `${size.name}-image-detail.png`) });
    await review.context.close();
  }

  // Readable document fallback with JS off; visible explanation rather than silent image hiding.
  const fallback = await contextFor(sizes[1], { javaScriptEnabled:false });
  await fallback.page.goto(url);
  assert.equal(await fallback.page.locator('.slide:visible').count(), 19);
  assert.equal(await fallback.page.locator('noscript').isVisible(), true);
  await fallback.context.close();
  const broken = await contextFor(sizes[1]);
  await broken.page.route('**/images/snoopy/spike.webp', route => route.abort());
  await broken.page.goto(`${url}#slide12`);
  await broken.page.locator('#slide12 [data-failed]').waitFor();
  assert.match(await broken.page.locator('#slide12 .image-fallback').textContent(), /Spike.*image unavailable/);
  assert.equal(await broken.page.locator('#slide12 [data-failed]').isDisabled(), true);
  await broken.context.close();
  console.log('Interaction checks passed: keyboard, history, dialogs, zoom, touch, 200% text, no-JS, and image failure.');
} catch (error) {
  failures.push({ message:'Interaction/test error', detail:error.stack });
} finally {
  const summary = {
    browser:browser.version(), viewports:sizes, slideLayouts:measurements.length, axeScans,
    failures, resources:[...resources].sort(), measurements,
    capturedAt:new Date().toISOString()
  };
  await fs.writeFile(path.join(output, 'results.json'), JSON.stringify(summary,null,2));
  await browser.close();
  if (server) await new Promise(resolve => server.close(resolve));
}
if (failures.length) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else console.log(`PASS: ${measurements.length} slide layouts, ${axeScans} accessibility scans. Screenshots and results: ${output}`);
