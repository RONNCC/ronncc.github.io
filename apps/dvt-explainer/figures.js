/* Deep Vein Thrombosis, Up Close — figure builders (window.DVTFigures)
 * Pure functions: each builder takes a small state object and returns SVG (or HTML)
 * as a string. No DOM access here, which keeps every plate unit-testable offline
 * (see smoke-test.js) and lets app.js decide when to (re)render.
 */
(function () {
  'use strict';

  /* ==================================================================
   * 0. Tiny SVG string helpers
   * ================================================================== */

  function esc(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function attrs(map) {
    var out = '';
    for (var key in map) {
      if (!Object.prototype.hasOwnProperty.call(map, key)) continue;
      var value = map[key];
      if (value === undefined || value === null || value === false) continue;
      out += ' ' + key + '="' + esc(value) + '"';
    }
    return out;
  }

  function el(tag, map, children) {
    var kids = children === undefined || children === null ? ''
      : (Array.isArray(children) ? children.join('') : String(children));
    return '<' + tag + attrs(map) + '>' + kids + '</' + tag + '>';
  }

  function txt(x, y, str, map) {
    var o = { x: x, y: y };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('text', o, esc(str));
  }

  /* Multi-line text block, anchored on its vertical centre. */
  function textBlock(x, y, lines, map) {
    var list = Array.isArray(lines) ? lines : [lines];
    var lh = (map && map.lh) || 15;
    var start = y - ((list.length - 1) * lh) / 2;
    var m = { textAnchor: (map && map.textAnchor) || 'middle' };
    if (map && map.cls) m['class'] = map.cls;
    return list.map(function (line, i) {
      return txt(x, start + i * lh, line, m);
    }).join('');
  }

  function circle(cx, cy, r, map) {
    var o = { cx: cx, cy: cy, r: r };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('circle', o);
  }

  function ellipse(cx, cy, rx, ry, map) {
    var o = { cx: cx, cy: cy, rx: rx, ry: ry };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('ellipse', o);
  }

  function rect(x, y, w, h, map) {
    var o = { x: x, y: y, width: w, height: h };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('rect', o);
  }

  function path(d, map) {
    var o = { d: d };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('path', o);
  }

  function line(x1, y1, x2, y2, map) {
    var o = { x1: x1, y1: y1, x2: x2, y2: y2 };
    for (var k in map) if (Object.prototype.hasOwnProperty.call(map, k)) o[k] = map[k];
    return el('line', o);
  }

  function group(map, children) {
    return el('g', map, children);
  }

  function svg(viewBox, className, children) {
    return el('svg', {
      viewBox: viewBox,
      'class': 'fig-svg ' + (className || ''),
      role: 'img',
      xmlns: 'http://www.w3.org/2000/svg',
      preserveAspectRatio: 'xMidYMid meet'
    }, children);
  }

  /* Callout used all over the plates: dot + elbow + text.
   * dir: +1 puts the label to the right of the elbow, -1 to the left. */
  function leader(ax, ay, tx, ty, lines, opts) {
    var o = opts || {};
    var dir = o.dir === -1 ? -1 : 1;
    var cls = o.cls || 'v-leader';
    var textX = tx + dir * 14;
    var anchor = dir === 1 ? 'start' : 'end';
    var parts = [
      path('M ' + ax + ' ' + ay + ' L ' + tx + ' ' + ty + ' L ' + (tx + dir * 9) + ' ' + ty,
        { 'class': cls + '-line' }),
      circle(ax, ay, 3.2, { 'class': cls + '-dot' }),
      textBlock(textX, ty, lines, { textAnchor: anchor, lh: o.lh || 15, cls: cls + '-text' })
    ];
    if (o.box) {
      var w = o.boxWidth || 150;
      var h = lines.length * (o.lh || 15) + 12;
      parts.unshift(rect(textX - (anchor === 'start' ? 6 : w - 6), ty - h / 2 - 1, w, h,
        { 'class': cls + '-box', rx: 6 }));
    }
    return group({ 'class': cls }, parts);
  }

  /* Deterministic pseudo-random, so plates render identically every time. */
  function rng(seed) {
    var s = seed >>> 0;
    return function () {
      s = (s * 1664525 + 1013904223) >>> 0;
      return s / 4294967296;
    };
  }

  function speckle(seed, count, box, rMin, rMax, cls) {
    var rand = rng(seed);
    var out = [];
    for (var i = 0; i < count; i++) {
      var x = box.x + rand() * box.w;
      var y = box.y + rand() * box.h;
      var r = rMin + rand() * (rMax - rMin);
      out.push(circle(Math.round(x * 10) / 10, Math.round(y * 10) / 10, Math.round(r * 100) / 100,
        { 'class': cls }));
    }
    return out.join('');
  }

  /* A small one-way valve, drawn as two leaflets meeting in the middle of a vein. */
  function valve(cx, cy, halfWidth, opts) {
    var o = opts || {};
    var h = o.h || 12;
    var cls = o.cls || 'v-valve';
    var open = o.open;
    var spread = open ? halfWidth * 0.55 : 1.5;
    return group({ 'class': cls, transform: 'translate(' + cx + ' ' + cy + ')' }, [
      path('M ' + (-halfWidth) + ' 0 Q ' + (-halfWidth * 0.45) + ' ' + (h * 0.4) + ' '
        + (-spread) + ' ' + (h * (open ? 0.2 : 0.9)), { 'class': cls + '-leaf' }),
      path('M ' + (halfWidth) + ' 0 Q ' + (halfWidth * 0.45) + ' ' + (h * 0.4) + ' '
        + (spread) + ' ' + (h * (open ? 0.2 : 0.9)), { 'class': cls + '-leaf' })
    ]);
  }

  /* ==================================================================
   * 1. Geometry helpers
   * ================================================================== */

  /* Posterior-view contour of a lower leg from knee (y0) to ankle (y1).
   * `profile` lets a plate restyle the silhouette (wider knee, higher calf
   * bulge, narrower ankle) without duplicating the bezier work. */
  function legOutline(cx, swell, y0, y1, profile) {
    y0 = y0 === undefined ? 60 : y0;
    y1 = y1 === undefined ? 520 : y1;
    var s = swell || 0;
    var p = profile || {};
    var wKnee = (p.kneeW || 56) + s * 2;
    var wCalf = (p.calfW || 74) + s * 9;
    var wAnkle = (p.ankleW || 34) + s * 4;
    var midAt = p.mid === undefined ? 0.52 : p.mid;
    var mid = y0 + (y1 - y0) * midAt;
    return [
      'M', cx - wKnee, y0,
      'C', cx - wKnee - 10, y0 + (y1 - y0) * 0.16, cx - wCalf, mid - (y1 - y0) * 0.22, cx - wCalf, mid,
      'C', cx - wCalf, mid + (y1 - y0) * 0.18, cx - wAnkle - 18, y1 - (y1 - y0) * 0.1, cx - wAnkle, y1,
      'L', cx + wAnkle, y1,
      'C', cx + wAnkle + 18, y1 - (y1 - y0) * 0.1, cx + wCalf, mid + (y1 - y0) * 0.18, cx + wCalf, mid,
      'C', cx + wCalf, mid - (y1 - y0) * 0.22, cx + wKnee + 10, y0 + (y1 - y0) * 0.16, cx + wKnee, y0,
      'Z'
    ].join(' ');
  }

  function polylinePoints(points) {
    return points.map(function (p) { return p[0] + ',' + p[1]; }).join(' ');
  }

  function routeLength(points) {
    var total = 0;
    for (var i = 1; i < points.length; i++) {
      total += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
    }
    return total;
  }

  /* Position at a given distance along a polyline — used to fly the embolus. */
  function pointAtDistance(points, distance) {
    var remaining = Math.max(0, distance);
    for (var i = 1; i < points.length; i++) {
      var a = points[i - 1];
      var b = points[i];
      var seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
      if (remaining <= seg || i === points.length - 1) {
        var t = seg === 0 ? 0 : Math.min(1, remaining / seg);
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
      }
      remaining -= seg;
    }
    return points[points.length - 1].slice();
  }

  /* How much a vein collapses under probe pressure.
   * Normal veins obliterate; a clotted vein barely changes. */
  function squeeze(patient, pressure) {
    var p = Math.max(0, Math.min(100, pressure)) / 100;
    var collapse = patient === 'dvt' ? 0.08 : 0.965;
    var openFraction = 1 - collapse * (p * p * 0.55 + p * 0.45); // eases out near full pressure
    return {
      rxFactor: 1 - (1 - openFraction) * 0.35,
      ryFactor: openFraction,
      lumenPercent: Math.round(openFraction * 100),
      obliterated: openFraction < 0.12
    };
  }

  /* ==================================================================
   * 2. Fig. 1 — scale explorer
   * ================================================================== */

  function scaleLegScene() {
    var rand = rng(7);
    var dots = [];
    for (var i = 0; i < 26; i++) {
      var y = 150 + rand() * 300;
      var x = 252 + rand() * 34;
      dots.push(circle(Math.round(x * 10) / 10, Math.round(y * 10) / 10, 1.6 + rand() * 1.4,
        { 'class': 'v-bone-dot' }));
    }
    return [
      group({ 'class': 'v-layer v-layer--leg' }, [
        // soft shadow + leg
        ellipse(276, 372, 118, 16, { 'class': 'v-ground' }),
        path('M 205 24 C 190 84, 182 128, 186 176 C 190 226, 214 268, 236 306 '
          + 'C 244 322, 250 336, 252 356 L 300 356 C 302 336, 308 322, 316 306 '
          + 'C 338 268, 362 226, 366 176 C 370 128, 362 84, 347 24 Z',
          { 'class': 'v-leg-shape' }),
        // deep structures hinted inside
        path('M 262 40 C 256 140, 254 250, 258 350', { 'class': 'v-bone' }),
        path('M 292 46 C 296 150, 294 260, 290 348', { 'class': 'v-bone v-bone--thin' }),
        dots.join(''),
        ellipse(276, 210, 60, 96, { 'class': 'v-muscle-ghost' }),
        ellipse(282, 300, 52, 70, { 'class': 'v-muscle-ghost' }),
        // the zoom window
        rect(198, 150, 156, 120, { 'class': 'v-zoom-frame', rx: 8 }),
        group({ 'class': 'v-zoom-ticks' }, [
          path('M 198 150 L 198 128 L 176 128', {}),
          path('M 354 150 L 354 128 L 376 128', {}),
          path('M 198 270 L 198 292 L 176 292', {}),
          path('M 354 270 L 354 292 L 376 292', {})
        ]),
        txt(276, 84, 'knee', { 'class': 'v-anat-label' }),
        txt(276, 400, 'ankle', { 'class': 'v-anat-label' }),
        textBlock(220, 210, ['deep veins', 'and muscles'], { cls: 'v-anat-note' })
      ]),
      leader(354, 208, 402, 150, ['the part', 'we zoom into'], { cls: 'v-leader' }),
      scaleBar(24, 44, '10 cm')
    ].join('');
  }

  function scaleSliceScene() {
    var veins = [];
    function vpair(x, y, r, label, cls) {
      veins.push(group({ 'class': 'v-slice-vein ' + cls },
        circle(x - r - 2, y, r, { 'class': 'v-slice-vein-lumen' })
        + circle(x + r + 2, y, r, { 'class': 'v-slice-vein-lumen' })
        + (label ? txt(x, y - r - 9, label, { 'class': 'v-anat-label v-anat-label--tiny' }) : '')
      ));
    }
    return [
      group({ 'class': 'v-layer v-layer--slice' }, [
        ellipse(276, 196, 150, 122, { 'class': 'v-slice-skin' }),
        ellipse(276, 196, 140, 112, { 'class': 'v-slice-fat' }),
        // compartments
        path('M 160 150 C 210 96, 344 96, 392 150 C 350 168, 202 168, 160 150 Z', { 'class': 'v-slice-compartment v-slice-compartment--ant' }),
        path('M 388 168 C 408 210, 400 268, 372 300 C 366 250, 366 208, 388 168 Z', { 'class': 'v-slice-compartment v-slice-compartment--lat' }),
        path('M 180 320 C 150 260, 158 190, 180 150 C 200 220, 200 260, 180 320 Z', { 'class': 'v-slice-compartment v-slice-compartment--med' }),
        path('M 186 316 C 200 240, 200 200, 196 156 C 280 172, 352 168, 384 158 '
          + 'C 380 220, 372 280, 360 306 C 300 330, 236 330, 186 316 Z',
          { 'class': 'v-slice-compartment v-slice-compartment--post' }),
        // bones
        path('M 226 158 C 246 148, 268 152, 272 170 C 274 190, 258 204, 238 200 '
          + 'C 220 196, 214 172, 226 158 Z', { 'class': 'v-slice-bone' }),
        circle(348, 178, 17, { 'class': 'v-slice-bone v-slice-bone--fibula' }),
        txt(244, 180, 'tibia', { 'class': 'v-anat-label v-anat-label--tiny' }),
        txt(348, 214, 'fibula', { 'class': 'v-anat-label v-anat-label--tiny' }),
        // muscular sinuses
        group({ 'class': 'v-slice-sinus' }, [
          ellipse(262, 250, 20, 15, { 'class': 'v-slice-sinus-blob' }),
          ellipse(300, 262, 24, 17, { 'class': 'v-slice-sinus-blob' }),
          ellipse(330, 240, 15, 12, { 'class': 'v-slice-sinus-blob' }),
          ellipse(272, 292, 17, 13, { 'class': 'v-slice-sinus-blob' })
        ]),
        veins.join(''),
        vpair(214, 236, 7, 'post. tibial', 'v-slice-vein--pt'),
        vpair(330, 206, 6, 'peroneal', 'v-slice-vein--per'),
        vpair(268, 132, 5, 'ant. tibial', 'v-slice-vein--ant'),
        vpair(262, 288, 8, 'gastrocnemius', 'v-slice-vein--gast')
      ]),
      txt(276, 46, 'front of leg', { 'class': 'v-anat-label' }),
      txt(276, 350, 'back of leg', { 'class': 'v-anat-label' }),
      leader(330, 206, 418, 150, ['peroneal veins', '(the pair beside', 'the fibula)'], { cls: 'v-leader' }),
      leader(214, 236, 132, 296, ['posterior tibial', 'veins'], { dir: -1, cls: 'v-leader' }),
      leader(300, 262, 438, 296, ['wide, slow, and', 'where clots start'], { cls: 'v-leader' }),
      scaleBar(24, 384, '2 cm')
    ].join('');
  }

  function scaleVeinScene() {
    var open = group({ 'class': 'v-vein-open' }, [
      ellipse(150, 190, 86, 78, { 'class': 'v-vein-wall' }),
      ellipse(150, 190, 74, 66, { 'class': 'v-vein-lumen' }),
      path('M 78 178 Q 150 168 222 178', { 'class': 'v-valve-line' }),
      path('M 150 190 L 130 226 M 150 190 L 170 226', { 'class': 'v-valve-leaf' }),
      ellipse(150, 190, 86, 78, { 'class': 'v-vein-press-ring' })
    ]);
    var clotted = group({ 'class': 'v-vein-clotted' }, [
      ellipse(396, 190, 94, 84, { 'class': 'v-vein-wall v-vein-wall--stretched' }),
      ellipse(396, 190, 82, 72, { 'class': 'v-vein-lumen v-vein-lumen--dark' }),
      group({ 'class': 'v-thrombus-blob' }, ellipse(396, 190, 74, 64, { 'class': 'v-thrombus' })),
      speckle(31, 34, { x: 330, y: 130, w: 132, h: 120 }, 1.1, 2.6, 'v-thrombus-speck'),
      group({ 'class': 'v-fibrin' }, [
        path('M 336 168 C 372 156, 420 166, 452 186', { 'class': 'v-fibrin-line' }),
        path('M 338 206 C 380 216, 424 210, 450 196', { 'class': 'v-fibrin-line' }),
        path('M 356 148 C 388 178, 404 214, 402 250', { 'class': 'v-fibrin-line' })
      ]),
      path('M 320 232 C 348 258, 396 262, 444 240', { 'class': 'v-residual-flow' }),
      ellipse(396, 190, 94, 84, { 'class': 'v-vein-press-ring v-vein-press-ring--clot' }),
      txt(396, 190, 'no flow', { 'class': 'v-lumen-caption' })
    ]);
    return [
      group({ 'class': 'v-layer v-layer--vein' }, [
        open,
        clotted,
        txt(150, 300, 'normal vein', { 'class': 'v-anat-label v-anat-label--strong' }),
        txt(396, 300, 'thrombosed vein', { 'class': 'v-anat-label v-anat-label--strong' }),
        textBlock(150, 330, ['Press it and the walls meet:', 'the lumen disappears.'], { cls: 'v-anat-note' }),
        textBlock(396, 330, ['Press it and it stays open:', 'the clot is the filling.'], { cls: 'v-anat-note' })
      ]),
      leader(150, 112, 62, 56, ['thin, floppy wall'], { cls: 'v-leader' }),
      leader(396, 106, 294, 46, ['wall stretched', 'by the clot'], { cls: 'v-leader' }),
      leader(452, 246, 428, 244, ['flow runs around', 'the clot, not', 'through it'], { cls: 'v-leader' }),
      textBlock(276, 382, ['Press a normal vein and the walls meet. Press a clotted one and it stays open —',
        'and any flow that remains runs in the crescent between the clot and the wall, not through the middle.'],
      { cls: 'v-fig-footnote' }),
      scaleBar(24, 384, '5 mm')
    ].join('');
  }

  function scaleValveScene() {
    var cells = [];
    var rand = rng(19);
    for (var i = 0; i < 22; i++) {
      cells.push(circle(60 + rand() * 420, 156 + rand() * 92, 3 + rand() * 2.6, { 'class': 'v-rbc' }));
    }
    return [
      group({ 'class': 'v-layer v-layer--valve' }, [
        // vein wall, cut lengthwise
        rect(20, 112, 480, 30, { 'class': 'v-wall-top', rx: 6 }),
        rect(20, 268, 480, 30, { 'class': 'v-wall-bottom', rx: 6 }),
        rect(20, 142, 480, 126, { 'class': 'v-lumen' }),
        // flow arrow
        group({ 'class': 'v-flow-arrow' }, [
          path('M 34 132 L 168 132', { 'class': 'v-flow-line' }),
          path('M 168 132 L 156 124 M 168 132 L 156 140', { 'class': 'v-flow-line' }),
          txt(96, 120, 'blood flow', { 'class': 'v-anat-label v-anat-label--tiny' })
        ]),
        // valve leaflets (bicuspid, opening downstream)
        path('M 250 142 C 262 176, 268 208, 246 234', { 'class': 'v-leaflet' }),
        path('M 250 268 C 262 234, 268 202, 246 176', { 'class': 'v-leaflet' }),
        group({ 'class': 'v-pocket' }, [
          path('M 250 142 C 264 178, 272 208, 250 234 L 352 232 C 366 206, 366 168, 352 144 Z',
            { 'class': 'v-pocket-fill' })
        ]),
        // vortex
        path('M 300 168 A 26 26 0 1 1 300 216 A 20 20 0 1 0 300 172', { 'class': 'v-vortex' }),
        cells.join(''),
        // nascent thrombus on the pocket floor
        group({ 'class': 'v-seed-thrombus' }, [
          path('M 268 226 C 296 236, 330 238, 356 228 C 350 244, 300 248, 268 240 Z',
            { 'class': 'v-thrombus' }),
          path('M 272 232 C 300 240, 330 240, 350 232', { 'class': 'v-thrombus-line' })
        ])
      ]),
      txt(96, 92, 'vein wall', { 'class': 'v-anat-label' }),
      leader(250, 142, 176, 116, ['valve leaflet'], { dir: -1, cls: 'v-leader' }),
      leader(306, 198, 372, 66, ['inside the pocket:', 'slow, swirling, low O₂'], { cls: 'v-leader' }),
      leader(286, 236, 150, 322, ['fibrin and red cells collect', 'on the pocket floor — this', 'is a clot starting'], { dir: -1, cls: 'v-leader' }),
      txt(500, 330, 'low O₂', { 'class': 'v-o2-tag', textAnchor: 'end' }),
      scaleBar(24, 384, '0.5 mm')
    ].join('');
  }

  function scaleBar(x, y, label) {
    return group({ 'class': 'v-scalebar' }, [
      path('M ' + x + ' ' + y + ' L ' + (x + 120) + ' ' + y, { 'class': 'v-scalebar-line' }),
      path('M ' + x + ' ' + (y - 6) + ' L ' + x + ' ' + (y + 6), { 'class': 'v-scalebar-line' }),
      path('M ' + (x + 120) + ' ' + (y - 6) + ' L ' + (x + 120) + ' ' + (y + 6), { 'class': 'v-scalebar-line' }),
      txt(x + 124, y + 5, label, { 'class': 'v-scalebar-label' })
    ]);
  }

  function buildScale(index) {
    var scenes = [scaleLegScene, scaleSliceScene, scaleVeinScene, scaleValveScene];
    var i = Math.max(0, Math.min(scenes.length - 1, index || 0));
    return svg('0 0 560 400', 'fig-scale', [
      group({ 'class': 'v-scene', 'data-scene': i }, scenes[i]())
    ].join(''));
  }

  /* ==================================================================
   * 3. Fig. 2 — veins of the calf
   * ================================================================== */

  /* One lobulated venous lake inside the soleus — the soleal sinuses. */
  var SOLEAL_PATH = 'M 250 336 C 274 338, 296 352, 294 372 C 292 392, 274 402, 278 418 '
    + 'C 282 434, 302 440, 300 460 C 298 482, 276 494, 258 490 '
    + 'C 240 486, 230 470, 232 450 C 234 430, 246 416, 240 398 '
    + 'C 234 380, 228 356, 238 344 C 242 339, 246 336, 250 336 Z';

  function veinPath(id, d, opt) {
    var o = opt || {};
    var type = o.type || 'axial';
    var label = o.name || id;
    var parts = [
      path(d, { 'class': 'vein-hit', 'data-hit': id }),
      path(d, { 'class': 'vein-halo' }),
      path(d, { 'class': 'vein-body vein-body--' + type })
    ];
    if (o.second) parts.push(path(o.second, { 'class': 'vein-body vein-body--' + type }));
    if (o.pairOffset) {
      parts.splice(3, 0, path(d, {
        'class': 'vein-body vein-body--' + type,
        transform: 'translate(' + o.pairOffset + ' 0)'
      }));
    }
    return group({
      'class': 'vein-group vein-group--' + type,
      'data-vein': id,
      tabindex: '0',
      role: 'button',
      'aria-label': label
    }, parts.join(''));
  }

  function buildCalfVeins(state) {
    var s = state || {};
    var valves = [];
    [[258, 120], [258, 175], [252, 300], [262, 420], [246, 520], [254, 610],
      [316, 300], [322, 420], [318, 520], [312, 600], [300, 660], [228, 660]]
      .forEach(function (p) { valves.push(valve(p[0], p[1], 9)); });
    return svg('0 0 520 760', 'fig-veins', [
      // ---- leg silhouette -------------------------------------------------
      group({ 'class': 'v-layer v-layer--leg' }, [
        path(legOutline(260, 0, 44, 690, { kneeW: 62, calfW: 80, ankleW: 26, mid: 0.42 }),
          { 'class': 'v-leg-shape' }),
        path('M 178 44 C 216 58, 304 58, 342 44', { 'class': 'v-knee-crease' }),
        // bones
        path('M 222 120 C 214 300, 216 500, 232 668', { 'class': 'v-bone' }),
        path('M 330 150 C 326 320, 320 500, 312 640', { 'class': 'v-bone v-bone--thin' }),
        // muscles
        ellipse(206, 250, 46, 74, { 'class': 'v-muscle' }),
        ellipse(322, 244, 44, 70, { 'class': 'v-muscle' }),
        ellipse(266, 400, 68, 116, { 'class': 'v-muscle v-muscle--deep' }),
        path('M 262 520 C 258 590, 260 640, 262 682', { 'class': 'v-tendon' })
      ]),

      // ---- superficial veins ---------------------------------------------
      group({ 'class': 'v-layer v-layer--superficial' }, [
        veinPath('grt_saph',
          'M 202 664 C 190 578, 184 470, 186 382 C 190 292, 200 200, 210 148 C 213 120, 214 76, 212 46',
          { type: 'superficial', name: 'Great saphenous vein' }),
        veinPath('sm_saph',
          'M 310 640 C 326 560, 334 462, 332 380 C 330 300, 316 220, 298 148',
          { type: 'superficial', name: 'Small saphenous vein' })
      ]),

      /* ---- deep veins (sinuses first, so veins draw over them) --------- */
      group({ 'class': 'v-layer v-layer--deep' }, [
        group({ 'class': 'vein-group vein-group--sinus', 'data-vein': 'soleal',
          tabindex: '0', role: 'button', 'aria-label': 'Soleal sinuses' }, [
          path(SOLEAL_PATH, { 'class': 'vein-halo' }),
          path(SOLEAL_PATH, { 'class': 'vein-body vein-body--sinus' })
        ]),
        veinPath('popliteal', 'M 258 52 L 258 152',
          { type: 'proximal', name: 'Popliteal vein' }),
        veinPath('trunk', 'M 258 152 L 258 196',
          { type: 'axial', name: 'Tibioperoneal trunk' }),
        veinPath('peroneal',
          'M 258 196 C 300 232, 318 312, 318 412 C 318 512, 314 592, 310 652',
          { type: 'axial', pairOffset: 12, name: 'Peroneal veins' }),
        veinPath('posttibial',
          'M 258 196 C 236 232, 224 312, 226 412 C 228 512, 232 592, 236 656',
          { type: 'axial', pairOffset: -11, name: 'Posterior tibial veins' }),
        veinPath('anttibial',
          'M 250 206 C 264 300, 262 420, 256 556',
          { type: 'axial', name: 'Anterior tibial veins (dashed — rarely involved)' }),
        veinPath('gastrocnemius',
          'M 232 210 C 224 244, 216 276, 212 300 M 286 208 C 300 240, 310 268, 316 292',
          { type: 'muscular', name: 'Gastrocnemius veins' })
      ]),

      group({ 'class': 'v-layer v-layer--valves' + (s.valves === false ? ' is-hidden' : '') },
        valves.join('')),

      // ---- proximal / distal zones ---------------------------------------
      group({ 'class': 'v-layer v-layer--zones' + (s.zones ? '' : ' is-hidden') }, [
        rect(150, 200, 220, 500, { 'class': 'v-zone v-zone--distal', rx: 4 }),
        rect(150, 36, 220, 164, { 'class': 'v-zone v-zone--proximal', rx: 4 }),
        path('M 148 200 L 372 200', { 'class': 'v-zone-line' }),
        txt(374, 160, 'PROXIMAL', { 'class': 'v-zone-label v-zone-label--prox' }),
        txt(374, 194, 'popliteal vein', { 'class': 'v-zone-sub' }),
        txt(374, 210, 'and above', { 'class': 'v-zone-sub' }),
        txt(374, 228, 'DISTAL', { 'class': 'v-zone-label v-zone-label--dist' }),
        txt(374, 246, 'calf veins —', { 'class': 'v-zone-sub' }),
        txt(374, 262, 'below the knee', { 'class': 'v-zone-sub' })
      ]),

      // ---- labels ---------------------------------------------------------
      group({ 'class': 'v-layer v-layer--labels' + (s.labels === false ? ' is-hidden' : '') }, [
        txt(392, 58, 'popliteal fossa', { 'class': 'v-anat-label' }),
        txt(112, 300, 'gastrocnemius', { 'class': 'v-anat-label' }),
        txt(112, 316, '(calf muscle)', { 'class': 'v-anat-label v-anat-label--tiny' }),
        txt(396, 466, 'soleus', { 'class': 'v-anat-label' }),
        txt(206, 372, 'tibia', { 'class': 'v-anat-label', transform: 'rotate(-90 206 372)' }),
        txt(348, 400, 'fibula', { 'class': 'v-anat-label', transform: 'rotate(-90 348 400)' }),
        txt(84, 560, 'great saphenous', { 'class': 'v-anat-label v-anat-label--tiny' }),
        txt(404, 646, 'small saphenous', { 'class': 'v-anat-label v-anat-label--tiny' })
      ]),
      textBlock(258, 730, ['Posterior view. Vein positions are schematic.'],
        { cls: 'v-fig-footnote' })
    ].join(''));
  }

  /* ==================================================================
   * 4. Fig. 3 — both calves, symptoms, tape measure
   * ================================================================== */

  function buildLegs(state) {
    var s = state || {};
    var diff = typeof s.diff === 'number' ? s.diff : 3;
    var swell = Math.max(0, Math.min(1.4, diff / 6));
    var leftCx = 170;
    var rightCx = 372;
    var measureY = 330;
    var leftCm = 36.5;
    var rightCm = (leftCm + diff).toFixed(1);

    var rightLegPath = legOutline(rightCx, swell, 60, 520);
    var active = s.symptoms || [];

    function on(list, sym) { return list.indexOf(sym) !== -1; }

    return svg('0 0 660 600', 'fig-legs', [
      '<defs>',
      '<clipPath id="legs-clip-right"><path d="' + rightLegPath + '"/></clipPath>',
      '<radialGradient id="legs-warmth" cx="50%" cy="45%" r="60%">',
      '<stop offset="0%" stop-color="#e8613c" stop-opacity="0.55"/>',
      '<stop offset="70%" stop-color="#e8613c" stop-opacity="0.16"/>',
      '<stop offset="100%" stop-color="#e8613c" stop-opacity="0"/>',
      '</radialGradient>',
      '</defs>',

      txt(leftCx, 40, 'Left calf', { 'class': 'v-legs-title' }),
      txt(rightCx, 40, 'Right calf', { 'class': 'v-legs-title' }),

      // ---------- healthy / reference leg ----------
      group({ 'class': 'v-leg v-leg--left' }, [
        ellipse(leftCx, 528, 78, 12, { 'class': 'v-ground' }),
        path(legOutline(leftCx, 0, 60, 520), { 'class': 'v-leg-shape' }),
        path('M 116 84 C 146 96, 200 96, 228 84', { 'class': 'v-knee-crease' }),
        ellipse(leftCx, 320, 42, 76, { 'class': 'v-muscle', opacity: 0.5 })
      ]),

      // ---------- affected leg, with symptom layers ----------
      group({ 'class': 'v-leg v-leg--right', 'data-swell': swell.toFixed(3) }, [
        ellipse(rightCx, 528, 78 + swell * 8, 12, { 'class': 'v-ground' }),
        path(rightLegPath, { 'class': 'v-leg-shape' }),

        group({ 'class': 'v-legend-layer sym-erythema' + (on(active, 'erythema') ? ' is-on' : '') }, [
          group({ 'clip-path': 'url(#legs-clip-right)' }, [
            ellipse(rightCx, 300, 96, 150, { 'class': 'v-erythema-blob' }),
            ellipse(rightCx + 30, 240, 60, 90, { 'class': 'v-erythema-blob v-erythema-blob--soft' }),
            ellipse(rightCx - 40, 420, 54, 80, { 'class': 'v-erythema-blob v-erythema-blob--soft' })
          ])
        ]),

        group({ 'class': 'v-legend-layer sym-collateral' + (on(active, 'collateral') ? ' is-on' : '') },
          group({ 'clip-path': 'url(#legs-clip-right)' }, [
            path('M 344 200 C 366 268, 372 340, 358 420 C 350 468, 344 500, 340 520', { 'class': 'v-collateral' }),
            path('M 356 236 C 388 300, 396 372, 384 442', { 'class': 'v-collateral' }),
            path('M 330 250 C 336 320, 330 400, 322 470', { 'class': 'v-collateral' })
          ])),

        group({ 'class': 'v-legend-layer sym-swelling' + (on(active, 'swelling') ? ' is-on' : '') },
          group({ 'clip-path': 'url(#legs-clip-right)' }, [
            ellipse(rightCx, 330, 108 + swell * 10, 168 + swell * 14, { 'class': 'v-swelling-glow' })
          ])),

        group({ 'class': 'v-legend-layer sym-warmth' + (on(active, 'warmth') ? ' is-on' : '') },
          group({ 'clip-path': 'url(#legs-clip-right)' }, [
            ellipse(rightCx, 320, 112 + swell * 8, 168, { 'class': 'v-warmth-glow' })
          ])),

        group({ 'class': 'v-legend-layer sym-tenderness' + (on(active, 'tenderness') ? ' is-on' : '') }, [
          group({ 'class': 'v-pulse' }, [
            circle(rightCx + 42, 442, 15, { 'class': 'v-pulse-ring' }),
            circle(rightCx + 42, 442, 15, { 'class': 'v-pulse-ring v-pulse-ring--b' }),
            circle(rightCx - 44, 396, 13, { 'class': 'v-pulse-ring' }),
            circle(rightCx - 44, 396, 13, { 'class': 'v-pulse-ring v-pulse-ring--b' }),
            circle(rightCx + 36, 218, 11, { 'class': 'v-pulse-ring' }),
            circle(rightCx - 52, 248, 10, { 'class': 'v-pulse-ring' })
          ])
        ]),

        group({ 'class': 'v-legend-layer sym-shiny' + (on(active, 'shiny') ? ' is-on' : '') },
          group({ 'clip-path': 'url(#legs-clip-right)' }, [
            ellipse(rightCx - 26, 286, 22, 96, { 'class': 'v-sheen', transform: 'rotate(-12 ' + (rightCx - 26) + ' 286)' }),
            ellipse(rightCx + 40, 330, 12, 70, { 'class': 'v-sheen', transform: 'rotate(9 ' + (rightCx + 40) + ' 330)' })
          ])),

        group({ 'class': 'v-legend-layer sym-pitting' + (on(active, 'pitting') ? ' is-on' : '') }, [
          circle(rightCx - 34, 372, 9, { 'class': 'v-dimple' }),
          circle(rightCx - 34, 372, 15, { 'class': 'v-dimple-rim' }),
          leader(rightCx - 34, 372, 452, 466, ['pitting edema — the', 'dimple stays'], { cls: 'v-leader' })
        ]),

        group({ 'class': 'v-legend-layer sym-heaviness' + (on(active, 'heaviness') ? ' is-on' : '') }, [
          path('M ' + (rightCx - 40) + ' 208 L ' + (rightCx - 40) + ' 268', { 'class': 'v-weight-line' }),
          path('M ' + (rightCx - 50) + ' 256 L ' + (rightCx - 40) + ' 270 L ' + (rightCx - 30) + ' 256', { 'class': 'v-weight-line' }),
          txt(rightCx - 46, 196, 'heaviness', { 'class': 'v-anat-label v-anat-label--tiny', textAnchor: 'end' })
        ]),

        path('M ' + (rightCx - 56) + ' 84 C ' + (rightCx - 26) + ' 96, ' + (rightCx + 26) + ' 96, '
          + (rightCx + 56) + ' 84', { 'class': 'v-knee-crease' })
      ]),

      // ---------- tape measures ----------
      group({ 'class': 'v-measure' }, [
        line(94, measureY, 248, measureY, { 'class': 'v-measure-line' }),
        line(296, measureY, 452, measureY, { 'class': 'v-measure-line' }),
        textBlock(leftCx, measureY - 16, [leftCm.toFixed(1) + ' cm'], { cls: 'v-measure-value' }),
        textBlock(rightCx, measureY - 16, [rightCm + ' cm'], { cls: 'v-measure-value v-measure-value--hi' }),
        txt(272, measureY + 5, 'Δ', { 'class': 'v-measure-delta' })
      ]),

      textBlock(330, 552, ['Tape measure taken 10 cm below the tibial tuberosity —',
        'the bony bump under the kneecap. Schematic, not to scale:',
        'sizes are exaggerated so the difference is visible.'],
      { cls: 'v-fig-footnote', lh: 16 })
    ].join(''));
  }

  /* ==================================================================
   * 5. Fig. 4 — ultrasound simulation
   * ================================================================== */

  function usScreen(inner) {
    return rect(12, 12, 596, 436, { 'class': 'v-us-screen', rx: 10 }) + inner;
  }

  function usDepthScale() {
    var out = [];
    for (var i = 1; i <= 6; i++) {
      var y = 40 + i * 48;
      out.push(line(578, y, 596, y, { 'class': 'v-us-tick' }));
      out.push(txt(600, y + 4, i + '', { 'class': 'v-us-depth', textAnchor: 'start' }));
    }

    return group({ 'class': 'v-us-depthscale' }, out.join(''));
  }

  function usTissue(seed) {
    return group({ 'class': 'v-us-tissue' }, [
      rect(20, 34, 566, 18, { 'class': 'v-us-skin' }),
      rect(20, 52, 566, 88, { 'class': 'v-us-fat' }),
      speckle(seed, 90, { x: 20, y: 52, w: 566, h: 88 }, 0.8, 2.4, 'v-us-speck'),
      rect(20, 140, 566, 8, { 'class': 'v-us-fascia' }),
      rect(20, 148, 566, 288, { 'class': 'v-us-muscle' }),
      speckle(seed + 5, 150, { x: 20, y: 148, w: 566, h: 288 }, 0.9, 3.2, 'v-us-speck v-us-speck--muscle'),
      path('M 20 210 C 180 196, 380 224, 586 206', { 'class': 'v-us-striation' }),
      path('M 20 286 C 200 300, 360 272, 586 292', { 'class': 'v-us-striation' }),
      path('M 20 372 C 170 356, 400 384, 586 366', { 'class': 'v-us-striation' })
    ].join(''));
  }

  function usProbe(pressure) {
    var p = Math.max(0, Math.min(100, pressure || 0)) / 100;
    var dy = p * 10;
    return [
      group({ 'class': 'v-us-probebar' }, [
        rect(214, -26 + dy, 172, 46, { 'class': 'v-us-probe', rx: 10 }),
        rect(226, 14 + dy, 148, 10, { 'class': 'v-us-gel', rx: 4 }),
        path('M 236 34 L 336 34', { 'class': 'v-us-contact' }),
        group({ 'class': 'v-us-arrows', opacity: (0.25 + p * 0.75).toFixed(2) }, [
          path('M 262 40 L 262 62 M 254 54 L 262 64 L 270 54', { 'class': 'v-us-arrow' }),
          path('M 338 40 L 338 62 M 330 54 L 338 64 L 346 54', { 'class': 'v-us-arrow' }),
          path('M 300 42 L 300 70 M 292 62 L 300 72 L 308 62', { 'class': 'v-us-arrow v-us-arrow--mid' })
        ]),
        txt(300, 8, 'linear probe', { 'class': 'v-us-probe-label' })
      ])
    ].join('');
  }

  function usDopplerInside(cx, cy, rx, ry, idSeed) {
    var rand = rng(idSeed);
    var dots = [];
    for (var i = 0; i < 26; i++) {
      var a = rand() * Math.PI * 2;
      var r = Math.sqrt(rand());
      var x = cx + Math.cos(a) * rx * 0.86 * r;
      var y = cy + Math.sin(a) * ry * 0.86 * r;
      var hue = rand() > 0.5 ? 'v-us-flow--warm' : 'v-us-flow--cool';
      dots.push(circle(Math.round(x * 10) / 10, Math.round(y * 10) / 10, 1.6 + rand() * 2.6,
        { 'class': 'v-us-flow ' + hue }));
    }
    return dots.join('');
  }

  function usVessel(cx, cy, rx, ry, kind, state, extra) {
    var q = squeeze(state.patient, state.pressure);
    var wallRx = rx * q.rxFactor;
    var wallRy = ry * q.ryFactor;
    var out = [];
    if (kind === 'vein') {
      out.push(ellipse(cx, cy, wallRx, wallRy, {
        'class': 'v-us-veinwall',
        'data-us-part': 'vein-wall',
        'data-rx': rx, 'data-ry': ry, 'data-cx': cx, 'data-cy': cy
      }));
      out.push(ellipse(cx, cy, Math.max(0.6, wallRx - 3.5), Math.max(0.6, wallRy - 3.5), {
        'class': 'v-us-lumen',
        'data-us-part': 'vein-lumen',
        'data-rx': Math.max(0.6, rx - 3.5), 'data-ry': Math.max(0.6, ry - 3.5)
      }));
      if (state.patient === 'dvt' && (extra === undefined || extra.thrombus !== false)) {
        var tRx = Math.max(1, Math.min(wallRx - 2.4, (rx - 9)));
        var tRy = Math.max(1, Math.min(wallRy - 2.4, (ry - 8)));
        out.push(ellipse(cx, cy, tRx, tRy, {
          'class': 'v-us-thrombus',
          'data-us-part': 'thrombus',
          'data-rx': rx - 9, 'data-ry': ry - 8
        }));
        out.push(speckle(41, 22, { x: cx - rx * 0.6, y: cy - ry * 0.6, w: rx * 1.2, h: ry * 1.2 },
          0.7, 1.9, 'v-us-thrombus-speck'));
        out.push(path('M ' + (cx - rx * 0.8) + ' ' + (cy + ry * 0.45)
          + ' C ' + (cx - rx * 0.2) + ' ' + (cy + ry * 0.9) + ', ' + (cx + rx * 0.5) + ' ' + (cy + ry * 0.6) + ', '
          + (cx + rx * 0.72) + ' ' + (cy - ry * 0.1), { 'class': 'v-us-residual' }));
      }
    } else if (kind === 'artery') {
      // arteries are high-pressure tubes: they resist the probe far better than veins
      var aq = squeeze('dvt', state.pressure); // barely-collapsing behaviour
      var arx = rx * (1 - (1 - aq.rxFactor) * 0.3);
      var ary = ry * (1 - (1 - aq.ryFactor) * 0.3);
      out.push(ellipse(cx, cy, arx, ary, { 'class': 'v-us-arterywall' }));
      out.push(ellipse(cx, cy, Math.max(0.6, arx - 5), Math.max(0.6, ary - 5), { 'class': 'v-us-arterylumen' }));
      out.push(path('M ' + (cx - 4) + ' ' + (cy + wallRy + 8) + ' l 8 0 l -4 7 z', { 'class': 'v-us-pulse-mark' }));
    }
    return out.join('');
  }

  /* Short forms for in-figure annotation; data.js keeps the full sentences. */
  function usShort(id) {
    return {
      probe: 'probe on the calf',
      skin: 'skin and fat',
      muscle: 'calf muscle',
      vein: 'deep vein',
      thrombus: 'clot in the lumen',
      artery: 'artery',
      depth: 'depth: 1 cm per mark'
    }[id] || '';
  }

  function buildUltrasound(state) {
    var s = state || {};
    s.patient = s.patient || 'dvt';
    s.view = s.view || 'transverse';
    s.pressure = s.pressure || 0;
    var labelMap = {};
    (window.DVTData.ultrasound.labels[s.patient] || []).forEach(function (l) {
      labelMap[l.id] = usShort(l.id);
    });

    var art = [];
    if (s.view === 'transverse') {
      art.push(usTissue(3));
      art.push(usVessel(150, 300, 30, 26, 'vein', s, { thrombus: false }));
      art.push(usVessel(250, 250, 54, 48, 'vein', s));
      art.push(usVessel(430, 258, 24, 24, 'artery', s));
      if (s.doppler) {
        art.push(group({ 'class': 'v-us-flowlayer' },
          usDopplerInside(150, 300, 28, 24, 11)
          + (s.patient === 'dvt' ? '' : usDopplerInside(250, 250, 50, 44, 12))));
      }
    } else {
      art.push(usTissue(9));
      // popliteal (proximal) segment
      art.push(path('M 274 40 L 274 152', { 'class': 'v-us-veinwall v-us-veinwall--long' }));
      art.push(path('M 326 40 L 326 152', { 'class': 'v-us-veinwall v-us-veinwall--long' }));
      art.push(path('M 274 152 C 276 196, 300 196, 336 210 L 336 430', { 'class': 'v-us-veinwall v-us-veinwall--long' }));
      art.push(path('M 326 152 C 316 200, 250 206, 236 220 L 236 430', { 'class': 'v-us-veinwall v-us-veinwall--long' }));
      art.push(txt(300, 96, 'popliteal vein', { 'class': 'v-us-vessel-label' }));
      art.push(txt(300, 112, 'proximal', { 'class': 'v-us-vessel-label v-us-vessel-label--sub' }));
      art.push(txt(360, 424, 'peroneal', { 'class': 'v-us-vessel-label v-us-vessel-label--sub' }));
      art.push(txt(214, 424, 'post. tibial', { 'class': 'v-us-vessel-label v-us-vessel-label--sub' }));
      art.push(line(20, 168, 586, 168, { 'class': 'v-us-boundary' }));
      if (s.patient === 'dvt') {
        art.push(path('M 340 214 C 366 260, 368 340, 358 400 C 352 424, 344 430, 338 430 '
          + 'L 316 430 C 330 400, 336 320, 320 240 C 316 220, 322 208, 340 214 Z',
          { 'class': 'v-us-thrombus v-us-thrombus--long' }));
        art.push(speckle(51, 30, { x: 318, y: 226, w: 52, h: 190 }, 0.8, 2.2, 'v-us-thrombus-speck'));
        art.push(group({ 'class': 'v-us-calipers' }, [
          line(300, 216, 386, 216, { 'class': 'v-us-caliper' }),
          line(300, 428, 386, 428, { 'class': 'v-us-caliper' }),
          line(374, 216, 374, 428, { 'class': 'v-us-caliper v-us-caliper--dashed' }),
          txt(392, 226, 'top of clot', { 'class': 'v-us-caliper-label' }),
          txt(392, 322, '≈ 4 cm long', { 'class': 'v-us-caliper-label v-us-caliper-label--big' })
        ]));
        art.push(group({ 'class': 'v-us-gap' }, [
          line(300, 168, 300, 214, { 'class': 'v-us-gap-line' }),
          line(300, 190, 396, 150, { 'class': 'v-us-gap-line' })
        ]));
        art.push(txt(402, 150, '≈ 1 cm to the proximal line',
          { 'class': 'v-us-caliper-label', textAnchor: 'start' }));
        art.push(txt(448, 300, 'thrombus', { 'class': 'v-us-vessel-label v-us-vessel-label--alert' }));
      } else {
        art.push(valve(320, 286, 7, { h: 15, open: true, cls: 'v-us-valve' }));
        art.push(valve(247, 320, 7, { h: 15, open: true, cls: 'v-us-valve' }));
        art.push(valve(300, 86, 17, { h: 18, open: true, cls: 'v-us-valve' }));
      }
      if (s.doppler) {
        // In a clotted leg, only the segment above the clot still shows flow —
        // that is exactly what makes the "no flow below here" finding legible.
        var flowBits = [rect(286, 46, 30, 102, { 'class': 'v-us-flow v-us-flow--cool v-us-flow--block' })];
        if (s.patient === 'normal') {
          flowBits.push(rect(314, 218, 13, 194, { 'class': 'v-us-flow v-us-flow--warm v-us-flow--block' }));
          flowBits.push(rect(241, 228, 13, 184, { 'class': 'v-us-flow v-us-flow--cool v-us-flow--block' }));
        }
        art.push(group({ 'class': 'v-us-flowlayer' }, flowBits.join('')));
      }
    }

    /* Annotations are routed so no two labels land on the same lines:
     * shallow tissue on the left, vessel callouts top-right, depth along the bottom. */
    var annotations = [];
    if (s.labels !== false && s.view === 'transverse') {
      if (labelMap.skin) annotations.push(leader(180, 96, 44, 78, [labelMap.skin], { dir: -1, cls: 'v-us-leader' }));
      if (labelMap.probe) annotations.push(leader(300, 62, 402, 84, [labelMap.probe], { dir: 1, cls: 'v-us-leader' }));
      if (labelMap.vein) annotations.push(leader(196, 292, 44, 208, [labelMap.vein], { dir: -1, cls: 'v-us-leader' }));
      if (labelMap.thrombus) annotations.push(leader(268, 226, 400, 172, [labelMap.thrombus], { dir: 1, cls: 'v-us-leader' }));
      if (labelMap.artery) annotations.push(leader(452, 240, 470, 268, [labelMap.artery], { dir: 1, cls: 'v-us-leader' }));
      if (labelMap.muscle) annotations.push(leader(120, 372, 44, 388, [labelMap.muscle], { dir: -1, cls: 'v-us-leader' }));
      if (labelMap.depth) annotations.push(leader(578, 428, 420, 452, [labelMap.depth], { dir: -1, cls: 'v-us-leader' }));
    }

    return svg('0 -40 620 546', 'fig-us', [
      usScreen([
        usDepthScale(),
        art.join(''),
        group({ 'class': 'v-us-annotations' + (s.labels === false ? ' is-hidden' : '') }, annotations.join(''))
      ].join('')),
      usProbe(s.pressure) // drawn above the screen edge on purpose
    ].join(''));
  }

  /* ==================================================================
   * 6. Fig. 5 — Virchow's triad
   * ================================================================== */

  function buildTriad(state) {
    var s = state || {};
    var nodes = [
      { id: 'stasis', x: 220, y: 76, label: ['Stasis'] },
      { id: 'injury', x: 88, y: 306, label: ['Endothelial', 'injury'] },
      { id: 'hyper', x: 352, y: 306, label: ['Hyper-', 'coagulability'] }
    ];
    var edges = [
      [0, 1], [1, 2], [2, 0]
    ];
    var glyphs = {
      stasis: [
        path('M -20 4 A 20 20 0 1 1 -6 -19', { 'class': 'tri-glyph-line' }),
        path('M -6 -19 L -11 -6 L 0 -10', { 'class': 'tri-glyph-line' }),
        ellipse(0, 8, 9, 6, { 'class': 'tri-glyph-fill' })
      ].join(''),
      injury: [
        path('M -18 -16 L 18 -16 L 18 16 L -18 16 Z', { 'class': 'tri-glyph-line' }),
        path('M -8 -18 L 2 -4 L -6 4 L 6 18', { 'class': 'tri-glyph-line tri-glyph-line--bold' })
      ].join(''),
      hyper: [
        circle(-8, 6, 12, { 'class': 'tri-glyph-fill' }),
        circle(10, 10, 8, { 'class': 'tri-glyph-fill' }),
        circle(4, -10, 6, { 'class': 'tri-glyph-fill' }),
        path('M 14 -18 L 30 -18 M 22 -26 L 22 -10', { 'class': 'tri-glyph-line' })
      ].join('')
    };
    var out = [];
    edges.forEach(function (e) {
      out.push(line(nodes[e[0]].x, nodes[e[0]].y, nodes[e[1]].x, nodes[e[1]].y,
        { 'class': 'tri-edge', 'data-edge': nodes[e[0]].id + '-' + nodes[e[1]].id }));
    });
    out.push(textBlock(220, 216, ['any two arms', 'working together', '→ a clot'], { cls: 'tri-centre' }));
    nodes.forEach(function (n) {
      out.push(group({
        'class': 'tri-node' + (s.active === n.id ? ' is-active' : ''),
        'data-triad': n.id,
        tabindex: '0',
        role: 'button',
        'aria-label': n.label
      }, [
        circle(n.x, n.y, 48, { 'class': 'tri-node-ring' }),
        circle(n.x, n.y, 40, { 'class': 'tri-node-disc' }),
        group({ transform: 'translate(' + n.x + ' ' + (n.y - 4) + ')' }, glyphs[n.id]),
        textBlock(n.x, n.y + 68, n.label, { cls: 'tri-node-label', lh: 14 })
      ]));
    });
    return svg('0 0 440 420', 'fig-triad', out.join(''));
  }

  /* ==================================================================
   * 7. Fig. 6 — timeline (HTML, not SVG)
   * ================================================================== */

  function buildTimeline() {
    var items = window.DVTData.timeline;
    return '<ol class="tl">' + items.map(function (item, i) {
      return '<li class="tl-item tl-item--' + item.tone + '" style="--fill:' + item.fill + '%">'
        + '<div class="tl-marker" aria-hidden="true"><span>' + (i + 1) + '</span></div>'
        + '<div class="tl-card">'
        + '<p class="tl-when">' + esc(item.when) + ' <span>' + esc(item.span) + '</span></p>'
        + '<h3 class="tl-title">' + esc(item.title) + '</h3>'
        + '<p class="tl-body">' + esc(item.body) + '</p>'
        + '<div class="tl-bar" aria-hidden="true"><i></i></div>'
        + '</div></li>';
    }).join('') + '</ol>';
  }

  /* ==================================================================
   * 8. Fig. 7 — the embolus route
   * ================================================================== */

  var EMBOLUS_ROUTE = [
    [246, 700], [246, 646], [246, 574], [246, 516], [249, 486], [255, 448],
    [262, 414], [273, 396], [278, 356], [279, 306], [274, 282], [264, 264],
    [270, 242], [286, 228], [312, 226], [340, 228]
  ];

  var EMBOLUS_SEGMENTS = {
    calf: [[246, 700], [246, 646], [246, 574], [246, 516]],
    popliteal: [[246, 516], [249, 486], [255, 448]],
    femoral: [[255, 448], [262, 414], [273, 396]],
    ivc: [[273, 396], [278, 356], [279, 306], [274, 282]],
    heart: [[274, 282], [264, 264], [270, 242], [286, 228]],
    lung: [[286, 228], [312, 226], [340, 228]]
  };

  /* Where the "you are here" ring sits for each step. */
  var EMBOLUS_FOCUS = {
    calf: [246, 650], popliteal: [248, 500], femoral: [260, 430],
    ivc: [278, 330], heart: [272, 258], lung: [310, 230]
  };

  function buildEmbolus(state) {
    var s = state || {};
    var step = s.step || 0;
    var order = ['calf', 'popliteal', 'femoral', 'ivc', 'heart', 'lung'];

    function seg(id, extraCls) {
      var pts = EMBOLUS_SEGMENTS[id];
      var anchor = order.indexOf(id);
      return group({
        'class': 'emb-seg' + (extraCls ? ' ' + extraCls : '') + (anchor <= step ? ' is-live' : ''),
        'data-seg': id
      }, path('M ' + pts.map(function (p) { return p[0] + ' ' + p[1]; }).join(' L '),
        { 'class': 'emb-seg-line' }));
    }

    var lungs = group({ 'class': 'emb-lungs' }, [
      path('M 216 176 C 172 182, 162 240, 180 286 C 194 320, 226 330, 242 306 '
        + 'C 254 286, 246 210, 236 186 C 230 174, 222 174, 216 176 Z', { 'class': 'emb-lung' }),
      path('M 306 176 C 350 182, 360 240, 342 286 C 328 320, 296 330, 280 306 '
        + 'C 268 286, 276 210, 286 186 C 292 174, 300 174, 306 176 Z', { 'class': 'emb-lung' }),
      path('M 240 200 C 230 236, 226 268, 234 296', { 'class': 'emb-lung-fissure' }),
      path('M 286 200 C 294 236, 298 268, 290 296', { 'class': 'emb-lung-fissure' })
    ]);

    var heart = group({ 'class': 'emb-heart' }, [
      path('M 262 236 C 246 224, 240 244, 248 258 C 254 270, 268 278, 278 286 '
        + 'C 290 276, 302 264, 304 250 C 306 234, 294 222, 284 226 C 276 229, 268 232, 262 236 Z',
        { 'class': 'emb-heart-shape' }),
      txt(272, 258, 'right heart', { 'class': 'emb-label emb-label--tiny' })
    ]);

    var labels = group({ 'class': 'emb-labels' }, [
      leader(246, 686, 140, 722, ['calf veins', '(start here)'], { dir: -1, cls: 'emb-leader' }),
      leader(248, 500, 140, 520, ['popliteal vein', '(the proximal line)'], { dir: -1, cls: 'emb-leader' }),
      leader(278, 330, 404, 350, ['inferior vena cava'], { dir: 1, cls: 'emb-leader' }),
      leader(272, 246, 404, 250, ['pulmonary artery'], { dir: 1, cls: 'emb-leader' }),
      leader(330, 214, 420, 178, ['lung'], { dir: 1, cls: 'emb-leader' }),
      leader(262, 448, 150, 430, ['femoral vein'], { dir: -1, cls: 'emb-leader' })
    ]);

    return svg('0 0 560 780', 'fig-embolus', [
      '<defs><radialGradient id="emb-glow" cx="50%" cy="50%" r="50%">'
      + '<stop offset="0%" stop-color="#c5303a" stop-opacity="0.55"/>'
      + '<stop offset="100%" stop-color="#c5303a" stop-opacity="0"/>'
      + '</radialGradient></defs>',
      // body silhouette
      group({ 'class': 'emb-body' }, [
        circle(280, 62, 34, { 'class': 'emb-head' }),
        rect(260, 92, 40, 30, { 'class': 'emb-neck' }),
        path('M 194 134 C 182 190, 190 258, 198 306 C 206 356, 214 402, 220 432 '
          + 'L 340 432 C 346 402, 354 356, 362 306 C 370 258, 378 190, 366 134 '
          + 'C 340 120, 220 120, 194 134 Z', { 'class': 'emb-torso' }),
        path('M 196 140 C 166 172, 152 244, 148 320 C 146 344, 152 360, 162 360 '
          + 'C 172 360, 174 340, 176 318 C 182 256, 198 200, 212 168 Z', { 'class': 'emb-arm' }),
        path('M 364 140 C 394 172, 408 244, 412 320 C 414 344, 408 360, 398 360 '
          + 'C 388 360, 386 340, 384 318 C 378 256, 362 200, 348 168 Z', { 'class': 'emb-arm' }),
        path('M 226 432 C 218 520, 218 620, 222 720 C 224 756, 236 768, 248 768 '
          + 'C 260 768, 268 756, 268 720 C 270 620, 268 520, 264 432 Z', { 'class': 'emb-leg' }),
        path('M 296 432 C 298 520, 298 620, 300 720 C 301 756, 310 768, 322 768 '
          + 'C 334 768, 344 756, 344 720 C 346 620, 342 520, 336 432 Z', { 'class': 'emb-leg' })
      ]),
      lungs,
      heart,
      group({ 'class': 'emb-veins' }, order.map(function (id) { return seg(id); }).join('')),
      group({ 'class': 'emb-focus', 'data-focus': order[step] }, [
        circle(EMBOLUS_FOCUS[order[step]][0], EMBOLUS_FOCUS[order[step]][1], 54,
          { 'class': 'emb-focus-ring' })
      ]),
      labels,
      group({ 'class': 'emb-traveller', 'data-emb-dot': '1' }, [
        circle(0, 0, 15, { 'class': 'emb-dot-glow' }),
        circle(0, 0, 7, { 'class': 'emb-dot' })
      ])
    ].join(''));
  }

  /* ==================================================================
   * 9. Fig. 10 — calf muscle pump
   * ================================================================== */

  /* Geometry shared with app.js so the animated particles stay inside the
   * veins and inside the leg clip. */
  var PUMP = {
    cx: 236,
    leftX: 208,
    rightX: 268,
    superficialX: 158,
    top: 130,
    bottom: 596,
    halfL: 10,
    halfR: 8
  };

  function buildPump(state) {
    var s = state || {};
    var mode = s.mode === 'still' ? 'still' : 'walk';
    var cx = PUMP.cx;

    function tube(x, half, top, bottom, cls) {
      return group({ 'class': 'pump-tube ' + (cls || '') }, [
        rect(x - half, top, half * 2, bottom - top, { 'class': 'pump-tube-lumen', rx: half * 0.6 }),
        path('M ' + (x - half) + ' ' + top + ' L ' + (x - half) + ' ' + bottom, { 'class': 'pump-vein-wall' }),
        path('M ' + (x + half) + ' ' + top + ' L ' + (x + half) + ' ' + bottom, { 'class': 'pump-vein-wall' })
      ].join(''));
    }

    return svg('0 0 520 680', 'fig-pump', [
      '<defs>',
      '<clipPath id="pump-leg-clip"><path d="'
        + legOutline(cx, 0.45, 60, 610, { kneeW: 58, calfW: 78, ankleW: 30, mid: 0.42 }) + '"/></clipPath>',
      '</defs>',
      group({ 'class': 'pump-leg' }, [
        ellipse(cx, 632, 96, 14, { 'class': 'v-ground' }),
        path(legOutline(cx, 0.45, 60, 610, { kneeW: 58, calfW: 78, ankleW: 30, mid: 0.42 }),
          { 'class': 'v-leg-shape' }),
        group({ 'clip-path': 'url(#pump-leg-clip)' }, [
          // calf muscles: two gastrocnemius heads above, the wide soleus below
          ellipse(cx - 62, 268, 48, 76, { 'class': 'pump-muscle pump-muscle--gast' }),
          ellipse(cx + 62, 262, 46, 72, { 'class': 'pump-muscle pump-muscle--gast' }),
          ellipse(cx, 440, 84, 132, { 'class': 'pump-muscle pump-muscle--soleus' }),
          path('M ' + cx + ' 548 C ' + (cx - 8) + ' 576, ' + (cx - 8) + ' 596, ' + cx + ' 612',
            { 'class': 'pump-tendon' }),

          // superficial vein (dashed) running up the medial side
          path('M ' + (PUMP.superficialX + 6) + ' 556 C ' + (PUMP.superficialX + 4) + ' 460, '
            + (PUMP.superficialX + 6) + ' 336, ' + (PUMP.superficialX + 14) + ' 250 '
            + 'C ' + (PUMP.superficialX + 20) + ' 190, ' + (PUMP.superficialX + 28) + ' 152, '
            + (PUMP.superficialX + 40) + ' 132', { 'class': 'pump-superficial' }),
          // perforating veins: superficial -> deep
          path('M ' + (PUMP.superficialX + 10) + ' 452 C ' + (PUMP.superficialX + 30) + ' 450, '
            + (PUMP.leftX - PUMP.halfL - 24) + ' 446, ' + (PUMP.leftX - PUMP.halfL) + ' 442',
            { 'class': 'pump-perforator' }),
          path('M ' + (PUMP.superficialX + 12) + ' 512 C ' + (PUMP.superficialX + 34) + ' 508, '
            + (PUMP.leftX - PUMP.halfL - 22) + ' 496, ' + (PUMP.leftX - PUMP.halfL) + ' 490',
            { 'class': 'pump-perforator' }),

          // deep veins
          tube(PUMP.leftX, PUMP.halfL, PUMP.top, PUMP.bottom),
          tube(PUMP.rightX, PUMP.halfR, PUMP.top, PUMP.bottom),

          // soleal sinuses: wide pouches off the deep veins
          group({ 'class': 'pump-sinuses' }, [
            ellipse(PUMP.leftX - 15, 416, 21, 16, { 'class': 'pump-sinus' }),
            ellipse(PUMP.rightX + 14, 476, 20, 15, { 'class': 'pump-sinus' }),
            ellipse(PUMP.leftX - 12, 486, 19, 14, { 'class': 'pump-sinus' })
          ]),

          // valves
          group({ 'class': 'pump-valves' }, [
            valve(PUMP.leftX, 300, PUMP.halfL - 3, { h: 15, cls: 'pump-valve' }),
            valve(PUMP.leftX, 470, PUMP.halfL - 3, { h: 15, cls: 'pump-valve' }),
            valve(PUMP.rightX, 250, PUMP.halfR - 3, { h: 14, cls: 'pump-valve' }),
            valve(PUMP.rightX, 400, PUMP.halfR - 3, { h: 14, cls: 'pump-valve' }),
            valve(PUMP.rightX, 540, PUMP.halfR - 3, { h: 14, cls: 'pump-valve' })
          ]),

          group({ 'class': 'pump-particles', 'data-pump-particles': '1' }),

          // squeezing arrows, only while walking
          group({ 'class': 'pump-contract' }, [
            path('M ' + (cx - 150) + ' 320 L ' + (PUMP.leftX - PUMP.halfL - 6) + ' 320', { 'class': 'pump-squeeze-line' }),
            path('M ' + (cx - 150) + ' 470 L ' + (PUMP.leftX - PUMP.halfL - 6) + ' 470', { 'class': 'pump-squeeze-line' }),
            path('M ' + (cx + 152) + ' 320 L ' + (PUMP.rightX + PUMP.halfR + 6) + ' 320', { 'class': 'pump-squeeze-line' }),
            path('M ' + (cx + 152) + ' 470 L ' + (PUMP.rightX + PUMP.halfR + 6) + ' 470', { 'class': 'pump-squeeze-line' })
          ])
        ]),

        // low-oxygen caption, shown in "sitting still"
        group({ 'class': 'pump-o2' }, [
          txt(cx + 108, 520, 'O₂ ↓', { 'class': 'pump-o2-tag' }),
          txt(cx + 108, 538, 'stagnant', { 'class': 'pump-o2-tag pump-o2-tag--sub' })
        ])
      ]),
      txt(cx, 44, mode === 'still' ? 'Sitting still' : 'Walking', { 'class': 'pump-mode-title' }),
      group({ 'class': 'pump-labels' }, [
        leader(PUMP.rightX + 4, 250, 402, 194, ['deep vein'], { dir: 1, cls: 'v-leader' }),
        leader(PUMP.leftX - 15, 416, 112, 380, ['soleal sinuses:', 'wide and slow'], { dir: -1, cls: 'v-leader' }),
        leader(PUMP.superficialX + 16, 300, 96, 300, ['surface', 'vein'], { dir: -1, cls: 'v-leader' }),
        leader(302, 330, 406, 306, ['calf muscle'], { dir: 1, cls: 'v-leader' }),
        leader(PUMP.rightX - 3, 404, 406, 396, ['one-way valves'], { dir: 1, cls: 'v-leader' })
      ])
    ].join(''));
  }

  /* ==================================================================
   * Exports
   * ================================================================== */

  window.DVTFigures = {
    scale: buildScale,
    calfVeins: buildCalfVeins,
    legs: buildLegs,
    ultrasound: buildUltrasound,
    triad: buildTriad,
    timeline: buildTimeline,
    embolus: buildEmbolus,
    pump: buildPump,
    /* shared geometry, exported for app.js and the smoke test */
    helpers: {
      legOutline: legOutline,
      pointAtDistance: pointAtDistance,
      routeLength: routeLength,
      polylinePoints: polylinePoints,
      squeeze: squeeze
    },
    /* geometry (not a builder) so app.js can place the animated particles */
    pumpGeometry: PUMP,
    routes: {
      embolus: EMBOLUS_ROUTE,
      embolusSegments: EMBOLUS_SEGMENTS,
      embolusOrder: ['calf', 'popliteal', 'femoral', 'ivc', 'heart', 'lung']
    },
    scaleSceneCount: 4
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = window.DVTFigures; }
})();
