---
layout: page
title: Coffee Guide
permalink: /coffee-guide/
description: A cute, searchable guide to coffee drinks, ingredients, SF café menu names, and the cafés that serve them.
excerpt: A cute, searchable guide to coffee drinks, ingredients, SF café menu names, and the cafés that serve them.
---

<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,900&display=swap" rel="stylesheet" />

<style>
/* ──────────────────────────────────────────────────────────────────────────
   Coffee Guide — Pinterest board cut. Cream canvas, sticky pill toolbar,
   masonry wall of white pin cards with layered-cup art. Self-contained;
   SVG doodles animate via shared keyframes, no JS animation.
   ────────────────────────────────────────────────────────────────────────── */
.cg-app {
  --ink: #4a2b1c;
  --ink-soft: #6f4e39;
  --muted: #8a6f5c;
  --paper: #fffdf9;
  --line: #e7d5c0;
  --coffee: #6b3a24;
  --script: #8b5a3c;
  --coral: #c65f45;
  --shadow-pop: 0 6px 16px rgba(93, 64, 42, .14), 0 18px 40px rgba(93, 64, 42, .12);
  --shadow-soft: 0 2px 10px rgba(93, 64, 42, .08), 0 10px 28px rgba(93, 64, 42, .07);
  width: min(1180px, calc(100vw - 2rem));
  margin-left: 50%;
  transform: translateX(-50%);
  color: var(--ink);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  background-color: #f1e6d8;
  background-image: radial-gradient(circle at 13px 13px, rgba(139, 90, 60, .06) 1.5px, transparent 2.1px);
  background-size: 26px 26px;
}
.cg-app *, .cg-app *::before, .cg-app *::after { box-sizing: border-box; }
.cg-app button, .cg-app input { font: inherit; }
.cg-app a { color: var(--coral); }
.cg-app a:hover { color: #a3432c; }
.cg-app button:focus-visible,
.cg-app input:focus-visible,
.cg-app a:focus-visible {
  outline: 3px solid rgba(61, 109, 137, .42);
  outline-offset: 3px;
}
.cg-sprite { position: absolute; width: 0; height: 0; overflow: hidden; }
.cg-ico {
  display: inline-block;
  width: 1em;
  height: 1em;
  flex: 0 0 auto;
  vertical-align: -.15em;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.9;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.cg-hand { font-family: "Caveat", "Comic Sans MS", cursive; font-weight: 700; }
.cg-display { font-family: "Fraunces", Georgia, "Times New Roman", serif; }
/* ── animation primitives (shared with inline SVG) ───────────────────────── */
@keyframes cg-bob {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes cg-steam {
  0%   { opacity: 0; transform: translateY(4px) scaleX(.9); }
  35%  { opacity: .85; }
  100% { opacity: 0; transform: translateY(-10px) scaleX(1.08); }
}
@keyframes cg-bubble {
  0%   { opacity: 0; transform: translateY(2px); }
  25%  { opacity: .9; }
  100% { opacity: 0; transform: translateY(-11px); }
}
@keyframes cg-bubble-lg {
  0%   { opacity: 0; transform: translateY(3px); }
  25%  { opacity: .9; }
  100% { opacity: 0; transform: translateY(-24px); }
}
@keyframes cg-twinkle {
  0%, 100% { opacity: .25; transform: scale(.7); }
  50% { opacity: 1; transform: scale(1.08); }
}
@keyframes cg-heartbeat {
  0%, 100% { transform: scale(1); }
  30% { transform: scale(1.16); }
  45% { transform: scale(.95); }
  60% { transform: scale(1.08); }
}
@keyframes cg-floaty {
  0%, 100% { transform: translateY(0) rotate(var(--cg-fr, 0deg)); }
  50% { transform: translateY(-7px) rotate(var(--cg-fr, 0deg)); }
}
.cg-s-bob { animation: cg-bob 4.2s ease-in-out infinite; }
.cg-s-steam { animation: cg-steam 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 100%; }
.cg-s-bub { animation: cg-bubble 3s ease-in infinite; transform-box: fill-box; }
.cg-s-bub-lg { animation: cg-bubble-lg 3.2s ease-in infinite; transform-box: fill-box; }
.cg-s-tw { animation: cg-twinkle 2.2s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 50%; }
.cg-s-heart { animation: cg-heartbeat 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: 50% 50%; }
.cg-s-float { animation: cg-floaty 5.5s ease-in-out infinite; }
@media (prefers-reduced-motion: reduce) {
  .cg-s-bob, .cg-s-steam, .cg-s-bub, .cg-s-bub-lg, .cg-s-tw, .cg-s-heart, .cg-s-float { animation: none; }
}
/* ── board header ─────────────────────────────────────────────────────────── */
.cg-board-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.6rem 1rem 1.3rem;
  text-align: center;
}
.cg-eyebrow {
  margin: 0;
  color: var(--coral);
  font-family: "Caveat", "Comic Sans MS", cursive;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: .01em;
}
.cg-board-title {
  max-width: 14ch;
  margin: .45rem 0 0;
  color: var(--ink);
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  font-weight: 900;
  letter-spacing: -.03em;
  line-height: .98;
}
.cg-board-flourish {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: .65rem;
  width: min(180px, 62%);
  margin: 1.05rem 0 0;
  color: #b98a63;
  font-size: .82rem;
  line-height: 1;
}
.cg-board-flourish::before,
.cg-board-flourish::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, #d8b08c);
}
.cg-board-flourish::after { background: linear-gradient(90deg, #d8b08c, transparent); }
.cg-board-dek { max-width: 62ch; margin: .95rem 0 0; color: var(--muted); font-size: 1.02rem; line-height: 1.6; }
.cg-updated { margin: .85rem 0 0; color: #96745b; font-size: .78rem; }
/* ── sticky search + filter pill ──────────────────────────────────────────── */
.cg-search-panel {
  position: sticky;
  top: 10px;
  z-index: 20;
  padding: .9rem 1rem;
  border: 1.5px solid var(--line);
  border-radius: 20px;
  background: rgba(255, 255, 255, .92);
  box-shadow: var(--shadow-soft);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.cg-search-line { display: flex; align-items: center; gap: .7rem; }
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
  width: 2.4rem;
  height: 2.4rem;
  flex: 0 0 auto;
  place-items: center;
  border-radius: 50%;
  background: var(--coffee);
  color: #fff7ec;
  transform: rotate(-6deg);
}
.cg-search-icon .cg-ico { width: 1.15rem; height: 1.15rem; }
.cg-search-input {
  width: 100%;
  min-width: 0;
  padding: .45rem 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font-size: 1.05rem;
}
.cg-search-input::placeholder { color: #967b64; }
.cg-clear {
  display: none;
  flex: 0 0 auto;
  padding: .28rem .55rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  font-size: 1.25rem;
  line-height: 1;
}
.cg-clear.is-visible { display: block; }
.cg-clear:hover { background: #f7ede1; color: var(--ink); }
.cg-filter-label {
  margin: 0;
  color: #96745b;
  font-family: "Caveat", "Comic Sans MS", cursive;
  font-size: 1.02rem;
  font-weight: 700;
}
.cg-select-row { display: flex; flex-wrap: wrap; gap: .6rem 1rem; margin-top: .55rem; }
.cg-select-group { display: flex; flex-direction: column; gap: .3rem; flex: 1 1 180px; min-width: 0; }
.cg-select {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  padding: .42rem 2rem .42rem .7rem;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12'%3E%3Cpath fill='none' stroke='%238b6d5a' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M2.5 4.5l3.5 3.5 3.5-3.5'/%3E%3C/svg%3E") no-repeat right .6rem center / 12px;
  color: var(--ink-soft);
  font: inherit;
  font-size: .82rem;
  font-weight: 700;
  cursor: pointer;
}
.cg-select:hover { border-color: #d8a87b; }
.cg-select.is-active { border-color: #d8a87b; background-color: #fdf3ea; }
/* ── results line ─────────────────────────────────────────────────────────── */
.cg-results-line {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin: 1.25rem 0 .9rem;
}
.cg-results-count {
  display: flex;
  align-items: center;
  gap: .45rem;
  margin: 0;
  color: var(--muted);
  font-size: .88rem;
}
.cg-results-count strong { color: var(--ink); font-family: "Fraunces", Georgia, serif; font-size: 1.05rem; }
.cg-results-count .cg-ico { width: 1rem; height: 1rem; color: var(--coral); }
.cg-results-hint {
  margin: 0;
  color: #96745b;
  font-family: "Caveat", "Comic Sans MS", cursive;
  font-size: 1.08rem;
  font-weight: 600;
  text-align: right;
}
/* ── masonry board ────────────────────────────────────────────────────────── */
.cg-results { display: block; columns: 220px 5; column-gap: 1rem; }
.cg-pin {
  display: flex;
  flex-direction: column;
  break-inside: avoid;
  -webkit-column-break-inside: avoid;
  margin: 0 0 1rem;
  padding: .9rem .9rem 1rem;
  border: 1px solid rgba(93, 64, 42, .06);
  border-radius: 18px;
  background: #fff;
  box-shadow: var(--shadow-soft);
  transition: transform .18s ease, box-shadow .18s ease;
}
.cg-pin:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); }
.cg-pin[data-cat="espresso"] { border-top: 3px solid #b06a42; }
.cg-pin[data-cat="milk"] { border-top: 3px solid #d98b74; }
.cg-pin[data-cat="brewed"] { border-top: 3px solid #7d86b8; }
.cg-pin[data-cat="cold"] { border-top: 3px solid #5e9e80; }
.cg-pin[data-cat="signature"] { border-top: 3px solid #d96a4e; }
.cg-pin[data-cat="noncoffee"] { border-top: 3px solid #a8a44e; }
.cg-pin[data-cat="world"] { border-top: 3px solid #9a7bb8; }
.cg-pin-art { display: grid; place-items: center; padding: .35rem 0 .15rem; }
.cg-pin-art svg { display: block; width: 100%; max-width: 205px; height: auto; }
.cg-pin-head { display: flex; align-items: center; justify-content: space-between; gap: .5rem; margin-top: .15rem; }
.cg-pin-name {
  margin: 0;
  color: var(--script);
  font-family: "Caveat", "Comic Sans MS", cursive;
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.05;
}
.cg-pin-cat {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  padding: .2rem .5rem;
  border-radius: 999px;
  background: #f3e2d0;
  color: #7a482f;
  font-size: .6rem;
  font-weight: 850;
  letter-spacing: .07em;
  line-height: 1.2;
  text-transform: uppercase;
  white-space: nowrap;
}
.cg-pin-cat[data-cat="milk"] { background: #fbe9e2; color: #a04a34; }
.cg-pin-cat[data-cat="brewed"] { background: #e3eaf4; color: #4f547d; }
.cg-pin-cat[data-cat="cold"] { background: #dcf0e5; color: #2c6a52; }
.cg-pin-cat[data-cat="signature"] { background: #fde8dc; color: #b04a2c; }
.cg-pin-cat[data-cat="noncoffee"] { background: #f2efd8; color: #6b6a3a; }
.cg-pin-cat[data-cat="world"] { background: #ece2f4; color: #6b4774; }
.cg-pin-alias {
  margin: .1rem 0 0;
  color: #a08268;
  font-size: .72rem;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cg-pin-meaning {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  margin: .45rem 0 0;
  color: var(--ink-soft);
  font-size: .84rem;
  line-height: 1.5;
}
.cg-pin.is-open .cg-pin-meaning { display: block; -webkit-line-clamp: unset; }
.cg-pin-more { display: none; }
.cg-pin.is-open .cg-pin-more {
  display: block;
  margin-top: .6rem;
  padding-top: .6rem;
  border-top: 1.5px dashed #e8d6bf;
}
.cg-tags { display: flex; flex-wrap: wrap; gap: .3rem; margin: 0 0 .5rem; }
.cg-detail-row {
  display: grid;
  grid-template-columns: 1.15rem 1fr;
  gap: .45rem;
  padding: .32rem 0;
  font-size: .8rem;
  line-height: 1.45;
}
.cg-detail-row + .cg-detail-row { border-top: 1px dashed rgba(232, 214, 191, .7); }
.cg-detail-row .cg-ico { width: 1rem; height: 1rem; margin-top: .12rem; color: #b98a63; }
.cg-detail-row strong {
  display: block;
  color: #8b4d2c;
  font-size: .64rem;
  letter-spacing: .06em;
  text-transform: uppercase;
}
.cg-detail-row span { color: #4f4037; }
.cg-where-row .cg-shop-chip { margin: .15rem .3rem .1rem 0; }
.cg-where-row .cg-shop-chip .cg-ico { color: #4d806a; }
.cg-pin-toggle {
  align-self: center;
  padding: .25rem .7rem;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: var(--coral);
  cursor: pointer;
  font-size: .74rem;
  font-weight: 800;
}
.cg-pin-toggle:hover { background: #fdf0e8; }
.cg-pin-foot { display: flex; flex-wrap: wrap; gap: .3rem; margin-top: .6rem; }
.cg-shop-chip {
  display: inline-flex;
  align-items: center;
  gap: .28rem;
  padding: .18rem .5rem;
  border: 1.2px solid var(--line);
  border-radius: 999px;
  background: #faf5ee;
  color: #8a624a;
  font-size: .66rem;
  font-weight: 700;
  line-height: 1.3;
  white-space: nowrap;
}
.cg-shop-chip .cg-ico { width: .75rem; height: .75rem; color: var(--coral); }
.cg-shop-chip em { font-style: normal; color: #a08268; font-weight: 600; }
.cg-seasonal {
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  gap: .4rem;
  margin: .55rem 0 0;
  padding: .24rem .58rem;
  border: 1.5px solid #f0c9b4;
  border-radius: 999px;
  background: #fdebe2;
  color: var(--coral);
  font-size: .7rem;
  font-weight: 800;
  letter-spacing: .02em;
}
.cg-seasonal .cg-ico { width: .85rem; height: .85rem; }
.cg-no-results {
  -webkit-column-span: all;
  column-span: all;
  padding: 2.2rem 1rem;
  border: 2px dashed #d8b99b;
  border-radius: 18px;
  background: #fffaf3;
  color: var(--muted);
  text-align: center;
}
.cg-results-actions { display: flex; justify-content: center; margin-top: 1.1rem; }
.cg-show-more {
  display: inline-flex;
  align-items: center;
  gap: .45rem;
  padding: .62rem 1.15rem;
  border: 2px solid #d4a37b;
  border-radius: 999px;
  background: #fff;
  color: var(--coral);
  cursor: pointer;
  font-size: .84rem;
  font-weight: 800;
  box-shadow: var(--shadow-soft);
  transition: transform .18s ease, box-shadow .18s ease;
}
.cg-show-more:hover { transform: translateY(-2px); box-shadow: var(--shadow-pop); }
.cg-show-more .cg-ico { width: .95rem; height: .95rem; }
/* ── sections ─────────────────────────────────────────────────────────────── */
.cg-section { margin-top: clamp(2.4rem, 5vw, 4.2rem); }
.cg-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1.2rem;
  margin-bottom: 1.2rem;
}
.cg-section-head h2 {
  margin: 0;
  color: var(--ink);
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.04;
}
.cg-section-head p {
  max-width: 44ch;
  margin: 0;
  color: var(--muted);
  font-size: .94rem;
  line-height: 1.55;
  text-align: right;
}
.cg-section-head .cg-eyebrow { text-align: left; }
/* ── decoder math cards ───────────────────────────────────────────────────── */
.cg-math-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .9rem; }
.cg-math-card {
  position: relative;
  min-height: 172px;
  padding: 1.1rem 1.05rem 1.15rem;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #fff;
  box-shadow: var(--shadow-soft);
  transition: transform .2s ease, box-shadow .2s ease;
}
.cg-math-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-pop); z-index: 1; }
.cg-step {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  margin-bottom: .85rem;
  padding: .3rem .72rem .3rem .45rem;
  border-radius: 999px;
  background: var(--coffee);
  color: #fff7ec;
  font-size: .78rem;
  font-weight: 850;
  letter-spacing: .02em;
  box-shadow: 0 4px 10px rgba(107, 58, 36, .28);
}
.cg-step .cg-ico { width: 1rem; height: 1rem; }
.cg-step .cg-num { font-family: "Fraunces", Georgia, serif; font-size: 1rem; font-weight: 900; }
.cg-math-card h3 {
  margin: 0 0 .4rem;
  color: var(--ink);
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.22rem;
  font-weight: 800;
  line-height: 1.12;
}
.cg-math-card p { margin: 0; color: var(--ink-soft); font-size: .87rem; line-height: 1.52; }
/* ── trap sticky notes ────────────────────────────────────────────────────── */
.cg-traps { display: grid; grid-template-columns: 1fr 1fr; gap: .9rem; margin-top: 1.1rem; }
.cg-note {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: start;
  gap: .85rem;
  padding: 1.05rem 1.15rem 1.15rem;
  border: 1.5px solid #eeddb2;
  border-radius: 18px;
  background: #fdf6e3;
  box-shadow: var(--shadow-soft);
  transition: transform .2s ease, box-shadow .2s ease;
}
.cg-note:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); }
.cg-note .cg-tape { top: -10px; left: 26px; width: 60px; height: 18px; margin-left: 0; transform: rotate(-4deg); }
.cg-tape,
.cg-tape-2 {
  position: absolute;
  height: 26px;
  border-radius: 3px;
  background: rgba(251, 231, 184, .82);
  box-shadow: 0 2px 5px rgba(96, 58, 30, .08);
  z-index: 2;
}
.cg-tape { top: -12px; left: 50%; width: 104px; margin-left: -52px; transform: rotate(2.2deg); }
.cg-tape-2 { top: -8px; left: -14px; width: 78px; transform: rotate(-36deg); }
.cg-note-mark {
  display: grid;
  width: 2.1rem;
  height: 2.1rem;
  place-items: center;
  border-radius: 50%;
  background: #f0c26b;
  color: #7e4a1f;
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.25rem;
  font-weight: 900;
  box-shadow: inset 0 -2px 0 rgba(0,0,0,.06);
}
.cg-note p { margin: 0; color: #6d4a26; font-size: .93rem; line-height: 1.58; }
.cg-note strong { color: #4a2f15; }
/* ── mood picker ──────────────────────────────────────────────────────────── */
.cg-vibe-panel {
  margin-top: 1.1rem;
  padding: 1.1rem;
  border: 1px solid var(--line);
  border-radius: 20px;
  background: #fff;
  box-shadow: var(--shadow-soft);
}
.cg-vibe-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: .85rem;
}
.cg-vibe-head p { margin: 0; color: var(--muted); font-size: .85rem; }
.cg-vibe-head strong { color: var(--ink); font-size: .95rem; }
.cg-vibes { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: .6rem; }
.cg-vibe {
  min-width: 0;
  padding: .75rem .6rem .8rem;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #fff;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
  box-shadow: var(--shadow-soft);
  transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
}
.cg-vibe:hover { border-color: #d8a87b; box-shadow: var(--shadow-pop); transform: translateY(-3px); }
.cg-vibe-icon {
  display: grid;
  width: 2.2rem;
  height: 2.2rem;
  place-items: center;
  margin-bottom: .5rem;
  border-radius: 50%;
  background: #faf3ea;
  color: var(--coffee);
  box-shadow: inset 0 -2px 0 rgba(0,0,0,.05);
}
.cg-vibe-icon .cg-ico { width: 1.25rem; height: 1.25rem; }
.cg-vibe:nth-child(2) .cg-vibe-icon { color: #a45b38; }
.cg-vibe:nth-child(3) .cg-vibe-icon { color: #40597c; }
.cg-vibe:nth-child(4) .cg-vibe-icon { color: #2f6b52; }
.cg-vibe:nth-child(5) .cg-vibe-icon { color: #b04762; }
.cg-vibe:nth-child(6) .cg-vibe-icon { color: #6b4774; }
.cg-vibe strong, .cg-vibe small { display: block; }
.cg-vibe strong { font-size: .84rem; line-height: 1.2; }
.cg-vibe small { margin-top: .3rem; color: var(--ink-soft); font-size: .72rem; line-height: 1.35; }
/* ── SF shop cards ────────────────────────────────────────────────────────── */
.cg-sf-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .85rem; }
.cg-sf-card {
  position: relative;
  padding: 1.05rem 1.05rem 1.1rem;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: #fff;
  box-shadow: var(--shadow-soft);
  transition: transform .2s ease, box-shadow .2s ease;
}
.cg-sf-card:hover { transform: translateY(-3px); box-shadow: var(--shadow-pop); z-index: 1; }
.cg-sf-tab {
  position: absolute;
  top: -11px;
  left: 14px;
  padding: .16rem .6rem;
  border-radius: 999px;
  background: var(--coffee);
  color: #fff7ec;
  font-size: .66rem;
  font-weight: 850;
  letter-spacing: .05em;
  text-transform: uppercase;
  box-shadow: 0 3px 8px rgba(93, 64, 42, .18);
}
.cg-sf-card h3 {
  display: flex;
  align-items: center;
  gap: .45rem;
  margin: 0 0 .35rem;
  color: var(--ink);
  font-family: "Fraunces", Georgia, serif;
  font-size: 1.12rem;
  font-weight: 800;
  line-height: 1.15;
}
.cg-sf-card h3 .cg-ico { width: 1.05rem; height: 1.05rem; color: var(--coral); }
.cg-sf-card .cg-sf-hood { display: block; margin: 0 0 .55rem; color: #96745b; font-size: .75rem; line-height: 1.4; }
.cg-sf-card p { margin: 0; color: var(--muted); font-size: .82rem; line-height: 1.55; }
.cg-sf-card button {
  display: inline-flex;
  align-items: center;
  gap: .35rem;
  margin-top: .8rem;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--coral);
  cursor: pointer;
  font-size: .78rem;
  font-weight: 800;
}
.cg-sf-card button:hover { text-decoration: underline; }
.cg-sf-card button .cg-ico { width: .85rem; height: .85rem; }
/* ── order receipt card ───────────────────────────────────────────────────── */
.cg-order-card {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr);
  gap: 1.2rem;
  align-items: center;
  padding: clamp(1.3rem, 3vw, 2.1rem);
  border: 2px dashed rgba(255, 248, 239, .55);
  border-radius: 22px;
  background:
    radial-gradient(circle at 88% 12%, rgba(255,255,255,.1), transparent 30%),
    var(--coffee);
  color: #fff8ef;
  box-shadow: var(--shadow-pop);
}
.cg-order-card .cg-tape { top: -12px; left: 50%; width: 96px; margin-left: -48px; transform: rotate(-2deg); }
.cg-order-card h2 {
  margin: 0;
  color: #fff8ef;
  font-family: "Fraunces", Georgia, serif;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 800;
  letter-spacing: -.03em;
  line-height: 1.04;
}
.cg-order-card p { margin: 0; color: #f1dfcb; font-size: .95rem; line-height: 1.6; }
.cg-order-example { margin-top: .75rem !important; color: #fff8ef !important; font-weight: 750; }
.cg-order-example code {
  display: inline-block;
  padding: .2rem .5rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, .13);
  color: #fff8ef;
  font: inherit;
}
.cg-order-note {
  display: flex;
  align-items: center;
  gap: .45rem;
  margin-top: .75rem !important;
  color: #f6e3c8 !important;
  font-family: "Caveat", "Comic Sans MS", cursive;
  font-size: 1.1rem !important;
  font-weight: 600;
}
.cg-order-note .cg-ico { width: 1.05rem; height: 1.05rem; color: #f7b6a4; }
/* ── shared chips (world + tags) ──────────────────────────────────────────── */
.cg-region-chip {
  display: inline-flex;
  align-items: center;
  gap: .3rem;
  padding: .2rem .55rem;
  border: 1.5px solid #ddd0e8;
  border-radius: 999px;
  background: #f5eef7;
  color: #6b4774;
  font-size: .72rem;
  font-weight: 750;
}
.cg-region-chip .cg-ico { width: .8rem; height: .8rem; }
.cg-tag {
  padding: .22rem .5rem;
  border: 1.5px solid var(--line);
  border-radius: 999px;
  background: #fff;
  color: #8b6d5a;
  font-size: .67rem;
  font-weight: 750;
  line-height: 1.1;
}
.cg-tag.origin { border-color: #ddd0e8; background: #f5eef7; color: #6b4774; }
.cg-tag.adult { border-color: #e5b9a8; background: #fff0eb; color: #a8442c; }
button.cg-tag { cursor: pointer; font-family: inherit; }
button.cg-tag:hover { border-color: #d8a87b; background: #fdf3ea; }
/* ── sources ──────────────────────────────────────────────────────────────── */
.cg-sources { padding: 1rem 0 .35rem; color: var(--muted); font-size: .75rem; line-height: 1.6; }
.cg-sources p { margin: 0 0 .55rem; }
.cg-sources strong { color: #705543; }
.cg-sources a { color: #8f5d41; }
.cg-sources ul { margin: .45rem 0 0; padding-left: 1.2rem; }
.cg-sources li { margin: .18rem 0; }
/* ── responsive ───────────────────────────────────────────────────────────── */
@media screen and (max-width: 700px) {
  .cg-app { width: 100%; margin-left: 0; transform: none; }
  .cg-board-header { padding: 1.9rem .75rem 1rem; }
  .cg-section { margin-top: 2.5rem; }
  .cg-section-head { display: block; }
  .cg-section-head p { margin-top: .55rem; text-align: left; }
  .cg-search-panel { top: 6px; padding: .7rem .8rem; border-radius: 16px; }
  .cg-traps { grid-template-columns: 1fr; }
  .cg-results-line { display: block; }
  .cg-results-hint { margin-top: .3rem; text-align: left; }
  .cg-sf-grid { grid-template-columns: 1fr; }
  .cg-math-grid { grid-template-columns: 1fr; }
  .cg-math-card { min-height: 0; }
  .cg-vibe-head { display: block; }
  .cg-vibe-head p { margin-top: .35rem; }
  .cg-vibes { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .cg-order-card { grid-template-columns: 1fr; }
}
@media screen and (max-width: 460px) {
  .cg-board-title { letter-spacing: -.02em; }
  .cg-search-panel { padding: .6rem .65rem; }
  .cg-pin { padding: .8rem .75rem .9rem; }
  .cg-pin-name { font-size: 1.42rem; }
}
@media (prefers-reduced-motion: reduce) {
  .cg-pin, .cg-math-card, .cg-note, .cg-vibe, .cg-sf-card,
  .cg-show-more {
    transition: none;
  }
  .cg-pin:hover, .cg-math-card:hover, .cg-note:hover, .cg-vibe:hover,
  .cg-sf-card:hover, .cg-show-more:hover {
    transform: none !important;
  }
}

.cg-app .cg-art { overflow: visible; }
</style>
<div class="cg-app">

  <svg class="cg-sprite" aria-hidden="true">
    <defs>
      <symbol id="cg-i-bean" viewBox="0 0 24 24">
        <ellipse cx="12" cy="12" rx="5.2" ry="7.8" transform="rotate(28 12 12)"/>
        <path d="M12 5.5c.5 2.4-.5 4.8 0 7.2"/>
      </symbol>
      <symbol id="cg-i-cup" viewBox="0 0 24 24">
        <path d="M4 9h11v6.5A4.5 4.5 0 0 1 10.5 20h-2A4.5 4.5 0 0 1 4 15.5V9Z"/>
        <path d="M15 11h2.5a2.5 2.5 0 0 1 0 5H15"/>
        <path d="M7.5 6.5c.8-1.4 1.6 1.4 2.4 0"/>
        <path d="M10.5 7.5c.8-1.4 1.6 1.4 2.4 0" opacity=".55"/>
      </symbol>
      <symbol id="cg-i-jug" viewBox="0 0 24 24">
        <path d="M8.5 3h5.5v2h-5.5z"/>
        <path d="M8.5 5 6.3 13.5c-.35 1.3.5 2 1.9 2h6.2c1.4 0 2.25-.7 1.9-2L14 5"/>
        <path d="M7 15.5h8.5V19H7z"/>
      </symbol>
      <symbol id="cg-i-ice" viewBox="0 0 24 24">
        <rect x="5" y="5" width="13" height="13" rx="3"/>
        <path d="M10 5 18.6 17.4"/>
      </symbol>
      <symbol id="cg-i-fizz" viewBox="0 0 24 24">
        <path d="M5 4h10v8.5A4.5 4.5 0 0 1 10.5 17h-1A4.5 4.5 0 0 1 5 12.5V4Z"/>
        <path d="M17 7.5h1.5a1.5 1.5 0 0 1 0 3H17"/>
        <circle cx="8" cy="7.5" r="1" fill="currentColor" stroke="none"/>
        <circle cx="11.5" cy="9.5" r=".8" fill="currentColor" stroke="none"/>
        <circle cx="8.5" cy="11.5" r="1.1" fill="currentColor" stroke="none"/>
      </symbol>
      <symbol id="cg-i-heart" viewBox="0 0 24 24">
        <path d="M12 20.5s-7.6-4.8-7.6-10.1A4.7 4.7 0 0 1 12 7.2a4.7 4.7 0 0 1 7.6 3.2c0 5.3-7.6 10.1-7.6 10.1Z" fill="currentColor" stroke="none"/>
      </symbol>
      <symbol id="cg-i-sparkle" viewBox="0 0 24 24">
        <path d="M12 2.5c.8 5.6 3.4 8.2 9 9-5.6.8-8.2 3.4-9 9-.8-5.6-3.4-8.2-9-9 5.6-.8 8.2-3.4 9-9Z" fill="currentColor" stroke="none"/>
      </symbol>
      <symbol id="cg-i-pin" viewBox="0 0 24 24">
        <path d="M12 21.5S5.5 16 5.5 10.7a6.5 6.5 0 1 1 13 0C18.5 16 12 21.5 12 21.5Z"/>
        <circle cx="12" cy="10.7" r="2.4"/>
      </symbol>
      <symbol id="cg-i-mag" viewBox="0 0 24 24">
        <circle cx="10.5" cy="10.5" r="6.5"/>
        <path d="m15.5 15.5 5 5"/>
      </symbol>
      <symbol id="cg-i-sun" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8"/>
      </symbol>
      <symbol id="cg-i-chat" viewBox="0 0 24 24">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H11l-4.5 3.5V16H6.5A2.5 2.5 0 0 1 4 13.5v-7Z"/>
      </symbol>
      <symbol id="cg-i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h13"/>
        <path d="m13 6.5 5.5 5.5-5.5 5.5"/>
      </symbol>
      <symbol id="cg-i-star" viewBox="0 0 24 24">
        <path d="m12 3.5 1.9 4.8 5.1.4-3.9 3.4 1.2 5-4.3-2.7-4.3 2.7 1.2-5L4.8 8.7l5.1-.4L12 3.5Z" fill="currentColor" stroke="none"/>
      </symbol>
      <symbol id="cg-i-droplet" viewBox="0 0 24 24">
        <path d="M12 3.5s6 6.6 6 10.5a6 6 0 0 1-12 0C6 10.1 12 3.5 12 3.5Z"/>
        <path d="M9.5 14a2.6 2.6 0 0 0 2.3 2.6"/>
      </symbol>
    </defs>
  </svg>

  <header class="cg-board-header" aria-labelledby="cg-hero-title">
    <p class="cg-eyebrow">san francisco coffee field notes ✎</p>
    <h2 id="cg-hero-title" class="cg-board-title">Read the menu.<br />Order the thing.</h2>
    <div class="cg-board-flourish" aria-hidden="true">✦</div>
    <p class="cg-board-dek">A friendly decoder for espresso ratios, milk textures, cold coffee, and the wonderfully specific names you’ll run into at SF cafés — plus where to actually find them.</p>
    <p class="cg-updated">128 drinks · classic definitions + SF menu sightings · last checked August 15, 2026</p>
  </header>


  <section class="cg-section" id="cg-lookup" aria-labelledby="cg-lookup-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">the useful bit</p>
        <h2 id="cg-lookup-title" class="cg-display">Look it up at the counter.</h2>
      </div>
      <p>Search a drink, ingredient, alias, or shop. Try <em>tonic</em>, <em>macadamia</em>, <em>Philz</em>, or <em>cortado</em>.</p>
    </div>

    <div class="cg-search-panel">
      <div class="cg-search-line">
        <span class="cg-search-icon" aria-hidden="true"><svg class="cg-ico"><use href="#cg-i-mag"/></svg></span>
        <label class="cg-search-label" for="cg-search">Search drinks, ingredients, or cafés</label>
        <input class="cg-search-input" id="cg-search" type="search" placeholder="Search drinks, ingredients, or cafés…" autocomplete="off" />
        <button class="cg-clear" id="cg-clear" type="button" aria-label="Clear search">×</button>
      </div>

      <div class="cg-select-row">
        <div class="cg-select-group">
          <label class="cg-filter-label" for="cg-category-select">Drink family</label>
          <select id="cg-category-select" class="cg-select">
            <option value="all" selected>All families</option>
            <option value="espresso">Espresso</option>
            <option value="milk">Milk drinks</option>
            <option value="brewed">Brewed</option>
            <option value="cold">Cold &amp; sparkling</option>
            <option value="signature">SF signatures</option>
            <option value="noncoffee">Not coffee</option>
            <option value="world">World passport</option>
          </select>
        </div>
        <div class="cg-select-group">
          <label class="cg-filter-label" for="cg-shop-select">Shop</label>
          <select id="cg-shop-select" class="cg-select">
            <option value="all" selected>All shops</option>
            <option>Saint Frank</option>
            <option>Blue Bottle</option>
            <option>Ritual</option>
            <option>Sightglass</option>
            <option>Andytown</option>
            <option>Philz</option>
            <option>Four Barrel</option>
            <option>Linea</option>
            <option>Verve</option>
            <option>Equator</option>
            <option>Wrecking Ball</option>
            <option>Flywheel</option>
            <option value="The Coffee Movement">Coffee Movement</option>
            <option>Abanico</option>
            <option>Sextant</option>
            <option>Pinhole</option>
            <option>Mazarine</option>
          </select>
        </div>
        <div class="cg-select-group">
          <label class="cg-filter-label" for="cg-region-select">Country</label>
          <select id="cg-region-select" class="cg-select">
            <option value="all" selected>All countries</option>
            <option>Australia</option>
            <option>Austria</option>
            <option>Cuba</option>
            <option>Ethiopia</option>
            <option>France</option>
            <option>Germany</option>
            <option>Greece</option>
            <option>Hong Kong</option>
            <option>India</option>
            <option>Indonesia</option>
            <option>Ireland</option>
            <option>Italy</option>
            <option>Korea</option>
            <option>Mexico</option>
            <option>Morocco</option>
            <option>New York</option>
            <option>Portugal</option>
            <option>Senegal</option>
            <option>Singapore</option>
            <option>Spain</option>
            <option>Turkey</option>
            <option>Vietnam</option>
          </select>
        </div>
      </div>
    </div>

    <div class="cg-results-line">
      <p class="cg-results-count" id="cg-results-count" aria-live="polite"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-sparkle"/></svg></p>
      <p class="cg-results-hint">Ratios are guidelines, not café law.</p>
    </div>
    <div class="cg-results" id="cg-results"></div>
    <div class="cg-results-actions">
      <button class="cg-show-more" id="cg-show-more" type="button" hidden>Show all menu terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
    </div>
    <noscript><p class="cg-no-results">This lookup needs JavaScript enabled. The quick ratio map and the shop notes below still work without it.</p></noscript>
  </section>
  <section class="cg-section" id="cg-decoder" aria-labelledby="cg-decoder-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">the 30-second decoder</p>
        <h2 id="cg-decoder-title" class="cg-display">Most orders are just coffee math.</h2>
      </div>
      <p>Start with the base, then notice what gets added. A shop’s exact ounces and foam can vary; these are the useful ideas behind the names.</p>
    </div>

    <div class="cg-math-grid">
      <article class="cg-math-card">
        <span class="cg-step"><span class="cg-num">1</span><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-cup"/></svg>pick a base</span>
        <h3 class="cg-display">Pick a base</h3>
        <p>Espresso is concentrated coffee. Drip, pour-over, and cold brew are all brewed coffee, just made different ways.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step"><span class="cg-num">2</span><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-jug"/></svg>pick the body</span>
        <h3 class="cg-display">Pick the body</h3>
        <p>Water makes an Americano. Steamed milk makes a cortado, cappuccino, flat white, or latte.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step"><span class="cg-num">3</span><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-ice"/></svg>pick the temp</span>
        <h3 class="cg-display">Pick the temperature</h3>
        <p>“Iced” usually means ice plus a chilled drink. A shakerato is shaken cold; nitro is cold brew with nitrogen.</p>
      </article>
      <article class="cg-math-card">
        <span class="cg-step"><span class="cg-num">4</span><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-sparkle"/></svg>pick the accent</span>
        <h3 class="cg-display">Pick the accent</h3>
        <p>Chocolate, honey, mint, tonic, chicory, or a seasonal syrup turns a familiar base into a house signature.</p>
      </article>
    </div>

    <div class="cg-traps">
      <div class="cg-note">
        <span class="cg-tape" aria-hidden="true"></span>
        <span class="cg-note-mark" aria-hidden="true">!</span>
        <p><strong>Trap one:</strong> a <strong>macchiato</strong> traditionally means espresso “marked” with a little foam — not automatically a giant caramel drink.</p>
      </div>
      <div class="cg-note">
        <span class="cg-tape" aria-hidden="true"></span>
        <span class="cg-note-mark" aria-hidden="true">!</span>
        <p><strong>Trap two:</strong> a <strong>Gibraltar</strong> is essentially a small cortado; in SF, the glass and the local name are part of the fun.</p>
      </div>
    </div>

    <div class="cg-vibe-panel" aria-label="Choose a coffee mood">
      <div class="cg-vibe-head">
        <p><strong>Choose by mood</strong></p>
        <p class="cg-hand">Tap a vibe and the lookup will pull up a starting point.</p>
      </div>
      <div class="cg-vibes">
        <button class="cg-vibe" type="button" data-vibe-query="cortado">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-cup"/></svg></span>
          <strong>Bold, balanced</strong>
          <small>Cortado · Gibraltar</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="latte">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-jug"/></svg></span>
          <strong>Soft &amp; silky</strong>
          <small>Latte · flat white</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="pour-over">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-droplet"/></svg></span>
          <strong>Bright &amp; black</strong>
          <small>Pour-over · siphon</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="tonic">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-fizz"/></svg></span>
          <strong>Cold &amp; fizzy</strong>
          <small>Tonic · Snowy Plover</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="mocha">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-heart"/></svg></span>
          <strong>Sweet &amp; cozy</strong>
          <small>Mocha · Café Miel</small>
        </button>
        <button class="cg-vibe" type="button" data-vibe-query="flight">
          <span class="cg-vibe-icon" aria-hidden="true"><svg class="cg-ico" viewBox="0 0 24 24"><use href="#cg-i-sparkle"/></svg></span>
          <strong>Curious</strong>
          <small>Flight · named blends</small>
        </button>
      </div>
    </div>
  </section>



  <section class="cg-section" id="cg-sf" aria-labelledby="cg-sf-title">
    <div class="cg-section-head">
      <div>
        <p class="cg-eyebrow">san francisco menu fingerprints</p>
        <h2 id="cg-sf-title" class="cg-display">Names you’ll actually see here.</h2>
      </div>
      <p>These are the local clues that make a menu feel more SF than generic coffee-chain vocabulary. Tap a shop to filter the lookup above.</p>
    </div>

    <div class="cg-sf-grid">
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Polk St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Saint Frank</h3>
        <em class="cg-sf-hood">Russian Hill · 2340 Polk St</em>
        <p><strong>Look for:</strong> Little Brother, Café Miel, Kaffe Tonic, Kaffe Cola, coffee flights, house almond-macadamia milk, and seasonal orange, honey-lavender, or pine lattes.</p>
        <button type="button" data-shop-jump="Saint Frank">Show Saint Frank terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Mint Plaza</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Blue Bottle</h3>
        <em class="cg-sf-hood">SoMa · 66 Mint Plaza (plus many cafés)</em>
        <p><strong>Look for:</strong> Gibraltar, NOLA / New Orleans-style iced coffee, Shakerato, pour-over, and a very compact espresso vocabulary.</p>
        <button type="button" data-shop-jump="Blue Bottle">Show Blue Bottle terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Valencia</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Ritual</h3>
        <em class="cg-sf-hood">Mission · 1026 Valencia St (+ Haight St)</em>
        <p><strong>Look for:</strong> Gibraltar (often glossed as cortado), flat white, plus rotating signatures such as Foggy Latte, ‘Spromoni, and Tamarindo Lindo.</p>
        <button type="button" data-shop-jump="Ritual">Show Ritual terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">7th St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Sightglass</h3>
        <em class="cg-sf-hood">SoMa · 270 7th St (+ 20th St Mission)</em>
        <p><strong>Look for:</strong> Quick Cup, pour-over, espresso tonic, vanilla paste latte, and seasonal drinks like cardamom mocha or brown-butter-miso caramel latte.</p>
        <button type="button" data-shop-jump="Sightglass">Show Sightglass terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Lawton</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Andytown</h3>
        <em class="cg-sf-hood">Outer Sunset · 3655 Lawton St</em>
        <p><strong>Look for:</strong> Snowy Plover, also called Original Bird in some menu listings — espresso, sparkling water, sweetness, ice, and whipped cream.</p>
        <button type="button" data-shop-jump="Andytown">Show Andytown terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">24th St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Philz</h3>
        <em class="cg-sf-hood">Mission · 3101 24th St (plus many cafés)</em>
        <p><strong>Look for:</strong> Mint Mojito, Philtered Soul, Tesora, Honey Haze, Iced Coffee Rosé, and other named blends. Philz names are often a blend or signature build, not an espresso ratio.</p>
        <button type="button" data-shop-jump="Philz">Show Philz terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Valencia</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Four Barrel</h3>
        <em class="cg-sf-hood">Mission · 375 Valencia St</em>
        <p><strong>Look for:</strong> straightforward espresso, cortado, latte, iced coffee, and filter / slow-bar coffee that lets the roast do the talking.</p>
        <button type="button" data-shop-jump="Four Barrel">Show Four Barrel terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">18th St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Linea</h3>
        <em class="cg-sf-hood">Mission · 3417 18th St (+ Potrero Hill roastery)</em>
        <p><strong>Look for:</strong> espresso, cortado, shakerato, iced espresso tonic, and the salted maple latte — a small menu with Italian-leaning coffee classics.</p>
        <button type="button" data-shop-jump="Linea">Show Linea terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Pacific Ave</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Verve</h3>
        <em class="cg-sf-hood">Nob Hill · 1540 Pacific Ave</em>
        <p><strong>Look for:</strong> One + One, Gibraltar, Missile, Whiskey Latte, Nitro Flash Brew, and espresso tonic alongside the usual espresso bar.</p>
        <button type="button" data-shop-jump="Verve">Show Verve terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Fort Mason</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Equator</h3>
        <em class="cg-sf-hood">Marina · Fort Mason Center</em>
        <p><strong>Look for:</strong> Habibi Latte, brown sugar cinnamon shakerato, iced brown-butter caramel latte, Chagaccino, and rotating cold-brew builds.</p>
        <button type="button" data-shop-jump="Equator">Show Equator terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Union St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Wrecking Ball</h3>
        <em class="cg-sf-hood">Cow Hollow · 2271 Union St</em>
        <p><strong>Look for:</strong> Pillow Fight espresso, cortado, Kalita pour-over, iced cappuccino, and a focused standard espresso menu.</p>
        <button type="button" data-shop-jump="Wrecking Ball">Show Wrecking Ball terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Stanyan</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Flywheel</h3>
        <em class="cg-sf-hood">Upper Haight · 672 Stanyan St</em>
        <p><strong>Look for:</strong> V60 pour-over, siphon coffee, flash brew, cold brew, and nitro. This is the filter-method rabbit hole.</p>
        <button type="button" data-shop-jump="Flywheel">Show Flywheel terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Washington</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>The Coffee Movement</h3>
        <em class="cg-sf-hood">Nob Hill · 1030 Washington St (+ Inner Richmond)</em>
        <p><strong>Look for:</strong> Piccolo, Cocoa Cappuccino, tasting flights, espresso tonic, orange-vanilla latte, and Coffee Cream Soda.</p>
        <button type="button" data-shop-jump="The Coffee Movement">Show Coffee Movement terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Mission St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Abanico</h3>
        <em class="cg-sf-hood">Mission · 2121 Mission St</em>
        <p><strong>Look for:</strong> Café con Morro, Café con Leche, Café con Coco y Choco, Cortadito, café de olla, and Pinolillo.</p>
        <button type="button" data-shop-jump="Abanico">Show Abanico terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Folsom</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Sextant</h3>
        <em class="cg-sf-hood">SoMa · 1415 Folsom St</em>
        <p><strong>Look for:</strong> Wired Gandhi, Frosty Gandhi, ginger gasheer, and adeny — East African and Arabian Peninsula coffee traditions in espresso-drink form.</p>
        <button type="button" data-shop-jump="Sextant">Show Sextant terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Cortland</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Pinhole</h3>
        <em class="cg-sf-hood">Bernal Heights · 231 Cortland Ave</em>
        <p><strong>Look for:</strong> piccolo, shaken iced coffee, single-shot oat lattes, and a friendly neighborhood espresso menu.</p>
        <button type="button" data-shop-jump="Pinhole">Show Pinhole terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
      <article class="cg-sf-card">
        <span class="cg-sf-tab">Market St</span>
        <h3><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>Mazarine</h3>
        <em class="cg-sf-hood">Financial District · 720 Market St</em>
        <p><strong>Look for:</strong> the Raf — espresso, half-and-half, and cinnamon — plus nitro cold brew and classic downtown espresso drinks.</p>
        <button type="button" data-shop-jump="Mazarine">Show Mazarine terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg></button>
      </article>
    </div>
  </section>

  <section class="cg-section" aria-labelledby="cg-order-title">
    <div class="cg-order-card">
      <span class="cg-tape" aria-hidden="true"></span>
      <h2 id="cg-order-title" class="cg-display">A no-stress way to order.</h2>
      <div>
        <p>Say <strong>size + temperature + base + milk + sweetness</strong>. The barista can translate the rest. You never need to pretend you already know the menu.</p>
        <p class="cg-order-example"><code>small iced latte · oat milk · half sweet</code></p>
        <p class="cg-order-note"><svg class="cg-ico cg-s-heart" aria-hidden="true"><use href="#cg-i-heart"/></svg>say it slow — they’ve heard it all before</p>
      </div>
    </div>
  </section>

  <footer class="cg-sources">
    <p><strong>Sources &amp; caveat.</strong> Classic drink definitions are intentionally approximate: cafés use different cup sizes, shot counts, and milk textures. Seasonal names can disappear or change. Shop neighborhoods and addresses were double-checked against the cafés’ own sites and directories in August 2026.</p>
    <p>Menu vocabulary cross-checked against <a href="https://www.saintfrankcoffee.com/" target="_blank" rel="noopener">Saint Frank</a>, <a href="https://blog.bluebottlecoffee.com/posts/blue-bottle-reopening-menu" target="_blank" rel="noopener">Blue Bottle’s drink menu notes</a>, <a href="https://ritualcoffee.com/news/signature-beverages-fall-23/" target="_blank" rel="noopener">Ritual’s signature-beverage notes</a>, <a href="https://sightglasscoffee.com/blogs/blog/signature-espresso-beverages" target="_blank" rel="noopener">Sightglass’s signature-beverage notes</a>, <a href="https://philzcoffee.com/menu/coffee" target="_blank" rel="noopener">Philz’s coffee menu</a>, <a href="https://lineacaffe.com/drink-menu/" target="_blank" rel="noopener">Linea’s drink menu</a>, <a href="https://vervecoffeeroasters.toast.site/menu/verve-coffee-roasters-pacific-avenue-1540-pacific-avenue" target="_blank" rel="noopener">Verve’s SF menu</a>, <a href="https://order.toasttab.com/online/equator-coffees-fort-mason" target="_blank" rel="noopener">Equator’s Fort Mason menu</a>, <a href="https://www.fourbarrelcoffee.com/pages/about-us" target="_blank" rel="noopener">Four Barrel</a>, <a href="https://flywheelcoffee.com/" target="_blank" rel="noopener">Flywheel</a>, <a href="https://www.thecoffeemovement.com/menu" target="_blank" rel="noopener">The Coffee Movement’s menu</a>, <a href="https://dailycoffeenews.com/2021/06/02/abanico-coffee-roasters-is-right-at-home-in-the-mission/" target="_blank" rel="noopener">Daily Coffee News on Abanico</a>, <a href="https://sf.eater.com/2024/3/15/24102109/sextant-coffee-opening-mission-district-cafe" target="_blank" rel="noopener">Eater’s Sextant profile</a>, <a href="https://mazarinecoffee.com/food-print-menu/" target="_blank" rel="noopener">Mazarine’s menu</a>, <a href="https://www.sfchronicle.com/recipes/article/Recipe-Karl-the-Latte-Wrecking-Ball-s-Spiced-6582045.php" target="_blank" rel="noopener">the Karl the Latte recipe</a>, <a href="https://www.coffee-consulate.com/en/blog/spain" target="_blank" rel="noopener">Coffee Consulate’s Spain glossary</a>, <a href="https://visiteurope.com/experiences/portugal-coffee-culture" target="_blank" rel="noopener">Visit Europe’s Portugal guide</a>, <a href="https://ny.eater.com/2022/10/5/23386042/egg-creams-in-nyc-beanmonger-s-and-p-agis-counter" target="_blank" rel="noopener">Eater NY on egg creams</a>, <a href="https://gosimplyfrench.com/blog/how-to-order-coffee-in-french-and-sound-like-a-local/31dcd2e1-d4c4-80aa-a307-f53c31abd3ab" target="_blank" rel="noopener">a French café glossary</a>, <a href="https://coffeewise.com.au/what-is-magic-coffee/" target="_blank" rel="noopener">an Australian magic guide</a>, <a href="https://cubancoffeequeen.com/company/what-is-cuban-coffee/make-your-own/cafe-colada/" target="_blank" rel="noopener">Cuban Coffee Queen’s colada guide</a>, <a href="https://www.middleeasteye.net/discover/coffee-turkey-yemen-morocco-middle-east-around" target="_blank" rel="noopener">Middle East Eye’s Moroccan coffee note</a>, <a href="https://eskedarcoffee.com/blogs/conversations-over-coffee/what-is-the-ethiopian-coffee-ceremony-a-guide-to-buna" target="_blank" rel="noopener">Eskedar’s buna guide</a>, and <a href="https://sf.eater.com/2019/2/5/18212681/andytown-cafe-downtown-san-francisco-open" target="_blank" rel="noopener">Eater’s Andytown profile</a>.</p>
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
      region: "Australia",
      tags: ["world", "Australia", "small", "milk"],
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
      name: "Café Crème",
      aliases: ["cafe creme", "French café crème", "French latte"],
      category: "world",
      region: "France",
      tags: ["world", "France", "milk", "bistro"],
      meaning: "The French café order for espresso with a generous amount of steamed, foamy milk. It is usually a better translation of “latte” in a traditional French café than asking for a latte.",
      ingredients: "Espresso + steamed milk + foam, often served larger than a noisette.",
      order: "un café crème"
    },
    {
      name: "Café Noisette",
      aliases: ["cafe noisette", "French macchiato", "hazelnut-colored coffee"],
      category: "world",
      region: "France",
      tags: ["world", "France", "tiny milk", "espresso"],
      meaning: "No hazelnut syrup required: noisette refers to the hazelnut color created when a little hot milk hits espresso.",
      ingredients: "Espresso + a small splash of hot milk.",
      order: "une noisette"
    },
    {
      name: "Café Allongé",
      aliases: ["cafe allonge", "French long coffee", "French Americano"],
      category: "world",
      region: "France",
      tags: ["world", "France", "long", "black"],
      meaning: "An elongated espresso with extra hot water. It is the traditional French answer when you want a longer black coffee than a straight café.",
      ingredients: "Espresso + extra hot water; the exact extraction varies.",
      order: "un café allongé"
    },
    {
      name: "Café Gourmand",
      aliases: ["cafe gourmand", "espresso and desserts", "French dessert coffee"],
      category: "world",
      region: "France",
      tags: ["world", "France", "dessert", "not a ratio"],
      meaning: "A café order that arrives with espresso plus a small selection of desserts. The “gourmand” describes the whole little plate, not a coffee recipe.",
      ingredients: "Espresso + miniature pastries or sweets.",
      order: "un café gourmand"
    },
    {
      name: "Magic Coffee",
      aliases: ["magic", "Melbourne magic", "double ristretto milk coffee"],
      category: "world",
      region: "Australia",
      tags: ["world", "Australia", "strong", "microfoam"],
      meaning: "A Melbourne specialty: stronger and smaller than a flat white, usually made with double ristretto and silky milk. It may be a verbal-order item rather than a printed menu item.",
      ingredients: "Double ristretto + steamed milk with thin microfoam, around 5 oz.",
      order: "a magic, if you make them"
    },
    {
      name: "Long Black",
      aliases: ["Australian long black", "New Zealand long black"],
      category: "world",
      region: "Australia",
      tags: ["world", "Australia / New Zealand", "black", "hot water"],
      meaning: "Espresso poured over hot water, usually keeping more crema on top than an Americano. It is the everyday black-coffee vocabulary of Australia and New Zealand.",
      ingredients: "Hot water + 1–2 espresso shots poured over it.",
      order: "a long black"
    },
    {
      name: "Café Cubano / Colada",
      aliases: ["cafe cubano", "cafecito", "colada", "Cuban espresso"],
      category: "world",
      region: "Cuba",
      tags: ["world", "Cuba", "sweet", "social"],
      meaning: "Cuban espresso sweetened with espumita, a pale sugar-and-first-drops foam. A colada is the larger shareable batch served with tiny cups for friends.",
      ingredients: "Strong espresso or moka coffee + sugar whipped with the first coffee drops into espumita.",
      order: "a cafecito for me, or a colada to share"
    },
    {
      name: "Cuban Cortadito",
      aliases: ["cortadito cubano", "Cuban short latte", "sweet Cuban cortado"],
      category: "world",
      region: "Cuba",
      tags: ["world", "Cuba", "sweet", "small milk"],
      meaning: "Do not confuse it with an unsweetened Spanish cortado: the Cuban version starts with sweetened café Cubano and adds warm milk, often evaporated milk.",
      ingredients: "Sweetened Cuban espresso + roughly equal warm or steamed milk; evaporated milk is common.",
      order: "a Cuban cortadito"
    },
    {
      name: "Nous Nous",
      aliases: ["noss-noss", "nss nss", "Moroccan half-half"],
      category: "world",
      region: "Morocco",
      tags: ["world", "Morocco", "half milk", "small glass"],
      meaning: "Nous nous means half-half in Moroccan Arabic: a small glass of espresso and foamed or steamed milk. It is a local order, not a fancy syrup drink.",
      ingredients: "Roughly equal espresso and steamed or foamed milk; sugar is optional.",
      order: "a nous nous"
    },
    {
      name: "Buna / Jebena Coffee Ceremony",
      aliases: ["buna", "buna tetu", "jebena buna", "Abol Tona Bereka"],
      category: "world",
      region: "Ethiopia",
      tags: ["world", "Ethiopia", "ceremony", "shared"],
      meaning: "Not a single café drink but a hospitality ritual: beans are roasted, ground, brewed in a jebena, and served in three rounds. Abol, Tona, and Bereka move from strongest to gentlest.",
      ingredients: "Freshly roasted coffee brewed in a clay jebena; sugar is common, while salt or spices vary by region. Milk is uncommon.",
      order: "I would love to join the buna ceremony"
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


  /* ── SF shop details (neighborhood + address), cross-checked Aug 2026 ──── */
  var shopDetails = {
    "Saint Frank": { hood: "Russian Hill", address: "2340 Polk St" },
    "Blue Bottle": { hood: "SoMa · Mint Plaza", address: "66 Mint Plaza (+ many cafés)" },
    "Ritual": { hood: "Mission", address: "1026 Valencia St (+ Haight St)" },
    "Sightglass": { hood: "SoMa", address: "270 7th St (+ 20th St Mission)" },
    "Andytown": { hood: "Outer Sunset", address: "3655 Lawton St" },
    "Philz": { hood: "Mission", address: "3101 24th St (+ many cafés)" },
    "Four Barrel": { hood: "Mission", address: "375 Valencia St" },
    "Linea": { hood: "Mission", address: "3417 18th St (+ Potrero Hill)" },
    "Verve": { hood: "Nob Hill", address: "1540 Pacific Ave" },
    "Equator": { hood: "Marina · Fort Mason", address: "Fort Mason Center" },
    "Wrecking Ball": { hood: "Cow Hollow", address: "2271 Union St" },
    "Flywheel": { hood: "Upper Haight", address: "672 Stanyan St" },
    "The Coffee Movement": { hood: "Nob Hill", address: "1030 Washington St (+ Inner Richmond)" },
    "Abanico": { hood: "Mission", address: "2121 Mission St" },
    "Sextant": { hood: "SoMa", address: "1415 Folsom St" },
    "Pinhole": { hood: "Bernal Heights", address: "231 Cortland Ave" },
    "Mazarine": { hood: "Financial District", address: "720 Market St" }
  };

  var categoryLabels = {
    espresso: "Espresso",
    milk: "Milk drink",
    brewed: "Brewed",
    cold: "Cold / sparkling",
    signature: "SF signature",
    noncoffee: "Not coffee",
    world: "World passport"
  };

/* cg-cupart.js — cute layered coffee-cup SVG art for the coffee guide chart. Pure ES5, string output only, no DOM. */
var CG_PALETTE = {
  espresso:"#3f2013", coffee:"#6b3a24", drip:"#7a4a2c", milk:"#f2e2c8",
  foam:"#faf1e2", cream:"#fff7ec", water:"#cfe3ee", tonic:"#cde9db",
  soda:"#d9eef2", cola:"#4a2c20", chocolate:"#53301e", matcha:"#a8bf78",
  tea:"#c98f52", condensed:"#f7ecd4", custard:"#f4d78a", whipped:"#fffdf6",
  oat:"#e8d9bd", honey:"#e0a83c", caramel:"#c07a3f", rose:"#e8b4bc",
  licor:"#d9a441", mint:"#9ec49a"
};
var CG_PROFILES = {
  "espresso":{vessel:"mug",layers:[["espresso",.5,"espresso"]],extras:["steam"]}, "doppio":{vessel:"mug",layers:[["espresso",.55,"2 shots"]],extras:["steam"]},
  "ristretto":{vessel:"mug",layers:[["espresso",.38,"short pull"]],extras:["steam"]}, "americano":{vessel:"mug",layers:[["espresso",.2,"espresso"],["water",.38,"hot water"]],extras:["steam"]},
  "red eye":{vessel:"mug",layers:[["coffee",.46,"drip coffee"],["espresso",.12,"+1 shot"]],extras:["steam"]}, "macchiato":{vessel:"glass",layers:[["espresso",.48,"espresso"],["foam",.1,"foam dot"]],extras:["steam"]},
  "cortado":{vessel:"glass",layers:[["espresso",.38,"espresso"],["milk",.38,"steamed milk"]],extras:["steam"]}, "gibraltar":{vessel:"glass",layers:[["espresso",.38,"espresso"],["milk",.38,"milk"]],extras:["steam"]},
  "piccolo latte":{vessel:"glass",layers:[["espresso",.26,"ristretto"],["milk",.44,"microfoam"]],extras:["steam"]}, "cappuccino":{vessel:"mug",layers:[["espresso",.26,"espresso"],["milk",.24,"steamed milk"],["foam",.22,"foam"]],extras:["steam"]},
  "flat white":{vessel:"mug",layers:[["espresso",.28,"espresso"],["milk",.42,"microfoam"]],extras:["steam"]}, "latte":{vessel:"tall",layers:[["espresso",.16,"espresso"],["milk",.5,"steamed milk"],["foam",.08,"microfoam"]],extras:["steam"]},
  "mocha":{vessel:"mug",layers:[["chocolate",.16,"chocolate"],["espresso",.18,"espresso"],["milk",.32,"milk"],["foam",.06,"foam"]],extras:["steam"]}, "café au lait":{vessel:"mug",layers:[["coffee",.4,"drip coffee"],["milk",.4,"warm milk"]],extras:["steam"]},
  "breve":{vessel:"mug",layers:[["espresso",.18,"espresso"],["cream",.42,"half-and-half"]],extras:["steam"]}, "espresso con panna":{vessel:"glass",layers:[["espresso",.46,"espresso"],["whipped",.18,"whipped cream"]],extras:["steam","whipped"]},
  "drip / batch / filter coffee":{vessel:"mug",layers:[["coffee",.6,"house drip"]],extras:["steam"]}, "pour-over / v60":{vessel:"mug",layers:[["coffee",.6,"filter brew"]],extras:["steam"]},
  "french press":{vessel:"mug",layers:[["coffee",.6,"steeped"]],extras:["steam"]}, "coffee flight / tasting flight":{vessel:"flight",layers:[["coffee",.5,"three pours"]],extras:[]},
  "cold brew":{vessel:"tall",layers:[["coffee",.6,"cold brew"]],extras:["ice"]}, "iced coffee":{vessel:"tall",layers:[["coffee",.52,"filter coffee"]],extras:["ice"]},
  "nitro cold brew":{vessel:"tall",layers:[["coffee",.62,"nitro cold brew"]],extras:["bubbles"]}, "shakerato":{vessel:"rocks",layers:[["foam",.14,"crema"],["coffee",.34,"shaken espresso"]],extras:["ice"]},
  "espresso tonic / kaffe tonic":{vessel:"tall",layers:[["tonic",.42,"tonic"],["espresso",.16,"espresso"]],extras:["ice","lemon"]}, "kaffe cola":{vessel:"tall",layers:[["cola",.44,"cola"],["coffee",.14,"coffee"]],extras:["ice"]},
  "new orleans iced / nola":{vessel:"tall",layers:[["milk",.22,"milk"],["coffee",.34,"chicory cold brew"]],extras:["ice"]}, "snowy plover":{vessel:"rocks",layers:[["soda",.32,"sparkling water"],["cream",.12,"cream"]],extras:["ice","straw"]},
  "matcha plover":{vessel:"rocks",layers:[["soda",.32,"sparkling water"],["matcha",.12,"matcha"]],extras:["ice","straw"]}, "philz mint mojito":{vessel:"tall",layers:[["milk",.16,"cream"],["coffee",.32,"iced coffee"]],extras:["ice","mint"]},
  "philz philtered soul cold brew":{vessel:"tall",layers:[["coffee",.54,"cold brew"]],extras:["ice"]}, "philz honey haze":{vessel:"tall",layers:[["oat",.24,"oat milk"],["coffee",.3,"cold brew"]],extras:["ice"]},
  "philz iced coffee rosé":{vessel:"tall",layers:[["rose",.18,"rose cream"],["coffee",.32,"iced coffee"]],extras:["ice"]}, "philz oatmeal cookie cold brew":{vessel:"tall",layers:[["oat",.22,"oat milk"],["coffee",.3,"cold brew"]],extras:["ice"]},
  "philz mocha tesora":{vessel:"tall",layers:[["chocolate",.16,"chocolate"],["coffee",.32,"tesora brew"]],extras:["ice"]}, "philz named blends":{vessel:"mug",layers:[["coffee",.5,"named blend"]],extras:["steam"]},
  "saint frank house coffee names":{vessel:"mug",layers:[["coffee",.5,"house coffee"]],extras:["steam"]}, "sweet latte":{vessel:"tall",layers:[["espresso",.14,"espresso"],["milk",.44,"sweet milk"]],extras:["steam"]},
  "saint frank café miel":{vessel:"mug",layers:[["honey",.1,"honey"],["espresso",.16,"espresso"],["milk",.34,"milk"]],extras:["steam"]}, "saint frank seasonal lattes":{vessel:"mug",layers:[["espresso",.16,"espresso"],["milk",.36,"seasonal milk"]],extras:["steam"]},
  "saint frank gingerbread latte":{vessel:"mug",layers:[["espresso",.16,"espresso"],["milk",.36,"spiced milk"]],extras:["steam","stick"]}, "saint frank café nico":{vessel:"glass",layers:[["espresso",.18,"espresso"],["milk",.36,"citrus milk"]],extras:["steam","lemon"]},
  "ritual foggy latte":{vessel:"glass",layers:[["tea",.24,"earl grey"],["espresso",.12,"espresso"],["milk",.28,"milk"]],extras:["steam"]}, "ritual ‘spromoni":{vessel:"rocks",layers:[["espresso",.28,"espresso"],["whipped",.16,"cherry cream"]],extras:["whipped"]},
  "ritual tamarindo lindo":{vessel:"tall",layers:[["soda",.36,"tamarind soda"],["coffee",.16,"cold brew"]],extras:["ice"]}, "sightglass brown butter miso caramel latte":{vessel:"mug",layers:[["caramel",.12,"caramel"],["espresso",.16,"espresso"],["milk",.32,"milk"]],extras:["steam"]},
  "sightglass cardamom mocha":{vessel:"mug",layers:[["chocolate",.14,"chocolate"],["espresso",.16,"espresso"],["milk",.3,"milk"]],extras:["steam"]}, "sightglass vanilla paste latte":{vessel:"tall",layers:[["espresso",.14,"espresso"],["milk",.44,"vanilla milk"]],extras:["steam"]},
  "linea salted maple latte":{vessel:"mug",layers:[["caramel",.1,"maple"],["espresso",.16,"espresso"],["milk",.32,"milk"]],extras:["steam"]}, "flywheel siphon coffee":{vessel:"mug",layers:[["coffee",.5,"siphon brew"]],extras:["steam"]},
  "flash brew":{vessel:"tall",layers:[["coffee",.48,"flash brew"]],extras:["ice"]}, "verve one + one":{vessel:"flight",layers:[["espresso",.45,"espresso + macchiato"]],extras:[]},
  "verve missile":{vessel:"tall",layers:[["cream",.16,"cream"],["coffee",.36,"concentrate"]],extras:["ice","straw"]}, "verve whiskey latte":{vessel:"mug",layers:[["caramel",.1,"barrel syrup"],["espresso",.16,"espresso"],["milk",.32,"milk"]],extras:["steam"]},
  "equator habibi latte":{vessel:"glass",layers:[["espresso",.16,"espresso"],["milk",.4,"spiced milk"]],extras:["steam"]}, "equator brown sugar cinnamon shakerato":{vessel:"rocks",layers:[["foam",.12,"foam"],["coffee",.32,"shaken espresso"]],extras:["ice"]},
  "equator chagaccino":{vessel:"mug",layers:[["chocolate",.12,"chaga blend"],["espresso",.16,"espresso"],["milk",.32,"milk"]],extras:["steam"]}, "wrecking ball iced cappuccino":{vessel:"tall",layers:[["espresso",.14,"espresso"],["milk",.32,"cold milk"],["foam",.12,"cold foam"]],extras:["ice"]},
  "wrecking ball house coffee names":{vessel:"mug",layers:[["coffee",.5,"pillow fight"]],extras:["steam"]}, "cortadito":{vessel:"glass",layers:[["condensed",.14,"condensed milk"],["espresso",.16,"espresso"],["milk",.24,"milk"]],extras:["steam"]},
  "café con leche":{vessel:"glass",layers:[["espresso",.2,"espresso"],["milk",.38,"hot milk"]],extras:["steam"]}, "iced café de olla":{vessel:"tall",layers:[["coffee",.44,"spiced coffee"]],extras:["ice","stick"]},
  "café con morro":{vessel:"glass",layers:[["espresso",.18,"espresso"],["milk",.36,"morro milk"]],extras:["steam"]}, "café con coco y choco":{vessel:"glass",layers:[["chocolate",.14,"cacao"],["espresso",.14,"espresso"],["milk",.3,"coconut milk"]],extras:["steam"]},
  "pinolillo":{vessel:"glass",layers:[["chocolate",.22,"cacao corn"],["milk",.22,"spiced milk"]],extras:["sparkle"]}, "con ‘espumita’ cubana":{vessel:"glass",layers:[["espresso",.4,"espresso"],["foam",.12,"espumita"]],extras:["steam"]},
  "cocoa cappuccino":{vessel:"mug",layers:[["espresso",.24,"espresso"],["milk",.22,"milk"],["foam",.2,"cocoa foam"]],extras:["steam"]}, "coffee cream soda":{vessel:"rocks",layers:[["soda",.32,"vanilla soda"],["cream",.1,"coconut cream"]],extras:["ice","straw"]},
  "coffee movement seasonal lattes":{vessel:"mug",layers:[["espresso",.16,"espresso"],["milk",.34,"herb milk"]],extras:["steam"]}, "espresso mule":{vessel:"tall",layers:[["soda",.4,"ginger beer"],["espresso",.12,"espresso"]],extras:["ice","lemon"]},
  "wrecking ball karl the latte":{vessel:"mug",layers:[["tea",.2,"lapsang tea"],["espresso",.12,"espresso"],["milk",.28,"almond milk"]],extras:["steam"]}, "sextant wired gandhi":{vessel:"mug",layers:[["tea",.24,"spiced chai"],["espresso",.12,"espresso"],["milk",.24,"milk"]],extras:["steam"]},
  "sextant frosty gandhi":{vessel:"mug",layers:[["tea",.22,"spiced chai"],["espresso",.12,"espresso"],["milk",.22,"peppermint milk"]],extras:["steam"]}, "sextant ginger gasheer":{vessel:"mug",layers:[["coffee",.5,"black coffee"]],extras:["steam"]},
  "sextant adeny":{vessel:"mug",layers:[["coffee",.46,"spiced coffee"]],extras:["steam"]}, "pinhole shaken iced coffee":{vessel:"rocks",layers:[["foam",.1,"foam"],["coffee",.32,"shaken coffee"]],extras:["ice"]},
  "mazarine raf":{vessel:"mug",layers:[["espresso",.16,"espresso"],["cream",.34,"steamed cream"]],extras:["steam"]}, "philz featured dessert coffees":{vessel:"tall",layers:[["cream",.16,"cream"],["coffee",.32,"dessert brew"]],extras:["ice"]},
  "philz mission cold brew":{vessel:"tall",layers:[["coffee",.52,"mission cold brew"]],extras:["ice"]}, "coffee float":{vessel:"tall",layers:[["coffee",.4,"cold coffee"],["cream",.14,"ice cream"]],extras:["straw","sparkle"]},
  "hot chocolate":{vessel:"mug",layers:[["chocolate",.48,"chocolate"]],extras:["steam","marshmallow"]}, "café solo":{vessel:"mug",layers:[["espresso",.44,"espresso"]],extras:["steam"]},
  "café con hielo":{vessel:"rocks",layers:[["coffee",.34,"hot coffee, poured over"]],extras:["ice"]}, "café bombón":{vessel:"glass",layers:[["condensed",.24,"condensed milk"],["espresso",.22,"espresso"]],extras:[]},
  "carajillo":{vessel:"mug",layers:[["espresso",.44,"espresso + spirit"]],extras:["steam","sparkle"]}, "café manchado / sombra":{vessel:"glass",layers:[["espresso",.1,"espresso"],["milk",.44,"mostly milk"]],extras:["steam"]},
  "barraquito":{vessel:"tall",layers:[["condensed",.18,"condensed milk"],["espresso",.14,"espresso"],["licor",.1,"licor 43"],["milk",.12,"milk foam"]],extras:["sparkle"]}, "bica / cimbalino":{vessel:"mug",layers:[["espresso",.44,"espresso"]],extras:["steam"]},
  "pingado / garoto":{vessel:"mug",layers:[["espresso",.44,"espresso"],["milk",.06,"splash of milk"]],extras:["steam"]}, "meia de leite":{vessel:"mug",layers:[["espresso",.18,"coffee"],["milk",.36,"hot milk"]],extras:["steam"]},
  "galão":{vessel:"tall",layers:[["espresso",.12,"espresso"],["milk",.44,"foamed milk"]],extras:["steam"]}, "mazagran":{vessel:"tall",layers:[["coffee",.36,"iced coffee"]],extras:["ice","lemon"]},
  "café com cheirinho":{vessel:"mug",layers:[["espresso",.44,"espresso + aguardente"]],extras:["steam","sparkle"]}, "new york diner regular":{vessel:"mug",layers:[["coffee",.44,"drip coffee"]],extras:["steam"]},
  "new york egg cream":{vessel:"tall",layers:[["milk",.24,"milk"],["soda",.22,"seltzer"],["foam",.08,"fizz"]],extras:["straw"]}, "caffè corretto":{vessel:"mug",layers:[["espresso",.44,"espresso + grappa"]],extras:["steam","sparkle"]},
  "bicerin":{vessel:"tall",layers:[["chocolate",.18,"hot chocolate"],["espresso",.14,"espresso"],["cream",.14,"cream"]],extras:[]}, "einspänner":{vessel:"glass",layers:[["coffee",.4,"strong coffee"],["whipped",.18,"whipped cream"]],extras:["whipped"]},
  "wiener melange":{vessel:"mug",layers:[["espresso",.18,"coffee"],["milk",.24,"milk"],["foam",.14,"foam"]],extras:["steam"]}, "freddo espresso / freddo cappuccino":{vessel:"rocks",layers:[["espresso",.32,"shaken espresso"],["foam",.1,"cold foam"]],extras:["ice"]},
  "greek frappé":{vessel:"tall",layers:[["foam",.12,"foam"],["coffee",.32,"instant coffee"]],extras:["ice","straw"]}, "cà phê sữa đá":{vessel:"rocks",layers:[["condensed",.18,"condensed milk"],["coffee",.24,"phin coffee"]],extras:["ice"]},
  "vietnamese egg coffee":{vessel:"mug",layers:[["coffee",.32,"strong coffee"],["custard",.2,"egg custard"]],extras:[]}, "café de olla":{vessel:"mug",layers:[["coffee",.46,"piloncillo coffee"]],extras:["steam","stick"]},
  "mexican carajillo 43":{vessel:"rocks",layers:[["espresso",.28,"espresso"],["licor",.14,"licor 43"]],extras:["ice"]}, "turkish coffee":{vessel:"mug",layers:[["espresso",.4,"unfiltered coffee"]],extras:["steam"]},
  "south indian filter coffee":{vessel:"mug",layers:[["coffee",.28,"decoction"],["milk",.24,"milk"],["foam",.06,"froth"]],extras:["steam"]}, "dalgona coffee":{vessel:"glass",layers:[["milk",.36,"milk"],["whipped",.2,"dalgona foam"]],extras:["ice"]},
  "eiskaffee":{vessel:"tall",layers:[["coffee",.32,"chilled coffee"],["cream",.16,"ice cream"]],extras:["whipped","straw"]}, "irish coffee":{vessel:"glass",layers:[["coffee",.36,"sweet coffee"],["cream",.14,"cream"]],extras:["sparkle"]},
  "yuenyeung":{vessel:"mug",layers:[["tea",.24,"milk tea"],["coffee",.16,"coffee"],["milk",.16,"milk"]],extras:["steam"]}, "kopi c":{vessel:"mug",layers:[["coffee",.32,"kopi"],["milk",.18,"evaporated milk"]],extras:["steam"]},
  "café touba":{vessel:"mug",layers:[["coffee",.46,"djarr coffee"]],extras:["steam"]}, "kopi joss":{vessel:"mug",layers:[["coffee",.46,"black coffee"]],extras:["steam","sparkle"]},
  "café crème":{vessel:"mug",layers:[["espresso",.18,"espresso"],["milk",.32,"steamed milk"],["foam",.1,"foam"]],extras:["steam"]}, "café noisette":{vessel:"mug",layers:[["espresso",.38,"espresso"],["milk",.08,"splash of milk"]],extras:["steam"]},
  "café allongé":{vessel:"mug",layers:[["espresso",.16,"espresso"],["water",.34,"hot water"]],extras:["steam"]}, "café gourmand":{vessel:"mug",layers:[["espresso",.38,"espresso"]],extras:["steam","sparkle"]},
  "magic coffee":{vessel:"glass",layers:[["espresso",.24,"double ristretto"],["milk",.32,"microfoam"]],extras:["steam"]}, "long black":{vessel:"mug",layers:[["water",.24,"hot water"],["espresso",.2,"espresso + crema"]],extras:["steam"]},
  "café cubano / colada":{vessel:"mug",layers:[["espresso",.4,"cafecito"],["foam",.08,"espumita"]],extras:["steam"]}, "cuban cortadito":{vessel:"glass",layers:[["condensed",.12,"sweetened"],["espresso",.16,"cubano"],["milk",.24,"evaporated milk"]],extras:["steam"]},
  "nous nous":{vessel:"rocks",layers:[["espresso",.28,"espresso"],["milk",.28,"foamed milk"]],extras:["steam"]}, "buna / jebena coffee ceremony":{vessel:"mug",layers:[["coffee",.42,"jebena brew"]],extras:["steam","sparkle"]},
  "matcha latte":{vessel:"glass",layers:[["matcha",.22,"matcha"],["milk",.3,"milk"]],extras:["steam"]}, "chai latte":{vessel:"mug",layers:[["tea",.28,"chai"],["milk",.24,"milk"],["foam",.08,"foam"]],extras:["steam"]},
  "dirty chai":{vessel:"mug",layers:[["tea",.24,"chai"],["espresso",.12,"espresso"],["milk",.24,"milk"]],extras:["steam"]}
};
var CG_FALLBACK = {
  espresso:{vessel:"mug",layers:[["espresso",.45,"espresso"]],extras:["steam"]},
  milk:{vessel:"mug",layers:[["espresso",.2,"espresso"],["milk",.35,"milk"],["foam",.12,"foam"]],extras:["steam"]},
  brewed:{vessel:"mug",layers:[["coffee",.55,"brewed coffee"]],extras:["steam"]},
  cold:{vessel:"tall",layers:[["coffee",.5,"iced coffee"]],extras:["ice"]},
  signature:{vessel:"mug",layers:[["espresso",.18,"espresso"],["milk",.32,"milk"]],extras:["steam","sparkle"]},
  noncoffee:{vessel:"mug",layers:[["milk",.4,"steamed milk"]],extras:["steam"]},
  world:{vessel:"glass",layers:[["espresso",.2,"coffee"],["milk",.3,"milk"]],extras:["steam"]}
};
var cgN = 0;

function cgMix(hex, t) {
  var n = parseInt(hex.slice(1), 16), f = function (c) { return Math.round(c + (255 - c) * t); };
  return "rgb(" + f(n >> 16) + "," + f((n >> 8) & 255) + "," + f(n & 255) + ")";
}

function cgGeo(v) {
  if (v === "tall") return { l: 56, r: 100, top: 42, bot: 131 };
  if (v === "glass") return { l: 50, r: 106, top: 58, bot: 130 };
  if (v === "rocks") return { l: 40, r: 116, top: 84, bot: 127 };
  return { l: 47, r: 109, top: 54, bot: 130 };
}

function cgBody(g, v) {
  var s;
  if (v === "mug") {
    s = '<path d="M' + g.l + ',' + g.top + 'L' + g.l + ',' + (g.bot - 12) + 'Q' + g.l + ',' + g.bot + ' ' + (g.l + 12) + ',' + g.bot +
        'L' + (g.r - 12) + ',' + g.bot + 'Q' + g.r + ',' + g.bot + ' ' + g.r + ',' + (g.bot - 12) + 'L' + g.r + ',' + g.top +
        'M' + g.r + ',' + (g.top + 20) + 'C' + (g.r + 18) + ',' + (g.top + 18) + ' ' + (g.r + 18) + ',' + (g.top + 48) + ' ' + g.r + ',' + (g.top + 46) + '" fill="none"/>';
  } else {
    var cr = 9, lb = g.l + 3, rb = g.r - 3;
    s = '<path d="M' + g.l + ',' + g.top + 'L' + lb + ',' + (g.bot - cr) + 'Q' + lb + ',' + g.bot + ' ' + (lb + cr) + ',' + g.bot +
        'L' + (rb - cr) + ',' + g.bot + 'Q' + rb + ',' + g.bot + ' ' + rb + ',' + (g.bot - cr) + 'L' + g.r + ',' + g.top + 'Z" fill="none"/>';
  }
  return '<g stroke="#8b4d2c" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">' + s + '</g>';
}

function cgLayers(g, p, id) {
  var innerH = g.bot - g.top - 6, y = g.bot - 3, lx = g.l + 3, w = g.r - g.l - 6, L = p.layers, s = "", i, h;
  for (i = 0; i < L.length; i++) {
    h = L[i][1] * innerH;
    s += '<rect x="' + lx + '" y="' + (y - h).toFixed(1) + '" width="' + w + '" height="' + h.toFixed(1) + '" fill="' + CG_PALETTE[L[i][0]] + '"/>';
    y -= h;
  }
  s += '<ellipse cx="' + ((g.l + g.r) / 2) + '" cy="' + (y + 1.6).toFixed(1) + '" rx="' + (w / 2 - 1) + '" ry="2.7" fill="' + cgMix(CG_PALETTE[L[L.length - 1][0]], .4) + '" opacity=".9"/>';
  return '<g clip-path="url(#' + id + ')">' + s + '</g>';
}

function cgLabels(g, p) {
  if (p.vessel === "flight") return "";
  var L = p.layers, n = L.length, innerH = g.bot - g.top - 6, y = g.bot - 3, mids = [], pick, pts = [], s = "", i;
  for (i = 0; i < n; i++) { mids.push(y - L[i][1] * innerH / 2); y -= L[i][1] * innerH; }
  pick = n === 1 ? [0] : n === 2 ? [0, n - 1] : [0, Math.floor(n / 2), n - 1];
  for (i = 0; i < pick.length; i++) pts.push({ k: pick[i], y: mids[pick[i]] });
  pts.sort(function (a, b) { return a.y - b.y; });
  for (i = 1; i < pts.length; i++) {
    if (pts[i].y < pts[i - 1].y + 14) pts[i].y = pts[i - 1].y + 14;
    if (pts[i].y > g.bot - 2) pts[i].y = g.bot - 2;
  }
  for (i = 0; i < pts.length; i++) {
    s += '<path d="M' + (g.r + 2) + ',' + mids[pts[i].k].toFixed(1) + 'L133,' + pts[i].y.toFixed(1) +
         '" stroke="#8b5a3c" stroke-width="1" opacity=".55" fill="none"/>' +
         '<text x="139" y="' + (pts[i].y + 3.5).toFixed(1) + '" font-family="Caveat, cursive" font-size="11" fill="#7a4e33">' + L[pts[i].k][2] + '</text>';
  }
  return s;
}

function cgExtras(g, p, ty) {
  if (p.vessel === "flight") return "";
  var e = p.extras || [], cx = (g.l + g.r) / 2, s = "", i;
  function star(x, y) {
    return '<path class="cg-s-tw" d="M' + x + ',' + (y - 6) + 'L' + (x + 1.7) + ',' + (y - 1.7) + 'L' + (x + 6) + ',' + y + 'L' + (x + 1.7) + ',' + (y + 1.7) +
           'L' + x + ',' + (y + 6) + 'L' + (x - 1.7) + ',' + (y + 1.7) + 'L' + (x - 6) + ',' + y + 'L' + (x - 1.7) + ',' + (y - 1.7) + 'Z" fill="#e2a04f"/>';
  }
  for (i = 0; i < e.length; i++) {
    if (e[i] === "steam") {
      s += '<path class="cg-s-steam" d="M' + (cx - 12) + ',' + (ty - 8) + 'q-6,-9 0,-17q6,-8 0,-16" stroke="#c07a3f" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".65"/>' +
           '<path class="cg-s-steam" style="animation-delay:1.1s" d="M' + (cx + 10) + ',' + (ty - 6) + 'q-6,-9 0,-17q6,-8 0,-16" stroke="#c07a3f" stroke-width="2.2" fill="none" stroke-linecap="round" opacity=".65"/>';
    } else if (e[i] === "ice") {
      s += '<rect x="' + (cx - 17) + '" y="' + (g.top + 13) + '" width="11" height="11" rx="2.5" fill="#fff" opacity=".8" transform="rotate(-16 ' + (cx - 11) + ' ' + (g.top + 18) + ')"/>' +
           '<rect x="' + (cx + 3) + '" y="' + (g.top + 21) + '" width="10" height="10" rx="2.5" fill="#fff" opacity=".8" transform="rotate(15 ' + (cx + 8) + ' ' + (g.top + 26) + ')"/>';
    } else if (e[i] === "bubbles") {
      s += '<circle class="cg-s-bub" cx="' + (cx - 10) + '" cy="' + (ty + 8) + '" r="2.2" fill="#fff" opacity=".75"/>' +
           '<circle class="cg-s-bub" style="animation-delay:.9s" cx="' + cx + '" cy="' + (ty + 14) + '" r="1.7" fill="#fff" opacity=".75"/>' +
           '<circle class="cg-s-bub" style="animation-delay:1.8s" cx="' + (cx + 9) + '" cy="' + (ty + 6) + '" r="1.3" fill="#fff" opacity=".75"/>';
    } else if (e[i] === "straw") {
      s += '<path d="M' + (cx + 5) + ',' + (ty + 26) + 'L' + (cx + 31) + ',' + (g.top - 16) + '" stroke="#e88fa8" stroke-width="4" stroke-linecap="round"/>';
    } else if (e[i] === "whipped") {
      s += '<path d="M' + (cx - 13) + ',' + (ty + 3) + 'q-5,-11 7,-12q3,-9 13,-5q11,-3 9,9q7,5 -3,10z" fill="#fffdf6" stroke="#dcc09a" stroke-width="1.5" stroke-linejoin="round"/>';
    } else if (e[i] === "lemon") {
      s += '<circle cx="' + (g.r - 1) + '" cy="' + (g.top + 1) + '" r="8.5" fill="#f7de73" stroke="#d9a441" stroke-width="1.5"/>' +
           '<path d="M' + (g.r - 1) + ',' + (g.top - 5) + 'V' + (g.top + 7) + 'M' + (g.r - 6) + ',' + (g.top - 2) + 'L' + (g.r + 4) + ',' + (g.top + 4) +
           'M' + (g.r - 6) + ',' + (g.top + 4) + 'L' + (g.r + 4) + ',' + (g.top - 2) + '" stroke="#d9a441" stroke-width="1"/>';
    } else if (e[i] === "mint") {
      s += '<ellipse cx="' + (cx - 8) + '" cy="' + (ty - 3) + '" rx="7" ry="3.2" fill="#9ec49a" stroke="#6fa06b" stroke-width="1" transform="rotate(-28 ' + (cx - 8) + ' ' + (ty - 3) + ')"/>' +
           '<ellipse cx="' + (cx + 6) + '" cy="' + (ty - 4) + '" rx="7" ry="3.2" fill="#9ec49a" stroke="#6fa06b" stroke-width="1" transform="rotate(22 ' + (cx + 6) + ' ' + (ty - 4) + ')"/>';
    } else if (e[i] === "marshmallow") {
      s += '<rect x="' + (cx - 13) + '" y="' + (ty - 4) + '" width="9" height="5.5" rx="1.5" fill="#fff" stroke="#e3d3ba" transform="rotate(-10 ' + (cx - 9) + ' ' + (ty - 1) + ')"/>' +
           '<rect x="' + (cx + 3) + '" y="' + (ty - 5) + '" width="9" height="5.5" rx="1.5" fill="#fff" stroke="#e3d3ba" transform="rotate(12 ' + (cx + 7) + ' ' + (ty - 2) + ')"/>';
    } else if (e[i] === "sparkle") {
      s += star(g.r + 9, g.top - 4);
    } else if (e[i] === "stick") {
      s += '<path d="M' + (cx - 3) + ',' + (ty + 22) + 'L' + (cx - 13) + ',' + (g.top - 15) + 'M' + (cx + 4) + ',' + (ty + 24) + 'L' + (cx + 12) + ',' + (g.top - 13) +
           '" stroke="#8b5a3c" stroke-width="2.5" stroke-linecap="round"/>';
    }
  }
  return s;
}

function cgFlight() {
  var xs = [34, 78, 122], cols = [CG_PALETTE.espresso, CG_PALETTE.coffee, CG_PALETTE.milk], s = "", i, x, d;
  for (i = 0; i < 3; i++) {
    x = xs[i];
    d = 'M' + (x - 13) + ',94L' + (x - 11) + ',117Q' + (x - 11) + ',121 ' + (x - 7) + ',121L' + (x + 7) + ',121Q' + (x + 11) + ',121 ' + (x + 11) + ',117L' + (x + 13) + ',94';
    s += '<path d="' + d + 'Z" fill="' + cols[i] + '"/><path d="' + d + '" fill="none"/>';
  }
  return '<g stroke="#8b4d2c" stroke-width="2" stroke-linejoin="round">' + s + '</g>';
}

function cgArtProfile(item) {
  var k = String(item && item.name || "").toLowerCase();
  return CG_PROFILES[k] || CG_FALLBACK[item && item.category] || CG_FALLBACK.world;
}

function cupArt(item) {
  var p = cgArtProfile(item), g = cgGeo(p.vessel);
  if (p.vessel === "flight")
    return '<svg class="cg-art" viewBox="0 0 200 150" role="img" aria-hidden="true" focusable="false">' + cgFlight() + '</svg>';
  var id = "cgc" + (++cgN), innerH = g.bot - g.top - 6, y = g.bot - 3, i, h;
  for (i = 0; i < p.layers.length; i++) { h = p.layers[i][1] * innerH; y -= h; }
  return '<svg class="cg-art" viewBox="0 0 200 150" role="img" aria-hidden="true" focusable="false">' +
         '<defs><clipPath id="' + id + '"><rect x="' + (g.l + 2) + '" y="' + (g.top + 2) + '" width="' + (g.r - g.l - 4) +
         '" height="' + (g.bot - g.top - 2) + '" rx="7"/></clipPath></defs>' +
         cgLayers(g, p, id) + cgBody(g, p.vessel) + cgExtras(g, p, y) + cgLabels(g, p) + '</svg>';
}

  var state = { query: "", category: "all", shop: "all", region: "all", showAll: false };
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
    var regionMatch = state.region === "all" || item.region === state.region || (item.tags || []).indexOf(state.region) !== -1;
    return queryMatch && categoryMatch && shopMatch && regionMatch;
  }

  function shopChipHTML(shop) {
    var d = shopDetails[shop] || null;
    var hood = d ? " <em>" + escapeHTML(d.hood) + "</em>" : "";
    var title = d ? shop + " — " + d.address : shop;
    return '<span class="cg-shop-chip" title="' + escapeHTML(title) + '"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-pin"/></svg>' + escapeHTML(shop) + hood + "</span>";
  }

  function renderCard(item) {
    var shopChips = (item.shops || []).map(shopChipHTML).join("");
    var tagList = (item.tags || []).filter(function (tag) { return tag !== "world"; });
    var tags = tagList.length
      ? '<div class="cg-tags">' + tagList.map(function (tag) {
          var tagClass = tag === item.region ? "origin" : tag === "21+" ? "adult" : "";
          return '<button type="button" class="cg-tag ' + tagClass + '" data-tag-query="' + escapeHTML(tag) + '">' + escapeHTML(tag) + "</button>";
        }).join("") + "</div>"
      : "";
    var aliasLine = item.aliases && item.aliases.length
      ? '<p class="cg-pin-alias">aka ' + escapeHTML(item.aliases.join(" · ")) + "</p>"
      : "";
    var seasonal = item.seasonal
      ? '<span class="cg-seasonal"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-sun"/></svg>Seasonal · recipe may rotate</span>'
      : "";
    var foot = shopChips
      ? '<div class="cg-pin-foot">' + shopChips + "</div>"
      : item.region
        ? '<div class="cg-pin-foot"><span class="cg-region-chip"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-sparkle"/></svg>' + escapeHTML(item.region) + "</span></div>"
        : "";
    return '<article class="cg-pin" data-cat="' + escapeHTML(item.category) + '">' +
      '<div class="cg-pin-art">' + cupArt(item) + "</div>" +
      '<div class="cg-pin-head">' +
        '<h3 class="cg-pin-name">' + escapeHTML(item.name) + "</h3>" +
        '<span class="cg-pin-cat" data-cat="' + escapeHTML(item.category) + '">' + escapeHTML(categoryLabels[item.category]) + "</span>" +
      "</div>" +
      aliasLine +
      '<p class="cg-pin-meaning">' + escapeHTML(item.meaning) + "</p>" +
      '<div class="cg-pin-more">' + seasonal + tags +
        '<div class="cg-detail-row"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-bean"/></svg><div><strong>In the cup</strong><span>' + escapeHTML(item.ingredients) + "</span></div></div>" +
        '<div class="cg-detail-row"><svg class="cg-ico" aria-hidden="true"><use href="#cg-i-chat"/></svg><div><strong>Try saying</strong><span>“' + escapeHTML(item.order) + "”</span></div></div>" +
      "</div>" +
      '<button type="button" class="cg-pin-toggle" aria-expanded="false">details +</button>' +
      foot +
    "</article>";
  }

  function render() {
    var visible = drinks.filter(matches);
    var defaultView = !state.query && state.category === "all" && state.shop === "all" && state.region === "all";
    var initialLimit = 18;
    var shown = defaultView && !state.showAll ? visible.slice(0, initialLimit) : visible;
    results.innerHTML = shown.length
      ? shown.map(renderCard).join("")
      : '<div class="cg-no-results">No menu term matched that combination. Try a broader search, or clear one of the filters.</div>';

    var resultLabel = visible.length === 1 ? "term" : "terms";
    count.innerHTML = '<svg class="cg-ico" aria-hidden="true"><use href="#cg-i-sparkle"/></svg><span><strong>' + visible.length + "</strong> " + resultLabel + " found</span>";
    if (shown.length < visible.length) count.innerHTML += " <span>· showing " + shown.length + "</span>";

    showMore.hidden = !(defaultView && visible.length > initialLimit);
    showMore.innerHTML = state.showAll
      ? "Show fewer terms ↑"
      : 'Show all menu terms <svg class="cg-ico" aria-hidden="true"><use href="#cg-i-arrow"/></svg>';
    clear.classList.toggle("is-visible", Boolean(state.query));
  }

  function syncSelects() {
    [["cg-category-select", state.category], ["cg-shop-select", state.shop], ["cg-region-select", state.region]]
      .forEach(function (pair) {
        var el = document.getElementById(pair[0]);
        if (!el) return;
        el.value = pair[1];
        el.classList.toggle("is-active", pair[1] !== "all");
      });
  }

  document.getElementById("cg-category-select").addEventListener("change", function () {
    state.category = this.value;
    syncSelects();
    render();
  });

  document.getElementById("cg-shop-select").addEventListener("change", function () {
    state.shop = this.value;
    syncSelects();
    render();
    document.getElementById("cg-lookup-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.getElementById("cg-region-select").addEventListener("change", function () {
    state.region = this.value;
    syncSelects();
    render();
    document.getElementById("cg-lookup-title").scrollIntoView({ behavior: "smooth", block: "start" });
  });

  document.querySelectorAll("[data-shop-jump]").forEach(function (button) {
    button.addEventListener("click", function () {
      var shopEl = document.getElementById("cg-shop-select");
      state.shop = button.getAttribute("data-shop-jump");
      shopEl.value = state.shop;
      shopEl.classList.toggle("is-active", state.shop !== "all");
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  document.querySelectorAll("[data-vibe-query]").forEach(function (button) {
    button.addEventListener("click", function () {
      state.query = button.getAttribute("data-vibe-query");
      state.category = "all";
      state.shop = "all";
      state.region = "all";
      state.showAll = true;
      search.value = state.query;
      syncSelects();
      render();
      document.getElementById("cg-lookup").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  results.addEventListener("click", function (event) {
    var toggle = event.target.closest ? event.target.closest(".cg-pin-toggle") : null;
    if (toggle) {
      var pin = toggle.closest(".cg-pin");
      var open = pin.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "show less −" : "details +";
      return;
    }
    var tag = event.target.closest ? event.target.closest("[data-tag-query]") : null;
    if (!tag) return;
    state.query = tag.getAttribute("data-tag-query");
    state.category = "all";
    state.shop = "all";
    state.region = "all";
    state.showAll = true;
    search.value = state.query;
    syncSelects();
    render();
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
