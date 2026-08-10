// levels-eng.js — TERM Lab Park, Phase 3/4 content (levels B1-B4)
// Plain data array; merged into TERM.LEVELS by levels.js.
window.TERM_LEVELS_ENG = [
  {
    id: 'lvl-stem',
    title: 'The Stem Cell Sweet Shop',
    phase: 'Phase 3 · Stem Cells & Tissue Engineering',
    accent: '#4cc9f0',
    simMode: 'visit',
    intro: {
      title: 'One cell to rule them all',
      body: [
        'Every tissue in your body started as a cell that could both copy itself and become something specialized. Stem cells hold that superpower — and the whole field of regenerative medicine hangs on controlling it.',
        'Induced pluripotent stem cells (iPSCs) made patient-matched cells practical without embryos, which is why the Yamanaka factors won the Nobel in 2012 and restructured the entire ethics debate.'
      ],
      prompt: 'Ride the potency escalator: toti → pluri → multi → uni. Which stop loses the most superpowers per floor?'
    },
    learn: [
      {
        title: 'The potency ladder',
        body: 'Potency hierarchy: totipotent → pluripotent → multipotent → unipotent. Totipotent cells can build an entire organism (plus placenta); pluripotent cells (ESCs, iPSCs) can make every cell type; multipotent cells (MSCs, HSCs) can make a family of related types; unipotent cells make just one.'
      },
      {
        title: 'The Yamanaka Four',
        body: 'Oct4, Sox2, Klf4, and c-Myc reprogram somatic cells back to pluripotency — the discovery that earned Shinya Yamanaka the 2012 Nobel Prize. Clinical-grade reprogramming is integration-free: Sendai virus, episomal plasmids, or mRNA deliver the factors without inserting into the genome. Retrovirus/lentivirus (integrating) versions are research-grade only.'
      },
      {
        title: 'What is an MSC, exactly?',
        body: 'MSC officially means mesenchymal stem/stromal cell. The ISCT minimal criteria (Dominici 2006) keep the label honest: plastic-adherent; ≥95% express CD105, CD73, CD90; <2% express CD45, CD34, CD14/CD11b, CD79α/CD19, HLA-DR; and must differentiate to osteoblasts, adipocytes, and chondroblasts in vitro.'
      }
    ],
    quiz: [
      {
        q: 'A cell that can become any cell type including placenta is...',
        options: ['Totipotent', 'Pluripotent', 'Multipotent', 'Unipotent'],
        answer: 0,
        explain: 'Only totipotent cells can build a whole organism plus extra-embryonic tissue. Pluripotent (ESCs/iPSCs) can make every body cell but no placenta.'
      },
      {
        q: 'Which quartet earned the 2012 Nobel for iPSC reprogramming?',
        options: ['Oct4, Sox2, Klf4, c-Myc', 'Oct4, Nanog, Rex1, c-Myc', 'Sox2, Klf4, Lin28, Nanog', 'Oct4, Sox2, Nanog, c-Myc'],
        answer: 0,
        explain: 'Yamanaka factors: Oct4, Sox2, Klf4, c-Myc. (The Thomson lab later used Oct4, Sox2, Nanog, Lin28 — a different recipe.)'
      },
      {
        q: 'Clinical-grade iPSC reprogramming must be...',
        options: ['Integration-free', 'Lentiviral', 'Retroviral', 'Feeder-dependent'],
        answer: 0,
        explain: 'Integration-free routes — Sendai virus, episomal plasmids, or mRNA — deliver the factors without genome insertion. Integrating retrovirus/lentivirus versions are research-grade only.'
      },
      {
        q: 'Per ISCT, an MSC must express CD105, CD73, and CD90 in at least...',
        options: ['95% of cells', '80% of cells', '50% of cells', '99% of cells'],
        answer: 0,
        explain: '≥95% expression of CD105, CD73, CD90, plus <2% for a panel of negative markers, plus trilineage differentiation (osteo, adipo, chondro).'
      }
    ],
    recap: [
      {
        objective: 'You can rank cells on the potency ladder',
        detail: 'Totipotent cells (zygote, early blastomeres) can form an entire organism and extra-embryonic membranes. Pluripotent cells — ESCs and iPSCs — can form all three germ layers and every somatic cell type but not placenta. Multipotent cells like MSCs and HSCs are restricted to a related family of lineages; unipotent cells produce a single differentiated output. The hierarchy matters clinically: pluripotency gives you the widest therapeutic menu but the hardest differentiation control.'
      },
      {
        objective: 'You can name the Yamanaka factors and why the Nobel mattered',
        detail: 'Oct4, Sox2, Klf4, and c-Myc reprogram somatic cells to induced pluripotency (2012 Nobel, Yamanaka). Because iPSCs can be patient-matched, they removed the embryo-destruction objection that had stalled ESC work and reshaped the ethics of regenerative medicine. For clinical use the factors must arrive integration-free — Sendai virus, episomal plasmids, or mRNA — because integrating retrovirus/lentivirus insertions carry mutagenesis risk.'
      },
      {
        objective: 'You can apply the ISCT minimal criteria like a reviewer',
        detail: 'The ISCT position statement (Dominici et al., Cytotherapy 2006) defines the MSC operationally: plastic adherence in standard culture; ≥95% positive for CD105, CD73, CD90; <2% positive for CD45, CD34, CD14 or CD11b, CD79α or CD19, and HLA-DR; and trilineage differentiation into osteoblasts, adipocytes, and chondroblasts in vitro. Without all four planks, calling something an MSC is marketing — a lesson that also explains the modern reading of MSC as mesenchymal stem/stromal cell.'
      }
    ],
    refs: [
      { label: 'Dominici et al. 2006, Cytotherapy 8(4):315-7', url: 'https://pubmed.ncbi.nlm.nih.gov/16923606/', note: 'The ISCT minimal criteria paper — the MSC definition.' },
      { label: 'GCCP 2.0', url: 'https://doi.org/10.1016/j.jcyt.2024.08.014', note: 'Good Cell Culture Practice 2.0 — core quality standards for cell work.' }
    ],
    milestone: 'You can read an MSC paper and tell marketing from markers.'
  },
  {
    id: 'lvl-scaffold',
    title: 'Build-a-Tissue Workshop',
    phase: 'Phase 3 · Biomaterials & 3D Culture',
    accent: '#ffd166',
    simMode: 'visit',
    intro: {
      title: 'Cells + scaffolds + signals = tissue',
      body: [
        'A scaffold is a temporary synthetic ECM: it holds cells in the right shape, lets them attach and spread, and degrades on cue as cells replace it with their own matrix.',
        'The big-but-boring truth: 2D culture is a convenience, not biology. Cells on flat plastic see infinite food and no neighbors — 3D culture restores the gradients and architecture drugscreens on 2D miss.'
      ],
      prompt: 'Visit the materials shelf. Natural or synthetic — which family would you trust to degrade on the same schedule your cells build tissue?'
    },
    learn: [
      {
        title: 'Two material families',
        body: 'Natural materials — collagen, fibrin, alginate, hyaluronic acid, Matrigel — are biocompatible but batch-variable and often weak. Synthetic polymers — PLGA, PCL, PEG, PLA — are fully defined and tunable, degrade by hydrolysis, and the lactide/glycolide ratio is a degradation-timing dial.'
      },
      {
        title: 'Stiffness is a signal',
        body: 'Hydrogels are polymer networks swollen in water — swelling, stiffness, tunable crosslinks. Cells sense matrix stiffness via mechanotransduction: Engler 2006 showed stem cells commit to that stiffness — 0.1–1 kPa neurogenic, 8–17 kPa myogenic, 25–40 kPa osteogenic.'
      },
      {
        title: 'From fibers to printheads',
        body: 'Scaffolds get built by electrospinning, freeze-drying, and salt leaching — with aligned fibers guiding nerve/tendon regeneration. Bioprinting (extrusion, inkjet, laser-assisted) lays down cell-laden hydrogels called bioinks, where printability and cell viability are a constant trade-off.'
      }
    ],
    quiz: [
      {
        q: 'The tissue engineering triad is...',
        options: ['Cells + scaffolds + signals', 'DNA + RNA + protein', 'Oxygen + glucose + serum', 'Collagen + fibrin + alginate'],
        answer: 0,
        explain: 'Cells + scaffolds + signals = tissue. Everything else in the field is tuning one of those three inputs.'
      },
      {
        q: 'Which stiffness range steers stem cells toward bone (osteogenic)?',
        options: ['25–40 kPa', '0.1–1 kPa', '8–17 kPa', '50–80 kPa'],
        answer: 0,
        explain: 'Engler 2006: 0.1–1 kPa neurogenic, 8–17 kPa myogenic, 25–40 kPa osteogenic. The matrix is a differentiation instruction.'
      },
      {
        q: 'Which of these is a natural biomaterial?',
        options: ['Fibrin', 'PLGA', 'PCL', 'PEG'],
        answer: 0,
        explain: 'Fibrin is natural (it is your blood-clot scaffold). PLGA, PCL, and PEG are synthetic polymers that degrade by hydrolysis.'
      },
      {
        q: 'The bioink dilemma is balancing...',
        options: ['Printability vs. cell viability', 'Cost vs. speed', 'Stiffness vs. degradation', 'Sterility vs. porosity'],
        answer: 0,
        explain: 'Stiffer inks print clean shapes but shear cells during extrusion; softer inks keep cells happy but sag. Printability vs. viability is the core bioink trade-off.'
      }
    ],
    recap: [
      {
        objective: 'You can tell natural from synthetic biomaterials',
        detail: 'Natural materials — collagen, fibrin, alginate, hyaluronic acid, Matrigel — are extracted from organisms: biocompatible and bioinstructive, but batch-variable and mechanically weak. Synthetics — PLGA, PCL, PEG, PLA — are fully defined and tunable; they degrade predictably by hydrolysis, and tuning the lactide/glycolide ratio in PLGA lets you dial degradation from weeks to over a year. Real scaffolds often blend both, natural motifs for cell signaling with synthetic backbones for mechanics.'
      },
      {
        objective: 'You can explain mechanotransduction with numbers',
        detail: 'Engler 2006 cultured naive MSCs on collagen-coated polyacrylamide gels of controlled stiffness and found lineage commitment tracks matrix stiffness: 0.1–1 kPa (soft, brain-like) neurogenic, 8–17 kPa (muscle-like) myogenic, 25–40 kPa (collagenous bone-like) osteogenic. The cell pulls on the matrix through integrins; stiffer substrate means more resistance, which drives a myosin-dependent nuclear and cytoskeletal program. That is why hydrogel stiffness is a design parameter, not an afterthought.'
      },
      {
        objective: 'You can defend 3D culture over 2D',
        detail: 'In 2D every cell sits in the same infinite reservoir of media and the same oxygen field — no gradients, no neighbors crowding, no architecture. 3D systems — spheroids, organoids, scaffold-seeded constructs — restore cell–cell contact, nutrient and oxygen gradients, and tissue-like geometry, which is why 2D drug screens predict efficacy so poorly. The trade-off is imaging and assay access: a 3D construct hides its center.'
      },
      {
        objective: 'You can weigh fabrication routes for a scaffold',
        detail: 'Electrospinning draws polymer fibers down to sub-micron scale; aligned collectors produce anisotropic architectures that guide nerve and tendon regeneration. Freeze-drying and salt leaching create interconnected pores whose size you tune with ice-crystal or salt-crystal templates. Bioprinting (extrusion, inkjet, laser-assisted) places cells and matrix in three dimensions from medical imaging, but every bioink is a compromise: stiff enough to hold its printed shape, soft enough that extruding it does not kill the cells.'
      }
    ],
    refs: [
      { label: 'Lanza, Principles of Tissue Engineering', url: 'https://www.elsevier.com/books/principles-of-tissue-engineering/lanza/978-0-12-818422-6', note: 'The definitive TERM textbook.' },
      { label: 'Ratner, Biomaterials Science', url: 'https://www.elsevier.com/books/biomaterials-science/ratner/978-0-12-816137-1', note: 'The materials bible for Phase 3.2.' },
      { label: 'Palsson & Bhatia, Tissue Engineering', url: 'https://www.pearson.com/en-us/subject-catalog/p/tissue-engineering/P200000005960', note: 'Short, quantitative companion to transport and design.' }
    ],
    milestone: 'You can spec a scaffold: material, stiffness, pores, and a degradation clock.'
  },
  {
    id: 'lvl-oxygen',
    title: 'The 200-Micron Wall',
    phase: 'Phase 3 · Bioreactors & Transport',
    accent: '#4cc9f0',
    simMode: 'oxygen',
    intro: {
      title: 'The single most important number in tissue engineering',
      body: [
        'Oxygen diffuses only ~100–200 µm through tissue before cells suffocate. A 1 cm thick engineered organ is 50× beyond that limit — every strategy in the field exists to defeat it.',
        'This is a physics problem you can solve quantitatively: Fick’s law, a diffusion coefficient, and the cruel math of distance.'
      ],
      prompt: 'Watch the oxygen gradient creep from the vessel wall. Which cells starve first — and what would you build to feed them?'
    },
    learn: [
      {
        title: 'Fick’s law, the villain',
        body: 'Flux = −D·dC/dx. For O₂ in tissue D ≈ 2×10⁻⁹ m²/s. Diffusion length scales as √(Dt): ~140 µm at 10 s, mm-scale in hours, cm-scale over a day. Waiting is not an option — perfusion is.'
      },
      {
        title: 'The viability limit is consumption, not spreading',
        body: 'The ~100–200 µm wall is a steady-state penetration depth set by oxygen consumption, not bare diffusion. Cells burn oxygen as fast as it arrives, so the viable rim stays thin no matter how long you wait.'
      },
      {
        title: 'The vascularization toolkit',
        body: 'Prevascularization in vitro (seed endothelial cells, let them network) then anastomose on implant; VEGF/bFGF gradients to recruit host vessels; 3D-printed or microchanneled networks; in-vivo AV loop chambers; and decellularized organ vasculature as the Phase 4 frontier.'
      },
      {
        title: 'Bioreactors: flow is the answer',
        body: 'Perfused/flat-bed and hollow-fiber bioreactors push nutrient-rich flow through the construct; spinner flasks, rotating-wall vessels, and rocking/wave bags fight mass-transfer limits at scale. Design dials: Péclet number (convection ÷ diffusion) and shear τ = μ·dv/dy — cells sense flow.'
      }
    ],
    quiz: [
      {
        q: 'Roughly how far does oxygen diffuse through tissue before cells suffocate?',
        options: ['100–200 µm', '1–2 mm', '1–2 cm', '10–20 cm'],
        answer: 0,
        explain: '~100–200 µm is the classic viability limit. A 1 cm construct is 50× beyond it — hence vascularization and perfusion.'
      },
      {
        q: 'Fick’s law says diffusive flux is proportional to...',
        options: ['The concentration gradient', 'The temperature', 'The cell density', 'The scaffold porosity'],
        answer: 0,
        explain: 'Flux = −D·dC/dx: proportional to the concentration gradient, with D the diffusion coefficient and the minus sign pointing downhill.'
      },
      {
        q: 'With D ≈ 2×10⁻⁹ m²/s, about how far does oxygen diffuse in 10 seconds?',
        options: ['140 µm', '14 µm', '1.4 mm', '14 mm'],
        answer: 0,
        explain: '√(Dt) = √(2×10⁻⁹ × 10) ≈ 1.4×10⁻⁴ m ≈ 140 µm — matching the observed ~100–200 µm limit in seconds.'
      },
      {
        q: 'Which bioreactor design pushes nutrient-rich flow through the construct?',
        options: ['Hollow-fiber bioreactor', 'Static flask', 'Agar plate', 'Cryovial'],
        answer: 0,
        explain: 'Hollow-fiber and perfused/flat-bed bioreactors pump media through the construct to beat the diffusion limit. Spinner flasks, rotating-wall vessels, and wave bags are other mass-transfer strategies.'
      }
    ],
    recap: [
      {
        objective: 'You can state the oxygen diffusion limit and its consequences',
        detail: 'Without a vessel nearby, oxygen penetrates only ~100–200 µm of viable tissue because diffusion is slow (D ≈ 2×10⁻⁹ m²/s) and cells consume O₂ as it arrives. A 1 cm engineered organ is 50× beyond the limit; its core would be necrotic within a day. This single constraint dictates construct size, pore architecture, vascularization, and bioreactor choice — it is the field’s central engineering bottleneck.'
      },
      {
        objective: 'You can apply Fick’s law and the diffusion-length scaling',
        detail: 'Flux = −D·dC/dx: diffusive flux is proportional to the concentration gradient and the diffusion coefficient. The characteristic penetration depth scales as √(Dt) — with D ≈ 2×10⁻⁹ m²/s that gives ~140 µm at 10 s, ~1–2 mm at an hour, and cm-scale only after roughly a day. The corollary is that the viability limit is a consumption-limited steady state, so longer waiting never grows the viable rim; only reducing consumption or adding convection (perfusion, vascularization) does.'
      },
      {
        objective: 'You can enumerate the vascularization strategy families',
        detail: 'Five families: (1) prevascularization in vitro — seed endothelial cells, let them form networks, then anastomose on implant; (2) angiogenic growth-factor delivery — VEGF/bFGF gradients recruit host vessels into the construct; (3) 3D-printed or microchanneled vascular networks built into the scaffold; (4) in-vivo prevascularization using AV loop chambers to grow a pedicled vascular bed; (5) decellularized organ vasculature — take a donor organ’s vessel tree, strip the cells, and recellularize (the Phase 4 frontier).'
      },
      {
        objective: 'You can design around transport with bioreactors and dimensionless numbers',
        detail: 'Perfused/flat-bed and hollow-fiber bioreactors force nutrient-rich flow through the construct, collapsing the effective diffusion distance; spinner flasks, rotating-wall vessels, and rocking/wave bags are the scale-up alternatives for suspension and large constructs. Two numbers govern design: the Péclet number (convection ÷ diffusion — how much flow beats diffusion) and shear stress τ = μ·dv/dy, the frictional force per area from fluid velocity gradients. Shear is a double-edged sword: endothelial cells align to it and MSCs respond mechanobiologically, but too much shear strips or kills cells.'
      }
    ],
    refs: [
      { label: 'Lanza, Principles of Tissue Engineering — transport chapters', url: 'https://www.elsevier.com/books/principles-of-tissue-engineering/lanza/978-0-12-818422-6', note: 'Definitive treatment of mass transport in constructs.' },
      { label: 'Palsson & Bhatia, Tissue Engineering', url: 'https://www.pearson.com/en-us/subject-catalog/p/tissue-engineering/P200000005960', note: 'Compact quantitative coverage of Fick’s law and bioreactor analysis.' }
    ],
    milestone: 'You can reproduce the diffusion-limit argument from memory — and name three ways to beat it.'
  },
  {
    id: 'lvl-vector',
    title: 'Delivery & the Gene Courier',
    phase: 'Phase 4 · Gene Tools, Regulation & Translation',
    accent: '#7ee081',
    simMode: 'visit',
    intro: {
      title: 'Editing is easy. Delivery is the hard part.',
      body: [
        'Making tissue sometimes means editing cells first — knock out a gene, add a reporter, deliver a growth factor. The toolbox splits into editing (CRISPR, permanent and targeted) and delivery (vectors, getting DNA or RNA in).',
        'Viral vectors are the reliable workhorses, but every one ships with cargo-size limits and safety baggage. Then the regulations decide whether your product is a simple tissue graft or a full-blown drug.'
      ],
      prompt: 'Meet the couriers: Lentivirus, Retrovirus, AAV. Which package fits your cargo — and does it integrate or stay as an episome?'
    },
    learn: [
      {
        title: 'CRISPR: NHEJ vs. HDR',
        body: 'A CRISPR/Cas9 double-strand break forks into two repair paths: NHEJ (non-homologous end joining) is error-prone and makes knockouts; HDR (homology-directed repair) uses a template for precise knock-ins but is low efficiency. Delivery can be RNP, plasmid, or viral.'
      },
      {
        title: 'Transfection vs. transduction',
        body: 'Transfection gets DNA into cells chemically or physically — lipofection, electroporation. Transduction is viral delivery. The planning number is MOI (multiplicity of infection) = virus particles ÷ cells.'
      },
      {
        title: 'The vector courier table',
        body: 'Lentivirus (HIV-based): ~8–9 kb, integrates, dividing + non-dividing cells, BSL-2+. Retrovirus (MLV): ~7–8 kb, integrates, dividing cells only. AAV: ~4.7 kb, mostly episomal, low immunogenicity. Growth factors to deliver: VEGF (vascularization), BMPs (bone), FGF, TGF-β, EGF.'
      }
    ],
    quiz: [
      {
        q: 'CRISPR knockout relies on which repair pathway?',
        options: ['NHEJ', 'HDR', 'Photoreactivation', 'Translesion synthesis'],
        answer: 0,
        explain: 'NHEJ is error-prone and tends to create indels that knock the gene out. HDR is the template-driven, low-efficiency road to precise knock-ins.'
      },
      {
        q: 'Which vector integrates into both dividing AND non-dividing cells?',
        options: ['Lentivirus', 'Retrovirus (MLV)', 'AAV', 'Adenovirus'],
        answer: 0,
        explain: 'Lentivirus (HIV-based) can transduce non-dividing cells, integrates, carries ~8–9 kb, and is handled at BSL-2+. MLV retrovirus needs dividing cells.'
      },
      {
        q: 'MOI stands for...',
        options: ['Multiplicity of infection — virus particles per cell', 'Multiplicity of integration — insertions per genome', 'Method of internalization — uptake per cell', 'Measure of infectivity — virions per mL'],
        answer: 0,
        explain: 'MOI = virus particles ÷ cells — the transduction planning number.'
      },
      {
        q: 'A product made of minimally manipulated tissue for homologous use is regulated as...',
        options: ['An HCT/P under 21 CFR 1271', 'A new drug under 21 CFR 312', 'A medical device under 21 CFR 820', 'A supplement under DSHEA'],
        answer: 0,
        explain: 'Minimal manipulation + homologous use keeps a human cell/tissue product an HCT/P under 21 CFR 1271; more-than-minimal manipulation pushes it into drug/biologic territory.'
      }
    ],
    recap: [
      {
        objective: 'You can predict the outcome of a CRISPR cut',
        detail: 'Cas9 makes a double-strand break, and the cell’s repair machinery decides the outcome. NHEJ is fast and error-prone, inserting or deleting bases that frame-shift and knock out the gene — great for loss-of-function studies. HDR copies from a supplied donor template to insert or correct a sequence precisely, but it is inefficient because it competes with NHEJ and only fires when a template is present. Strategies to favor HDR: inhibit NHEJ, deliver the template as single-stranded DNA, time the cut in S/G2, or use base/prime editing for single-nucleotide changes.'
      },
      {
        objective: 'You can match a cargo to a viral vector',
        detail: 'Lentivirus (HIV-based) carries ~8–9 kb, integrates into the genome, transduces dividing and non-dividing cells, gives stable long-term expression, and is worked at BSL-2+ — the workhorse for stable transgene delivery. Retrovirus (MLV) carries ~7–8 kb and integrates but only transduces dividing cells (the nuclear envelope must break down). AAV carries only ~4.7 kb and stays mostly episomal — no integration, low immunogenicity, long-term expression, but pre-existing immunity and a small cargo limit. Every choice trades cargo size, integration safety, and expression durability.'
      },
      {
        objective: 'You can name key growth factors and their biology',
        detail: 'VEGF (vascular endothelial growth factor) drives vascularization; BMPs (bone morphogenetic proteins) drive bone; FGF (fibroblast growth factor), TGF-β, and EGF are broad mitogens and morphogens. Each is a Phase 1.1 pathway ligand — knowing the pathway tells you the biology: deliver BMP to make bone, deliver VEGF to attract vessels. They can be delivered as recombinant proteins or as genes from scaffolds, with release kinetics as a design parameter.'
      },
      {
        objective: 'You can navigate the regulatory line: HCT/P vs. drug',
        detail: 'Under 21 CFR 1271, a human cell, tissue, or cellular/tissue-based product (HCT/P) is regulated solely as a tissue if it is minimally manipulated, intended for homologous use, not combined with a drug/device (except for minimal ancillary processing), and does not have a systemic effect dependent on metabolic activity (or, if it does, it is autologous, allogeneic in first- or second-degree relatives, or for reproductive use). Cross the minimal-manipulation or homologous-use line and the product is regulated as a biologic/drug, dragging in GMP, cleanrooms (ISO 5 / Grade A for aseptic manipulation), and clinical-trial oversight.'
      }
    ],
    refs: [
      { label: 'Addgene', url: 'https://www.addgene.org/', note: 'Free plasmids, CRISPR and viral-vector protocols and education.' },
      { label: 'FDA HCT/P guidance — 21 CFR 1271', url: 'https://www.fda.gov/vaccines-blood-biologics/tissue-tissue-products', note: 'Regulatory ground truth for human cell and tissue products.' },
      { label: 'Wyles et al. 2019, npj Regen Med', url: 'https://doi.org/10.1038/s41536-019-0082-4', note: 'Regenerative medicine curriculum: discovery → translation → application.' }
    ],
    milestone: 'You can pick a delivery vector and tell a tissue from a drug.'
  }
];
