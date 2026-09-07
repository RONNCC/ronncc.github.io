/* DOM-bound station narration and transport controls.
 *
 * User model (read this before editing):
 * - PIPELINE: the construct's journey, owned by Sim.state
 *   (phase idle|travel|dwell|read|complete, stage, currentStation).
 *   Advanced by ONE action: advance() -> Sim.nextStation().
 * - INSPECT: free camera-only exploration (pinned id). Never advances
 *   the sim; the pipeline keeps running underneath.
 * Render highlight follows the PIPELINE only; chips show both.
 */
(function (global) {
  'use strict';
  var Sim = global.Sim, F = global.Factory, Spec = global.Spec, Render = global.Render;
  var $ = function (id) { return document.getElementById(id); }, el = {}, active = null, pinned = null, flyTo = null, sheetOpen = false, lastPaint = 0;
  var ids = ['hud-serial','hud-phase','hud-station','hud-level','hud-cells','hud-note','stage-chip','stage-tag','stage-level','level-track','level-summary','module-intro','stage-name','stage-short','station-watch','station-takeaway','stage-body','read-progress','read-bar','btn-continue','sheet','gates','quiz','quiz-score','log','log-count','station-chips','inspector','sheet-handle','serial','btn-run','btn-play','play-glyph','btn-next','next-label','btn-reset','speed','speed-value','follow','labels','btn-panel','tooltip'];

  function init() {
    ids.forEach(function (id) { el[id] = $(id); });
    F.LEVELS.forEach(function(level) { var b=document.createElement('button');b.dataset.level=level.number;b.innerHTML='<b>'+level.number+'</b><span>'+level.title+'</span>';b.title='Module '+level.number+': '+level.title+' — '+level.objective+' (inspect, camera only)';b.onclick=function(){var station=byId(level.stations[0]);showStation(station,true);flyTo={x:station.x,y:station.y};};el['level-track'].appendChild(b); });
    F.STATIONS.forEach(function (s) { var b=document.createElement('button'); b.textContent=s.name; b.dataset.id=s.id; b.title='Inspect '+s.name+' (camera only — does not move the pipeline)'; b.onclick=function(){showStation(s,true);flyTo={x:s.x,y:s.y};}; el['station-chips'].appendChild(b); });
    el['btn-run'].onclick=run; el.serial.onkeydown=function(e){if(e.key==='Enter')run();};
    el['btn-play'].onclick=function(){Sim.togglePause();paint(true);};
    el['btn-next'].onclick=advance; el['btn-reset'].onclick=run;
    el['btn-continue'].onclick=advance;
    el.speed.oninput=function(){Sim.setSpeed(+el.speed.value);el['speed-value'].textContent=(+el.speed.value).toFixed(1)+'x';};
    el.labels.onchange=function(){Render.setLabels(el.labels.checked);Sim.setShowLabels(el.labels.checked);};
    el['btn-panel'].onclick=function(){var hidden=el.inspector.classList.toggle('hidden');document.querySelector('.app-shell').classList.toggle('inspector-hidden',hidden);el['btn-panel'].textContent=hidden?'Show panel':'Hide panel';el['btn-panel'].setAttribute('aria-expanded',String(!hidden));global.dispatchEvent(new Event('resize'));};
    el['sheet-handle'].onclick=function(){sheetOpen=!sheetOpen;el.inspector.classList.toggle('open',sheetOpen);el['sheet-handle'].setAttribute('aria-expanded',String(sheetOpen));};
    Sim.on('stationArrive',function(e){active=e.stationId;if(!pinned)showStation(byId(active),false);});
    Sim.on('reading',function(e){active=e.stationId;if(!pinned)showStation(byId(active),false);});
    Sim.on('complete',function(){pinned=null;paint(true);});
    Sim.on('reset',function(){active=null;pinned=null;flyTo=null;});
    Sim.on('quizAnswer',function(){paint(true);});
    el.quiz.onclick=function(e){var b=e.target&&e.target.closest?e.target.closest('button.opt'):null;if(!b||b.disabled)return;var chapter=F.LEVELS[quizModule()-1];Sim.answerQuiz(chapter.id,+b.getAttribute('data-q'),+b.getAttribute('data-c'));paint(true);};
  }
  function byId(id){return F.STATIONS.find(function(s){return s.id===id;});}
  function run(){var serial=el.serial.value.toUpperCase().replace(/[^A-Z0-9-]/g,'').slice(0,12);if(!serial)serial='SN-001';el.serial.value=serial;Sim.start(serial);active=null;pinned=null;paint(true);}
  // The single pipeline action. Both the dock "Next" button and the
  // inspector "Continue" button do exactly this; labels differ only.
  function advance(){Sim.nextStation();paint(true);}
  function showStation(s,pin){if(!s)return;pinned=pin?s.id:null;writeCard(s);if(pin&&global.matchMedia('(max-width: 900px)').matches){sheetOpen=true;el.inspector.classList.add('open');}updateChips();}
  // Pipeline station for the renderer: only glow a station while the
  // construct is actually there (dwell/read). During travel the carrier
  // moving along the belt IS the visual — no station glows.
  function pipelineStation(){var s=Sim.state;if(s.phase==='dwell'||s.phase==='read')return s.currentStation;return null;}
  function inspectingStation(){return pinned;}
  function phaseChipText(s){var st=Sim.state;if(pinned===s.id)return 'inspecting';if(st.phase==='travel'&&st.currentStation===s.id)return 'en route';if(st.phase==='dwell'&&st.currentStation===s.id)return 'working';if(st.phase==='read'&&st.currentStation===s.id)return 'review';if(st.finished||(st.stationProgress[s.id]>=1))return 'done';return (s.phase||'station');}
  function guide(id){return (F.GUIDE||{})[id]||{};}
  function writeCard(s){var state=Sim.state,inspecting=pinned===s.id,chip=phaseChipText(s);el['stage-chip'].textContent=chip;el['stage-chip'].style.color=s.color;el['stage-chip'].style.borderColor=s.color;el['stage-tag'].textContent=s.tag+(inspecting?' · inspecting — pipeline keeps running; tap empty floor to resume':'');el['stage-level'].textContent='Module '+s.level+' / 5 · '+s.levelTitle;el['stage-name'].textContent=(state.phase==='travel'&&state.currentStation===s.id&&!inspecting?'En route: ':'')+s.name;el['stage-short'].textContent=s.short;var g=guide(s.id);if(el['station-watch']){if(g.watch){el['station-watch'].hidden=false;el['station-watch'].textContent='Watch: '+g.watch;}else el['station-watch'].hidden=true;}if(el['station-takeaway']){if(g.takeaway){el['station-takeaway'].hidden=false;el['station-takeaway'].textContent='Takeaway: '+g.takeaway;}else el['station-takeaway'].hidden=true;}el['stage-body'].innerHTML=s.body.map(function(p){return '<p>'+p+'</p>';}).join('');var waiting=state.phase==='read'&&state.currentStation===s.id;el['btn-continue'].hidden=!waiting;el['read-progress'].hidden=!waiting;}
  function tooltip(x,y,s){if(!s){el.tooltip.hidden=true;return;}el.tooltip.hidden=false;el.tooltip.innerHTML='<b>'+s.name+'</b>'+s.short;el.tooltip.style.left=Math.min(x+14,global.innerWidth-270)+'px';el.tooltip.style.top=Math.min(y+14,global.innerHeight-80)+'px';}
  function rows(metrics){return [['Cells',Spec.group(metrics.cells)],['Viability',Spec.pct(metrics.viability)],['Scaffold remaining',Spec.pct(metrics.scaffoldFraction)],['GAG deposition',metrics.gag+' ug/mg'],['Effective modulus',metrics.effectiveModulus+' MPa'],['Maturity',Spec.pct(metrics.maturityIndex)]].map(function(r){return '<div class="row"><span>'+r[0]+'</span><b>'+r[1]+'</b></div>';}).join('');}
  // Quiz follows the pipeline's current module (never the inspect selection).
  function quizModule(){var st=byId(Sim.state.currentStation);return st&&st.level?st.level:1;}
  function renderGates(m){if(!el.gates)return;el.gates.innerHTML=(m.gates||[]).map(function(g){return '<div class="gate '+g.state+'"><span>'+g.label+'</span><b>'+(g.state==='pass'?'✓ PASS':'○ LOCKED')+'</b><i>'+g.detail+'</i></div>';}).join('');}
  function renderQuiz(){if(!el.quiz)return;var lvl=quizModule(),chapter=F.LEVELS[lvl-1],bank=((F.QUIZ||{})[chapter.id]||[]);var score=Sim.getQuizScore?Sim.getQuizScore(chapter.id):{correct:0,answered:0,total:bank.length};if(el['quiz-score'])el['quiz-score'].textContent=score.answered+' / '+score.total+' answered'+(score.answered?' · '+score.correct+' correct':'');var rec=(Sim.state.quiz||{})[chapter.id]||{answers:{}};var html='<p class="quiz-mod">Module '+lvl+': '+chapter.title+' — exit check</p>';bank.forEach(function(q,qi){var a=rec.answers[qi];html+='<div class="q"><p>'+q.q+'</p><div class="opts">';q.choices.forEach(function(c,ci){var cls='opt';if(a===ci)cls+=(ci===q.answer?' right':' wrong');html+='<button class="'+cls+'" data-q="'+qi+'" data-c="'+ci+'">'+c+'</button>';});html+='</div>';if(a!==undefined&&a!==null&&a!=='' )html+='<p class="expl">'+(a===q.answer?'✓ ':'✗ ')+q.explain+'</p>';html+='</div>';});el.quiz.innerHTML=html;}
  function updateChips(){var st=Sim.state,pipe=pipelineStation()||st.currentStation;Array.prototype.forEach.call(el['station-chips'].children,function(b){var id=b.dataset.id;b.classList.toggle('done',!!(st.stationProgress[id]>=1));b.classList.toggle('on',id===pipe&&!pinned);b.classList.toggle('inspecting',id===pinned);});}
  function updateLevels(level){Array.prototype.forEach.call(el['level-track'].children,function(b){var n=+b.dataset.level;b.classList.toggle('on',n===level);b.classList.toggle('done',n<level);});}
  // One advance action, phase-aware labels so Next always says what it will do.
  function nextAction(){var s=Sim.state;if(s.finished||s.phase==='complete')return {label:'Done ✓',hint:'Construct delivered — run complete.',enabled:false};if(s.phase==='read'){var cur=byId(s.currentStation);return {label:'Continue → '+(cur?nextName(s.currentStation):'next'),hint:'Paused for review at '+((cur&&cur.name)||'station')+' — press Continue to move on.',enabled:true};}if(s.phase==='dwell'){return {label:'Finish work ⏩',hint:'Working at '+((byId(s.currentStation)||{}).name||'station')+' — work fills automatically, or skip ahead.',enabled:true};}if(s.phase==='travel'){return {label:'Skip travel ⏩',hint:'Carrier en route to '+((byId(s.currentStation)||{}).name||'next station')+' — watch it arrive, or skip.',enabled:true};}return {label:'Start ⏩',hint:'Follow the construct or select any station.',enabled:true};}
  function nextName(id){var i=F.ORDER.indexOf(id);var n=F.ORDER[i+1];return n?(byId(n)||{}).name||'next':'finish';}
  function paint(force){var now=performance.now();if(!force&&now-lastPaint<100)return;lastPaint=now;var s=Sim.state,m=Spec.compute({simHours:s.simHours,stationProgress:s.stationProgress,activeStationId:s.currentStation}),station=byId(s.currentStation)||F.STATIONS[0],level=station.level||1,chapter=F.LEVELS[level-1],complete=chapter.stations.filter(function(id){return s.stationProgress[id]>=1;}).length;var act=nextAction();el['hud-serial'].textContent=s.serialNumber;el['hud-phase'].textContent=(Sim.getPhaseLabel?Sim.getPhaseLabel():s.phase)+(s.paused?' (paused)':'');el['hud-station'].textContent=position()+' / '+F.ORDER.length;el['hud-level'].textContent=level+' / '+F.LEVELS.length;el['level-summary'].textContent='Module '+level+' / 5 · '+chapter.title+': '+chapter.objective+' Progress: '+complete+' / '+chapter.stations.length+' stations.';if(el['module-intro']){var entering=chapter.stations[0]===s.currentStation&&(s.phase==='dwell'||s.phase==='read');el['module-intro'].hidden=false;el['module-intro'].innerHTML='<b>'+(entering?'New module — ':'Module ')+level+': '+chapter.title+'</b><span>'+chapter.intro+'</span><i>'+chapter.watch+'</i>';}el['hud-cells'].textContent=Spec.group(m.cells);el['hud-note'].textContent=s.paused?'Line paused — animation frozen.':act.hint;el['play-glyph'].textContent=s.paused?'▶':'II';if(el['next-label'])el['next-label'].innerHTML=act.label;el['btn-next'].disabled=!act.enabled;el['btn-continue'].textContent='Continue → '+nextName(s.currentStation);el.sheet.innerHTML=rows(m);renderGates(m);renderQuiz();el['log-count'].textContent=s.stage+' / '+F.ORDER.length+' done';el.log.innerHTML=F.ORDER.slice(0,s.stage).map(function(id){return '<span class="tok">'+byId(id).name+'</span>';}).join('')||'<span class="tok">No stations completed</span>';var wait=s.phase==='read';el['read-progress'].hidden=!wait;el['btn-continue'].hidden=!wait;if(wait)el['read-bar'].style.width='100%';if(!pinned&&s.currentStation)writeCard(station);updateChips();updateLevels(level);}
  // HUD position: 1-based index of where the construct is (not just done count).
  function position(){var s=Sim.state;if(s.finished)return F.ORDER.length;if(!s.running||!s.currentStation)return 0;return Math.min(F.ORDER.length,s.stage+1);}
  global.UI={init:init,run:run,paint:paint,showStation:showStation,unpin:function(){pinned=null;updateChips();},activeStation:pipelineStation,pipelineStation:pipelineStation,inspectingStation:inspectingStation,advance:advance,flyTarget:function(){return flyTo;},clearFlyTo:function(){flyTo=null;},tooltip:tooltip};
})(window);
