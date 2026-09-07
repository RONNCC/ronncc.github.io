#!/usr/bin/env node
/* Generates guides/tissue-textbook.md from apps/tissue-roadmap-sim/factory.js.
 * factory.js is the source of truth (LEVELS, STATIONS, GUIDE, QUIZ).
 * Usage: node apps/tissue-roadmap-sim/generate-textbook.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname);
const repo = path.join(root, '..', '..');
const context = { window: {}, console };
vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root, 'factory.js'), 'utf8'), context, { filename: 'factory.js' });
const F = context.window.Factory;

const esc = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const stationById = (id) => F.STATIONS.find((s) => s.id === id);
const today = new Date().toISOString().slice(0, 10);

let toc = '<nav class="tt-toc"><p class="tt-toc-title">Contents</p><ol>';
let chapters = '';

F.LEVELS.forEach((level) => {
  toc += `<li><a href="#ch${level.number}">Chapter ${level.number} — ${esc(level.title)}</a><ul>`;
  level.stations.forEach((id) => {
    const st = stationById(id);
    toc += `<li><a href="#st-${id}">${esc(st.name)}</a></li>`;
  });
  toc += '</ul></li>';

  chapters += `<section class="tt-chapter" id="ch${level.number}">\n`;
  chapters += `<p class="tt-kicker">Chapter ${level.number} · ${esc(level.type)}</p>\n`;
  chapters += `<h2>${esc(level.title)}</h2>\n`;
  chapters += `<p class="tt-objective"><strong>Learning objective.</strong> ${esc(level.objective)}</p>\n`;
  chapters += `<p>${esc(level.intro)}</p>\n`;
  chapters += `<p class="tt-watch"><strong>What to watch in the sim.</strong> ${esc(level.watch)}</p>\n`;

  level.stations.forEach((id) => {
    const st = stationById(id);
    const g = (F.GUIDE || {})[id] || {};
    chapters += `<article class="tt-station" id="st-${id}">\n`;
    chapters += `<h3>${esc(st.name)}</h3>\n`;
    chapters += `<p class="tt-tag">${esc(st.tag)} · Module ${st.level} of 5</p>\n`;
    chapters += `<p class="tt-lede">${esc(st.short)}</p>\n`;
    st.body.forEach((p) => { chapters += `<p>${esc(p)}</p>\n`; });
    if (g.takeaway) chapters += `<p class="tt-takeaway"><strong>Takeaway.</strong> ${esc(g.takeaway)}</p>\n`;
    if (g.watch) chapters += `<p class="tt-watch"><strong>What to watch in the sim.</strong> ${esc(g.watch)}</p>\n`;
    chapters += `</article>\n`;
  });

  const quiz = (F.QUIZ || {})[level.id] || [];
  if (quiz.length) {
    chapters += `<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — ${quiz.length} questions</p>\n`;
    quiz.forEach((q, qi) => {
      chapters += `<details><summary><strong>Q${qi + 1}.</strong> ${esc(q.q)}</summary><ul>`;
      q.choices.forEach((c, ci) => {
        chapters += `<li>${ci === q.answer ? '✅ ' : ''}${esc(c)}</li>`;
      });
      chapters += `</ul><p class="tt-explain">${esc(q.explain)}</p></details>\n`;
    });
    chapters += `</div>\n`;
  }
  chapters += `</section>\n`;
});
toc += '</ol></nav>';

const out = `---
layout: page
title: Tissue Engineering Textbook
permalink: /tissue-textbook/
description: A textbook-style companion to the TERM Lab Park simulation — five chapters, fifteen stations, one construct from donor tissue to implantation.
excerpt: A textbook-style companion to the TERM Lab Park simulation — five chapters, fifteen stations.
---

<style>
.tt-app { max-width: 760px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.65; color: #1e293b; }
.tt-app h2 { font-size: 1.7rem; margin: 0 0 .5rem; line-height: 1.25; }
.tt-app h3 { font-size: 1.3rem; margin: 2rem 0 .25rem; }
.tt-lede { font-size: 1.1rem; color: #334155; }
.tt-kicker { font-family: ui-monospace, Menlo, monospace; font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin: 0 0 .25rem; }
.tt-chapter { margin: 3rem 0; padding-top: 1rem; border-top: 3px double #cbd5e1; }
.tt-toc { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem 1.25rem; font-size: .95rem; }
.tt-toc-title { font-weight: 700; margin: 0 0 .5rem; }
.tt-toc ol { margin: .25rem 0; padding-left: 1.25rem; }
.tt-toc ul { padding-left: 1.1rem; }
.tt-toc a { color: #1d4ed8; text-decoration: none; }
.tt-objective { background: #f0fdf4; border-left: 4px solid #16a34a; padding: .6rem .9rem; }
.tt-tag { font-family: ui-monospace, Menlo, monospace; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: #64748b; }
.tt-takeaway { background: #fffbeb; border-left: 4px solid #d97706; padding: .6rem .9rem; }
.tt-watch { background: #eff6ff; border-left: 4px solid #2563eb; padding: .6rem .9rem; }
.tt-quiz { margin-top: 2rem; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem 1.25rem; }
.tt-quiz-title { font-weight: 700; margin: 0 0 .5rem; }
.tt-quiz details { margin: .5rem 0; }
.tt-quiz summary { cursor: pointer; }
.tt-explain { color: #475569; font-size: .95rem; }
.tt-provenance { color: #64748b; font-size: .85rem; border-top: 1px solid #e2e8f0; margin-top: 3rem; padding-top: 1rem; }
@media print { .tt-toc { break-after: avoid; } .tt-chapter { break-before: page; } }
</style>

<div class="tt-app">

<p class="tt-lede">A literary companion to the <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">TERM Lab Park simulation</a>: one living construct from donor tissue to surgical implantation, in five chapters and fifteen stations. Read straight through, or dip into any station — each ends with its takeaway.</p>

${toc}

${chapters}

<p class="tt-provenance">Generated from <code>apps/tissue-roadmap-sim/factory.js</code> (the sim's source of truth) on ${today} — ${F.STATIONS.length} stations, ${F.LEVELS.length} chapters. If this page and the sim ever disagree, the sim's <code>LEVELS</code>/<code>GUIDE</code>/<code>QUIZ</code> win. See also the <a href="{{ site.baseurl }}/tissue-engineering-roadmap/">full learning roadmap</a>.</p>

</div>
`;

fs.writeFileSync(path.join(repo, 'guides', 'tissue-textbook.md'), out);
console.log(`tissue-textbook.md written: ${F.LEVELS.length} chapters, ${F.STATIONS.length} stations.`);
