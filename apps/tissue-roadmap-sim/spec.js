// Spec.js — Tissue Engineering Physics & Live Computation
// Exports: window.Spec

const Spec = (() => {
  // ============================================================
  // ENGINEERING PARAMETERS
  // ============================================================
  const ENG = {
    // Cell proliferation (logistic growth)
    cells: {
      initial: 5e5,          // cells seeded per scaffold (500k)
      carryingCapacity: 2e7, // max cells per cm³ scaffold (20M)
      doublingTime: 24,      // hours (chondrocytes in perfusion)
      deathRate: 0.005,      // per hour (apoptosis/anoikis)
      metabolicRate: 2e-17,  // mol O₂/cell/s
    },

    // Scaffold mechanics
    scaffold: {
      porosity: 0.85,           // void fraction
      poreSize: 300e-6,         // m (300 μm)
      permeability: 1e-12,      // m² (Darcy)
      youngsModulus: 0.5e6,     // Pa (0.5 MPa initial)
      targetModulus: 15e6,      // Pa (15 MPa mature cartilage)
      degradationHalfLife: 336, // hours (14 days PLGA)
      initialThickness: 4e-3,   // m (4 mm)
    },

    // Bioreactor mass transport
    bioreactor: {
      flowRate: 1e-8,       // m³/s (10 mL/min perfusion)
      inletO2: 0.2,         // mol/m³ (air-saturated ~0.2 mM)
      inletGlucose: 5.5,    // mol/m³ (5.5 mM)
      chamberVolume: 5e-6,  // m³ (5 mL)
      shearThreshold: 0.01, // Pa (max physiological shear)
      mixingEfficiency: 0.8,
    },

    // Construct maturation
    construct: {
      gAGContent: 0,           // μg/mg dry weight (initial)
      collagenContent: 0,      // μg/mg dry weight
      targetGAG: 40,           // μg/mg (native cartilage ~4-5% wet)
      targetCollagen: 150,     // μg/mg
      synthesisRateGAG: 0.08,  // μg/mg/day per 1M cells
      synthesisRateCollagen: 0.15,
      maturationThreshold: 0.7, // fraction of target properties
    },

    // Clinical implantation
    implantation: {
      defectSize: 8e-3,        // m (8 mm diameter)
      defectDepth: 4e-3,       // m (4 mm)
      pressFitInterference: 0.1, // 10% oversize
      integrationTime: 720,    // hours (30 days)
      loadBearingDay: 168,     // hours (7 days partial)
      fullLoadDay: 672,        // hours (28 days)
    },

    // Time scaling
    time: {
      simHoursPerRealSecond: 4, // 4 sim hours = 1 real second
      maxSimHours: 2000,        // ~83 days
    },
  };

  // ============================================================
  // MATERIALS PALETTE (for render)
  // ============================================================
  const MATERIALS = [
    { id: 'plga',      name: 'PLGA Scaffold',       color: '#c9b896', phase: 'scaffold' },
    { id: 'collagen',  name: 'Collagen Matrix',     color: '#e8d5c4', phase: 'matrix' },
    { id: 'chondro',   name: 'Chondrocytes',        color: '#d4a574', phase: 'cells' },
    { id: 'gag',       name: 'GAG Deposition',      color: '#8fb88f', phase: 'matrix' },
    { id: 'collagen2', name: 'Collagen Type II',    color: '#c8a878', phase: 'matrix' },
    { id: 'construct', name: 'Tissue Construct',    color: '#a8c8a8', phase: 'final' },
    { id: 'implant',   name: 'Implant-Ready',       color: '#88b898', phase: 'final' },
  ];

  // ============================================================
  // STATION BUILD CONTRIBUTIONS
  // ============================================================
  const STATION_ADDS = {
    isolation:     { cells: 5e5,     materials: ['chondro'] },
    expansion:     { cells: 1.5e7,   materials: ['chondro'] },
    seeding:       { cells: 0,       materials: ['plga', 'chondro'] },
    perfusion:     { gag: 8,         collagen: 15,  materials: ['gag', 'collagen2'] },
    mechanical:    { gag: 12,        collagen: 25,  modulus: 2e6,  materials: ['gag', 'collagen2'] },
    hypoxia:       { gag: 6,         collagen: 10,  viability: 0.92, materials: ['gag'] },
    maturation:    { gag: 15,        collagen: 35,  modulus: 5e6,  materials: ['construct'] },
    qc_morph:      { }, // inspection only
    qc_mech:       { }, // inspection only
    qc_sterile:    { }, // inspection only
    packaging:     { materials: ['implant'] },
    cold_chain:    { },
    surgical_prep: { },
    implantation:  { },
    recovery:      { },
  };

  // ============================================================
  // HELPERS
  // ============================================================
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const group = (n) => String(Math.floor(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const fmtTime = (h) => {
    if (h < 24) return `${h.toFixed(1)}h`;
    const d = h / 24;
    if (d < 30) return `${d.toFixed(1)}d`;
    return `${(d/30).toFixed(1)}mo`;
  };
  const fmtMetric = (v, unit, prec = 1) => `${v.toFixed(prec)} ${unit}`;
  const pct = (v) => `${(v*100).toFixed(1)}%`;

  // ============================================================
  // LIVE COMPUTATION
  // ============================================================
  /**
   * Compute live tissue engineering metrics for current sim time.
   * @param {Object} opt - { simHours, stationProgress: {id: 0-1}, activeStationId }
   * @returns {Object} metrics for HUD
   */
  function compute(opt = {}) {
    const { simHours = 0, stationProgress = {}, activeStationId = null } = opt;
    const e = ENG;

    // ---- Cell population (logistic growth with death) ----
    const k = Math.log(2) / e.cells.doublingTime; // per hour
    const dt = 1; // integration step (hour)
    let N = e.cells.initial;
    for (let t = 0; t < simHours; t += dt) {
      const growth = k * N * (1 - N / e.cells.carryingCapacity);
      const death = e.cells.deathRate * N;
      N += (growth - death) * dt;
      if (N > e.cells.carryingCapacity) N = e.cells.carryingCapacity;
    }
    const cellCount = Math.floor(N);
    const cellDensity = N / (e.scaffold.initialThickness * Math.PI * Math.pow(e.implantation.defectSize/2, 2)); // cells/m³

    // ---- Nutrient concentration (steady-state approximation) ----
    const consumption = N * e.cells.metabolicRate; // mol/s
    const supply = e.bioreactor.flowRate * e.bioreactor.inletO2; // mol/s
    const o2Fraction = clamp(1 - consumption / supply, 0, 1);
    const glucoseFraction = clamp(1 - (consumption * 0.5) / (e.bioreactor.flowRate * e.bioreactor.inletGlucose), 0, 1);

    // ---- Scaffold degradation ----
    const degRate = Math.log(2) / e.scaffold.degradationHalfLife;
    const scaffoldFraction = Math.exp(-degRate * simHours);

    // ---- Mechanical property evolution ----
    // Modulus increases with matrix deposition, decreases with degradation
    let modulus = e.scaffold.youngsModulus;
    let gag = 0;
    let collagen = 0;

    // The factory uses production-station identifiers, while the original
    // engineering model groups their contributions into these metrics.
    const stationAdds = {
      isolation: { cells: 5e5 },
      expansion: { cells: 1.5e7 },
      scaffold: { modulus: 0.5e6 },
      perfusion: { gag: 8, collagen: 15 },
      conditioning: { gag: 12, collagen: 25, modulus: 5e6 },
      mechanical_test: { modulus: 8e6 }
    };

    // Accumulate from station progress
    for (const [id, prog] of Object.entries(stationProgress)) {
      const add = stationAdds[id] || STATION_ADDS[id];
      if (!add) continue;
      const w = clamp(prog, 0, 1);
      if (add.gag) gag += add.gag * w;
      if (add.collagen) collagen += add.collagen * w;
      if (add.modulus) modulus = lerp(modulus, add.modulus, w);
    }

    // Degradation reduces scaffold contribution
    const scaffoldModulus = e.scaffold.youngsModulus * scaffoldFraction;
    const tissueModulus = modulus - e.scaffold.youngsModulus + scaffoldModulus;
    const effectiveModulus = Math.max(0.1e6, tissueModulus);

    // Maturity index
    const gagMaturity = clamp(gag / e.construct.targetGAG, 0, 1);
    const collagenMaturity = clamp(collagen / e.construct.targetCollagen, 0, 1);
    const modulusMaturity = clamp(effectiveModulus / e.scaffold.targetModulus, 0, 1);
    const maturityIndex = (gagMaturity + collagenMaturity + modulusMaturity) / 3;

    // ---- Shear stress in bioreactor ----
    // τ = μ * (v/h) approximation for parallel plate
    const viscosity = 0.001; // Pa·s (culture medium ~water)
    const channelHeight = 2e-3; // m
    const velocity = e.bioreactor.flowRate / (channelHeight * 0.02); // m/s (2cm wide)
    const shearStress = viscosity * velocity / channelHeight;

    // ---- Implantation readiness ----
    const implantationReady = maturityIndex >= e.construct.maturationThreshold &&
                               effectiveModulus >= 5e6 &&
                               gag >= e.construct.targetGAG * 0.7;

    // ---- Clinical projection ----
    const daysToImplant = Math.max(0, (e.implantation.integrationTime - simHours) / 24);
    const integrationProgress = clamp(simHours / e.implantation.integrationTime, 0, 1);

      return {
      // Cell metrics
      cellCount,
      cellDensity: cellDensity / 1e6, // millions/m³
      cellPct: clamp(N / e.cells.carryingCapacity, 0, 1),

      // Nutrient metrics
      o2Fraction,
      glucoseFraction,
      shearStress,
      shearSafe: shearStress <= e.bioreactor.shearThreshold,

      // Scaffold/construct metrics
      scaffoldFraction,
      gag: Math.round(gag),
      collagen: Math.round(collagen),
      gagPct: gagMaturity,
      collagenPct: collagenMaturity,
      effectiveModulus: Math.round(effectiveModulus / 1e6 * 10) / 10, // MPa
      modulusPct: modulusMaturity,
      maturityIndex,

      // Clinical
      implantationReady,
      daysToImplant: Math.ceil(daysToImplant),
      integrationProgress,

      // Formatted for HUD
        fmt: {
        cellCount: group(cellCount),
        cellDensity: fmtMetric(cellDensity / 1e6, 'M/m³'),
        o2: pct(o2Fraction),
        glucose: pct(glucoseFraction),
        shear: fmtMetric(shearStress * 1000, 'mPa'),
        scaffold: pct(scaffoldFraction),
        gag: fmtMetric(gag, 'μg/mg'),
        collagen: fmtMetric(collagen, 'μg/mg'),
        modulus: fmtMetric(effectiveModulus / 1e6, 'MPa'),
        maturity: pct(maturityIndex),
        daysToImplant: daysToImplant < 1 ? '<1 day' : `${Math.ceil(daysToImplant)} days`,
        integration: pct(integrationProgress),
          status: implantationReady ? 'IMPLANTATION READY' : 'MATURING',
        },
        // Renderer-facing aliases keep the compact in-canvas HUD meaningful.
        cells: cellCount,
        viability: clamp(0.98 - Math.max(0, simHours - 240) * 0.00005, 0.85, 0.98),
        size: e.implantation.defectSize * 1000,
        modulus: effectiveModulus / 1e6,
        perfusion: o2Fraction,
        stageName: activeStationId || 'preparation'
      };
  }

  // ============================================================
  // STAGE-LEVEL READOUTS (for station panels)
  // ============================================================
  const STAGE_READOUTS = {
    isolation: {
      title: 'CELL ISOLATION',
      metrics: ['Initial cell yield', 'Viability post-digest', 'Contamination check'],
      target: '>500k viable chondrocytes, >90% viability',
    },
    expansion: {
      title: 'CELL EXPANSION',
      metrics: ['Population doublings', 'Phenotype maintenance', 'Passage number'],
      target: 'P2-P3, >15M cells, COL2A1+/COL1A1- ratio >10',
    },
    seeding: {
      title: 'SCAFFOLD SEEDING',
      metrics: ['Seeding efficiency', 'Cell distribution uniformity', 'Attachment rate'],
      target: '>80% seeding efficiency, uniform penetration',
    },
    perfusion: {
      title: 'PERFUSION BIOREACTOR',
      metrics: ['O₂ concentration', 'Glucose consumption', 'Lactate production', 'GAG accumulation'],
      target: 'O₂ >15%, glucose >2mM, GAG >20 μg/mg',
    },
    mechanical: {
      title: 'MECHANICAL CONDITIONING',
      metrics: ['Dynamic compression', 'Construct modulus', 'Collagen alignment', 'GAG retention'],
      target: 'Modulus >5 MPa, aligned collagen, GAG >35 μg/mg',
    },
    hypoxia: {
      title: 'HYPOXIC MATURATION',
      metrics: ['HIF-1α stabilization', 'Glycolytic flux', 'Matrix synthesis rate', 'Viability'],
      target: 'HIF-1α+, viability >90%, enhanced GAG synthesis',
    },
    maturation: {
      title: 'TERMINAL MATURATION',
      metrics: ['Equilibrium modulus', 'GAG content', 'Collagen II/I ratio', 'Histology score'],
      target: 'Modulus 10-15 MPa, GAG >40, Col II/I >20, OARSI <2',
    },
    qc_morph: {
      title: 'QC: MORPHOLOGY',
      metrics: ['Safranin-O staining', 'Collagen II IHC', 'Cell morphology', 'Surface integrity'],
      target: 'Uniform matrix, round chondrocytes, intact surface',
    },
    qc_mech: {
      title: 'QC: MECHANICS',
      metrics: ['Indentation modulus', 'Stress-relaxation', 'Permeability', 'Friction coefficient'],
      target: 'E_eq 10-15 MPa, τ 10-20s, k 10⁻¹⁵ m⁴/Ns, μ <0.02',
    },
    qc_sterile: {
      title: 'QC: STERILITY',
      metrics: ['Endotoxin (LAL)', 'Bioburden', 'Mycoplasma', 'Endotoxin'], 
      target: '<0.5 EU/mL, sterile, mycoplasma negative',
    },
    packaging: {
      title: 'PACKAGING & TRANSPORT',
      metrics: ['Container integrity', 'Temperature log', 'Gas exchange', 'Shelf life'],
      target: 'Intact, 2-8°C logged, viable >72h',
    },
    cold_chain: {
      title: 'COLD CHAIN LOGISTICS',
      metrics: ['Shipment tracking', 'Temperature excursion', 'Time in transit', 'Receiving inspection'],
      target: 'No excursions, <24h transit, pass receiving QC',
    },
    surgical_prep: {
      title: 'SURGICAL PREPARATION',
      metrics: ['Defect debridement', 'Sizing verification', 'Construct thaw/rinse', 'Press-fit trial'],
      target: 'Clean defect, correct size, construct viable, 10% interference',
    },
    implantation: {
      title: 'IMPLANTATION',
      metrics: ['Press-fit stability', 'Arthroscopic confirmation', 'OR time', 'Intra-op complications'],
      target: 'Stable fixation, flush integration, <60 min, no complications',
    },
    recovery: {
      title: 'POST-OP RECOVERY',
      metrics: ['Weight-bearing protocol', 'MRI T2 mapping', 'Clinical scores (IKDC/KOOS)', 'Complication rate'],
      target: 'Progressive WB, T2 normalization, IKDC >80, <5% complications',
    },
  };

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    ENG,
    MATERIALS,
    STATION_ADDS,
    STAGE_READOUTS,
    compute,
    clamp,
    lerp,
    group,
    fmtTime,
    fmtMetric,
    pct,
  };
})();

// Export to window
if (typeof window !== 'undefined') {
  window.Spec = Spec;
}

// Also support module environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Spec;
}
