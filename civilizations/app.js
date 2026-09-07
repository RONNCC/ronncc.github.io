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

function getMasterpiece(slug) {
  if (typeof MASTERPIECES === "undefined") return null;
  return MASTERPIECES.find((m) => m.civ === slug) || null;
}

function toursForMuseum(museumId) {
  if (typeof TOURS === "undefined") return [];
  return TOURS.filter((t) => t.museum === museumId);
}

/* Which galleries, in which museums, hold this civilization? */
function galleriesForCiv(slug) {
  const out = [];
  MUSEUMS.forEach((m) => {
    m.floors.forEach((f) => {
      f.areas.forEach((a) => {
        if (a.civs.indexOf(slug) !== -1) {
          out.push({ museum: m, floor: f, area: a });
        }
      });
    });
  });
  return out;
}

/* Civilizations connected to this one, with the edge type and note. */
function relationsForCiv(slug) {
  if (typeof CIV_RELATIONS === "undefined") return [];
  const out = [];
  CIV_RELATIONS.forEach((r) => {
    if (r.from === slug) {
      const c = getCiv(r.to);
      if (c) out.push({ civ: c, type: r.type, note: r.note, dir: "out" });
    } else if (r.to === slug) {
      const c = getCiv(r.from);
      if (c) out.push({ civ: c, type: r.type, note: r.note, dir: "in" });
    }
  });
  return out;
}

function relLabel(rel) {
  const base = (typeof REL_LABELS !== "undefined" && REL_LABELS[rel.type]) || rel.type;
  if (rel.dir === "in") {
    if (rel.type === "successor") return "succeeded";
    if (rel.type === "predecessor") return "preceded by";
    if (rel.type === "influenced") return "influenced by";
    if (rel.type === "conquest") return "conquered by";
    if (rel.type === "script") return "script from";
    if (rel.type === "religion") return "religion from";
  }
  return base;
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

/* ---------------- shared chrome ---------------- */

const NAV_LINKS = [
  { href: "index.html", label: "Civilizations", shortLabel: "Readers", icon: "🏺", page: "index" },
  { href: "objects.html", label: "Objects", icon: "💎", page: "objects" },
  { href: "tours.html", label: "Tours", icon: "🧭", page: "tours" },
  { href: "routes.html", label: "Museums", icon: "🏛️", page: "routes" },
  { href: "guide.html", label: "Guide", icon: "📖", page: "guide" }
];

/* A fixed bottom tab bar on phones; a normal top bar on desktop.
 * Museums pages (met/sf/smithsonian/etc.) highlight the Museums tab. */
function mountNav() {
  if (document.getElementById("site-nav")) return;
  const page = document.body.dataset.page || "";
  const routePages = ["routes", "met", "sf", "smithsonian", "london", "paris", "berlin", "template"];
  const current = routePages.includes(page) ? "routes" : page === "reader" ? "index" : page;
  const nav = document.createElement("nav");
  nav.id = "site-nav";
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Sections");
  nav.innerHTML = NAV_LINKS.map(
    (l) =>
      `<a class="nav-item${l.page === current ? " on" : ""}" href="${l.href}"${l.page === current ? ' aria-current="page"' : ""}>
        <span class="nav-ico" aria-hidden="true">${l.icon}</span>
        <span class="nav-label"><span class="nav-long">${esc(l.label)}</span><span class="nav-short">${esc(l.shortLabel || l.label)}</span></span>
      </a>`
  ).join("");
  document.body.appendChild(nav);
  document.body.classList.add("has-nav");
}

/* "Back to top" affordance — long pages are the norm here. */
function mountToTop() {
  if (document.getElementById("to-top")) return;
  const btn = document.createElement("button");
  btn.id = "to-top";
  btn.className = "to-top";
  btn.type = "button";
  btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V4m-7 7 7-7 7 7"/></svg>';
  btn.setAttribute("aria-label", "Back to top");
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "auto" });
    document.getElementById("main-content").focus({ preventScroll: true });
  });
  document.body.appendChild(btn);
  const onScroll = () => {
    const show = window.scrollY > 700;
    btn.classList.toggle("show", show);
    btn.tabIndex = show ? 0 : -1;
    btn.setAttribute("aria-hidden", String(!show));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------- landing ---------------- */

function slugifyGroup(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function renderIndex() {
  const app = document.getElementById("app");
  const groups = byGroup();
  const museumCount = typeof MUSEUMS !== "undefined" ? MUSEUMS.length - 1 : 0;
  const mpCount = typeof MASTERPIECES !== "undefined" ? MASTERPIECES.length : 0;
  const tourCount = typeof TOURS !== "undefined" ? TOURS.length : 0;

  let html = `
  <header class="hero hero-compact">
    <h1>Pick a civilization. Get the context before the gallery.</h1>
    <p class="lede">Pocket primers for <strong>${CIVILIZATIONS.length} civilizations</strong> across <strong>${groups.length} regions</strong> — visual timelines, key context, and a cheat sheet for what you'll actually see on display.</p>
    <div class="search-wrap search-wrap-prominent">
      <input id="civ-search" aria-label="Search civilizations, terms, or objects" type="search" placeholder="Search civilizations, terms, or objects…" autocomplete="off" enterkeyhint="search" />
    </div>
  </header>

  <div class="index-filter-bar" id="index-filter-bar">
    <div class="filter-pills-wrap">
      <button type="button" class="filter-pill active" aria-pressed="true" data-filter="all">All <span class="pill-count">${CIVILIZATIONS.length}</span></button>
      ${groups.map(({ group, civs }) => `
        <button type="button" class="filter-pill" aria-pressed="false" data-filter="${esc(slugifyGroup(group))}">${esc(group)} <span class="pill-count">${civs.length}</span></button>
      `).join("")}
    </div>
  </div>

  <p class="sr-only" id="search-status" role="status"></p>
  <div class="stat-strip stat-strip-compact">
    <span><b>${CIVILIZATIONS.length}</b> civilizations</span>
    <span><b>${museumCount}</b> museums</span>
    <span><b>${mpCount}</b> objects</span>
    <span><b>${tourCount}</b> tours</span>
    <span class="stat-sep"></span>
    <a class="stat-link" href="tours.html">Tours →</a>
    <a class="stat-link" href="objects.html">Objects</a>
    <a class="stat-link" href="routes.html">Museums</a>
    <a class="stat-link" href="guide.html">Guide</a>
  </div>`;

  groups.forEach(({ group, civs }) => {
    const groupSlug = slugifyGroup(group);
    html += `
    <section class="group-section" data-group-slug="${esc(groupSlug)}" id="group-${groupSlug}">
      <div class="group-head-row">
        <h2 class="group-head">${esc(group)}</h2>
        <span class="group-count">${civs.length} civilizations</span>
      </div>
      <div class="grid">`;
    civs.forEach((c) => {
      const mp = getMasterpiece(c.slug);
      const hay = [
        c.name, c.tagline, c.region, c.group, c.emoji, c.spanLabel, c.slug,
        (c.quick || []).join(" "),
        (c.context && c.context.spotIt || []).map((s) => s.t + " " + s.d).join(" "),
        (c.museum && c.museum.lingo || []).map((s) => s.t).join(" "),
        mp ? mp.name : ""
      ].join(" ").toLowerCase();
      html += `
      <a class="card" data-search="${esc(hay)}" data-group="${esc(c.group)}" style="--c:${c.accent};--c-soft:${hexToRgba(c.accent, 0.13)}" href="reader.html?c=${esc(c.slug)}">
        <div class="card-accent-bar"></div>
        <div class="card-body">
          <div class="card-top">
            <span class="card-emoji">${c.emoji}</span>
            <div class="card-title-block">
              <h3>${esc(c.name)}</h3>
              <span class="card-span">${esc(c.spanLabel)}</span>
            </div>
          </div>
          <p class="card-tagline">${esc(c.tagline)}</p>
          <div class="card-bottom-row">
            <span class="card-region">${esc(c.region)}</span>
            <span class="card-go">Read →</span>
          </div>
        </div>
      </a>`;
    });
    html += `</div></section>`;
  });

  html += `<div class="no-results" id="no-results" role="status">No civilizations match "<span id="no-results-q"></span>".</div>`;
  html += `<footer class="foot">A high-level primer for gallery context — not an academic reference. Dates are approximate. <a href="reader.html?c=egypt">Start with Egypt →</a></footer>`;
  app.innerHTML = html;
  wireSearch();
  wireFilterPills();
  document.title = "Civilization Readers — museum primers";
}

function renderMasterTimeline(container) {
  if (!container) return;
  const groups = byGroup();
  // On phones the SVG is scaled down inside a horizontal scroller, so shrink
  // the name gutter and lean on the tooltip/label instead.
  const narrow = window.matchMedia && window.matchMedia("(max-width: 640px)").matches;
  const W = 1080;
  const lo = -4000, hi = 2000;
  const labelW = narrow ? 150 : 210;
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
  container.innerHTML = `<div class="tl-scroll" tabindex="0" role="region" aria-label="Scrollable world history timeline">${s}</div>`;
}

/* Collapsible panels: any <details class="panel" data-collapse-key> remembers
   whether you left it open or closed, per key, across visits. */
const COLLAPSE_PREFIX = "civ-readers-collapsed:";

function wireCollapsiblePanels() {
  document.querySelectorAll("details.panel[data-collapse-key]").forEach((d) => {
    const key = COLLAPSE_PREFIX + d.dataset.collapseKey;
    let saved = null;
    try { saved = localStorage.getItem(key); } catch (e) {}
    if (saved === "1") d.open = false;
    else if (saved === "0") d.open = true;
    const persist = () => {
      if (d.dataset.printOpen) return;
      try { localStorage.setItem(key, d.open ? "0" : "1"); } catch (e) {}
    };
    d.addEventListener("toggle", persist);
    // A quick navigation can happen before the queued toggle event is delivered.
    window.addEventListener("pagehide", persist);
  });

  // Jump links (e.g. "Timeline" in the reader nav) should reopen a collapsed
  // panel instead of scrolling to a closed bar.
  if (!wireCollapsiblePanels._wired) {
    wireCollapsiblePanels._wired = true;
    document.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest('a[href*="#"]');
      if (!a) return;
      const hash = a.getAttribute("href").split("#")[1];
      if (!hash) return;
      const target = document.getElementById(hash);
      if (target && target.matches && target.matches("details.panel") && !target.open) {
        target.open = true;
      }
    });
  }
}

/* Shared state for the index page: current search query + active group filter.
 * Both wireSearch and wireFilterPills update this and call applyIndexFilters(). */
let _indexFilter = "all";

function applyIndexFilters() {
  const input = document.getElementById("civ-search");
  const noResults = document.getElementById("no-results");
  const noResultsQ = document.getElementById("no-results-q");
  const q = input ? input.value.trim().toLowerCase() : "";
  let visible = 0;

  document.querySelectorAll(".card").forEach((card) => {
    const hay = card.dataset.search || "";
    const matchesSearch = !q || hay.includes(q);
    const matchesFilter = _indexFilter === "all" || slugifyGroup(card.dataset.group || "") === _indexFilter;
    const show = matchesSearch && matchesFilter;
    card.style.display = show ? "" : "none";
    if (show) visible++;
  });

  // Hide empty group sections entirely
  document.querySelectorAll(".group-section").forEach((section) => {
    const grid = section.querySelector(".grid");
    if (!grid) return;
    const count = Array.from(grid.querySelectorAll(".card")).filter((c) => c.style.display !== "none").length;
    section.style.display = count ? "" : "none";
    section.querySelector(".group-count").textContent = `${count} civilization${count === 1 ? "" : "s"}`;
  });

  const status = document.getElementById("search-status");
  if (status) status.textContent = `${visible} civilization${visible === 1 ? "" : "s"} shown`;
  if (noResults) {
    noResults.style.display = q && visible === 0 ? "block" : "none";
    if (noResultsQ) noResultsQ.textContent = input ? input.value.trim() : "";
  }
}

function wireSearch() {
  const input = document.getElementById("civ-search");
  if (!input) return;
  input.addEventListener("input", () => applyIndexFilters());
}

function wireFilterPills() {
  const bar = document.getElementById("index-filter-bar");
  if (!bar) return;
  bar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-pill");
    if (!btn) return;
    bar.querySelectorAll(".filter-pill").forEach((b) => {
      b.classList.toggle("active", b === btn);
      b.setAttribute("aria-pressed", String(b === btn));
    });
    _indexFilter = btn.dataset.filter || "all";
    applyIndexFilters();
  });
}

/* ---------------- timeline (SVG) ---------------- */

function renderTimeline(container, civ) {
  const W = 1080, pad = 48, eraY = 18, eraH = 48, axisY = 100;
  const years = [civ.start, civ.end, ...civ.periods.flatMap((p) => [p.start, p.end]), ...civ.events.map((e) => e.year)];
  const minYear = Math.min(...years), maxYear = Math.max(...years);
  const span = Math.max(1, maxYear - minYear);
  const X = (year) => pad + ((year - minYear) / span) * (W - pad * 2);
  const measure = document.createElement("canvas").getContext("2d");
  measure.font = `600 13px ${getComputedStyle(document.body).fontFamily}`;
  const textWidth = (text) => measure.measureText(text).width;
  const rows = [];
  // All event labels sit below the periods. Add rows instead of overlapping
  // labels when a long history ends in a cluster of closely spaced dates.
  const placed = civ.events.map((event, i) => {
    const x = X(event.year);
    const label = `${i + 1}. ${event.label}`;
    const width = Math.max(44, Math.ceil(textWidth(label)) + 24);
    const labelX = Math.max(width / 2 + 8, Math.min(W - width / 2 - 8, x));
    let row = rows.findIndex((items) => items.every((item) => Math.abs(item.x - labelX) >= (item.width + width) / 2 + 12));
    if (row === -1) { row = rows.length; rows.push([]); }
    rows[row].push({ x: labelX, width });
    return { event, i, x, label, labelX, width, y: 140 + row * 48 };
  });
  const H = 190 + Math.max(0, rows.length - 1) * 48;
  let svg = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" style="min-width:${W}px" role="group" aria-label="Timeline of ${esc(civ.name)}. Select an event to read its detail.">`;
  civ.periods.forEach((period) => {
    const x = X(period.start), width = Math.max(2, X(period.end) - x);
    svg += `<rect x="${x}" y="${eraY}" width="${width}" height="${eraH}" rx="6" fill="${hexToRgba(civ.accent, 0.16)}" stroke="${hexToRgba(civ.accent, 0.55)}">
      <title>${esc(period.name)} — ${esc(period.years)}</title></rect>`;
    if (textWidth(period.name) < width - 16) {
      svg += `<text class="tl-era-label" x="${x + width / 2}" y="${eraY + 20}" text-anchor="middle">${esc(period.name)}</text>`;
    }
    if (textWidth(period.years) < width - 16) {
      svg += `<text class="tl-era-years" x="${x + width / 2}" y="${eraY + 37}" text-anchor="middle">${esc(period.years)}</text>`;
    }
  });
  svg += `<line class="tl-axis" x1="${pad}" y1="${axisY}" x2="${W - pad}" y2="${axisY}" stroke-width="2"/>`;
  placed.forEach(({ event, i, x, label, labelX, width, y }) => {
    svg += `<g class="tl-event" data-index="${i}" tabindex="0" role="button" aria-pressed="false" aria-controls="tl-detail" aria-label="${formatYear(event.year)}: ${esc(event.label)}">
      <line class="tl-event-leader" x1="${x}" y1="${axisY}" x2="${labelX}" y2="${y - 20}"/>
      <circle class="tl-dot" cx="${x}" cy="${axisY}" r="5" fill="${civ.accent}" stroke="var(--paper)" stroke-width="2"/>
      <rect class="tl-event-hit" x="${labelX - width / 2}" y="${y - 22}" width="${width}" height="44" rx="8" fill="transparent"/>
      <text class="tl-ev-label" x="${labelX}" y="${y + 5}" text-anchor="middle">${esc(label)}</text>
    </g>`;
  });
  svg += `<text class="tl-year" x="${pad}" y="${H - 10}">${formatYear(minYear)}</text>
    <text class="tl-year" x="${W - pad}" y="${H - 10}" text-anchor="end">${formatYear(maxYear)}</text></svg>`;
  container.innerHTML = `<div class="tl-scroll" tabindex="0" role="region" aria-label="Scrollable civilization timeline">${svg}</div>`;
  const detail = document.getElementById("tl-detail");
  const events = Array.from(container.querySelectorAll(".tl-event"));
  events.forEach((element) => {
    const select = () => {
      const event = civ.events[Number(element.dataset.index)];
      events.forEach((el) => el.setAttribute("aria-pressed", String(el === element)));
      detail.innerHTML = `<div class="tl-detail-year">${formatYear(event.year)}</div>
        <div class="tl-detail-title">${esc(event.label)}</div><p>${esc(event.detail)}</p>`;
    };
    element.addEventListener("click", select);
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); select(); }
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
  container.innerHTML = `<div class="tl-scroll" tabindex="0" role="region" aria-label="Scrollable world history timeline">${s}</div>`;
}

/* ---------------- reader ---------------- */

/* ---------------- audio narration ----------------
 * Speaks the quick read aloud with the browser's built-in speech synthesis.
 * Nothing is downloaded and no key is needed, so this keeps working offline —
 * which is the point, since the phone in your hand is usually in a basement
 * gallery with no signal. The button hides itself when the API is missing.
 */
function wireNarration(btn, lines) {
  if (!btn) return;
  const synth = window.speechSynthesis;
  if (!synth || typeof window.SpeechSynthesisUtterance !== "function") return;

  // Pauses between bullets so it doesn't read as one breathless run-on.
  const script = lines
    .map((l) => String(l).trim())
    .filter(Boolean)
    .map((l) => (/[.!?]$/.test(l) ? l : l + "."))
    .join(" \u2014 ");

  btn.hidden = false;
  const icon = btn.querySelector(".listen-icon");
  const label = btn.querySelector(".listen-label");
  let speaking = false;

  function reset() {
    speaking = false;
    btn.classList.remove("is-speaking");
    icon.textContent = "\u25B6";
    label.textContent = "Listen";
  }

  function pickVoice() {
    const voices = synth.getVoices() || [];
    const lang = (document.documentElement.lang || "en").slice(0, 2);
    return (
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(lang) && v.localService) ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(lang)) ||
      null
    );
  }

  btn.addEventListener("click", () => {
    if (speaking) { synth.cancel(); reset(); return; }
    synth.cancel();
    const u = new SpeechSynthesisUtterance(script);
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = 0.98;
    u.pitch = 1;
    u.onend = reset;
    u.onerror = reset;
    speaking = true;
    btn.classList.add("is-speaking");
    icon.textContent = "\u25A0";
    label.textContent = "Stop";
    synth.speak(u);
  });

  // Chrome populates voices asynchronously; and never leave speech running
  // when the reader navigates away to the next civilization.
  if (synth.onvoiceschanged === null) synth.onvoiceschanged = () => {};
  window.addEventListener("pagehide", () => synth.cancel());
  window.addEventListener("beforeunload", () => synth.cancel());
}

function renderReader() {
  const slug = getSlug();
  const civ = getCiv(slug) || CIVILIZATIONS[0];
  const app = document.getElementById("app");

  // Keep functional text/controls contrast-safe; the civilization color is decorative.
  document.documentElement.style.setProperty("--civ-accent", civ.accent);

  const idx = CIVILIZATIONS.indexOf(civ);
  const prev = CIVILIZATIONS[(idx - 1 + CIVILIZATIONS.length) % CIVILIZATIONS.length];
  const next = CIVILIZATIONS[(idx + 1) % CIVILIZATIONS.length];
  const spanYears = civ.end - civ.start;
  const mp = getMasterpiece(civ.slug);
  const rels = relationsForCiv(civ.slug);
  const places = galleriesForCiv(civ.slug).filter((g) => g.museum.id !== "template");

  let html = `
  <div class="reader-layout">
    <aside class="reader-toc" id="reader-toc" aria-label="On this page">
      <p class="reader-toc-title">On this page</p>
      <nav class="toc-nav" aria-label="Reader sections">
        <a href="#sec-timeline">Timeline</a>
        <a href="#sec-context">Context</a>
        ${mp ? `<a href="#sec-object">The object</a>` : ""}
        <a href="#sec-deeper">Go deeper</a>
        <a href="#sec-dates">Key dates</a>
        <a href="#museum">Cheat sheet</a>
        ${places.length ? `<a href="#sec-where">Where to see it</a>` : ""}
        ${rels.length ? `<a href="#sec-rel">Connected to</a>` : ""}
      </nav>
    </aside>
    <article class="reader-article">
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
    <div class="quick-head">
      <span>⚡ In 30 seconds — what matters</span>
      <button type="button" class="listen-btn" id="listen-quick" hidden>
        <span class="listen-icon">▶</span><span class="listen-label">Listen</span>
      </button>
    </div>
    <ul>${civ.quick.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>
  </div>` : ""}

  <details class="panel" id="sec-timeline" data-collapse-key="reader-timeline" open>
    <summary class="panel-head">
      <h2>Timeline</h2>
      <span class="hint">Scroll the timeline &middot; select an event for detail</span>
      <span class="panel-chev" aria-hidden="true">&#9662;</span>
    </summary>
    <div class="panel-body">
      <div id="timeline"></div>
      <div class="tl-detail" id="tl-detail" aria-live="polite">
        <div class="tl-detail-year">${formatYear(civ.start)} &ndash; ${formatYear(civ.end)}</div>
        <div class="tl-detail-title">The arc of ${esc(civ.name)}</div>
        <p>${esc(civ.overview)}</p>
      </div>
    </div>
  </details>

  <details class="panel" data-collapse-key="world-ruler" open>
    <summary class="panel-head">
      <h2>Where it sits in world history</h2>
      <span class="hint">your civilization (highlighted) against 4,000 years of milestones</span>
      <span class="panel-chev" aria-hidden="true">&#9662;</span>
    </summary>
    <div class="panel-body">
      <div id="world-ruler"></div>
    </div>
  </details>

  <div class="section-title" id="sec-context">
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

  ${mp ? `
  <div class="section-title" id="sec-object">
    <div>
      <h2>The one object</h2>
      <div class="sub">A 60-second read on the piece that defines this civilization.</div>
    </div>
  </div>
  <article class="mp-card">
    <div class="mp-head">
      <span class="mp-emoji" aria-hidden="true">${mp.emoji}</span>
      <div class="mp-titles">
        <h3>${esc(mp.name)}</h3>
        <div class="mp-meta">${esc(mp.date)} &middot; ${esc(mp.material)}</div>
        <div class="mp-where">📍 ${esc(mp.where)}</div>
      </div>
    </div>
    <p class="mp-hook">${esc(mp.hook)}</p>
    <p class="mp-read">${esc(mp.read)}</p>
    <div class="mp-look">
      <h4>Look for</h4>
      <ul>${mp.lookFor.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
    </div>
    <a class="mp-more" href="objects.html#${esc(mp.id)}">All masterpiece cards &rarr;</a>
  </article>` : ""}

  <div class="section-title" id="sec-deeper">
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

  <div class="section-title" id="sec-dates">
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

  ${places.length ? `
  <div class="section-title" id="sec-where">
    <div>
      <h2>Galleries in this guide</h2>
      <div class="sub">Rooms that hold ${esc(civ.name)} in the museums mapped here.</div>
    </div>
  </div>
  <div class="where-grid">
    ${places.map((p) => `
      <a class="where-card" href="${esc(routePageFor(p.museum.id))}#${esc(p.area.id)}">
        <div class="where-museum">${p.museum.emoji} ${esc(p.museum.name)}</div>
        <div class="where-area">${esc(p.area.name)}</div>
        <div class="where-gal">${esc(p.area.galleries)}</div>
      </a>`).join("")}
  </div>` : ""}

  ${rels.length ? `
  <div class="section-title" id="sec-rel">
    <div>
      <h2>Connected to</h2>
      <div class="sub">Who this civilization traded with, learned from, fought, or became.</div>
    </div>
  </div>
  <div class="rel-list">
    ${rels.map((r) => `
      <a class="rel-row" href="reader.html?c=${esc(r.civ.slug)}" style="--c:${r.civ.accent}">
        <span class="rel-type rel-${esc(r.type)}">${esc(relLabel(r))}</span>
        <span class="rel-name">${r.civ.emoji} ${esc(r.civ.name)}</span>
        ${r.note ? `<span class="rel-note">${esc(r.note)}</span>` : ""}
      </a>`).join("")}
  </div>` : ""}

  <nav class="pager" aria-label="Previous and next civilizations">
    <a class="pager-link prev" href="reader.html?c=${esc(prev.slug)}">
      <span class="pager-label">&larr; Previous</span>
      <span class="pager-name">${prev.emoji} ${esc(prev.name)}</span>
    </a>
    <a class="pager-all" href="index.html">All &uarr;</a>
    <a class="pager-link next" href="reader.html?c=${esc(next.slug)}">
      <span class="pager-label">Next &rarr;</span>
      <span class="pager-name">${next.emoji} ${esc(next.name)}</span>
    </a>
  </nav>
    </article>
  </div>`;

  app.innerHTML = html;
  renderTimeline(document.getElementById("timeline"), civ);
  renderWorldRuler(document.getElementById("world-ruler"), civ);
  wireCollapsiblePanels();
  wireReaderToc();
  wireNarration(document.getElementById("listen-quick"), [
    `${civ.name}. ${civ.tagline}`,
    ...(civ.quick || []),
  ]);
  document.title = `${civ.name} — Civilization Reader`;

  // If the requested slug didn't exist, fix the URL.
  if (getCiv(slug) !== civ && slug) {
    history.replaceState(null, "", `reader.html?c=${civ.slug}`);
  }
}

/* The reader's table of contents is a persistent rail (desktop) or a sticky
 * bar (phone). This keeps it honest: it highlights whichever section you're
 * actually reading, so it reads as a navigational anchor rather than a list
 * that scrolls off the top of the page. */
function wireReaderToc() {
  const toc = document.getElementById("reader-toc");
  if (!toc) return;
  const links = Array.from(toc.querySelectorAll("a[href^='#']"));
  if (!links.length) return;
  const items = links
    .map((a) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      return el ? { a, el } : null;
    })
    .filter(Boolean);
  if (!items.length) return;

  let ticking = false, lastActive = null;
  const setActive = () => {
    ticking = false;
    // A section is "current" once its top passes just below the fixed chrome
    // (the top nav on desktop, or the sticky TOC bar on phones).
    const desktop = window.matchMedia("(min-width: 1080px)").matches;
    const topNav = window.matchMedia("(min-width: 861px)").matches
      ? (document.getElementById("site-nav")?.getBoundingClientRect().height || 64) : 0;
    const safeTop = parseFloat(getComputedStyle(toc).top) || 0;
    const line = desktop ? topNav + 24 : safeTop + toc.getBoundingClientRect().height + 24;
    let current = items[0];
    for (const it of items) {
      if (it.el.getBoundingClientRect().top - line <= 0) current = it;
    }
    // Pin the final item once we've reached the end of the page.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = items[items.length - 1];
    }
    if (current !== lastActive && !desktop) {
      const nav = toc.querySelector(".toc-nav");
      const linkBox = current.a.getBoundingClientRect(), navBox = nav.getBoundingClientRect();
      if (linkBox.left < navBox.left || linkBox.right > navBox.right) {
        nav.scrollLeft += linkBox.left - navBox.left - (navBox.width - linkBox.width) / 2;
      }
    }
    lastActive = current;
    items.forEach((it) => {
      const on = it === current;
      it.a.classList.toggle("active", on);
      if (on) it.a.setAttribute("aria-current", "location");
      else it.a.removeAttribute("aria-current");
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(setActive);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  // Collapsing/expanding a panel shifts the layout without firing a scroll.
  document.querySelectorAll("details").forEach((d) => d.addEventListener("toggle", onScroll));
  setActive();
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
  nmai: "smithsonian.html",
  britishmuseum: "london.html",
  louvre: "paris.html",
  berlin: "berlin.html",
  template: "template.html"
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
    <h1>${title}</h1>
    <p class="lede">${intro}</p>
    <div class="how">
      <span class="step"><b>1.</b> Pick a museum</span>
      <span class="step"><b>2.</b> Find the gallery</span>
      <span class="step"><b>3.</b> Open the matching reader</span>
      <span class="step"><b>4.</b> Read it offline in the gallery</span>
    </div>
    <div class="route-links">
      <a class="route-btn" href="routes.html">All museums on a map &rarr;</a>
      <a class="route-btn subtle" href="index.html">All civilizations</a>
      <a class="route-btn subtle" href="tours.html">Tours</a>
    </div>
  </header>`;

  // Surface any timed tour for these museums right at the top.
  const tours = museumIds.reduce((acc, id) => acc.concat(toursForMuseum(id)), []);
  if (tours.length) {
    html += `<div class="tour-cards">`;
    tours.forEach((t) => {
      const m = getMuseum(t.museum);
      html += `
        <a class="tour-card" href="tours.html#${esc(t.id)}">
          <div class="tour-card-top">${m ? m.emoji : "🧭"} <b>${esc(t.name)}</b></div>
          <div class="tour-card-meta">${t.stops.length} stops · ${t.minutes} min · start-here route</div>
        </a>`;
    });
    html += `</div>`;
  }

  museumIds.forEach((id) => {
    const m = getMuseum(id);
    if (m) html += museumBlock(m);
  });

  html += footerHtml;
  app.innerHTML = html;
  document.title = title + " — Civilization Readers";
  jumpToHash();
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

function renderLondon() {
  renderRoutePage(
    ["britishmuseum"],
    "The British Museum, room by room.",
    "Free entry, eight million objects, and — mercifully — numbered rooms. This maps the rooms to the readers that cover them. Several collections here, notably the Parthenon Sculptures and the Benin plaques, are subject to active repatriation claims; the labels increasingly say so, and so does this guide.",
    `<footer class="foot">Rooms close at short notice — check the closures list in the Great Court. <a href="https://www.britishmuseum.org/visit/museum-map" rel="noopener" target="_blank">British Museum map &rarr;</a></footer>`
  );
}

function renderParis() {
  renderRoutePage(
    ["louvre"],
    "The Louvre, wing by wing.",
    "Three wings — Denon (south), Sully (east), Richelieu (north) — each with levels numbered −1 to +2. The antiquities are mostly in Sully and Richelieu, which are also the quietest parts of the building. Room numbers are printed on the door frames.",
    `<footer class="foot">Enter via the Carrousel or Porte des Lions to skip the Pyramid queue. <a href="https://www.louvre.fr/en/visit/hours-admission" rel="noopener" target="_blank">Louvre visitor info &rarr;</a></footer>`
  );
}

function renderBerlin() {
  renderRoutePage(
    ["berlin"],
    "Berlin: Museum Island & the Humboldt Forum.",
    "Five museums on one island plus the Humboldt Forum across the water. <strong>Important:</strong> the Pergamonmuseum is entirely closed. Its north wing (Pergamon Altar, Islamic art) reopens on 4 June 2027; the south wing holding the Ishtar Gate is not expected back until around 2037. Plan around it.",
    `<footer class="foot">A single Museum Island day ticket covers all the open houses. <a href="https://www.smb.museum/en/home/" rel="noopener" target="_blank">Staatliche Museen zu Berlin &rarr;</a></footer>`
  );
}

function renderTemplate() {
  renderRoutePage(
    ["template"],
    "Add your own museum.",
    "This guide covers twelve museums. Yours probably isn't one of them — so here is a generic encyclopedic-museum skeleton you can copy. Most large museums group their collections the same way, so the wings below will map onto yours with only the gallery names changed.",
    `<section class="panel">
      <div class="panel-head"><h2>How to add it</h2><span class="hint">about ten minutes of typing</span></div>
      <div class="panel-body">
        <ol class="howto">
          <li>Open <code>data.js</code> and find the <code>MUSEUMS</code> array.</li>
          <li>Copy the block with <code>id: "template"</code> and paste it as a new entry.</li>
          <li>Change <code>id</code>, <code>name</code>, <code>city</code>, <code>emoji</code>, and <code>tagline</code>. Every <code>id</code> in the file must be unique.</li>
          <li>Replace each area's <code>galleries</code> with the room names or numbers from your museum's map, and edit the <code>civs</code> arrays to match what's actually on display.</li>
          <li>Add a page mapping in <code>MUSEUM_PAGE</code> in <code>app.js</code> if you want it on its own route page — otherwise it will still appear on <code>routes.html</code> — on the map and in the graph.</li>
          <li>Optionally add a tour to the <code>TOURS</code> array using your new area ids.</li>
          <li>Bump the <code>CACHE</code> version in <code>sw.js</code> so returning visitors get the new data.</li>
        </ol>
        <p class="src-note">Nothing else needs editing. The map, graph, search, tours, and each civilization's &ldquo;Galleries in this guide&rdquo; section all read from the same structure.</p>
      </div>
    </section>
    <footer class="foot">The whole site is static — no build step, no dependencies. <a href="routes.html">Back to all museums &rarr;</a></footer>`
  );
}

/* ---------------- geo map (routes.html) ---------------- */

const MAP_W = 1000, MAP_H = 560;   // bundled equirectangular land coordinates

function mapXY(lat, lon) {
  return {
    x: ((lon + 180) / 360) * MAP_W,
    y: ((90 - lat) / 180) * MAP_H
  };
}

/* Museums within ~1.1° of each other share one pin (SF + San Jose, the four
 * Smithsonian buildings). The cluster is drawn at the centroid of its members. */
function geoClusters() {
  const clusters = [];
  MUSEUMS.forEach((m) => {
    if (m.id === "template" || m.lat == null || m.lon == null) return;
    let host = null;
    for (const c of clusters) {
      if (Math.abs(c.lat - m.lat) < 1.1 && Math.abs(c.lon - m.lon) < 1.1) { host = c; break; }
    }
    if (host) host.museums.push(m);
    else clusters.push({ lat: m.lat, lon: m.lon, museums: [m] });
  });
  clusters.forEach((c) => {
    c.lat = c.museums.reduce((s, m) => s + m.lat, 0) / c.museums.length;
    c.lon = c.museums.reduce((s, m) => s + m.lon, 0) / c.museums.length;
    c.city = c.museums[0].city;
  });
  return clusters;
}

/* Fit the land to the available pixel viewport; labels/targets stay screen-sized. */
function mapFitTransform(clusters, width, height) {
  const points = clusters.map((c) => mapXY(c.lat, c.lon));
  const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
  const spanX = Math.max(Math.max(...xs) - Math.min(...xs), 40);
  const spanY = Math.max(Math.max(...ys) - Math.min(...ys), 30);
  const k = Math.min((width - 72) / (spanX * 1.18), (height - 100) / (spanY * 1.3), 6);
  return {
    k,
    tx: width / 2 - k * (Math.min(...xs) + Math.max(...xs)) / 2,
    ty: height / 2 - k * (Math.min(...ys) + Math.max(...ys)) / 2
  };
}

function renderGeoMap(container) {
  if (!container) return;
  if (typeof WORLD_LAND === "undefined") {
    container.innerHTML = '<p class="src-note">The map is unavailable. All museum routes are listed below.</p>';
    return;
  }
  const clusters = geoClusters().map((c, i) => ({
    ...c, i,
    label: c.city === "San Francisco" ? "Bay Area" : c.city.replace(" (Smithsonian)", "")
  }));
  if (!clusters.length) return;

  let grid = "";
  for (let lon = -180; lon <= 180; lon += 30) {
    const x = mapXY(0, lon).x;
    grid += `<line class="map-gridline" x1="${x}" y1="0" x2="${x}" y2="${MAP_H}"/>`;
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    const y = mapXY(lat, 0).y;
    grid += `<line class="map-gridline" x1="0" y1="${y}" x2="${MAP_W}" y2="${y}"/>`;
  }
  container.innerHTML = `
    <div class="map-tools">
      <button type="button" class="map-btn on" id="map-fit" aria-pressed="true">Fit museums</button>
      <button type="button" class="map-btn" id="map-world" aria-pressed="false">World</button>
      <span class="map-hint">${clusters.length} cities · ${clusters.reduce((sum, c) => sum + c.museums.length, 0)} museums</span>
    </div>
    <div class="map-stage">
      <svg class="map-svg" role="group" aria-label="Museum map. Numbered markers match the city buttons below.">
        <rect width="100%" height="100%" class="map-ocean"/>
        <g class="map-view" id="map-view">${grid}<path class="map-land" d="${WORLD_LAND}"/></g>
        <g aria-hidden="true">${clusters.map((c) => `<line class="map-leader" data-i="${c.i}"/><circle class="map-location" data-i="${c.i}" r="3"/>`).join("")}</g>
        ${clusters.map((c) => `
          <g class="map-pin" data-i="${c.i}" tabindex="0" role="button" aria-controls="map-info" aria-pressed="false" aria-label="${esc(c.label)}: ${c.museums.length} museum${c.museums.length === 1 ? "" : "s"}">
            <circle class="map-hit" r="22" fill="transparent"/>
            <circle class="map-dot" r="15"/>
            <text class="map-number" y="4.5" text-anchor="middle">${c.i + 1}</text>
            <text class="map-city" y="34" text-anchor="middle">${esc(c.label)}</text>
          </g>`).join("")}
      </svg>
    </div>
    <div class="map-cities" role="group" aria-label="Choose a museum city">
      ${clusters.map((c) => `
        <button class="map-city-btn" type="button" data-i="${c.i}" aria-controls="map-info" aria-pressed="false">
          <span class="city-number" aria-hidden="true">${c.i + 1}</span>
          <span>${esc(c.label)}<small>${c.museums.length} museum${c.museums.length === 1 ? "" : "s"}</small></span>
        </button>`).join("")}
    </div>
    <div class="map-info" id="map-info" role="region" aria-label="Museums in the selected city" aria-live="polite"></div>`;

  const svg = container.querySelector(".map-svg");
  const land = container.querySelector("#map-view");
  const pins = Array.from(container.querySelectorAll(".map-pin"));
  const cities = Array.from(container.querySelectorAll(".map-city-btn"));
  const fitButton = container.querySelector("#map-fit");
  const worldButton = container.querySelector("#map-world");
  let world = false;

  function draw() {
    const { width, height } = svg.getBoundingClientRect();
    if (!width || !height) return;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    const k = Math.min(width / MAP_W, height / MAP_H);
    const t = world ? { k, tx: (width - MAP_W * k) / 2, ty: (height - MAP_H * k) / 2 }
      : mapFitTransform(clusters, width, height);
    land.setAttribute("transform", `translate(${t.tx},${t.ty}) scale(${t.k})`);
    // Greedy screen-space callouts prevent nearby cities from sharing a tap target.
    // Geographic dots never move; leader lines connect them to their numbered markers.
    const labelWidth = width < 600 ? 48 : 124;
    const labelHeight = width < 600 ? 48 : 68;
    svg.classList.toggle("compact", width < 600);
    const placed = [];
    clusters.forEach((c, i) => {
      const p = mapXY(c.lat, c.lon);
      const anchor = { x: t.tx + p.x * t.k, y: t.ty + p.y * t.k };
      const candidates = [];
      for (let x = labelWidth / 2 + 4; x <= width - labelWidth / 2 - 4; x += 8) {
        for (let y = 28; y <= height - labelHeight + 20; y += 8) {
          if (placed.some((b) => Math.abs(b.x - x) < labelWidth && Math.abs(b.y - y) < labelHeight)) continue;
          candidates.push({ x, y, distance: Math.hypot(x - anchor.x, y - anchor.y) });
        }
      }
      candidates.sort((a, b) => a.distance - b.distance);
      const point = candidates[0] || anchor;
      placed.push(point);
      pins[i].setAttribute("transform", `translate(${point.x},${point.y})`);
      const leader = container.querySelector(`.map-leader[data-i="${i}"]`);
      leader.setAttribute("x1", anchor.x); leader.setAttribute("y1", anchor.y);
      leader.setAttribute("x2", point.x); leader.setAttribute("y2", point.y);
      const dot = container.querySelector(`.map-location[data-i="${i}"]`);
      dot.setAttribute("cx", anchor.x); dot.setAttribute("cy", anchor.y);
    });
  }
  [fitButton, worldButton].forEach((button) => button.addEventListener("click", () => {
    world = button === worldButton;
    fitButton.classList.toggle("on", !world); fitButton.setAttribute("aria-pressed", String(!world));
    worldButton.classList.toggle("on", world); worldButton.setAttribute("aria-pressed", String(world));
    draw();
  }));
  if (typeof ResizeObserver !== "undefined") new ResizeObserver(draw).observe(svg);
  else window.addEventListener("resize", draw, { passive: true });
  draw();

  const info = container.querySelector("#map-info");
  let active = null, opener = null;
  function select(index, trigger) {
    active = active === index ? null : index;
    if (trigger) opener = trigger;
    [...pins, ...cities].forEach((el) => {
      const on = active === Number(el.dataset.i);
      el.classList.toggle("on", on);
      el.setAttribute("aria-pressed", String(on));
    });
    info.classList.toggle("active", active !== null);
    if (active === null) { info.innerHTML = ""; return; }
    const c = clusters[active];
    info.innerHTML = `
      <button class="map-info-close" type="button" aria-label="Close museum details">×</button>
      <h3 class="map-info-title">${esc(c.label)} · ${c.museums.length} museum${c.museums.length === 1 ? "" : "s"}</h3>
      <ul class="map-info-list">
        ${c.museums.map((m) => `<li>
          <a href="${esc(routePageFor(m.id))}#${esc(m.id)}">${m.emoji} ${esc(m.name)} <span aria-hidden="true">→</span></a>
          <p class="map-info-sub">${esc(m.tagline)}</p>
        </li>`).join("")}
      </ul>`;
  }
  [...pins, ...cities].forEach((el) => {
    el.addEventListener("click", () => select(Number(el.dataset.i), el));
    if (el.classList.contains("map-pin")) el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(Number(el.dataset.i), el); }
    });
  });
  function close() {
    if (active === null) return;
    select(active);
    if (opener) opener.focus({ preventScroll: true });
  }
  info.addEventListener("click", (ev) => { if (ev.target.closest(".map-info-close")) close(); });
  container.addEventListener("keydown", (ev) => { if (ev.key === "Escape") close(); });
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
  const addEdge = (from, to, type, note) => {
    if (!index[from] || !index[to]) return;
    edges.push({ from: index[from], to: index[to], type, note });
  };

  MUSEUMS.forEach((m) => {
    // The "add your own" template isn't a real place — keep it out of the graph.
    if (m.id === "template") return;
    addNode(m.id, "museum", m.name, { emoji: m.emoji, city: m.city, href: routePageFor(m.id) + "#" + m.id });
    m.floors.forEach((f) =>
      f.areas.forEach((a) => {
        addNode(a.id, "gallery", a.name, { museumId: m.id, galleries: a.galleries, href: routePageFor(m.id) + "#" + a.id });
        addEdge(m.id, a.id, "contains");
        a.civs.forEach((slug) => {
          const c = getCiv(slug);
          if (!c) return;
          addNode(c.slug, "civ", c.name, {
            emoji: c.emoji, accent: c.accent, group: c.group,
            start: c.start, end: c.end, spanLabel: c.spanLabel,
            href: "reader.html?c=" + c.slug
          });
          addEdge(a.id, c.slug, "at");
        });
      })
    );
  });

  // Masterpiece objects hang off their civilization.
  if (typeof MASTERPIECES !== "undefined") {
    MASTERPIECES.forEach((mp) => {
      if (!index[mp.civ]) return;
      const civ = getCiv(mp.civ);
      addNode(mp.id, "object", mp.name, {
        emoji: mp.emoji, accent: civ ? civ.accent : "#0f6ab4",
        date: mp.date, group: civ ? civ.group : "",
        start: civ ? civ.start : null, end: civ ? civ.end : null,
        href: "objects.html#" + mp.id
      });
      addEdge(mp.civ, mp.id, "object");
    });
  }

  CIV_RELATIONS.forEach((r) => addEdge(r.from, r.to, r.type, r.note));
  return { nodes, edges };
}

function computeGraphLayout(nodes, edges, W, H) {
  const pos = {};
  let seed = 42;
  const rnd = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296 - 0.5; };
  nodes.forEach((n) => {
    pos[n.id] = { x: W / 2 + rnd() * W * 0.55, y: H / 2 + rnd() * H * 0.55 };
  });

  // seed museums on a ring, then galleries/civs near their parent
  const museums = nodes.filter((n) => n.type === "museum");
  museums.forEach((n, i) => {
    const ang = (i / Math.max(1, museums.length)) * Math.PI * 2;
    pos[n.id] = {
      x: W / 2 + Math.cos(ang) * Math.min(W, H) * 0.36,
      y: H / 2 + Math.sin(ang) * Math.min(W, H) * 0.36
    };
  });
  edges.forEach((e) => {
    const a = pos[e.from.id], b = pos[e.to.id];
    if (!a || !b) return;
    if (e.type === "contains") { b.x = a.x + rnd() * 170; b.y = a.y + rnd() * 170; }
    if (e.type === "at") { b.x = a.x + rnd() * 150; b.y = a.y + rnd() * 150; }
    if (e.type === "object") { b.x = a.x + rnd() * 60; b.y = a.y + rnd() * 60; }
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

  // Barnes-Hut is overkill here, but O(n²) on ~250 nodes × 380 iterations is
  // noticeable on a phone — so scale the iteration count with the node count.
  const ITER = nodes.length > 200 ? 260 : 380;
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
      const rest = e.type === "contains" ? 130 : e.type === "at" ? 95 : e.type === "object" ? 55 : 175;
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

const GRAPH_EDGE_COLORS = {
  contains: "#b7c0ce", at: "#c9d2dd", object: "#f59e0b",
  influenced: "#e2b93b", successor: "#34a853", predecessor: "#34a853",
  contemporary: "#94a3b8", neighbor: "#94a3b8", region: "#a78bfa",
  trade: "#0ea5e9", script: "#ec4899", conquest: "#ef4444", religion: "#8b5cf6"
};

function renderGraph(container) {
  if (!container) return;
  const { nodes, edges } = buildGraph();
  const W = 1200, H = 900;
  const pos = computeGraphLayout(nodes, edges, W, H);

  const radius = (n) =>
    n.type === "museum" ? 24 : n.type === "civ" ? 14 : n.type === "object" ? 8 : 10;
  const fill = (n) =>
    n.type === "museum" ? "#b45309"
    : n.type === "gallery" ? "#94a3b8"
    : n.type === "object" ? "#f59e0b"
    : (n.accent || "#0f6ab4");

  let s = `<svg class="graph-svg" viewBox="0 0 ${W} ${H}" role="group" aria-label="Connection graph. Choose a node using the selector above or the markers.">`;
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="transparent" class="graph-bg"/><g class="graph-view">`;

  edges.forEach((e, i) => {
    const a = pos[e.from.id], b = pos[e.to.id];
    if (!a || !b) return;
    const col = GRAPH_EDGE_COLORS[e.type] || "#c9d2dd";
    const dashed = e.type === "contemporary" || e.type === "region";
    s += `<line class="g-edge" data-i="${i}" data-from="${esc(e.from.id)}" data-to="${esc(e.to.id)}" data-etype="${esc(e.type)}"`
      + ` x1="${a.x.toFixed(1)}" y1="${a.y.toFixed(1)}" x2="${b.x.toFixed(1)}" y2="${b.y.toFixed(1)}"`
      + ` stroke="${col}" stroke-width="${e.type === "contains" ? 2 : 1.2}"${dashed ? ' stroke-dasharray="4 4"' : ""} opacity="0.5"/>`;
  });

  nodes.forEach((n) => {
    const p = pos[n.id];
    const r = radius(n);
    const col = fill(n);
    const isMuseum = n.type === "museum";
    const isCiv = n.type === "civ";
    s += `<g class="g-node" data-id="${esc(n.id)}" data-type="${esc(n.type)}" data-group="${esc(n.group || "")}"`
      + ` data-start="${n.start != null ? n.start : ""}" data-end="${n.end != null ? n.end : ""}"`
      + ` data-museum="${esc(n.museumId || "")}" tabindex="0" role="button" aria-label="${esc(n.label)}">`;
    // A transparent fat circle underneath gives fingers a 44px target.
    s += `<circle class="g-hit" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${Math.max(r + 10, 22)}" fill="transparent"/>`;
    s += `<circle class="g-circle" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${r}" fill="${col}" stroke="#fff" stroke-width="${isMuseum ? 2.5 : 1.4}"/>`;
    if (isMuseum || isCiv) {
      const label = isMuseum ? (n.label.length > 28 ? n.label.slice(0, 27) + "…" : n.label) : (n.emoji ? n.emoji + " " + n.label : n.label);
      const fy = p.y + r + (isMuseum ? 16 : 13);
      s += `<text class="g-label ${isMuseum ? "g-label-museum" : "g-label-civ"}" x="${p.x.toFixed(1)}" y="${fy.toFixed(1)}" text-anchor="middle">${esc(label)}</text>`;
    } else {
      s += `<title>${esc(n.label)}</title>`;
    }
    s += `</g>`;
  });
  s += `</g></svg>`;

  container.innerHTML = `
    <div class="graph-picker">
      <label for="graph-node-select">Inspect a connection</label>
      <select id="graph-node-select">
        <option value="">Choose a museum, gallery, civilization, or object</option>
        ${[...nodes].sort((a, b) => a.label.localeCompare(b.label)).map((n) => `<option value="${esc(n.id)}">${esc(n.label)} · ${n.type === "civ" ? "civilization" : n.type}</option>`).join("")}
      </select>
    </div>
    <div class="graph-toolbar">
      <div class="graph-legend" id="graph-legend"></div>
      <div class="graph-filters" id="graph-filters"></div>
    </div>
    <div class="graph-timeslider" id="graph-time">
      <label for="time-range">Year</label>
      <input id="time-range" aria-valuetext="All time" type="range" min="-4000" max="2025" step="25" value="2025" />
      <output id="time-out">all time</output>
      <button type="button" class="time-btn" id="time-play" aria-label="Play through time">Play</button>
      <button type="button" class="time-btn subtle" id="time-reset">All</button>
    </div>
    <div class="graph-controls" role="group" aria-label="Graph view controls">
      <button type="button" class="map-btn" id="graph-zoom-out" aria-label="Zoom out">−</button>
      <button type="button" class="map-btn" id="graph-zoom-in" aria-label="Zoom in">+</button>
      <button type="button" class="map-btn" id="graph-reset">Fit graph</button>
      <button type="button" class="map-btn" id="graph-interact" aria-pressed="false">Touch pan: off</button>
    </div>
    <p class="graph-help">Choose a node to read its connections. Use + / − to zoom, or drag with a mouse. On a phone, turn on touch pan to drag and pinch; leave it off to scroll the page.</p>
    <div class="graph-stage">${s}</div>
    <div class="graph-info" id="graph-info" role="region" aria-label="Selected connection" aria-live="polite"></div>`;

  wireGraph(container, nodes, edges);
}

function wireGraph(container, nodes, edges) {
  const svg = container.querySelector(".graph-svg");
  const info = container.querySelector("#graph-info");
  const legend = container.querySelector("#graph-legend");
  const filters = container.querySelector("#graph-filters");
  const nodeSelect = container.querySelector("#graph-node-select");
  if (!svg) return;

  legend.innerHTML = `
    <span class="lg"><span class="lg-dot" style="background:#b45309"></span>museum</span>
    <span class="lg"><span class="lg-dot" style="background:#94a3b8"></span>gallery</span>
    <span class="lg"><span class="lg-dot" style="background:#0f6ab4"></span>civilization</span>
    <span class="lg"><span class="lg-dot" style="background:#f59e0b"></span>object</span>
    <span class="lg"><span class="lg-line" style="background:#e2b93b"></span>influenced</span>
    <span class="lg"><span class="lg-line" style="background:#0ea5e9"></span>trade</span>
    <span class="lg"><span class="lg-line" style="background:#ec4899"></span>script</span>
    <span class="lg"><span class="lg-line" style="background:#ef4444"></span>conquest</span>
    <span class="lg"><span class="lg-line" style="background:#8b5cf6"></span>religion</span>`;

  const regions = Array.from(new Set(nodes.filter((n) => n.type === "civ").map((n) => n.group)));
  let fhtml = `<button type="button" aria-pressed="true" class="filt-chip on" data-type="museum">Museums</button>`
    + `<button type="button" aria-pressed="false" class="filt-chip" data-type="gallery">Galleries</button>`
    + `<button type="button" aria-pressed="true" class="filt-chip on" data-type="civ">Civilizations</button>`
    + `<button type="button" aria-pressed="true" class="filt-chip on" data-type="object">Objects</button>`
    + `<span class="filt-sep" aria-hidden="true"></span>`;
  regions.forEach((r) => { fhtml += `<button type="button" aria-pressed="true" class="filt-chip on" data-region="${esc(r)}">${esc(r)}</button>`; });
  filters.innerHTML = fhtml;

  const nodeEls = Array.from(container.querySelectorAll(".g-node"));
  const edgeEls = Array.from(container.querySelectorAll(".g-edge"));
  const byId = {};
  nodeEls.forEach((el) => { byId[el.getAttribute("data-id")] = el; });

  const nodeMap = {};
  nodes.forEach((n) => { nodeMap[n.id] = n; });
  const edgeMap = {};
  edges.forEach((e, i) => { edgeMap[i] = e; });

  const visibleTypes = { museum: true, gallery: false, civ: true, object: true };
  const hiddenRegions = {};
  let year = null;                 // null = show all time
  const collapsed = {};            // museumId -> true when its galleries are hidden

  const inYear = (el) => {
    if (year == null) return true;
    const s = el.getAttribute("data-start");
    const e = el.getAttribute("data-end");
    if (s === "" || e === "") return true;   // museums/galleries are timeless
    return year >= parseFloat(s) && year <= parseFloat(e);
  };

  const applyVisibility = () => {
    nodeEls.forEach((el) => {
      const t = el.getAttribute("data-type");
      const g = el.getAttribute("data-group");
      const parentMuseum = el.getAttribute("data-museum");
      let hidden = !visibleTypes[t];
      if (!hidden && (t === "civ" || t === "object") && hiddenRegions[g]) hidden = true;
      if (!hidden && t === "gallery" && parentMuseum && collapsed[parentMuseum]) hidden = true;
      el.style.display = hidden ? "none" : "";
      // Out-of-period nodes fade rather than vanish, so the shape of the graph
      // stays legible while you scrub.
      el.classList.toggle("out-of-time", !hidden && !inYear(el));
    });
    edgeEls.forEach((el) => {
      const a = byId[el.getAttribute("data-from")];
      const b = byId[el.getAttribute("data-to")];
      const hidden = (a && a.style.display === "none") || (b && b.style.display === "none");
      el.style.display = hidden ? "none" : "";
      const dim = (a && a.classList.contains("out-of-time")) || (b && b.classList.contains("out-of-time"));
      el.classList.toggle("out-of-time", !hidden && !!dim);
    });
  };

  filters.addEventListener("click", (ev) => {
    const chip = ev.target.closest && ev.target.closest(".filt-chip");
    if (!chip) return;
    const t = chip.getAttribute("data-type");
    const r = chip.getAttribute("data-region");
    if (t) { visibleTypes[t] = !visibleTypes[t]; chip.classList.toggle("on", visibleTypes[t]); }
    if (r) { hiddenRegions[r] = !hiddenRegions[r]; chip.classList.toggle("on", !hiddenRegions[r]); }
    chip.setAttribute("aria-pressed", String(chip.classList.contains("on")));
    applyVisibility();
    if (selected && byId[selected].style.display === "none") closeInfo();
  });

  /* ---- time slider ---- */
  const range = container.querySelector("#time-range");
  const out = container.querySelector("#time-out");
  const playBtn = container.querySelector("#time-play");
  const resetBtn = container.querySelector("#time-reset");
  let timer = null;

  const setYear = (y) => {
    year = y;
    if (out) out.textContent = y == null ? "all time" : formatYear(y);
    if (range) range.setAttribute("aria-valuetext", y == null ? "All time" : formatYear(y));
    applyVisibility();
  };
  if (range) {
    range.addEventListener("input", () => setYear(parseInt(range.value, 10)));
  }
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      stopPlay();
      if (range) range.value = "2025";
      setYear(null);
    });
  }
  function stopPlay() {
    if (timer) { clearInterval(timer); timer = null; }
    if (playBtn) { playBtn.textContent = "Play"; playBtn.setAttribute("aria-label", "Play through time"); }
  }
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (timer) { stopPlay(); return; }
      let y = year == null ? -4000 : year;
      if (y >= 2025) y = -4000;
      playBtn.textContent = "Pause";
      playBtn.setAttribute("aria-label", "Pause");
      timer = setInterval(() => {
        y += 50;
        if (y > 2025) { y = 2025; stopPlay(); }
        if (range) range.value = String(y);
        setYear(y);
      }, 90);
    });
  }

  /* ---- neighbours & inspection ---- */
  const neighbors = {};
  edges.forEach((e) => {
    (neighbors[e.from.id] = neighbors[e.from.id] || new Set()).add(e.to.id);
    (neighbors[e.to.id] = neighbors[e.to.id] || new Set()).add(e.from.id);
  });
  const edgesOf = {};
  edges.forEach((e, i) => {
    (edgesOf[e.from.id] = edgesOf[e.from.id] || []).push(i);
    (edgesOf[e.to.id] = edgesOf[e.to.id] || []).push(i);
  });

  const typeLabelOf = (t) =>
    t === "museum" ? "Museum" : t === "gallery" ? "Gallery" : t === "object" ? "Object" : "Civilization";

  const setInfo = (n) => {
    if (!info) return;
    if (!n) { info.classList.remove("active"); info.innerHTML = ""; return; }
    const links = (edgesOf[n.id] || [])
      .map((i) => edgeMap[i])
      .filter((e) => e.note)
      .slice(0, 4)
      .map((e) => {
        const other = e.from.id === n.id ? e.to : e.from;
        const lbl = (typeof REL_LABELS !== "undefined" && REL_LABELS[e.type]) || e.type;
        return `<li><b>${esc(lbl)}</b> ${esc(other.label)} — ${esc(e.note)}</li>`;
      }).join("");
    const isMuseum = n.type === "museum";
    info.innerHTML = `
      <button class="graph-info-close" type="button" aria-label="Close connection details">×</button>
      <div class="graph-info-title">${n.emoji ? esc(n.emoji) + " " : ""}${esc(n.label)}</div>
      <div class="graph-info-type">${typeLabelOf(n.type)}${n.group ? " · " + esc(n.group) : ""}${n.spanLabel ? " · " + esc(n.spanLabel) : ""}${n.galleries ? " · " + esc(n.galleries) : ""}${n.date ? " · " + esc(n.date) : ""}</div>
      ${links ? `<ul class="graph-info-links">${links}</ul>` : ""}
      <div class="graph-info-actions">
        <a class="route-btn" href="${esc(n.href)}">Open &rarr;</a>
        ${isMuseum ? `<button class="route-btn subtle" type="button" data-toggle="${esc(n.id)}">${collapsed[n.id] ? "Expand galleries" : "Collapse galleries"}</button>` : ""}
      </div>`;
    info.classList.add("active");
  };

  if (info) {
    info.addEventListener("click", (ev) => {
      if (ev.target.closest(".graph-info-close")) {
        closeInfo(); nodeSelect.focus({ preventScroll: true }); return;
      }
      const btn = ev.target.closest("[data-toggle]");
      if (btn) {
        const id = btn.getAttribute("data-toggle");
        collapsed[id] = !collapsed[id];
        btn.textContent = collapsed[id] ? "Expand galleries" : "Collapse galleries";
        applyVisibility();
      }
    });
  }

  const highlight = (id) => {
    const nb = neighbors[id] || new Set();
    nodeEls.forEach((el) => {
      const elid = el.getAttribute("data-id");
      el.classList.toggle("faded", !(elid === id || nb.has(elid)));
      el.classList.toggle("focused", elid === id);
    });
    edgeEls.forEach((el) => {
      const on = el.getAttribute("data-from") === id || el.getAttribute("data-to") === id;
      el.classList.toggle("faded", !on);
      el.classList.toggle("lit", on);
    });
  };
  const unhighlight = () => {
    nodeEls.forEach((el) => { el.classList.remove("faded", "focused"); });
    edgeEls.forEach((el) => { el.classList.remove("faded", "lit"); });
  };

  const hasHover = window.matchMedia && window.matchMedia("(hover: hover)").matches;
  let selected = null;

  function closeInfo() {
    selected = null;
    nodeSelect.value = "";
    setInfo(null);
    unhighlight();
  }
  const select = (id) => {
    const node = nodeMap[id];
    if (!node) return;
    // A selection from the native picker must be visible even if its type,
    // region, or parent museum was filtered/collapsed. Museums reveal galleries.
    visibleTypes[node.type] = true;
    if (node.type === "museum") visibleTypes.gallery = true;
    if (node.group) hiddenRegions[node.group] = false;
    if (node.museumId) collapsed[node.museumId] = false;
    filters.querySelectorAll("[data-type], [data-region]").forEach((chip) => {
      const on = chip.dataset.type ? visibleTypes[chip.dataset.type] : !hiddenRegions[chip.dataset.region];
      chip.classList.toggle("on", on);
      chip.setAttribute("aria-pressed", String(on));
    });
    applyVisibility();
    if (selected === id) {
      // Second tap on a museum expands/collapses its galleries in place.
      const n = nodeMap[id];
      if (n && n.type === "museum") {
        collapsed[id] = !collapsed[id];
        applyVisibility();
        setInfo(n);
      }
      return;
    }
    selected = id;
    nodeSelect.value = id;
    highlight(id);
    setInfo(nodeMap[id]);
  };

  nodeEls.forEach((el) => {
    const id = el.getAttribute("data-id");
    if (hasHover) {
      el.addEventListener("mouseenter", () => { if (!selected) highlight(id); });
      el.addEventListener("mouseleave", () => { if (!selected) unhighlight(); });
    }
    el.addEventListener("click", (ev) => { ev.stopPropagation(); select(id); });
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(id); }
    });
  });

  /* ---- explicit zoom controls; scrolling the page never traps you in the graph ---- */
  const stage = container.querySelector(".graph-stage");
  const graphView = container.querySelector(".graph-view");
  const interactButton = container.querySelector("#graph-interact");
  const view = { x: 0, y: 0, k: 1 };
  let interactive = false, moved = false;
  function applyView() {
    graphView.setAttribute("transform", `translate(${view.x},${view.y}) scale(${view.k})`);
    container.querySelector("#graph-zoom-out").disabled = view.k <= 0.2;
    container.querySelector("#graph-zoom-in").disabled = view.k >= 6;
  }
  function zoom(factor, point = { x: 600, y: 450 }) {
    const next = Math.max(0.2, Math.min(6, view.k * factor));
    const ratio = next / view.k;
    view.x = point.x - (point.x - view.x) * ratio;
    view.y = point.y - (point.y - view.y) * ratio;
    view.k = next;
    applyView();
  }
  function svgPoint(event) {
    return new DOMPoint(event.clientX, event.clientY).matrixTransform(svg.getScreenCTM().inverse());
  }
  container.querySelector("#graph-zoom-in").addEventListener("click", () => zoom(1.3));
  container.querySelector("#graph-zoom-out").addEventListener("click", () => zoom(1 / 1.3));
  container.querySelector("#graph-reset").addEventListener("click", () => {
    const k = Math.max(0.2, Math.min(stage.clientWidth / 1200, stage.clientHeight / 900));
    Object.assign(view, { x: 600 * (1 - k), y: 450 * (1 - k), k }); applyView();
  });
  interactButton.addEventListener("click", () => {
    interactive = !interactive;
    stage.classList.toggle("is-interactive", interactive);
    interactButton.setAttribute("aria-pressed", String(interactive));
    interactButton.textContent = interactive ? "Touch pan: on" : "Touch pan: off";
  });
  nodeSelect.addEventListener("change", () => {
    if (!nodeSelect.value) { closeInfo(); return; }
    select(nodeSelect.value);
    const circle = byId[nodeSelect.value].querySelector(".g-circle");
    view.k = 2;
    view.x = 600 - Number(circle.getAttribute("cx")) * view.k;
    view.y = 450 - Number(circle.getAttribute("cy")) * view.k;
    applyView();
  });

  const pointers = new Map();
  let gesture = null;
  function beginGesture() {
    const points = [...pointers.values()];
    if (!points.length) { gesture = null; return; }
    const center = points.length > 1
      ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      : points[0];
    gesture = { center, view: { ...view }, distance: points.length > 1 ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) : 0 };
  }
  svg.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "mouse" && !interactive) return;
    if (event.button !== 0) return;
    moved = false;
    pointers.set(event.pointerId, svgPoint(event));
    beginGesture();
  });
  window.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId) || !gesture) return;
    pointers.set(event.pointerId, svgPoint(event));
    const points = [...pointers.values()];
    const center = points.length > 1
      ? { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 }
      : points[0];
    const deltaX = center.x - gesture.center.x, deltaY = center.y - gesture.center.y;
    if (!moved && Math.hypot(deltaX, deltaY) * svg.getScreenCTM().a < 5 && points.length < 2) return;
    moved = true;
    if (!svg.hasPointerCapture(event.pointerId)) svg.setPointerCapture(event.pointerId);
    const ratio = points.length > 1 && gesture.distance
      ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) / gesture.distance : 1;
    view.k = Math.max(0.2, Math.min(6, gesture.view.k * ratio));
    view.x = center.x - (gesture.center.x - gesture.view.x) * view.k / gesture.view.k;
    view.y = center.y - (gesture.center.y - gesture.view.y) * view.k / gesture.view.k;
    applyView();
  });
  function endPointer(event) {
    pointers.delete(event.pointerId);
    beginGesture();
  }
  window.addEventListener("pointerup", endPointer);
  window.addEventListener("pointercancel", endPointer);
  // Suppress the synthetic click after a drag, but leave taps and keyboard use intact.
  svg.addEventListener("click", (event) => {
    if (moved) { event.preventDefault(); event.stopImmediatePropagation(); moved = false; return; }
    if (!event.target.closest(".g-node")) closeInfo();
  }, true);
  svg.addEventListener("wheel", (event) => {
    if (!interactive && !event.ctrlKey) return;
    event.preventDefault();
    zoom(event.deltaY > 0 ? 1 / 1.12 : 1.12, svgPoint(event));
  }, { passive: false });
  container.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeInfo();
  });
  applyView();

  window.addEventListener("pagehide", stopPlay);
  document.addEventListener("visibilitychange", () => { if (document.hidden) stopPlay(); });
  container.closest("details").addEventListener("toggle", (event) => { if (!event.target.open) stopPlay(); });
  applyVisibility();
  setInfo(null);
}

function renderRoutes() {
  const app = document.getElementById("app");
  const groups = [
    { name: "New York", ids: ["met"] },
    { name: "San Francisco Bay Area", ids: ["deyoung", "legion", "aam", "rosicrucian"] },
    { name: "Washington, DC (Smithsonian)", ids: ["nmnh", "faaa", "nmafa", "nmai"] },
    { name: "Europe", ids: ["britishmuseum", "louvre", "berlin"] },
    { name: "Anywhere else", ids: ["template"] }
  ];
  let html = `
  <header class="hero">
    <h1>Museums, on a map.</h1>
    <p class="lede">${MUSEUMS.filter((m) => m.id !== "template").length} museums across ${geoClusters().length} cities. Pick a place for a floor-by-floor route and the civilizations you’ll meet.</p>
    <div class="route-links">
      <a class="route-btn" href="#museum-list">Museum routes ↓</a>
      <a class="route-btn subtle" href="tours.html">Timed tours &rarr;</a>
    </div>
  </header>

  <section class="panel map-panel">
    <div class="panel-head">
      <h2>Where the museums are</h2>
      <span class="hint">Choose a numbered marker or a city</span>
    </div>
    <div class="panel-body">
      <div id="geo-map"></div>
    </div>
  </section>`;

  html += `<div id="museum-list">`;
  groups.forEach(({ name, ids }) => {
    html += `<h2 class="group-head">${esc(name)}</h2><div class="route-grid">`;
    ids.forEach((id) => {
      const m = getMuseum(id);
      if (!m) return;
      const areaCount = m.floors.reduce((n, f) => n + f.areas.length, 0);
      const civCount = new Set(m.floors.flatMap((f) => f.areas.flatMap((a) => a.civs))).size;
      html += `
      <a class="museum-card" href="${esc(routePageFor(m.id))}#${esc(m.id)}">
        <div class="museum-card-top"><span class="museum-card-emoji">${m.emoji}</span><h3>${esc(m.name)}</h3></div>
        <div class="museum-card-city">${esc(m.city)}</div>
        <p>${esc(m.tagline)}</p>
        <div class="museum-card-meta">${areaCount} gallery area${areaCount === 1 ? "" : "s"} · ${civCount} civilizations</div>
        <span class="card-go">Open route &rarr;</span>
      </a>`;
    });
    html += `</div>`;
  });

  html += `
  </div>
  <details class="panel graph-panel" id="graph">
    <summary class="panel-head">
      <h2>Explore the connection graph</h2>
      <span class="hint">Museums, galleries, civilizations &amp; objects</span>
      <span class="panel-chev" aria-hidden="true">▾</span>
    </summary>
    <div class="panel-body">
      <div id="graph-host"></div>
    </div>
  </details>
  <footer class="foot">Gallery and exhibit names change with reinstalls — always cross-check the museum's current map. <a href="index.html">All civilization readers &rarr;</a></footer>`;
  app.innerHTML = html;
  document.title = "Museums, on a map — Civilization Readers";
  renderGeoMap(document.getElementById("geo-map"));
  const graph = document.getElementById("graph");
  const host = document.getElementById("graph-host");
  graph.addEventListener("toggle", () => {
    if (graph.open && !host.childElementCount && !graph.dataset.printOpen) renderGraph(host);
  });
  wireCollapsiblePanels();
}

/* ---------------- masterpieces (objects.html) ---------------- */

function renderObjects() {
  const app = document.getElementById("app");
  const list = typeof MASTERPIECES !== "undefined" ? MASTERPIECES : [];

  let html = `
  <header class="hero">
    <h1>One object, sixty seconds.</h1>
    <p class="lede">A deep dive on a single iconic piece per civilization — what it is, why it matters, and the specific things to look for while you're standing in front of it. Read one before you get to the case; you'll see about three times as much.</p>
    <div class="search-wrap">
      <input id="obj-search" aria-label="Search objects" type="search" placeholder="Search objects — try &ldquo;gold&rdquo;, &ldquo;helmet&rdquo;, &ldquo;bronze&rdquo;&hellip;" autocomplete="off" enterkeyhint="search" />
    </div>
    <div class="route-links">
      <a class="route-btn" href="index.html">All civilizations &rarr;</a>
      <a class="route-btn subtle" href="tours.html">Tours</a>
      <a class="route-btn subtle" href="guide.html">Label decoder</a>
    </div>
  </header>

  <div class="mp-grid">`;

  list.forEach((m) => {
    const civ = getCiv(m.civ);
    const accent = civ ? civ.accent : "#0f6ab4";
    const hay = [m.name, m.date, m.material, m.where, m.hook, m.read, m.lookFor.join(" "), civ ? civ.name : ""].join(" ").toLowerCase();
    html += `
    <article class="mp-card" id="${esc(m.id)}" data-search="${esc(hay)}" style="--c:${accent};--c-soft:${hexToRgba(accent, 0.13)}">
      <div class="mp-head">
        <span class="mp-emoji" aria-hidden="true">${m.emoji}</span>
        <div class="mp-titles">
          <h2>${esc(m.name)}</h2>
          <div class="mp-meta">${esc(m.date)} &middot; ${esc(m.material)}</div>
          <div class="mp-where">📍 ${esc(m.where)}</div>
        </div>
      </div>
      <p class="mp-hook">${esc(m.hook)}</p>
      <p class="mp-read">${esc(m.read)}</p>
      <div class="mp-look">
        <h4>Look for</h4>
        <ul>${m.lookFor.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
      </div>
      ${civ ? `<a class="mp-more" href="reader.html?c=${esc(civ.slug)}">${civ.emoji} Read ${esc(civ.name)} &rarr;</a>` : ""}
    </article>`;
  });

  html += `</div>
  <div class="no-results" id="no-results" role="status">No objects match &ldquo;<span id="no-results-q"></span>&rdquo;.</div>
  <footer class="foot">Locations change — objects go on loan, into storage, or into a new gallery. Check the museum's collection site with the accession number on the label. <a href="index.html">All civilization readers &rarr;</a></footer>`;

  app.innerHTML = html;
  wireFilter("#obj-search", ".mp-card");
  document.title = "Masterpieces — Civilization Readers";
  jumpToHash();
}

/* ---------------- tours (tours.html) ---------------- */

function renderTours() {
  const app = document.getElementById("app");
  const list = typeof TOURS !== "undefined" ? TOURS : [];

  let html = `
  <header class="hero">
    <h1>Start here. You have ninety minutes.</h1>
    <p class="lede">Encyclopedic museums are unwinnable — the honest move is to pick a route and skip the rest without guilt. Each tour below is a timed sequence of stops with the reader to open at each one, ordered so you don't double back.</p>
    <div class="route-links">
      <a class="route-btn" href="routes.html">All museums on a map &rarr;</a>
      <a class="route-btn subtle" href="index.html">All civilizations</a>
      <a class="route-btn subtle" href="objects.html">Masterpieces</a>
    </div>
  </header>

  <div class="tour-cards">`;

  list.forEach((t) => {
    const m = getMuseum(t.museum);
    html += `
      <a class="tour-card" href="#${esc(t.id)}">
        <div class="tour-card-top">${m ? m.emoji : "🏛️"} <b>${esc(t.name)}</b></div>
        <div class="tour-card-meta">${t.stops.length} stops · ${t.minutes} min</div>
      </a>`;
  });
  html += `</div>`;

  list.forEach((t) => {
    const m = getMuseum(t.museum);
    const total = t.stops.reduce((n, s) => n + s.minutes, 0);
    let clock = 0;
    html += `
    <section class="tour" id="${esc(t.id)}">
      <div class="tour-head">
        <div class="tour-emoji">${m ? m.emoji : "🏛️"}</div>
        <div>
          <h2>${esc(t.name)}</h2>
          <div class="tour-sub">${m ? esc(m.name) + " · " + esc(m.city) : ""} · ${t.stops.length} stops · about ${total} minutes</div>
        </div>
      </div>
      <p class="tour-blurb">${esc(t.blurb)}</p>
      <ol class="tour-stops">`;

    t.stops.forEach((s, i) => {
      const at = clock;
      clock += s.minutes;
      const area = findArea(s.area);
      const civs = (s.civs || []).map(getCiv).filter(Boolean);
      html += `
        <li class="tour-stop">
          <div class="tour-stop-rail">
            <span class="tour-num">${i + 1}</span>
            <span class="tour-clock">${at === 0 ? "start" : "+" + at + " min"}</span>
          </div>
          <div class="tour-stop-body">
            <h3>${esc(s.title)}</h3>
            ${area ? `<div class="tour-gal">${esc(area.area.galleries)}${area.museum.id !== t.museum ? " · " + esc(area.museum.name) : ""}</div>` : ""}
            <p class="tour-what">${esc(s.what)}</p>
            <p class="tour-why"><b>Why:</b> ${esc(s.why)}</p>
            <div class="tour-time">${s.minutes} min</div>
            <div class="route-pills">
              ${civs.map((c) => `<a class="route-pill" style="--c:${c.accent};--c-soft:${hexToRgba(c.accent, 0.13)}" href="reader.html?c=${esc(c.slug)}">${c.emoji} ${esc(c.name)}</a>`).join("")}
            </div>
          </div>
        </li>`;
    });

    html += `</ol>
      ${t.tips && t.tips.length ? `
      <div class="tour-tips">
        <h4>Before you go</h4>
        <ul>${t.tips.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>` : ""}
      ${m ? `<a class="route-btn subtle" href="${esc(routePageFor(m.id))}">Full gallery map for ${esc(m.name)} &rarr;</a>` : ""}
    </section>`;
  });

  html += `<footer class="foot">Timings assume you walk past most things. That is the point — a museum visit you finish beats one you abandon. <a href="routes.html">All museums &rarr;</a></footer>`;
  app.innerHTML = html;
  document.title = "Start-here tours — Civilization Readers";
  jumpToHash();
}

function findArea(areaId) {
  for (const m of MUSEUMS) {
    for (const f of m.floors) {
      for (const a of f.areas) {
        if (a.id === areaId) return { museum: m, floor: f, area: a };
      }
    }
  }
  return null;
}

/* ---------------- guide (guide.html) ---------------- */

function renderGuide() {
  const app = document.getElementById("app");
  const glossary = typeof GLOSSARY !== "undefined" ? GLOSSARY : [];
  const resources = typeof RESOURCES !== "undefined" ? RESOURCES : [];

  // Every civilization's label lingo, merged and sorted — the full decoder.
  // A handful of terms (repoussé, slip, lost-wax casting) are general enough to
  // already be in the glossary above; don't print them twice.
  const general = {};
  glossary.forEach((g) => { general[g.t.toLowerCase()] = true; });
  const lingo = [];
  const seen = {};
  CIVILIZATIONS.forEach((c) => {
    (c.museum.lingo || []).forEach((l) => {
      const key = l.t.toLowerCase();
      if (general[key]) return;
      if (seen[key]) {
        if (seen[key].civs.indexOf(c) === -1) seen[key].civs.push(c);
        return;
      }
      seen[key] = { t: l.t, d: l.d, civs: [c] };
      lingo.push(seen[key]);
    });
  });
  lingo.sort((a, b) => a.t.localeCompare(b.t));

  let html = `
  <header class="hero">
    <h1>The label said &ldquo;Figure. Wood.&rdquo; Now what?</h1>
    <p class="lede">A decoder for museum labels, a glossary of the words that show up on them, and the reference sites worth having bookmarked when the wall text gives you a title and no date.</p>
    <div class="search-wrap">
      <input id="guide-search" aria-label="Search the glossary" type="search" placeholder="Search terms — try &ldquo;faience&rdquo;, &ldquo;provenance&rdquo;, &ldquo;stela&rdquo;&hellip;" autocomplete="off" enterkeyhint="search" />
    </div>
    <div class="route-links">
      <a class="route-btn" href="index.html">All civilizations &rarr;</a>
      <a class="route-btn subtle" href="objects.html">Masterpieces</a>
      <a class="route-btn subtle" href="tours.html">Tours</a>
    </div>
  </header>

  <section class="panel">
    <div class="panel-head">
      <h2>How to read a thin label</h2>
      <span class="hint">the de Young method — when all you get is a title</span>
    </div>
    <div class="panel-body">
      <ol class="howto">
        <li><b>Find the culture, not the object.</b> &ldquo;Yoruba&rdquo; or &ldquo;Chimú&rdquo; on the label is enough — open that reader and the timeline gives you the date range the label didn't.</li>
        <li><b>Read the material.</b> Wood means it's probably under 200 years old in a tropical climate; bronze, stone, and ceramic can be millennia older. Faience, jade, and lacquer each point to specific regions.</li>
        <li><b>Look for function.</b> Holes, lugs, wear, and soot tell you whether something was carried, worn, poured from, or burned in. A processional bronze has carrying holes; a votive figure doesn't.</li>
        <li><b>Check the acquisition line.</b> &ldquo;Gift of&rdquo;, &ldquo;Purchase&rdquo;, and any date around 1897 (Benin), 1860s (Rapa Nui), or 1933–45 (Europe) is part of the object's history, not fine print.</li>
        <li><b>Photograph the accession number.</b> Then search it on the museum's collection site later — the online record is usually ten times longer than the wall label.</li>
        <li><b>Ask the guard.</b> Genuinely: gallery attendants often know which pieces moved, what's on loan, and what the curators said at the install.</li>
      </ol>
    </div>
  </section>

  <div class="section-title">
    <div>
      <h2>Label glossary</h2>
      <div class="sub">The general vocabulary — the words that mean the same thing in every gallery.</div>
    </div>
  </div>
  <div class="gloss-grid">
    ${glossary.map((g) => `
      <div class="gloss" data-search="${esc((g.t + " " + g.d).toLowerCase())}">
        <b>${esc(g.t)}</b>
        <span>${esc(g.d)}</span>
      </div>`).join("")}
  </div>

  <div class="section-title">
    <div>
      <h2>Culture-specific terms</h2>
      <div class="sub">${lingo.length} terms drawn from every reader in this guide — tap one to open the civilization it belongs to.</div>
    </div>
  </div>
  <div class="gloss-grid">
    ${lingo.map((g) => `
      <div class="gloss" data-search="${esc((g.t + " " + g.d + " " + g.civs.map((c) => c.name).join(" ")).toLowerCase())}">
        <b>${esc(g.t)}</b>
        <span>${esc(g.d)}</span>
        <span class="gloss-civs">${g.civs.slice(0, 3).map((c) => `<a href="reader.html?c=${esc(c.slug)}">${c.emoji} ${esc(c.name)}</a>`).join("")}</span>
      </div>`).join("")}
  </div>
  <div class="no-results" id="no-results" role="status">Nothing matches &ldquo;<span id="no-results-q"></span>&rdquo;.</div>

  <div class="section-title">
    <div>
      <h2>Resources &amp; references</h2>
      <div class="sub">Where to check a fact, look up an object, or read further. Free unless noted.</div>
    </div>
  </div>`;

  resources.forEach((sec) => {
    html += `
    <h3 class="res-group">${esc(sec.group)}</h3>
    <div class="res-grid">
      ${sec.items.map((it) => `
        <a class="res-card" href="${esc(it.url)}" ${it.url.indexOf("http") === 0 ? 'target="_blank" rel="noopener"' : ""}>
          <div class="res-name">${esc(it.name)}</div>
          <p>${esc(it.what)}</p>
          <span class="res-host">${esc(hostOf(it.url))}</span>
        </a>`).join("")}
    </div>`;
  });

  html += `
  <section class="panel">
    <div class="panel-head">
      <h2>Sources &amp; how to use this</h2>
    </div>
    <div class="panel-body">
      <p class="src-note">These readers are a high-level orientation, not an academic reference. Dates are conventional and approximate — most ancient chronologies have live scholarly disagreements of decades or centuries, and where a range is contested this guide picks a common one rather than arguing. Gallery numbers and exhibit names change with every reinstallation, so treat them as a hint and check the museum's current map.</p>
      <p class="src-note">Where content touches on living cultures — Aboriginal Australian, Taíno, Māori, Bamana, Senufo, Chokwe, Sepik, and others — it is written in the present tense on purpose. These are not vanished civilizations, and several museum collections of their work have contested acquisition histories. The Resources section above includes provenance and restitution trackers.</p>
      <p class="src-note">Corrections are welcome — everything lives in <code>data.js</code> in this repository.</p>
    </div>
  </section>

  <footer class="foot">Built to be read standing up, one-handed, in bad light, with no signal. <a href="index.html">All civilization readers &rarr;</a></footer>`;

  app.innerHTML = html;
  wireFilter("#guide-search", ".gloss");
  document.title = "Label decoder & resources — Civilization Readers";
  jumpToHash();
}

function hostOf(url) {
  if (url.indexOf("http") !== 0) return "this site";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return "";
  }
}

/* Generic show/hide filter used by objects.html and guide.html. */
function wireFilter(inputSel, itemSel) {
  const input = document.querySelector(inputSel);
  if (!input) return;
  const noResults = document.getElementById("no-results");
  const noResultsQ = document.getElementById("no-results-q");
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(itemSel).forEach((el) => {
      const hay = el.dataset.search || el.textContent.toLowerCase();
      const show = !q || hay.indexOf(q) !== -1;
      el.style.display = show ? "" : "none";
      if (show) visible++;
    });
    // Hide any section heading whose grid is now empty.
    document.querySelectorAll(".section-title, .res-group").forEach((h) => {
      const grid = h.nextElementSibling;
      if (!grid || !grid.classList || !grid.classList.contains("gloss-grid")) return;
      const any = Array.from(grid.querySelectorAll(".gloss")).some((c) => c.style.display !== "none");
      h.style.display = any ? "" : "none";
      grid.style.display = any ? "" : "none";
    });
    if (noResults) {
      noResults.style.display = q && visible === 0 ? "block" : "none";
      if (noResultsQ) noResultsQ.textContent = input.value.trim();
    }
  };
  input.addEventListener("input", apply);
}

/* Anchor links inside dynamically rendered pages need a nudge. */
function jumpToHash() {
  const id = (window.location.hash || "").replace("#", "");
  if (!id) return;
  const el = document.getElementById(id);
  if (el) {
    if (el.matches("details")) el.open = true;
    // Firefox may perform its native fragment scroll after DOMContentLoaded.
    // Resolve the final position after layout, using only the document scroller
    // (not the reader's nested horizontal TOC/timeline scrollers).
    if (jumpToHash.frame) cancelAnimationFrame(jumpToHash.frame);
    jumpToHash.frame = requestAnimationFrame(() => {
      jumpToHash.frame = requestAnimationFrame(() => {
        const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        window.scrollTo({ top: window.scrollY + el.getBoundingClientRect().top - offset, behavior: "instant" });
      });
    });
  }
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
    btn.innerHTML = theme === "dark"
      ? '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></svg>'
      : '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z"/></svg>';
    btn.title = theme === "dark" ? "Switch to light mode" : "Switch to dark mode (good for dim galleries)";
    btn.setAttribute("aria-label", btn.title);
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
  const header = document.createElement("header");
  header.className = "site-header wrap";
  header.innerHTML = '<a class="brand" href="index.html"><span aria-hidden="true">🏺</span> Civilization Readers</a>';
  header.appendChild(btn);
  document.querySelector(".skip-link").after(header);
  applyTheme(document.documentElement.getAttribute("data-theme") || "light");
}

/* ---------------- boot ---------------- */

const PAGES = {
  index: renderIndex,
  reader: renderReader,
  met: renderMet,
  sf: renderSF,
  smithsonian: renderSmithsonian,
  london: renderLondon,
  paris: renderParis,
  berlin: renderBerlin,
  template: renderTemplate,
  routes: renderRoutes,
  objects: renderObjects,
  tours: renderTours,
  guide: renderGuide
};

document.addEventListener("DOMContentLoaded", () => {
  const url = new URL(window.location.href);
  if (url.searchParams.get("__civ_upgrade")?.startsWith("civ-readers-")) {
    url.searchParams.delete("__civ_upgrade");
    history.replaceState(history.state, "", url.href);
  }
  initTheme();
  mountThemeToggle();
  const render = PAGES[document.body.dataset.page];
  if (render) render();
  mountNav();
  mountToTop();
  jumpToHash();
  window.addEventListener("load", jumpToHash, { once: true });
  wirePrint();
  registerOffline();
});

/* Browsers do not reliably print the contents of closed <details>. */
function wirePrint() {
  let closed = [], printing = false;
  window.addEventListener("beforeprint", () => {
    if (printing) return;
    printing = true;
    closed = Array.from(document.querySelectorAll("details:not([open])"));
    closed.forEach((detail) => { detail.dataset.printOpen = "true"; detail.open = true; });
  });
  window.addEventListener("afterprint", () => {
    if (!printing) return;
    closed.forEach((detail) => { detail.open = false; delete detail.dataset.printOpen; });
    closed = [];
    printing = false;
  });
}

function registerOffline() {
  if (!("serviceWorker" in navigator)) return;
  const wasControlled = Boolean(navigator.serviceWorker.controller);
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (wasControlled && !refreshing) {
      refreshing = true;
      window.location.reload();
    }
  });
  navigator.serviceWorker.register("sw.js", { updateViaCache: "none" }).catch(() => {});
}
