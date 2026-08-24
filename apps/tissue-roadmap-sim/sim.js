/* TERM Lab Park — Simulation State Machine (Sim)
 * Walks the construct through 15 stations on Factory.MAIN route,
 * managing carrier movement, dwell timing, and the explicit lesson
 * hold at each station. Exposes: window.Sim
 */
(function () {
  'use strict';

  // ============================================================
  // CONFIGURATION CONSTANTS
  // ============================================================
  const CARRIER_SPEED = 18;          // route distance units per sim-hour
  const SIM_HOURS_PER_REAL_SEC = 12; // time dilation: 1 real second = 12 sim hours

  // Event bus
  const listeners = new Map();

  function emit(name, payload) {
    const arr = listeners.get(name);
    if (arr) arr.forEach(fn => { try { fn(payload); } catch (e) { console.warn('Sim emit error:', e); } });
  }

  function on(name, fn) {
    if (!listeners.has(name)) listeners.set(name, []);
    listeners.get(name).push(fn);
    return () => off(name, fn);
  }

  function off(name, fn) {
    const arr = listeners.get(name);
    if (arr) {
      const i = arr.indexOf(fn);
      if (i >= 0) arr.splice(i, 1);
    }
  }

  // ============================================================
  // STATE OBJECT
  // ============================================================
  const state = {
    // Global run state
    running: false,
    paused: false,
    finished: false,
    speed: 1,

    // Progression
    stage: 0,           // 0-14 station index in Factory.ORDER
    phase: 'idle',      // 'idle' | 'travel' | 'dwell' | 'read' | 'complete'
    level: 0,           // build level 0-15

    // Carrier on MAIN route
    carrier: null,      // { d: distance along route, targetD, stationId }

    // Station progress (0-1 per station)
    stationProgress: {},

    // Current station being processed
    currentStation: null,
    currentStop: null,  // stop definition from Factory.STOPS

    // Dwell / read timing
    dwellTimer: 0,
    dwellTotal: 0,
    readTimer: 0,
    readTotal: 0,
    panelOpen: false,
    awaitingContinue: false,

    // Serial number
    serialNumber: 'SN-001',

    // Simulation time (sim hours)
    simHours: 0,

    // Follow camera
    followCamera: false,

    // Labels toggle
    showLabels: true
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

  function getRoute() {
    return Factory.MAIN;
  }

  function getStops() {
    return Factory.STOPS;
  }

  function getStationOrder() {
    return Factory.ORDER;
  }

  function getStationById(id) {
    return Factory.STATIONS.find(s => s.id === id);
  }

  function getStopById(id) {
    return Factory.STOPS.find(s => s.id === id);
  }

  // ============================================================
  // STATION BUILD APPLICATION
  // ============================================================
  function applyAdds(stationId) {
    const adds = Spec.STATION_ADDS[stationId];
    if (!adds) return;

    // This is handled by Spec.compute() based on stationProgress
    // We just ensure the progress is tracked
    if (state.stationProgress[stationId] === undefined) {
      state.stationProgress[stationId] = 0;
    }
  }

  function work(stationId, simDt) {
    const stop = getStopById(stationId);
    if (!stop) return;

    const progress = state.stationProgress[stationId] || 0;
    const increment = simDt / stop.dwell;
    const newProgress = clamp(progress + increment, 0, 1);
    state.stationProgress[stationId] = newProgress;

    // Update build level based on completed stations
    let completedCount = 0;
    for (const sid of getStationOrder()) {
      if (state.stationProgress[sid] >= 1) completedCount++;
      else break;
    }
    state.level = completedCount;

    // Emit progress for UI
    if (newProgress >= 1 && progress < 1) {
      emit('stationComplete', { stationId, level: state.level });
    }
  }

  // ============================================================
  // MAIN UPDATE LOOP
  // ============================================================
  function update(dt) {
    if (!state.running || state.paused || state.finished) return;

    // Accumulate sim time
    const simDt = dt * SIM_HOURS_PER_REAL_SEC * state.speed;
    state.simHours += simDt;

    const route = getRoute();
    const stops = getStops();
    const order = getStationOrder();

    // Initialize carrier if needed
    if (!state.carrier) {
      state.carrier = { d: 0, targetD: 0, stationId: null };
    }

    // State machine
    switch (state.phase) {
      case 'idle':
        // Start first station
        beginNextUnit();
        break;

      case 'travel':
        updateTravel(simDt);
        break;

      case 'dwell':
        updateDwell(simDt);
        break;

      case 'read':
        updateRead(simDt);
        break;

      case 'complete':
        // All done
        break;
    }
  }

  function updateTravel(simDt) {
    const route = getRoute();
    const carrier = state.carrier;
    const stop = state.currentStop;

    if (!stop) {
      beginNextUnit();
      return;
    }

    const targetD = stop.at;
    const dd = CARRIER_SPEED * simDt;

    if (carrier.d < targetD) {
      carrier.d = Math.min(targetD, carrier.d + dd);
    } else if (carrier.d > targetD) {
      carrier.d = Math.max(targetD, carrier.d - dd);
    }

    // Check arrival
    if (Math.abs(carrier.d - targetD) < 0.1) {
      carrier.d = targetD;
      arriveAtStation();
    }
  }

  function arriveAtStation() {
    const stop = state.currentStop;
    const stationId = stop.id;

    state.phase = 'dwell';
    state.currentStation = stationId;
    state.dwellTimer = 0;
    state.dwellTotal = stop.dwell; // sim hours

    applyAdds(stationId);
    emit('stationArrive', { stationId, stop, dwell: stop.dwell, read: stop.read });
  }

  function updateDwell(simDt) {
    state.dwellTimer += simDt;

    // Do work at station (building the construct)
    work(state.currentStation, simDt);

    // Check if dwell complete
    if (state.dwellTimer >= state.dwellTotal) {
      state.dwellTimer = 0;

      const stop = state.currentStop;
      if (stop.read > 0) {
        // The lesson is a deliberate player step, not a hidden countdown.
        state.phase = 'read';
        state.readTimer = 0;
        state.readTotal = stop.read;
        state.panelOpen = true;
        state.awaitingContinue = true;
        emit('reading', { stationId: state.currentStation, duration: stop.read });
      } else {
        // No read time, depart immediately
        departStation();
      }
    }
  }

  function updateRead(simDt) {
    // Lessons advance only when the learner explicitly continues.
  }

  function departStation() {
    const stationId = state.currentStation;
    emit('stationDepart', { stationId });

    // Mark station progress complete
    state.stationProgress[stationId] = 1;
    state.stage++;

    // Move to next station (or finish the run after implantation)
    beginNextUnit();
  }

  function beginNextUnit() {
    const order = getStationOrder();
    const stops = getStops();

    if (state.stage >= order.length) {
      // All stations complete
      state.phase = 'complete';
      state.finished = true;
      emit('complete', { serialNumber: state.serialNumber, simHours: state.simHours });
      return;
    }

    const stationId = order[state.stage];
    const stop = getStopById(stationId);

    if (!stop) {
      state.stage++;
      beginNextUnit();
      return;
    }

    state.currentStop = stop;
    state.currentStation = stationId;
    state.carrier.targetD = stop.at;
    state.phase = 'travel';

    // If carrier already at or past this stop, arrive immediately
    if (state.carrier.d >= stop.at - 0.1) {
      arriveAtStation();
    }
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  function start(serialNumber) {
    if (serialNumber) state.serialNumber = serialNumber;
    reset();
    state.running = true;
    state.paused = false;
    state.finished = false;
    state.phase = 'idle';
    state.stage = 0;
    state.level = 0;
    state.simHours = 0;
    state.carrier = { d: 0, targetD: 0, stationId: null };
    state.stationProgress = {};
    state.currentStation = null;
    state.currentStop = null;
    emit('reset', { serialNumber: state.serialNumber });
    emit('start', { serialNumber: state.serialNumber });
    beginNextUnit();
  }

  function reset() {
    state.running = false;
    state.paused = false;
    state.finished = false;
    state.phase = 'idle';
    state.stage = 0;
    state.level = 0;
    state.simHours = 0;
    state.carrier = { d: 0, targetD: 0, stationId: null };
    state.stationProgress = {};
    state.currentStation = null;
    state.currentStop = null;
    state.dwellTimer = 0;
    state.dwellTotal = 0;
    state.readTimer = 0;
    state.readTotal = 0;
    state.panelOpen = false;
    state.awaitingContinue = false;
    emit('reset', { serialNumber: state.serialNumber });
  }

  function togglePause() {
    state.paused = !state.paused;
    emit('pauseChange', { paused: state.paused });
  }

  function step() {
    if (state.paused) {
      update(1/60); // single frame step
    }
  }

  function setSpeed(s) {
    state.speed = clamp(s, 0, 4);
    emit('speedChange', { speed: state.speed });
  }

  function setSerialNumber(sn) {
    state.serialNumber = sn;
    emit('serialChange', { serialNumber: sn });
  }

  function setFollowCamera(enabled) {
    state.followCamera = enabled;
    emit('followChange', { enabled });
  }

  function setShowLabels(enabled) {
    state.showLabels = enabled;
    emit('labelsChange', { enabled });
  }

  function closeReadPanel() {
    state.panelOpen = false;
  }

  function continueStation() {
    if (state.phase !== 'read' || !state.awaitingContinue) return;
    state.readTimer = state.readTotal;
    state.panelOpen = false;
    state.awaitingContinue = false;
    departStation();
  }

  // Make the dock's next control useful in every state: it either acknowledges
  // the lesson, arrives at the next station, or completes the active dwell.
  function nextStation() {
    if (state.phase === 'read') {
      continueStation();
    } else if (state.phase === 'travel' && state.carrier && state.currentStop) {
      state.carrier.d = state.currentStop.at;
      arriveAtStation();
    } else if (state.phase === 'dwell' && state.currentStation) {
      work(state.currentStation, state.dwellTotal);
      state.dwellTimer = state.dwellTotal;
      updateDwell(0);
    }
  }

  function getState() {
    return { ...state };
  }

  function getStationProgress(stationId) {
    return state.stationProgress[stationId] || 0;
  }

  function getComputeOptions() {
    return {
      simHours: state.simHours,
      stationProgress: { ...state.stationProgress },
      activeStationId: state.currentStation
    };
  }

  // ============================================================
  // EXPORT
  // ============================================================
  const Sim = {
    state,
    start,
    reset,
    togglePause,
    step,
    update,          // main.js frame loop drives this
    setSpeed,
    setSerialNumber,
    setFollowCamera,
    setShowLabels,
    closeReadPanel,
    continueStation,
    nextStation,
    getState,
    getStationProgress,
    getComputeOptions,
    on,
    off,
    emit
  };

  if (typeof window !== 'undefined') {
    window.Sim = Sim;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sim;
  }
})();
