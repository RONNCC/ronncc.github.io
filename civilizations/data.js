/* Civilization Readers — data
 * Each entry is a museum-facing primer: high-level context up top,
 * then periods/events for the timeline, then deeper detail.
 * Year convention: BCE is negative (e.g. -3100 = 3100 BCE), CE is positive.
 */

const WORLD_ANCHORS = [
  { year: -3200, label: "First writing" },
  { year: -2560, label: "Great Pyramid" },
  { year: -1754, label: "Hammurabi's Code" },
  { year: -1200, label: "Bronze Age Collapse" },
  { year: -776, label: "First Olympics" },
  { year: -551, label: "Confucius" },
  { year: -336, label: "Alexander the Great" },
  { year: -221, label: "China unified" },
  { year: 476, label: "Rome falls" },
  { year: 622, label: "The Hijra" },
  { year: 1325, label: "Tenochtitlan founded" },
  { year: 1492, label: "Columbus" }
];

const GROUP_ORDER = [
  "Ancient Mediterranean & Near East",
  "Africa",
  "Oceania",
  "Asia",
  "The Americas",
  "Medieval world"
];

const CIVILIZATIONS = [
  {
    slug: "egypt",
    name: "Ancient Egypt",
    emoji: "⚱️",
    accent: "#d97706",
    group: "Ancient Mediterranean & Near East",
    region: "Nile Valley, Northeast Africa",
    start: -3100,
    end: -30,
    spanLabel: "c. 3100 – 30 BCE",
    tagline: "Three thousand years of pharaohs, pyramids, and a meticulous obsession with the afterlife.",
    overview: "Ancient Egypt was one of the world's first great river civilizations, running almost unbroken for three millennia along the Nile. Its art and architecture are famously consistent — built around order (ma'at), kingship, and death — which is why a statue from 2500 BCE and a temple relief from 1200 BCE still feel unmistakably Egyptian. In a museum you're usually looking at tomb and temple material, because that's what the dry desert preserved best.",
    quick: ["~3,000 years of pharaohs along the Nile (c. 3100–30 BCE).", "Most objects come from tombs and temples — built for the afterlife.", "Canonical art: figures in profile with a frontal eye and shoulders.", "Peaks: the pyramids (Old Kingdom), empire & Tutankhamun (New Kingdom)."],
    met: "Egyptian Art — Galleries 100–138 (ground floor). Don't miss the Temple of Dendur in Gallery 131.",
    context: {
      bigPicture: "Egypt is shorthand for stability: a unified state ruled by a divine king (the pharaoh) who kept cosmic order, ma'at. For most of its history it was the superpower of the eastern Mediterranean, outlasting nearly every rival. It only ended as an independent state in 30 BCE, when Rome absorbed it after Cleopatra VII's death.",
      geography: "A narrow ribbon of fertile land along the Nile, hemmed in by deserts on both sides. The river's annual flood made farming predictable and rich; the deserts provided isolation, plus gold, stone, and the natron used in mummification. Upper Egypt is the south (upstream); Lower Egypt is the northern Delta.",
      keyIdeas: [
        { t: "Ma'at", d: "Order, truth, and justice; the pharaoh's central duty was to uphold it." },
        { t: "Ka and ba", d: "Aspects of the soul. The ka needed the body, tomb, and food offerings to survive after death." },
        { t: "The afterlife", d: "Not a metaphor: Egyptians built tombs, mummified bodies, and wrote spells (the Book of the Dead) to win eternal life." },
        { t: "Divine kingship", d: "The pharaoh was a living god, the link between people and the divine." }
      ],
      spotIt: [
        { t: "Profile figures", d: "Heads and legs in profile, shoulders and eye frontal — the canonical Egyptian stance." },
        { t: "Cartouche", d: "An oval ring enclosing a royal name written in hieroglyphs." },
        { t: "Hieroglyphs", d: "Picture writing; the last known inscription dates to 394 CE." },
        { t: "Faience", d: "A bright blue-green glazed ceramic, used for shabtis and amulets." },
        { t: "Sunk relief", d: "Figures carved into the stone surface rather than raised out of it." }
      ]
    },
    periods: [
      { name: "Old Kingdom", years: "c. 2686–2181 BCE", start: -2686, end: -2181, summary: "Age of the pyramids; the first great flowering of Egyptian art.", detail: "The Old Kingdom built the pyramids of Giza (the Great Pyramid of Khufu, c. 2560 BCE) and the Great Sphinx. Kings were buried with idealized, confident statues meant to house the ka. The period ended with drought and fragmentation — the First Intermediate Period." },
      { name: "Middle Kingdom", years: "c. 2055–1650 BCE", start: -2055, end: -1650, summary: "A classical age of literature and sensitive, expressive royal portraits.", detail: "After reunification, the Middle Kingdom produced Egypt's literary classics (The Tale of Sinuhe) and portraits that show age and worry — a striking change from the Old Kingdom's serene ideal. It ended with the Second Intermediate Period, when the foreign Hyksos ruled the Delta." },
      { name: "New Kingdom", years: "c. 1550–1069 BCE", start: -1550, end: -1069, summary: "Empire, gold, and the pharaohs everyone knows.", detail: "The New Kingdom is Egypt's empire age, rich from conquest and trade. Hatshepsut ruled as king; Akhenaten briefly imposed worship of the sun-disk Aten and a radical, elongated art style; Tutankhamun's nearly intact tomb (found 1922) is the source of most people's image of Egyptian treasure; Ramesses II built Abu Simbel and reigned 66 years." },
      { name: "Late & Ptolemaic", years: "c. 664–30 BCE", start: -664, end: -30, summary: "Revival, foreign rulers, and finally Cleopatra.", detail: "Egypt was repeatedly ruled by foreigners — Libyans, Nubian Kushites, Persians, then Greeks. The Macedonian Ptolemies ruled from Alexandria and presented themselves as pharaohs. Cleopatra VII, the last Ptolemy, died in 30 BCE and Egypt became a Roman province." }
    ],
    events: [
      { year: -3100, label: "Unification", detail: "Narmer (possibly Menes) unites Upper and Lower Egypt; the Narmer Palette records it." },
      { year: -2560, label: "Great Pyramid", detail: "Khufu's pyramid at Giza — the tallest structure on Earth for about 3,800 years." },
      { year: -1479, label: "Hatshepsut", detail: "A female pharaoh who ruled as king and built at Deir el-Bahri." },
      { year: -1353, label: "Akhenaten", detail: "Religious revolution: worship of the Aten; Amarna art turns elongated and intimate." },
      { year: -1323, label: "Tutankhamun", detail: "Boy king buried with spectacular treasure; his tomb survives nearly intact." },
      { year: -1279, label: "Ramesses II", detail: "A 66-year reign; Abu Simbel; a treaty with the Hittites — the world's first known peace treaty." },
      { year: -30, label: "Cleopatra VII", detail: "The last pharaoh; Egypt becomes a Roman province." }
    ],
    museum: {
      see: [
        "Mummies, coffins, and canopic jars — the afterlife industry.",
        "Shabtis (ushabtis) — small servant figurines placed in tombs.",
        "Statues of pharaohs and gods, often in hard stone (granodiorite, basalt, diorite).",
        "Reliefs and stelae from tombs and temples.",
        "Amulets, jewelry, and faience."
      ],
      lingo: [
        { t: "Cartouche", d: "Oval ring around a royal name." },
        { t: "Shabti / ushabti", d: "Tomb figurine meant to do labor for the deceased." },
        { t: "Canopic jars", d: "Jars holding preserved organs, guarded by the four Sons of Horus." },
        { t: "Sarcophagus", d: "Stone outer coffin." },
        { t: "Stela", d: "An upright inscribed stone slab." },
        { t: "Registers", d: "Horizontal bands into which scenes are divided." }
      ],
      where: [
        "The Met — the Egyptian Art galleries and the Temple of Dendur room.",
        "Legion of Honor (SF) — Ancient Art galleries, plus major rotating Egyptian exhibitions.",
        "Brooklyn Museum — a deep, excellent Egyptian collection."
      ]
    }
  },

  {
    slug: "nubia",
    name: "Nubia & Kush",
    emoji: "🏹",
    accent: "#b45309",
    group: "Africa",
    region: "Nile Valley south of Egypt — modern Sudan",
    start: -2500,
    end: 350,
    spanLabel: "c. 2500 BCE – 350 CE",
    tagline: "Egypt's southern neighbor and sometime ruler — the kingdom of archers, gold, and its own pyramids.",
    overview: "Nubia, the land of Kush, was a wealthy African kingdom on the middle Nile — Egypt's trading partner, rival, and for a century its ruler. Museums often show Nubian material beside Egyptian: elegant red-and-black Kerma pottery, royal statues of the 'Black Pharaohs,' and the steep little pyramids of Meroë. It's the same Nile, a different story.",
    quick: ["Egypt's southern neighbor on the middle Nile (modern Sudan).", "Three phases: Kerma, Napata (the 'Black Pharaohs'), Meroë.", "Ruled Egypt for about a century as the 25th Dynasty.", "Signatures: red-and-black Kerma pottery, steep Meroë pyramids."],
    met: "Alongside Egyptian Art (Galleries 100–138). The Temple of Dendur (Gallery 131) is itself from Lower Nubia.",
    context: {
      bigPicture: "Nubia was Egypt's peer, not its colony. It flourished in three great phases: Kerma (a rich Bronze Age capital), Napata (whose kings conquered Egypt as the 25th Dynasty, the 'Black Pharaohs'), and Meroë (an iron-working kingdom with its own undeciphered script). For millennia, gold, ivory, ebony, and exotic goods from deeper Africa moved through Nubia to the Mediterranean.",
      geography: "The Nile's rocky rapids (cataracts) marked the frontier with Egypt. South of them lay the fertile middle Nile — now northern Sudan — ringed by desert and goldfields. The cataracts, and the sacred mountain Jebel Barkal, anchor Nubia's geography.",
      keyIdeas: [
        { t: "Kush", d: "The ancient name for Nubia; the kingdom's own heartland." },
        { t: "Ta-Seti", d: "'Land of the bow' — Egypt's name for Nubia, famed for its archers." },
        { t: "The Black Pharaohs", d: "Kushite kings (Piye, Taharqa) who ruled Egypt as the 25th Dynasty, c. 747–656 BCE." },
        { t: "Meroitic", d: "The script of Meroë — alphabetic but still not fully understood." }
      ],
      spotIt: [
        { t: "Nubian pyramids", d: "Smaller and steeper than Egypt's, concentrated at Meroë and Nuri." },
        { t: "Kerma ware", d: "Handmade pottery, polished red with a black rim — a Kerma signature." },
        { t: "Double uraeus", d: "Kushite kings wear two cobras on the brow, marking rule over two lands." },
        { t: "Ram imagery", d: "The ram-headed form of the god Amun, especially at Jebel Barkal." }
      ]
    },
    periods: [
      { name: "Kerma", years: "c. 2500–1500 BCE", start: -2500, end: -1500, summary: "A wealthy Bronze Age capital on the middle Nile.", detail: "Kerma grew into a powerful city-state with monumental mud-brick buildings (the Deffufa), vast cemeteries, and distinctive red-and-black pottery. It traded and fought with Egypt as an equal for centuries." },
      { name: "Napata & the 25th Dynasty", years: "c. 900–656 BCE", start: -900, end: -656, summary: "Kush conquers Egypt — the Black Pharaohs.", detail: "From their base at Napata, near Jebel Barkal, Kushite kings Piye and Taharqa invaded Egypt and ruled it for about a century as the 25th Dynasty, reviving temple building and old forms of piety. Assyrian invasions expelled them in the 650s BCE." },
      { name: "Meroë", years: "c. 300 BCE – 350 CE", start: -300, end: 350, summary: "A new capital, an iron industry, and the pyramids.", detail: "The capital moved south to Meroë, a city with its own script (Meroitic), large-scale iron smelting, and a royal cemetery of steep pyramids. Meroë declined and fell to the kingdom of Aksum around 350 CE." }
    ],
    events: [
      { year: -2500, label: "Kerma rises", detail: "A wealthy Nile kingdom emerges." },
      { year: -747, label: "Piye conquers Egypt", detail: "The 25th Dynasty — Nubia rules Egypt." },
      { year: -690, label: "Taharqa", detail: "The Kushite pharaoh who faced Assyria." },
      { year: -656, label: "Assyria expels Kush", detail: "Nubia withdraws south." },
      { year: -300, label: "Meroë", detail: "A new capital; the pyramids rise." },
      { year: 350, label: "Meroë falls", detail: "Aksum ends Kushite rule." }
    ],
    museum: {
      see: [
        "Royal statues of Kushite kings, often with ram or double-uraeus imagery.",
        "Kerma red-and-black pottery.",
        "Gold jewelry and inlaid faience.",
        "Funerary offering tables and pyramid capstones from Meroë.",
        "Temple reliefs from Lower Nubia — including temples moved by UNESCO when the Aswan dams flooded the region."
      ],
      lingo: [
        { t: "Kush", d: "The kingdom of the middle Nile." },
        { t: "Ta-Seti", d: "'Land of the bow.'" },
        { t: "Kerma / Napata / Meroë", d: "The three great Kushite capitals, in order." },
        { t: "Deffufa", d: "Kerma's monumental mud-brick temple platform." },
        { t: "Double uraeus", d: "Two cobras on a royal crown." }
      ],
      where: [
        "The Met — the Temple of Dendur is itself from Lower Nubia; the Nubian galleries sit alongside Egyptian art.",
        "Brooklyn Museum and the Museum of Fine Arts, Boston — two of the finest Nubian collections.",
        "Sudan National Museum, Khartoum."
      ]
    }
  },

  {
    slug: "mesopotamia",
    name: "Mesopotamia",
    emoji: "🏺",
    accent: "#8b5e3c",
    group: "Ancient Mediterranean & Near East",
    region: "Tigris–Euphrates valley, modern Iraq (and parts of Syria, Turkey)",
    start: -4000,
    end: -539,
    spanLabel: "c. 4000 – 539 BCE",
    tagline: "The land between two rivers where cities, writing, and empires were invented.",
    overview: "Mesopotamia — Greek for 'between the rivers' — is where the first cities, the first writing (cuneiform, c. 3200 BCE), the first law codes, and the first empires appeared. It wasn't one state but a sequence of cultures — Sumerians, Akkadians, Babylonians, Assyrians — sharing a written tradition. Museum objects here are mostly clay (tablets, bricks) and stone (reliefs, seals), because the region is river mud and little else survives.",
    quick: ["'Between the rivers' — the Tigris and Euphrates.", "Invented writing (cuneiform), cities, and the first empires.", "Most objects are clay and stone: tablets, seals, reliefs.", "Sequence: Sumer → Akkad → Babylon → Assyria."],
    met: "Ancient Near Eastern Art — Galleries 400–406. Assyrian reliefs and lamassu in Gallery 400.",
    context: {
      bigPicture: "Mesopotamia is the laboratory of civilization: writing for record-keeping, base-60 mathematics (our 60-minute hour), the wheel, and organized religion with temples (ziggurats) at the city's center. Power repeatedly shifted among city-states and empires, but the cultural toolkit stayed remarkably stable for 3,000 years.",
      geography: "The Tigris and Euphrates flood unpredictably, unlike the Nile — which Mesopotamians read as chaos needing strong kings and gods to tame. The rivers enabled irrigation, cities, and trade; a lack of stone and wood explains the dominance of mud-brick and clay.",
      keyIdeas: [
        { t: "Writing as administration", d: "Cuneiform began as accounting tokens; literacy long stayed a scribal monopoly." },
        { t: "City and temple", d: "Each city belonged to a patron god; the ziggurat was the god's house and the city's axis." },
        { t: "Law and kingship", d: "Kings were 'shepherds' of the people, legitimized by the gods; Hammurabi's code is the famous example." },
        { t: "Epic of Gilgamesh", d: "One of the oldest stories: a king's doomed quest for immortality." }
      ],
      spotIt: [
        { t: "Cuneiform", d: "Wedge-shaped marks pressed into clay with a reed stylus." },
        { t: "Cylinder seals", d: "Small carved stone cylinders rolled over clay to sign documents." },
        { t: "Lamassu", d: "Winged, human-headed bulls that guarded Assyrian palace gates." },
        { t: "Lapis lazuli", d: "Deep-blue stone imported from Afghanistan — a marker of luxury." }
      ]
    },
    periods: [
      { name: "Sumer & Uruk", years: "c. 4000–2000 BCE", start: -4000, end: -2000, summary: "First cities and the invention of writing.", detail: "Uruk was among the first true cities, with tens of thousands of people. Sumerians invented cuneiform, the wheel, and the base-60 math we still use for time and angles. City-states like Ur, Uruk, and Lagash built ziggurats and produced the Standard of Ur and the Epic of Gilgamesh." },
      { name: "Akkadian Empire", years: "c. 2334–2154 BCE", start: -2334, end: -2154, summary: "The world's first empire, under Sargon of Akkad.", detail: "Sargon conquered the Sumerian cities and created a multi-ethnic empire with a standing army and a new capital, Akkad. His dynasty's Victory Stele of Naram-Sin is a masterpiece of imperial propaganda." },
      { name: "Old Babylonian", years: "c. 1894–1595 BCE", start: -1894, end: -1595, summary: "Hammurabi and the first great law code.", detail: "Babylon rose under Hammurabi (c. 1792–1750 BCE), who united southern Mesopotamia and issued a famous law code — an eye for an eye — inscribed on a basalt stele now in the Louvre. Babylonian scribes standardized literature and astronomy." },
      { name: "Assyrian Empire", years: "c. 911–609 BCE", start: -911, end: -609, summary: "The iron-fisted empire of Nineveh and the palace reliefs.", detail: "The Assyrians built the largest empire yet seen, ruling by terror and mass deportation. Their palace reliefs at Nimrud and Nineveh — lion hunts, sieges, winged genies and lamassu — are among the most dramatic art of the ancient world. Ashurbanipal assembled a great library of cuneiform tablets." },
      { name: "Neo-Babylonian", years: "c. 626–539 BCE", start: -626, end: -539, summary: "Nebuchadnezzar II, the Ishtar Gate, and the end.", detail: "Babylon's last glory: Nebuchadnezzar II rebuilt the city with the Ishtar Gate of glazed blue bricks and, tradition says, the Hanging Gardens. The city fell to Cyrus the Great of Persia in 539 BCE, ending native Mesopotamian rule." }
    ],
    events: [
      { year: -3200, label: "Writing", detail: "Cuneiform appears at Uruk for accounting." },
      { year: -2334, label: "Sargon", detail: "The first empire, from Akkad." },
      { year: -1792, label: "Hammurabi", detail: "Babylonian law code." },
      { year: -911, label: "Assyrian peak", detail: "Empire of Nineveh; the great palace reliefs." },
      { year: -612, label: "Nineveh falls", detail: "A coalition destroys Assyria." },
      { year: -539, label: "Cyrus takes Babylon", detail: "Persia absorbs Mesopotamia." }
    ],
    museum: {
      see: [
        "Cuneiform tablets and clay foundation pegs and nails.",
        "Cylinder seals and their rolled impressions.",
        "Stone reliefs from Assyrian palaces.",
        "Glazed-brick panels, like the Ishtar Gate animals.",
        "Bronze and gold vessels, jewelry, and the occasional lamassu."
      ],
      lingo: [
        { t: "Cuneiform", d: "Wedge-shaped script on clay." },
        { t: "Ziggurat", d: "Stepped temple platform." },
        { t: "Lamassu", d: "Winged bull guardian." },
        { t: "Stele", d: "Inscribed stone slab (e.g. the Code of Hammurabi)." },
        { t: "Cylinder seal", d: "Carved roller used to sign clay." }
      ],
      where: [
        "The Met — Ancient Near Eastern Art (reliefs, lamassu, seals).",
        "British Museum — the best collection worldwide (Nineveh reliefs, Standard of Ur).",
        "The Louvre — the Code of Hammurabi."
      ]
    }
  },

  {
    slug: "greece",
    name: "Ancient Greece",
    emoji: "🏛️",
    accent: "#0891b2",
    group: "Ancient Mediterranean & Near East",
    region: "Aegean world: mainland Greece, the islands, and western Anatolia (Ionia)",
    start: -800,
    end: -31,
    spanLabel: "c. 800 – 31 BCE",
    tagline: "The polis, democracy, and the Classical ideal that Western art keeps returning to.",
    overview: "Ancient Greece wasn't a country but hundreds of independent city-states (poleis) sharing a language and gods, from Athens and Sparta to the colonies of Ionia and Sicily. Its art moves from stiff, Egyptian-inspired Archaic figures to the naturalistic Classical ideal and finally the emotional, theatrical Hellenistic style. When museums show Greek art they're usually showing marble, painted pottery, and bronze.",
    quick: ["Not one country but hundreds of city-states (poleis).", "Art moves stiff Archaic → ideal Classical → emotional Hellenistic.", "Much 'Greek' marble is Roman copies of lost bronzes.", "Look for contrapposto, red-figure vases, and the three column orders."],
    met: "Greek and Roman Art — Galleries 150–176 (Leon Levy and Shelby White Court).",
    context: {
      bigPicture: "Greece is the source of Western drama, philosophy, democracy, and much of the Western visual vocabulary — the nude, the temple, the portrait. But its politics were violent and fragmented, and the 'golden age' of 5th-century Athens lasted only a few generations before the city-states exhausted themselves in war.",
      geography: "A mountainous, sea-divided landscape that favored small, independent communities and seafaring. Marble (Pentelic, Parian) was abundant, which is why Greek sculpture is marble; fine clay fueled the pottery industry.",
      keyIdeas: [
        { t: "Polis", d: "The self-governing city-state, the core of Greek identity." },
        { t: "Humanism", d: "An interest in the human body and mind as worthy subjects — 'man is the measure.'" },
        { t: "Myth as shared language", d: "Gods and heroes (Zeus, Athena, Herakles) appear constantly in art and daily life." },
        { t: "Agon", d: "Competition, from the Olympics to drama festivals." }
      ],
      spotIt: [
        { t: "Nudity", d: "Male nudity signals ideal heroism; women are usually clothed until the 4th century BCE." },
        { t: "Contrapposto", d: "The relaxed S-curve stance with weight on one leg." },
        { t: "Black- and red-figure", d: "Two pottery techniques; red-figure (c. 530 BCE on) allows finer detail." },
        { t: "The orders", d: "Doric (plain capitals), Ionic (scrolls), Corinthian (acanthus leaves)." }
      ]
    },
    periods: [
      { name: "Archaic", years: "c. 800–480 BCE", start: -800, end: -480, summary: "Kouroi, korai, and the birth of Greek art.", detail: "Archaic artists borrowed Egypt's stiff stance, producing kouroi (nude youths) and korai (clothed maidens) with the famous Archaic smile. Black-figure pottery, the Greek alphabet, the Olympics (776 BCE), and the first philosophers (Thales) all belong to this period." },
      { name: "Classical", years: "c. 480–323 BCE", start: -480, end: -323, summary: "The Parthenon, democracy, and the naturalistic ideal.", detail: "After beating Persia (480 BCE), Athens led the Greek world and built the Parthenon (447–432 BCE) under Pericles. Sculptors like Polykleitos sought ideal proportions; drama (Sophocles), philosophy (Socrates, Plato), and democracy flourished. The Peloponnesian War (431–404 BCE) then exhausted the Greek cities." },
      { name: "Hellenistic", years: "c. 323–31 BCE", start: -323, end: -31, summary: "Alexander's aftermath: emotion, drama, and a wider Greek world.", detail: "Alexander the Great (d. 323 BCE) spread Greek culture to Egypt and India. Hellenistic art favors emotion and spectacle — the Laocoön, the Winged Victory of Samothrace, the Venus de Milo — and realistic portraits of ordinary people, not just ideal youths." }
    ],
    events: [
      { year: -776, label: "First Olympics", detail: "The traditional founding date at Olympia." },
      { year: -508, label: "Athenian democracy", detail: "Cleisthenes' reforms." },
      { year: -480, label: "Persian Wars", detail: "Athens defeats Persia at Salamis." },
      { year: -447, label: "Parthenon", detail: "Pericles rebuilds the Acropolis." },
      { year: -431, label: "Peloponnesian War", detail: "Athens vs Sparta; Greek power declines." },
      { year: -336, label: "Alexander", detail: "Conquests spread Greek culture east." },
      { year: -31, label: "Actium", detail: "Rome defeats Cleopatra; Greece becomes Roman." }
    ],
    museum: {
      see: [
        "Marble statues and reliefs — many of them Roman copies of Greek bronzes.",
        "Painted vases: amphorae, kraters, kylikes.",
        "Bronze figurines, mirrors, and armor.",
        "Coins with Athena, owls, and Alexander."
      ],
      lingo: [
        { t: "Kouros / kore", d: "Archaic standing youth / maiden." },
        { t: "Amphora, krater, kylix", d: "Vase shapes for storing, mixing, and drinking wine." },
        { t: "Contrapposto", d: "The weight-shift stance." },
        { t: "Frieze, metope, pediment", d: "The sculpted parts of a temple." },
        { t: "Black-figure / red-figure", d: "Pottery painting techniques." }
      ],
      where: [
        "The Met — Greek and Roman Art galleries.",
        "Legion of Honor (SF) — strong antiquities galleries.",
        "British Museum — the Parthenon sculptures."
      ]
    }
  },

  {
    slug: "rome",
    name: "Ancient Rome",
    emoji: "🦅",
    accent: "#e11d48",
    group: "Ancient Mediterranean & Near East",
    region: "Italy, then the entire Mediterranean and beyond",
    start: -753,
    end: 476,
    spanLabel: "753 BCE – 476 CE",
    tagline: "From city-state to a Mediterranean empire — engineering, law, and portraiture with warts and all.",
    overview: "Rome began as a small city in central Italy and grew into an empire that ringed the Mediterranean, absorbing Greece culturally while adding its own genius for engineering, law, and realistic portraiture. Much 'Greek' sculpture in museums is actually Roman copies, and most Roman art you'll see is either imperial propaganda or everyday luxury — mosaics, frescoes, silver, and glass.",
    quick: ["Republic → Empire → split → fall of the West (476 CE).", "Genius for engineering: concrete, arches, roads, aqueducts.", "Portraits are unidealized — verism, wrinkles and all.", "Most 'Greek' statues in museums are actually Roman copies."],
    met: "Greek and Roman Art — Galleries 150–176.",
    context: {
      bigPicture: "Rome's story is Republic → Empire → split → decline. It gave us concrete, the arch, aqueducts, roads, and legal systems whose echoes persist. After 395 CE the empire split; the western half fell in 476 CE, while the eastern (Byzantine) half carried on until 1453.",
      geography: "Italy's central position, fertile plains, and access to the sea helped Rome dominate the Mediterranean — mare nostrum, 'our sea.' Rome imported marble, grain, and artists, and exported order and tax collectors.",
      keyIdeas: [
        { t: "Res publica", d: "The 'public thing' — Rome's republic of senate, consuls, and assemblies." },
        { t: "Mos maiorum", d: "Ancestral custom; Roman conservatism." },
        { t: "Imperial cult", d: "Emperors and their families were worshipped as divine." },
        { t: "Pietas", d: "Duty to gods, family, and state — the Roman virtue." }
      ],
      spotIt: [
        { t: "Verism", d: "Wrinkled, unflattering Republican portraits advertising age and wisdom." },
        { t: "Toga and armor", d: "The cuirassed (armored) statue was imperial PR." },
        { t: "Concrete and arches", d: "The Roman engineering signature." },
        { t: "Mosaics", d: "Floors of tiny stone cubes (tesserae) in private homes." }
      ]
    },
    periods: [
      { name: "Kingdom & Early Republic", years: "c. 753–264 BCE", start: -753, end: -264, summary: "Mythic founding and the conquest of Italy.", detail: "Tradition dates Rome's founding to 753 BCE by Romulus. After expelling its last king (509 BCE), Rome built a republic and slowly conquered the Italian peninsula. Art was modest and practical — terracotta, bronze, and the grave portraits of the elite." },
      { name: "Late Republic", years: "c. 264–27 BCE", start: -264, end: -27, summary: "Conquest of the Mediterranean, then civil war.", detail: "Rome destroyed Carthage (146 BCE) and absorbed Greece, flooding the city with Greek art — and Greek artists. Portraits turn veristic. Julius Caesar's assassination (44 BCE) triggered civil wars that ended with Octavian (Augustus) as sole ruler." },
      { name: "Early Empire", years: "27 BCE – 180 CE", start: -27, end: 180, summary: "The Pax Romana — the empire at peace and at its richest.", detail: "Augustus transformed Rome from brick to marble and used art as propaganda (the Ara Pacis, the Prima Porta statue). The Colosseum (80 CE), the preserved towns of Pompeii and Herculaneum (buried 79 CE), and the great aqueducts belong here. Roman copies of Greek masterpieces spread the classical style everywhere." },
      { name: "Late Empire", years: "c. 284–476 CE", start: 284, end: 476, summary: "Division, Christianity, and the fall of the West.", detail: "Under Diocletian and Constantine the empire reorganized; Constantine legalized Christianity (313 CE) and founded Constantinople (330 CE). Art becomes frontal and symbolic — the forerunner of Byzantine and medieval styles. The western empire ends in 476 CE; the east continues for another millennium." }
    ],
    events: [
      { year: -753, label: "Founding", detail: "Romulus founds Rome (traditional date)." },
      { year: -509, label: "Republic", detail: "The kings are expelled; the republic begins." },
      { year: -146, label: "Carthage destroyed", detail: "Rome masters the Mediterranean." },
      { year: -44, label: "Caesar assassinated", detail: "The republic's last chance is lost." },
      { year: -27, label: "Augustus", detail: "First emperor; the Pax Romana begins." },
      { year: 80, label: "Colosseum", detail: "The Flavian amphitheater opens." },
      { year: 313, label: "Edict of Milan", detail: "Christianity is legalized." },
      { year: 476, label: "Fall of the West", detail: "The last western emperor is deposed." }
    ],
    museum: {
      see: [
        "Marble portraits — emperors, philosophers, and private citizens.",
        "Sarcophagi carved with mythological battle scenes.",
        "Frescoes and mosaics from Pompeii and Herculaneum.",
        "Glass, silver, and bronze household goods.",
        "Roman copies of Greek statues."
      ],
      lingo: [
        { t: "Verism", d: "Unidealized, aged portraiture." },
        { t: "Cuirass", d: "Armored breastplate on imperial statues." },
        { t: "Tesserae", d: "The small cubes of a mosaic." },
        { t: "Sarcophagus", d: "Carved stone coffin." },
        { t: "Pax Romana", d: "The 'Roman peace,' c. 27 BCE – 180 CE." }
      ],
      where: [
        "The Met — Greek and Roman Art.",
        "Legion of Honor (SF) — antiquities.",
        "Getty Villa (LA) — Roman art in a Roman-style villa."
      ]
    }
  },

  {
    slug: "byzantium",
    name: "Byzantium",
    emoji: "⛪",
    accent: "#6d28d9",
    group: "Medieval world",
    region: "Eastern Roman Empire, capital Constantinople (Istanbul)",
    start: 330,
    end: 1453,
    spanLabel: "330 – 1453 CE",
    tagline: "Rome's eastern half, outliving the West by a thousand years — gold mosaics, icons, and Hagia Sophia.",
    overview: "When the western Roman Empire fell in 476 CE, its eastern half — which we now call Byzantium — kept going for another millennium, preserving Greek and Roman learning. Its art is Christianity made radiant: gold-ground mosaics, painted icons, ivory carvings, and domed churches like Hagia Sophia. Constantinople was the richest city of the medieval world until the Ottomans took it in 1453.",
    quick: ["The eastern Roman Empire, outliving the West by 1,000 years.", "Christian art of light: gold mosaics, icons, domed churches.", "Frontal, spiritual figures — a break from classical naturalism.", "Constantinople fell to the Ottomans in 1453."],
    met: "Medieval Art — Galleries 300–305, incl. the Mary and Michael Jaharis Galleries for Byzantine Art.",
    context: {
      bigPicture: "Byzantines called themselves simply 'Romans.' The empire Christianized the Mediterranean's east, reached a golden age under Justinian (Hagia Sophia; the codified Roman law), fought off Arabs and Bulgars, and after the Crusaders sacked Constantinople in 1204, never fully recovered. Its fall to Mehmed II in 1453 is a conventional end of the Middle Ages.",
      geography: "Constantinople commanded the Bosporus, the narrow strait between the Black Sea and the Mediterranean — a nearly unbreakable position behind its triple walls, and the western terminus of Silk Road trade. Control of the straits meant control of commerce between Europe and Asia.",
      keyIdeas: [
        { t: "Continuity of Rome", d: "Byzantium was the Roman Empire, legally and culturally, for a thousand years after the West fell." },
        { t: "Orthodoxy & icons", d: "Christianity centered on the image: icons as windows to the divine, and a bitter debate (iconoclasm) over them." },
        { t: "Caesaropapism", d: "The emperor as God's earthly vicegerent, head of church and state." },
        { t: "The Great Schism", d: "In 1054 the eastern and western churches formally split." }
      ],
      spotIt: [
        { t: "Gold-ground mosaics", d: "Glass tesserae on gold, filling churches and icons with holy light." },
        { t: "Frontal, otherworldly figures", d: "Flattened, symmetrical, and spiritual — a break from classical naturalism." },
        { t: "Icons", d: "Painted holy images on wood, venerated and kissed." },
        { t: "Ivory & cloisonné", d: "Panel carving and enamel inlaid in metal cells." }
      ]
    },
    periods: [
      { name: "Early Byzantium", years: "330–565 CE", start: 330, end: 565, summary: "Constantinople, Justinian, and Hagia Sophia.", detail: "Constantine refounded Byzantium as Constantinople in 330. Under Justinian (r. 527–565) the empire reached its greatest extent, recapturing Italy and North Africa, codifying Roman law, and building Hagia Sophia (consecrated 537) — the largest church in the world for nearly a thousand years." },
      { name: "Middle Byzantium", years: "565–1204 CE", start: 565, end: 1204, summary: "Survival, iconoclasm, and a Macedonian renaissance.", detail: "The empire lost Syria and Egypt to the Arab conquests and nearly fell, then stabilized. Iconoclasm (726–843) banned then restored religious images. Under the Macedonian dynasty, Byzantium enjoyed a golden age of scholarship, missions to the Slavs, and a revival of mosaic art. The churches split in the Great Schism of 1054." },
      { name: "Late Byzantium", years: "1204–1453 CE", start: 1204, end: 1453, summary: "Crusader sack, a last flowering, and the fall.", detail: "In 1204 the Fourth Crusade sacked Constantinople — a wound from which Byzantium never recovered. Restored in 1261, it shrank to a rump state yet produced a final artistic flowering (the Palaiologan Renaissance). The Ottomans took the city in 1453, ending the empire." }
    ],
    events: [
      { year: 330, label: "Constantinople founded", detail: "Constantine's new Rome." },
      { year: 537, label: "Hagia Sophia", detail: "Justinian's great church is consecrated." },
      { year: 726, label: "Iconoclasm", detail: "The empire bans religious images." },
      { year: 843, label: "Icons restored", detail: "'Triumph of Orthodoxy.'" },
      { year: 1054, label: "Great Schism", detail: "East and West churches split." },
      { year: 1204, label: "Crusaders sack Constantinople", detail: "The empire is crippled." },
      { year: 1453, label: "Ottoman conquest", detail: "The city falls; the empire ends." }
    ],
    museum: {
      see: [
        "Gold-glass and stone mosaics (often detached from church walls).",
        "Painted icons on wood.",
        "Ivory panels, boxes, and triptychs.",
        "Cloisonné enamel and gold jewelry.",
        "Coins showing emperors, and illuminated manuscripts."
      ],
      lingo: [
        { t: "Icon", d: "A holy image, venerated as a window to the divine." },
        { t: "Iconoclasm", d: "The movement to destroy religious images." },
        { t: "Tesserae", d: "The small cubes of a mosaic." },
        { t: "Cloisonné", d: "Enamel set in metal-cell walls." },
        { t: "Tondo", d: "A circular image or relief." }
      ],
      where: [
        "The Met — Byzantine galleries (gold-glass, ivories, icons).",
        "de Young — rotating Byzantine and Orthodox exhibitions.",
        "Dumbarton Oaks (Washington, DC) and the Walters Art Museum."
      ]
    }
  },

  {
    slug: "vikings",
    name: "The Vikings",
    emoji: "🪓",
    accent: "#0e7490",
    group: "Medieval world",
    region: "Scandinavia — raiding and trading from Ireland to the Volga and across the North Atlantic",
    start: 793,
    end: 1066,
    spanLabel: "793 – 1066 CE",
    tagline: "Raiders, traders, and settlers — longships, silver hoards, and gripping-beast ornament.",
    overview: "For roughly three centuries, Norse seafarers raided, traded, and settled from Ireland to the Volga and west across the Atlantic to Iceland, Greenland, and briefly North America. Museums show their world through ship burials, silver hoards, swords, and intricate animal-interlace ornament. 'Viking' names the activity — the raiding — more than the people, who were mostly farmers and traders.",
    quick: ["Norse seafarers, c. 793–1066, from Scandinavia.", "Raid, trade, settle — not just raiders.", "The longship opened rivers and the North Atlantic.", "Look for gripping-beast ornament and silver hoards."],
    met: "Medieval Art (Galleries 300–305) and Arms and Armor (Galleries 371–380).",
    context: {
      bigPicture: "The Viking Age opens with the raid on Lindisfarne in 793 and conventionally closes at Stamford Bridge in 1066, when the Normans — themselves Viking descendants — conquered England. The Norse founded Dublin, settled Iceland, created the Rus' states of eastern Europe, and served as the Varangian Guard of the Byzantine emperors. Conversion to Christianity transformed Scandinavia into medieval kingdoms.",
      geography: "Scandinavia's long coasts, fjords, and scarce farmland pushed people seaward. Fast, shallow-draft longships could cross oceans and sail far up rivers, opening the trade routes of the Dnieper and Volga and the North Atlantic stepping-stones of the Faroes, Iceland, and Greenland.",
      keyIdeas: [
        { t: "The longship", d: "Clinker-built, sail-and-oar, and shallow enough to beach or run up rivers." },
        { t: "Raid, trade, settle", d: "Three overlapping activities, from monastery raids to far-flung emporia." },
        { t: "Norse religion", d: "Gods like Odin and Thor, and the gradual conversion to Christianity." },
        { t: "Runes", d: "The futhark alphabet, used for inscriptions on stones, weapons, and goods." }
      ],
      spotIt: [
        { t: "Gripping beasts", d: "Interlaced animal ornament in the 'gripping beast' and Urnes styles." },
        { t: "Hacksilver", d: "Cut and bent silver — 'hack-silver' — used as currency by weight." },
        { t: "Thor's hammers", d: "Mjölnir pendants, worn as protection and as identity." },
        { t: "Dragon heads", d: "Carved prows on ships and sledges." }
      ]
    },
    periods: [
      { name: "Early raids", years: "793–850 CE", start: 793, end: 850, summary: "Lindisfarne and hit-and-run coastal attacks.", detail: "The 793 raid on the monastery of Lindisfarne announced the Viking Age. Early attacks were hit-and-run strikes on undefended coastal monasteries in Britain, Ireland, and Francia, made possible by the longship." },
      { name: "Expansion & settlement", years: "850–950 CE", start: 850, end: 950, summary: "Armies overwinter, and the Norse begin to settle.", detail: "The Great Heathen Army conquered much of England; Vikings founded Dublin and the towns of the Danelaw, settled Iceland (c. 870), and traded down the Volga as the Rus'. Rollo founded Normandy in 911." },
      { name: "Kingdoms & conversion", years: "950–1066 CE", start: 950, end: 1066, summary: "Christian kings, Vinland, and the end of the age.", detail: "Scandinavia consolidated into Christian kingdoms; Cnut briefly ruled a North Sea empire (England, Denmark, Norway). Leif Erikson reached Vinland in North America around 1000. The age is usually ended at Stamford Bridge in 1066, when Harald Hardrada fell in England." }
    ],
    events: [
      { year: 793, label: "Lindisfarne", detail: "The Viking Age begins." },
      { year: 865, label: "Great Heathen Army", detail: "A large army winters in England." },
      { year: 911, label: "Normandy founded", detail: "Rollo receives the land of the Northmen." },
      { year: 985, label: "Greenland settled", detail: "Erik the Red's colony." },
      { year: 1000, label: "Vinland", detail: "Leif Erikson reaches North America." },
      { year: 1066, label: "Stamford Bridge", detail: "Harald Hardrada falls; the age ends." }
    ],
    museum: {
      see: [
        "Swords, axes, spears, and shields.",
        "Silver hoards and hacksilver.",
        "Oval 'tortoise' brooches and other jewelry.",
        "Ship-burial finds (the Oseberg and Gokstad ships are in Oslo).",
        "Runestones and rune-inscribed objects."
      ],
      lingo: [
        { t: "Longship", d: "The clinker-built Viking ship." },
        { t: "Hacksilver", d: "Cut silver used as money by weight." },
        { t: "Mjölnir", d: "Thor's hammer." },
        { t: "Futhark", d: "The runic alphabet." },
        { t: "Varangian", d: "A Norse in Byzantine service." },
        { t: "Danelaw", d: "The region of England under Norse law." }
      ],
      where: [
        "The Met — a compact Viking gallery (weapons, jewelry, silver).",
        "de Young — occasional Viking exhibitions.",
        "National Museum of Denmark (Copenhagen) and the Viking Ship Museum, Oslo."
      ]
    }
  },

  {
    slug: "persia",
    name: "Achaemenid Persia",
    emoji: "🦁",
    accent: "#2563eb",
    group: "Ancient Mediterranean & Near East",
    region: "Iran; an empire from the Aegean to the Indus",
    start: -550,
    end: -330,
    spanLabel: "550 – 330 BCE",
    tagline: "The first great world empire — tolerance, the Royal Road, and the splendor of Persepolis.",
    overview: "The Achaemenid Persian empire, founded by Cyrus the Great in 550 BCE, was the largest state the world had yet seen, stretching from the Aegean to the Indus. It ruled dozens of peoples through satraps (governors) and was famously tolerant of local religion. Its art is courtly and cosmopolitan — stone reliefs at Persepolis, gold and silver, and the winged symbol of Ahura Mazda.",
    quick: ["The first great world empire (550–330 BCE), Aegean to Indus.", "Tolerant rule through satraps (governors) and the Royal Road.", "Courtly art: Persepolis reliefs, gold, lapis lazuli.", "Conquered by Alexander the Great in 330 BCE."],
    met: "Ancient Near Eastern Art — Galleries 400–406 (Achaemenid reliefs and gold).",
    context: {
      bigPicture: "Persia is usually met through Greek eyes, as the enemy in the Persian Wars — but on its own terms it was an administrative and cultural triumph: roads, a postal system, standard coinage, and a tolerant imperial ideology. Alexander the Great conquered it in 330 BCE; later Persian empires (Parthian, Sasanian) revived its glory.",
      geography: "The Iranian plateau is high, dry, and ringed by mountains — a natural crossroads between the steppe, Mesopotamia, and the Mediterranean. Persia's wealth came from tribute, trade, and control of the western end of the Silk Road.",
      keyIdeas: [
        { t: "Cyrus the Great", d: "Founder, famed for tolerance and for freeing the Jews from Babylon." },
        { t: "Satrapies", d: "Provinces ruled by governors under royal inspectors." },
        { t: "Zoroastrianism", d: "The Iranian religion of Ahura Mazda and the struggle between truth and falsehood." },
        { t: "Court art", d: "An eclectic, multinational style celebrating the King of Kings." }
      ],
      spotIt: [
        { t: "Persepolis reliefs", d: "Endless processions of tribute-bearers from every nation." },
        { t: "Animal-capital columns", d: "Double bull or lion capitals atop columns." },
        { t: "The faravahar", d: "The winged-disc symbol of Ahura Mazda." },
        { t: "Lapis and gold", d: "The 'Oxus Treasure' aesthetic." }
      ]
    },
    periods: [
      { name: "Rise", years: "550–522 BCE", start: -550, end: -522, summary: "Cyrus and Cambyses build the empire.", detail: "Cyrus the Great overthrew the Medes (550 BCE), conquered Babylon (539 BCE), and freed its captive peoples. His son Cambyses added Egypt. On his death the throne passed to Darius after a brief succession crisis." },
      { name: "Darius & Xerxes", years: "522–465 BCE", start: -522, end: -465, summary: "Persepolis, the Royal Road, and the Persian Wars.", detail: "Darius I organized the empire into satrapies, built Persepolis, and recorded his triumphs at Behistun in three scripts. He and his son Xerxes fought the Greek city-states — losing at Marathon (490) and Salamis (480) — but the empire remained intact and wealthy." },
      { name: "Late empire", years: "465–330 BCE", start: -465, end: -330, summary: "Court intrigue, decline, and Alexander.", detail: "The later Achaemenids faced satrapal revolts and dynastic intrigue. In 334–330 BCE Alexander the Great invaded, defeated Darius III, and burned Persepolis, ending the dynasty — while largely adopting its administrative model." }
    ],
    events: [
      { year: -550, label: "Cyrus", detail: "The empire is founded." },
      { year: -539, label: "Babylon taken", detail: "Cyrus frees the Jews." },
      { year: -518, label: "Persepolis begun", detail: "Darius' ceremonial capital." },
      { year: -490, label: "Marathon", detail: "Persia is repelled by Athens." },
      { year: -330, label: "Alexander", detail: "Persepolis burns; the dynasty ends." }
    ],
    museum: {
      see: [
        "Persepolis-style stone reliefs.",
        "Gold and silver vessels — rhytons and bowls.",
        "Cylinder seals and royal inscriptions.",
        "Lapis lazuli, carnelian, and gold jewelry."
      ],
      lingo: [
        { t: "Satrap", d: "Provincial governor." },
        { t: "King of Kings", d: "Shahanshah — the royal title." },
        { t: "Behistun", d: "Darius' trilingual inscription, the 'Rosetta Stone of cuneiform.'" },
        { t: "Faravahar", d: "The winged-disc symbol." },
        { t: "Rhyton", d: "A drinking vessel, often animal-shaped." }
      ],
      where: [
        "The Met — Ancient Near Eastern Art (Persepolis reliefs, Achaemenid gold).",
        "British Museum — the Oxus Treasure.",
        "National Museum of Iran, Tehran."
      ]
    }
  },

  {
    slug: "minoan",
    name: "Minoans & Mycenaeans",
    emoji: "🐂",
    accent: "#0d9488",
    group: "Ancient Mediterranean & Near East",
    region: "Crete and mainland Greece (the Aegean Bronze Age)",
    start: -2700,
    end: -1100,
    spanLabel: "c. 2700 – 1100 BCE",
    tagline: "The first European civilizations: bull-leaping palaces on Crete and gold-masked warriors at Mycenae.",
    overview: "Before classical Greece, two Bronze Age civilizations dominated the Aegean. The Minoans of Crete built unfortified palace complexes — Knossos, with its bull-leaping frescoes — and wrote an undeciphered script (Linear A). The Mycenaeans of mainland Greece built citadels, buried their kings in gold (the 'Mask of Agamemnon'), and wrote the earliest Greek (Linear B). Their world collapsed around 1200 BCE, and Homer's Trojan War preserves its memory.",
    quick: ["Europe's first civilizations, in Bronze Age Greece and Crete.", "Minoans: palace-traders of Crete, bull imagery, Linear A.", "Mycenaeans: citadels, gold masks, Linear B (early Greek).", "Both collapsed c. 1200 BCE — Homer's epics remember it."],
    met: "Greek and Roman Art — Galleries 150–176 (Aegean bronzes and Minoan/Mycenaean cases).",
    context: {
      bigPicture: "The Aegean Bronze Age is the deep background to the Greek world. The Minoans were sea traders; the Mycenaeans were warriors who adopted Minoan culture and, after Crete's palaces were destroyed c. 1450 BCE, dominated the Aegean. Around 1200 BCE a mysterious Bronze Age Collapse destroyed them both, plunging Greece into a Dark Age out of which classical Greece emerged.",
      geography: "Crete lies at the crossroads of the eastern Mediterranean; its mild climate and sea trade made the Minoans rich. Mainland Greece's fortified citadels (Mycenae, Tiryns) sat on rocky hills controlling fertile plains.",
      keyIdeas: [
        { t: "Thalassocracy", d: "Minoan 'rule of the sea,' powered by trade rather than walls." },
        { t: "Palaces as centers", d: "Knossos, Phaistos, Mycenae: administrative and religious hubs." },
        { t: "Linear A vs Linear B", d: "Minoan (undeciphered) vs Mycenaean (deciphered as early Greek)." },
        { t: "The Bronze Age Collapse", d: "The c. 1200 BCE breakdown of the eastern Mediterranean world." }
      ],
      spotIt: [
        { t: "Bull imagery", d: "Bull-leaping frescoes and bull-head rhyta." },
        { t: "Marine Style pottery", d: "Octopuses and sea life on vases." },
        { t: "Gold death masks", d: "From Mycenae's shaft graves." },
        { t: "Linear B tablets", d: "Clay tablets recording palace inventories." }
      ]
    },
    periods: [
      { name: "Minoan palaces", years: "c. 2700–1450 BCE", start: -2700, end: -1450, summary: "Knossos and the first European palaces.", detail: "The Minoans built the first great palaces of Europe at Knossos, Phaistos, and Malia, famous for light wells, colorful frescoes, and the bull-leaping ritual. Their Linear A script remains undeciphered. The eruption of Thera (Santorini, c. 1600 BCE) shook but did not end them." },
      { name: "Mycenaean age", years: "c. 1600–1100 BCE", start: -1600, end: -1100, summary: "Citadels, shaft graves, and Linear B.", detail: "The Mycenaeans built Cyclopean-walled citadels (Mycenae's Lion Gate, Tiryns), buried kings with gold masks and weapons, and traded across the Mediterranean. Their scribes wrote Linear B — deciphered in 1952 as an early form of Greek. Around 1450 BCE they took over Crete." },
      { name: "Collapse", years: "c. 1200–1100 BCE", start: -1200, end: -1100, summary: "The Bronze Age Collapse.", detail: "Around 1200 BCE the palaces burned and the Mycenaean world unraveled — part of a wider collapse affecting the Hittites, Egypt's rivals, and trade networks. Writing disappears from Greece for centuries; Homer's epics later rework memories of this age." }
    ],
    events: [
      { year: -2700, label: "Minoan palaces", detail: "Knossos is founded." },
      { year: -1600, label: "Thera erupts", detail: "Santorini; Mycenaean shaft graves." },
      { year: -1450, label: "Mycenaeans on Crete", detail: "Linear B appears." },
      { year: -1200, label: "Collapse", detail: "Palaces burn; the Dark Age begins." }
    ],
    museum: {
      see: [
        "Frescoes (often fragments) from Knossos and Thera.",
        "Marine Style octopus pottery.",
        "Gold masks, cups, and jewelry from Mycenae.",
        "Linear B tablets and seal stones."
      ],
      lingo: [
        { t: "Linear A / Linear B", d: "Minoan (unread) vs Mycenaean (early Greek) scripts." },
        { t: "Rhyton", d: "Animal-shaped pouring vessel." },
        { t: "Megaron", d: "The palace hall, ancestor of the Greek temple." },
        { t: "Cyclopean", d: "Walls of stones so big only Cyclopes could have built them." }
      ],
      where: [
        "Heraklion Archaeological Museum (Crete) and the National Archaeological Museum, Athens.",
        "The Met — Greek and Roman Art (Mycenaean gold, Minoan pottery).",
        "British Museum — Minoan and Mycenaean antiquities."
      ]
    }
  },

  {
    slug: "china",
    name: "Dynastic China",
    emoji: "🐉",
    accent: "#dc2626",
    group: "Asia",
    region: "East Asia, centered on the Yellow and Yangtze rivers",
    start: -1600,
    end: 1912,
    spanLabel: "c. 1600 BCE – 1912 CE",
    tagline: "Four thousand years of dynasties, ritual bronzes, jade, and the world's longest continuous artistic tradition.",
    overview: "Chinese civilization is a chain of dynasties — Shang, Zhou, Qin, Han, Tang, Song, Ming, Qing — each claiming the Mandate of Heaven. Its art is unmatched in continuity: ritual bronzes, jade, calligraphy, ceramics, and painting recur across millennia. In a museum, Chinese galleries are usually organized by dynasty and by material (bronze, jade, ceramic, painting).",
    quick: ["~4,000 years of dynasties under the Mandate of Heaven.", "Organized by dynasty and material: bronzes, jade, ceramics, painting.", "Look for taotie masks, jade bi/cong, celadon and blue-and-white.", "Qin unifies in 221 BCE; Han, Tang, Song, Ming, Qing follow."],
    met: "Asian Art — Galleries 200–253. The Chinese galleries include the Astor Court and Buddhist sculpture.",
    context: {
      bigPicture: "China developed writing, bronze-casting, and statecraft independently, and periodically unified into huge empires. Confucianism, Daoism, and later Buddhism supplied its ideas; the civil-service exam created a scholar-official class that prized calligraphy and painting. The Qin first unified China in 221 BCE; the Han gave the majority ethnic group its name.",
      geography: "Two great rivers — the Yellow (north) and Yangtze (south) — anchor Chinese civilization. Loess soil, millet and wheat in the north, rice in the south; mountains and deserts on the frontiers shaped a long, relatively self-contained history.",
      keyIdeas: [
        { t: "Mandate of Heaven", d: "Heaven grants rule to the just and withdraws it from the corrupt, justifying dynastic change." },
        { t: "Ancestor veneration", d: "Ritual bronzes and offerings to ancestors underpinned Shang and Zhou religion." },
        { t: "Scholar-official culture", d: "Literati valued calligraphy, poetry, and painting as marks of cultivation." },
        { t: "The Three Teachings", d: "Confucianism, Daoism, and Buddhism coexisting." }
      ],
      spotIt: [
        { t: "Taotie", d: "A frontal, symmetrical monster-mask motif on Shang and Zhou bronzes." },
        { t: "Jade bi and cong", d: "A flat disk (bi, heaven) and squared tube (cong, earth) of ritual jade." },
        { t: "Celadon and porcelain", d: "Green-glazed stoneware, then true porcelain — a Chinese invention." },
        { t: "Hanging scrolls", d: "Paintings meant to be unrolled and viewed, not framed." }
      ]
    },
    periods: [
      { name: "Shang", years: "c. 1600–1046 BCE", start: -1600, end: -1046, summary: "Oracle bones and the first great bronzes.", detail: "The Shang is the first Chinese dynasty confirmed by both archaeology and writing. Oracle bones (turtle shells and ox scapulae) bear the earliest Chinese script; ritual bronze vessels for food and wine, cast in piece-molds, were made for ancestor worship." },
      { name: "Zhou", years: "c. 1046–256 BCE", start: -1046, end: -256, summary: "The Mandate of Heaven and the age of Confucius.", detail: "The Zhou justified their conquest with the Mandate of Heaven. The later Zhou (Spring and Autumn, then Warring States) saw Confucius, Laozi, and the competing schools of thought. Bronze inscriptions record events; jade and lacquer flourish." },
      { name: "Qin & Han", years: "221 BCE – 220 CE", start: -221, end: 220, summary: "Unification, the Great Wall, and the Silk Road.", detail: "Qin Shi Huang unified China in 221 BCE, standardized writing and weights, and was buried with the terracotta army. The Han (206 BCE – 220 CE) opened the Silk Road, made paper, and created the model of the Chinese state; Han mirrors and ceramic tomb figures (mingqi) are common in museums." },
      { name: "Tang & Song", years: "618–1279 CE", start: 618, end: 1279, summary: "A cosmopolitan golden age, then refinement and landscape painting.", detail: "The Tang (618–907) was an open, cosmopolitan empire — sancai (three-color) glazed pottery, Buddhist sculpture, and international trade. The Song (960–1279) prized subtle monochrome ceramics and monumental landscape painting; movable type and the magnetic compass appear." },
      { name: "Ming & Qing", years: "1368–1912 CE", start: 1368, end: 1912, summary: "Porcelain, the Forbidden City, and the last dynasty.", detail: "The Ming (1368–1644) built the Forbidden City and produced blue-and-white porcelain for export. The Qing (1644–1912), a Manchu dynasty, expanded China to its greatest extent and perfected enameled porcelain before the empire ended in revolution in 1912." }
    ],
    events: [
      { year: -1600, label: "Shang", detail: "First confirmed dynasty; oracle-bone script." },
      { year: -1046, label: "Zhou conquest", detail: "The Mandate of Heaven doctrine." },
      { year: -221, label: "Qin unification", detail: "The First Emperor; the terracotta army." },
      { year: 206, label: "Han dynasty", detail: "The Silk Road opens." },
      { year: 618, label: "Tang dynasty", detail: "A cosmopolitan golden age." },
      { year: 960, label: "Song dynasty", detail: "Landscape painting; refined ceramics." },
      { year: 1368, label: "Ming dynasty", detail: "The Forbidden City; blue-and-white porcelain." },
      { year: 1912, label: "Qing ends", detail: "The republic is declared." }
    ],
    museum: {
      see: [
        "Ritual bronze vessels (ding, gui, jue).",
        "Jade bi, cong, and ornaments.",
        "Porcelain and celadon from every dynasty.",
        "Tomb figures (mingqi) — horses, camels, attendants.",
        "Hanging scrolls and calligraphy (rotated to preserve them)."
      ],
      lingo: [
        { t: "Taotie", d: "Monster-mask bronze motif." },
        { t: "Bi / cong", d: "Ritual jade disk / tube." },
        { t: "Mingqi", d: "Tomb (spirit) objects." },
        { t: "Sancai", d: "Tang three-color glaze." },
        { t: "Celadon", d: "Green-glazed stoneware." },
        { t: "Blue-and-white", d: "Cobalt-on-porcelain, perfected in the Yuan and Ming." }
      ],
      where: [
        "The Met — Chinese galleries (bronzes, jade, paintings).",
        "Asian Art Museum (SF) — one of the best Chinese collections outside China.",
        "de Young — jade collection and special exhibitions."
      ]
    }
  },

  {
    slug: "indus",
    name: "Indus Valley",
    emoji: "🐘",
    accent: "#64748b",
    group: "Asia",
    region: "Indus river basin: modern Pakistan and northwest India",
    start: -3300,
    end: -1300,
    spanLabel: "c. 3300 – 1300 BCE",
    tagline: "A vast, astonishingly well-planned urban civilization whose writing no one can read.",
    overview: "The Indus (Harappan) civilization was the largest of the early river civilizations, covering more area than Egypt and Mesopotamia combined. Its mature phase (c. 2600–1900 BCE) produced cities — Harappa, Mohenjo-daro, Dholavira — with grid streets, brick houses, and sophisticated drainage. Its script is undeciphered, so we know it mostly through objects: tiny carved seals, weights, and pottery.",
    quick: ["Largest of the early river civilizations (mature phase c. 2600–1900 BCE).", "Grid-planned cities with brick houses and drainage.", "No readable script — known through seals, weights, pottery.", "Declined c. 1900 BCE, likely from climate and river shifts."],
    met: "Asian Art — South Asian galleries (Indus seals, few but choice).",
    context: {
      bigPicture: "The Indus is the least understood great civilization because its writing remains unread. What's clear: it was urban, standardized, and remarkably peaceful — few weapons and no obvious royal palaces or temples. It traded with Mesopotamia (Indus seals found there), then declined around 1900 BCE, likely through climate shifts and river changes rather than conquest.",
      geography: "The Indus and its (now dry) tributaries, including the Ghaggar-Hakra, watered rich farmland that supported huge cities. The river's shifting course and a weakening monsoon may have driven the cities' decline.",
      keyIdeas: [
        { t: "Standardization", d: "Identical brick sizes, weights, and seals across a million square kilometers." },
        { t: "Civic planning", d: "Gridded streets, wells, and covered drains — plumbing before Rome." },
        { t: "Trade, not war", d: "Indus seals and weights appear in Mesopotamia; little evidence of militarism." },
        { t: "Undeciphered script", d: "Short inscriptions, usually on seals; likely logosyllabic, still unread." }
      ],
      spotIt: [
        { t: "Steatite seals", d: "Small square seals carved with animals (especially the 'unicorn') and script." },
        { t: "Unicorn motif", d: "A one-horned animal, the most common seal image." },
        { t: "Terracotta figurines", d: "Cattle, women, and carts." },
        { t: "Standardized weights", d: "Cubical stone weights in a precise ratio system." }
      ]
    },
    periods: [
      { name: "Early Harappan", years: "c. 3300–2600 BCE", start: -3300, end: -2600, summary: "Farming villages grow into towns.", detail: "Small farming communities along the Indus developed crafts, long-distance trade, and early script before the mature cities appeared." },
      { name: "Mature Harappan", years: "c. 2600–1900 BCE", start: -2600, end: -1900, summary: "The great cities: Mohenjo-daro and Harappa.", detail: "At its height the Indus built cities of 30,000–40,000 people with baked-brick houses, the Great Bath at Mohenjo-daro, granaries, and the most advanced sanitation of the ancient world. Seals, weights, and script show a tightly integrated economy." },
      { name: "Late Harappan", years: "c. 1900–1300 BCE", start: -1900, end: -1300, summary: "Decline and regionalization.", detail: "The big cities were abandoned; populations dispersed into smaller villages. The script disappears, and the region's center of gravity later shifts east to the Ganges — where the Vedic and classical Indian traditions arise." }
    ],
    events: [
      { year: -2600, label: "Mature phase", detail: "Great cities at Mohenjo-daro, Harappa, Dholavira." },
      { year: -2500, label: "Great Bath", detail: "The public water tank at Mohenjo-daro." },
      { year: -2300, label: "Trade with Mesopotamia", detail: "Indus seals found in Sumer." },
      { year: -1900, label: "Decline", detail: "Cities abandoned; the script vanishes." }
    ],
    museum: {
      see: [
        "Steatite seals and sealings.",
        "Terracotta figurines and toys.",
        "Pottery with fish-scale and peepal-leaf motifs.",
        "Stone weights and copper or bronze tools."
      ],
      lingo: [
        { t: "Harappan", d: "Named after the first excavated site, Harappa." },
        { t: "Steatite", d: "Soft stone (soapstone) used for seals." },
        { t: "Mohenjo-daro", d: "The largest city; the name means 'Mound of the Dead.'" },
        { t: "Unicorn seal", d: "The signature one-horned animal motif." }
      ],
      where: [
        "The Met — small but choice Indus seals in the South Asian galleries.",
        "National Museum, New Delhi / Karachi museums — the core collections.",
        "Asian Art Museum (SF) — occasional South Asian antiquities."
      ]
    }
  },

  {
    slug: "olmec",
    name: "The Olmec",
    emoji: "🗿",
    accent: "#57534e",
    group: "The Americas",
    region: "Gulf coast of Mexico (Veracruz and Tabasco)",
    start: -1500,
    end: -400,
    spanLabel: "c. 1500 – 400 BCE",
    tagline: "Mesoamerica's 'mother culture' — colossal heads, jade, and the ballgame.",
    overview: "The Olmec are the earliest major civilization of Mesoamerica, flourishing on Mexico's Gulf coast. They carved multi-ton basalt heads, established the ritual ballgame, and created motifs — the jaguar, the feathered serpent — that echo through the Maya and Aztecs two thousand years later. Their name, given by the Aztecs, means 'rubber people,' after the region's rubber trees.",
    quick: ["Mesoamerica's 'mother culture' (c. 1500–400 BCE).", "Colossal basalt heads — probably rulers.", "The were-jaguar, jade, and the ballgame.", "Its motifs echo through Maya and Aztec art."],
    met: "Michael C. Rockefeller Wing (reopened 2025) — the Arts of the Ancient Americas galleries.",
    context: {
      bigPicture: "Olmec art and ideas — sacred rulership, the ballgame, the calendar — became the shared toolkit of later Mesoamerica, which is why they're called the 'mother culture.' They built the ceremonial centers of San Lorenzo and La Venta, traded jade and obsidian over great distances, and left no readable writing, though later 'Epi-Olmec' monuments hint at an early script.",
      geography: "The hot, riverine lowlands of the Gulf coast — rubber, cacao, and rich soil — supported dense populations. Basalt for the colossal heads was quarried in the distant Tuxtla mountains and rafted downriver; jade came from even farther, by long-distance exchange.",
      keyIdeas: [
        { t: "Mother culture", d: "The Olmec as the source culture for later Mesoamerica." },
        { t: "The were-jaguar", d: "A human-jaguar supernatural — the dominant Olmec image." },
        { t: "The ballgame", d: "The ritual ballgame, played on courts, with cosmic stakes." },
        { t: "Jade", d: "The most precious material, carved into celts, masks, and figurines." }
      ],
      spotIt: [
        { t: "Colossal heads", d: "Multi-ton basalt portraits, each face distinct — probably rulers." },
        { t: "Were-jaguar", d: "Down-turned mouths and cleft heads on humans and supernaturals." },
        { t: "Jade celts", d: "Axe-shaped jade objects, often carved or incised." },
        { t: "Baby-face figurines", d: "Plump, hollow ceramic infants with jaguar features." }
      ]
    },
    periods: [
      { name: "San Lorenzo", years: "c. 1500–900 BCE", start: -1500, end: -900, summary: "The first great Olmec center.", detail: "San Lorenzo, on a plateau above the Coatzacoalcos river, was the earliest major Olmec center, with artificial plateaus, drainage systems, and the first colossal heads (c. 1200 BCE). Its monuments were later defaced and buried." },
      { name: "La Venta", years: "c. 900–400 BCE", start: -900, end: -400, summary: "The great period: pyramids, jade, and buried offerings.", detail: "La Venta, on an island in the Tonalá swamps, was the Olmec apogee: an earthen pyramid, colossal heads, tombs, and rich buried offerings of jade and serpentine. Around 400 BCE the center was ritually 'killed' — its monuments broken and buried." },
      { name: "Epi-Olmec", years: "c. 400 BCE – 250 CE", start: -400, end: 250, summary: "Successors and an early script.", detail: "After La Venta's fall, successor cultures carried on. The La Mojarra stela and other monuments bear the Epi-Olmec script — a possible bridge to Maya writing — as the Gulf coast's center of gravity shifted." }
    ],
    events: [
      { year: -1500, label: "Olmec emerges", detail: "Early villages and ceremonial centers." },
      { year: -1200, label: "First colossal heads", detail: "Basalt portraits at San Lorenzo." },
      { year: -900, label: "La Venta rises", detail: "The Olmec apogee." },
      { year: -400, label: "La Venta abandoned", detail: "The center is ritually 'killed.'" }
    ],
    museum: {
      see: [
        "Colossal heads (in Mexican museums) and smaller stone sculptures.",
        "Jade and serpentine celts, masks, and figurines.",
        "'Were-jaguar' stone and ceramic sculptures.",
        "Ceramic baby-face figurines.",
        "Later stelae with the Epi-Olmec script."
      ],
      lingo: [
        { t: "Colossal head", d: "A monumental basalt ruler portrait." },
        { t: "Were-jaguar", d: "The human-jaguar supernatural." },
        { t: "Celt", d: "An axe-shaped stone or jade object." },
        { t: "Epi-Olmec", d: "The successor cultures and script." },
        { t: "Basalt", d: "The volcanic stone of the heads." }
      ],
      where: [
        "de Young — Arts of the Americas (Olmec jade and figurines).",
        "The Met — Ancient Americas galleries.",
        "Museo de Antropología de Xalapa and Parque-Museo La Venta (Mexico)."
      ]
    }
  },

  {
    slug: "maya",
    name: "The Maya",
    emoji: "🌽",
    accent: "#16a34a",
    group: "The Americas",
    region: "Southern Mexico, Guatemala, Belize, Honduras, El Salvador",
    start: -2000,
    end: 1697,
    spanLabel: "c. 2000 BCE – 1697 CE",
    tagline: "City-states of the rainforest: the most advanced writing and astronomy in the ancient Americas.",
    overview: "The Maya built dozens of city-states in the tropical lowlands, famous for stepped pyramids, a fully developed hieroglyphic writing system, the Long Count calendar, and stunning jade, stucco, and painted pottery. They were never a single empire but a network of rival courts. After the collapse of the southern lowlands around 900 CE, Maya civilization continued in the north — and persists today: millions of Maya people still speak Mayan languages.",
    quick: ["Rainforest city-states, never a single empire.", "The only full writing system of the ancient Americas.", "Stelae of kings, jade, painted vases, the Long Count calendar.", "Southern cities collapsed c. 900 CE; Maya people endure today."],
    met: "Michael C. Rockefeller Wing (reopened 2025) — the Arts of the Ancient Americas galleries.",
    context: {
      bigPicture: "Maya achievement — writing, positional mathematics with zero, and precise astronomy — developed independently of the Old World. Kings (ajaw) recorded their dynasties and conquests on stone stelae. The so-called collapse around 900 CE was a regional breakdown (drought, overpopulation, warfare), not an extinction.",
      geography: "The Yucatán Peninsula's limestone lowlands have no major rivers; water came from cenotes (sinkholes) and reservoirs. Rainforest, limestone, imported jade, cacao, and maize shaped the civilization.",
      keyIdeas: [
        { t: "City-state politics", d: "Tikal, Palenque, Calakmul, Copán: rival dynasties, alliances, and wars." },
        { t: "Writing and the calendar", d: "Hieroglyphs and the Long Count, which pinned events to absolute dates." },
        { t: "The ballgame", d: "A ritual ballgame with cosmic stakes, played on stone courts." },
        { t: "Blood and maize", d: "Kings offered blood to the gods; humans were made, in myth, from maize." }
      ],
      spotIt: [
        { t: "Stelae", d: "Carved stone monuments of kings with glyphs and dates." },
        { t: "Corbelled arch", d: "The Maya 'false arch' of overlapping stones." },
        { t: "Jade", d: "The most precious material; masks and jewelry." },
        { t: "Codex-style pottery", d: "Cylinders painted with myth and court scenes." }
      ]
    },
    periods: [
      { name: "Preclassic", years: "c. 2000 BCE – 250 CE", start: -2000, end: 250, summary: "Villages to cities; the first pyramids.", detail: "Maya communities grew maize; early cities like El Mirador raised some of the largest pyramids ever built. Writing and the Long Count calendar develop." },
      { name: "Classic", years: "c. 250–900 CE", start: 250, end: 900, summary: "The peak: Tikal, Palenque, and the stela kings.", detail: "The Classic is the age of the great lowland courts — Tikal, Calakmul, Palenque, Copán, and Quiriguá — with dynastic histories on stelae, spectacular architecture, and the finest Maya art. Around 800–900 CE the southern cities collapsed amid drought and war." },
      { name: "Postclassic", years: "c. 900–1697 CE", start: 900, end: 1697, summary: "Chichén Itzá and the northern cities.", detail: "After the southern collapse, power moved north — Uxmal, then Chichén Itzá, then Mayapán. Maya books (codices) and trade networks flourished. Spanish conquest came in the 1520s; the last independent kingdom, Nojpetén, fell in 1697." }
    ],
    events: [
      { year: -2000, label: "Early Maya", detail: "Maize-farming villages." },
      { year: 250, label: "Classic begins", detail: "Dynastic cities and stelae." },
      { year: 600, label: "Tikal & Calakmul", detail: "A superpower rivalry." },
      { year: 800, label: "Collapse", detail: "Southern lowland cities are abandoned." },
      { year: 1000, label: "Chichén Itzá", detail: "The northern peak." },
      { year: 1524, label: "Spanish conquest", detail: "Pedro de Alvarado invades." },
      { year: 1697, label: "Nojpetén falls", detail: "The last independent Maya kingdom." }
    ],
    museum: {
      see: [
        "Carved limestone stelae and lintels (e.g. the Yaxchilán lintels).",
        "Jade masks and jewelry.",
        "Painted cylinder vases.",
        "Eccentric flints and obsidian blades.",
        "Figurines and incense burners."
      ],
      lingo: [
        { t: "Ajaw", d: "King, lord." },
        { t: "Stela", d: "Carved stone monument." },
        { t: "Long Count", d: "The calendar with absolute dating." },
        { t: "Cenote", d: "Sinkhole water source." },
        { t: "Codex", d: "Folded bark-paper book." },
        { t: "Ballcourt", d: "Ritual ballgame court." }
      ],
      where: [
        "de Young — Arts of the Americas galleries and major Maya exhibitions.",
        "The Met — Ancient Americas (Maya stelae, jade, ceramics).",
        "National Museum of Anthropology, Mexico City, and Guatemala City museums."
      ]
    }
  },

  {
    slug: "aztec",
    name: "The Aztec (Mexica)",
    emoji: "☀️",
    accent: "#ea580c",
    group: "The Americas",
    region: "Valley of Mexico (central Mexico); capital Tenochtitlan",
    start: 1325,
    end: 1521,
    spanLabel: "1325 – 1521 CE",
    tagline: "The empire of the Fifth Sun — monumental sculpture and a capital that astonished the conquistadors.",
    overview: "The Aztecs (who called themselves Mexica) arrived in the Valley of Mexico as outsiders and, within two centuries, ruled the most powerful empire of Mesoamerica from their island capital, Tenochtitlan — larger and cleaner, the Spanish said, than any city they knew. Their art is monumental, aggressive, and deeply religious: stone gods, skull racks, and the famous Sun Stone.",
    quick: ["The Mexica empire, 1325–1521, capital Tenochtitlan.", "A tribute empire; religion demanded blood to keep the sun moving.", "Monumental stone: the Sun Stone, Coatlicue.", "Fell to Cortés and his indigenous allies in 1521."],
    met: "Michael C. Rockefeller Wing (reopened 2025) — the Arts of the Ancient Americas galleries.",
    context: {
      bigPicture: "The Aztec empire was a tribute machine: conquered city-states paid goods and captives, and religion — especially the cult of the war-and-sun god Huitzilopochtli — demanded blood to keep the sun moving. This is the world Hernán Cortés encountered in 1519 and destroyed by 1521 with the help of indigenous allies.",
      geography: "Tenochtitlan sat on an island in Lake Texcoco, linked by causeways and fed by chinampas — artificial agricultural islands. The basin's obsidian, salt, and tribute made the empire rich.",
      keyIdeas: [
        { t: "The Fifth Sun", d: "The current cosmic era, born of the gods' self-sacrifice; humanity owes blood in return." },
        { t: "Tribute empire", d: "Rule through extracted tribute rather than direct occupation." },
        { t: "Huitzilopochtli", d: "The Mexica patron, a hummingbird war god, honored at the Templo Mayor." },
        { t: "Flower wars", d: "Ritualized conflicts to obtain sacrificial captives." }
      ],
      spotIt: [
        { t: "Monumental basalt", d: "Coatlicue, the Coyolxauhqui stone, and the Sun Stone." },
        { t: "Turquoise mosaic", d: "The double-headed serpent, masks, and shields." },
        { t: "Skull imagery", d: "Tzompantli (skull racks) and skull masks." },
        { t: "Obsidian", d: "Volcanic glass for blades, mirrors, and inlay." }
      ]
    },
    periods: [
      { name: "Foundation", years: "1325 CE", start: 1325, end: 1325, summary: "Tenochtitlan founded on an island.", detail: "Legend says the Mexica settled where they saw an eagle on a cactus eating a snake — today Mexico's coat of arms. For a century they served as mercenaries and vassals of stronger cities." },
      { name: "Triple Alliance", years: "1428–1519 CE", start: 1428, end: 1519, summary: "The empire of the Triple Alliance.", detail: "In 1428 the Mexica, with Texcoco and Tlacopan, overthrew their overlords and built an empire. Under rulers like Moctezuma I the Templo Mayor was enlarged; the Sun Stone was carved around 1479. By 1519 the empire ruled millions." },
      { name: "Conquest", years: "1519–1521 CE", start: 1519, end: 1521, summary: "Cortés and the fall of Tenochtitlan.", detail: "Hernán Cortés arrived in 1519, allied with the Aztecs' resentful subjects, and took Moctezuma II hostage. In 1521 Tenochtitlan fell after a brutal siege; smallpox did much of the killing. The city's ruins lie under modern Mexico City." }
    ],
    events: [
      { year: 1325, label: "Tenochtitlan founded", detail: "Eagle, cactus, and serpent." },
      { year: 1428, label: "Triple Alliance", detail: "The empire begins." },
      { year: 1479, label: "Sun Stone", detail: "The calendar stone is carved." },
      { year: 1519, label: "Cortés arrives", detail: "Moctezuma II meets the Spanish." },
      { year: 1521, label: "Fall of Tenochtitlan", detail: "The empire is destroyed." }
    ],
    museum: {
      see: [
        "Basalt sculptures — the Sun Stone, Coatlicue, Coyolxauhqui.",
        "Turquoise mosaics — the double-headed serpent.",
        "Obsidian knives and mirrors.",
        "Ceramic censers and effigy vessels.",
        "Post-conquest codices depicting Aztec life."
      ],
      lingo: [
        { t: "Mexica", d: "What the Aztecs called themselves." },
        { t: "Tenochtitlan", d: "The island capital (modern Mexico City)." },
        { t: "Templo Mayor", d: "The great twin-temple pyramid." },
        { t: "Tzompantli", d: "A skull rack." },
        { t: "Chinampa", d: "A 'floating garden.'" },
        { t: "Nahuatl", d: "The Aztec language (still spoken)." }
      ],
      where: [
        "Museo del Templo Mayor and the National Museum of Anthropology, Mexico City.",
        "de Young — Arts of the Americas and rotating Mexica exhibitions.",
        "British Museum — the turquoise double-headed serpent."
      ]
    }
  },

  {
    slug: "inca",
    name: "The Inca",
    emoji: "🦙",
    accent: "#9333ea",
    group: "The Americas",
    region: "The Andes: Peru, Ecuador, Bolivia, Chile, Argentina, Colombia",
    start: 1438,
    end: 1533,
    spanLabel: "1438 – 1533 CE",
    tagline: "The largest empire in the pre-Columbian Americas — roads, knotted records, and stonework without mortar.",
    overview: "In a single century the Inca built the largest empire ever seen in the Americas, stretching 4,000 km along the Andes from a capital at Cusco. They had no writing, money, or wheel — instead: a 40,000-km road network, the quipu (knotted cords) for records, and astonishing ashlar masonry. Their empire fell to Francisco Pizarro in 1533.",
    quick: ["The largest empire of the pre-Columbian Americas (1438–1533).", "No writing or wheel — roads, quipu knots, and ashlar stonework.", "Machu Picchu (c. 1450) was a royal estate.", "Fell to Pizarro amid civil war and smallpox."],
    met: "Michael C. Rockefeller Wing (reopened 2025) — the Arts of the Ancient Americas galleries.",
    context: {
      bigPicture: "The Inca state (Tawantinsuyu, 'the four quarters') mobilized labor through the mit'a system and redistributed goods through state storehouses. The Sapa Inca was a divine ruler, son of the sun god Inti. Spanish conquest came at a moment of civil war between two half-brothers, Atahualpa and Huáscar.",
      geography: "The Andes are high, vertical, and earthquake-prone — which explains the Inca genius for terracing, suspension bridges, and tightly fitted stone blocks that flex rather than crack. Llamas and alpacas provided wool and transport.",
      keyIdeas: [
        { t: "Tawantinsuyu", d: "The empire of 'four quarters,' centered on Cusco." },
        { t: "Mit'a", d: "Rotating labor service owed to the state." },
        { t: "Quipu (khipu)", d: "Knotted cords encoding numbers — and possibly more." },
        { t: "Inti", d: "The sun god, ancestor of the royal line." }
      ],
      spotIt: [
        { t: "Ashlar masonry", d: "Stone blocks fitted so tightly a blade can't pass, with no mortar." },
        { t: "Quipu", d: "Bundles of colored, knotted cords." },
        { t: "Camelid textiles", d: "Fine llama and alpaca cloth — a form of wealth." },
        { t: "Aryballos", d: "Pointed-bottom jars for carrying maize beer (chicha)." }
      ]
    },
    periods: [
      { name: "Rise", years: "c. 1200–1438 CE", start: 1200, end: 1438, summary: "From a small Cusco chiefdom to a regional power.", detail: "The Inca were one of many Andean peoples until Pachacuti (r. 1438–1471) seized power after a dramatic victory and began transforming Cusco into an imperial capital." },
      { name: "Empire", years: "1438–1527 CE", start: 1438, end: 1527, summary: "Pachacuti and his successors build Tawantinsuyu.", detail: "Pachacuti and his son Topa Inca Yupanqui conquered from Ecuador to Chile, building roads, terraces, storehouses, and Machu Picchu (c. 1450) as a royal estate. Administration was precise: census, quipu records, and resettlement of loyal populations." },
      { name: "Conquest", years: "1527–1533 CE", start: 1527, end: 1533, summary: "Civil war, then Pizarro.", detail: "The death of Huayna Capac (c. 1527, probably of smallpox) triggered a civil war between Atahualpa and Huáscar. Pizarro arrived in 1532, captured Atahualpa at Cajamarca, and executed him in 1533. The empire collapsed, though a rump state held out at Vilcabamba until 1572." }
    ],
    events: [
      { year: 1438, label: "Pachacuti", detail: "The empire begins; Cusco is rebuilt." },
      { year: 1450, label: "Machu Picchu", detail: "A royal estate is built." },
      { year: 1471, label: "Topa Inca", detail: "The empire expands north and south." },
      { year: 1527, label: "Huayna Capac dies", detail: "Smallpox and civil war." },
      { year: 1532, label: "Pizarro at Cajamarca", detail: "Atahualpa is captured." },
      { year: 1533, label: "Atahualpa executed", detail: "The empire falls." }
    ],
    museum: {
      see: [
        "Quipus (knotted records).",
        "Camelid textiles — tunics (uncu) and cloaks.",
        "Gold, silver, and copper figurines and vessels.",
        "Aryballos jars and wooden kero drinking cups."
      ],
      lingo: [
        { t: "Sapa Inca", d: "The emperor." },
        { t: "Tawantinsuyu", d: "The four-quarter empire." },
        { t: "Quipu / khipu", d: "Knotted-cord record." },
        { t: "Mit'a", d: "Labor service." },
        { t: "Ashlar", d: "Tightly fitted stone masonry." },
        { t: "Uncu", d: "A man's tunic." }
      ],
      where: [
        "Museo Larco (Lima) and the Museo Inka (Cusco).",
        "de Young — Arts of the Americas (Inca textiles and metalwork).",
        "The Met — Ancient Americas."
      ]
    }
  },

  {
    slug: "islamic",
    name: "Islamic Golden Age",
    emoji: "🌙",
    accent: "#059669",
    group: "Ancient Mediterranean & Near East",
    region: "From Spain and North Africa to Central Asia and India",
    start: 622,
    end: 1258,
    spanLabel: "622 – 1258 CE",
    tagline: "Baghdad to Córdoba: scholarship, calligraphy, and geometric splendor in the medieval Islamic world.",
    overview: "Between the 8th and 13th centuries, the Islamic world preserved Greek learning and advanced mathematics, astronomy, medicine, and optics while Europe was in its early medieval period. Its art — calligraphy, geometric pattern, arabesque — developed because religious art avoided depicting living beings in sacred contexts. In a museum you'll meet it as manuscripts, lusterware, astrolabes, carpets, and mosque furnishings.",
    quick: ["c. 622–1258, from Spain to Central Asia.", "Preserved Greek learning; advanced math, medicine, optics.", "Sacred art avoids figures — calligraphy, geometry, arabesque.", "Baghdad's House of Wisdom; the city fell in 1258."],
    met: "Art of the Arab Lands, Turkey, Iran, Central Asia, and Later South Asia — Galleries 450–464.",
    context: {
      bigPicture: "After Muhammad's death (632 CE), Arab armies built a caliphate stretching from Spain to Central Asia. Under the Abbasids, Baghdad's House of Wisdom translated Greek and Persian texts; scholars like al-Khwarizmi (algebra), Ibn al-Haytham (optics), and Ibn Sina (medicine) shaped world science. The Mongols sacked Baghdad in 1258, but Islamic art and learning continued in Cairo, Córdoba, Isfahan, and Istanbul.",
      geography: "A desert-and-oasis heartland gave way to a vast, arid empire linked by trade routes — camel caravans, the Silk Road, and the Indian Ocean. Paper (learned from China) made books cheap and scholarship explosive.",
      keyIdeas: [
        { t: "Tawhid & aniconism", d: "God's oneness; sacred art avoids figurative images, favoring word and pattern." },
        { t: "Calligraphy as the highest art", d: "Writing the Qur'an beautifully is an act of devotion." },
        { t: "The translation movement", d: "Baghdad translated Greek and Persian learning into Arabic." },
        { t: "Science as faith", d: "Astronomy oriented prayer and pilgrimage; medicine and math served the community." }
      ],
      spotIt: [
        { t: "Calligraphy", d: "Flowing Arabic scripts — kufic, naskh, thuluth." },
        { t: "Arabesque & girih", d: "Interlacing vines and star-and-polygon geometry." },
        { t: "Lusterware", d: "Ceramics with a metallic glaze sheen." },
        { t: "Astrolabes", d: "Brass instruments for astronomy and time." }
      ]
    },
    periods: [
      { name: "The Caliphates", years: "632–750 CE", start: 632, end: 750, summary: "From Medina to the Umayyad empire.", detail: "After Muhammad's death (632), the Rashidun and then the Umayyad caliphs (661–750, capital Damascus) built an empire from Spain to the Indus, culminating in the Great Mosque of Damascus and the Dome of the Rock in Jerusalem (691)." },
      { name: "Abbasid Golden Age", years: "750–1258 CE", start: 750, end: 1258, summary: "Baghdad, the House of Wisdom, and the flowering of science.", detail: "The Abbasids moved the capital to Baghdad (762), where the House of Wisdom translated Greek and Persian classics. Al-Khwarizmi founded algebra, al-Razi and Ibn Sina advanced medicine, and Ibn al-Haytham established experimental optics. Baghdad fell to the Mongols in 1258." },
      { name: "Later empires", years: "1258–1500 CE", start: 1258, end: 1500, summary: "Mamluks, Timurids, and the Ottomans.", detail: "After Baghdad, centers shifted to Cairo (Mamluks), Samarkand and Herat (Timurids), and later Isfahan and Istanbul (Safavids and Ottomans). Illuminated manuscripts, carpets, and mosque architecture reached new heights." }
    ],
    events: [
      { year: 622, label: "The Hijra", detail: "Muhammad's migration to Medina; the Islamic calendar begins." },
      { year: 691, label: "Dome of the Rock", detail: "Jerusalem." },
      { year: 762, label: "Baghdad founded", detail: "The Abbasid capital." },
      { year: 830, label: "House of Wisdom", detail: "The translation movement peaks." },
      { year: 1258, label: "Baghdad sacked", detail: "The Mongol conquest." }
    ],
    museum: {
      see: [
        "Illuminated Qur'an manuscripts and calligraphy panels.",
        "Lusterware and Iznik-style ceramics.",
        "Astrolabes and scientific instruments.",
        "Carpets, textiles, and mosque furnishings (mihrabs, tiles).",
        "Inlaid brass bowls and ewers."
      ],
      lingo: [
        { t: "Mihrab", d: "Prayer niche indicating Mecca." },
        { t: "Kufic / naskh / thuluth", d: "Major Arabic calligraphic scripts." },
        { t: "Arabesque", d: "Interlacing vegetal ornament." },
        { t: "Girih", d: "Star-and-polygon geometric patterns." },
        { t: "Lusterware", d: "Ceramics with metallic glaze." },
        { t: "Astrolabe", d: "Astronomical instrument." }
      ],
      where: [
        "The Met — Islamic Art galleries.",
        "Asian Art Museum (SF) — Islamic world objects.",
        "British Museum / Louvre / Istanbul museums."
      ]
    }
  },

  {
    slug: "japan",
    name: "Japan",
    emoji: "⛩️",
    accent: "#b91c1c",
    group: "Asia",
    region: "Japanese archipelago (Honshu, Kyushu, Shikoku, Hokkaido)",
    start: -300,
    end: 1868,
    spanLabel: "c. 300 BCE – 1868 CE",
    tagline: "Shinto shrines to Zen gardens and the floating world — an island culture that borrowed and then made everything its own.",
    overview: "Japan's art tradition is one of borrowing and remaking: writing, Buddhism, and statecraft came from the Asian mainland, then were transformed into something unmistakably Japanese — the world's first novel, Zen aesthetics, Noh and kabuki, and the woodblock print. The Met's Arts of Japan galleries tell the story chronologically in eleven rooms, from Neolithic pottery to Meiji lacquer.",
    quick: [
      "An island culture shaped by Shinto, then deeply by Buddhism arriving via Korea.",
      "A long imperial line — but real power was usually held by shoguns, military rulers.",
      "Courtly refinement (Heian) → samurai austerity (Kamakura) → urban print culture (Edo).",
      "Look for emaki handscrolls, folding screens, ukiyo-e woodblock prints, and lacquer."
    ],
    met: "Arts of Japan — Galleries 223–232 (eleven chronological rooms, incl. a Buddhist altar platform and a shoin-style reception room).",
    context: {
      bigPicture: "Japan's civilization is a story of taking ideas from China and Korea — writing, Buddhism, Confucian statecraft — and making them its own. The emperor reigned while military shoguns usually ruled (1185–1868). Its art prizes impermanence and subtlety: ink painting, tea, seasonal poems, and the 'floating world' of the Edo pleasure quarters, captured by Hokusai and Hiroshige.",
      geography: "A mountainous archipelago of four main islands, prone to earthquakes and typhoons, with limited farmland and a rich sea. The sea both protected Japan and let it choose its borrowings. Wood and paper — not stone — are its building materials, which is why so much survives as painting, lacquer, and print rather than architecture.",
      keyIdeas: [
        { t: "Shinto", d: "The indigenous religion of kami (spirits) in nature, with shrines like Ise." },
        { t: "Buddhism's arrival", d: "Via Korea in the 6th century, bringing sculpture, temples, and writing." },
        { t: "Bushido & the shogun", d: "Warrior culture; the shogun held real power from 1185 to 1868." },
        { t: "Mono no aware", d: "The pathos of impermanence — central to Japanese aesthetics." }
      ],
      spotIt: [
        { t: "Emaki", d: "Horizontal illustrated handscrolls, read right to left." },
        { t: "Ukiyo-e", d: "'Pictures of the floating world' — Edo-period woodblock prints." },
        { t: "Byōbu", d: "Gold-leaf folding screens for grand rooms." },
        { t: "Lacquer (urushi)", d: "Wood coated in layers of sap, often with gold maki-e inlay." }
      ]
    },
    periods: [
      { name: "Yayoi & Kofun", years: "c. 300 BCE – 538 CE", start: -300, end: 538, summary: "Rice, bronze bells, and keyhole-shaped tomb mounds.", detail: "Rice agriculture and metal arrived in the Yayoi period. The Kofun period built huge keyhole-shaped burial mounds ringed with haniwa (clay figures) — the first great monuments of Japan." },
      { name: "Asuka & Nara", years: "538–794 CE", start: 538, end: 794, summary: "Buddhism arrives; the first permanent capital.", detail: "Buddhism arrived from Korea in 538, bringing temple architecture and sculpture. The first permanent capital was built at Nara, where the Great Buddha of Tōdai-ji (752) remains one of the world's largest bronze statues." },
      { name: "Heian", years: "794–1185 CE", start: 794, end: 1185, summary: "Kyoto, courtly refinement, and The Tale of Genji.", detail: "The capital moved to Heian-kyō (Kyoto). Court culture reached its peak: Lady Murasaki wrote The Tale of Genji (c. 1000), often called the first novel, and the Yamato-e style of painting developed for screens and scrolls." },
      { name: "Kamakura & Muromachi", years: "1185–1573 CE", start: 1185, end: 1573, summary: "Samurai rule, Zen, and the tea ceremony.", detail: "The samurai shogunates took power. Zen Buddhism shaped austere arts — ink painting, rock gardens, and the tea ceremony — while sculptors produced startlingly realistic portraits. The Sengoku ('warring states') era ended with unification under the Tokugawa." },
      { name: "Edo", years: "1603–1868 CE", start: 1603, end: 1868, summary: "Tokugawa peace and the floating world.", detail: "Two and a half centuries of peace under the Tokugawa shoguns, with Edo (Tokyo) as the world's largest city. Urban culture — kabuki, sumo, and above all the ukiyo-e print — flourished; Hokusai's Great Wave and Hiroshige's landscapes made the print a world art form." }
    ],
    events: [
      { year: -300, label: "Yayoi", detail: "Rice agriculture and metal arrive." },
      { year: 538, label: "Buddhism arrives", detail: "Via Korea; temples and writing follow." },
      { year: 794, label: "Heian-kyō", detail: "Kyoto is founded as the capital." },
      { year: 1000, label: "Tale of Genji", detail: "The world's first novel." },
      { year: 1185, label: "Kamakura shogunate", detail: "Samurai rule begins." },
      { year: 1603, label: "Edo shogunate", detail: "Tokugawa peace; the floating world." },
      { year: 1868, label: "Meiji Restoration", detail: "The emperor restored; Japan modernizes." }
    ],
    museum: {
      see: [
        "Emaki handscrolls (e.g. the Kitano Tenjin scrolls).",
        "Gold-leaf folding screens.",
        "Ukiyo-e prints — Hokusai and Hiroshige.",
        "Buddhist sculpture in wood and bronze.",
        "Samurai armor, swords, and tea-ceremony utensils.",
        "Lacquerware with maki-e decoration."
      ],
      lingo: [
        { t: "Emaki", d: "Illustrated handscroll." },
        { t: "Ukiyo-e", d: "Woodblock print of the 'floating world.'" },
        { t: "Byōbu", d: "Folding screen." },
        { t: "Maki-e", d: "Gold-sprinkled lacquer." },
        { t: "Netsuke", d: "A carved toggle on a sash." },
        { t: "Kakemono", d: "A hanging scroll." }
      ],
      where: [
        "The Met — Arts of Japan, Galleries 223–232.",
        "Asian Art Museum (SF) — a major Japanese collection.",
        "Tokyo National Museum and Kyoto National Museum."
      ]
    }
  },

  {
    slug: "korea",
    name: "Korea",
    emoji: "🏮",
    accent: "#0284c7",
    group: "Asia",
    region: "Korean peninsula",
    start: -100,
    end: 1910,
    spanLabel: "c. 100 BCE – 1910 CE",
    tagline: "The bridge between China and Japan — Silla gold, Goryeo celadon, and the alphabet with a known inventor.",
    overview: "Korea's peninsula position made it a cultural bridge: it received Chinese writing, Buddhism, and Confucianism and passed them to Japan, while developing its own tradition — the gold crowns of Silla, the celadon of Goryeo (East Asia's finest), and hangul, the native alphabet. Museums present it as three great dynasties: Silla, Goryeo, and Joseon.",
    quick: [
      "A peninsula bridge between China and Japan — borrowing, then making it its own.",
      "Three Kingdoms → unified Silla → Goryeo → Joseon.",
      "Goryeo celadon is considered the finest in East Asia.",
      "Hangul, the Korean alphabet, was invented in 1443 — rare for a script with a known creator."
    ],
    met: "Arts of Korea — galleries adjacent to Arts of Japan (223–232); Silla gold, Goryeo celadon, and Joseon porcelain.",
    context: {
      bigPicture: "Korea's art history is a dialogue with its powerful neighbors. It absorbed Chinese statecraft and Buddhism, then refined them: Silla's gold crowns, Goryeo's jade-green celadon, and Joseon's austere white porcelain are recognized peaks of East Asian art. King Sejong's invention of hangul in 1443 gave ordinary Koreans an easy script — one of the few alphabets with a documented design.",
      geography: "A mountainous peninsula, cold and dry in the north, milder in the south, ringed by seas — close enough to China and Japan for constant exchange, separate enough to stay independent. Its fine clays and advanced kilns produced East Asia's greatest celadon.",
      keyIdeas: [
        { t: "Three Kingdoms", d: "Goguryeo, Baekje, and Silla, later unified under Silla (668)." },
        { t: "Buddhism as patron", d: "Temples and gilt-bronze sculpture shaped Korean art." },
        { t: "Neo-Confucianism", d: "The Joseon state ideology of scholars, ritual, and restraint." },
        { t: "Hangul", d: "King Sejong's alphabet of 1443." }
      ],
      spotIt: [
        { t: "Celadon", d: "Jade-green glaze, often with inlaid (sanggam) decoration." },
        { t: "Gilt-bronze", d: "Small Buddhist figures and reliquaries." },
        { t: "White porcelain (baekja)", d: "The austere Joseon ideal." },
        { t: "Gold crowns", d: "Tree-shaped ornaments from Silla royal tombs." }
      ]
    },
    periods: [
      { name: "Three Kingdoms", years: "c. 100 BCE – 668 CE", start: -100, end: 668, summary: "Goguryeo, Baekje, Silla — and Silla's gold.", detail: "Three rival kingdoms divided the peninsula. Buddhism arrived in 372. Silla's royal tombs at Gyeongju yielded the stunning gold crowns and ornaments that are now national icons." },
      { name: "Unified Silla", years: "668–935 CE", start: 668, end: 935, summary: "One peninsula, Buddhist golden age.", detail: "Silla united the peninsula in 668 and enjoyed a Buddhist golden age centered on the capital, Gyeongju — with temples like Bulguksa and the cave shrine of Seokguram." },
      { name: "Goryeo", years: "918–1392 CE", start: 918, end: 1392, summary: "The name 'Korea' and the great celadon.", detail: "Goryeo (whence the name 'Korea') patronized Buddhism and produced the Tripitaka Koreana — 80,000 woodblocks of the Buddhist canon — and the jade-green celadon that is the dynasty's signature." },
      { name: "Joseon", years: "1392–1910 CE", start: 1392, end: 1910, summary: "The Confucian dynasty and hangul.", detail: "Joseon, the longest-lived Confucian dynasty of East Asia, elevated scholarship and ritual. King Sejong created hangul in 1443; white porcelain replaced celadon as the ideal. The dynasty ended with Japanese annexation in 1910." }
    ],
    events: [
      { year: -37, label: "Three Kingdoms", detail: "Goguryeo, Baekje, and Silla emerge." },
      { year: 372, label: "Buddhism arrives", detail: "In Goguryeo, from China." },
      { year: 668, label: "Silla unifies", detail: "One peninsula under Silla." },
      { year: 918, label: "Goryeo founded", detail: "The name 'Korea' is born." },
      { year: 1443, label: "Hangul", detail: "Sejong's alphabet." },
      { year: 1592, label: "Imjin War", detail: "Japanese invasions devastate the peninsula." },
      { year: 1910, label: "Annexation", detail: "Japan annexes Korea; the dynasty ends." }
    ],
    museum: {
      see: [
        "Goryeo celadon — maebyeong vases and inlaid pieces.",
        "Silla gold crowns, earrings, and belt ornaments.",
        "Gilt-bronze Buddhas and reliquaries.",
        "Joseon white porcelain (baekja).",
        "Buddhist hanging scrolls."
      ],
      lingo: [
        { t: "Sanggam", d: "Inlaid celadon decoration." },
        { t: "Maebyeong", d: "A celadon vase shape." },
        { t: "Baekja", d: "White porcelain." },
        { t: "Hangul", d: "The Korean alphabet." },
        { t: "Tripitaka Koreana", d: "The woodblock Buddhist canon." }
      ],
      where: [
        "The Met — Arts of Korea galleries.",
        "Asian Art Museum (SF) — one of the best Korean collections outside Korea.",
        "National Museum of Korea, Seoul."
      ]
    }
  },

  {
    slug: "khmer",
    name: "Khmer Empire (Angkor)",
    emoji: "🛕",
    accent: "#ca8a04",
    group: "Asia",
    region: "Cambodia and the Mekong basin, centered on Angkor",
    start: 802,
    end: 1431,
    spanLabel: "802 – 1431 CE",
    tagline: "Angkor — the largest pre-industrial city on Earth, and its serene temple-mountains.",
    overview: "The Khmer Empire ruled mainland Southeast Asia from its capital at Angkor, which grew into the largest pre-industrial city the world has known. God-kings raised vast sandstone temple-mountains — above all Angkor Wat — as microcosms of the Hindu cosmos. The Met holds superb Khmer sculpture, from pre-Angkor bronzes to the great sandstone deities.",
    quick: [
      "The Khmer Empire, centered on Angkor, ruled mainland Southeast Asia from 802 to 1431.",
      "Angkor Wat — the world's largest religious monument — began as a Hindu temple to Vishnu.",
      "Kings built temple-mountains as microcosms of the Hindu cosmos, honored as god-kings.",
      "Look for serene sandstone deities and the faint 'Khmer smile' of the Bayon faces."
    ],
    met: "Florence and Herbert Irving Galleries for South and Southeast Asian Art — Khmer sculpture, esp. Gallery 249.",
    context: {
      bigPicture: "The Khmer built a hydraulic empire — vast reservoirs (baray) and canals that supported one of the world's densest pre-industrial populations and its great temples. Its ideology fused the Hindu god-king (devaraja) with Buddhism over time. The empire declined in the 14th–15th centuries and Angkor was largely abandoned to the jungle, remembered through its temples and inscriptions.",
      geography: "The Tonle Sap lake and the monsoon-fed Mekong plain provided rice and fish; the lake's seasonal flood cycle was harnessed by reservoirs and canals. Sandstone for the temples came from the Kulen hills, floated downstream on rafts.",
      keyIdeas: [
        { t: "Devaraja", d: "The god-king cult — the king as Shiva or Vishnu incarnate." },
        { t: "Temple-mountain", d: "The state temple as Mount Meru, the cosmic center." },
        { t: "Hindu-to-Buddhist shift", d: "Angkor Wat (Vishnu) later became a Buddhist shrine." },
        { t: "Water as power", d: "The baray reservoirs as the basis of Angkor's wealth." }
      ],
      spotIt: [
        { t: "The Khmer smile", d: "Serene, faintly smiling faces (Bayon)." },
        { t: "Sandstone", d: "The classic medium; earlier work is often bronze." },
        { t: "Multi-armed deities", d: "Vishnu, Shiva, and their avatars." },
        { t: "Carved lintels", d: "Richly carved temple doorways and pediments." }
      ]
    },
    periods: [
      { name: "Pre-Angkor", years: "c. 500–802 CE", start: 500, end: 802, summary: "Funan and Chenla — the first Khmer states.", detail: "The earlier states of Funan and Chenla established the region's Hindu-Buddhist culture, early sculpture, and the kingship traditions the Angkor empire would build on." },
      { name: "Angkor rises", years: "802–1100 CE", start: 802, end: 1100, summary: "Jayavarman II and the temple-mountains.", detail: "Jayavarman II declared himself universal monarch in 802. His successors built the great temple-mountains and the baray reservoirs that made Angkor's wealth possible." },
      { name: "Angkor Wat & Bayon", years: "1100–1295 CE", start: 1100, end: 1295, summary: "The two great monuments.", detail: "Suryavarman II built Angkor Wat in the early 12th century. Jayavarman VII later built Angkor Thom and the Bayon, whose towers bear the famous serene faces, as Buddhism rose to prominence." },
      { name: "Decline", years: "1295–1431 CE", start: 1295, end: 1431, summary: "Thai pressure and the fall of Angkor.", detail: "The Thai kingdom of Ayutthaya grew powerful; Angkor was sacked in 1431 and the capital moved south, leaving the temples to the jungle — though they were never entirely forgotten." }
    ],
    events: [
      { year: 802, label: "Jayavarman II", detail: "The empire is founded." },
      { year: 1113, label: "Angkor Wat", detail: "Suryavarman II's temple-mountain." },
      { year: 1181, label: "Jayavarman VII", detail: "Angkor Thom and the Bayon." },
      { year: 1296, label: "Zhou Daguan", detail: "A Chinese envoy records Angkor's splendor." },
      { year: 1431, label: "Angkor sacked", detail: "The capital shifts south." }
    ],
    museum: {
      see: [
        "Sandstone deities — Vishnu, Shiva, Lokeshvara.",
        "Bayon-style heads and the 'Khmer smile.'",
        "Bronze Buddhas and bodhisattvas.",
        "Carved lintels and pediments from temple doorways."
      ],
      lingo: [
        { t: "Devaraja", d: "The god-king." },
        { t: "Baray", d: "A great reservoir." },
        { t: "Prasat", d: "A temple tower." },
        { t: "Apsara", d: "A celestial dancer." },
        { t: "Naga", d: "A multi-headed serpent." },
        { t: "Lokeshvara", d: "A compassionate bodhisattva." }
      ],
      where: [
        "The Met — Gallery 249 (Khmer) in the Irving Galleries.",
        "Asian Art Museum (SF) — major Khmer sculpture.",
        "National Museum of Cambodia, Phnom Penh."
      ]
    }
  },

  {
    slug: "benin",
    name: "Kingdom of Benin",
    emoji: "🎭",
    accent: "#9a3412",
    group: "Africa",
    region: "Southern Nigeria (Edo state), capital Benin City",
    start: 1180,
    end: 1897,
    spanLabel: "c. 1180 – 1897 CE",
    tagline: "The 'Benin bronzes' — brass plaques and ancestor heads from a great West African court.",
    overview: "The kingdom of Benin (the Edo people — not the modern country of Bénin) produced the famous 'Benin bronzes': brass plaques and memorial heads that once adorned the royal palace. In 1897 a British punitive expedition sacked Benin City, scattering the works to museums worldwide, including the Met. They remain at the center of today's repatriation debates.",
    quick: [
      "A powerful West African kingdom, capital Benin City, ruled by an oba (king).",
      "Famous for 'bronzes' — actually brass plaques and memorial heads from the royal palace.",
      "Court art commemorates the oba and his ancestors, with coral-bead regalia.",
      "Looted in 1897; their repatriation is a live debate."
    ],
    met: "Michael C. Rockefeller Wing (reopened 2025) — Arts of Africa galleries (the wing's northeast section).",
    context: {
      bigPicture: "Benin was a sophisticated city-state — Europeans visiting in the 15th–17th centuries compared its walls and streets to the great cities of Europe. Its artists cast brass by the lost-wax process at a level matched in few places on Earth. The 1897 sack by British forces ended the kingdom and dispersed its art, creating both the world's fascination with the bronzes and today's restitution movement.",
      geography: "The rainforest of southern Nigeria, crossed by trade routes to the coast. Benin grew rich controlling trade — first pepper and ivory, later enslaved people — with the Portuguese and then the British, exchanging goods for brass manillas (bracelet-ingots) that were melted down for casting.",
      keyIdeas: [
        { t: "The oba", d: "A divine king; his head was the seat of his power and destiny." },
        { t: "Ancestor veneration", d: "Memorial heads for deceased obas and queen mothers." },
        { t: "Lost-wax casting", d: "The technique behind the 'bronzes.'" },
        { t: "The 1897 sack", d: "The British punitive expedition that ended the kingdom." }
      ],
      spotIt: [
        { t: "Memorial heads", d: "Brass heads with coral-bead collars." },
        { t: "Rectangular plaques", d: "Palace wall plaques showing court scenes." },
        { t: "Coral regalia", d: "High beaded collars and crowns." },
        { t: "Ivory", d: "Carved tusks and the Queen Mother pendant masks." }
      ]
    },
    periods: [
      { name: "Founding", years: "c. 1180–1400 CE", start: 1180, end: 1400, summary: "The Edo dynasty is founded.", detail: "Tradition says the Edo dynasty was founded by Oranmiyan of Ife around 1180, succeeding the earlier ogiso kings. Brass-casting came to Benin from Ife, the neighboring Yoruba city famed for its naturalistic metalwork." },
      { name: "Imperial age", years: "1400–1600 CE", start: 1400, end: 1600, summary: "The golden age of the plaques and heads.", detail: "Benin's golden age: the oba's palace was hung with rectangular brass plaques recording court life, and memorial heads honored royal ancestors. Portuguese traders arrived in 1485, bringing brass and buying pepper and ivory." },
      { name: "Later centuries", years: "1600–1897 CE", start: 1600, end: 1897, summary: "Continuing court art and growing British pressure.", detail: "Benin's court art continued — including the great ivory tusks carved for the altars — as trade shifted to the slave trade and, after its abolition, to palm oil. British pressure on the kingdom mounted through the 19th century." },
      { name: "The 1897 sack", years: "1897 CE", start: 1897, end: 1897, summary: "The punitive expedition and dispersal.", detail: "In 1897, a British punitive expedition captured and burned Benin City, exiling the oba and seizing thousands of objects — the plaques, heads, and ivories — that were sold to museums and collectors across Europe and America." }
    ],
    events: [
      { year: 1180, label: "Dynasty founded", detail: "Oranmiyan's line takes power." },
      { year: 1485, label: "Portuguese arrive", detail: "Trade and the first European accounts." },
      { year: 1500, label: "Plaque golden age", detail: "The palace walls are cast with scenes." },
      { year: 1897, label: "The sack", detail: "The British punitive expedition." }
    ],
    museum: {
      see: [
        "Brass memorial heads with coral-bead collars.",
        "Rectangular palace plaques with court scenes.",
        "Carved ivory tusks and pendant masks.",
        "Coral-bead regalia and ceremonial swords."
      ],
      lingo: [
        { t: "Oba", d: "The king." },
        { t: "Edo", d: "The people of Benin." },
        { t: "Lost-wax casting", d: "Casting via a wax model." },
        { t: "Manilla", d: "A bracelet-shaped currency ingot." },
        { t: "Iyoba", d: "The queen mother." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa galleries.",
        "British Museum — the largest collection of Benin works.",
        "National Museum, Lagos, and the planned Edo Museum of West African Art, Benin City."
      ]
    }
  },

  {
    slug: "mali",
    name: "Empire of Mali",
    emoji: "🐪",
    accent: "#eab308",
    group: "Africa",
    region: "West Africa — the upper Niger, modern Mali",
    start: 1235,
    end: 1600,
    spanLabel: "c. 1235 – 1600 CE",
    tagline: "Gold, the trans-Saharan trade, and Mansa Musa — the emperor whose pilgrimage crashed the price of gold in Cairo.",
    overview: "Mali was the great medieval empire of West Africa, built on gold and the trans-Saharan trade. Mansa Musa's pilgrimage to Mecca in 1324 — with a caravan said to carry so much gold it devalued the metal in Cairo — made Mali a byword for wealth across the Mediterranean. Timbuktu became a center of Islamic scholarship whose manuscripts survive to this day.",
    quick: [
      "A medieval West African empire on the upper Niger, rich in gold.",
      "Mansa Musa's 1324 pilgrimage is legend — so much gold it crashed prices in Cairo.",
      "Timbuktu and Djenné were centers of Islamic learning and manuscript culture.",
      "Its wealth came from taxing trans-Saharan trade: gold out, salt in."
    ],
    met: "Michael C. Rockefeller Wing (reopened 2025) — Arts of Africa; look for Sahelian gold, terracotta, and Islamic-influenced works.",
    context: {
      bigPicture: "Mali succeeded the empire of Ghana and ruled the western Sahel for three centuries. Its control of the Bambuk and Bure goldfields, and of the camel caravans crossing the Sahara, funded a state famous for justice, pilgrimage, and learning. After its decline came the Songhai empire, and later the great Sahelian cities of Timbuktu and Djenné.",
      geography: "The Sahel — the semi-arid band between the Sahara and the savanna — and the inland delta of the Niger river. Gold came from the south, salt from the Sahara; Mali sat in the middle, taxing the exchange and growing fabulously rich.",
      keyIdeas: [
        { t: "Mansa Musa", d: "The emperor whose pilgrimage announced Mali's wealth to the world." },
        { t: "Trans-Saharan trade", d: "Gold, salt, and enslaved people across the desert." },
        { t: "Islamic learning", d: "Timbuktu's mosques, madrasas, and manuscript libraries." },
        { t: "Griots", d: "Oral historians who preserved epics like that of Sundiata." }
      ],
      spotIt: [
        { t: "Terracotta", d: "Djenné-style figures and vessels." },
        { t: "Gold", d: "Jewelry and ornaments of the Sahel." },
        { t: "Mud architecture", d: "The great earthen mosques of Djenné and Timbuktu." },
        { t: "Manuscripts", d: "The illuminated Arabic texts of Timbuktu." }
      ]
    },
    periods: [
      { name: "Predecessors", years: "c. 300–1235 CE", start: 300, end: 1235, summary: "The empire of Ghana and the rise of Sundiata.", detail: "Before Mali, the empire of Ghana dominated the western Sahel's gold trade. When it faded, Sundiata Keita of the Malinke rose against the sorcerer-king Soumaoro — the story at the heart of the epic of Sundiata, still sung by griots." },
      { name: "Sundiata & founding", years: "1235–1300 CE", start: 1235, end: 1300, summary: "The empire is founded at Kirina.", detail: "Sundiata defeated Soumaoro at the battle of Kirina (c. 1235) and founded the empire of Mali, uniting the Mandinka and securing the goldfields." },
      { name: "Mansa Musa & golden age", years: "1300–1400 CE", start: 1300, end: 1400, summary: "The pilgrimage and Timbuktu's rise.", detail: "Mansa Musa (r. c. 1312–1337) made his famous pilgrimage in 1324, distributing so much gold in Cairo that its value was depressed for years. He brought back scholars and architects, and under his rule Timbuktu became a center of learning with the Sankore mosque-university." },
      { name: "Decline", years: "1400–1600 CE", start: 1400, end: 1600, summary: "Songhai rises; Mali fragments.", detail: "The Songhai empire eclipsed Mali and took Timbuktu in 1468. Mali fragmented through the 16th century, its power absorbed by the region's shifting states — though its legacy of gold, Islam, and learning endured." }
    ],
    events: [
      { year: 1235, label: "Sundiata", detail: "The empire is founded at Kirina." },
      { year: 1324, label: "Mansa Musa's hajj", detail: "Gold floods Cairo." },
      { year: 1468, label: "Songhai takes Timbuktu", detail: "The balance of power shifts." },
      { year: 1600, label: "Fragmentation", detail: "The empire dissolves." }
    ],
    museum: {
      see: [
        "Terracotta figures and vessels from the Inland Niger Delta (Djenné).",
        "Gold ornaments and jewelry.",
        "Sahelian textiles and leatherwork.",
        "Islamic manuscripts and objects from Timbuktu's tradition."
      ],
      lingo: [
        { t: "Mansa", d: "Emperor (literally 'king of kings')." },
        { t: "Griot", d: "Oral historian and praise-singer." },
        { t: "Trans-Saharan", d: "Across the Sahara by camel caravan." },
        { t: "Sahel", d: "The semi-arid band south of the Sahara." },
        { t: "Djenné", d: "A great Sahelian trading city." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa galleries.",
        "Musée National du Mali, Bamako.",
        "British Museum — Sahelian terracotta and gold."
      ]
    }
  },

  {
    slug: "moche",
    name: "The Moche",
    emoji: "🏺",
    accent: "#c026d3",
    group: "The Americas",
    region: "Peru's north coast",
    start: 100,
    end: 800,
    spanLabel: "c. 100 – 800 CE",
    tagline: "The portrait-vessel people — naturalistic ceramics, the Lord of Sipán, and ritual sacrifice in coastal Peru.",
    overview: "The Moche built a series of rich valleys on Peru's north coast, centuries before the Inca. They had no writing, but their pottery is a picture-encyclopedia: individualized portrait vessels, scenes of war, sacrifice, and daily life. Their royal tombs — above all the Lord of Sipán (found 1987) — yielded spectacular gold, silver, and turquoise.",
    quick: [
      "A pre-Inca civilization of Peru's north coast (c. 100–800 CE).",
      "Famous for stirrup-spout portrait vessels — naturalistic, individualized faces.",
      "Art depicts ritual combat, sacrifice, and the fanged 'Decapitator' god.",
      "The Lord of Sipán's tombs yielded spectacular gold, silver, and turquoise."
    ],
    met: "Michael C. Rockefeller Wing (reopened 2025) — Ancient Americas galleries (Andean ceramics and metalwork).",
    context: {
      bigPicture: "The Moche turned desert valleys into farmland with vast irrigation canals, and their elites were buried with astonishing metalwork. Their art is unusually direct — real faces, explicit scenes of ritual combat and sacrifice — giving us an unmatched window into Andean life before the Inca. The culture faded around 800 CE, possibly from El Niño floods and drought, leaving successors like the Chimú.",
      geography: "The narrow, hyper-arid coastal strip of northern Peru, watered by rivers descending from the Andes. Almost no rain falls; irrigation made life possible. The Pacific supplied fish and guano fertilizer, and the mountains supplied metal ores — a coastal civilization tethered to Andean rivers.",
      keyIdeas: [
        { t: "Stirrup-spout vessels", d: "The Moche's signature ceramic form." },
        { t: "Ritual combat & sacrifice", d: "Warriors, captives, and the Decapitator." },
        { t: "Elite burials", d: "The Lord of Sipán's unlooted tombs (found 1987)." },
        { t: "Irrigation", d: "Canal networks turning desert into farmland." }
      ],
      spotIt: [
        { t: "Portrait vessels", d: "Individual faces, often with painted details." },
        { t: "The Decapitator", d: "A fanged deity holding a tumi knife and severed head." },
        { t: "Stirrup spouts", d: "The handle-and-spout shape of the vessels." },
        { t: "Gold and turquoise", d: "Sipán-style ear ornaments and headdresses." }
      ]
    },
    periods: [
      { name: "Early Moche", years: "c. 100–300 CE", start: 100, end: 300, summary: "Pottery, irrigation, and the first huacas.", detail: "The Moche emerged from earlier coastal cultures, developing their pottery traditions and the irrigation canals that would sustain dense populations, and raising the first monumental huacas (adobe platform mounds)." },
      { name: "Moche peak", years: "300–600 CE", start: 300, end: 600, summary: "The great centers and Sipán.", detail: "The Moche reached their height: the great adobe complexes of Huaca del Sol y de la Luna, and the royal tombs at Sipán — found intact in 1987 — whose gold, silver, and turquoise regalia transformed our picture of Moche elites. The finest portrait vessels date to this era." },
      { name: "Late Moche & decline", years: "600–800 CE", start: 600, end: 800, summary: "Fragmentation and climate stress.", detail: "The Moche fragmented into competing valley polities; successive El Niño events and drought stressed the irrigation systems. By 800 CE the culture had faded, with the Chimú and others inheriting its traditions." }
    ],
    events: [
      { year: 100, label: "Moche emerges", detail: "Irrigation and pottery." },
      { year: 300, label: "Huaca del Sol", detail: "The largest adobe structure in the Americas." },
      { year: 450, label: "Lord of Sipán", detail: "The great unlooted royal tomb." },
      { year: 800, label: "Decline", detail: "Climate stress; successors rise." }
    ],
    museum: {
      see: [
        "Stirrup-spout portrait vessels.",
        "Effigy vessels of animals, warriors, and deities.",
        "Gold, silver, and copper ornaments with turquoise inlay.",
        "Painted murals (in situ) and textile fragments."
      ],
      lingo: [
        { t: "Huaca", d: "A sacred mound or platform." },
        { t: "Stirrup spout", d: "The handle-and-spout vessel form." },
        { t: "Decapitator", d: "The fanged sacrifice deity." },
        { t: "Sipán", d: "The royal tomb site." },
        { t: "Tumi", d: "A ceremonial knife." },
        { t: "Adobe", d: "Sun-dried mud brick." }
      ],
      where: [
        "The Met — Rockefeller Wing, Ancient Americas galleries.",
        "Museo Larco, Lima — the great Moche ceramic collection.",
        "Museo Tumbas Reales de Sipán, Lambayeque."
      ]
    }
  },

  {
    slug: "gupta",
    name: "Gupta India",
    emoji: "🕉️",
    accent: "#4338ca",
    group: "Asia",
    region: "The Ganges plain, northern India",
    start: 320,
    end: 550,
    spanLabel: "c. 320 – 550 CE",
    tagline: "India's golden age — serene sculpture, Sanskrit poetry, and the invention of zero.",
    overview: "The Gupta empire is remembered as India's 'golden age' — a time of Sanskrit literature (Kalidasa), mathematics (decimal place value and the concept of zero), and a serene, idealized sculpture of Buddhas and Hindu deities that became the model for Indian and Southeast Asian art for a millennium. The Met's South Asian galleries hold superb Gupta-period sculpture.",
    quick: [
      "North India's 'golden age' (c. 320–550 CE).",
      "A classical ideal: serene, softly modeled stone Buddhas and Hindu deities.",
      "Mathematics flourished — decimal place value and the concept of zero.",
      "Sanskrit literature peaked with Kalidasa; the great epics were compiled."
    ],
    met: "Florence and Herbert Irving Galleries for South and Southeast Asian Art — Gupta-period sculpture.",
    context: {
      bigPicture: "After the Mauryan empire, the Guptas reunified much of north India and presided over a cultural golden age. Their court patronized Sanskrit literature and the sciences; their sculptors perfected the 'Gupta ideal' — smooth, calm, meditative figures of elegant proportion — that set the template for Indian sacred art for a thousand years, and spread with Buddhism to China and Southeast Asia.",
      geography: "The fertile Ganges plain, the heartland of Indian empires; trade and pilgrimage routes linked it to the Deccan and the Silk Road. Buddhism, Hinduism, and Jainism coexisted under tolerant rulers, all patronizing the same great sculptural workshops.",
      keyIdeas: [
        { t: "Golden age", d: "Literature, math, and art flourish under Gupta patronage." },
        { t: "The Gupta ideal", d: "Serene, idealized sacred sculpture." },
        { t: "Zero & decimals", d: "Indian mathematics, later transmitted to the Islamic world and Europe." },
        { t: "Classical Sanskrit", d: "The language of Kalidasa and the epics." }
      ],
      spotIt: [
        { t: "Standing Buddhas", d: "The 'wet drapery' robe, halo, and half-closed eyes." },
        { t: "Smooth torso modeling", d: "Columnar, softly breathing figures." },
        { t: "Hindu deities", d: "Early iconic forms of Vishnu and Shiva." },
        { t: "Mathura & Sarnath schools", d: "Two great sculptural centers." }
      ]
    },
    periods: [
      { name: "Rise", years: "c. 320–380 CE", start: 320, end: 380, summary: "Chandragupta I and Samudragupta.", detail: "Chandragupta I founded the dynasty around 320; his son Samudragupta expanded it across the Ganges plain, celebrating his conquests on a great inscribed pillar at Allahabad." },
      { name: "Peak", years: "380–455 CE", start: 380, end: 455, summary: "Chandragupta II and the golden age.", detail: "Under Chandragupta II 'Vikramaditya,' the empire reached its height. The poet Kalidasa wrote his dramas and the visiting Chinese monk Faxian described a prosperous, tolerant realm. The Gupta sculptural ideal matured at Mathura and Sarnath." },
      { name: "Later Guptas & decline", years: "455–550 CE", start: 455, end: 550, summary: "Huna invasions and fragmentation.", detail: "Invasions by the Huna (Hephthalites) from Central Asia weakened the empire, and by 550 CE it had fragmented into regional kingdoms — but the Gupta artistic and mathematical legacy spread across Asia." }
    ],
    events: [
      { year: 320, label: "Founding", detail: "Chandragupta I." },
      { year: 380, label: "Chandragupta II", detail: "The golden age begins." },
      { year: 405, label: "Kalidasa", detail: "Sanskrit drama at its peak." },
      { year: 499, label: "Aryabhata", detail: "Astronomy and mathematics; the decimal system." },
      { year: 550, label: "Decline", detail: "The Hunas and fragmentation." }
    ],
    museum: {
      see: [
        "Red sandstone Buddhas (Mathura) and buff sandstone (Sarnath).",
        "Hindu deities — Vishnu, Shiva, and goddesses.",
        "Terracotta plaques and figurines.",
        "Gold coins of the Gupta kings."
      ],
      lingo: [
        { t: "Mudra", d: "A symbolic hand gesture." },
        { t: "Ushnisha", d: "The cranial bump of the Buddha." },
        { t: "Stela", d: "A carved stone slab." },
        { t: "Mathura / Sarnath", d: "The two great sculptural schools." },
        { t: "Dharma", d: "Cosmic order and duty." }
      ],
      where: [
        "The Met — Irving Galleries for South and Southeast Asian Art.",
        "Asian Art Museum (SF) — South Asian galleries.",
        "National Museum, New Delhi, and the Sarnath Museum."
      ]
    }
  },

  {
    slug: "medieval-europe",
    name: "Medieval Europe",
    emoji: "🏰",
    accent: "#334155",
    group: "Medieval world",
    region: "Western and Central Europe",
    start: 476,
    end: 1500,
    spanLabel: "c. 476 – 1500 CE",
    tagline: "Cathedrals, reliquaries, illuminated manuscripts, and the Unicorn Tapestries — the Met's medieval world.",
    overview: "The thousand years between Rome's fall and the Renaissance — cathedrals, illuminated manuscripts, reliquaries, armor, and tapestries like the Unicorn series. The Met shows it in the Medieval galleries (300s) at Fifth Avenue and in The Cloisters, a purpose-built medieval monastery museum in Fort Tryon Park.",
    quick: [
      "The 'Middle Ages' — roughly 500–1500 CE in Western Europe.",
      "Art served the Church: cathedrals, manuscripts, reliquaries, and altarpieces.",
      "Romanesque (solid, rounded) → Gothic (soaring, pointed) architecture.",
      "The Met shows it in the Medieval galleries and at The Cloisters in Fort Tryon Park."
    ],
    met: "Medieval Art — Galleries 300–305 at The Met Fifth Avenue, plus The Met Cloisters in Fort Tryon Park (12th–15th c.).",
    context: {
      bigPicture: "After Rome's western half collapsed, the Church became the great patron of art and learning, and monasteries preserved classical texts. Europe slowly rebuilt — feudalism, the rise of towns and universities, the Crusades, and the soaring Gothic cathedrals — before the Renaissance 'rediscovered' antiquity. Medieval art is overwhelmingly religious and symbolic, made for devotion rather than realism.",
      geography: "A patchwork of kingdoms and fiefs linked by pilgrimage roads and trade routes; the Church was the one Europe-wide institution. Stone for cathedrals, vellum for manuscripts, and gold for reliquaries traveled across the continent — and pilgrimage to saints' shrines moved both people and styles.",
      keyIdeas: [
        { t: "The Church as patron", d: "Most art was made for worship, to teach and inspire." },
        { t: "Symbolism over realism", d: "Flat, hierarchical, gold-ground images of the sacred." },
        { t: "Monasticism", d: "Monasteries as centers of copying, learning, and craft." },
        { t: "Pilgrimage", d: "Relics and saints' shrines shaped art and travel." }
      ],
      spotIt: [
        { t: "Gold-ground painting", d: "The sacred light of medieval panels." },
        { t: "Illuminated manuscripts", d: "Hand-painted initials and miniatures." },
        { t: "Reliquaries", d: "Jeweled containers for saints' relics." },
        { t: "Tapestries", d: "Woven narrative hangings (the Unicorn Tapestries)." }
      ]
    },
    periods: [
      { name: "Early Middle Ages", years: "476–1000 CE", start: 476, end: 1000, summary: "Migration, Charlemagne, and the monasteries.", detail: "After Rome's fall, the 'barbarian' kingdoms inherited its ruins. Charlemagne's court (crowned 800) sparked the Carolingian renaissance of learning and manuscript art; monasteries became the great scriptoria copying and illuminating books." },
      { name: "Romanesque", years: "1000–1200 CE", start: 1000, end: 1200, summary: "Massive stone and the pilgrim roads.", detail: "The Romanesque age raised the first great stone churches of the Middle Ages, with sculpted portals and reliquary treasures to serve the booming pilgrimage routes to Rome, Santiago, and Jerusalem." },
      { name: "Gothic", years: "1200–1500 CE", start: 1200, end: 1500, summary: "Soaring cathedrals and courtly splendor.", detail: "Gothic builders opened walls to stained glass and light — Chartres, the Sainte-Chapelle. Manuscript illumination, ivory carving, and the 'International Gothic' court style reached their peak, and the great tapestry cycles (like the Unicorn) were woven for the nobility." }
    ],
    events: [
      { year: 476, label: "West falls", detail: "The Middle Ages begin." },
      { year: 800, label: "Charlemagne crowned", detail: "The Carolingian renaissance." },
      { year: 1066, label: "Norman conquest", detail: "England is tied to the continent." },
      { year: 1144, label: "Saint-Denis", detail: "The first Gothic cathedral." },
      { year: 1200, label: "Gothic peaks", detail: "Chartres; the universities rise." },
      { year: 1450, label: "Printing", detail: "Gutenberg; the age begins to close." }
    ],
    museum: {
      see: [
        "Reliquaries and liturgical goldsmith work.",
        "Illuminated manuscripts and single leaves.",
        "Stained glass and carved ivories.",
        "Altarpieces and devotional panel painting.",
        "The Unicorn Tapestries (The Cloisters)."
      ],
      lingo: [
        { t: "Reliquary", d: "A container for a saint's relic." },
        { t: "Illuminated manuscript", d: "A hand-painted book." },
        { t: "Romanesque / Gothic", d: "The two great medieval styles." },
        { t: "Tympanum", d: "The carved arch over a portal." },
        { t: "Altarpiece", d: "A painted or carved screen behind the altar." },
        { t: "Triptych", d: "A three-panel work." }
      ],
      where: [
        "The Met Fifth Avenue — Medieval Art galleries (300–305) and the Treasury.",
        "The Met Cloisters — Fort Tryon Park (medieval monastery setting).",
        "The Morgan Library & Museum — nearby manuscript riches."
      ]
    }
  },

  {
    slug: "yoruba",
    name: "Yoruba & Ife",
    emoji: "🥁",
    accent: "#a16207",
    group: "Africa",
    region: "Southwestern Nigeria — the sacred city of Ife",
    start: 800,
    end: 1900,
    spanLabel: "c. 800 – 1900 CE",
    tagline: "One of Africa's great cultures — the naturalistic heads of Ife, the orishas, and a living art that crossed the Atlantic.",
    overview: "The Yoruba are among Africa's largest cultures, centered on southwestern Nigeria. Their sacred origin city, Ife, produced brass and terracotta heads (12th–15th century) of astonishing naturalism — among the most celebrated sculptures in Africa. Yoruba art honors a pantheon of orishas (Shango, Ogun, Oshun) and the oba kings with beaded crowns, and it traveled with the diaspora into Santería and Candomblé.",
    quick: [
      "The Yoruba are one of Africa's largest cultures, centered on southwestern Nigeria.",
      "Ife, their sacred origin city, made naturalistic brass heads in the 12th–15th centuries.",
      "Hundreds of orishas (deities) shape the art — Shango staffs, beaded crowns, masks.",
      "Benin's brass tradition came from Ife; Yoruba art lives on in egungun and gelede masquerades."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: Ife heads, Yoruba beaded crowns, Shango staffs, and masks.",
    context: {
      bigPicture: "Yoruba civilization is city-based and ancient — Ile-Ife, Oyo, Ibadan — and its religion, with hundreds of orishas and Ifá divination, spread through the Atlantic slave trade into the Americas. Ife heads, excavated in 1938, are portrait-like and technically superb; the Yoruba taught Benin to cast brass. The Oyo empire (c. 1600–1836) was a cavalry power; its collapse opened the 19th-century wars that fed the transatlantic trade.",
      geography: "Forest and savanna of southwestern Nigeria, crossed by old trade routes to the coast. Brass-casting, terracotta, and beadwork flourished in the urban centers; the region's gold and kola, and later captives, drew trade from the north and the coast.",
      keyIdeas: [
        { t: "Ife as origin", d: "In Yoruba myth, the world began at Ife, where Oduduwa descended." },
        { t: "The orishas", d: "Shango (thunder), Ogun (iron), Oshun (rivers), and hundreds more." },
        { t: "Ifá", d: "The divination system, using palm nuts and the wisdom of Orunmila." },
        { t: "Oba & the beaded crown", d: "Kings wear veiled beaded crowns (adenla) that mark divine authority." }
      ],
      spotIt: [
        { t: "Ife heads", d: "Naturalistic faces with scarification lines, in brass or terracotta." },
        { t: "Beaded crowns (adenla)", d: "Conical crowns with a fringe of beads hiding the oba's face." },
        { t: "Oshe Shango", d: "A dance staff topped with the double thunder-axe." },
        { t: "Ibeji", d: "Carved twin figures, honored because twins are sacred." }
      ]
    },
    periods: [
      { name: "Ife rises", years: "c. 800–1200 CE", start: 800, end: 1200, summary: "The sacred city and its early art.", detail: "Ife grew into a great urban and religious center — the Yoruba 'city of the gods.' Early terracotta and stone sculpture, and the development of glass beadmaking, mark this period." },
      { name: "Ife classic", years: "1200–1500 CE", start: 1200, end: 1500, summary: "The great naturalistic heads.", detail: "The classic period produced the famous brass and copper-alloy heads and figures, excavated at the Wunmonije compound in 1938, dated to the 12th–15th centuries. Yoruba tradition holds that Ife sent its bronze-casters to teach Benin." },
      { name: "Oyo empire", years: "1600–1836 CE", start: 1600, end: 1836, summary: "A cavalry empire and the cult of Shango.", detail: "The Oyo empire grew into the dominant power of the region, with a famed cavalry and a complex council of chiefs. Shango, the deified thunder-king, became its emblem; his oshe staffs are carved to this day. Oyo collapsed in the 1830s, fueling a century of upheaval." },
      { name: "Tradition & diaspora", years: "1836–1900 CE", start: 1836, end: 1900, summary: "Colonial era, yet the art endures.", detail: "Through the wars and British colonial rule, Yoruba religion and art survived — and had already crossed the Atlantic, becoming the foundation of Santería, Candomblé, and Vodou's orisha traditions. Egungun, gelede, and Ifá remain living practices." }
    ],
    events: [
      { year: 800, label: "Ife rises", detail: "The sacred city is founded (Oduduwa, in tradition)." },
      { year: 1200, label: "Classic heads", detail: "The naturalistic Ife heads are cast." },
      { year: 1600, label: "Oyo empire", detail: "A cavalry empire rises." },
      { year: 1836, label: "Oyo falls", detail: "Civil war and Fulani pressure." },
      { year: 1900, label: "Colonial era", detail: "The tradition endures." }
    ],
    museum: {
      see: [
        "Ife brass and terracotta heads.",
        "Beaded crowns and royal regalia.",
        "Oshe Shango dance staffs.",
        "Ibeji twin figures.",
        "Egungun masquerade costumes and gelede masks.",
        "Ifá divination trays and tappers."
      ],
      lingo: [
        { t: "Orisha", d: "A deity of the Yoruba pantheon." },
        { t: "Oba", d: "A king." },
        { t: "Adenla", d: "The beaded crown with a veil." },
        { t: "Oshe Shango", d: "The double-axe dance staff." },
        { t: "Ibeji", d: "Twin figures." },
        { t: "Ifá", d: "The divination system." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa.",
        "de Young — Arts of Africa galleries.",
        "British Museum — the famous Ife head.",
        "National Museum, Lagos, and the National Museum of Ife."
      ]
    }
  },

  {
    slug: "ewe",
    name: "The Ewe",
    emoji: "🧵",
    accent: "#db2777",
    group: "Africa",
    region: "Southeastern Ghana, southern Togo, and southwestern Benin (the Volta region)",
    start: 1400,
    end: 1900,
    spanLabel: "c. 1400 – 1900 CE",
    tagline: "Master weavers of the Volta region — cloths that speak in proverbs, and the rhythms of Agbadza.",
    overview: "The Ewe are a Gbe-speaking people of the Volta region, spread across modern Ghana, Togo, and Benin. Unlike their imperial neighbors (Asante to the west, Dahomey to the east), the Ewe lived in clan-based communities — and became East Africa's most celebrated weavers, encoding proverbs, history, and humor into the patterns of their cloth. Their music and the Mawu-Lisa creator god shape a rich ceremonial life.",
    quick: [
      "A Gbe-speaking people of the Volta region (Ghana, Togo, Benin).",
      "Legend traces them to a flight from Notsie, in present-day Togo.",
      "Master weavers — Ewe cloth carries proverbs and history in its patterns.",
      "Known for Agbadza drumming and the Mawu-Lisa creator god."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: Ewe woven cloths and figures.",
    context: {
      bigPicture: "The Ewe trace their origin to Notsie, from which — legend says — they escaped a tyrant king by walking backward through a breach in the wall. Settling the Volta region in clans, they built no single empire but a shared language, religion, and loom. Ewe weaving stands apart for its 'pictorial' cloths: looms weave drums, combs, people, and proverbs into the fabric. Agbadza, the great communal dance, keeps the rhythm of Ewe life.",
      geography: "The Volta region — coast, lagoons, and the Volta river — between the Asante forest and the Dahomean coast. Salt, fish, and weaving supported the clans; the position between two empires kept Ewe communities wary and decentralized.",
      keyIdeas: [
        { t: "Notsie", d: "The walled city of origin, from which the clans dispersed." },
        { t: "Mawu-Lisa", d: "The dual creator god — Mawu the moon, Lisa the sun." },
        { t: "Weaving as speech", d: "Ewe cloths 'speak' in proverbs and pictures." },
        { t: "Agbadza", d: "The communal music and dance of the Ewe." }
      ],
      spotIt: [
        { t: "Figurative cloth", d: "Woven motifs of drums, stools, combs, and people." },
        { t: "Twin figures", d: "Small carved figures (venavi) for twins." },
        { t: "Drums", d: "The talking-drum ensembles of Agbadza." },
        { t: "Wooden figures", d: "Shrine and ancestor figures in the Ewe style." }
      ]
    },
    periods: [
      { name: "Origins & Notsie", years: "c. 1400–1600 CE", start: 1400, end: 1600, summary: "The walled city and the great escape.", detail: "Tradition holds that the Ewe lived at Notsie under the harsh king Agokoli, until they escaped by filing backward through a breach in the city wall — a story central to Ewe identity, recalled in their weaving and song." },
      { name: "Settlement & weaving", years: "1600–1800 CE", start: 1600, end: 1800, summary: "Clans spread; the loom becomes the Ewe signature.", detail: "The Ewe clans dispersed across the Volta region, fishing, farming, and trading salt. Their looms grew sophisticated, producing the figurative cloths for which they are known — worn at ceremonies and read like books by those who know the motifs." },
      { name: "Colonial era", years: "1800–1900 CE", start: 1800, end: 1900, summary: "Partition, yet the traditions persist.", detail: "German, British, and French rule partitioned the Ewe homeland (Togoland was split after 1918), but weaving, Agbadza, and the Mawu-Lisa tradition carried on, and remain living practices today." }
    ],
    events: [
      { year: 1400, label: "Notsie", detail: "The origin city, in tradition." },
      { year: 1600, label: "The escape", detail: "The clans disperse from Notsie." },
      { year: 1700, label: "Weaving tradition", detail: "Figurative Ewe cloth matures." },
      { year: 1884, label: "Togoland", detail: "German rule begins." },
      { year: 1900, label: "Colonial era", detail: "The traditions persist." }
    ],
    museum: {
      see: [
        "Ewe woven cloths with figurative motifs.",
        "Wooden figures and twin figures (venavi).",
        "Drums and percussion from Agbadza ensembles.",
        "Stools and shrine objects."
      ],
      lingo: [
        { t: "Mawu-Lisa", d: "The dual creator god." },
        { t: "Vodun", d: "The spirit tradition shared with the Fon." },
        { t: "Agbadza", d: "The great communal dance." },
        { t: "Venavi", d: "Twin figures." },
        { t: "Notsie", d: "The walled origin city." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa (textiles).",
        "de Young — African textiles and sculpture.",
        "British Museum and the Musée du quai Branly."
      ]
    }
  },

  {
    slug: "asante",
    name: "Asante (Akan)",
    emoji: "⚖️",
    accent: "#f59e0b",
    group: "Africa",
    region: "Southern Ghana — capital Kumasi",
    start: 1701,
    end: 1900,
    spanLabel: "c. 1701 – 1900 CE",
    tagline: "The gold kingdom of Ghana — the Golden Stool, cast brass weights, and the kente loom.",
    overview: "The Asante (Ashanti) built the most powerful Akan kingdom, founded in 1701 around the sacred Golden Stool that, in legend, descended from the sky. Gold was the state's engine: cast brass weights for weighing gold dust, gold-leafed regalia, and the famous kente cloth. The Asante fought the British in a series of wars, and under Yaa Asantewaa in 1900 went to war over the Golden Stool itself.",
    quick: [
      "A powerful Akan kingdom founded 1701, capital Kumasi.",
      "Built on gold — cast brass gold-weights (abrammuo) are collector icons.",
      "The Golden Stool, said to have descended from the sky, embodies the nation's soul.",
      "Famous for kente cloth, adinkra symbols, and the talking drum."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: Asante gold, gold-weights, and kente.",
    context: {
      bigPicture: "The Asante rose under Osei Tutu and the priest Okomfo Anokye, who — legend says — called the Golden Stool from the heavens to unite the Akan states. Gold from the forest funded an empire that dominated the coast's trade; European guns were bought with captives and gold. The British burned Kumasi in 1874 and annexed the kingdom in 1902, but the Asante remain a proud nation within Ghana today.",
      geography: "The gold-bearing forest of southern Ghana, with Kumasi at its heart. Trade routes ran to the coast's European forts; gold dust, kola, and later captives moved out, guns and cloth moved in.",
      keyIdeas: [
        { t: "The Golden Stool", d: "Sika Dwa — the soul of the Asante nation, never to be sat upon." },
        { t: "Gold as power", d: "Wealth was weighed in gold dust, cast into weights and regalia." },
        { t: "Osei Tutu", d: "The founder, united the Akan under one stool." },
        { t: "Kente & adinkra", d: "Royal cloth and stamped proverb symbols." }
      ],
      spotIt: [
        { t: "Gold-weights", d: "Cast brass weights (abrammuo) in countless witty forms." },
        { t: "Gold regalia", d: "Gold-leafed staffs, swords, and headgear." },
        { t: "Akua'ba", d: "Flat wooden fertility figures." },
        { t: "Kente", d: "Strip-woven royal cloth in brilliant geometrics." }
      ]
    },
    periods: [
      { name: "Founding", years: "1701–1750 CE", start: 1701, end: 1750, summary: "Osei Tutu and the Golden Stool.", detail: "In 1701 the Akan states united under Osei Tutu and Okomfo Anokye at Kumasi. Tradition says the Golden Stool descended from the sky to embody the new nation — the stool belongs to the people, and even the king may never sit on it." },
      { name: "Imperial Asante", years: "1750–1874 CE", start: 1750, end: 1874, summary: "Gold, trade, and war with Britain.", detail: "Asante power peaked: Kumasi grew magnificent, the gold trade boomed, and the empire expanded to the coast. Wars with the British (1824, 1863) ended in 1874, when a British expedition burned Kumasi and carried off regalia." },
      { name: "Resistance & colony", years: "1874–1900 CE", start: 1874, end: 1900, summary: "Yaa Asantewaa and the War of the Golden Stool.", detail: "When the British demanded the Golden Stool, the queen mother Yaa Asantewaa led the 1900 uprising — the War of the Golden Stool. It failed, and Asante was annexed in 1902, but the stool itself was hidden and survives." }
    ],
    events: [
      { year: 1701, label: "Founding", detail: "Osei Tutu unites the Akan." },
      { year: 1824, label: "First Anglo-Asante war", detail: "The British are defeated." },
      { year: 1874, label: "Kumasi burned", detail: "A British expedition sacks the capital." },
      { year: 1900, label: "Yaa Asantewaa", detail: "The War of the Golden Stool." }
    ],
    museum: {
      see: [
        "Cast brass gold-weights (abrammuo).",
        "Gold ornaments, staffs, and sword hilts.",
        "Kente cloth and adinkra textiles.",
        "Akua'ba fertility figures.",
        "Stools, drums, and state umbrellas."
      ],
      lingo: [
        { t: "Abrammuo", d: "A cast brass gold-weight." },
        { t: "Sika Dwa", d: "The Golden Stool." },
        { t: "Asantehene", d: "The Asante king." },
        { t: "Kente", d: "Strip-woven royal cloth." },
        { t: "Adinkra", d: "Stamped proverb symbols." },
        { t: "Akua'ba", d: "A fertility figure." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa.",
        "British Museum — the great Asante regalia collection.",
        "de Young — African gold and textiles.",
        "Manhyia Palace Museum, Kumasi."
      ]
    }
  },

  {
    slug: "dogon",
    name: "The Dogon",
    emoji: "🪨",
    accent: "#78716c",
    group: "Africa",
    region: "Bandiagara Escarpment, central Mali",
    start: 1400,
    end: 1900,
    spanLabel: "c. 1400 – 1900 CE",
    tagline: "The cliff people of Mali — masked dances, the Kanaga, and a cosmos of twin spirits.",
    overview: "The Dogon settled the dramatic Bandiagara Escarpment in central Mali and built villages into its cliffs, defending their independence for centuries. They are famous for sculpture — the geometric Kanaga mask, the towering 'storey' sirige mask, and carved seated couples — and for the dama funeral masquerade that sends souls onward. Their masked dances are among the most photographed in Africa.",
    quick: [
      "A people of the Bandiagara cliffs in central Mali.",
      "Famous for masked dances (dama) and the geometric Kanaga mask.",
      "Cosmology centered on Nommo, the primordial twins.",
      "Their cliff villages and granaries are a World Heritage site."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: Dogon masks, figures, and granary doors.",
    context: {
      bigPicture: "The Dogon migrated to the escarpment around the 14th–15th century, taking over the abandoned granaries of the earlier Tellem. Their isolation preserved a distinctive religion and art: the creator god Amma and the Nommo twins, an elaborate masked tradition, and sculpture of great formal power. The French ethnographer Marcel Griaule documented them from the 1930s — some of his claims about Sirius are now contested, but the masks and figures remain the real marvel.",
      geography: "A 150-km sandstone cliff line rising above the dry Sahel. The cliffs provided defense and homes; millet farming on the plateau and at the cliff base sustained life. Rock and wood — not metal — are the Dogon's materials.",
      keyIdeas: [
        { t: "Nommo", d: "The primordial twins, central to Dogon cosmology." },
        { t: "Dama", d: "The funeral masquerade that frees the soul." },
        { t: "Kanaga", d: "The mask whose double cross evokes the creator." },
        { t: "Hogon", d: "The elder-priest who guards the village." }
      ],
      spotIt: [
        { t: "Kanaga mask", d: "A double-barred cross atop a face mask." },
        { t: "Sirige mask", d: "A towering 'storey' mask up to five meters tall." },
        { t: "Seated couples", d: "Carved figures of a man and woman, often on a stool." },
        { t: "Granary doors", d: "Carved wooden doors with ancestor figures." }
      ]
    },
    periods: [
      { name: "Arrival & Tellem", years: "c. 1400–1500 CE", start: 1400, end: 1500, summary: "The Dogon settle the cliffs.", detail: "The Dogon arrived at the Bandiagara Escarpment around the 14th–15th century, succeeding the Tellem 'little people' whose cliff granaries they reused and whose cloth the dry air preserved." },
      { name: "Cliff civilization", years: "1500–1800 CE", start: 1500, end: 1800, summary: "Villages, masks, and independence.", detail: "The Dogon built villages into the cliff face and on the plateau, farming millet and guarding their independence against neighbors and, later, Islamic states. The masked societies and their rituals took mature form." },
      { name: "Masks & contact", years: "1800–1900 CE", start: 1800, end: 1900, summary: "Documented, collected, world-famous.", detail: "The dama ceremonies and the great masks drew first colonial and then global attention. Dogon sculpture became one of the best-known African art traditions — masks, figures, and granary doors now found in museums worldwide." }
    ],
    events: [
      { year: 1400, label: "Arrival", detail: "The Dogon settle Bandiagara." },
      { year: 1500, label: "Cliff villages", detail: "Homes in the escarpment." },
      { year: 1800, label: "Dama tradition", detail: "The funeral masquerade." },
      { year: 1900, label: "Colonial era", detail: "The tradition endures." }
    ],
    museum: {
      see: [
        "Kanaga and sirige masks.",
        "Wooden seated couples and equestrian figures.",
        "Carved granary doors.",
        "Iron and stone pieces, and woven indigo cloth."
      ],
      lingo: [
        { t: "Dama", d: "The funeral masquerade." },
        { t: "Kanaga", d: "The cross-topped mask." },
        { t: "Sirige", d: "The storey mask." },
        { t: "Hogon", d: "The priest-elder." },
        { t: "Nommo", d: "The primordial twins." },
        { t: "Tellem", d: "The earlier cliff-dwellers." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa.",
        "de Young — African sculpture galleries.",
        "Musée du quai Branly, Paris."
      ]
    }
  },

  {
    slug: "fang",
    name: "The Fang",
    emoji: "👤",
    accent: "#166534",
    group: "Africa",
    region: "Gabon, Equatorial Guinea, and southern Cameroon",
    start: 1700,
    end: 1907,
    spanLabel: "c. 1700 – 1907 CE",
    tagline: "Guardians of the ancestors — reliquary figures whose abstraction helped ignite modern art.",
    overview: "The Fang carved some of the most admired sculptures in Africa: byeri reliquary guardian figures that once sat atop boxes of ancestor relics, with heart-shaped faces and elongated, muscular limbs. Their radical abstraction, collected in the early 20th century, is credited with influencing Picasso and the modernists. The white-faced ngil mask, worn to police the community, is equally striking.",
    quick: [
      "A rainforest people of Gabon and its neighbors.",
      "Made byeri reliquary guardians that topped boxes of ancestor relics.",
      "Their abstraction — heart-shaped faces, long limbs — influenced Picasso and modern art.",
      "The white-faced ngil mask policed the community."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: Fang reliquary figures and masks.",
    context: {
      bigPicture: "The Fang migrated from the northeast into the Atlantic forests in the 17th–19th centuries. Their byeri cult kept the relics of revered ancestors in bark boxes, guarded by carved figures of extraordinary economy — forms so abstract that early-20th-century artists in Paris saw in them a new way forward. Fang figures stand at the center of the long, still-unfinished conversation about African art, modernism, and restitution.",
      geography: "The equatorial rainforest of the Gabon basin, crossed by the Ogowe and Ntem rivers. Ivory and rubber drew trade and, later, colonial extraction; forest villages kept the ancestor cults alive.",
      keyIdeas: [
        { t: "Byeri", d: "The ancestor cult and its bark reliquary boxes." },
        { t: "The guardian figure", d: "Eyema byeri / nlo byeri — the carved watcher of the relics." },
        { t: "Ngil", d: "The society whose white mask judged disputes." },
        { t: "Abstraction", d: "Concave faces and cylinder limbs — a deliberate, powerful stylization." }
      ],
      spotIt: [
        { t: "Heart-shaped faces", d: "Broad foreheads, concave cheeks, small mouths." },
        { t: "Muscular limbs", d: "Flexed, columnar arms and legs." },
        { t: "Byeri boxes", d: "Bark containers of ancestor relics (often displayed apart)." },
        { t: "Ngil masks", d: "White, heart-shaped, with long noses." }
      ]
    },
    periods: [
      { name: "Migration", years: "1700–1800 CE", start: 1700, end: 1800, summary: "Into the forest from the northeast.", detail: "The Fang moved south and west from the savanna into the equatorial forest, spreading across what is now Gabon, Equatorial Guinea, and southern Cameroon." },
      { name: "Byeri tradition", years: "1800–1890 CE", start: 1800, end: 1890, summary: "Ancestor relics and their guardians.", detail: "The byeri cult matured: families kept ancestors' relics in bark boxes, topped by carved guardians. The figures were periodically oiled, blackened, and handled — part of their power." },
      { name: "Into modern art", years: "1890–1907 CE", start: 1890, end: 1907, summary: "Collected, exhibited, and absorbed by the avant-garde.", detail: "Colonial expeditions and traders carried Fang figures to Europe, where they entered ethnographic and then art collections. By 1907, Picasso and his circle were studying them — the year of Les Demoiselles d'Avignon, often cited as African art's moment of impact on modernism." }
    ],
    events: [
      { year: 1700, label: "Migration", detail: "The Fang enter the forest." },
      { year: 1800, label: "Byeri", detail: "Reliquary guardians are carved." },
      { year: 1885, label: "Colonial partition", detail: "The region is divided among powers." },
      { year: 1907, label: "Demoiselles d'Avignon", detail: "Modernism meets African art." }
    ],
    museum: {
      see: [
        "Byeri reliquary guardian figures.",
        "Ngil society masks.",
        "Reliquary boxes (byeri).",
        "Fang spoons, stools, and harps."
      ],
      lingo: [
        { t: "Byeri", d: "The ancestor cult." },
        { t: "Eyema byeri / nlo byeri", d: "The reliquary guardian." },
        { t: "Ngil", d: "The masked judicial society." },
        { t: "Reliquary", d: "A container for relics." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa.",
        "de Young — African sculpture.",
        "Musée du quai Branly, Paris."
      ]
    }
  },

  {
    slug: "kongo",
    name: "Kingdom of Kongo",
    emoji: "🔨",
    accent: "#9d174d",
    group: "Africa",
    region: "Lower Congo river — modern DR Congo, Republic of Congo, and Angola",
    start: 1390,
    end: 1900,
    spanLabel: "c. 1390 – 1900 CE",
    tagline: "A Christianized Central African kingdom — and the nail-studded power figures called minkisi.",
    overview: "The Kingdom of Kongo, founded around 1390, was one of Africa's best-documented kingdoms, in contact with Portugal from 1483 and Christianized under King Afonso I. Its art centers on minkisi — power figures activated by ritual specialists — above all the nkisi nkondi, a wooden figure bristling with nails and blades, used to seal oaths and hunt wrongdoers. Kongo culture also flowed across the Atlantic, shaping the religions of the African diaspora.",
    quick: [
      "A Central African kingdom founded c. 1390, capital Mbanza Kongo.",
      "Converted to Christianity under Afonso I after Portuguese contact in 1483.",
      "Famous for minkisi — power figures studded with nails and blades.",
      "Profoundly shaped by the Atlantic slave trade."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Africa: nkisi nkondi figures and Kongo crucifixes.",
    context: {
      bigPicture: "Kongo converted early and selectively to Christianity, producing Kongo crucifixes and medals alongside its own spiritual system, in which an nganga (ritual specialist) activates an nkisi — a power object with a 'medicine' charge. The nkisi nkondi, covered in driven nails, recorded oaths and pursued offenders. The kingdom fragmented under the slave trade and was finally absorbed in the colonial 'scramble for Africa.'",
      geography: "The fertile lower Congo river basin and the Atlantic coast — the hinge of Portuguese trade. Raffia cloth, ivory, copper, and, catastrophically, enslaved people flowed through the kingdom to the coast.",
      keyIdeas: [
        { t: "Nkisi / minkisi", d: "A power object and its activating spirit." },
        { t: "Nkondi", d: "The 'hunter' nkisi, studded with nails and blades." },
        { t: "Nganga", d: "The ritual specialist who activates the object." },
        { t: "Afonso I", d: "The Christian king (r. 1506–1543) who corresponded with Europe." }
      ],
      spotIt: [
        { t: "Nail figures", d: "Nkisi nkondi covered in iron nails and blades." },
        { t: "Mirror eyes", d: "Glass or mirror in the belly or eyes, the 'charge.'" },
        { t: "Kongo crucifixes", d: "Christian crosses cast in the Kongo idiom." },
        { t: "Raffia & ivory", d: "Textiles, prestige caps (mpu), and carved horns." }
      ]
    },
    periods: [
      { name: "Founding & conversion", years: "1390–1506 CE", start: 1390, end: 1506, summary: "Lukeni lua Nimi and the Portuguese.", detail: "Lukeni lua Nimi founded the kingdom around 1390, capital Mbanza Kongo. The Portuguese arrived in 1483; the elite soon adopted Christianity, and Afonso I (r. 1506–1543) made it the state religion while selectively blending it with Kongo practice." },
      { name: "Kingdom & trade", years: "1500–1700 CE", start: 1500, end: 1700, summary: "Syncretism and the minkisi tradition.", detail: "The kingdom reached its height: Christian kings, a literate elite, and a sophisticated court. The minkisi tradition — power figures activated by nganga — flourished alongside the new faith, and Kongo textiles and ivories traveled far." },
      { name: "Fragmentation", years: "1700–1900 CE", start: 1700, end: 1900, summary: "The slave trade and colonization.", detail: "Civil wars, the escalating slave trade, and the 1665 battle of Mbwila shattered central authority. The kingdom broke into competing polities, and by 1900 the region had been partitioned into Belgian, French, and Portuguese colonies." }
    ],
    events: [
      { year: 1390, label: "Founding", detail: "Lukeni lua Nimi." },
      { year: 1483, label: "Portuguese arrive", detail: "Contact and trade begin." },
      { year: 1506, label: "Afonso I", detail: "The Christian king." },
      { year: 1665, label: "Mbwila", detail: "The kingdom fractures." },
      { year: 1885, label: "Berlin Conference", detail: "The region is partitioned." }
    ],
    museum: {
      see: [
        "Nkisi nkondi nail figures.",
        "Nkisi figures with mirror 'charges.'",
        "Kongo crucifixes and medals.",
        "Ivory oliphants (horns) and raffia textiles.",
        "Stone funerary figures (ntadi)."
      ],
      lingo: [
        { t: "Nkisi / minkisi", d: "Power object(s)." },
        { t: "Nkondi", d: "The nail-studded 'hunter.'" },
        { t: "Nganga", d: "Ritual specialist." },
        { t: "Mpu", d: "A prestige cap." },
        { t: "Oliphant", d: "A carved ivory horn." },
        { t: "Ntadi", d: "A stone funerary figure." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Africa.",
        "de Young — African sculpture.",
        "Royal Museum for Central Africa, Tervuren, and the National Museum, Kinshasa."
      ]
    }
  },

  {
    slug: "maori",
    name: "The Māori",
    emoji: "🌀",
    accent: "#15803d",
    group: "Oceania",
    region: "Aotearoa (New Zealand)",
    start: 1300,
    end: 1900,
    spanLabel: "c. 1300 – 1900 CE",
    tagline: "Polynesian voyagers of Aotearoa — carved meeting houses, hei-tiki, and the koru spiral.",
    overview: "The Māori are the Indigenous people of Aotearoa New Zealand, Polynesian voyagers who arrived around 1300 CE and built a distinctive warrior and agricultural culture. Their art is ancestor-centered: the carved meeting house (wharenui) with its tekoteko and tukutuku panels, the spiral koru, hei-tiki jade pendants, and ta moko facial tattoo, which records genealogy and rank.",
    quick: [
      "The Indigenous people of Aotearoa New Zealand, arrived from East Polynesia c. 1300.",
      "Carved meeting houses (wharenui) embody ancestors; the koru spiral is everywhere.",
      "Hei-tiki — jade pendants — are treasured heirlooms.",
      "Ta moko facial tattoo records genealogy and rank."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Oceania: Māori meeting-house carvings and hei-tiki.",
    context: {
      bigPicture: "Māori society is organized by whakapapa (genealogy), with mana (prestige) and tapu (sacredness) governing behavior. Art — whakairo carving, ta moko, and weaving — makes ancestors present. After Captain Cook's arrival in 1769 and the 1840 Treaty of Waitangi, colonization brought war, land loss, and population collapse; but Māori language and art survived and have powerfully revived.",
      geography: "Two large temperate islands, rich in forest, birds, and the pounamu (jade) of the South Island. With no metal, Māori worked stone, bone, and wood; the sea linked them to their Polynesian homeland.",
      keyIdeas: [
        { t: "Whakapapa", d: "Genealogy — the spine of Māori identity." },
        { t: "Mana & tapu", d: "Prestige and sacredness." },
        { t: "The meeting house", d: "Wharenui — the ancestor's body, entered as a welcome." },
        { t: "Ta moko", d: "Facial tattoo recording lineage and rank." }
      ],
      spotIt: [
        { t: "Koru", d: "The unfurling-fern spiral." },
        { t: "Hei-tiki", d: "A greenstone human-form pendant." },
        { t: "Tekoteko", d: "A carved gable figure." },
        { t: "Feather cloaks", d: "Kahu huruhuru and flax cloaks." }
      ]
    },
    periods: [
      { name: "Settlement", years: "1300–1500 CE", start: 1300, end: 1500, summary: "Voyagers arrive and adapt.", detail: "Polynesian voyagers reached Aotearoa around 1300, adapting a tropical culture to a temperate land: they hunted the moa to extinction, cleared forest, and developed new crops, tools, and art forms." },
      { name: "Classic Māori", years: "1500–1769 CE", start: 1500, end: 1769, summary: "Pā, carving, and ta moko.", detail: "The classic period saw fortified pā, the mature carving tradition, and the development of ta moko. Tribal (iwi) identities, genealogies, and the great meeting houses took form." },
      { name: "Contact & colony", years: "1769–1900 CE", start: 1769, end: 1900, summary: "Cook, the Treaty, and survival.", detail: "Cook's arrival in 1769 opened contact; muskets, introduced diseases, and the New Zealand Wars devastated communities. The 1840 Treaty of Waitangi promised partnership, but land loss followed. Māori culture persisted and later revived powerfully." }
    ],
    events: [
      { year: 1300, label: "Arrival", detail: "Voyagers from East Polynesia." },
      { year: 1500, label: "Classic period", detail: "Pā and carving traditions." },
      { year: 1769, label: "Cook arrives", detail: "European contact begins." },
      { year: 1840, label: "Treaty of Waitangi", detail: "A partnership, soon broken." },
      { year: 1900, label: "Colonial era", detail: "Survival and revival." }
    ],
    museum: {
      see: [
        "Hei-tiki and pounamu ornaments.",
        "Carved panels and meeting-house figures.",
        "Feather cloaks and flax weaving.",
        "Weapons — taiaha, mere (jade clubs), and wahaika."
      ],
      lingo: [
        { t: "Wharenui", d: "The carved meeting house." },
        { t: "Hei-tiki", d: "A greenstone pendant." },
        { t: "Ta moko", d: "Facial tattoo." },
        { t: "Pounamu", d: "Greenstone (jade)." },
        { t: "Mana / tapu", d: "Prestige / sacredness." },
        { t: "Koru", d: "The spiral motif." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Oceania.",
        "de Young — Oceanic art galleries.",
        "Te Papa Tongarewa, Wellington, and the Auckland War Memorial Museum."
      ]
    }
  },

  {
    slug: "asmat",
    name: "The Asmat",
    emoji: "🛶",
    accent: "#7c2d12",
    group: "Oceania",
    region: "Southwestern Papua, Indonesia (New Guinea)",
    start: 1000,
    end: 1961,
    spanLabel: "c. 1000 – 1961 CE",
    tagline: "Rainforest carvers of New Guinea — bisj poles, ancestor spirits, and the collection of Michael C. Rockefeller.",
    overview: "The Asmat of southwestern New Guinea are among the world's great woodcarvers, living on the tidal rivers and mangroves of Indonesian Papua. Their towering bisj poles, carved from a single mangrove trunk, memorialize the dead and were tied to ritual headhunting into the mid-20th century. The Met's Asmat collection was assembled largely by Michael C. Rockefeller, who disappeared there in 1961.",
    quick: [
      "A rainforest people of southwestern New Guinea (Indonesian Papua).",
      "Carvers of the bisj pole — a towering ancestor memorial.",
      "Headhunting and ancestor veneration were ritually intertwined.",
      "Michael C. Rockefeller's collection made Asmat art central to the Met's Oceania galleries."
    ],
    met: "Rockefeller Wing (reopened 2025) — Arts of Oceania: the Michael C. Rockefeller Asmat collection.",
    context: {
      bigPicture: "The Asmat live in vast alluvial swamps where villages stand on stilts over the rivers and dugout canoes are everything. Their carvings — bisj poles, ancestor figures, shields, and canoe prows — honor the dead and were bound up with headhunting, which balanced the spiritual accounts owed to ancestors. Dutch and then Indonesian rule transformed that world, but carving remains central to Asmat identity and livelihood.",
      geography: "A maze of tidal rivers, mangroves, and sago swamps along the Arafura coast. Mangrove wood is the medium; the hornbill, praying mantis, and crocodile are the recurring motifs; the canoe links the living and the dead.",
      keyIdeas: [
        { t: "Bisj poles", d: "Towering ancestor memorials, carved in a single piece." },
        { t: "Ancestors & headhunting", d: "Ritual restored balance to the spirit world." },
        { t: "Fumeripits", d: "The creator who carved the first people from wood." },
        { t: "Wood as spirit", d: "Carving gives ancestors a body." }
      ],
      spotIt: [
        { t: "Bisj poles", d: "Openwork ancestor stacks atop a canoe form." },
        { t: "Shields", d: "Painted with bold red, white, and black designs." },
        { t: "Canoe prows", d: "Carved with human and animal figures." },
        { t: "Drums", d: "Hourglass drums, carved and painted." }
      ]
    },
    periods: [
      { name: "River & forest culture", years: "1000–1900 CE", start: 1000, end: 1900, summary: "Sago, canoes, and the spirit world.", detail: "For centuries the Asmat lived by sago, fishing, and canoe, their villages built on stilts over the tidal rivers. Headhunting and ancestor ritual, expressed in woodcarving, structured the moral and spiritual world." },
      { name: "Contact & Rockefeller", years: "1900–1961 CE", start: 1900, end: 1961, summary: "Colonial contact and the great collection.", detail: "Dutch colonial rule and missionaries reached the Asmat in the early 20th century. Between 1958 and 1961, Michael C. Rockefeller collected Asmat carvings intensively; after his disappearance in 1961, the collection came to the Met, where it anchors the Oceania galleries." }
    ],
    events: [
      { year: 1000, label: "Asmat culture", detail: "River life and carving." },
      { year: 1900, label: "Colonial contact", detail: "Dutch administration reaches the swamps." },
      { year: 1958, label: "Rockefeller expedition", detail: "Collecting begins." },
      { year: 1961, label: "Collection to the Met", detail: "The bisj poles enter the museum." }
    ],
    museum: {
      see: [
        "Bisj (bis) poles.",
        "Ancestor figures and canoe prows.",
        "Carved and painted shields.",
        "Hourglass drums."
      ],
      lingo: [
        { t: "Bisj pole", d: "A towering ancestor memorial." },
        { t: "Fumeripits", d: "The creator who carved the first humans." },
        { t: "Atsj", d: "The house of the men's initiations." },
        { t: "Headhunting", d: "The ritual that balanced the spirit world." },
        { t: "Mangrove", d: "The wood of Asmat carving." }
      ],
      where: [
        "The Met — Rockefeller Wing, Arts of Oceania (Michael C. Rockefeller collection).",
        "de Young — the Jolika collection of New Guinea art.",
        "Asmat Museum of Culture and Progress, Agats."
      ]
    }
  },
];

/* Met floor-by-floor route: galleries → civilizations.
 * Gallery numbers change with reinstalls — always cross-check the Met map.
 */

/* ---------------------------------------------------------------------------
 * MUSEUMS & ROUTES — structured as a graph.
 * Node types: museum -> gallery/area -> civilization, plus relationship edges
 * between civilizations (CIV_RELATIONS). buildGraph() in app.js assembles
 * { nodes, edges } from these for the visual graph on routes.html.
 *
 * Gallery names/numbers change with reinstalls — always cross-check the
 * museum's current map. Collection names are used for SF & Smithsonian.
 * ------------------------------------------------------------------------- */

const MUSEUMS = [
  {
    id: "met",
    name: "The Metropolitan Museum of Art",
    city: "New York",
    emoji: "🗽",
    tagline: "Fifth Avenue + The Cloisters — one of the world's great encyclopedic museums.",
    note: "Gallery numbers change with reinstalls — cross-check the Met map before you go.",
    floors: [
      {
        id: "met-ground", name: "Ground floor",
        note: "Enter through the Great Hall on Fifth Avenue.",
        areas: [
          { id: "met-egypt", name: "Egyptian Art", galleries: "Galleries 100–138", note: "North end — don't miss the Temple of Dendur in Gallery 131.", civs: ["egypt", "nubia"] },
          { id: "met-neareast", name: "Ancient Near Eastern Art", galleries: "Galleries 400–406", note: "Assyrian reliefs and lamassu in Gallery 400.", civs: ["mesopotamia", "persia"] },
          { id: "met-greek", name: "Greek and Roman Art", galleries: "Galleries 150–176", note: "The Leon Levy and Shelby White Court.", civs: ["greece", "rome", "minoan"] },
          { id: "met-arms", name: "Arms and Armor", galleries: "Galleries 371–380", note: "Suits of armor and blades.", civs: ["vikings", "medieval-europe"] },
          { id: "met-africa", name: "Arts of Africa", galleries: "Rockefeller Wing", note: "Benin plaques, Ife heads, Kongo power figures, Asante gold, Dogon and Fang sculpture.", civs: ["benin", "mali", "yoruba", "ewe", "asante", "dogon", "fang", "kongo"] },
          { id: "met-americas", name: "Arts of the Ancient Americas", galleries: "Rockefeller Wing", note: "Olmec jade, Maya stelae, Aztec stone, Inca textiles, Moche ceramics.", civs: ["olmec", "maya", "aztec", "inca", "moche"] },
          { id: "met-oceania", name: "Arts of Oceania", galleries: "Rockefeller Wing", note: "Māori meeting-house carvings and the Asmat collection of Michael C. Rockefeller.", civs: ["maori", "asmat"] }
        ]
      },
      {
        id: "met-second", name: "Second floor",
        note: "Stairs and elevators up from the Great Hall.",
        areas: [
          { id: "met-asian", name: "Asian Art", galleries: "Galleries 200–253", note: "Arts of Japan 223–232 · Arts of Korea adjacent · South & Southeast Asia incl. Gallery 249 (Khmer).", civs: ["china", "japan", "korea", "indus", "gupta", "khmer"] },
          { id: "met-medieval", name: "Medieval Art", galleries: "Galleries 300–305", note: "Includes the Jaharis Galleries for Byzantine Art.", civs: ["byzantium", "medieval-europe", "vikings"] },
          { id: "met-islamic", name: "Islamic Art", galleries: "Galleries 450–464", note: "Art of the Arab Lands, Turkey, Iran, Central Asia, and Later South Asia.", civs: ["islamic"] }
        ]
      },
      {
        id: "met-cloisters", name: "The Met Cloisters",
        note: "A separate building in Fort Tryon Park, Upper Manhattan — devoted to medieval Europe.",
        areas: [
          { id: "met-cloisters-med", name: "Medieval Europe", galleries: "Fort Tryon Park", note: "The Unicorn Tapestries, cloister gardens, and the Treasury.", civs: ["medieval-europe", "byzantium"] }
        ]
      }
    ]
  },

  {
    id: "deyoung",
    name: "de Young Museum",
    city: "San Francisco",
    emoji: "🌉",
    tagline: "Golden Gate Park — strong Americas, Africa, and Oceania collections, plus Maya jade.",
    note: "Collection names used (gallery layouts rotate with exhibitions).",
    floors: [
      {
        id: "deyoung-galleries", name: "Permanent galleries",
        note: "The de Young's strengths: the Americas, Africa, Oceania, and textiles.",
        areas: [
          { id: "deyoung-americas", name: "Arts of the Americas", galleries: "Upper level", note: "Pre-Columbian and Native American art — Olmec to Inca.", civs: ["olmec", "maya", "aztec", "inca", "moche"] },
          { id: "deyoung-africa", name: "Arts of Africa", galleries: "Upper level", note: "West and Central African sculpture, masks, and figures.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali"] },
          { id: "deyoung-oceania", name: "Arts of Oceania", galleries: "Upper level", note: "The Jolika collection of New Guinea art, plus Māori carving.", civs: ["maori", "asmat"] },
          { id: "deyoung-jade", name: "Jade collection", galleries: "Sculpture garden level", note: "One of the world's best Mesoamerican jade displays.", civs: ["olmec", "maya", "china"] }
        ]
      }
    ]
  },

  {
    id: "legion",
    name: "Legion of Honor",
    city: "San Francisco",
    emoji: "🏛️",
    tagline: "Lincoln Park — the Fine Arts Museums' ancient art stronghold.",
    note: "Collection names used.",
    floors: [
      {
        id: "legion-galleries", name: "Permanent galleries",
        note: "The Legion of Honor holds the Bay Area's deepest ancient art galleries.",
        areas: [
          { id: "legion-ancient", name: "Ancient Art", galleries: "Ground floor", note: "Egyptian, Near Eastern, Greek, and Roman antiquities.", civs: ["egypt", "nubia", "mesopotamia", "persia", "greece", "rome", "minoan", "byzantium"] },
          { id: "legion-european", name: "European art", galleries: "Various", note: "Medieval and later European painting and sculpture.", civs: ["medieval-europe", "byzantium", "vikings"] }
        ]
      }
    ]
  },

  {
    id: "aam",
    name: "Asian Art Museum",
    city: "San Francisco",
    emoji: "🏮",
    tagline: "Civic Center — one of the finest Asian art collections outside Asia.",
    note: "Organized by region: South Asia, Southeast Asia, West Asia, the Himalayas, China, Japan, Korea.",
    floors: [
      {
        id: "aam-galleries", name: "Collection galleries",
        note: "A geographic walk through Asia.",
        areas: [
          { id: "aam-south", name: "South Asia", galleries: "Gallery level", note: "Indus seals, Gupta sculpture, and Buddhist art.", civs: ["indus", "gupta"] },
          { id: "aam-southeast", name: "Southeast Asia", galleries: "Gallery level", note: "Khmer and related sculpture.", civs: ["khmer"] },
          { id: "aam-west", name: "West Asia & Islamic world", galleries: "Gallery level", note: "Persian and Islamic art.", civs: ["islamic", "persia", "mesopotamia"] },
          { id: "aam-china", name: "China", galleries: "Gallery level", note: "Bronzes, jade, and ceramics.", civs: ["china"] },
          { id: "aam-japan", name: "Japan", galleries: "Gallery level", note: "Screens, lacquer, and prints.", civs: ["japan"] },
          { id: "aam-korea", name: "Korea", galleries: "Gallery level", note: "Celadon and Buddhist art.", civs: ["korea"] }
        ]
      }
    ]
  },

  {
    id: "rosicrucian",
    name: "Rosicrucian Egyptian Museum",
    city: "San Jose",
    emoji: "⚱️",
    tagline: "The largest collection of authentic ancient Egyptian artifacts in western North America.",
    note: "A short drive from the Bay Area — the best Egypt stop west of the Met.",
    floors: [
      {
        id: "rosicrucian-galleries", name: "Permanent galleries",
        note: "Egyptian and Nubian antiquities, plus a replica rock-cut tomb.",
        areas: [
          { id: "rosicrucian-egypt", name: "Ancient Egypt & Nubia", galleries: "Whole museum", note: "Mummies, coffins, and daily-life objects.", civs: ["egypt", "nubia"] }
        ]
      }
    ]
  },

  {
    id: "nmnh",
    name: "National Museum of Natural History",
    city: "Washington, DC (Smithsonian)",
    emoji: "🦕",
    tagline: "The Smithsonian's natural history museum — ancient Egypt and African Voices.",
    note: "Exhibit names used (the American History museum covers US history, not ancient civilizations).",
    floors: [
      {
        id: "nmnh-halls", name: "Halls",
        note: "Anthropology halls on the first floor.",
        areas: [
          { id: "nmnh-egypt", name: "Eternal Life in Ancient Egypt", galleries: "First floor", note: "Mummies, coffins, and the afterlife.", civs: ["egypt", "nubia"] },
          { id: "nmnh-africa", name: "African Voices", galleries: "First floor", note: "Living cultures and kingdoms of Africa.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali"] }
        ]
      }
    ]
  },

  {
    id: "faaa",
    name: "National Museum of Asian Art",
    city: "Washington, DC (Smithsonian)",
    emoji: "🏯",
    tagline: "The Freer Gallery of Art + the Arthur M. Sackler Gallery — Asia and the ancient Near East.",
    note: "Collection names used.",
    floors: [
      {
        id: "faaa-galleries", name: "Galleries",
        note: "Two connected buildings on the National Mall.",
        areas: [
          { id: "faaa-south", name: "South & Southeast Asia", galleries: "Sackler", note: "Indus to Gupta to Khmer.", civs: ["indus", "gupta", "khmer"] },
          { id: "faaa-china", name: "China", galleries: "Freer + Sackler", note: "Bronzes, jade, and painting.", civs: ["china"] },
          { id: "faaa-japan", name: "Japan", galleries: "Freer", note: "Screens, scrolls, and lacquer.", civs: ["japan"] },
          { id: "faaa-korea", name: "Korea", galleries: "Freer", note: "Celadon and Buddhist art.", civs: ["korea"] },
          { id: "faaa-islamic", name: "Islamic world", galleries: "Freer + Sackler", note: "Manuscripts, ceramics, and metalwork.", civs: ["islamic", "persia"] },
          { id: "faaa-neareast", name: "Ancient Near East", galleries: "Freer", note: "Mesopotamian and Persian antiquities.", civs: ["mesopotamia", "persia"] }
        ]
      }
    ]
  },

  {
    id: "nmafa",
    name: "National Museum of African Art",
    city: "Washington, DC (Smithsonian)",
    emoji: "🎭",
    tagline: "The Smithsonian's museum devoted entirely to the arts of Africa.",
    note: "Collection names used.",
    floors: [
      {
        id: "nmafa-galleries", name: "Galleries",
        note: "Sub-Saharan African art, traditional and modern.",
        areas: [
          { id: "nmafa-africa", name: "Arts of Africa", galleries: "National Mall", note: "Benin, Yoruba, Kongo, Dogon, Fang, and Asante works.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali"] }
        ]
      }
    ]
  },

  {
    id: "nmai",
    name: "National Museum of the American Indian",
    city: "Washington, DC (Smithsonian)",
    emoji: "🪶",
    tagline: "Living Indigenous cultures of the Americas — the long arc from Olmec to today.",
    note: "Centered on living communities; the pre-Columbian civs here are context.",
    floors: [
      {
        id: "nmai-halls", name: "Galleries",
        note: "Objects from across North, Central, and South America.",
        areas: [
          { id: "nmai-americas", name: "Native peoples of the Americas", galleries: "National Mall", note: "Ancient to living traditions — Olmec through Inca.", civs: ["olmec", "maya", "aztec", "inca", "moche"] }
        ]
      }
    ]
  }
];

/* Relationship edges between civilizations (for the visual graph). */
const CIV_RELATIONS = [
  { from: "egypt", to: "nubia", type: "neighbor" },
  { from: "egypt", to: "mesopotamia", type: "contemporary" },
  { from: "egypt", to: "indus", type: "contemporary" },
  { from: "mesopotamia", to: "indus", type: "contemporary" },
  { from: "mesopotamia", to: "persia", type: "successor" },
  { from: "minoan", to: "greece", type: "predecessor" },
  { from: "greece", to: "rome", type: "influenced" },
  { from: "rome", to: "byzantium", type: "successor" },
  { from: "persia", to: "islamic", type: "region" },
  { from: "byzantium", to: "islamic", type: "contemporary" },
  { from: "vikings", to: "medieval-europe", type: "contemporary" },
  { from: "islamic", to: "mali", type: "influenced" },
  { from: "china", to: "japan", type: "influenced" },
  { from: "china", to: "korea", type: "influenced" },
  { from: "korea", to: "japan", type: "influenced" },
  { from: "indus", to: "gupta", type: "successor" },
  { from: "gupta", to: "khmer", type: "influenced" },
  { from: "olmec", to: "maya", type: "influenced" },
  { from: "maya", to: "aztec", type: "influenced" },
  { from: "moche", to: "inca", type: "predecessor" },
  { from: "yoruba", to: "benin", type: "influenced" },
  { from: "maori", to: "asmat", type: "region" }
];

const REL_LABELS = {
  neighbor: "neighbor",
  contemporary: "contemporary",
  successor: "succeeded by",
  predecessor: "preceded by",
  influenced: "influenced",
  region: "same region"
};

