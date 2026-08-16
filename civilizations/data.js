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

  {
    slug: "hittites",
    name: "The Hittites",
    emoji: "🦁",
    accent: "#7c3aed",
    group: "Ancient Mediterranean & Near East",
    region: "Anatolia — central Turkey",
    start: -1650,
    end: -1180,
    spanLabel: "c. 1650 – 1180 BCE",
    tagline: "The Bronze Age superpower nobody remembers — the empire that fought Egypt to a draw and wrote the first surviving peace treaty.",
    overview: "For roughly four centuries the Hittites ran an empire from Hattusa in the highlands of central Anatolia, and they were Egypt's equal: the two fought at Kadesh in 1274 BCE and then signed a treaty that still survives in both Egyptian and Hittite versions. They wrote in cuneiform on clay and in their own hieroglyphs on stone, worshipped 'the thousand gods of Hatti,' and vanished in the Bronze Age Collapse around 1180 BCE — so completely that they were known only from Biblical mentions until their capital was excavated in 1906. Museum holdings outside Turkey are thin, so expect seals, tablets, small bronzes, and reliefs rather than monuments.",
    quick: ["Bronze Age empire in Anatolia (modern Turkey), capital Hattusa.", "Fought Ramesses II at Kadesh (1274 BCE) — then signed history's first surviving peace treaty.", "Wrote Hittite (an Indo-European language) in Mesopotamian cuneiform.", "Collapsed c. 1180 BCE and was essentially forgotten until 1906."],
    met: "Ancient Near Eastern Art — Galleries 400–406. Anatolian material is shown with the wider Near East; look for stamp seals and small bronzes.",
    context: {
      bigPicture: "The Hittites were one of the four or five Great Kings of the Late Bronze Age club — alongside Egypt, Babylon, Assyria, and Mitanni — trading gifts, brides, and threats by letter. Their strength was cavalry-era chariotry, treaty-making, and an unusually legalistic culture: Hittite law substituted fines for many of the death penalties common elsewhere. Their archive at Hattusa, tens of thousands of clay tablets, is why we can read their diplomacy at all.",
      geography: "The Anatolian plateau — cold, high, and rocky, ringed by mountains, with the Black Sea to the north and Syria to the south. Hattusa sits behind gorges and massive walls near modern Boğazkale. Control of Syria (Kadesh, Aleppo, Carchemish) was the flashpoint with Egypt because it controlled the trade corridor.",
      keyIdeas: [
        { t: "Great King", d: "The Hittite ruler's title; also 'My Sun,' shown with a winged sun-disk over his head." },
        { t: "The thousand gods of Hatti", d: "The Hittites absorbed the gods of everyone they conquered rather than replacing them." },
        { t: "Treaty culture", d: "Vassal and parity treaties with sworn oaths, witnesses, and curses — a Hittite specialty." },
        { t: "Neo-Hittite states", d: "After the collapse, smaller successor kingdoms in Syria (Carchemish, Zincirli) carried the style on for centuries." }
      ],
      spotIt: [
        { t: "Winged sun-disk", d: "Hovering above a king's head, marking his semi-divine authority." },
        { t: "Luwian hieroglyphs", d: "Blocky picture-signs used on stone monuments and seals, distinct from cuneiform." },
        { t: "Stamp seals", d: "Hittites used round stamp seals where Mesopotamia used cylinder seals." },
        { t: "Stag and bull gods", d: "The stag-god of the countryside and the storm-god's bulls, often as small bronze or silver figures." }
      ]
    },
    periods: [
      { name: "Old Kingdom", years: "c. 1650–1500 BCE", start: -1650, end: -1500, summary: "Hattusa founded; a raid reaches Babylon.", detail: "Hattusili I moved the capital to Hattusa and campaigned into Syria. His successor Mursili I sacked Babylon around 1595 BCE — a raid so far from home it ended the Old Babylonian dynasty of Hammurabi's line, though the Hittites kept nothing. Palace murders and succession chaos followed, prompting the Edict of Telipinu, an early attempt to write down succession rules." },
      { name: "Empire (New Kingdom)", years: "c. 1400–1200 BCE", start: -1400, end: -1200, summary: "Great-power status: Syria, Kadesh, and the Egyptian treaty.", detail: "Suppiluliuma I turned Hatti into an empire, swallowing Mitanni and pushing into Syria. Muwatalli II fought Ramesses II at Kadesh in 1274 BCE — both sides claimed victory — and Hattusili III later signed the Eternal Treaty with Egypt, c. 1259 BCE. A copy hangs at the United Nations. Queens (the Tawananna, notably Puduhepa) co-signed treaties and letters in their own names." },
      { name: "Collapse & Neo-Hittites", years: "c. 1180–700 BCE", start: -1180, end: -700, summary: "Hattusa burns; Syrian successor states keep the culture alive.", detail: "Around 1180 BCE Hattusa was abandoned and burned as the whole eastern Mediterranean system unravelled — the Bronze Age Collapse. Smaller 'Neo-Hittite' or Syro-Hittite kingdoms at Carchemish, Malatya, and Zincirli kept Luwian hieroglyphs and Hittite-style reliefs going until Assyria absorbed them in the 8th century BCE." }
    ],
    events: [
      { year: -1650, label: "Hattusa founded", detail: "Hattusili I makes the highland fortress his capital." },
      { year: -1595, label: "Sack of Babylon", detail: "Mursili I raids Babylon, ending Hammurabi's dynasty — then goes home." },
      { year: -1344, label: "Suppiluliuma I", detail: "Conquers Mitanni and makes Hatti a great power in Syria." },
      { year: -1274, label: "Battle of Kadesh", detail: "The largest chariot battle known, against Ramesses II — a bloody draw." },
      { year: -1259, label: "Eternal Treaty", detail: "The earliest surviving international peace treaty, preserved in Egyptian and Hittite copies." },
      { year: -1180, label: "Hattusa falls", detail: "The capital burns during the Bronze Age Collapse; the empire ends." }
    ],
    museum: {
      see: [
        "Clay tablets in cuneiform — letters, treaties, rituals, and omens.",
        "Stamp seals and seal impressions (bullae) with Luwian hieroglyphs.",
        "Small bronze and silver figures of storm-gods, stags, and bulls.",
        "Stone relief fragments from Neo-Hittite Syria — processions of gods and lions.",
        "Rhyta (animal-shaped drinking vessels), often silver or ceramic."
      ],
      lingo: [
        { t: "Hattusa", d: "The Hittite capital, near modern Boğazkale in Turkey." },
        { t: "Tabarna / Tawananna", d: "Titles of the Hittite king and queen." },
        { t: "Luwian", d: "A related Anatolian language written in the hieroglyphic script on monuments." },
        { t: "Syro-Hittite", d: "Label for the post-1180 BCE successor kingdoms in Syria and southeast Turkey." },
        { t: "Rhyton", d: "A drinking or pouring vessel shaped like an animal or animal head." }
      ],
      where: [
        "Museum of Anatolian Civilizations, Ankara — the essential collection.",
        "The Met — Ancient Near Eastern Art, Galleries 400–406.",
        "British Museum — Room 54 (Anatolia and Urartu).",
        "Louvre — Near Eastern antiquities, Richelieu wing."
      ]
    }
  },

  {
    slug: "phoenicia",
    name: "Phoenicians & Carthage",
    emoji: "⛵",
    accent: "#7e22ce",
    group: "Ancient Mediterranean & Near East",
    region: "Lebanese coast and colonies across the Mediterranean",
    start: -1200,
    end: -146,
    spanLabel: "c. 1200 – 146 BCE",
    tagline: "The traders who gave the world its alphabet, then built a rival to Rome on the coast of Tunisia.",
    overview: "The Phoenicians were the merchant cities of the Lebanese coast — Byblos, Sidon, Tyre — who filled the vacuum after the Bronze Age Collapse by sailing everywhere and selling everything: cedar, purple dye, glass, ivory, and above all the alphabet, which Greeks borrowed and Europe still uses. Their western colony, Carthage, grew into an empire that fought Rome three times and lost the last one in 146 BCE. Because Rome erased Carthage and the Phoenician homeland was continuously rebuilt, museum material tends to be small and portable: glass, amulets, ivories, coins, and carved stone stelae.",
    quick: ["Merchant city-states on the Lebanese coast: Byblos, Sidon, Tyre.", "Their 22-letter alphabet became Greek, then Latin — the one you're reading.", "Famous for Tyrian purple dye, cedar, glass, and ivory carving.", "Carthage, their western colony, fought Rome three times and was destroyed in 146 BCE."],
    met: "Greek and Roman Art / Ancient Near Eastern Art — Phoenician glass, ivories, and Cypro-Phoenician bowls sit between the two; the Cesnola Cypriot collection (Gallery 171) is closely related.",
    context: {
      bigPicture: "'Phoenician' is a Greek nickname (probably from their purple dye); they called themselves Canaanites and thought of themselves as citizens of individual cities, never one nation. Their genius was logistics — harbors, ships, credit, and colonies spaced a day's sail apart from Cyprus to Cádiz. Carthage inherited that network and turned it into a state powerful enough that its defeat is the reason Latin, not Punic, became the language of the western Mediterranean.",
      geography: "A narrow coastal strip between mountains and sea in modern Lebanon — too little farmland, superb harbors, and cedar forests behind. That geography pushed them outward: Cyprus, Sardinia, Sicily, Ibiza, North Africa, and southern Spain, with Carthage (modern Tunis) as the western hub and Gades (Cádiz) at the Atlantic edge.",
      keyIdeas: [
        { t: "The alphabet", d: "22 consonant signs, learnable in an afternoon — writing escapes the scribal class." },
        { t: "Tyrian purple", d: "Dye from murex sea snails; thousands of shells per gram, hence 'royal' purple." },
        { t: "Colonies, not conquest", d: "Trading posts and daughter-cities rather than territorial empire — until Carthage." },
        { t: "Tophet", d: "Carthaginian precincts of urns holding infant and animal remains — still fiercely debated as sacrifice, cemetery, or both." }
      ],
      spotIt: [
        { t: "Core-formed glass", d: "Tiny opaque bottles with combed zigzag threads in yellow and turquoise." },
        { t: "Grotesque face beads", d: "Glass pendants shaped like bearded faces, worn as amulets." },
        { t: "Sign of Tanit", d: "A triangle topped by a bar and a disc — Carthage's protective emblem." },
        { t: "Egyptianizing motifs", d: "Sphinxes, lotus, and winged sun-discs borrowed from Egypt and resold everywhere." }
      ]
    },
    periods: [
      { name: "Phoenician cities", years: "c. 1200–800 BCE", start: -1200, end: -800, summary: "Byblos, Sidon, and Tyre rebuild trade after the collapse.", detail: "With Egypt and Hatti weakened, the Canaanite ports took over Mediterranean shipping. Hiram of Tyre supplied cedar and craftsmen for Solomon's temple in Biblical accounts. The alphabet, already used at Byblos by c. 1050 BCE, spread with the ships." },
      { name: "Colonization", years: "c. 800–550 BCE", start: -800, end: -550, summary: "Carthage founded; the network reaches the Atlantic.", detail: "Tradition dates Carthage's founding by Tyrian settlers to 814 BCE. Phoenician colonies ring the western Mediterranean, and Greeks adopt the alphabet, adding vowels. Assyrian and then Babylonian pressure squeezed the homeland cities; Alexander stormed Tyre in 332 BCE." },
      { name: "Carthaginian empire", years: "c. 550–264 BCE", start: -550, end: -264, summary: "A North African state with a navy, coinage, and Sicilian wars.", detail: "Carthage ruled North Africa and fought Greeks in Sicily for two centuries. It was governed by elected suffetes and a council rather than kings, minted prolific coinage, and financed a mercenary army — an approach that worked until it met a state with citizen legions." },
      { name: "Punic Wars & after", years: "264–146 BCE", start: -264, end: -146, summary: "Three wars with Rome; Hannibal, then annihilation.", detail: "Rome and Carthage fought over Sicily (264–241), then over the western Mediterranean when Hannibal crossed the Alps and beat Rome repeatedly before losing at Zama in 202. In 146 BCE Rome razed Carthage. Punic culture survived under Roman rule for centuries; the language was still spoken in Augustine's Africa." }
    ],
    events: [
      { year: -1050, label: "Alphabet at Byblos", detail: "The Ahiram sarcophagus inscription — a landmark of early alphabetic writing." },
      { year: -814, label: "Carthage founded", detail: "Traditional date for the Tyrian colony led by Queen Elissa (Dido)." },
      { year: -800, label: "Greeks borrow the alphabet", detail: "Greek adds vowels to the Phoenician consonant signs." },
      { year: -332, label: "Alexander takes Tyre", detail: "A seven-month siege ends the island city's independence." },
      { year: -264, label: "First Punic War", detail: "Rome and Carthage fight for Sicily; Rome builds its first real navy." },
      { year: -218, label: "Hannibal crosses the Alps", detail: "The Second Punic War brings Rome closer to defeat than any other." },
      { year: -146, label: "Carthage destroyed", detail: "Rome levels the city at the end of the Third Punic War." }
    ],
    museum: {
      see: [
        "Core-formed glass bottles and glass face-bead pendants.",
        "Carved ivory furniture plaques (often found in Assyrian palaces as loot or tribute).",
        "Stone stelae with the sign of Tanit from Carthage's tophet.",
        "Anthropoid stone sarcophagi with Egyptian-style faces.",
        "Silver and bronze coins — horses, palm trees, and the goddess Tanit.",
        "Cypro-Phoenician metal bowls with concentric engraved friezes."
      ],
      lingo: [
        { t: "Punic", d: "The Roman word for Carthaginian — Latin 'Poenus', from 'Phoenician'." },
        { t: "Tophet", d: "An open-air precinct of urn burials at Carthage and other Punic sites." },
        { t: "Suffete", d: "Carthage's elected chief magistrate, roughly a consul." },
        { t: "Murex", d: "The sea snail whose glands yield Tyrian purple." },
        { t: "Ashlar", d: "Squared masonry blocks — Phoenician harbor and wall building." }
      ],
      where: [
        "Bardo National Museum, Tunis — mosaics and Punic material from Carthage.",
        "National Museum of Beirut — the Phoenician homeland collection.",
        "British Museum — Rooms 57–59 (Levant) and the Nimrud ivories.",
        "The Met — Cypriot and Near Eastern galleries; Legion of Honor (SF) shows related ancient glass."
      ]
    }
  },

  {
    slug: "etruscans",
    name: "The Etruscans",
    emoji: "🍷",
    accent: "#be123c",
    group: "Ancient Mediterranean & Near East",
    region: "Tuscany, Umbria, and Lazio — central Italy",
    start: -900,
    end: -27,
    spanLabel: "c. 900 – 27 BCE",
    tagline: "Italy before Rome: banqueting couples, bronze mirrors, and a language we still can't fully read.",
    overview: "Before Rome ruled Italy, the Etruscans did. Their twelve-city league in Tuscany got rich on iron and copper, traded hard with Greeks and Phoenicians, and produced the most cheerful funerary art in the ancient Mediterranean — married couples reclining together at eternal banquets, painted tombs full of dancers and divers. Rome absorbed them politically but kept their engineering, their gladiatorial games, their augury, and even three of its early kings. Their language, written in a Greek-derived alphabet, is readable letter by letter but only partly understood, so much of what museums display is interpreted through Roman eyes.",
    quick: ["Central Italy's dominant culture before Rome — a league of independent cities.", "Superb bronze-workers; their alphabet became the Latin one via Rome.", "Tombs show men and women banqueting together — startling to Greek observers.", "Language written in a known alphabet but still only partly understood."],
    met: "Greek and Roman Art — the Etruscan gallery (Gallery 170) holds the monumental bronze chariot from Monteleone, one of the Met's great objects.",
    context: {
      bigPicture: "The Etruscans are the missing first act of Italian history. They mined and smelted the iron of Elba and the copper hills, sold it around the Mediterranean, and imported Greek pottery in such quantity that most Athenian vases in museums today were dug out of Etruscan tombs. Rome grew up on their edge, learned from them, then conquered them city by city between 400 and 264 BCE, granting citizenship in 90 BCE and ending them as a separate people.",
      geography: "Etruria — roughly modern Tuscany plus northern Lazio and Umbria — hills, volcanic tuff that cuts easily into chamber tombs, metal ore, and good harbors on the Tyrrhenian coast. Cities sat on defensible plateaus (Cerveteri, Tarquinia, Vulci, Veii, Orvieto), each with a vast cemetery next door, which is why we know their dead better than their living.",
      keyIdeas: [
        { t: "The twelve cities", d: "A religious league of independent city-states, not a unified kingdom." },
        { t: "Etrusca disciplina", d: "A body of ritual knowledge: reading livers, lightning, and bird flight to learn the gods' will." },
        { t: "Women in public", d: "Etruscan women were named on tombs, owned property, and dined with men — Greeks found this scandalous." },
        { t: "Bucchero", d: "Glossy black pottery, fired without oxygen, imitating metal vessels." }
      ],
      spotIt: [
        { t: "Reclining couples", d: "Terracotta sarcophagus lids with a smiling husband and wife propped on cushions." },
        { t: "Archaic smile", d: "Wide, cheerful expressions borrowed from Greek Archaic sculpture and kept longer." },
        { t: "Engraved mirrors", d: "Round bronze mirrors with mythological scenes scratched on the back — captioned in Etruscan." },
        { t: "Bucchero ware", d: "Uniformly black, almost metallic ceramics." },
        { t: "Pointed shoes", d: "Curled-toe footwear on figures, an Etruscan fashion tic." }
      ]
    },
    periods: [
      { name: "Villanovan", years: "c. 900–720 BCE", start: -900, end: -720, summary: "Iron Age villages, hut urns, and cremation.", detail: "The earliest phase, named after a site near Bologna, is known from cremation burials in biconical urns, sometimes shaped like huts or topped with helmets. Villages consolidated onto the plateaus that would become the great cities." },
      { name: "Orientalizing", years: "c. 720–575 BCE", start: -720, end: -575, summary: "Eastern luxury floods in; princely tombs of gold and ivory.", detail: "Contact with Phoenicians and Greeks brought griffins, sphinxes, ostrich eggs, and granulated goldwork. Enormous 'princely' tombs like the Regolini-Galassi at Cerveteri show a warrior aristocracy converting metal wealth into imported glamour." },
      { name: "Archaic", years: "c. 575–480 BCE", start: -575, end: -480, summary: "Peak power: painted tombs, temples, and Etruscan kings in Rome.", detail: "Cities rebuilt in stone with terracotta-clad temples; Tarquinia's tombs were painted with banquets, dancing, and diving. Etruscan kings — the Tarquins — ruled Rome until about 509 BCE. Etruscan fleets contested the sea with Greeks and Carthaginians." },
      { name: "Classical & Roman", years: "c. 480–27 BCE", start: -480, end: -27, summary: "Rome swallows Etruria city by city.", detail: "Defeat at Cumae (474 BCE) broke Etruscan sea power, and Rome took Veii in 396 BCE after a long siege. Later tomb painting turns darker — demons, journeys to the underworld. Full Roman citizenship in 90 BCE completed the assimilation; by Augustus's day Etruscan was a priestly antiquarian language." }
    ],
    events: [
      { year: -900, label: "Villanovan culture", detail: "Iron Age roots of Etruscan civilization in central Italy." },
      { year: -700, label: "Orientalizing boom", detail: "Princely tombs filled with gold, ivory, and eastern imports." },
      { year: -616, label: "Tarquinius Priscus", detail: "Traditional date for the first Etruscan king of Rome." },
      { year: -540, label: "Battle of Alalia", detail: "Etruscans and Carthaginians check Greek expansion off Corsica." },
      { year: -509, label: "Rome expels its kings", detail: "The Tarquins are thrown out; the Roman Republic begins." },
      { year: -396, label: "Fall of Veii", detail: "Rome captures its nearest Etruscan rival after a decade-long siege." },
      { year: -90, label: "Roman citizenship", detail: "The Social War settlement absorbs Etruscans into Rome." }
    ],
    museum: {
      see: [
        "Terracotta sarcophagi and cinerary urns with reclining figures on the lid.",
        "Bronze mirrors engraved with myth scenes on the back.",
        "Bucchero pottery — shiny black cups, jugs, and bowls.",
        "Votive bronzes: elongated figurines, and anatomical body parts offered at sanctuaries.",
        "Greek vases excavated from Etruscan tombs (most Athenian pots in museums came from Etruria).",
        "Gold jewelry with granulation — thousands of tiny soldered gold spheres."
      ],
      lingo: [
        { t: "Bucchero", d: "Etruscan glossy black ceramic." },
        { t: "Haruspex", d: "A priest who read the future in a sacrificed animal's liver." },
        { t: "Cinerary urn", d: "A container for cremated remains, often sculpted like a small sarcophagus." },
        { t: "Tumulus", d: "A round earth mound covering one or more rock-cut chamber tombs." },
        { t: "Antefix", d: "A decorated terracotta tile end that closes the edge of a temple roof." }
      ],
      where: [
        "Museo Nazionale Etrusco di Villa Giulia, Rome — the reference collection.",
        "The Met — Gallery 170 and the Monteleone chariot.",
        "Vatican Museums — Museo Gregoriano Etrusco.",
        "Legion of Honor (SF) — Etruscan and Italic pieces in the Ancient Art galleries."
      ]
    }
  },

  {
    slug: "saba",
    name: "Saba & Ancient Yemen",
    emoji: "🌿",
    accent: "#0f766e",
    group: "Ancient Mediterranean & Near East",
    region: "South Arabia — modern Yemen",
    start: -1000,
    end: 570,
    spanLabel: "c. 1000 BCE – 570 CE",
    tagline: "The incense kingdoms of South Arabia — Sheba's homeland, a great dam, and alabaster faces that stare straight through you.",
    overview: "Ancient Yemen was 'Arabia Felix,' the fortunate Arabia: a chain of kingdoms — Saba, Ma'in, Qataban, Hadramawt, Himyar — that grew rich because frankincense and myrrh only grow there and in Somalia, and the whole classical world burned them by the ton. Saba built the Great Dam of Marib, irrigated an oasis the size of a small country, and left the queen who visits Solomon in the Bible and Qur'an. Its art is instantly recognisable: pale alabaster heads with inlaid eyes, bronze bulls and ibexes, and crisp monumental South Arabian script.",
    quick: ["South Arabian kingdoms rich from frankincense and myrrh (c. 1000 BCE – 570 CE).", "Saba's capital Marib had a great dam that irrigated a huge oasis for 1,000+ years.", "The Queen of Sheba tradition comes from here (Sheba = Saba).", "Signature look: alabaster faces with inlaid eyes, bronze ibexes, geometric script."],
    met: "Ancient Near Eastern Art — Galleries 400–406. South Arabian alabaster heads and inscribed stelae are displayed with the wider Arabian and Near Eastern material.",
    context: {
      bigPicture: "South Arabia was the far end of the incense road: caravans of camels moved resin north through Arabia to Gaza and Petra, and everyone along the route taxed it. That wealth financed monumental temples, hydraulic engineering, and literate bureaucracies whose inscriptions we can still read. When Rome learned to sail the monsoon to India, and Christianity reduced demand for temple incense, the overland economy weakened; Himyar unified the south, converted to Judaism, then fell to Aksumite and Persian intervention shortly before Islam.",
      geography: "Mountains and highland valleys catching monsoon rain on the edge of the Empty Quarter. Seasonal floods were captured by dams and sluices — most famously at Marib — to irrigate oases. Frankincense trees grow in the arid Dhofar–Hadramawt belt; ports on the Red Sea and Indian Ocean connected the region to Egypt, Africa, and India.",
      keyIdeas: [
        { t: "Incense economy", d: "Frankincense and myrrh were burned in every temple from Egypt to Rome — and grew almost nowhere else." },
        { t: "Marib Dam", d: "A sluice-and-embankment system, maintained for over a millennium; its final failure (c. 570 CE) became a proverb for lost prosperity." },
        { t: "Musnad script", d: "The angular South Arabian alphabet, carved with almost typographic precision — ancestor of Ge'ez letters in Ethiopia." },
        { t: "Almaqah", d: "Saba's chief god, associated with the moon and bulls; the temple Awwam at Marib was his." }
      ],
      spotIt: [
        { t: "Alabaster heads", d: "Stylised faces in translucent calcite, eyes originally inlaid with lapis, shell, or paste." },
        { t: "Bull friezes", d: "Rows of bull heads or ibex, symbols of Almaqah and of fertility." },
        { t: "Musnad inscriptions", d: "Neat geometric letters, often boustrophedon, on stelae and building blocks." },
        { t: "Bronze ibex plaques", d: "Curved-horn ibexes, sometimes as dedicatory or votive plaques." },
        { t: "Funerary stelae", d: "Small rectangular slabs with a schematic face and the deceased's name." }
      ]
    },
    periods: [
      { name: "Early Saba", years: "c. 1000–400 BCE", start: -1000, end: -400, summary: "Mukarribs of Saba, the Marib dam, and the incense road.", detail: "Rulers titled mukarrib (priest-king) built the Awwam temple and the Marib dam, and pushed caravan routes north. This is the horizon behind the Queen of Sheba story — a South Arabian ruler wealthy enough to make a spectacular diplomatic gift to a distant king." },
      { name: "Rival kingdoms", years: "c. 400 BCE – 100 CE", start: -400, end: 100, summary: "Ma'in, Qataban, and Hadramawt compete for the trade.", detail: "Power fragmented among neighbouring kingdoms, each controlling a stretch of the incense route and its own oasis system. Greek and Roman authors describe the region with a mix of accuracy and fantasy; a Roman expedition under Aelius Gallus in 26–25 BCE failed disastrously in the desert." },
      { name: "Himyar", years: "c. 100–525 CE", start: 100, end: 525, summary: "Unification, then a Jewish kingdom in Arabia.", detail: "Himyar absorbed Saba and ruled from Zafar. Its kings adopted monotheism, and by the early 6th century the ruling house was Jewish. The persecution of Christians at Najran triggered an invasion by Christian Aksum from across the Red Sea." },
      { name: "Aksumite & Persian rule", years: "525–570 CE", start: 525, end: 570, summary: "Foreign rule; the dam fails; Islam is a generation away.", detail: "Aksum installed a Christian viceroy, later displaced by the Sasanian Persians. The Marib dam's final breach, remembered in the Qur'an as a judgment on ingratitude, marks the end of the ancient irrigation economy — and the beginning of the world into which Muhammad was born, c. 570 CE." }
    ],
    events: [
      { year: -800, label: "Marib dam built", detail: "Sabaean engineers dam the Wadi Dhana, irrigating a vast oasis." },
      { year: -700, label: "Karib'il Watar", detail: "A Sabaean ruler whose campaigns are recorded in long musnad inscriptions." },
      { year: -25, label: "Roman expedition fails", detail: "Aelius Gallus marches on Arabia Felix for Augustus and turns back broken." },
      { year: 275, label: "Himyar unifies the south", detail: "Himyarite kings absorb Saba and rule most of Yemen." },
      { year: 380, label: "Monotheism adopted", detail: "Himyarite inscriptions shift from many gods to 'the Merciful, Lord of Heaven'." },
      { year: 525, label: "Aksum invades", detail: "Christian Aksum crosses the Red Sea and ends Himyarite independence." },
      { year: 570, label: "The dam fails", detail: "The Marib dam breaks for the last time; the oasis economy collapses." }
    ],
    museum: {
      see: [
        "Alabaster (calcite) heads and funerary stelae with stylised faces.",
        "Inscribed stone blocks and votive plaques in musnad script.",
        "Bronze statuettes and ibex or bull heads.",
        "Incense burners — cuboid altars with stepped tops.",
        "Seal stones and small jewelry from caravan-city sites."
      ],
      lingo: [
        { t: "Saba / Sheba", d: "Same kingdom; 'Sheba' is the Biblical Hebrew form." },
        { t: "Mukarrib", d: "A South Arabian priest-king title, above 'malik' (king)." },
        { t: "Musnad", d: "The monumental South Arabian alphabet." },
        { t: "Arabia Felix", d: "'Fortunate Arabia' — the Roman name for the fertile, incense-rich south." },
        { t: "Frankincense", d: "Aromatic resin tapped from Boswellia trees; myrrh comes from Commiphora." }
      ],
      where: [
        "British Museum — Room 53, Ancient South Arabia.",
        "The Met — Ancient Near Eastern Art galleries.",
        "Louvre — Near Eastern antiquities (Yemeni alabasters).",
        "Walters Art Museum, Baltimore; Smithsonian NMNH loans and Yemeni collections."
      ]
    }
  },

  {
    slug: "aksum",
    name: "Aksum",
    emoji: "🗿",
    accent: "#047857",
    group: "Africa",
    region: "Northern Ethiopia and Eritrea",
    start: -100,
    end: 940,
    spanLabel: "c. 100 BCE – 940 CE",
    tagline: "An African empire that minted its own gold coins, carved the tallest standing stones on earth, and became Christian before Rome finished the job.",
    overview: "Aksum sat where the Red Sea trade met the Ethiopian highlands, and for six centuries it was one of the great powers of the ancient world — a 3rd-century Persian writer ranked it with Rome, Persia, and China. It struck gold, silver, and bronze coins in its own name, carved granite stelae up to 33 meters tall over royal tombs, and converted to Christianity under King Ezana around 340 CE, founding the church that still shapes Ethiopia. When Islam rose and trade shifted, Aksum declined but never disappeared: its successors built the rock-hewn churches of Lalibela and kept Ge'ez as a liturgical language.",
    quick: ["Red Sea trading empire in highland Ethiopia and Eritrea.", "One of the first states anywhere to adopt Christianity (c. 340 CE, King Ezana).", "Minted its own gold coinage — rare outside Rome, Persia, and India.", "Carved giant granite stelae as tomb markers; the tallest ever raised anywhere."],
    met: "Not a strength of the Met's collection; Aksumite coins occasionally appear in the numismatic and Byzantine displays. The Smithsonian's African Art museum and the British Museum show more.",
    context: {
      bigPicture: "Aksum was a bridge state. Ivory, gold, incense, and enslaved people moved from inland Africa through the port of Adulis to Rome, Arabia, and India; the empire took a cut and issued coins to lubricate it. Its Christianity came via Syrian merchants and imperial contacts, giving Ethiopia a Christian identity older than most of Europe's. Aksum also intervened across the Red Sea in Yemen, and its script, Ge'ez, developed vowels and became the writing system of Ethiopia and Eritrea today.",
      geography: "High plateau (2,000+ m) with reliable rains, cut by escarpments, above the Red Sea coast. The port of Adulis linked highland Aksum to Indian Ocean shipping; the Nile corridor and the Sudanese lowlands linked it to Meroë, which Aksum eclipsed around 350 CE.",
      keyIdeas: [
        { t: "Ezana's conversion", d: "Coins show the switch: pagan disc-and-crescent gives way to the cross, c. 340 CE." },
        { t: "Ge'ez", d: "The Aksumite language and script — a South Semitic alphabet that added vowel marks; still liturgical." },
        { t: "Stelae as tomb markers", d: "Carved granite monoliths imitating multi-storey buildings, with false doors and windows." },
        { t: "The Ark tradition", d: "Ethiopian tradition holds that the Ark of the Covenant rests at Aksum's church of Maryam Tsion." }
      ],
      spotIt: [
        { t: "Aksumite coins", d: "Small gold or bronze coins with a crowned bust, Greek or Ge'ez legends, and often a cross." },
        { t: "False-storey stelae", d: "Stone monoliths carved with rows of beam-ends and doors, imitating timber-and-stone palaces." },
        { t: "Monkey-head beams", d: "Round projecting beam ends in Aksumite architecture — copied in later Ethiopian churches." },
        { t: "Processional crosses", d: "Later Ethiopian crosses with interlaced openwork, descended from Aksumite forms." }
      ]
    },
    periods: [
      { name: "Pre-Aksumite & rise", years: "c. 400 BCE – 100 CE", start: -400, end: 100, summary: "Highland states with South Arabian links coalesce.", detail: "The earlier D'mt polity and its temples (Yeha) show strong South Arabian contact — musnad-style inscriptions, altars, and ibex motifs — atop an indigenous highland culture. By the 1st century CE, Aksum is named as a kingdom in Greek trade manuals." },
      { name: "Imperial Aksum", years: "c. 100–350 CE", start: 100, end: 350, summary: "Coinage, stelae, and control of the Red Sea trade.", detail: "Kings issued coins in three metals and raised the great stelae over elite tombs. Adulis became a major Indian Ocean port. Around 350 CE, Ezana's forces campaigned against Meroë, hastening the end of the Kushite kingdom." },
      { name: "Christian Aksum", years: "c. 350–630 CE", start: 350, end: 630, summary: "Conversion, church building, and intervention in Yemen.", detail: "After Ezana's conversion, church building replaced stele raising. In 525 CE Kaleb invaded Himyarite Yemen. Early Muslims fleeing Mecca were given refuge in Aksum, a fact that shaped later Muslim–Ethiopian relations." },
      { name: "Decline & successors", years: "c. 630–940 CE", start: 630, end: 940, summary: "Trade shifts, the capital moves south, Lalibela follows.", detail: "As Islamic powers took over Red Sea trade and local soils were exhausted, Aksum shrank. The state's center moved south; the Zagwe dynasty later carved the rock churches of Lalibela, and the Solomonic dynasty from 1270 CE claimed descent from Solomon and Sheba." }
    ],
    events: [
      { year: 50, label: "Adulis in the trade guides", detail: "The Periplus of the Erythraean Sea describes Aksum's port and its ivory exports." },
      { year: 270, label: "First coinage", detail: "Aksum begins minting gold coins — a rare mark of great-power status." },
      { year: 340, label: "Ezana converts", detail: "Christianity becomes the state religion; crosses appear on the coinage." },
      { year: 350, label: "Meroë eclipsed", detail: "Aksumite campaigns help end the Kushite kingdom to the northwest." },
      { year: 525, label: "Invasion of Yemen", detail: "King Kaleb crosses the Red Sea against Himyar." },
      { year: 615, label: "Refuge for early Muslims", detail: "The Aksumite king shelters followers of Muhammad fleeing Mecca." },
      { year: 940, label: "Decline", detail: "Traditional date for the fall of the Aksumite state; the center shifts south." }
    ],
    museum: {
      see: [
        "Aksumite gold, silver, and bronze coins with royal busts and crosses.",
        "Ge'ez inscriptions on stone.",
        "Later Ethiopian processional and hand crosses, and painted icons in the Aksumite tradition.",
        "Illuminated Ge'ez gospel manuscripts on parchment.",
        "Photographs and casts of the Aksum stelae field (the monoliths remain in Ethiopia)."
      ],
      lingo: [
        { t: "Ge'ez", d: "Classical Ethiopian language and script; still the liturgical language." },
        { t: "Stele", d: "A standing carved monolith — here, a tomb marker rather than an inscribed slab." },
        { t: "Adulis", d: "Aksum's Red Sea port, on the coast of modern Eritrea." },
        { t: "Negus", d: "Ethiopian title for king; 'negusa nagast' = king of kings." },
        { t: "Zagwe", d: "The dynasty after Aksum that built the rock-hewn churches of Lalibela." }
      ],
      where: [
        "National Museum of Ethiopia, Addis Ababa; the stelae field at Aksum itself.",
        "British Museum — Room 65 (Sudan, Egypt and Nubia) and Ethiopian collections.",
        "Smithsonian National Museum of African Art — Ethiopian Christian art.",
        "Walters Art Museum, Baltimore — outstanding Ethiopian icons and crosses."
      ]
    }
  },

  {
    slug: "chola",
    name: "The Chola Empire",
    emoji: "🕺",
    accent: "#b45309",
    group: "Asia",
    region: "Tamil Nadu, South India",
    start: 848,
    end: 1279,
    spanLabel: "848 – 1279 CE",
    tagline: "South India's maritime empire — granite temples the size of hills and the finest bronze sculpture ever cast.",
    overview: "The Cholas ruled the Tamil country for four centuries and did two things no one else quite matched: they built enormous granite temples (the Brihadisvara at Thanjavur, finished in 1010 CE, is still one of the largest in India), and they perfected lost-wax bronze casting to produce processional images of Shiva, Parvati, and the saints that are among the most admired sculptures in world art. They also sent fleets across the Bay of Bengal, raided Srivijaya in Sumatra, and traded with Song China. The dancing Shiva — Nataraja, in a ring of flame — is a Chola invention in the form the world knows.",
    quick: ["Tamil dynasty ruling South India 848–1279 CE, capital at Thanjavur.", "Brihadisvara temple (1010 CE) — a granite mountain built with no mortar.", "World-class lost-wax bronzes: Nataraja, Shiva, Parvati, and the Shaiva saints.", "A naval power: raided Srivijaya (1025 CE) and traded with Song China."],
    met: "Asian Art, South Asian galleries (Galleries 234–241). Chola bronzes — including a celebrated Shiva Nataraja — are a highlight; the Asian Art Museum in SF and the Norton Simon also hold major examples.",
    context: {
      bigPicture: "Chola power rested on the fertile Kaveri delta, an efficient system of local village assemblies and temple-centered economies, and command of Indian Ocean sea lanes. Temples were not only religious: they were landowners, banks, employers, and archives, and their walls carry thousands of inscriptions recording grants, disputes, and assembly elections. That is why so much of what we know about ordinary medieval South Indian life comes from temple walls.",
      geography: "The Kaveri river delta in Tamil Nadu — rich rice country — with the Coromandel coast facing Southeast Asia. Sea routes ran east to Sumatra and China and west to Arabia. The dry interior and the Western Ghats mark the boundaries with Chalukya, Pandya, and Chera rivals.",
      keyIdeas: [
        { t: "Bhakti", d: "Devotional Hinduism: personal love of a god, sung by Tamil poet-saints whose hymns the Cholas canonised." },
        { t: "Nataraja", d: "Shiva as Lord of the Dance — creation, preservation, destruction, concealment, and grace in one figure." },
        { t: "Utsava-murti", d: "The 'festival image': a bronze made to be carried in procession, hence hollow-cast, portable, and eye-catching." },
        { t: "Temple as institution", d: "Temples held land, employed hundreds, made loans, and recorded it all in stone inscriptions." }
      ],
      spotIt: [
        { t: "Ring of flame", d: "Nataraja dances inside a circle of fire (prabhavali), on the dwarf of ignorance." },
        { t: "Lugs and holes", d: "Bronze bases have holes or rings for the poles used to carry them in procession — a giveaway that it's a festival image." },
        { t: "Tribhanga pose", d: "The elegant triple-bend stance of the body — hip, waist, and neck each offset." },
        { t: "Vimana tower", d: "In South Indian temples the tallest tower rises over the sanctum, not the gateway (that's a later gopuram)." }
      ]
    },
    periods: [
      { name: "Rise", years: "848–985 CE", start: 848, end: 985, summary: "Vijayalaya takes Thanjavur; the dynasty rebuilds.", detail: "Vijayalaya Chola captured Thanjavur around 848 CE, reviving an ancient Tamil dynastic name. His successors fought the Pandyas and the Rashtrakutas; Sembiyan Mahadevi, a queen and great patron, commissioned stone temples and bronzes that set the classic style." },
      { name: "Imperial Cholas", years: "985–1070 CE", start: 985, end: 1070, summary: "Rajaraja I and Rajendra I — temples, conquests, and a naval raid on Sumatra.", detail: "Rajaraja I (r. 985–1014) built the Brihadisvara temple and conquered Sri Lanka and the Maldives. His son Rajendra I marched north to the Ganges, took the title Gangaikonda, founded a new capital, and in 1025 CE launched a seaborne raid across the Bay of Bengal against Srivijaya's ports — the most ambitious naval operation of medieval India." },
      { name: "Later Cholas", years: "1070–1279 CE", start: 1070, end: 1279, summary: "Wealth, embassies to China, then slow decline.", detail: "Kulottunga I merged Chola and Eastern Chalukya lines and sent embassies to Song China. Temple building continued at Darasuram and Tribhuvanam. From the late 12th century Pandya and Hoysala pressure grew; the last Chola king was overthrown in 1279 CE." }
    ],
    events: [
      { year: 848, label: "Vijayalaya takes Thanjavur", detail: "The Chola dynasty re-emerges as a regional power." },
      { year: 985, label: "Rajaraja I", detail: "The greatest Chola ruler takes the throne; conquest and temple building follow." },
      { year: 1010, label: "Brihadisvara temple", detail: "The great granite temple at Thanjavur is completed — a UNESCO site today." },
      { year: 1025, label: "Raid on Srivijaya", detail: "Rajendra I's fleet crosses the Bay of Bengal and strikes Sumatran ports." },
      { year: 1077, label: "Embassy to China", detail: "A Chola mission reaches the Song court — 72 merchants strong, by Chinese record." },
      { year: 1279, label: "End of the dynasty", detail: "The Pandyas overthrow the last Chola king." }
    ],
    museum: {
      see: [
        "Bronze Shiva Nataraja, Parvati/Uma, Vishnu, and Shaiva saints — the signature objects.",
        "Granite temple sculpture: dvarapala guardians, dancing figures, and deity niches.",
        "Copper-plate charters and inscription rubbings recording temple grants.",
        "Chola coins with tiger, bow, and fish emblems (the three Tamil dynasties combined).",
        "Ritual lamps, bells, and processional fittings."
      ],
      lingo: [
        { t: "Nataraja", d: "Shiva as Lord of the Dance." },
        { t: "Lost-wax casting", d: "A wax model is encased in clay, melted out, and replaced by molten bronze — one cast, no copies." },
        { t: "Vimana", d: "The tower over a South Indian temple's sanctum." },
        { t: "Gopuram", d: "The huge gateway tower — mostly later than the Cholas, added by the Pandyas and Nayakas." },
        { t: "Prabhavali", d: "The flaming arch surrounding a bronze deity." },
        { t: "Utsava-murti", d: "Portable festival image, as opposed to the fixed stone image in the sanctum." }
      ],
      where: [
        "Government Museum, Chennai — the world's great Chola bronze collection.",
        "The Met — South Asian galleries.",
        "Asian Art Museum, San Francisco — South Asia gallery.",
        "Norton Simon Museum, Pasadena — outstanding South Indian bronzes."
      ]
    }
  },

  {
    slug: "srivijaya",
    name: "Srivijaya & Majapahit",
    emoji: "🌊",
    accent: "#0369a1",
    group: "Asia",
    region: "Sumatra, Java, and the Malacca Strait",
    start: 650,
    end: 1527,
    spanLabel: "c. 650 – 1527 CE",
    tagline: "Maritime Southeast Asia's great powers — a Buddhist trade thalassocracy, then a Javanese empire of a thousand islands.",
    overview: "Two successive maritime powers dominated island Southeast Asia. Srivijaya, based near Palembang in Sumatra from the 7th century, controlled the Malacca and Sunda straits — the choke points of the China–India trade — and was a famous center of Buddhist learning where Chinese monks stopped to study Sanskrit. Later, Majapahit in eastern Java (1293–c. 1527) built a Hindu-Buddhist empire that claimed influence across the archipelago and is still invoked in Indonesian national memory. Central Java between them produced Borobudur and Prambanan, two of the largest religious monuments on earth.",
    quick: ["Srivijaya (c. 650–1275): Sumatran sea power controlling the Malacca Strait.", "A major Buddhist study center — Chinese pilgrims stopped there en route to India.", "Central Java built Borobudur (c. 800 CE) and Prambanan (c. 850 CE).", "Majapahit (1293–c. 1527): the Javanese empire that later Indonesia looks back to."],
    met: "Asian Art — Southeast Asian galleries (near Gallery 249). Javanese bronzes, gold, and stone sculpture are shown alongside Khmer material.",
    context: {
      bigPicture: "This is trade-route history: monsoon winds meant ships had to wait months in port, so whoever controlled the good harbours controlled the wealth. Srivijaya taxed and protected that traffic, and used Buddhism as a diplomatic language with China and India. Majapahit's power was different — an agrarian Javanese core (rice, not just tolls) projecting influence outward through tribute and marriage. Both were displaced as Islam spread through the trading ports from the 13th century onward, though Bali kept the Hindu-Javanese tradition alive.",
      geography: "Straits and volcanoes. The Malacca Strait is the only efficient sea route between the Indian Ocean and the South China Sea; Sumatra and the Malay Peninsula flank it. Java's volcanic soil is extraordinarily fertile, supporting the dense rice population that made a land empire possible there but not in Sumatra.",
      keyIdeas: [
        { t: "Thalassocracy", d: "An empire of sea lanes and ports rather than territory — Srivijaya's model." },
        { t: "Mandala polity", d: "Power radiating from a center and fading with distance, with shifting allegiances rather than fixed borders." },
        { t: "Mahayana & Vajrayana Buddhism", d: "Srivijaya and the Shailendras of Java patronised Mahayana; Borobudur is a Buddhist cosmos in stone." },
        { t: "Hindu-Buddhist syncretism", d: "Javanese kings were identified with both Shiva and the Buddha; Majapahit's court poetry treats them as one order." }
      ],
      spotIt: [
        { t: "Borobudur reliefs", d: "Terraced narrative panels leading pilgrims upward, ending in bell-shaped stupas with hidden Buddhas." },
        { t: "Candi", d: "The Indonesian word for a temple — stepped stone structures with steep roofs, e.g. Prambanan's Shiva tower." },
        { t: "Javanese bronzes", d: "Small, sharply detailed Buddhist and Hindu figures, often with elaborate backplates." },
        { t: "Kris", d: "The wavy-bladed Javanese dagger with pattern-welded metal — later, but a signature of the region." },
        { t: "Gold repoussé", d: "Thin sheet-gold ornaments, rings, and ear ornaments from Javanese hoards." }
      ]
    },
    periods: [
      { name: "Srivijaya", years: "c. 650–1275 CE", start: 650, end: 1275, summary: "Sumatran sea power and Buddhist study center.", detail: "First attested in Old Malay inscriptions of the 680s CE around Palembang. The Chinese monk Yijing spent years there studying Sanskrit before going on to India. Srivijaya's fleets policed and taxed the straits until Chola raids in 1025 CE and later Javanese and Thai pressure broke its monopoly." },
      { name: "Central Javanese", years: "c. 732–930 CE", start: 732, end: 930, summary: "Borobudur and Prambanan; the classical age of Javanese stone.", detail: "The Buddhist Shailendra and Hindu Sanjaya lines built on the Kedu plain: Borobudur, a stepped mandala carrying 2,672 relief panels, around 800 CE, and the Shiva temples of Prambanan around 850 CE. The court then moved east, for reasons still debated (eruption, disease, politics)." },
      { name: "East Java & Majapahit", years: "1293–1527 CE", start: 1293, end: 1527, summary: "A Javanese empire with archipelago-wide claims.", detail: "Majapahit was founded in 1293 after a Mongol invasion fleet was outmanoeuvred. Under Hayam Wuruk and his minister Gajah Mada it claimed authority over much of today's Indonesia and Malaysia. The court poem Nagarakretagama (1365) lists its dependencies. Decline came with succession wars and the rise of Muslim coastal sultanates such as Demak." }
    ],
    events: [
      { year: 671, label: "Yijing stops at Srivijaya", detail: "The Chinese pilgrim studies Sanskrit in Palembang en route to India." },
      { year: 800, label: "Borobudur", detail: "The vast Buddhist monument on the Kedu plain in central Java." },
      { year: 850, label: "Prambanan", detail: "The great Shiva temple complex is built nearby." },
      { year: 1025, label: "Chola raid", detail: "South Indian fleets strike Srivijayan ports, weakening the monopoly." },
      { year: 1293, label: "Majapahit founded", detail: "Raden Wijaya turns a Mongol invasion to his advantage and founds the empire." },
      { year: 1365, label: "Nagarakretagama", detail: "A court poem catalogues Majapahit's territories and rituals." },
      { year: 1527, label: "Majapahit ends", detail: "Demak and other Muslim sultanates absorb the last Majapahit remnants." }
    ],
    museum: {
      see: [
        "Javanese bronze Buddhas, bodhisattvas, and Hindu deities.",
        "Volcanic stone sculpture from candi temples — Ganesha, Durga, guardian figures.",
        "Gold jewelry and repoussé ornaments from Javanese hoards.",
        "Ceramics: Chinese trade wares found across the archipelago, plus local earthenware.",
        "Kris daggers with pattern-welded blades and carved hilts (later periods)."
      ],
      lingo: [
        { t: "Candi", d: "A temple or shrine structure in Indonesia." },
        { t: "Stupa", d: "A domed Buddhist reliquary form; Borobudur's terraces are ringed with them." },
        { t: "Shailendra", d: "The Buddhist dynasty associated with Borobudur." },
        { t: "Mandala", d: "A cosmic diagram — and, in politics, a center-out model of power." },
        { t: "Kala head", d: "The bulging-eyed monster mask over Javanese temple doorways." }
      ],
      where: [
        "National Museum of Indonesia, Jakarta; Borobudur and Prambanan themselves.",
        "The Met — Southeast Asian galleries.",
        "Asian Art Museum, San Francisco — Southeast Asia gallery.",
        "Rijksmuseum and the Wereldmuseum, Netherlands — large Javanese collections."
      ]
    }
  },

  {
    slug: "mughal",
    name: "The Mughal Empire",
    emoji: "🕌",
    accent: "#065f46",
    group: "Asia",
    region: "The Indian subcontinent",
    start: 1526,
    end: 1857,
    spanLabel: "1526 – 1857 CE",
    tagline: "Persianate emperors of India — miniature painting, inlaid marble, and the Taj Mahal.",
    overview: "The Mughals were Central Asian Timurids who conquered northern India in 1526 and built one of the richest states in the early modern world — at its height perhaps a quarter of the global economy. Their court fused Persian, Central Asian, and Indian traditions into a distinctive style: jewel-toned miniature paintings, white marble inlaid with hardstone flowers, formal charbagh gardens, and the Taj Mahal. Akbar's experiments in religious tolerance and Aurangzeb's reversal of them still frame arguments about Indian history. British power hollowed the empire out through the 18th century; the last emperor was deposed in 1857.",
    quick: ["Founded 1526 by Babur, a Timurid prince from Central Asia.", "Persianate court culture fused with Indian traditions — painting, gardens, architecture.", "The Taj Mahal (1632–53) was built by Shah Jahan for Mumtaz Mahal.", "Hollowed out by the 18th century; formally ended by the British in 1857."],
    met: "Islamic Art — Galleries 450–464, including the Later South Asia galleries. Look for Mughal jades, arms, carpets, and album paintings.",
    context: {
      bigPicture: "The Mughals ran a cash-revenue empire: land was assessed and taxed in money, officials (mansabdars) were ranked by number and paid from assigned revenues, and the whole machine funded an enormous court and army. Culturally they were confident synthesisers — Akbar had the Sanskrit epics translated into Persian and debated theologians of every faith; Jahangir collected European prints and had his artists absorb their techniques. That openness varied by ruler and is a live historical argument.",
      geography: "The Indo-Gangetic plain, with capitals shifting between Agra, Delhi, Fatehpur Sikri, and Lahore. Kashmir provided the mountain retreat and garden ideal; the Deccan was the endless southern war that drained the treasury; Bengal was the richest province, which is why Europeans went there first.",
      keyIdeas: [
        { t: "Charbagh", d: "The fourfold Persian garden divided by watercourses — paradise as a plan; the Taj sits in one." },
        { t: "Mansabdari", d: "A ranked service nobility, paid through revenue assignments rather than hereditary fiefs." },
        { t: "Sulh-i kul", d: "'Universal peace' — Akbar's policy of tolerance across religious communities." },
        { t: "The album (muraqqa)", d: "Paintings and calligraphy mounted with decorated borders and bound — the main format for court painting." }
      ],
      spotIt: [
        { t: "Pietra dura (parchin kari)", d: "Flowers of carnelian, jasper, and lapis inlaid into white marble." },
        { t: "Naturalistic flowers", d: "Single flowering plants in niches or borders — a Shah Jahan-era signature." },
        { t: "Jali screens", d: "Pierced stone lattices casting geometric shadows." },
        { t: "Portrait profiles", d: "Emperors shown in strict profile with a halo, holding a jewel or a flower." },
        { t: "Jade and hardstone", d: "Pale nephrite jade hilts, cups, and boxes — often with floral carving." }
      ]
    },
    periods: [
      { name: "Foundation", years: "1526–1556", start: 1526, end: 1556, summary: "Babur wins at Panipat; Humayun loses and regains the throne.", detail: "Babur, descended from Timur and Genghis Khan, defeated the Delhi Sultanate at Panipat in 1526 with artillery and mobile cavalry. His son Humayun lost India to Sher Shah Suri, spent years exiled in Safavid Persia — where he recruited the painters who would seed Mughal art — and returned in 1555, dying a year later." },
      { name: "Akbar", years: "1556–1605", start: 1556, end: 1605, summary: "The empire is built: administration, alliance, and tolerance.", detail: "Akbar came to the throne at 13 and expanded the empire across northern India, allying with Rajput houses through marriage and service. He abolished the jizya tax on non-Muslims, hosted interfaith debates, built Fatehpur Sikri, and — though illiterate — assembled a great library and a painting workshop that illustrated histories and epics at industrial scale." },
      { name: "Jahangir & Shah Jahan", years: "1605–1658", start: 1605, end: 1658, summary: "The aesthetic peak: painting, jade, and white marble.", detail: "Jahangir was a connoisseur who prized naturalism — his artists painted birds, animals, and portraits with startling precision. Nur Jahan, his empress, wielded real political power. Shah Jahan turned to architecture: the Taj Mahal (1632–53), the Red Fort, and the Peacock Throne. The style hardens into symmetry, marble, and inlaid flowers." },
      { name: "Aurangzeb & decline", years: "1658–1857", start: 1658, end: 1857, summary: "Overreach in the Deccan, then fragmentation and British rule.", detail: "Aurangzeb seized power from his brothers, reimposed the jizya, and spent decades campaigning in the Deccan against the Marathas — expanding the map while exhausting the treasury. After 1707 the empire fragmented into effectively independent successor states; Nadir Shah sacked Delhi in 1739. The British East India Company became the real power after Plassey (1757), and Bahadur Shah II was exiled in 1858 after the 1857 uprising." }
    ],
    events: [
      { year: 1526, label: "First Battle of Panipat", detail: "Babur defeats the Delhi Sultanate and founds the empire." },
      { year: 1556, label: "Akbar's accession", detail: "A 13-year-old inherits a fragile state and turns it into an empire." },
      { year: 1571, label: "Fatehpur Sikri", detail: "Akbar builds a new red sandstone capital — abandoned within 15 years." },
      { year: 1632, label: "Taj Mahal begun", detail: "Shah Jahan's tomb for Mumtaz Mahal; largely complete by 1653." },
      { year: 1658, label: "Aurangzeb takes power", detail: "He imprisons Shah Jahan and rules for nearly 50 years." },
      { year: 1739, label: "Nadir Shah sacks Delhi", detail: "The Peacock Throne and the Koh-i-Noor leave India." },
      { year: 1857, label: "The last emperor", detail: "Bahadur Shah II is deposed after the Indian Rebellion; the empire formally ends." }
    ],
    museum: {
      see: [
        "Album paintings and manuscript folios — court scenes, portraits, natural history studies.",
        "White nephrite jade cups, dagger hilts, and boxes.",
        "Inlaid marble panels and architectural fragments (pietra dura flowers).",
        "Arms and armour: watered-steel blades, jewelled hilts, and shields.",
        "Carpets and textiles, including floral millefleurs designs.",
        "Jewelry: enamelled gold (meenakari) and kundan-set gemstones."
      ],
      lingo: [
        { t: "Mughal", d: "From 'Mongol', via Persian — though the dynasty saw itself as Timurid." },
        { t: "Parchin kari", d: "The Mughal term for hardstone inlay (Italian: pietra dura)." },
        { t: "Muraqqa", d: "An album of paintings and calligraphy." },
        { t: "Jali", d: "A pierced stone lattice screen." },
        { t: "Nastaliq", d: "The flowing Persian calligraphic script used at court." },
        { t: "Jizya", d: "A tax on non-Muslim subjects — abolished by Akbar, reimposed by Aurangzeb." }
      ],
      where: [
        "The Met — Islamic Art, Galleries 450–464.",
        "Victoria and Albert Museum, London — Mughal jades, Tipu's Tiger, and textiles.",
        "Asian Art Museum, San Francisco — South Asian and Islamic galleries.",
        "Smithsonian National Museum of Asian Art (Freer|Sackler) — Mughal paintings."
      ]
    }
  },

  {
    slug: "ottoman",
    name: "The Ottoman Empire",
    emoji: "🌙",
    accent: "#b91c1c",
    group: "Medieval world",
    region: "Anatolia, the Balkans, the Levant, and North Africa",
    start: 1299,
    end: 1922,
    spanLabel: "c. 1299 – 1922 CE",
    tagline: "Six centuries from a frontier principality to a world empire — Iznik blue, domed mosques, and the end of Byzantium.",
    overview: "The Ottomans began as one of many small Turkish frontier states in northwest Anatolia and ended as the longest-lived empire of the modern era, ruling from Budapest to Basra. Mehmed II took Constantinople in 1453; Suleiman the Magnificent's architect Sinan built the domed mosques that define the Istanbul skyline; the court workshops produced Iznik pottery, silk kaftans, and the tughra, the emperor's calligraphic monogram. In museums, Ottoman material is easy to love and easy to date: the tulip-and-carnation floral vocabulary and that particular cobalt-and-tomato-red palette are unmistakable.",
    quick: ["From a small Anatolian principality (c. 1299) to a six-century empire, ended 1922.", "Took Constantinople in 1453, ending the Byzantine Empire.", "Peak under Suleiman the Magnificent (r. 1520–1566); Sinan built its great mosques.", "Look for Iznik ceramics: cobalt blue and bole-red flowers on white."],
    met: "Islamic Art — Galleries 450–464, especially the Ottoman gallery: Iznik ceramics, kaftans, tughras, and arms.",
    context: {
      bigPicture: "The Ottoman state was a machine for absorbing difference: it governed Orthodox Christians, Armenians, Jews, and Muslims through community structures, staffed its bureaucracy and army partly through the devshirme levy of Christian boys, and treated Istanbul as the successor to Rome as much as a Muslim capital. Its long 19th-century reform era, the Tanzimat, tried to rebuild it as a modern state; defeat in the First World War ended the empire, and the sultanate was abolished in 1922.",
      geography: "Astride the straits — Bosphorus and Dardanelles — so astride the Europe/Asia and Black Sea/Mediterranean crossings. Control ran from the Balkans and Hungary through Anatolia, Syria, Egypt, and the Hejaz (giving the sultan custody of Mecca and Medina) to Algiers. That reach made the empire a Mediterranean naval power and Europe's permanent neighbour.",
      keyIdeas: [
        { t: "Tughra", d: "The sultan's calligraphic monogram, used to authenticate documents — an artwork in itself." },
        { t: "Devshirme", d: "The levy of Christian boys trained for the palace service and the janissary corps." },
        { t: "Millet system", d: "Religious communities administered their own law in personal matters under imperial oversight." },
        { t: "Sinan's dome", d: "A great central dome buttressed by half-domes — Mimar Sinan's answer to Hagia Sophia." }
      ],
      spotIt: [
        { t: "Iznik palette", d: "White ground, cobalt blue, turquoise, sage green, and a raised sealing-wax red (Armenian bole)." },
        { t: "Saz style", d: "Long feathery serrated leaves curling among composite flowers." },
        { t: "Four flowers", d: "Tulip, carnation, rose, and hyacinth — the standard Ottoman floral quartet." },
        { t: "Çintamani", d: "Three balls and two wavy stripes — a good-luck pattern on textiles and ceramics." },
        { t: "Pencil-thin minarets", d: "Slim, pointed minarets distinguish Ottoman mosques from Mamluk or Persian ones." }
      ]
    },
    periods: [
      { name: "Frontier beginnings", years: "c. 1299–1453", start: 1299, end: 1453, summary: "From a border emirate to the conquest of Constantinople.", detail: "Osman's small principality in Bithynia expanded into Byzantine territory and across into the Balkans, surviving a catastrophic defeat by Timur at Ankara in 1402 and a decade of civil war. Mehmed II took Constantinople on 29 May 1453 with enormous cannon and a portage of ships overland — and made it his capital." },
      { name: "Classical age", years: "1453–1600", start: 1453, end: 1600, summary: "Selim I doubles the empire; Suleiman and Sinan define its look.", detail: "Selim I conquered Syria, Egypt, and the holy cities in 1516–17. Suleiman (r. 1520–66) legislated, besieged Vienna, and patronised Sinan, whose Süleymaniye and Selimiye mosques are the peak of Ottoman architecture. Court workshops standardised the floral style across ceramics, textiles, and manuscripts." },
      { name: "Transformation", years: "1600–1800", start: 1600, end: 1800, summary: "Not simple decline — a reorganised, contested empire.", detail: "Older narratives of pure decline have been rewritten: the empire lost the second siege of Vienna in 1683 and territory thereafter, but also decentralised revenue, expanded provincial elites, and stayed a major power. The early 18th-century 'Tulip Period' brought printing, garden culture, and European exchange to Istanbul." },
      { name: "Reform & end", years: "1800–1922", start: 1800, end: 1922, summary: "Tanzimat reforms, nationalism, war, and abolition.", detail: "The Tanzimat edicts (1839, 1856) promised legal equality and rebuilt the state on European lines; Balkan nationalisms and great-power pressure ate the map. The Armenian genocide of 1915–17 was carried out under the wartime government. Defeat in 1918 and the Turkish War of Independence led to the abolition of the sultanate in 1922 and the caliphate in 1924." }
    ],
    events: [
      { year: 1299, label: "Osman's principality", detail: "Traditional founding date of the dynasty in northwest Anatolia." },
      { year: 1453, label: "Fall of Constantinople", detail: "Mehmed II takes the city; the Byzantine Empire ends." },
      { year: 1517, label: "Conquest of Egypt", detail: "Selim I takes Cairo and custody of Mecca and Medina." },
      { year: 1529, label: "Siege of Vienna", detail: "Suleiman reaches the gates of Habsburg Vienna and withdraws." },
      { year: 1557, label: "Süleymaniye Mosque", detail: "Sinan completes Suleiman's great mosque in Istanbul." },
      { year: 1839, label: "Tanzimat begins", detail: "Reform edicts promise legal equality and a modern administration." },
      { year: 1922, label: "Sultanate abolished", detail: "The empire ends; the Republic of Turkey is declared in 1923." }
    ],
    museum: {
      see: [
        "Iznik dishes, tiles, and mosque lamps — blue, turquoise, and raised red on white.",
        "Silk kaftans and velvet panels with large-scale floral or çintamani patterns.",
        "Tughras and illuminated firmans (imperial decrees).",
        "Arms and armour: yataghans, jewelled daggers, and turban helmets.",
        "Carpets — Ushak medallion and 'Transylvanian' prayer rugs.",
        "Manuscript painting: sultans' portraits and campaign histories."
      ],
      lingo: [
        { t: "Iznik", d: "The Anatolian town whose kilns produced the empire's finest ceramics." },
        { t: "Tughra", d: "The sultan's calligraphic monogram." },
        { t: "Janissary", d: "Elite infantry corps, originally recruited via the devshirme." },
        { t: "Sublime Porte", d: "The government — from the gate of the grand vizier's offices." },
        { t: "Kaftan", d: "The long court robe; sultans' kaftans survive in quantity at Topkapı." },
        { t: "Saz", d: "The feathery-leaf ornamental style of the court design studio." }
      ],
      where: [
        "Topkapı Palace Museum and the Turkish and Islamic Arts Museum, Istanbul.",
        "The Met — Islamic Art, Galleries 450–464.",
        "Victoria and Albert Museum, London — Ottoman ceramics and textiles.",
        "Asian Art Museum, San Francisco — West Asian gallery."
      ]
    }
  },

  {
    slug: "chavin",
    name: "Chavín",
    emoji: "🐆",
    accent: "#78350f",
    group: "The Americas",
    region: "Peruvian highlands and coast",
    start: -1200,
    end: -200,
    spanLabel: "c. 1200 – 200 BCE",
    tagline: "The Andes' first great art style — jaguar fangs, hallucinogens, and an oracle inside a maze of stone galleries.",
    overview: "Chavín de Huántar, high in the Peruvian Andes, was a pilgrimage center whose imagery spread across a huge area between roughly 900 and 200 BCE — the first time the Andean world shared one visual language. Its temple is honeycombed with dark internal galleries, at the center of which stands the Lanzón, a 4.5-meter carved shaft with fanged mouth and upswept hair of snakes. Priests appear to have used San Pedro cactus, water channels, and controlled darkness to stage transformative experiences. Everything after — Moche, Nazca, Wari, Inca — grows in soil Chavín prepared.",
    quick: ["The Andes' first widespread art style, c. 1200–200 BCE.", "Chavín de Huántar was a pilgrimage temple with underground galleries.", "Imagery: fanged felines, raptors, and snakes, endlessly recombined.", "No writing and no clear state — influence spread by religion, not conquest."],
    met: "Arts of the Ancient Americas, Michael C. Rockefeller Wing (reopened 2025). Chavín-style goldwork, stone, and textiles open the Andean sequence.",
    context: {
      bigPicture: "Chavín is a horizon, not an empire: a style and a cult that unified regions politically separate. Its spread coincided with new technologies (heddle looms, soldered gold, tapestry weaving) and with long-distance exchange in Amazonian, coastal, and highland goods. The site sits deliberately at a crossroads between coast, highlands, and the eastern jungle — which is exactly where the jaguars, caimans, and hallucinogenic plants of its art come from.",
      geography: "Chavín de Huántar lies at about 3,180 m in the Callejón de Conchucos, between two rivers, east of the Cordillera Blanca. Routes over the mountains link the Pacific coast to the Amazon headwaters. Coastal valleys — Casma, Nepeña, Lurín — carry related monumental architecture, some of it older than Chavín itself.",
      keyIdeas: [
        { t: "Kenning", d: "Visual metaphor: hair drawn as snakes, a belt as a row of faces — you must learn to read the substitutions." },
        { t: "Contour rivalry", d: "Lines that read as two different creatures depending on how you look — deliberate visual instability." },
        { t: "San Pedro cactus", d: "A mescaline cactus shown held by a fanged figure on the Raimondi Stela and elsewhere." },
        { t: "Pilgrimage center", d: "Offerings from distant regions suggest people travelled to the temple rather than being ruled from it." }
      ],
      spotIt: [
        { t: "Fanged mouth", d: "Crossed canines, often on a human-shaped figure — the single most reliable Chavín marker." },
        { t: "Snake hair", d: "Serpents streaming from heads and belts." },
        { t: "Tenon heads", d: "Stone heads with a stub at the back, set into the temple's outer wall like nails." },
        { t: "Stirrup-spout bottles", d: "Polished dark gray ceramic bottles with a looped spout — the Andean form Moche later perfected." },
        { t: "Reversible reading", d: "Turn the image upside-down; it often becomes a different creature." }
      ]
    },
    periods: [
      { name: "Precursors", years: "c. 3000–1200 BCE", start: -3000, end: -1200, summary: "Caral and coastal mounds — monumental building before pottery.", detail: "Long before Chavín, the Norte Chico/Caral sites on the coast built platform mounds and sunken circular plazas around 3000–1800 BCE — some of the oldest monumental architecture in the Americas, and remarkably, largely without ceramics. Later coastal centers (Sechín, Cerro Sechín's grim warrior reliefs) continued the tradition." },
      { name: "Early Chavín", years: "c. 1200–900 BCE", start: -1200, end: -900, summary: "The Old Temple and the Lanzón.", detail: "A U-shaped temple with a sunken circular plaza is built at Chavín de Huántar; the Lanzón, a fanged deity carved on a granite shaft, stands at the junction of internal galleries where only a few could see it at a time." },
      { name: "Chavín horizon", years: "c. 900–500 BCE", start: -900, end: -500, summary: "The style spreads across Peru.", detail: "The New Temple expands the site; Chavín iconography appears on textiles at Karwa on the coast, on gold from Kuntur Wasi, and on ceramics over hundreds of kilometres. Metallurgy advances: soldering, sweat-welding, and gold-silver alloys." },
      { name: "Decline", years: "c. 500–200 BCE", start: -500, end: -200, summary: "The cult fades; regional styles take over.", detail: "By around 500–200 BCE the pilgrimage center lost authority and the site was reoccupied by ordinary settlement. Regional cultures — Paracas on the south coast, Salinar and Gallinazo on the north — take the technologies forward, leading to Nazca and Moche." }
    ],
    events: [
      { year: -1200, label: "Chavín de Huántar founded", detail: "The Old Temple and the Lanzón are built in the highlands." },
      { year: -900, label: "Style spreads", detail: "Chavín imagery appears from the north highlands to the south coast." },
      { year: -800, label: "Karwa textiles", detail: "Painted cotton cloths carry the cult's imagery to the coast." },
      { year: -700, label: "Goldwork at Kuntur Wasi", detail: "Elite burials with gold crowns in Chavín style." },
      { year: -400, label: "New Temple", detail: "The site is expanded; the Raimondi Stela and Tello Obelisk belong to this world." },
      { year: -200, label: "Abandonment", detail: "The ceremonial center loses its authority; regional cultures rise." }
    ],
    museum: {
      see: [
        "Carved stone: tenon heads, stelae, and cornice fragments (mostly casts outside Peru).",
        "Dark burnished stirrup-spout bottles with incised feline or raptor designs.",
        "Hammered gold crowns, pectorals, and ear spools with repoussé fanged faces.",
        "Painted cotton textiles from the coast in Chavín style.",
        "Carved bone snuff spoons and tubes for hallucinogenic snuff."
      ],
      lingo: [
        { t: "Horizon", d: "In Andean archaeology, a period when one style spreads over many regions." },
        { t: "Lanzón", d: "The lance-shaped granite idol at the heart of the Old Temple." },
        { t: "Tenon head", d: "A sculpted head with a projecting shaft, socketed into a wall." },
        { t: "Stirrup spout", d: "A ceramic bottle with an arched tube and single vertical spout." },
        { t: "Repoussé", d: "Hammering sheet metal from behind to raise a design." }
      ],
      where: [
        "Museo Nacional de Chavín and the site itself, Peru; Museo Larco, Lima.",
        "The Met — Arts of the Ancient Americas, Rockefeller Wing.",
        "de Young Museum, San Francisco — Arts of the Americas.",
        "Dumbarton Oaks, Washington DC — a superb small Pre-Columbian collection."
      ]
    }
  },

  {
    slug: "nazca",
    name: "Nazca",
    emoji: "🐦",
    accent: "#0d9488",
    group: "The Americas",
    region: "South coast of Peru",
    start: -100,
    end: 800,
    spanLabel: "c. 100 BCE – 800 CE",
    tagline: "Desert engineers who drew animals a kilometre wide and wove cloth finer than anything else in the ancient Americas.",
    overview: "Nazca is famous for the lines — hundreds of geometric figures and around 70 animals and plants scraped into the desert floor of the Pampa de Nazca, best read from the air but almost certainly made to be walked as ritual paths. Less famous, and more impressive up close, is everything else: polychrome pottery in up to a dozen slip colors fired in one go, the astonishing embroidered textiles of the preceding Paracas culture, and the puquios — spiral-mouthed underground aqueducts that still deliver water today. The Nazca had no cities to speak of; their great center, Cahuachi, was a ceremonial place of mounds and plazas.",
    quick: ["South-coast Peruvian culture, c. 100 BCE – 800 CE.", "The Nazca Lines: giant desert geoglyphs, made by clearing dark stones off pale ground.", "Polychrome pottery with up to 12 mineral slip colors — the ancient Americas' best.", "Puquios: spiral-access underground aqueducts, some still functioning."],
    met: "Arts of the Ancient Americas, Michael C. Rockefeller Wing — including a gallery for light-sensitive ancient Andean textiles, the first of its kind in the US.",
    context: {
      bigPicture: "Nazca is a case study in surviving an extremely dry place. Rivers run underground for much of the year, so the Nazca tunnelled to reach the water table and built spiral shafts to maintain the channels. Much of their ritual life seems oriented to water and fertility, which is one reading of the lines — paths walked toward water sources, or figures addressed to the mountains that supply the rivers. Their pottery and textiles record a world of killer whales, hummingbirds, masked beings, and trophy heads.",
      geography: "One of the driest deserts on earth, between the Pacific and the Andes, cut by a handful of seasonal rivers (Nazca, Ica, Palpa). The pampa's surface is dark oxidised stone over pale sand — scrape a line and it stays for centuries because it almost never rains and the wind is stilled by a warm ground layer.",
      keyIdeas: [
        { t: "Geoglyphs", d: "Made by removing dark surface stones to expose light ground below — subtraction, not construction." },
        { t: "Puquios", d: "Filtration galleries with corkscrew access shafts (ojos) that let people clean them and let wind drive airflow." },
        { t: "Cahuachi", d: "A vast ceremonial center of adobe mounds with little permanent residence — a pilgrimage site." },
        { t: "Trophy heads", d: "Prepared human heads with a carrying cord through the forehead — appear constantly in the art and in burials." }
      ],
      spotIt: [
        { t: "Slip polychromy", d: "Pre-fired mineral slips give reds, oranges, grays, browns, black and white on one vessel." },
        { t: "Double-spout-and-bridge", d: "Two spouts joined by a flat handle — the classic south-coast bottle shape." },
        { t: "Mythical Killer Whale", d: "A curved creature with a trophy head, one of the most repeated Nazca motifs." },
        { t: "Paracas embroidery", d: "Stem-stitch figures in saturated colors on dark ground — the mantles that precede Nazca." },
        { t: "Proliferous style", d: "Late Nazca designs get crowded, with sprouting appendages filling every gap." }
      ]
    },
    periods: [
      { name: "Paracas", years: "c. 800–100 BCE", start: -800, end: -100, summary: "The predecessor culture and its extraordinary burial mantles.", detail: "Paracas is known above all from mummy bundles wrapped in embroidered mantles on the Paracas peninsula — hundreds of figures stitched in alpaca and cotton, colors still vivid after two thousand years. Pottery is resin-painted after firing; Chavín influence is visible early on." },
      { name: "Early Nazca", years: "c. 100 BCE – 300 CE", start: -100, end: 300, summary: "Cahuachi, fine polychrome pottery, and the first lines.", detail: "Painting moves from post-fired resin to pre-fired slips, allowing the polychrome pottery Nazca is known for. Cahuachi grows into the main ceremonial center. Many geoglyphs date to this period, overlying older Paracas figures on hillsides." },
      { name: "Middle Nazca", years: "c. 300–500 CE", start: 300, end: 500, summary: "Peak population, puquios, and pressure from drought.", detail: "Puquio construction is generally placed here, an engineering answer to severe drought. Cahuachi's importance shifts from ceremony to burial. Iconography becomes more militarised, with more trophy heads and armed figures." },
      { name: "Late Nazca & Wari", years: "c. 500–800 CE", start: 500, end: 800, summary: "Crowded 'proliferous' style, then absorption by Wari.", detail: "Designs grow dense and abstract. Environmental stress — deforestation of huarango trees, El Niño flooding — combined with the expansion of the Wari state from the highlands ends Nazca as a distinct culture by around 800 CE." }
    ],
    events: [
      { year: -400, label: "Paracas mantles", detail: "Elaborate embroidered burial textiles on the Paracas peninsula." },
      { year: -100, label: "Nazca emerges", detail: "Slip-painted polychrome pottery replaces post-fired resin painting." },
      { year: 1, label: "Cahuachi grows", detail: "The adobe mound-and-plaza ceremonial center reaches its height." },
      { year: 200, label: "The great geoglyphs", detail: "Hummingbird, monkey, spider, and the long straight lines are laid out." },
      { year: 400, label: "Puquios dug", detail: "Underground aqueducts tap groundwater during severe drought." },
      { year: 750, label: "Wari expansion", detail: "Highland Wari influence spreads over the south coast." },
      { year: 800, label: "Nazca ends", detail: "The distinctive culture disappears; its water systems outlive it." }
    ],
    museum: {
      see: [
        "Polychrome bowls, bottles, and effigy vessels with hummingbirds, whales, and masked beings.",
        "Double-spout-and-bridge bottles.",
        "Paracas embroidered mantles and Nazca woven and painted textiles (shown in low light).",
        "Featherwork panels — brilliant macaw and parrot feathers stitched to cotton.",
        "Gold mouth-masks and forehead ornaments.",
        "Panpipes (antaras) and ceramic drums."
      ],
      lingo: [
        { t: "Geoglyph", d: "A large design made on the ground surface." },
        { t: "Slip", d: "Liquid clay colored with minerals, painted on before firing." },
        { t: "Puquio", d: "A subterranean aqueduct with spiral access shafts." },
        { t: "Mantle", d: "A large rectangular cloth wrapped around a mummy bundle." },
        { t: "Trophy head", d: "A prepared human head, usually with a cord hole in the forehead." },
        { t: "Antara", d: "An Andean panpipe, often ceramic in Nazca contexts." }
      ],
      where: [
        "Museo Larco and the Museo Nacional de Arqueología, Lima; the Maria Reiche sites at Nazca.",
        "The Met — Arts of the Ancient Americas, including the Andean textile gallery.",
        "de Young Museum, San Francisco — Arts of the Americas and its textile holdings.",
        "American Museum of Natural History, New York — large Peruvian collections."
      ]
    }
  },

  {
    slug: "chimu",
    name: "Chimú",
    emoji: "🏜️",
    accent: "#525252",
    group: "The Americas",
    region: "North coast of Peru",
    start: 900,
    end: 1470,
    spanLabel: "c. 900 – 1470 CE",
    tagline: "The Inca's only real rival — a coastal empire ruled from Chan Chan, the largest adobe city ever built.",
    overview: "Chimor, the Chimú kingdom, ruled a thousand kilometres of the Peruvian desert coast from Chan Chan, a city of nine or ten walled royal compounds covering some 20 square kilometres — the largest mud-brick city in the world. The Chimú inherited Moche territory and Moche skill, industrialised it, and produced blackware ceramics from moulds and staggering quantities of hammered gold and silver. When the Inca conquered them around 1470 they deported Chimú goldsmiths to Cusco, which is why much 'Inca' metalwork is Chimú craft.",
    quick: ["Coastal empire from c. 900 to 1470 CE, capital Chan Chan near modern Trujillo.", "Chan Chan: ten walled royal citadels, the largest adobe city on earth.", "Signature: matte black moulded pottery and vast amounts of sheet gold and silver.", "Conquered by the Inca c. 1470; its goldsmiths were moved to Cusco."],
    met: "Arts of the Ancient Americas, Michael C. Rockefeller Wing — Chimú gold, silver, and blackware alongside Moche and Inca material.",
    context: {
      bigPicture: "Chimor was an irrigation state. Enormous canals moved water between river valleys to farm the desert, and the labour to build and maintain them was the kingdom's real infrastructure. Rule seems to have worked by split inheritance: each dead king's compound and estate kept supporting his cult, so each new king had to build his own — which explains why Chan Chan has ten palaces rather than one. The kingdom's fatal weakness was that same water system: the Inca took the canals and Chimor had no answer.",
      geography: "The Moche and Chicama valleys and eventually the whole north coast from Tumbes to near Lima. Rainless desert with rivers descending from the Andes; the cold Humboldt current makes the sea extraordinarily rich in fish, and El Niño events periodically wreck both the fishery and the canals.",
      keyIdeas: [
        { t: "Ciudadela", d: "A walled royal compound at Chan Chan with plazas, storerooms, a well, and a burial platform." },
        { t: "Split inheritance", d: "A dead ruler's property stayed his; successors built anew — the engine behind Chan Chan's growth." },
        { t: "Mass production", d: "Mould-made ceramics in huge numbers — quantity where Moche prized individuality." },
        { t: "Reduction firing", d: "Sealing the kiln starves it of oxygen and turns the clay matte black — the Chimú look." }
      ],
      spotIt: [
        { t: "Blackware", d: "Matte or burnished black pottery, often with small modeled animals or figures on the spout bridge." },
        { t: "Stirrup spouts with a monkey", d: "A tiny sculpted animal perched where the spout meets the arch." },
        { t: "Adobe friezes", d: "Repeating relief patterns of fish, waves, seabirds, and nets moulded into mud-brick walls." },
        { t: "Sheet-gold beakers", d: "Tall flaring cups (keros) with repoussé faces." },
        { t: "Tumi knives", d: "Crescent-bladed ceremonial knives with a figure on top — the icon of Peruvian metalwork." }
      ]
    },
    periods: [
      { name: "Early Chimor", years: "c. 900–1100 CE", start: 900, end: 1100, summary: "After Moche and Wari, a new state forms in the Moche valley.", detail: "Tradition names Taycanamu as the founder, arriving by sea on a balsa raft. The kingdom grows out of the Lambayeque/Sicán and late Moche worlds, taking over their canal systems and metallurgy." },
      { name: "Expansion", years: "c. 1100–1350 CE", start: 1100, end: 1350, summary: "Chan Chan grows; the coast is unified valley by valley.", detail: "Successive rulers annex neighbouring valleys, extend intervalley canals, and add ciudadelas at Chan Chan. Provincial administrative centers like Farfán and Manchan mirror the capital's plan on a smaller scale." },
      { name: "Peak", years: "c. 1350–1470 CE", start: 1350, end: 1470, summary: "A thousand kilometres of coast under one king.", detail: "Under Minchançaman the kingdom reaches its greatest extent. Craft production is concentrated in workshops at the capital; tens of thousands of people live in Chan Chan's dense artisan quarters." },
      { name: "Inca conquest", years: "1470–1532 CE", start: 1470, end: 1532, summary: "Absorbed by the Inca — and its craftsmen relocated.", detail: "The Inca under Tupac Yupanqui cut the canals and took the kingdom around 1470. Minchançaman was taken to Cusco, and Chimú metalworkers were resettled there. Chan Chan was stripped, and its blackware and goldsmithing traditions continued under Inca and then Spanish rule." }
    ],
    events: [
      { year: 900, label: "Chimor founded", detail: "The kingdom emerges in the Moche valley after the Moche and Wari collapse." },
      { year: 1100, label: "Chan Chan grows", detail: "The great adobe capital expands compound by compound." },
      { year: 1200, label: "Intervalley canals", detail: "Enormous engineering projects move water between river valleys." },
      { year: 1350, label: "Coastal empire", detail: "Chimor controls the north coast from Tumbes toward Lima." },
      { year: 1470, label: "Inca conquest", detail: "Tupac Yupanqui takes Chimor; its goldsmiths are moved to Cusco." },
      { year: 1532, label: "Spanish arrival", detail: "Chan Chan is looted for gold in the colonial period." }
    ],
    museum: {
      see: [
        "Matte black moulded pottery — stirrup-spout bottles, often with small animals.",
        "Hammered gold and silver beakers, masks, ear spools, and tumi knives.",
        "Feathered panels and tunics.",
        "Textiles: tapestry and painted cotton with repeating bird and wave motifs.",
        "Wooden funerary figures and models from Chan Chan's compounds."
      ],
      lingo: [
        { t: "Chimor", d: "The kingdom's own name; 'Chimú' is the adjective usually used for the culture." },
        { t: "Ciudadela", d: "A walled royal compound at Chan Chan." },
        { t: "Tumi", d: "A ceremonial knife with a crescent blade." },
        { t: "Kero", d: "A flaring beaker — in metal here, in wood among the Inca." },
        { t: "Reduction-fired", d: "Fired with restricted oxygen, producing black ceramics." },
        { t: "Huaca", d: "A sacred place or monument; also used for the big adobe mounds on the coast." }
      ],
      where: [
        "Chan Chan and the Museo Chan Chan, Trujillo; Museo Larco, Lima.",
        "The Met — Arts of the Ancient Americas, Rockefeller Wing.",
        "de Young Museum, San Francisco — Arts of the Americas.",
        "Dumbarton Oaks, Washington DC."
      ]
    }
  },

  {
    slug: "taino",
    name: "The Taíno",
    emoji: "🐚",
    accent: "#0e7490",
    group: "The Americas",
    region: "The Greater Antilles — Cuba, Hispaniola, Puerto Rico, Jamaica",
    start: 600,
    end: 1550,
    spanLabel: "c. 600 – 1550 CE",
    tagline: "The Caribbean people Columbus met first — chiefdoms, ball courts, and carved zemís, and descendants who never actually disappeared.",
    overview: "The Taíno were the dominant people of the Greater Antilles when Europeans arrived in 1492 — Arawak-speaking farmers and seafarers organized into chiefdoms under caciques, with plazas and ball courts, elaborate wood and stone carving, and a cosmology of zemís, spirit beings given physical form. Contact was catastrophic: disease, forced labour, and violence collapsed the population within decades, and Taíno were long described as 'extinct.' Genetics and living Caribbean culture say otherwise — Taíno ancestry, words (hurricane, hammock, barbecue, canoe, tobacco), and foods persist throughout the region.",
    quick: ["Arawak-speaking people of Cuba, Hispaniola, Puerto Rico, and Jamaica.", "Organized into chiefdoms (cacicazgos) with plazas and stone-lined ball courts.", "Zemís: carved spirit figures in wood, stone, cotton, and shell.", "Devastated after 1492 — but Taíno ancestry and words survive across the Caribbean."],
    met: "Arts of the Ancient Americas, Michael C. Rockefeller Wing — Caribbean material including Taíno wood and stone carving.",
    context: {
      bigPicture: "Taíno society was hierarchical and productive: cassava agriculture on raised mounds (conucos), large canoes for inter-island travel and trade, and chiefs whose authority was religious as much as political. The zemí was the hinge — an object housing a spirit, fed, consulted, and inherited. Because so much of it was wood, cotton, and basketry, most of what survives is stone; and because the collapse was so fast, much of what we know comes from a handful of early Spanish accounts, notably Ramón Pané's, written in the 1490s.",
      geography: "The Greater Antilles: large, mountainous, well-watered islands with fertile valleys and coral coasts. Sea travel by dugout canoe linked islands and reached the mainland. Neighbouring peoples included the Island Caribs to the southeast and the Guanahatabey in western Cuba.",
      keyIdeas: [
        { t: "Zemí (cemí)", d: "A spirit and the object embodying it — often a three-pointed stone, or a carved wooden figure." },
        { t: "Cacique", d: "A chief; the word entered Spanish and then English from Taíno." },
        { t: "Batey", d: "The plaza or ball court, often lined with carved stone slabs, where a rubber-ball game was played." },
        { t: "Cohoba", d: "A hallucinogenic snuff taken through a forked tube for consultation with the zemís." },
        { t: "Areíto", d: "A communal song-and-dance ceremony that carried history and genealogy." }
      ],
      spotIt: [
        { t: "Three-pointer stones", d: "Triangular stone zemís, often with a face on one point and legs on another." },
        { t: "Duho", d: "A low ceremonial seat carved from wood or stone, with a high back and an animal face." },
        { t: "Wide-eyed faces", d: "Round eyes, bared teeth, and a broad grimace — the standard Taíno face." },
        { t: "Stone collars & elbow stones", d: "Heavy carved rings and angled stones associated with the ball game." },
        { t: "Shell and bone inlay", d: "Eyes and mouths inlaid with shell in wooden figures." }
      ]
    },
    periods: [
      { name: "Saladoid roots", years: "c. 500 BCE – 600 CE", start: -500, end: 600, summary: "Arawak-speaking migrants move up the island chain from South America.", detail: "Farming, pottery-making people from the Orinoco region settled the Antilles over centuries, bringing cassava, ceramics with white-on-red painting, and inter-island exchange in stone and shell." },
      { name: "Ostionoid & early Taíno", years: "c. 600–1200 CE", start: 600, end: 1200, summary: "Distinct island societies emerge with plazas and chiefs.", detail: "Populations grow, villages become larger and more planned, and the first ball courts and ceremonial plazas appear. Regional styles diverge across Puerto Rico, Hispaniola, and eastern Cuba." },
      { name: "Classic Taíno", years: "c. 1200–1492 CE", start: 1200, end: 1492, summary: "Chiefdoms, monumental plazas, and the peak of carving.", detail: "Large cacicazgos control whole regions of Hispaniola and Puerto Rico. Sites like Caguana in Puerto Rico have multiple stone-lined courts with petroglyphs. Wood carving — duhos, zemís, and vomiting spatulas — reaches its finest quality." },
      { name: "Contact & after", years: "1492–1550 CE", start: 1492, end: 1550, summary: "Catastrophe, resistance, and survival in altered form.", detail: "Columbus landed in 1492; encomienda labour, smallpox, and violence caused a demographic collapse. Resistance leaders — Hatuey in Cuba, Enriquillo in Hispaniola — fought for decades. Colonial censuses declared the Taíno gone, but communities persisted through intermarriage; modern genetic studies find substantial Indigenous ancestry across the Caribbean." }
    ],
    events: [
      { year: 600, label: "Island societies form", detail: "Distinct Antillean cultures develop out of Saladoid roots." },
      { year: 1200, label: "Classic Taíno period", detail: "Large chiefdoms, plazas, and ball courts across the Greater Antilles." },
      { year: 1300, label: "Caguana ceremonial center", detail: "The great plaza complex in Puerto Rico is in use." },
      { year: 1492, label: "Columbus lands", detail: "First contact in the Bahamas, then Hispaniola and Cuba." },
      { year: 1498, label: "Pané's account", detail: "The first ethnography written in the Americas records Taíno beliefs." },
      { year: 1511, label: "Hatuey's resistance", detail: "The Taíno leader fights the Spanish in Cuba and is executed." },
      { year: 1533, label: "Enriquillo's treaty", detail: "A 14-year revolt in Hispaniola ends with a negotiated settlement." }
    ],
    museum: {
      see: [
        "Three-pointed stone zemís.",
        "Carved wooden duhos (ceremonial seats), sometimes with gold or shell inlay.",
        "Stone collars, elbow stones, and ball-court markers.",
        "Ceramic vessels and adornos (modeled clay heads applied to pot rims).",
        "Shell and bone carvings, including snuff tubes and spatulas.",
        "Cotton zemí figures — extremely rare, only a handful survive."
      ],
      lingo: [
        { t: "Zemí / cemí", d: "A spirit or the object embodying it." },
        { t: "Cacique", d: "Chief; cacicazgo = chiefdom." },
        { t: "Batey", d: "Ball court or plaza; also the ball game itself." },
        { t: "Duho", d: "A carved ceremonial seat used by chiefs and shamans." },
        { t: "Behique", d: "A shaman or healer." },
        { t: "Conuco", d: "A raised planting mound used for cassava and other crops." }
      ],
      where: [
        "Museo del Hombre Dominicano, Santo Domingo; Centro Ceremonial Indígena de Caguana, Puerto Rico.",
        "The Met — Arts of the Ancient Americas, Rockefeller Wing.",
        "Smithsonian National Museum of the American Indian — Caribbean collections.",
        "British Museum — Room 27 and Caribbean holdings, including a cotton zemí."
      ]
    }
  },

  {
    slug: "igbo-ukwu",
    name: "Igbo-Ukwu",
    emoji: "🫙",
    accent: "#0f766e",
    group: "Africa",
    region: "Southeastern Nigeria — Igboland",
    start: 800,
    end: 1000,
    spanLabel: "c. 9th–10th century CE",
    tagline: "A Nigerian village that turned out to hold the most technically astonishing bronze casting in Africa — three centuries before Ife.",
    overview: "In 1938 a man digging a cistern in the village of Igbo-Ukwu hit bronzes. Excavation revealed three sites: a burial chamber of a high-status man seated in regalia, a storehouse of ritual objects, and a pit of discarded ceremonial goods. Radiocarbon put them in the 9th–10th centuries CE — far earlier than anyone expected — and the castings turned out to be extraordinary: leaded bronze surfaces imitating woven rope, insects, and beadwork, made by lost-wax casting with a local alloy and no evident outside models. Thousands of glass and carnelian beads show long-distance trade reached this forest region a thousand years ago.",
    quick: ["Three 9th–10th century CE sites in southeastern Nigeria, found from 1938.", "Lost-wax bronzes of extreme technical refinement — rope, insects, granulation.", "A rich burial: a seated dignitary with copper regalia and 100,000+ beads.", "Predates Ife and Benin casting by centuries; no known predecessor tradition."],
    met: "Arts of Africa, Michael C. Rockefeller Wing (reopened 2025). Igbo-Ukwu material is rare outside Nigeria; the Met shows related Igbo works and the wider Nigerian sequence.",
    context: {
      bigPicture: "Igbo-Ukwu upended assumptions twice: first about date — the metalwork is centuries older than the famous Ife and Benin traditions — and second about hierarchy, since Igbo society is often described as famously non-centralised, yet the burial shows a person of enormous ritual status, probably an eze nri, a priest-king of the Nri religious system. The bead and copper evidence also shows trans-Saharan and Indian Ocean trade goods reaching the West African forest much earlier than expected.",
      geography: "The forested Anambra region east of the Niger, in what is now Anambra State, Nigeria. Not a trade-route city, not a coastal port — an inland community whose access to copper and glass beads implies long chains of exchange running north to the Sahara and beyond.",
      keyIdeas: [
        { t: "Eze Nri", d: "A ritual priest-king whose authority was religious rather than military, in the Nri system of the Igbo." },
        { t: "Lost-wax mastery", d: "Castings so thin and detailed that some scholars first doubted the dates rather than the skill." },
        { t: "Leaded bronze", d: "Analysis shows a distinctive local alloy — evidence of an independent tradition, not imports." },
        { t: "Three sites", d: "Igbo Isaiah (a shrine store), Igbo Richard (the burial), Igbo Jonah (a disposal pit)." }
      ],
      spotIt: [
        { t: "Rope and mesh texture", d: "Cast surfaces that imitate knotted cord wrapped around a vessel." },
        { t: "Insects and small creatures", d: "Flies, crickets, snails, and frogs perched on rims and handles." },
        { t: "Granulated bosses", d: "Fields of tiny raised dots imitating beadwork, cast rather than applied." },
        { t: "Roped pot on a stand", d: "The signature object: a ceramic-shaped bronze vessel inside a cast net of rope." }
      ]
    },
    periods: [
      { name: "Igbo-Ukwu", years: "c. 800–1000 CE", start: 800, end: 1000, summary: "The bronzes, the burial, and long-distance beads.", detail: "Radiocarbon dates cluster in the 9th–10th centuries CE. The burial held a seated man with a copper crown, pectoral, fly-whisk handle, and beaded regalia; the shrine store held elaborate cast vessels and staff ornaments. Over 165,000 beads of glass and carnelian came from the sites, implying trade links across the Sahara and possibly to South Asia." },
      { name: "Nri hegemony", years: "c. 1000–1911 CE", start: 1000, end: 1911, summary: "A religious kingdom without an army.", detail: "The Kingdom of Nri, centered nearby, exercised ritual authority across Igboland through priests who cleansed taboos and crowned local titleholders rather than through conquest. It was ended in 1911 under British colonial pressure — the eze Nri was forced to renounce ritual power." },
      { name: "Rediscovery", years: "1938–1960s", start: 1938, end: 1970, summary: "Excavation, radiocarbon dates, and a rewritten chronology.", detail: "Isaiah Anozie's cistern digging in 1938 exposed the first bronzes. Thurstan Shaw's excavations in 1959–64 established the context and the dates. The early dates were controversial for decades, but have held up." }
    ],
    events: [
      { year: 850, label: "The bronzes cast", detail: "Lost-wax vessels, staff heads, and pendants made with a distinctive leaded alloy." },
      { year: 900, label: "The burial", detail: "A dignitary interred seated with crown, pectoral, and beaded regalia." },
      { year: 1000, label: "Nri tradition", detail: "The ritual kingdom of Nri develops in the same region." },
      { year: 1938, label: "First finds", detail: "Isaiah Anozie uncovers bronzes while digging a cistern." },
      { year: 1959, label: "Shaw's excavation", detail: "Systematic excavation begins; radiocarbon dating follows." },
      { year: 1970, label: "Chronology accepted", detail: "The 9th–10th century dates reshape West African art history." }
    ],
    museum: {
      see: [
        "Cast bronze vessels with rope, mesh, and insect detail (mostly in Nigeria; casts elsewhere).",
        "Bronze staff and fly-whisk ornaments.",
        "Glass and carnelian beads from the burial.",
        "Related Igbo material: ikenga figures, mbari shrine sculpture, and masquerade masks.",
        "Photographs and reconstructions of the burial chamber."
      ],
      lingo: [
        { t: "Igbo-Ukwu", d: "The village in Anambra State where the finds were made — 'great Igbo'." },
        { t: "Eze Nri", d: "The priest-king of the Nri ritual system." },
        { t: "Ikenga", d: "A personal shrine figure of achievement, usually horned — a common later Igbo form." },
        { t: "Lost wax", d: "Cire perdue casting: a wax model is melted out of a clay mould and replaced by metal." },
        { t: "Leaded bronze", d: "Copper alloyed with tin and lead, easier to cast in fine detail." }
      ],
      where: [
        "National Museum, Lagos, and the Nigerian National Museum system — the primary collections.",
        "The Met — Arts of Africa, Rockefeller Wing.",
        "British Museum — Room 25 (Africa).",
        "Smithsonian National Museum of African Art."
      ]
    }
  },

  {
    slug: "bamana",
    name: "The Bamana",
    emoji: "🐐",
    accent: "#a16207",
    group: "Africa",
    region: "Mali — the middle Niger",
    start: 1712,
    end: 2025,
    spanLabel: "1712 CE – present",
    tagline: "Mali's largest people — the antelope headdresses that taught farming, and initiation societies that taught everything else.",
    overview: "The Bamana (Bambara) built the Segou and Kaarta kingdoms on the middle Niger in the 18th century and remain Mali's largest ethnic group. Their art is organized around initiation associations — Ntomo, Komo, Chi Wara, Jo — each with its own masks, figures, and body of knowledge revealed step by step over years. The most famous object in world art terms is the Chi Wara: a stylised antelope headdress danced in male–female pairs to honour the mythical being who taught people to farm. Its slender, sweeping horns became a modernist icon in Europe, usually stripped of everything that made it meaningful.",
    quick: ["Mali's largest ethnic group; the Segou kingdom ran the middle Niger from 1712.", "Art belongs to initiation societies — Ntomo, Komo, Chi Wara, Jo.", "Chi Wara antelope headdresses honour the being who taught agriculture.", "Boliw: crusted, encrusted power objects, deliberately unbeautiful and highly charged."],
    met: "Arts of Africa, Michael C. Rockefeller Wing — Chi Wara headdresses, Ntomo masks, and Jonyeleni figures; the de Young and the Smithsonian's African Art museum also hold strong Bamana groups.",
    context: {
      bigPicture: "Bamana art is best understood as pedagogy: objects are teaching instruments used by associations that structure a person's life. What a mask means depends on which grade of knowledge you have reached, so a single object carries several meanings at once. Bamana society coexisted for centuries with Islam along the Niger — many Bamana are Muslim today — and the associations adapted rather than vanished, which is why Chi Wara continues to be danced.",
      geography: "The savanna and floodplain of the middle Niger around Segou, Bamako, and Kaarta in present-day Mali — millet and sorghum country where the timing of rain decides everything, hence the agricultural focus of the Chi Wara. Neighbours include the Dogon on the Bandiagara escarpment and the Fulani herders.",
      keyIdeas: [
        { t: "Jow (associations)", d: "Initiation societies, each with graded knowledge, its own masks, songs, and obligations." },
        { t: "Nyama", d: "Vital force present in people, animals, and materials; dangerous, and managed by specialists." },
        { t: "Numu", d: "Blacksmith-sculptors, an endogamous group who work both iron and wood and handle nyama safely." },
        { t: "Boli", d: "A power object built up from clay, blood, and other materials into an abstract animal-like mass." }
      ],
      spotIt: [
        { t: "Chi Wara", d: "Antelope headdress — vertical (male, with openwork zigzag mane) or horizontal styles by region." },
        { t: "Male/female pairs", d: "Chi Wara dance in pairs; the female carries a fawn on her back." },
        { t: "Ntomo masks", d: "Faces topped with a row of vertical horns — the number encodes gender categories." },
        { t: "Komo helmet masks", d: "Elongated animal forms crusted with sacrificial material, horns, and quills." },
        { t: "Jonyeleni figures", d: "Standing female figures with pointed breasts and scarification, used by the Jo association." }
      ]
    },
    periods: [
      { name: "Before Segou", years: "c. 1200–1700 CE", start: 1200, end: 1700, summary: "Mande world after Mali; villages, smiths, and associations.", detail: "The Bamana emerge within the wider Mande cultural world that produced the Mali Empire, sharing language roots and craft-caste structures with the Malinke and Soninke, while remaining largely outside centralised Islamic states." },
      { name: "Segou & Kaarta kingdoms", years: "1712–1861", start: 1712, end: 1861, summary: "Biton Coulibaly builds a state on the Niger.", detail: "Biton Coulibaly turned a youth association into an army and founded the Segou kingdom around 1712; a rival Bamana kingdom formed at Kaarta. Both were warrior states with slave armies (the ton-jon), profiting from riverine trade, and both resisted Islamic reform movements — until the Fulani jihad state of Macina and then al-Hajj Umar Tall's forces overran them in 1861." },
      { name: "Colonial period", years: "1861–1960", start: 1861, end: 1960, summary: "French rule; masks reach Paris and change art history.", detail: "French conquest incorporated the region into Soudan Français. Bamana sculpture arrived in European collections and studios in the early 20th century; Chi Wara silhouettes influenced modernist sculptors, generally with no reference to their agricultural meaning." },
      { name: "Mali today", years: "1960–present", start: 1960, end: 2025, summary: "Living practice alongside a global market.", detail: "Chi Wara are still danced at farming competitions and festivals; associations persist, and contemporary Malian artists reference them directly. Museums increasingly show provenance and the circumstances of collection alongside the objects." }
    ],
    events: [
      { year: 1712, label: "Segou kingdom founded", detail: "Biton Coulibaly establishes Bamana power on the middle Niger." },
      { year: 1754, label: "Kaarta rivalry", detail: "A second Bamana kingdom competes with Segou to the northwest." },
      { year: 1796, label: "Mungo Park at Segou", detail: "The Scottish explorer describes the city and the Niger." },
      { year: 1861, label: "Segou falls", detail: "Al-Hajj Umar Tall's forces take the Bamana capital." },
      { year: 1892, label: "French conquest", detail: "The region is absorbed into French Soudan." },
      { year: 1907, label: "Chi Wara in Europe", detail: "Bamana sculpture enters Paris collections and influences modernist artists." },
      { year: 1960, label: "Mali independent", detail: "The Republic of Mali takes its name from the medieval empire." }
    ],
    museum: {
      see: [
        "Chi Wara antelope headdresses (vertical, horizontal, and abstract regional styles).",
        "Ntomo masks with rows of horns above a narrow face.",
        "Komo and Kono power masks, thickly encrusted.",
        "Jonyeleni standing female figures.",
        "Boliw — encrusted power objects (rarely displayed, sometimes restricted).",
        "Bogolanfini mud cloth: cotton strips dyed with fermented mud in geometric patterns."
      ],
      lingo: [
        { t: "Bamana / Bambara", d: "Same people; 'Bambara' is the older colonial spelling." },
        { t: "Chi Wara (Ci Wara)", d: "The mythical being who taught farming, and the headdress representing it." },
        { t: "Jo / jow", d: "An initiation association (plural)." },
        { t: "Nyama", d: "Occult vital energy released by action, requiring ritual management." },
        { t: "Numu", d: "Blacksmith-sculptor caste." },
        { t: "Bogolanfini", d: "Mud cloth — cotton dyed with iron-rich mud." }
      ],
      where: [
        "Musée National du Mali, Bamako.",
        "The Met — Arts of Africa, Rockefeller Wing.",
        "de Young Museum, San Francisco — Arts of Africa.",
        "Smithsonian National Museum of African Art; Musée du quai Branly, Paris."
      ]
    }
  },

  {
    slug: "senufo",
    name: "The Senufo",
    emoji: "🦅",
    accent: "#7c2d12",
    group: "Africa",
    region: "Côte d'Ivoire, Mali, and Burkina Faso",
    start: 1400,
    end: 2025,
    spanLabel: "c. 1400 CE – present",
    tagline: "Poro society sculpture from the West African savanna — hornbills taller than people, and masks that are two animals at once.",
    overview: "The Senufo live across the borderlands of northern Côte d'Ivoire, southern Mali, and western Burkina Faso, in dozens of related subgroups without a single centralised state. Their art belongs largely to Poro, the men's initiation society that educates in stages across decades, and to Sandogo, the women's divination association. The best-known works are the rhythm pounder figures, the great carved hornbills (porpianong), and the firespitter helmet masks that combine antelope horns, warthog tusks, hyena jaws, and a chameleon into a single controlled composite.",
    quick: ["A cluster of related peoples in Côte d'Ivoire, Mali, and Burkina Faso.", "Art centers on the men's Poro society and the women's Sandogo divination association.", "Signature works: hornbill sculptures, rhythm pounders, and composite firespitter masks.", "Carving is done by specialist artisans (kule) within a system of occupational groups."],
    met: "Arts of Africa, Michael C. Rockefeller Wing — Senufo hornbills, kpelie face masks, and helmet masks. The de Young also holds significant Senufo works.",
    context: {
      bigPicture: "Senufo objects are tools of an educational system. Poro takes decades and several grades; sculpture appears at particular moments — initiation, funerals, the passage of elders — and is often kept in the sacred grove rather than displayed. Sandogo diviners, mostly women, work with small figures and objects to diagnose problems with ancestors or bush spirits. Because Senufo territory spans three modern countries and many dialects, style varies sharply between regions, and 'Senufo' is partly a colonial-era umbrella term.",
      geography: "Wooded savanna between the Sahel and the forest, around Korhogo (Côte d'Ivoire), Sikasso (Mali), and Banfora (Burkina Faso). Farming country — yams, millet, cotton — with sacred groves (sinzanga) outside villages where initiation takes place.",
      keyIdeas: [
        { t: "Poro", d: "The men's initiation society; several grades over roughly 21 years, organized in seven-year cycles." },
        { t: "Sandogo", d: "The women's divination association, tied to matrilineal descent groups." },
        { t: "Ancient Mother", d: "The senior female spiritual authority behind Poro — often what a large female figure represents." },
        { t: "Kule", d: "Specialist woodcarvers within the Senufo occupational structure; smiths and brasscasters are separate." }
      ],
      spotIt: [
        { t: "Hornbill (porpianong)", d: "A tall bird with a long down-curving beak touching a swollen belly — a primordial creature." },
        { t: "Rhythm pounder (deble)", d: "A standing figure with a heavy base, pounded on the ground to mark time at funerals." },
        { t: "Kpelie mask", d: "A delicate face mask with side flanges ('legs'), a small crest, and scarification marks." },
        { t: "Firespitter mask", d: "A horizontal helmet with antelope horns, tusks, open jaws, and often a chameleon or hornbill on top." },
        { t: "Legs and 'wings'", d: "Small projecting flanges at the cheeks are a Senufo signature on face masks." }
      ]
    },
    periods: [
      { name: "Formation", years: "c. 1400–1600 CE", start: 1400, end: 1600, summary: "Senufo-speaking communities settle the savanna borderlands.", detail: "Gur-speaking farming populations consolidated in the region between the Mali and later Kong trade networks, developing the village-based, association-governed structure that persists." },
      { name: "Trade & upheaval", years: "1600–1898", start: 1600, end: 1898, summary: "Kong, Dyula merchants, and the wars of Samori Touré.", detail: "The Muslim merchant town of Kong and Dyula trading networks tied the region to long-distance commerce. In the 1890s Samori Touré's campaigns devastated Senufo country, notably Korhogo's region — a rupture remembered in oral history and reflected in shifts in artistic patronage." },
      { name: "Colonial period", years: "1898–1960", start: 1898, end: 1960, summary: "French rule; Senufo sculpture reaches Western museums.", detail: "Under French administration, cotton production expanded and labour migration grew. Collectors and colonial officers removed large quantities of sculpture, and Senufo works became canonical examples of 'African art' in Europe and America." },
      { name: "Contemporary", years: "1960–present", start: 1960, end: 2025, summary: "Poro continues; a busy market in new carving.", detail: "Poro remains active in many villages alongside Islam and Christianity. Korhogo is also a center for painted mud cloth and for carving made for sale — recent works are often stylistically excellent, so provenance and use-wear matter when reading a label." }
    ],
    events: [
      { year: 1400, label: "Senufo communities form", detail: "Gur-speaking farmers settle the savanna borderlands." },
      { year: 1700, label: "Kong and Dyula trade", detail: "Muslim merchant networks link the region to long-distance commerce." },
      { year: 1893, label: "Samori's campaigns", detail: "War devastates Senufo country in the late 19th century." },
      { year: 1898, label: "French conquest", detail: "The region enters the French colonial system." },
      { year: 1935, label: "Collecting boom", detail: "Senufo sculpture becomes a staple of Western collections of African art." },
      { year: 1960, label: "Independence", detail: "Côte d'Ivoire, Mali, and Upper Volta (Burkina Faso) become independent." }
    ],
    museum: {
      see: [
        "Large hornbill figures (porpianong).",
        "Rhythm pounders — standing male and female figures with heavy cylindrical bases.",
        "Kpelie face masks with cheek flanges.",
        "Helmet 'firespitter' masks combining several animals.",
        "Divination figures and small brass castings for Sandogo.",
        "Korhogo cloth: figures painted in mud pigment on rough cotton."
      ],
      lingo: [
        { t: "Poro", d: "The men's initiation society." },
        { t: "Sandogo", d: "The women's divination association." },
        { t: "Deble", d: "Rhythm pounder figure." },
        { t: "Kpelie", d: "The classic Senufo face mask type." },
        { t: "Sinzanga", d: "The sacred grove where Poro initiation takes place." },
        { t: "Kule", d: "Woodcarver." }
      ],
      where: [
        "Musée des Civilisations de Côte d'Ivoire, Abidjan.",
        "The Met — Arts of Africa, Rockefeller Wing.",
        "de Young Museum, San Francisco — Arts of Africa.",
        "Art Institute of Chicago; Musée du quai Branly, Paris."
      ]
    }
  },

  {
    slug: "chokwe",
    name: "The Chokwe",
    emoji: "👑",
    accent: "#9f1239",
    group: "Africa",
    region: "Angola, Democratic Republic of Congo, and Zambia",
    start: 1600,
    end: 2025,
    spanLabel: "c. 1600 CE – present",
    tagline: "Central Africa's court carvers — thrones, chief's portraits with enormous hands, and the masked woman who is the ideal ancestor.",
    overview: "The Chokwe expanded from an Angolan heartland into a vast area of Central Africa in the 19th century on the back of the ivory, wax, and rubber trades, and their art travelled with them. Chokwe sculpture is courtly and confident: seated chiefs (Chibinda Ilunga, the culture-hero hunter) with oversized hands and feet and elaborate swept-back coiffures; thrones studded with brass tacks and carved with scenes of village life; and the mwana pwo mask, a serene female face danced by men at the end of boys' initiation. They also practiced sona, geometric sand drawings traced in one continuous line.",
    quick: ["Angola, DR Congo, and Zambia; expanded rapidly in the 19th century.", "Famous for chief's figures, thrones, and finely carved staffs and combs.", "Mwana pwo: an idealised female face mask danced by men.", "Sona: mathematical sand drawings executed in a single unbroken line."],
    met: "Arts of Africa, Michael C. Rockefeller Wing — Chokwe chairs, staffs, and masks. Strong Chokwe holdings are also at the Smithsonian's African Art museum and the Africa Museum in Tervuren, Belgium.",
    context: {
      bigPicture: "Chokwe art is about legitimate authority. The hero Chibinda Ilunga — a Luba hunter-prince who married the Lunda queen Lweji — is the founding charter of Chokwe chieftaincy, and figures of him carry hunting equipment, a chief's headdress, and hands large enough to signal generosity and capability. In the 19th century the Chokwe became commercial powers, hunting elephants and taxing caravans; their success brought both a burst of artistic patronage and a violent expansion that displaced Lunda authority.",
      geography: "The upper Kasai and Kwango headwaters in northeastern Angola, spreading north into Congo and east into Zambia. Woodland savanna with rivers running north to the Congo basin — good elephant country, and the corridor along which Atlantic and Indian Ocean trade goods met.",
      keyIdeas: [
        { t: "Chibinda Ilunga", d: "The hunter-hero whose marriage to Lweji founds Chokwe/Lunda royal legitimacy." },
        { t: "Mukanda", d: "The boys' initiation camp; masks appear at its opening and closing." },
        { t: "Mwana pwo", d: "The 'young woman' mask — an ancestral ideal of beauty and fertility, danced by a man." },
        { t: "Sona", d: "Sand drawings traced in a continuous line, used in storytelling and instruction — studied today as ethnomathematics." }
      ],
      spotIt: [
        { t: "Swept-back coiffure", d: "A large winged or fanned headdress carved as flaring hair — the Chokwe silhouette." },
        { t: "Oversized hands and feet", d: "Deliberate proportional emphasis in chiefly figures." },
        { t: "Cross-hatched borders", d: "Bands of fine triangular or hatched pattern framing faces and edges." },
        { t: "Brass tacks", d: "Trade tacks studded into thrones and figures as prestige decoration." },
        { t: "Cikungu / cihongo", d: "Male masks of chiefly power and wealth, with a broad flat beard-plate." }
      ]
    },
    periods: [
      { name: "Origins", years: "c. 1600–1800", start: 1600, end: 1800, summary: "Chokwe chiefdoms form in the Angolan highlands under Lunda influence.", detail: "Chokwe polities emerged in the Lunda commonwealth's orbit, taking royal titles and the Chibinda Ilunga charter from Lunda tradition while remaining decentralised — many chiefs rather than one king." },
      { name: "Commercial expansion", years: "1800–1900", start: 1800, end: 1900, summary: "Ivory, wax, and rubber fuel a dramatic expansion.", detail: "Chokwe hunters and traders moved north and east, supplying Atlantic and later Indian Ocean markets. Their wealth bought guns and attracted followers; by the 1880s they had overrun the Lunda capital. This is the great period of Chokwe court carving." },
      { name: "Colonial rule", years: "1900–1960s", start: 1900, end: 1965, summary: "Portuguese and Belgian administration; rubber and forced labour.", detail: "Colonial borders cut Chokwe country three ways. Rubber collection and forced labour disrupted the chieftaincies that had patronised sculpture, and large quantities of art were collected — Tervuren's Congo collections date largely from this period." },
      { name: "Modern", years: "1960s–present", start: 1965, end: 2025, summary: "War, displacement, and continuing masquerade.", detail: "Angola's long civil war (1975–2002) displaced many Chokwe communities. Mukanda and mask performance continue in Angola, Zambia, and Congo, and Chokwe forms have a large presence in the international art market — with all the attribution and provenance problems that implies." }
    ],
    events: [
      { year: 1600, label: "Chokwe chiefdoms", detail: "Polities form in the Angolan highlands within the Lunda orbit." },
      { year: 1750, label: "Chibinda Ilunga tradition", detail: "The hunter-hero charter underpins chiefly legitimacy." },
      { year: 1850, label: "Ivory and wax boom", detail: "Chokwe traders expand north and east; court art flourishes." },
      { year: 1885, label: "Lunda capital taken", detail: "Chokwe forces overrun the Lunda Mwata Yamvo's court." },
      { year: 1900, label: "Colonial partition", detail: "Portuguese, Belgian, and British rule divide Chokwe territory." },
      { year: 1975, label: "Angolan civil war", detail: "Decades of conflict displace communities across the heartland." }
    ],
    museum: {
      see: [
        "Seated or standing chief figures, especially Chibinda Ilunga with hunting gear.",
        "Chairs and thrones with figural rungs and brass tacks (based on European forms, wholly Chokwe in treatment).",
        "Mwana pwo and cihongo masks; resin-and-fibre mask constructions.",
        "Staffs, scepters, combs, snuff mortars, and tobacco containers.",
        "Divination baskets (ngombo) full of small symbolic objects."
      ],
      lingo: [
        { t: "Chokwe", d: "Also spelled Cokwe, Tshokwe, Quioco." },
        { t: "Chibinda Ilunga", d: "The hunter-prince culture hero." },
        { t: "Mukanda", d: "Boys' initiation and its camp." },
        { t: "Mwana pwo", d: "The idealised young woman mask." },
        { t: "Ngombo", d: "A diviner's basket of objects, read by shaking." },
        { t: "Sona", d: "Continuous-line sand drawings." }
      ],
      where: [
        "Museu Nacional de Antropologia, Luanda; Africa Museum, Tervuren, Belgium.",
        "The Met — Arts of Africa, Rockefeller Wing.",
        "Smithsonian National Museum of African Art.",
        "de Young Museum, San Francisco — Arts of Africa."
      ]
    }
  },

  {
    slug: "rapanui",
    name: "Rapa Nui (Easter Island)",
    emoji: "🗿",
    accent: "#57534e",
    group: "Oceania",
    region: "Rapa Nui — southeastern Polynesia",
    start: 1150,
    end: 1888,
    spanLabel: "c. 1150 – 1888 CE",
    tagline: "The most remote inhabited place on earth, and the thousand stone ancestors its people carved and moved without wheels or draft animals.",
    overview: "Rapa Nui is a volcanic triangle 3,500 km off Chile, settled by Polynesian voyagers around 1150–1200 CE. Its people carved nearly a thousand moai — ancestor figures with heavy brows and long ears, most between 4 and 10 meters — quarried them at Rano Raraku, and moved them kilometres to coastal platforms (ahu), where they stood facing inland to watch over the living. Experiments show they were probably 'walked' upright with ropes. The old story of ecological suicide has been substantially revised: deforestation was real, aided by rats eating palm seeds, but the population catastrophe came from Peruvian slave raids and epidemics in the 1860s.",
    quick: ["Settled by Polynesians c. 1150–1200 CE; the most isolated inhabited island on earth.", "Nearly 1,000 moai — ancestor figures — quarried at Rano Raraku and moved to coastal ahu.", "Rongorongo: a unique script (or proto-script) still undeciphered.", "Collapse narratives are outdated: 1860s slave raiding and disease did the worst damage."],
    met: "Arts of Oceania, Michael C. Rockefeller Wing — Polynesian material including Rapa Nui carving. The best-known moai abroad, Hoa Hakananai'a, is in the British Museum (Room 24).",
    context: {
      bigPicture: "Rapa Nui is the ultimate test case for what a small, isolated society can build. With no metal, no wheels, no draft animals, and around 15,000 people at most, the islanders produced monumental sculpture on a scale that embarrassed 18th-century Europeans into inventing outside explanations. The moai are ancestors: each ahu belonged to a lineage, and the statues faced inland to protect their descendants. When ancestral authority failed, statues were toppled and a new competitive institution — the birdman cult at Orongo — took over.",
      geography: "163 km² of volcanic island with three craters, no permanent streams, and no reef. Nearest inhabited neighbour: Pitcairn, 2,000 km away. Rano Raraku's compacted volcanic tuff is soft enough to carve with basalt picks; Puna Pau supplied the red scoria for topknots (pukao).",
      keyIdeas: [
        { t: "Moai", d: "Ancestor figures, deliberately not portraits — stylised, frontal, with prominent brows and long earlobes." },
        { t: "Ahu", d: "The stone platform a moai stands on; ahu are lineage monuments and often contain burials." },
        { t: "Mana", d: "Ancestral power, thought to flow to descendants through the statues' gaze." },
        { t: "Tangata manu", d: "The birdman competition at Orongo: swimming to a nearby islet for the first sooty tern egg won a year of ritual primacy." }
      ],
      spotIt: [
        { t: "Heavy brow, thin lips", d: "The moai face: straight nose, jutting chin, deep-set eyes, elongated ears." },
        { t: "Coral eyes", d: "Standing moai originally had inset white coral and obsidian or red scoria eyes, added on erection." },
        { t: "Pukao", d: "Red scoria topknots or headdresses placed on some statues." },
        { t: "Moai kavakava", d: "Small wooden figures of emaciated men with visible ribs and spine — the classic portable Rapa Nui carving." },
        { t: "Rongorongo", d: "Rows of tiny incised glyphs on wooden tablets, read in reverse boustrophedon; undeciphered." }
      ]
    },
    periods: [
      { name: "Settlement", years: "c. 1150–1250 CE", start: 1150, end: 1250, summary: "Polynesian voyagers arrive and establish lineages.", detail: "Radiocarbon evidence points to settlement around 1150–1200 CE from East Polynesia, bringing chickens, taro, sweet potato, and the Pacific rat. Oral tradition names the founding chief Hotu Matu'a." },
      { name: "Statue period", years: "c. 1250–1600 CE", start: 1250, end: 1600, summary: "Nearly a thousand moai carved, moved, and raised.", detail: "Lineages competed in monument building. Quarrying at Rano Raraku left almost 400 statues unfinished, including one 21 meters long still attached to bedrock. Transport most likely used ropes to rock statues forward upright — 'walking' them, as the oral tradition says. Palm forest was cleared for gardening and transport; rats ate the seeds, preventing regrowth." },
      { name: "Birdman era", years: "c. 1600–1860", start: 1600, end: 1860, summary: "Statues toppled; the Orongo competition replaces them.", detail: "Moai were pushed over — probably by rivals over time rather than in one event — and ritual authority shifted to the annual tangata manu competition at Orongo. Europeans arrived in 1722 (Roggeveen, on Easter Sunday), and Cook in 1774 found statues already fallen." },
      { name: "Catastrophe & revival", years: "1862–present", start: 1862, end: 1888, summary: "Slave raids, epidemics, annexation — and cultural resurgence.", detail: "Peruvian slave raids in 1862–63 took perhaps 1,500 people, including the last rongorongo readers; returning survivors brought smallpox. By 1877 around 110 islanders remained. Chile annexed the island in 1888 and leased it as a sheep ranch for decades. Today Rapa Nui people are a majority again on the island, and repatriation of moai is an active issue." }
    ],
    events: [
      { year: 1200, label: "Settlement", detail: "Polynesian voyagers reach the island and establish lineages." },
      { year: 1300, label: "Moai carving peaks", detail: "Statue production at Rano Raraku accelerates." },
      { year: 1600, label: "Statues toppled", detail: "Monument building ends; the birdman cult rises at Orongo." },
      { year: 1722, label: "Roggeveen lands", detail: "The first European visit, on Easter Sunday — hence the European name." },
      { year: 1862, label: "Slave raids", detail: "Peruvian raiders abduct much of the population; disease follows." },
      { year: 1868, label: "Hoa Hakananai'a removed", detail: "A British ship takes the basalt moai now in the British Museum." },
      { year: 1888, label: "Chilean annexation", detail: "Rapa Nui is annexed by Chile." }
    ],
    museum: {
      see: [
        "Moai kavakava — wooden male figures with exposed ribs.",
        "Moai papa — flat female figures.",
        "Rei miro: crescent wooden pectorals, sometimes with rongorongo glyphs.",
        "Rongorongo tablets (about two dozen survive worldwide).",
        "Basalt and obsidian tools; mata'a obsidian blades.",
        "Birdman (tangata manu) carvings and Orongo petroglyph casts."
      ],
      lingo: [
        { t: "Rapa Nui", d: "The island, its people, and their language; 'Easter Island' is the European name." },
        { t: "Moai", d: "The monolithic ancestor figure." },
        { t: "Ahu", d: "The ceremonial stone platform." },
        { t: "Pukao", d: "The red scoria topknot." },
        { t: "Rongorongo", d: "The island's undeciphered glyph system." },
        { t: "Tangata manu", d: "Birdman — the ritual competition at Orongo." }
      ],
      where: [
        "Museo Antropológico Sebastián Englert, Rapa Nui.",
        "British Museum — Room 24 (Hoa Hakananai'a).",
        "The Met — Arts of Oceania, Rockefeller Wing.",
        "de Young Museum, San Francisco — Oceanic art."
      ]
    }
  },

  {
    slug: "tonga",
    name: "Tonga & West Polynesia",
    emoji: "🛶",
    accent: "#b91c1c",
    group: "Oceania",
    region: "Tonga, Sāmoa, and Fiji",
    start: -900,
    end: 1900,
    spanLabel: "c. 900 BCE – 1900 CE",
    tagline: "The Pacific's oldest kingdom — a maritime empire of double-hulled canoes, barkcloth by the hundred meters, and a stone trilithon.",
    overview: "West Polynesia is where Polynesian culture formed: Lapita voyagers reached Tonga and Sāmoa around 900–800 BCE, and after centuries of relative isolation the distinct Polynesian language, social order, and art emerged there before spreading east. Tonga went further and built the Tuʻi Tonga maritime chiefdom, whose influence reached Sāmoa, Fiji, Futuna, and beyond from roughly 1200 to 1500 CE. Its monuments — the Haʻamonga ʻa Maui trilithon, the stepped langi tombs at Lapaha — and its exchange in fine mats, barkcloth, whale ivory, and red feathers held that world together. Tonga is also the only Pacific nation never formally colonised.",
    quick: ["Lapita voyagers reach Tonga and Sāmoa c. 900–800 BCE — the Polynesian homeland.", "The Tuʻi Tonga maritime chiefdom dominated West Polynesia c. 1200–1500 CE.", "Monuments: the Haʻamonga ʻa Maui trilithon and the stone-faced langi royal tombs.", "Valuables were textiles: fine mats (ʻie tōga) and barkcloth (ngatu / siapo / masi)."],
    met: "Arts of Oceania, Michael C. Rockefeller Wing — Polynesian clubs, barkcloth, and ivory ornaments; the de Young's Oceania galleries also hold Polynesian material.",
    context: {
      bigPicture: "West Polynesian wealth was made, not mined: the highest-value objects were textiles produced by women — fine mats with a genealogy of their own, and vast sheets of barkcloth — exchanged at marriages, funerals, and investitures. Tongan chiefs layered a sacred paramount (the Tuʻi Tonga) over secular executive lines, a division that let the system survive stress. Fiji supplied the great voyaging canoes and sandalwood; Sāmoa supplied fine mats and marriage alliances. The three archipelagos should be read as one interacting system, not three isolated cultures.",
      geography: "Volcanic and coral islands in the central South Pacific: Tonga's north–south chain, Sāmoa to the northeast, and Fiji's larger islands to the west. Reliable trade winds and deliberate windward voyaging skill made regular inter-archipelago travel possible in double-hulled canoes (kalia/drua) that could carry a hundred people.",
      keyIdeas: [
        { t: "Tuʻi Tonga", d: "The sacred paramount title, traced back to a divine ancestor; by tradition founded in the 10th century CE." },
        { t: "Mana and tapu", d: "Sacred power and restriction — the Polynesian pair that regulates rank and access; 'taboo' is the Tongan word." },
        { t: "Koloa", d: "Women's wealth: fine mats and barkcloth, the objects that make marriages and funerals valid." },
        { t: "Kava", d: "A ceremonial drink from Piper methysticum, served in ranked order — the core political ritual." }
      ],
      spotIt: [
        { t: "Ngatu / siapo / masi", d: "Barkcloth: beaten mulberry bark, rubbed over a design tablet, painted in browns and blacks (Tonga/Sāmoa/Fiji names)." },
        { t: "Fijian clubs", d: "Hardwood clubs — gunstock, pineapple, and lotus forms — often with fine chip-carved surfaces." },
        { t: "Whale ivory", d: "Tabua (presentation whale teeth) in Fiji; ivory breast ornaments and beads in Tonga." },
        { t: "Trilithon and langi", d: "Coral-limestone monuments: the Haʻamonga gate and stepped, faced royal tombs." },
        { t: "Sennit binding", d: "Coconut-fibre cord lashed in geometric patterns — structural and decorative across the region." }
      ]
    },
    periods: [
      { name: "Lapita", years: "c. 900–500 BCE", start: -900, end: -500, summary: "The founding voyagers and their dentate-stamped pottery.", detail: "Lapita people, ancestors of Polynesians, spread rapidly from the Bismarck Archipelago to Tonga and Sāmoa, carrying pigs, dogs, chickens, and a distinctive pottery stamped with fine toothed combs. Their designs are the deep ancestor of later Polynesian tattoo and barkcloth motifs." },
      { name: "Ancestral Polynesia", years: "c. 500 BCE – 900 CE", start: -500, end: 900, summary: "A distinct Polynesian culture forms in Tonga and Sāmoa.", detail: "After long-distance contact thinned, communities in the Tonga–Sāmoa region developed the ancestral Polynesian language, social ranking, and material culture. Pottery was gradually abandoned. From here, later voyages settled the Society Islands, Hawaiʻi, Rapa Nui, and Aotearoa." },
      { name: "The Tuʻi Tonga maritime chiefdom", years: "c. 900–1500 CE", start: 900, end: 1500, summary: "Tonga projects power across the region.", detail: "The Tuʻi Tonga line, based at Heketā and then Lapaha on Tongatapu, drew tribute and marriage alliances from Sāmoa, Fiji, Futuna, and Uvea. The langi tombs and the Haʻamonga ʻa Maui date to this era. Around 1470 the sacred title was split from executive power to protect it from assassination." },
      { name: "Contact & the modern kingdom", years: "1616–1900", start: 1616, end: 1900, summary: "Europeans arrive; Tonga unifies as a Christian kingdom.", detail: "Dutch and then British visits (Cook called Tonga the 'Friendly Islands') were followed by missionaries and civil war. Taufaʻahau unified Tonga as King George Tupou I, issued a constitution in 1875, and kept Tonga's sovereignty — it became a protected state in 1900 but was never a colony, and remains a kingdom today." }
    ],
    events: [
      { year: -880, label: "Lapita reaches Tonga", detail: "The first settlers arrive with dentate-stamped pottery." },
      { year: 950, label: "First Tuʻi Tonga", detail: "Traditional founding of the sacred paramount line, ʻAhoʻeitu." },
      { year: 1200, label: "Maritime chiefdom peaks", detail: "Tongan influence spreads across Fiji, Sāmoa, and Futuna." },
      { year: 1200, label: "Haʻamonga ʻa Maui", detail: "The great coral-limestone trilithon is raised on Tongatapu." },
      { year: 1470, label: "Titles split", detail: "Executive power devolves to the Tuʻi Haʻatakalaua line." },
      { year: 1773, label: "Cook visits", detail: "Cook names Tonga the Friendly Islands." },
      { year: 1875, label: "Tongan constitution", detail: "King George Tupou I promulgates a constitution; Tonga stays sovereign." }
    ],
    museum: {
      see: [
        "Barkcloth: large decorated ngatu (Tonga), siapo (Sāmoa), masi (Fiji).",
        "Fijian and Tongan war clubs with dense chip-carved surfaces.",
        "Whale-ivory ornaments and tabua presentation teeth.",
        "Fine mats and plaited fibre work (rarely displayed — light-sensitive).",
        "Kava bowls (tanoa/kumete) with many legs, and coconut-fibre strainers.",
        "Lapita pottery sherds with dentate-stamped geometric designs."
      ],
      lingo: [
        { t: "Tapu", d: "Sacred restriction — the origin of the English word 'taboo'." },
        { t: "Koloa", d: "Women's textile wealth in Tonga." },
        { t: "Ngatu / siapo / masi", d: "Barkcloth in Tongan, Samoan, and Fijian." },
        { t: "Tabua", d: "A polished sperm-whale tooth on a cord — the supreme Fijian presentation valuable." },
        { t: "Langi", d: "A stepped, stone-faced Tongan royal tomb." },
        { t: "Kalia / drua", d: "The great Tongan and Fijian double-hulled voyaging canoes." }
      ],
      where: [
        "Tonga National Museum, Nukuʻalofa; Fiji Museum, Suva; Museum of Sāmoa, Apia.",
        "The Met — Arts of Oceania, Rockefeller Wing.",
        "de Young Museum, San Francisco — Oceanic art.",
        "British Museum — Room 24 and the Oceania collections; Te Papa, Wellington."
      ]
    }
  },

  {
    slug: "aboriginal-australia",
    name: "Aboriginal Australia",
    emoji: "🪃",
    accent: "#c2410c",
    group: "Oceania",
    region: "The Australian continent and the Torres Strait",
    start: -65000,
    end: 2025,
    spanLabel: "c. 65,000 years ago – present",
    tagline: "The world's oldest continuous living cultures — and an art tradition that runs unbroken from ochre on rock to acrylic on canvas.",
    overview: "Aboriginal and Torres Strait Islander peoples have lived in Australia for at least 65,000 years — hundreds of distinct nations, each with its own language, Country, and law. Their art is not one style but many: the X-ray paintings and Mimih figures of Arnhem Land rock shelters, the Wandjina of the Kimberley, engraved and painted rock across the continent, carved and painted bark, and — from Papunya in 1971 — the acrylic dot paintings that made Western Desert art internationally famous. These are maps, title deeds, and law as much as pictures: an artist paints the Country and the ancestral journeys they have the right to paint.",
    quick: ["At least 65,000 years of continuous occupation — the world's oldest living cultures.", "Hundreds of nations and languages, not one 'Aboriginal culture'.", "The Dreaming: ancestral beings whose journeys created and still hold the land.", "Western Desert acrylic painting began at Papunya in 1971 and transformed the art world."],
    met: "Arts of Oceania, Michael C. Rockefeller Wing — the 2025 reinstallation expanded Australian holdings, including fibre work by senior women artists. Australian institutions hold far more.",
    context: {
      bigPicture: "The central concept usually translated as 'the Dreaming' (Jukurrpa, Tjukurpa, Altyerre, and many other names) is not a mythic past but an ongoing reality: ancestral beings travelled, made the land's features, left law, and remain present in places. Rights to paint, sing, or dance a story belong to particular people through kinship and Country. This is why provenance, permission, and 'cultural warnings' on labels are not decoration — they are the framework the art actually operates in. Museum practice has changed sharply on this, including the repatriation of ancestral remains and secret-sacred objects.",
      geography: "An entire continent — tropical north, central deserts, temperate southeast, and the Torres Strait islands between Australia and New Guinea. Sea levels were lower for most of human occupation: Australia and New Guinea formed one landmass (Sahul), and the drowned coasts hold sites now underwater. Country is specific: each group's identity is tied to defined land and waters.",
      keyIdeas: [
        { t: "The Dreaming", d: "Ancestral creation that is continuous, not past — law, land, and identity in one system." },
        { t: "Country", d: "Not scenery: a living entity that people belong to and are responsible for." },
        { t: "Songlines", d: "Ancestral tracks across the land, encoded in song cycles that also work as navigation." },
        { t: "Fire-stick farming", d: "Systematic mosaic burning to manage vegetation and game over tens of thousands of years." }
      ],
      spotIt: [
        { t: "X-ray art", d: "Arnhem Land bark and rock painting showing bones and internal organs of fish and animals." },
        { t: "Rarrk", d: "Fine cross-hatching in Arnhem Land painting; the shimmer itself carries ancestral power." },
        { t: "Wandjina", d: "Kimberley rock figures with large eyes, no mouth, and a haloed head." },
        { t: "Dot fields", d: "Western Desert acrylic: dots partly derive from ground-painting practice and can conceal restricted content." },
        { t: "Aerial perspective", d: "Many desert paintings are read as maps from above — concentric circles are sites, lines are journeys." }
      ]
    },
    periods: [
      { name: "Deep time", years: "c. 65,000–12,000 years ago", start: -65000, end: -10000, summary: "Continental settlement, megafauna, and the oldest art.", detail: "People reached Sahul by sea at least 65,000 years ago (Madjedbebe in Arnhem Land). Ochre use, grindstones, and rock art follow; Lake Mungo burials, around 42,000 years old, include the world's earliest known cremation. Sites record ice-age climate swings and the drowning of coastlines at the end of the last glacial period." },
      { name: "Holocene", years: "c. 10,000 BCE – 1788 CE", start: -10000, end: 1788, summary: "Sea levels rise, populations grow, regional styles diverge.", detail: "Rising seas cut Tasmania and the Torres Strait off. Language families diversify; complex fish trap systems (Brewarrina, Budj Bim's eel channels — some of the world's oldest aquaculture) and grain harvesting appear. Trade routes move ochre, pearl shell, and stone thousands of kilometres. Makassan traders from Sulawesi visit the north coast for trepang from at least the 1700s." },
      { name: "Invasion & survival", years: "1788–1970", start: 1788, end: 1970, summary: "Dispossession, frontier violence, and the Stolen Generations.", detail: "British colonisation from 1788 brought epidemics, massacres, and dispossession; children were forcibly removed from families well into the 1970s. Aboriginal people were not counted in the census as part of the population until the 1967 referendum. Art continued throughout — bark painting, carving, and rock art — often through mission and pastoral contexts." },
      { name: "Renaissance & rights", years: "1971–present", start: 1971, end: 2025, summary: "Papunya, land rights, and global recognition.", detail: "In 1971 at Papunya, senior men began painting ceremonial designs with acrylic on board with teacher Geoffrey Bardon — the start of the Western Desert movement and of Aboriginal-owned art centers. Land rights legislation (1976), the Mabo decision overturning terra nullius (1992), and the 2008 apology followed. Artists including Emily Kame Kngwarreye, Rover Thomas, and Sally Gabori are now central to Australian art history." }
    ],
    events: [
      { year: -65000, label: "Madjedbebe", detail: "Evidence of occupation in Arnhem Land at least 65,000 years ago." },
      { year: -42000, label: "Lake Mungo burials", detail: "Ceremonial burial and the earliest known cremation." },
      { year: -6600, label: "Budj Bim eel systems", detail: "Gunditjmara stone channels and traps — among the oldest aquaculture known." },
      { year: 1788, label: "British invasion", detail: "The First Fleet lands; dispossession and epidemics follow." },
      { year: 1967, label: "Referendum", detail: "Over 90% vote to count Aboriginal people in the census and let the Commonwealth legislate for them." },
      { year: 1971, label: "Papunya Tula", detail: "The Western Desert acrylic painting movement begins." },
      { year: 1992, label: "Mabo decision", detail: "The High Court rejects terra nullius and recognises native title." }
    ],
    museum: {
      see: [
        "Bark paintings from Arnhem Land — X-ray fish, Mimih spirits, and rarrk cross-hatching.",
        "Western Desert acrylic paintings on canvas and board.",
        "Carved and painted hollow-log coffins (larrakitj / dupun).",
        "Fibre work: pandanus baskets, dilly bags, and fish traps — increasingly foregrounded.",
        "Boomerangs, shields, and clubs with incised regional patterns.",
        "Torres Strait Islander turtleshell masks and headdresses (dhoeri)."
      ],
      lingo: [
        { t: "Country", d: "The land and waters a group belongs to, capitalised for that reason." },
        { t: "The Dreaming", d: "An English gloss for many different words describing ancestral law and creation." },
        { t: "Rarrk", d: "Cross-hatching in Arnhem Land art." },
        { t: "Larrakitj", d: "A hollow-log memorial pole from northeast Arnhem Land." },
        { t: "Art center", d: "A community-owned organization that supports artists and handles sales — the ethical supply chain." },
        { t: "Cultural warning", d: "A notice that a display may contain images or names of deceased people." }
      ],
      where: [
        "National Museum of Australia and the National Gallery of Australia, Canberra; Art Gallery of NSW; Museum and Art Gallery of the NT, Darwin.",
        "The Met — Arts of Oceania, Rockefeller Wing.",
        "British Museum — Room 24 and the Oceania collections.",
        "de Young Museum, San Francisco — Oceanic art."
      ]
    }
  },

  {
    slug: "sepik",
    name: "Sepik River Peoples",
    emoji: "🐊",
    accent: "#4d7c0f",
    group: "Oceania",
    region: "The Sepik basin, northern Papua New Guinea",
    start: 1700,
    end: 2025,
    spanLabel: "c. 1700 CE – present",
    tagline: "The densest concentration of carving traditions on earth — crocodile ancestors, towering spirit houses, and hooked figures with impossible noses.",
    overview: "The Sepik River winds 1,100 km through northern Papua New Guinea, and the villages along it and its tributaries produce some of the most inventive sculpture anywhere: massive haus tambaran (spirit houses) with painted façades and soaring gables, ancestor figures, hook figures, canoe prows, slit gongs, shell-inlaid masks, and orator's stools. The crocodile is everywhere — an ancestral being whose skin pattern is cut into the backs of initiates in scarification that leaves permanent raised welts. Neighbouring villages speak different languages and carve in visibly different styles, which is why 'Sepik art' is a region, not a style.",
    quick: ["The Sepik basin in northern Papua New Guinea — hundreds of languages, dozens of carving styles.", "Haus tambaran: spirit houses with huge painted gables, the center of men's ritual life.", "The crocodile is a key ancestral being; initiation scarification imitates its skin.", "Different villages a few kilometres apart carve in immediately distinguishable styles."],
    met: "Arts of Oceania, Michael C. Rockefeller Wing — New Guinea material, including works collected by Michael C. Rockefeller. The de Young's Jolika Collection is one of the world's great New Guinea holdings.",
    context: {
      bigPicture: "Sepik carving is inseparable from initiation and from the men's house. Objects are not decoration but participants: a flute is a voice, a hook figure holds ritual offerings and ancestral presence, a slit gong speaks in named rhythms. The famously extreme stylistic variation between villages is partly a product of that intensity — each community asserting its identity through form — and partly of the trade networks that moved shell, stone, and pots up and down the river. The Iatmul, Abelam, Kwoma, Sawos, and Chambri are among the best-known groups.",
      geography: "A vast, flat, seasonally flooded river basin, with grassland, swamp, and forest, backed by the Prince Alexander and Torricelli ranges. The river is the highway; villages sit on levees and lakes. Extreme linguistic density — hundreds of languages, many unrelated — reflects long settlement in a fragmented, water-divided landscape.",
      keyIdeas: [
        { t: "Haus tambaran", d: "The men's spirit house: a huge structure whose interior holds flutes, figures, and restricted knowledge." },
        { t: "Initiation", d: "Long, staged, and physically demanding; crocodile scarification marks a man's rebirth from the ancestor." },
        { t: "Sacred flutes", d: "Paired bamboo flutes played out of sight, understood as ancestral voices." },
        { t: "Yam cults", d: "Among the Abelam, enormous ceremonial yams are grown, decorated with masks, and displayed competitively." }
      ],
      spotIt: [
        { t: "Long hooked noses", d: "Iatmul and related figures with a nose extended into a hook or joined to the chin." },
        { t: "Shell inlay", d: "Cowrie or nassa shells set into wood for eyes and patterning." },
        { t: "Crocodile forms", d: "Slit gongs, canoe prows, and initiation designs carrying crocodile identity." },
        { t: "Painted gable faces", d: "Abelam spirit-house façades painted with rows of ancestral faces in ochre, white, and black." },
        { t: "Hook figures (yipwon)", d: "Flat openwork figures of stacked hooks with a single leg — from the Karawari, southeast of the Sepik." }
      ]
    },
    periods: [
      { name: "Before contact", years: "c. 1700–1885", start: 1700, end: 1885, summary: "Village networks, trade, and ritual competition.", detail: "Sepik societies traded pottery, shell, stone, and sago along the river and with coastal peoples, and raided one another. Because wood rots quickly in the tropics, almost no surviving carvings predate the 19th century — the tradition is far older than the objects." },
      { name: "German & Australian rule", years: "1885–1975", start: 1885, end: 1975, summary: "Colonial administration and the great collecting expeditions.", detail: "German New Guinea claimed the north coast in 1885; expeditions in 1912–13 removed thousands of objects to Berlin and elsewhere. Australia administered the territory after the First World War. Missionisation, the Pacific War, and cash cropping changed ritual life, though many practices continued or were revived." },
      { name: "The Rockefeller era", years: "1957–1961", start: 1957, end: 1961, summary: "New Guinea art enters the Western canon.", detail: "Michael C. Rockefeller collected in New Guinea, most famously among the Asmat to the west, and disappeared there in 1961. The Met's Rockefeller Wing, opened in 1982 and reinstalled in 2025, is named for him — a reminder that the display history of Oceanic art in the US is entangled with a specific mid-century collecting moment." },
      { name: "Papua New Guinea", years: "1975–present", start: 1975, end: 2025, summary: "Independence, tourism, and living carving traditions.", detail: "PNG became independent in 1975. Spirit houses are still built, initiations still held, and carving continues both for ritual use and for sale. Sepik artists work in a market that ranges from village commissions to international galleries." }
    ],
    events: [
      { year: 1885, label: "German New Guinea", detail: "Colonial claim on the north coast of New Guinea." },
      { year: 1886, label: "First Sepik expedition", detail: "Europeans travel up the river and begin collecting." },
      { year: 1913, label: "Kaiserin-Augusta-Fluss expedition", detail: "A German expedition removes thousands of objects to Berlin." },
      { year: 1938, label: "Highlands contact", detail: "Expeditions reveal dense populations in the interior — a shock to administrators." },
      { year: 1961, label: "Michael Rockefeller disappears", detail: "Collecting in Asmat country, west of the Sepik." },
      { year: 1975, label: "Independence", detail: "Papua New Guinea becomes independent." },
      { year: 2005, label: "Jolika Collection", detail: "The de Young opens its major New Guinea galleries in San Francisco." }
    ],
    museum: {
      see: [
        "Ancestor figures and hook figures (yipwon).",
        "Masks: wood with shell inlay, and basketry-and-clay 'over-modeled' forms.",
        "Slit gongs (garamut) and hand drums (kundu) with carved handles.",
        "Canoe prows and house posts with crocodile and bird forms.",
        "Orator's stools, food hooks, and suspension hooks.",
        "Painted sago-spathe panels from spirit-house ceilings."
      ],
      lingo: [
        { t: "Haus tambaran", d: "Tok Pisin for the men's spirit house." },
        { t: "Garamut", d: "A slit drum carved from a log." },
        { t: "Iatmul, Abelam, Kwoma, Sawos", d: "Major Sepik groups, each with distinct carving styles." },
        { t: "Over-modeled skull", d: "An ancestral skull rebuilt with clay and shell into a portrait face." },
        { t: "Yipwon", d: "A hook figure from the Karawari region." },
        { t: "Tok Pisin", d: "PNG's creole lingua franca — the source of many terms on museum labels." }
      ],
      where: [
        "Papua New Guinea National Museum and Art Gallery, Port Moresby.",
        "de Young Museum, San Francisco — the Jolika Collection of New Guinea Art.",
        "The Met — Arts of Oceania, Rockefeller Wing.",
        "Ethnologisches Museum, Berlin (Humboldt Forum); Musée du quai Branly, Paris."
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
    lat: 40.7794, lon: -73.9632,
    emoji: "🗽",
    tagline: "Fifth Avenue + The Cloisters — one of the world's great encyclopedic museums.",
    note: "Gallery numbers change with reinstalls — cross-check the Met map before you go.",
    floors: [
      {
        id: "met-ground", name: "Ground floor",
        note: "Enter through the Great Hall on Fifth Avenue.",
        areas: [
          { id: "met-egypt", name: "Egyptian Art", galleries: "Galleries 100–138", note: "North end — don't miss the Temple of Dendur in Gallery 131.", civs: ["egypt", "nubia"] },
          { id: "met-neareast", name: "Ancient Near Eastern Art", galleries: "Galleries 400–406", note: "Assyrian reliefs and lamassu in Gallery 400; Anatolian, Phoenician, and South Arabian material sits alongside.", civs: ["mesopotamia", "persia", "hittites", "phoenicia", "saba"] },
          { id: "met-greek", name: "Greek and Roman Art", galleries: "Galleries 150–176", note: "The Leon Levy and Shelby White Court; the Etruscan gallery (170) holds the Monteleone chariot.", civs: ["greece", "rome", "minoan", "etruscans", "phoenicia"] },
          { id: "met-arms", name: "Arms and Armor", galleries: "Galleries 371–380", note: "Suits of armor and blades.", civs: ["vikings", "medieval-europe"] },
          { id: "met-africa", name: "Arts of Africa", galleries: "Rockefeller Wing (reopened 2025)", note: "Benin plaques, Ife heads, Kongo power figures, Asante gold, Dogon, Bamana, Senufo, Chokwe, and Fang sculpture.", civs: ["benin", "mali", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "bamana", "senufo", "chokwe", "igbo-ukwu", "aksum"] },
          { id: "met-americas", name: "Arts of the Ancient Americas", galleries: "Rockefeller Wing (reopened 2025)", note: "Olmec jade, Maya stelae, Aztec stone, Inca and Nazca textiles, Moche and Chimú metalwork. Includes the first US gallery for light-sensitive Andean textiles.", civs: ["olmec", "maya", "aztec", "inca", "moche", "chavin", "nazca", "chimu", "taino"] },
          { id: "met-oceania", name: "Arts of Oceania", galleries: "Rockefeller Wing (reopened 2025)", note: "Māori carving, the Asmat collection of Michael C. Rockefeller, Sepik and Polynesian works, and fibre work by senior Australian and New Guinean women artists.", civs: ["maori", "asmat", "sepik", "rapanui", "tonga", "aboriginal-australia"] }
        ]
      },
      {
        id: "met-second", name: "Second floor",
        note: "Stairs and elevators up from the Great Hall.",
        areas: [
          { id: "met-asian", name: "Asian Art", galleries: "Galleries 200–253", note: "Arts of Japan 223–232 · Arts of Korea adjacent · South & Southeast Asia incl. Gallery 249 (Khmer) and the Chola bronzes.", civs: ["china", "japan", "korea", "indus", "gupta", "khmer", "chola", "srivijaya"] },
          { id: "met-medieval", name: "Medieval Art", galleries: "Galleries 300–305", note: "Includes the Jaharis Galleries for Byzantine Art.", civs: ["byzantium", "medieval-europe", "vikings"] },
          { id: "met-islamic", name: "Islamic Art", galleries: "Galleries 450–464", note: "Art of the Arab Lands, Turkey, Iran, Central Asia, and Later South Asia — Iznik, Ottoman kaftans, and Mughal jades.", civs: ["islamic", "ottoman", "mughal", "persia"] }
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
    lat: 37.7715, lon: -122.4686,
    emoji: "🌉",
    tagline: "Golden Gate Park — strong Americas, Africa, and Oceania collections, plus Maya jade.",
    note: "Collection names used (gallery layouts rotate with exhibitions).",
    floors: [
      {
        id: "deyoung-galleries", name: "Permanent galleries",
        note: "The de Young's strengths: the Americas, Africa, Oceania, and textiles.",
        areas: [
          { id: "deyoung-americas", name: "Arts of the Americas", galleries: "Upper level", note: "Pre-Columbian and Native American art — Olmec to Inca, plus Andean textiles and ceramics.", civs: ["olmec", "maya", "aztec", "inca", "moche", "chavin", "nazca", "chimu"] },
          { id: "deyoung-africa", name: "Arts of Africa", galleries: "Upper level", note: "West and Central African sculpture, masks, and figures — often titled with no date, which is what the readers are for.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali", "bamana", "senufo", "chokwe"] },
          { id: "deyoung-oceania", name: "Arts of Oceania", galleries: "Upper level", note: "The Jolika Collection of New Guinea art — one of the best anywhere — plus Polynesian and Māori work.", civs: ["maori", "asmat", "sepik", "tonga", "rapanui", "aboriginal-australia"] },
          { id: "deyoung-jade", name: "Jade collection", galleries: "Sculpture garden level", note: "One of the world's best Mesoamerican jade displays.", civs: ["olmec", "maya", "china"] }
        ]
      }
    ]
  },

  {
    id: "legion",
    name: "Legion of Honor",
    city: "San Francisco",
    lat: 37.7844, lon: -122.5008,
    emoji: "🏛️",
    tagline: "Lincoln Park — the Fine Arts Museums' ancient art stronghold.",
    note: "Collection names used.",
    floors: [
      {
        id: "legion-galleries", name: "Permanent galleries",
        note: "The Legion of Honor holds the Bay Area's deepest ancient art galleries.",
        areas: [
          { id: "legion-ancient", name: "Ancient Art", galleries: "Ground floor", note: "Egyptian, Near Eastern, Greek, Etruscan, and Roman antiquities, plus ancient glass.", civs: ["egypt", "nubia", "mesopotamia", "persia", "greece", "rome", "minoan", "byzantium", "etruscans", "phoenicia"] },
          { id: "legion-european", name: "European art", galleries: "Various", note: "Medieval and later European painting and sculpture.", civs: ["medieval-europe", "byzantium", "vikings"] }
        ]
      }
    ]
  },

  {
    id: "aam",
    name: "Asian Art Museum",
    city: "San Francisco",
    lat: 37.7801, lon: -122.4163,
    emoji: "🏮",
    tagline: "Civic Center — one of the finest Asian art collections outside Asia.",
    note: "Organized by region: South Asia, Southeast Asia, West Asia, the Himalayas, China, Japan, Korea.",
    floors: [
      {
        id: "aam-galleries", name: "Collection galleries",
        note: "A geographic walk through Asia.",
        areas: [
          { id: "aam-south", name: "South Asia", galleries: "Gallery level", note: "Indus seals, Gupta sculpture, Chola bronzes, and Mughal painting.", civs: ["indus", "gupta", "chola", "mughal"] },
          { id: "aam-southeast", name: "Southeast Asia", galleries: "Gallery level", note: "Khmer sculpture plus Javanese and Indonesian material.", civs: ["khmer", "srivijaya"] },
          { id: "aam-west", name: "West Asia & Islamic world", galleries: "Gallery level", note: "Persian, Ottoman, and wider Islamic art.", civs: ["islamic", "persia", "mesopotamia", "ottoman"] },
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
    lat: 37.331, lon: -121.8867,
    emoji: "⚱️",
    tagline: "The largest collection of authentic ancient Egyptian artifacts in western North America.",
    note: "A short drive from the Bay Area — the best Egypt stop west of the Met.",
    floors: [
      {
        id: "rosicrucian-galleries", name: "Permanent galleries",
        note: "Egyptian and Nubian antiquities, plus a replica rock-cut tomb.",
        areas: [
          { id: "rosicrucian-egypt", name: "Ancient Egypt & Nubia", galleries: "Whole museum", note: "Mummies, coffins, daily-life objects, and a replica rock-cut tomb.", civs: ["egypt", "nubia", "mesopotamia"] }
        ]
      }
    ]
  },

  {
    id: "nmnh",
    name: "National Museum of Natural History",
    city: "Washington, DC (Smithsonian)",
    lat: 38.8913, lon: -77.026,
    emoji: "🦕",
    tagline: "The Smithsonian's natural history museum — ancient Egypt and African Voices.",
    note: "Exhibit names used (the American History museum covers US history, not ancient civilizations).",
    floors: [
      {
        id: "nmnh-halls", name: "Halls",
        note: "Anthropology halls on the first floor.",
        areas: [
          { id: "nmnh-egypt", name: "Eternal Life in Ancient Egypt", galleries: "First floor", note: "Mummies, coffins, and the afterlife.", civs: ["egypt", "nubia"] },
          { id: "nmnh-africa", name: "African Voices", galleries: "First floor", note: "Living cultures and historic kingdoms across the continent.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali", "bamana", "aksum"] }
        ]
      }
    ]
  },

  {
    id: "faaa",
    name: "National Museum of Asian Art",
    city: "Washington, DC (Smithsonian)",
    lat: 38.888, lon: -77.0268,
    emoji: "🏯",
    tagline: "The Freer Gallery of Art + the Arthur M. Sackler Gallery — Asia and the ancient Near East.",
    note: "Collection names used.",
    floors: [
      {
        id: "faaa-galleries", name: "Galleries",
        note: "Two connected buildings on the National Mall.",
        areas: [
          { id: "faaa-south", name: "South & Southeast Asia", galleries: "Sackler", note: "Indus to Gupta to Chola to Khmer, plus Mughal painting.", civs: ["indus", "gupta", "khmer", "chola", "mughal", "srivijaya"] },
          { id: "faaa-china", name: "China", galleries: "Freer + Sackler", note: "Bronzes, jade, and painting.", civs: ["china"] },
          { id: "faaa-japan", name: "Japan", galleries: "Freer", note: "Screens, scrolls, and lacquer.", civs: ["japan"] },
          { id: "faaa-korea", name: "Korea", galleries: "Freer", note: "Celadon and Buddhist art.", civs: ["korea"] },
          { id: "faaa-islamic", name: "Islamic world", galleries: "Freer + Sackler", note: "Manuscripts, ceramics, and metalwork from Iran, Turkey, and India.", civs: ["islamic", "persia", "ottoman", "mughal"] },
          { id: "faaa-neareast", name: "Ancient Near East", galleries: "Freer", note: "Mesopotamian, Persian, and South Arabian antiquities.", civs: ["mesopotamia", "persia", "saba"] }
        ]
      }
    ]
  },

  {
    id: "nmafa",
    name: "National Museum of African Art",
    city: "Washington, DC (Smithsonian)",
    lat: 38.8879, lon: -77.0256,
    emoji: "🎭",
    tagline: "The Smithsonian's museum devoted entirely to the arts of Africa.",
    note: "Collection names used.",
    floors: [
      {
        id: "nmafa-galleries", name: "Galleries",
        note: "Sub-Saharan African art, traditional and modern.",
        areas: [
          { id: "nmafa-africa", name: "Arts of Africa", galleries: "National Mall (Quadrangle, mostly underground)", note: "Benin, Yoruba, Kongo, Dogon, Fang, Bamana, Senufo, and Chokwe works, plus Ethiopian Christian art.", civs: ["benin", "yoruba", "ewe", "asante", "dogon", "fang", "kongo", "mali", "bamana", "senufo", "chokwe", "igbo-ukwu", "aksum"] }
        ]
      }
    ]
  },

  {
    id: "nmai",
    name: "National Museum of the American Indian",
    city: "Washington, DC (Smithsonian)",
    lat: 38.8881, lon: -77.0166,
    emoji: "🪶",
    tagline: "Living Indigenous cultures of the Americas — the long arc from Olmec to today.",
    note: "Centered on living communities; the pre-Columbian civs here are context.",
    floors: [
      {
        id: "nmai-halls", name: "Galleries",
        note: "Objects from across North, Central, and South America.",
        areas: [
          { id: "nmai-americas", name: "Native peoples of the Americas", galleries: "National Mall", note: "Ancient to living traditions — Olmec through Inca, plus Caribbean and Andean collections.", civs: ["olmec", "maya", "aztec", "inca", "moche", "taino", "chavin", "nazca", "chimu"] }
        ]
      }
    ]
  },

  {
    id: "britishmuseum",
    name: "The British Museum",
    city: "London",
    lat: 51.5194, lon: -0.127,
    emoji: "🇬🇧",
    tagline: "Free, enormous, and organized by room number — the most navigable encyclopedic museum in the world.",
    note: "Rooms close at short notice; check the closures board in the Great Court. Several collections here are subject to active repatriation claims.",
    floors: [
      {
        id: "bm-ground", name: "Ground floor",
        note: "Enter through the Great Court. Room numbers run roughly anticlockwise.",
        areas: [
          { id: "bm-egypt-sculpture", name: "Egyptian Sculpture", galleries: "Room 4", note: "The Rosetta Stone and the colossal 'Younger Memnon' Ramesses II.", civs: ["egypt", "nubia"] },
          { id: "bm-assyria", name: "Assyria", galleries: "Rooms 6–10, 19–20", note: "Balawat Gates, Nimrud lamassu, and the Lion Hunt of Ashurbanipal in Room 10.", civs: ["mesopotamia"] },
          { id: "bm-parthenon", name: "Greece: the Parthenon Sculptures", galleries: "Room 18 (Duveen Gallery)", note: "Pediments, metopes, and frieze. Greece has requested their return since 1983.", civs: ["greece"] },
          { id: "bm-greek-roman", name: "Greek and Roman sculpture", galleries: "Rooms 21–23", note: "Mausoleum of Halikarnassos, the world of Alexander, and Roman copies.", civs: ["greece", "rome", "etruscans"] },
          { id: "bm-americas-oceania", name: "Living and Dying · North America · Mexico", galleries: "Rooms 24, 26, 27", note: "Hoa Hakananai'a (Room 24), the turquoise double-headed serpent and Maya lintels (Room 27).", civs: ["rapanui", "maori", "aztec", "maya", "olmec", "taino"] },
          { id: "bm-africa", name: "Africa", galleries: "Room 25 (Sainsbury Galleries, lower floor)", note: "Benin plaques and brass heads, Asante goldweights, Kongo and Yoruba sculpture.", civs: ["benin", "yoruba", "asante", "kongo", "mali", "igbo-ukwu", "bamana", "senufo", "chokwe"] },
          { id: "bm-china-southasia", name: "China and South Asia", galleries: "Rooms 33, 33a", note: "The Sir Joseph Hotung Gallery — including the Chola bronze Shiva Nataraja.", civs: ["china", "gupta", "chola", "indus"] }
        ]
      },
      {
        id: "bm-upper", name: "Upper floors",
        note: "Stairs from the Great Court; the upper rooms are smaller and much quieter.",
        areas: [
          { id: "bm-europe-medieval", name: "Medieval Europe · Sutton Hoo", galleries: "Rooms 40–41", note: "The Lewis Chessmen (40) and the Sutton Hoo ship burial (41).", civs: ["medieval-europe", "vikings", "byzantium"] },
          { id: "bm-mesopotamia-upper", name: "Ancient Iran · Mesopotamia", galleries: "Rooms 52, 55–56", note: "The Oxus Treasure (52) and the Standard of Ur with the Royal Cemetery gold (56).", civs: ["persia", "mesopotamia"] },
          { id: "bm-levant-arabia", name: "The Levant · Ancient South Arabia", galleries: "Rooms 53, 57–59", note: "Room 53 covers Saba and the incense kingdoms; 57–59 cover Phoenicia and the Levant.", civs: ["saba", "phoenicia", "hittites"] },
          { id: "bm-anatolia-ethiopia", name: "Anatolia and Urartu · Ethiopia and Coptic Egypt", galleries: "Rooms 54, 66", note: "Hittite and Anatolian material; Aksumite and Ethiopian Christian art.", civs: ["hittites", "aksum"] },
          { id: "bm-egypt-mummies", name: "Egyptian death and afterlife", galleries: "Rooms 62–63", note: "Mummies, coffins, and funerary equipment — always crowded.", civs: ["egypt"] },
          { id: "bm-islamic", name: "Islamic world", galleries: "Room 42–43 (Albukhary Gallery)", note: "Ceramics, metalwork, and Iznik from across the Islamic world.", civs: ["islamic", "ottoman", "mughal", "persia"] },
          { id: "bm-japan-korea", name: "Japan and Korea", galleries: "Rooms 67, 92–94", note: "Korean gallery (67) and the Mitsubishi Corporation Japanese Galleries.", civs: ["japan", "korea"] }
        ]
      }
    ]
  },

  {
    id: "louvre",
    name: "Musée du Louvre",
    city: "Paris",
    lat: 48.8606, lon: 2.3376,
    emoji: "🇫🇷",
    tagline: "Three wings around a courtyard — and the largest Egyptian collection outside Cairo.",
    note: "Wings: Denon (south), Sully (east), Richelieu (north). Room numbers are on the door frames; each wing has its own map color.",
    floors: [
      {
        id: "louvre-sully", name: "Sully wing (east)",
        note: "The quietest of the three for antiquities. Enter via the Cour Carrée side.",
        areas: [
          { id: "louvre-egypt", name: "Egyptian antiquities", galleries: "Sully, levels 0 and 1", note: "The Seated Scribe, the Great Sphinx of Tanis, and the mastaba of Akhethetep.", civs: ["egypt", "nubia"] },
          { id: "louvre-greek", name: "Greek antiquities", galleries: "Sully level 0 (Venus de Milo, Room 346)", note: "The Winged Victory of Samothrace stands on the Daru staircase at the Denon junction.", civs: ["greece", "minoan"] },
          { id: "louvre-medieval-louvre", name: "The medieval Louvre", galleries: "Sully, level −1", note: "The 12th-century fortress foundations under the museum.", civs: ["medieval-europe"] }
        ]
      },
      {
        id: "louvre-richelieu", name: "Richelieu wing (north)",
        note: "The quietest wing overall — excellent in the afternoon.",
        areas: [
          { id: "louvre-neareast", name: "Near Eastern antiquities", galleries: "Richelieu, level 0 (Code of Hammurabi, Room 227)", note: "The Khorsabad courtyard lamassu and the glazed Archers of Darius from Susa.", civs: ["mesopotamia", "persia", "phoenicia", "hittites"] }
        ]
      },
      {
        id: "louvre-denon", name: "Denon wing (south)",
        note: "The busy one — the Mona Lisa is in Room 711 on level 1.",
        areas: [
          { id: "louvre-etruscan-roman", name: "Etruscan and Roman antiquities", galleries: "Denon, level 0", note: "The Sarcophagus of the Spouses from Cerveteri is the highlight.", civs: ["etruscans", "rome"] },
          { id: "louvre-islamic", name: "Islamic art", galleries: "Cour Visconti, Denon levels 0 and -1", note: "Under the golden wave roof; the Baptistère de Saint Louis is here.", civs: ["islamic", "persia", "ottoman", "mughal"] },
          { id: "louvre-sessions", name: "Pavillon des Sessions", galleries: "Denon, level 0 (Porte des Lions)", note: "A long-term loan from the Musée du quai Branly — Africa, Asia, Oceania, and the Americas.", civs: ["dogon", "fang", "kongo", "maori", "asmat", "sepik", "taino", "chokwe"] }
        ]
      }
    ]
  },

  {
    id: "berlin",
    name: "Museum Island (Staatliche Museen zu Berlin)",
    city: "Berlin",
    lat: 52.5219, lon: 13.4012,
    emoji: "🇩🇪",
    tagline: "Five museums on one island, plus the Humboldt Forum across the water.",
    note: "The Pergamonmuseum is fully closed for renovation. Its north wing reopens 4 June 2027; the south wing — with the Ishtar Gate — is not expected back until around 2037.",
    floors: [
      {
        id: "berlin-island", name: "Museum Island",
        note: "Neues Museum, Altes Museum, Bode-Museum, and the Alte Nationalgalerie are open; the Pergamonmuseum is not.",
        areas: [
          { id: "berlin-neues", name: "Neues Museum — Egyptian and prehistory", galleries: "Neues Museum", note: "The bust of Nefertiti, the Berlin Green Head, and the Egyptian collection.", civs: ["egypt", "nubia"] },
          { id: "berlin-altes", name: "Altes Museum — Greek, Etruscan, Roman", galleries: "Altes Museum", note: "The Antikensammlung's classical collection, plus Etruscan material.", civs: ["greece", "rome", "etruscans", "minoan"] },
          { id: "berlin-bode", name: "Bode-Museum — Byzantine art and sculpture", galleries: "Bode-Museum", note: "One of the world's best Byzantine collections, plus the coin cabinet.", civs: ["byzantium", "medieval-europe"] },
          { id: "berlin-pergamon", name: "Pergamonmuseum — CLOSED", galleries: "Closed until 2027 (north wing) / c. 2037 (south wing)", note: "The Ishtar Gate, the Processional Way, the Pergamon Altar, and the Museum für Islamische Kunst. Check before you plan around it.", civs: ["mesopotamia", "persia", "greece", "islamic", "hittites"] }
        ]
      },
      {
        id: "berlin-humboldt", name: "Humboldt Forum",
        note: "Across the Spree in the rebuilt palace — the ethnological and Asian collections.",
        areas: [
          { id: "berlin-ethnologisches", name: "Ethnologisches Museum", galleries: "Humboldt Forum, floors 2–3", note: "Oceania (including a Luf boat), the Americas, and Africa. Benin holdings were transferred to Nigerian ownership from 2022.", civs: ["sepik", "asmat", "maori", "benin", "kongo", "chokwe", "olmec", "maya", "inca", "moche"] },
          { id: "berlin-asian", name: "Museum für Asiatische Kunst", galleries: "Humboldt Forum, floor 3", note: "Chinese, Japanese, Korean, and South and Southeast Asian art.", civs: ["china", "japan", "korea", "gupta", "khmer", "srivijaya"] }
        ]
      }
    ]
  },

  {
    id: "template",
    name: "Any encyclopedic museum",
    city: "A template you can copy",
    emoji: "🧭",
    tagline: "A generic wing-by-wing skeleton — use it to map a museum this guide doesn't cover yet.",
    note: "Copy this block in data.js, change the id, name, and city, and replace the gallery names with the ones on your museum's map. Nothing else in the site needs editing — the graph, the tours, and the route pages pick it up automatically.",
    floors: [
      {
        id: "tmpl-antiquities", name: "Antiquities wing",
        note: "Almost every encyclopedic museum groups the ancient Mediterranean and Near East together.",
        areas: [
          { id: "tmpl-egypt", name: "Egypt and Nubia", galleries: "— fill in —", note: "Coffins, shabtis, stelae, and hard-stone statuary. Nubian material is usually adjacent.", civs: ["egypt", "nubia", "aksum", "saba"] },
          { id: "tmpl-neareast", name: "Ancient Near East", galleries: "— fill in —", note: "Cuneiform tablets, cylinder seals, Assyrian relief fragments, Achaemenid metalwork.", civs: ["mesopotamia", "persia", "hittites", "phoenicia"] },
          { id: "tmpl-classical", name: "Greece, Etruria, and Rome", galleries: "— fill in —", note: "Vases, marble sculpture (usually Roman copies of Greek originals), and portrait busts.", civs: ["greece", "rome", "etruscans", "minoan"] }
        ]
      },
      {
        id: "tmpl-world", name: "Africa, Americas, and Oceania",
        note: "Often one combined wing, and often the one with the thinnest labels.",
        areas: [
          { id: "tmpl-africa", name: "Arts of Africa", galleries: "— fill in —", note: "Masks and figures grouped by people rather than date; check the acquisition line.", civs: ["benin", "yoruba", "asante", "dogon", "fang", "kongo", "mali", "bamana", "senufo", "chokwe", "igbo-ukwu", "ewe"] },
          { id: "tmpl-americas", name: "Ancient Americas", galleries: "— fill in —", note: "Usually split Mesoamerica / Andes; look for the ceramic sequence to orient yourself.", civs: ["olmec", "maya", "aztec", "inca", "moche", "chavin", "nazca", "chimu", "taino"] },
          { id: "tmpl-oceania", name: "Oceania", galleries: "— fill in —", note: "Melanesian carving, Polynesian barkcloth and clubs, Aboriginal Australian painting.", civs: ["maori", "asmat", "sepik", "rapanui", "tonga", "aboriginal-australia"] }
        ]
      },
      {
        id: "tmpl-asia", name: "Asian art",
        note: "Usually organized by country, then by dynasty.",
        areas: [
          { id: "tmpl-eastasia", name: "China, Japan, Korea", galleries: "— fill in —", note: "Bronzes, ceramics, screens, and Buddhist sculpture.", civs: ["china", "japan", "korea"] },
          { id: "tmpl-southasia", name: "South and Southeast Asia", galleries: "— fill in —", note: "Stone and bronze sculpture; Khmer and Javanese material sits here too.", civs: ["indus", "gupta", "chola", "khmer", "srivijaya", "mughal"] },
          { id: "tmpl-islamic", name: "Islamic world", galleries: "— fill in —", note: "Ceramics, manuscripts, carpets, and metalwork across a millennium.", civs: ["islamic", "ottoman", "mughal", "persia"] }
        ]
      },
      {
        id: "tmpl-medieval", name: "Medieval and Byzantine",
        note: "Sometimes folded into European painting, sometimes its own wing.",
        areas: [
          { id: "tmpl-medieval-eu", name: "Medieval Europe and Byzantium", galleries: "— fill in —", note: "Ivories, reliquaries, manuscripts, and stained glass.", civs: ["medieval-europe", "byzantium", "vikings"] }
        ]
      }
    ]
  }
];

/* ---------------------------------------------------------------------------
 * RELATIONSHIP EDGES between civilizations (for the visual graph).
 *
 * type — what kind of connection:
 *   neighbor      shared a border
 *   contemporary  existed at the same time (no strong direct link implied)
 *   successor     A was succeeded by B
 *   predecessor   A preceded B
 *   influenced    A shaped B's art, ideas, or institutions
 *   region        same cultural region
 *   trade         goods moved between them
 *   script        writing system passed from A to B
 *   conquest      A conquered or invaded B
 *   religion      a religion spread from A to B
 *
 * note — optional one-line explanation, shown when you tap the edge.
 * ------------------------------------------------------------------------- */
const CIV_RELATIONS = [
  /* --- Mediterranean & Near East --- */
  { from: "egypt", to: "nubia", type: "neighbor", note: "Upstream neighbours for 3,000 years; Kush ruled Egypt as the 25th Dynasty." },
  { from: "egypt", to: "mesopotamia", type: "contemporary", note: "The two original river civilizations, developing writing within a century of each other." },
  { from: "egypt", to: "indus", type: "contemporary", note: "Bronze Age contemporaries, linked indirectly through Mesopotamian middlemen." },
  { from: "egypt", to: "hittites", type: "neighbor", note: "Fought at Kadesh in 1274 BCE, then signed the first surviving peace treaty." },
  { from: "mesopotamia", to: "indus", type: "trade", note: "Meluhha in Mesopotamian texts is probably the Indus; Indus seals turn up in Ur." },
  { from: "mesopotamia", to: "persia", type: "successor", note: "Cyrus took Babylon in 539 BCE; Persia inherited the Mesopotamian world." },
  { from: "mesopotamia", to: "hittites", type: "script", note: "The Hittites wrote their Indo-European language in Mesopotamian cuneiform." },
  { from: "hittites", to: "phoenicia", type: "contemporary", note: "Hatti's collapse c. 1180 BCE opened the sea lanes the Phoenicians took over." },
  { from: "phoenicia", to: "greece", type: "script", note: "Greeks borrowed the Phoenician alphabet c. 800 BCE and added vowels." },
  { from: "phoenicia", to: "etruscans", type: "trade", note: "Phoenician traders supplied the eastern luxuries of the Orientalizing period." },
  { from: "greece", to: "etruscans", type: "influenced", note: "Etruscans imported Athenian pottery by the shipload and adapted Greek myth." },
  { from: "etruscans", to: "rome", type: "predecessor", note: "Rome's early kings, engineering, augury, and alphabet all came via Etruria." },
  { from: "phoenicia", to: "rome", type: "conquest", note: "Rome destroyed Carthage in 146 BCE after three Punic Wars." },
  { from: "minoan", to: "greece", type: "predecessor", note: "Mycenaean Greeks took over Crete and adapted Linear A into Linear B." },
  { from: "greece", to: "rome", type: "influenced", note: "'Captive Greece took captive her savage conqueror' — Horace." },
  { from: "rome", to: "byzantium", type: "successor", note: "Byzantium is the Roman Empire, continuing east from Constantinople." },
  { from: "persia", to: "egypt", type: "conquest", note: "Cambyses II conquered Egypt in 525 BCE; Persia ruled it as a satrapy." },
  { from: "persia", to: "gupta", type: "trade", note: "The overland routes linking Iran to northern India carried goods and motifs both ways." },
  { from: "persia", to: "islamic", type: "region", note: "Persian administration, poetry, and design shaped the Islamic world after 651 CE." },
  { from: "byzantium", to: "islamic", type: "contemporary", note: "Neighbours, rivals, and constant borrowers of each other's craft." },
  { from: "byzantium", to: "vikings", type: "trade", note: "Rus traders sailed the rivers to Constantinople; some served in the Varangian Guard." },
  { from: "byzantium", to: "ottoman", type: "conquest", note: "Mehmed II took Constantinople in 1453, ending the Roman Empire." },
  { from: "saba", to: "egypt", type: "trade", note: "Frankincense and myrrh from South Arabia burned in Egyptian and Mediterranean temples." },
  { from: "saba", to: "aksum", type: "influenced", note: "South Arabian script, temple forms, and motifs cross the Red Sea into Ethiopia." },
  { from: "aksum", to: "nubia", type: "conquest", note: "Aksumite campaigns around 350 CE helped end the kingdom of Meroë." },
  { from: "aksum", to: "saba", type: "conquest", note: "Kaleb of Aksum invaded Himyarite Yemen in 525 CE." },

  /* --- Medieval world --- */
  { from: "vikings", to: "medieval-europe", type: "contemporary", note: "Raiders, then settlers, then Normans — the Vikings became medieval Europe." },
  { from: "islamic", to: "medieval-europe", type: "influenced", note: "Paper, algebra, Aristotle, and lustreware reached Europe through al-Andalus and Sicily." },
  { from: "islamic", to: "mali", type: "religion", note: "Islam travelled the trans-Saharan trade routes into the Sahel." },
  { from: "islamic", to: "ottoman", type: "predecessor", note: "The Ottomans inherited the caliphal role after taking Cairo in 1517." },
  { from: "islamic", to: "mughal", type: "religion", note: "Persianate Islam is the Mughal court's language, faith, and aesthetic frame." },
  { from: "ottoman", to: "medieval-europe", type: "contemporary", note: "Europe's permanent neighbour and rival from 1453 onward." },
  { from: "mali", to: "islamic", type: "trade", note: "West African gold financed Mediterranean and Middle Eastern economies." },

  /* --- Asia --- */
  { from: "china", to: "japan", type: "influenced", note: "Writing, Buddhism, and city planning reached Japan largely via Korea." },
  { from: "china", to: "korea", type: "influenced", note: "Chinese characters, Confucian statecraft, and Buddhism entered Korea first." },
  { from: "china", to: "japan", type: "script", note: "Japanese kanji are Chinese characters, adopted from about the 5th century CE." },
  { from: "korea", to: "japan", type: "influenced", note: "Korean craftsmen and monks carried continental culture across the strait." },
  { from: "china", to: "srivijaya", type: "trade", note: "Chinese pilgrims and merchants stopped in Sumatra en route to India." },
  { from: "indus", to: "gupta", type: "successor", note: "A gap of a millennium, but the same subcontinental thread." },
  { from: "gupta", to: "khmer", type: "religion", note: "Hinduism and Buddhism, Sanskrit, and temple form travelled to Southeast Asia." },
  { from: "gupta", to: "srivijaya", type: "religion", note: "Indian Buddhism made Srivijaya a study center for Chinese pilgrims." },
  { from: "gupta", to: "chola", type: "predecessor", note: "The Gupta-era synthesis of Hindu temple and image underlies South Indian practice." },
  { from: "chola", to: "srivijaya", type: "conquest", note: "Rajendra I's fleet raided Srivijayan ports in 1025 CE." },
  { from: "chola", to: "khmer", type: "trade", note: "Bay of Bengal trade linked Tamil merchant guilds to mainland Southeast Asia." },
  { from: "mughal", to: "chola", type: "region", note: "Mughal power never fully held the Tamil south the Cholas had ruled." },
  { from: "persia", to: "mughal", type: "influenced", note: "Humayun's exile in Safavid Iran brought Persian painters to India." },

  /* --- Africa --- */
  { from: "yoruba", to: "benin", type: "influenced", note: "Benin tradition holds that Ife sent the first oba and taught bronze casting." },
  { from: "igbo-ukwu", to: "benin", type: "predecessor", note: "Nigerian lost-wax casting three centuries before Ife or Benin." },
  { from: "mali", to: "bamana", type: "predecessor", note: "Both belong to the Mande world of the middle Niger." },
  { from: "bamana", to: "dogon", type: "neighbor", note: "Neighbours in Mali, with overlapping smiths, markets, and mask traditions." },
  { from: "bamana", to: "senufo", type: "region", note: "Savanna neighbours with comparable initiation-society structures." },
  { from: "senufo", to: "asante", type: "trade", note: "Both sat on the kola and gold routes between forest and Sahel." },
  { from: "chokwe", to: "kongo", type: "region", note: "Central African neighbours in the Congo basin trade system." },
  { from: "chokwe", to: "fang", type: "region", note: "Both are Central African carving traditions collected heavily around 1900." },
  { from: "nubia", to: "aksum", type: "neighbor", note: "Successive Nile-corridor and Red Sea powers." },

  /* --- The Americas --- */
  { from: "olmec", to: "maya", type: "influenced", note: "Calendar, ballgame, and colossal sculpture begin with the Olmec." },
  { from: "maya", to: "aztec", type: "influenced", note: "The Aztecs revered Teotihuacan and inherited a shared Mesoamerican tradition." },
  { from: "chavin", to: "moche", type: "predecessor", note: "Chavín's fanged deities and metallurgy underlie all later Andean art." },
  { from: "chavin", to: "nazca", type: "predecessor", note: "Paracas, Nazca's ancestor, grew directly out of the Chavín horizon." },
  { from: "moche", to: "chimu", type: "predecessor", note: "Chimor took over Moche valleys, canals, and metalworking traditions." },
  { from: "nazca", to: "inca", type: "predecessor", note: "The Wari, then the Inca, absorbed the south coast." },
  { from: "chimu", to: "inca", type: "conquest", note: "The Inca took Chimor c. 1470 and moved its goldsmiths to Cusco." },
  { from: "moche", to: "inca", type: "predecessor", note: "A long north-coast tradition eventually folded into Tawantinsuyu." },
  { from: "taino", to: "maya", type: "contemporary", note: "Caribbean and Mesoamerican worlds, in contact only indirectly." },

  /* --- Oceania --- */
  { from: "tonga", to: "maori", type: "predecessor", note: "West Polynesia is the homeland from which Aotearoa was settled." },
  { from: "tonga", to: "rapanui", type: "predecessor", note: "Eastern Polynesian voyagers ultimately came out of the West Polynesian homeland." },
  { from: "rapanui", to: "maori", type: "region", note: "Both East Polynesian: related languages, related carving logic." },
  { from: "sepik", to: "asmat", type: "region", note: "New Guinea carving traditions, on opposite sides of the island." },
  { from: "aboriginal-australia", to: "sepik", type: "neighbor", note: "Australia and New Guinea were one landmass (Sahul) until c. 8,000 years ago." },
  { from: "maori", to: "asmat", type: "region", note: "Both are Oceanic carving traditions, but a world apart culturally." }
];

const REL_LABELS = {
  neighbor: "neighbor",
  contemporary: "contemporary",
  successor: "succeeded by",
  predecessor: "preceded by",
  influenced: "influenced",
  region: "same region",
  trade: "traded with",
  script: "script passed to",
  conquest: "conquered",
  religion: "religion spread to"
};

/* ---------------------------------------------------------------------------
 * MASTERPIECES — one iconic object per civilization, as a 60-second read.
 * These become "object" nodes in the graph and cards in the readers.
 * civ = the civilization slug it belongs to.
 * ------------------------------------------------------------------------- */
const MASTERPIECES = [
  {
    id: "rosetta-stone", civ: "egypt", name: "The Rosetta Stone", emoji: "🪨",
    date: "196 BCE", material: "Granodiorite, 112 × 76 cm",
    where: "British Museum, Room 4",
    hook: "One boring tax decree, written three times — and suddenly 3,000 years of Egyptian could be read again.",
    read: "It is a priestly decree honouring Ptolemy V, cut in hieroglyphic, Demotic, and Greek. Nobody cared about the content; what mattered was that scholars could read the Greek. Working from the Greek and from Coptic, Thomas Young and then Jean-François Champollion cracked the hieroglyphic system by 1822, proving it recorded sounds and not just ideas. Found by French soldiers at el-Rashid in 1799 and handed to Britain under the 1801 Capitulation of Alexandria, it has been on display in London since 1802 and is the subject of long-standing Egyptian repatriation requests.",
    lookFor: ["Three scripts stacked in bands — hieroglyphs on top, Demotic, then Greek.", "Cartouches: the oval rings around 'Ptolemy' were Champollion's way in.", "The broken top-left corner — the hieroglyphic section is the most damaged.", "White infill in the letters is 20th-century; it was cleaned back in 1999."]
  },
  {
    id: "ishtar-gate", civ: "mesopotamia", name: "The Ishtar Gate", emoji: "🐉",
    date: "c. 575 BCE", material: "Glazed brick",
    where: "Pergamonmuseum, Berlin (South Wing closed for renovation until c. 2037)",
    hook: "Nebuchadnezzar's front door: a wall of cobalt-glazed brick covered in dragons and bulls, rebuilt inside a Berlin museum.",
    read: "The gate was the ceremonial entrance to Babylon on the Processional Way, faced with bricks glazed a deep lapis blue and stamped with alternating rows of aurochs (for the storm god Adad) and mušḫuššu dragons (for Marduk, Babylon's own god). Robert Koldewey's excavations of 1899–1917 shipped the fragments to Berlin, where the smaller front gate was reconstructed from them. It is a reminder that Babylonian monumentality is a matter of color and repetition rather than carved stone — there is very little good building stone in Mesopotamia, so they baked their architecture.",
    lookFor: ["Two animals only: horned aurochs and the scaly, eagle-footed mušḫuššu dragon.", "Each animal is assembled from dozens of individually moulded bricks.", "The blue is a copper-based glaze, still saturated after 2,500 years.", "The reconstruction is the smaller gate — the larger one is too big for the hall."]
  },
  {
    id: "benin-plaques", civ: "benin", name: "The Benin Plaques", emoji: "🛡️",
    date: "16th–17th century CE", material: "Brass, lost-wax cast",
    where: "British Museum (Room 25), the Met, and a growing number back in Nigeria",
    hook: "A palace clad in brass photographs — and the most contested objects in any Western museum.",
    read: "Around a thousand rectangular brass plaques once covered the wooden pillars of the oba's palace in Benin City, recording court ritual, warriors, Portuguese traders, and the king himself in high relief. They were looted in the British punitive expedition of 1897, which burned the city and sold the objects to fund the campaign. That provenance is now the center of the restitution debate: Germany transferred ownership of over a thousand Benin objects to Nigeria from 2022, and other institutions have followed. When you read a Benin label, read the acquisition line too — it is part of the object.",
    lookFor: ["Hierarchical scale: the oba is largest, attendants smaller.", "River-leaf background pattern filling every empty space.", "Coral-bead regalia — collars, crowns, and strands marking rank.", "Portuguese figures with long hair and matchlocks, shown as exotic outsiders.", "Two nail holes at the corners, from mounting on palace pillars."]
  },
  {
    id: "yaxchilan-lintel", civ: "maya", name: "Yaxchilán Lintel 24", emoji: "🩸",
    date: "c. 725 CE", material: "Limestone relief",
    where: "British Museum, Room 27 (Mexico)",
    hook: "A queen pulls a rope of thorns through her tongue — and it is carved with the delicacy of a jewel.",
    read: "Lady K'ab'al Xook kneels before her husband Shield Jaguar II, who holds a torch, and draws a thorn-studded cord through her pierced tongue into a basket of bark paper below. This is bloodletting: royal blood, burned as offering, produced visions of ancestors. The relief is one of the finest surviving Maya carvings, and the detail — the woven textile, the individual thorns, the glyph block dating the event to 28 October 709 CE — shows what Maya sculptors could do at their peak. It also flatly contradicts the old idea that Maya art is impersonal: this is a named woman on a named day.",
    lookFor: ["The thorn rope and the basket of spotted bark paper beneath.", "Her huipil's woven diamond pattern, rendered thread by thread.", "Traces of the original red and blue-green pigment.", "Glyph blocks giving the exact date and both participants' names."]
  },
  {
    id: "nataraja", civ: "chola", name: "Shiva Nataraja", emoji: "🔥",
    date: "c. 11th century CE", material: "Bronze, lost-wax cast",
    where: "The Met (Asian Art), Government Museum Chennai, and many major collections",
    hook: "The universe destroyed and remade in one dance, solved as a problem in bronze casting.",
    read: "Shiva dances the tandava inside a ring of flame: the drum in his upper right hand beats creation, the fire in his upper left ends it, the lower right hand says 'do not be afraid', and the lower left points to his raised foot — refuge. Under his other foot lies Apasmara, the dwarf of ignorance. Each of these was cast in a single pour of bronze around a wax model that had to be destroyed to release it, and each was made to be dressed, garlanded, and carried through the streets. The form is a Chola invention that became, via Rodin's admiration and a thousand posters, the most reproduced image in Indian art.",
    lookFor: ["The prabhavali — the ring of flame — often cast separately and slotted in.", "Ganga, the river goddess, as a tiny figure in his flying hair.", "The dwarf Apasmara under the planted right foot.", "Lugs or holes in the base for the carrying poles of a procession."]
  },
  {
    id: "moai", civ: "rapanui", name: "Hoa Hakananai'a", emoji: "🗿",
    date: "c. 1000–1200 CE", material: "Basalt, 2.42 m",
    where: "British Museum, Room 24",
    hook: "An ancestor taken from a house at Orongo in 1868 — and carved on the back with the birdman cult that replaced him.",
    read: "Most moai are soft volcanic tuff; this one is hard basalt, which is why the carving is so crisp. Its name is usually translated 'lost or stolen friend'. What makes it exceptional is the back: after the statue era ended, its rear was carved with birdman (tangata manu) reliefs, two frigate-bird-headed men facing each other, plus vulva symbols and a dance paddle. So one object records both religious systems, before and after. It was removed by the crew of HMS Topaze in 1868; the Rapa Nui community has formally requested its return.",
    lookFor: ["The heavy overhanging brow and the long, straight nose.", "Elongated earlobes and the thin, tight line of the mouth.", "The birdman reliefs on the back and top of the head — the reason to walk around it.", "Empty eye sockets: the white coral eyes were inserted only when a moai was raised."]
  },
  {
    id: "standard-of-ur", civ: "mesopotamia", name: "The Standard of Ur", emoji: "🐚",
    date: "c. 2500 BCE", material: "Shell, lapis lazuli, and red limestone in bitumen",
    where: "British Museum, Room 56",
    hook: "War on one side, a banquet on the other — the oldest comic strip about power.",
    read: "A hollow wooden box, found crushed in a royal grave at Ur, inlaid on both long sides in three registers. On the 'War' side, chariots roll over enemies, prisoners are stripped and paraded before the king, who is drawn larger than everyone. On the 'Peace' side, animals and goods are brought to a seated banquet with a lyre player. Nobody knows what it actually was — Leonard Woolley guessed a standard carried on a pole. What it certainly is: an argument that Sumerian kingship rests on victory and on the redistribution of plenty.",
    lookFor: ["Read each side bottom to top, like a comic page.", "The king breaking the register line — larger and taller than his court.", "Lapis lazuli, imported over 2,500 km from Afghanistan.", "Solid-wheeled chariots pulled by onagers, not horses."]
  },
  {
    id: "terracotta-army", civ: "china", name: "The Terracotta Army", emoji: "🏺",
    date: "c. 210 BCE", material: "Terracotta, life-size",
    where: "Xi'an, China; individual figures travel on loan worldwide",
    hook: "Eight thousand soldiers, mass-produced from moulded parts, each finished with a different face.",
    read: "Qin Shi Huang, who unified China in 221 BCE, was buried with an army to serve him in the afterlife: infantry, archers, cavalry, chariots, and officers, arranged in battle formation in pits east of his tomb mound. The bodies were made from standardised moulded components — legs, torsos, arms — then heads and details were individualized and the whole thing painted in bright colors that mostly flaked off within minutes of excavation. It is simultaneously the greatest surviving expression of Chinese imperial ambition and a case study in assembly-line manufacture 2,000 years before Ford.",
    lookFor: ["Rank shown by armour, hairstyle, and height — generals are tallest.", "Traces of pigment in crevices; they were once fully polychrome.", "Mould seams where standard components were joined.", "Workshop marks stamped or incised in the clay — the foreman's quality control."]
  },
  {
    id: "sutton-hoo-helmet", civ: "medieval-europe", name: "The Sutton Hoo Helmet", emoji: "⚔️",
    date: "Early 7th century CE", material: "Iron, tinned bronze, and garnet",
    where: "British Museum, Room 41",
    hook: "A face made of a dragon: the moustache is the beast's tail, the nose its body, the eyebrows its wings.",
    read: "Found in 1939 in a buried ship at Sutton Hoo, Suffolk, probably the grave of King Rædwald of East Anglia. It came out of the ground in hundreds of fragments and has been reconstructed twice. The mask has a hidden joke in metal: the nose, moustache, and eyebrows together form a flying dragon whose head meets a second animal head above. Garnets glitter in the eyebrows, and one eyebrow's garnets have no foil behind them — so in firelight one eye would flash and the other would go dark. The burial dates the Anglo-Saxon world firmly to a rich, connected, Scandinavian-facing Europe rather than a dark age.",
    lookFor: ["The dragon hidden in the face — trace nose, moustache, and eyebrows as one animal.", "Panels of stamped tinned-bronze foil with warriors and dancers.", "Garnet inlays in the eyebrows; look for the asymmetry.", "The 1971 reconstruction is next to the original in most displays."]
  },
  {
    id: "temple-of-dendur", civ: "egypt", name: "The Temple of Dendur", emoji: "🏛️",
    date: "c. 10 BCE", material: "Aeolian sandstone",
    where: "The Met, Gallery 131 (the Sackler Wing)",
    hook: "An entire Roman-era Egyptian temple, rescued from a rising lake and rebuilt beside a wall of glass in New York.",
    read: "Built under Augustus for the goddess Isis and two deified local brothers, Pediese and Pihor, drowned sons of a Nubian chief. When the Aswan High Dam flooded Lower Nubia in the 1960s, UNESCO coordinated the rescue of the monuments; Egypt gave Dendur to the United States in 1965 and the Met won it in 1967. It is Egyptian in form but Roman in date: Augustus appears on the walls dressed as a pharaoh making offerings, which is exactly how Roman rule presented itself locally. The 19th-century graffiti on the walls are now historic in their own right.",
    lookFor: ["Augustus in pharaonic dress making offerings — check the cartouches.", "Papyrus and lotus columns at the entrance, symbolising Lower and Upper Egypt.", "Graffiti from European travellers, one dated 1820.", "Water in front of the temple, staged to stand in for the Nile."]
  },
  {
    id: "mask-of-agamemnon", civ: "greece", name: "The Mask of Agamemnon", emoji: "🎭",
    date: "c. 1550–1500 BCE", material: "Hammered gold",
    where: "National Archaeological Museum, Athens",
    hook: "'I have gazed upon the face of Agamemnon' — a great line, and almost certainly wrong by three centuries.",
    read: "Heinrich Schliemann found this gold funerary mask in Grave Circle A at Mycenae in 1876 and immediately attached it to Homer's king. The date is roughly 1550–1500 BCE, some 300 years before any plausible Trojan War, so the identification is fiction. What it really shows is Mycenaean elite burial: sheet gold hammered over a wooden form and pressed onto the face of a dead man, alongside others in the same grave circle. Its authenticity has occasionally been questioned — the handlebar moustache and ear cutouts are unusual — but the consensus is that it is genuine.",
    lookFor: ["Beaten sheet gold, not cast: you can see the thinness at the edges.", "Closed eyes with an incised eyelid line — a death mask convention.", "Ears cut free of the sheet, unlike the other masks from the same graves.", "Compare it to the plainer masks nearby; this one is the outlier."]
  },
  {
    id: "moche-lord-of-sipan", civ: "moche", name: "The Lord of Sipán", emoji: "👑",
    date: "c. 250 CE", material: "Gold, silver, copper, turquoise, shell",
    where: "Museo Tumbas Reales de Sipán, Lambayeque, Peru",
    hook: "An unlooted royal Moche tomb — and the man inside turned out to be the figure painted on the pots.",
    read: "In 1987 Walter Alva raced looters to a mud-brick platform at Sipán and found an intact burial: a man in his late 30s wearing gold and turquoise ear ornaments, a gold-and-silver back-flap, crescent headdress, and hundreds of shell beads, accompanied by attendants, a dog, and llamas. Crucially, his regalia match the figure known from Moche painted ceramics as the Warrior Priest, who presides over the Sacrifice Ceremony — so the imagery on the pots turned out to record real people performing real rituals. It is the richest undisturbed tomb ever excavated in the Americas.",
    lookFor: ["Paired gold and silver — the Moche split ornaments left/right by metal.", "Turquoise-and-gold mosaic ear ornaments with tiny warrior figures.", "The crescent-shaped nose ornament and back-flap, both signs of rank.", "Peanut-shaped beads: ten of gold, ten of silver."]
  }
];

/* ---------------------------------------------------------------------------
 * TOURS — "start here" routes through a museum, timed for a real visit.
 * Each stop points at a gallery area (from MUSEUMS) and/or a civ reader.
 * ------------------------------------------------------------------------- */
const TOURS = [
  {
    id: "met-90",
    museum: "met",
    name: "The Met in 90 minutes",
    minutes: 90,
    blurb: "One loop of the ground floor plus a short climb, hitting five continents without doubling back. Enter from Fifth Avenue.",
    stops: [
      { minutes: 20, area: "met-egypt", title: "Egypt → the Temple of Dendur", civs: ["egypt", "nubia"], what: "Walk the Egyptian galleries north in date order and finish in the glass-walled Dendur room (Gallery 131). Don't stop at every case — look for one Old Kingdom statue, one Middle Kingdom face, and one New Kingdom coffin.", why: "It sets a 3,000-year baseline you'll measure everything else against." },
      { minutes: 12, area: "met-neareast", title: "Assyria and the lamassu", civs: ["mesopotamia", "persia"], what: "Gallery 400: the human-headed winged bulls and the palace reliefs from Nimrud.", why: "The other river civilization — and the one that invented the propaganda relief." },
      { minutes: 18, area: "met-greek", title: "Greece and Rome", civs: ["greece", "rome", "etruscans"], what: "Cut through the Greek and Roman court. Find one kouros, one red-figure vase, and one Roman portrait bust; the Etruscan chariot is in Gallery 170.", why: "You can watch sculpture learn to move, then learn to look like a specific person." },
      { minutes: 22, area: "met-africa", title: "The Rockefeller Wing", civs: ["benin", "yoruba", "kongo", "olmec", "maya", "maori", "asmat"], what: "Reopened in 2025 and split into three: Arts of Africa, the Ancient Americas, and Oceania. Do all three quickly rather than one slowly.", why: "It's the best single hour of world art in the building, and the Andean textile gallery is unique in the US." },
      { minutes: 18, area: "met-asian", title: "Asian Art upstairs", civs: ["china", "japan", "korea", "gupta", "khmer", "chola"], what: "Up to the second floor: the Astor Court, Chinese Buddhist sculpture, the Japanese screens, and the South Asian bronzes.", why: "The Nataraja and the Khmer sculpture are worth the stairs on their own." }
    ],
    tips: ["Fifth Avenue entrance is busiest at 11am; the 81st Street entrance is usually faster.", "The Cloisters is a separate building uptown — don't try to add it to this.", "Every gallery number here can change with a reinstall. Check the Met app map."]
  },
  {
    id: "deyoung-75",
    museum: "deyoung",
    name: "de Young in 75 minutes",
    minutes: 75,
    blurb: "The de Young's real strengths are Oceania, Africa, and the Americas — this route skips the temporary shows entirely.",
    stops: [
      { minutes: 25, area: "deyoung-oceania", title: "The Jolika Collection", civs: ["sepik", "asmat", "maori"], what: "New Guinea art on a scale you won't see elsewhere in the US: spirit-house figures, masks, hook figures, and shields.", why: "This is the collection that justifies the museum. Give it the most time." },
      { minutes: 20, area: "deyoung-africa", title: "Arts of Africa", civs: ["benin", "yoruba", "bamana", "senufo", "dogon", "kongo", "chokwe"], what: "Masks and figures from West and Central Africa. Look for the differences between a Bamana Chi Wara, a Senufo kpelie, and a Dogon mask — three savanna traditions, three logics.", why: "Labels here are often minimal. This is where a reader earns its keep." },
      { minutes: 20, area: "deyoung-americas", title: "Arts of the Americas", civs: ["olmec", "maya", "aztec", "moche", "nazca", "chimu"], what: "Pre-Columbian ceramics, gold, and stone, plus Native American basketry and textiles.", why: "The Andean and Mesoamerican sequences are easy to confuse; the readers separate them." },
      { minutes: 10, area: "deyoung-jade", title: "The jade room", civs: ["olmec", "maya", "china"], what: "One of the world's best Mesoamerican jade displays, on the sculpture garden level.", why: "Olmec jade is where Mesoamerican art starts — small, dense, and easy to miss." }
    ],
    tips: ["The de Young frequently gives objects a title and no date. Open the reader for the culture and use its timeline.", "Free days and the Hamon Tower observation deck are worth checking on the way in.", "Golden Gate Park parking fills by 11am on weekends; the N Judah plus a walk is faster."]
  },
  {
    id: "smithsonian-120",
    museum: "nmnh",
    name: "Smithsonian ancient-world crawl (2 hours)",
    minutes: 120,
    blurb: "Three free museums within a five-minute walk on the National Mall. This is the ancient and non-Western route, not the US history one.",
    stops: [
      { minutes: 30, area: "nmnh-egypt", title: "Natural History: Eternal Life in Ancient Egypt", civs: ["egypt", "nubia"], what: "Mummies, coffins, and the mechanics of the afterlife, on the first floor.", why: "Compact and well-labelled — a good warm-up." },
      { minutes: 25, area: "nmnh-africa", title: "Natural History: African Voices", civs: ["mali", "benin", "yoruba", "asante"], what: "Living cultures and historic kingdoms across the continent.", why: "Frames Africa as present-tense rather than as a set of artifacts." },
      { minutes: 30, area: "nmafa-africa", title: "National Museum of African Art", civs: ["benin", "yoruba", "kongo", "bamana", "senufo", "chokwe", "igbo-ukwu"], what: "Cross the Mall to the Quadrangle building — it's mostly underground.", why: "The deepest African art collection in the country, and rarely crowded." },
      { minutes: 35, area: "faaa-china", title: "National Museum of Asian Art (Freer + Sackler)", civs: ["china", "japan", "korea", "gupta", "khmer", "islamic", "persia", "mughal"], what: "Two connected buildings: Chinese bronzes and painting, Japanese screens, South Asian sculpture, and Islamic manuscripts.", why: "The Freer's Peacock Room alone is worth the last half hour." }
    ],
    tips: ["All Smithsonian museums are free and have security lines — go early.", "The African Art and Asian Art museums are largely underground and connected via the Quadrangle.", "The American History museum is excellent but has almost no ancient material."]
  },
  {
    id: "britishmuseum-90",
    museum: "britishmuseum",
    name: "British Museum in 90 minutes",
    minutes: 90,
    blurb: "The classic anchor-object route: ground floor west to east, then upstairs for the small, dense rooms.",
    stops: [
      { minutes: 15, area: "bm-egypt-sculpture", title: "Room 4: Rosetta Stone and Egyptian sculpture", civs: ["egypt"], what: "The Rosetta Stone is immediately left of the Great Court entrance and always crowded — go straight there, then walk the colossal sculpture gallery, including the 'Younger Memnon' Ramesses II.", why: "One stone that made an entire civilization readable again." },
      { minutes: 15, area: "bm-assyria", title: "Rooms 6–10: Assyria", civs: ["mesopotamia"], what: "The Balawat Gates, the Nimrud lamassu, and — in Room 10 — the Lion Hunt of Ashurbanipal.", why: "The Lion Hunt reliefs are arguably the finest narrative carving of the ancient Near East." },
      { minutes: 20, area: "bm-parthenon", title: "Room 18: the Parthenon Sculptures", civs: ["greece"], what: "The Duveen Gallery: pediment figures, metopes, and the frieze.", why: "Also the single most contested display in any museum — Greece has requested their return since 1983." },
      { minutes: 10, area: "bm-americas-oceania", title: "Rooms 24 and 27: Hoa Hakananai'a and Mexico", civs: ["rapanui", "aztec", "maya", "taino"], what: "The moai stands in Room 24 (Living and Dying); Room 27 has the turquoise double-headed serpent and Maya lintels.", why: "Walk behind the moai — the birdman carvings on its back are the real story." },
      { minutes: 15, area: "bm-europe-medieval", title: "Rooms 40–41: Lewis Chessmen and Sutton Hoo", civs: ["medieval-europe", "vikings"], what: "Upstairs. The chess pieces are in Room 40, the Sutton Hoo ship burial in Room 41.", why: "The helmet is the best object in the building for two minutes of close looking." },
      { minutes: 15, area: "bm-mesopotamia-upper", title: "Rooms 52 and 56: Oxus Treasure and the Standard of Ur", civs: ["persia", "mesopotamia"], what: "Room 56 has the Standard of Ur and the Royal Cemetery gold; Room 52 has the Achaemenid Oxus Treasure.", why: "Small rooms, enormous objects — and usually much quieter than downstairs." }
    ],
    tips: ["Entry is free but timed tickets help at peak times; the Montague Place entrance has shorter queues than Great Russell Street.", "Rooms close at short notice for staffing — check the closures list at the door.", "Egyptian mummies (Rooms 62–63) are a 20-minute detour if you have time."]
  },
  {
    id: "louvre-120",
    museum: "louvre",
    name: "Louvre ancient world (2 hours)",
    minutes: 120,
    blurb: "Skip the Mona Lisa scrum entirely. This is the antiquities route through Sully and Richelieu, which are the quiet wings.",
    stops: [
      { minutes: 30, area: "louvre-egypt", title: "Sully: Egyptian antiquities", civs: ["egypt", "nubia"], what: "The largest Egyptian collection outside Cairo. Find the Seated Scribe, the Great Sphinx of Tanis, and the mastaba of Akhethetep.", why: "The Seated Scribe's inlaid rock-crystal eyes are worth the trip on their own." },
      { minutes: 25, area: "louvre-neareast", title: "Richelieu: Near Eastern antiquities", civs: ["mesopotamia", "persia", "phoenicia"], what: "The Code of Hammurabi (Room 227), the Khorsabad courtyard with its lamassu, and the glazed-brick Archers of Darius from Susa.", why: "The Hammurabi stele is the oldest substantial law code you can stand in front of." },
      { minutes: 25, area: "louvre-greek", title: "Sully & Denon: Greek and Roman", civs: ["greece", "rome", "etruscans"], what: "Venus de Milo on level 0 of Sully, the Winged Victory of Samothrace on the Daru staircase, and the Etruscan Sarcophagus of the Spouses in Denon.", why: "The Sarcophagus of the Spouses is the single best Etruscan object anywhere." },
      { minutes: 20, area: "louvre-islamic", title: "Islamic art in the Cour Visconti", civs: ["islamic", "persia", "ottoman", "mughal"], what: "Under the golden wave roof in the Visconti courtyard — ceramics, metalwork, and the Baptistère de Saint Louis.", why: "A superb, purpose-built gallery that most visitors never find." },
      { minutes: 20, area: "louvre-sessions", title: "Pavillon des Sessions", civs: ["dogon", "maori", "asmat", "sepik", "taino"], what: "A hundred or so works from Africa, Asia, Oceania, and the Americas, on long-term loan from the quai Branly, near the Porte des Lions.", why: "Very few people go, and the installation is unusually generous with space." }
    ],
    tips: ["Enter via the Carrousel du Louvre or Porte des Lions instead of the Pyramid — the queue is a fraction of the size.", "Most tickets do not allow re-entry, so eat inside or do one continuous visit.", "Wednesday and Friday evenings are the quietest hours of the week."]
  }
];

/* ---------------------------------------------------------------------------
 * RESOURCES — where to check a fact, look up an object, or read more.
 * Everything here is free unless marked otherwise.
 * ------------------------------------------------------------------------- */
const RESOURCES = [
  {
    group: "Look up an object you're standing in front of",
    items: [
      { name: "The Met Collection", url: "https://www.metmuseum.org/art/collection", what: "490,000+ objects, most with a full catalogue entry. Search the accession number on the label and you usually get provenance, bibliography, and a zoomable photo." },
      { name: "British Museum Collection Online", url: "https://www.britishmuseum.org/collection", what: "Around 4.5 million records. Also the fastest way to check which room something is actually in today." },
      { name: "Google Arts & Culture", url: "https://artsandculture.google.com/", what: "Gigapixel images from hundreds of museums — good for looking at brushwork or tool marks you can't get close enough to see in person." },
      { name: "Smithsonian Open Access", url: "https://www.si.edu/openaccess", what: "Millions of images released into the public domain, including 3D scans." },
      { name: "Europeana", url: "https://www.europeana.eu/", what: "Aggregates collections from thousands of European institutions in one search." }
    ]
  },
  {
    group: "Reliable background reading (free)",
    items: [
      { name: "Heilbrunn Timeline of Art History", url: "https://www.metmuseum.org/toah", what: "The Met's essay series organized by region and period. The single best free resource for exactly the kind of context a museum label omits." },
      { name: "Smarthistory", url: "https://smarthistory.org/", what: "Short, scholar-written essays and videos on individual objects. Excellent for 'what am I looking at' at gallery speed." },
      { name: "Khan Academy — Art History", url: "https://www.khanacademy.org/humanities/art-history", what: "Built largely on Smarthistory content, organized as a course if you want a sequence." },
      { name: "World History Encyclopedia", url: "https://www.worldhistory.org/", what: "Peer-reviewed articles, maps, and timelines. Good on civilizations that get thin coverage elsewhere." },
      { name: "Ancient Near East Today (ASOR)", url: "https://www.asor.org/anetoday/", what: "Working archaeologists writing for non-specialists about current Near Eastern research." },
      { name: "Perseus Digital Library", url: "https://www.perseus.tufts.edu/hopper/", what: "Greek and Roman primary texts in the original and in translation, all cross-linked." }
    ]
  },
  {
    group: "Maps, chronology, and 'where was this?'",
    items: [
      { name: "ORBIS (Stanford)", url: "https://orbis.stanford.edu/", what: "A route planner for the Roman world — travel times and costs by season. Weirdly delightful." },
      { name: "Pleiades", url: "https://pleiades.stoa.org/", what: "A gazetteer of ancient places with coordinates; the reference database behind most digital classics work." },
      { name: "Digital Atlas of the Roman Empire", url: "https://dare.ht.lu.se/", what: "Ancient sites plotted on a modern map." },
      { name: "Running Reality", url: "https://www.runningreality.org/", what: "A model of world political borders you can scrub through year by year." }
    ]
  },
  {
    group: "Provenance, restitution, and reading the acquisition line",
    items: [
      { name: "Digital Benin", url: "https://digitalbenin.org/", what: "Every known Benin object in Western collections, in one searchable database, with Edo-language names." },
      { name: "Returning Heritage", url: "https://www.returningheritage.com/", what: "A running news record of restitution cases and museum policy changes." },
      { name: "Museum provenance research guides (AAMD)", url: "https://aamd.org/object-registry", what: "Object registries for works with gaps in their ownership history." }
    ]
  },
  {
    group: "Listen and watch",
    items: [
      { name: "A History of the World in 100 Objects (BBC/British Museum)", url: "https://www.bbc.co.uk/programmes/b00nrtd2", what: "100 fifteen-minute episodes, each on one object. Still the best museum audio ever made." },
      { name: "The Met's Audio Guide", url: "https://www.metmuseum.org/visit/audio-guide", what: "Free in the Met app, works on your own headphones." },
      { name: "Smarthistory YouTube", url: "https://www.youtube.com/@smarthistoryvideos", what: "Two people looking hard at one object and arguing about it, which is the correct way to do this." }
    ]
  },
  {
    group: "Practical, in the building",
    items: [
      { name: "Bay Area Museums & Pass Guide", url: "/museums/", what: "This site: 70 Bay Area museums with NARM/ROAM reciprocity, free days, and entry-card info." },
      { name: "Museum reciprocal programs (NARM)", url: "https://narmassociation.org/", what: "One membership, free admission at 1,300+ institutions. Pays for itself in two trips." },
      { name: "Bloomberg Connects", url: "https://www.bloombergconnects.org/", what: "Free digital guides for hundreds of museums in one app — often better than the museum's own signage." }
    ]
  }
];

/* ---------------------------------------------------------------------------
 * GLOSSARY — label vocabulary that shows up across many civilizations.
 * ------------------------------------------------------------------------- */
const GLOSSARY = [
  { t: "c. / ca.", d: "Circa — 'about'. On a label it means the date is an estimate, often ±50 years or more." },
  { t: "BCE / CE", d: "Before Common Era / Common Era. Numerically identical to BC/AD." },
  { t: "BP", d: "'Before Present', counted from 1950. Used for radiocarbon dates, so 5,000 BP ≈ 3050 BCE." },
  { t: "Attributed to", d: "The museum thinks this artist made it but can't prove it. 'Workshop of' is weaker; 'circle of' or 'follower of' weaker still." },
  { t: "Provenance", d: "The ownership history of an object. Gaps between 1933 and 1945, or a colonial-era military expedition, are the ones to notice." },
  { t: "Accession number", d: "The catalogue number, usually formatted year.lot.item (e.g. 1979.206.121). Search it on the museum's site for the full record." },
  { t: "Gift of / Bequest of", d: "How the museum got it. 'Purchase, [name] Gift' means money from a donor rather than the object itself." },
  { t: "Polychrome", d: "Painted in several colors. Most ancient stone sculpture was polychrome; the white marble look is loss, not taste." },
  { t: "In situ", d: "Found in its original position — which makes its context, and therefore its meaning, far more reliable." },
  { t: "Repoussé", d: "Sheet metal hammered from behind to raise a design; chasing is the same from the front." },
  { t: "Lost-wax casting", d: "A wax model is coated in clay, melted out, and replaced with molten metal. Each cast destroys its model." },
  { t: "Slip", d: "Liquid clay, often colored, painted onto pottery before firing." },
  { t: "Faience", d: "Not clay: a glazed silica paste, usually blue-green. Common in Egypt and the Near East." },
  { t: "Terracotta", d: "Fired clay, unglazed." },
  { t: "Stela / stele", d: "An upright stone slab with carving or inscription." },
  { t: "Relief", d: "Carving raised from a background. High relief projects a lot; sunk relief is cut into the surface (an Egyptian speciality)." },
  { t: "Votive", d: "Given to a deity as an offering or in fulfilment of a vow — not made to be used." },
  { t: "Funerary", d: "Made for burial. A huge share of what survives from any ancient culture is funerary, which skews what we think they cared about." },
  { t: "Ex-collection", d: "Previously owned by a named collector — often a clue to when and how it left its country of origin." },
  { t: "Reconstructed / composite", d: "Assembled from fragments, sometimes from more than one object. Worth knowing before you admire the symmetry." }
];
