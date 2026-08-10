/* =============================================================================
 * TERM Lab Park — app.js
 * -----------------------------------------------------------------------------
 * Learning-app state machine + UI for the tissue-engineering roadmap game.
 * Owns: map / intro / sim / recap screens, quiz engine, localStorage progress,
 * info drawer, and every piece of on-page text. Drives the canvas renderer via
 * TERM.RENDER.
 *
 * Load order: render.js, levels-core.js, levels-eng.js, levels.js, app.js.
 * All dynamic text is inserted with textContent (never innerHTML) so nothing
 * user- or data-supplied is ever parsed as markup.
 * ========================================================================== */
(function () {
  'use strict';

  // ─── Guards & constants ───────────────────────────────────────────────────────
  const R = window.TERM?.RENDER || null;
  const LEVELS = window.TERM?.LEVELS || [];
  const STORAGE_KEY = 'term-lab-park-progress-v1';
  const QUIZ_TOTAL = 4;        // every level ships exactly 4 quiz questions
  const PASS_CORRECT = 3;      // >=3 correct = pass (spec calls this ~80%)
  const MOBILE_BP = 720;       // px below which the layout switches to mobile
  const MAX_TOASTS = 4;
  const LETTER_COLORS = ['#ff5d8f', '#ffd166', '#7ee081', '#4cc9f0', '#b967ff', '#ff9f43'];

  // ─── Tiny helpers ─────────────────────────────────────────────────────────────
  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }
  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }
  function debounce(fn, ms) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }
  function isMobile() {
    return window.innerWidth < MOBILE_BP;
  }
  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  // ─── Persistent progress ──────────────────────────────────────────────────────
  function loadProgressStore() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  let progressStore = loadProgressStore();
  function persistProgressStore() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progressStore)); }
    catch (e) { /* storage unavailable — keep everything in memory */ }
  }
  function levelPassed(i) {
    const lvl = LEVELS[i];
    return !!(lvl && progressStore[lvl.id] && progressStore[lvl.id].passed);
  }
  function levelUnlocked(i) {
    return i === 0 || levelPassed(i - 1);
  }

  // ─── App state ────────────────────────────────────────────────────────────────
  const state = {
    current: 'map',            // 'map' | 'intro' | 'sim' | 'recap'
    levelIndex: 0,
    sim: {
      mode: 'visit',
      speed: 1,
      paused: false,
      clock: 0,
      clockTimer: null,
      stage: 'learn',          // 'learn' | 'quiz' | 'done'
      seen: new Set(),         // teaching topics witnessed this run
      awaitingAdvance: false,
      advanceTimer: null,
    },
    quiz: {
      questions: [],
      index: 0,
      correct: 0,
      answered: [],
      started: false,
      finished: false,
    },
    drawerOpen: false,
  };

  const ui = {
    shell: null,
    screens: {},
    canvasWrap: null,
    canvas: null,
    simBody: null,
    simStage: null,
    simClock: null,
    simStatus: null,
    pauseBtn: null,
    toasts: null,
    speeds: [],
    drawer: null,
    drawerContent: null,
    backdrop: null,
  };

  // ─── Toasts ───────────────────────────────────────────────────────────────────
  function showToast(msg, kind) {
    const wrap = ui.toasts;
    if (!wrap) return;
    const t = el('div', 'toast toast-' + (kind || 'info'));
    t.textContent = msg;
    wrap.appendChild(t);
    while (wrap.children.length > MAX_TOASTS) wrap.removeChild(wrap.firstChild);
    setTimeout(() => {
      t.classList.add('toast-out');
      setTimeout(() => t.remove(), 350);
    }, 3500);
  }

  // ─── RENDER event bridge ──────────────────────────────────────────────────────
  // Teaching moments the renderer reports become toasts and “award” matching
  // quiz questions when they reach the quiz stage.
  const EVENT_TOPIC = {
    confluent: 'confluence',
    contam_spotted: 'contamination',
    ph_crash: 'ph',
    oxygen_limit: 'oxygen',
    grown: 'growth',
  };
  const EVENT_MSG = {
    confluent: 'The monolayer is complete — cells are touching everywhere (confluent!).',
    contam_spotted: 'Something is spreading in the corner — that is contamination, not cells!',
    ph_crash: 'The media is turning yellow — pH has crashed below ~6.8.',
    oxygen_limit: 'Cells past ~200 µm are starting to starve — oxygen runs out fast.',
    grown: 'Look at that log-phase growth — the culture is thriving!',
  };
  function onRenderEvent(ev) {
    if (!ev || !ev.type) return;
    if (ev.type === 'level_done') {
      // Renderer announced completion: auto-advance when we are awaiting it.
      if (state.current === 'sim' && state.sim.awaitingAdvance) advanceToRecap();
      // Idle/visit levels never fire a teaching event — seed the seen set
      // with this level's quiz topics (neutral 'visit' as fallback) so the
      // “Awarded in the lab” badge can still appear for those levels.
      if (state.sim.seen.size === 0) {
        const lvl = LEVELS[state.levelIndex];
        let seeded = false;
        if (lvl && Array.isArray(lvl.quiz)) {
          lvl.quiz.slice(0, QUIZ_TOTAL).forEach(q => {
            const t = matchTopic(q.q);
            if (t) { state.sim.seen.add(t); seeded = true; }
          });
        }
        if (!seeded) state.sim.seen.add('visit');
      }
      return;
    }
    const topic = EVENT_TOPIC[ev.type];
    if (topic) {
      state.sim.seen.add(topic);
      showToast(EVENT_MSG[ev.type] || 'The lab just changed — keep watching!', 'teach');
    }
  }

  // Match a quiz question to a witnessed teaching topic via keyword scan.
  const TOPIC_GROUPS = [
    { topic: 'confluence', words: ['confluen', 'contact inhibit', 'passag', 'split', 'doubling', 'growth curve'] },
    { topic: 'contamination', words: ['contamin', 'mycoplasma', 'fung', 'bacteria', 'steril', 'hood'] },
    { topic: 'ph', words: ['ph ', 'ph.', 'phenol', 'bicarbonate', 'buffer', 'yellow', 'acid'] },
    { topic: 'oxygen', words: ['oxygen', 'diffusion', 'vascular', 'bioreactor', 'perfus', 'shear'] },
    { topic: 'media', words: ['media', 'glucose', 'glutamine', 'osmolar', 'dmem', 'riboflavin'] },
    { topic: 'stem', words: ['stem', 'ips', 'pluripot', 'yamanaka', 'msc', 'mesenchym', 'differentiat', 'cd105'] },
    { topic: 'scaffold', words: ['scaffold', 'hydrogel', 'polymer', 'collagen', 'modulus', 'bioprint', 'alginate'] },
    { topic: 'vector', words: ['vector', 'aav', 'lentivir', 'retrovir', 'crispr', 'transduc', 'moi', 'grna'] },
  ];
  function matchTopic(text) {
    const t = String(text || '').toLowerCase();
    for (const g of TOPIC_GROUPS) {
      if (g.words.some(w => t.includes(w))) return g.topic;
    }
    return null;
  }

  // ─── Map screen ───────────────────────────────────────────────────────────────
  function buildMapScreen() {
    const s = el('section', 'screen screen-map');

    const splash = el('header', 'map-splash');
    const titleRow = el('div', 'map-title-row');
    'TERM LAB PARK'.split('').forEach((ch, i) => {
      const b = el('span', 'map-title-letter' + (ch === ' ' ? ' map-title-space' : ''));
      b.textContent = ch === ' ' ? '\u00A0' : ch;
      b.style.color = LETTER_COLORS[i % LETTER_COLORS.length];
      titleRow.appendChild(b);
    });
    splash.appendChild(titleRow);
    splash.appendChild(el('p', 'map-subtitle', 'Build your tissue-engineering roadmap, one lab bench at a time.'));
    splash.appendChild(el('p', 'map-tagline', '8 park areas · live sims · quizzes · deep-dive recaps'));
    s.appendChild(splash);

    const levelsWrap = el('div', 'map-levels');
    s.appendChild(levelsWrap);
    s.appendChild(el('p', 'map-foot', 'Pass a quiz with 3+ correct to unlock the next area. Tap a finished area to revisit its recap.'));
    return s;
  }

  function renderMap() {
    const wrap = ui.screens.map.querySelector('.map-levels');
    clear(wrap);
    if (!LEVELS.length) {
      wrap.appendChild(el('p', 'map-empty', 'Level data not loaded yet.'));
      return;
    }
    LEVELS.forEach((lvl, i) => {
      const row = el('div', 'map-node-row ' + (i % 2 ? 'col-right' : 'col-left'));
      const unlocked = levelUnlocked(i);
      const passed = levelPassed(i);
      const node = el('button', 'map-node' + (unlocked ? '' : ' locked') + (passed ? ' passed' : ''));
      node.type = 'button';
      node.setAttribute('aria-label', (lvl.title || 'Area') + ' — area ' + (i + 1));
      node.appendChild(el('span', 'map-node-badge', String(i + 1)));
      if (!unlocked) node.appendChild(el('span', 'map-lock'));
      const stars = el('span', 'map-node-stars');
      const earned = progressStore[lvl.id] ? (progressStore[lvl.id].stars || 0) : 0;
      for (let k = 1; k <= 3; k++) {
        stars.appendChild(el('span', 'star' + (k <= earned ? ' on' : ''), '★'));
      }
      if (unlocked) node.appendChild(stars);
      row.appendChild(node);
      row.appendChild(el('div', 'map-node-label', (i + 1) + '. ' + (lvl.title || 'Untitled area')));
      wrap.appendChild(row);
      if (i < LEVELS.length - 1) wrap.appendChild(el('div', 'map-connector'));
      node.addEventListener('click', () => {
        if (!unlocked) {
          showToast('Finish the previous area first!', 'warn');
          node.classList.add('shake');
          setTimeout(() => node.classList.remove('shake'), 450);
          return;
        }
        enterLevel(i);
        if (passed) openRecap('revisit');
      });
    });
  }

  // ─── Level intro screen ───────────────────────────────────────────────────────
  function buildIntroScreen() {
    const s = el('section', 'screen screen-intro');
    const card = el('div', 'intro-card');
    card.appendChild(el('div', 'intro-badge badge'));
    card.appendChild(el('h2', 'intro-title'));
    const body = el('div', 'intro-body');
    card.appendChild(body);
    const prompt = el('div', 'intro-prompt');
    card.appendChild(prompt);
    const learn = el('div', 'intro-learn');
    card.appendChild(learn);
    const actions = el('div', 'intro-actions');
    const back = el('button', 'btn btn-ghost', '‹ Back to map');
    const start = el('button', 'btn btn-primary', 'Enter the lab ▸');
    back.type = 'button'; start.type = 'button';
    actions.append(back, start);
    card.appendChild(actions);
    s.appendChild(card);
    back.addEventListener('click', () => showScreen('map'));
    start.addEventListener('click', startSim);
    return s;
  }

  function fillIntro(lvl) {
    const s = ui.screens.intro;
    s.querySelector('.intro-badge').textContent = lvl.phase || 'Lab area';
    s.querySelector('.intro-title').textContent = lvl.title || '';
    const body = s.querySelector('.intro-body');
    clear(body);
    (lvl.intro?.body || []).forEach(p => body.appendChild(el('p', 'intro-para', p)));
    const prompt = s.querySelector('.intro-prompt');
    clear(prompt);
    if (lvl.intro?.prompt) {
      prompt.appendChild(el('span', 'intro-prompt-label', 'Your mission:'));
      prompt.appendChild(el('p', 'intro-prompt-text', lvl.intro.prompt));
    }
    const learn = s.querySelector('.intro-learn');
    clear(learn);
    if (lvl.recap && lvl.recap.length) {
      learn.appendChild(el('h3', 'intro-learn-title', 'You’ll be able to:'));
      const list = el('ul', 'intro-learn-list');
      lvl.recap.forEach(r => list.appendChild(el('li', 'intro-learn-item', r.objective)));
      learn.appendChild(list);
    }
  }

  function enterLevel(i) {
    const lvl = LEVELS[i];
    if (!lvl) return;
    state.levelIndex = i;
    fillIntro(lvl);
    showScreen('intro');
  }

  // ─── Sim screen ───────────────────────────────────────────────────────────────
  function buildSimScreen() {
    const s = el('section', 'screen screen-sim');
    s.style.position = 'relative';

    const top = el('div', 'sim-topbar');
    const backBtn = el('button', 'btn btn-ghost btn-small', '‹ Map');
    backBtn.type = 'button';
    top.appendChild(backBtn);
    const title = el('div', 'sim-title');
    top.appendChild(title);
    const hud = el('div', 'sim-hud');
    top.appendChild(hud);
    s.appendChild(top);

    const layout = el('div', 'sim-layout');

    // Canvas side (renderer-owned) + overlay controls (app-owned).
    const canvasWrap = el('div', 'sim-canvas-wrap');
    canvasWrap.style.position = 'relative';
    const canvas = document.createElement('canvas');
    canvas.className = 'sim-canvas';
    canvasWrap.appendChild(canvas);

    const controls = el('div', 'sim-controls');
    controls.style.position = 'absolute';
    controls.style.left = '10px';
    controls.style.bottom = '10px';
    controls.style.zIndex = '5';
    const pauseBtn = el('button', 'btn btn-control sim-pause', 'Pause');
    pauseBtn.type = 'button';
    pauseBtn.setAttribute('aria-label', 'Pause or resume the simulation');
    const speeds = el('div', 'sim-speeds');
    [1, 2, 3].forEach(v => {
      const b = el('button', 'btn speed-pill' + (v === 1 ? ' active' : ''), v + '×');
      b.type = 'button';
      b.dataset.speed = String(v);
      b.setAttribute('aria-label', 'Simulation speed ' + v + '×');
      speeds.appendChild(b);
    });
    const status = el('span', 'sim-status', '● Running');
    const clock = el('span', 'sim-clock', 'T+ 00:00');
    controls.append(pauseBtn, speeds, status, clock);
    canvasWrap.appendChild(controls);

    const stations = el('div', 'sim-stations');
    stations.style.position = 'absolute';
    stations.style.top = '10px';
    stations.style.left = '10px';
    stations.style.zIndex = '4';
    canvasWrap.appendChild(stations);

    layout.appendChild(canvasWrap);

    // Right/below panel: learn → quiz → done.
    const panel = el('div', 'sim-panel');
    panel.appendChild(el('div', 'sim-stage', 'Learn'));
    const body = el('div', 'sim-body');
    panel.appendChild(body);
    layout.appendChild(panel);
    s.appendChild(layout);

    const toasts = el('div', 'sim-toasts');
    toasts.style.position = 'absolute';
    toasts.style.top = '12px';
    toasts.style.right = '12px';
    toasts.style.zIndex = '6';
    s.appendChild(toasts);

    // Wiring
    backBtn.addEventListener('click', () => {
      stopClock();
      if (R?.setMode) R.setMode('idle');
      showScreen('map');
    });
    pauseBtn.addEventListener('click', () => {
      if (state.sim.paused) resumeSim(); else pauseSim();
    });
    return s;
  }

  function setupCanvas() {
    const w = Math.max(320, ui.canvasWrap.clientWidth || 640);
    const h = Math.max(240, ui.canvasWrap.clientHeight || 420);
    ui.canvas.width = w;
    ui.canvas.height = h;
    // Canvas is a simulation display: expose it as an accessible image.
    ui.canvas.setAttribute('role', 'img');
    const lvl = LEVELS[state.levelIndex];
    ui.canvas.setAttribute('aria-label',
      'Live lab simulation: ' + ((lvl && lvl.title) || 'tissue culture bench'));
    if (R?.init) {
      R.init(ui.canvas, { width: w, height: h, accent: (lvl && lvl.accent) || '#ff5d8f' });
    }
  }

  // Station labels — prefer the level’s own station list, else derive from mode.
  const STATION_MAP = {
    feed: [
      { label: 'Culture flask', kind: 'flask', active: true },
      { label: 'Media bottle', kind: 'vial', active: false },
    ],
    passage: [
      { label: 'Culture flask', kind: 'flask', active: true },
      { label: 'Incubator', kind: 'incubator', active: false },
    ],
    contamination: [
      { label: 'Culture flask', kind: 'flask', active: true },
      { label: 'Microscope', kind: 'microscope', active: false },
    ],
    oxygen: [
      { label: 'Incubator', kind: 'incubator', active: true },
      { label: 'Culture flask', kind: 'flask', active: false },
    ],
    hood: [
      { label: 'BSC hood', kind: 'hood', active: true },
      { label: 'Culture flask', kind: 'flask', active: false },
    ],
    visit: [
      { label: 'Culture flask', kind: 'flask', active: true },
      { label: 'Incubator', kind: 'incubator', active: false },
      { label: 'Microscope', kind: 'microscope', active: false },
    ],
  };
  function defaultStations(mode) {
    return STATION_MAP[mode] || STATION_MAP.visit;
  }
  function setStations(lvl) {
    const list = (Array.isArray(lvl.stations) && lvl.stations.length)
      ? lvl.stations
      : defaultStations(lvl.simMode);
    const chips = el('div', 'sim-stations');
    chips.style.position = 'absolute';
    chips.style.top = '10px';
    chips.style.left = '10px';
    chips.style.zIndex = '4';
    list.forEach(st => {
      const tag = el('span', 'sim-station' + (st.active ? ' active' : ''), st.label || '');
      chips.appendChild(tag);
    });
    const old = ui.canvasWrap.querySelector(':scope > .sim-stations');
    if (old) old.remove();
    ui.canvasWrap.appendChild(chips);
    if (R?.setStation) {
      list.forEach((st, i) => {
        setTimeout(() => R.setStation({ label: st.label || '', active: !!st.active, kind: st.kind || 'flask' }), 350 * i);
      });
    }
  }

  function resetRunState(lvl) {
    state.sim.mode = lvl.simMode || 'visit';
    state.sim.speed = 1;
    state.sim.paused = false;
    state.sim.clock = 0;
    state.sim.stage = 'learn';
    state.sim.seen = new Set();
    state.sim.awaitingAdvance = false;
    if (state.sim.advanceTimer) { clearTimeout(state.sim.advanceTimer); state.sim.advanceTimer = null; }
    stopClock();
    state.quiz.questions = [];
    state.quiz.index = 0;
    state.quiz.correct = 0;
    state.quiz.answered = [];
    state.quiz.started = false;
    state.quiz.finished = false;
    ui.pauseBtn.textContent = 'Pause';
    ui.simStatus.textContent = '● Running';
    ui.simStatus.classList.remove('paused');
    ui.speeds.forEach(p => p.classList.toggle('active', p.dataset.speed === '1'));
    ui.simClock.textContent = 'T+ 00:00';
  }

  function startSim() {
    const lvl = LEVELS[state.levelIndex];
    if (!lvl) return;
    resetRunState(lvl);
    ui.screens.sim.querySelector('.sim-title').textContent =
      'Area ' + (state.levelIndex + 1) + ' · ' + (lvl.title || '');
    // Screen must be visible before we can measure the canvas region.
    showScreen('sim');
    setupCanvas();
    if (R) {
      if (R.onEvent) R.onEvent(onRenderEvent);
      if (R.onSpeed) R.onSpeed(onSpeedChange);
      if (R.setMode) R.setMode(state.sim.mode);
      if (R.setSpeed) R.setSpeed(1);
    }
    setStations(lvl);
    startClock();
    renderLearnStage();
  }

  // ─── Sim clock ────────────────────────────────────────────────────────────────
  function startClock() {
    stopClock();
    state.sim.clockTimer = setInterval(() => {
      if (state.sim.paused) return;   // paused: the sim clock stands still
      state.sim.clock++;
      ui.simClock.textContent = 'T+ ' + pad2(Math.floor(state.sim.clock / 60)) + ':' + pad2(state.sim.clock % 60);
    }, 1000);
  }
  function stopClock() {
    if (state.sim.clockTimer) { clearInterval(state.sim.clockTimer); state.sim.clockTimer = null; }
  }

  // ─── Pause / speed ────────────────────────────────────────────────────────────
  function pauseSim() {
    state.sim.paused = true;
    ui.pauseBtn.textContent = 'Resume';
    ui.simStatus.textContent = 'Paused';
    ui.simStatus.classList.add('paused');
    if (R?.setSpeed) R.setSpeed(0);   // fully freezes the render loop
  }
  function resumeSim() {
    state.sim.paused = false;
    ui.pauseBtn.textContent = 'Pause';
    ui.simStatus.textContent = '● Running';
    ui.simStatus.classList.remove('paused');
    if (R?.setSpeed) R.setSpeed(state.sim.speed);
  }
  // Syncs app state + DOM controls with renderer speed changes. This is the
  // R.onSpeed hook: registered once per sim start, fired at setSpeed() end and
  // once with the current speed at registration. It is the single authority
  // for state.sim.speed / state.sim.paused and the .active pill / pause label,
  // so in-canvas renderer pills and the app’s DOM pills stay consistent.
  function onSpeedChange(s) {
    const pausedNow = s === 0;
    if (!pausedNow) state.sim.speed = s;
    state.sim.paused = pausedNow;
    if (pausedNow) {
      ui.pauseBtn.textContent = 'Resume';
      ui.simStatus.textContent = 'Paused';
      ui.simStatus.classList.add('paused');
    } else {
      ui.pauseBtn.textContent = 'Pause';
      ui.simStatus.textContent = '● Running';
      ui.simStatus.classList.remove('paused');
    }
    ui.speeds.forEach(p => p.classList.toggle('active', !pausedNow && Number(p.dataset.speed) === state.sim.speed));
  }

  function wireSpeedPills() {
    // Route DOM pills through the same R.setSpeed path as the in-canvas pills;
    // onSpeedChange (via R.onSpeed) then syncs state, pills, and pause label.
    ui.speeds.forEach(b => b.addEventListener('click', () => {
      if (R?.setSpeed) R.setSpeed(Number(b.dataset.speed) || 1);
    }));
  }

  // ─── Learn stage ──────────────────────────────────────────────────────────────
  function renderLearnStage() {
    state.sim.stage = 'learn';
    ui.simStage.textContent = 'Learn';
    const lvl = LEVELS[state.levelIndex];
    const cards = (lvl && lvl.learn) || [];
    const body = ui.simBody;
    clear(body);
    if (!cards.length) {
      showQuizGate();
      return;
    }
    let cardIdx = 0;
    function renderCard(i) {
      cardIdx = i;
      clear(body);
      const dots = el('div', 'learn-dots');
      cards.forEach((_, k) => dots.appendChild(el('span', 'learn-dot' + (k === i ? ' on' : ''))));
      body.appendChild(dots);
      const card = el('article', 'learn-card');
      card.appendChild(el('h3', 'learn-card-title', (i + 1) + '. ' + cards[i].title));
      card.appendChild(el('p', 'learn-card-body', cards[i].body));
      body.appendChild(card);
      const nav = el('div', 'learn-nav');
      const prev = el('button', 'btn btn-ghost btn-small', '‹ Back');
      prev.type = 'button';
      prev.disabled = i === 0;
      const next = el('button', 'btn btn-primary btn-small', i < cards.length - 1 ? 'Next card ›' : 'On to the quiz ›');
      next.type = 'button';
      prev.addEventListener('click', () => renderCard(i - 1));
      next.addEventListener('click', () => (i < cards.length - 1 ? renderCard(i + 1) : showQuizGate()));
      nav.append(prev, next);
      body.appendChild(nav);
    }
    renderCard(0);
  }

  function showQuizGate() {
    state.sim.stage = 'quiz';
    ui.simStage.textContent = 'Quiz';
    const body = ui.simBody;
    clear(body);
    const gate = el('div', 'quiz-gate');
    gate.appendChild(el('h3', 'quiz-gate-title', 'Lab quiz time!'));
    gate.appendChild(el('p', 'quiz-gate-sub', '4 questions · 3+ correct unlocks the next area.'));
    const b = el('button', 'btn btn-primary', 'Start quiz ▸');
    b.type = 'button';
    b.addEventListener('click', startQuiz);
    gate.appendChild(b);
    body.appendChild(gate);
  }

  // ─── Quiz engine ──────────────────────────────────────────────────────────────
  function startQuiz() {
    const lvl = LEVELS[state.levelIndex];
    const raws = ((lvl && lvl.quiz) || []).slice(0, QUIZ_TOTAL);
    if (!raws.length) { showToast('No quiz data for this level yet.', 'warn'); return; }
    state.quiz.questions = raws.map(q => ({
      q: q.q,
      options: q.options || [],
      answer: typeof q.answer === 'number' ? q.answer : 0,
      explain: q.explain || '',
      topic: matchTopic(q.q),
    }));
    state.quiz.index = 0;
    state.quiz.correct = 0;
    state.quiz.answered = [];
    state.quiz.started = true;
    state.quiz.finished = false;
    state.sim.stage = 'quiz';
    ui.simStage.textContent = 'Quiz';
    renderQuizQuestion();
  }

  function quizTotal() {
    return Math.max(1, state.quiz.questions.length);
  }
  function quizThreshold() {
    const n = quizTotal();
    return n <= 4 ? Math.max(1, n - 1) : Math.ceil(n * 0.8);
  }

  function renderQuizQuestion() {
    const q = state.quiz.questions[state.quiz.index];
    const total = quizTotal();
    const body = ui.simBody;
    clear(body);

    const bar = el('div', 'quiz-progress');
    const fill = el('div', 'quiz-progress-fill');
    fill.style.width = ((state.quiz.index / total) * 100) + '%';
    bar.appendChild(fill);
    body.appendChild(bar);

    body.appendChild(el('div', 'quiz-counter', 'Question ' + (state.quiz.index + 1) + ' of ' + total));
    if (q.topic && state.sim.seen.has(q.topic)) {
      body.appendChild(el('div', 'quiz-awarded', '✓ Awarded in the lab — you watched this happen!'));
    }
    body.appendChild(el('h3', 'quiz-question', q.q));

    const opts = el('div', 'quiz-options');
    q.options.forEach((opt, i) => {
      const b = el('button', 'quiz-option', opt);
      b.type = 'button';
      b.addEventListener('click', () => answerQuestion(i));
      opts.appendChild(b);
    });
    body.appendChild(opts);
    body.appendChild(el('div', 'quiz-feedback'));
  }

  function answerQuestion(chosen) {
    const q = state.quiz.questions[state.quiz.index];
    const isCorrect = chosen === q.answer;
    if (isCorrect) state.quiz.correct++;
    state.quiz.answered.push({ q, chosen, correct: isCorrect });

    const opts = ui.simBody.querySelectorAll('.quiz-option');
    opts.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      else if (i === chosen) b.classList.add('wrong');
    });

    const fb = ui.simBody.querySelector('.quiz-feedback');
    clear(fb);
    fb.appendChild(el('div', 'quiz-verdict ' + (isCorrect ? 'ok' : 'bad'),
      isCorrect ? 'Correct!' : 'Not quite — the answer is: ' + q.options[q.answer]));
    if (q.explain) fb.appendChild(el('p', 'quiz-explain', q.explain));
    const nav = el('div', 'quiz-nav');
    const next = el('button', 'btn btn-primary', state.quiz.index < quizTotal() - 1 ? 'Next question ›' : 'Finish quiz ▸');
    next.type = 'button';
    next.addEventListener('click', () => {
      if (state.quiz.index < quizTotal() - 1) {
        state.quiz.index++;
        renderQuizQuestion();
      } else {
        finishQuiz();
      }
    });
    nav.appendChild(next);
    fb.appendChild(nav);
  }

  function finishQuiz() {
    state.quiz.finished = true;
    state.quiz.started = false;
    const total = quizTotal();
    const correct = state.quiz.correct;
    const threshold = quizThreshold();
    const passed = correct >= threshold;
    // Stars: all correct → 3, threshold+ → 2, otherwise 1.
    const stars = correct >= total ? 3 : correct >= threshold ? 2 : 1;
    const lvl = LEVELS[state.levelIndex];
    const prev = (lvl && progressStore[lvl.id]) || {};
    if (lvl) {
      progressStore[lvl.id] = {
        passed,
        stars,
        best: Math.max(prev.best || 0, stars),
        attempts: (prev.attempts || 0) + 1,
        lastRun: Date.now(),
      };
      persistProgressStore();
    }
    renderDone(passed, correct, stars, total);
    if (passed) {
      if (R?.setMode) R.setMode('idle');
      // Auto-advance to the recap sheet (also triggered by a renderer
      // level_done event; the timer is the guaranteed path).
      state.sim.awaitingAdvance = true;
      state.sim.advanceTimer = setTimeout(advanceToRecap, 2600);
    }
  }

  function renderDone(passed, correct, stars, total) {
    state.sim.stage = 'done';
    ui.simStage.textContent = 'Done';
    const body = ui.simBody;
    clear(body);
    const done = el('div', 'done-panel');
    done.appendChild(el('h3', 'done-title' + (passed ? '' : ' fail'), passed ? 'Area complete!' : 'So close!'));
    const starsRow = el('div', 'done-stars');
    for (let i = 1; i <= 3; i++) {
      starsRow.appendChild(el('span', 'star big' + (i <= stars ? ' on' : ''), '★'));
    }
    done.appendChild(starsRow);
    done.appendChild(el('p', 'done-score',
      correct + ' of ' + total + ' correct' +
      (passed ? ' — the next area is unlocked!' : ' — you need ' + Math.max(1, quizThreshold()) + '+ to unlock the next area.')));
    const actions = el('div', 'done-actions');
    if (passed) {
      done.appendChild(el('p', 'done-hint', 'Your recap sheet with deep-dive recaps is ready…'));
      const recap = el('button', 'btn btn-primary', 'See the recap ▸');
      recap.type = 'button';
      recap.addEventListener('click', advanceToRecap);
      actions.appendChild(recap);
    } else {
      const retry = el('button', 'btn btn-primary', 'Try again');
      retry.type = 'button';
      retry.addEventListener('click', startSim);
      const back = el('button', 'btn btn-ghost', '‹ Back to map');
      back.type = 'button';
      back.addEventListener('click', () => showScreen('map'));
      actions.append(retry, back);
    }
    done.appendChild(actions);
    body.appendChild(done);
  }

  function advanceToRecap() {
    if (state.sim.advanceTimer) { clearTimeout(state.sim.advanceTimer); state.sim.advanceTimer = null; }
    if (!state.sim.awaitingAdvance) return;
    state.sim.awaitingAdvance = false;
    openRecap('after-level');
  }

  function openRecap(mode) {
    stopClock();
    if (R?.setMode) R.setMode('idle');
    fillRecap();
    showScreen('recap');
  }

  // ─── Accordion component ──────────────────────────────────────────────────────
  function makeAccordionItem(head, bodyText) {
    const item = el('div', 'acc-item');
    const btn = el('button', 'acc-head');
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.appendChild(el('span', 'acc-title', head));
    btn.appendChild(el('span', 'acc-chev', '›'));
    const body = el('div', 'acc-body');
    body.style.display = 'none';
    body.appendChild(el('p', 'acc-detail', bodyText));
    item.append(btn, body);
    btn.addEventListener('click', () => {
      const open = body.style.display !== 'none';
      body.style.display = open ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!open));
      item.classList.toggle('open', !open);
    });
    return item;
  }

  // ─── Recap screen ─────────────────────────────────────────────────────────────
  function buildRecapScreen() {
    const s = el('section', 'screen screen-recap');
    const card = el('div', 'recap-card');
    card.appendChild(el('div', 'recap-badge badge'));
    card.appendChild(el('h2', 'recap-title'));
    const milestone = el('div', 'recap-milestone');
    card.appendChild(milestone);
    const best = el('div', 'recap-best');
    card.appendChild(best);
    card.appendChild(el('h3', 'recap-section-title', 'Recap objectives'));
    const acc = el('div', 'recap-accordion');
    card.appendChild(acc);
    card.appendChild(el('h3', 'recap-section-title', 'References'));
    const refs = el('ul', 'recap-refs');
    card.appendChild(refs);
    const actions = el('div', 'recap-actions');
    const back = el('button', 'btn btn-ghost', '‹ Map');
    const replay = el('button', 'btn btn-ghost', '↻ Replay');
    const nextBtn = el('button', 'btn btn-primary', 'Next area ▸');
    back.type = 'button'; replay.type = 'button'; nextBtn.type = 'button';
    actions.append(back, replay, nextBtn);
    card.appendChild(actions);
    s.appendChild(card);

    back.addEventListener('click', () => showScreen('map'));
    replay.addEventListener('click', startSim);
    nextBtn.addEventListener('click', () => {
      if (state.levelIndex < LEVELS.length - 1) enterLevel(state.levelIndex + 1);
      else { showToast('That was the last area — the whole roadmap is yours!', 'info'); showScreen('map'); }
    });
    return s;
  }

  function fillRecap() {
    const s = ui.screens.recap;
    const lvl = LEVELS[state.levelIndex];
    if (!lvl) return;
    s.querySelector('.recap-badge').textContent = 'Area ' + (state.levelIndex + 1) + ' · ' + (lvl.phase || 'Recap');
    s.querySelector('.recap-title').textContent = lvl.title || '';
    const ms = s.querySelector('.recap-milestone');
    clear(ms);
    ms.appendChild(el('span', 'recap-milestone-label', 'Milestone'));
    ms.appendChild(el('p', 'recap-milestone-text', lvl.milestone || ''));
    const best = s.querySelector('.recap-best');
    clear(best);
    const st = progressStore[lvl.id] ? (progressStore[lvl.id].best || 0) : 0;
    const bestStars = el('span', 'recap-best-stars', 'Best: ');
    for (let k = 1; k <= 3; k++) {
      bestStars.appendChild(el('span', 'star' + (k <= st ? ' on' : ''), '★'));
    }
    best.appendChild(bestStars);
    const acc = s.querySelector('.recap-accordion');
    clear(acc);
    (lvl.recap || []).forEach(item => acc.appendChild(makeAccordionItem(item.objective, item.detail)));
    const refs = s.querySelector('.recap-refs');
    clear(refs);
    (lvl.refs || []).forEach(rf => {
      const li = el('li', 'recap-ref');
      const a = document.createElement('a');
      a.href = rf.url || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = rf.label || rf.url || '';
      li.appendChild(a);
      if (rf.note) li.appendChild(el('span', 'recap-ref-note', ' — ' + rf.note));
      refs.appendChild(li);
    });
    const nextBtn = s.querySelector('.recap-actions .btn-primary');
    const last = state.levelIndex >= LEVELS.length - 1;
    nextBtn.textContent = last ? 'All areas complete!' : 'Next area ▸';
  }

  // ─── Screen router (single page, section toggling) ───────────────────────────
  function sectionName() {
    switch (state.current) {
      case 'intro': return 'Level intro';
      case 'sim':
        if (state.sim.stage === 'done' || state.quiz.finished) return 'Results';
        if (state.sim.stage === 'quiz' || state.quiz.started) return 'Quiz';
        return 'Learn';
      case 'recap': return 'Recap';
      default: return 'Park map';
    }
  }

  function showScreen(name) {
    state.current = name;
    Object.keys(ui.screens).forEach(k => {
      const scr = ui.screens[k];
      const on = k === name;
      scr.style.display = on ? 'block' : 'none';
      scr.classList.toggle('active', on);
    });
    if (name === 'map') renderMap();
    scrollToScreenTop();
    updateDrawer();
  }

  function scrollToScreenTop() {
    const root = document.getElementById('term-sim-root');
    if (root && root.scrollIntoView) root.scrollIntoView({ block: 'start' });
    window.scrollTo(0, 0);
  }

  // ─── Info drawer ──────────────────────────────────────────────────────────────
  function buildDrawer() {
    const fab = el('button', 'info-fab', '?');
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Open info drawer');
    fab.style.position = 'fixed';
    fab.style.right = '18px';
    fab.style.bottom = '18px';
    fab.style.zIndex = '9';
    fab.style.width = '46px';
    fab.style.height = '46px';
    fab.style.borderRadius = '50%';
    fab.style.fontWeight = '800';

    const backdrop = el('div', 'drawer-backdrop');
    backdrop.style.position = 'fixed';
    backdrop.style.inset = '0';
    backdrop.style.zIndex = '7';
    backdrop.style.display = 'none';

    const drawer = el('aside', 'info-drawer');
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-label', 'Info drawer');
    drawer.style.position = 'fixed';
    drawer.style.zIndex = '8';
    drawer.style.display = 'flex';
    drawer.style.flexDirection = 'column';
    drawer.style.visibility = 'hidden';

    const head = el('div', 'drawer-head');
    head.appendChild(el('h3', 'drawer-title', 'TERM Lab Park'));
    const close = el('button', 'drawer-close', '×');
    close.type = 'button';
    close.setAttribute('aria-label', 'Close info drawer');
    head.appendChild(close);
    const content = el('div', 'drawer-content');
    drawer.append(head, content);

    ui.shell.append(backdrop, drawer, fab);
    ui.drawer = drawer;
    ui.drawerContent = content;
    ui.backdrop = backdrop;

    fab.addEventListener('click', () => { updateDrawer(); openDrawer(); });
    close.addEventListener('click', closeDrawer);
    backdrop.addEventListener('click', closeDrawer);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && state.drawerOpen) closeDrawer();
    });
    applyDrawerTransform(false);
  }

  function applyDrawerTransform(open) {
    const d = ui.drawer;
    if (!d) return;
    if (isMobile()) {
      d.style.top = 'auto';
      d.style.bottom = '0';
      d.style.left = '0';
      d.style.right = 'auto';
      d.style.width = '100%';
      d.style.height = '46vh';
      d.style.transform = open ? 'translateY(0)' : 'translateY(100%)';
    } else {
      d.style.top = '0';
      d.style.bottom = 'auto';
      d.style.left = 'auto';
      d.style.right = '0';
      d.style.width = 'min(400px, 92vw)';
      d.style.height = '100%';
      d.style.transform = open ? 'translateX(0)' : 'translateX(100%)';
    }
    d.style.visibility = open ? 'visible' : 'hidden';
  }

  function openDrawer() {
    state.drawerOpen = true;
    if (ui.backdrop) ui.backdrop.style.display = 'block';
    applyDrawerTransform(true);
  }
  function closeDrawer() {
    state.drawerOpen = false;
    if (ui.backdrop) ui.backdrop.style.display = 'none';
    applyDrawerTransform(false);
  }

  function getDepthItems() {
    const lvl = LEVELS[state.levelIndex];
    if (!lvl) return [];
    switch (state.current) {
      case 'map':
        return LEVELS.map((l, i) => ({
          head: 'Area ' + (i + 1) + ': ' + (l.title || ''),
          body: ((l.intro && l.intro.body) || []).join(' ') || 'No details yet.',
        }));
      case 'intro':
        return ((lvl.intro && lvl.intro.body) || []).map(p => ({
          head: lvl.intro && lvl.intro.title ? lvl.intro.title : 'Why this area',
          body: p,
        }));
      case 'sim': {
        const items = (lvl.learn || []).map(c => ({ head: c.title, body: c.body }));
        state.quiz.answered.forEach(a => items.push({ head: 'Quiz: ' + a.q.q, body: a.q.explain }));
        return items;
      }
      default:
        return (lvl.recap || []).map(r => ({ head: r.objective, body: r.detail }));
    }
  }

  function updateDrawer() {
    const content = ui.drawerContent;
    if (!content) return;
    clear(content);
    const lvl = LEVELS[state.levelIndex];

    const where = el('div', 'drawer-where');
    where.appendChild(el('span', 'drawer-where-label', 'You are here:'));
    where.appendChild(el('span', 'drawer-where-value', sectionName()));
    if (lvl) where.appendChild(el('div', 'drawer-lvl', 'Area ' + (state.levelIndex + 1) + ' · ' + lvl.title));
    content.appendChild(where);

    const dive = el('div', 'drawer-block');
    dive.appendChild(el('h4', 'drawer-block-title', 'Deep dive'));
    const acc = el('div', 'drawer-acc');
    getDepthItems().forEach(it => acc.appendChild(makeAccordionItem(it.head, it.body)));
    dive.appendChild(acc);
    content.appendChild(dive);

    const refs = el('div', 'drawer-block');
    refs.appendChild(el('h4', 'drawer-block-title', 'Resources & references'));
    const ul = el('ul', 'drawer-refs');
    ((lvl && lvl.refs) || []).forEach(rf => {
      const li = el('li');
      const a = document.createElement('a');
      a.href = rf.url || '#';
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = rf.label || rf.url || '';
      li.appendChild(a);
      ul.appendChild(li);
    });
    refs.appendChild(ul);
    content.appendChild(refs);

    const gl = el('div', 'drawer-block');
    gl.appendChild(el('h4', 'drawer-block-title', 'Glossary quick links'));
    const gacc = el('div', 'drawer-gloss');
    ((lvl && lvl.recap) || []).forEach((item, i) => {
      const b = el('button', 'drawer-gloss-link', item.objective);
      b.type = 'button';
      b.addEventListener('click', () => {
        const items = content.querySelectorAll('.drawer-acc .acc-item');
        const target = items[i];
        if (target) {
          const head = target.querySelector('.acc-head');
          if (head && target.querySelector('.acc-body').style.display === 'none') head.click();
          target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
      gacc.appendChild(b);
    });
    gl.appendChild(gacc);
    content.appendChild(gl);
  }

  // ─── Resize handling (mobile/desktop + canvas re-fit) ─────────────────────────
  function onResize() {
    if (state.current === 'sim') {
      setupCanvas();
      if (R?.setMode) R.setMode(state.sim.mode);
      if (R?.setSpeed) R.setSpeed(state.sim.paused ? 0 : state.sim.speed);
      const lvl = LEVELS[state.levelIndex];
      if (lvl) setStations(lvl);
    }
    if (state.drawerOpen) applyDrawerTransform(true);
  }

  // ─── Init / bootstrap ─────────────────────────────────────────────────────────
  function init() {
    const root = document.getElementById('term-sim-root');
    if (!root) return false;
    clear(root);

    const shell = el('div', 'app');
    ui.shell = shell;
    root.appendChild(shell);

    ui.screens.map = buildMapScreen();
    ui.screens.intro = buildIntroScreen();
    ui.screens.sim = buildSimScreen();
    ui.screens.recap = buildRecapScreen();
    Object.keys(ui.screens).forEach(k => {
      ui.screens[k].style.display = 'none';
      shell.appendChild(ui.screens[k]);
    });

    ui.canvasWrap = ui.screens.sim.querySelector('.sim-canvas-wrap');
    ui.canvas = ui.canvasWrap.querySelector('canvas');
    ui.simBody = ui.screens.sim.querySelector('.sim-body');
    ui.simStage = ui.screens.sim.querySelector('.sim-stage');
    ui.simClock = ui.screens.sim.querySelector('.sim-clock');
    ui.simStatus = ui.screens.sim.querySelector('.sim-status');
    ui.pauseBtn = ui.screens.sim.querySelector('.sim-pause');
    ui.toasts = ui.screens.sim.querySelector('.sim-toasts');
    ui.speeds = Array.from(ui.screens.sim.querySelectorAll('.speed-pill'));
    wireSpeedPills();

    buildDrawer();
    window.addEventListener('resize', debounce(onResize, 150));

    showScreen('map');
    return true;
  }

  let started = false;
  function start() {
    if (started) return;
    started = true;
    init();
  }

  // Bootstrap on DOMContentLoaded when #term-sim-root exists.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  window.TERM = window.TERM || {};
  window.TERM.APP = { start };
})();
