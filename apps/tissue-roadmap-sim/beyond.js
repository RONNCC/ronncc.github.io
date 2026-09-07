/* TERM Lab Park — "Beyond the line" survey sections (window.Beyond)
 * Literary-only companion content for guides/tissue-textbook.md Part II.
 * Covers the Lanza et al. parts the manufacturing line does not simulate,
 * at survey level: what each area is, how it relates to the line, where the
 * roadmap treats it in depth. ES2020+, dependency-free.
 * Reference: Lanza, Langer, Vacanti & Atala, Principles of Tissue
 * Engineering, 5th ed. (Academic Press, 2020), 23 parts / 88 chapters.
 */
(function () {
  'use strict';

  // id: anchor suffix. lanza: the Lanza 5e part(s) surveyed.
  // roadmap: where tissue-engineering-roadmap.md treats it in depth.
  const SECTIONS = [
    {
      id: 'foundations',
      title: 'Foundations: cells, matrix, and how tissues form',
      lanza: 'Part 1 — The basis of growth and differentiation (chs. 5–10)',
      roadmap: 'Roadmap Phase 0 (Bio 101) and §§1.1, 1.5 (signaling, developmental biology)',
      body: [
        'The line assumes this knowledge without teaching it, so here is the compressed version. Cells are bounded by a phospholipid membrane studded with receptors (integrins, cadherins); inside, the nucleus holds DNA, and the central dogma (DNA → RNA → protein) plus epigenetic marks decide which proteins a cell actually makes. Gene expression, not gene possession, is the cell’s identity — which is why differentiation protocols are just timed signaling recipes.',
        'Cells live embedded in extracellular matrix (ECM): collagens for tensile strength, fibronectin and laminin for adhesion signaling, proteoglycans and glycosaminoglycans (GAGs) for hydration and compression. Matrix molecules are ligands — binding them tells cells to survive, divide, migrate, or differentiate. The line’s digestion station (collagenase/dispase) is literally the controlled demolition of this matrix, and over-digestion strips the very receptors cells need to reattach.',
        'Embryos build tissues by morphogenesis: gradients of morphogens (BMP, Wnt, Hedgehog, TGF-β family members) tell fields of identical cells where they are and what to become. Every directed-differentiation protocol on the line’s perfusion station recapitulates an embryonic signaling sequence — the growth factors are the same molecules, delivered in the same order.'
      ],
      takeaway: 'Tissue engineering is guided development: control gene expression in space and time, and cells build the tissue themselves.'
    },
    {
      id: 'stem-cells',
      title: 'Stem cells beyond MSCs',
      lanza: 'Part 6 — Stem cells (chs. 23–27); blood components (chs. 41–43)',
      roadmap: 'Roadmap §2.4 (stem cell biology, ISCT criteria, Yamanaka factors)',
      body: [
        'The line runs mesenchymal stromal cells (MSCs): multipotent, plastic-adherent, defined by the ISCT panel (≥95% CD105/CD73/CD90; <2% hematopoietic markers), and tri-lineage competent. They are the workhorse because they are easy to harvest (marrow, adipose), immunomodulatory, and clinically experienced — but they are only one branch of the potency hierarchy.',
        'Embryonic stem cells (ESCs, pluripotent) can become any germ-layer lineage but carry embryo-destruction ethics and teratoma risk. Induced pluripotent stem cells (iPSCs, Yamanaka factors Oct4/Sox2/Klf4/c-Myc) made patient-matched pluripotency practical without embryos — the 2012 Nobel — though reprogramming remnants, epigenetic memory, and tumorigenicity screening remain live QC topics. Clinical-grade reprogramming is integration-free (Sendai, episomal, mRNA).',
        'Neonatal sources (cord blood, Wharton’s jelly) sit between: young, proliferative, bankable, with established cord-blood transplant practice. Hematopoietic stem cells are the oldest cell therapy of all (bone-marrow transplant), and blood components from pluripotent sources plus red-cell substitutes extend the same manufacturing logic — closed bioreactors, identity assays, release criteria — to transfusion medicine.'
      ],
      takeaway: 'Potency is a ladder (toti → pluri → multi → uni); every rung up buys versatility and pays in tumorigenicity, ethics, and QC burden.'
    },
    {
      id: 'gene-tools',
      title: 'Gene and cell engineering tools',
      lanza: 'Part 7 — Gene therapy',
      roadmap: 'Roadmap §3.5 (CRISPR, vectors, growth factors)',
      body: [
        'Sometimes the construct needs edited cells first. CRISPR/Cas9 makes a targeted double-strand break; the repair path decides the edit — error-prone NHEJ gives knockouts, template-driven HDR gives knock-ins at low efficiency. Base and prime editing handle single-nucleotide changes without double-strand breaks. Delivery as ribonucleoprotein (RNP) is transient and clean; plasmid or viral delivery persists.',
        'Getting nucleic acids into cells splits into transfection (lipofection, electroporation — non-viral, transient) and transduction (viral — efficient, baggage). The workhorses: lentivirus (~8–9 kb cargo, integrates, dividing and non-dividing cells, insertional-mutagenesis risk, BSL-2+), MLV retrovirus (~7–8 kb, dividing cells only, same integration risk), AAV (~4.7 kb, mostly episomal, durable, low immunogenicity, pre-existing immunity). Plan transductions by MOI (virus particles per cell).',
        'Growth factors are pathway ligands with delivery problems: VEGF (vascularization), BMPs (bone), FGF, TGF-β, EGF. Knowing each factor’s pathway (Roadmap §1.1) predicts its biology; controlled release from scaffolds turns a bolus into a program.'
      ],
      takeaway: 'Editing is easy; delivery is the discipline — cargo limits, integration risk, and immune visibility decide every vector choice.'
    },
    {
      id: 'invivo-transplant',
      title: 'In vivo synthesis and transplantation',
      lanza: 'Part 3 — In vivo synthesis (ch. 16); transplantation / immunoisolation (ch. 22)',
      roadmap: 'Roadmap §§3.4 (vascularization), 3.6 (immunomodulation), 4.3 (decell/recell frontier)',
      body: [
        'Not everything is built in a bioreactor. In vivo synthesis uses the body as the bioreactor: arteriovenous-loop chambers grow vascularized tissue inside the patient before transfer; decellularized donor organs keep their perfusable vasculature while their cells are washed out, then are recellularized with patient cells — the diffusion limit’s ultimate test.',
        'Anything implanted meets the immune system. The foreign-body response runs protein adsorption → macrophage recruitment → fibrosis, and can wall off the most elegant construct. Counter-strategies form a ladder: immunosuppression (drugs, side effects), encapsulation (alginate beads as immune barriers, e.g. islet transplantation), tolerance induction, and immune-evasive engineering (hypoimmunogenic iPSCs via HLA editing).',
        'Immunoisolation devices sit at the intersection: a selectively permeable membrane that admits nutrients and product (e.g. insulin) while excluding antibodies and cells. The design tension — tight enough to protect, open enough to feed — is the diffusion limit wearing an immunology costume.'
      ],
      takeaway: 'An engineered tissue the immune system rejects is a failed therapy; design the immune strategy with the scaffold, not after it.'
    },
    {
      id: 'organs',
      title: 'Organ gallery: what each tissue demands',
      lanza: 'Parts 13–19 (kidney, musculoskeletal, neural, eye, dental, respiratory, skin); Part 22 — Clinical experience',
      roadmap: 'Roadmap §§3.1 (case studies), 3.7 (disease modeling, assessment)',
      body: [
        'The line builds a generic musculoskeletal construct (bone/cartilage logic: mineral or GAG-rich matrix, compression-tested). Each organ changes the design brief. Skin was first to clinic (thin, avascular-tolerant, bioengineered skin products) and remains the template for commercialization. Cartilage products (e.g. MACI-style) exploit an immune-privileged, avascular niche; bone products lean on the body’s own healing plus press-fit fixation.',
        'Hollow or perfused organs raise the bar: cardiovascular constructs need endothelium plus burst strength and compliance matching; trachea/lung need airtight, ciliated epithelium over openable geometry; liver needs dense metabolic function per gram (hepatocytes die fast without sinusoidal flow); kidney needs selective filtration no scaffold has yet replicated; neural constructs need aligned guidance plus reconnection, not just survival; cornea needs transparency (aligned collagen, no vessels); teeth and periodontium need multi-tissue interfaces (enamel, dentin, cementum, ligament, bone) in millimeters.',
        'Clinical experience concentrates where biology cooperates: skin, cartilage, bone/craniofacial, and cardiovascular patches lead; whole solid organs remain preclinical. Read every “breakthrough” against the vascularization and immune bars, not the press release.'
      ],
      takeaway: 'There is no generic “tissue” — each organ’s function (barrier, pump, filter, lens, wire) rewrites the scaffold, cell, and validation strategy.'
    },
    {
      id: 'emerging',
      title: 'Emerging technologies',
      lanza: 'Part 20 — Tissue-engineered food; Part 21 — Emerging technologies (chs. 76–80)',
      roadmap: 'Roadmap §§3.3 (bioprinting), 3.8 (quantitative layer), 4.3 (frontier)',
      body: [
        '3D bioprinting deposits cell-laden bioinks (hydrogels carrying living cells) by extrusion, inkjet, or laser assistance. The core trade-off is printability versus viability: stiff inks hold shape but kill cells; soft inks keep cells alive but slump. Patient-specific craniofacial and orthopedic implants are the near-term win; printed vasculature is the long game.',
        'Organ-on-a-chip and body-on-a-chip (microphysiological systems) shrink the question instead of the organ: a perfused “liver-in-a-dish” for toxicity screening predicts human response better than flat culture or animal livers for some endpoints. Biofabricated 3D tissue models plus real-time monitoring (inline glucose/lactate/pO₂, the same sensors on the line’s bioreactors) close the loop from craft to control.',
        'Bio-manufacturing scales all of this under GMP: closed systems, batch records, validated cold chains. And the same science feeds people literally — cultivated meat is tissue engineering with flavor and cost-per-kilo as release criteria.'
      ],
      takeaway: 'Print for shape, perfuse for survival, monitor for control, manufacture for patients — each emerging tech attacks a different bottleneck.'
    },
    {
      id: 'regulation',
      title: 'Regulation, business, and ethics',
      lanza: 'Part 23 — Regulation, commercialization and ethics (chs. 86–88)',
      roadmap: 'Roadmap §§4.1 (bench to bedside), 4.2 (ethics & governance)',
      body: [
        'Regulation decides what a product is before science decides whether it works. In the US, HCT/P rules hinge on “minimal manipulation” versus “more than minimal manipulation” — cross that line and a tissue becomes a biologic/device with full trial requirements (CBER oversight, phased trials, preclinical safety/efficacy hierarchy). The line’s CoA, chain of identity, and 21 CFR Part 11 audit trail exist because regulators, not biologists, defined them.',
        'Business decides what survives contact with the clinic: cost of goods (media, cleanrooms, cold chain), reimbursement codes, hospital adoption, and manufacturing scale. The graveyard of tissue engineering is full of constructs that worked in papers and died in spreadsheets — bio-manufacturing and business models are load-bearing, not administrative.',
        'Ethics drove the science more than once: embryo destruction concerns motivated iPSC research; donor consent governs tissue sourcing; IRBs (human subjects), IACUCs plus the 3Rs (animal work), and IBC/rDNA oversight (engineered lines) gate every real program. Frontier topics — whole-organ recellularization, in vivo reprogramming, organoid intelligence, rejuvenation — each reopen these questions at a larger scale.'
      ],
      takeaway: 'A therapy needs three passes — biological, regulatory, and economic — plus the ethics license for all of them.'
    }
  ];

  window.Beyond = { SECTIONS };
})();
