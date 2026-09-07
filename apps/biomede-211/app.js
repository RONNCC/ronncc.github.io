/* BIOMEDE 211 Lab — chapter nav, worksheet scoring, and 22 widgets. */
(function (global) {
  'use strict';
  var B = global.B211, current = null, raf = 0;
  // Book pages in Belmont W19 (verified against the PDF TOC).
  var REFS = { ch1: '§§1.1–1.8, pp.3–10', ch2: '§§2.1–2.16, pp.11–22', ch3: '§§3.1–3.4, pp.23–28', ch4: '§§4.1–4.5, pp.29–40', ch5: 'pp.41–48', ch6: 'pp.49–58', ch7: 'pp.59–70', ch8: 'Review + Quiz I, pp.71–84', ch9: '§§9.1–9.4, pp.87–100', ch10: '§§10.1–10.5, pp.101–108', ch11: 'pp.109–110', ch12: 'p.111–112', ch13: 'pp.113–120', ch14: 'pp.121–130', ch15: 'pp.133–142', ch16: 'pp.143–168 + Quiz II', ch17: '§§17.1–17.6, pp.171–184', ch18: '§§18.1–18.7, pp.185–204', ch19: '§§19.1–19.6, pp.205–228', ch20: 'pp.229–230', ch21: '§§21.1–21.6, pp.231–244', ch22: '§§22.1–22.31, pp.245–282' };
  var score = { correct: 0, answered: 0 }, doneCh = {}, chapState = {};
  var LSKEY = 'b211-v1';
  try {
    var saved = JSON.parse(global.localStorage ? global.localStorage.getItem(LSKEY) : 'null');
    if (saved) { score = saved.score || score; doneCh = saved.doneCh || {}; chapState = saved.chapState || {}; }
  } catch (e) { /* fresh start */ }
  function persist() { try { global.localStorage && global.localStorage.setItem(LSKEY, JSON.stringify({ score: score, doneCh: doneCh, chapState: chapState })); } catch (e) { /* storage unavailable */ } }
  var $ = function (id) { return document.getElementById(id); };
  var els = {};
  ['nav', 'search', 'chap-part', 'chap-num', 'chap-title', 'chap-lede', 'concepts', 'widget', 'worksheet', 'ws-count', 'score', 'btn-quiz', 'follow-book', 'sidebar'].forEach(function (id) { els[id.replace(/-/g, '_')] = $(id); });
  var nav = $('nav'), widgetBox = $('widget');

  function fmt(n, d) { if (!isFinite(n)) return '—'; var a = Math.abs(n); if (a !== 0 && (a >= 1e6 || a < 1e-3)) return n.toExponential(2); return Number(n.toFixed(d === undefined ? 3 : d)).toString(); }

  function ctl(label, min, max, step, val, unit) {
    var row = document.createElement('div'); row.className = 'ctl';
    var lab = document.createElement('span'); lab.textContent = label;
    var inp = document.createElement('input'); inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step; inp.value = val;
    var out = document.createElement('output'); out.textContent = val + (unit || '');
    inp.oninput = function () { out.textContent = inp.value + (unit || ''); row.onchange && row.onchange(parseFloat(inp.value)); };
    row.appendChild(lab); row.appendChild(inp); row.appendChild(out);
    row.get = function () { return parseFloat(inp.value); };
    row.setOut = function (t) { out.textContent = t; };
    return row;
  }

  function pills(el, items) {
    var d = document.createElement('div'); d.className = 'readout';
    items.forEach(function (t) { var s = document.createElement('span'); s.className = 'pill'; s.innerHTML = t; d.appendChild(s); });
    el.appendChild(d); return d;
  }

  function plot(canvas, traces, opts) {
    opts = opts || {};
    var dpr = Math.min(2, global.devicePixelRatio || 1);
    var w = canvas.clientWidth || 600, h = 220;
    canvas.width = w * dpr; canvas.height = h * dpr;
    var c = canvas.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.fillStyle = '#0b0f13'; c.fillRect(0, 0, w, h);
    var allX = [], allY = [];
    traces.forEach(function (t) { allX = allX.concat(t.x); allY = allY.concat(t.y); });
    var x0 = opts.x0 !== undefined ? opts.x0 : Math.min.apply(null, allX);
    var x1 = opts.x1 !== undefined ? opts.x1 : Math.max.apply(null, allX);
    var y0 = opts.y0 !== undefined ? opts.y0 : Math.min.apply(null, allY);
    var y1 = opts.y1 !== undefined ? opts.y1 : Math.max.apply(null, allY);
    if (y1 - y0 < 1e-9) { y1 += 1; y0 -= 1; } if (x1 - x0 < 1e-9) { x1 += 1; x0 -= 1; }
    var px = function (x) { return 34 + (x - x0) / (x1 - x0) * (w - 44); };
    var py = function (y) { return h - 14 - (y - y0) / (y1 - y0) * (h - 28); };
    c.strokeStyle = '#232d38'; c.lineWidth = 1;
    for (var g = 0; g <= 4; g++) { var gy = 14 + g * (h - 28) / 4; c.beginPath(); c.moveTo(34, gy); c.lineTo(w - 10, gy); c.stroke(); }
    (opts.hlines || []).forEach(function (hl) { c.strokeStyle = hl.color || '#e8c35a'; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(34, py(hl.y)); c.lineTo(w - 10, py(hl.y)); c.stroke(); c.setLineDash([]); });
    traces.forEach(function (t) {
      c.strokeStyle = t.color || '#58b7e8'; c.lineWidth = t.width || 2; c.beginPath();
      for (var i = 0; i < t.x.length; i++) { var X = px(t.x[i]), Y = py(t.y[i]); if (i) c.lineTo(X, Y); else c.moveTo(X, Y); }
      c.stroke();
      if (t.dots) { c.fillStyle = t.color || '#58b7e8'; for (var j = 0; j < t.x.length; j += t.dots) { c.beginPath(); c.arc(px(t.x[j]), py(t.y[j]), 2.5, 0, 7); c.fill(); } }
    });
    c.fillStyle = '#67727e'; c.font = '10px monospace';
    c.fillText(fmt(y1, 2), 4, 22); c.fillText(fmt(y0, 2), 4, h - 16);
    c.fillText(fmt(x0, 2), 36, h - 3); var xr = fmt(x1, 2); c.fillText(xr, w - 10 - c.measureText(xr).width, h - 3);
    if (opts.xlabel) { c.fillStyle = '#9aa7b4'; c.fillText(opts.xlabel, w - 10 - c.measureText(opts.xlabel).width, 12); }
    if (opts.ylabel) { c.fillStyle = '#9aa7b4'; c.fillText(opts.ylabel, 4, 34); }
    return { px: px, py: py };
  }

  function stopAnim() { if (raf) cancelAnimationFrame(raf); raf = 0; }

  /* ---------------- widgets ---------------- */
  var W = {};

  W.charge = function (el) {
    var iC = ctl('Current I', 0.1, 10, 0.1, 2, ' mA'), tC = ctl('Time t', 1, 120, 1, 60, ' s'), vC = ctl('Voltage V', 1, 12, 0.5, 5, ' V');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(iC, tC, vC); var ro = pills(el, []);
    var lg = document.createElement('div'); lg.className = 'readout';
    [['— Q (mC)', '#58b7e8'], ['— E (J)', '#e8c35a']].forEach(function (L) { var s = document.createElement('span'); s.className = 'pill'; s.style.color = L[1]; s.textContent = L[0]; lg.appendChild(s); });
    el.appendChild(lg); el.appendChild(cv);
    var dots = [];
    function draw() {
      var I = iC.get() / 1e3, t = tC.get(), V = vC.get();
      var Q = I * t, P = V * I, E = P * t;
      ro.innerHTML = '';
      ['Q = ' + fmt(Q * 1e3, 2) + ' mC', 'P = ' + fmt(P * 1e3, 2) + ' mW', 'E = ' + fmt(E, 2) + ' J'].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 200, x = [], y1 = [], y2 = [];
      for (var k = 0; k < n; k++) { var tt = k / (n - 1) * t; x.push(tt); y1.push(I * tt * 1e3); y2.push(V * I * tt); }
      plot(cv, [{ x: x, y: y1, color: '#58b7e8' }, { x: x, y: y2, color: '#e8c35a' }], {});
      var c = cv.getContext('2d'); c.fillStyle = '#7bd88f';
      dots.forEach(function (d) { c.beginPath(); c.arc(d, 60 + 40 * Math.sin(d / 30), 3, 0, 7); c.fill(); });
    }
    function tick() { var w = cv.clientWidth || 600; dots = dots.map(function (d) { return (d + iC.get() * 2) % w; }); if (dots.length < 40) dots.push(Math.random() * w); draw(); raf = requestAnimationFrame(tick); }
    [iC, tC, vC].forEach(function (c) { c.onchange = draw; });
    draw(); tick();
  };

  W.equiv = function (el) {
    var a = ctl('R1', 1, 1000, 1, 100, ' Ω'), b = ctl('R2', 1, 1000, 1, 200, ' Ω'), vs = ctl('Source Vs', 1, 24, 0.5, 12, ' V');
    var mode = document.createElement('select'); ['series', 'parallel'].forEach(function (m) { var o = document.createElement('option'); o.value = m; o.textContent = m; mode.appendChild(o); });
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(a, b, vs, mode); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var R1 = a.get(), R2 = b.get(), V = vs.get(), m = mode.value;
      var Req = m === 'series' ? R1 + R2 : R1 * R2 / (R1 + R2);
      var I = V / Req, P = V * V / Req;
      ro.innerHTML = '';
      ['Req = ' + fmt(Req, 1) + ' Ω', 'I = ' + fmt(I * 1e3, 2) + ' mA', 'P = ' + fmt(P, 3) + ' W'].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 100, x = [], y = [];
      for (var k = 0; k <= n; k++) { var vv = V * k / n; x.push(vv); y.push(vv / Req * 1e3); }
      plot(cv, [{ x: x, y: y, color: '#58b7e8' }], { x0: 0 });
    }
    [a, b, vs].forEach(function (c) { c.onchange = draw; }); mode.onchange = draw; draw();
  };

  W.opamp = function (el) {
    var mode = document.createElement('select'); ['inverting', 'non-inverting', 'follower'].forEach(function (m) { var o = document.createElement('option'); o.value = m; o.textContent = m; mode.appendChild(o); });
    var r1 = ctl('R1', 1, 100, 1, 20, ' kΩ'), rf = ctl('Rf', 1, 500, 1, 100, ' kΩ'), vi = ctl('Vi', -5, 5, 0.1, 1, ' V'), sup = ctl('Supply ±', 5, 15, 1, 12, ' V');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(mode, r1, rf, vi, sup); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var R1 = r1.get(), Rf = rf.get(), Vi = vi.get(), S = sup.get(), m = mode.value;
      var g = m === 'inverting' ? -Rf / R1 : m === 'non-inverting' ? 1 + Rf / R1 : 1;
      var Vo = Math.max(-S + 1, Math.min(S - 1, g * Vi));
      var sat = Math.abs(g * Vi) > S - 1;
      ro.innerHTML = '';
      ['gain = ' + fmt(g, 2), 'Vo = ' + fmt(Vo, 2) + ' V' + (sat ? ' (SATURATED)' : '')].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 100, x = [], y = [];
      for (var k = 0; k <= n; k++) { var vv = -5 + 10 * k / n; x.push(vv); y.push(Math.max(-S + 1, Math.min(S - 1, g * vv))); }
      plot(cv, [{ x: x, y: y, color: sat ? '#e87a7a' : '#7bd88f' }], { hlines: [{ y: S - 1, color: '#e87a7a' }, { y: -S + 1, color: '#e87a7a' }] });
    }
    [r1, rf, vi, sup].forEach(function (c) { c.onchange = draw; }); mode.onchange = draw; draw();
  };

  function solve2(a, b, c, d, e, f) { var D = a * d - b * c; return { x: (e * d - b * f) / D, y: (a * f - e * c) / D }; }

  W.nodal = function (el) {
    var vs = ctl('Vs', 1, 24, 0.5, 12, ' V'), r1 = ctl('R1 (Vs–n1)', 10, 1000, 10, 100, ' Ω'), r2 = ctl('R2 (n1–n2)', 10, 1000, 10, 200, ' Ω'), r3 = ctl('R3 (n2–gnd)', 10, 1000, 10, 100, ' Ω'), is = ctl('Is into n1', 0, 100, 1, 10, ' mA');
    el.append(vs, r1, r2, r3, is); var ro = pills(el, []);
    function draw() {
      var Vs = vs.get(), R1 = r1.get(), R2 = r2.get(), R3 = r3.get(), Is = is.get() / 1e3;
      var G1 = 1 / R1, G2 = 1 / R2, G3 = 1 / R3;
      var s = solve2(G1 + G2, -G2, -G2, G2 + G3, G1 * Vs + Is, 0);
      ro.innerHTML = '';
      ['v1 = ' + fmt(s.x, 3) + ' V', 'v2 = ' + fmt(s.y, 3) + ' V', 'KCL n1: (v1−Vs)/R1 + (v1−v2)/R2 = Is ✓'].forEach(function (t) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = t; ro.appendChild(sp); });
    }
    [vs, r1, r2, r3, is].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.mesh = function (el) {
    var v1 = ctl('Vs1', 1, 24, 0.5, 12, ' V'), v2 = ctl('Vs2', 1, 24, 0.5, 5, ' V'), r1 = ctl('R1', 10, 1000, 10, 100, ' Ω'), r2 = ctl('R2', 10, 1000, 10, 200, ' Ω'), r3 = ctl('R shared', 10, 1000, 10, 100, ' Ω');
    el.append(v1, v2, r1, r2, r3); var ro = pills(el, []);
    function draw() {
      var Vs1 = v1.get(), Vs2 = v2.get(), R1 = r1.get(), R2 = r2.get(), R3 = r3.get();
      var s = solve2(R1 + R3, -R3, -R3, R2 + R3, Vs1, Vs2);
      ro.innerHTML = '';
      ['i1 = ' + fmt(s.x * 1e3, 2) + ' mA', 'i2 = ' + fmt(s.y * 1e3, 2) + ' mA', 'branch R3: ' + fmt((s.x - s.y) * 1e3, 2) + ' mA'].forEach(function (t) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = t; ro.appendChild(sp); });
    }
    [v1, v2, r1, r2, r3].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.super = function (el) {
    var vs = ctl('Vs (n1–n2)', 1, 24, 0.5, 10, ' V'), r1 = ctl('R1 (n1–gnd)', 10, 1000, 10, 100, ' Ω'), r2 = ctl('R2 (n2–gnd)', 10, 1000, 10, 200, ' Ω'), is = ctl('Is into surface', 0, 100, 1, 20, ' mA');
    el.append(vs, r1, r2, is); var ro = pills(el, []);
    function draw() {
      var Vs = vs.get(), R1 = r1.get(), R2 = r2.get(), Is = is.get() / 1e3;
      var v2 = (Is + Vs / R1) / (1 / R1 + 1 / R2), v1 = v2 - Vs;
      ro.innerHTML = '';
      ['surface KCL: v1/R1 + v2/R2 = Is', 'v1 = ' + fmt(v1, 3) + ' V', 'v2 = ' + fmt(v2, 3) + ' V', 'constraint v2−v1 = ' + fmt(v2 - v1, 3) + ' V'].forEach(function (t) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = t; ro.appendChild(sp); });
    }
    [vs, r1, r2, is].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.thevenin = function (el) {
    var vs = ctl('Vs', 1, 24, 0.5, 12, ' V'), r1 = ctl('R1', 10, 1000, 10, 100, ' Ω'), r2 = ctl('R2', 10, 1000, 10, 200, ' Ω'), rl = ctl('Load RL', 10, 2000, 10, 200, ' Ω');
    el.append(vs, r1, r2, rl); var ro = pills(el, []);
    function draw() {
      var Vs = vs.get(), R1 = r1.get(), R2 = r2.get(), RL = rl.get();
      var Vth = Vs * R2 / (R1 + R2), Rth = R1 * R2 / (R1 + R2), VL = Vth * RL / (Rth + RL);
      ro.innerHTML = '';
      ['Vth = Voc = ' + fmt(Vth, 3) + ' V', 'Rth = Voc/Isc = ' + fmt(Rth, 1) + ' Ω', 'Vload = ' + fmt(VL, 3) + ' V (max power at RL=Rth)'].forEach(function (t) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = t; ro.appendChild(sp); });
    }
    [vs, r1, r2, rl].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.quizgen = function (el) {
    var q = document.createElement('p'), inp = document.createElement('input'), btn = document.createElement('button'), nb = document.createElement('button'), out = document.createElement('p');
    inp.placeholder = 'Req in Ω'; btn.textContent = 'Check'; nb.textContent = 'New network'; out.className = 'expl';
    var R = [];
    function gen() { R = [10, 20, 22, 47, 100, 220].map(function () { return [10, 20, 47, 100, 220][Math.floor(Math.random() * 5)]; }); R = R.slice(0, 4); q.innerHTML = 'Find Req: <code>R1 + (R2 ‖ (R3 + R4))</code> with R1=' + R[0] + ' R2=' + R[1] + ' R3=' + R[2] + ' R4=' + R[3] + ' Ω.'; out.textContent = ''; inp.value = ''; }
    function ans() { return R[0] + R[1] * (R[2] + R[3]) / (R[1] + R[2] + R[3]); }
    btn.onclick = function () { var v = parseFloat(inp.value), a = ans(); out.textContent = Math.abs(v - a) / a < 0.02 ? '✓ Correct: ' + fmt(a, 1) + ' Ω.' : '✗ Got ' + inp.value + ' — answer ' + fmt(a, 1) + ' Ω. R3+R4 first, then parallel, then series.'; };
    nb.onclick = gen;
    var br = document.createElement('div'); br.className = 'btnrow'; br.append(inp, btn, nb);
    el.append(q, br, out); gen();
  };

  W.laplace = function (el) {
    var sel = document.createElement('select'); ['1 (step)', 'e^(at)', 'sin(ωt)'].forEach(function (f) { var o = document.createElement('option'); o.textContent = f; sel.appendChild(o); });
    var a = ctl('a / ω', -5, 5, 0.1, -2, '');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(sel, a); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var v = a.get(), k = sel.selectedIndex, F, desc;
      a.style.display = k === 0 ? 'none' : '';
      if (k === 0) { F = '1/s — pole at 0'; }
      else if (k === 1) { F = '1/(s−(' + v + ')) — pole at ' + v; }
      else { F = v + '/(s²+' + v * v + ') — poles at ±j' + Math.abs(v); }
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = 'F(s) = ' + F; ro.appendChild(sp);
      var n = 120, x = [], y = [];
      for (var i = 0; i < n; i++) { var t = i / n * 5; x.push(t); y.push(k === 0 ? 1 : k === 1 ? Math.exp(v * t) : Math.sin(v * t)); }
      plot(cv, [{ x: x, y: y, color: '#58b7e8' }], {});
      desc = k === 1 && v > 0 ? 'Right-half-plane pole → grows: unstable.' : k === 1 ? 'Left-half-plane pole → decays: stable.' : 'Marginal/neutral: sustained.';
      var sp2 = document.createElement('span'); sp2.className = 'pill'; sp2.textContent = desc; ro.appendChild(sp2);
    }
    a.onchange = draw; sel.onchange = draw; draw();
  };

  function stepResp(z, w, t) {
    if (z < 1) { var wd = w * Math.sqrt(1 - z * z), ph = Math.acos(z); return 1 - Math.exp(-z * w * t) / Math.sqrt(1 - z * z) * Math.cos(wd * t - ph); }
    if (Math.abs(z - 1) < 1e-9) return 1 - Math.exp(-w * t) * (1 + w * t);
    var s1 = -w * (z - Math.sqrt(z * z - 1)), s2 = -w * (z + Math.sqrt(z * z - 1));
    return 1 + (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s1 - s2);
  }

  W.polezero = function (el) {
    var z = ctl('ζ damping', 0, 2, 0.05, 0.4, ''), w = ctl('ωn', 0.5, 10, 0.1, 3, ' rad/s');
    var c1 = document.createElement('canvas'); c1.className = 'plot';
    var c2 = document.createElement('canvas'); c2.className = 'plot';
    el.append(z, w); var ro = pills(el, []); el.append(c1, c2);
    function draw() {
      var zz = z.get(), ww = w.get();
      var label = zz < 1 ? 'underdamped — ringing decay' : Math.abs(zz - 1) < 0.05 ? 'critically damped' : 'overdamped — slow crawl';
      var re, im, re2 = null;
      if (zz < 1) { re = -zz * ww; im = ww * Math.sqrt(1 - zz * zz); }
      else if (Math.abs(zz - 1) < 0.05) { re = -ww; im = 0; }
      else { re = -ww * (zz - Math.sqrt(zz * zz - 1)); re2 = -ww * (zz + Math.sqrt(zz * zz - 1)); im = 0; }
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = 'poles ' + fmt(re, 2) + (re2 === null ? ' ± j' + fmt(im, 2) : ' and ' + fmt(re2, 2) + ' (two real poles)') + ' — ' + label; ro.appendChild(sp);
      var c = c1.getContext('2d'), dpr = Math.min(2, global.devicePixelRatio || 1), Wd = c1.clientWidth || 600, H = 220;
      c1.width = Wd * dpr; c1.height = H * dpr; c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.fillStyle = '#0b0f13'; c.fillRect(0, 0, Wd, H);
      c.fillStyle = 'rgba(123,216,143,.12)'; c.fillRect(34, 0, (Wd - 44) / 2, H);
      c.strokeStyle = '#67727e'; c.beginPath(); c.moveTo(34 + (Wd - 44) / 2, 0); c.lineTo(34 + (Wd - 44) / 2, H); c.stroke();
      c.fillStyle = '#e8c35a'; c.font = '10px monospace'; c.fillText('stable ←σ→ unstable', 40, 16);
      var sx = function (r) { return 34 + (r + 12) / 24 * (Wd - 44); }, sy = function (i) { return H / 2 - i / 12 * (H / 2 - 14); };
      c.fillStyle = '#e87a7a';
      if (zz < 1) { [[re, im], [re, -im]].forEach(function (p) { c.beginPath(); c.arc(sx(p[0]), sy(p[1]), 5, 0, 7); c.fill(); }); }
      else if (re2 === null) { c.beginPath(); c.arc(sx(re), sy(0), 5, 0, 7); c.fill(); }
      else { [[re, 0], [re2, 0]].forEach(function (p) { c.beginPath(); c.arc(sx(p[0]), sy(p[1]), 5, 0, 7); c.fill(); }); }
      var n = 200, x = [], y = [], T = 10 / Math.max(ww * Math.max(zz, 0.2), 0.5);
      for (var k = 0; k < n; k++) { var t = k / (n - 1) * T; x.push(t); y.push(stepResp(zz, ww, t)); }
      plot(c2, [{ x: x, y: y, color: '#7bd88f' }], { hlines: [{ y: 1, color: '#67727e' }] });
    }
    z.onchange = draw; w.onchange = draw; draw();
  };

  W.rc = function (el) {
    var r = ctl('R', 100, 10000, 100, 1000, ' Ω'), c = ctl('C', 10, 1000, 10, 100, ' µF'), v = ctl('V0', 1, 12, 0.5, 5, ' V');
    var mode = document.createElement('select'); ['charge', 'discharge'].forEach(function (m) { var o = document.createElement('option'); o.textContent = m; mode.appendChild(o); });
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(r, c, mode, v); var ro = pills(el, []); el.appendChild(cv);
    var t = 0;
    function draw() {
      var R = r.get(), C = c.get() * 1e-6, V0 = v.get(), tau = R * C, ch = mode.value === 'charge';
      ro.innerHTML = '';
      ['τ = RC = ' + fmt(tau, 3) + ' s', '63% at 1τ, settled ≈ 5τ = ' + fmt(5 * tau, 2) + ' s'].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 200, x = [], y = [], T = 6 * tau;
      for (var k = 0; k < n; k++) { var tt = k / (n - 1) * T; x.push(tt); y.push(ch ? V0 * (1 - Math.exp(-tt / tau)) : V0 * Math.exp(-tt / tau)); }
      var marks = ch ? [{ y: V0 * 0.632, color: '#e8c35a' }] : [{ y: V0 * 0.368, color: '#e8c35a' }];
      plot(cv, [{ x: x, y: y, color: '#58b7e8' }], { hlines: marks, xlabel: 's', ylabel: 'V' });
      var ct = Math.min(t, T), cy = ch ? V0 * (1 - Math.exp(-ct / tau)) : V0 * Math.exp(-ct / tau);
      var cc = cv.getContext('2d');
      var dpr = Math.min(2, global.devicePixelRatio || 1), Wd = cv.clientWidth || 600, H = 220;
      var X = 34 + (ct / T) * (Wd - 44), Y = H - 14 - (cy / (V0 * 1.05)) * (H - 28);
      cc.fillStyle = '#7bd88f'; cc.beginPath(); cc.arc(X, Y, 5, 0, 7); cc.fill();
    }
    function tick() { t += 0.03 * (r.get() * c.get() * 1e-6 * 6) / 2; if (t > r.get() * c.get() * 1e-6 * 6) t = 0; draw(); raf = requestAnimationFrame(tick); }
    [r, c, v].forEach(function (x) { x.onchange = function () { t = 0; }; }); mode.onchange = function () { t = 0; };
    tick();
  };

  W.rlc = function (el) {
    var r = ctl('R', 1, 500, 1, 50, ' Ω'), l = ctl('L', 10, 200, 5, 50, ' mH'), c = ctl('C', 10, 1000, 10, 200, ' nF');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(r, l, c); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var R = r.get(), L = l.get() / 1e3, C = c.get() * 1e-9;
      var w0 = 1 / Math.sqrt(L * C), zz = R / 2 * Math.sqrt(C / L);
      var label = zz < 1 ? 'underdamped' : Math.abs(zz - 1) < 0.08 ? 'critically damped' : 'overdamped';
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = 'ζ = ' + fmt(zz, 3) + ', ωn = ' + fmt(w0, 0) + ' rad/s — ' + label; ro.appendChild(sp);
      var n = 240, x = [], y = [], T = 8 / (w0 * Math.max(zz, 0.15));
      for (var k = 0; k < n; k++) { var t = k / (n - 1) * T; x.push(t * 1e3); y.push(stepResp(zz, w0, t)); }
      plot(cv, [{ x: x, y: y, color: '#7bd88f' }], { hlines: [{ y: 1, color: '#67727e' }] });
    }
    [r, l, c].forEach(function (x) { x.onchange = draw; }); draw();
  };

  W.conv = function (el) {
    var pw = ctl('Pulse width', 0.2, 2, 0.1, 1, ' s'), tau = ctl('h decay τ', 0.2, 2, 0.1, 0.8, ' s');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(pw, tau); el.appendChild(cv);
    var shift = 0;
    function h(t) { return t < 0 ? 0 : Math.exp(-t / tau.get()); }
    function draw() {
      var P = pw.get(), T = 6, n = 160, x = [], inp = [], hh = [], out = [];
      for (var k = 0; k < n; k++) { var t = k / (n - 1) * T; x.push(t); inp.push(t < P ? 1 : 0); }
      for (var j = 0; j < n; j++) { var tj = j / (n - 1) * T, s = 0; for (var m = 0; m <= j; m++) { var tm = m / (n - 1) * T; s += (tm < P ? 1 : 0) * h(tj - tm) * (T / n); } out.push(s); }
      for (var q = 0; q < n; q++) { var tq = q / (n - 1) * T; hh.push(h(shift - tq) * 0.9); }
      plot(cv, [{ x: x, y: inp, color: '#67727e' }, { x: x, y: hh, color: '#e8c35a' }, { x: x, y: out, color: '#58b7e8', width: 3 }], {});
    }
    function tick() { shift += 0.05; if (shift > 6) shift = 0; draw(); raf = requestAnimationFrame(tick); }
    [pw, tau].forEach(function (c) { c.onchange = draw; });
    tick();
  };

  W.stab = function (el) {
    var sg = ctl('Pole real σ', -3, 3, 0.1, -1, ''), om = ctl('Pole imag ω', 0, 6, 0.1, 2, ' rad/s');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(sg, om); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var s = sg.get(), w = om.get();
      var stable = s < -1e-9, marg = Math.abs(s) < 1e-9;
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill';
      sp.textContent = stable ? '✓ STABLE — decays e^(' + s + 't)' : marg ? '○ MARGINAL — rings forever' : '✗ UNSTABLE — grows e^(' + s + 't)';
      ro.appendChild(sp);
      var n = 200, x = [], y = [], T = 6;
      for (var k = 0; k < n; k++) { var t = k / (n - 1) * T; x.push(t); y.push(Math.exp(Math.min(s, 2) * t) * Math.cos(w * t)); }
      plot(cv, [{ x: x, y: y, color: stable ? '#7bd88f' : marg ? '#e8c35a' : '#e87a7a' }], {});
    }
    [sg, om].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.bode = function (el) {
    var type = document.createElement('select'); ['low-pass', 'high-pass'].forEach(function (m) { var o = document.createElement('option'); o.textContent = m; type.appendChild(o); });
    var fc = ctl('Corner fc', 1, 5000, 1, 100, ' Hz'), g = ctl('Passband gain', 1, 100, 1, 10, '×');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(type, fc, g); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var Fc = fc.get(), G = g.get(), lp = type.value === 'low-pass';
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = '−3 dB at ' + Fc + ' Hz, ±20 dB/decade'; ro.appendChild(sp);
      var n = 120, x = [], y = [];
      for (var k = 0; k < n; k++) { var f = Math.pow(10, -1 + k / (n - 1) * 6); x.push(Math.log10(f)); var H = lp ? 1 / Math.sqrt(1 + Math.pow(f / Fc, 2)) : (f / Fc) / Math.sqrt(1 + Math.pow(f / Fc, 2)); y.push(20 * Math.log10(G * H)); }
      plot(cv, [{ x: x, y: y, color: '#58b7e8' }], { hlines: [{ y: 20 * Math.log10(G) - 3, color: '#e8c35a' }], xlabel: 'log f', ylabel: 'dB' });
    }
    [fc, g].forEach(function (c) { c.onchange = draw; }); type.onchange = draw; draw();
  };

  W.pid = function (el) {
    var kp = ctl('Kp', 0, 20, 0.5, 5, ''), ki = ctl('Ki', 0, 20, 0.5, 2, ''), kd = ctl('Kd', 0, 5, 0.1, 0.5, ''), pa = ctl('Plant pole a', 0.2, 5, 0.1, 1, '');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(kp, ki, kd, pa); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var Kp = kp.get(), Ki = ki.get(), Kd = kd.get(), a = pa.get();
      var dt = 0.01, T = 15, y = 0, integ = 0, prevE = 1, n = Math.floor(T / dt), x = [], yy = [], over = 0, fin = 0;
      for (var k = 0; k < n; k++) {
        var t = k * dt, e = 1 - y;
        integ += e * dt; var deriv = (e - prevE) / dt; prevE = e;
        var u = Kp * e + Ki * integ + Kd * deriv;
        y += dt * (-a * y + u);
        if (k % 5 === 0) { x.push(t); yy.push(y); }
        if (y > over) over = y; fin = y;
      }
      ro.innerHTML = '';
      ['overshoot ' + fmt((over - 1) * 100, 1) + '%', 'final ' + fmt(fin, 3) + ' (target 1)', 'ess ' + fmt(1 - fin, 3)].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      plot(cv, [{ x: x, y: yy, color: '#7bd88f' }], { hlines: [{ y: 1, color: '#67727e' }] });
    }
    [kp, ki, kd, pa].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.cole = function (el) {
    var r1 = ctl('R1 (fluid)', 10, 200, 5, 50, ' Ω'), r2 = ctl('R2 (cells)', 10, 300, 5, 100, ' Ω'), cc = ctl('C (membrane)', 1, 50, 1, 10, ' nF'), fr = ctl('Frequency', 1, 1000, 1, 50, ' kHz');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(r1, r2, cc, fr); var ro = pills(el, []); el.appendChild(cv);
    function draw() {
      var R1 = r1.get(), R2 = r2.get(), C = cc.get() * 1e-9, f = fr.get() * 1e3, w = 2 * Math.PI * f, tau = R2 * C;
      var R = R1 + R2 / (1 + Math.pow(w * tau, 2)), X = -w * tau * R2 / (1 + Math.pow(w * tau, 2));
      var R0 = R1 + R2;
      ro.innerHTML = '';
      ['R0 = ' + R0 + ' Ω', 'R∞ = ' + R1 + ' Ω', 'τ = ' + fmt(tau * 1e6, 1) + ' µs', 'now: R=' + fmt(R, 1) + ' X=' + fmt(X, 1)].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 100, cx = (R0 + R1) / 2, rad = (R0 - R1) / 2, x = [], y = [];
      for (var k = 0; k <= n; k++) { var th = Math.PI * k / n; x.push(cx + rad * Math.cos(th)); y.push(-rad * Math.sin(th)); }
      plot(cv, [{ x: x, y: y, color: '#58b7e8' }], { hlines: [{ y: 0, color: '#67727e' }] });
      var c2 = cv.getContext('2d'), dpr = Math.min(2, global.devicePixelRatio || 1), Wd = cv.clientWidth || 600, H = 220;
      var Xpx = 34 + (R - R1) / (R0 - R1) * (Wd - 44), Ypx = H - 14 - ((X - (-rad)) / rad) * (H - 28);
      c2.fillStyle = '#e8c35a'; c2.beginPath(); c2.arc(Math.max(34, Math.min(Wd - 10, Xpx)), Math.max(14, Math.min(H - 14, Ypx)), 5, 0, 7); c2.fill();
    }
    [r1, r2, cc, fr].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.ap = function (el) {
    var ie = ctl('Iext step', 0, 30, 0.5, 10, ' µA/cm²');
    var cv = document.createElement('canvas'); cv.className = 'plot';
    el.append(ie); var ro = pills(el, []); el.appendChild(cv);
    function am(v) { if (Math.abs(v + 40) < 1e-7) return 1; return 0.1 * (v + 40) / (1 - Math.exp(-(v + 40) / 10)); }
    function bm(v) { return 4 * Math.exp(-(v + 65) / 18); }
    function ah(v) { return 0.07 * Math.exp(-(v + 65) / 20); }
    function bh(v) { return 1 / (1 + Math.exp(-(v + 35) / 10)); }
    function an(v) { if (Math.abs(v + 55) < 1e-7) return 0.1; return 0.01 * (v + 55) / (1 - Math.exp(-(v + 55) / 10)); }
    function bn(v) { return 0.125 * Math.exp(-(v + 65) / 80); }
    function draw() {
      var I = ie.get(), dt = 0.02, T = 60, V = -70, m = 0.05, h = 0.6, nn = 0.32;
      var gNa = 120, gK = 36, gL = 0.3, ENa = 50, EK = -77, EL = -54.4, Cm = 1;
      var n = Math.floor(T / dt), x = [], y = [], peak = -99;
      for (var k = 0; k < n; k++) {
        var t = k * dt, Ist = (t > 10 && t < 40) ? I : 0;
        m += dt * (am(V) * (1 - m) - bm(V) * m); h += dt * (ah(V) * (1 - h) - bh(V) * h); nn += dt * (an(V) * (1 - nn) - bn(V) * nn);
        V += dt * (Ist - gNa * m * m * m * h * (V - ENa) - gK * Math.pow(nn, 4) * (V - EK) - gL * (V - EL)) / Cm;
        if (k % 5 === 0) { x.push(t); y.push(V); }
        if (V > peak) peak = V;
      }
      var fired = peak > 0;
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill';
      sp.textContent = fired ? '✓ FIRED — peak ' + fmt(peak, 1) + ' mV (overshoot, all-or-none)' : '○ subthreshold — peak ' + fmt(peak, 1) + ' mV (raise Iext past ~6)';
      ro.appendChild(sp);
      plot(cv, [{ x: x, y: y, color: fired ? '#7bd88f' : '#58b7e8' }], { hlines: [{ y: -70, color: '#67727e' }, { y: -55, color: '#e8c35a' }], xlabel: 'ms', ylabel: 'mV' });
    }
    ie.onchange = draw; draw();
  };

  W.nor = function (el) {
    var gates = { NOT: function (a) { return !a; }, AND: function (a, b) { return a && b; }, OR: function (a, b) { return a || b; }, NAND: function (a, b) { return !(a && b); }, NOR: function (a, b) { return !(a || b); }, XOR: function (a, b) { return !!((a || b) && !(a && b)); } };
    var sel = document.createElement('select'); Object.keys(gates).forEach(function (g) { var o = document.createElement('option'); o.textContent = g; sel.appendChild(o); });
    var ba = document.createElement('button'), bb = document.createElement('button');
    var A = 0, B2 = 0;
    ba.textContent = 'A = 0'; bb.textContent = 'B = 0';
    ba.onclick = function () { A = !A; ba.textContent = 'A = ' + (A ? 1 : 0); draw(); };
    bb.onclick = function () { B2 = !B2; bb.textContent = 'B = ' + (B2 ? 1 : 0); draw(); };
    var br = document.createElement('div'); br.className = 'btnrow'; br.append(sel, ba, bb);
    el.appendChild(br); var ro = pills(el, []);
    function draw() {
      var g = sel.value, out = g === 'NOT' ? gates.NOT(A) : gates[g](A, B2);
      ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = g + ' → ' + (out ? 1 : 0); ro.appendChild(sp);
      var sp2 = document.createElement('span'); sp2.className = 'pill'; sp2.textContent = g === 'NOT' ? 'NOR + tie inputs: NOT = A NOR A' : g === 'OR' ? 'OR = (A NOR B) NOR (A NOR B)' : g === 'AND' ? 'AND = (A NOR A) NOR (B NOR B), by De Morgan' : 'build it from NORs in Ch.19 §19.6'.
      ro.appendChild(sp2);
    }
    sel.onchange = draw; draw();
  };

  W.nyquist = function (el) {
    var fm = ctl('Signal fmax', 10, 200, 5, 100, ' Hz'), fs = ctl('Sample fs', 20, 1000, 10, 500, ' Hz'), nb = ctl('ADC bits', 2, 12, 1, 8, ' bits');
    var c1 = document.createElement('canvas'); c1.className = 'plot';
    var c2 = document.createElement('canvas'); c2.className = 'plot';
    el.append(fm, fs, nb); var ro = pills(el, []); el.append(c1, c2);
    function draw() {
      var Fm = fm.get(), Fs = fs.get(), N = nb.get();
      var alias = Fs < 2 * Fm;
      var fshow = alias ? Math.abs(Fm - Math.round(Fm / Fs) * Fs) : Fm;
      ro.innerHTML = '';
      [(alias ? '✗ ALIASING — impostor at ' + fmt(fshow, 1) + ' Hz' : '✓ clean — fs ≥ 2·fmax'), 'SQNR ≈ ' + fmt(6.02 * N + 1.76, 1) + ' dB', 'LSB = VFS/' + Math.pow(2, N)].forEach(function (s) { var sp = document.createElement('span'); sp.className = 'pill'; sp.textContent = s; ro.appendChild(sp); });
      var n = 300, x = [], y = [], T = 3 / Fm;
      for (var k = 0; k < n; k++) { var t = k / (n - 1) * T; x.push(t * 1e3); y.push(Math.sin(2 * Math.PI * Fm * t)); }
      var ns = Math.floor(T * Fs), sx = [], sy = [];
      for (var j = 0; j <= ns; j++) { var tt = j / Fs; sx.push(tt * 1e3); sy.push(Math.sin(2 * Math.PI * Fm * tt)); }
      plot(c1, [{ x: x, y: y, color: '#58b7e8' }, { x: sx, y: sy, color: '#e8c35a', dots: 1 }], {});
      var lv = 8, x2 = [], y2 = [];
      for (var m = 0; m <= lv; m++) { var tm = m / lv * T; x2.push(tm * 1e3); y2.push(Math.round((Math.sin(2 * Math.PI * Fm * tm) + 1) / 2 * (Math.pow(2, N) - 1)) / (Math.pow(2, N) - 1) * 2 - 1); }
      plot(c2, [{ x: x, y: y, color: '#66788c' }, { x: x2, y: y2, color: '#7bd88f', dots: 1 }], { xlabel: 'ms', ylabel: 'V' });
    }
    [fm, fs, nb].forEach(function (c) { c.onchange = draw; }); draw();
  };

  W.device = function (el) {
    var steps = [
      { q: 'Life-supporting / life-sustaining, or unreasonable risk of injury?', opts: ['Yes — Class III', 'No — continue'] },
      { q: 'Moderate risk needing performance standards (pumps, wheelchairs)?', opts: ['Yes — Class II', 'No — Class I'] },
      { q: 'Predicate device with substantial equivalence?', opts: ['Yes — 510(k)', 'No — De Novo / PMA'] }
    ];
    var i = 0, path = [];
    var q = document.createElement('p'), box = document.createElement('div'); box.className = 'btnrow';
    var ro = pills(el, []); el.append(q, box);
    function render() {
      if (i >= steps.length) {
        q.textContent = 'Done.';
        ro.innerHTML = ''; var sp = document.createElement('span'); sp.className = 'pill';
        sp.textContent = path[0] === 0 ? 'Class III → PMA (novel) or HDE (HUD) / IDE for trials' : path[1] === 0 ? 'Class II → ' + (path[2] === 0 ? '510(k)' : 'De Novo') : 'Class I → exempt / general controls';
        ro.appendChild(sp);
        var rb = document.createElement('button'); rb.textContent = 'Restart'; rb.onclick = function () { i = 0; path = []; render(); }; box.innerHTML = ''; box.appendChild(rb);
        return;
      }
      q.textContent = (i + 1) + '. ' + steps[i].q; box.innerHTML = '';
      steps[i].opts.forEach(function (o, k) { var b = document.createElement('button'); b.textContent = o; b.onclick = function () { path.push(k); i++; render(); }; box.appendChild(b); });
    }
    render();
  };

  W.review = function (el) {
    var topics = [['22.2', 'Wound wire', 'ch2'], ['22.3', 'Potential across an inductor', 'ch2'], ['22.4/22.5', 'Op-amp bandwidth + phase', 'ch3'], ['22.6', 'Design an arbitrary op-amp circuit', 'ch3'], ['22.12', 'More transfer functions', 'ch10'], ['22.21/22.22', 'Poles, zeros, response from poles', 'ch10'], ['22.26', 'Convolution', 'ch13'], ['22.24', 'Bridges and amplifiers', 'ch7'], ['22.28', 'Silent knights and knaves', 'ch19'], ['22.29', 'Block diagram', 'ch16'], ['22.30', 'Heart of the ECG', 'ch18'], ['22.31', 'Current through a cell', 'ch17']];
    var p = document.createElement('p'); p.textContent = 'Quiz navigator — jump to the chapter behind each review item:';
    el.appendChild(p);
    var box = document.createElement('div'); box.className = 'btnrow'; el.appendChild(box);
    topics.forEach(function (t) {
      var b = document.createElement('button'); b.textContent = t[0] + ' ' + t[1];
      b.onclick = function () { showChapter(t[2]); };
      box.appendChild(b);
    });
  };

  /* ---------------- render ---------------- */
  function markDone(id) { doneCh[id] = true; persist(); paintNav(); }
  function paintScore() { $('score').textContent = score.correct + ' / ' + score.answered; }
  function bumpScore(ok) { score.answered++; if (ok) score.correct++; paintScore(); persist(); }

  function renderWorksheet(ch) {
    var box = $('worksheet'); box.innerHTML = '';
    $('ws-count').textContent = ch.worksheet.length + ' problems';
    var st = chapState[ch.id] || (chapState[ch.id] = { answers: {} });
    ch.worksheet.forEach(function (w, qi) {
      var d = document.createElement('div'); d.className = 'ws-item';
      var p = document.createElement('p'); p.innerHTML = '<b>Q' + (qi + 1) + '.</b> ' + w.q; d.appendChild(p);
      var opts = document.createElement('div'); opts.className = 'opts'; d.appendChild(opts);
      w.choices.forEach(function (c, ci) {
        var b = document.createElement('button'); b.className = 'opt'; b.textContent = c;
        var a = st.answers[qi];
        if (a !== undefined && ci === w.answer) b.classList.add('right');
        if (a === ci && ci !== w.answer) b.classList.add('wrong');
        if (a !== undefined) b.disabled = true;
        b.onclick = function () {
          if (st.answers[qi] !== undefined) return;
          st.answers[qi] = ci; bumpScore(ci === w.answer);
          Array.prototype.forEach.call(opts.children, function (ob, oi) {
            if (oi === w.answer) ob.classList.add('right');
            else if (oi === ci) ob.classList.add('wrong');
            ob.disabled = true;
          });
          var e = document.createElement('p'); e.className = 'expl';
          e.textContent = (ci === w.answer ? '✓ ' : '✗ ') + w.explain;
          d.appendChild(e);
          if (Object.keys(st.answers).length === ch.worksheet.length) markDone(ch.id);
        };
        opts.appendChild(b);
      });
      var prev = st.answers[qi];
      if (prev !== undefined) { var e2 = document.createElement('p'); e2.className = 'expl'; e2.textContent = (prev === w.answer ? '✓ ' : '✗ ') + w.explain; d.appendChild(e2); }
      box.appendChild(d);
    });
    var idx = B.CHAPTERS.indexOf(ch);
    var nav2 = document.createElement('div'); nav2.className = 'btnrow';
    if (idx > 0) { var pb = document.createElement('button'); pb.textContent = '← ' + B.CHAPTERS[idx - 1].num + '. ' + B.CHAPTERS[idx - 1].title; pb.onclick = function () { showChapter(B.CHAPTERS[idx - 1].id); }; nav2.appendChild(pb); }
    if (idx < B.CHAPTERS.length - 1) { var nb = document.createElement('button'); nb.textContent = B.CHAPTERS[idx + 1].num + '. ' + B.CHAPTERS[idx + 1].title + ' →'; nb.onclick = function () { showChapter(B.CHAPTERS[idx + 1].id); }; nav2.appendChild(nb); }
    box.appendChild(nav2);
  }

  function showChapter(id) {
    stopAnim();
    var ch = B.CHAPTERS.find(function (c) { return c.id === id; });
    if (!ch) return;
    current = id;
    var part = B.PARTS.find(function (p) { return p.id === ch.part; });
    $('chap-part').textContent = part.title;
    $('chap-num').textContent = 'Chapter ' + ch.num + ' / 22';
    $('chap-ref').textContent = 'Belmont W19, ' + (REFS[ch.id] || '');
    $('chap-title').textContent = ch.title;
    $('chap-lede').textContent = ch.lede;
    $('concepts').innerHTML = ch.concepts.map(function (c) { return '<div class="concept">' + c + '</div>'; }).join('');
    widgetBox.innerHTML = '';
    (W[ch.widget] || function (e) { e.textContent = 'Widget coming soon.'; })(widgetBox);
    renderWorksheet(ch);
    paintNav();
    document.querySelector('.content').scrollTop = 0;
    try { if (global.scrollTo && document.querySelector('.app-shell').clientHeight > global.innerHeight) global.scrollTo(0, 0); } catch (e) { /* desktop: internal scroll only */ }
  }

  function paintNav() {
    var q = ($('search').value || '').toLowerCase();
    var nv = $('nav'); nv.innerHTML = '';
    B.PARTS.forEach(function (p) {
      var list = B.CHAPTERS.filter(function (c) {
        if (!q) return c.part === p.id;
        var hay = (c.title + ' ' + c.num + ' ' + c.lede + ' ' + c.concepts.join(' ')).replace(/<[^>]*>/g, ' ').toLowerCase();
        return c.part === p.id && hay.includes(q);
      });
      if (!list.length) return;
      var h = document.createElement('div'); h.className = 'part-title'; h.textContent = p.title; nv.appendChild(h);
      list.forEach(function (c) {
        var b = document.createElement('button'); b.className = 'nav-ch' + (c.id === current ? ' on' : '') + (doneCh[c.id] ? ' done' : '');
        b.innerHTML = '<b>' + c.num + '</b>' + c.title;
        b.onclick = function () { showChapter(c.id); };
        nv.appendChild(b);
      });
    });
  }

  global.B211App = { showChapter: showChapter };
  $('search').oninput = paintNav;
  $('btn-quiz').onclick = function () { document.getElementById('worksheet').scrollIntoView(); };
  $('btn-reset').onclick = function () {
    if (!global.confirm || global.confirm('Clear saved score, answers, and done markers?')) {
      score = { correct: 0, answered: 0 }; doneCh = {}; chapState = {}; persist(); paintScore();
      renderWorksheet(B.CHAPTERS.find(function (c) { return c.id === current; })); paintNav();
    }
  };
  $('follow-book').onchange = function (e) {
    if (!e.target.checked) {
      var order = B.CHAPTERS.slice().sort(function (a, b) { return a.title.localeCompare(b.title); });
      var nv = $('nav'); nv.innerHTML = '';
      var h = document.createElement('div'); h.className = 'part-title'; h.textContent = 'All chapters A–Z'; nv.appendChild(h);
      order.forEach(function (c) { var b = document.createElement('button'); b.className = 'nav-ch' + (c.id === current ? ' on' : '') + (doneCh[c.id] ? ' done' : ''); b.innerHTML = '<b>' + c.num + '</b>' + c.title; b.onclick = function () { showChapter(c.id); }; nv.appendChild(b); });
    } else paintNav();
  };
  paintNav();
  paintScore();
  showChapter('ch1');
})(window);
