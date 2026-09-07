---
layout: page
title: Guides
permalink: /guides/
redirect_from: /places/
---

<style>
.guides-intro {
  font-size: 1.05rem;
  color: #555;
  margin: 0 0 1.75rem;
  line-height: 1.5;
}

.guides-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0 0 3rem;
}

.guide-row {
  display: flex;
  align-items: center;
  gap: 1.15rem;
  padding: 1.1rem 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #ffffff;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.15s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}

.guide-row:hover {
  border-color: #cbd5e1;
  background: #fafcff;
  transform: translateY(-1px);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  text-decoration: none;
}

.guide-icon-box {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
  border: 1px solid transparent;
}

.icon-chocolate { background: #fdf6ec; border-color: #faecd8; }
.icon-sandwich  { background: #fef7ed; border-color: #ffedd5; }
.icon-museum    { background: #faf5ff; border-color: #f3e8ff; }
.icon-coffee    { background: #fffbeb; border-color: #fef3c7; }
.icon-civ       { background: #f8fafc; border-color: #e2e8f0; }
.icon-fifa      { background: #f0fdf4; border-color: #dcfce7; }

.guide-row-content {
  flex-grow: 1;
  min-width: 0;
}

.guide-row-head {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin-bottom: 0.25rem;
}

.guide-row-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #0f172a;
  transition: color 0.15s ease;
}

.guide-row:hover .guide-row-title {
  color: #2563eb;
}

.guide-badge-pill {
  display: inline-flex;
  align-items: center;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  padding: 2px 9px;
  border-radius: 9999px;
  background: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.guide-row-desc {
  font-size: 0.88rem;
  color: #64748b;
  margin: 0;
  line-height: 1.45;
}

.guide-row-arrow {
  flex-shrink: 0;
  color: #94a3b8;
  font-size: 1.15rem;
  font-weight: 600;
  transition: color 0.15s ease, transform 0.15s ease;
  padding-left: 0.5rem;
}

.guide-row:hover .guide-row-arrow {
  color: #2563eb;
  transform: translateX(3px);
}

@media (max-width: 640px) {
  .guide-row {
    align-items: flex-start;
    gap: 0.85rem;
    padding: 1rem;
  }

  .guide-icon-box {
    width: 38px;
    height: 38px;
    font-size: 1.25rem;
  }

  .guide-row-head {
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 0.35rem;
  }

  .guide-row-arrow {
    display: none;
  }
}
</style>

<p class="guides-intro">Interactive maps, directories, and event companions.</p>

<div class="guides-list">
  <a class="guide-row" href="{{ site.baseurl }}/hot-chocolate/">
    <div class="guide-icon-box icon-chocolate">🍫</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">SF Hot Chocolate Spots</span>
        <span class="guide-badge-pill">Interactive Map</span>
      </div>
      <p class="guide-row-desc">Curated drinking chocolate, bakeries, and cafes with notes on signature drinks and status.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/sandwich-spots/">
    <div class="guide-icon-box icon-sandwich">🥪</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">SF Sandwich Spots</span>
        <span class="guide-badge-pill">Interactive Map</span>
      </div>
      <p class="guide-row-desc">Standout delis and sandwich counters with live hours, specialty orders, and locations.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/museums/">
    <div class="guide-icon-box icon-museum">🏛️</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">Bay Area &amp; NYC Museums</span>
        <span class="guide-badge-pill">Directory &amp; Map</span>
      </div>
      <p class="guide-row-desc">Directory of 150 museums with reciprocal networks (NARM, ROAM), student discounts, and free days.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/coffee-guide/">
    <div class="guide-icon-box icon-coffee">☕</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">SF Coffee Guide</span>
        <span class="guide-badge-pill">Visual Decoder</span>
      </div>
      <p class="guide-row-desc">Illustrated decoder for espresso drinks, milk ratios, cafe menu terminology, and roasters.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/civilizations/">
    <div class="guide-icon-box icon-civ">📜</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">Civilization Readers</span>
        <span class="guide-badge-pill">Museum Primers</span>
      </div>
      <p class="guide-row-desc">53 pocket museum primers with timelines, gallery floor numbers, and 90-minute walkthrough tours.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/tissue-syllabus/">
    <div class="guide-icon-box icon-fifa">🗺️</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">TERM Syllabus</span>
        <span class="guide-badge-pill">Structured Path</span>
      </div>
      <p class="guide-row-desc">Foundations-first study order across the roadmap, sim, and textbook — every stage exit-gated.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/tissue-textbook/">
    <div class="guide-icon-box icon-fifa">🧬</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">Tissue Engineering Textbook</span>
        <span class="guide-badge-pill">Textbook</span>
      </div>
      <p class="guide-row-desc">Literary companion to the TERM Lab Park sim — five chapters, fifteen stations, chapter checks, plus beyond-the-line surveys mapped to Lanza et al.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>

  <a class="guide-row" href="{{ site.baseurl }}/fifa2026/">
    <div class="guide-icon-box icon-fifa">⚽</div>
    <div class="guide-row-content">
      <div class="guide-row-head">
        <span class="guide-row-title">FIFA 2026</span>
        <span class="guide-badge-pill">Match Tracker</span>
      </div>
      <p class="guide-row-desc">Match schedule snapshot, stadium venues, and team rosters for the 2026 tournament.</p>
    </div>
    <div class="guide-row-arrow">&rarr;</div>
  </a>
</div>
