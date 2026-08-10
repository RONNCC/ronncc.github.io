/* TERM Lab Park — isometric lab-park canvas renderer (TERM.RENDER).
 * Procedural, dependency-free, ES2020+.
 *
 * ChipTycoon-style tour: a little cart/tech rides the roads of the lab park,
 * stops at buildings, carries a labeled cargo (media / cells / contamination),
 * clickable station labels with explanation popups, a stop-list overlay,
 * Space=pause / S=stops, and a "Stops seen N / 6" progress readout.
 *
 * Everything is drawn procedurally with flat colors, 3-4 shade bands per
 * object, and dark outlines (low-poly RCT look).
 */
(function () {
  'use strict';

  const NS = (window.TERM = window.TERM || {});

  /* ------------------------------------------------------------------ *
   * Design tokens — read from CSS vars, constant fallbacks if absent    *
   * ------------------------------------------------------------------ */
  const FALLBACK = {
    bgDeep: '#0a0f1e',
    bgPanel: '#141a2e',
    ink: '#e8ecff',
    accentMed: '#ff5d8f',
    accentOk: '#7ee081',
    accentWarn: '#ffd166',
    accentBad: '#b967ff',
    accentInfo: '#4cc9f0',
    gridLine: 'rgba(120,140,255,0.14)',
    floor: '#2a3a2f',
    path: '#3b4a3d'
  };
  const T = Object.assign({}, FALLBACK);
  const OUTLINE = '#0a0f1e';

  function cssVar(name, fb) {
    try {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    } catch (e) {
      return fb;
    }
  }
  function refreshTokens() {
    T.bgDeep = cssVar('--bg-deep', FALLBACK.bgDeep);
    T.bgPanel = cssVar('--bg-panel', FALLBACK.bgPanel);
    T.ink = cssVar('--ink', FALLBACK.ink);
    T.accentMed = cssVar('--accent-med', FALLBACK.accentMed);
    T.accentOk = cssVar('--accent-ok', FALLBACK.accentOk);
    T.accentWarn = cssVar('--accent-warn', FALLBACK.accentWarn);
    T.accentBad = cssVar('--accent-bad', FALLBACK.accentBad);
    T.accentInfo = cssVar('--accent-info', FALLBACK.accentInfo);
    T.gridLine = cssVar('--grid-line', FALLBACK.gridLine);
    T.floor = cssVar('--floor', FALLBACK.floor);
    T.path = cssVar('--path', FALLBACK.path);
  }

  /* ------------------------------- utils ---------------------------- */
  function shade(hex, amt) {
    // amt < 0 darkens toward black, amt > 0 lightens toward white
    if (hex.charAt(0) !== '#') return hex;
    let r, g, b;
    const n = parseInt(hex.slice(1), 16);
    if (isNaN(n)) return hex;
    r = (n >> 16) & 255; g = (n >> 8) & 255; b = n & 255;
    if (amt < 0) { r += r * amt; g += g * amt; b += b * amt; }
    else { r += (255 - r) * amt; g += (255 - g) * amt; b += (255 - b) * amt; }
    return 'rgb(' + (r | 0) + ',' + (g | 0) + ',' + (b | 0) + ')';
  }
  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }
  function lerp(a, b, k) { return a + (b - a) * k; }
  function lerpColorHex(a, b, k) {
    const pa = [parseInt(a.slice(1, 3), 16), parseInt(a.slice(3, 5), 16), parseInt(a.slice(5, 7), 16)];
    const pb = [parseInt(b.slice(1, 3), 16), parseInt(b.slice(3, 5), 16), parseInt(b.slice(5, 7), 16)];
    return 'rgb(' + (lerp(pa[0], pb[0], k) | 0) + ',' + (lerp(pa[1], pb[1], k) | 0) + ',' + (lerp(pa[2], pb[2], k) | 0) + ')';
  }
  function seededRand(seed) {
    let a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ----------------------------- state ------------------------------ */
  let canvas = null, ctx = null, rafId = 0, ro = null;
  let W = 0, H = 0, DPR = 1;
  let speed = 1;                 // 0 paused, 1 normal, 2 fast, 3 turbo
  let paused = false;
  let prevSpeed = 1;
  let mode = 'idle';
  let clock = 0;                 // global animation clock (sim seconds)
  let lastTs = 0;
  let cb = null;                 // onEvent callback
  let speedCb = null;            // onSpeed callback
  let prevMode = 'idle';         // active mode before freeze (pause) so it can be restored
  let keyBound = false;          // guard: never stack window keydown listeners across inits
  let needsRedraw = true;
  let U = 32, V = 16, originX = 0, originY = 0; // tile half-size + grid origin
  let S = 1;                     // prop scale (tile-relative)

  const COLS = 9, ROWS = 7;
  const SPEED_FACTOR = { 0: 0, 1: 1, 2: 2.2, 3: 4 };

  const STATION_DEFS = [
    { id: 'flask',      label: 'Flask Bench',      kind: 'flask',      gx: 2, gy: 1 },
    { id: 'hood',       label: 'BSC Hood II · A2', kind: 'hood',       gx: 6, gy: 1 },
    { id: 'incubator',  label: 'Incubator · 37°C', kind: 'incubator',  gx: 1, gy: 4 },
    { id: 'microscope', label: 'Microscope',       kind: 'microscope', gx: 5, gy: 4 },
    { id: 'centrifuge', label: 'Centrifuge',       kind: 'centrifuge', gx: 3, gy: 6 },
    { id: 'vial',       label: 'Cryo Freezer',     kind: 'vial',       gx: 7, gy: 5 }
  ];
  const STATION_INFO = {
    flask:      'Adherent cells grow here in T-flasks with fresh media. Confluent? Time to passage.',
    hood:       'A Class II biosafety cabinet. The inward air curtain keeps your culture sterile.',
    incubator:  '37 °C, 5% CO₂, humid. The bicarbonate buffer keeps phenol-red media at pH 7.4.',
    microscope: 'Check morphology and confluence. Count cells with a hemocytometer to seed at 10⁴–10⁵ cells/cm².',
    centrifuge: 'Spin down cells at low g. Pellets are resuspended in fresh media for splitting.',
    vial:       'Freeze early, freeze often. Master cell banks live in cryo vials at -80 °C or LN₂.'
  };
  const MODE_LABEL = {
    idle:   { title: 'LAB PARK :: IDLE',      sub: 'The culture hums quietly', color: '#4a5578' },
    visit:  { title: 'PARK TOUR',             sub: 'Ride the cart — stop at every station', color: T.accentInfo },
    feed:   { title: 'MEDIA FEED',            sub: 'Fresh media: yellow → phenol-red', color: T.accentWarn },
    passage:{ title: 'PASSAGE · SPLIT 1:2',   sub: 'Confluent flask → two flasks', color: T.accentOk },
    contamination: { title: 'CONTAMINATION!', sub: 'Something crept in from the corner…', color: T.accentBad },
    oxygen: { title: 'OXYGEN LIMIT',          sub: 'Diffusion dies past ~200 µm', color: T.accentInfo },
    hood:   { title: 'BSC WORK',              sub: 'Air curtain: keep the culture safe', color: T.accentMed },
    freeze: { title: 'PAUSED',                sub: 'Simulation frozen — Space to resume', color: T.accentMed }
  };

  let stations = [];
  let avatar = null;
  let culture = null;
  let modeState = null;          // per-mode animation state
  let gooBlobs = [];
  let visitedStops = new Set();  // station ids the cart has stopped at
  let overlayOpen = false;       // stop-list overlay
  let infoPopup = null;          // station id shown in explanation popup
  let hitAreas = [];             // interactive regions from the last drawn frame
  const DECOR = [
    { kind: 'tree', gx: 0, gy: 0 },
    { kind: 'bush', gx: 8, gy: 0 },
    { kind: 'tree', gx: 0, gy: 6 },
    { kind: 'bush', gx: 8, gy: 6 },
    { kind: 'bush', gx: 4, gy: 0 },
    { kind: 'bush', gx: 5, gy: 6 }
  ];

  function stationById(id) {
    for (let i = 0; i < stations.length; i++) if (stations[i].id === id) return stations[i];
    return null;
  }
  function isRoad(gx, gy) {
    // internal aisle grid: every 3rd row and every 2nd column is a road,
    // except building cells (stations occupy those tiles)
    let road = (gy % 3 === 1) || (gx % 2 === 1);
    if (!road) return false;
    for (let i = 0; i < STATION_DEFS.length; i++) {
      if (STATION_DEFS[i].gx === gx && STATION_DEFS[i].gy === gy) return false;
    }
    if (culture && culture.gx === gx && culture.gy === gy) return false;
    return true;
  }
  function isPath(gx, gy) {
    return gx === 0 || gy === 0 || gx === COLS - 1 || gy === ROWS - 1;
  }
  function gridToScreen(gx, gy, dz) {
    return [originX + (gx - gy) * U, originY + (gx + gy) * V - (dz || 0)];
  }

  /* --------------------------- canvas setup ------------------------- */
  function sizeCanvas() {
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    W = Math.max(50, rect.width);
    H = Math.max(50, rect.height);
    DPR = Math.max(1, (typeof window !== 'undefined' && window.devicePixelRatio) || 1);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx = canvas.getContext('2d');
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    computeLayout();
    needsRedraw = true;
  }
  function computeLayout() {
    const pad = 36;
    const gridW = (COLS + ROWS) * 32;
    const gridH = (COLS + ROWS) * 16;
    const sc = Math.min((W - pad * 2) / gridW, (H - pad * 2) / gridH);
    U = 32 * sc;
    V = 16 * sc;
    S = clamp(sc, 0.55, 1.6);
    originX = W / 2;
    originY = H * 0.54 - gridH * sc * 0.5 - pad * 0.4;
  }

  /* --------------------------- drawing core ------------------------- */
  function poly(pts, fill, outline, lw) {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (outline) { ctx.strokeStyle = outline; ctx.lineWidth = lw || 1.5; ctx.lineJoin = 'round'; ctx.stroke(); }
  }
  function ellipse(cx, cy, rx, ry, fill, outline, lw) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (outline) { ctx.strokeStyle = outline; ctx.lineWidth = lw || 1.5; ctx.stroke(); }
  }
  function rrect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function tt(txt, x, y, opts) {
    opts = opts || {};
    ctx.font = (opts.weight || 600) + ' ' + (opts.size || 10) + "px " + (opts.font || 'Nunito, sans-serif');
    ctx.textAlign = opts.align || 'left';
    ctx.textBaseline = opts.base || 'alphabetic';
    if (opts.shadow !== false) {
      ctx.fillStyle = OUTLINE;
      ctx.fillText(txt, x + 1, y + 1);
    }
    ctx.fillStyle = opts.color || T.ink;
    ctx.fillText(txt, x, y);
  }
  // iso box: diamond top at height h, three shaded faces + outline
  function isoBox(cx, cy, rx, ry, h, topC, leftC, rightC, outline, lw) {
    const N = [cx, cy - h - ry], E = [cx + rx, cy - h], S = [cx, cy - h + ry], W = [cx - rx, cy - h];
    const N0 = [cx, cy - ry], E0 = [cx + rx, cy], S0 = [cx, cy + ry], W0 = [cx - rx, cy];
    poly([N, E, E0, N0], rightC, outline, lw);       // right face
    poly([N, W, W0, N0], leftC, outline, lw);        // left face
    poly([N, E, S, W], topC, outline, lw);           // top face
  }

  /* ------------------------------------------------------------------ *
   * Tiles & decorations                                                 *
   * ------------------------------------------------------------------ */
  function drawTile(gx, gy) {
    const [cx, cy] = gridToScreen(gx + 0.5, gy + 0.5);
    let base;
    if (isPath(gx, gy)) base = T.path;
    else if (isRoad(gx, gy)) base = shade(T.path, 0.12);
    else base = T.floor;
    const c = ((gx + gy) % 2 === 0) ? base : shade(base, 0.05);
    const r = U / 2, v = V / 2;
    const N = [cx, cy - v], E = [cx + r, cy], S = [cx, cy + v], W = [cx - r, cy];
    poly([N, E, S, W], c, null);
    // grid seams
    ctx.strokeStyle = T.gridLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(E[0], E[1]); ctx.lineTo(S[0], S[1]); ctx.lineTo(W[0], W[1]);
    ctx.stroke();
    // dashed center line on roads — the cart follows these
    if (isRoad(gx, gy) || isPath(gx, gy)) {
      ctx.strokeStyle = 'rgba(255,255,255,0.10)';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 4]);
      ctx.beginPath();
      ctx.moveTo(cx - r * 0.5, cy); ctx.lineTo(cx + r * 0.5, cy);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
  function drawShadow(cx, cy, rw, rh) {
    ctx.fillStyle = 'rgba(0,0,0,0.28)';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rw, rh, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  function drawDecoration(d) {
    const [cx, cy] = gridToScreen(d.gx + 0.5, d.gy + 0.5);
    drawShadow(cx, cy + 2, U * 0.55, V * 0.55);
    if (d.kind === 'tree') {
      const th = 16 * S;
      poly([[cx - 3 * S, cy - 2], [cx + 3 * S, cy - 2], [cx + 2 * S, cy - th], [cx - 2 * S, cy - th]], '#5a4a36', OUTLINE, 1.2);
      const g1 = shade(T.accentOk, -0.45), g2 = shade(T.accentOk, -0.25), g3 = '#4c8a57';
      ellipse(cx - 8 * S, cy - th - 4 * S, 9 * S, 7 * S, g1, OUTLINE, 1.2);
      ellipse(cx + 8 * S, cy - th - 3 * S, 9 * S, 7 * S, g3, OUTLINE, 1.2);
      ellipse(cx, cy - th - 9 * S, 11 * S, 9 * S, g2, OUTLINE, 1.2);
    } else {
      ellipse(cx - 5 * S, cy - 3, 8 * S, 5 * S, shade(T.accentOk, -0.4), OUTLINE, 1.2);
      ellipse(cx + 5 * S, cy - 4, 7 * S, 4.5 * S, shade(T.accentOk, -0.2), OUTLINE, 1.2);
      ellipse(cx, cy - 5, 6 * S, 4 * S, '#5ba06b', OUTLINE, 1.2);
    }
  }

  /* ------------------------------------------------------------------ *
   * Culture dish / vessel (cells, media color, contamination, oxygen)   *
   * ------------------------------------------------------------------ */
  const PH_STOPS = [
    [6.8, '#ffd166'], [7.0, '#ff9f43'], [7.4, '#e8486a'], [8.2, '#ff9ecb']
  ];
  function mediaColor(ph) {
    ph = clamp(ph, 6.6, 8.4);
    for (let i = 0; i < PH_STOPS.length - 1; i++) {
      const a = PH_STOPS[i], b = PH_STOPS[i + 1];
      if (ph <= b[0]) {
        const k = (ph - a[0]) / (b[0] - a[0]);
        return lerpColorHex(a[1], b[1], k);
      }
    }
    return PH_STOPS[PH_STOPS.length - 1][1];
  }
  function buildCells() {
    const rnd = seededRand(0x51AB);
    const cells = [];
    for (let i = 0; i < 55; i++) {
      const u = -0.85 + rnd() * 1.7;
      const v = -0.8 + rnd() * 1.6;
      cells.push({ u: u, v: v, um: ((u + 1) / 2) * 400, ph: 6.6 + rnd() * 0.15, r: 1.7 + rnd() * 1.4 });
    }
    return cells;
  }
  function drawCulture() {
    const [cx, cy] = gridToScreen(culture.gx, culture.gy);
    const rx = 1.3 * U, ry = rx * 0.44;
    const mcol = mediaColor(culture.ph);
    // floor pad
    poly([[cx, cy - 2], [cx + 1.6 * U, cy], [cx, cy + 2], [cx - 1.6 * U, cy], [cx, cy - 1]],
      shade(T.floor, 0.2), OUTLINE, 1.4);
    // oxygen chamber walls (oxygen mode)
    if (mode === 'oxygen') drawOxygenChamber(cx, cy, rx, ry);
    // dish side + rim + surface
    ellipse(cx, cy - 2, rx + 3 * S, ry + 2 * S, shade(mcol, -0.4), OUTLINE, 1.6);
    ellipse(cx, cy - 4 * S, rx + 1, ry + 1, shade(mcol, -0.18), OUTLINE, 1.2);
    ellipse(cx, cy - 6 * S, rx, ry, mcol, OUTLINE, 1.6);
    // rim highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.ellipse(cx, cy - 6 * S, rx * 0.8, ry * 0.8, 0, Math.PI, Math.PI * 2);
    ctx.stroke();
    // cells
    const density = culture.density;
    const n = Math.round(4 + density * 44);
    const flow = culture.flow || 0;
    for (let i = 0; i < n; i++) {
      const c = culture.cells[i % culture.cells.length];
      let dim = 0;
      if (mode === 'oxygen') dim = c.um > 200 ? clamp((c.um - 200) / 120, 0, 1) * flow : 0;
      const a = 1 - dim * 0.85;
      const x = cx + c.u * rx * 0.9;
      const y = cy - 6 * S + c.v * ry * 0.85;
      ctx.globalAlpha = a;
      ellipse(x, y, c.r * S, c.r * 0.8 * S, dim > 0.3 ? '#8b93ab' : '#ffd9e6', dim > 0.3 ? '#4a5168' : '#c25f8a', 0.8);
      ctx.globalAlpha = 1;
    }
    // oxygen gradient overlay
    if (mode === 'oxygen' && flow > 0) {
      const g = ctx.createLinearGradient(cx - rx, 0, cx + rx, 0);
      g.addColorStop(0, 'rgba(76,201,240,' + (0.5 * flow).toFixed(3) + ')');
      g.addColorStop(0.45, 'rgba(76,201,240,' + (0.2 * flow).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(76,201,240,0)');
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy - 6 * S, rx, ry, 0, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = g;
      ctx.fillRect(cx - rx - 4, cy - 6 * S - ry - 4, rx * 2 + 8, ry * 2 + 8);
      ctx.restore();
      // rising O2 bubbles near left wall
      for (let i = 0; i < 5; i++) {
        const b = (clock * 24 + i * 31) % (ry * 2.4);
        const bx = cx - rx * 0.75 + Math.sin(clock * 3 + i) * 5;
        const by = cy - 6 * S + ry - b;
        ctx.strokeStyle = 'rgba(76,201,240,0.5)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bx, by, 2 + (i % 2), 0, Math.PI * 2);
        ctx.stroke();
      }
      tt('O₂', cx - rx * 0.7, cy - ry - 2, { size: 9 * S, color: T.accentInfo, align: 'center', weight: 800 });
    }
    // contamination goo
    if ((mode === 'contamination' || mode === 'idle') && gooBlobs.length) {
      const k = mode === 'contamination' ? (culture.contamK || 0) : 1;
      for (let i = 0; i < gooBlobs.length; i++) {
        const b = gooBlobs[i];
        if (k < b.appear) continue;
        const visible = clamp((k - b.appear) / 0.12, 0, 1);
        const r = b.r * S * (0.55 + k * 0.6) * visible;
        if (r < 0.5) continue;
        const x = cx + b.u * rx * 0.92;
        const y = cy - 6 * S + b.v * ry * 0.9;
        blobPath(x, y, r, b.seed, b.green ? '#3ddc84' : T.accentBad, 1);
      }
    }
    // feed pour stream
    if (mode === 'feed' && modeState && modeState.phase === 'pour' && culture.pourT > 0 && culture.pourT < 1) {
      const [ax, ay] = gridToScreen(avatar.gx, avatar.gy);
      ctx.save();
      ctx.strokeStyle = '#ffd166';
      ctx.lineWidth = 2.2 * S;
      ctx.setLineDash([5 * S, 4 * S]);
      ctx.lineDashOffset = -clock * 80;
      ctx.beginPath();
      ctx.moveTo(ax, ay - 26 * S);
      ctx.quadraticCurveTo(ax + (cx - ax) * 0.4, ay - 14 * S, cx, cy - 6 * S);
      ctx.stroke();
      ctx.restore();
    }
    // pH tag
    if (mode === 'feed' || mode === 'contamination') {
      tt('pH ' + culture.ph.toFixed(1), cx, cy + ry + 12 * S, { size: 9 * S, align: 'center', color: shade(mcol, 0.5) });
    }
  }
  function blobPath(x, y, r, seed, fill, alpha) {
    const n = 8;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const wob = 1 + Math.sin(seed + i * 1.9) * 0.22;
      pts.push([x + Math.cos(a) * r * wob, y + Math.sin(a) * r * wob * 0.82]);
    }
    ctx.globalAlpha = alpha;
    poly(pts, fill, OUTLINE, 1.2);
    ellipse(x, y - r * 0.28, r * 0.32, r * 0.2, 'rgba(255,255,255,0.22)', null);
    ctx.globalAlpha = 1;
  }
  function drawOxygenChamber(cx, cy, rx, ry) {
    const left = cx - rx - 19 * S;
    const top = cy - 6 * S - ry - 12 * S;
    const right = cx + rx + 19 * S;
    const bot = cy - 6 * S + ry + 10 * S;
    ctx.strokeStyle = 'rgba(76,201,240,0.55)';
    ctx.lineWidth = 1.6;
    ctx.strokeRect(left, top, right - left, bot - top);
    ctx.strokeStyle = 'rgba(76,201,240,0.2)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(left, top + 8); ctx.lineTo(right, top + 8);
    ctx.moveTo(left, bot - 8); ctx.lineTo(right, bot - 8);
    ctx.stroke();
    poly([[left, top], [left + 8 * S, top], [left + 8 * S, bot], [left, bot]], shade(T.accentInfo, -0.3), OUTLINE, 1.4);
    const x200 = left + (right - left) * (200 / 400);
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = 'rgba(232,236,255,0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x200, top); ctx.lineTo(x200, bot);
    ctx.stroke();
    ctx.setLineDash([]);
    tt('0', left + 6, bot + 9, { size: 8 * S });
    tt('200 µm', x200 - 16, bot + 9, { size: 8 * S, color: T.accentWarn });
    tt('400 µm', right - 26, bot + 9, { size: 8 * S });
  }

  /* ------------------------------------------------------------------ *
   * Station buildings (procedural, 3-4 shade bands + dark outline)      *
   * ------------------------------------------------------------------ */
  function drawStation(s) {
    const [cx, cy] = gridToScreen(s.gx + 0.5, s.gy + 0.5);
    drawShadow(cx - 2, cy + 3, U * 1.15, V * 1.15);
    switch (s.kind) {
      case 'flask':      drawFlaskStation(cx, cy, s); break;
      case 'hood':       drawHoodStation(cx, cy, s); break;
      case 'incubator':  drawIncubatorStation(cx, cy, s); break;
      case 'microscope': drawMicroscopeStation(cx, cy, s); break;
      case 'centrifuge': drawCentrifugeStation(cx, cy, s); break;
      case 'vial':       drawVialStation(cx, cy, s); break;
    }
    drawStationLabel(s, cx, cy);
  }
  function drawStationLabel(s, cx, cy) {
    const top = cy - 34 * S;
    const wP = Math.min(120 * S, W * 0.22);
    let x = clamp(cx - wP / 2, 4, W - wP - 4);
    if (overlayOpen) x = clamp(x, 4, W - wP - 190);
    const active = s.active || (modeState && modeState.highlight === s.id) || infoPopup === s.id;
    ctx.globalAlpha = active ? 1 : 0.62;
    ctx.fillStyle = 'rgba(10,15,30,0.82)';
    rrect(x, top - 14, wP, 14, 4);
    ctx.fill();
    ctx.strokeStyle = active ? T.accentMed : 'rgba(120,140,255,0.3)';
    ctx.lineWidth = active ? 1.4 : 1;
    rrect(x, top - 14, wP, 14, 4);
    ctx.stroke();
    ctx.strokeStyle = active ? T.accentMed : 'rgba(120,140,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(cx, top - 14); ctx.lineTo(cx, top);
    ctx.stroke();
    tt(s.label, x + wP / 2, top - 4, { size: 8 * S, align: 'center', color: T.ink });
    ctx.globalAlpha = 1;
    // clickable region for station label
    if (hitAreas) {
      hitAreas.push({ type: 'station', x: x, y: top - 14, w: wP, h: 16, id: s.id });
    }
  }

  function drawFlask(cx, cy, opts) {
    opts = opts || {};
    const sc = opts.scale || 1;
    const bulbR = 11 * S * sc;
    const by = cy + 4 * S;
    const neckW = 6 * S * sc, neckH = 15 * S * sc;
    const glass = '#d7e5ff', darkGlass = shade(glass, -0.25);
    poly([[cx - neckW / 2, by - bulbR - 2], [cx + neckW / 2, by - bulbR - 2],
          [cx + neckW * 0.6, by - bulbR - neckH], [cx - neckW * 0.6, by - bulbR - neckH]], darkGlass, OUTLINE, 1.2);
    ctx.fillStyle = '#3a4a72';
    ctx.fillRect(cx - neckW * 0.65, by - bulbR - neckH - 4 * S, neckW * 1.3, 5 * S);
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2;
    ctx.strokeRect(cx - neckW * 0.65, by - bulbR - neckH - 4 * S, neckW * 1.3, 5 * S);
    ellipse(cx, by - 2, bulbR, bulbR * 0.85, glass, OUTLINE, 1.4);
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(cx, by - 2, bulbR - 1.5, bulbR * 0.85 - 1.5, 0, 0, Math.PI * 2);
    ctx.clip();
    const mcol = opts.ph ? mediaColor(opts.ph) : 'rgba(232,76,106,0.75)';
    ctx.fillStyle = mcol;
    ctx.fillRect(cx - bulbR, by - bulbR * 0.9, bulbR * 2, bulbR * 1.6);
    if (opts.cells) {
      const rnd = seededRand(opts.seed || 5);
      const nn = Math.round(opts.cells * 24);
      for (let i = 0; i < nn; i++) {
        const a = rnd() * Math.PI * 2, rd = rnd() * bulbR * 0.72;
        ellipse(cx + Math.cos(a) * rd, by - 2 + Math.sin(a) * rd * 0.8, 1.5 * S, 1.2 * S, '#ffd9e6', '#c25f8a', 0.6);
      }
    }
    ctx.restore();
    ctx.strokeStyle = 'rgba(255,255,255,0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.ellipse(cx - bulbR * 0.42, by - 2 - bulbR * 0.35, bulbR * 0.26, bulbR * 0.3, -0.4, 0, Math.PI * 2);
    ctx.stroke();
  }

  function drawMediaBottle(cx, cy, ph) {
    const bw = 7 * S, bh = 20 * S;
    const left = cx - bw / 2, right = cx + bw / 2, top = cy - bh, bot = cy + 2 * S;
    poly([[left, top], [right, top], [right, bot], [left, bot]], shade(T.accentWarn, 0.25), OUTLINE, 1.2);
    ctx.fillStyle = '#fff'; ctx.fillRect(left + 1, cy - bh * 0.62, bw - 2, bh * 0.3);
    ctx.strokeStyle = OUTLINE; ctx.strokeRect(left + 1, cy - bh * 0.62, bw - 2, bh * 0.3);
    ctx.fillStyle = '#3a4a72'; ctx.fillRect(left - 1, top - 4 * S, bw + 2, 5 * S);
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2; ctx.strokeRect(left - 1, top - 4 * S, bw + 2, 5 * S);
    ctx.fillStyle = mediaColor(ph || 7.4);
    ctx.fillRect(left + 1.5, cy - bh * 0.45, bw - 3, bh * 0.4);
  }

  function drawFlaskStation(cx, cy, s) {
    const h = 16 * S;
    isoBox(cx, cy, 1.05 * U, 1.05 * V, h,
      shade(T.floor, 0.42), shade(T.floor, 0.16), shade(T.floor, 0.3), OUTLINE, 1.6);
    const topY = cy + V * 0.5 - h;
    const ms = modeState;
    if (mode === 'passage' && ms) {
      const splitK = ms.phase === 'split' ? ms.splitK || 0 : 0;
      const grow = (ms.phase === 'grow') ? culture.density : 1;
      const slide = splitK * 26 * S;
      drawFlask(cx - 22 * S - slide, topY, { ph: culture.ph, cells: grow, seed: 11, scale: 1.25 });
      ctx.globalAlpha = 0.35 + splitK * 0.65;
      drawFlask(cx + 10 * S + (1 - splitK) * 30 * S, topY, { ph: culture.ph, cells: splitK, seed: 23, scale: 1.25 });
      ctx.globalAlpha = 1;
    } else {
      drawFlask(cx - 16 * S, topY, { ph: culture.ph, cells: mode === 'feed' ? culture.density * 0.9 : 0.55, seed: 5 });
    }
    drawMediaBottle(cx + 18 * S, topY, mode === 'feed' && modeState && modeState.phase === 'pour' ? 6.9 : 7.4);
  }

  function drawHoodStation(cx, cy, s) {
    const Hh = 44 * S, rx = 1.2 * U, ry = 1.2 * V;
    const workH = 15 * S;
    isoBox(cx, cy, rx, ry, Hh,
      shade('#9aa6c8', 0.05), shade('#5c6a94', -0.18), shade('#6d7ba6', -0.05), OUTLINE, 1.8);
    poly([[cx + rx * 0.05, cy - workH + ry * 0.95], [cx + rx * 0.98, cy - workH + ry * 0.05], [cx + rx, cy + ry * 0.05], [cx + rx * 0.9, cy + ry * 0.9]],
      shade(T.bgPanel, 0.35), OUTLINE, 1.2);
    drawFlask(cx + rx * 0.62, cy - workH + ry * 0.55, { scale: 0.5, ph: 7.4, cells: 0.4 });
    const gl = [
      [cx + rx, cy - Hh], [cx, cy - Hh + ry], [cx, cy + ry], [cx + rx, cy]
    ];
    poly(gl, 'rgba(76,201,240,0.28)', 'rgba(140,210,255,0.8)', 1.6);
    ctx.strokeStyle = 'rgba(200,220,255,0.65)';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx + rx * 0.5, cy - Hh + ry * 0.5); ctx.lineTo(cx + rx * 0.5, cy + ry * 0.5);
    ctx.moveTo(cx + rx * 0.5, cy - Hh + ry * 0.5); ctx.lineTo(cx + rx * 0.9, cy - Hh + ry * 0.1);
    ctx.stroke();
    poly([[cx - rx * 1.1, cy - Hh + ry * 0.94], [cx, cy - Hh - ry * 0.1], [cx + rx * 1.1, cy - Hh + ry * 0.94], [cx + rx * 0.9, cy - Hh + ry * 1.06], [cx, cy - Hh + ry * 0.02], [cx - rx * 0.9, cy - Hh + ry * 1.06]],
      shade('#8fa0c9', 0.1), OUTLINE, 1.4);
    if (mode === 'hood' && modeState && modeState.phase === 'work') {
      for (let i = 0; i < 7; i++) {
        const fx = cx - rx * 0.8 + i * (rx * 1.6 / 6);
        const a = 0.28 + 0.24 * Math.sin(clock * 4 + i * 1.3);
        const y0 = cy - Hh + ry * 0.35;
        ctx.strokeStyle = 'rgba(190,240,255,' + a.toFixed(2) + ')';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(fx, y0); ctx.lineTo(fx - 4 * S, y0 + 16 * S);
        ctx.moveTo(fx, y0 + 5); ctx.lineTo(fx - 3 * S, y0 + 20 * S);
        ctx.stroke();
        ctx.fillStyle = 'rgba(190,240,255,' + (a + 0.15).toFixed(2) + ')';
        ctx.beginPath();
        ctx.moveTo(fx - 5 * S, y0 + 13 * S); ctx.lineTo(fx - 3 * S, y0 + 19 * S); ctx.lineTo(fx - 1 * S, y0 + 13 * S);
        ctx.closePath(); ctx.fill();
      }
    }
  }

  function drawIncubatorStation(cx, cy, s) {
    const h = 50 * S, rx = 1.1 * U, ry = 1.1 * V;
    isoBox(cx, cy, rx, ry, h,
      shade('#b8c0d8', 0.02), shade('#6a7396', -0.22), shade('#7c85a8', -0.08), OUTLINE, 1.8);
    const doors = [[cx - rx * 0.82, cy - h + ry * 0.82], [cx - rx * 0.06, cy - h + ry * 0.06], [cx - rx * 0.06, cy + ry * 0.06], [cx - rx * 0.82, cy + ry * 0.82]];
    poly(doors, shade('#8d97bd', -0.12), OUTLINE, 1.3);
    const wx = cx - rx * 0.44, wy = cy - h * 0.52;
    ellipse(wx, wy, 6.5 * S, 5 * S, '#0f1830', 'rgba(190,225,255,0.9)', 1.4);
    ctx.fillStyle = 'rgba(76,201,240,0.35)';
    ctx.beginPath(); ctx.arc(wx, wy, 4 * S, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#39415e'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(cx - rx * 0.66, cy - h + ry * 0.66); ctx.lineTo(cx - rx * 0.28, cy - h + ry * 0.28); ctx.stroke();
    tt('37.0°C  5% CO₂', cx + rx * 0.55, cy - h + 10 * S, { size: 8 * S, align: 'center', color: shade(T.accentOk, 0.2) });
    isoBox(cx + rx * 1.35, cy + ry * 0.55, rx * 0.3, ry * 0.3, 30 * S,
      shade(T.accentOk, 0.1), shade(T.accentOk, -0.3), shade(T.accentOk, -0.15), OUTLINE, 1.3);
    ctx.fillStyle = '#4d7a56'; ctx.fillRect(cx + rx * 1.35 - 3 * S, cy + ry * 0.55 - 30 * S - 6 * S, 6 * S, 6 * S);
  }

  function drawMicroscopeStation(cx, cy, s) {
    const h = 12 * S, rx = 1.0 * U, ry = 1.0 * V;
    isoBox(cx, cy, rx, ry, h, shade(T.floor, 0.42), shade(T.floor, 0.16), shade(T.floor, 0.3), OUTLINE, 1.5);
    const ty = cy + ry * 0.5 - h;
    const sc = S;
    poly([[cx - 22 * sc, ty + 2], [cx + 22 * sc, ty + 2], [cx + 15 * sc, ty + 10 * sc], [cx - 15 * sc, ty + 10 * sc]], '#3f4766', OUTLINE, 1.4);
    ctx.fillStyle = '#303958';
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx - 7 * sc, ty + 6 * sc);
    ctx.lineTo(cx - 7 * sc, ty - 26 * sc);
    ctx.quadraticCurveTo(cx - 7 * sc, ty - 34 * sc, cx + 4 * sc, ty - 34 * sc);
    ctx.lineTo(cx + 7 * sc, ty - 28 * sc);
    ctx.lineTo(cx + 7 * sc, ty + 2 * sc);
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#4a5578';
    ctx.fillRect(cx + 3 * sc, ty + 1 * sc, 12 * sc, 4 * sc);
    ellipse(cx + 9 * sc, ty + 1 * sc, 5 * sc, 2.5 * sc, mediaColor(culture.ph), OUTLINE, 1);
    poly([[cx - 9 * sc, ty - 33 * sc], [cx + 2 * sc, ty - 33 * sc], [cx + 2 * sc, ty - 25 * sc], [cx - 9 * sc, ty - 25 * sc]], '#39415e', OUTLINE, 1.3);
    poly([[cx - 9 * sc, ty - 33 * sc], [cx - 20 * sc, ty - 38 * sc], [cx - 20 * sc, ty - 31 * sc], [cx - 9 * sc, ty - 25 * sc]], '#454e71', OUTLINE, 1.3);
    ellipse(cx - 20 * sc, ty - 34.5 * sc, 3 * sc, 4 * sc, '#202842', OUTLINE, 1.1);
    ctx.fillStyle = '#202842';
    ctx.fillRect(cx - 1 * sc, ty - 7 * sc, 4 * sc, 7 * sc);
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1; ctx.strokeRect(cx - 1 * sc, ty - 7 * sc, 4 * sc, 7 * sc);
  }

  function drawCentrifugeStation(cx, cy, s) {
    const rx = 1.05 * U, ry = 1.05 * V, h = 30 * S;
    isoBox(cx, cy, rx, ry, h, shade('#c7cfe8', 0.03), shade('#777fa4', -0.2), shade('#8b93b8', -0.07), OUTLINE, 1.7);
    ctx.strokeStyle = '#39415e'; ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(cx - rx * 0.8, cy - h + ry * 0.8); ctx.lineTo(cx + rx * 0.8, cy - h + ry * 0.8);
    ctx.moveTo(cx - rx * 0.2, cy - h - ry * 0.2); ctx.lineTo(cx + rx * 0.2, cy - h - ry * 0.2);
    ctx.stroke();
    const wx = cx + rx * 0.35, wy = cy - h * 0.5;
    ellipse(wx, wy, 9 * S, 7 * S, '#101830', 'rgba(190,225,255,0.7)', 1.3);
    const spin = clock * 2.4;
    ctx.strokeStyle = '#ffd166'; ctx.lineWidth = 1.4;
    ctx.beginPath();
    for (let i = 0; i < 2; i++) {
      const a = spin + i * Math.PI;
      ctx.moveTo(wx, wy);
      ctx.lineTo(wx + Math.cos(a) * 6 * S, wy + Math.sin(a) * 4 * S);
    }
    ctx.stroke();
    ellipse(wx, wy, 1.6 * S, 1.6 * S, '#ffd166', OUTLINE, 0.8);
    tt('4°C · 1250g', cx - rx * 0.5, cy + ry * 1.15, { size: 8 * S, align: 'center', color: T.accentInfo });
  }

  function drawVialStation(cx, cy, s) {
    const rx = 1.05 * U, ry = 1.05 * V;
    isoBox(cx, cy, rx, ry, 26 * S,
      shade('#9fb0d8', 0.02), shade('#55618c', -0.2), shade('#6a77a6', -0.07), OUTLINE, 1.7);
    poly([[cx - rx * 1.1, cy - 44 * S + ry * 0.9], [cx, cy - 48 * S - ry * 0.1], [cx + rx * 1.1, cy - 44 * S + ry * 0.9], [cx + rx * 0.85, cy - 44 * S + ry * 1.1], [cx, cy - 46 * S], [cx - rx * 0.85, cy - 44 * S + ry * 1.1]],
      shade('#7784ad', 0.05), OUTLINE, 1.4);
    for (let i = 0; i < 4; i++) {
      const vx = cx - rx * 0.55 + i * rx * 0.36;
      ctx.fillStyle = '#eef2ff';
      ctx.fillRect(vx - 2 * S, cy - 26 * S, 4 * S, 7 * S);
      ctx.strokeStyle = OUTLINE; ctx.lineWidth = 0.9;
      ctx.strokeRect(vx - 2 * S, cy - 26 * S, 4 * S, 7 * S);
      ctx.fillStyle = T.accentMed;
      ctx.fillRect(vx - 2 * S, cy - 28 * S, 4 * S, 2.5 * S);
    }
    for (let i = 0; i < 3; i++) {
      const a = 0.1 + 0.08 * Math.sin(clock * 2 + i * 2);
      ellipse(cx + (i - 1) * 10 * S + Math.sin(clock * 1.3 + i) * 3, cy - 34 * S, 9 * S, 5 * S, 'rgba(180,230,255,' + a.toFixed(2) + ')', null);
    }
    tt('-80°C', cx, cy - 30 * S - 16 * S, { size: 8 * S, align: 'center', color: shade(T.accentInfo, 0.35) });
  }

  /* ------------------------------------------------------------------ *
   * Avatar (lab tech) + tour cart, cargo tag                            *
   * ------------------------------------------------------------------ */
  function setupAvatar() {
    avatar = {
      gx: 4, gy: 1, faceX: 1, faceY: 1,
      from: null, to: null, legs: [], legIdx: 0, t: 0, legDur: 0.4,
      moving: false, walking: false, bob: 0, onArrive: null
    };
  }
  function cargoInfo() {
    switch (mode) {
      case 'visit':   return { label: 'tour cart · cells', color: T.accentInfo };
      case 'feed':    return { label: 'media', color: T.accentWarn };
      case 'passage': return { label: 'cells · 1:2 split', color: T.accentOk };
      case 'contamination': return { label: 'contamination!', color: T.accentBad };
      case 'oxygen':  return { label: 'cells · O₂ starved', color: '#8b93ab' };
      case 'hood':    return { label: 'culture', color: T.accentMed };
      case 'freeze':  return { label: '—', color: T.ink };
      default:        return { label: 'cells', color: '#8b93ab' };
    }
  }
  function drawCargoTag(sx, sy) {
    const info = cargoInfo();
    const label = info.label;
    ctx.font = '700 9px "Nunito", sans-serif';
    const tw = ctx.measureText(label).width;
    const w = tw + 14, h = 15;
    const x = sx - w / 2, y = sy - 40 * S;
    ctx.fillStyle = 'rgba(10,15,30,0.88)';
    rrect(x, y, w, h, 4);
    ctx.fill();
    ctx.strokeStyle = info.color;
    ctx.lineWidth = 1.2;
    rrect(x, y, w, h, 4);
    ctx.stroke();
    // little pointer triangle down to the cart
    ctx.fillStyle = 'rgba(10,15,30,0.88)';
    ctx.beginPath();
    ctx.moveTo(sx - 3, y + h); ctx.lineTo(sx + 3, y + h); ctx.lineTo(sx, y + h + 4);
    ctx.closePath(); ctx.fill();
    ctx.strokeStyle = info.color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(sx - 3, y + h); ctx.lineTo(sx, y + h + 4); ctx.lineTo(sx + 3, y + h);
    ctx.stroke();
    tt(label, x + w / 2, y + 11.5, { size: 9, align: 'center', weight: 700, color: T.ink, shadow: false });
  }
  function drawAvatar() {
    const [sx, sy] = gridToScreen(avatar.gx, avatar.gy);
    const moving = avatar.moving && avatar.walking;
    const bob = moving ? Math.abs(Math.sin(avatar.bob * 7)) * 2.2 * S : Math.sin(clock * 2.4) * 1.1 * S;
    const swing = moving ? Math.sin(avatar.bob * 7) * 2.6 * S : 0;
    const y = sy + bob;
    const flip = avatar.faceX < 0 ? -1 : 1;
    drawShadow(sx, sy + 2, 10 * S, 4.5 * S);
    if (mode === 'visit') {
      drawCart(sx, y, flip, moving);
    } else {
      drawTech(sx, y, flip, swing, moving);
    }
    drawCargoTag(sx, sy);
    // carried media bottle (feed)
    if (mode === 'feed' && modeState && (modeState.phase === 'pickup' || modeState.phase === 'pour')) {
      drawMediaBottle(sx + 8 * S, sy - 30 * S, 7.0);
    }
  }
  function drawTech(sx, y, flip, swing, moving) {
    ctx.save();
    ctx.translate(sx, y);
    ctx.scale(flip, 1);
    const s = S;
    ctx.fillStyle = '#2e3757';
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1;
    ctx.fillRect(-5 * s + swing * 0.4, 0, 4 * s, 6 * s);
    ctx.strokeRect(-5 * s + swing * 0.4, 0, 4 * s, 6 * s);
    ctx.fillRect(1 * s - swing * 0.4, 0, 4 * s, 6 * s);
    ctx.strokeRect(1 * s - swing * 0.4, 0, 4 * s, 6 * s);
    rrect(-7 * s, -16 * s, 14 * s, 16 * s, 3 * s);
    ctx.fillStyle = '#f2f6ff';
    ctx.fill();
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = T.accentMed;
    ctx.fillRect(-1 * s, -16 * s, 2 * s, 14 * s);
    ctx.fillStyle = '#dbe4f7';
    ctx.fillRect(-9 * s, -15 * s + swing * 0.6, 3 * s, 10 * s);
    ctx.strokeRect(-9 * s, -15 * s + swing * 0.6, 3 * s, 10 * s);
    ctx.fillRect(6 * s, -15 * s - swing * 0.6, 3 * s, 10 * s);
    ctx.strokeRect(6 * s, -15 * s - swing * 0.6, 3 * s, 10 * s);
    rrect(-6 * s, -26 * s, 12 * s, 10 * s, 2.5 * s);
    ctx.fillStyle = '#f2c9a1';
    ctx.fill();
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.fillStyle = '#3a2e28';
    rrect(-6 * s, -27 * s, 12 * s, 4.5 * s, 2.5 * s);
    ctx.fill();
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1; ctx.stroke();
    ctx.fillStyle = '#141a2e';
    ctx.fillRect(1 * s, -21 * s, 1.6 * s, 2.4 * s);
    ctx.fillRect(5 * s, -21 * s, 1.6 * s, 2.4 * s);
    ctx.restore();
  }
  function drawCart(sx, y, flip, moving) {
    const s = S;
    ctx.save();
    ctx.translate(sx, y);
    ctx.scale(flip, 1);
    // chassis
    rrect(-11 * s, -8 * s, 22 * s, 7 * s, 2);
    ctx.fillStyle = '#3d476e';
    ctx.fill();
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1.2; ctx.stroke();
    // accent stripe
    ctx.fillStyle = T.accentMed;
    ctx.fillRect(-11 * s, -5 * s, 22 * s, 1.6 * s);
    // rack with two flasks
    ctx.fillStyle = '#2b3354';
    ctx.fillRect(-7 * s, -16 * s, 14 * s, 8 * s);
    ctx.strokeStyle = OUTLINE; ctx.lineWidth = 1;
    ctx.strokeRect(-7 * s, -16 * s, 14 * s, 8 * s);
    drawMiniFlask(-4 * s, -14 * s, 1);
    drawMiniFlask(4 * s, -14 * s, 0.6);
    // wheels (spin when moving)
    const a = moving ? avatar.bob * 7 * 2.4 : 0;
    for (let i = 0; i < 2; i++) {
      const wx = -8 * s + i * 16 * s;
      ellipse(wx, -1 * s, 3.4 * s, 3.4 * s, '#20263c', OUTLINE, 1);
      ctx.strokeStyle = '#6d7ba6';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(wx, -1 * s);
      ctx.lineTo(wx + Math.cos(a) * 2 * s, -1 * s + Math.sin(a) * 2 * s);
      ctx.stroke();
    }
    ctx.restore();
  }
  function drawMiniFlask(x, y, cells) {
    const s = S * 0.8;
    ellipse(x, y + s * 0.5, 3.2 * s, 2.6 * s, '#d7e5ff', OUTLINE, 1);
    ctx.strokeStyle = OUTLINE;
    ctx.beginPath();
    ctx.moveTo(x - 1.2 * s, y - 2 * s); ctx.lineTo(x - 1.2 * s, y - 4.6 * s);
    ctx.moveTo(x + 1.2 * s, y - 2 * s); ctx.lineTo(x + 1.2 * s, y - 4.6 * s);
    ctx.moveTo(x - 1.2 * s, y - 4.6 * s); ctx.lineTo(x + 1.2 * s, y - 4.6 * s);
    ctx.stroke();
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(x, y + s * 0.5, 2.3 * s, 1.8 * s, 0, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = mediaColor(7.4);
    ctx.fillRect(x - 3 * s, y - 1 * s, 6 * s, 4 * s);
    ctx.restore();
  }

  /* ------------------------------------------------------------------ *
   * Avatar movement: Dijkstra routing on the grid, leg-by-leg walking   *
   * ------------------------------------------------------------------ */
  function route(sx, sy, tx, ty) {
    const blocked = new Set();
    for (let i = 0; i < stations.length; i++) blocked.add(stations[i].gx + ',' + stations[i].gy);
    const start = sx + ',' + sy, goal = tx + ',' + ty;
    if (start === goal) return [];
    const dist = new Map([[start, 0]]);
    const prev = new Map();
    const pq = [{ k: start, d: 0 }];
    let guard = 0;
    while (pq.length && guard++ < 4000) {
      pq.sort(function (a, b) { return a.d - b.d; });
      const cur = pq.shift();
      if (cur.k === goal) break;
      if (cur.d > (dist.get(cur.k) || Infinity)) continue;
      const p = cur.k.split(',');
      const gx = +p[0], gy = +p[1];
      const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
      for (let i = 0; i < 4; i++) {
        const nx = gx + dirs[i][0], ny = gy + dirs[i][1];
        if (nx < 0 || ny < 0 || nx >= COLS || ny >= ROWS) continue;
        if (blocked.has(nx + ',' + ny)) continue;
        const nc = nx + ',' + ny;
        const cost = isPath(nx, ny) || isRoad(nx, ny) ? 1 : 2.2;
        const nd = cur.d + cost;
        if (nd < (dist.get(nc) || Infinity)) {
          dist.set(nc, nd); prev.set(nc, cur.k); pq.push({ k: nc, d: nd });
        }
      }
    }
    if (!prev.has(goal)) return [];
    const path = [];
    let c = goal;
    while (c !== start) {
      const p = c.split(',');
      path.unshift([+p[0], +p[1]]);
      c = prev.get(c);
      if (!c) break;
    }
    return path;
  }
  function startWalking(waypoints, onDone) {
    avatar.walking = true;
    avatar.onArrive = onDone || null;
    if (!waypoints || !waypoints.length) {
      avatar.walking = false;
      if (avatar.onArrive) { const f = avatar.onArrive; avatar.onArrive = null; f(); }
      return;
    }
    avatar.from = { gx: avatar.gx, gy: avatar.gy };
    avatar.legs = waypoints;
    avatar.legIdx = 0;
    avatar.to = { gx: waypoints[0][0], gy: waypoints[0][1] };
    avatar.t = 0;
    avatar.moving = true;
    avatar.legDur = legDuration(avatar.from, avatar.to);
  }
  function legDuration(a, b) {
    return Math.max(Math.abs(b.gx - a.gx), Math.abs(b.gy - a.gy)) * 0.4 / Math.max(1, speed);
  }
  function updateAvatar(dt) {
    if (avatar.moving) {
      avatar.t += dt;
      let k = avatar.t / avatar.legDur;
      if (k >= 1) k = 1;
      avatar.gx = avatar.from.gx + (avatar.to.gx - avatar.from.gx) * k;
      avatar.gy = avatar.from.gy + (avatar.to.gy - avatar.from.gy) * k;
      const dx = avatar.to.gx - avatar.from.gx, dy = avatar.to.gy - avatar.from.gy;
      if (dx !== 0) avatar.faceX = dx < 0 ? -1 : 1;
      if (dy !== 0) avatar.faceY = dy < 0 ? -1 : 1;
      if (k >= 1) {
        avatar.from = { gx: avatar.to.gx, gy: avatar.to.gy };
        avatar.legIdx++;
        const leg = avatar.legs[avatar.legIdx];
        if (leg) {
          avatar.to = { gx: leg[0], gy: leg[1] };
          avatar.t = 0;
          avatar.legDur = legDuration(avatar.from, avatar.to);
        } else {
          avatar.moving = false;
          avatar.walking = false;
          avatar.gx = avatar.from.gx; avatar.gy = avatar.from.gy;
          if (avatar.onArrive) { const f = avatar.onArrive; avatar.onArrive = null; f(); }
        }
      }
    }
    if (avatar.walking) avatar.bob += dt;
  }
  function stopWalking() {
    avatar.moving = false; avatar.walking = false; avatar.onArrive = null; avatar.legs = [];
  }

  /* ------------------------------------------------------------------ *
   * Mode scripts — state machines that drive teaching moments + events  *
   * ------------------------------------------------------------------ */
  function fire(type, payload) {
    if (typeof cb === 'function') {
      try { cb({ type: type, payload: payload || { mode: mode } }); } catch (e) { /* app errors must not break renderer */ }
    }
  }
  function markStop(sid) {
    visitedStops.add(sid);
    needsRedraw = true;
  }
  function resetModeVisuals(m) {
    if (m === 'contamination') {
      const rnd = seededRand(0xC0FFEE);
      gooBlobs = [];
      for (let i = 0; i < 16; i++) {
        const ang = rnd() * Math.PI * 0.9;
        const d = 0.15 + rnd() * 0.95;
        gooBlobs.push({
          u: 0.95 - Math.cos(ang) * d * 0.85,
          v: 0.9 - Math.sin(ang) * d * 0.8,
          r: 4 + rnd() * 9,
          green: rnd() < 0.42,
          seed: rnd() * 100,
          appear: 0.1 + (i / 16) * 0.85
        });
      }
    } else if (m !== 'idle' && mode !== 'contamination') {
      gooBlobs = [];
    }
  }
  function setupMode(m) {
    mode = m;
    modeState = { m: m, t: 0, fired: {}, phase: 'init', highlight: null };
    resetModeVisuals(m);
    stopWalking();
    infoPopup = null;
    needsRedraw = true;
    if (m === 'freeze') {
      paused = true;
    } else {
      paused = speed === 0;
    }
    lastTs = 0;
    ensureLoop();
    if (m === 'visit') setupVisit();
    else if (m === 'feed') setupFeed();
    else if (m === 'passage') setupPassage();
    else if (m === 'contamination') setupContamination();
    else if (m === 'oxygen') setupOxygen();
    else if (m === 'hood') setupHood();
  }

  function setupVisit() {
    const order = ['flask', 'hood', 'incubator', 'microscope', 'centrifuge', 'vial'];
    const waypoints = [];
    let cx = Math.round(avatar.gx), cy = Math.round(avatar.gy);
    for (let i = 0; i < order.length; i++) {
      const s = stationById(order[i]);
      if (!s) continue;
      const leg = route(cx, cy, s.gx, s.gy);
      for (let j = 0; j < leg.length; j++) waypoints.push(leg[j]);
      cx = s.gx; cy = s.gy;
    }
    modeState.waypoints = waypoints;
    modeState.idx = 0;
    modeState.stopsRemaining = order.length;
    nextVisitLeg();
  }
  function nextVisitLeg() {
    const s = modeState;
    if (s.phase === 'done') return;
    if (s.idx >= s.waypoints.length) {
      s.phase = 'done';
      fire('level_done', { mode: 'visit' });
      return;
    }
    const wp = s.waypoints.slice(s.idx);
    s.idx = s.waypoints.length;
    const last = wp[wp.length - 1];
    let hs = null;
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].gx === last[0] && stations[i].gy === last[1]) hs = stations[i].id;
    }
    s.highlight = hs;
    startWalking(wp, function () {
      s.phase = 'pause';
      s.t = 0;
      avatar.walking = false;
      if (hs) {
        markStop(hs);
        infoPopup = hs;          // show the explanation like a tour stop
        needsRedraw = true;
      }
    });
  }
  function updateVisit(s, dt) {
    if (s.phase === 'pause') {
      s.t += dt;
      if (s.t > 1.6) { s.phase = 'walk'; nextVisitLeg(); }
    }
  }

  function setupFeed() {
    const s = modeState;
    s.phase = 'routeToFlask';
    culture.density = 0.4;
    culture.ph = 6.8;
    culture.pourT = 0;
    const f = stationById('flask');
    const wp = route(Math.round(avatar.gx), Math.round(avatar.gy), f.gx, f.gy);
    startWalking(wp, function () {
      s.phase = 'pickup';
      s.t = 0;
      avatar.walking = false;
    });
  }
  function updateFeed(s, dt) {
    if (s.phase === 'pickup') {
      s.t += dt;
      if (s.t > 0.9) {
        s.phase = 'routeToDish';
        const wp = route(Math.round(avatar.gx), Math.round(avatar.gy), culture.gx, culture.gy);
        startWalking(wp, function () {
          s.phase = 'pour';
          s.t = 0;
          avatar.walking = false;
        });
      }
    } else if (s.phase === 'pour') {
      s.t += dt;
      const k = Math.min(1, s.t / 5);
      culture.pourT = k;
      culture.ph = 6.8 + (7.4 - 6.8) * k;
      culture.density = 0.4 + k * 0.45;
      if (k >= 1) {
        s.phase = 'done';
        fire('level_done', { mode: 'feed' });
      }
    }
  }

  function setupPassage() {
    const s = modeState;
    s.phase = 'grow';
    s.t = 0;
    culture.ph = 7.4;
    culture.density = 0.25;
    culture.pourT = 0;
  }
  function updatePassage(s, dt) {
    if (s.phase === 'grow') {
      s.t += dt;
      culture.density = Math.min(1, 0.25 + s.t / 4.5);
      if (!s.fired.confluent && culture.density >= 0.97) {
        s.fired.confluent = true;
        fire('confluent', { density: culture.density });
        s.phase = 'split';
        s.t = 0;
      }
    } else if (s.phase === 'split') {
      s.t += dt;
      s.splitK = Math.min(1, s.t / 2.8);
      if (s.t >= 2.8) {
        s.phase = 'done';
        if (!s.fired.grown) {
          s.fired.grown = true;
          fire('grown', { ratio: '1:2', from: 1, to: 2 });
        }
        fire('level_done', { mode: 'passage' });
      }
    }
  }

  function setupContamination() {
    const s = modeState;
    s.phase = 'latent';
    s.t = 0;
    culture.ph = 7.4;
    culture.contamK = 0;
    culture.density = 0.7;
  }
  function updateContamination(s, dt) {
    if (s.phase === 'latent') {
      s.t += dt;
      if (s.t > 1.8) { s.phase = 'spread'; s.t = 0; }
    } else if (s.phase === 'spread') {
      s.t += dt;
      const k = Math.min(1, s.t / 10);
      culture.contamK = k;
      culture.ph = 7.4 - 0.62 * k;
      culture.density = 0.7 + k * 0.2;
      if (!s.fired.ph_crash && culture.ph <= 7.12) {
        s.fired.ph_crash = true;
        fire('ph_crash', { ph: culture.ph });
      }
      if (!s.fired.contam && k >= 0.5) {
        s.fired.contam = true;
        fire('contam_spotted', { coverage: Math.round(k * 100) + '%' });
      }
      if (k >= 0.97) {
        s.phase = 'done';
        s.fired.contam = s.fired.contam || true;
        fire('level_done', { mode: 'contamination' });
      }
    }
  }

  function setupOxygen() {
    const s = modeState;
    s.phase = 'flow';
    s.t = 0;
    culture.flow = 0;
    culture.ph = 7.4;
    culture.density = 0.85;
  }
  function updateOxygen(s, dt) {
    s.t += dt;
    culture.flow = Math.min(1, s.t / 4.5);
    if (!s.fired.oxygen_limit && culture.flow >= 0.9) {
      s.fired.oxygen_limit = true;
      fire('oxygen_limit', { limit_um: 200 });
    }
    if (s.t >= 6.2) {
      s.phase = 'done';
      fire('level_done', { mode: 'oxygen' });
    }
  }

  function setupHood() {
    const s = modeState;
    s.phase = 'route';
    const hd = stationById('hood');
    const wp = route(Math.round(avatar.gx), Math.round(avatar.gy), hd.gx - 1, hd.gy);
    startWalking(wp, function () {
      s.phase = 'work';
      s.t = 0;
      avatar.walking = false;
      avatar.faceX = 1;
      avatar.faceY = -1;
      markStop('hood');
    });
  }
  function updateHood(s, dt) {
    if (s.phase === 'work') {
      s.t += dt;
      if (s.t > 4.5) {
        s.phase = 'done';
        fire('level_done', { mode: 'hood' });
      }
    }
  }

  function updateMode(dt) {
    const s = modeState;
    if (!s || s.phase === 'done') return;
    if (s.m === 'visit') updateVisit(s, dt);
    else if (s.m === 'feed') updateFeed(s, dt);
    else if (s.m === 'passage') updatePassage(s, dt);
    else if (s.m === 'contamination') updateContamination(s, dt);
    else if (s.m === 'oxygen') updateOxygen(s, dt);
    else if (s.m === 'hood') updateHood(s, dt);
  }

  /* --------------------------------- main loop ----------------------- */
  function update(dt) {
    clock += dt;
    updateAvatar(dt);
    updateMode(dt);
  }
  function tick(ts) {
    rafId = requestAnimationFrame(tick);
    if (paused) {
      if (needsRedraw) { needsRedraw = false; draw(); }
      return;
    }
    if (!lastTs) lastTs = ts;
    let dt = (ts - lastTs) / 1000;
    lastTs = ts;
    if (dt > 0.1) dt = 0.1;
    const sf = SPEED_FACTOR[speed] || 1;
    update(dt * sf);
    draw();
  }
  function ensureLoop() {
    if (!rafId) {
      lastTs = 0;
      rafId = requestAnimationFrame(tick);
    }
  }

  /* --------------------------------- draw frame ---------------------- */
  function draw() {
    if (!ctx) return;
    hitAreas = [];
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = T.bgDeep;
    ctx.fillRect(0, 0, W, H);
    const vg = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.2, W / 2, H / 2, Math.max(W, H) * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)');
    vg.addColorStop(1, 'rgba(0,0,0,0.38)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);

    const items = [];
    for (let gy = 0; gy < ROWS; gy++) {
      for (let gx = 0; gx < COLS; gx++) {
        (function (a, b) { items.push({ d: a + b, fn: function () { drawTile(a, b); } }); })(gx, gy);
      }
    }
    for (let i = 0; i < DECOR.length; i++) {
      (function (dec) { items.push({ d: dec.gx + dec.gy, fn: function () { drawDecoration(dec); } }); })(DECOR[i]);
    }
    items.push({ d: culture.gx + culture.gy, fn: drawCulture });
    for (let i = 0; i < stations.length; i++) {
      (function (st) { items.push({ d: st.gx + st.gy, fn: function () { drawStation(st); } }); })(stations[i]);
    }
    items.push({ d: avatar.gx + avatar.gy, fn: drawAvatar });
    items.sort(function (a, b) { return a.d - b.d; });
    for (let i = 0; i < items.length; i++) items[i].fn();

    drawHUD();
    if (overlayOpen) drawStopOverlay();
    if (infoPopup) drawInfoPopup();
  }

  /* --------------------------------- HUD ------------------------------ */
  function drawHUD() {
    const ml = MODE_LABEL[mode] || MODE_LABEL.idle;
    const bw = Math.min(230, W * 0.42);
    const bx = 10, by = 10, bh = 46;
    ctx.fillStyle = 'rgba(10,15,30,0.85)';
    rrect(bx, by, bw, bh, 8);
    ctx.fill();
    ctx.strokeStyle = ml.color;
    ctx.lineWidth = 1.6;
    rrect(bx, by, bw, bh, 8);
    ctx.stroke();
    tt(ml.title, bx + 12, by + 17, { size: 12, weight: 700, font: 'Silkscreen, "Courier New", monospace', color: ml.color });
    tt(ml.sub, bx + 12, by + 33, { size: 9, color: T.ink });
    if (modeState && modeState.phase !== 'done' && modeState.phase !== 'init') {
      let prog = 0;
      const s = modeState;
      if (s.m === 'feed' && s.phase === 'pour') prog = Math.min(1, s.t / 5);
      else if (s.m === 'passage' && s.phase === 'grow') prog = Math.min(1, s.t / 4.5);
      else if (s.m === 'passage' && s.phase === 'split') prog = Math.min(1, s.t / 2.8);
      else if (s.m === 'contamination' && s.phase === 'spread') prog = Math.min(1, s.t / 10);
      else if (s.m === 'oxygen') prog = Math.min(1, s.t / 6.2);
      else if (s.m === 'hood' && s.phase === 'work') prog = Math.min(1, s.t / 4.5);
      else if (s.m === 'visit' && s.waypoints) prog = s.waypoints.length ? Math.min(1, s.idx / s.waypoints.length) : 1;
      ctx.fillStyle = 'rgba(255,255,255,0.14)';
      ctx.fillRect(bx + 12, by + 38, bw - 24, 3);
      ctx.fillStyle = ml.color;
      ctx.fillRect(bx + 12, by + 38, (bw - 24) * prog, 3);
    }

    // Stops seen readout (top-right)
    const stk = 'Stops seen ' + visitedStops.size + ' / 6';
    ctx.fillStyle = 'rgba(10,15,30,0.82)';
    rrect(W - 140, 10, 130, 20, 6);
    ctx.fill();
    ctx.strokeStyle = visitedStops.size >= 6 ? T.accentOk : 'rgba(120,140,255,0.4)';
    ctx.lineWidth = 1.2;
    rrect(W - 140, 10, 130, 20, 6);
    ctx.stroke();
    const soCol = visitedStops.size >= 6 ? T.accentOk : T.ink;
    tt(stk, W - 75, 24, { size: 10, align: 'center', weight: 700, color: soCol, shadow: false });

    // STOPS button (bottom-left)
    const sbx = 10, sby = H - 30, sbw = 92, sbh = 22;
    ctx.fillStyle = overlayOpen ? ShadeAlpha(T.accentInfo, 0.25) : 'rgba(20,26,46,0.92)';
    rrect(sbx, sby, sbw, sbh, 11);
    ctx.fill();
    ctx.strokeStyle = overlayOpen ? T.accentInfo : 'rgba(120,140,255,0.4)';
    ctx.lineWidth = 1.2;
    rrect(sbx, sby, sbw, sbh, 11);
    ctx.stroke();
    tt('STOPS  [S]', sbx + sbw / 2, sby + 15, { size: 9.5, align: 'center', weight: 700, font: 'Silkscreen, "Courier New", monospace', color: overlayOpen ? T.accentInfo : T.ink, shadow: false });
    hitAreas.push({ type: 'stopsBtn', x: sbx, y: sby, w: sbw, h: sbh });

    // speed pills (bottom-right)
    const pw = 30, phP = 20, gap = 6, m = 10;
    for (let i = 0; i < 4; i++) {
      const px = W - m - (4 - i) * (pw + gap);
      const py = H - m - phP;
      const active = paused ? i === 0 : speed === i && i !== 0;
      ctx.fillStyle = active ? (i === 0 ? T.accentMed : T.accentInfo) : 'rgba(20,26,46,0.9)';
      rrect(px, py, pw, phP, 10);
      ctx.fill();
      ctx.strokeStyle = active ? 'rgba(255,255,255,0.6)' : 'rgba(120,140,255,0.35)';
      ctx.lineWidth = 1;
      rrect(px, py, pw, phP, 10);
      ctx.stroke();
      tt(i === 0 && paused ? '❚❚' : labelsFor(i), px + pw / 2, py + phP / 2 + 4, {
        size: 10, align: 'center', font: 'Silkscreen, "Courier New", monospace',
        color: active ? '#fff' : T.ink, shadow: false
      });
      hitAreas.push({ type: 'speed', value: i, x: px, y: py, w: pw, h: phP });
    }
    // hint line
    tt('Space pause · S stops', 10, H - 6, { size: 8.5, weight: 700, font: 'Silkscreen, "Courier New", monospace', color: 'rgba(232,236,255,0.32)', shadow: false });
  }
  function labelsFor(i) { return ['0', '1', '2', '3'][i]; }
  function ShadeAlpha(hex, alpha) {
    // convert hex to rgba with given alpha
    const n = parseInt(hex.slice(1), 16);
    if (isNaN(n)) return 'rgba(20,26,46,0.92)';
    return 'rgba(' + ((n >> 16) & 255) + ',' + ((n >> 8) & 255) + ',' + (n & 255) + ',' + alpha + ')';
  }

  /* ------------------------- stop-list overlay ----------------------- */
  function drawStopOverlay() {
    const ow = Math.min(190, W * 0.3);
    const oy = 64, oh = 26 * stations.length + 26 + 14;
    const ox = W - ow - 10;
    ctx.fillStyle = 'rgba(10,15,30,0.92)';
    rrect(ox, oy, ow, oh, 8);
    ctx.fill();
    ctx.strokeStyle = T.accentInfo;
    ctx.lineWidth = 1.4;
    rrect(ox, oy, ow, oh, 8);
    ctx.stroke();
    tt('STOPS', ox + 10, oy + 17, { size: 11, weight: 700, font: 'Silkscreen, "Courier New", monospace', color: T.accentInfo });
    ctx.fillStyle = 'rgba(120,140,255,0.25)';
    ctx.fillRect(ox + 8, oy + 22, ow - 16, 1.5);
    for (let i = 0; i < stations.length; i++) {
      const st = stations[i];
      const ry = oy + 30 + i * 26;
      const seen = visitedStops.has(st.id);
      ctx.fillStyle = seen ? 'rgba(126,224,129,0.10)' : 'rgba(255,255,255,0.04)';
      rrect(ox + 6, ry, ow - 12, 22, 5);
      ctx.fill();
      ctx.strokeStyle = seen ? 'rgba(126,224,129,0.4)' : 'rgba(120,140,255,0.2)';
      ctx.lineWidth = 1;
      rrect(ox + 6, ry, ow - 12, 22, 5);
      ctx.stroke();
      tt((i + 1) + '.', ox + 12, ry + 15, { size: 9.5, weight: 700, color: seen ? T.accentOk : T.ink, shadow: false });
      tt(st.label, ox + 26, ry + 15, { size: 9, weight: 700, color: seen ? T.accentOk : T.ink, shadow: false });
      tt(seen ? '✓' : '', ox + ow - 16, ry + 15.5, { size: 10, weight: 700, color: T.accentOk, align: 'center', shadow: false });
      hitAreas.push({ type: 'stop', id: st.id, x: ox + 6, y: ry, w: ow - 12, h: 22 });
    }
    tt('S = ride next stop', ox + ow / 2, oy + oh - 5, { size: 8.5, align: 'center', weight: 600, color: 'rgba(232,236,255,0.45)', shadow: false });
  }

  /* --------------------------- info popup ---------------------------- */
  function drawInfoPopup() {
    const st = stationById(infoPopup);
    if (!st) return;
    const text = STATION_INFO[st.kind] || 'A stop on the lab tour.';
    const pw = Math.min(360, W - 40);
    const ph = 74;
    const px = (W - pw) / 2, py = H - ph - 14;
    ctx.fillStyle = 'rgba(12,17,36,0.96)';
    rrect(px, py, pw, ph, 10);
    ctx.fill();
    ctx.strokeStyle = T.accentMed;
    ctx.lineWidth = 1.6;
    rrect(px, py, pw, ph, 10);
    ctx.stroke();
    // colored tab
    ctx.fillStyle = T.accentMed;
    rrect(px + 12, py + 12, 4, 14, 2);
    ctx.fill();
    tt(st.label, px + 24, py + 25, { size: 12, weight: 800, color: T.ink, shadow: false });
    wrapText(text, px + 24, py + 42, pw - 48, 12, T.ink);
    // OK / dismiss button
    const btw = 54, bth = 18;
    const btx = px + pw - btw - 10, bty = py + 10;
    ctx.fillStyle = 'rgba(255,93,143,0.2)';
    rrect(btx, bty, btw, bth, 9);
    ctx.fill();
    ctx.strokeStyle = T.accentMed;
    ctx.lineWidth = 1.2;
    rrect(btx, bty, btw, bth, 9);
    ctx.stroke();
    tt('OK', btx + btw / 2, bty + 13, { size: 9.5, align: 'center', weight: 700, color: T.accentMed, shadow: false });
    hitAreas.push({ type: 'popupOk', x: btx, y: bty, w: btw, h: bth });
  }
  function wrapText(text, x, y, maxW, lineH, color) {
    const words = text.split(' ');
    let line = '';
    let cy = y;
    ctx.font = '600 10px "Nunito", sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    for (let i = 0; i < words.length; i++) {
      const test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillStyle = color;
        ctx.fillText(line, x, cy);
        line = words[i];
        cy += lineH;
      } else {
        line = test;
      }
    }
    if (line) {
      ctx.fillStyle = color;
      ctx.fillText(line, x, cy);
    }
  }

  /* --------------------------- input ------------------------------ */
  function onPointer(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left, y = e.clientY - rect.top;
    // topmost interactive layer = popup OK, then overlay, then HUD buttons
    for (let i = hitAreas.length - 1; i >= 0; i--) {
      const h = hitAreas[i];
      if (x >= h.x && x <= h.x + h.w && y >= h.y && y <= h.y + h.h) {
        if (h.type === 'speed') { setSpeed(h.value); return; }
        if (h.type === 'stopsBtn') { overlayOpen = !overlayOpen; needsRedraw = true; return; }
        if (h.type === 'popupOk') { infoPopup = null; needsRedraw = true; return; }
        if (h.type === 'stop') { rideTo(h.id); overlayOpen = false; needsRedraw = true; return; }
        if (h.type === 'station') { infoPopup = h.id; markStop(h.id); needsRedraw = true; return; }
      }
    }
  }
  function togglePause() {
    if (paused) {
      setSpeed(prevSpeed || 1);
    } else {
      prevSpeed = speed || 1;
      setSpeed(0);
    }
  }
  function rideTo(sid) {
    const s = stationById(sid);
    if (!s) return;
    stopWalking();
    modeState = modeState || { m: mode, t: 0, fired: {}, phase: 'init', highlight: null };
    modeState.highlight = sid;
    const wp = route(Math.round(avatar.gx), Math.round(avatar.gy), s.gx, s.gy);
    startWalking(wp, function () {
      avatar.walking = false;
      markStop(sid);
      infoPopup = sid;
      needsRedraw = true;
    });
  }
  function onKey(e) {
    // let text inputs have their keys
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    // Interactive controls (buttons, role=button, links, tabbables) own their
    // keys — Space must activate quiz options and map nodes, not toggle pause.
    if (t && typeof t.closest === 'function' && t.closest('button, [role="button"], a, [tabindex]')) return;
    const c = e.code;
    if (c === 'Space') {
      e.preventDefault();
      togglePause();
      needsRedraw = true;
    } else if (c === 'KeyS') {
      e.preventDefault();
      if (!overlayOpen) {
        overlayOpen = true;
        needsRedraw = true;
        return;
      }
      // overlay is open → ride to next unvisited stop
      const order = stations.map(function (st) { return st.id; });
      const firstUnseen = order[order.findIndex(function (id) { return !visitedStops.has(id); })];
      const next = firstUnseen || order[0];
      rideTo(next);
      overlayOpen = false;
      needsRedraw = true;
    } else if (c === 'Escape') {
      infoPopup = null;
      overlayOpen = false;
      needsRedraw = true;
    }
  }

  /* --------------------------------- public API ----------------------- */
  function setSpeed(s) {
    s = Math.max(0, Math.min(3, Math.round(Number(s) || 0)));
    speed = s;
    if (s === 0) {
      // Full freeze: flip the HUD into the PAUSED mode (modeState is left
      // intact so the sim resumes exactly where it stopped).
      paused = true;
      if (mode !== 'freeze') {
        prevMode = mode;
        mode = 'freeze';
      }
    } else {
      // Resuming from freeze restores the mode that was active before pausing.
      if (mode === 'freeze') mode = prevMode || 'idle';
      paused = false;
    }
    lastTs = 0;
    needsRedraw = true;
    ensureLoop();
    if (typeof speedCb === 'function') {
      try { speedCb(speed); } catch (e) { /* app errors must not break renderer */ }
    }
  }
  function setMode(m) {
    const valid = ['idle', 'visit', 'passage', 'feed', 'contamination', 'oxygen', 'hood', 'freeze'];
    if (valid.indexOf(m) < 0) m = 'idle';
    setupMode(m);
  }
  function setStation(st) {
    if (!st || !st.kind) return;
    for (let i = 0; i < stations.length; i++) {
      if (stations[i].kind === st.kind || stations[i].id === st.kind) {
        if (typeof st.label === 'string' && st.label.length) stations[i].label = st.label;
        stations[i].active = !!st.active;
        needsRedraw = true;
        return;
      }
    }
  }
  function onEvent(fn) {
    cb = typeof fn === 'function' ? fn : null;
  }
  function onSpeed(fn) {
    speedCb = typeof fn === 'function' ? fn : null;
    // Report the current speed immediately so the app can sync on registration.
    if (typeof speedCb === 'function') {
      try { speedCb(speed); } catch (e) { /* app errors must not break renderer */ }
    }
  }
  function init(canvasEl, opts) {
    opts = opts || {};
    canvas = canvasEl;
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    refreshTokens();
    if (opts.accent) T.accentMed = opts.accent;
    if (opts.width || opts.height) {
      if (opts.width) canvas.style.width = opts.width + 'px';
      if (opts.height) canvas.style.height = opts.height + 'px';
    }
    stations = [];
    for (let i = 0; i < STATION_DEFS.length; i++) {
      stations.push(Object.assign({ active: false }, STATION_DEFS[i]));
    }
    culture = {
      gx: 4, gy: 3,
      ph: 7.4, density: 0.6, pourT: 0, contamK: 0, flow: 0,
      cells: buildCells()
    };
    setupAvatar();
    gooBlobs = [];
    modeState = null;
    mode = 'idle';
    speed = 1;
    prevSpeed = 1;
    paused = false;
    visitedStops = new Set();
    overlayOpen = false;
    infoPopup = null;
    hitAreas = [];
    sizeCanvas();
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(function () { sizeCanvas(); });
      ro.observe(canvas);
    }
    canvas.addEventListener('pointerdown', onPointer);
    if (!keyBound) {
      if (typeof window !== 'undefined') window.addEventListener('keydown', onKey);
      keyBound = true;
    }
    if (typeof document !== 'undefined' && document.fonts) {
      try {
        document.fonts.load('12px Silkscreen');
        document.fonts.load('12px Nunito');
      } catch (e2) { /* ignore */ }
    }
    ensureLoop();
  }
  function destroy() {
    if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
    if (ro) { ro.disconnect(); ro = null; }
    if (canvas) canvas.removeEventListener('pointerdown', onPointer);
    if (typeof window !== 'undefined') window.removeEventListener('keydown', onKey);
    keyBound = false;
    canvas = null; ctx = null; cb = null; modeState = null; hitAreas = [];
  }
  // debug/test hook — advance one manual frame (used by a standalone harness)
  function debugTick(ms) {
    if (!ctx) return;
    const sf = SPEED_FACTOR[speed] || 1;
    const dt = (ms || 16) / 1000;
    if (!paused) update(dt * sf);
    draw();
  }

  NS.RENDER = {
    init: init,
    setMode: setMode,
    setSpeed: setSpeed,
    setStation: setStation,
    onEvent: onEvent,
    onSpeed: onSpeed,
    destroy: destroy,
    __debugTick: debugTick
  };
})();
