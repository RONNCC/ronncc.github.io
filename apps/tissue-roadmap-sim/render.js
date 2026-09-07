/* Canvas renderer for the tissue engineering line. The shell and camera live in main.js. */
(function (global) {
  'use strict';

  var Iso = global.Iso, F = global.Factory, Sim = global.Sim;
  var ctx, showLabels = true;

  function sky(w, h) {
    var g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#26332d');
    g.addColorStop(1, '#101613');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function ground() {
    var p = [Iso.project(-2, -2, 0), Iso.project(F.GW + 2, -2, 0), Iso.project(F.GW + 2, F.GH + 2, 0), Iso.project(-2, F.GH + 2, 0)];
    ctx.fillStyle = '#1d2823'; Iso.poly(ctx, p);
    ctx.fillStyle = '#38413c';
    Iso.poly(ctx, [Iso.project(0, 0, .02), Iso.project(F.GW, 0, .02), Iso.project(F.GW, F.GH, .02), Iso.project(0, F.GH, .02)]);
    ctx.strokeStyle = 'rgba(210,225,203,.12)'; ctx.lineWidth = 1;
    ctx.beginPath();
    for (var x = 0; x <= F.GW; x += 4) { var a = Iso.project(x, 0, .03), b = Iso.project(x, F.GH, .03); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); }
    for (var y = 0; y <= F.GH; y += 4) { var c = Iso.project(0, y, .03), d = Iso.project(F.GW, y, .03); ctx.moveTo(c.x, c.y); ctx.lineTo(d.x, d.y); }
    ctx.stroke();
    Iso.hazardBand(ctx, 0, -.45, F.GW, -.45, .8, .04, { light: '#d9b84a' });
    Iso.hazardBand(ctx, -.45, 0, -.45, F.GH, .8, .04, { light: '#d9b84a' });
    // Surgical gold zone (Module 5 delivery): the recessed operating theater.
    if (F.PAD) {
      var pad = F.PAD;
      ctx.fillStyle = 'rgba(212,136,6,.16)';
      Iso.poly(ctx, [Iso.project(pad.x, pad.y, .03), Iso.project(pad.x + pad.w, pad.y, .03), Iso.project(pad.x + pad.w, pad.y + pad.h, .03), Iso.project(pad.x, pad.y + pad.h, .03)]);
      ctx.strokeStyle = 'rgba(223,180,78,.8)'; ctx.lineWidth = 1.5;
      var q0 = Iso.project(pad.x, pad.y, .03), q1 = Iso.project(pad.x + pad.w, pad.y, .03), q2 = Iso.project(pad.x + pad.w, pad.y + pad.h, .03), q3 = Iso.project(pad.x, pad.y + pad.h, .03);
      ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.lineTo(q1.x, q1.y); ctx.lineTo(q2.x, q2.y); ctx.lineTo(q3.x, q3.y); ctx.closePath(); ctx.stroke();
    }
  }

  function belt(route, time) {
    for (var i = 0; i < route.segs.length; i++) {
      var s = route.segs[i];
      ctx.fillStyle = '#252b28'; Iso.ribbon(ctx, s.a.x, s.a.y, s.b.x, s.b.y, 1.25, .06);
      ctx.fillStyle = '#171c1a'; Iso.ribbon(ctx, s.a.x, s.a.y, s.b.x, s.b.y, .85, .07);
    }
    ctx.fillStyle = 'rgba(217,184,74,.72)';
    for (var d = (time * 2) % 3; d < route.total; d += 3) {
      var p = route.at(d);
      Iso.disc(ctx, p.x, p.y, .1, .09);
    }
  }

  function stationBase(s, active, hover, inspect, progress) {
    var color = active ? Iso.mix(s.color, '#ffffff', .25) : s.color;
    ctx.fillStyle = Iso.rgba(color, active ? .24 : .09);
    Iso.disc(ctx, s.x, s.y, .035, s.r);
    // Pipeline station: green glow ring. Inspected station: white outline.
    // Both can apply at once (inspecting the station being worked on).
    ctx.strokeStyle = active ? Iso.rgba(color, .95) : inspect ? 'rgba(255,255,255,.9)' : hover ? Iso.rgba(color, .95) : Iso.rgba(color, .42);
    ctx.lineWidth = active ? 2.3 : inspect ? 2.0 : 1.2;
    var p = Iso.project(s.x, s.y, .04);
    ctx.beginPath(); ctx.ellipse(p.x, p.y, s.r * Iso.TW * 1.414, s.r * Iso.TH * 1.414, 0, 0, Math.PI * 2); ctx.stroke();
    if (active && progress > 0 && progress < 1) {
      // Dwell progress arc: the "work fills" visual tied to Sim dwell timer.
      ctx.strokeStyle = '#8be38a'; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, s.r * Iso.TW * 1.414, s.r * Iso.TH * 1.414, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * progress); ctx.stroke();
    }
    Iso.box(ctx, { x: s.x - 1.15, y: s.y - .82, z: .04, w: 2.3, d: 1.64, h: .16, color: '#4a514b' });
    return color;
  }

  function machine(s, active, hover, inspect, progress) {
    var color = stationBase(s, active, hover, inspect, progress), x=s.x, y=s.y;
    function box(dx,dy,z,w,d,h,c) { Iso.box(ctx,{x:x+dx,y:y+dy,z:z,w:w,d:d,h:h,color:c||color}); }
    function tank(dx,dy,r,h,c) { Iso.cylinder(ctx,{x:x+dx,y:y+dy,z:.2,r:r,h:h,color:c||color,ring:.55}); }
    if (s.id === 'procurement') { box(-.95,-.6,.2,1.35,1.1,.55,'#527f9b'); box(-.55,-.34,.75,.55,.5,.08,'#dce8e4'); tank(.55,.18,.16,.7,'#dde8eb'); }
    else if (s.id === 'digestion') { tank(-.35,0,.38,.9,'#ca9251'); box(.25,-.45,.2,.65,.85,.52,'#705d91'); tank(.55,.15,.12,.55,'#c7b45f'); }
    else if (s.id === 'isolation') { box(-.9,-.5,.2,1.15,1,.65,'#4d83a1'); box(.05,-.35,.2,.85,.72,.42,'#76979f'); tank(.5,.2,.14,.8,'#e4edf0'); }
    else if (s.id === 'expansion') { [-.52,0,.52].forEach(function(dx,i){tank(dx,0,.2,1.1,i===1?'#78b89a':'#47786e');}); }
    else if (s.id === 'characterization') { box(-.9,-.58,.2,1.2,1.1,.68,'#6d5892'); tank(.48,.1,.24,.9,'#9179ba'); box(-.58,-.63,.63,.62,.06,.3,'#73d1e7'); }
    else if (s.id === 'scaffold') { box(-.98,-.58,.2,1.96,1.16,.44,'#ae7658'); box(-.62,-.34,.64,1.24,.68,.12,'#f1e3c5'); box(-.05,-.06,.76,.14,.14,.55,'#b9c6bd'); }
    else if (s.id === 'seeding') { box(-.92,-.54,.2,1.84,1.08,.48,'#c05d67'); tank(-.38,.05,.2,.5,'#e58b9a'); tank(.3,.05,.2,.5,'#e58b9a'); box(.05,-.34,.7,.08,.55,.14,'#dce8e4'); }
    else if (s.id === 'perfusion') { tank(-.42,0,.28,1.05,'#4a8f85'); tank(.32,0,.28,1.05,'#4a8f85'); box(-.85,-.52,.22,1.7,.15,.24,'#6ab2ad'); }
    else if (s.id === 'conditioning') { box(-1.0,-.55,.2,2,1.1,.35,'#756392'); box(-.55,-.18,.55,1.1,.36,.18,'#b8adcc'); box(-.68,-.12,.73,.12,.18,.6,'#d9b84a'); box(.56,-.12,.73,.12,.18,.6,'#d9b84a'); }
    else if (s.id === 'histology') { box(-.92,-.56,.2,1.84,1.12,.56,'#6f5b92'); box(-.52,-.4,.77,1.04,.1,.38,'#8ed8ed'); tank(.56,.15,.14,.65,'#d6b864'); }
    else if (s.id === 'mechanical_test') { box(-.88,-.48,.2,1.76,.96,.3,'#6d5c8c'); box(-.5,-.16,.5,1,.3,.13,'#d8d4de'); box(-.08,-.05,.63,.16,.16,.75,'#c4bdcf'); }
    else if (s.id === 'sterility') { box(-1,-.6,.2,2,1.2,.76,'#7d9cad'); box(-.68,-.64,.58,1.36,.06,.32,'#a6e5dc'); tank(.62,.2,.13,.66,'#e8cf78'); }
    else if (s.id === 'release') { box(-1,-.58,.2,2,1.16,.42,'#bd5e56'); box(-.66,-.36,.62,1.32,.72,.15,'#efe9d9'); [-.4,0,.4].forEach(function(dx){box(dx,-.05,.77,.14,.14,.3,'#e2c35a');}); }
    else if (s.id === 'preop') { box(-1.05,-.6,.2,2.1,1.2,.3,'#8b7657'); box(-.72,-.4,.52,1.44,.8,.16,'#e7e2d6'); [-.7,.55].forEach(function(dx){box(dx,-.08,.68,.12,.12,.55,'#9fb5a7');}); }
    else if (s.id === 'implantation') { box(-1.1,-.62,.2,2.2,1.24,.28,'#765c55'); box(-.65,-.3,.48,1.3,.6,.18,'#f5f1e8'); [-.86,.74].forEach(function(dx){box(dx,-.05,.65,.1,.1,.75,'#bfc9c2');}); tank(0,.1,.16,.45,'#dfb44e'); }
    var lamp = Iso.project(s.x+.84, s.y-.53, 1.08);
    ctx.fillStyle = active ? '#8be38a' : '#d9b84a'; ctx.beginPath(); ctx.arc(lamp.x, lamp.y, 3, 0, Math.PI * 2); ctx.fill();
  }

  function stations(activeId, hoverId, inspectId, dwellProgress) {
    var ss = F.STATIONS.slice().sort(function (a, b) { return a.x + a.y - b.x - b.y; });
    for (var i = 0; i < ss.length; i++) {
      var s = ss[i], active = s.id === activeId, inspect = s.id === inspectId;
      machine(s, active, s.id === hoverId, inspect, active ? dwellProgress : 0);
      if (showLabels && (active || inspect || s.id === hoverId || Sim.state.stationProgress[s.id] >= 1)) {
        var p = Iso.project(s.x, s.y, 1.55);
        ctx.font = '600 10px system-ui'; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = '#101613'; ctx.fillStyle = '#f0f3ed';
        ctx.strokeText(s.name, p.x, p.y); ctx.fillText(s.name, p.x, p.y);
      }
    }
  }

  // Construct staging tied to the 5 learning modules (not just a stack count):
  // M1 sourcing: pink cell pellet appears (scaled by isolation progress).
  // M2 culture: pellet grows (expansion progress). M3 fabrication: white
  // scaffold slab + pink seed layer, then green ECM bulk (perfusion/
  // conditioning). M4 quality: gold verification ring, construct held.
  // M5 delivery: gold implant glow on the surgical pad leg.
  function carrier() {
    var c = Sim.state.carrier; if (!c) return;
    var p = F.MAIN.at(c.d), sp = Sim.state.stationProgress || {};
    function prog(id){return Math.max(0, Math.min(1, sp[id] || 0));}
    Iso.orientedBox(ctx, { x:p.x, y:p.y, z:.12, len:1.28, wid:.82, h:.27, hx:Math.cos(p.angle), hy:Math.sin(p.angle), color:'#c99b58' });
    var iso = prog('isolation'), exp = prog('expansion');
    var cellR = 0.22 * Math.max(iso, exp > 0 ? 0.4 + 0.6 * exp : 0);
    if (cellR > 0.02) Iso.cylinder(ctx, { x:p.x, y:p.y, z:.39, r:cellR, h:.16, color:'#e8a8b8' });
    var scaf = prog('scaffold'), seed = prog('seeding');
    if (scaf > 0) Iso.orientedBox(ctx, { x:p.x, y:p.y, z:.39, len:1.0*scaf+0.15, wid:.66*scaf+0.12, h:.12, hx:Math.cos(p.angle), hy:Math.sin(p.angle), color:'#e8e8df' });
    if (seed > 0 && cellR > 0.02) Iso.cylinder(ctx, { x:p.x, y:p.y, z:.52, r:cellR*(0.5+0.5*seed), h:.1, color:'#d4708a' });
    var ecm = Math.max(prog('perfusion'), prog('conditioning') > 0 ? 0.5 + 0.5 * prog('conditioning') : 0);
    if (prog('perfusion') > 0 || prog('conditioning') > 0) Iso.cylinder(ctx, { x:p.x, y:p.y, z:.58, r:.2+0.12*ecm, h:.16+0.1*ecm, color:'#89b996' });
    var qa = Math.max(prog('histology'), prog('mechanical_test'), prog('sterility'), prog('release'));
    if (qa > 0) { ctx.save(); ctx.strokeStyle = 'rgba(232,199,90,' + (0.35 + 0.6 * qa).toFixed(2) + ')'; ctx.lineWidth = 2; var q = Iso.project(p.x, p.y, .45); ctx.beginPath(); ctx.ellipse(q.x, q.y, 26, 13, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    if (prog('implantation') > 0 || prog('preop') > 0) Iso.cylinder(ctx, { x:p.x, y:p.y, z:.78, r:.12, h:.14, color:'#dfb44e' });
  }

  // time = belt animation clock (frozen by caller when paused).
  // activeId = pipeline station (dwell/read only). inspectId = camera-only selection.
  function draw(canvas, cam, time, activeId, hoverId, inspectId, dwellProgress) {
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    var dpr = cam.dpr || 1, w = canvas.width / dpr, h = canvas.height / dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); sky(w, h);
    ctx.save(); ctx.translate(cam.ox, cam.oy); ctx.scale(cam.scale, cam.scale);
    ground(); belt(F.MAIN, time); stations(activeId, hoverId, inspectId, dwellProgress || 0); carrier();
    ctx.restore();
  }

  global.Render = { draw:draw, setLabels:function (v) { showLabels = !!v; } };
})(window);
