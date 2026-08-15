/* Civilization Readers — shared rendering logic */

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function formatYear(y) {
  if (y < 0) return `${-y} BCE`;
  if (y > 0) return `${y} CE`;
  return "1 CE";
}

function getSlug() {
  const params = new URLSearchParams(window.location.search);
  const s = params.get("c") || (window.location.hash || "").replace("#", "");
  return s.toLowerCase();
}

function getCiv(slug) {
  return CIVILIZATIONS.find((c) => c.slug === slug);
}

function byGroup() {
  const groups = [];
  const map = {};
  CIVILIZATIONS.forEach((c) => {
    if (!map[c.group]) {
      map[c.group] = [];
      groups.push(c.group);
    }
    map[c.group].push(c);
  });
  const order = (typeof GROUP_ORDER !== "undefined" ? GROUP_ORDER : []).reduce((m, g, i) => {
    m[g] = i;
    return m;
  }, {});
  groups.sort((a, b) => {
    const ia = order[a] != null ? order[a] : 999;
    const ib = order[b] != null ? order[b] : 999;
    return ia - ib;
  });
  return groups.map((g) => ({ group: g, civs: map[g] }));
}

/* ---------------- landing ---------------- */

function renderIndex() {
  const app = document.getElementById("app");
  const groups = byGroup();
  let html = `
  <header class="hero">
    <p class="kicker">Civilization Readers</p>
    <h1>Read a civilization before you walk into the gallery.</h1>
    <p class="lede">A pocket primer for the museum — the <strong>de Young</strong>, the <strong>Met</strong>, or anywhere with dusty labels. Each reader gives you a <strong>visual timeline</strong> up top (the high-level arc), then <strong>context</strong> and <strong>deeper detail</strong> below, plus a cheat sheet for what you'll actually see on display.</p>
    <div class="how">
      <span class="step"><b>1.</b> Pick a civilization</span>
      <span class="step"><b>2.</b> Scan the timeline</span>
      <span class="step"><b>3.</b> Read the context</span>
      <span class="step"><b>4.</b> Go deeper before (or while) you look</span>
    </div>
    <div class="search-wrap">
      <input id="civ-search" type="search" placeholder="Search — try &ldquo;pyramid&rdquo;, &ldquo;jade&rdquo;, &ldquo;maya&rdquo;&hellip;" autocomplete="off" />
    </div>
    <div class="route-links">
      <a class="route-btn" href="routes.html">Museums, mapped as a graph &rarr;</a>
      <a class="route-btn subtle" href="met.html">The Met</a>
      <a class="route-btn subtle" href="sf.html">SF museums</a>
      <a class="route-btn subtle" href="smithsonian.html">Smithsonian</a>
    </div>
  </header>

  <section class="panel mt-panel">
    <div class="panel-head">
      <h2>All civilizations at a glance</h2>
      <span class="hint">scroll horizontally &middot; tap a bar to open its reader &middot; BCE counts down to 1 CE</span>
    </div>
    <div class="panel-body">
      <div id="master-timeline"></div>
    </div>
  </section>`;

  groups.forEach(({ group, civs }) => {
    html += `<h2 class="group-head">${esc(group)}</h2><div class="grid">`;
    civs.forEach((c) => {
      html += `
      <a class="card" data-search="${esc((c.name + " " + c.tagline + " " + c.region + " " + c.group + " " + c.emoji).toLowerCase())}" style="--c:${c.accent};--c-soft:${hexToRgba(c.accent, 0.13)}" href="reader.html?c=${esc(c.slug)}">
        <div class="card-top">
          <span class="card-emoji">${c.emoji}</span>
          <div>
            <h2>${esc(c.name)}</h2>
            <span class="card-span">${esc(c.spanLabel)}</span>
          </div>
        </div>
        <div class="card-region">${esc(c.region)}</div>
        <p>${esc(c.tagline)}</p>
        <span class="card-go">Open reader &rarr;</span>
      </a>`;
    });
    html += `</div>`;
  });

  html += `<div class="no-results" id="no-results">No civilizations match &ldquo;<span id="no-results-q"></span>&rdquo;.</div>`;
  html += `<footer class="foot">A high-level primer for gallery context — not an academic reference. Dates are approximate. <a href="reader.html?c=egypt">Start with Egypt &rarr;</a></footer>`;
  app.innerHTML = html;
  renderMasterTimeline(document.getElementById("master-timeline"));
  wireSearch();
  document.title = "Civilization Readers — museum primers";
}

function renderMasterTimeline(container) {
  if (!container) return;
  const groups = byGroup();
  const W = 1080;
  const lo = -4000, hi = 2000;
  const labelW = 210;
  const plotL = labelW, plotR = W - 24;
  const X = (y) => plotL + ((y - lo) / (hi - lo)) * (plotR - plotL);
  const rowH = 27, groupH = 30, topPad = 30, bottomPad = 16;
  const nGroups = groups.length;
  const nRows = CIVILIZATIONS.length;
  const H = topPad + nGroups * groupH + nRows * rowH + bottomPad;

  const ticks = [-3000, -2000, -1000, 0, 1000, 2000];

  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="All civilizations across time">`;

  // top ruler
  ticks.forEach((t) => {
    const x = X(t);
    const label = t === 0 ? "1 CE" : t < 0 ? `${-t} BCE` : `${t} CE`;
    s += `<text x="${x.toFixed(1)}" y="14" text-anchor="middle" class="mt-tick">${label}</text>`;
  });
  // vertical gridlines
  ticks.forEach((t) => {
    const x = X(t);
    s += `<line x1="${x.toFixed(1)}" y1="${topPad - 6}" x2="${x.toFixed(1)}" y2="${H - bottomPad + 4}" class="mt-grid${t === 0 ? " major" : ""}" stroke-width="${t === 0 ? 1.4 : 1}"${t === 0 ? ' stroke-dasharray="3 3"' : ""}/>`;
  });

  let y = topPad;
  groups.forEach((g) => {
    s += `<text x="${plotL}" y="${y + groupH - 9}" class="mt-group">${esc(g.group).toUpperCase()}</text>`;
    y += groupH;
    g.civs.forEach((c) => {
      const x0 = X(Math.max(c.start, lo));
      const x1 = X(Math.min(c.end, hi));
      const w = Math.max(x1 - x0, 5);
      s += `<a href="reader.html?c=${esc(c.slug)}">`;
      s += `<text x="${plotL - 8}" y="${y + rowH - 10}" text-anchor="end" class="mt-name">${esc(c.name)}</text>`;
      s += `<rect class="mt-bar" x="${x0.toFixed(1)}" y="${y + 4}" width="${w.toFixed(1)}" height="17" rx="4" fill="${c.accent}" fill-opacity="0.82"><title>${esc(c.name)} — ${esc(c.spanLabel)}</title></rect>`;
      s += `</a>`;
      y += rowH;
    });
  });

  s += `</svg>`;
  container.innerHTML = `<div class="tl-scroll">${s}</div>`;
}

function wireSearch() {
  const input = document.getElementById("civ-search");
  const noResults = document.getElementById("no-results");
  const noResultsQ = document.getElementById("no-results-q");
  if (!input) return;

  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".card").forEach((card) => {
      const hay = card.dataset.search || "";
      const show = !q || hay.includes(q);
      card.style.display = show ? "" : "none";
      if (show) visible++;
    });
    document.querySelectorAll(".group-head").forEach((head) => {
      const grid = head.nextElementSibling;
      let any = false;
      if (grid && grid.classList && grid.classList.contains("grid")) {
        any = Array.from(grid.querySelectorAll(".card")).some((c) => c.style.display !== "none");
      }
      head.style.display = any ? "" : "none";
    });
    if (noResults) {
      noResults.style.display = q && visible === 0 ? "block" : "none";
      if (noResultsQ) noResultsQ.textContent = input.value.trim();
    }
  };

  input.addEventListener("input", apply);
}

/* ---------------- timeline (SVG) ---------------- */

function renderTimeline(container, civ) {
  const W = 1080, H = 186, padX = 64;
  let minY = civ.start, maxY = civ.end;
  // Let the axis span any pre/post phases that extend beyond the headline dates.
  civ.periods.forEach((p) => {
    if (p.start < minY) minY = p.start;
    if (p.end > maxY) maxY = p.end;
  });
  const span = Math.max(maxY - minY, 1);
  const lo = minY - span * 0.06, hi = maxY + span * 0.06;
  const X = (y) => padX + ((y - lo) / (hi - lo)) * (W - 2 * padX);

  const eraY = 32, eraH = 42, axisY = 118;

  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Timeline of ${esc(civ.name)}">`;

  // era bands
  civ.periods.forEach((p) => {
    const x0 = X(p.start), x1 = X(p.end);
    const w = Math.max(x1 - x0, 6);
    const cx = (x0 + x1) / 2;
    s += `<rect x="${x0.toFixed(1)}" y="${eraY}" width="${w.toFixed(1)}" height="${eraH}" rx="7"
        fill="${hexToRgba(civ.accent, 0.18)}" stroke="${hexToRgba(civ.accent, 0.55)}" stroke-width="1">
        <title>${esc(p.name)} — ${esc(p.years)}</title></rect>`;
    if (w > 64) {
      s += `<text x="${cx.toFixed(1)}" y="${eraY + 19}" text-anchor="middle" class="tl-era-label" style="fill:${civ.accent};font-weight:700">${esc(p.name)}</text>`;
    }
    if (w > 108) {
      s += `<text x="${cx.toFixed(1)}" y="${eraY + 34}" text-anchor="middle" class="tl-era-years">${esc(p.years)}</text>`;
    }
  });

  // axis
  s += `<line class="tl-axis" x1="${X(lo).toFixed(1)}" y1="${axisY}" x2="${X(hi).toFixed(1)}" y2="${axisY}" stroke-width="1.5"/>`;

  // events
  civ.events.forEach((e, i) => {
    const x = X(e.year);
    const up = i % 2 === 0;
    const labelY = up ? axisY - 26 : axisY + 30;
    const tickEnd = up ? axisY - 12 : axisY + 12;
    s += `<line x1="${x.toFixed(1)}" y1="${axisY}" x2="${x.toFixed(1)}" y2="${tickEnd}" stroke="${hexToRgba(civ.accent, 0.5)}" stroke-width="1" stroke-dasharray="2 2"/>`;
    s += `<circle class="tl-dot" data-index="${i}" cx="${x.toFixed(1)}" cy="${axisY}" r="5" fill="${civ.accent}" stroke="#fff" stroke-width="1.5">
        <title>${formatYear(e.year)} — ${esc(e.label)}</title></circle>`;
    s += `<text x="${x.toFixed(1)}" y="${labelY}" text-anchor="middle" class="tl-ev-label">${esc(e.label)}</text>`;
  });

  // start / end year labels
  s += `<text x="${X(minY).toFixed(1)}" y="${H - 12}" text-anchor="middle" class="tl-year">${formatYear(minY)}</text>`;
  s += `<text x="${X(maxY).toFixed(1)}" y="${H - 12}" text-anchor="middle" class="tl-year">${formatYear(maxY)}</text>`;

  s += `</svg>`;
  container.innerHTML = `<div class="tl-scroll">${s}</div>`;

  // clickable dots -> detail panel
  const detailEl = document.getElementById("tl-detail");
  const dots = container.querySelectorAll(".tl-dot");
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const e = civ.events[parseInt(dot.getAttribute("data-index"), 10)];
      detailEl.innerHTML = `
        <div class="tl-detail-year">${formatYear(e.year)}</div>
        <div class="tl-detail-title">${esc(e.label)}</div>
        <p>${esc(e.detail)}</p>`;
    });
  });
}

function renderWorldRuler(container, civ) {
  const W = 1080, H = 92, padX = 40;
  const lo = -4000, hi = 2000;
  const X = (y) => padX + ((y - lo) / (hi - lo)) * (W - 2 * padX);
  const axisY = 58;

  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="World history context">`;

  // civ span band
  const x0 = X(Math.max(civ.start, lo)), x1 = X(Math.min(civ.end, hi));
  const w = Math.max(x1 - x0, 8);
  const bandY = 32, bandH = 44;
  s += `<rect x="${x0.toFixed(1)}" y="${bandY}" width="${w.toFixed(1)}" height="${bandH}" rx="8"
      fill="${hexToRgba(civ.accent, 0.18)}" stroke="${hexToRgba(civ.accent, 0.6)}" stroke-width="1.2"/>`;
  const cx = (x0 + x1) / 2;
  if (w > 130) {
    s += `<text x="${cx.toFixed(1)}" y="${bandY + bandH / 2 + 4}" text-anchor="middle" style="font-size:12.5px;font-weight:700;fill:${civ.accent}">${esc(civ.name)}</text>`;
  } else {
    s += `<text x="${cx.toFixed(1)}" y="${bandY - 8}" text-anchor="middle" class="world-band-label">${esc(civ.name)}</text>`;
  }

  // axis
  s += `<line class="tl-axis" x1="${X(lo).toFixed(1)}" y1="${axisY}" x2="${X(hi).toFixed(1)}" y2="${axisY}" stroke-width="1.5"/>`;

  // world anchors
  WORLD_ANCHORS.forEach((a, i) => {
    const x = X(a.year);
    const up = i % 2 === 0;
    const labelY = up ? axisY - 12 : axisY + 22;
    s += `<circle class="world-anchor" cx="${x.toFixed(1)}" cy="${axisY}" r="3" stroke="#fff" stroke-width="1"><title>${formatYear(a.year)} — ${esc(a.label)}</title></circle>`;
    s += `<text x="${x.toFixed(1)}" y="${labelY}" text-anchor="middle" class="world-anchor-label">${esc(a.label)}</text>`;
  });

  s += `</svg>`;
  container.innerHTML = `<div class="tl-scroll">${s}</div>`;
}

/* ---------------- reader ---------------- */

function renderReader() {
  const slug = getSlug();
  const civ = getCiv(slug) || CIVILIZATIONS[0];
  const app = document.getElementById("app");

  document.documentElement.style.setProperty("--accent", civ.accent);
  document.documentElement.style.setProperty("--accent-soft", hexToRgba(civ.accent, 0.12));

  const idx = CIVILIZATIONS.indexOf(civ);
  const prev = CIVILIZATIONS[(idx - 1 + CIVILIZATIONS.length) % CIVILIZATIONS.length];
  const next = CIVILIZATIONS[(idx + 1) % CIVILIZATIONS.length];
  const spanYears = civ.end - civ.start;

  let html = `
  <header class="civ-header">
    <div class="crumbs">
      <a href="index.html">All civilizations</a>
      <span>/</span>
      <span>${esc(civ.group)}</span>
    </div>
    <h1><span class="flag">${civ.emoji}</span>${esc(civ.name)}</h1>
    <div class="meta">
      <span class="chip span">${esc(civ.spanLabel)}</span>
      <span class="chip">${esc(civ.region)}</span>
      <span class="chip">~${spanYears.toLocaleString()} years</span>
    </div>
    <p class="tagline">${esc(civ.tagline)}</p>
  </header>

  ${civ.met ? `<a class="met-line" href="met.html"><span class="met-pin">📍</span><span><b>At the Met</b> — ${esc(civ.met)}</span></a>` : ""}

  ${civ.quick && civ.quick.length ? `
  <div class="quick">
    <div class="quick-head">⚡ In 30 seconds — what matters</div>
    <ul>${civ.quick.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>
  </div>` : ""}

  <section class="panel">
    <div class="panel-head">
      <h2>Timeline</h2>
      <span class="hint">Hover a dot, or tap one for detail &middot; colored bands are periods</span>
    </div>
    <div class="panel-body">
      <div id="timeline"></div>
      <div class="tl-detail" id="tl-detail">
        <div class="tl-detail-year">${formatYear(civ.start)} &ndash; ${formatYear(civ.end)}</div>
        <div class="tl-detail-title">The arc of ${esc(civ.name)}</div>
        <p>${esc(civ.overview)}</p>
      </div>
    </div>
  </section>

  <section class="panel">
    <div class="panel-head">
      <h2>Where it sits in world history</h2>
      <span class="hint">your civilization (highlighted) against 4,000 years of milestones</span>
    </div>
    <div class="panel-body">
      <div id="world-ruler"></div>
    </div>
  </section>

  <div class="section-title">
    <div>
      <h2>Context</h2>
      <div class="sub">The high-level view — the big picture before the details.</div>
    </div>
  </div>
  <div class="ctx-grid">
    <div class="ctx-card">
      <h3>🧭 The big picture</h3>
      <p>${esc(civ.context.bigPicture)}</p>
    </div>
    <div class="ctx-card">
      <h3>🗺️ Geography &amp; setting</h3>
      <p>${esc(civ.context.geography)}</p>
    </div>
    <div class="ctx-card">
      <h3>💡 Key ideas</h3>
      <ul>${civ.context.keyIdeas.map((k) => `<li><b>${esc(k.t)}</b> — ${esc(k.d)}</li>`).join("")}</ul>
    </div>
    <div class="ctx-card">
      <h3>👁️ How to spot it</h3>
      <ul>${civ.context.spotIt.map((k) => `<li><b>${esc(k.t)}</b> — ${esc(k.d)}</li>`).join("")}</ul>
    </div>
  </div>

  <div class="section-title">
    <div>
      <h2>Go deeper</h2>
      <div class="sub">Period by period — open each era when you want the detail.</div>
    </div>
  </div>
  ${civ.periods.map((p, i) => `
    <details class="period" ${i === 0 ? "open" : ""}>
      <summary>
        <span class="chev">▾</span>
        <span class="p-name">${esc(p.name)}</span>
        <span class="p-summary">${esc(p.summary)}</span>
        <span class="p-years">${esc(p.years)}</span>
      </summary>
      <div class="p-body">
        <div class="p-summary-mobile">${esc(p.summary)}</div>
        ${esc(p.detail)}
      </div>
    </details>`).join("")}

  <div class="section-title">
    <div>
      <h2>Key dates</h2>
      <div class="sub">The same moments as the timeline, in a scannable list.</div>
    </div>
  </div>
  <div class="dates">
    ${civ.events.map((e) => `<div class="date-row"><span class="d-year">${formatYear(e.year)}</span><span class="d-text">${esc(e.label)} — ${esc(e.detail)}</span></div>`).join("")}
  </div>

  <section class="museum" id="museum">
    <h2>🏛️ Museum cheat sheet</h2>
    <p class="m-sub">So you can read the room even when the labels don't help.</p>
    <div class="m-cols">
      <div>
        <h3>What you'll see</h3>
        <ul>${civ.museum.see.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Label lingo</h3>
        <ul>${civ.museum.lingo.map((k) => `<li><b>${esc(k.t)}</b> — ${esc(k.d)}</li>`).join("")}</ul>
      </div>
      <div>
        <h3>Where to see it</h3>
        <ul>${civ.museum.where.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
    </div>
  </section>

  <nav class="pager">
    <a class="pager-link prev" href="reader.html?c=${esc(prev.slug)}">
      <span class="pager-label">&larr; Previous</span>
      <span class="pager-name">${prev.emoji} ${esc(prev.name)}</span>
    </a>
    <a class="pager-all" href="index.html">All &uarr;</a>
    <a class="pager-link next" href="reader.html?c=${esc(next.slug)}">
      <span class="pager-label">Next &rarr;</span>
      <span class="pager-name">${next.emoji} ${esc(next.name)}</span>
    </a>
  </nav>`;

  app.innerHTML = html;
  renderTimeline(document.getElementById("timeline"), civ);
  renderWorldRuler(document.getElementById("world-ruler"), civ);
  document.title = `${civ.name} — Civilization Reader`;

  // If the requested slug didn't exist, fix the URL.
  if (getCiv(slug) !== civ && slug) {
    history.replaceState(null, "", `reader.html?c=${civ.slug}`);
  }
}

/* ---------------- routes (graph) ---------------- */

function getMuseum(id) {
  return MUSEUMS.find((m) => m.id === id);
}

const MUSEUM_PAGE = {
  met: "met.html",
  deyoung: "sf.html",
  legion: "sf.html",
  aam: "sf.html",
  rosicrucian: "sf.html",
  nmnh: "smithsonian.html",
  faaa: "smithsonian.html",
  nmafa: "smithsonian.html",
  nmai: "smithsonian.html"
};

function routePageFor(museumId) {
  return MUSEUM_PAGE[museumId] || "routes.html";
}

function museumBlock(m) {
  let html = `
  <section class="museum-block" id="${esc(m.id)}">
    <div class="museum-block-head">
      <div class="museum-block-emoji">${m.emoji}</div>
      <div>
        <h2>${esc(m.name)}</h2>
        <div class="museum-block-city">${esc(m.city)}</div>
      </div>
    </div>
    <p class="museum-block-tag">${esc(m.tagline)}</p>
    ${m.note ? `<p class="museum-block-note">${esc(m.note)}</p>` : ""}`;
  m.floors.forEach((floor) => {
    html += `
    <h3 class="museum-floor">${esc(floor.name)}</h3>
    ${floor.note ? `<p class="route-note">${esc(floor.note)}</p>` : ""}
    <div class="route-grid">`;
    floor.areas.forEach((area) => {
      const civs = area.civs.map((slug) => getCiv(slug)).filter(Boolean);
      html += `
      <div class="route-area" id="${esc(area.id)}">
        <div class="route-area-head">
          <div class="route-area-name">${esc(area.name)}</div>
          <div class="route-area-gal">${esc(area.galleries)}</div>
        </div>
        ${area.note ? `<p class="route-area-note">${esc(area.note)}</p>` : ""}
        <div class="route-pills">
          ${civs.map((c) => `<a class="route-pill" style="--c:${c.accent};--c-soft:${hexToRgba(c.accent, 0.13)}" href="reader.html?c=${esc(c.slug)}">${c.emoji} ${esc(c.name)}</a>`).join("")}
        </div>
      </div>`;
    });
    html += `</div>`;
  });
  html += `</section>`;
  return html;
}

function renderRoutePage(museumIds, title, intro, footerHtml) {
  const app = document.getElementById("app");
  let html = `
  <header class="hero">
    <p class="kicker">Civilization Readers</p>
    <h1>${title}</h1>
    <p class="lede">${intro}</p>
    <div class="how">
      <span class="step"><b>1.</b> Pick a museum</span>
      <span class="step"><b>2.</b> Find the gallery</span>
      <span class="step"><b>3.</b> Open the matching reader</span>
      <span class="step"><b>4.</b> Read it offline in the gallery</span>
    </div>
    <div class="route-links">
      <a class="route-btn" href="routes.html">All museums &amp; graph &rarr;</a>
      <a class="route-btn subtle" href="index.html">All civilizations</a>
    </div>
  </header>`;

  museumIds.forEach((id) => {
    const m = getMuseum(id);
    if (m) html += museumBlock(m);
  });

  html += footerHtml;
  app.innerHTML = html;
  document.title = title + " — Civilization Readers";
}

function renderMet() {
  renderRoutePage(
    ["met"],
    "The Met, floor by floor.",
    "A wayfinding layer for the Metropolitan Museum of Art — which galleries hold which civilizations, and which reader to open in front of them. <strong>Gallery numbers change with reinstallations</strong>, so cross-check the Met's map before you go.",
    `<footer class="foot">Route is a reading aid, not the museum's official map — gallery locations and numbers change. <a href="https://www.metmuseum.org/plan-your-visit" rel="noopener">Met floor plan &rarr;</a></footer>`
  );
}

function renderSF() {
  renderRoutePage(
    ["deyoung", "legion", "aam", "rosicrucian"],
    "San Francisco Bay Area, museum by museum.",
    "The de Young (Americas, Africa, Oceania, jade), the Legion of Honor (ancient art), the Asian Art Museum (all of Asia), and the Rosicrucian Egyptian Museum down in San Jose. Collection names are used — layouts rotate with exhibitions.",
    `<footer class="foot">Collection names, not official gallery numbers — check each museum's current map before you go.</footer>`
  );
}

function renderSmithsonian() {
  renderRoutePage(
    ["nmnh", "faaa", "nmafa", "nmai"],
    "The Smithsonian, hall by hall.",
    "Four Smithsonian museums on the National Mall — Natural History (ancient Egypt and African Voices), Asian Art (Freer + Sackler), African Art, and the American Indian. (The American History museum covers US history, not ancient civilizations.)",
    `<footer class="foot">Exhibit names used; the Smithsonian reinstalls regularly — check the current map before you go.</footer>`
  );
}

/* ---------------- graph ---------------- */

function buildGraph() {
  const nodes = [];
  const edges = [];
  const index = {};
  const addNode = (id, type, label, data) => {
    if (index[id]) return index[id];
    const n = Object.assign({ id, type, label }, data);
    nodes.push(n);
    index[id] = n;
    return n;
  };
  const addEdge = (from, to, type) => {
    if (!index[from] || !index[to]) return;
    edges.push({ from: index[from], to: index[to], type });
  };

  MUSEUMS.forEach((m) => {
    addNode(m.id, "museum", m.name, { emoji: m.emoji, city: m.city, href: routePageFor(m.id) });
    m.floors.forEach((f) =>
      f.areas.forEach((a) => {
        addNode(a.id, "gallery", a.name, { museumId: m.id, href: routePageFor(m.id) + "#" + a.id });
        addEdge(m.id, a.id, "contains");
        a.civs.forEach((slug) => {
          const c = getCiv(slug);
          if (!c) return;
          addNode(c.slug, "civ", c.name, { emoji: c.emoji, accent: c.accent, group: c.group, href: "reader.html?c=" + c.slug });
          addEdge(a.id, c.slug, "at");
        });
      })
    );
  });

  CIV_RELATIONS.forEach((r) => addEdge(r.from, r.to, r.type));
  return { nodes, edges };
}

function computeGraphLayout(nodes, edges, W, H) {
  const pos = {};
  const rnd = () => (Math.random() - 0.5);
  nodes.forEach((n) => {
    pos[n.id] = { x: W / 2 + rnd() * W * 0.55, y: H / 2 + rnd() * H * 0.55 };
  });

  // seed museums on a ring, then galleries/civs near their parent
  const museums = nodes.filter((n) => n.type === "museum");
  museums.forEach((n, i) => {
    const ang = (i / Math.max(1, museums.length)) * Math.PI * 2;
    pos[n.id] = {
      x: W / 2 + Math.cos(ang) * Math.min(W, H) * 0.33,
      y: H / 2 + Math.sin(ang) * Math.min(W, H) * 0.33
    };
  });
  edges.forEach((e) => {
    const a = pos[e.from.id], b = pos[e.to.id];
    if (!a || !b) return;
    if (e.type === "contains") { b.x = a.x + rnd() * 170; b.y = a.y + rnd() * 170; }
    if (e.type === "at") { b.x = a.x + rnd() * 150; b.y = a.y + rnd() * 150; }
  });

  const civGroups = {};
  nodes.filter((n) => n.type === "civ").forEach((n) => {
    (civGroups[n.group] = civGroups[n.group] || []).push(n.id);
  });
  const centroid = (ids) => {
    let x = 0, y = 0, k = 0;
    ids.forEach((id) => { if (pos[id]) { x += pos[id].x; y += pos[id].y; k++; } });
    return k ? { x: x / k, y: y / k } : null;
  };

  const ITER = 380;
  for (let it = 0; it < ITER; it++) {
    const cool = Math.max(0.05, 1 - it / ITER);
    for (let a = 0; a < nodes.length; a++) {
      for (let b = a + 1; b < nodes.length; b++) {
        const pa = pos[nodes[a].id], pb = pos[nodes[b].id];
        let dx = pa.x - pb.x, dy = pa.y - pb.y;
        let d2 = dx * dx + dy * dy;
        if (d2 < 1) { dx = rnd(); dy = rnd(); d2 = 1; }
        const d = Math.sqrt(d2);
        const f = 2400 / d2;
        const fx = (dx / d) * f, fy = (dy / d) * f;
        pa.x += fx * cool; pa.y += fy * cool;
        pb.x -= fx * cool; pb.y -= fy * cool;
      }
    }
    edges.forEach((e) => {
      const pa = pos[e.from.id], pb = pos[e.to.id];
      if (!pa || !pb) return;
      const rest = e.type === "contains" ? 130 : e.type === "at" ? 95 : 175;
      let dx = pb.x - pa.x, dy = pb.y - pa.y;
      const d = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const f = (d - rest) * 0.045;
      const fx = (dx / d) * f, fy = (dy / d) * f;
      pa.x += fx * cool; pa.y += fy * cool;
      pb.x -= fx * cool; pb.y -= fy * cool;
    });
    edges.forEach((e) => {
      if (e.type !== "contains") return;
      const pa = pos[e.from.id], pb = pos[e.to.id];
      if (!pa || !pb) return;
      pb.x += (pa.x - pb.x) * 0.06 * cool;
      pb.y += (pa.y - pb.y) * 0.06 * cool;
    });
    Object.keys(civGroups).forEach((g) => {
      const c = centroid(civGroups[g]);
      if (!c) return;
      civGroups[g].forEach((id) => {
        pos[id].x += (c.x - pos[id].x) * 0.028 * cool;
        pos[id].y += (c.y - pos[id].y) * 0.028 * cool;
      });
    });
    nodes.forEach((n) => {
      const p = pos[n.id];
      p.x += (W / 2 - p.x) * 0.0025 * cool;
      p.y += (H / 2 - p.y) * 0.0025 * cool;
      p.x = Math.max(34, Math.min(W - 34, p.x));
      p.y = Math.max(34, Math.min(H - 34, p.y));
    });
  }
  return pos;
}

function renderGraph(container) {
  if (!container) return;
  const { nodes, edges } = buildGraph();
  const W = 1100, H = 780;
  const pos = computeGraphLayout(nodes, edges, W, H);

  const radius = (n) => (n.type === "museum" ? 24 : n.type === "civ" ? 14 : 10);
  const fill = (n) =>
    n.type === "museum" ? "#b45309"
    : n.type === "gallery" ? "#94a3b8"
    : (n.accent || "#0f6ab4");
  const EDGE_COLORS = { contains: "#b7c0ce", at: "#c9d2dd", influenced: "#e2b93b", successor: "#34a853", predecessor: "#34a853", contemporary: "#94a3b8", neighbor: "#94a3b8", region: "#a78bfa" };

  let s = `<svg class="graph-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Museums, galleries, and civilizations as a graph">`;
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="transparent" class="graph-bg"/>`;

  // edges
  edges.forEach((e) => {
    const a = pos[e.from.id], b = pos[e.to.id];
    if (!a || !b) return;
    const col = EDGE_COLORS[e.type] || "#c9d2dd";
    s += `<line class="g-edge" data-from="${esc(e.from.id)}" data-to="${esc(e.to.id)}" x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}" stroke="${col}" stroke-width="${e.type === "contains" ? 2 : 1.2}" opacity="0.5"/>`;
  });

  // nodes
  nodes.forEach((n) => {
    const p = pos[n.id];
    const r = radius(n);
    const col = fill(n);
    const isMuseum = n.type === "museum";
    const isCiv = n.type === "civ";
    s += `<g class="g-node" data-id="${esc(n.id)}" data-type="${esc(n.type)}" data-group="${esc(n.group || "")}">`;
    s += `<circle class="g-circle" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${col}" stroke="#fff" stroke-width="${isMuseum ? 2.5 : 1.4}"/>`;
    if (isMuseum || isCiv) {
      const label = isMuseum ? n.label : (n.emoji ? n.emoji + " " + n.label : n.label);
      const fy = p.y + r + (isMuseum ? 16 : 13);
      s += `<text class="g-label ${isMuseum ? "g-label-museum" : "g-label-civ"}" x="${p.x.toFixed(1)}" y="${fy.toFixed(1)}" text-anchor="middle">${esc(label)}</text>`;
    } else {
      s += `<title>${esc(n.label)}</title>`;
    }
    s += `</g>`;
  });
  s += `</svg>`;

  container.innerHTML = `
    <div class="graph-toolbar">
      <div class="graph-legend" id="graph-legend"></div>
      <div class="graph-filters" id="graph-filters"></div>
    </div>
    <div class="graph-stage">
      ${s}
      <div class="graph-info" id="graph-info"></div>
    </div>`;

  wireGraph(container, nodes, edges);
}

function wireGraph(container, nodes, edges) {
  const svg = container.querySelector(".graph-svg") || container.querySelector("svg");
  const info = container.querySelector("#graph-info");
  const legend = container.querySelector("#graph-legend");
  const filters = container.querySelector("#graph-filters");
  if (!svg) return;

  // legend
  legend.innerHTML = `
    <span class="lg"><span class="lg-dot" style="background:#b45309"></span>museum</span>
    <span class="lg"><span class="lg-dot" style="background:#94a3b8"></span>gallery</span>
    <span class="lg"><span class="lg-dot" style="background:#0f6ab4"></span>civilization</span>
    <span class="lg"><span class="lg-line" style="background:#e2b93b"></span>influenced</span>
    <span class="lg"><span class="lg-line" style="background:#34a853"></span>succeeded by</span>`;

  // filters
  const regions = Array.from(new Set(nodes.filter((n) => n.type === "civ").map((n) => n.group)));
  const typeLabels = { museum: "Museums", gallery: "Galleries", civ: "Civilizations" };
  let fhtml = `<span class="filt-chip on" data-type="museum">${typeLabels.museum}</span>`
    + `<span class="filt-chip on" data-type="gallery">${typeLabels.gallery}</span>`
    + `<span class="filt-chip on" data-type="civ">${typeLabels.civ}</span>`
    + `<span class="filt-sep"></span>`;
  regions.forEach((r) => { fhtml += `<span class="filt-chip on" data-region="${esc(r)}">${esc(r)}</span>`; });
  filters.innerHTML = fhtml;

  const nodeEls = Array.from(container.querySelectorAll(".g-node"));
  const edgeEls = Array.from(container.querySelectorAll(".g-edge"));
  const byId = {};
  nodeEls.forEach((el) => { byId[el.getAttribute("data-id")] = el; });

  const visibleTypes = { museum: true, gallery: true, civ: true };
  const hiddenRegions = {};

  const applyVisibility = () => {
    nodeEls.forEach((el) => {
      const t = el.getAttribute("data-type");
      const g = el.getAttribute("data-group");
      const hidden = !visibleTypes[t] || (t === "civ" && hiddenRegions[g]);
      el.style.display = hidden ? "none" : "";
    });
    edgeEls.forEach((el) => {
      const a = byId[el.getAttribute("data-from")];
      const b = byId[el.getAttribute("data-to")];
      const hidden = (a && a.style.display === "none") || (b && b.style.display === "none");
      el.style.display = hidden ? "none" : "";
    });
  };

  filters.addEventListener("click", (ev) => {
    const chip = ev.target.closest && ev.target.closest(".filt-chip");
    if (!chip) return;
    const t = chip.getAttribute("data-type");
    const r = chip.getAttribute("data-region");
    if (t) { visibleTypes[t] = !visibleTypes[t]; chip.classList.toggle("on", visibleTypes[t]); }
    if (r) { hiddenRegions[r] = !hiddenRegions[r]; chip.classList.toggle("on", !hiddenRegions[r]); }
    applyVisibility();
  });

  // neighbors lookup
  const neighbors = {};
  edges.forEach((e) => {
    (neighbors[e.from.id] = neighbors[e.from.id] || new Set()).add(e.to.id);
    (neighbors[e.to.id] = neighbors[e.to.id] || new Set()).add(e.from.id);
  });

  const setInfo = (n) => {
    if (!info) return;
    if (!n) { info.innerHTML = `<p class="graph-info-hint">Hover a node to inspect it · click to open · drag to pan · scroll to zoom.</p>`; info.classList.remove("active"); return; }
    const typeLabel = n.type === "museum" ? "Museum" : n.type === "gallery" ? "Gallery" : "Civilization";
    info.innerHTML = `
      <div class="graph-info-title">${n.emoji ? esc(n.emoji) + " " : ""}${esc(n.label)}</div>
      <div class="graph-info-type">${typeLabel}${n.group ? " · " + esc(n.group) : ""}</div>
      <a class="route-btn" href="${esc(n.href)}">Open &rarr;</a>`;
    info.classList.add("active");
  };

  const highlight = (id) => {
    const nb = neighbors[id] || new Set();
    nodeEls.forEach((el) => {
      const elid = el.getAttribute("data-id");
      const on = elid === id || nb.has(elid);
      el.style.opacity = on ? "1" : "0.15";
    });
    edgeEls.forEach((el) => {
      const on = el.getAttribute("data-from") === id || el.getAttribute("data-to") === id;
      el.style.opacity = on ? "0.9" : "0.06";
      el.style.strokeWidth = on ? "2.4" : "";
    });
  };
  const unhighlight = () => {
    nodeEls.forEach((el) => { el.style.opacity = "1"; });
    edgeEls.forEach((el) => { el.style.opacity = "0.5"; el.style.strokeWidth = ""; });
  };

  const nodeMap = {};
  nodes.forEach((n) => { nodeMap[n.id] = n; });

  nodeEls.forEach((el) => {
    const id = el.getAttribute("data-id");
    el.addEventListener("mouseenter", () => { highlight(id); setInfo(nodeMap[id]); });
    el.addEventListener("mouseleave", () => { unhighlight(); setInfo(null); });
    el.addEventListener("click", () => {
      const n = nodeMap[id];
      if (n && n.href) window.location.href = n.href;
    });
  });

  // pan + zoom
  const bg = svg.querySelector(".graph-bg") || svg;
  let panning = false, sx = 0, sy = 0, view = { x: 0, y: 0, k: 1 };
  const applyView = () => {
    const root = svg;
    root.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.k})`;
    root.style.transformOrigin = "0 0";
  };
  const stage = container.querySelector(".graph-stage");
  svg.addEventListener("mousedown", (ev) => { if (ev.target === bg || ev.target.tagName === "svg") { panning = true; sx = ev.clientX - view.x; sy = ev.clientY - view.y; } });
  window.addEventListener("mousemove", (ev) => { if (!panning) return; view.x = ev.clientX - sx; view.y = ev.clientY - sy; applyView(); });
  window.addEventListener("mouseup", () => { panning = false; });
  if (stage) {
    stage.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      const delta = ev.deltaY > 0 ? 0.9 : 1.1;
      view.k = Math.max(0.4, Math.min(3, view.k * delta));
      applyView();
    }, { passive: false });
  }
  setInfo(null);
}

function renderRoutes() {
  const app = document.getElementById("app");
  const groups = [
    { name: "New York", ids: ["met"] },
    { name: "San Francisco Bay Area", ids: ["deyoung", "legion", "aam", "rosicrucian"] },
    { name: "Washington, DC (Smithsonian)", ids: ["nmnh", "faaa", "nmafa", "nmai"] }
  ];
  let html = `
  <header class="hero">
    <p class="kicker">Civilization Readers</p>
    <h1>Museums, mapped as a graph.</h1>
    <p class="lede">Museums connect to galleries, galleries to civilizations, and civilizations to each other. Hover a node, click to open it, drag to pan, scroll to zoom. Then use the route pages below to find your way inside.</p>
    <div class="route-links">
      <a class="route-btn" href="index.html">All civilizations &rarr;</a>
      <a class="route-btn subtle" href="met.html">The Met</a>
      <a class="route-btn subtle" href="sf.html">SF museums</a>
      <a class="route-btn subtle" href="smithsonian.html">Smithsonian</a>
    </div>
  </header>

  <section class="panel graph-panel">
    <div class="panel-head">
      <h2>The graph</h2>
      <span class="hint">museums → galleries → civilizations, plus influence lines between civilizations</span>
    </div>
    <div class="panel-body">
      <div id="graph"></div>
    </div>
  </section>`;

  groups.forEach(({ name, ids }) => {
    html += `<h2 class="group-head">${esc(name)}</h2><div class="route-grid">`;
    ids.forEach((id) => {
      const m = getMuseum(id);
      if (!m) return;
      const areaCount = m.floors.reduce((n, f) => n + f.areas.length, 0);
      const civCount = new Set(m.floors.flatMap((f) => f.areas.flatMap((a) => a.civs))).size;
      html += `
      <a class="museum-card" href="${esc(routePageFor(m.id))}">
        <div class="museum-card-top"><span class="museum-card-emoji">${m.emoji}</span><h3>${esc(m.name)}</h3></div>
        <div class="museum-card-city">${esc(m.city)}</div>
        <p>${esc(m.tagline)}</p>
        <div class="museum-card-meta">${areaCount} gallery areas · ${civCount} civilizations</div>
        <span class="card-go">Open route &rarr;</span>
      </a>`;
    });
    html += `</div>`;
  });

  html += `<footer class="foot">Gallery and exhibit names change with reinstalls — always cross-check the museum's current map. <a href="index.html">All civilization readers &rarr;</a></footer>`;
  app.innerHTML = html;
  document.title = "Museums, mapped as a graph — Civilization Readers";
  renderGraph(document.getElementById("graph"));
}

/* ---------------- theme ---------------- */

const THEME_KEY = "civ-readers-theme";

function initTheme() {
  let saved = null;
  try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
  const prefersDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode (good for dim galleries)";
  }
}

function mountThemeToggle() {
  if (document.getElementById("theme-toggle")) return;
  const btn = document.createElement("button");
  btn.id = "theme-toggle";
  btn.className = "theme-toggle";
  btn.type = "button";
  btn.setAttribute("aria-label", "Toggle dark mode");
  btn.addEventListener("click", () => {
    const cur = document.documentElement.getAttribute("data-theme");
    applyTheme(cur === "dark" ? "light" : "dark");
  });
  document.body.appendChild(btn);
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
}

/* ---------------- boot ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  mountThemeToggle();
  if (document.body.dataset.page === "index") renderIndex();
  else if (document.body.dataset.page === "reader") renderReader();
  else if (document.body.dataset.page === "met") renderMet();
  else if (document.body.dataset.page === "sf") renderSF();
  else if (document.body.dataset.page === "smithsonian") renderSmithsonian();
  else if (document.body.dataset.page === "routes") renderRoutes();
});
