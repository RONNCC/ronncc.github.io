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

.cg-section-head .cg-eyebrow {
  max-width: none;
  margin: 0 0 .7rem;
  color: var(--cg-caramel);
  font-size: .75rem;
  line-height: 1.2;
  text-align: left;
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

.cg-vibe-panel {
  margin-top: 1rem;
  padding: 1.1rem;
  border: 1px solid var(--cg-line);
  border-radius: 18px;
  background: #fff;
}

.cg-vibe-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: .8rem;
}

.cg-vibe-head p { margin: 0; color: var(--cg-muted); font-size: .84rem; }
.cg-vibe-head strong { color: var(--cg-ink); }

.cg-vibes {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: .55rem;
}

.cg-vibe {
  min-width: 0;
  padding: .7rem .65rem .75rem;
  border: 1px solid var(--cg-line);
  border-radius: 13px;
  background: var(--cg-paper);
  color: var(--cg-ink);
  cursor: pointer;
  text-align: left;
  transition: border-color .15s ease, transform .15s ease, box-shadow .15s ease;
}

.cg-vibe:hover {
  border-color: #d4a37b;
  box-shadow: 0 7px 16px rgba(77, 45, 26, .08);
  transform: translateY(-2px);
}

.cg-vibe-icon {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  margin-bottom: .45rem;
  border-radius: 10px;
  background: #f0dfcc;
  font-size: 1.1rem;
}

.cg-vibe:nth-child(2) .cg-vibe-icon { background: #e9e8d8; }
.cg-vibe:nth-child(3) .cg-vibe-icon { background: #dff0ec; }
.cg-vibe:nth-child(4) .cg-vibe-icon { background: #e5e6f5; }
.cg-vibe:nth-child(5) .cg-vibe-icon { background: #f8dcd0; }
.cg-vibe:nth-child(6) .cg-vibe-icon { background: #eee2f1; }

.cg-vibe strong,
.cg-vibe small { display: block; }
.cg-vibe strong { font-size: .82rem; line-height: 1.2; }
.cg-vibe small { margin-top: .25rem; color: var(--cg-muted); font-size: .7rem; line-height: 1.35; }

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

.cg-card-kind {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  min-width: 0;
}

.cg-mini-cup {
  display: grid;
  width: 1.8rem;
  height: 1.8rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 9px;
  background: #f0dfcc;
}

.cg-mini-cup svg { display: block; width: 1.35rem; height: 1.35rem; }
.cg-mini-cup[data-category="cold"] { background: #dff0ec; }
.cg-mini-cup[data-category="brewed"] { background: #e5e6f5; }
.cg-mini-cup[data-category="signature"] { background: #f8dcd0; }
.cg-mini-cup[data-category="noncoffee"] { background: #e9e8d8; }
.cg-mini-cup[data-category="world"] { background: #eee2f1; }

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
.cg-category[data-category="world"] { background: #eee2f1; color: #6b4774; }

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

.cg-tags {
  display: flex;
  flex-wrap: wrap;
  gap: .3rem;
  margin: -.2rem 0 .7rem;
}

.cg-tag {
  padding: .2rem .45rem;
  border: 1px solid #ead9c5;
  border-radius: 999px;
  background: #fff;
  color: #8b6d5a;
  font-size: .66rem;
  font-weight: 750;
  line-height: 1.1;
}

.cg-tag.origin {
  border-color: #d8c2df;
  background: #f5eef7;
  color: #6b4774;
}

.cg-tag.adult {
  border-color: #e5b9a8;
  background: #fff0eb;
  color: #a8442c;
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

.cg-results-actions {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.cg-show-more {
  padding: .6rem 1rem;
  border: 1px solid #d4a37b;
  border-radius: 999px;
  background: #fff;
  color: var(--cg-coral);
  cursor: pointer;
  font-size: .82rem;
  font-weight: 800;
}

.cg-show-more:hover { background: #fff1e3; }

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

.cg-world-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: .75rem;
}

.cg-world-card {
  display: flex;
  min-height: 150px;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid var(--cg-line);
  border-radius: 16px;
  background: linear-gradient(145deg, #fff, #fbf4fc);
}

.cg-world-stamp {
  display: inline-grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  margin-bottom: .75rem;
  border: 1px solid #d8c2df;
  border-radius: 50%;
  background: #eee2f1;
  color: #6b4774;
  font-size: .7rem;
  font-weight: 900;
  letter-spacing: .04em;
}

.cg-world-card h3 { margin: 0 0 .35rem; color: var(--cg-ink); font-size: 1rem; line-height: 1.2; }
.cg-world-card p { margin: 0; color: var(--cg-muted); font-size: .8rem; line-height: 1.5; }
.cg-world-card button { margin-top: auto; padding: .65rem 0 0; border: 0; background: transparent; color: var(--cg-coral); cursor: pointer; font-size: .76rem; font-weight: 800; text-align: left; }
.cg-world-card button:hover { text-decoration: underline; }

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
  .cg-world-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cg-vibes { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
  .cg-world-grid { grid-template-columns: 1fr; }
  .cg-vibe-head { display: block; }
  .cg-vibe-head p { margin-top: .35rem; }
  .cg-vibes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
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

    <div class="cg-vibe-panel" aria-label="Choose a coffee mood">
      <div class="cg-vibe-head">
        <p><strong>Choose by mood</strong></p>
        <p>Tap a vibe and the lookup will pull up a starting point.</p>
      </div>
      <div class="cg-vibes">
        <button class="cg-vibe" type="button" data-vibe-query="cortado">
          <span class="cg-vibe-icon" aria-hidden="true">◐</span>
          <strong>Bold, balanced</strong>
          <small>Cortado · Gibraltar</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="latte">
          <span class="cg-vibe-icon" aria-hidden="true">◒</span>
          <strong>Soft &amp; silky</strong>
          <small>Latte · flat white</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="pour-over">
          <span class="cg-vibe-icon" aria-hidden="true">⌁</span>
          <strong>Bright &amp; black</strong>
          <small>Pour-over · siphon</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="tonic">
          <span class="cg-vibe-icon" aria-hidden="true">✦</span>
          <strong>Cold &amp; fizzy</strong>
          <small>Tonic · Snowy Plover</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="mocha">
          <span class="cg-vibe-icon" aria-hidden="true">●</span>
          <strong>Sweet &amp; cozy</strong>
          <small>Mocha · Café Miel</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="flight">
          <span class="cg-vibe-icon" aria-hidden="true">◌</span>
          <strong>Curious</strong>
          <small>Flight · named blends</small>
        </button>
      </div>
    </div>
  </section>

  <section class="cg-section" id="cg-lookup" aria-labelledby="cg-lookup-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">The useful bit</p>
        <h2 id="cg-lookup-title">Look it up at the counter.</h2>
      </div>
      <p>Search a drink, ingredient, alias, or shop. Try <em>tonic</em>, <em>macadamia</em>, <em>Philz</em>, or <em>cortado</em>.</p>
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
        <button class="cg-filter" type="button" data-filter="world" aria-pressed="false">World passport</button>
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
        <button class="cg-filter" type="button" data-shop-filter="Linea" aria-pressed="false">Linea</button>
        <button class="cg-filter" type="button" data-shop-filter="Verve" aria-pressed="false">Verve</button>
        <button class="cg-filter" type="button" data-shop-filter="Equator" aria-pressed="false">Equator</button>
        <button class="cg-filter" type="button" data-shop-filter="Wrecking Ball" aria-pressed="false">Wrecking Ball</button>
        <button class="cg-filter" type="button" data-shop-filter="Flywheel" aria-pressed="false">Flywheel</button>
        <button class="cg-filter" type="button" data-shop-filter="The Coffee Movement" aria-pressed="false">Coffee Movement</button>
        <button class="cg-filter" type="button" data-shop-filter="Abanico" aria-pressed="false">Abanico</button>
        <button class="cg-filter" type="button" data-shop-filter="Sextant" aria-pressed="false">Sextant</button>
        <button class="cg-filter" type="button" data-shop-filter="Pinhole" aria-pressed="false">Pinhole</button>
        <button class="cg-filter" type="button" data-shop-filter="Mazarine" aria-pressed="false">Mazarine</button>
      </div>
    </div>

    <div class="cg-results-line">
      <p class="cg-results-count" id="cg-results-count" aria-live="polite"></p>
      <p class="cg-results-hint">Ratios are guidelines, not café law.</p>
    </div>
    <div class="cg-results" id="cg-results"></div>
    <div class="cg-results-actions">
      <button class="cg-show-more" id="cg-show-more" type="button" hidden>Show all menu terms ↓</button>
    </div>
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
      <article class="cg-sf-card">
        <h3>Linea</h3>
        <p><strong>Look for:</strong> espresso, cortado, shakerato, iced espresso tonic, and the salted maple latte — a small menu with Italian-leaning coffee classics.</p>
        <button type="button" data-shop-jump="Linea">Show Linea terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Verve</h3>
        <p><strong>Look for:</strong> One + One, Gibraltar, Missile, Whiskey Latte, Nitro Flash Brew, and espresso tonic alongside the usual espresso bar.</p>
        <button type="button" data-shop-jump="Verve">Show Verve terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Equator</h3>
        <p><strong>Look for:</strong> Habibi Latte, brown sugar cinnamon shakerato, iced brown-butter caramel latte, Chagaccino, and rotating cold-brew builds.</p>
        <button type="button" data-shop-jump="Equator">Show Equator terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Wrecking Ball</h3>
        <p><strong>Look for:</strong> Pillow Fight espresso, cortado, Kalita pour-over, iced cappuccino, and a focused standard espresso menu.</p>
        <button type="button" data-shop-jump="Wrecking Ball">Show Wrecking Ball terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Flywheel</h3>
        <p><strong>Look for:</strong> V60 pour-over, siphon coffee, flash brew, cold brew, and nitro. This is the filter-method rabbit hole.</p>
        <button type="button" data-shop-jump="Flywheel">Show Flywheel terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>The Coffee Movement</h3>
        <p><strong>Look for:</strong> Piccolo, Cocoa Cappuccino, tasting flights, espresso tonic, orange-vanilla latte, and Coffee Cream Soda.</p>
        <button type="button" data-shop-jump="The Coffee Movement">Show Coffee Movement terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Abanico</h3>
        <p><strong>Look for:</strong> Café con Morro, Café con Leche, Café con Coco y Choco, Cortadito, café de olla, and Pinolillo.</p>
        <button type="button" data-shop-jump="Abanico">Show Abanico terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Sextant</h3>
        <p><strong>Look for:</strong> Wired Gandhi, Frosty Gandhi, ginger gasheer, and adeny — East African and Arabian Peninsula coffee traditions in espresso-drink form.</p>
        <button type="button" data-shop-jump="Sextant">Show Sextant terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Pinhole</h3>
        <p><strong>Look for:</strong> piccolo, shaken iced coffee, single-shot oat lattes, and a friendly neighborhood espresso menu.</p>
        <button type="button" data-shop-jump="Pinhole">Show Pinhole terms →</button>
      </article>
      <article class="cg-sf-card">
        <h3>Mazarine</h3>
        <p><strong>Look for:</strong> the Raf — espresso, half-and-half, and cinnamon — plus nitro cold brew and classic downtown espresso drinks.</p>
        <button type="button" data-shop-jump="Mazarine">Show Mazarine terms →</button>
      </article>
    </div>
  </section>

  <section class="cg-section" id="cg-world" aria-labelledby="cg-world-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">Coffee passport</p>
        <h2 id="cg-world-title">The menu gets bigger.</h2>
      </div>
      <p>SF borrows freely. If you see one of these names in New York, Spain, Portugal, or somewhere else on a trip, tap the stamp for the little story behind it. Purple tags mark place; red tags mean 21+.</p>
    </div>

    <div class="cg-world-grid">
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">ES</span>
        <h3>Spain</h3>
        <p>Café con leche, bombón, carajillo, café con hielo, manchado, and the endlessly useful café solo.</p>
        <button type="button" data-region-query="Spain">Open Spain terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">PT</span>
        <h3>Portugal</h3>
        <p>Bica, galão, meia de leite, pingado, garoto, and the lemony mazagran.</p>
        <button type="button" data-region-query="Portugal">Open Portugal terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">NY</span>
        <h3>New York</h3>
        <p>Diner “regular coffee,” red eyes, and the egg cream — a soda fountain classic with no egg or cream.</p>
        <button type="button" data-region-query="New York">Open NYC terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">IT</span>
        <h3>Italy</h3>
        <p>Corrected espresso, layered chocolate, and the little rituals behind an Italian bar.</p>
        <button type="button" data-region-query="Italy">Open Italy terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">AT</span>
        <h3>Vienna</h3>
        <p>Whipped cream, melange, tall glasses, and a coffeehouse where the table is part of the order.</p>
        <button type="button" data-region-query="Austria">Open Vienna terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">GR</span>
        <h3>Greece</h3>
        <p>Freddo espresso, freddo cappuccino, and the instant-coffee fizz of a Greek frappé.</p>
        <button type="button" data-region-query="Greece">Open Greece terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">VN</span>
        <h3>Vietnam</h3>
        <p>Phin-brewed coffee with condensed milk, plus egg coffee with a custardy, meringue-like top.</p>
        <button type="button" data-region-query="Vietnam">Open Vietnam terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">MX</span>
        <h3>Mexico</h3>
        <p>Café de olla, carajillo with Licor 43, and coffee drinks that lean into spice and piloncillo.</p>
        <button type="button" data-region-query="Mexico">Open Mexico terms →</button>
      </article>
      <article class="cg-world-card">
        <span class="cg-world-stamp" aria-hidden="true">∞</span>
        <h3>More rabbit holes</h3>
        <p>Turkish coffee, South Indian kaapi, Korean dalgona, German Eiskaffee, and Irish coffee.</p>
        <button type="button" data-region-query="world">Open the world list →</button>
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
    <p>Menu vocabulary cross-checked against <a href="https://www.saintfrankcoffee.com/" target="_blank" rel="noopener">Saint Frank</a>, <a href="https://blog.bluebottlecoffee.com/posts/blue-bottle-reopening-menu" target="_blank" rel="noopener">Blue Bottle’s drink menu notes</a>, <a href="https://ritualcoffee.com/news/signature-beverages-fall-23/" target="_blank" rel="noopener">Ritual’s signature-beverage notes</a>, <a href="https://sightglasscoffee.com/blogs/blog/signature-espresso-beverages" target="_blank" rel="noopener">Sightglass’s signature-beverage notes</a>, <a href="https://philzcoffee.com/menu/coffee" target="_blank" rel="noopener">Philz’s coffee menu</a>, <a href="https://lineacaffe.com/drink-menu/" target="_blank" rel="noopener">Linea’s drink menu</a>, <a href="https://vervecoffeeroasters.toast.site/menu/verve-coffee-roasters-pacific-avenue-1540-pacific-avenue" target="_blank" rel="noopener">Verve’s SF menu</a>, <a href="https://order.toasttab.com/online/equator-coffees-fort-mason" target="_blank" rel="noopener">Equator’s Fort Mason menu</a>, <a href="https://www.fourbarrelcoffee.com/pages/about-us" target="_blank" rel="noopener">Four Barrel</a>, <a href="https://flywheelcoffee.com/" target="_blank" rel="noopener">Flywheel</a>, <a href="https://www.thecoffeemovement.com/menu" target="_blank" rel="noopener">The Coffee Movement’s menu</a>, <a href="https://dailycoffeenews.com/2021/06/02/abanico-coffee-roasters-is-right-at-home-in-the-mission/" target="_blank" rel="noopener">Daily Coffee News on Abanico</a>, <a href="https://sf.eater.com/2024/3/15/24102109/sextant-coffee-opening-mission-district-cafe" target="_blank" rel="noopener">Eater’s Sextant profile</a>, <a href="https://mazarinecoffee.com/food-print-menu/" target="_blank" rel="noopener">Mazarine’s menu</a>, <a href="https://www.sfchronicle.com/recipes/article/Recipe-Karl-the-Latte-Wrecking-Ball-s-Spiced-6582045.php" target="_blank" rel="noopener">the Karl the Latte recipe</a>, <a href="https://www.coffee-consulate.com/en/blog/spain" target="_blank" rel="noopener">Coffee Consulate’s Spain glossary</a>, <a href="https://visiteurope.com/experiences/portugal-coffee-culture" target="_blank" rel="noopener">Visit Europe’s Portugal guide</a>, <a href="https://ny.eater.com/2022/10/5/23386042/egg-creams-in-nyc-beanmonger-s-and-p-agis-counter" target="_blank" rel="noopener">Eater NY on egg creams</a>, and <a href="https://sf.eater.com/2019/2/5/18212681/andytown-cafe-downtown-san-francisco-open" target="_blank" rel="noopener">Eater’s Andytown profile</a>.</p>
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
      name: "Piccolo Latte",
      aliases: ["piccolo", "small latte", "ristretto latte"],
      category: "milk",
      shops: ["The Coffee Movement", "Pinhole"],
      meaning: "A tiny latte, often built from a ristretto shot and silky milk in a 3–4 oz glass. It is milkier than a macchiato but much smaller than a normal latte.",
      ingredients: "Usually 1 ristretto shot + steamed milk with thin microfoam.",
      order: "a piccolo — how many shots does yours use?"
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
      name: "Coffee Flight / Tasting Flight",
      aliases: ["single-origin flight", "four ways", "tasting flight", "coffee tasting"],
      category: "brewed",
      shops: ["Saint Frank", "The Coffee Movement"],
      meaning: "Not one drink: a tasting set. Saint Frank has used “single origin coffee four ways,” while The Coffee Movement offers three pours or one coffee prepared three ways. It is coffee as a tiny field trip.",
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
      aliases: ["nitro", "nitrogen coffee", "nitro flash brew"],
      category: "cold",
      shops: ["Saint Frank", "Ritual", "Four Barrel", "Mazarine", "Flywheel", "Verve"],
      meaning: "Cold brew infused with nitrogen through a tap. The tiny bubbles give it a creamy-looking pour without dairy.",
      ingredients: "Cold brew + nitrogen; milk is optional.",
      order: "a nitro cold brew"
    },
    {
      name: "Shakerato",
      aliases: ["shaken espresso", "iced shaken coffee"],
      category: "cold",
      shops: ["Blue Bottle", "Linea", "Equator"],
      meaning: "Espresso shaken hard with ice, sometimes with simple syrup. It comes out cold, aerated, and lightly foamy without milk.",
      ingredients: "Espresso + ice; sweetener may be shaken in.",
      order: "a Shakerato — is it sweetened?"
    },
    {
      name: "Espresso Tonic / Kaffe Tonic",
      aliases: ["coffee tonic", "tonic coffee", "iced espresso tonic"],
      category: "cold",
      shops: ["Saint Frank", "Sightglass", "Linea", "Verve", "Equator", "The Coffee Movement", "Wrecking Ball"],
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
      name: "Sweet Latte",
      aliases: ["Iced Sweet Latte", "Saint Frank Sweet Latte", "Almond Latte", "Almond-Macadamia Latte"],
      category: "signature",
      shops: ["Saint Frank", "Blue Bottle"],
      meaning: "Sweet Latte is café-specific language rather than a universal ratio. Saint Frank has used it alongside Almond Latte / house almond-macadamia milk; Blue Bottle describes its version with muscovado sugar.",
      ingredients: "Espresso + milk + a house sweetener; depending on the shop, that may be muscovado, syrup, or almond-macadamia milk.",
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
      name: "Linea Salted Maple Latte",
      aliases: ["salted maple latte", "maple latte"],
      category: "signature",
      shops: ["Linea"],
      seasonal: true,
      meaning: "Linea’s seasonal flavored-latte lane: a classic espresso-and-milk drink with salty maple sweetness rather than a new espresso ratio.",
      ingredients: "Espresso + steamed milk + salted maple syrup or house maple accent.",
      order: "a Salted Maple Latte, not too sweet"
    },
    {
      name: "Flywheel Siphon Coffee",
      aliases: ["siphon", "vacuum pot coffee", "vac pot"],
      category: "brewed",
      shops: ["Flywheel"],
      meaning: "A theatrical filter method using vapor pressure and a vacuum to move water through the coffee. The name describes the brewer, not the roast.",
      ingredients: "Ground coffee + hot water brewed in a glass siphon brewer.",
      order: "the siphon — what single origin is on it?"
    },
    {
      name: "Flash Brew",
      aliases: ["flash-chilled coffee", "iced pour-over", "flash brew nitro"],
      category: "cold",
      shops: ["Flywheel", "Verve"],
      meaning: "Hot-brewed coffee chilled quickly over ice. It preserves more of the bright aroma of a hot filter coffee than a long cold extraction.",
      ingredients: "Hot-brewed filter coffee + ice; nitrogen may be added for a nitro flash brew.",
      order: "a flash brew, or nitro flash brew if you have it"
    },
    {
      name: "Verve One + One",
      aliases: ["One and One", "espresso and macchiato"],
      category: "signature",
      shops: ["Verve"],
      meaning: "A tiny Verve tasting pairing: one straight espresso next to one espresso macchiato. It lets you compare the coffee with and without a little milk.",
      ingredients: "1 espresso + 1 espresso macchiato, served as a pair.",
      order: "the One + One"
    },
    {
      name: "Verve Missile",
      aliases: ["coffee concentrate over ice", "iced cream coffee"],
      category: "signature",
      shops: ["Verve"],
      meaning: "A dessert-leaning iced coffee built from concentrated coffee, cream, and house syrup. The name is Verve-specific.",
      ingredients: "Coffee concentrate + cream + house-made syrup over ice.",
      order: "a Missile"
    },
    {
      name: "Verve Whiskey Latte",
      aliases: ["whiskey latte", "non-alcoholic whiskey latte"],
      category: "signature",
      shops: ["Verve"],
      seasonal: true,
      meaning: "A regular latte flavored with an alcohol-free whiskey reduction. It gives warm, barrel-like sweetness without making the drink alcoholic.",
      ingredients: "Espresso + steamed milk + alcohol-free whiskey reduction; cinnamon may be seasonal.",
      order: "the Whiskey Latte — is the current version spiced?"
    },
    {
      name: "Equator Habibi Latte",
      aliases: ["Habibi", "Iced Habibi"],
      category: "signature",
      shops: ["Equator"],
      meaning: "Equator’s aromatic espresso latte: floral orange blossom, warm cardamom and clove, and vanilla make it more perfumed than a plain latte.",
      ingredients: "Espresso + steamed milk + orange blossom + cardamom + clove + vanilla syrup; hot or iced.",
      order: "a Habibi Latte, iced"
    },
    {
      name: "Equator Brown Sugar Cinnamon Shakerato",
      aliases: ["brown sugar shakerato", "cinnamon shakerato"],
      category: "signature",
      shops: ["Equator"],
      meaning: "A shaken espresso made creamy and cold with oat milk and warm brown-sugar spice. It is richer than a plain Shakerato.",
      ingredients: "Espresso + oat milk + brown sugar + cinnamon, shaken over ice.",
      order: "the Brown Sugar Cinnamon Shakerato"
    },
    {
      name: "Equator Chagaccino",
      aliases: ["adaptogen mushroom latte", "mushroom latte"],
      category: "signature",
      shops: ["Equator"],
      meaning: "A flavored latte with an adaptogen mushroom blend. The mushroom name is an add-in cue, not a replacement for the espresso.",
      ingredients: "Espresso + milk + a chaga / adaptogen mushroom blend; hot or iced.",
      order: "a Chagaccino, and what is in the current blend?"
    },
    {
      name: "Wrecking Ball Iced Cappuccino",
      aliases: ["ice cappuccino", "iced cap"],
      category: "cold",
      shops: ["Wrecking Ball"],
      meaning: "Wrecking Ball’s cold take on a cappuccino. Expect espresso, cold milk, ice, and a generous creamy foam texture rather than a hot cappuccino poured over ice.",
      ingredients: "Espresso + cold milk + ice + cold foam; exact build is shop-specific.",
      order: "an iced cappuccino"
    },
    {
      name: "Wrecking Ball house coffee names",
      aliases: ["Pillow Fight", "Pillow Fight Espresso", "Kalita"],
      category: "signature",
      shops: ["Wrecking Ball"],
      meaning: "Pillow Fight is a Wrecking Ball espresso blend name, while Kalita describes a pour-over brewer. One is the coffee; the other is the method.",
      ingredients: "Ask whether the named coffee is being served as espresso or Kalita pour-over.",
      order: "Pillow Fight as espresso, please"
    },
    {
      name: "Cortadito",
      aliases: ["sweet cortado", "cortadito cubano"],
      category: "signature",
      shops: ["Abanico"],
      meaning: "A cortado’s sweeter Cuban cousin: the espresso-and-milk balance is still small and strong, but condensed milk makes it richer and sweeter.",
      ingredients: "Equal parts espresso and milk + sweetened condensed milk.",
      order: "a Cortadito — is it sweetened with condensed milk?"
    },
    {
      name: "Café con Leche",
      aliases: ["cafe con leche", "coffee with milk"],
      category: "signature",
      shops: ["Abanico"],
      meaning: "Literally coffee with milk. At Abanico, it is a sweetened latte-style drink with a cinnamon finish, connecting a familiar espresso drink to Latin American café tradition.",
      ingredients: "Espresso + steamed milk + condensed milk or house sweetness + cinnamon.",
      order: "a Café con Leche, with the cinnamon"
    },
    {
      name: "Iced Café de Olla",
      aliases: ["cafe de olla", "iced cafe de olla", "cinnamon piloncillo coffee"],
      category: "signature",
      shops: ["Abanico"],
      seasonal: true,
      meaning: "A flash-brewed iced coffee inspired by the Mexican spiced-pot tradition. The menu name points to the sweetener and spice, not a milk ratio.",
      ingredients: "Flash-brewed iced coffee + piloncillo syrup + cinnamon; milk is not the main event.",
      order: "an Iced Café de Olla"
    },
    {
      name: "Café con Morro",
      aliases: ["cafe con morro", "morro latte", "Salvadoran horchata coffee"],
      category: "signature",
      shops: ["Abanico"],
      meaning: "Abanico’s signature latte with Salvadoran character. Morro seeds bring a nutty, spiced horchata-like note; this is not the same as rice horchata.",
      ingredients: "Espresso + milk + morro-seed syrup or horchata + allspice; often finished with ground morro.",
      order: "a Café con Morro"
    },
    {
      name: "Café con Coco y Choco",
      aliases: ["coco y choco", "coconut chocolate latte"],
      category: "signature",
      shops: ["Abanico"],
      meaning: "A coconut-and-chocolate latte that makes the dessert cue explicit without losing the espresso base.",
      ingredients: "Espresso + milk + sweetened condensed coconut milk + cacao.",
      order: "a Café con Coco y Choco"
    },
    {
      name: "Pinolillo",
      aliases: ["cacao corn drink", "pinolillo latte"],
      category: "noncoffee",
      shops: ["Abanico"],
      meaning: "A traditional Nicaraguan-style cacao-and-corn drink, not an espresso drink. It is a great café-menu example of “coffee shop” not meaning everything contains coffee.",
      ingredients: "Cacao + purple heirloom corn + cinnamon + allspice + anise + piloncillo syrup.",
      order: "a Pinolillo"
    },
    {
      name: "Con ‘Espumita’ Cubana",
      aliases: ["Cuban espumita", "sugar foam espresso", "espumita"],
      category: "signature",
      shops: ["Abanico"],
      meaning: "A tiny espresso sweetened with a whipped sugar foam. The magic is the texture: turbinado sugar is beaten into a light, spoonable cap.",
      ingredients: "Espresso + whipped turbinado sugar foam.",
      order: "the Con ‘Espumita’ Cubana"
    },
    {
      name: "Cocoa Cappuccino",
      aliases: ["cocoa cap", "chocolate cappuccino"],
      category: "signature",
      shops: ["The Coffee Movement"],
      meaning: "The Coffee Movement’s simple signature: a cappuccino made more playful with dark chocolate dust. It is still a cappuccino, not a mocha unless chocolate is mixed into the drink.",
      ingredients: "Espresso + steamed milk + microfoam + dark chocolate dust.",
      order: "a Cocoa Cappuccino"
    },
    {
      name: "Coffee Cream Soda",
      aliases: ["espresso cream soda", "coffee soda", "orange vanilla cream soda"],
      category: "cold",
      shops: ["The Coffee Movement"],
      seasonal: true,
      meaning: "A coffee-shop soda with espresso, tonic-like fizz, citrus, vanilla, and a creamy finish. It is a close cousin to a Snowy Plover, but a different house recipe.",
      ingredients: "Espresso + tonic water + orange zest + vanilla bean + coconut whipped cream.",
      order: "the Coffee Cream Soda — is it currently seasonal?"
    },
    {
      name: "Coffee Movement seasonal lattes",
      aliases: ["Vanilla Rosemary Latte", "Vanilla Lavender Latte", "Orange Vanilla Latte", "Ginger Spice Latte"],
      category: "signature",
      shops: ["The Coffee Movement"],
      seasonal: true,
      meaning: "Rotating lattes that use the espresso-and-milk template as a canvas for herb, citrus, vanilla, or warming spice.",
      ingredients: "Espresso + milk + the current house syrup or infusion; rosemary, lavender, orange zest, or ginger spice may rotate.",
      order: "the seasonal latte — what is the flavor today?"
    },
    {
      name: "Espresso Mule",
      aliases: ["coffee mule", "ginger espresso soda"],
      category: "cold",
      shops: ["The Coffee Movement"],
      seasonal: true,
      meaning: "A seasonal espresso-and-ginger-soda riff on a Moscow Mule. Expect something sharp and refreshing rather than creamy; ask about the current citrus and mixer.",
      ingredients: "Espresso + ginger beer or ginger soda + citrus; the house build rotates.",
      order: "an Espresso Mule — what is in the current build?"
    },
    {
      name: "Wrecking Ball Karl the Latte",
      aliases: ["Karl the Fog", "Karl the Latte", "spiced almond milk latte"],
      category: "signature",
      shops: ["Wrecking Ball"],
      seasonal: true,
      meaning: "A smoky, spiced Wrecking Ball latte. The “fog” nickname is a San Francisco wink; the drink itself is tea, spice, honey, espresso, and almond milk.",
      ingredients: "Lapsang souchong tea + cardamom + dark cocoa + espresso + honey + almond milk.",
      order: "Karl the Latte — if it is on the menu"
    },
    {
      name: "Sextant Wired Gandhi",
      aliases: ["Wired Gandhi", "spiced dirty chai"],
      category: "signature",
      shops: ["Sextant"],
      meaning: "A Sextant drink inspired by East African and Arabian Peninsula flavors. It drinks like a spicier dirty chai, with espresso and warming aromatics.",
      ingredients: "Espresso + spiced tea / chai-like milk base; the exact seasonal recipe is house-specific.",
      order: "a Wired Gandhi"
    },
    {
      name: "Sextant Frosty Gandhi",
      aliases: ["Frosty Gandhi", "peppermint Gandhi"],
      category: "signature",
      shops: ["Sextant"],
      seasonal: true,
      meaning: "The Wired Gandhi with a cool peppermint turn. It is a latte riff, not a frozen blended drink.",
      ingredients: "Wired Gandhi base + peppermint syrup or infusion + milk.",
      order: "a Frosty Gandhi"
    },
    {
      name: "Sextant Ginger Gasheer",
      aliases: ["ginger gasheer", "ginger black coffee"],
      category: "signature",
      shops: ["Sextant"],
      meaning: "A black-coffee drink with fresh ginger from Sextant’s East African / Middle Eastern-inspired menu. Ginger is the point, not a flavored latte afterthought.",
      ingredients: "Black coffee + fresh ginger; preparation and sweetness may vary.",
      order: "Ginger Gasheer, black if possible"
    },
    {
      name: "Sextant Adeny",
      aliases: ["adeny coffee", "cardamom star anise coffee"],
      category: "signature",
      shops: ["Sextant"],
      meaning: "A coffee named for the Port of Eden / Aden tradition, with aromatic spice rather than chocolate or caramel as its main signal.",
      ingredients: "Coffee + cardamom + star anise; ask whether it is served black or with milk today.",
      order: "an Adeny — how is it prepared today?"
    },
    {
      name: "Pinhole Shaken Iced Coffee",
      aliases: ["shaken iced coffee", "single-shot oat latte"],
      category: "cold",
      shops: ["Pinhole"],
      meaning: "Pinhole menu language for a cold coffee made with movement and ice. The exact base can change, so ask whether today’s version is brewed coffee or espresso-forward.",
      ingredients: "Coffee or espresso + ice, shaken; milk or sweetness may be added by the current recipe.",
      order: "the shaken iced coffee — what is the base today?"
    },
    {
      name: "Mazarine Raf",
      aliases: ["Raf", "raf coffee", "cinnamon cream coffee"],
      category: "signature",
      shops: ["Mazarine"],
      meaning: "A glossy, creamy espresso drink with Russian roots that Mazarine made part of the downtown SF vocabulary. It is richer than a latte because half-and-half gets steamed into the espresso.",
      ingredients: "Espresso + half-and-half + cinnamon; some versions add sugar or honey.",
      order: "a Raf, with cinnamon"
    },
    {
      name: "Café Solo",
      aliases: ["cafe solo", "un café", "Spanish espresso"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "black", "espresso"],
      meaning: "In Spain, “a coffee” often means café solo: a short black espresso. It is the base vocabulary behind cortado, con leche, bombón, and more.",
      ingredients: "Espresso, usually served black; sugar is offered separately.",
      order: "un café solo, por favor"
    },
    {
      name: "Café con Leche",
      aliases: ["cafe con leche", "Spanish coffee with milk", "Spanish latte"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "half milk", "breakfast"],
      meaning: "Spain’s everyday milk coffee: usually espresso with a generous amount of hot milk, often around half and half. It is the safer local translation of “latte” than asking for a cappuccino.",
      ingredients: "Espresso or strong coffee + hot or steamed milk; sugar is optional.",
      order: "un café con leche"
    },
    {
      name: "Café con Hielo",
      aliases: ["cafe con hielo", "Spanish iced coffee", "coffee over ice"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "cold", "black"],
      meaning: "The Spanish summer move: order the coffee hot, then pour it over a separate glass of ice. Sweeten before the pour if that is your style.",
      ingredients: "Espresso or café solo + a separate glass of ice; sugar is optional.",
      order: "un café con hielo"
    },
    {
      name: "Café Bombón",
      aliases: ["cafe bombon", "bombón", "espresso condensed milk"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "sweet", "layered"],
      meaning: "A Valencian sweet treat served in a glass so the dark espresso and pale condensed milk show their layers. Stir it before drinking.",
      ingredients: "Espresso layered over sweetened condensed milk.",
      order: "un café bombón"
    },
    {
      name: "Carajillo",
      aliases: ["Spanish coffee with liquor", "coffee and brandy", "coffee and rum"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "21+", "after dinner"],
      adult: true,
      meaning: "An after-dinner coffee with a splash of liquor. Brandy, rum, or whiskey are common; some versions are flambéed, but the name does not guarantee fire.",
      ingredients: "Espresso or black coffee + brandy, rum, whiskey, or another spirit; sugar may be added.",
      order: "a carajillo — which spirit do you use?"
    },
    {
      name: "Café Manchado / Sombra",
      aliases: ["cafe manchado", "manchado", "cafe sombra", "milk stained with coffee"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "mostly milk", "light coffee"],
      meaning: "The milk-heavy opposite of a cortado: hot milk lightly stained with coffee. Andalusia may call a similar drink café sombra.",
      ingredients: "Mostly hot or steamed milk + a small amount of espresso.",
      order: "a café manchado, light on the coffee"
    },
    {
      name: "Barraquito",
      aliases: ["Canary Islands coffee", "barraquito coffee"],
      category: "world",
      region: "Spain",
      tags: ["world", "Spain", "Canary Islands", "layered", "21+"],
      adult: true,
      meaning: "A Canary Islands layered coffee that looks like a tiny dessert and drinks like a spiced coffee cocktail.",
      ingredients: "Condensed milk + espresso + Licor 43 + steamed milk or foam + lemon peel + cinnamon.",
      order: "a barraquito"
    },
    {
      name: "Bica / Cimbalino",
      aliases: ["bica", "cimbalino", "Portuguese espresso", "um café"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "black", "espresso", "Lisbon / Porto"],
      meaning: "Portugal’s small, everyday espresso. In Lisbon it is commonly a bica; in Porto, cimbalino is a local word you may hear.",
      ingredients: "Portuguese-style espresso, served short and black.",
      order: "uma bica in Lisbon, or um cimbalino in Porto"
    },
    {
      name: "Pingado / Garoto",
      aliases: ["pingado", "garoto", "pingo", "Portuguese macchiato"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "tiny", "a little milk"],
      meaning: "A bica with just a little milk. Pingado means dripped; garoto is the small, gently milky version. The exact distinction varies by café and region.",
      ingredients: "Espresso + a few drops or a small splash of milk or foam.",
      order: "um pingado — or um garoto, depending on the café"
    },
    {
      name: "Meia de Leite",
      aliases: ["meia-de-leite", "Portuguese half milk coffee"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "half milk", "breakfast"],
      meaning: "Literally half milk: Portugal’s large-cup, roughly equal coffee-and-milk order. A useful cousin to café au lait.",
      ingredients: "Coffee or espresso + roughly equal hot milk in a cup.",
      order: "uma meia de leite"
    },
    {
      name: "Galão",
      aliases: ["galao", "Portuguese tall coffee", "Portuguese latte"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "tall glass", "milky"],
      meaning: "A tall glass of coffee with lots of foamed milk. Think lighter and taller than meia de leite, with the glass doing some of the storytelling.",
      ingredients: "Roughly 1 part coffee to 3 parts steamed or foamed milk, usually in a tall glass.",
      order: "um galão escuro if you want it stronger"
    },
    {
      name: "Mazagran",
      aliases: ["Portuguese iced coffee", "lemon coffee", "coffee lemonade"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "cold", "citrus"],
      meaning: "A bracing iced coffee with lemon. Its history is tied to Algeria, while Portugal made the name part of its own café vocabulary; recipes wander between coffee, citrus, sugar, mint, and sparkle.",
      ingredients: "Chilled coffee or espresso + lemon + sugar + ice; tonic, sparkling water, or mint may appear.",
      order: "a mazagran — what is your house version?"
    },
    {
      name: "Café com Cheirinho",
      aliases: ["coffee with scent", "Portuguese coffee with aguardente"],
      category: "world",
      region: "Portugal",
      tags: ["world", "Portugal", "21+", "after dinner"],
      adult: true,
      meaning: "Portugal’s fragrant after-dinner coffee: the spirit is the “little scent.” It is the Portuguese relative of caffè corretto and carajillo.",
      ingredients: "Espresso + aguardente or another local spirit; sugar is optional.",
      order: "um café com cheirinho"
    },
    {
      name: "New York Diner Regular",
      aliases: ["regular coffee", "coffee regular", "NYC diner coffee"],
      category: "world",
      region: "New York",
      tags: ["world", "New York", "diner", "drip"],
      meaning: "In a New York diner, “regular coffee” can mean the house drip with the diner’s expected milk or cream and sugar. It is intentionally less precise than a specialty menu.",
      ingredients: "Drip coffee + milk or cream + sugar, according to the counter’s house convention.",
      order: "a regular coffee, cream and sugar"
    },
    {
      name: "New York Egg Cream",
      aliases: ["egg cream", "coffee egg cream", "Bushwick egg cream"],
      category: "world",
      region: "New York",
      tags: ["world", "New York", "soda fountain", "not coffee"],
      meaning: "A New York soda-fountain classic with neither egg nor cream. Some modern NYC versions add coffee or espresso to the chocolate-syrup-and-seltzer format.",
      ingredients: "Milk + chocolate or vanilla syrup + seltzer; coffee is an optional modern riff.",
      order: "an egg cream — and is it the coffee version?"
    },
    {
      name: "Caffè Corretto",
      aliases: ["caffe corretto", "corrected coffee", "espresso with grappa"],
      category: "world",
      region: "Italy",
      tags: ["world", "Italy", "21+", "after dinner"],
      adult: true,
      meaning: "Italian for “corrected” coffee: espresso corrected with a little liquor, often grappa, sambuca, or brandy.",
      ingredients: "Espresso + a small pour of liqueur or spirit.",
      order: "a caffè corretto — with grappa, please"
    },
    {
      name: "Bicerin",
      aliases: ["Turin bicerin", "chocolate espresso cream"],
      category: "world",
      region: "Italy",
      tags: ["world", "Italy", "layered", "dessert"],
      meaning: "Turin’s layered glass: espresso, hot chocolate, and cream kept distinct so you can see the architecture before stirring.",
      ingredients: "Espresso + hot chocolate + whipped or lightly poured cream.",
      order: "a bicerin"
    },
    {
      name: "Einspänner",
      aliases: ["einspanner", "Viennese whipped-cream coffee"],
      category: "world",
      region: "Austria",
      tags: ["world", "Austria", "Vienna", "whipped cream"],
      meaning: "A Viennese coffeehouse classic: strong black coffee insulated by a thick crown of whipped cream, traditionally served in a glass.",
      ingredients: "Double espresso or strong black coffee + whipped cream.",
      order: "an Einspänner"
    },
    {
      name: "Wiener Melange",
      aliases: ["Viennese melange", "melange coffee"],
      category: "world",
      region: "Austria",
      tags: ["world", "Austria", "Vienna", "milk"],
      meaning: "Vienna’s cappuccino-adjacent house classic: coffee softened with steamed milk and a cap of foam. Exact café recipes vary.",
      ingredients: "Espresso or strong coffee + steamed milk + milk foam.",
      order: "a Wiener Melange"
    },
    {
      name: "Freddo Espresso / Freddo Cappuccino",
      aliases: ["freddo", "Greek iced espresso", "Greek iced cappuccino"],
      category: "world",
      region: "Greece",
      tags: ["world", "Greece", "cold", "foam"],
      meaning: "Greek summer coffee made cold on purpose: espresso is shaken or blended with ice; the cappuccino version adds a layer of cold milk foam.",
      ingredients: "Espresso + ice; Freddo Cappuccino adds cold-frothed milk foam.",
      order: "a freddo espresso, no sugar"
    },
    {
      name: "Greek Frappé",
      aliases: ["frappe", "Nescafé frappé", "Greek instant coffee"],
      category: "world",
      region: "Greece",
      tags: ["world", "Greece", "cold", "shaken"],
      meaning: "Not a blended dessert by default: Greek frappé is instant coffee shaken with water into a dramatic foam, then poured over ice.",
      ingredients: "Instant coffee + cold water + sugar optional + ice; milk may be added.",
      order: "a Greek frappé, medium sweet with milk"
    },
    {
      name: "Cà Phê Sữa Đá",
      aliases: ["ca phe sua da", "Vietnamese iced coffee", "Vietnamese condensed milk coffee"],
      category: "world",
      region: "Vietnam",
      tags: ["world", "Vietnam", "cold", "condensed milk"],
      meaning: "Vietnamese iced coffee: intensely brewed coffee meets sweetened condensed milk and ice. Phin means the small metal filter often used to make it.",
      ingredients: "Phin-brewed robusta coffee + sweetened condensed milk + ice.",
      order: "cà phê sữa đá"
    },
    {
      name: "Vietnamese Egg Coffee",
      aliases: ["cà phê trứng", "ca phe trung", "egg coffee"],
      category: "world",
      region: "Vietnam",
      tags: ["world", "Vietnam", "custardy", "dessert"],
      meaning: "A Hanoi-born dessert-like coffee topped with a whipped egg-yolk mixture. It is closer to a coffee custard than an omelet in a cup.",
      ingredients: "Strong coffee + whipped egg yolk + condensed milk and sugar.",
      order: "cà phê trứng"
    },
    {
      name: "Café de Olla",
      aliases: ["cafe de olla", "Mexican spiced coffee", "piloncillo coffee"],
      category: "world",
      region: "Mexico",
      tags: ["world", "Mexico", "spiced", "black"],
      meaning: "Mexican spiced coffee traditionally brewed in a clay pot. Piloncillo brings molasses-like sweetness, and cinnamon makes the aroma unmistakable.",
      ingredients: "Brewed coffee + piloncillo + cinnamon; cloves, orange peel, or star anise may join.",
      order: "a café de olla"
    },
    {
      name: "Mexican Carajillo 43",
      aliases: ["carajillo 43", "Licor 43 coffee", "Mexican carajillo"],
      category: "world",
      region: "Mexico",
      tags: ["world", "Mexico", "21+", "cold", "after dinner"],
      adult: true,
      meaning: "A modern Mexican bar version of carajillo: espresso and Licor 43 shaken or poured over ice. Vanilla-citrus sweetness makes it easy to mistake for dessert.",
      ingredients: "Espresso + Licor 43 + ice; shaken or layered.",
      order: "a carajillo 43"
    },
    {
      name: "Turkish Coffee",
      aliases: ["Türk kahvesi", "cezve coffee", "ibrik coffee"],
      category: "world",
      region: "Turkey",
      tags: ["world", "Turkey", "unfiltered", "cardamom optional"],
      meaning: "Very finely ground coffee simmered with water in a cezve or ibrik and poured without filtering. Let the grounds settle before the last sip.",
      ingredients: "Finely ground coffee + water + sugar optional; cardamom may be added.",
      order: "a Turkish coffee, medium sweet"
    },
    {
      name: "South Indian Filter Coffee",
      aliases: ["kaapi", "kapi", "Madras filter coffee"],
      category: "world",
      region: "India",
      tags: ["world", "India", "chicory", "frothy"],
      meaning: "A strong coffee decoction mixed with hot milk and sugar, then aerated by pouring between a metal tumbler and dabarah. Watch for the little performance.",
      ingredients: "South Indian filter coffee decoction + milk + sugar; chicory is common.",
      order: "filter coffee, or kaapi"
    },
    {
      name: "Dalgona Coffee",
      aliases: ["whipped coffee", "Korean whipped coffee"],
      category: "world",
      region: "Korea",
      tags: ["world", "Korea", "whipped", "cold"],
      meaning: "Whipped instant coffee foam served over milk. The name nods to a Korean sugar candy, while the drink itself became an internet-era café favorite.",
      ingredients: "Instant coffee + sugar + hot water whipped into foam over milk and ice.",
      order: "a Dalgona coffee"
    },
    {
      name: "Eiskaffee",
      aliases: ["German iced coffee", "ice cream coffee"],
      category: "world",
      region: "Germany",
      tags: ["world", "Germany", "cold", "dessert"],
      meaning: "German iced coffee is often a dessert: chilled coffee poured with vanilla ice cream and whipped cream, not simply coffee over ice.",
      ingredients: "Chilled coffee + vanilla ice cream + whipped cream; chocolate shavings are optional.",
      order: "an Eiskaffee"
    },
    {
      name: "Irish Coffee",
      aliases: ["Irish coffee cocktail", "whiskey coffee"],
      category: "world",
      region: "Ireland",
      tags: ["world", "Ireland", "21+", "whipped cream"],
      adult: true,
      meaning: "A coffee cocktail rather than a café milk drink: whiskey and sugar warm the coffee while cream floats on top.",
      ingredients: "Hot coffee + Irish whiskey + sugar + lightly whipped cream.",
      order: "an Irish coffee"
    },
    {
      name: "Yuenyeung",
      aliases: ["yuanyang", "Hong Kong coffee tea", "coffee milk tea"],
      category: "world",
      region: "Hong Kong",
      tags: ["world", "Hong Kong", "tea + coffee", "milky"],
      meaning: "Hong Kong’s coffee-and-tea hybrid. The name means mandarin ducks, a pairing that makes the unusual combination feel inevitable.",
      ingredients: "Coffee + black milk tea + evaporated milk and/or condensed milk.",
      order: "a yuenyeung, hot or iced"
    },
    {
      name: "Kopi C",
      aliases: ["Singapore kopi c", "coffee with evaporated milk"],
      category: "world",
      region: "Singapore",
      tags: ["world", "Singapore", "evaporated milk", "sweet"],
      meaning: "A Singapore kopitiam order: coffee with evaporated milk and sugar. The letter C is the clue that it is not condensed milk kopi.",
      ingredients: "Strong kopi-style coffee + evaporated milk + sugar.",
      order: "kopi C, less sweet"
    },
    {
      name: "Café Touba",
      aliases: ["Touba coffee", "Senegalese spiced coffee"],
      category: "world",
      region: "Senegal",
      tags: ["world", "Senegal", "spiced", "pepper"],
      meaning: "Senegalese coffee scented with djarr, a peppery spice often compared with grains of paradise. The spice is part of the identity, not a garnish.",
      ingredients: "Coffee + roasted djarr / grains of paradise; sugar is common.",
      order: "Café Touba"
    },
    {
      name: "Kopi Joss",
      aliases: ["charcoal coffee", "Indonesia charcoal coffee"],
      category: "world",
      region: "Indonesia",
      tags: ["world", "Indonesia", "charcoal", "theatrical"],
      meaning: "A Yogyakarta street-coffee spectacle with a piece of hot charcoal dropped into the cup. It is fun to know about, but not a DIY trick.",
      ingredients: "Black coffee + sugar + a piece of burning charcoal added at service.",
      order: "kopi joss — served by a place that knows the tradition"
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
    noncoffee: "Not coffee",
    world: "World passport"
  };

  var state = { query: "", category: "all", shop: "all", showAll: false };
  var search = document.getElementById("cg-search");
  var clear = document.getElementById("cg-clear");
  var results = document.getElementById("cg-results");
  var count = document.getElementById("cg-results-count");
  var showMore = document.getElementById("cg-show-more");

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function normalize(value) {
    var text = String(value).toLowerCase();
    if (text.normalize) text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return text.replace(/[-_/]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function matches(item) {
    var haystack = normalize([
      item.name,
      (item.aliases || []).join(" "),
      item.category,
      (item.shops || []).join(" "),
      item.region,
      (item.tags || []).join(" "),
      item.meaning,
      item.ingredients,
      item.order
    ].join(" "));
    var queryMatch = !state.query || haystack.indexOf(normalize(state.query)) !== -1;
    var categoryMatch = state.category === "all" || item.category === state.category;
    var shopMatch = state.shop === "all" || (item.shops || []).indexOf(state.shop) !== -1;
    return queryMatch && categoryMatch && shopMatch;
  }

  function renderMiniCup(item) {
    var fills = {
      espresso: "#65331f",
      milk: "#bf6d3d",
      brewed: "#4f547d",
      cold: "#4d806a",
      signature: "#b75032",
      noncoffee: "#74804a",
      world: "#6b4774"
    };
    var fill = fills[item.category] || fills.espresso;
    var glass = item.category === "cold"
      ? '<path d="M9 5h18l-2 25H11L9 5Z" fill="#f5fffb" fill-opacity=".78" stroke="#39735f" stroke-width="1.5"/><path d="M11 17h14l-1 10H12L11 17Z" fill="' + fill + '" opacity=".82"/>'
      : '<path d="M6 10h22l-2 18H10L6 10Z" fill="#fffaf3" stroke="#8b4d2c" stroke-width="1.5"/><path d="M9 15h16v9H11L9 15Z" fill="' + fill + '" opacity=".9"/><ellipse cx="17" cy="14.5" rx="8" ry="2.6" fill="' + fill + '" opacity=".96"/>';
    var extra = item.category === "signature" || item.category === "world"
      ? '<path d="m28 5 .7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" fill="#d58c5c"/>'
      : item.category === "brewed"
        ? '<path d="M10 7c2-2 4 2 6 0s4 2 6 0" fill="none" stroke="#8a91bb" stroke-width="1.3" stroke-linecap="round"/>'
        : '';
    return '<span class="cg-mini-cup" data-category="' + escapeHTML(item.category) + '" aria-hidden="true"><svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">' + glass + extra + '</svg></span>';
  }

  function renderCard(item) {
    var aliases = item.aliases && item.aliases.length
      ? '<p class="cg-aliases">Also called: ' + escapeHTML(item.aliases.join(" · ")) + '</p>'
      : "";
    var shopTags = (item.shops || []).map(function (shop) {
      return '<span class="cg-shop-tag">' + escapeHTML(shop) + '</span>';
    }).join("");
    var tagList = (item.tags || []).filter(function (tag) { return tag !== "world"; });
    var tags = tagList.length
      ? '<div class="cg-tags">' + tagList.map(function (tag) {
          var tagClass = tag === item.region ? "origin" : tag === "21+" ? "adult" : "";
          return '<span class="cg-tag ' + tagClass + '">' + escapeHTML(tag) + '</span>';
        }).join("") + '</div>'
      : "";
    var seasonal = item.seasonal ? '<span class="cg-seasonal">Seasonal / recipe may rotate</span>' : "";
    return '<article class="cg-card">' +
      '<div class="cg-card-top">' +
        '<div class="cg-card-kind">' + renderMiniCup(item) +
          '<span class="cg-category" data-category="' + escapeHTML(item.category) + '">' + escapeHTML(categoryLabels[item.category]) + '</span>' +
        '</div>' +
        '<div class="cg-card-shops">' + shopTags + '</div>' +
      '</div>' +
      '<h3>' + escapeHTML(item.name) + '</h3>' +
      aliases +
      tags +
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
    var defaultView = !state.query && state.category === "all" && state.shop === "all";
    var initialLimit = 18;
    var shown = defaultView && !state.showAll ? visible.slice(0, initialLimit) : visible;
    results.innerHTML = shown.length
      ? shown.map(renderCard).join("")
      : '<div class="cg-no-results">No menu term matched that combination. Try a broader search, or clear one of the filters.</div>';

    var resultLabel = visible.length === 1 ? "term" : "terms";
    count.innerHTML = '<strong>' + visible.length + '</strong> ' + resultLabel + ' found';
    if (shown.length < visible.length) count.innerHTML += ' <span>· showing ' + shown.length + '</span>';

    showMore.hidden = !(defaultView && visible.length > initialLimit);
    showMore.textContent = state.showAll ? "Show fewer terms ↑" : "Show all menu terms ↓";
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

  document.querySelectorAll("[data-vibe-query]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.query = button.getAttribute("data-vibe-query");
      state.category = "all";
      state.shop = "all";
      state.showAll = true;
      search.value = state.query;
      setActive("[data-filter]", "data-filter", "all");
      setActive("[data-shop-filter]", "data-shop-filter", "all");
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-region-query]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.query = button.getAttribute("data-region-query");
      state.category = "all";
      state.shop = "all";
      state.showAll = true;
      search.value = state.query;
      setActive("[data-filter]", "data-filter", "all");
      setActive("[data-shop-filter]", "data-shop-filter", "all");
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  showMore.addEventListener("click", function () {
    state.showAll = !state.showAll;
    render();
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
