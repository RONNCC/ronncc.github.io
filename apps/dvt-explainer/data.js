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
     * Fig. 11 — report decoder
     * `match` holds lowercase aliases searched as whole words; `veins`
     * cross-links an entry to a vessel in the Fig. 2 map.
     * tone: neutral | info | watch | good
     * ---------------------------------------------------------------- */
    reportCategories: [
      { id: 'location', label: 'Where it is', hint: 'Location language maps onto the distal/proximal line.' },
      { id: 'extent', label: 'How much of it', hint: 'Extent and the top end of the clot are what change the plan.' },
      { id: 'character', label: 'What it looks like', hint: 'Descriptions of the clot itself, and its age.' },
      { id: 'tests', label: 'Tests and numbers', hint: 'Blood tests and scores you may see quoted in the same report.' },
      { id: 'plan', label: 'The plan', hint: 'Phrases that describe what is being proposed.' }
    ],

    reportPhrases: [
      /* ---------- where ---------- */
      {
        id: 'proximal', category: 'location', term: 'Proximal',
        match: ['proximal', 'above the knee', 'popliteal or above'],
        tone: 'watch',
        plain: 'At or above the popliteal vein — the vein behind the knee. This is the line that '
          + 'matters most: a clot that reaches it is treated as a proximal DVT, which means '
          + 'anticoagulation rather than a watching brief.',
        ask: 'Is any part of my clot proximal, and if not how far is it from the line?'
      },
      {
        id: 'popliteal', category: 'location', term: 'Popliteal vein',
        match: ['popliteal vein', 'popliteal veins', 'popliteal'],
        veins: ['popliteal'], tone: 'watch',
        plain: 'The collecting vein behind the knee where the calf veins join. It is the boundary '
          + 'between a distal (calf) clot and a proximal one.',
        ask: 'How far is the top of my clot from the popliteal vein?'
      },
      {
        id: 'distal', category: 'location', term: 'Distal / infrapopliteal',
        match: ['distal', 'below the knee', 'infrapopliteal', 'calf vein', 'calf veins'],
        tone: 'info',
        plain: 'Below the popliteal vein — the calf. "Distal" describes where the clot sits, not '
          + 'how serious it is; a short clot in one vein and an extensive clot filling several '
          + 'are both technically distal, and they behave very differently.',
        ask: 'How extensive is mine compared with the ones usually watched?'
      },
      {
        id: 'trifurcation', category: 'location', term: 'Trifurcation / tibioperoneal trunk',
        match: ['trifurcation', 'tibioperoneal', 'tibio-peroneal'],
        veins: ['trunk'], tone: 'watch',
        plain: 'The short segment just below the knee where the peroneal and posterior tibial '
          + 'veins merge. Because it sits only centimetres below the proximal line, clot here '
          + 'is watched closely.',
        ask: 'Is the clot at or below the trifurcation?'
      },
      {
        id: 'axial', category: 'location', term: 'Peroneal / posterior tibial veins',
        match: ['peroneal', 'posterior tibial', 'fibular vein', 'fibular veins', 'tibial veins'],
        veins: ['peroneal', 'posttibial'], tone: 'info',
        plain: 'The paired axial veins that run beside the bones of the lower leg. These and the '
          + 'muscular veins are the two families a calf clot belongs to; axial involvement is '
          + 'generally taken a little more seriously than a clot confined to muscle veins.',
        ask: 'Is mine in the axial veins, the muscle veins, or both?'
      },
      {
        id: 'muscular', category: 'location', term: 'Soleal / gastrocnemius veins',
        match: ['soleal', 'soleus vein', 'gastrocnemius vein', 'gastrocnemius veins',
          'muscular vein', 'muscular veins', 'calf muscle veins'],
        veins: ['soleal', 'gastrocnemius'], tone: 'info',
        plain: 'The wide, slow venous pouches inside the calf muscles. A very common place for a '
          + 'calf clot to start, often sore, and generally a lower risk of extension than a clot '
          + 'in the axial veins.',
        ask: 'If it is only in the muscle veins, does that change my treatment?'
      },
      {
        id: 'side', category: 'location', term: 'Left / right / bilateral',
        match: ['left leg', 'right leg', 'left lower extremity', 'right lower extremity',
          'left calf', 'right calf', 'bilateral', 'both legs', 'both lower extremities'],
        tone: 'info',
        plain: 'Which leg — named on its own when one side is involved, or "bilateral" when both '
          + 'are. Bilateral clot is less common and is one of the findings that pushes toward '
          + 'treating rather than watching.',
        ask: 'Were both legs scanned, or just the symptomatic one?'
      },
      {
        id: 'superficial', category: 'location', term: 'Superficial vein / thrombophlebitis',
        match: ['superficial vein', 'superficial veins', 'superficial thrombophlebitis',
          'superficial venous thrombosis', 'great saphenous', 'small saphenous'],
        veins: ['grt_saph', 'sm_saph'], tone: 'info',
        plain: 'The veins just under the skin, not the deep system. A clot here is superficial '
          + 'thrombophlebitis, managed differently — it matters most when it sits near a junction '
          + 'with a deep vein, such as the small saphenous meeting the popliteal vein.',
        ask: 'Is anything here superficial rather than deep?'
      },

      /* ---------- how much ---------- */
      {
        id: 'occlusive', category: 'extent', term: 'Occlusive',
        match: ['occlusive', 'occluding', 'complete occlusion', 'fully occluded', 'occlusion of'],
        tone: 'watch',
        plain: 'The clot fills the vein, so blood is not getting through that segment and is '
          + 'finding other routes. "Occlusive" describes the blockage, not the risk: a shorter '
          + 'occlusive clot can still be lower risk than a long partial one.',
        ask: 'Is mine occlusive, and is any part of it mobile?'
      },
      {
        id: 'nonocclusive', category: 'extent', term: 'Non-occlusive / partially occlusive',
        match: ['non-occlusive', 'nonocclusive', 'partially occlusive', 'partial occlusion',
          'non occlusive'],
        tone: 'info',
        plain: 'Clot is present but a channel of blood still flows past it. A fresh, non-occlusive '
          + 'clot can have a free edge that moves with the blood flow, which is why reports often '
          + 'mention it separately.',
        ask: 'Is the clot attached to the wall, or is part of it free?'
      },
      {
        id: 'extensive', category: 'extent', term: 'Extensive / extending / propagation',
        match: ['extensive', 'extending', 'extension', 'propagating', 'propagation',
          'extended into', 'propagated'],
        tone: 'watch',
        plain: 'Language about how much of the vein is involved. In guidelines, an extensive clot, '
          + 'a clot filling more than one vein, or one that has grown upward are all risk factors '
          + 'for further extension — which is what tips the balance toward treating. Watch for '
          + 'the opposite phrasing too: "no extension" on a repeat scan is the reassuring version.',
        ask: 'Is this the first time it has been measured, or has it grown since the last scan?'
      },
      {
        id: 'length', category: 'extent', term: 'Length of the thrombus',
        match: ['in length', 'thrombus length', 'length of the thrombus', 'measures'],
        tone: 'info',
        plain: 'The sonographer measures the clot from its lowest to its highest point. A length '
          + 'over about 5 cm is one of the classic things that raises the estimated risk of the '
          + 'clot growing upward.',
        ask: 'How long is it, and does that number change my treatment?'
      },
      {
        id: 'multivein', category: 'extent', term: 'Multiple veins involved',
        match: ['multiple veins', 'multiple deep veins', 'more than one vein', 'two veins',
          'several veins', 'multivessel'],
        tone: 'watch',
        plain: 'The clot is not confined to one vessel. Involvement of more than one deep vein is '
          + 'a recognised risk factor for extension and is a common reason a calf clot is treated '
          + 'rather than monitored.',
        ask: 'How many veins are involved, and which ones?'
      },
      {
        id: 'tip', category: 'extent', term: 'Tip / proximal extent of the clot',
        match: ['tip of the thrombus', 'thrombus tip', 'proximal extent', 'upper extent',
          'apex of the thrombus', 'free tip'],
        tone: 'watch',
        plain: 'The top end of the clot, and the most useful number in the report. Its distance '
          + 'below the popliteal vein is what the decision to treat versus watch turns on, and a '
          + 'free tip is what a sonographer looks at to judge mobility.',
        ask: 'Where exactly is the top of my clot relative to the popliteal vein?'
      },
      {
        id: 'freefloating', category: 'extent', term: 'Free-floating / mobile thrombus',
        match: ['free-floating', 'free floating', 'floating thrombus', 'mobile thrombus',
          'mobile component', 'non-adherent', 'nonadherent'],
        tone: 'watch',
        plain: 'Used when a clot is attached at its base but has a tip that moves in the blood '
          + 'stream rather than sitting against the vein wall. A meta-analysis found a higher '
          + 'chance of pulmonary embolism associated with this appearance, though the evidence '
          + 'is limited and management is debated — it is one of the findings that prompts closer '
          + 'follow-up.',
        ask: 'Does mine have a free-floating component, and does that change how closely I am watched?'
      },

      /* ---------- what it looks like ---------- */
      {
        id: 'acute', category: 'character', term: 'Acute',
        match: ['acute'],
        tone: 'info',
        plain: 'A statement about age and appearance: the clot is new — days to a few weeks old. On '
          + 'the screen a fresh clot is dark (hypoechoic) and the vein is swollen around it. The '
          + 'first weeks are when a clot is most likely to grow or break up.',
        ask: 'How new is it judged to be?'
      },
      {
        id: 'chronic', category: 'character', term: 'Chronic',
        match: ['chronic'],
        tone: 'good',
        plain: 'An older clot, or the scar it left behind. It appears brighter on ultrasound, '
          + 'often retracted from the wall with the vein narrowed around it, and flow has usually '
          + 'returned. Chronic change is not the same as a new clot. Beware a report that says '
          + '"chronic" about a leg you have never had scanned — that happens, and it is worth '
          + 'clarifying.',
        ask: 'Is this new, old, or a new clot on top of old scarring?'
      },
      {
        id: 'acuteonchronic', category: 'character', term: 'Acute on chronic',
        match: ['acute on chronic', 'acute-on-chronic', 'acute superimposed'],
        tone: 'watch',
        plain: 'A new clot sitting inside a vein that was already scarred from an older one. It is '
          + 'a common and genuinely awkward pattern to interpret, because the vein was never going '
          + 'to compress normally.',
        ask: 'Which part is the new clot, and which part is old?'
      },
      {
        id: 'echo', category: 'character', term: 'Hypoechoic / echogenic',
        match: ['hypoechoic', 'hypo-echoic', 'echogenic', 'hyperechoic', 'isoechoic', 'anechoic'],
        tone: 'info',
        plain: 'Echogenicity is how bright something looks on ultrasound. Fresh clot tends to be '
          + 'dark (hypoechoic) and easy to miss; older clot is brighter (echogenic) because it has '
          + 'organised into firm tissue. It is one of the clues used to age a clot.',
        ask: 'Does the appearance suggest this clot is fresh?'
      },
      {
        id: 'recanalisation', category: 'character', term: 'Recanalised',
        match: ['recanaliz', 'recanalis', 'recanalized', 'recanalised'],
        tone: 'good',
        plain: 'Flow has returned through or around an older clot as the body broke it down and '
          + 'drilled a new channel. It is a sign of healing, and it often goes with a stiffened, '
          + 'less elastic vein segment that can cause long-term aching or swelling.',
        ask: 'Has the vein recanalised since the first scan?'
      },
      {
        id: 'noncompressible', category: 'character', term: 'Non-compressible',
        match: ['non-compressible', 'noncompressible', 'incompressible', 'non compressible'],
        tone: 'watch',
        plain: 'The primary sign of a DVT on ultrasound: the sonographer presses the probe on the '
          + 'vein and it does not flatten the way a normal vein does, because the clot is holding '
          + 'it open. If you read only one phrase in your report, this is the one that made the '
          + 'diagnosis.',
        ask: 'Which veins did not compress?'
      },
      {
        id: 'flow', category: 'character', term: 'Phasic / augmentation',
        match: ['phasic', 'phasicity', 'augmentation', 'spontaneous flow', 'respiratory variation'],
        tone: 'good',
        plain: 'Descriptions of normal venous flow: a normal vein changes with breathing and speeds '
          + 'up when the calf is squeezed. A report that mentions these features is describing the '
          + 'veins that were working.',
        ask: 'Which segments had normal flow?'
      },
      {
        id: 'collaterals', category: 'character', term: 'Collateral veins',
        match: ['collateral', 'collaterals', 'collateral vessels', 'collateral veins'],
        tone: 'info',
        plain: 'Small veins that widen to carry blood around a blockage. They appear over weeks, '
          + 'which is why their presence suggests an older process — and why visible new surface '
          + 'veins over your calf are a symptom worth mentioning.',
        ask: 'Are the collaterals new, and do they suggest how long this has been there?'
      },

      /* ---------- tests ---------- */
      {
        id: 'ddimer', category: 'tests', term: 'D-dimer',
        match: ['d-dimer', 'd dimer', 'ddimer', 'd-dimers'],
        tone: 'info',
        plain: 'A blood test for fragments released when the body breaks down fibrin. It is very '
          + 'sensitive — a negative result is good at ruling a clot out — but not specific: '
          + 'surgery, infection, pregnancy, cancer and simply getting older can all raise it. A '
          + 'raised D-dimer on its own does not mean a clot.',
        ask: 'Was my D-dimer used to decide on imaging, and what was the number?'
      },
      {
        id: 'wells', category: 'tests', term: 'Wells score / clinical probability',
        match: ['wells score', 'wells', 'clinical probability', 'pretest probability',
          'pre-test probability', 'likely dvt', 'unlikely dvt'],
        tone: 'info',
        plain: 'A checklist score built from your symptoms and risk factors that estimates how '
          + 'likely a DVT is before any scan. It decides whether a negative ultrasound or a '
          + 'D-dimer can be trusted enough to send you home. It is a probability estimate, not a '
          + 'diagnosis.',
        ask: 'What was my Wells score, and what did it lead to?'
      },
      {
        id: 'inr', category: 'tests', term: 'INR',
        match: ['inr', 'international normalized ratio'],
        tone: 'info',
        plain: 'A measure of how slowly blood clots, used to dose warfarin. If you are on a direct '
          + 'oral anticoagulant you will not have an INR — those drugs do not need one and are '
          + 'usually not monitored with it.',
        ask: 'If I am on warfarin, what is my target INR range?'
      },
      {
        id: 'renal', category: 'tests', term: 'Renal function / creatinine',
        match: ['creatinine', 'egfr', 'renal function', 'kidney function'],
        tone: 'info',
        plain: 'Kidney function is checked because some anticoagulants are cleared by the kidneys '
          + 'and need dose adjustment, or are avoided, when function is reduced. It is a routine '
          + 'safety test, not a sign that anything is wrong with you.',
        ask: 'Does my kidney function change which anticoagulant I should be on?'
      },
      {
        id: 'platelets', category: 'tests', term: 'Platelet count',
        match: ['platelet', 'platelets', 'platelet count'],
        tone: 'info',
        plain: 'A baseline before starting anticoagulation, because a low platelet count raises '
          + 'bleeding risk. It also shows up in a rare reaction to heparin.',
        ask: 'Was my platelet count normal, and does it change my bleeding risk?'
      },
      {
        id: 'thrombophilia', category: 'tests', term: 'Thrombophilia screen',
        match: ['thrombophilia', 'factor v leiden', 'prothrombin gene', 'antiphospholipid',
          'lupus anticoagulant', 'protein c deficiency', 'protein s deficiency', 'antithrombin'],
        tone: 'info',
        plain: 'Tests for inherited or acquired tendencies to clot. They are not done for every '
          + 'DVT — usually when the clot was unprovoked, happened young, was unusual in pattern, '
          + 'or there is a strong family history — because the result often does not change '
          + 'treatment.',
        ask: 'Am I a candidate for a thrombophilia screen, and would a positive result change anything?'
      },
      {
        id: 'pe', category: 'tests', term: 'Pulmonary embolism (PE)',
        match: ['pulmonary embolism', 'subsegmental', 'saddle embolus', 'lungs'],
        tone: 'watch',
        plain: 'Where a piece of clot has travelled to the lungs. If it appears in your report it '
          + 'will usually be in a separate CT scan section — a small PE is common alongside a leg '
          + 'clot, sometimes with no symptoms at all, and it is treated with the same '
          + 'anticoagulation.',
        ask: 'Was my chest scanned too, and was anything found there?'
      },

      /* ---------- the plan ---------- */
      {
        id: 'surveillance', category: 'plan', term: 'Surveillance / serial ultrasound',
        match: ['surveillance', 'serial ultrasound', 'serial imaging', 'repeat ultrasound',
          'repeat scan', 'interval scan', 'follow-up scan', 'follow up scan'],
        tone: 'info',
        plain: 'A watch-and-wait plan: repeat scans rather than anticoagulation, typically about '
          + 'once a week for two weeks. The guidelines suggest this for calf clots without severe '
          + 'symptoms or risk factors for extension, on the reasoning that most do not grow — and '
          + 'that anticoagulation carries its own risk.',
        ask: 'When is my next scan, and what would make us switch to treatment?'
      },
      {
        id: 'anticoagulation', category: 'plan', term: 'Anticoagulation',
        match: ['anticoagul', 'blood thinner', 'blood thinners', 'apixaban', 'rivaroxaban',
          'edoxaban', 'dabigatran', 'enoxaparin', 'lmwh', 'heparin', 'warfarin', 'eliquis',
          'xarelto', 'lovenox', 'coumadin'],
        tone: 'info',
        plain: 'Medication that slows clotting so the clot stops growing while the body breaks it '
          + 'down. It does not dissolve an existing clot — the body does that. Three months is the '
          + 'usual minimum when it is used for a DVT; whether you continue past that depends on '
          + 'whether the clot was provoked, your bleeding risk, and your preference.',
        ask: 'Which drug, what dose, for how long — and what happens at the end of that?'
      },
      {
        id: 'dose', category: 'plan', term: 'Therapeutic vs prophylactic dose',
        match: ['therapeutic dose', 'therapeutic anticoagulation', 'treatment dose',
          'prophylactic dose', 'prophylaxis dose'],
        tone: 'info',
        plain: 'Two different strengths of the same idea. A therapeutic dose treats a clot that '
          + 'already exists; a prophylactic (preventive) dose is the lower strength given to keep '
          + 'one from forming. They are not interchangeable, so it is worth knowing which one you '
          + 'are on.',
        ask: 'Am I on a therapeutic or a prophylactic dose?'
      },
      {
        id: 'compression', category: 'plan', term: 'Compression',
        match: ['compression stocking', 'compression stockings', 'compression therapy',
          'graduated compression', '30-40 mmhg', '30–40 mmhg', 'class ii'],
        tone: 'info',
        plain: 'Stockings or bandaging that support the leg veins and reduce swelling and aching. '
          + 'They can help symptoms, but the 2021 CHEST guideline suggests against using them '
          + 'routinely to prevent post-thrombotic syndrome, because a large trial found no '
          + 'reduction in its development.',
        ask: 'Are these stockings for my symptoms, or to prevent long-term changes?'
      },
      {
        id: 'interventional', category: 'plan', term: 'Thrombolysis / thrombectomy',
        match: ['thrombectomy', 'thrombolysis', 'thrombolytic', 'catheter-directed',
          'catheter directed', 'clot retrieval', 'interventional radiology'],
        tone: 'info',
        plain: 'Physically removing or dissolving clot — used in selected situations such as a '
          + 'threatening limb or extensive iliofemoral clot. For most calf clots, anticoagulation '
          + 'is the treatment and these are not part of the plan.',
        ask: 'Would these ever be considered for me, and why or why not?'
      },
      {
        id: 'ivcfilter', category: 'plan', term: 'IVC filter',
        match: ['ivc filter', 'inferior vena cava filter', 'caval filter'],
        tone: 'info',
        plain: 'A small device placed in the main vein from the legs to catch emboli, used when '
          + 'anticoagulation is impossible or has failed. It is a niche tool, usually temporary, '
          + 'not part of routine DVT care.',
        ask: 'Why is a filter being considered instead of anticoagulation?'
      },
      {
        id: 'duration', category: 'plan', term: 'Three months / extended therapy',
        match: ['three months', '3 months', 'six months', '6 months', 'twelve months',
          'indefinite anticoagulation', 'extended anticoagulation', 'duration of anticoagulation'],
        tone: 'info',
        plain: 'Duration language. Three months is the standard minimum course. "Extended" means '
          + 'continuing with a planned review rather than a fixed stop date, which is decided by '
          + 'balancing recurrence risk against bleeding risk.',
        ask: 'What is the review point, and what would make you extend or stop treatment?'
      },
      {
        id: 'activity', category: 'plan', term: 'Mobilisation / activity',
        match: ['bed rest', 'ambulation', 'mobilization', 'mobilisation', 'activity restriction',
          'no exercise'],
        tone: 'good',
        plain: 'Early walking is part of treatment for a DVT — guidance does not support strict '
          + 'bed rest for an uncomplicated clot. Very strenuous or impact-heavy exercise in the '
          + 'first days is usually eased into rather than resumed outright.',
        ask: 'What activity level is right for me in the next two weeks?'
      }
    ],

    /* Numbers worth noticing when they appear next to a phrase. */
    reportNumberNote: {
      title: 'Numbers in the report',
      body: 'The two measurements that carry the most weight are how long the clot is '
        + '(over roughly 5 cm is one recognised risk factor for extension) and how far its top '
        + 'end sits from the popliteal vein. Ask for both in plain language — they are the '
        + 'numbers that tend to decide between treating and watching.'
    },

    /* ------------------------------------------------------------------
     * Fig. 12 — glossary
     * ---------------------------------------------------------------- */
    glossaryGroups: [
      { id: 'anatomy', label: 'Anatomy & location' },
      { id: 'diagnosis', label: 'Diagnosis & imaging' },
      { id: 'tests', label: 'Tests' },
      { id: 'treatment', label: 'Treatment' },
      { id: 'after', label: 'Risk and aftermath' }
    ],

    glossary: [
      { term: 'DVT', group: 'diagnosis', def: 'Deep vein thrombosis: a blood clot inside a deep vein, usually in the leg.' },
      { term: 'VTE', group: 'diagnosis', def: 'Venous thromboembolism: the umbrella term for DVT and pulmonary embolism together — the same disease at two addresses.' },
      { term: 'PE', group: 'diagnosis', def: 'Pulmonary embolism: clot that has travelled to the arteries of the lung.' },
      { term: 'Thrombus', group: 'diagnosis', def: 'The clot itself, attached where it formed.' },
      { term: 'Embolus', group: 'diagnosis', def: 'A piece of clot that has broken free and is travelling through the bloodstream.' },
      { term: 'Proximal', group: 'anatomy', def: 'At or above the popliteal vein — behind the knee and upward. Proximal clots cause most of the serious trouble.' },
      { term: 'Distal', group: 'anatomy', def: 'Below the popliteal vein: the calf. Also called a calf DVT.' },
      { term: 'Popliteal vein', group: 'anatomy', def: 'The collecting vein behind the knee where the calf veins join. The dividing line between distal and proximal.' },
      { term: 'Soleal sinuses', group: 'anatomy', def: 'Wide venous pouches inside the soleus muscle. A very common place for calf clots to start.' },
      { term: 'Collateral veins', group: 'anatomy', def: 'Small veins that widen to carry blood around a blockage. Their presence usually means the process is weeks old.' },
      { term: 'Calf muscle pump', group: 'anatomy', def: 'The calf muscles squeezing the deep veins, with one-way valves keeping flow upward. Roughly 40–60% of the calf\'s venous volume moves with each contraction, which is why walking protects you.' },
      { term: 'Compression ultrasound', group: 'diagnosis', def: 'The scan that diagnoses a DVT. A normal vein flattens under the probe; a clotted one does not. The failure to flatten — non-compressibility — is the primary finding.' },
      { term: 'Occlusive', group: 'diagnosis', def: 'The clot completely fills the vein. Non-occlusive means some flow still passes.' },
      { term: 'Hypoechoic / echogenic', group: 'diagnosis', def: 'How bright tissue looks on ultrasound. Fresh clot is dark (hypoechoic); older, organised clot is brighter (echogenic).' },
      { term: 'Recanalisation', group: 'diagnosis', def: 'Flow returning through or around a clot as the body breaks it down. A sign of healing, often with lasting stiffness in that vein segment.' },
      { term: 'Acute on chronic', group: 'diagnosis', def: 'A new clot inside a vein already damaged by an older one — a genuinely tricky pattern to read.' },
      { term: 'D-dimer', group: 'tests', def: 'A blood test for fibrin breakdown products. Very good at ruling a clot out when negative; easily raised by other things, so a high value proves little by itself.' },
      { term: 'Wells score', group: 'tests', def: 'A checklist that estimates how likely a DVT is before imaging, used to decide whether a negative scan or a D-dimer can be trusted.' },
      { term: 'INR', group: 'tests', def: 'A measure of clotting speed used to dose warfarin. Not used for the direct oral anticoagulants.' },
      { term: 'Thrombophilia', group: 'tests', def: 'An inherited or acquired tendency to clot — for example factor V Leiden or antiphospholipid syndrome. Tested only in selected cases.' },
      { term: 'Anticoagulant', group: 'treatment', def: 'A drug that slows clotting so a clot stops growing. It does not dissolve the clot; your body does that over weeks.' },
      { term: 'DOAC', group: 'treatment', def: 'Direct oral anticoagulant — apixaban, rivaroxaban, edoxaban or dabigatran. Recommended over warfarin for most people with a DVT.' },
      { term: 'LMWH', group: 'treatment', def: 'Low molecular weight heparin — an injected anticoagulant, still used in pregnancy, some cancers, and severe kidney impairment.' },
      { term: 'Therapeutic dose', group: 'treatment', def: 'The treatment strength of an anticoagulant, used when a clot already exists. Distinct from the lower prophylactic dose used to prevent one.' },
      { term: 'Serial ultrasound', group: 'treatment', def: 'A watch-and-wait plan: repeat scans, usually about weekly for two weeks, instead of anticoagulation for a low-risk calf clot.' },
      { term: 'Compression stocking', group: 'treatment', def: 'Support hosiery that eases swelling and aching. Guidelines suggest against routine use purely to prevent post-thrombotic syndrome.' },
      { term: 'Provoked / unprovoked', group: 'after', def: 'Whether a clot had an identifiable trigger (surgery, immobility, cancer, oestrogen) or none. Unprovoked clots have a higher chance of recurring, which affects how long treatment lasts.' },
      { term: 'Post-thrombotic syndrome', group: 'after', def: 'Long-term swelling, aching, discolouration or skin changes in a leg that had a DVT, caused by valve and vein-wall damage. Reported in roughly one third to one half of people after a DVT.' },
      { term: 'Recurrence risk', group: 'after', def: 'The chance of another clot. About one in three people with a VTE has another event within ten years.' },
      { term: 'IVC filter', group: 'after', def: 'A small device in the main vein from the legs that traps emboli, used only when anticoagulation is impossible or has failed.' }
    ],

    /* ------------------------------------------------------------------
     * Sources
     * ---------------------------------------------------------------- */
    sources: [
      {
        id: 'fft',
        label: 'Deep venous free-floating thrombus: a review and meta-analysis',
        publisher: 'PubMed-indexed meta-analysis',
        url: 'https://pubmed.ncbi.nlm.nih.gov/41421955/',
        used: 'Free-floating thrombus associated with a higher risk of pulmonary embolism at diagnosis (77% vs 23%; OR 3.3) and of secondary PE, though not clearly of secondary symptomatic PE — the source of the page\'s cautious wording about mobility.'
      },
      {
        id: 'ddimeracc',
        label: 'Accuracy of D-dimers to rule out venous thromboembolism',
        publisher: 'PMC, prospective cohort',
        url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3195346/',
        used: 'D-dimer sensitivity ~96% with specificity around 57%, and a very high negative predictive value — the basis for describing D-dimer as good at ruling a clot out and poor at proving one.'
      },
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
