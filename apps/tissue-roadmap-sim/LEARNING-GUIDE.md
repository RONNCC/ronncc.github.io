# TERM Lab Park — Learning Guide

**What this is:** the module/submodule map for the 15-station pipeline sim.
Each **module** is a learning chapter with its own objective. Each **submodule**
(station) has one job: build, verify, prepare, or deliver. Read this before
running the sim so you know what each stop is trying to teach.

**How to use it:** go module by module (1 → 5). At each station, read
`Watch` (what the animation should show), then `Takeaway` (the one idea to
retain). Each module ends with a 2-question in-sim exit quiz (Module exit
check panel, follows the pipeline) plus release-gate stamps on the lot
record — scores are recorded, never blocking.

**Roadmap companion:** `tissue-engineering-roadmap.md` Phases 0–4.
This sim covers the manufacturing spine (mostly Roadmap Phase 2 craft +
Phase 3 engineering + Phase 4 translation). Phase 0–1 are prerequisites,
referenced per module below.

---

## Module 1 — Cell Sourcing (`sourcing`)

- **Objective:** turn donor tissue into a viable, enriched cell population.
- **Type:** build. **Stations:** procurement → digestion → isolation.
- **Why it matters:** everything downstream depends on starting-material
  quality (cold ischemia, sterility, enrichment).
- **Prerequisites (roadmap):** Phase 2.5 (BSC / aseptic), Phase 2.3 (transport
  media), Phase 4.1/4.2 (21 CFR 1271 donor screening, consent).
- **Animation beat:** carrier arrives empty; after Isolation it gains its
  first pink cell pellet and Live Cells jumps 0 → 500k.
- **Exit check:** explain cold-ischemia control, what collagenase/dispase do,
  and the ISCT marker panel used at isolation.

| Submodule | Role | What you learn | Watch | Takeaway | Roadmap |
|---|---|---|---|---|---|
| Tissue Procurement | prepare | Aseptic harvest under BSC Class II / ISO 5; transport | Pallet empty — tissue enters, no count yet | Quality in = quality out | §2.5, §2.3, §4.1–4.2 |
| Enzymatic Digestion | prepare | Collagenase/dispase free single cells; over-digestion harms receptors | No count change — viability is hidden | Free cells, spare receptors | §2.2, §0.1 |
| Cell Isolation & Filtration | build | Density gradient + strainer + MACS/FACS enrichment | Cells 0 → 500k; pink pellet appears | Enrichment + ISCT defines MSCs | §2.4, §1.2, §2.2 |

## Module 2 — Cell Culture (`culture`)

- **Objective:** expand cells to clinical dose and confirm identity before manufacturing.
- **Type:** build + verify. **Stations:** expansion → characterization.
- **Prerequisites:** Phase 2.2 (growth dynamics, passaging), Phase 3.4
  (bioreactors), Phase 2.3 (media/pH/CO₂), Phase 1.2 (flow cytometry).
- **Animation beat:** cell count climbs several-fold on the growth curve
  during Expansion (clinical hollow-fiber lines reach 10⁹; the sim shows the
  curve shape, not the full scale-up);
  Characterization intentionally changes nothing — it is a gate.
- **Exit check:** in-sim 2-question quiz + ISCT gate stamp; contrast
  hollow-fiber vs. T-flask scale; recite ISCT minimal criteria + one potency assay.

| Submodule | Role | What you learn | Watch | Takeaway | Roadmap |
|---|---|---|---|---|---|
| Expansion Bioreactors | build | Closed hollow-fiber perfusion to 10⁹, shear-free | Count climbs; pellet grows | Scale without shear | §2.2, §3.4, §2.3 |
| MSC Characterization | verify | ISCT + trilineage + potency + sterility/karyotype | Construct unchanged — read the checklist | Prove identity before building | §2.4, §1.2, §2.6 |

## Module 3 — Build the Construct (`fabrication`)

- **Objective:** combine cells, scaffold, flow, and loading into living tissue
  (the `cells + scaffolds + signals` equation).
- **Type:** build. **Stations:** scaffold → seeding → perfusion → conditioning.
- **Prerequisites:** Phase 3.2 (biomaterials), Phase 3.3 (3D culture),
  Phase 3.4 (diffusion limit, shear, conditioning), Phase 1.1/3.5 (growth-factor pathways).
- **Animation beat:** white scaffold appears → pink cells coat it → green ECM
  bulk grows as GAG / collagen / modulus climb.
- **Exit check:** explain the ~100–200 µm limit + two ways perfusion beats it;
  why degradation rate must match tissue formation; what conditioning adds.

| Submodule | Role | What you learn | Watch | Takeaway | Roadmap |
|---|---|---|---|---|---|
| Scaffold Fabrication | build | PCL/gelatin electrospin vs PLGA print; sterilization | White block appears; modulus 0.5 MPa baseline | Material sets rate + mechanics | §3.2, §2.7.7 |
| Cell Seeding | build | Dynamic (spinner) vs static seeding; density + viability | Pink coat on scaffold; viability >85% | Seed dynamically or fail | §3.3, §2.2–2.3 |
| Perfusion Bioreactor | build | Convective transport; osteo/chondro media; GAG tracking | GAG +8, collagen +15; green bulk appears | Flow enables thickness | §3.4, §1.1, §3.5, §3.7 |
| Mechanical Conditioning | build | Cyclic load aligns collagen, 3–5× modulus; ramp protocol | GAG +12, modulus jumps; bulk firms | Load it or it stays weak | §3.4 |

## Module 4 — Quality and Release (`quality`)

- **Objective:** verify structure, mechanics, sterility, and sign final release.
- **Type:** verify — nothing grows here on purpose; gates unlock instead.
- **Stations:** histology → mechanical_test → sterility → release.
- **Prerequisites:** Phase 1.2 (microscopy), Phase 3.7 (assessment),
  Phase 3.2 (modulus), Phase 1.3/2.6 (mycoplasma, QC), Phase 2.6/4.1 (CoA, GMP).
- **Animation beat:** construct holds steady; scanner ring, test platens,
  sterile hold, parcel pack visuals mark each gate.
- **Exit check:** state one release criterion per gate (BV/TV or GAG/DNA;
  modulus CI; USP <71>/LAL/mycoplasma; CoA + identity).

| Submodule | Role | What you learn | Watch | Takeaway | Roadmap |
|---|---|---|---|---|---|
| Histology & Imaging | verify | Micro-CT (release) vs destructive histology (validate) | Held; BV/TV, GAG/DNA gates | Image to release, cut to validate | §1.2, §3.7–3.8 |
| Mechanical Testing | verify | Compression to failure; Gibson-Ashby density rule | Modulus finalizes; 95% CI rule | Crush samples, keep the lot | §3.2 |
| Sterility Testing | verify | USP <71> 14-day + LAL + mycoplasma PCR; EM | Quarantine hold — no growth | Silent bugs kill lots | §1.3, §2.5–2.6 |
| Release & Packaging | verify | QP + CoA; double-pouch; cold chain; audit trail | Parcels pack; construct frozen | No CoA, no therapy | §2.6, §4.1, §2.7.10 |

## Module 5 — Clinical Delivery (`implantation`)

- **Objective:** prepare the construct and complete the clinical handoff.
- **Type:** deliver. **Stations:** preop → implantation.
- **Prerequisites:** Phase 2.3/2.7.6 (cryo thaw), Phase 3.1 (bone/cartilage
  cases), Phase 3.6–3.7 (transplant, follow-up), Phase 4.1–4.2 (trials, oversight, registry).
- **Animation beat:** carrier enters the gold zone, docks on the surgical pad;
  run completes on implantation.
- **Exit check:** describe thaw-to-implant window, identity double-check, one
  fixation method, and follow-up (imaging + registry).

| Submodule | Role | What you learn | Watch | Takeaway | Roadmap |
|---|---|---|---|---|---|
| Pre-op Staging | deliver | Rapid thaw, stepwise DMSO dilution, identity check, loader | Gold zone; viability >70% | <4 h, double-checked | §2.3, §2.7.6 |
| Surgical Implantation | deliver | Press-fit / MACI + fixation + imaging; rehab + registry | Dock on pad; run completes | Surgery + 15-yr follow-up | §3.1, §3.6–3.7, §4.1–4.3 |

---

## Module map (at a glance)

| # | Module | Type | Stations | Objective |
|---|---|---|---|---|
| 1 | Cell Sourcing | build | 3 | Viable, enriched starting population |
| 2 | Cell Culture | build+verify | 2 | Clinical dose + proven identity |
| 3 | Build the Construct | build | 4 | Cells + scaffold + signals → tissue |
| 4 | Quality and Release | verify | 4 | Four gates pass before release |
| 5 | Clinical Delivery | deliver | 2 | Safe handoff to patient |

**Source of truth:** `factory.js` `LEVELS`, `GUIDE`, `STATIONS`, `ORDER`.
If this guide and the sim disagree, the sim's `LEVELS`/`GUIDE` win — update
this file to match.
