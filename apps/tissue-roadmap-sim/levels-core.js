/* TERM Lab Park — levels-core.js
 * Levels 1-4 (Phase 0/1/2): cell biology, media, passage, contamination.
 * Pure data only. Loaded after render.js, before levels-eng.js.
 */
'use strict';

window.TERM_LEVELS_CORE = [
  {
    id: 'lvl-cell',
    title: 'Cell Biology Bootcamp',
    phase: 'Phase 0 · Bio 101 Refresher',
    accent: '#4cc9f0',
    simMode: 'idle',
    intro: {
      title: 'Meet your tiny tenants',
      body: [
        'Before you can grow tissue, you need to meet the workers: organelles, a nucleus, a membrane, and a plan for making proteins and making copies.',
        'Everything in the lab — the media you feed, the splits you perform, the contamination you dread — is biochemistry in a dish.',
      ],
      prompt: 'Watch the lab. Can you spot the moment a cell would commit to dividing?'
    },
    learn: [
      {
        title: 'The cell parts department',
        body: 'Nucleus holds the DNA, mitochondria make energy, ER and Golgi process proteins, and the cytoskeleton (actin, microtubules, intermediate filaments) gives the cell its shape and the ability to move. The plasma membrane is a phospholipid bilayer studded with proteins that control what goes in and out.'
      },
      {
        title: 'The central dogma',
        body: 'DNA is transcribed into mRNA, and mRNA is translated into protein. Controlling that flow — promoters, enhancers, transcription factors — is what “cloning” at every scale is really about: controlled gene expression at scale.'
      },
      {
        title: 'The cell cycle & cell death',
        body: 'Cells divide through G1, S, G2, and M, with checkpoints between phases (cyclins and CDKs drive the cycle). In the dish, cells die too: apoptosis is programmed suicide, while necrosis is messy, accidental death — and stress from passaging triggers both. Adhesion molecules like integrins anchor cells to surfaces, which is exactly why most culture is adherent culture.'
      }
    ],
    quiz: [
      {
        q: 'Which molecule carries the genetic message from DNA in the nucleus out to the ribosome?',
        options: ['mRNA', 'tRNA', 'rRNA', 'DNA polymerase'],
        answer: 0,
        explain: 'Transcription copies a gene into messenger RNA, which is then translated into protein at the ribosome — the central dogma.'
      },
      {
        q: 'A cell is stalled between G1 and S, refusing to commit to DNA replication. Which phase-gate is the cell\'s quality checkpoint?',
        options: ['The G1/S checkpoint', 'The G2/M checkpoint', 'The M checkpoint', 'The S-phase checkpoint'],
        answer: 0,
        explain: 'The G1/S checkpoint is the cell\'s “commit or rest” decision point — if conditions are bad, the cell backs out into G0 instead of entering S.'
      },
      {
        q: 'Cells in a dish that die messily, swelling and leaking their contents, are undergoing…',
        options: ['Necrosis', 'Apoptosis', 'Mitosis', 'Senescence'],
        answer: 0,
        explain: 'Necrosis is accidental, uncontrolled death with leakage and inflammation. Apoptosis is the tidy, programmed kind — and you can tell them apart at the bench.'
      },
      {
        q: 'Why do most lab cells insist on sticking to the bottom of the dish?',
        options: [
          'Integrins anchor them to surfaces — adhesion is the basis of adherent culture',
          'They are afraid of the liquid',
          'The plastic secretes growth factors',
          'Gravity pulls them down and they cannot swim'
        ],
        answer: 0,
        explain: 'Cells use adhesion molecules, especially integrins, to anchor to extracellular matrix and plastic surfaces. That anchoring is the whole basis of adherent culture.'
      }
    ],
    recap: [
      {
        objective: 'You can name the organelles and what each one does',
        detail: 'Nucleus (DNA), mitochondria (energy), ER/Golgi (protein processing), cytoskeleton (shape and movement), plasma membrane (selective barrier of phospholipids and proteins).'
      },
      {
        objective: 'You can sketch the central dogma from memory',
        detail: 'DNA → transcription → mRNA → translation → protein. Regulation happens via promoters, enhancers, transcription factors, and epigenetics.'
      },
      {
        objective: 'You can name the cell-cycle phases and one checkpoint in each',
        detail: 'G1, S, G2, M — driven by cyclins and CDKs. Key checkpoints include the G1/S (commit to replication), G2/M (commit to mitosis), and M (spindle attachment) checkpoints.'
      },
      {
        objective: 'You can tell apoptosis from necrosis and connect adhesion to adherent culture',
        detail: 'Apoptosis is controlled, tidy cell suicide; necrosis is messy, uncontrolled death. Integrins and cadherins mediate adhesion — and that anchoring to surfaces is why most culture is adherent.'
      }
    ],
    refs: [
      { label: 'Alberts et al., Molecular Biology of the Cell', url: 'https://www.ncbi.nlm.nih.gov/books/NBK26875/', note: 'the bible — chapters 1-7 first' },
      { label: 'Khan Academy Biology', url: 'https://www.khanacademy.org/science/biology', note: 'fastest refresh path' },
      { label: 'MIT OCW 7.01SC Fundamentals of Biology', url: 'https://ocw.mit.edu/courses/7-01sc-fundamentals-of-biology-fall-2011/', note: 'watch at 1.5x, take nothing' }
    ],
    milestone: 'You can sketch the central dogma and name a checkpoint in every cell-cycle phase.'
  },
  {
    id: 'lvl-media',
    title: 'Media & the Culture Environment',
    phase: 'Phase 2 · The Core Craft',
    accent: '#ff5d8f',
    simMode: 'feed',
    intro: {
      title: 'The cells look hungry!',
      body: [
        'DMEM is not just juice — it is a precisely balanced chemical system: defined salts, amino acids, vitamins, glucose, a buffer, and a pH indicator.',
        'Your job today: read the media, keep it dark, and keep that phenol red screaming healthy red, not acidic yellow.',
      ],
      prompt: 'Watch the lab. What happens to the media color as cells grow?'
    },
    learn: [
      {
        title: 'DMEM comes in two speeds',
        body: 'Low-glucose DMEM is the original 1959 formulation at 1 g/L; high-glucose DMEM is 4.5 g/L, about 25 mM — a real experimental variable that changes metabolism, glycosylation, and even apoptosis sensitivity.'
      },
      {
        title: 'Read the phenol red',
        body: 'Phenol red is the media mood ring: yellow at ~6.8 (acidic — overgrown or contaminated), orange ~7.0, red ~7.4 (healthy), pink/magenta above 8.2 (alkaline — leaky CO₂). It also has weak estrogenic activity, so omit it for estrogen-responsive systems like MCF-7 work.'
      },
      {
        title: 'Keep media in the dark',
        body: 'Riboflavin (vitamin B2) plus HEPES buffer are photoactive: ambient light generates H₂O₂, a cytotoxic oxidant (Zigler 1985). That is why media bottles are amber- or foil-wrapped. And glutamine is unstable in solution — GlutaMAX is the stable dipeptide for long-term cultures.'
      }
    ],
    quiz: [
      {
        q: 'High-glucose DMEM contains 4.5 g/L glucose, which is about…',
        options: ['25 mM', '5 mM', '100 mM', '1 mM'],
        answer: 0,
        explain: '4.5 g/L ≈ 25 mM. Low-glucose DMEM is the original 1 g/L formulation — so the two DMEMs are a real experimental variable.'
      },
      {
        q: 'Your media looks yellow. What is the most likely pH, and what does it mean?',
        options: [
          '~6.8 — acidic, overgrown or contaminated',
          '~7.4 — perfectly healthy',
          '~8.2 — too alkaline',
          '~7.0 — orange is normal, no worries'
        ],
        answer: 0,
        explain: 'Yellow means phenol red is seeing ~6.8: acidic, usually from overgrowth or contamination. Red (~7.4) is healthy; pink/magenta (>8.2) means alkaline.'
      },
      {
        q: 'The incubator runs 5% CO₂ at 37°C. Why?',
        options: [
          'CO₂ dissolves to carbonic acid and holds the bicarbonate buffer at pH ~7.4',
          'CO₂ feeds the cells directly',
          'It prevents evaporation',
          'It keeps the incubator door sealed'
        ],
        answer: 0,
        explain: 'CO₂/bicarbonate is the buffer pair: CO₂ dissolves to carbonic acid and holds pH near 7.4 at 37°C. That is why the default settings are 37°C, 5% CO₂, ~95% humidity.'
      },
      {
        q: 'Why does the media bottle wear an amber wrapper?',
        options: [
          'Riboflavin + HEPES are photoactive — light generates cytotoxic H₂O₂',
          'It looks cooler on the shelf',
          'It blocks UV from degrading the glucose',
          'It keeps the color from fading'
        ],
        answer: 0,
        explain: 'Zigler 1985 showed ambient light generates H₂O₂ from riboflavin and HEPES. Keep media dark. Glutamine also degrades in solution — hence GlutaMAX.'
      }
    ],
    recap: [
      {
        objective: 'You can explain why 5% CO₂ keeps pH at 7.4',
        detail: 'CO₂ dissolves to carbonic acid and holds the bicarbonate buffer at pH ~7.4 at 37°C. HEPES is the alternative buffer for open manipulation outside the incubator.'
      },
      {
        objective: 'You can read phenol red like a dashboard',
        detail: 'Yellow (~6.8) = acidic/overgrown/contaminated; orange (~7.0); red (~7.4) = healthy; pink/magenta (>8.2) = alkaline/leaky CO₂. Omit phenol red for estrogen-responsive systems (MCF-7).'
      },
      {
        objective: 'You can explain why media bottles are amber',
        detail: 'Riboflavin (B2) + HEPES are photoactive — light makes cytotoxic H₂O₂ (Zigler 1985). Osmolarity of high-glucose DMEM is typically 320-355 mOsm/kg, in the ~300-350 healthy range.'
      },
      {
        objective: 'You can name the difference between DMEM glucose formulations',
        detail: 'Low glucose = 1 g/L (original 1959); high glucose = 4.5 g/L ≈ 25 mM. Glutamine is unstable in solution; GlutaMAX is a stable dipeptide for long-term cultures.'
      }
    ],
    refs: [
      { label: 'Gibco Cell Culture Basics', url: 'https://www.thermofisher.com/us/en/home/references/gibco-cell-culture-basics.html', note: 'free handbook' },
      { label: 'Weiskirchen et al. (2023), A Beginner\'s Guide to Cell Culture, Cells 12(5):682', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10000895/', note: 'read cover to cover' },
      { label: 'GCCP 2.0 (Pamies et al., ALTEX 39(1):30-70, 2022)', url: 'https://www.altex.org/index.php/altex/article/view/2315', note: 'the field\'s official best-practice guidance' }
    ],
    milestone: 'You can read a media label like a pro.'
  },
  {
    id: 'lvl-passage',
    title: 'Passaging & the Growth Curve',
    phase: 'Phase 2 · The Core Craft',
    accent: '#7ee081',
    simMode: 'passage',
    intro: {
      title: 'Room to grow, please!',
      body: [
        'Cells in a flask follow a growth curve: lag, then log (exponential), then stationary. Your job as the park manager is to split them before they over-confluent themselves into a traffic jam.',
        'And when the flask gets crowded, it is time for the hemocytometer and the split.',
      ],
      prompt: 'Watch the lab. What happens after the flask reaches full confluence?'
    },
    learn: [
      {
        title: 'The growth curve',
        body: 'Growth runs lag → log (exponential) → stationary. Cells stop when they get crowded: contact inhibition and density limitation kick in — a normal, sane thing for primary cells to do, and a thing immortalized lines like HeLa ignores.'
      },
      {
        title: 'The split ratio',
        body: 'Standard practice is splitting 1:2 to 1:10, seeding roughly 10⁴–10⁵ cells/cm². Split ratios are not population doublings — passage number ≠ population doubling number, and the two are only loosely related.'
      },
      {
        title: 'The counting math',
        body: 'Hemocytometer math: cells/mL = average count per 4×4 grid × dilution factor × 10⁴. Trypan blue stains dead cells, which is how viable (live) cells are counted — live cells exclude the dye. Human fibroblasts senesce after about 40-60 doublings (Hayflick limit).'
      }
    ],
    quiz: [
      {
        q: 'A freshly thawed flask of cells sits quietly for a day, then starts doubling exponentially. What phase is the quiet day?',
        options: ['Lag phase', 'Log phase', 'Stationary phase', 'Death phase'],
        answer: 0,
        explain: 'Lag is the adjustment period before exponential (log) growth kicks in. Stationary is where growth plateaus — usually from confluence or nutrient limits.'
      },
      {
        q: 'Your hemocytometer reads an average of 50 cells per 4×4 grid, at a 1:10 dilution. What is the cell concentration?',
        options: ['5 × 10⁶ cells/mL', '5 × 10⁵ cells/mL', '5 × 10⁴ cells/mL', '500 cells/mL'],
        answer: 0,
        explain: 'cells/mL = count × dilution factor × 10⁴, so 50 × 10 × 10⁴ = 5 × 10⁶ cells/mL. The ×10⁴ is the hemocytometer constant.'
      },
      {
        q: 'You need to split a 90% confluent flask. Which is a standard split ratio?',
        options: ['1:2 to 1:10', '1:100 to 1:1000', '2:1 to 10:1', '1:1 exactly'],
        answer: 0,
        explain: 'Standard practice is 1:2 to 1:10, seeding about 10⁴–10⁵ cells/cm². Immortalized lines can take wider splits, but the routine range is 1:2-1:10.'
      },
      {
        q: 'In trypan blue counting, a cell that stays bright and clear is…',
        options: ['Alive — it excluded the dye', 'Dead — it absorbed the dye', 'In mitosis', 'A contaminant'],
        answer: 0,
        explain: 'Live cells have intact membranes and exclude trypan blue; dead cells take it up and look blue. That is the trypan blue viability trick.'
      }
    ],
    recap: [
      {
        objective: 'You can read a growth curve',
        detail: 'Lag → log (exponential) → stationary. Contact inhibition and density limitation stop growth at confluence — primary cells obey, immortalized lines often do not.'
      },
      {
        objective: 'You can do the hemocytometer math',
        detail: 'cells/mL = average count per 4×4 grid × dilution factor × 10⁴. Viability: trypan blue is excluded by live cells, taken up by dead ones.'
      },
      {
        objective: 'You can pick a split ratio',
        detail: 'Batch cultures are typically split 1:2 to 1:10, seeding ~10⁴–10⁵ cells/cm². Hayflick limit: primary human fibroblasts senesce after ~40-60 doublings.'
      },
      {
        objective: 'You understand what passaging actually is',
        detail: 'Trypsinization uses EDTA to chelate adhesion ions plus trypsin to cleave adhesion proteins — over-trypsinization kills cells and strips receptors. Passage number is not population doublings.'
      }
    ],
    refs: [
      { label: 'Freshney, Culture of Animal Cells', url: 'https://onlinelibrary.wiley.com/doi/book/10.1002/9780470649367', note: 'the classic culture manual' },
      { label: 'Corning Cell Culture Basics Handbook', url: 'https://www.corning.com/catalog/cls/documents/resources/Cell_Culture_Basics_Handbook.pdf', note: 'free handbook' },
      { label: 'ATCC Animal Cell Culture Guide', url: 'https://www.atcc.org/resources/culture-guides/animal-cell-culture-guide', note: 'free guide' }
    ],
    milestone: 'You can split a confluent flask and do the counting math in your head.'
  },
  {
    id: 'lvl-contam',
    title: 'Contamination & the Hood',
    phase: 'Phase 2 · The Core Craft',
    accent: '#b967ff',
    simMode: 'contamination',
    intro: {
      title: 'Something\'s growing that should not be',
      body: [
        'Contamination is a zoo, not a bug. Bacteria cloud media within hours, mycoplasma wrecks your data invisibly for weeks, and cross-contamination quietly turns “your” cells into someone else\'s HeLa.',
        'First rule of the bench: know your hood. The fume hood protects you from chemicals. The BSC protects you and your cells. The clean bench protects nothing but the product.',
      ],
      prompt: 'Watch the lab. What creeps in from the corner when the hood discipline slips?'
    },
    learn: [
      {
        title: 'Meet the contaminant zoo',
        body: 'Bacteria cloud the media and crash the pH within hours. Yeast makes pearly floaters. Fungi grow fuzzy. And mycoplasma is the silent one: ~0.15–0.3 µm, no cell wall, invisible under brightfield, resistant to penicillin/streptomycin, and it never clouds the media.'
      },
      {
        title: 'The HeLa problem',
        body: 'Cross-contamination between cell lines is the field\'s most embarrassing recurring disaster — HeLa took over the world\'s labs. That is why journals now demand authentication via STR profiling. ICLAC\'s Register (v14, Feb 2026) lists 608 problematic lines, and a meta-analysis estimated 8.6% of cell lines in the literature were on it.'
      },
      {
        title: 'Which hood, when',
        body: 'A Class II A2 biosafety cabinet (BSC) recirculates ~70% of its HEPA-filtered air and exhausts 30% — it protects you AND your culture, and it is where cell work happens. A chemical fume hood exhausts vapors away from you but provides no sterility — never do cell culture in one. A laminar-flow clean bench blows air at you: product-only protection, never with biohazards.'
      }
    ],
    quiz: [
      {
        q: 'Your media is cloudy and yellow within hours. Which contaminant is the usual suspect?',
        options: ['Bacteria', 'Mycoplasma', 'Yeast', 'Viruses'],
        answer: 0,
        explain: 'Bacteria cloud media and crash the pH within hours. Mycoplasma is the opposite: invisible, no clouding, wrecks data for weeks before you know.'
      },
      {
        q: 'Why does mycoplasma sail past your pen/strep?',
        options: [
          'It has no cell wall, and it is tiny (~0.15-0.3 µm)',
          'It is resistant to all antibiotics',
          'It hides inside the nucleus',
          'It is a virus'
        ],
        answer: 0,
        explain: 'Mycoplasma lacks a cell wall (the usual antibiotic target) and is tiny — ~0.15-0.3 µm — so it needs special detection: PCR kits or DAPI/Hoechst staining.'
      },
      {
        q: 'You are doing cell culture with a biohazardous line. Which device belongs on the bench?',
        options: [
          'A Class II A2 biosafety cabinet',
          'A chemical fume hood',
          'A laminar-flow clean bench',
          'A PCR hood'
        ],
        answer: 0,
        explain: 'The BSC A2 protects you and the culture with HEPA-filtered laminar flow and an inward air curtain. Fume hoods protect you from chemicals but guarantee contamination; clean benches protect only the product.'
      },
      {
        q: 'How does a lab prove its cells are actually its cells?',
        options: [
          'STR profiling, checked against ATCC and ICLAC databases',
          'Looking at them under the microscope',
          'Trusting the label on the freezer tube',
          'Growing them faster'
        ],
        answer: 0,
        explain: 'STR profiling authenticates human lines (SNP-based methods for animal lines) and is now journal-required. ICLAC\'s Register v14 lists 608 known-problematic lines.'
      }
    ],
    recap: [
      {
        objective: 'You can diagnose the contaminant zoo',
        detail: 'Bacteria: cloudy, pH crash within hours. Yeast: pearly floaters. Fungi: fuzzy. Mycoplasma: invisible, ~0.15-0.3 µm, no cell wall, pen/strep-resistant — detect via PCR or DAPI/Hoechst.'
      },
      {
        objective: 'You know why cell authentication matters',
        detail: 'HeLa famously cross-contaminated labs worldwide. STR profiling is journal-required; ICLAC Register v14 (Feb 2026) lists 608 lines; ~8.6% of lines in a meta-analysis were on the problematic list.'
      },
      {
        objective: 'You can pick the right hood',
        detail: 'BSC Class II A2: HEPA-filtered, ~70/30 recirculate/exhaust, protects you AND culture. Fume hood: chemicals only, no sterility. Clean bench: product only, never biohazards.'
      },
      {
        objective: 'You understand cell banking',
        detail: 'Master cell bank (MCB) → working cell bank (WCB); freeze early, freeze often, verify post-thaw. Treat-and-discard is often the honest choice for contaminated cultures.'
      }
    ],
    refs: [
      { label: 'Weiskirchen et al. (2023), A Beginner\'s Guide to Cell Culture, Cells 12(5):682', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10000895/', note: 'read cover to cover' },
      { label: 'ICLAC Register of Misidentified Cell Lines (v14)', url: 'https://iclac.org/databases/cross-contaminations/', note: '608 lines, v14 Feb 2026' },
      { label: 'CDC/NIH BMBL (Biosafety in Microbiological and Biomedical Laboratories)', url: 'https://www.cdc.gov/labs/pdf/CDC-BiosafetyMicrobiologicalBiomedicalLaboratories-2009-P.PDF', note: 'biosafety levels and BSC guidance' },
      { label: 'ATCC Animal Cell Culture Guide', url: 'https://www.atcc.org/resources/culture-guides/animal-cell-culture-guide', note: 'authenticated lines and culture basics' }
    ],
    milestone: 'You can name every creature in the contamination zoo and pick the right hood by heart.'
  }
];
