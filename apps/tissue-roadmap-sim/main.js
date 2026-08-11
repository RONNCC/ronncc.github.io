/* Canvas, measured camera layout, station picking, and direct manipulation. */
(function (global) {
  'use strict';
  var Iso = global.Iso, F = global.Factory, Sim = global.Sim, Render = global.Render, UI = global.UI;
  var canvas = document.getElementById('stage'), world = document.querySelector('.world'), cam = { x:0, y:0, scale:1, ox:0, oy:0, dpr:1 };
  var viewW = 0, viewH = 0, hover = null, follow = true, pointer = { down:false, x:0, y:0, moved:0 }, pinch = null;
  var layout = { top:0, dock:0, panel:0, sheet:0 }, dock = document.getElementById('dock'), panel = document.getElementById('inspector'), hud = document.getElementById('hud'), topbar = document.querySelector('.topbar');

  function setVar(name, value) { document.documentElement.style.setProperty(name, value); }
  function measureLayout() {
    var mobile = viewW <= 760;
    layout.top = 0; layout.dock = 0; layout.panel = 0; layout.sheet = 0;
    setVar('--mobile-sheet', mobile ? '1' : '0');
  }
  function availableRect() { return { x:0, y:0, w:Math.max(200, viewW), h:Math.max(160, viewH) }; }
  function focusPoint() { var r = availableRect(); return { x:r.x+r.w/2, y:r.y+r.h/2 }; }
  function resize() { var dpr = Math.min(2, global.devicePixelRatio || 1), rect = canvas.getBoundingClientRect(); viewW = rect.width; viewH = rect.height; canvas.width = Math.round(viewW*dpr); canvas.height = Math.round(viewH*dpr); cam.dpr = dpr; measureLayout(); syncOffsets(); }
  function syncOffsets() { var f = focusPoint(); cam.ox = f.x-cam.x*cam.scale; cam.oy = f.y-cam.y*cam.scale; }
  function screenToWorld(x,y) { return Iso.unproject((x-cam.ox)/cam.scale,(y-cam.oy)/cam.scale); }
  // Start close enough to read a working station. Fit is an explicit control.
  function defaultScale() { return viewW <= 900 ? 1.18 : 1.65; }
  function fitFactory() { var r = availableRect(), w = (F.GW+F.GH)*Iso.TW, h = (F.GW+F.GH)*Iso.TH; cam.scale = clamp(Math.min((r.w-36)/w,(r.h-36)/h),.16,1.25); var p = Iso.project(F.GW/2,F.GH/2,0); cam.x=p.x; cam.y=p.y; }
  function carrierTarget() { var c=Sim.state.carrier, p=c?F.MAIN.at(c.d):{x:12,y:28}; return Iso.project(p.x,p.y,0); }
  function clamp(v,a,b) { return Math.max(a,Math.min(b,v)); }
  function pick(x,y) { var w=screenToWorld(x,y), best=null, d=Infinity; F.STATIONS.forEach(function(s){var n=Math.hypot(w.x-s.x,w.y-s.y);if(n<s.r&&n<d){best=s;d=n;}}); return best; }
  function zoomAt(x,y,factor) { var px=(x-cam.ox)/cam.scale, py=(y-cam.oy)/cam.scale, f=focusPoint(); cam.scale=clamp(cam.scale*factor,.16,2.5); cam.x=px+(f.x-x)/cam.scale; cam.y=py+(f.y-y)/cam.scale; }
  function setFollow(v) { follow=!!v; document.getElementById('follow').checked=follow; Sim.setFollowCamera(follow); }
  function localPoint(e) { var rect = canvas.getBoundingClientRect(); return { x:e.clientX-rect.left, y:e.clientY-rect.top }; }
  function dragStart(e) { if (e.button && e.pointerType === 'mouse') return; var point=localPoint(e); UI.clearFlyTo(); canvas.setPointerCapture(e.pointerId); pointer={down:true,x:point.x,y:point.y,moved:0}; canvas.classList.add('dragging'); }
  function dragMove(e) { var point=localPoint(e); if (!pointer.down) { var s=pick(point.x,point.y); hover=s&&s.id; UI.tooltip(point.x,point.y,s); canvas.style.cursor=s?'pointer':'grab'; return; } var dx=point.x-pointer.x,dy=point.y-pointer.y; pointer.moved+=Math.abs(dx)+Math.abs(dy); cam.x-=dx/cam.scale;cam.y-=dy/cam.scale;pointer.x=point.x;pointer.y=point.y;if(pointer.moved>6)setFollow(false); }
  function dragEnd(e) { if(!pointer.down)return; var point=localPoint(e); pointer.down=false;canvas.classList.remove('dragging');if(pointer.moved<6){var s=pick(point.x,point.y);if(s)UI.showStation(s,true);else UI.unpin();} }
  canvas.addEventListener('pointerdown',dragStart); canvas.addEventListener('pointermove',dragMove); canvas.addEventListener('pointerup',dragEnd); canvas.addEventListener('pointercancel',function(){pointer.down=false;canvas.classList.remove('dragging');}); canvas.addEventListener('pointerleave',function(){UI.tooltip();hover=null;});
  canvas.addEventListener('wheel',function(e){var point=localPoint(e);e.preventDefault();UI.clearFlyTo();zoomAt(point.x,point.y,Math.exp(-e.deltaY*.0016));setFollow(false);},{passive:false});
  canvas.addEventListener('dblclick',function(){UI.clearFlyTo();fitFactory();setFollow(false);});
  canvas.addEventListener('touchstart',function(e){if(e.touches.length===2)pinch={d:distance(e.touches),x:(e.touches[0].clientX+e.touches[1].clientX)/2,y:(e.touches[0].clientY+e.touches[1].clientY)/2};},{passive:true});
  canvas.addEventListener('touchmove',function(e){if(pinch&&e.touches.length===2){var d=distance(e.touches);zoomAt(pinch.x,pinch.y,d/pinch.d);pinch.d=d;setFollow(false);}},{passive:true}); canvas.addEventListener('touchend',function(){pinch=null;},{passive:true});
  function distance(t){return Math.hypot(t[0].clientX-t[1].clientX,t[0].clientY-t[1].clientY);}
  document.getElementById('zoom-in').onclick=function(){zoomAt(focusPoint().x,focusPoint().y,1.35);setFollow(false);}; document.getElementById('zoom-out').onclick=function(){zoomAt(focusPoint().x,focusPoint().y,1/1.35);setFollow(false);}; document.getElementById('zoom-fit').onclick=function(){fitFactory();setFollow(false);};
  document.getElementById('follow').onchange=function(e){setFollow(e.target.checked);};
  global.addEventListener('resize',resize); if(global.ResizeObserver)new global.ResizeObserver(resize).observe(world);
  document.addEventListener('keydown',function(e){if(e.target.matches('input,button'))return;var k=e.key.toLowerCase();if(k===' '){e.preventDefault();Sim.togglePause();}if(k==='s')Sim.nextStation();if(k==='r')UI.run();if(k==='f')setFollow(!follow);if(k==='l'){var b=document.getElementById('labels');b.checked=!b.checked;Render.setLabels(b.checked);}});
  UI.init(); resize(); UI.run(); cam.scale=defaultScale(); var start=carrierTarget();cam.x=start.x;cam.y=start.y;syncOffsets();
  var last=performance.now(), clock=0;
  function frame(now){requestAnimationFrame(frame);var dt=Math.max(0,Math.min(.05,(now-last)/1000));last=now;clock+=dt;Sim.update(dt);var fly=UI.flyTarget(), target=fly?Iso.project(fly.x,fly.y,0):carrierTarget(), k=1-Math.pow(.05,dt);if(fly){cam.x+=(target.x-cam.x)*.18;cam.y+=(target.y-cam.y)*.18;cam.scale+=(1.15-cam.scale)*.18;if(Math.abs(target.x-cam.x)<.8&&Math.abs(target.y-cam.y)<.8)UI.clearFlyTo();}else if(follow){cam.x+=(target.x-cam.x)*k;cam.y+=(target.y-cam.y)*k;}syncOffsets();Render.draw(canvas,cam,clock,UI.activeStation(),hover);UI.paint(false);}
  requestAnimationFrame(frame);
  global.TERM={ Main:{ fitFactory:fitFactory, setFollow:setFollow } };
})(window);
