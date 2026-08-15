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
  { href: "index.html", label: "Civilizations", icon: "🏺", page: "index" },
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
  const routePages = ["routes", "met", "sf", "smithsonian", "london", "paris", "berlin"];
  const current = routePages.indexOf(page) !== -1 ? "routes" : page;
  const nav = document.createElement("nav");
  nav.id = "site-nav";
  nav.className = "site-nav";
  nav.setAttribute("aria-label", "Sections");
  nav.innerHTML = NAV_LINKS.map(
    (l) =>
      `<a class="nav-item${l.page === current ? " on" : ""}" href="${l.href}">
        <span class="nav-ico" aria-hidden="true">${l.icon}</span>
        <span class="nav-label">${esc(l.label)}</span>
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
  btn.textContent = "↑";
  btn.setAttribute("aria-label", "Back to top");
  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  document.body.appendChild(btn);
  const onScroll = () => btn.classList.toggle("show", window.scrollY > 700);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------------- landing ---------------- */

function renderIndex() {
  const app = document.getElementById("app");
  const groups = byGroup();
  let html = `
  <header class="hero">
    <p class="kicker">Civilization Readers</p>
    <h1>Read a civilization before you walk into the gallery.</h1>
    <p class="lede">A pocket primer for the museum — the <strong>de Young</strong>, the <strong>Met</strong>, or anywhere the label says a title and nothing else. Each reader gives you a <strong>visual timeline</strong> up top (the high-level arc), then <strong>context</strong> and <strong>deeper detail</strong> below, plus a cheat sheet for what you'll actually see on display.</p>
    <div class="how">
      <span class="step"><b>1.</b> Pick a civilization</span>
      <span class="step"><b>2.</b> Scan the timeline</span>
      <span class="step"><b>3.</b> Read the context</span>
      <span class="step"><b>4.</b> Go deeper before (or while) you look</span>
    </div>
    <div class="search-wrap">
      <input id="civ-search" type="search" placeholder="Search — try &ldquo;pyramid&rdquo;, &ldquo;jade&rdquo;, &ldquo;bronze&rdquo;&hellip;" autocomplete="off" enterkeyhint="search" />
    </div>
    <div class="route-links">
      <a class="route-btn" href="tours.html">Start-here tours &rarr;</a>
      <a class="route-btn subtle" href="objects.html">Masterpieces</a>
      <a class="route-btn subtle" href="routes.html">Museums &amp; graph</a>
      <a class="route-btn subtle" href="guide.html">Label decoder</a>
    </div>
  </header>

  <div class="stat-strip">
    <span><b>${CIVILIZATIONS.length}</b> civilizations</span>
    <span><b>${typeof MUSEUMS !== "undefined" ? MUSEUMS.length - 1 : 0}</b> museums mapped</span>
    <span><b>${typeof MASTERPIECES !== "undefined" ? MASTERPIECES.length : 0}</b> object deep-dives</span>
    <span><b>${typeof TOURS !== "undefined" ? TOURS.length : 0}</b> timed tours</span>
    <span class="offline-pill" id="offline-pill">Works offline</span>
  </div>

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
      const mp = getMasterpiece(c.slug);
      // Search across the quick read and spot-it terms too, so "cuneiform" or
      // "bucchero" finds the right reader even if it isn't in the name.
      const hay = [
        c.name, c.tagline, c.region, c.group, c.emoji, c.spanLabel, c.slug,
        (c.quick || []).join(" "),
        (c.context && c.context.spotIt || []).map((s) => s.t + " " + s.d).join(" "),
        (c.museum && c.museum.lingo || []).map((s) => s.t).join(" "),
        mp ? mp.name : ""
      ].join(" ").toLowerCase();
      html += `
      <a class="card" data-search="${esc(hay)}" style="--c:${c.accent};--c-soft:${hexToRgba(c.accent, 0.13)}" href="reader.html?c=${esc(c.slug)}">
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
  const padX = 64;
  let minY = civ.start, maxY = civ.end;
  // Let the axis span any pre/post phases that extend beyond the headline dates.
  civ.periods.forEach((p) => {
    if (p.start < minY) minY = p.start;
    if (p.end > maxY) maxY = p.end;
  });
  const span = Math.max(maxY - minY, 1);
  const lo = minY - span * 0.06, hi = maxY + span * 0.06;

  const eraY = 32, eraH = 42, axisY = 118;

  // Lay event labels out in alternating rows above/below the axis, pushing a
  // label to the next row when it would collide with one already placed there.
  // Without this, civilizations with clustered dates (a 65,000-year span with
  // four events since 1788, say) render as an unreadable pile.
  const CHAR_W = 5.6, GAP = 10;

  function layout(W) {
    const X = (y) => padX + ((y - lo) / (hi - lo)) * (W - 2 * padX);
    const rows = [[], [], [], []];    // even rows sit above the axis, odd below
    const clearance = (row, x, halfW) =>
      rows[row].reduce(
        (worst, o) => Math.min(worst, Math.abs(o.x - x) - (o.halfW + halfW + GAP)),
        Infinity
      );
    let worstClash = 0;
    const placed = civ.events.map((e, i) => {
      const x = X(e.year);
      const halfW = (String(e.label).length * CHAR_W) / 2;
      const side = i % 2;
      // Preferred side first (inner tier, then outer), then the opposite side.
      const order = [side, side + 2, 1 - side, 3 - side];
      let row = order.find((r) => clearance(r, x, halfW) >= 0);
      if (row === undefined) {
        // Everything is crowded: take whichever row leaves the most room.
        row = order.reduce((best, r) =>
          clearance(r, x, halfW) > clearance(best, x, halfW) ? r : best
        );
        worstClash = Math.max(worstClash, -clearance(row, x, halfW));
      }
      rows[row].push({ x, halfW });
      return { e, i, x, row };
    });
    return { W, X, placed, worstClash };
  }

  // Some civilizations bunch most of their events into a few decades at the end
  // of a very long span (the Taino: five dates between 1492 and 1533). Four
  // label rows can't untangle that, so widen the canvas instead — the timeline
  // already scrolls horizontally, so the extra width costs nothing.
  let L = layout(1080);
  for (const wider of [1400, 1800, 2200]) {
    if (!L.worstClash) break;
    L = layout(wider);
  }
  const { W, X, placed } = L;

  const usedRows = placed.reduce((m, p) => Math.max(m, p.row), 0);
  // Grow the SVG only when the extra rows are actually needed.
  const H = 186 + (usedRows >= 2 ? 34 : 0);

  // A widened canvas must not simply be squashed back into the column by the
  // viewBox, or the whole point is lost — scale its min-width to match.
  const minW = Math.round((W / 1080) * 860);
  let s = `<svg class="tl-svg" viewBox="0 0 ${W} ${H}" style="min-width:${minW}px" role="img" aria-label="Timeline of ${esc(civ.name)}">`;

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
  placed.forEach(({ e, i, x, row }) => {
    const up = row % 2 === 0;
    const tier = Math.floor(row / 2);          // 0 = nearest the axis
    const labelY = up ? axisY - 26 - tier * 17 : axisY + 30 + tier * 17;
    const tickEnd = up ? labelY + 8 : labelY - 12;
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

  document.documentElement.style.setProperty("--accent", civ.accent);
  document.documentElement.style.setProperty("--accent-soft", hexToRgba(civ.accent, 0.12));

  const idx = CIVILIZATIONS.indexOf(civ);
  const prev = CIVILIZATIONS[(idx - 1 + CIVILIZATIONS.length) % CIVILIZATIONS.length];
  const next = CIVILIZATIONS[(idx + 1) % CIVILIZATIONS.length];
  const spanYears = civ.end - civ.start;
  const mp = getMasterpiece(civ.slug);
  const rels = relationsForCiv(civ.slug);
  const places = galleriesForCiv(civ.slug).filter((g) => g.museum.id !== "template");

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
    <div class="quick-head">
      <span>⚡ In 30 seconds — what matters</span>
      <button type="button" class="listen-btn" id="listen-quick" hidden>
        <span class="listen-icon">▶</span><span class="listen-label">Listen</span>
      </button>
    </div>
    <ul>${civ.quick.map((q) => `<li>${esc(q)}</li>`).join("")}</ul>
  </div>` : ""}

  <nav class="jump" aria-label="Jump to section">
    <a href="#sec-timeline">Timeline</a>
    <a href="#sec-context">Context</a>
    ${mp ? `<a href="#sec-object">The object</a>` : ""}
    <a href="#sec-deeper">Go deeper</a>
    <a href="#sec-dates">Key dates</a>
    <a href="#museum">Cheat sheet</a>
    ${places.length ? `<a href="#sec-where">Where to see it</a>` : ""}
  </nav>

  <section class="panel" id="sec-timeline">
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
    "This guide covers thirteen museums. Yours probably isn't one of them — so here is a generic encyclopedic-museum skeleton you can copy. Most large museums group their collections the same way, so the wings below will map onto yours with only the gallery names changed.",
    `<section class="panel">
      <div class="panel-head"><h2>How to add it</h2><span class="hint">about ten minutes of typing</span></div>
      <div class="panel-body">
        <ol class="howto">
          <li>Open <code>data.js</code> and find the <code>MUSEUMS</code> array.</li>
          <li>Copy the block with <code>id: "template"</code> and paste it as a new entry.</li>
          <li>Change <code>id</code>, <code>name</code>, <code>city</code>, <code>emoji</code>, and <code>tagline</code>. Every <code>id</code> in the file must be unique.</li>
          <li>Replace each area's <code>galleries</code> with the room names or numbers from your museum's map, and edit the <code>civs</code> arrays to match what's actually on display.</li>
          <li>Add a page mapping in <code>MUSEUM_PAGE</code> in <code>app.js</code> if you want it on its own route page — otherwise it will still appear in the graph and on <code>routes.html</code>.</li>
          <li>Optionally add a tour to the <code>TOURS</code> array using your new area ids.</li>
          <li>Bump the <code>CACHE</code> version in <code>sw.js</code> so returning visitors get the new data.</li>
        </ol>
        <p class="src-note">Nothing else needs editing. The graph, search, tours, and each civilization's &ldquo;Galleries in this guide&rdquo; section all read from the same structure.</p>
      </div>
    </section>
    <footer class="foot">The whole site is static — no build step, no dependencies. <a href="routes.html">Back to all museums &rarr;</a></footer>`
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
  const addEdge = (from, to, type, note) => {
    if (!index[from] || !index[to]) return;
    edges.push({ from: index[from], to: index[to], type, note });
  };

  MUSEUMS.forEach((m) => {
    // The "add your own" template isn't a real place — keep it out of the graph.
    if (m.id === "template") return;
    addNode(m.id, "museum", m.name, { emoji: m.emoji, city: m.city, href: routePageFor(m.id) });
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
  const rnd = () => (Math.random() - 0.5);
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

  let s = `<svg class="graph-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="Museums, galleries, civilizations, and objects as a graph">`;
  s += `<rect x="0" y="0" width="${W}" height="${H}" fill="transparent" class="graph-bg"/>`;

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
    s += `<circle class="g-hit" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${Math.max(r + 10, 20)}" fill="transparent"/>`;
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
    <div class="graph-timeslider" id="graph-time">
      <label for="time-range">Year</label>
      <input id="time-range" type="range" min="-4000" max="2025" step="25" value="2025" />
      <output id="time-out">all time</output>
      <button type="button" class="time-btn" id="time-play" aria-label="Play through time">▶</button>
      <button type="button" class="time-btn subtle" id="time-reset">All</button>
    </div>
    <div class="graph-stage">
      ${s}
      <div class="graph-info" id="graph-info"></div>
      <div class="graph-hint" id="graph-hint">Tap a node · tap a museum to expand its galleries · drag to pan · pinch to zoom</div>
    </div>`;

  wireGraph(container, nodes, edges);
}

function wireGraph(container, nodes, edges) {
  const svg = container.querySelector(".graph-svg");
  const info = container.querySelector("#graph-info");
  const legend = container.querySelector("#graph-legend");
  const filters = container.querySelector("#graph-filters");
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
  let fhtml = `<span class="filt-chip on" data-type="museum">Museums</span>`
    + `<span class="filt-chip on" data-type="gallery">Galleries</span>`
    + `<span class="filt-chip on" data-type="civ">Civilizations</span>`
    + `<span class="filt-chip on" data-type="object">Objects</span>`
    + `<span class="filt-sep"></span>`;
  regions.forEach((r) => { fhtml += `<span class="filt-chip on" data-region="${esc(r)}">${esc(r)}</span>`; });
  filters.innerHTML = fhtml;

  const nodeEls = Array.from(container.querySelectorAll(".g-node"));
  const edgeEls = Array.from(container.querySelectorAll(".g-edge"));
  const byId = {};
  nodeEls.forEach((el) => { byId[el.getAttribute("data-id")] = el; });

  const nodeMap = {};
  nodes.forEach((n) => { nodeMap[n.id] = n; });
  const edgeMap = {};
  edges.forEach((e, i) => { edgeMap[i] = e; });

  const visibleTypes = { museum: true, gallery: true, civ: true, object: true };
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
    applyVisibility();
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
    if (playBtn) { playBtn.textContent = "▶"; playBtn.setAttribute("aria-label", "Play through time"); }
  }
  if (playBtn) {
    playBtn.addEventListener("click", () => {
      if (timer) { stopPlay(); return; }
      let y = year == null ? -4000 : year;
      if (y >= 2025) y = -4000;
      playBtn.textContent = "⏸";
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
      <button class="graph-info-close" type="button" aria-label="Close">×</button>
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
      if (ev.target.closest(".graph-info-close")) { setInfo(null); unhighlight(); return; }
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

  const select = (id) => {
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
    highlight(id);
    setInfo(nodeMap[id]);
  };

  nodeEls.forEach((el) => {
    const id = el.getAttribute("data-id");
    if (hasHover) {
      el.addEventListener("mouseenter", () => { if (!selected) { highlight(id); setInfo(nodeMap[id]); } });
      el.addEventListener("mouseleave", () => { if (!selected) { unhighlight(); setInfo(null); } });
    }
    el.addEventListener("click", (ev) => { ev.stopPropagation(); select(id); });
    el.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); select(id); }
    });
  });

  /* ---- pan + zoom (mouse, wheel, and touch) ---- */
  const stage = container.querySelector(".graph-stage");
  const hint = container.querySelector("#graph-hint");
  const view = { x: 0, y: 0, k: 1 };
  const applyView = () => {
    svg.style.transform = `translate(${view.x}px, ${view.y}px) scale(${view.k})`;
    svg.style.transformOrigin = "0 0";
  };
  const clampK = (k) => Math.max(0.35, Math.min(4, k));

  let panning = false, sx = 0, sy = 0, moved = false;
  const startPan = (x, y) => { panning = true; moved = false; sx = x - view.x; sy = y - view.y; };
  const movePan = (x, y) => {
    if (!panning) return;
    view.x = x - sx; view.y = y - sy; moved = true; applyView();
  };
  const endPan = () => { panning = false; };

  svg.addEventListener("mousedown", (ev) => {
    if (ev.target.classList.contains("graph-bg") || ev.target.tagName === "svg") startPan(ev.clientX, ev.clientY);
  });
  window.addEventListener("mousemove", (ev) => movePan(ev.clientX, ev.clientY));
  window.addEventListener("mouseup", endPan);

  // Clicking empty canvas clears the selection.
  svg.addEventListener("click", (ev) => {
    if (moved) return;
    if (ev.target.classList.contains("graph-bg") || ev.target.tagName === "svg") {
      selected = null; unhighlight(); setInfo(null);
    }
  });

  if (stage) {
    stage.addEventListener("wheel", (ev) => {
      ev.preventDefault();
      view.k = clampK(view.k * (ev.deltaY > 0 ? 0.9 : 1.1));
      applyView();
    }, { passive: false });

    let pinchDist = 0, pinchK = 1;
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    stage.addEventListener("touchstart", (ev) => {
      if (hint) hint.classList.add("gone");
      if (ev.touches.length === 2) {
        pinchDist = dist(ev.touches); pinchK = view.k;
      } else if (ev.touches.length === 1) {
        startPan(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    }, { passive: true });
    stage.addEventListener("touchmove", (ev) => {
      if (ev.touches.length === 2 && pinchDist) {
        ev.preventDefault();
        view.k = clampK(pinchK * (dist(ev.touches) / pinchDist));
        applyView();
      } else if (ev.touches.length === 1 && panning) {
        ev.preventDefault();
        movePan(ev.touches[0].clientX, ev.touches[0].clientY);
      }
    }, { passive: false });
    stage.addEventListener("touchend", () => { endPan(); pinchDist = 0; }, { passive: true });
  }

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
    <p class="kicker">Civilization Readers</p>
    <h1>Museums, mapped as a graph.</h1>
    <p class="lede">Museums connect to galleries, galleries to civilizations, and civilizations to each other by trade, script, conquest, and religion. Tap a node to inspect it, tap a museum to expand or collapse its galleries, drag to pan, pinch or scroll to zoom, and drag the year slider to watch civilizations fade in and out of existence.</p>
    <div class="route-links">
      <a class="route-btn" href="tours.html">Start-here tours &rarr;</a>
      <a class="route-btn subtle" href="index.html">All civilizations</a>
      <a class="route-btn subtle" href="guide.html">Label decoder</a>
    </div>
  </header>

  <section class="panel graph-panel">
    <div class="panel-head">
      <h2>The graph</h2>
      <span class="hint">museums → galleries → civilizations, plus relationship edges between civilizations</span>
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

/* ---------------- masterpieces (objects.html) ---------------- */

function renderObjects() {
  const app = document.getElementById("app");
  const list = typeof MASTERPIECES !== "undefined" ? MASTERPIECES : [];

  let html = `
  <header class="hero">
    <p class="kicker">Civilization Readers</p>
    <h1>One object, sixty seconds.</h1>
    <p class="lede">A deep dive on a single iconic piece per civilization — what it is, why it matters, and the specific things to look for while you're standing in front of it. Read one before you get to the case; you'll see about three times as much.</p>
    <div class="search-wrap">
      <input id="obj-search" type="search" placeholder="Search objects — try &ldquo;gold&rdquo;, &ldquo;helmet&rdquo;, &ldquo;bronze&rdquo;&hellip;" autocomplete="off" enterkeyhint="search" />
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
          <h3>${esc(m.name)}</h3>
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
  <div class="no-results" id="no-results">No objects match &ldquo;<span id="no-results-q"></span>&rdquo;.</div>
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
    <p class="kicker">Civilization Readers</p>
    <h1>Start here. You have ninety minutes.</h1>
    <p class="lede">Encyclopedic museums are unwinnable — the honest move is to pick a route and skip the rest without guilt. Each tour below is a timed sequence of stops with the reader to open at each one, ordered so you don't double back.</p>
    <div class="route-links">
      <a class="route-btn" href="routes.html">All museums &amp; graph &rarr;</a>
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
    <p class="kicker">Civilization Readers</p>
    <h1>The label said &ldquo;Figure. Wood.&rdquo; Now what?</h1>
    <p class="lede">A decoder for museum labels, a glossary of the words that show up on them, and the reference sites worth having bookmarked when the wall text gives you a title and no date.</p>
    <div class="search-wrap">
      <input id="guide-search" type="search" placeholder="Search terms — try &ldquo;faience&rdquo;, &ldquo;provenance&rdquo;, &ldquo;stela&rdquo;&hellip;" autocomplete="off" enterkeyhint="search" />
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
  <div class="no-results" id="no-results">Nothing matches &ldquo;<span id="no-results-q"></span>&rdquo;.</div>

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
  if (el) window.requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
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
  initTheme();
  mountThemeToggle();
  const render = PAGES[document.body.dataset.page];
  if (render) render();
  mountNav();
  mountToTop();
});
