---
layout: page
title: Tissue Engineering Textbook
permalink: /tissue-textbook/
description: A textbook-style companion to the TERM Lab Park simulation — five chapters, fifteen stations, one construct from donor tissue to implantation.
excerpt: A textbook-style companion to the TERM Lab Park simulation — five chapters, fifteen stations.
---

<style>
.tt-app { max-width: 760px; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif; font-size: 17px; line-height: 1.65; color: #1e293b; }
.tt-app h2 { font-size: 1.7rem; margin: 0 0 .5rem; line-height: 1.25; }
.tt-app h3 { font-size: 1.3rem; margin: 2rem 0 .25rem; }
.tt-lede { font-size: 1.1rem; color: #334155; }
.tt-kicker { font-family: ui-monospace, Menlo, monospace; font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; color: #64748b; margin: 0 0 .25rem; }
.tt-chapter { margin: 3rem 0; padding-top: 1rem; border-top: 3px double #cbd5e1; }
.tt-toc { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem 1.25rem; font-size: .95rem; }
.tt-toc-title { font-weight: 700; margin: 0 0 .5rem; }
.tt-toc ol { margin: .25rem 0; padding-left: 1.25rem; }
.tt-toc ul { padding-left: 1.1rem; }
.tt-toc a { color: #1d4ed8; text-decoration: none; }
.tt-objective { background: #f0fdf4; border-left: 4px solid #16a34a; padding: .6rem .9rem; }
.tt-tag { font-family: ui-monospace, Menlo, monospace; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: #64748b; }
.tt-takeaway { background: #fffbeb; border-left: 4px solid #d97706; padding: .6rem .9rem; }
.tt-watch { background: #eff6ff; border-left: 4px solid #2563eb; padding: .6rem .9rem; }
.tt-quiz { margin-top: 2rem; background: #fafafa; border: 1px solid #e2e8f0; border-radius: 10px; padding: 1rem 1.25rem; }
.tt-quiz-title { font-weight: 700; margin: 0 0 .5rem; }
.tt-quiz details { margin: .5rem 0; }
.tt-quiz summary { cursor: pointer; }
.tt-explain { color: #475569; font-size: .95rem; }
.tt-provenance { color: #64748b; font-size: .85rem; border-top: 1px solid #e2e8f0; margin-top: 3rem; padding-top: 1rem; }
@media print { .tt-toc { break-after: avoid; } .tt-chapter { break-before: page; } }
</style>

<div class="tt-app">

<p class="tt-lede">A literary companion to the <a href="{{ site.baseurl }}/apps/tissue-roadmap-sim/">TERM Lab Park simulation</a>: one living construct from donor tissue to surgical implantation, in five chapters and fifteen stations. Read straight through, or dip into any station — each ends with its takeaway.</p>

<nav class="tt-toc"><p class="tt-toc-title">Contents</p><ol><li><a href="#ch1">Chapter 1 — Cell Sourcing</a><ul><li><a href="#st-procurement">Tissue Procurement</a></li><li><a href="#st-digestion">Enzymatic Digestion</a></li><li><a href="#st-isolation">Cell Isolation &amp; Filtration</a></li></ul></li><li><a href="#ch2">Chapter 2 — Cell Culture</a><ul><li><a href="#st-expansion">Expansion Bioreactors</a></li><li><a href="#st-characterization">MSC Characterization</a></li></ul></li><li><a href="#ch3">Chapter 3 — Build the Construct</a><ul><li><a href="#st-scaffold">Scaffold Fabrication</a></li><li><a href="#st-seeding">Cell Seeding</a></li><li><a href="#st-perfusion">Perfusion Bioreactor</a></li><li><a href="#st-conditioning">Mechanical Conditioning</a></li></ul></li><li><a href="#ch4">Chapter 4 — Quality and Release</a><ul><li><a href="#st-histology">Histology &amp; Imaging</a></li><li><a href="#st-mechanical_test">Mechanical Testing</a></li><li><a href="#st-sterility">Sterility Testing</a></li><li><a href="#st-release">Release &amp; Packaging</a></li></ul></li><li><a href="#ch5">Chapter 5 — Clinical Delivery</a><ul><li><a href="#st-preop">Pre-op Staging</a></li><li><a href="#st-implantation">Surgical Implantation</a></li></ul></li></ol></nav><nav class="tt-toc"><p class="tt-toc-title">Part II — Beyond the line</p><ol><li><a href="#bx-foundations">Foundations: cells, matrix, and how tissues form</a></li><li><a href="#bx-stem-cells">Stem cells beyond MSCs</a></li><li><a href="#bx-gene-tools">Gene and cell engineering tools</a></li><li><a href="#bx-invivo-transplant">In vivo synthesis and transplantation</a></li><li><a href="#bx-organs">Organ gallery: what each tissue demands</a></li><li><a href="#bx-emerging">Emerging technologies</a></li><li><a href="#bx-regulation">Regulation, business, and ethics</a></li></ol></nav>

<section class="tt-chapter" id="ch1">
<p class="tt-kicker">Chapter 1 · build</p>
<h2>Cell Sourcing</h2>
<p class="tt-objective"><strong>Learning objective.</strong> Turn donor tissue into a viable, enriched cell population.</p>
<p>Every construct starts as someone else's tissue. This module is about rescue: harvest cleanly, free single cells, enrich the right ones.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Watch the carrier gain its first pink cell pellet after Isolation, and Live Cells jump 0 → 500k.</p>
<article class="tt-station" id="st-procurement">
<h3>Tissue Procurement</h3>
<p class="tt-tag">STERILE FIELD · Module 1 of 5</p>
<p class="tt-lede">Aseptic harvest of donor tissue under BSC Class II.</p>
<p>Tissue procurement is the critical first step -- everything downstream depends on the quality of the starting material.</p>
<p>Performed in a Class II biosafety cabinet (BSC) under ISO 5 conditions. The BSC protects both the operator (inward airflow) and the tissue (HEPA-filtered downflow).</p>
<p>Key parameters: cold ischemia time &lt; 24h for most tissues; transport in chilled DMEM + antibiotics (pen/strep/gentamicin + amphotericin B); donor screening for infectious disease markers (HIV, HBV, HCV, syphilis) per 21 CFR 1271.</p>
<p>Tissue is rinsed 3x in sterile PBS + antibiotic cocktail before transfer to digestion station.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Quality in = quality out: cold ischemia + donor screening decide everything downstream.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Pallet arrives empty — tissue enters. No cell count yet.</p>
</article>
<article class="tt-station" id="st-digestion">
<h3>Enzymatic Digestion</h3>
<p class="tt-tag">ENZYME REACTOR · Module 1 of 5</p>
<p class="tt-lede">Collagenase/dispase digestion to liberate cells from ECM.</p>
<p>Enzymatic digestion breaks down the extracellular matrix (ECM) to release viable single cells.</p>
<p>Standard cocktail: Collagenase Type I/II (1-2 mg/mL) + Dispase (2-4 U/mL) in DMEM/F12. Collagenase cleaves native collagen; Dispase (a neutral protease) cleaves fibronectin/laminin at the basement membrane.</p>
<p>Incubation: 37 C, 30-90 min with gentle agitation. Over-digestion damages surface receptors (integrins, CD markers) -- monitor viability with trypan blue every 15 min.</p>
<p>Quench with 10% FBS/DMEM (serum inhibits proteases). Filter through 70 um cell strainer to remove undigested fragments.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Enzymes free cells from ECM; over-digestion strips the receptors you need later.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> No count change — viability is the hidden variable here.</p>
</article>
<article class="tt-station" id="st-isolation">
<h3>Cell Isolation &amp; Filtration</h3>
<p class="tt-tag">FILTRATION · Module 1 of 5</p>
<p class="tt-lede">Density gradient + strainer to isolate target cell population.</p>
<p>Crude digest contains fibroblasts, endothelial cells, immune cells, and target progenitors. Isolation enriches the desired population.</p>
<p>Density gradient centrifugation (Ficoll-Paque, 1.077 g/mL) separates mononuclear cells (lymphocytes, MSCs) from granulocytes/erythrocytes. MSCs adhere to plastic -- the simplest enrichment.</p>
<p>Alternative: Magnetic-activated cell sorting (MACS) or fluorescence-activated cell sorting (FACS) for CD markers (CD105+, CD73+, CD90+, CD45- per ISCT criteria).</p>
<p>Final filtration through 40 um strainer ensures single-cell suspension for culture seeding. Count &amp; viability check (trypan blue) before transfer to expansion bioreactors.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Enrichment (adherence / MACS / FACS) plus ISCT markers define the MSC population.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Live Cells jumps 0 → 500k; pink pellet appears on the carrier.</p>
</article>
<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — 2 questions</p>
<details><summary><strong>Q1.</strong> Why keep cold ischemia time under ~24 h?</summary><ul><li>Cold damages the BSC filters</li><li>✅ Cell viability and sterility decay with every hour</li><li>DMEM freezes below room temperature</li></ul><p class="tt-explain">Starting-material quality bounds everything downstream — time warm is viability lost.</p></details>
<details><summary><strong>Q2.</strong> Which marker panel supports an MSC identity claim?</summary><ul><li>✅ CD105+/CD73+/CD90+, CD45−</li><li>CD45+/CD34+, CD90−</li><li>HLA-DR high, CD19 high</li></ul><p class="tt-explain">ISCT: ≥95% CD105/CD73/CD90, &lt;2% hematopoietic/exclusion markers.</p></details>
</div>
</section>
<section class="tt-chapter" id="ch2">
<p class="tt-kicker">Chapter 2 · build</p>
<h2>Cell Culture</h2>
<p class="tt-objective"><strong>Learning objective.</strong> Expand cells and confirm identity before manufacturing.</p>
<p>Numbers then identity. Scale toward clinical dose in closed bioreactors, then prove the cells are what you claim.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Watch Cells climb several-fold during Expansion (clinical hollow-fiber lines reach 10⁹; the sim shows the curve, not the full scale-up); Characterization changes nothing on the carrier — it is a verification gate.</p>
<article class="tt-station" id="st-expansion">
<h3>Expansion Bioreactors</h3>
<p class="tt-tag">PERFUSION BIOREACTOR · Module 2 of 5</p>
<p class="tt-lede">Automated hollow-fiber bioreactors for MSC expansion to clinical scale.</p>
<p>Traditional T-flasks don't scale -- hollow-fiber perfusion bioreactors achieve 10^9 cells in a single cartridge (vs. 10^7 per T-175).</p>
<p>Hollow-fiber cartridge: extracapillary space (ECS) for cells, intracapillary space (ICS) for media perfusion. Nutrients diffuse across semi-permeable fibers (MWCO 10-30 kDa); waste diffuses out. No shear stress on cells.</p>
<p>Perfusion rate: 20-50 mL/day per 10^8 cells. Glucose/lactate monitored inline; media refreshed automatically. pH controlled via CO2 overlay on ICS.</p>
<p>Typical expansion: P0 to P3 in 7-10 days, 20-40 population doublings. Harvest by enzymatic detachment (Accutase preferred over trypsin to preserve surface epitopes).</p>
<p>Advantages: closed system (reduced contamination), lower media consumption, real-time metabolic monitoring, GMP-compatible.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Hollow-fiber perfusion scales toward 10⁹ cells with no shear on the cells.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Cell count climbs several-fold on the growth curve; the carrier pellet grows.</p>
</article>
<article class="tt-station" id="st-characterization">
<h3>MSC Characterization</h3>
<p class="tt-tag">FLOW CYTOMETRY · Module 2 of 5</p>
<p class="tt-lede">ISCT minimal criteria verification + potency assay.</p>
<p>Every MSC lot must meet ISCT minimal criteria (Dominici et al., 2006) before release for fabrication.</p>
<p>1. Plastic adherence: &gt;95% attach to tissue-culture plastic within 24h.</p>
<p>2. Surface markers (flow cytometry): &gt;=95% positive for CD105 (endoglin), CD73 (5'-nucleotidase), CD90 (Thy-1); &lt;2% positive for CD45, CD34, CD14/CD11b, CD79a/CD19, HLA-DR.</p>
<p>3. Trilineage differentiation: demonstrated osteogenic (Alizarin Red), adipogenic (Oil Red O), chondrogenic (Alcian Blue) potential in vitro.</p>
<p>Potency assay (beyond ISCT): IDO activity (immunosuppression), PGE2 secretion, T-cell suppression assay -- correlates with clinical efficacy.</p>
<p>Sterility: mycoplasma PCR (negative), endotoxin &lt; 5 EU/mL, bioburden (negative). Karyotype (G-banding) at P3 to detect aneuploidy.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> ISCT criteria + potency + sterility gate everything before manufacturing.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Construct unchanged by design — this station verifies. Read the checklist.</p>
</article>
<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — 2 questions</p>
<details><summary><strong>Q1.</strong> Why hollow-fiber perfusion over stacked T-flasks?</summary><ul><li>It is cheaper per flask</li><li>✅ Closed, shear-free scale-up with metabolic monitoring</li><li>It needs no media changes</li></ul><p class="tt-explain">ECS/ICS separation feeds 10⁹ cells without shear in a GMP-compatible closed loop.</p></details>
<details><summary><strong>Q2.</strong> A lot shows 8% CD45+. Release it?</summary><ul><li>Yes — CD45 is an MSC marker</li><li>✅ No — exclusion markers must be &lt;2%</li><li>Yes if viability is high</li></ul><p class="tt-explain">ISCT exclusion panel ≥2% means hematopoietic contamination — gate fails.</p></details>
</div>
</section>
<section class="tt-chapter" id="ch3">
<p class="tt-kicker">Chapter 3 · build</p>
<h2>Build the Construct</h2>
<p class="tt-objective"><strong>Learning objective.</strong> Combine cells, scaffold, flow, and loading into living tissue.</p>
<p>The core equation: cells + scaffold + signals. Scaffold appears, cells seed it, perfusion feeds it, loading matures it.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Watch the white scaffold appear, pink cells coat it, then green ECM bulk grow as GAG / collagen / modulus climb.</p>
<article class="tt-station" id="st-scaffold">
<h3>Scaffold Fabrication</h3>
<p class="tt-tag">ELECTROSPIN / 3D PRINT · Module 3 of 5</p>
<p class="tt-lede">PCL/gelatin electrospun scaffolds or PLGA 3D-printed constructs.</p>
<p>Scaffolds provide 3D architecture for cell attachment, proliferation, and tissue formation. Material choice defines degradation rate, mechanics, and bioactivity.</p>
<p>Electrospinning: PCL (polycaprolactone) + gelatin (80/20) spun at 15-20 kV, 1 mL/h, 15 cm tip-to-collector. Fiber diameter 300-800 nm mimics native ECM. Gelatin improves cell adhesion (RGD motifs) but requires crosslinking (EDC/NHS or genipin).</p>
<p>3D Printing (extrusion-based): PLGA or PCL printed at 85-110 C, 0.2-0.4 mm strand diameter, 300-500 um pore size. Allows patient-specific geometry from CT/MRI.</p>
<p>Sterilization: 70% EtOH soak 30 min -&gt; PBS rinse x3 -&gt; UV 30 min/side. For GMP: gamma irradiation (25 kGy) or ethylene oxide.</p>
<p>Mechanical target: 0.5-2 MPa tensile modulus (matches early neo-tissue); degradation 6-12 months (PCL) / 3-6 months (PLGA).</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Material choice sets degradation rate, mechanics, and bioactivity.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> White scaffold block appears on the carrier; modulus baseline 0.5 MPa.</p>
</article>
<article class="tt-station" id="st-seeding">
<h3>Cell Seeding</h3>
<p class="tt-tag">STATIC / DYNAMIC · Module 3 of 5</p>
<p class="tt-lede">Dynamic seeding in spinner flask -&gt; uniform distribution, high efficiency.</p>
<p>Static seeding (pipetting cells onto scaffold) achieves only 10-30% efficiency with poor penetration. Dynamic seeding is standard for clinical constructs.</p>
<p>Spinner flask seeding: scaffold + 10-20x10^6 cells in 50 mL media, 40-60 rpm, 4-24h. Centrifugal force drives cells into pores; media perfusion enhances nutrient exchange.</p>
<p>Seeding density: 20-50x10^6 cells/cm^3 scaffold volume. Viability post-seeding &gt;85% (calcein-AM/PI).</p>
<p>Post-seed: 2-4h static incubation in BSC for attachment, then transfer to perfusion bioreactor. Media: alpha-MEM + 10% FBS + ascorbate-2-phosphate (50 ug/mL) for early matrix deposition.</p>
<p>Real-time monitoring: inline glucose/lactate sensors track metabolic activity as proxy for cell engagement.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Dynamic seeding beats pipetting ~10× on efficiency and penetration.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Pink cells coat the scaffold; viability must stay &gt;85%.</p>
</article>
<article class="tt-station" id="st-perfusion">
<h3>Perfusion Bioreactor</h3>
<p class="tt-tag">PERFUSION CULTURE · Module 3 of 5</p>
<p class="tt-lede">21-day perfusion culture with osteogenic/chondrogenic media.</p>
<p>Perfusion bioreactors provide convective transport -- nutrients in, waste out -- enabling thick (&gt;2 mm) constructs impossible in static culture.</p>
<p>Direct perfusion: media pumped through scaffold interstitial pores at 0.5-2 mL/min. Shear stress (0.001-0.01 Pa) enhances osteogenic differentiation via MAPK/ERK and Wnt/beta-catenin pathways.</p>
<p>Media: osteogenic (DMEM + 10% FBS + 10 nM dexamethasone + 50 ug/mL ascorbate-2-P + 10 mM beta-glycerophosphate) or chondrogenic (DMEM + 1% ITS+ + 10 ng/mL TGF-beta3 + 100 nM dexamethasone).</p>
<p>21-day culture: weekly media analysis (glucose, lactate, pH, ALP activity). Construct swells 20-40% as ECM deposits.</p>
<p>Outlet sampling for glycosaminoglycan (GAG, DMMB assay) and calcium (o-cresolphthalein) quantification -- non-destructive quality tracking.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Convection beats the ~100–200 µm diffusion limit — flow is the enabler.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> GAG +8, collagen +15; green ECM bulk appears on the carrier.</p>
</article>
<article class="tt-station" id="st-conditioning">
<h3>Mechanical Conditioning</h3>
<p class="tt-tag">BIAXIAL LOADING · Module 3 of 5</p>
<p class="tt-lede">Cyclic mechanical loading to mature neo-tissue mechanics.</p>
<p>Mechanical stimulation drives tissue maturation -- Wolff's law in a bioreactor. Biaxial or uniaxial cyclic loading aligns collagen, increases modulus 3-5x.</p>
<p>Regime: 0.5-1 Hz, 5-10% strain, 1h/day x 14 days (post-perfusion). Strain magnitude calibrated to construct stiffness (target 5-15% of failure strain).</p>
<p>Loading system: custom bioreactor with linear actuators, load cell feedback, sterile chamber. Non-contact optical strain measurement (digital image correlation).</p>
<p>Outcomes: collagen I alignment (SHG imaging), increased GAG retention, modulus approaching native tissue (bone: 0.5-2 GPa; cartilage: 0.5-1 MPa).</p>
<p>Critical: avoid overloading -- microdamage triggers catabolic signaling (MMP upregulation). Ramp protocol: 2% -&gt; 5% -&gt; 10% over first week.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Cyclic load aligns collagen and raises modulus 3–5×; ramp to avoid damage.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> GAG +12 more, modulus jumps; construct visibly bulks up.</p>
</article>
<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — 2 questions</p>
<details><summary><strong>Q1.</strong> An engineered construct is 4 mm thick with no flow. What happens?</summary><ul><li>✅ Core cells starve past ~100–200 µm</li><li>It matures faster in the core</li><li>Nothing — diffusion is unlimited</li></ul><p class="tt-explain">Oxygen penetration caps at ~100–200 µm; perfusion/convection is the engineering answer.</p></details>
<details><summary><strong>Q2.</strong> Scaffold degrades in 2 weeks but tissue needs 6 months. Result?</summary><ul><li>Faster therapy</li><li>✅ Collapse before neo-tissue bears load</li><li>Higher modulus</li></ul><p class="tt-explain">Degradation rate must match tissue formation — otherwise mechanics fail mid-course.</p></details>
</div>
</section>
<section class="tt-chapter" id="ch4">
<p class="tt-kicker">Chapter 4 · verify</p>
<h2>Quality and Release</h2>
<p class="tt-objective"><strong>Learning objective.</strong> Verify structure, mechanics, sterility, and final release.</p>
<p>Nothing grows here on purpose. Each station is a gate: image it, crush sacrificial samples, prove sterility, sign the CoA.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Watch the construct hold steady while gates unlock — scanner ring, test platens, sterile hold, parcel pack.</p>
<article class="tt-station" id="st-histology">
<h3>Histology &amp; Imaging</h3>
<p class="tt-tag">MICRO-CT / H&amp;E · Module 4 of 5</p>
<p class="tt-lede">Non-destructive micro-CT + destructive histology validation.</p>
<p>QA requires both non-destructive (release) and destructive (validation) assays.</p>
<p>Micro-CT (10-20 um voxel): 3D architecture -- pore interconnectivity, mineral density (mg HA/cm^3), trabecular thickness/number. Non-destructive; construct proceeds to release.</p>
<p>Destructive (sacrificial constructs): H&amp;E (cellularity), Masson's Trichrome (collagen), Safranin-O/Fast Green (GAG), Immunohistochemistry (collagen I/II, osteocalcin, RUNX2).</p>
<p>Quantitative histomorphometry: bone volume/total volume (BV/TV), osteoid surface, cellular density. Correlate with micro-CT for validation.</p>
<p>Release criteria: BV/TV &gt; 15% (bone), GAG/DNA &gt; 5% (cartilage), viable cell density &gt; 5x10^6 cells/mL construct.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Micro-CT releases the lot; destructive histology validates the process.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Construct held — BV/TV and GAG/DNA gates unlock instead of growth.</p>
</article>
<article class="tt-station" id="st-mechanical_test">
<h3>Mechanical Testing</h3>
<p class="tt-tag">COMPRESSION TEST · Module 4 of 5</p>
<p class="tt-lede">Uniaxial compression to failure -- modulus &amp; yield strength.</p>
<p>Mechanical competence is a release criterion for load-bearing constructs.</p>
<p>Uniaxial compression: 1%/s strain rate to 70% strain or failure. Hydrated constructs tested in PBS at 37 C.</p>
<p>Key metrics: elastic modulus (linear region 5-15% strain), yield strength (0.2% offset), ultimate strength, toughness (area under curve).</p>
<p>Target ranges: bone constructs 100-500 MPa modulus; cartilage 0.3-1 MPa aggregate modulus.</p>
<p>Correlate with micro-CT density (rho) -- modulus proportional to rho^2 (Gibson-Ashby foam model). Non-destructive micro-CT can predict mechanical properties for release.</p>
<p>At least 3 sacrificial constructs per lot tested; lot passes if mean modulus &gt; lower 95% CI of target.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Modulus ∝ density²; sacrificial crush tests predict release.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Modulus line finalizes; lot passes on the lower 95% CI.</p>
</article>
<article class="tt-station" id="st-sterility">
<h3>Sterility Testing</h3>
<p class="tt-tag">USP &lt;71&gt; · Module 4 of 5</p>
<p class="tt-lede">14-day USP &lt;71&gt; sterility + endotoxin + mycoplasma PCR.</p>
<p>Sterility assurance is a regulatory requirement (21 CFR 1271, USP &lt;71&gt;, EP 2.6.1).</p>
<p>USP &lt;71&gt; sterility test: 14-day incubation in fluid thioglycollate medium (anaerobes/aerobes) + soybean-casein digest (fungi). Sample volume: 1 mL per 10 mL construct equivalent. Negative controls required.</p>
<p>Endotoxin (LAL assay): kinetic chromogenic, limit &lt; 5 EU/mL (or &lt; 20 EU/device per USP &lt;151&gt;). Test construct rinse + media supernatant.</p>
<p>Mycoplasma: PCR-based (FDA-approved kit), limit of detection 10 CFU/mL. Negative result required -- mycoplasma alters cell behavior irreparably.</p>
<p>Environmental monitoring: ISO 5 (Class 100) at critical points, ISO 7 (Class 10,000) in background. Particle counts, viable air/surface sampling per shift.</p>
<p>Rapid sterility (ATP bioluminescence, flow cytometry) under investigation for 24h release -- not yet compendial.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> USP &lt;71&gt; (14-day) + LAL + mycoplasma PCR; mycoplasma is silent and irreparable.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Construct held under sterile quarantine — no growth, by design.</p>
</article>
<article class="tt-station" id="st-release">
<h3>Release &amp; Packaging</h3>
<p class="tt-tag">FINAL RELEASE · Module 4 of 5</p>
<p class="tt-lede">Certificate of Analysis + sterile double-pouch packaging.</p>
<p>Final release requires QP (Qualified Person) sign-off on Certificate of Analysis (CoA).</p>
<p>CoA includes: identity (STR profile), purity (flow markers), potency (assay), sterility, endotoxin, mycoplasma, viability, cell dose, mechanical properties, karyotype.</p>
<p>Packaging: primary sterile pouch (Tyvek/polyethylene), secondary pouch, rigid outer container. Labels: product name, lot #, expiry, storage (4 C / -80 C / LN2), handling warnings.</p>
<p>Cold chain: validated shipper maintains 2-8 C for 48h (fresh) or -150 C (cryopreserved). Temperature logger included.</p>
<p>Chain of identity: barcode/QR on each pouch links to electronic batch record. 21 CFR 11 compliant audit trail.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> QP signs the CoA; chain of identity plus validated cold chain.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Parcel visuals pack the lot; construct frozen for handoff.</p>
</article>
<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — 2 questions</p>
<details><summary><strong>Q1.</strong> How long does a compendial USP &lt;71&gt; sterility test incubate?</summary><ul><li>24 hours</li><li>✅ 14 days</li><li>1 hour</li></ul><p class="tt-explain">14 days in thioglycollate + soybean-casein media; rapid methods are not yet compendial.</p></details>
<details><summary><strong>Q2.</strong> Modulus scales with micro-CT density (Gibson-Ashby) as…</summary><ul><li>✅ modulus ∝ density²</li><li>modulus ∝ 1/density</li><li>modulus is density-independent</li></ul><p class="tt-explain">Foam-model scaling lets non-destructive micro-CT predict sacrificial crush results.</p></details>
</div>
</section>
<section class="tt-chapter" id="ch5">
<p class="tt-kicker">Chapter 5 · deliver</p>
<h2>Clinical Delivery</h2>
<p class="tt-objective"><strong>Learning objective.</strong> Prepare the construct and complete the clinical handoff.</p>
<p>From GMP line to operating theater: thaw safely, verify identity twice, dock the construct with the patient.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Watch the carrier travel to the gold surgical pad and dock — the run completes on implantation.</p>
<article class="tt-station" id="st-preop">
<h3>Pre-op Staging</h3>
<p class="tt-tag">OR PREP · Module 5 of 5</p>
<p class="tt-lede">Thaw/rinse construct, verify identity, load delivery system.</p>
<p>Pre-op staging bridges GMP manufacturing and clinical delivery.</p>
<p>Cryopreserved construct: rapid thaw 37 C water bath (&lt;2 min), dilute DMSO stepwise (12% -&gt; 6% -&gt; 0% in media + 10% human albumin) over 10 min to minimize osmotic shock.</p>
<p>Identity verification: barcode scan matches patient ID, surgical plan, and CoA. Two-person independent check.</p>
<p>Rinse: 3x sterile saline + 5% human albumin to remove residual DMSO. Viability spot-check (trypan blue) -- must be &gt;70%.</p>
<p>Load into delivery device: syringe (injectable), arthroscopic inserter (solid), or custom deployment system. Maintain sterile field throughout.</p>
<p>Time from thaw to implantation: &lt; 4h (viability window).</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Thaw fast, dilute DMSO stepwise, implant within ~4 h.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Carrier enters the gold zone; viability spot-check must exceed 70%.</p>
</article>
<article class="tt-station" id="st-implantation">
<h3>Surgical Implantation</h3>
<p class="tt-tag">OR THEATER · Module 5 of 5</p>
<p class="tt-lede">Arthroscopic/open implantation with fixation &amp; imaging confirm.</p>
<p>The culmination: living construct meets patient. Procedure varies by indication.</p>
<p>Bone defect (critical-size): open approach, defect debridement to bleeding bone, construct press-fit or screw-fixed. Periosteum closure if possible. Intra-op fluoroscopy/O-arm confirms position.</p>
<p>Cartilage (MACI-style): arthroscopic debridement to subchondral plate, construct trimmed to defect size, fibrin glue (Tisseel) or periosteal cover fixation. Microfracture of subchondral bone for vascular ingress.</p>
<p>Post-op: CPM (continuous passive motion) 0-30 deg x 6h/day x 6 weeks (cartilage); NWB (non-weight-bearing) 6-8 weeks (bone).</p>
<p>Follow-up: MRI at 3/6/12 months (MOAKS scoring), patient-reported outcomes (KOOS, IKDC), serum biomarkers (COMP, CTX-II).</p>
<p>Registry entry: mandatory for ATMPs (EU) / CBER tracking (US). Long-term safety: tumorigenicity monitoring 15 years.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Fixation + imaging + registry; biology meets surgery, then 15 years of follow-up.</p>
<p class="tt-watch"><strong>What to watch in the sim.</strong> Carrier docks on the surgical pad — the run completes here.</p>
</article>
<div class="tt-quiz"><p class="tt-quiz-title">Chapter check — 2 questions</p>
<details><summary><strong>Q1.</strong> Thaw-to-implantation window for a cryopreserved construct?</summary><ul><li>✅ Under ~4 h with stepwise DMSO dilution</li><li>Up to a week on the bench</li><li>No limit once thawed</li></ul><p class="tt-explain">Rapid 37 °C thaw, dilute DMSO 12%→6%→0%, viability spot-check &gt;70%.</p></details>
<details><summary><strong>Q2.</strong> Before loading the delivery device, you must…</summary><ul><li>✅ Match barcode to patient, plan, and CoA with a two-person check</li><li>Pool leftover constructs to top up the dose</li><li>Skip the rinse to save time</li></ul><p class="tt-explain">Chain of identity is the last gate — wrong construct to wrong patient is the catastrophic failure.</p></details>
</div>
</section>


<section class="tt-chapter" id="part2"><p class="tt-kicker">Part II</p><h2>Beyond the line</h2><p>What the manufacturing line does not simulate, surveyed against Lanza et al., <em>Principles of Tissue Engineering</em> (5th ed.). Each section states its Lanza part, its one takeaway, and where the roadmap treats it in depth.</p></section>
<section class="tt-chapter" id="bx-foundations">
<p class="tt-kicker">Beyond the line · Part 1 — The basis of growth and differentiation (chs. 5–10)</p>
<h2>Foundations: cells, matrix, and how tissues form</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap Phase 0 (Bio 101) and §§1.1, 1.5 (signaling, developmental biology)</p>
<p>The line assumes this knowledge without teaching it, so here is the compressed version. Cells are bounded by a phospholipid membrane studded with receptors (integrins, cadherins); inside, the nucleus holds DNA, and the central dogma (DNA → RNA → protein) plus epigenetic marks decide which proteins a cell actually makes. Gene expression, not gene possession, is the cell’s identity — which is why differentiation protocols are just timed signaling recipes.</p>
<p>Cells live embedded in extracellular matrix (ECM): collagens for tensile strength, fibronectin and laminin for adhesion signaling, proteoglycans and glycosaminoglycans (GAGs) for hydration and compression. Matrix molecules are ligands — binding them tells cells to survive, divide, migrate, or differentiate. The line’s digestion station (collagenase/dispase) is literally the controlled demolition of this matrix, and over-digestion strips the very receptors cells need to reattach.</p>
<p>Embryos build tissues by morphogenesis: gradients of morphogens (BMP, Wnt, Hedgehog, TGF-β family members) tell fields of identical cells where they are and what to become. Every directed-differentiation protocol on the line’s perfusion station recapitulates an embryonic signaling sequence — the growth factors are the same molecules, delivered in the same order.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Tissue engineering is guided development: control gene expression in space and time, and cells build the tissue themselves.</p>
</section>
<section class="tt-chapter" id="bx-stem-cells">
<p class="tt-kicker">Beyond the line · Part 6 — Stem cells (chs. 23–27); blood components (chs. 41–43)</p>
<h2>Stem cells beyond MSCs</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §2.4 (stem cell biology, ISCT criteria, Yamanaka factors)</p>
<p>The line runs mesenchymal stromal cells (MSCs): multipotent, plastic-adherent, defined by the ISCT panel (≥95% CD105/CD73/CD90; &lt;2% hematopoietic markers), and tri-lineage competent. They are the workhorse because they are easy to harvest (marrow, adipose), immunomodulatory, and clinically experienced — but they are only one branch of the potency hierarchy.</p>
<p>Embryonic stem cells (ESCs, pluripotent) can become any germ-layer lineage but carry embryo-destruction ethics and teratoma risk. Induced pluripotent stem cells (iPSCs, Yamanaka factors Oct4/Sox2/Klf4/c-Myc) made patient-matched pluripotency practical without embryos — the 2012 Nobel — though reprogramming remnants, epigenetic memory, and tumorigenicity screening remain live QC topics. Clinical-grade reprogramming is integration-free (Sendai, episomal, mRNA).</p>
<p>Neonatal sources (cord blood, Wharton’s jelly) sit between: young, proliferative, bankable, with established cord-blood transplant practice. Hematopoietic stem cells are the oldest cell therapy of all (bone-marrow transplant), and blood components from pluripotent sources plus red-cell substitutes extend the same manufacturing logic — closed bioreactors, identity assays, release criteria — to transfusion medicine.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Potency is a ladder (toti → pluri → multi → uni); every rung up buys versatility and pays in tumorigenicity, ethics, and QC burden.</p>
</section>
<section class="tt-chapter" id="bx-gene-tools">
<p class="tt-kicker">Beyond the line · Part 7 — Gene therapy</p>
<h2>Gene and cell engineering tools</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §3.5 (CRISPR, vectors, growth factors)</p>
<p>Sometimes the construct needs edited cells first. CRISPR/Cas9 makes a targeted double-strand break; the repair path decides the edit — error-prone NHEJ gives knockouts, template-driven HDR gives knock-ins at low efficiency. Base and prime editing handle single-nucleotide changes without double-strand breaks. Delivery as ribonucleoprotein (RNP) is transient and clean; plasmid or viral delivery persists.</p>
<p>Getting nucleic acids into cells splits into transfection (lipofection, electroporation — non-viral, transient) and transduction (viral — efficient, baggage). The workhorses: lentivirus (~8–9 kb cargo, integrates, dividing and non-dividing cells, insertional-mutagenesis risk, BSL-2+), MLV retrovirus (~7–8 kb, dividing cells only, same integration risk), AAV (~4.7 kb, mostly episomal, durable, low immunogenicity, pre-existing immunity). Plan transductions by MOI (virus particles per cell).</p>
<p>Growth factors are pathway ligands with delivery problems: VEGF (vascularization), BMPs (bone), FGF, TGF-β, EGF. Knowing each factor’s pathway (Roadmap §1.1) predicts its biology; controlled release from scaffolds turns a bolus into a program.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Editing is easy; delivery is the discipline — cargo limits, integration risk, and immune visibility decide every vector choice.</p>
</section>
<section class="tt-chapter" id="bx-invivo-transplant">
<p class="tt-kicker">Beyond the line · Part 3 — In vivo synthesis (ch. 16); transplantation / immunoisolation (ch. 22)</p>
<h2>In vivo synthesis and transplantation</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §§3.4 (vascularization), 3.6 (immunomodulation), 4.3 (decell/recell frontier)</p>
<p>Not everything is built in a bioreactor. In vivo synthesis uses the body as the bioreactor: arteriovenous-loop chambers grow vascularized tissue inside the patient before transfer; decellularized donor organs keep their perfusable vasculature while their cells are washed out, then are recellularized with patient cells — the diffusion limit’s ultimate test.</p>
<p>Anything implanted meets the immune system. The foreign-body response runs protein adsorption → macrophage recruitment → fibrosis, and can wall off the most elegant construct. Counter-strategies form a ladder: immunosuppression (drugs, side effects), encapsulation (alginate beads as immune barriers, e.g. islet transplantation), tolerance induction, and immune-evasive engineering (hypoimmunogenic iPSCs via HLA editing).</p>
<p>Immunoisolation devices sit at the intersection: a selectively permeable membrane that admits nutrients and product (e.g. insulin) while excluding antibodies and cells. The design tension — tight enough to protect, open enough to feed — is the diffusion limit wearing an immunology costume.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> An engineered tissue the immune system rejects is a failed therapy; design the immune strategy with the scaffold, not after it.</p>
</section>
<section class="tt-chapter" id="bx-organs">
<p class="tt-kicker">Beyond the line · Parts 13–19 (kidney, musculoskeletal, neural, eye, dental, respiratory, skin); Part 22 — Clinical experience</p>
<h2>Organ gallery: what each tissue demands</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §§3.1 (case studies), 3.7 (disease modeling, assessment)</p>
<p>The line builds a generic musculoskeletal construct (bone/cartilage logic: mineral or GAG-rich matrix, compression-tested). Each organ changes the design brief. Skin was first to clinic (thin, avascular-tolerant, bioengineered skin products) and remains the template for commercialization. Cartilage products (e.g. MACI-style) exploit an immune-privileged, avascular niche; bone products lean on the body’s own healing plus press-fit fixation.</p>
<p>Hollow or perfused organs raise the bar: cardiovascular constructs need endothelium plus burst strength and compliance matching; trachea/lung need airtight, ciliated epithelium over openable geometry; liver needs dense metabolic function per gram (hepatocytes die fast without sinusoidal flow); kidney needs selective filtration no scaffold has yet replicated; neural constructs need aligned guidance plus reconnection, not just survival; cornea needs transparency (aligned collagen, no vessels); teeth and periodontium need multi-tissue interfaces (enamel, dentin, cementum, ligament, bone) in millimeters.</p>
<p>Clinical experience concentrates where biology cooperates: skin, cartilage, bone/craniofacial, and cardiovascular patches lead; whole solid organs remain preclinical. Read every “breakthrough” against the vascularization and immune bars, not the press release.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> There is no generic “tissue” — each organ’s function (barrier, pump, filter, lens, wire) rewrites the scaffold, cell, and validation strategy.</p>
</section>
<section class="tt-chapter" id="bx-emerging">
<p class="tt-kicker">Beyond the line · Part 20 — Tissue-engineered food; Part 21 — Emerging technologies (chs. 76–80)</p>
<h2>Emerging technologies</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §§3.3 (bioprinting), 3.8 (quantitative layer), 4.3 (frontier)</p>
<p>3D bioprinting deposits cell-laden bioinks (hydrogels carrying living cells) by extrusion, inkjet, or laser assistance. The core trade-off is printability versus viability: stiff inks hold shape but kill cells; soft inks keep cells alive but slump. Patient-specific craniofacial and orthopedic implants are the near-term win; printed vasculature is the long game.</p>
<p>Organ-on-a-chip and body-on-a-chip (microphysiological systems) shrink the question instead of the organ: a perfused “liver-in-a-dish” for toxicity screening predicts human response better than flat culture or animal livers for some endpoints. Biofabricated 3D tissue models plus real-time monitoring (inline glucose/lactate/pO₂, the same sensors on the line’s bioreactors) close the loop from craft to control.</p>
<p>Bio-manufacturing scales all of this under GMP: closed systems, batch records, validated cold chains. And the same science feeds people literally — cultivated meat is tissue engineering with flavor and cost-per-kilo as release criteria.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> Print for shape, perfuse for survival, monitor for control, manufacture for patients — each emerging tech attacks a different bottleneck.</p>
</section>
<section class="tt-chapter" id="bx-regulation">
<p class="tt-kicker">Beyond the line · Part 23 — Regulation, commercialization and ethics (chs. 86–88)</p>
<h2>Regulation, business, and ethics</h2>
<p class="tt-objective"><strong>Roadmap depth.</strong> Roadmap §§4.1 (bench to bedside), 4.2 (ethics &amp; governance)</p>
<p>Regulation decides what a product is before science decides whether it works. In the US, HCT/P rules hinge on “minimal manipulation” versus “more than minimal manipulation” — cross that line and a tissue becomes a biologic/device with full trial requirements (CBER oversight, phased trials, preclinical safety/efficacy hierarchy). The line’s CoA, chain of identity, and 21 CFR Part 11 audit trail exist because regulators, not biologists, defined them.</p>
<p>Business decides what survives contact with the clinic: cost of goods (media, cleanrooms, cold chain), reimbursement codes, hospital adoption, and manufacturing scale. The graveyard of tissue engineering is full of constructs that worked in papers and died in spreadsheets — bio-manufacturing and business models are load-bearing, not administrative.</p>
<p>Ethics drove the science more than once: embryo destruction concerns motivated iPSC research; donor consent governs tissue sourcing; IRBs (human subjects), IACUCs plus the 3Rs (animal work), and IBC/rDNA oversight (engineered lines) gate every real program. Frontier topics — whole-organ recellularization, in vivo reprogramming, organoid intelligence, rejuvenation — each reopen these questions at a larger scale.</p>
<p class="tt-takeaway"><strong>Takeaway.</strong> A therapy needs three passes — biological, regulatory, and economic — plus the ethics license for all of them.</p>
</section>


<p class="tt-provenance">Generated from <code>apps/tissue-roadmap-sim/factory.js</code> (the sim's source of truth) on 2026-09-07 — 15 stations, 5 chapters. If this page and the sim ever disagree, the sim's <code>LEVELS</code>/<code>GUIDE</code>/<code>QUIZ</code> win. See also the <a href="{{ site.baseurl }}/tissue-engineering-roadmap/">full learning roadmap</a>.</p>

</div>
