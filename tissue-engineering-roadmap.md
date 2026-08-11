# Tissue Engineering & Regenerative Medicine — Learning Roadmap

**Zero-to-grad study plan for tissue cloning, lab equipment, and the bioengineering foundations of TERM (tissue engineering & regenerative medicine).**

- **Starting point:** Bio 101 from ~8 years ago; strong computational background; no wet-lab experience.
- **Target:** grad-student-level literacy in TERM — the wet-lab vocabulary to read protocols, the theory to read primary literature, and the quantitative instincts to design (not just read) experiments.
- **Modeled on:** Northwestern's Regenerative Engineering Training Program, VCU's MS in Tissue Engineering & Regenerative Medicine, NJIT's graduate TERM certificate, and standard cell-culture practice guidelines (GCCP 2.0).
- **Last updated:** 2026-08-10 (reviewed & fact-checked: ICLAC v14 count, eLife 2019 meta-analysis, ISCT criteria, Engler 2006, 21 CFR 1271, BSC airflow, vector payloads, mycoplasma size, phenol red transitions)

---

## How to read this document

This is a **roadmap, not a textbook** — it tells you what to learn, in what order, with enough grounding to know what each topic means and why it matters. Each section follows the same pattern:

1. **Beginner primer** — plain-language explanation of what this topic is and why it matters. Read these now.
2. **Topic checklist** — the things to actually learn/do, in dependency order. Work through these.
3. **Go deeper (grad-level)** — references, textbooks, and journals to build up to. Come back to these as you progress.

**Rule of thumb:** don't read a textbook until you can explain the *beginner primer* of that section to someone else in your own words. Textbooks are for filling in depth, not for first contact.

---

## The field map: what "cloning" means (read this first)

"Tissue cloning" is an umbrella phrase covering four genuinely different things. Getting these straight up front will save you a lot of confusion:

| Meaning | What it is | Scale | Where you'll meet it |
|---|---|---|---|
| **Molecular cloning** | Copying a DNA fragment inside a plasmid vector; the standard gene-copying toolbox (restriction enzymes, ligation, PCR, transformation) | Molecules | Every wet-lab paper, Methods sections |
| **Cellular cloning / cell-line propagation** | Expanding genetically identical cells in culture — the everyday meaning in tissue work ("cloning" HeLa cells) | Cells | This roadmap's core craft (Phase 2) |
| **Reproductive cloning** | Somatic cell nuclear transfer (SCNT) — the Dolly-the-sheep method; producing a whole organism genetically identical to a donor | Organism | History/ethics context (Phase 4) |
| **Therapeutic cloning** | SCNT to derive patient-matched embryonic stem cells | Cells → tissues | Mostly superseded by iPSCs (Phase 2.4) |

**Tissue engineering** — the modern, practical version of "cloning tissue" — sits above all of these:

```
                    cells + scaffolds + signals  =  engineered tissue
                          (biomaterials)            (the TERM equation)
```

TERM = tissue engineering **plus** cell therapy, gene therapy, and immunomodulation. Growing functional tissue is ultimately **controlled gene expression at scale** — which is why Phase 0 (molecular biology) and Phase 2 (cell culture) are the load-bearing foundations.

---

## Dependency graph

```
Phase 0  Bio 101 refresher (vocabulary)
   │
   ▼
Phase 1  Undergrad core ── cell signaling & mol cloning techniques
   │        │  │  │              │
   │        │  │  └── dev bio ───┤  (differentiation logic)
   │        │  └───── immunology ┘  (rejection logic)
   │        └──────── stats / cell-line QC
   ▼              │
Phase 2  Tissue cloning & cell culture craft ──(the bench: equipment §2.7)
   │
   ▼
Phase 3  Bioengineering foundations (materials, transport, bioreactors, gene tools)
   │
   ▼
Phase 4  Translation, regulation, frontier
```

---

## Phase 0 — Bio 101 Refresher (the prereqs you forgot)

**Goal:** rebuild the vocabulary everything else hangs on.

### Beginner primer

Cells are the units you're going to grow, feed, count, and genetically program. You don't need to re-take Bio 101 — you need to re-learn the *parts*: what an organelle does, what a membrane is for, how a gene becomes a protein, and why cells die. Everything in Phase 2 (feeding cells, splitting them, killing contaminants) is biochemistry in a dish. The four blocks below are the whole game.

### Topic checklist

**0.1 Cell biology fundamentals**
- [ ] Cell structure: nucleus, mitochondria, ER, Golgi, lysosomes, cytoskeleton (actin, microtubules, intermediate filaments)
- [ ] Plasma membrane: phospholipid bilayer, membrane proteins, transport (passive / active / endocytosis)
- [ ] Cell cycle: G1/S/G2/M, checkpoints, cyclins/CDKs; mitosis vs. meiosis
- [ ] Cell death: apoptosis vs. necrosis — *why it matters:* passaging and stress kill cells; you need to recognize it in a dish (phase-contrast appearance, floaters, media pH crash)
- [ ] Cell adhesion: cadherins, integrins, tight junctions — *why it matters:* cells anchoring to surfaces **is** the basis of adherent culture

**0.2 Molecular biology fundamentals (the central dogma)**
- [ ] DNA structure, replication; transcription → mRNA → translation → protein
- [ ] Gene regulation: promoters, enhancers, transcription factors, epigenetics (methylation, histone modification)
- [ ] *Why it matters:* "cloning" at every scale is fundamentally about controlling gene expression and copying genetic material

**0.3 Biochemistry essentials**
- [ ] Proteins: amino acids, folding, enzymes, kinetics intuition (Km/Vmax)
- [ ] pH, buffers, osmolarity — culture media are precisely buffered chemical systems (DMEM = defined salts + amino acids + vitamins + glucose + pH indicator)
- [ ] Metabolism overview: glycolysis, TCA, oxidative phosphorylation (cells in a dish behave differently depending on nutrient/oxygen supply)

**0.4 Basic genetics**
- [ ] Genotype vs. phenotype, alleles, mutations, ploidy
- [ ] *Why it matters:* continuous cell lines are often aneuploid; genetic drift in culture is a real reproducibility problem

### Go deeper (grad-level)

- **Alberts et al., *Molecular Biology of the Cell*** — the bible; read selectively, never cover to cover. Chapters 1–7 first.
- **Khan Academy Biology / MIT OCW 7.01SC (Fundamentals of Biology)** — fastest refresh path; watch at 1.5×, take nothing.
- **Lodish et al., *Molecular Cell Biology*** — alternative to Alberts, slightly more molecular-weight-obsessed.
- **Self-check:** you should be able to sketch the central dogma and name one checkpoint in each cell-cycle phase from memory.

---

## Phase 1 — Undergraduate Core (a cell/mol bio major, compressed)

**Goal:** the thinking tools you'll actually use — signaling, the molecular toolbox, contamination theory, immunology, dev bio, and statistics.

### Beginner primer

Four ideas carry the whole field, and they all land here:

1. **Signaling is a recipe.** Growing tissue = delivering the right signals (growth factors) in the right order. Differentiation protocols are literally recipes of pathway agonists/antagonists.
2. **Molecular cloning is the plumbing.** Plasmids, PCR, gels, blots — you'll read Methods sections forever; these are the tools.
3. **Everything fights contamination.** Sterile technique is not a chore, it's the experiment.
4. **Tissue engineering is guided development.** Embryos build tissues by controlled signaling; so do you, in a flask.

### Topic checklist

**1.1 Cell signaling (the most important undergrad topic for this field)**
- [ ] Major pathways: RTK/MAPK, GPCR, JAK-STAT, PI3K/Akt, Wnt, Notch, Hedgehog, TGF-β/BMP
- [ ] Ligand–receptor logic, second messengers, phosphorylation cascades
- [ ] *Why it matters:* differentiation protocols are pathway recipes; every growth factor named in Phase 3.5 belongs to one of these pathways

**1.2 Molecular cloning & core lab techniques**
- [ ] Restriction enzymes, ligation, plasmid vectors, transformation, antibiotic selection
- [ ] PCR / qPCR / RT-PCR; gel electrophoresis; Sanger & next-gen sequencing
- [ ] Protein methods: SDS-PAGE, western blot, ELISA
- [ ] Microscopy: brightfield, phase contrast, fluorescence, confocal
- [ ] Flow cytometry & FACS — *gotcha:* adherent cells must be detached first, and trypsin degrades surface proteins (e.g., CD markers, integrins). Enzyme choice is an experimental design decision, not an implementation detail
- [ ] Apoptosis assays (Annexin V / propidium iodide by flow) — ties cell death (0.1) to measurement

**1.3 Microbiology & sterile technique theory**
- [ ] Bacteria, fungi, yeast, viruses, mycoplasma as contaminants
- [ ] **Mycoplasma specifically:** ~0.15–0.3 µm, no cell wall, invisible under brightfield, resistant to pen/strep, doesn't cloud media — the silent killer of cell-culture experiments; PCR-based detection kits are standard
- [ ] Antibiotics in culture (pen/strep, gentamicin, amphotericin B): mechanisms, and why *routine* use is discouraged (alters gene expression, masks sloppy technique, breeds resistance)

**1.4 Immunology basics**
- [ ] Innate vs. adaptive immunity; antibodies and antigen recognition; MHC/HLA
- [ ] Transplant rejection: hyperacute, acute, chronic; immunosuppression
- [ ] *Why it matters:* an engineered tissue the immune system rejects is a failed therapy — immuno-engineering is its own grad-level subfield (Phase 3.6)

**1.5 Developmental biology**
- [ ] Embryogenesis: fertilization → blastocyst → gastrulation; three germ layers (ectoderm, mesoderm, endoderm)
- [ ] Morphogenesis, body axes, organogenesis; morphogen gradients
- [ ] *Why it matters:* differentiation protocols recapitulate embryonic signaling sequences — the same BMP/TGF-β/Wnt recipes from 1.1

**1.6 Statistics & experimental design**
- [ ] Replicates (biological vs. technical), controls, power, common tests (t, ANOVA, non-parametric)
- [ ] **Reproducibility crisis context:** misidentified/contaminated lines are a documented, ongoing problem — a meta-analysis of ~150k articles (305,161 unique cell-line names in PubMed Central) estimates **8.6%** of cell lines used were on ICLAC's problematic list (Babic et al., *eLife* 2019, 8:e41676), older estimates run 15–20%, and an audit of the literature traced misidentified cells through **32,755 articles** (Horbach & Halffman, PLoS ONE 2017, 12(10):e0186281). ICLAC's Register (v14, Feb 2026) lists **608** lines. Learn STR profiling and cell authentication *early* — it's the cheapest reproducibility insurance in the field

### Go deeper (grad-level)

- **Weiskirchen et al. (2023), *A Beginner's Guide to Cell Culture: Practical Advice for Preventing Needless Problems*, Cells 12(5):682** — [PMC10000895](https://pmc.ncbi.nlm.nih.gov/articles/PMC10000895/). Read cover to cover. Free, practical, the single best starting paper in this field.
- **GCCP 2.0** (Pamies et al., *Guidance Document on Good Cell and Tissue Culture Practice 2.0 (GCCP 2.0)*, ALTEX 39(1):30–70, 2022) — the field's official best-practice guidance.
- **Gilbert & Barresi, *Developmental Biology***; **Janeway's *Immunobiology*** — both big; read the chapters matching 1.4/1.5 checklists.
- **MIT OCW 7.05 (Biochemistry), 7.03 (Genetics)** for structured refreshers.
- **Addgene** (addgene.org) — free molecular-cloning protocols and plasmid education; the de-facto beginner resource for 1.2.
- **Self-check:** explain why trypsin is a FACS problem; name the three germ layers and one organ from each; explain what STR profiling detects.

---

## Phase 2 — The Core Craft: Tissue Cloning & Cell Culture

**Goal:** this is where "tissue cloning" becomes a skill. Cell culture is the field's shared language — every TERM paper, protocol, and product pipeline is built on it.

### Beginner primer

A cell line is a population of cells you keep alive, growing, and (ideally) genetically stable in plastic dishes. "Cloning" here means **expanding genetically identical cells**. The craft is: feed them the right media, split them before they overgrow, keep everything sterile, notice when something's wrong (contamination, drift, death), and bank healthy stocks. It's a repetitive, observation-heavy discipline — the boring-looking skills (pipetting, waiting, documenting) are the entire discipline.

### 2.1 What "cloning" actually means (the vocabulary disambiguation)

- [ ] Molecular cloning: copying DNA fragments in vectors (Phase 1.2)
- [ ] **Cellular cloning / cell-line propagation: expanding genetically identical cells in culture — the everyday meaning in tissue work**
- [ ] Reproductive cloning: SCNT (Dolly-the-sheep method)
- [ ] Therapeutic cloning: SCNT to derive patient-matched embryonic stem cells
- [ ] Tissue engineering: growing functional tissue from cells + scaffolds + signals — the modern, practical version of "cloning tissue"

### 2.2 Cell culture types & cell-line biology

**Beginner primer:** lines come in three flavors with completely different temperaments. Primary cells are finicky and finite; immortalized lines grow forever but are genetically weird; stem cells are precious because they can become anything. Half of bench skill is knowing which you have and what it needs.

- [ ] **Finite (primary) lines:** slow-growing, contact-inhibited, senesce after limited passages (Hayflick limit ~40–60 doublings for human fibroblasts)
- [ ] **Continuous/immortalized lines:** transformed or cancer-derived (HeLa, HEK293, CHO); fast, not contact-inhibited, often aneuploid — *and therefore not interchangeable with primary cells in experiments*
- [ ] **Immortalization mechanisms:** hTERT (telomerase — preserves near-normal karyotype), SV40 large T (disrupts p53/Rb), spontaneous transformation, viral oncogenes (HPV E6/E7)
- [ ] **Growth dynamics:** lag → log (exponential) → stationary phases; doubling time; confluence; contact inhibition; density limitation
- [ ] **Passaging math:** split ratios (1:2–1:10), seeding density (~10⁴–10⁵ cells/cm² typical), passage number ≠ population doubling number
- [ ] **Adherent (fibroblast-like vs. epithelial-like) vs. suspension culture**
- [ ] Trypsinization: EDTA chelation + trypsin cleavage of adhesion proteins; timing matters (over-trypsinization kills and strips receptors); gentler alternatives (Accutase, pure EDTA) preserve surface epitopes
- [ ] Counting: hemocytometer math — `cells/mL = average count per 4×4 grid × dilution factor × 10⁴`; trypan blue viability (live cells exclude the dye)

### 2.3 Media, sera, and the culture environment

**Beginner primer:** media is a precisely balanced chemical system — think of DMEM as a defined "cytoplasm recipe" (salts, amino acids, vitamins, glucose) plus a buffer and a pH indicator. The incubator's 5% CO₂ isn't arbitrary: CO₂ dissolves to carbonic acid and holds the bicarbonate buffer at pH ~7.4. Serum is the "unknown good stuff" (growth factors, lipids, hormones) that historically made everything work — and the #1 source of variability and xeno-contamination.

- [ ] **Basal media:** DMEM, RPMI — defined salts, amino acids, vitamins, glucose, phenol red pH indicator
  - DMEM comes in low-glucose (1 g/L, original 1959 formulation) and high-glucose (4.5 g/L ≈ 25 mM) — a real experimental variable (metabolic state, glycosylation, apoptosis sensitivity)
  - **Keep media in the dark:** riboflavin (vitamin B2) + HEPES buffer are photoactive — ambient light generates H₂O₂, a cytotoxic oxidant (Zigler 1985). Media are amber- or foil-wrapped for a reason
  - Phenol red pH chart: yellow (~6.8, acidic/overgrown/contaminated) → orange (~7.0) → red (~7.4, healthy) → pink/magenta (>8.2, alkaline/leaky CO₂)
  - ⚠️ Phenol red has weak estrogenic activity — omit for estrogen-responsive systems (e.g., MCF-7 work)
  - Glutamine is unstable in solution → GlutaMAX (stable dipeptide) for long-term cultures
- [ ] **Bicarbonate/CO₂ buffer chemistry:** why 37 °C / 5% CO₂ / ~95% humidity are the default settings; HEPES as an alternative buffer for open manipulation
- [ ] **Serum supplementation:** FBS at 5–20%, batch-to-batch variability (test/qualify lots), heat inactivation (kills complement; also destroys some growth factors — weigh pros/cons)
- [ ] **Serum-free / xeno-free / chemically defined media** — critical for clinical translation (Phase 4) and reproducibility
- [ ] Cryopreservation: freeze media ~10% DMSO (cryoprotectant), slow cooling (~−1 °C/min), LN₂ storage, rapid thaw at 37 °C
- [ ] Culture environment: 37 °C, 5% CO₂, humidity; incubator contamination sources (water pans, mold spores, door openers)

### 2.4 Stem cell biology (the heart of the field)

**Beginner primer:** stem cells are the only cells that can both copy themselves (self-renew) and become specialized cells (differentiate). The entire therapeutic promise of the field — grow your own replacement tissue — hangs on controlling that switch. iPSCs made patient-matched cells practical without destroying embryos, which is why they won the Nobel in 2012 and restructured the whole ethics debate.

- [ ] Potency hierarchy: totipotent → pluripotent → multipotent → unipotent
- [ ] Embryonic stem cells (ESCs); induced pluripotent stem cells (iPSCs) — **Yamanaka factors: Oct4, Sox2, Klf4, c-Myc**
- [ ] Adult stem cells: mesenchymal (MSCs), hematopoietic, adipose-derived (ADSCs — easy to harvest, high yield per volume, the workhorse for autologous therapy)
- [ ] The stem cell niche (the in-vivo microenvironment that maintains stemness)
- [ ] Self-renewal vs. differentiation control; directed differentiation protocols as sequential pathway recipes (connect to Phase 1.1)
- [ ] Maintenance challenges: pluripotency drift, spontaneous differentiation, feeder layers / defined matrices (Matrigel, vitronectin)
- [ ] **MSC operational definition (ISCT minimal criteria, Dominici et al. 2006):** plastic-adherent; ≥95% express CD105, CD73, CD90; <2% express CD45, CD34, CD14/CD11b, CD79α/CD19, HLA-DR; must differentiate to osteoblasts, adipocytes, chondroblasts in vitro
- [ ] **Clinical-grade iPSC reprogramming is integration-free:** Sendai virus, episomal plasmids, or mRNA transfection deliver Yamanaka factors without genome insertion — retrovirus/lentivirus (integrating) versions are research-grade only

### 2.5 Aseptic technique & biosafety (where the hood question lives)

**Beginner primer:** the golden rule of biosafety cabinets — the airflow protects both you and your cells, so *don't reach over the work surface, don't block the front air curtain, and keep the inside clean*. The fume-hood confusion is the most common "I almost contaminated everything / myself" mistake in the field; §2.7 and Appendix A settle it permanently.

- [ ] Biosafety levels (BSL-1 → BSL-4) — what each requires and when
- [ ] **Biosafety cabinet (BSC, Class II):** HEPA-filtered laminar flow — protects **both you and the culture**; this is where cell work happens. Class II A2 (recirculates ~70% of air, exhausts 30% through HEPA — the standard culture cabinet) vs. B2 (hard-ducted, exhausts 100% — for culture with volatile/radioactive hazards)
- [ ] **Chemical fume hood:** exhausts hazardous vapors away from you — protects **you from chemicals**; provides NO sterility and NO product protection. **Never do cell culture in one.**
- [ ] **Laminar-flow clean bench:** blows HEPA-filtered air *at you* — product-only protection; never use with biohazards
- [ ] Personal aseptic practice: gloves, sleeves, 70% ethanol, no talking/coughing over the work, one-handed flask cap handling, spray-everything-first
- [ ] Genetically modified cell lines (SV40T-, TERT-, or CRISPR-derived) carry their own safety classification requirements (NIH rDNA guidelines; institutional IBC)

### 2.6 Contamination, QC, and good practice

**Beginner primer:** contamination is a *zoo*, not a bug — bacteria cloud the media within hours, mycoplasma does nothing visible for weeks while wrecking your data, and cross-contamination quietly turns "your" cells into someone else's HeLa. The difference between a casual hobbyist and a lab scientist is QC: testing, documenting, banking.

- [ ] **Contaminant zoo:** bacteria, yeast/mold, mycoplasma, viruses, prions, endotoxins (LPS), chemical residues (detergents, plasticizers, disinfectants), free radicals from light-exposed HEPES/riboflavin
- [ ] Bacterial/yeast contamination: visible clouding, pH crash (yellow), turbidity — usually salvageable *if caught early*, often a total loss
- [ ] **Mycoplasma:** no visible signs, no media clouding — alters metabolism, gene expression, and even morphology; detected only by testing (PCR kits, DAPI/Hoechst staining, culture-based assays)
- [ ] **Cross-contamination between cell lines:** the field's most embarrassing recurring disaster (HeLa took over the world's labs); prevention via single-use media per line, no shared bottles, no simultaneous work on multiple lines
- [ ] **Authentication via STR profiling** (human lines; SNP-based methods for animal lines) — required by journals now; check ATCC and ICLAC databases
- [ ] Eradication agents (Plasmocin, BM-Cyclin) and their cytotoxic caveats — treat-and-discard is often the honest choice
- [ ] **Cell banking:** master cell bank (MCB) → working cell bank (WCB); freeze early, freeze often, verify post-thaw
- [ ] Sterility testing (broth/agar) and endotoxin testing (LAL assay) — the QC bridge to clinical work (Phase 4)
- [ ] Documentation: lot tracking of media/serum/plastics; why reproducibility starts at the bench notebook

### 2.7 Lab equipment master section (NEW — the equipment knowledge)

**Beginner primer:** you will spend your career in front of ~8 machines. Each has a job, a correct operating procedure, and a classic way to ruin it (and your cells). Learn the *principle* of each — if you understand why a centrifuge spins, a filter traps, and a cabinet flows, every new instrument is just a variation.

**2.7.1 Hoods & airflow devices** *(the most commonly confused equipment in the building — see Appendix A for the master table)*

| Device | Protects | Mechanism | Use for | Never use for |
|---|---|---|---|---|
| **Chemical fume hood** | You | Draws air away from you; exhausts outside; no HEPA, no sterility | Fixation (formaldehyde/paraformaldehyde), solvents, acids, phenol/chloroform RNA extraction, ethidium bromide, DMSO handling, β-mercaptoethanol | Cell culture (guaranteed contamination) |
| **Biosafety cabinet, Class II (A2)** | You + culture | HEPA-filtered laminar downflow + inward air curtain, recirculated within cabinet | All cell/tissue culture: passaging, media changes, seeding scaffolds | Volatile chemicals (recirculated fumes hit you) |
| **Biosafety cabinet, Class II (B2)** | You + culture | Hard-ducted: exhausts air outside | Culture with volatile/radioactive hazards (rare in routine work) | — |
| **Laminar-flow clean bench** | Product only | Blows HEPA air *at you* | Non-hazardous sterile prep (media filtration, sterile aliquoting) | Any biohazardous work |

- [ ] BSC operation: blower on 5–15 min before use; never block the front air curtain (arms in perpendicular, work ≥ 6 in from the front grill); UV only for disinfection when off, not a substitute for ethanol
- [ ] BSC certification (annual/after moves — HEPA integrity, airflow velocity)

**2.7.2 Incubators (CO₂, humidified)**
- [ ] Why 37 °C / 5% CO₂ / ~95% humidity (bicarbonate buffer coupling, §2.3)
- [ ] CO₂ sensor types (thermal conductivity vs. IR) and why IR is preferred (humidity confounds TC)
- [ ] Contamination control: HEPA-filtered "sterile" incubators (e.g., inCuSafe-style), copper interiors, water pans + fungicides, or dry/humidity-free designs
- [ ] Never open the door more than needed; CO₂ recovery time matters

**2.7.3 Microscopes**
- [ ] **Inverted vs. upright:** tissue culture uses *inverted* scopes (objective below the stage) — cells grow on the bottom of the dish, you look up through the plastic
- [ ] Brightfield vs. **phase contrast** (transparent cells need phase rings to create contrast — the standard culture scope)
- [ ] Fluorescence (epifluorescence) and confocal (optical sectioning — for 3D constructs, spheroids, organoids)
- [ ] Objective basics: magnification, numerical aperture (NA) ↔ resolution & brightness trade-off; 10×/20× are the culture workhorses
- [ ] Live-cell imaging: incubated chambers, stage-top incubators

**2.7.4 Centrifuges**
- [ ] **rpm vs. g-force** (RCF = 1.12 × r × rpm² × 10⁻⁵) — protocols say *g*, machines display rpm; use the rotor radius chart
- [ ] Swinging-bucket vs. fixed-angle rotors (gentler pelleting, tube position, resuspension behavior)
- [ ] Low-speed (cell pelleting, ~100–500 g) vs. high-speed (subcellular, protein prep)
- [ ] **Brake settings matter:** braking can resuspend fragile pellets (lymphocytes, hepatocytes); decelerate gently
- [ ] Balancing tubes — a physical-safety non-negotiable

**2.7.5 Cell counting & viability**
- [ ] Hemocytometer: the math, the 10⁴ constant, counting rules (count cells *on* two sides of the grid lines), trypan blue exclusion
- [ ] Automated: image-based (Countess-style), Coulter principle (electrical impedance), flow-based
- [ ] Viability assays: trypan blue (dead-cell dye), PI/7-AAD (flow), calcein-AM (live-cell)

**2.7.6 Cryopreservation kit**
- [ ] Freeze media (10% DMSO in serum or defined cryo-media), cooling rate ~−1 °C/min: **Mr. Frosty / isopropanol containers** vs. programmable (rate-controlled) freezers
- [ ] LN₂ storage: liquid phase vs. vapor phase (vapor avoids cross-contamination of vials); cryogloves and face protection — LN₂ is a serious burn/asphyxiation hazard
- [ ] −80 °C freezers as *short-term* storage; DMSO toxicity *at room temperature* — thaw fast (37 °C water bath), dilute slowly, plate in pre-warmed media
- [ ] Vial labeling, inventory, and the "freeze early, freeze often" rule (MCB/WCB, §2.6)

**2.7.7 Sterilization equipment & methods**
- [ ] **What kills what:** autoclave (steam, 121 °C/15 min — moist heat denatures proteins; kills everything incl. spores), dry heat (glass, metal), ethylene oxide (heat-sensitive plastics), gamma/e-beam (single-use disposables), UV (surfaces only — shadowing, no penetration), filtration (0.22 µm for media/sera — *sterile filtration*, the standard for heat-sensitive liquids)
- [ ] Why you can't autoclave media (heat-labile glutamine, vitamins), why you can't filter-fumigate
- [ ] Sterility indicators (autoclave tape, biological indicators/spore ampoules)

**2.7.8 Cultureware & consumables**
- [ ] **TC-treated vs. untreated polystyrene:** gas-plasma/corona treatment adds surface charge for protein adsorption → cell attachment; untreated plastic = suspension culture
- [ ] ECM coatings: collagen, fibronectin, laminin, poly-L-lysine (neural), Matrigel — when and why
- [ ] Vessel zoo: T-flasks (T25/T75/T175), multi-well plates (6/12/24/96), petri dishes, cell factories, roller bottles, spinner flasks (suspension/beads), bioreactor vessels (Phase 3.4)
- [ ] Vented vs. non-vented caps (gas exchange!), filter caps vs. solid caps
- [ ] Pipettes: air-displacement (micropipettes) vs. positive-displacement (oily/viscous samples); serological pipettes + pipette-aid; multichannel for plates

**2.7.9 Support instruments**
- [ ] pH meters (calibration discipline) and osmometers (media osmolarity ~300–350 mOsm/kg — Gibco high-glucose DMEM spec 320–355, low-glucose ~290–330; cells tolerate ~260–350, so it's a frequent hidden variable)
- [ ] Water baths / bead baths (bead baths are a contamination reduction upgrade)
- [ ] Plate readers (absorbance/fluorescence — viability assays, ELISAs)
- [ ] Flow cytometers / FACS (Phase 1.2; the detachment/trypsin gotcha applies)
- [ ] Balances, vortexers, and the humble but critical 70% ethanol spray bottle

**2.7.10 Equipment qualification (the GMP bridge)**
- [ ] IQ/OQ/PQ (installation / operational / performance qualification) — what it means, why clinical translation requires it (Phase 4)
- [ ] Calibration & maintenance schedules as data, not chores

### 2.8 Bench skills checklist (NEW — practice, not reading)

- [ ] **Pipetting accuracy:** micropipette technique (proper tip immersion, no air bubbles, correct aspiration speed); the ±2%–±5% reality of air-displacement pipettes; when to calibrate
- [ ] **Serial dilution math** as second nature (10-fold series, error propagation — connect to Phase 1.6)
- [ ] **Aseptic workflow drill:** ethanol everything → work deep in the BSC → one-handed cap handling → never pass hands over open vessels
- [ ] **Passaging protocol run-through:** aspirate → wash (PBS) → EDTA/trypsin → incubate (watch for detachment) → neutralize with serum-containing media → count → seed at target density → label with line, passage, date
- [ ] **Trypan blue counting** with hemocytometer math verified against an automated counter once
- [ ] **Cryopreservation drill:** freeze a vial at low passage, thaw it a week later, assess recovery
- [ ] **Contamination recognition:** the look of bacteria (turbid), yeast (pearl-like floaters), fungi (fuzzy/threads), and mycoplasma (you can't see it — you *test*)
- [ ] **Notebook discipline:** everything dated, every bottle lot-numbered, every deviation noted
- [ ] **Read a protocol like a grad student:** decode \"subculture 1:4 every 3 days\" → split ratio, seeding density, expected harvest date; decode \"plate at 2×10⁵ cells/well in 6-well\" → total cells needed = wells × density × (1 + dead-cell buffer); identify the *critical reagents* listed per step (serum lot, coating, enzyme) — those are the variables that break experiments

### Go deeper (grad-level)

- **Freshney, *Culture of Animal Cells: A Manual of Basic Technique*** — the bench bible; the definitive treatment of every 2.x topic.
- **Weiskirchen et al. (2023)** — [PMC10000895](https://pmc.ncbi.nlm.nih.gov/articles/PMC10000895/) — the best 30-page modern overview of contamination, QC, and practice.
- **GCCP 2.0** (Pamies et al., ALTEX 39(1):30–70, 2022) — official good-practice guidance; the field's "how to not embarrass yourself" standard.
- **ATCC & ICLAC** databases (cell line authentication); **Cellosaurus** for cell-line metadata.
- **Thermo Fisher (Gibco), Corning, STEMCELL** cell-culture basics handbooks — free, vendor-agnostic-enough, practical; the Corning/ATCC manuals are effectively free textbooks.
- **Biosafety:** CDC/NIH *Biosafety in Microbiological and Biomedical Laboratories (BMBL)* for BSL classifications; NIH Guidelines for rDNA.
- **Self-check:** explain why cell culture in a fume hood always fails; why mycoplasma is the scariest contaminant; why passage number ≠ doubling number.

---

## Phase 3 — Grad Level: Tissue Engineering & Regenerative Medicine

**The field's core equation:**

```
cells + scaffolds + signals = engineered tissue
```

TERM combines this with cell therapy, gene therapy, and immunomodulation. Phase 2 was the craft; Phase 3 is the engineering: materials, physics, transport, and the gene tools that make it go.

### Beginner primer

Once you can grow cells, the question is *how do you make them into tissue?* Three sub-problems define the field: (1) **structure** — what do you grow them on (scaffolds/materials, §3.2–3.3); (2) **supply** — how do nutrients get in and waste out when there's no blood supply (transport, §3.4 — the field's central bottleneck); (3) **control** — how do you program cells to become the right tissue (§3.5) and survive the immune system (§3.6).

### 3.1 Principles of tissue engineering

- [ ] The tissue engineering triad; design criteria for functional replacement (structure, mechanics, integration, vascularization)
- [ ] Tissue-specific case studies: skin, cartilage, bone, blood vessels, pancreas, liver, nerve, cardiac
- [ ] Acellular approaches: decellularized organs/tissues recellularized with patient cells
- [ ] Cell therapy vs. tissue replacement vs. in-situ regeneration (three strategy families — know the difference)

### 3.2 Biomaterials science

**Beginner primer:** a scaffold is a temporary synthetic ECM — it must hold cells in the right shape, let them attach and spread, degrade on the right timescale as cells replace it with their own matrix, and not inflame the host. Two big families: natural (extracted from organisms — biocompatible, but batch-variable and often weak) and synthetic (fully defined, tunable, but need surface/chemistry tricks to be cell-friendly).

- [ ] **Natural materials:** collagen, fibrin, alginate, hyaluronic acid, Matrigel; crosslinking chemistry (e.g., phenolic acids modifying collagen)
- [ ] **Synthetic polymers:** PLGA, PCL, PEG, PLA — degradation kinetics (hydrolysis), mechanical properties, the lactide/glycolide ratio as a degradation-timing dial
- [ ] **Hydrogels:** polymer networks swollen in water; swelling, stiffness, tunable crosslinking; cell-friendly, injectable, the workhorse of cell delivery
- [ ] **Mechanical properties primer:** stress–strain, Young's modulus (stiffness), viscoelasticity (time-dependent — tissues are squishy-and-springy); stiffness *matters biologically* — cells sense it (mechanotransduction; stem cells differentiate by substrate stiffness)
- [ ] Biocompatibility, foreign body response, hemocompatibility
- [ ] **Scaffold fabrication:** electrospinning, freeze-drying, salt leaching, textile methods; isotropic vs. anisotropic architectures (aligned fibers guide nerve/tendon regeneration)

### 3.3 3D culture systems & bioprinting

**Beginner primer:** 2D culture is a convenience, not biology — cells on flat plastic see a world of infinite food and no neighbors. 3D culture (spheroids, organoids, scaffolds) restores cell–cell contact, gradients, and tissue-like architecture — which is why drug screening on 2D predicts so poorly.

- [ ] 2D vs. 3D: spheroids, organoids, scaffold-seeded constructs — what each recapitulates and misses
- [ ] 3D bioprinting: extrusion, inkjet, laser-assisted; **bioinks** (cell-laden hydrogels — printability vs. cell viability trade-off); patient-specific craniofacial and orthopedic implants
- [ ] Organ-on-a-chip / microphysiological systems (e.g., "liver-in-a-dish" for drug toxicity screening)

### 3.4 Bioreactors & transport phenomena

**Beginner primer:** the single most important number in tissue engineering is **~100–200 µm** — the maximum distance oxygen diffuses through tissue before cells suffocate. A 1 cm thick engineered organ is 50× beyond that. Every strategy in the field (vascularization, microchanneling, perfusion, small constructs) exists to defeat the diffusion limit. This is *the* central engineering bottleneck, and it's a physics problem you can reason about quantitatively.

- [ ] **Mass transfer limits:** Fick's law intuition (flux ∝ concentration gradient / distance); oxygen and nutrient diffusion (~100–200 µm viable distance from a vessel); the vascularization problem
- [ ] **Vascularization strategy families (know the options):** prevascularization in vitro (seed endothelial cells, let them form networks) → anastomosis on implant; angiogenic growth-factor delivery (VEGF/bFGF gradients) to recruit host vessels; 3D-printed/microchanneled vascular networks; in vivo prevascularization (AV loop chambers); decellularized organ vasculature (Phase 4 frontier)
- [ ] Bioreactor types: perfused/flat-bed and hollow-fiber bioreactors (nutrient-rich flow through the construct), spinner flasks, rotating-wall vessels, rocking/wave bag bioreactors (large-scale suspension) — each a different way to fight mass-transfer limits
- [ ] **Quantitative transport tools:** Fick's law (flux = −D·dC/dx), diffusion coefficient D ≈ 2×10⁻⁹ m²/s for O₂ in tissue; diffusion length scales as √(Dt) — ~100–200 µm in seconds (√(Dt) with D ≈ 2×10⁻⁹ m²/s: ~140 µm at 10 s), mm-scale in hours, cm-scale over a day (why perfusion, not waiting, is the answer) — note the *viability* limit (~100–200 µm) is a steady-state penetration depth set by oxygen *consumption*, not bare diffusion spreading; **Péclet number** (convection vs. diffusion ratio) for bioreactor design; shear stress τ = μ·dv/dy — cells are mechanosensitive to flow (endothelial alignment, MSC fate; Engler 2006: matrix stiffness 0.1–1 kPa neurogenic / 8–17 kPa myogenic / 25–40 kPa osteogenic)
- [ ] **Mechanical conditioning:** shear stress, cyclic strain, compression — mechanobiology (cells sense and respond to force; bone/cartilage/vessel constructs *need* mechanical training to develop); oxygen: measure pO₂, don't assume
- [ ] Oxygen measurement in culture (oxygenators, pO₂ sensors) — an underrated experimental variable

### 3.5 Gene & cell engineering tools

**Beginner primer:** making tissue sometimes means editing cells first — knock out a gene, add a reporter, deliver a growth factor. The toolbox splits into *editing* (CRISPR — permanent, targeted changes) and *delivery* (vectors — getting DNA/RNA into cells). Delivery is the hard part in practice; viral vectors are the reliable workhorses but every one has cargo-size limits and safety baggage.

- [ ] CRISPR/Cas9 editing: double-strand break + repair path matters — **NHEJ** (error-prone → knockout) vs. **HDR** (template-driven → knock-in, low efficiency); delivery as RNP, plasmid, or viral; aware of base editing / prime editing for single-nucleotide changes; gene silencing (siRNA/shRNA); transfection vs. transduction
- [ ] Getting DNA into cells: lipofection/electroporation (transfection) vs. viral delivery (transduction); **MOI (multiplicity of infection)** = virus particles ÷ cells — the transduction planning number
- [ ] **Viral vectors table:**

| Vector | Cargo size | Integrates? | Tropism/notes | Safety concerns |
|---|---|---|---|---|
| Lentivirus (HIV-based) | ~8–9 kb | Yes (dividing + non-dividing) | Broad; stable expression | Insertional mutagenesis; BSL-2+ |
| Retrovirus (MLV-based) | ~7–8 kb | Yes (dividing cells only) | Stable, but needs dividing cells | Insertional mutagenesis |
| AAV | ~4.7 kb | Mostly episomal (no integration) | Long-term expression, low immunogenicity | Cargo limit; pre-existing immunity |

- [ ] Recombinant protein/growth-factor production; controlled delivery from scaffolds (release kinetics as design parameter)
- [ ] **Key growth factors:** VEGF (vascularization), BMPs (bone), FGF, TGF-β, EGF — each is a Phase 1.1 pathway ligand; knowing the pathway tells you the biology

### 3.6 Immunomodulation & transplantation

- [ ] Immune response to biomaterials and engineered constructs (foreign body response: protein adsorption → macrophage recruitment → fibrosis)
- [ ] Immune-evasive cell engineering (e.g., hypoimmunogenic iPSCs via HLA editing)
- [ ] Encapsulation strategies (alginate beads as immune barriers — islet transplantation)
- [ ] Tolerance induction; the continuum from immunosuppression to immune-evasive design

### 3.7 Disease modeling & applications

- [ ] Pathology-driven design: traumatic brain/spinal cord injury, peripheral nerve injury, cirrhosis, diabetes, atherosclerosis, ischemic heart disease, aneurysms, skin wounds
- [ ] Animal injury/regeneration models: liver, skin wound, stroke, myocardial infarction — what each models, what it can't
- [ ] Cell function assessment and functional assessment of implanted constructs (histology, immunofluorescence, functional assays — connect to Phase 1.2 microscopy)

### 3.8 The quantitative/computational layer (your home turf)

**Beginner primer:** you come from computation — this is where you'll outpace your bench colleagues. The field's data and its hardest problems (design, transport, differentiation control) are quantitative. If you invest in this layer you can be the person who *designs* the experiments others run.

- [ ] Single-cell RNA-seq and lineage tracing analysis (scanpy, Seurat)
- [ ] Image analysis of histology/cultures (segmentation, morphology quantification — CellProfiler, deep learning)
- [ ] **Design of experiments + Bayesian optimization of media/differentiation conditions (active learning on expensive wet-lab experiments — a genuine research niche)**
- [ ] Agent-based and continuum models of tissue growth; morphogen gradient simulation
- [ ] ML for bioprinting parameter optimization and scaffold design
- [ ] Mechanistic models of the diffusion limit (§3.4) — a natural first modeling project

### Go deeper (grad-level)

- **Lanza, Langer, Vacanti & Atala, *Principles of Tissue Engineering*** — the definitive textbook; read cover to cover in months 5–9.
- **Palsson & Bhatia, *Tissue Engineering*** — shorter, more quantitative; pairs well with 3.4.
- **Ratner et al., *Biomaterials Science*** — the materials bible.
- **Journals to read weekly:** *Tissue Engineering Parts A/B/C*, *Biofabrication*, *Nature Biomedical Engineering*, *Cell Stem Cell*, *npj Regenerative Medicine*, *Frontiers in Bioengineering and Biotechnology*.
- **Courses:** Northwestern BMD_ENG 346/347/348; VCU EGRB 614/616/618; NJIT BME 651/656/681 — *verify current catalog numbers before enrolling; these change.*
- **Self-check:** explain the ~100–200 µm limit and three ways to defeat it; pick any growth factor and name its pathway; explain why a scaffold's degradation rate must match tissue formation rate.

---

## Phase 4 — Translation, Regulation & the Research Frontier

**Goal:** understand how engineered tissue becomes a *therapy* (or doesn't), and where the field is heading.

### 4.1 From bench to bedside

- [ ] GMP (Good Manufacturing Practice) for cell/tissue products; cleanrooms; the QC bridge from §2.6–2.7
- [ ] FDA regulatory pathways for biologics and combination products (CBER; HCT/P rules — "minimal manipulation" vs. "more than minimal manipulation" changes everything)
- [ ] Clinical trial phases; preclinical model requirements (safety, toxicity, efficacy evidence hierarchy)

### 4.2 Ethics & governance

- [ ] ESC ethics and why iPSCs were revolutionary (ethics drove the science)
- [ ] IRB (human subjects), IACUC (animal work); the 3Rs (Replacement, Reduction, Refinement) driving the shift from animal models to cell culture
- [ ] Genetically modified cell line oversight (IBC/NIH rDNA); donor consent for tissue sourcing

### 4.3 Frontier topics (for literature reading)

- [ ] Whole-organ decellularization/recellularization with vasculature (the diffusion limit's ultimate test)
- [ ] In vivo reprogramming and transdifferentiation (build tissue where it belongs)
- [ ] Organoid intelligence / assembloids
- [ ] Cultivated meat (literally tissue engineering you eat)
- [ ] Senescence, aging, and rejuvenation of engineered tissue

### Go deeper (grad-level)

- **Wyles et al. (2019), *Regenerative medicine curriculum for next-generation physicians*** (npj Regen Med) — a discovery→translation→application blueprint.
- **FDA guidance documents** on HCT/Ps and cell/gene therapy (the regulatory ground truth).
- **Nature Reviews Bioengineering, Science Translational Medicine** — frontier reviews.
- **Self-check:** explain what "minimal manipulation" means for regulatory classification; name one ethical argument that motivated iPSC research.

---

## Appendix A — Equipment & Safety Master Tables

### A.1 Hoods: who protects what

| Device | Protects | Mechanism | Use for | Never for |
|---|---|---|---|---|
| Chemical fume hood | You | Air drawn away; exhausted outside; no HEPA, no sterility | Fixation, solvents, acids, phenol/chloroform RNA extraction, ethidium bromide, DMSO handling, β-mercaptoethanol | Cell culture (guaranteed contamination) |
| Biosafety cabinet, Class II (A2) | You **and** culture | HEPA laminar downflow + air curtain; recirculated | All cell/tissue culture | Volatile chemistry (recirculated fumes hit you) |
| Biosafety cabinet, Class II (B2) | You **and** culture | HEPA + hard-ducted exhaust | Culture with volatile/radioactive hazards | — |
| Laminar-flow clean bench | Product only | HEPA air blown at you | Non-hazardous sterile prep | Any biohazard |

**Rule of thumb:** fume hood = chemistry safety; biosafety cabinet = biology sterility + safety; clean bench = sterile prep only, never with biohazards.

### A.2 Sterilization methods: what each one kills

| Method | Conditions | Kills spores? | Use for | Limitations |
|---|---|---|---|---|
| Steam autoclave | 121 °C, ~15 min | Yes | Glassware, metal, autoclavable plastics, liquids | Heat-labile items destroyed |
| Dry heat | 160–180 °C, hours | Yes | Glass, metal, oils | Slow, very hot |
| Ethylene oxide (EtO) | Gas, low temp | Yes | Heat-sensitive plastics/electronics | Toxic residue, long aeration |
| Gamma / e-beam | Ionizing radiation | Yes | Single-use disposables (industry) | Sterilizes in the bag — no resterilization |
| UV (254 nm) | Surface, minutes | No (partial) | BSC work surfaces between uses | Shadowing; no penetration; doesn't replace ethanol |
| Sterile filtration | 0.22 µm membrane | Yes (physical removal) | Media, sera, buffers | Doesn't remove viruses reliably; heat-free |
| 70% ethanol | Contact ~1 min | No | Hands, surfaces, BSC | Not a sterilant — a sanitizer |

### A.3 Culture environment defaults (memorize)

| Parameter | Default | Why |
|---|---|---|
| Temperature | 37 °C | Body temperature |
| CO₂ | 5% | Holds bicarbonate buffer at pH 7.4 |
| Humidity | ~95% | Prevents media evaporation (osmolarity drift) |
| Freeze media DMSO | ~10% | Cryoprotectant (membrane stabilizer) |
| Cooling rate (freeze) | ~−1 °C/min | Avoids ice-crystal damage |
| Trypsin/EDTA dissociation | 37 °C, 2–5 min | Balance detachment vs. damage |
| Diffusion limit (tissue) | ~100–200 µm | Oxygen delivery ceiling — the field's central problem |

---

## Appendix B — Suggested Sequence & Time Budget

| Weeks | Focus | Primary material | Milestone / checkpoint |
|---|---|---|---|
| 1–4 | Phase 0 refresher | Alberts selected chapters + Weiskirchen (PMC10000895) | Explain central dogma & cell cycle from memory |
| 2–3 (months) | Phase 1 — signaling, mol bio techniques, dev bio, immunology | Gilbert + Janeway selected chapters; Addgene | Explain why trypsin breaks FACS panels |
| 3–5 (months) | Phase 2 — cell culture craft + equipment | Freshney + ATCC/Corning handbooks; shadow a cell-culture core facility or take a hands-on workshop | **Pass a line of HeLa end-to-end: thaw → passage → freeze** |
| 5–9 (months) | Phase 3 — bioengineering foundations | Lanza cover to cover; 1 paper/week from Biofabrication / npj Regen Med | Reproduce the diffusion-limit argument quantitatively |
| Ongoing | Phase 4 + frontier | 1 frontier paper/week; consider a structured MOOC (TU Delft / EPFL tissue engineering) | Draft a one-page proposal for a tissue construct |

**Time-budget advice:** the single highest-leverage activity is *bench time in a real lab* (even 2 h/week shadowing). Reading without hands-on cell culture is like reading about cycling.

---

## Appendix C1 — Common Cell Lines Cheat Sheet (memorize the cast)

| Line | Origin / type | Morphology / culture | Doubling time | Typical use | Gotchas |
|---|---|---|---|---|---|
| **HeLa** | Cervical carcinoma (Henrietta Lacks, 1951); the first immortal human line | Epithelial, adherent | ~24 h | The default human line; transfection, contamination-spread folklore | Contaminated world culture (HeLa was the original cross-contaminator); aneuploid |
| **HEK293** | Human embryonic kidney (adenovirus-transformed) | Epithelial-ish, adherent, easy transfection | ~20–36 h | Transfection / viral packaging (HEK293T with SV40 T-antigen) | Near-triploid; not "normal" kidney cells |
| **CHO** | Chinese hamster ovary | Epithelial, adherent (suspension-adapted variants) | ~14–24 h | The workhorse of industrial recombinant protein production | Glutamine synthetase / DHFR selection systems; karyotype instability |
| **NIH/3T3** | Mouse embryo fibroblast | Fibroblast-like, adherent, contact-inhibited | ~18–24 h | Feeder layers, standard fibroblast biology | Mouse — antibody/cytokine cross-reactivity mismatch |
| **MCF-7** | Breast adenocarcinoma | Epithelial, adherent | ~24–48 h | Estrogen-receptor-positive breast cancer model | Phenol red is weakly estrogenic — use phenol-red-free media (the classic gotcha) |
| **Caco-2** | Colon adenocarcinoma | Epithelial, spontaneously differentiates to enterocyte-like | ~3–5 days (slow) | Intestinal barrier / permeability (TEER, transwell) | 21-day differentiation protocol; passage-sensitive |
| **Jurkat** | T-cell leukemia | Suspension (round) | ~24 h | T-cell signaling, immune assays | Suspension — no trypsin; gentle handling |
| **HUVEC** | Primary human umbilical vein endothelial | Cobblestone, adherent | ~24–48 h primary | Vascular biology, angiogenesis assays | Primary — finite; low passage; needs endothelial growth factors (EGM-2) |
| **MSC** | Primary mesenchymal stem/stromal cell (BM, adipose) | Fibroblast-like, plastic-adherent | ~24–48 h primary | Differentiation (osteo/adipo/chondro), secretome | ISCT markers required for definition (§2.4); donor/site variability |
| **iPSC** | Reprogrammed somatic cell | Colony-forming, adherent on matrix | ~24–36 h | Pluripotency, differentiation, disease modeling | Maintenance discipline; spontaneous differentiation; karyotype check |

*Caveat: doubling times are typical ranges with lot/donor variation — check the literature for the exact line & passage you use.*

---

## Appendix C2 — Lab Calculations Cheat Sheet

| What | Formula | Example |
|---|---|---|
| Cell concentration (hemocytometer) | cells/mL = avg count per 4×4 grid × dilution factor × 10⁴ | 120 cells × 2 (1:2 dilution) × 10⁴ = 2.4×10⁶ cells/mL |
| Viability | live/(live+dead) × 100 (trypan blue) | 92/100 × 100 = 92% viable |
| Cells needed for seeding | wells × cells/well ÷ viability | 24 wells × 10⁵ ÷ 0.92 ≈ 2.6×10⁶ cells |
| Total cells from a flask | cells/mL × volume | 2.4×10⁶ × 12 mL = 2.9×10⁷ cells |
| Split ratio math | seed density = harvest count ÷ split ÷ flask area ratio | 50% confluent T75 → 1:4 → ~30% confluent T25 |
| Molarity | mol = mass ÷ MW; C = n/V | 4.5 g/L glucose (MW 180) ≈ 25 mM |
| Dilution series | C1V1 = C2V2 | 10 µL of 1 mM → 990 µL → 10 µM |
| RCF from rpm | RCF = 1.12 × 10⁻⁵ × r(cm) × rpm² | r=15 cm, 2000 rpm → ≈ 670 g |
| MOI (transduction) | virus particles = MOI × cell number | MOI 10 × 10⁶ cells = 10⁷ particles |
| Doubling time | Td = t·ln2 / ln(N/N0) | 10⁵ → 4×10⁵ in 48 h → Td ≈ 24 h |
| Oxygen diffusion distance | RMS displacement x ≈ √(2·D·t), D ≈ 2×10⁻⁹ m²/s | 10 s → ~200 µm; 1 min → ~490 µm; 1 h → ~3.8 mm |

*Note: pure diffusion alone reaches mm scale within a minute — the ~100–200 µm *viability* limit in §3.4 is a steady-state penetration depth set by oxygen *consumption*, not bare √(2Dt) spreading (Colton 1995-style analysis). The two are different numbers; don't mix them up.*

---

## Appendix C — Glossary (one-line definitions)

**Adherent culture** — cells that grow attached to a treated plastic surface; the default mode for most mammalian cells.
**Aneuploid** — abnormal chromosome number; typical of immortalized lines; a reproducibility liability.
**Anoikis** — apoptosis triggered by detachment from matrix; why some cells die if you trypsinize them hard.
**Apoptosis** — programmed cell death (caspase-driven, controlled); vs. necrosis (accidental, inflammatory).
**Bicarbonate buffer** — the CO₂/HCO₃⁻ pH system that media rely on; why incubators inject CO₂.
**Biological replicate** — independent samples (separate wells/vials); vs. technical replicate (same sample, re-measured).
**Bioink** — cell-laden hydrogel used in 3D bioprinting.
**Biosafety cabinet (BSC)** — HEPA-filtered hood protecting both operator and culture; where cell work happens.
**BSL (biosafety level)** — 1–4 hazard classifications defining containment requirements.
**Cell authentication** — verifying a cell line's true identity (STR profiling for human lines).
**Cell bank (MCB/WCB)** — master/working cryopreserved stocks; the reproducibility backbone.
**Central dogma** — DNA → RNA → protein; the flow of genetic information.
**Confluence** — % of surface covered by cells; passaging trigger (~70–90% for most lines).
**Contact inhibition** — growth arrest when cells touch; lost in transformed lines.
**CRISPR/Cas9** — programmable DNA editing system; the standard gene-editing tool.
**Cryoprotectant** — agent (DMSO, glycerol) preventing ice damage during freezing.
**Culture medium** — the defined chemical feed for cells (e.g., DMEM + supplements).
**Cyclin/CDK** — the cell-cycle clock proteins; checkpoint regulators.
**Decellularization** — removing cells from a tissue/organ, leaving ECM scaffold behind.
**Differentiation** — specialization of cells; the controlled version is *directed differentiation*.
**Diffusion limit** — ~100–200 µm max distance for oxygen transport without vasculature; the field's central bottleneck.
**Doubling time** — time for population to double; the growth-clock of a line.
**ECM (extracellular matrix)** — the protein scaffold (collagen, fibronectin…) cells live in.
**Endotoxin (LPS)** — bacterial cell-wall fragment; pyrogenic; measured by LAL assay.
**FACS** — fluorescence-activated cell sorting; flow cytometry that physically separates cells.
**FBS (fetal bovine serum)** — the classic media supplement; a variability and xeno-safety liability.
**Fibroblast** — the connective-tissue cell; the most common cell in culture history.
**Flow cytometry** — measuring cell properties (size, fluorescence) one cell at a time in a fluid stream.
**Fume hood** — exhausts chemical vapors away from the operator; no sterility; never for culture.
**GCCP 2.0** — Good Cell and Tissue Culture Practice; the field's official best-practice guidance (Pamies et al., ALTEX 39(1):30–70, 2022).
**GlutaMAX** — stable glutamine dipeptide; glutamine degrades in solution otherwise.
**GMP** — Good Manufacturing Practice; the regulated production standard for clinical products.
**Hayflick limit** — the finite doubling capacity of primary cells (~40–60 for human fibroblasts).
**Hemocytometer** — manual counting chamber; cells/mL = count × dilution × 10⁴.
**HEPA** — high-efficiency particulate air filter; the core of BSC and cleanroom air handling.
**Hydrogel** — water-swollen polymer network; the main soft-tissue scaffold and cell-delivery vehicle.
**ICLAC** — International Cell Line Authentication Committee; keeps the misidentified-lines register (608 lines, v14 2026).
**Immortalization** — making cells divide indefinitely (hTERT, SV40 T-antigen, transformation).
**Innate vs. adaptive immunity** — fast generic vs. slow specific immune responses; both reject grafts.
**Integrin** — cell-surface adhesion receptor binding ECM; the trypsin-vulnerable class of proteins.
**iPSC** — induced pluripotent stem cell (Yamanaka factors: Oct4/Sox2/Klf4/c-Myc); patient-matched pluripotency without embryos.
**Karyotype** — the chromosome complement; aneuploidy is the rule in continuous lines.
**Lentivirus** — integrating viral vector (8–9 kb cargo); workhorse for stable transgene delivery.
**Mechanotransduction** — cells sensing and responding to mechanical force; why stiffness and shear matter.
**Mitosis** — equal nuclear division for growth; vs. meiosis (halved, for gametes).
**MOI (multiplicity of infection)** — virus particles per cell; the transduction planning number.
**HDR vs. NHEJ** — the two DNA-repair paths after a CRISPR cut: homology-directed (precise knock-in) vs. non-homologous end joining (error-prone knockout).
**Péclet number** — convection ÷ diffusion ratio; the bioreactor design dial for mass transport.
**Shear stress** — frictional force per area from fluid flow (τ = μ·dv/dy); cells sense it (mechanobiology).
**Sendai virus reprogramming** — integration-free iPSC delivery of Yamanaka factors.
**Episomal plasmid** — non-integrating circular DNA; another clinical-grade iPSC reprogramming route.
**ISCT criteria** — the operational MSC definition (plastic adherence, CD105/CD73/CD90+, trilineage).
**HCT/P** — human cell, tissue, or cellular/tissue-based product; regulated under 21 CFR 1271.
**Homologous use** — the HCT/P must function in the recipient as it did in the donor.
**kLa** — volumetric oxygen mass-transfer coefficient; the bioreactor oxygenation efficiency number.
**ISO 5 / Grade A** — the cleanroom class for aseptic manipulation; surrounding rooms ISO 7/Grade B.
**MOA** — mechanism of action; what a product *does* at the molecular level (regulatory language).
**Mycoplasma** — ~0.15–0.3 µm cell-wall-less contaminant; invisible, penicillin-resistant, data-corrupting.
**Necrosis** — accidental cell death; inflammatory; vs. apoptosis.
**Niche** — the in-vivo microenvironment maintaining stem cells.
**Organoid** — 3D self-organizing miniature organ; disease modeling and drug testing.
**Passage** — one round of splitting/replating; passage number ≠ population doublings.
**Phenol red** — pH indicator in media (yellow ~6.8 → red ~7.4 → pink/magenta >8.2); weak estrogenic activity.
**Pluripotent** — can become any cell of the three germ layers (ESCs, iPSCs).
**Primary cells** — freshly isolated, finite-lifetime cells; the closest to in-vivo behavior.
**qPCR** — quantitative PCR; measuring DNA/RNA amounts; the standard mycoplasma detection readout.
**Scaffold** — temporary synthetic ECM providing structure during tissue formation.
**SCNT** — somatic cell nuclear transfer; the Dolly method; reproductive/therapeutic cloning.
**Self-renewal** — stem-cell division producing another stem cell.
**Senescence** — permanent growth arrest; the terminal state of primary cultures.
**Spheroid** — simple 3D cell aggregate; midway between 2D and organoid.
**STR profiling** — short tandem repeat fingerprinting; the standard human cell-line ID test.
**Tissue engineering triad** — cells + scaffolds + signals → engineered tissue.
**Transfection** — introducing nucleic acids into cells by non-viral means (chemical/electrical).
**Transduction** — introducing nucleic acids via viral vectors.
**Trypsinization** — enzyme+EDTA detachment of adherent cells; the everyday passaging step.
**Trypan blue** — viability dye; live cells exclude it.
**Vascularization** — building blood vessels into engineered tissue; the field's grand challenge.
**Viscoelasticity** — time-dependent mechanical behavior (tissues are both elastic and viscous).
**Yamanaka factors** — Oct4, Sox2, Klf4, c-Myc; reprogram somatic cells to iPSCs.
**Xeno-free** — free of animal-derived components; required for clinical translation.

---

## Appendix D — Common Misconceptions & Failure Modes

1. **"The fume hood is fine for cells."** No. It has no HEPA flow and no sterility; you will contaminate everything. Fume hood = chemicals; BSC = cells. (Appendix A.1.)
2. **"Pen/strep in everything = safe."** Routine antibiotics alter gene expression, hide contamination until it's catastrophic, and breed resistance. Prophylactic antibiotics are a crutch; aseptic practice is the fix.
3. **"More FBS = healthier cells."** FBS is a variable, not a vitamin: it changes batch to batch, is a top contamination vector, and is a clinical-translation blocker. 10% vs. 20% is a design decision, and serum-free options exist.
4. **"All HeLa are alike" / "my line is fine."** Misidentified and cross-contaminated lines are a documented pandemic (ICLAC's register lists 608 lines, v14). If you haven't STR-profiled and tested for mycoplasma, you don't actually know what you're growing.
5. **"Passage 5 and passage 30 are the same cells."** They are not — drift, selection, and aneuploidy accumulate. Use low passages and bank early (MCB/WCB).
6. **"The cells look fine, so they're clean."** Mycoplasma is invisible, changes results, and doesn't cloud media. "Looks fine" is not a mycoplasma test.
7. **"Mycoplasma is a bacterial infection — use antibiotics."** Mycoplasma lacks a cell wall; β-lactams (pen/strep) don't touch it. It needs dedicated eradication (Plasmocin, BM-Cyclin) or disposal.
8. **"3D is always better than 2D."** 3D adds gradients and cell–cell contact but also new confounding variables (diffusion artifacts, necrotic cores). Match the model to the question.
9. **"The scaffold is inert."** Materials are biological actors: degradation products, stiffness, and surface chemistry all signal cells (mechanotransduction, §3.2).
10. **"If it works in a dish it will work in vivo."** The diffusion limit (§3.4), the immune system (§3.6), and regulatory reality (§4.1) are exactly why most dish-successes fail in translation.
11. **"Autoclaving media is fine."** Heat destroys glutamine/vitamins; media is sterile-filtered, not autoclaved.
12. **"UV in the hood sterilizes everything."** UV is a surface sanitizer with shadowing; it does not penetrate and does not kill spores. Ethanol + BSC airflow are the real protection.

---

## Appendix E — Self-Assessment Checkpoints

**End of Phase 0:** Explain the central dogma; sketch a cell and name 6 organelles with functions; describe apoptosis vs. necrosis in one sentence each; name the cell-cycle phases and one checkpoint each; say why cells in a dish need pH buffering.

**End of Phase 1:** Name one ligand, receptor, and downstream effector for 4 of the 8 core pathways; explain why trypsinization matters for FACS; describe what STR profiling detects and why ICLAC exists; name the three germ layers; distinguish biological vs. technical replicates.

**End of Phase 2 (the big one):** Explain the four meanings of "cloning"; do the passaging math (split ratio → seeding density → expected harvest in N days); describe the growth-curve phases and what confluence means; explain why 5% CO₂ and 37 °C; run the contaminant-zoo triage (cloudy → bacteria; pearly floaters → yeast; nothing visible → test for mycoplasma); explain MCB/WCB banking; for each piece of equipment in §2.7, say what it's for and one way to ruin it; pass a line of cells thaw→passage→freeze.

**End of Phase 3:** Write the TERM equation and expand each term; explain the ~100–200 µm diffusion limit and three engineering responses; classify a scaffold (natural/synthetic, degradation, modulus) from its name; pick any growth factor and trace it through its pathway; compare lentivirus vs. AAV (cargo, integration, safety); explain the foreign body response in 3 steps; name one quantitative method you could apply to a media-optimization problem.

**End of Phase 4:** Classify a hypothetical product as HCT/P or drug by the "minimal manipulation" rule; explain why iPSCs changed the ethics debate; name two frontier topics and the bottleneck each addresses.

---

## Reference Library (graded)

### Beginner (read these first — free, practical)

- **Weiskirchen et al. (2023), *A Beginner's Guide to Cell Culture: Practical Advice for Preventing Needless Problems*, Cells 12(5):682** — [PMC10000895](https://pmc.ncbi.nlm.nih.gov/articles/PMC10000895/)
- **Gibco/Thermo Fisher *Cell Culture Basics* handbook** — free PDF, the standard intro
- **Corning / ATCC cell culture guides** — free, practical, vendor-neutral enough
- **Khan Academy Biology; MIT OCW 7.01SC** — refresher videos
- **Addgene protocols & plasmid education** — molecular cloning 101
- **CDC/NIH BMBL** — biosafety classifications, free PDF

### Intermediate (structured textbooks)

- **Alberts et al., *Molecular Biology of the Cell*** (Phase 0–1)
- **Gilbert & Barresi, *Developmental Biology***; **Janeway's *Immunobiology*** (Phase 1)
- **Freshney, *Culture of Animal Cells*** — the cell-culture bench bible (Phase 2)
- **GCCP 2.0** (Pamies et al., ALTEX 39(1):30–70, 2022) — official good-practice guidance (Phase 2)
- **Palsson & Bhatia, *Tissue Engineering*** — quantitative, shorter (Phase 3)

### Grad-level (the deep end)

- **Lanza, Langer, Vacanti & Atala, *Principles of Tissue Engineering*** — the field's definitive textbook (Phase 3)
- **Ratner et al., *Biomaterials Science*** — materials bible (Phase 3.2)
- **Wyles et al. (2019), *Regenerative medicine curriculum for next-generation physicians* (npj Regen Med)** — translation blueprint (Phase 4)
- **FDA HCT/P and cell/gene therapy guidance documents** (Phase 4)

### Journals (weekly reading diet)

*Tissue Engineering Parts A/B/C* · *Biofabrication* · *Nature Biomedical Engineering* · *Cell Stem Cell* · *npj Regenerative Medicine* · *Science Translational Medicine* · *Nature Reviews Bioengineering* · *Frontiers in Bioengineering and Biotechnology*

### Databases & tools

- **ICLAC Register of Misidentified Cell Lines** — iclac.org (608 lines, v14, 2026)
- **ATCC** (cell lines, authentication, culture info) · **Cellosaurus** (cell-line metadata)
- **Addgene** (plasmids, protocols)
- **scanpy / Seurat / CellProfiler** — the computational toolkit for §3.8
