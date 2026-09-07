---
layout: page
title: Learn
permalink: /learn/
description: Two interactive tracks — circuits, systems & signals, or tissue engineering. Pick one.
excerpt: Two interactive tracks — circuits, systems & signals, or tissue engineering. Pick one.
---

<style>
.learn-app { max-width: 860px; margin: 0 auto; }
.learn-intro { font-size: 1.05rem; color: #475569; margin: 0 0 1.5rem; line-height: 1.55; }
.tracks { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.track { display: block; padding: 1.5rem 1.4rem; border-radius: 14px; border: 1px solid #e2e8f0; background: #fff; text-decoration: none; color: inherit; transition: transform .15s ease, box-shadow .15s ease; }
.track:hover { transform: translateY(-2px); box-shadow: 0 10px 28px rgba(0,0,0,.08); text-decoration: none; }
.track .icon { font-size: 2rem; }
.track h2 { margin: .6rem 0 .3rem; font-size: 1.3rem; color: #0f172a; }
.track p { margin: 0 0 .8rem; color: #64748b; font-size: .93rem; line-height: 1.5; }
.track ul { margin: 0 0 .8rem; padding-left: 1.1rem; color: #475569; font-size: .88rem; }
.track .go { font-weight: 700; color: #1d4ed8; }
.track-bme { border-top: 5px solid #0284c7; }
.track-term { border-top: 5px solid #16a34a; }
@media (max-width: 640px) { .tracks { grid-template-columns: 1fr; } }
</style>

<div class="learn-app">
<p class="learn-intro">Two subjects, same format: read the companion, run the interactive lab, pass the checks. Pick your track.</p>
<div class="tracks">
<a class="track track-bme" href="{{ site.baseurl }}/apps/biomede-211/">
<div class="icon">⚡</div>
<h2>Circuits, Systems &amp; Signals</h2>
<p>BIOMEDE 211 companion — 22 chapters from Ohm's law to ECG hardware, each with a working example: simulators, Bode explorers, a Hodgkin–Huxley AP lab, Nyquist demos.</p>
<ul><li>22 interactive chapter labs</li><li>Worksheet checks with answers</li><li>Based on Belmont's course notes</li></ul>
<span class="go">Enter the lab →</span>
</a>
<a class="track track-term" href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">
<div class="icon">🧬</div>
<h2>Tissue Engineering</h2>
<p>TERM Lab Park — follow one living construct through 15 stations from donor tissue to implantation, then read the textbook and syllabus.</p>
<ul><li>15-station animated pipeline</li><li>Textbook + syllabus companions</li><li>Module exit quizzes + release gates</li></ul>
<span class="go">Enter the park →</span>
</a>
</div>
</div>
