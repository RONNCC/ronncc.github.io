---
layout: page
title: TERM Syllabus
permalink: /tissue-syllabus/
description: A structured zero-to-grad syllabus for tissue engineering — foundations first, then the sim modules, then breadth. Every stage has an exit check.
excerpt: A structured zero-to-grad syllabus for tissue engineering — foundations first, then the sim modules, then breadth.
---

<style>
.sy-app { max-width: 780px; margin: 0 auto; font-size: 16px; line-height: 1.6; color: #1e293b; }
.sy-app h2 { font-size: 1.45rem; margin: 2.5rem 0 .4rem; }
.sy-app h3 { font-size: 1.1rem; margin: 1.25rem 0 .25rem; }
.sy-phase { border: 1px solid #e2e8f0; border-radius: 12px; padding: 1.1rem 1.25rem; margin: 1.25rem 0; background: #fff; }
.sy-phase.found { border-left: 6px solid #16a34a; }
.sy-phase.build { border-left: 6px solid #2563eb; }
.sy-phase.breadth { border-left: 6px solid #d97706; }
.sy-phase.cap { border-left: 6px solid #7c3aed; }
.sy-kicker { font-family: ui-monospace, Menlo, monospace; font-size: .72rem; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin: 0 0 .2rem; }
.sy-exit { background: #f0fdf4; border-left: 4px solid #16a34a; padding: .55rem .9rem; margin: .75rem 0 0; }
.sy-app ul.task-list { list-style: none; padding-left: 0; }
.sy-app ul.task-list li { margin: .3rem 0; }
.sy-app a { color: #1d4ed8; }
.sy-rule { border: none; border-top: 3px double #cbd5e1; margin: 2.5rem 0; }
</style>

<div class="sy-app">

<p>One path, in order. <strong>Foundations come first</strong> — the sim assumes them and does not teach them. Each stage ends with an exit check: do not advance until you pass it. Time budget follows the <a href="{{ site.baseurl }}/tissue-engineering-roadmap/">roadmap's Appendix B</a>.</p>

<div class="sy-phase found">
<p class="sy-kicker">Stage 1 · First · Weeks 1–4</p>
<h2>Foundations: cells, matrix, and control logic</h2>
<p>What a cell is, what ECM does, how genes switch, and how embryos use signaling gradients to build tissues. Without this, every sim lesson is vocabulary without meaning.</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> Read <a href="{{ site.baseurl }}/tissue-textbook/#bx-foundations">Textbook: Foundations</a> (cells, ECM, morphogenesis)</li>
<li><input type="checkbox" disabled /> Roadmap Phase 0: cell biology, central dogma, biochemistry, genetics</li>
<li><input type="checkbox" disabled /> Roadmap §1.1 (signaling pathways) + §1.5 (developmental biology)</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> Sketch the central dogma from memory; name one checkpoint per cell-cycle phase; explain why a TGF-β pulse means different things at different times.</p>
</div>

<div class="sy-phase found">
<p class="sy-kicker">Stage 2 · Weeks 3–8</p>
<h2>Toolbox and contamination theory</h2>
<p>Molecular cloning methods, microscopy/flow/FACS, sterile technique, immunology basics, statistics and reproducibility (STR/ICLAC).</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> Roadmap Phase 1: §§1.2–1.4, 1.6</li>
<li><input type="checkbox" disabled /> Roadmap §2.5 + Appendix A (BSC vs fume hood vs clean bench — the classic confusion)</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> Explain why trypsin breaks FACS panels; why mycoplasma is the scariest contaminant; what STR profiling detects.</p>
</div>

<div class="sy-phase build">
<p class="sy-kicker">Stage 3 · Months 2–5 · with the sim</p>
<h2>Bench craft + Sim Modules 1–2 (sourcing, culture)</h2>
<p>Cell culture as a skill: media, passaging math, counting, cryo, banking, notebook discipline — alongside the sim's sourcing and culture chapters.</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> Roadmap Phase 2: §§2.2–2.4, 2.6–2.8 + Appendices C1–C2</li>
<li><input type="checkbox" disabled /> Run <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">the sim</a> Modules 1–2, or read <a href="{{ site.baseurl }}/tissue-textbook/#ch1">Textbook Ch. 1–2</a></li>
<li><input type="checkbox" disabled /> Pass both in-sim exit quizzes</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> Decode “subculture 1:4 every 3 days” into dates and densities; do hemocytometer math; pass a line thaw → passage → freeze (real or simulated).</p>
</div>

<div class="sy-phase build">
<p class="sy-kicker">Stage 4 · Months 5–9 · with the sim</p>
<h2>Build the construct: Sim Module 3 + engineering depth</h2>
<p>Materials, transport (the 100–200 µm limit), bioreactors, gene tools — the field's core equation, with the sim's fabrication chapter as the walkthrough.</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> Roadmap §§3.1–3.5 + §3.8 (your computational home turf)</li>
<li><input type="checkbox" disabled /> Run <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">the sim</a> Module 3, or read <a href="{{ site.baseurl }}/tissue-textbook/#ch3">Textbook Ch. 3</a></li>
<li><input type="checkbox" disabled /> Pass the Module 3 exit quiz</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> Derive the diffusion limit quantitatively; name three ways to beat it; pick any growth factor and trace its pathway.</p>
</div>

<div class="sy-phase build">
<p class="sy-kicker">Stage 5 · Months 6–10 · with the sim</p>
<h2>Verify and deliver: Sim Modules 4–5 + translation</h2>
<p>Quality gates, release, clinical handoff, GMP/regulatory logic, ethics.</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> Roadmap §§3.6–3.7 + Phase 4</li>
<li><input type="checkbox" disabled /> Run <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">the sim</a> Modules 4–5, or read <a href="{{ site.baseurl }}/tissue-textbook/#ch4">Textbook Ch. 4–5</a></li>
<li><input type="checkbox" disabled /> Pass both exit quizzes; all five release gates stamped</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> State one release criterion per gate; explain “minimal manipulation”; name the ethical argument behind iPSCs.</p>
</div>

<div class="sy-phase breadth">
<p class="sy-kicker">Stage 6 · Ongoing</p>
<h2>Breadth: beyond the line</h2>
<p>What the sim never simulates, surveyed at textbook level — read after the spine is solid, not before.</p>
<ul class="task-list">
<li><input type="checkbox" disabled /> <a href="{{ site.baseurl }}/tissue-textbook/#part2">Textbook Part II</a>: stem-cell breadth, gene tools, in vivo synthesis, organ gallery, emerging tech, regulation/business/ethics</li>
<li><input type="checkbox" disabled /> One frontier paper per week (Biofabrication, Tissue Engineering A/B/C, Nature Biomedical Engineering)</li>
</ul>
<p class="sy-exit"><strong>Exit check.</strong> For any two frontier topics, name the bottleneck each addresses.</p>
</div>

<div class="sy-phase cap">
<p class="sy-kicker">Capstone</p>
<h2>Propose a construct</h2>
<p>Draft the one-page tissue proposal from Roadmap Appendix B: indication, cell source, scaffold, signals, bioreactor, validation, release criteria, regulatory path. If you can fill every line without hand-waving, you're at grad literacy.</p>
</div>

<hr class="sy-rule" />

<p>Sources, in dependency order: <a href="{{ site.baseurl }}/tissue-textbook/#bx-foundations">foundations first</a> → <a href="{{ site.baseurl }}/tissue-engineering-roadmap/">roadmap</a> → <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">sim</a> → <a href="{{ site.baseurl }}/tissue-textbook/">textbook</a>. The single highest-leverage activity remains bench time in a real lab.</p>

</div>
