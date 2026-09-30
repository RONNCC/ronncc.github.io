/* Deep Vein Thrombosis, Up Close — content layer (window.DVTData)
 * All prose, numbers, and citations that the figures and panels render.
 * Loaded before figures.js and app.js. Pure data: no DOM, no side effects.
 * Every claim carries a `refs` key pointing at an id in `sources`.
 */
(function () {
  'use strict';

  var DVTData = {

    /* ------------------------------------------------------------------
     * Fig. 1 — zoom levels for the scale explorer
     * ---------------------------------------------------------------- */
    scaleLevels: [
      {
        id: 'leg',
        chip: 'Whole leg',
        scaleBar: '10 cm',
        scaleLabel: 'the whole calf',
        title: 'A clot you cannot see',
        caption: 'Deep veins run inside the calf, between and within the muscles. '
          + 'From the outside, a DVT has no shape of its own — everything you notice '
          + 'is the leg reacting to it.',
        facts: [
          'The deep veins sit under the muscle fascia, alongside the two bones of the lower leg.',
          'The calf holds roughly 100–150 mL of blood in these veins when relaxed.',
          'Each calf contraction pushes 40–60% of it upward, against gravity.'
        ]
      },
      {
        id: 'slice',
        chip: 'Calf slice',
        scaleBar: '2 cm',
        scaleLabel: 'a slice across the mid-calf',
        title: 'Not one vein — a network',
        caption: 'Cut across the calf and you find paired deep veins beside each bone, plus '
          + 'muscular veins threaded through the soleus and gastrocnemius. A clot can fill '
          + 'one, several, or all of them.',
        facts: [
          'Three paired deep veins: peroneal, posterior tibial, anterior tibial.',
          'Two muscular systems: the soleal sinuses and the gastrocnemius veins.',
          'Veins are paired, so a report will say "left peroneal veins" or "posterior tibial veins".'
        ]
      },
      {
        id: 'vein',
        chip: 'One vein',
        scaleBar: '5 mm',
        scaleLabel: 'one deep vein, in cross-section',
        title: 'Open, then filled',
        caption: 'A normal vein is floppy: press it and the walls meet. Fill it with clot and '
          + 'it becomes a stiff tube — distended, non-compressible, and blocked or narrowed '
          + 'to the flow of blood.',
        facts: [
          'Non-compressibility is the primary sign of a DVT on ultrasound.',
          'A fresh clot is hypoechoic — dark and easy to overlook on a grey-scale image.',
          'An occlusive clot blocks the lumen; a non-occlusive one leaves flow around it.'
        ]
      },
      {
        id: 'valve',
        chip: 'Valve pocket',
        scaleBar: '0.5 mm',
        scaleLabel: 'behind a venous valve leaflet',
        title: 'Where it usually starts',
        caption: 'Behind each valve leaflet is a pocket of slow, swirling, low-oxygen blood. '
          + 'The endothelium there behaves like injured tissue, and the first strands of '
          + 'fibrin catch in the eddy. This is the origin point of most venous clots.',
        facts: [
          'Valve pockets are hypoxic even in healthy people — worse with immobility.',
          'Autopsy and imaging series trace most calf clots to valve pockets and soleal sinuses.',
          'Clots grow from the wall inward, then extend along the vein — often upward.'
        ]
      }
    ],

    /* ------------------------------------------------------------------
     * Fig. 2 — veins of the calf
     * `type` drives styling: proximal | axial | muscular | superficial
     * ---------------------------------------------------------------- */
    veins: [
      {
        id: 'popliteal',
        name: 'Popliteal vein',
        type: 'proximal',
        typeLabel: 'Proximal deep vein',
        drains: 'The collecting trunk behind the knee, where the calf veins and the small '
          + 'saphenous vein converge. It becomes the femoral vein as it travels up the thigh.',
        why: 'This is the boundary line. A clot reaching the popliteal vein or above is '
          + 'classified as a proximal DVT — a different disease, with a much higher risk of '
          + 'pulmonary embolism — and the guidelines recommend anticoagulating it.',
        ask: 'How far is the top of my clot from here?'
      },
      {
        id: 'trunk',
        name: 'Tibioperoneal trunk',
        type: 'axial',
        typeLabel: 'Deep axial vein (short segment)',
        drains: 'A short common segment just below the knee where the peroneal and posterior '
          + 'tibial veins meet before joining the popliteal vein.',
        why: 'Because it is the meeting point of two veins, it is a natural place for clot '
          + 'from either of them to converge — and it sits only centimetres below the '
          + 'proximal boundary.',
        ask: 'Is the clot at or below the trifurcation?'
      },
      {
        id: 'peroneal',
        name: 'Peroneal (fibular) veins',
        type: 'axial',
        typeLabel: 'Deep axial vein — paired',
        drains: 'The lateral compartment of the calf and the outer side of the ankle. Runs '
          + 'alongside the fibula, the thin bone on the outside of the lower leg.',
        why: 'Together with the posterior tibial veins, one of the two most commonly involved '
          + 'veins in a calf DVT. Clots here are "axial" rather than muscular, which carries a '
          + 'slightly higher risk of extension than a clot confined to the muscle veins.',
        ask: 'Is this one of the veins involved, and is it on one side or both?'
      },
      {
        id: 'posttibial',
        name: 'Posterior tibial veins',
        type: 'axial',
        typeLabel: 'Deep axial vein — paired',
        drains: 'The sole of the foot and the deep tissues of the calf. Runs down behind the '
          + 'medial ankle, behind the shin bone.',
        why: 'The other workhorse of the calf DVT list. Because these are paired veins the '
          + 'sonographer compresses, a clot may fill one of the pair or both.',
        ask: 'How many of the paired veins are affected?'
      },
      {
        id: 'anttibial',
        name: 'Anterior tibial veins',
        type: 'axial',
        typeLabel: 'Deep axial vein — paired, anterior',
        drains: 'The front of the ankle and the dorsum of the foot, running down the front of '
          + 'the shin near the membrane between the two leg bones.',
        why: 'Rarely the site of a DVT — rare enough that some ultrasound protocols do not '
          + 'examine them routinely. Mentioned here so you know the whole map.',
        ask: 'Were these looked at, or were they outside the protocol?'
      },
      {
        id: 'soleal',
        name: 'Soleal sinuses',
        type: 'muscular',
        typeLabel: 'Muscular vein (venous sinusoids)',
        drains: 'Wide, pouch-like venous spaces inside the soleus muscle — the flat muscle '
          + 'deep in the calf. They act as the reservoir for the calf pump.',
        why: 'A very common origin point for calf clots: the blood moves slowly, sits low in '
          + 'oxygen, and the pouches are wide and irregular. Clots confined to muscular veins '
          + 'are generally lower risk for extension than axial ones — but they are frequently '
          + 'sore.',
        ask: 'Is my clot in the muscle veins, the axial veins, or both?'
      },
      {
        id: 'gastrocnemius',
        name: 'Gastrocnemius veins',
        type: 'muscular',
        typeLabel: 'Muscular vein',
        drains: 'The two heads of the calf muscle (the bulge you can grab) into the popliteal '
          + 'vein behind the knee.',
        why: 'Often involved in calf DVT, and often tender. Because they sit close to the '
          + 'popliteal vein, a clot here is worth watching carefully.',
        ask: 'Do the gastrocnemius veins drain straight into the popliteal vein?'
      },
      {
        id: 'sm_saph',
        name: 'Small saphenous vein',
        type: 'superficial',
        typeLabel: 'Superficial vein',
        drains: 'The outer border of the foot and the back of the calf, emptying into the '
          + 'popliteal vein behind the knee.',
        why: 'Superficial. A clot here is superficial thrombophlebitis rather than a DVT, '
          + 'usually managed differently — but its junction with the popliteal vein sits '
          + 'right next to the deep system, which is why doctors look at it.',
        ask: 'Is anything in my case superficial rather than deep?'
      },
      {
        id: 'grt_saph',
        name: 'Great saphenous vein',
        type: 'superficial',
        typeLabel: 'Superficial vein',
        drains: 'The inner border of the foot and the whole inner surface of the leg, up '
          + 'through the groin into the femoral vein.',
        why: 'The long superficial vein you can see under thin skin. Clots here are '
          + 'superficial thrombophlebitis; they matter mainly when they involve the junction '
          + 'in the groin or extend toward the deep system.',
        ask: 'Is my surface vein bulging because of the clot, or independently?'
      }
    ],

    veinToggles: {
      zones: {
        label: 'Proximal / distal line',
        note: 'Below the popliteal vein is the distal (calf) territory; from the popliteal '
          + 'vein upward is proximal.'
      },
      valves: {
        label: 'Show valves',
        note: 'One-way valves every few centimetres — and a pocket of slow blood behind each one.'
      },
      labels: {
        label: 'Show labels',
        note: 'Anatomical labels for the bones and muscles.'
      }
    },

    /* ------------------------------------------------------------------
     * Fig. 3 — symptoms to switch on and off
     * ---------------------------------------------------------------- */
    symptoms: [
      {
        id: 'swelling',
        label: 'Swelling',
        layer: 'swelling',
        note: 'The most specific of the findings, and still not specific enough on its own. '
          + 'Swelling comes from obstructed outflow: blood backs up behind the clot.'
      },
      {
        id: 'warmth',
        label: 'Warmth',
        layer: 'warmth',
        note: 'The leg feels warm to the back of the hand. Comes from inflammation in and '
          + 'around the vein wall, plus dilated surface vessels.'
      },
      {
        id: 'erythema',
        label: 'Redness / dusky skin',
        layer: 'erythema',
        note: 'Pink, red, or faintly blue-grey over the calf. Easily mistaken for cellulitis, '
          + 'which is one of the classic misdiagnoses in both directions.'
      },
      {
        id: 'tenderness',
        label: 'Tenderness',
        layer: 'tenderness',
        note: 'Deep tenderness along the lines of the veins — posterior calf, behind the '
          + 'medial ankle, in the popliteal space. Present in most people with a symptomatic '
          + 'clot, and very nonspecific.'
      },
      {
        id: 'heaviness',
        label: 'Heaviness or tightness',
        layer: 'heaviness',
        note: 'A leg that feels full, tight, or leaden — worse at the end of the day, worse '
          + 'after standing, sometimes better with the leg up.'
      },
      {
        id: 'collateral',
        label: 'Surface veins',
        layer: 'collateral',
        note: 'New, more prominent superficial veins over the calf: collaterals opening up to '
          + 'carry blood around the blocked deep vein. This finding has its own point in the '
          + 'Wells score.'
      },
      {
        id: 'shiny',
        label: 'Tight, shiny skin',
        layer: 'shiny',
        note: 'Skin stretched by swelling, shiny and smooth, sometimes with sock or shoe marks '
          + 'that stay indented. A late feature of a well-swollen leg.'
      },
      {
        id: 'pitting',
        label: 'Pitting edema',
        layer: 'pitting',
        note: 'Press a fingertip into the swollen calf for a few seconds: a normal leg springs '
          + 'back, a swollen one keeps a dimple. "Unilateral pitting edema" is another point in '
          + 'the Wells score.'
      }
    ],

    /* ------------------------------------------------------------------
     * Fig. 4 — ultrasound simulation
     * ---------------------------------------------------------------- */
    ultrasound: {
      modes: {
        normal: {
          label: 'Healthy vein',
          lumenNote: 'Walls appose and the lumen obliterates.',
          verdict: {
            key: 'normal',
            title: 'Normal vein — compressible',
            body: 'At full pressure the vein walls touch and the lumen disappears. That is '
              + 'what a normal vein does: it is a floppy tube full of liquid. Colour flow '
              + 'fills the lumen, and the vein is smaller than the artery next to it in this '
              + 'position.'
          }
        },
        dvt: {
          label: 'Vein with a clot',
          lumenNote: 'Lumen stays open — the clot is the filling.',
          verdict: {
            key: 'dvt',
            title: 'Non-compressible vein — the primary sign of DVT',
            body: 'Pressure that would flatten a normal vein leaves this one open. The vein '
              + 'looks distended, the lumen is filled with hypoechoic (dark) thrombus, and '
              + 'colour Doppler shows little or no flow through the segment. This is the '
              + 'finding the whole diagnosis rests on.'
          }
        }
      },
      pressureStages: [
        { max: 8, text: 'Probe resting on the skin — the vein fills the field.' },
        { max: 40, text: 'Light pressure: a normal vein starts to oval, a clotted vein barely moves.' },
        { max: 75, text: 'Firm pressure: the difference becomes obvious.' },
        { max: 100, text: 'Maximal pressure: the healthy vein is obliterated; the clotted one is not.' }
      ],
      labels: {
        normal: [
          { id: 'probe', text: 'Linear probe, across the calf' },
          { id: 'skin', text: 'Skin and subcutaneous fat' },
          { id: 'muscle', text: 'Calf muscle (gastrocnemius / soleus)' },
          { id: 'vein', text: 'Deep vein — thin wall, dark lumen' },
          { id: 'artery', text: 'Artery — thicker wall, rounder, pulsatile' },
          { id: 'depth', text: 'Depth scale: each mark is 1 cm' }
        ],
        dvt: [
          { id: 'probe', text: 'Linear probe, across the calf' },
          { id: 'vein', text: 'Distended, non-compressible vein' },
          { id: 'thrombus', text: 'Thrombus: hypoechoic (dark) filling the lumen' },
          { id: 'artery', text: 'Artery, unchanged next to it' },
          { id: 'depth', text: 'Depth scale: each mark is 1 cm' }
        ]
      },
      legend: [
        { swatch: 'vein', label: 'Vein lumen' },
        { swatch: 'thrombus', label: 'Thrombus (acute)' },
        { swatch: 'artery', label: 'Artery' },
        { swatch: 'flow', label: 'Colour Doppler flow' },
        { swatch: 'tissue', label: 'Muscle and fat' }
      ],
      longView: {
        normal: {
          title: 'Along the vein: a normal segment',
          body: 'Running the probe along the vein shows a smooth, even tube. Valve leaflets '
            + 'appear as faint white lines that open and close with breathing and with the '
            + 'calf pump — and a normal vein narrows and widens with the breath.'
        },
        dvt: {
          title: 'Along the vein: measuring the clot',
          body: 'In long axis the sonographer measures the clot from its lowest point to its '
            + 'top end, and notes how far that top end sits from the popliteal vein. Length, '
            + 'number of veins involved, and that distance are the numbers that decide whether '
            + 'you are treated or watched.'
        }
      }
    },

    /* ------------------------------------------------------------------
     * Fig. 5 — Virchow's triad
     * ---------------------------------------------------------------- */
    triad: [
      {
        id: 'stasis',
        name: 'Stasis',
        short: 'Blood that stops moving',
        body: 'Slow or pooling flow lets activated clotting factors accumulate instead of '
          + 'being diluted and washed downstream, and it drops the oxygen tension in the valve '
          + 'pockets. In the calf this is usually the dominant arm — the reason immobility, '
          + 'casts, long journeys and hospital beds matter so much.',
        detail: 'The calf pump is what keeps stasis away. Without it, the soleal sinuses and '
          + 'valve pockets become stagnant pools — low flow, low oxygen, and an endothelium '
          + 'that starts signalling like injured tissue.'
      },
      {
        id: 'injury',
        name: 'Endothelial injury',
        short: 'A vein wall under stress',
        body: 'The endothelium is the vein\'s non-stick lining. When it is damaged, or when it '
          + 'simply behaves as if it were damaged, it stops being anticoagulant and starts '
          + 'recruiting platelets, white cells and tissue factor.',
        detail: 'Injury can be mechanical (surgery, trauma, a catheter, a twist or stretch in '
          + 'the leg) or functional: hypoxia, inflammation and shear stress all push the '
          + 'endothelium toward a pro-clotting state. This is why inflammation, infection and '
          + 'illness are risk factors even without a wound.'
      },
      {
        id: 'hyper',
        name: 'Hypercoagulability',
        short: 'Blood that clots too readily',
        body: 'The balance of the clotting system tilts toward clotting: more clotting factors, '
          + 'fewer natural anticoagulants, stickier platelets. It can be inherited, acquired, '
          + 'or temporary.',
        detail: 'Cancer, oestrogen-containing medication, pregnancy, dehydration, obesity, '
          + 'smoking and inherited thrombophilias like factor V Leiden all act here. Most '
          + 'people who develop a clot have more than one arm of the triad working at once.'
      }
    ],

    /* risk factors: `arms` references triad ids and drives the highlight */
    riskFactors: [
      { label: 'Recent surgery (especially hip or knee)', arms: ['injury', 'stasis', 'hyper'], note: 'All three arms at once: tissue trauma, immobility, and a post-operative clotting-system rebound.' },
      { label: 'Bed rest of 3 days or more', arms: ['stasis'], note: 'The calves stop pumping and the valve pockets go stagnant.' },
      { label: 'Hospitalisation for any illness', arms: ['stasis', 'hyper'], note: 'Illness plus immobility plus inflammation — the risk is highest during and just after the stay.' },
      { label: 'Long journeys over about 4 hours', arms: ['stasis'], note: 'Seated, legs down, calves not pumping. Dehydration usually comes along for the ride.' },
      { label: 'Cast, brace or splint on the leg', arms: ['stasis', 'injury'], note: 'Immobilised calf plus local pressure on the veins.' },
      { label: 'Paralysis, paresis or weak leg muscles', arms: ['stasis'], note: 'The pump itself is out of action.' },
      { label: 'Active cancer or chemotherapy', arms: ['hyper', 'injury'], note: 'A powerful driver of hypercoagulability — cancer is one of the strongest risk factors for extension.' },
      { label: 'Pregnancy and up to ~6 weeks after birth', arms: ['stasis', 'hyper'], note: 'Pelvic pressure on the veins, plus the clotting changes of pregnancy.' },
      { label: 'Oestrogen: combined pill, patch, or HRT', arms: ['hyper'], note: 'A modest risk on its own; multiplies with smoking or an inherited thrombophilia.' },
      { label: 'A previous DVT or PE', arms: ['hyper', 'injury', 'stasis'], note: 'The strongest single predictor of another clot — and a factor in how long treatment lasts.' },
      { label: 'Inherited thrombophilia (e.g. factor V Leiden)', arms: ['hyper'], note: 'A genetic tilt toward clotting; usually needs a second trigger to cause an event.' },
      { label: 'Antiphospholipid syndrome', arms: ['hyper', 'injury'], note: 'An autoimmune driver of clotting that affects the vein wall too.' },
      { label: 'Age — risk climbs steadily after 40–60', arms: ['stasis', 'hyper'], note: 'Veins get stiffer, valves get less competent, and clotting proteins drift up.' },
      { label: 'Obesity', arms: ['stasis', 'hyper'], note: 'Raised pressure in the leg veins plus low-grade inflammation.' },
      { label: 'Smoking', arms: ['hyper', 'injury'], note: 'Damages the endothelium and increases clotting activity.' },
      { label: 'Dehydration', arms: ['stasis', 'hyper'], note: 'The same blood volume moving through the same pipes, but thicker — a small, fixable factor.' },
      { label: 'Varicose veins / chronic venous disease', arms: ['stasis'], note: 'Already-impaired venous flow and dilated, incompetent veins.' },
      { label: 'Inflammatory bowel disease, or chronic inflammatory illness', arms: ['hyper', 'injury'], note: 'Systemic inflammation pushes both the clotting system and the endothelium.' },
      { label: 'Heart failure or chronic lung disease', arms: ['stasis', 'hyper'], note: 'Higher venous pressures and a chronically activated clotting system.' },
      { label: 'Injury or trauma to the leg', arms: ['injury'], note: 'Direct damage to a vein wall, plus the immobility that follows.' },
      { label: 'Sepsis or severe infection', arms: ['hyper', 'injury'], note: 'Inflammation turns on clotting deliberately — which is part of why sepsis is so risky.' },
      { label: 'Long-term care or nursing home residence', arms: ['stasis', 'hyper'], note: 'A bundle of immobility and frailty. Hospitalisation out of that setting is a common trigger.' }
    ],

    /* ------------------------------------------------------------------
     * Fig. 6 — timeline
     * ---------------------------------------------------------------- */
    timeline: [
      {
        when: 'The moment it starts',
        span: 'Minutes to hours',
        title: 'A clot begins in a valve pocket',
        body: 'Nothing is felt at this stage. Fibrin strands and red cells accumulate in a '
          + 'pocket of slow blood, and the clot starts to grow along the vein wall.',
        tone: 'quiet',
        fill: 8
      },
      {
        when: 'First few days',
        span: 'Day 0–7',
        title: 'Either symptoms, or nothing at all',
        body: 'Most people with a symptomatic calf clot develop a sore, swollen calf. About '
          + 'half of all DVTs cause no symptoms at all, which is why some are found by '
          + 'accident.',
        tone: 'active',
        fill: 26
      },
      {
        when: 'The watch window',
        span: 'Week 1–2',
        title: 'The weeks when extension happens',
        body: 'Roughly 8–15% of calf clots extend into the proximal veins. This is why a '
          + 'watch-and-wait plan means repeat ultrasound scans about once a week for two '
          + 'weeks: extension is easiest to catch here.',
        tone: 'warn',
        fill: 62
      },
      {
        when: 'Two to six weeks',
        span: 'Week 2–6',
        title: 'The clot stops growing and starts organising',
        body: 'Inflammation and the body\'s own clot-dissolving system break the clot down. '
          + 'It becomes firmer and more adherent to the vein wall — which is good news for '
          + 'embolism risk and bad news for the vein\'s flexibility.',
        tone: 'quiet',
        fill: 40
      },
      {
        when: 'The usual treatment milestone',
        span: 'Around month 3',
        title: 'The course of anticoagulation ends',
        body: 'When anticoagulation is used, three months is the standard minimum. At the end '
          + 'the plan gets reviewed: whether to continue depends on whether the clot was '
          + 'provoked, your bleeding risk, and your preference.',
        tone: 'active',
        fill: 52
      },
      {
        when: 'The long tail',
        span: 'Months 3 to 24 and beyond',
        title: 'Vein recovery, and the two numbers to know',
        body: 'One third to one half of people after a DVT develop some post-thrombotic '
          + 'symptoms — swelling, aching, discolouration, scaling. And about one third of '
          + 'people with a VTE will have another event within 10 years.',
        tone: 'warn',
        fill: 74
      }
    ],

    /* ------------------------------------------------------------------
     * Fig. 7 — embolisation route
     * ---------------------------------------------------------------- */
    embolusSteps: [
      {
        id: 'free',
        title: 'A piece comes free',
        body: 'An embolus can only travel if part of the clot detaches. Fresh clot — soft, '
          + 'red-cell-rich, only days old — is the friable kind. This is why the first days '
          + 'and weeks after a clot forms are the risky window, and why starting treatment '
          + 'promptly matters.',
        stat: 'Treatable window',
        anchor: 'calf'
      },
      {
        id: 'popliteal',
        title: 'At the popliteal vein, the rules change',
        body: 'Crossing from the calf veins into the popliteal vein means the clot is now '
          + 'proximal. Above this line the veins are wider, the clot burden is larger, and '
          + 'the route to the heart is shorter and straighter — which is exactly why '
          + 'guidelines treat proximal clot much more aggressively than distal.',
        stat: 'Distal → proximal',
        anchor: 'popliteal'
      },
      {
        id: 'femoral',
        title: 'Up the femoral vein',
        body: 'The femoral vein runs up the inner thigh. A long, mobile clot can slide along '
          + 'it like a train on a track — sometimes detaching in a single piece. This is the '
          + 'route that makes thigh-level clots the most embolism-prone.',
        stat: 'The thigh highway',
        anchor: 'femoral'
      },
      {
        id: 'ivc',
        title: 'Through the pelvis into the great vein',
        body: 'The iliac veins join to form the inferior vena cava, the main venous highway '
          + 'from the lower body to the heart. Flow here is fast and unidirectional: once an '
          + 'embolus is in, it is on the way.',
        stat: 'Size matters',
        anchor: 'ivc'
      },
      {
        id: 'heart',
        title: 'Straight through the right heart',
        body: 'Right atrium, tricuspid valve, right ventricle, pulmonary valve. The heart is '
          + 'a pumping station, not a filter — nothing here stops a clot. It is carried out '
          + 'into the pulmonary arteries.',
        stat: 'No filter here',
        anchor: 'heart'
      },
      {
        id: 'lung',
        title: 'Lodged in the lung',
        body: 'The pulmonary arteries branch and narrow quickly. A clot lodges where the '
          + 'vessel becomes too small — a pulmonary embolism. A small one may cause '
          + 'breathlessness and chest pain; a large one blocks enough of the lung\'s blood '
          + 'supply to strain the right heart. In about a quarter of people with a PE, sudden '
          + 'death is the first symptom, which is exactly why the warning signs are worth '
          + 'knowing by heart.',
        stat: 'Emergency',
        anchor: 'lung'
      }
    ],

    /* ------------------------------------------------------------------
     * Fig. 8 — management trade-off
     * ---------------------------------------------------------------- */
    managementPaths: {
      treat: {
        id: 'treat',
        badge: 'Anticoagulate',
        tone: 'treat',
        title: 'Treat — anticoagulation, usually for at least 3 months',
        body: 'Severe symptoms or risk factors for extension tilt the balance toward '
          + 'treatment, because the chance of the clot growing is judged to outweigh the '
          + 'bleeding risk. The dose and choice of agent are the same as for a proximal DVT. '
          + 'Three months is the standard minimum; whether you continue after that is reviewed '
          + 'separately.',
        bullets: [
          'Direct oral anticoagulants (apixaban, rivaroxaban, edoxaban, dabigatran) are '
            + 'recommended over warfarin for most people.',
          'Active cancer, a previous VTE, an unprovoked clot, or being an inpatient all favour '
            + 'treatment.',
          'You will be reassessed for bleeding risk as you go, not just at the start.'
        ]
      },
      surveil: {
        id: 'surveil',
        badge: 'Watch with repeat scans',
        tone: 'watch',
        title: 'Monitor — serial ultrasound for 2 weeks, no anticoagulation unless it extends',
        body: 'If there are no severe symptoms and no risk factors for extension, the '
          + 'guidelines suggest repeat ultrasounds over starting blood thinners. The trade-off '
          + 'is inconvenience and the small chance of missing an extension, against avoiding '
          + 'the bleeding risk of anticoagulation entirely.',
        bullets: [
          'Repeat compression ultrasound about once a week for two weeks.',
          'If the clot has not extended, no anticoagulation is recommended.',
          'If it extends — especially above the popliteal vein — anticoagulation starts.',
          'If weekly scanning is impractical for you, treating for three months is a '
            + 'reasonable alternative.'
        ]
      },
      surveilBleed: {
        id: 'surveilBleed',
        badge: 'Watch with repeat scans',
        tone: 'watch',
        title: 'Monitor first, because bleeding risk is high',
        body: 'When the bleeding risk of anticoagulation is high, serial imaging becomes the '
          + 'safer first move even where symptoms or extension risk would otherwise favour '
          + 'treatment. Anticoagulation is then added if the scans show extension or '
          + 'recurrence — at which point the bleeding risk gets re-weighed against a clot that '
          + 'is demonstrably growing.',
        bullets: [
          'Repeat whole-leg ultrasound after about a week, and again if symptoms change.',
          'Symptoms are re-assessed at each visit, not just the images.',
          'The plan can switch to treatment at any point if the clot extends.'
        ]
      }
    },

    /* ------------------------------------------------------------------
     * Fig. 9 — Wells score for DVT
     * ---------------------------------------------------------------- */
    wells: [
      { id: 'cancer', points: 1, label: 'Active cancer', hint: 'Treatment ongoing, within the last 6 months, or palliative.' },
      { id: 'paralysis', points: 1, label: 'Paralysis, paresis, or a recent cast on the leg', hint: 'Includes recent plaster immobilisation of the lower limb.' },
      { id: 'bedrest', points: 1, label: 'Bedridden 3+ days, or major surgery in the last 12 weeks', hint: 'Major surgery needing general or regional anaesthesia.' },
      { id: 'tender', points: 1, label: 'Tenderness along the deep veins', hint: 'Firm palpation in the centre of the posterior calf, behind the knee, and along the femoral vein in the groin or thigh.' },
      { id: 'wholeleg', points: 1, label: 'The whole leg is swollen', hint: 'Not just the calf — the swelling extends up the thigh.' },
      { id: 'calf', points: 1, label: 'Calf more than 3 cm bigger than the other side', hint: 'Measured 10 cm below the tibial tuberosity.' },
      { id: 'pitting', points: 1, label: 'Pitting edema on the symptomatic leg only', hint: 'Finger pressure leaves a dimple, one side only.' },
      { id: 'collateral', points: 1, label: 'Collateral superficial veins (not varicose)', hint: 'New prominent surface veins, not the long-standing varicose kind.' },
      { id: 'prior', points: 1, label: 'A previously documented DVT', hint: 'Objectively confirmed in the past.' },
      { id: 'alt', points: -2, label: 'An alternative diagnosis is at least as likely', hint: 'Cellulitis, Baker\'s cyst, calf tear, superficial phlebitis, lymphedema, chronic venous disease.' }
    ],

    /* ------------------------------------------------------------------
     * Fig. 10 — calf pump
     * ---------------------------------------------------------------- */
    pump: {
      modes: {
        walk: {
          label: 'Walking',
          title: 'Walking: the pump is working',
          body: 'Each contraction squeezes the deep veins and the soleal sinuses, the valves '
            + 'above the squeeze are forced open, and blood is driven upward. When the muscle '
            + 'relaxes the veins refill from the superficial system through perforating veins, '
            + 'and the valve above snaps shut so nothing falls back down.',
          stats: [
            'Each contraction ejects 40–60% of the calf\'s venous volume.',
            'The calf holds roughly 100–150 mL when relaxed.',
            'Flow is unidirectional — up, always up.'
          ]
        },
        still: {
          label: 'Sitting still',
          title: 'Sitting still: the pump is off',
          body: 'With no muscle contraction there is no squeeze, and flow in the deep veins '
            + 'drops to a crawl. Blood pools in the soleal sinuses and behind the valve '
            + 'leaflets; oxygen tension falls; activated clotting factors that would have been '
            + 'washed away accumulate exactly where clots start.',
          stats: [
            'Valve pockets are already the lowest-oxygen place in the vein.',
            'Stasis plus a low-oxygen endothelium is two arms of Virchow\'s triad at once.',
            'Ankle pumps every hour are the cheapest fix — a fake step for the pump.'
          ]
        }
      }
    },

    /* ------------------------------------------------------------------
     * Sources
     * ---------------------------------------------------------------- */
    sources: [
      {
        id: 'cdc',
        label: 'Data and statistics on venous thromboembolism',
        publisher: 'US Centers for Disease Control and Prevention',
        url: 'https://www.cdc.gov/blood-clots/data-research/facts-stats/index.html',
        used: 'Up to 900,000 people affected each year in the US; one third of people with a VTE have a recurrence within 10 years; one third to one half develop post-thrombotic complications.'
      },
      {
        id: 'chest2021',
        label: 'Antithrombotic therapy for VTE disease: second update of the CHEST guideline',
        publisher: 'American College of Chest Physicians, 2021',
        url: 'https://journal.chestnet.org/article/S0012-3692(21)01506-3/fulltext',
        used: 'Serial imaging versus anticoagulation for isolated distal DVT; three-month minimum treatment; the recommendation against routine compression stockings to prevent post-thrombotic syndrome.'
      },
      {
        id: 'ccjm',
        label: 'Management of lower-extremity venous thromboembolism: an updated review',
        publisher: 'Cleveland Clinic Journal of Medicine, 2024',
        url: 'https://www.ccjm.org/content/91/4/229',
        used: 'Isolated distal DVT defined as below the popliteal vein; 8–15% proximal propagation; weekly surveillance scanning; three-month duration; post-thrombotic syndrome rates.'
      },
      {
        id: 'medscape',
        label: 'Deep venous thrombosis: practice essentials, background, anatomy',
        publisher: 'Medscape / eMedicine, updated 2024',
        url: 'https://emedicine.medscape.com/article/1911303-overview',
        used: 'Calf vein anatomy and the muscle pump; clots forming behind valve cusps and in soleal sinuses; symptom frequencies; Homans sign being unreliable; roughly 50% of people with documented thrombosis lacking specific symptoms.'
      },
      {
        id: 'merck',
        label: 'Deep venous thrombosis — professional edition',
        publisher: 'Merck Manual',
        url: 'https://www.merckmanuals.com/professional/cardiovascular-disorders/peripheral-venous-disorders/deep-venous-thrombosis-dvt',
        used: 'Distal DVT usually involving the posterior tibial or peroneal veins; thrombosis beginning in valve cusps; Wells score criteria; calf DVT propagating to the thigh and then embolising.'
      },
      {
        id: 'jci',
        label: 'New insights into the mechanisms of venous thrombosis',
        publisher: 'Journal of Clinical Investigation',
        url: 'https://www.jci.org/articles/view/60229',
        used: 'The valve pocket sinus as the usual site of thrombus initiation, and the role of low oxygen tension and vortical flow there.'
      },
      {
        id: 'pathophys',
        label: 'Venous thromboembolism',
        publisher: 'Pathophysiology for the Health Professions (open resource)',
        url: 'https://www.pathophys.org/vte/',
        used: 'Most DVTs forming in the calf veins, particularly soleal sinusoids and valve cusps; red-cell and fibrin composition; the muscle pump washing away activated clotting factors.'
      },
      {
        id: 'cdt',
        label: 'Advanced imaging in acute and chronic deep vein thrombosis',
        publisher: 'Cardiovascular Diagnosis and Therapy',
        url: 'https://cdt.amegroups.org/article/view/13086/html',
        used: 'Ultrasound criteria: non-compressibility as the primary sign, with echogenic thrombus, venous distension, absent colour flow and loss of phasic response as secondary signs; acute versus chronic appearances.'
      },
      {
        id: 'mdpi',
        label: 'Intravascular ultrasound findings in acute and chronic DVT of the lower extremities',
        publisher: 'Diagnostics (MDPI), 2025',
        url: 'https://www.mdpi.com/2075-4418/15/5/577',
        used: 'Acute thrombus being hypoechoic with soft, poorly demarcated edges and a distended vein wall, versus chronic thrombus being echogenic, fibrotic and retracted.'
      },
      {
        id: 'esvs',
        label: 'European Society for Vascular Surgery clinical practice guideline on venous thrombosis',
        publisher: 'ESVS, 2021',
        url: 'https://esvs.org/wp-content/uploads/2021/08/Venous-thrombosis-guidelines-2021-1.pdf',
        used: 'Classification of iliac, femoral and popliteal thrombosis as proximal; whole-leg ultrasound for suspected calf thrombosis; reassessment and repeat ultrasound at one week for symptomatic calf DVT not treated with anticoagulation.'
      },
      {
        id: 'tc',
        label: 'Deep vein thrombosis treatment — clinical guide',
        publisher: 'Thrombosis Canada',
        url: 'https://thrombosiscanada.ca/clinical_guides/pdfs/DEEPVEINTHROMBOSISTREATMENT_74.pdf',
        used: 'Proximal extension occurring in only 10–15% of distal DVT; risk factors for extension including thrombus longer than 5 cm, multiple deep veins involved, and proximity to the proximal veins.'
      },
      {
        id: 'iddvt',
        label: 'How I treat isolated distal deep vein thrombosis',
        publisher: 'Blood, 2014; and Should we diagnose and treat distal DVT?, 2017',
        url: 'https://ashpublications.org/blood/article/123/12/1802/32726/How-I-treat-isolated-distal-deep-vein-thrombosis',
        used: 'Distal DVT accounting for roughly 23–59% of diagnosed lower-limb DVTs depending on the scanning strategy; conditions favouring full anticoagulation such as multiple involved veins, oncology, a previous VTE.'
      },
      {
        id: 'hirsch',
        label: 'The prevalence of concomitant deep vein thrombosis in patients with symptomatic pulmonary embolism',
        publisher: 'PMC, 2018',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6714772/',
        used: 'In a PE cohort, 57% of the deep vein thromboses found were asymptomatic — the source of the "up to half of DVTs cause no symptoms" figure.'
      }
    ]
  };

  window.DVTData = DVTData;
  if (typeof module !== 'undefined' && module.exports) { module.exports = DVTData; }
})();
