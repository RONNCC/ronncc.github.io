---
layout: page
title: Coffee Guide
permalink: /coffee-guide/
description: A quick, searchable guide to coffee drinks, ingredients, and San Francisco menu names.
excerpt: A quick, searchable guide to coffee drinks, ingredients, and San Francisco menu names.
---

<style>
/* ──────────────────────────────────────────────────────────────────────────
   Coffee Guide — intentionally self-contained so the rest of the site stays
   as light and plain as it is.
   ────────────────────────────────────────────────────────────────────────── */
.cg-app {
  --cg-ink: #2d201b;
  --cg-muted: #76665c;
  --cg-paper: #fffaf3;
  --cg-cream: #f6eadb;
  --cg-line: #ead9c5;
  --cg-coffee: #65331f;
  --cg-caramel: #bf6d3d;
  --cg-coral: #b75032;
  --cg-sage: #4d806a;
  --cg-blue: #3d6d89;
  --cg-shadow: 0 16px 42px rgba(77, 45, 26, 0.10);
  width: min(1060px, calc(100vw - 2rem));
  margin-left: 50%;
  transform: translateX(-50%);
  color: var(--cg-ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
}

.cg-app *,
.cg-app *::before,
.cg-app *::after { box-sizing: border-box; }

.cg-app button,
.cg-app input { font: inherit; }

.cg-app a { color: var(--cg-coral); }
.cg-app a:hover { color: #843821; }
.cg-app button:focus-visible,
.cg-app input:focus-visible,
.cg-app a:focus-visible {
  outline: 3px solid rgba(61, 109, 137, .42);
  outline-offset: 3px;
}

.cg-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(320px, .98fr);
  align-items: center;
  gap: clamp(1.2rem, 4vw, 3.5rem);
  overflow: hidden;
  padding: clamp(1.25rem, 4vw, 3.25rem);
  border: 1px solid var(--cg-line);
  border-radius: 28px;
  background:
    radial-gradient(circle at 12% 12%, rgba(255,255,255,.7), transparent 33%),
    linear-gradient(135deg, #fffaf4 0%, #f4e4d1 100%);
  box-shadow: var(--cg-shadow);
}

.cg-kicker,
.cg-eyebrow {
  margin: 0 0 .7rem;
  color: var(--cg-caramel);
  font-size: .75rem;
  font-weight: 800;
  letter-spacing: .16em;
  line-height: 1.2;
  text-transform: uppercase;
}

.cg-hero h2 {
  max-width: 13ch;
  margin: 0;
  color: var(--cg-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(2.35rem, 6vw, 4.65rem);
  font-weight: 700;
  letter-spacing: -.055em;
  line-height: .98;
}

.cg-dek {
  max-width: 52ch;
  margin: 1.25rem 0 0;
  color: var(--cg-muted);
  font-size: clamp(1rem, 1.8vw, 1.15rem);
  line-height: 1.65;
}

.cg-hero-links {
  display: flex;
  flex-wrap: wrap;
  gap: .65rem;
  margin-top: 1.5rem;
}

.cg-hero-links a,
.cg-hero-links button {
  display: inline-flex;
  align-items: center;
  min-height: 2.45rem;
  padding: .55rem .9rem;
  border: 1px solid rgba(183, 80, 50, .28);
  border-radius: 999px;
  background: rgba(255,255,255,.56);
  color: var(--cg-coral);
  cursor: pointer;
  font-size: .88rem;
  font-weight: 750;
  text-decoration: none;
}

.cg-hero-links a:hover,
.cg-hero-links button:hover { background: #fff; text-decoration: none; }

.cg-hero-art {
  align-self: stretch;
  display: flex;
  align-items: center;
  min-width: 0;
}

.cg-hero-art img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 18px;
}

.cg-updated {
  margin: 1.2rem 0 0;
  color: #927f70;
  font-size: .78rem;
}

.cg-section { margin-top: clamp(2.2rem, 5vw, 4rem); }

.cg-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.15rem;
}

.cg-section-head h2 {
  margin: 0;
  color: var(--cg-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.75rem, 4vw, 2.55rem);
  letter-spacing: -.04em;
  line-height: 1.05;
}

.cg-section-head p {
  max-width: 43ch;
  margin: 0;
  color: var(--cg-muted);
  font-size: .95rem;
  line-height: 1.55;
  text-align: right;
}

.cg-math-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .8rem;
}

.cg-math-card {
  min-height: 166px;
  padding: 1.05rem 1rem 1.1rem;
  border: 1px solid var(--cg-line);
  border-radius: 16px;
  background: var(--cg-paper);
}

.cg-step {
  display: inline-grid;
  width: 1.65rem;
  height: 1.65rem;
  place-items: center;
  margin-bottom: .8rem;
  border-radius: 50%;
  background: var(--cg-coffee);
  color: #fff9f0;
  font-size: .75rem;
  font-weight: 800;
}

.cg-math-card h3 {
  margin: 0 0 .35rem;
  color: var(--cg-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.18rem;
  line-height: 1.15;
}

.cg-math-card p {
  margin: 0;
  color: var(--cg-muted);
  font-size: .86rem;
  line-height: 1.5;
}

.cg-callout {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: .9rem;
  margin-top: 1rem;
  padding: 1rem 1.15rem;
  border: 1px solid #e9c6a5;
  border-radius: 16px;
  background: #fff1e3;
}

.cg-callout-mark {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border-radius: 10px;
  background: #e9c6a5;
  color: #7e3c23;
  font-weight: 900;
}

.cg-callout p { margin: 0; color: #6d4734; font-size: .92rem; line-height: 1.55; }
.cg-callout strong { color: #4d2d20; }

.cg-search-panel {
  position: sticky;
  top: 12px;
  z-index: 10;
  padding: 1rem;
  border: 1px solid var(--cg-line);
  border-radius: 18px;
  background: rgba(255, 250, 243, .94);
  box-shadow: 0 10px 26px rgba(77, 45, 26, .08);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
}

.cg-search-line {
  display: flex;
  align-items: center;
  gap: .7rem;
}

.cg-search-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.cg-search-icon {
  display: grid;
  width: 2.45rem;
  height: 2.45rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 12px;
  background: #f0dfcc;
  color: var(--cg-coffee);
  font-size: 1.2rem;
}

.cg-search-input {
  width: 100%;
  min-width: 0;
  padding: .5rem 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--cg-ink);
  font-size: 1.05rem;
}

.cg-search-input::placeholder { color: #a18c7c; }

.cg-clear {
  display: none;
  flex: 0 0 auto;
  padding: .3rem .55rem;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: var(--cg-muted);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}

.cg-clear.is-visible { display: block; }
.cg-clear:hover { background: #f0dfcc; color: var(--cg-ink); }

.cg-filter-label {
  margin: .95rem 0 .45rem;
  color: #927f70;
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.cg-filters {
  display: flex;
  flex-wrap: wrap;
  gap: .45rem;
}

.cg-filter {
  padding: .42rem .72rem;
  border: 1px solid var(--cg-line);
  border-radius: 999px;
  background: #fff;
  color: var(--cg-muted);
  cursor: pointer;
  font-size: .78rem;
  font-weight: 700;
  line-height: 1.2;
  transition: background .15s ease, border-color .15s ease, color .15s ease, transform .15s ease;
}

.cg-filter:hover { border-color: #c89670; color: var(--cg-ink); transform: translateY(-1px); }
.cg-filter.is-active { border-color: var(--cg-coffee); background: var(--cg-coffee); color: #fff8ef; }

.cg-results-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.15rem 0 .75rem;
}

.cg-results-count { margin: 0; color: var(--cg-muted); font-size: .88rem; }
.cg-results-count strong { color: var(--cg-ink); }
.cg-results-hint { margin: 0; color: #a18c7c; font-size: .78rem; text-align: right; }

.cg-results {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: .85rem;
}

.cg-card {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 1.1rem 1.1rem 1.15rem;
  border: 1px solid var(--cg-line);
  border-radius: 17px;
  background: var(--cg-paper);
  transition: border-color .15s ease, box-shadow .15s ease, transform .15s ease;
}

.cg-card:hover {
  border-color: #d4a37b;
  box-shadow: 0 9px 22px rgba(77, 45, 26, .08);
  transform: translateY(-2px);
}

.cg-card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: .65rem;
  min-height: 1.55rem;
}

.cg-category {
  display: inline-flex;
  align-items: center;
  padding: .27rem .55rem;
  border-radius: 7px;
  background: #f0dfcc;
  color: #7a482f;
  font-size: .68rem;
  font-weight: 850;
  letter-spacing: .05em;
  line-height: 1.1;
  text-transform: uppercase;
}

.cg-category[data-category="cold"] { background: #dff0ec; color: #28634f; }
.cg-category[data-category="brewed"] { background: #e5e6f5; color: #4f547d; }
.cg-category[data-category="noncoffee"] { background: #e9e8d8; color: #64643b; }
.cg-category[data-category="signature"] { background: #f8dcd0; color: #973e28; }

.cg-card-shops {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: .25rem;
}

.cg-shop-tag {
  color: #9c806d;
  font-size: .68rem;
  font-weight: 750;
  line-height: 1.25;
  text-align: right;
}

.cg-card h3 {
  margin: .75rem 0 .3rem;
  color: var(--cg-ink);
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.25rem, 2.4vw, 1.55rem);
  letter-spacing: -.025em;
  line-height: 1.12;
}

.cg-aliases {
  margin: 0 0 .65rem;
  color: #9b806d;
  font-size: .75rem;
  line-height: 1.4;
}

.cg-meaning {
  margin: 0 0 .85rem;
  color: var(--cg-muted);
  font-size: .9rem;
  line-height: 1.55;
}

.cg-detail-box {
  margin-top: auto;
  padding-top: .7rem;
  border-top: 1px dashed #e4cdb6;
}

.cg-detail-row {
  display: grid;
  grid-template-columns: 5.4rem 1fr;
  gap: .55rem;
  padding: .28rem 0;
  font-size: .82rem;
  line-height: 1.45;
}

.cg-detail-row + .cg-detail-row { border-top: 1px solid rgba(234, 217, 197, .55); }
.cg-detail-row strong { color: #8b4d2c; font-size: .7rem; letter-spacing: .06em; text-transform: uppercase; }
.cg-detail-row span { color: #4f4037; }

.cg-seasonal {
  display: inline-block;
  margin: .75rem 0 0;
  color: var(--cg-coral);
  font-size: .72rem;
  font-weight: 800;
  letter-spacing: .04em;
}

.cg-no-results {
  grid-column: 1 / -1;
  padding: 2rem 1rem;
  border: 1px dashed #d8b99b;
  border-radius: 16px;
  background: #fffaf3;
  color: var(--cg-muted);
  text-align: center;
}

.cg-sf-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: .75rem;
}

.cg-sf-card {
  padding: 1rem;
  border: 1px solid var(--cg-line);
  border-radius: 15px;
  background: #fff;
}

.cg-sf-card h3 { margin: 0 0 .4rem; color: var(--cg-ink); font-size: 1rem; line-height: 1.2; }
.cg-sf-card p { margin: 0; color: var(--cg-muted); font-size: .82rem; line-height: 1.5; }
.cg-sf-card button { margin-top: .75rem; padding: 0; border: 0; background: transparent; color: var(--cg-coral); cursor: pointer; font-size: .78rem; font-weight: 800; }
.cg-sf-card button:hover { text-decoration: underline; }

.cg-order-card {
  display: grid;
  grid-template-columns: minmax(0, .8fr) minmax(0, 1.2fr);
  gap: 1rem;
  align-items: center;
  padding: clamp(1.2rem, 3vw, 2rem);
  border-radius: 20px;
  background: var(--cg-coffee);
  color: #fff8ef;
  box-shadow: var(--cg-shadow);
}

.cg-order-card h2 {
  margin: 0;
  color: #fff8ef;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(1.7rem, 4vw, 2.5rem);
  letter-spacing: -.04em;
  line-height: 1.04;
}

.cg-order-card p { margin: 0; color: #f1dfcb; font-size: .95rem; line-height: 1.6; }
.cg-order-example { margin-top: .7rem !important; color: #fff8ef !important; font-weight: 750; }
.cg-order-example code { display: inline; padding: .15rem .4rem; border-radius: 5px; background: rgba(255,255,255,.12); color: #fff8ef; font: inherit; }

.cg-sources {
  padding: 1rem 0 .35rem;
  color: #927f70;
  font-size: .75rem;
  line-height: 1.6;
}

.cg-sources p { margin: 0 0 .55rem; }
.cg-sources strong { color: #705543; }
.cg-sources a { color: #8f5d41; }
.cg-sources ul { margin: .45rem 0 0; padding-left: 1.2rem; }
.cg-sources li { margin: .18rem 0; }

@media screen and (max-width: 900px) {
  .cg-hero { grid-template-columns: 1fr; }
  .cg-hero h2 { max-width: 15ch; }
  .cg-hero-art { order: -1; }
  .cg-hero-art img { max-height: 330px; object-fit: cover; object-position: center; }
  .cg-sf-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media screen and (max-width: 700px) {
  .cg-app { width: 100%; margin-left: 0; transform: none; }
  .cg-hero { gap: 1.2rem; padding: 1.15rem; border-radius: 20px; }
  .cg-hero-art img { border-radius: 13px; }
  .cg-section { margin-top: 2.4rem; }
  .cg-section-head { display: block; }
  .cg-section-head p { margin-top: .55rem; text-align: left; }
  .cg-math-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cg-math-card { min-height: 0; }
  .cg-search-panel { top: 6px; border-radius: 14px; }
  .cg-results-line { display: block; }
  .cg-results-hint { margin-top: .25rem; text-align: left; }
  .cg-results { grid-template-columns: 1fr; }
  .cg-sf-grid { grid-template-columns: 1fr; }
  .cg-order-card { grid-template-columns: 1fr; }
}

@media screen and (max-width: 430px) {
  .cg-math-grid { grid-template-columns: 1fr; }
  .cg-math-card { display: grid; grid-template-columns: auto 1fr; column-gap: .7rem; align-items: start; }
  .cg-step { grid-row: span 2; margin-bottom: 0; }
  .cg-math-card p { grid-column: 2; }
}

@media (prefers-reduced-motion: reduce) {
  .cg-card, .cg-filter { transition: none; }
}
</style>

<div class="cg-app">
  <section class="cg-hero" aria-labelledby="cg-hero-title">
    <div>
      <p class="cg-kicker">San Francisco coffee field notes</p>
      <h2 id="cg-hero-title">Read the menu. Order the thing.</h2>
      <p class="cg-dek">A friendly decoder for espresso ratios, milk textures, cold coffee, and the wonderfully specific names you’ll run into at SF cafés.</p>
      <div class="cg-hero-links" aria-label="Guide sections">
        <a href="#cg-decoder">Start with the ratio ↓</a>
        <a href="#cg-lookup">Look up a drink ↓</a>
      </div>
      <p class="cg-updated">Classic definitions + SF menu sightings · last checked August 14, 2026</p>
    </div>
    <div class="cg-hero-art">
      <img src="{{ site.baseurl }}/images/coffee-guide.svg" alt="Illustrated ratio map: espresso, cortado, cappuccino, latte, and cold coffee with fizz." width="1200" height="430" />
    </div>
  </section>

  <section class="cg-section" id="cg-decoder" aria-labelledby="cg-decoder-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">The 30-second decoder</p>
        <h2 id="cg-decoder-title">Most orders are just coffee math.</h2>
      </div>
      <p>Start with the base, then notice what gets added. A shop’s exact ounces and foam can vary; these are the useful ideas behind the names.</p>
    </div>

    <div class="cg-math-grid">
      <article class="cg-math-card">
        <span class="cg-step">1</span>
        <h3>Pick a base</h3>
        <p>Espresso is concentrated coffee. Drip, pour-over, and cold brew are all brewed coffee, just made different ways.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step">2</span>
        <h3>Pick the body</h3>
        <p>Water makes an Americano. Steamed milk makes a cortado, cappuccino, flat white, or latte.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step">3</span>
        <h3>Pick the temperature</h3>
        <p>“Iced” usually means ice plus a chilled drink. A shakerato is shaken cold; nitro is cold brew with nitrogen.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step">4</span>
        <h3>Pick the accent</h3>
        <p>Chocolate, honey, mint, tonic, chicory, or a seasonal syrup turns a familiar base into a house signature.</p>
      </article>
    </div>

    <div class="cg-callout">
      <span class="cg-callout-mark" aria-hidden="true">!</span>
      <p><strong>Two tiny traps:</strong> a <strong>macchiato</strong> traditionally means espresso “marked” with a little foam — not automatically a giant caramel drink. And a <strong>Gibraltar</strong> is essentially a small cortado; in SF, the glass and the local name are part of the fun.</p>
    </div>
  </section>

  <section class="cg-section" id="cg-lookup" aria-labelledby="cg-lookup-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">The useful bit</p>
        <h2 id="cg-lookup-title">Look it up at the counter.</h2>
      </div>
      <p>Search a drink, ingredient, alias, or shop. Try <em>tonic</em>, <em>macadamia</em>, <em>Philz</em>, or <em>small and milky</em>.</p>
    </div>

    <div class="cg-search-panel">
      <div class="cg-search-line">
        <span class="cg-search-icon" aria-hidden="true">⌕</span>
        <label class="cg-search-label" for="cg-search">Search drinks, ingredients, or cafés</label>
        <input class="cg-search-input" id="cg-search" type="search" placeholder="Search drinks, ingredients, or cafés…" autocomplete="off" />
        <button class="cg-clear" id="cg-clear" type="button" aria-label="Clear search">×</button>
      </div>

      <p class="cg-filter-label">Drink family</p>
      <div class="cg-filters" id="cg-category-filters" aria-label="Filter by drink family">
        <button class="cg-filter is-active" type="button" data-filter="all" aria-pressed="true">All</button>
        <button class="cg-filter" type="button" data-filter="espresso" aria-pressed="false">Espresso</button>
        <button class="cg-filter" type="button" data-filter="milk" aria-pressed="false">Milk drinks</button>
        <button class="cg-filter" type="button" data-filter="brewed" aria-pressed="false">Brewed</button>
        <button class="cg-filter" type="button" data-filter="cold" aria-pressed="false">Cold &amp; sparkling</button>
        <button class="cg-filter" type="button" data-filter="signature" aria-pressed="false">SF signatures</button>
        <button class="cg-filter" type="button" data-filter="noncoffee" aria-pressed="false">Not coffee</button>
      </div>

      <p class="cg-filter-label">Shop lens</p>
      <div class="cg-filters" id="cg-shop-filters" aria-label="Filter by San Francisco coffee shop">
        <button class="cg-filter is-active" type="button" data-shop-filter="all" aria-pressed="true">All shops</button>
        <button class="cg-filter" type="button" data-shop-filter="Saint Frank" aria-pressed="false">Saint Frank</button>
        <button class="cg-filter" type="button" data-shop-filter="Blue Bottle" aria-pressed="false">Blue Bottle</button>
        <button class="cg-filter" type="button" data-shop-filter="Ritual" aria-pressed="false">Ritual</button>
        <button class="cg-filter" type="button" data-shop-filter="Sightglass" aria-pressed="false">Sightglass</button>
        <button class="cg-filter" type="button" data-shop-filter="Andytown" aria-pressed="false">Andytown</button>
        <button class="cg-filter" type="button" data-shop-filter="Philz" aria-pressed="false">Philz</button>
        <button class="cg-filter" type="button" data-shop-filter="Four Barrel" aria-pressed="false">Four Barrel</button>
      </div>
    </div>

    <div class="cg-results-line">
      <p class="cg-results-count" id="cg-results-count" aria-live="polite"></p>
      <p class="cg-results-hint">Ratios are guidelines, not café law.</p>
    </div>
    <div class="cg-results" id="cg-results"></div>
    <noscript><p class="cg-no-results">This lookup needs JavaScript enabled. The quick ratio map and the shop notes below still work without it.</p></noscript>
  </section>

  <section class="cg-section" id="cg-sf" aria-labelledby="cg-sf-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">San Francisco menu fingerprints</p>
        <h2 id="cg-sf-title">Names you’ll actually see here.</h2>
      </div>
      <p>These are the local clues that make a menu feel more SF than generic coffee-chain vocabulary. Tap a shop to filter the lookup above.</p>
    </div>

    <div class="cg-sf-grid">
      <article class="cg-sf-card">
        <h3>Saint Frank</h3>
        <p><strong>Look for:</strong> Little Brother, Café Miel, Kaffe Tonic, Kaffe Cola, coffee flights, house almond-macadamia milk, and seasonal orange, honey-lavender, or pine lattes.</p>
        <button type="button" data-shop-jump="Saint Frank">Show Saint Frank terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Blue Bottle</h3>
        <p><strong>Look for:</strong> Gibraltar, NOLA / New Orleans-style iced coffee, Shakerato, pour-over, and a very compact espresso vocabulary.</p>
        <button type="button" data-shop-jump="Blue Bottle">Show Blue Bottle terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Ritual</h3>
        <p><strong>Look for:</strong> Gibraltar (often glossed as cortado), flat white, plus rotating signatures such as Foggy Latte, ‘Spromoni, and Tamarindo Lindo.</p>
        <button type="button" data-shop-jump="Ritual">Show Ritual terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Sightglass</h3>
        <p><strong>Look for:</strong> Quick Cup, pour-over, espresso tonic, vanilla paste latte, and seasonal drinks like cardamom mocha or brown-butter-miso caramel latte.</p>
        <button type="button" data-shop-jump="Sightglass">Show Sightglass terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Andytown</h3>
        <p><strong>Look for:</strong> Snowy Plover, also called Original Bird in some menu listings — espresso, sparkling water, sweetness, ice, and whipped cream.</p>
        <button type="button" data-shop-jump="Andytown">Show Andytown terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Philz</h3>
        <p><strong>Look for:</strong> Mint Mojito, Philtered Soul, Tesora, Honey Haze, Iced Coffee Rosé, and other named blends. Philz names are often a blend or signature build, not an espresso ratio.</p>
        <button type="button" data-shop-jump="Philz">Show Philz terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Four Barrel</h3>
        <p><strong>Look for:</strong> straightforward espresso, cortado, latte, iced coffee, and filter / slow-bar coffee that lets the roast do the talking.</p>
        <button type="button" data-shop-jump="Four Barrel">Show Four Barrel terms →</button>
      </article>
    </div>
  </section>

  <section class="cg-section" aria-labelledby="cg-order-title">
    <div class="cg-order-card">
      <h2 id="cg-order-title">A no-stress way to order.</h2>
      <div>
        <p>Say <strong>size + temperature + base + milk + sweetness</strong>. The barista can translate the rest. You never need to pretend you already know the menu.</p>
        <p class="cg-order-example"><code>small iced latte · oat milk · half sweet</code></p>
      </div>
    </div>
  </section>

  <footer class="cg-sources">
    <p><strong>Sources &amp; caveat.</strong> Classic drink definitions are intentionally approximate: cafés use different cup sizes, shot counts, and milk textures. Seasonal names can disappear or change.</p>
    <p>Menu vocabulary cross-checked against <a href="https://www.saintfrankcoffee.com/" target="_blank" rel="noopener">Saint Frank</a>, <a href="https://blog.bluebottlecoffee.com/posts/blue-bottle-reopening-menu" target="_blank" rel="noopener">Blue Bottle’s drink menu notes</a>, <a href="https://ritualcoffee.com/news/signature-beverages-fall-23/" target="_blank" rel="noopener">Ritual’s signature-beverage notes</a>, <a href="https://sightglasscoffee.com/blogs/blog/signature-espresso-beverages" target="_blank" rel="noopener">Sightglass’s signature-beverage notes</a>, <a href="https://philzcoffee.com/menu/coffee" target="_blank" rel="noopener">Philz’s coffee menu</a>, <a href="https://www.fourbarrelcoffee.com/pages/about-us" target="_blank" rel="noopener">Four Barrel</a>, and <a href="https://sf.eater.com/2019/2/5/18212681/andytown-cafe-downtown-san-francisco-open" target="_blank" rel="noopener">Eater’s Andytown profile</a>.</p>
  </footer>
</div>

<script>
(function () {
  "use strict";

  var drinks = [
    {
      name: "Espresso",
      aliases: ["single shot", "short black", "single origin espresso"],
      category: "espresso",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel"],
      meaning: "A small, concentrated coffee made by pushing hot water through finely ground coffee. It is a brewing method, not a particular bean or roast.",
      ingredients: "1 shot (or 2) espresso; no milk or water added.",
      order: "an espresso"
    },
    {
      name: "Doppio",
      aliases: ["double espresso", "two shots"],
      category: "espresso",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel"],
      meaning: "Doppio is simply Italian for double. If a menu says double espresso, it is asking for two shots in one small drink.",
      ingredients: "2 shots espresso; usually about 2 oz total.",
      order: "a doppio"
    },
    {
      name: "Ristretto",
      aliases: ["short shot"],
      category: "espresso",
      shops: ["Saint Frank", "Ritual", "Sightglass"],
      meaning: "A shorter espresso pull using less water. It tends to taste concentrated and syrupy, though the actual flavor depends on the coffee and recipe.",
      ingredients: "Finely ground coffee + less water than a normal espresso shot.",
      order: "a ristretto shot, if you offer it"
    },
    {
      name: "Americano",
      aliases: ["iced americano", "espresso with water"],
      category: "espresso",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Blue Bottle", "Four Barrel"],
      meaning: "Espresso lengthened with water. It is the black-coffee option at an espresso bar and can be hot or iced.",
      ingredients: "Espresso + hot water; iced versions use cold water and ice.",
      order: "a hot Americano"
    },
    {
      name: "Red Eye",
      aliases: ["shot in drip", "depth charge"],
      category: "brewed",
      shops: ["Ritual", "Four Barrel"],
      meaning: "Brewed coffee with an espresso shot added. It keeps the flavor of drip coffee but adds a concentrated coffee bump.",
      ingredients: "Drip or batch coffee + 1 espresso shot; a black eye usually means 2 shots.",
      order: "a red eye"
    },
    {
      name: "Macchiato",
      aliases: ["espresso macchiato", "marked espresso"],
      category: "milk",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel"],
      meaning: "Macchiato means marked or stained: espresso marked with a small spoonful of foamed milk. It is much smaller and stronger than a latte.",
      ingredients: "1–2 shots espresso + a little steamed or foamed milk.",
      order: "a traditional espresso macchiato"
    },
    {
      name: "Cortado",
      aliases: ["Spanish-style coffee", "equal espresso and milk"],
      category: "milk",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel"],
      meaning: "Cortado comes from cortar, to cut: espresso cut with roughly equal parts warm steamed milk. Little foam, lots of coffee flavor.",
      ingredients: "Espresso + about the same amount of steamed milk; commonly 4–6 oz total.",
      order: "a cortado"
    },
    {
      name: "Gibraltar",
      aliases: ["SF cortado", "small glass of espresso and milk"],
      category: "milk",
      shops: ["Blue Bottle", "Ritual"],
      meaning: "The San Francisco name for a small, balanced espresso-and-milk drink, traditionally served in a 4.5 oz Gibraltar glass. Most cafés treat it as a cortado twin.",
      ingredients: "Usually a double espresso + a similar amount of lightly textured milk.",
      order: "a Gibraltar — or a cortado if that is what you call it"
    },
    {
      name: "Cappuccino",
      aliases: ["competition cappuccino", "dry cappuccino"],
      category: "milk",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel"],
      meaning: "Espresso with textured steamed milk and more foam than a latte. Specialty cafés often make it smaller and coffee-forward; sizes are not universal.",
      ingredients: "Espresso + steamed milk + a thicker layer of microfoam.",
      order: "a cappuccino, not too dry"
    },
    {
      name: "Flat White",
      aliases: ["microfoam coffee", "small latte"],
      category: "milk",
      shops: ["Ritual", "Sightglass"],
      meaning: "A small espresso-and-milk drink with very fine, thin microfoam. Usually more concentrated and less foamy than a traditional cappuccino.",
      ingredients: "Usually a double espresso + smooth steamed milk in a smaller cup.",
      order: "a flat white"
    },
    {
      name: "Latte",
      aliases: ["caffè latte", "iced latte", "oat latte"],
      category: "milk",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel", "Blue Bottle"],
      meaning: "The milk-forward classic: espresso, plenty of steamed milk, and a thin layer of microfoam. Iced lattes use cold milk and ice instead.",
      ingredients: "Espresso + a larger volume of steamed or cold milk.",
      order: "a small oat latte, iced"
    },
    {
      name: "Mocha",
      aliases: ["caffè mocha", "iced mocha"],
      category: "milk",
      shops: ["Saint Frank", "Sightglass", "Four Barrel", "Philz"],
      meaning: "A latte with chocolate. The chocolate may be syrup, cocoa, ganache, or a house blend, so sweetness varies a lot by café.",
      ingredients: "Espresso + milk + chocolate; whipped cream is optional, not automatic.",
      order: "a mocha, lightly sweet if possible"
    },
    {
      name: "Café au Lait",
      aliases: ["coffee with milk", "drip au lait"],
      category: "milk",
      shops: ["Andytown", "Ritual", "Sightglass"],
      meaning: "Brewed coffee with warm or steamed milk. Unlike a latte, the coffee base is drip or filter coffee, not espresso.",
      ingredients: "Hot drip/filter coffee + roughly equal warm milk.",
      order: "a café au lait"
    },
    {
      name: "Breve",
      aliases: ["café breve", "half-and-half latte"],
      category: "milk",
      shops: ["Ritual", "Sightglass"],
      meaning: "A latte made with half-and-half instead of milk. It is richer and heavier; many specialty shops do not list it but can make one.",
      ingredients: "Espresso + steamed half-and-half.",
      order: "a breve, if you have half-and-half"
    },
    {
      name: "Espresso con Panna",
      aliases: ["con panna", "espresso with whipped cream"],
      category: "milk",
      shops: ["Ritual", "Sightglass"],
      meaning: "Espresso topped with whipped cream. Dessert-like, but the drink itself is tiny and still tastes strongly of espresso.",
      ingredients: "1–2 shots espresso + a spoonful of whipped cream.",
      order: "an espresso con panna"
    },
    {
      name: "Drip / Batch / Filter Coffee",
      aliases: ["quick cup", "house coffee", "regular coffee"],
      category: "brewed",
      shops: ["Saint Frank", "Ritual", "Sightglass", "Four Barrel", "Andytown"],
      meaning: "Coffee brewed through a paper filter, often in a larger batch. “Quick Cup” is Sightglass-style menu language for a ready-to-pour filter coffee.",
      ingredients: "Ground coffee + hot water through a filter.",
      order: "the house drip"
    },
    {
      name: "Pour-over / V60",
      aliases: ["hand brew", "single origin pour-over", "filter brew"],
      category: "brewed",
      shops: ["Saint Frank", "Blue Bottle", "Sightglass", "Four Barrel", "Ritual"],
      meaning: "A brewing method, not a flavor. A barista pours water by hand through coffee and a paper filter, often one cup at a time.",
      ingredients: "Ground coffee + several controlled pours of hot water + paper filter.",
      order: "the single-origin pour-over — what is tasting best today?"
    },
    {
      name: "French Press",
      aliases: ["press pot", "cafetiere"],
      category: "brewed",
      shops: ["Four Barrel", "Andytown"],
      meaning: "Coffee steeped in water and separated with a plunger. It usually has a fuller body because some oils and fine particles remain.",
      ingredients: "Coarsely ground coffee + hot water, steeped and pressed.",
      order: "a French press, if you are serving it"
    },
    {
      name: "Coffee Flight",
      aliases: ["single-origin flight", "four ways", "tasting flight"],
      category: "brewed",
      shops: ["Saint Frank"],
      meaning: "Not one drink: a tasting set. Saint Frank has used “single origin coffee four ways” for a small tour of how the same coffee changes across preparations.",
      ingredients: "Several small coffees, often espresso, filter, pour-over, or other brew methods.",
      order: "the coffee flight — what is included today?"
    },
    {
      name: "Cold Brew",
      aliases: ["iced cold brew", "cold coffee"],
      category: "cold",
      shops: ["Ritual", "Sightglass", "Philz", "Four Barrel", "Blue Bottle"],
      meaning: "Coffee steeped in cold water for many hours, then strained. It is usually smooth and mellow, and may be served diluted or concentrated.",
      ingredients: "Coffee + cold water + a long steep; ice and milk are optional.",
      order: "a cold brew, black"
    },
    {
      name: "Iced Coffee",
      aliases: ["iced filter", "iced filter coffee", "iced drip"],
      category: "cold",
      shops: ["Saint Frank", "Four Barrel", "Andytown", "Philz"],
      meaning: "Usually hot-brewed coffee chilled over ice. It is not automatically cold brew, and it often tastes brighter or more aromatic.",
      ingredients: "Hot-brewed filter coffee + ice; milk and sweetener are optional.",
      order: "an iced coffee, lightly sweet"
    },
    {
      name: "Nitro Cold Brew",
      aliases: ["nitro", "nitrogen coffee"],
      category: "cold",
      shops: ["Saint Frank", "Ritual", "Four Barrel"],
      meaning: "Cold brew infused with nitrogen through a tap. The tiny bubbles give it a creamy-looking pour without dairy.",
      ingredients: "Cold brew + nitrogen; milk is optional.",
      order: "a nitro cold brew"
    },
    {
      name: "Shakerato",
      aliases: ["shaken espresso", "iced shaken coffee"],
      category: "cold",
      shops: ["Blue Bottle"],
      meaning: "Espresso shaken hard with ice, sometimes with simple syrup. It comes out cold, aerated, and lightly foamy without milk.",
      ingredients: "Espresso + ice; sweetener may be shaken in.",
      order: "a Shakerato — is it sweetened?"
    },
    {
      name: "Espresso Tonic / Kaffe Tonic",
      aliases: ["coffee tonic", "tonic coffee"],
      category: "cold",
      shops: ["Saint Frank", "Sightglass"],
      meaning: "A bright, bitter, fizzy drink: espresso poured over tonic and ice. Kaffe Tonic is Saint Frank’s local-flavored name for the idea.",
      ingredients: "Espresso + tonic water + ice; citrus garnish is a common extra.",
      order: "a Kaffe Tonic — espresso over tonic, right?"
    },
    {
      name: "Kaffe Cola",
      aliases: ["espresso cola", "coffee and cola"],
      category: "cold",
      shops: ["Saint Frank"],
      meaning: "A playful coffee-soda build. Expect espresso or cold coffee over cola and ice; the exact cola and proportions are house-specific.",
      ingredients: "Coffee or espresso + cola + ice; citrus may appear.",
      order: "the Kaffe Cola — what is the current build?"
    },
    {
      name: "New Orleans Iced / NOLA",
      aliases: ["New Orleans-style iced coffee", "coffee chicory"],
      category: "signature",
      shops: ["Blue Bottle"],
      meaning: "Blue Bottle’s famous sweet, creamy iced coffee. The New Orleans cue means roasted chicory is part of the cold brew, not just a geographic name.",
      ingredients: "Cold-brewed coffee + roasted chicory + cane sugar + milk or cream.",
      order: "a NOLA — how sweet and which milk?"
    },
    {
      name: "Snowy Plover",
      aliases: ["Original Bird", "espresso cream soda", "Andytown signature"],
      category: "signature",
      shops: ["Andytown"],
      meaning: "Andytown’s signature is a cold, fizzy espresso drink that lands somewhere between coffee and cream soda. Original Bird is a name you may see for a very similar build.",
      ingredients: "Sparkling water + ice + espresso + simple syrup + house whipped cream.",
      order: "a Snowy Plover — original or seasonal?"
    },
    {
      name: "Matcha Plover",
      aliases: ["Andytown matcha snowy", "green Plover"],
      category: "noncoffee",
      shops: ["Andytown"],
      meaning: "The Plover format with matcha instead of espresso. It is a useful reminder that signature names often describe a shop’s build, not the caffeine source.",
      ingredients: "Sparkling water + ice + matcha + sweetness + whipped cream.",
      order: "a Matcha Plover"
    },
    {
      name: "Philz Mint Mojito",
      aliases: ["Mint Mojito iced coffee", "sweet and creamy"],
      category: "signature",
      shops: ["Philz"],
      meaning: "No alcohol: it is Philz’s minty iced coffee signature. “Sweet and creamy” is the classic starting point, but sweetness and cream can be adjusted.",
      ingredients: "Iced coffee + fresh mint + sweetener + cream or milk.",
      order: "a Mint Mojito, sweet and creamy"
    },
    {
      name: "Philz Philtered Soul Cold Brew",
      aliases: ["Philtered Soul", "hazelnut cold brew"],
      category: "signature",
      shops: ["Philz"],
      meaning: "A named Philz coffee / cold-brew favorite with a nutty, sweet profile. It is a brand blend name, not a universal preparation term.",
      ingredients: "Cold brew or brewed Philtered Soul coffee; menu notes call out hazelnut, maple, and caramel.",
      order: "Philtered Soul, hot or iced"
    },
    {
      name: "Philz Honey Haze",
      aliases: ["Honey Haze cold brew"],
      category: "signature",
      shops: ["Philz"],
      meaning: "A named Philz build for someone who wants cold coffee with gentle sweetness and a creamy oat finish.",
      ingredients: "Philtered Soul cold brew + honey + oat milk.",
      order: "a Honey Haze"
    },
    {
      name: "Philz Iced Coffee Rosé",
      aliases: ["Coffee Rosé", "rose iced coffee"],
      category: "signature",
      shops: ["Philz"],
      meaning: "A floral, sweet, creamy iced coffee. The rosy part is the flavor / cream accent, not wine.",
      ingredients: "Iced coffee + rose flavor or rose cream + sweetness + cream or milk.",
      order: "an Iced Coffee Rosé"
    },
    {
      name: "Philz Oatmeal Cookie Cold Brew",
      aliases: ["Oatmeal Cookie", "cinnamon cold brew"],
      category: "signature",
      shops: ["Philz"],
      meaning: "A dessert-leaning cold coffee whose name tells you the flavor target: cinnamon, oat, and cookie-like sweetness.",
      ingredients: "Mission cold brew + cinnamon + oat milk.",
      order: "an Oatmeal Cookie Cold Brew"
    },
    {
      name: "Philz Mocha Tesora",
      aliases: ["Mocha", "Tesora iced mocha"],
      category: "signature",
      shops: ["Philz"],
      meaning: "Philz’s Tesora blend in a chocolate drink. Tesora itself is a blend name with caramel, chocolate, and nutty notes.",
      ingredients: "Tesora coffee + dark chocolate + caramel/cocoa; milk is added to the usual build.",
      order: "a Mocha Tesora, light sweet"
    },
    {
      name: "Philz named blends",
      aliases: ["Tesora", "Philharmonic", "Ecstatic", "Dancing Water", "Sister blends"],
      category: "signature",
      shops: ["Philz"],
      meaning: "If a Philz menu reads like a list of characters, those are often blend names. Ask whether you want the name brewed hot, iced, or used in a featured creation.",
      ingredients: "The coffee recipe depends on the named blend; Tesora = caramel, chocolate, nuts; Philharmonic adds cardamom and mint; Ecstatic = butterscotch, dark chocolate, citrus.",
      order: "a Tesora, brewed hot"
    },
    {
      name: "Saint Frank house coffee names",
      aliases: ["Little Brother", "Sister Moon", "Friar Minor", "Brother Sun"],
      category: "signature",
      shops: ["Saint Frank"],
      meaning: "These are Saint Frank blend or coffee names, not drink ratios. Little Brother is especially likely to appear as the espresso choice; the same café may offer another name for filter or retail beans.",
      ingredients: "Ask how the current coffee is being prepared: espresso, drip, or pour-over.",
      order: "Little Brother as espresso — what is the current single-origin filter?"
    },
    {
      name: "Saint Frank Sweet Latte",
      aliases: ["sweet latte", "almond latte", "almond-macadamia latte"],
      category: "signature",
      shops: ["Saint Frank"],
      meaning: "Saint Frank’s menu has used Sweet Latte and Almond Latte language, while current café sightings include house almond-macadamia milk. The name is a house build, not a universal ratio.",
      ingredients: "Espresso + steamed house milk or almond-macadamia milk + the café’s current sweetener or syrup.",
      order: "the Sweet Latte — what milk and sweetener are in today’s version?"
    },
    {
      name: "Saint Frank Café Miel",
      aliases: ["honey latte", "miel coffee"],
      category: "signature",
      shops: ["Saint Frank"],
      meaning: "Miel means honey. This is the honey-and-spice lane of the latte family, with the exact balance set by the café.",
      ingredients: "Espresso + steamed milk + honey; cinnamon is a common addition.",
      order: "a Café Miel"
    },
    {
      name: "Saint Frank seasonal lattes",
      aliases: ["Honey Lavender Latte", "Orange Cream Latte", "Maple Pine Latte", "Pine Latte"],
      category: "signature",
      shops: ["Saint Frank"],
      seasonal: true,
      meaning: "A rotating family of flavored lattes. The name is the important clue: espresso and milk are the structure, while the seasonal syrup or cream supplies the personality.",
      ingredients: "Espresso + milk + the named accent: honey/lavender, orange/cream, or maple/pine depending on the menu.",
      order: "the seasonal latte — what is in it today?"
    },
    {
      name: "Saint Frank Gingerbread Latte",
      aliases: ["gingerbread coffee", "spiced latte"],
      category: "signature",
      shops: ["Saint Frank"],
      seasonal: true,
      meaning: "A seasonal latte flavored toward gingerbread rather than a new espresso style.",
      ingredients: "Espresso + steamed milk + gingerbread spice or syrup; sweetness varies.",
      order: "a Gingerbread Latte, not too sweet"
    },
    {
      name: "Saint Frank Café Nico",
      aliases: ["orange cinnamon espresso", "vanilla orange latte"],
      category: "signature",
      shops: ["Saint Frank"],
      seasonal: true,
      meaning: "A Saint Frank-associated signature build: short, sweet, and citrusy. It is a reminder that “latte” can hide a lot of house flavoring.",
      ingredients: "Espresso + steamed milk + orange, cinnamon, and vanilla syrup or accents.",
      order: "a Café Nico — if it is on the current menu"
    },
    {
      name: "Ritual Foggy Latte",
      aliases: ["London Fog with espresso", "Earl Grey latte"],
      category: "signature",
      shops: ["Ritual"],
      seasonal: true,
      meaning: "Ritual’s espresso-spiked take on a London Fog. Tea and coffee share the cup, so it is floral, citrusy, and caffeinated from two directions.",
      ingredients: "Earl Grey tea + espresso + orange blossom water + milk; hot or iced.",
      order: "a Foggy Latte, iced"
    },
    {
      name: "Ritual ‘Spromoni",
      aliases: ["Spromoni", "pistachio espresso", "cherry cream coffee"],
      category: "signature",
      shops: ["Ritual"],
      seasonal: true,
      meaning: "A playful espresso riff on spumoni, the Italian ice cream with pistachio and cherry flavors.",
      ingredients: "Espresso + pistachio syrup + cherry whipped cream.",
      order: "the ‘Spromoni"
    },
    {
      name: "Ritual Tamarindo Lindo",
      aliases: ["tamarind cold brew", "cold brew soda"],
      category: "signature",
      shops: ["Ritual"],
      seasonal: true,
      meaning: "A cold-brew signature built like a soda, with tangy tamarind and vanilla. It is bright and refreshing rather than milk-forward.",
      ingredients: "Cold brew + tamarind-vanilla soda + optional whipped cream.",
      order: "a Tamarindo Lindo, no cream"
    },
    {
      name: "Sightglass Brown Butter Miso Caramel Latte",
      aliases: ["brown butter latte", "miso caramel latte"],
      category: "signature",
      shops: ["Sightglass"],
      seasonal: true,
      meaning: "A Sightglass signature that uses a savory note to keep caramel from becoming one-dimensional.",
      ingredients: "Owl’s Howl espresso + brown-butter toffee syrup + white miso + milk.",
      order: "the Brown Butter Miso Caramel Latte"
    },
    {
      name: "Sightglass Cardamom Mocha",
      aliases: ["cardamom chocolate latte", "spiced mocha"],
      category: "signature",
      shops: ["Sightglass"],
      seasonal: true,
      meaning: "A mocha with warm cardamom layered into the chocolate. Think aromatic spice, not heat.",
      ingredients: "Owl’s Howl espresso + green cardamom syrup + chocolate ganache + milk.",
      order: "a Cardamom Mocha"
    },
    {
      name: "Sightglass Vanilla Paste Latte",
      aliases: ["vanilla latte", "iced vanilla paste latte"],
      category: "signature",
      shops: ["Sightglass"],
      meaning: "A latte sweetened with vanilla paste rather than a generic “vanilla” label. It can be hot or iced depending on the menu.",
      ingredients: "Espresso + milk + vanilla paste or house vanilla flavor.",
      order: "an iced Vanilla Paste Latte"
    },
    {
      name: "Matcha Latte",
      aliases: ["iced matcha", "matcha milk"],
      category: "noncoffee",
      shops: ["Saint Frank", "Andytown", "Ritual", "Sightglass"],
      meaning: "Not coffee: finely ground green tea whisked with water and milk. It still contains caffeine, just from tea.",
      ingredients: "Matcha + water + milk; sweetener is optional or house-standard.",
      order: "an iced matcha latte, lightly sweet"
    },
    {
      name: "Chai Latte",
      aliases: ["chai milk tea", "masala chai latte"],
      category: "noncoffee",
      shops: ["Saint Frank", "Ritual", "Sightglass"],
      meaning: "Spiced tea with milk. In the US, “chai latte” usually means a concentrated chai or syrup mixed with steamed milk, not espresso.",
      ingredients: "Black tea + spices + milk + sweetener; recipes vary.",
      order: "a chai latte, not a dirty chai"
    },
    {
      name: "Dirty Chai",
      aliases: ["chai with a shot", "espresso chai"],
      category: "noncoffee",
      shops: ["Ritual", "Sightglass", "Andytown"],
      meaning: "A chai latte with espresso added. “Dirty” here means coffee-spiked, not unsanitary.",
      ingredients: "Chai latte + 1 espresso shot; add another shot for extra coffee.",
      order: "a dirty chai, iced"
    },
    {
      name: "Philz featured dessert coffees",
      aliases: ["Campfire S'mores", "Peanut Butter Cup", "Tiramisu", "Gingersnap"],
      category: "signature",
      shops: ["Philz"],
      meaning: "Philz rotates playful coffee-and-dessert builds. The names are flavor directions, not standard coffee definitions, so the current barista build matters.",
      ingredients: "Campfire S'mores = coffee, cream, marshmallow swirl, mini marshmallows, cinnamon, cocoa; Peanut Butter Cup = coffee, peanut butter swirl, cream, cocoa; Tiramisu = Philtered Soul, tiramisu swirl, cocoa; Gingersnap = spiced, sweet, creamy iced coffee.",
      order: "the Tiramisu, hot or iced"
    },
    {
      name: "Philz Mission Cold Brew",
      aliases: ["Mission Cold Brew", "silky cold brew"],
      category: "signature",
      shops: ["Philz"],
      meaning: "One of Philz’s named cold-brew bases. The name is a blend / menu identity, so it does not describe a universal recipe outside Philz.",
      ingredients: "Mission cold brew; Philz tasting notes call out milk chocolate, dried berry, almond, or a silky caramel-malt profile.",
      order: "a Mission Cold Brew, black"
    },
    {
      name: "Coffee Float",
      aliases: ["ice cream coffee", "cold coffee float"],
      category: "signature",
      shops: ["Andytown"],
      meaning: "Coffee with a scoop of ice cream or gelato. It is closer to an affogato or dessert soda than a standard iced coffee.",
      ingredients: "Cold coffee or espresso + ice cream; ice and syrup may be added.",
      order: "a coffee float"
    },
    {
      name: "Hot Chocolate",
      aliases: ["cocoa", "drinking chocolate"],
      category: "noncoffee",
      shops: ["Saint Frank", "Blue Bottle", "Ritual", "Sightglass", "Four Barrel", "Philz"],
      meaning: "Not coffee, but it shares the café menu. “Drinking chocolate” is usually thicker and more chocolate-forward than a lighter cocoa.",
      ingredients: "Chocolate or cocoa + milk; marshmallow, whipped cream, or spices are optional.",
      order: "a hot chocolate — is it cocoa or drinking chocolate?"
    }
  ];

  var categoryLabels = {
    espresso: "Espresso",
    milk: "Milk drink",
    brewed: "Brewed",
    cold: "Cold / sparkling",
    signature: "SF signature",
    noncoffee: "Not coffee"
  };

  var state = { query: "", category: "all", shop: "all" };
  var search = document.getElementById("cg-search");
  var clear = document.getElementById("cg-clear");
  var results = document.getElementById("cg-results");
  var count = document.getElementById("cg-results-count");

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function matches(item) {
    var haystack = [
      item.name,
      (item.aliases || []).join(" "),
      item.category,
      (item.shops || []).join(" "),
      item.meaning,
      item.ingredients,
      item.order
    ].join(" ").toLowerCase();
    var queryMatch = !state.query || haystack.indexOf(state.query.toLowerCase()) !== -1;
    var categoryMatch = state.category === "all" || item.category === state.category;
    var shopMatch = state.shop === "all" || (item.shops || []).indexOf(state.shop) !== -1;
    return queryMatch && categoryMatch && shopMatch;
  }

  function renderCard(item) {
    var aliases = item.aliases && item.aliases.length
      ? '<p class="cg-aliases">Also called: ' + escapeHTML(item.aliases.join(" · ")) + '</p>'
      : "";
    var shopTags = (item.shops || []).map(function (shop) {
      return '<span class="cg-shop-tag">' + escapeHTML(shop) + '</span>';
    }).join("");
    var seasonal = item.seasonal ? '<span class="cg-seasonal">Seasonal / recipe may rotate</span>' : "";
    return '<article class="cg-card">' +
      '<div class="cg-card-top">' +
        '<span class="cg-category" data-category="' + escapeHTML(item.category) + '">' + escapeHTML(categoryLabels[item.category]) + '</span>' +
        '<div class="cg-card-shops">' + shopTags + '</div>' +
      '</div>' +
      '<h3>' + escapeHTML(item.name) + '</h3>' +
      aliases +
      '<p class="cg-meaning">' + escapeHTML(item.meaning) + '</p>' +
      '<div class="cg-detail-box">' +
        '<div class="cg-detail-row"><strong>In the cup</strong><span>' + escapeHTML(item.ingredients) + '</span></div>' +
        '<div class="cg-detail-row"><strong>Try saying</strong><span>“' + escapeHTML(item.order) + '”</span></div>' +
      '</div>' +
      seasonal +
    '</article>';
  }

  function render() {
    var visible = drinks.filter(matches);
    results.innerHTML = visible.length
      ? visible.map(renderCard).join("")
      : '<div class="cg-no-results">No menu term matched that combination. Try a broader search, or clear one of the filters.</div>';
    count.innerHTML = '<strong>' + visible.length + '</strong> ' + (visible.length === 1 ? "term" : "terms") + ' shown';
    clear.classList.toggle("is-visible", Boolean(state.query));
  }

  function setActive(selector, attribute, value) {
    document.querySelectorAll(selector).forEach(function (button) {
      var active = button.getAttribute(attribute) === value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.category = button.getAttribute("data-filter");
      setActive("[data-filter]", "data-filter", state.category);
      render();
    });
  });

  document.querySelectorAll("[data-shop-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.shop = button.getAttribute("data-shop-filter");
      setActive("[data-shop-filter]", "data-shop-filter", state.shop);
      render();
      document.getElementById("cg-lookup-title").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-shop-jump]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.shop = button.getAttribute("data-shop-jump");
      setActive("[data-shop-filter]", "data-shop-filter", state.shop);
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  search.addEventListener("input", function () {
    state.query = search.value.trim();
    render();
  });

  clear.addEventListener("click", function () {
    search.value = "";
    state.query = "";
    search.focus();
    render();
  });

  render();
}());
</script>
n () {
    search.value = "";
    state.query = "";
    search.focus();
    render();
  });

  render();
}());
</script>
=== value;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.category = button.getAttribute("data-filter");
      setActive("[data-filter]", "data-filter", state.category);
      render();
    });
  });

  document.querySelectorAll("[data-shop-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.shop = button.getAttribute("data-shop-filter");
      setActive("[data-shop-filter]", "data-shop-filter", state.shop);
      render();
      document.getElementById("cg-lookup-title").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-shop-jump]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.shop = button.getAttribute("data-shop-jump");
      setActive("[data-shop-filter]", "data-shop-filter", state.shop);
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  search.addEventListener("input", function () {
    state.query = search.value.trim();
    render();
  });

  clear.addEventListener("click", function () {
    search.value = "";
    state.query = "";
    search.focus();
    render();
  });

  render();
}());
</script>
