/* TERM Lab Park -- Factory Layout (TERM.FACTORY)
 * Isometric tissue-engineering pipeline: 15 stations from cell isolation
 * through surgical implantation. Provides routes, stations, palette, and
 * geometry helpers. ES2020+, dependency-free, exposed as window.Factory.
 */
(function () {
  'use strict';

  // ============================================================
  // Grid & slab dimensions
  // ============================================================
  const GW = 54;          // grid width  (tiles)
  const GH = 34;          // grid height (tiles)

  // Surgical suite padding (recessed operating theater)
  const PAD = {
    x: 7,
    y: 13,
    w: 10,
    h: 10
  };

  // ============================================================
  // Route utilities -- linear interpolation along polyline
  // ============================================================
  function makeRoute(waypoints) {
    const pts = waypoints.map(w => ({ x: w[0], y: w[1] }));
    const segs = [];
    let total = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = pts[i];
      const b = pts[i + 1];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const len = Math.hypot(dx, dy);
      segs.push({ a, b, dx, dy, len, ux: dx / len, uy: dy / len, start: total });
      total += len;
    }
    const cum = segs.map(s => s.start);
    return {
      pts,
      segs,
      total,
      cum,
      // distance along route -> {x,y,angle}
      at(d) {
        d = Math.max(0, Math.min(total, d));
        let i = segs.findIndex(s => s.start + s.len >= d);
        if (i < 0) i = segs.length - 1;
        const s = segs[i];
        const t = d - s.start;
        return {
          x: s.a.x + s.ux * t,
          y: s.a.y + s.uy * t,
          angle: Math.atan2(s.uy, s.ux)
        };
      },
      distanceAt(x, y) {
        let nearest = 0;
        let best = Infinity;
        for (const seg of segs) {
          const len2 = seg.len * seg.len;
          const t = Math.max(0, Math.min(1, ((x - seg.a.x) * seg.dx + (y - seg.a.y) * seg.dy) / len2));
          const px = seg.a.x + seg.dx * t;
          const py = seg.a.y + seg.dy * t;
          const distance = Math.hypot(x - px, y - py);
          if (distance < best) {
            best = distance;
            nearest = seg.start + seg.len * t;
          }
        }
        return nearest;
      }
    };
  }

  // ============================================================
  // MAIN conveyor route -- 20+ waypoints through the facility
  // Flow: Isolation -> Culture -> Fabrication -> QA -> Implantation -> Surgical Suite
  // ============================================================
  const MAIN = makeRoute([
    // Entry & Cell Isolation
    [4, 28],   // loading dock entry
    [8, 28],
    [12, 28],  // Station 1: Tissue Procurement
    [16, 28],
    [20, 28],  // Station 2: Enzymatic Digestion
    [24, 28],
    [28, 28],  // Station 3: Cell Isolation & Filtration
    [32, 28],
    
    // Turn toward Culture Hall
    [34, 26],
    [34, 22],  // Station 4: Expansion Bioreactors
    [34, 18],
    [34, 14],  // Station 5: MSC Characterization
    [34, 10],
    
    // Turn toward Fabrication Wing
    [36, 8],
    [40, 8],   // Station 6: Scaffold Fabrication
    [44, 8],
    [48, 8],   // Station 7: Cell Seeding
    [52, 8],
    
    // Turn toward Maturation Bay
    [52, 12],
    [52, 16],  // Station 8: Perfusion Bioreactor
    [52, 20],
    [52, 24],  // Station 9: Mechanical Conditioning
    
    // Turn toward QA Corridor
    [50, 26],
    [46, 26],  // Station 10: Histology & Imaging
    [42, 26],
    [38, 26],  // Station 11: Mechanical Testing
    [34, 26],
    
    // Turn toward Sterile Corridor
    [32, 26],
    [28, 26],  // Station 12: Sterility Testing
    [24, 26],
    [20, 26],  // Station 13: Release & Packaging
    
    // Turn toward Implantation Theater
    [18, 24],
    [16, 22],  // Station 14: Pre-op Staging
    [14, 20],
    
    // Surgical Suite (recessed pad)
    [12, 18],  // Station 15: Surgical Implantation
    [10, 16],
    [8, 14]    // exit to recovery
  ]);

  // ============================================================
  // Station stop definitions -- dwell time & read timing
  // ============================================================
  const STOPS = [
    { id: 'procurement',       at: 12,  dwell: 2.5, read: 0 },
    { id: 'digestion',         at: 20,  dwell: 2.5, read: 0 },
    { id: 'isolation',         at: 28,  dwell: 2.5, read: 0 },
    { id: 'expansion',         at: 38,  dwell: 3.0, read: 0 },
    { id: 'characterization',  at: 50,  dwell: 3.0, read: 0 },
    { id: 'scaffold',          at: 62,  dwell: 3.0, read: 0 },
    { id: 'seeding',           at: 74,  dwell: 3.0, read: 0 },
    { id: 'perfusion',         at: 90,  dwell: 3.5, read: 0 },
    { id: 'conditioning',      at: 102, dwell: 3.5, read: 0 },
    { id: 'histology',         at: 114, dwell: 3.0, read: 0 },
    { id: 'mechanical_test',   at: 126, dwell: 3.0, read: 0 },
    { id: 'sterility',         at: 138, dwell: 3.0, read: 0 },
    { id: 'release',           at: 150, dwell: 2.5, read: 0 },
    { id: 'preop',             at: 162, dwell: 2.5, read: 0 },
    { id: 'implantation',      at: 172, dwell: 4.0, read: 0 }
  ];

  // Populate read timing after STATIONS is defined
  function computeReadTimes() {
    STOPS.forEach(s => {
      const st = STATIONS.find(stn => stn.id === s.id);
      if (st) s.read = readSeconds(st.id);
    });
  }

  // ============================================================
  // Color Palette -- Dark industrial aesthetic
  // ============================================================
  const C = {
    // Floor & structure
    concrete:    '#2a2e33',  // slab base
    concreteHi:  '#363b42',  // slab highlight
    concreteLo:  '#1e2125',  // slab shadow
    steel:       '#4a525a',  // structural steel
    steelHi:     '#5a646e',
    steelLo:     '#3a4047',
    rebar:       '#2d3238',
    
    // Hazard & safety
    hazard:      '#d94a2b',  // hazard orange
    hazardHi:    '#e86c4a',
    hazardLo:    '#a83820',
    hazardBand:  '#1a1c1f',  // hazard banding dark
    safetyYellow:'#f0c808',  // safety yellow
    safetyYelHi: '#f5d440',
    safetyYelLo: '#b89606',
    
    // Copper/amber accents (warm industrial)
    copper:      '#b87333',
    copperHi:    '#cd8c4a',
    copperLo:    '#8a5526',
    amber:       '#d4a01e',
    amberHi:     '#e8b840',
    amberLo:     '#9e7816',
    
    // Station phase colors
    phaseIsolation:  '#3a7ca5',  // cool blue - cell isolation
    phaseCulture:    '#2e8b57',  // green - cell culture
    phaseFabrication:'#c0504d',  // warm red - fabrication
    phaseQA:         '#8064a2',  // purple - quality assurance
    phaseImplant:    '#d48806',  // gold - implantation
    
    // Biological
    cellPink:    '#e8a8b8',
    cellPinkHi:  '#f0c0d0',
    cellPinkLo:  '#c88898',
    mediaRed:    '#c83838',
    mediaRedHi:  '#d85858',
    mediaRedLo:  '#a02828',
    scaffoldWht: '#e8e8e0',
    scaffoldWhtHi:'#f0f0e8',
    scaffoldWhtLo:'#c8c8c0',
    
    // UI
    text:        '#e8e4dc',
    textDim:     '#9a948c',
    panelBg:     'rgba(22,24,26,0.92)',
    panelBorder: '#3a3f46',
    
    // Glow
    glowAmber:   'rgba(212,160,30,0.35)',
    glowBlue:    'rgba(58,124,165,0.35)',
    glowGreen:   'rgba(46,139,87,0.35)',
    glowRed:     'rgba(192,80,77,0.35)',
    
    // Belt
    beltRubber:  '#1a1c1f',
    beltRubberHi:'#2a2d32',
    beltRubberLo:'#0f1012',
    beltArrow:   '#f0c808',

    // Aliases for render.js compatibility (rocket-engine color names)
    dirt:         '#1a1c1f',
    concreteEdge: '#363b42',
    hazardAlt:    '#e86c4a',
    walkway:      '#2a2d32',
    walkwayEdge:  '#1a1c1f',
    surgicalPad:  '#2e8b57',
    surgicalPadEdge: '#226b40',
    belt:         '#1a1c1f',
    beltEdge:     '#2a2d32',
    beltItem:     '#4cc9f0',
    feederBelt:   '#1a2a1a',
    feederEdge:   '#334433',
    feederArrow:  '#7ee081',
    feederItem:   '#7ee081',
    stationBase:  '#2a2e33',
    stationBaseEdge: '#1e2125',
    stationEdge:  '#1e2125',
    stationRoof:  '#1a1a2a',
    stationRoofEdge: '#0f0f1a',
    activeLight:  '#7ee081',
    completeLight: '#4cc9f0',
    idleLight:    '#666',
    progressRing: '#f0c808',
    pallet:       '#3a3020',
    palletEdge:   '#2a2010',
    scaffold:     '#8b7d6b',
    cells:        '#e8a8b8',
    ecm:          '#a8d0a8',
    bioreactor:   '#4a5a7a',
    construct:    '#f0c808',
    surgicalTable: '#2a2a3a',
    surgicalTableEdge: '#1a1a2a',
    implant:      '#d48806',
    implantEdge:  '#b87005',
    surgicalArm:  '#888',
    surgicalTool: '#aaa',
  };


  // ============================================================
  // Station Definitions -- 15 stations with educational content
  // ============================================================
  const STATIONS = [
    // PHASE 1: CELL ISOLATION (Blue)
    {
      id: 'procurement',
      name: 'Tissue Procurement',
      x: 12, y: 28,
      r: 2.2,
      color: C.phaseIsolation,
      phase: 'isolation',
      tag: 'STERILE FIELD',
      short: 'Aseptic harvest of donor tissue under BSC Class II.',
      body: [
        'Tissue procurement is the critical first step -- everything downstream depends on the quality of the starting material.',
        'Performed in a Class II biosafety cabinet (BSC) under ISO 5 conditions. The BSC protects both the operator (inward airflow) and the tissue (HEPA-filtered downflow).',
        'Key parameters: cold ischemia as short as possible (organ-dependent — hearts/lungs ~6 h, livers up to ~24 h); example transport is chilled DMEM + antibiotics (pen/strep/gentamicin + amphotericin B); donor screening for infectious disease markers (HIV, HBV, HCV, syphilis) per 21 CFR 1271.',
        'Tissue is rinsed 3x in sterile PBS + antibiotic cocktail before transfer to digestion station.'
      ]
    },
    {
      id: 'digestion',
      name: 'Enzymatic Digestion',
      x: 20, y: 28,
      r: 2.2,
      color: C.phaseIsolation,
      phase: 'isolation',
      tag: 'ENZYME REACTOR',
      short: 'Collagenase/dispase digestion to liberate cells from ECM.',
      body: [
        'Enzymatic digestion breaks down the extracellular matrix (ECM) to release viable single cells.',
        'Standard cocktail: Collagenase Type I/II (1-2 mg/mL) + Dispase (2-4 U/mL) in DMEM/F12. Collagenase cleaves native collagen; Dispase (a neutral protease) cleaves fibronectin and collagen IV at the basement membrane.',
        'Incubation: 37 C, 30-90 min with gentle agitation. Over-digestion damages surface receptors (integrins, CD markers) -- monitor viability with trypan blue every 15 min.',
        'Quench with 10% FBS/DMEM (serum inhibits proteases). Filter through 70 um cell strainer to remove undigested fragments.'
      ]
    },
    {
      id: 'isolation',
      name: 'Cell Isolation & Filtration',
      x: 28, y: 28,
      r: 2.2,
      color: C.phaseIsolation,
      phase: 'isolation',
      tag: 'FILTRATION',
      short: 'Density gradient + strainer to isolate target cell population.',
      body: [
        'Crude digest contains fibroblasts, endothelial cells, immune cells, and target progenitors. Isolation enriches the desired population.',
        'Density gradient centrifugation (Ficoll-Paque, 1.077 g/mL) separates mononuclear cells (lymphocytes, MSCs) from granulocytes/erythrocytes. MSCs adhere to plastic -- the simplest enrichment.',
        'Alternative: Magnetic-activated cell sorting (MACS) or fluorescence-activated cell sorting (FACS) for CD markers (CD105+, CD73+, CD90+, CD45- per ISCT criteria).',
        'Final filtration through 40 um strainer ensures single-cell suspension for culture seeding. Count & viability check (trypan blue) before transfer to expansion bioreactors.'
      ]
    },

    // PHASE 2: CELL CULTURE & EXPANSION (Green)
    {
      id: 'expansion',
      name: 'Expansion Bioreactors',
      x: 34, y: 22,
      r: 2.5,
      color: C.phaseCulture,
      phase: 'culture',
      tag: 'PERFUSION BIOREACTOR',
      short: 'Automated hollow-fiber bioreactors for MSC expansion to clinical scale.',
      body: [
        'Traditional T-flasks don\'t scale -- hollow-fiber perfusion bioreactors achieve 10^9 cells in a single cartridge (vs. 10^7 per T-175).',
        'Hollow-fiber cartridge: extracapillary space (ECS) for cells, intracapillary space (ICS) for media perfusion. Nutrients diffuse across semi-permeable fibers (MWCO 10-30 kDa); waste diffuses out. No shear stress on cells.',
        'Perfusion rate: 20-50 mL/day per 10^8 cells. Glucose/lactate monitored inline; media refreshed automatically. pH controlled via CO2 overlay on ICS.',
        'Typical expansion: P0 to P3 in 7-10 days (~4-6 population doublings, 20-40-fold expansion; MSCs senesce after ~15-40 doublings lifetime, so banks are planned, not passaged indefinitely). Harvest by enzymatic detachment (Accutase preferred over trypsin to preserve surface epitopes).',
        'Advantages: closed system (reduced contamination), lower media consumption, real-time metabolic monitoring, GMP-compatible.'
      ]
    },
    {
      id: 'characterization',
      name: 'MSC Characterization',
      x: 34, y: 14,
      r: 2.2,
      color: C.phaseCulture,
      phase: 'culture',
      tag: 'FLOW CYTOMETRY',
      short: 'ISCT minimal criteria verification + potency assay.',
      body: [
        'Every MSC lot must meet ISCT minimal criteria (Dominici et al., 2006) before release for fabrication.',
        '1. Plastic adherence: >95% attach to tissue-culture plastic within 24h.',
        '2. Surface markers (flow cytometry): >=95% positive for CD105 (endoglin), CD73 (5\'-nucleotidase), CD90 (Thy-1); <2% positive for CD45, CD34, CD14/CD11b, CD79a/CD19, HLA-DR.',
        '3. Trilineage differentiation: demonstrated osteogenic (Alizarin Red), adipogenic (Oil Red O), chondrogenic (Alcian Blue) potential in vitro.',
        'Potency assay (beyond ISCT): IDO activity (immunosuppression), PGE2 secretion, T-cell suppression assay -- correlates with clinical efficacy.',
        'Sterility: mycoplasma PCR (negative), endotoxin by USP <85> bacterial endotoxins test with a dose-calculated K/M limit (K = 5 EU/kg — not a flat EU/mL number), bioburden (negative). Karyotype (G-banding, ≥20 metaphases) for extensively passaged banks — Dominici 2006 explicitly does not recommend it for routine MSC identification.'
      ]
    },

    // PHASE 3: FABRICATION (Red)
    {
      id: 'scaffold',
      name: 'Scaffold Fabrication',
      x: 40, y: 8,
      r: 2.5,
      color: C.phaseFabrication,
      phase: 'fabrication',
      tag: 'ELECTROSPIN / 3D PRINT',
      short: 'PCL/gelatin electrospun scaffolds or PLGA 3D-printed constructs.',
      body: [
        'Scaffolds provide 3D architecture for cell attachment, proliferation, and tissue formation. Material choice defines degradation rate, mechanics, and bioactivity.',
        'Example electrospin: PCL (polycaprolactone) + gelatin (80/20) spun at 15-20 kV, 1 mL/h, 15 cm tip-to-collector. Fiber diameter 300-800 nm mimics native ECM. Gelatin improves cell adhesion (RGD motifs) but requires crosslinking (EDC/NHS or genipin).',
        'Example extrusion print: PLGA or PCL printed at 85-110 C, 0.2-0.4 mm strand diameter, 300-500 um pore size. Allows patient-specific geometry from CT/MRI.',
        'Sterilization: 70% EtOH soak 30 min -> PBS rinse x3 -> UV 30 min/side. For GMP: gamma irradiation (25 kGy) or ethylene oxide.',
        'Mechanical target: 0.5-2 MPa tensile modulus (matches early neo-tissue); degradation 6-12 months (PCL) / 3-6 months (PLGA).'
      ]
    },
    {
      id: 'seeding',
      name: 'Cell Seeding',
      x: 48, y: 8,
      r: 2.2,
      color: C.phaseFabrication,
      phase: 'fabrication',
      tag: 'STATIC / DYNAMIC',
      short: 'Dynamic seeding in spinner flask -> uniform distribution, high efficiency.',
      body: [
        'Static seeding (pipetting cells onto scaffold) achieves only 10-30% efficiency with poor penetration. Dynamic seeding is standard for clinical constructs.',
        'Example dynamic seeding: scaffold + 10-20x10^6 cells in 50 mL media, 40-60 rpm, 4-24h. Centrifugal force drives cells into pores; media perfusion enhances nutrient exchange.',
        'Seeding density: 20-50x10^6 cells/cm^3 scaffold volume. Viability post-seeding >85% (calcein-AM/PI).',
        'Post-seed: 2-4h static incubation in BSC for attachment, then transfer to perfusion bioreactor. Media: alpha-MEM + 10% FBS + ascorbate-2-phosphate (50 ug/mL) for early matrix deposition.',
        'Real-time monitoring: inline glucose/lactate sensors track metabolic activity as proxy for cell engagement.'
      ]
    },

    // PHASE 4: MATURATION & CONDITIONING (Red)
    {
      id: 'perfusion',
      name: 'Perfusion Bioreactor',
      x: 52, y: 16,
      r: 2.5,
      color: C.phaseFabrication,
      phase: 'fabrication',
      tag: 'PERFUSION CULTURE',
      short: '21-day perfusion culture with osteogenic/chondrogenic media.',
      body: [
        'Perfusion bioreactors provide convective transport -- nutrients in, waste out -- enabling thick (>2 mm) constructs impossible in static culture.',
        'Direct perfusion: media pumped through scaffold interstitial pores at 0.5-2 mL/min. Shear stress (0.001-0.01 Pa) enhances osteogenic differentiation via MAPK/ERK and Wnt/beta-catenin pathways.',
        'Example media — osteogenic (DMEM + 10% FBS + 10 nM dexamethasone + 50 ug/mL ascorbate-2-P + 10 mM beta-glycerophosphate) or chondrogenic (DMEM + 1% ITS+ + 10 ng/mL TGF-beta3 + 100 nM dexamethasone). Titrate per line.',
        'Example 21-day run: weekly media analysis (glucose, lactate, pH, ALP activity). Construct swells 20-40% as ECM deposits.',
        'Outlet sampling for glycosaminoglycan (GAG, DMMB assay) and calcium (o-cresolphthalein) quantification -- non-destructive quality tracking.'
      ]
    },
    {
      id: 'conditioning',
      name: 'Mechanical Conditioning',
      x: 52, y: 24,
      r: 2.2,
      color: C.phaseFabrication,
      phase: 'fabrication',
      tag: 'BIAXIAL LOADING',
      short: 'Cyclic mechanical loading to mature neo-tissue mechanics.',
      body: [
        'Mechanical stimulation drives tissue maturation -- Wolff\'s law in a bioreactor. Biaxial or uniaxial cyclic loading aligns collagen, increases modulus 3-5x.',
        'Example regime (validate per construct): 0.5-1 Hz, 5-10% strain, 1h/day x 14 days (post-perfusion). Strain magnitude calibrated to construct stiffness (target 5-15% of failure strain).',
        'Loading system: custom bioreactor with linear actuators, load cell feedback, sterile chamber. Non-contact optical strain measurement (digital image correlation).',
        'Outcomes: collagen I alignment (SHG imaging), increased GAG retention, modulus rising toward engineered-bone targets (0.1-0.5 GPa, trabecular range — native cortical bone is ~10-30 GPa) or cartilage (0.5-1 MPa aggregate).',
        'Critical: avoid overloading -- microdamage triggers catabolic signaling (MMP upregulation). Ramp protocol: 2% -> 5% -> 10% over first week.'
      ]
    },

    // PHASE 5: QUALITY ASSURANCE (Purple)
    {
      id: 'histology',
      name: 'Histology & Imaging',
      x: 46, y: 26,
      r: 2.2,
      color: C.phaseQA,
      phase: 'qa',
      tag: 'MICRO-CT / H&E',
      short: 'Non-destructive micro-CT + destructive histology validation.',
      body: [
        'QA requires both non-destructive (release) and destructive (validation) assays.',
        'Micro-CT (10-20 um voxel): 3D architecture -- pore interconnectivity, mineral density (mg HA/cm^3), trabecular thickness/number. Non-destructive; construct proceeds to release.',
        'Destructive (sacrificial constructs): H&E (cellularity), Masson\'s Trichrome (collagen), Safranin-O/Fast Green (GAG), Immunohistochemistry (collagen I/II, osteocalcin, RUNX2).',
        'Quantitative histomorphometry: bone volume/total volume (BV/TV), osteoid surface, cellular density. Correlate with micro-CT for validation.',
        'Example product release criteria (set per product, not compendial): BV/TV > 15% (bone), GAG/DNA > 5% (cartilage), viable cell density > 5x10^6 cells/mL construct.'
      ]
    },
    {
      id: 'mechanical_test',
      name: 'Mechanical Testing',
      x: 38, y: 26,
      r: 2.2,
      color: C.phaseQA,
      phase: 'qa',
      tag: 'COMPRESSION TEST',
      short: 'Uniaxial compression to failure -- modulus & yield strength.',
      body: [
        'Mechanical competence is a release criterion for load-bearing constructs.',
        'Uniaxial compression: 1%/s strain rate to 70% strain or failure. Hydrated constructs tested in PBS at 37 C.',
        'Key metrics: elastic modulus (linear region 5-15% strain), yield strength (0.2% offset), ultimate strength, toughness (area under curve).',
        'Target ranges for porous engineered constructs (far below native cortical bone at ~15-20 GPa): bone constructs 100-500 MPa modulus; cartilage 0.3-1 MPa aggregate modulus.',
        'Correlate with micro-CT density (rho) -- modulus proportional to rho^2 (Gibson-Ashby foam model). Non-destructive micro-CT can predict mechanical properties for release.',
        'Example lot rule (per SOP, not universal): at least 3 sacrificial constructs per lot tested; lot passes if mean modulus > lower 95% CI of target.'
      ]
    },
    {
      id: 'sterility',
      name: 'Sterility Testing',
      x: 28, y: 26,
      r: 2.2,
      color: C.phaseQA,
      phase: 'qa',
      tag: 'USP <71>',
      short: '14-day USP <71> sterility + endotoxin + mycoplasma PCR.',
      body: [
        'Sterility assurance is a regulatory requirement (21 CFR 1271, USP <71>, EP 2.6.1).',
        'USP <71> sterility test: 14-day incubation in fluid thioglycollate medium (anaerobes/aerobes) + soybean-casein digest (fungi). Example sampling: 1 mL per 10 mL construct equivalent. Negative controls required.',
        'Endotoxin by bacterial endotoxins test (USP <85>, LAL kinetic chromogenic/turbidimetric or gel-clot): the limit is dose-calculated as K/M with K = 5 EU/kg — there is no universal EU/mL number. (USP <151> is the rabbit pyrogen test, a different assay.) Test construct rinse + media supernatant.',
        'Mycoplasma: PCR-based (FDA-approved kit), limit of detection 10 CFU/mL. Negative result required -- mycoplasma alters cell behavior irreparably.',
        'Environmental monitoring: ISO 5 (Class 100) at critical points, ISO 7 (Class 10,000) in background. Particle counts, viable air/surface sampling per shift.',
        'Rapid sterility (ATP bioluminescence, flow cytometry) under investigation for 24h release -- not yet compendial.'
      ]
    },
    {
      id: 'release',
      name: 'Release & Packaging',
      x: 20, y: 26,
      r: 2.2,
      color: C.phaseQA,
      phase: 'qa',
      tag: 'FINAL RELEASE',
      short: 'Certificate of Analysis + sterile double-pouch packaging.',
      body: [
        'Final release requires QP (Qualified Person) sign-off on a Certificate of Analysis (CoA). An example product CoA includes: identity (STR profile), purity (flow markers), potency (assay), sterility, endotoxin, mycoplasma, viability, cell dose, mechanical properties, karyotype.',
        'Packaging: primary sterile pouch (Tyvek/polyethylene — both withstand gamma/EtO), secondary pouch, rigid outer container. Labels: product name, lot #, expiry, storage, handling warnings.',
        'Cold chain: product-specific validated shipper (e.g. 2-8 C for 48h fresh, or -150 C cryopreserved). Temperature logger included.',
        'Chain of identity: barcode/QR on each pouch links to electronic batch record. 21 CFR 11 compliant audit trail.'
      ]
    },

    // PHASE 6: IMPLANTATION (Gold)
    {
      id: 'preop',
      name: 'Pre-op Staging',
      x: 16, y: 22,
      r: 2.0,
      color: C.phaseImplant,
      phase: 'implant',
      tag: 'OR PREP',
      short: 'Thaw/rinse construct, verify identity, load delivery system.',
      body: [
        'Pre-op staging bridges GMP manufacturing and clinical delivery.',
        'Cryopreserved construct (example SOP — validate per product): rapid thaw 37 C water bath (<2 min), dilute DMSO stepwise (12% -> 6% -> 0% in media + 10% human albumin) over 10 min to minimize osmotic shock.',
        'Identity verification: barcode scan matches patient ID, surgical plan, and CoA. Two-person independent check.',
        'Rinse: 3x sterile saline + 5% human albumin to remove residual DMSO. Viability spot-check (trypan blue) -- must be >70%.',
        'Load into delivery device: syringe (injectable), arthroscopic inserter (solid), or custom deployment system. Maintain sterile field throughout.',
        'Time from thaw to implantation: < 4h (viability window).'
      ]
    },
    {
      id: 'implantation',
      name: 'Surgical Implantation',
      x: 12, y: 18,
      r: 2.5,
      color: C.phaseImplant,
      phase: 'implant',
      tag: 'OR THEATER',
      short: 'Arthroscopic/open implantation with fixation & imaging confirm.',
      body: [
        'The culmination: living construct meets patient. Procedure varies by indication.',
        'Bone defect (critical-size): open approach, defect debridement to bleeding bone, construct press-fit or screw-fixed. Periosteum closure if possible. Intra-op fluoroscopy/O-arm confirms position.',
        'Cartilage: distinguish three procedures that share a membrane. First-generation ACI (autologous chondrocyte implantation) covers expanded cells with a sutured periosteal patch. MACI (matrix-induced ACI, e.g. autologous cells on porcine collagen membrane, FDA 2016) eliminates the periosteum — membrane plus fibrin glue (Tisseel) fixation, bed debrided to but not through the subchondral plate. AMIC (autologous matrix-induced chondrogenesis) pairs microfracture bleeding with a covering membrane in one step. Do not mix them: periosteum = ACI, fibrin-glued membrane without microfracture = MACI, microfracture plus membrane = AMIC.',
        'Post-op rehab is protocol-specific (e.g. CPM 0-30 deg several hours/day for weeks for cartilage; non-weight-bearing 6-8 weeks for bone).',
        'Follow-up is institution-scheduled (e.g. MRI at intervals with MOAKS scoring, patient-reported outcomes such as KOOS/IKDC, serum biomarkers COMP/CTX-II).',
        'Registry entry follows the regulatory pathway (e.g. ATMP tracking in the EU, CBER tracking in the US). Long-term safety follow-up is pathway-specific: the well-known 15-year observation rule is FDA long-term follow-up guidance for integrating-vector gene therapies, not a blanket rule for bone/cartilage constructs.'
      ]
    }
  ];

  // ============================================================
  // Station order (sequence along MAIN route)
  // ============================================================
  const ORDER = STATIONS.map(s => s.id);

  // A level is a coherent learning chapter, not merely a color change on the floor.
  // type: build = construct visibly grows; verify = gates unlock, construct held;
  //        deliver = handoff to clinic. `watch` tells the learner what animation
  //        beat to look for so content and canvas stay in sync.
  const LEVELS = [
    { id: 'sourcing', number: 1, title: 'Cell Sourcing', type: 'build', objective: 'Turn donor tissue into a viable, enriched cell population.', intro: 'Every construct starts as someone else\'s tissue. This module is about rescue: harvest cleanly, free single cells, enrich the right ones.', watch: 'Watch the carrier gain its first pink cell pellet after Isolation, and Live Cells jump 0 → 500k.', stations: ['procurement', 'digestion', 'isolation'] },
    { id: 'culture', number: 2, title: 'Cell Culture', type: 'build', objective: 'Expand cells and confirm identity before manufacturing.', intro: 'Numbers then identity. Scale toward clinical dose in closed bioreactors, then prove the cells are what you claim.', watch: 'Watch Cells climb several-fold during Expansion (clinical hollow-fiber lines reach 10⁹; the sim shows the curve, not the full scale-up); Characterization changes nothing on the carrier — it is a verification gate.', stations: ['expansion', 'characterization'] },
    { id: 'fabrication', number: 3, title: 'Build the Construct', type: 'build', objective: 'Combine cells, scaffold, flow, and loading into living tissue.', intro: 'The core equation: cells + scaffold + signals. Scaffold appears, cells seed it, perfusion feeds it, loading matures it.', watch: 'Watch the white scaffold appear, pink cells coat it, then green ECM bulk grow as GAG / collagen / modulus climb.', stations: ['scaffold', 'seeding', 'perfusion', 'conditioning'] },
    { id: 'quality', number: 4, title: 'Quality and Release', type: 'verify', objective: 'Verify structure, mechanics, sterility, and final release.', intro: 'Nothing grows here on purpose. Each station is a gate: image it, crush sacrificial samples, prove sterility, sign the CoA.', watch: 'Watch the construct hold steady while gates unlock — scanner ring, test platens, sterile hold, parcel pack.', stations: ['histology', 'mechanical_test', 'sterility', 'release'] },
    { id: 'implantation', number: 5, title: 'Clinical Delivery', type: 'deliver', objective: 'Prepare the construct and complete the clinical handoff.', intro: 'From GMP line to operating theater: thaw safely, verify identity twice, dock the construct with the patient.', watch: 'Watch the carrier travel to the gold surgical pad and dock — the run completes on implantation.', stations: ['preop', 'implantation'] }
  ];
  LEVELS.forEach(level => level.stations.forEach(id => {
    const station = STATIONS.find(item => item.id === id);
    if (station) { station.level = level.number; station.levelTitle = level.title; }
  }));

  // Module exit checks: 2 questions per module, drawn from the station
  // bodies. Non-blocking (the pipeline always advances); scores are recorded
  // in Sim.state.quiz and summarized on the lot record. answer = index into
  // choices.
  const QUIZ = {
    sourcing: [
      { q: 'Why keep cold ischemia time under ~24 h?', choices: ['Cold damages the BSC filters', 'Cell viability and sterility decay with every hour', 'DMEM freezes below room temperature'], answer: 1, explain: 'Starting-material quality bounds everything downstream — time warm is viability lost.' },
      { q: 'Which marker panel supports an MSC identity claim?', choices: ['CD105+/CD73+/CD90+, CD45−', 'CD45+/CD34+, CD90−', 'HLA-DR high, CD19 high'], answer: 0, explain: 'ISCT: ≥95% CD105/CD73/CD90, <2% hematopoietic/exclusion markers.' }
    ],
    culture: [
      { q: 'Why hollow-fiber perfusion over stacked T-flasks?', choices: ['It is cheaper per flask', 'Closed, shear-free scale-up with metabolic monitoring', 'It needs no media changes'], answer: 1, explain: 'ECS/ICS separation feeds 10⁹ cells without shear in a GMP-compatible closed loop.' },
      { q: 'A lot shows 8% CD45+. Release it?', choices: ['Yes — CD45 is an MSC marker', 'No — exclusion markers must be <2%', 'Yes if viability is high'], answer: 1, explain: 'ISCT exclusion panel ≥2% means hematopoietic contamination — gate fails.' }
    ],
    fabrication: [
      { q: 'An engineered construct is 4 mm thick with no flow. What happens?', choices: ['Core cells starve past ~100–200 µm', 'It matures faster in the core', 'Nothing — diffusion is unlimited'], answer: 0, explain: 'Oxygen penetration caps at ~100–200 µm; perfusion/convection is the engineering answer.' },
      { q: 'Scaffold degrades in 2 weeks but tissue needs 6 months. Result?', choices: ['Faster therapy', 'Collapse before neo-tissue bears load', 'Higher modulus'], answer: 1, explain: 'Degradation rate must match tissue formation — otherwise mechanics fail mid-course.' }
    ],
    quality: [
      { q: 'How long does a compendial USP <71> sterility test incubate?', choices: ['24 hours', '14 days', '1 hour'], answer: 1, explain: '14 days in thioglycollate + soybean-casein media; rapid methods are not yet compendial.' },
      { q: 'Modulus scales with micro-CT density (Gibson-Ashby) as…', choices: ['modulus ∝ density²', 'modulus ∝ 1/density', 'modulus is density-independent'], answer: 0, explain: 'Foam-model scaling lets non-destructive micro-CT predict sacrificial crush results.' }
    ],
    implantation: [
      { q: 'Thaw-to-implantation window for a cryopreserved construct?', choices: ['Under ~4 h with stepwise DMSO dilution', 'Up to a week on the bench', 'No limit once thawed'], answer: 0, explain: 'Rapid 37 °C thaw, dilute DMSO 12%→6%→0%, viability spot-check >70%.' },
      { q: 'Before loading the delivery device, you must…', choices: ['Match barcode to patient, plan, and CoA with a two-person check', 'Pool leftover constructs to top up the dose', 'Skip the rinse to save time'], answer: 0, explain: 'Chain of identity is the last gate — wrong construct to wrong patient is the catastrophic failure.' }
    ]
  };
  // build = construct grows (metrics move); verify = gates unlock (construct held);
  // prepare/deliver = staging beats (carrier state, not construct chemistry).
  // Per-station learning guide: role drives what the animation should do.
  // build = construct grows (metrics move); verify = gates unlock (construct held);
  // prepare/deliver = staging beats (carrier state, not construct chemistry).
  const GUIDE = {
    procurement:      { role: 'prepare', takeaway: 'Quality in = quality out: cold ischemia + donor screening decide everything downstream.', watch: 'Pallet arrives empty — tissue enters. No cell count yet.' },
    digestion:        { role: 'prepare', takeaway: 'Enzymes free cells from ECM; over-digestion strips the receptors you need later.', watch: 'No count change — viability is the hidden variable here.' },
    isolation:        { role: 'build', takeaway: 'Enrichment (adherence / MACS / FACS) plus ISCT markers define the MSC population.', watch: 'Live Cells jumps 0 → 500k; pink pellet appears on the carrier.' },
    expansion:        { role: 'build', takeaway: 'Hollow-fiber perfusion scales toward 10⁹ cells with no shear on the cells.', watch: 'Cell count climbs several-fold on the growth curve; the carrier pellet grows.' },
    characterization: { role: 'verify', takeaway: 'ISCT criteria + potency + sterility gate everything before manufacturing.', watch: 'Construct unchanged by design — this station verifies. Read the checklist.' },
    scaffold:         { role: 'build', takeaway: 'Material choice sets degradation rate, mechanics, and bioactivity.', watch: 'White scaffold block appears on the carrier; modulus baseline 0.5 MPa.' },
    seeding:          { role: 'build', takeaway: 'Dynamic seeding beats pipetting ~10× on efficiency and penetration.', watch: 'Pink cells coat the scaffold; viability must stay >85%.' },
    perfusion:        { role: 'build', takeaway: 'Convection beats the ~100–200 µm diffusion limit — flow is the enabler.', watch: 'GAG +8, collagen +15; green ECM bulk appears on the carrier.' },
    conditioning:     { role: 'build', takeaway: 'Cyclic load aligns collagen and raises modulus 3–5×; ramp to avoid damage.', watch: 'GAG +12 more, modulus jumps; construct visibly bulks up.' },
    histology:        { role: 'verify', takeaway: 'Micro-CT releases the lot; destructive histology validates the process.', watch: 'Construct held — BV/TV and GAG/DNA gates unlock instead of growth.' },
    mechanical_test:  { role: 'verify', takeaway: 'Modulus ∝ density²; sacrificial crush tests predict release.', watch: 'Modulus line finalizes; lot passes on the lower 95% CI.' },
    sterility:        { role: 'verify', takeaway: 'USP <71> (14-day) + LAL + mycoplasma PCR; mycoplasma is silent and irreparable.', watch: 'Construct held under sterile quarantine — no growth, by design.' },
    release:          { role: 'verify', takeaway: 'QP signs the CoA; chain of identity plus validated cold chain.', watch: 'Parcel visuals pack the lot; construct frozen for handoff.' },
    preop:            { role: 'deliver', takeaway: 'Thaw fast, dilute DMSO stepwise, implant within ~4 h.', watch: 'Carrier enters the gold zone; viability spot-check must exceed 70%.' },
    implantation:     { role: 'deliver', takeaway: 'Fixation + imaging + registry; biology meets surgery, then 15 years of follow-up.', watch: 'Carrier docks on the surgical pad — the run completes here.' }
  };

  // ============================================================
  // Read-time estimation (seconds) based on word count
  // ~200 words/min reading speed + 1s base overhead
  // ============================================================
  function readSeconds(id) {
    const st = STATIONS.find(s => s.id === id);
    if (!st) return 8;
    const words = (st.short + ' ' + st.body.join(' ')).split(/\s+/).length;
    return Math.min(12, Math.max(6, Math.ceil(words / 200 * 60) + 1));
  }

  // Populate STOPS read times
  computeReadTimes();
  STOPS.forEach(stop => {
    const station = STATIONS.find(item => item.id === stop.id);
    if (station) stop.at = MAIN.distanceAt(station.x, station.y);
  });

  // ============================================================
  // Side feeders -- auxiliary conveyors feeding main line
  // ============================================================
  const FEEDERS = [
    { id: 'media_feed',      route: makeRoute([[6, 30], [10, 29], [12, 28]]),  from: 0, to: 12,  color: C.mediaRed,       item: 'media' },
    { id: 'enzyme_feed',     route: makeRoute([[6, 26], [14, 27], [20, 28]]),  from: 0, to: 20,  color: C.amber,          item: 'enzyme' },
    { id: 'scaffold_feed',   route: makeRoute([[44, 4], [44, 6], [40, 8]]),    from: 0, to: 62,  color: C.scaffoldWht,    item: 'scaffold' },
    { id: 'factor_feed',     route: makeRoute([[50, 4], [50, 10], [52, 16]]),  from: 0, to: 90,  color: C.phaseCulture,   item: 'factor' },
    { id: 'reagent_feed',    route: makeRoute([[22, 24], [24, 25], [28, 26]]),  from: 0, to: 138, color: C.copper,         item: 'reagent' },
    { id: 'implant_feed',    route: makeRoute([[4, 16], [8, 17], [12, 18]]),   from: 0, to: 172, color: C.phaseImplant,   item: 'instrument' }
  ];

  // ============================================================
  // Geometry helpers
  // ============================================================
  function distToSegment(px, py, ax, ay, bx, by) {
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    if (len2 === 0) return Math.hypot(px - ax, py - ay);
    let t = ((px - ax) * dx + (py - ay) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx;
    const cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }

  function distToRoute(px, py, route) {
    let best = Infinity;
    for (const s of route.segs) {
      const d = distToSegment(px, py, s.a.x, s.a.y, s.b.x, s.b.y);
      if (d < best) best = d;
    }
    return best;
  }

  // ============================================================
  // Expose on window
  // ============================================================
  window.Factory = {
    GW,
    GH,
    PAD,
    MAIN,
    STOPS,
    STATIONS,
    ORDER,
    LEVELS,
    GUIDE,
    QUIZ,
    C,
    Palette: C,   // render.js consumes F.Palette
    readSeconds,
    distToSegment,
    distToRoute,
    makeRoute
  };

})();
