/* TERM Lab Park — Simulation State Machine (Sim)
 * Walks the construct through 15 stations on Factory.MAIN route,
 * manages carrier movement, dwell timing, reading panels, and
 * the surgical implantation launch sequence with flight physics.
 * Exposes: window.Sim
 */
(function () {
  'use strict';

  // ============================================================
  // CONFIGURATION CONSTANTS
  // ============================================================
  const CARRIER_SPEED = 18;          // route distance units per sim-hour
  const SIM_HOURS_PER_REAL_SEC = 12; // time dilation: 1 real second = 12 sim hours
  const READ_PANEL_MULTIPLIER = 1.0; // read time runs at real-time when panel open

  // Station build level mapping (0-15)
  const LEVEL = {
    procurement:       0,
    digestion:         1,
    isolation:         2,
    expansion:         3,
    characterization:  4,
    scaffold:          5,
    seeding:           6,
    perfusion:         7,
    conditioning:      8,
    histology:         9,
    mechanical_test:  10,
    sterility:        11,
    release:          12,
    preop:            13,
    implantation:     14
  };

  // Surgical implantation launch sequence phases
  const SEQ = {
    CHILL:     'chill',     // pre-launch cooldown / systems check
    SPIN:      'spin',      // rotor spin-up
    IGNITE:    'ignite',    // main engine ignition
    LIFTOFF:   'liftoff',   // clear tower / surgical deployment
    SPACE:     'space',     // orbital / integration phase
    COMPLETE:  'complete'   // mission complete
  };

  const SEQ_ORDER = [SEQ.CHILL, SEQ.SPIN, SEQ.IGNITE, SEQ.LIFTOFF, SEQ.SPACE, SEQ.COMPLETE];
  const SEQ_DURATION = {
    [SEQ.CHILL]:    3.0,  // sim hours
    [SEQ.SPIN]:     2.0,
    [SEQ.IGNITE]:   1.0,
    [SEQ.LIFTOFF]:  4.0,
    [SEQ.SPACE]:    8.0,
    [SEQ.COMPLETE]: 0
  };

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
    phase: 'idle',      // 'idle' | 'travel' | 'dwell' | 'read' | 'launch' | 'complete'
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

    // Launch sequence (surgical implantation)
    launch: null,       // { phase, timer, total, altitude, velocity, mass, visualZ }

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
  const lerp = (a, b, t) => a + (b - a) * t;

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
  // SPECIAL STATION OPERATIONS
  // ============================================================
  const OPS = {
    // Hotfire test at mechanical_test station
    hotfire: (dt) => {
      if (!state.launch) return;
      // Simulate engine test firing - increases confidence
      state.launch.hotfireProgress = (state.launch.hotfireProgress || 0) + dt / 2.0;
      if (state.launch.hotfireProgress >= 1) {
        state.launch.hotfirePassed = true;
        emit('hotfireComplete', {});
      }
    },

    // Integration at implantation station
    integrate: (dt) => {
      if (!state.launch) return;
      state.launch.integrationProgress = (state.launch.integrationProgress || 0) + dt / 4.0;
      if (state.launch.integrationProgress >= 1) {
        emit('integrationComplete', {});
      }
    },

    // Launch sequence controller
    launchSeq: (dt) => {
      if (!state.launch) return;
      const L = state.launch;
      L.timer += dt;

      // Phase transitions
      const phaseIdx = SEQ_ORDER.indexOf(L.phase);
      const phaseDur = SEQ_DURATION[L.phase];

      if (L.timer >= phaseDur && phaseIdx < SEQ_ORDER.length - 1) {
        L.timer = 0;
        L.phase = SEQ_ORDER[phaseIdx + 1];
        emit('launchPhase', { phase: L.phase, progress: 0 });
      }

      // Physics during liftoff and space phases
      if (L.phase === SEQ.LIFTOFF || L.phase === SEQ.SPACE) {
        updateLaunchPhysics(dt);
      }

      // Visual Z for render (exaggerated for visibility)
      if (L.phase === SEQ.LIFTOFF) {
        L.visualZ = lerp(0, 15, clamp(L.timer / phaseDur, 0, 1));
      } else if (L.phase === SEQ.SPACE) {
        L.visualZ = 15 + lerp(0, 30, clamp(L.timer / SEQ_DURATION[SEQ.SPACE], 0, 1));
      }

      // Emit progress
      const totalPhaseDur = SEQ_DURATION[L.phase];
      if (totalPhaseDur > 0) {
        emit('launchProgress', { phase: L.phase, progress: clamp(L.timer / totalPhaseDur, 0, 1) });
      }

      // Complete
      if (L.phase === SEQ.COMPLETE) {
        state.finished = true;
        state.phase = 'complete';
        emit('launchComplete', { serialNumber: state.serialNumber, simHours: state.simHours });
      }
    }
  };

  // ============================================================
  // LAUNCH PHYSICS (Flight Dynamics)
  // ============================================================
  function updateLaunchPhysics(dt) {
    const L = state.launch;
    if (!L) return;

    // Simplified rocket equation physics
    // Mass depletion during burn
    if (L.phase === SEQ.LIFTOFF) {
      const burnRate = L.initialMass * 0.15; // 15% mass per sim hour
      L.mass = Math.max(L.dryMass, L.mass - burnRate * dt);

      // Thrust: F = m_dot * ve (simplified)
      const thrust = burnRate * 2500; // effective exhaust velocity 2500 m/s
      const gravity = 9.81;
      const drag = 0.5 * 1.225 * L.velocity * L.velocity * 0.5 * Math.PI * 1.5 * 1.5; // Cd*A approx

      const accel = (thrust - L.mass * gravity - drag) / L.mass;
      L.velocity += accel * dt * 3600; // convert to m/s per sim hour
      L.altitude += L.velocity * dt * 3600; // meters
    } else if (L.phase === SEQ.SPACE) {
      // Orbital mechanics - simplified circular orbit insertion
      const targetOrbitalVelocity = 7800; // m/s LEO
      const dv = (targetOrbitalVelocity - L.velocity) * 0.1 * dt;
      L.velocity += dv;
      L.altitude += L.velocity * dt * 3600;
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

    // Handle launch sequence
    if (state.phase === 'launch') {
      OPS.launchSeq(simDt);
      return;
    }

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

    // Check if this is the implantation station (launch trigger)
    if (stationId === 'implantation') {
      beginLaunchSequence();
      return;
    }

    // Move to next station
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

  function beginLaunchSequence() {
    state.phase = 'launch';
    state.launch = {
      phase: SEQ.CHILL,
      timer: 0,
      altitude: 0,
      velocity: 0,
      mass: 5000,      // kg wet mass
      dryMass: 1200,   // kg dry mass
      initialMass: 5000,
      visualZ: 0,
      hotfireProgress: 0,
      hotfirePassed: false,
      integrationProgress: 0
    };

    emit('launchStart', { serialNumber: state.serialNumber });
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
    state.launch = null;
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
    state.launch = null;
    emit('reset', { serialNumber: state.serialNumber });
  }

  function resetLaunch() {
    state.launch = null;
    state.phase = 'idle';
    state.finished = false;
    state.stage = getStationOrder().length - 1; // back to implantation station
    beginNextUnit();
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
    resetLaunch,
    togglePause,
    step,
    update,          // render.js frame loop drives this
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
    emit,
    LEVEL,
    SEQ,
    SEQ_ORDER,
    SEQ_DURATION
  };

  if (typeof window !== 'undefined') {
    window.Sim = Sim;
  }
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sim;
  }
})();
