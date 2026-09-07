/* BIOMEDE 211 chapter data (Belmont, Circuits/Systems/Signals in BME, W19).
 * window.B211 = { PARTS, CHAPTERS }. app.js renders + runs widgets. */
(function () {
  'use strict';
  var PARTS = [
    { id: 'circuits', title: 'Part I — Circuits' },
    { id: 'systems', title: 'Part II — Systems' },
    { id: 'signals', title: 'Part III — Signals' },
    { id: 'bme', title: 'Part IV — in Biomedical Engineering' }
  ];
  var CHAPTERS = [
    { id: 'ch1', part: 'circuits', num: 1, title: 'Potential, current, energy, conservation', widget: 'charge',
      lede: 'Charge moves (current) across a height difference (potential); the product is power and the integral is energy. Everything else in the book is bookkeeping on these.',
      concepts: ['Charge is discrete: <code>e = −1.602e−19 C</code>, <code>Q = #e · e</code>.', 'Current is flow: <code>i = dq/dt</code>, <code>Q = ∫ i dt</code>. 1 mA felt, 10 mA pain, 100 mA lethal.', 'Potential is height: <code>v = dw/dq</code> — only differences matter.', 'Power <code>p = v·i</code> (passive sign: +vi entering + terminal). Energy <code>E = ∫p dt</code>.', 'Conservation previews KCL/KVL: charge in = charge out; voltages sum to zero around a loop.'],
      worksheet: [
        { q: 'A 0.1 mA DC current flows for 60 s. Total charge?', choices: ['6 mC', '6 C', '0.6 mC'], answer: 0, explain: 'Q = i·t = 1e−4 × 60 = 6e−3 C.' },
        { q: 'A pacemaker delivers 5000 J over 5 years from a 5 V battery, using only 40% of its energy. Required capacity?', choices: ['~694 mAh', '~111 mAh', '~69 mAh'], answer: 0, explain: 'Total = 5000/0.4 = 12500 J; 12500/5 = 2500 C = 2500/3600 Ah ≈ 0.694 Ah ≈ 694 mAh. (111 mAh is only the spent 40%.)' },
        { q: 'Current i(t) = 1/√(5t+2) A, t = 0–10 s. Total charge? (Book §1.8.2)', choices: ['~2.32 C', '~0.32 C', '~23.2 C'], answer: 0, explain: 'Q = ∫ = [2√(5t+2)/5]₀¹⁰ = 0.4(√52 − √2) ≈ 2.32 C.' },
        { q: 'Current to transmit 1 terabyte in 1 hour as single electrons? (Book §1.8.3)', choices: ['~0.36 nA', '~3.6 A', '~0.36 mA'], answer: 0, explain: '8e12 e⁻/3600 s ≈ 2.2e9 e⁻/s × 1.602e−19 C ≈ 3.6e−10 A.' },
        { q: 'Neuron with i = 3t, v = 10e^(6t), t in seconds. Energy 0–2 ms? (Book §1.8.5)', choices: ['~60 µJ', '~6 J', '~600 mJ'], answer: 0, explain: 'E = ∫30t·e^(6t)dt ≈ ∫30t dt = 15(2e−3)² = 6e−5 J.' },
        { q: 'Drop a 300 g heart from what height to equal a 120 J defibrillator shock? (Book §1.8.6b)', choices: ['~41 m', '~4 m', '~410 m'], answer: 0, explain: 'h = E/mg = 120/(0.3×9.8) ≈ 41 m. (240 J → ~82 m, 360 J → ~122 m.)' }
      ] },
    { id: 'ch2', part: 'circuits', num: 2, title: 'Circuit elements', widget: 'equiv',
      lede: 'Resistors, capacitors, inductors — plus the impedance language that unifies them, and the series/parallel/Δ-Y reductions that tame networks.',
      concepts: ['Ohm generalized: <code>V = iR → V = iZ</code>; <code>R = ρ·l/A</code>, <code>G = 1/R</code>.', 'Capacitor: <code>i = C·dV/dt</code>; charged = open, uncharged = short (DC). Inductor: <code>v = L·di/dt</code>.', 'Impedance: <code>Z_R = R</code>, <code>Z_C = 1/jωC</code>, <code>Z_L = jωL</code>; <code>Z = R + jX</code>.', 'Series <code>Zeq = ΣZ</code>; parallel <code>1/Zeq = Σ1/Z</code>; two-element <code>Z1·Z2/(Z1+Z2)</code>.', 'Dividers: <code>Vx = Vs·Rx/ΣR</code>; Δ-Y transforms; grounds, diodes (one-way), switches, transistors, transformers.'],
      worksheet: [
        { q: 'A toaster draws 2 A at 120 V. Its resistance?', choices: ['60 Ω', '240 Ω', '0.5 Ω'], answer: 0, explain: 'R = V/i = 120/2 = 60 Ω.' },
        { q: 'What current does a 10 Ω element draw at 110 V? (Book §2.16 P2)', choices: ['11 A', '1.1 A', '1100 A'], answer: 0, explain: 'i = V/R = 110/10 = 11 A.' },
        { q: 'Power “in ohms” means… (Book §2.16 P1)', choices: ['P = V²/R = i²R', 'P = R/V', 'P = iR²'], answer: 0, explain: 'Substitute Ohm into P = vi.' },
        { q: 'Na channel: G/A = 10 mS/cm², length 100 nm. Conductivity σ? (Book §2.16 P4)', choices: ['1e−5 S/m', '1e−3 S/m', '100 S/m'], answer: 0, explain: 'σ = (G/A)·l = 100 S/m² × 1e−7 m = 1e−5 S/m.' },
        { q: 'Tissue slab: area y = 8−x² (cm²), x = −2…2 cm, length 10 cm, ρ = 80 Ω·m. R? (Book §2.16 P5)', choices: ['3 kΩ', '300 Ω', '30 kΩ'], answer: 0, explain: 'A = 80/3 cm² ≈ 26.7 cm²; R = 80×0.1/26.67e−4 = 3000 Ω.' },
        { q: 'Two 100 Ω in parallel, in series with 50 Ω. Total?', choices: ['100 Ω', '150 Ω', '250 Ω'], answer: 0, explain: '100‖100 = 50; +50 = 100 Ω.' }
      ] },
    { id: 'ch3', part: 'circuits', num: 3, title: 'Operational amplifiers', widget: 'opamp',
      lede: 'The ideal rules (no input current, virtual short) turn scary circuits into gain arithmetic — the front end of every biopotential amplifier.',
      concepts: ['Ideal rules: <code>i+ = i− = 0</code>, <code>v1 = v2</code> (virtual short), huge open-loop gain.', 'Inverting: <code>Vo = −(Rf/R1)·Vi</code>. Non-inverting: <code>Vo = (1 + Rf/R1)·Vi</code>.', 'Follower <code>Vo = Vi</code>: buffer/isolation (e.g. ECG electrodes).', 'Summing: <code>Vo = −Rf·Σ(Vk/Rk)</code>; differential (matched) <code>≈ (Rf/R1)(V2−V1)</code>.', 'With capacitors: series-C input = high-pass, parallel-C feedback = low-pass, <code>fc = 1/(2πRC)</code>. Watch saturation at ±supply.'],
      worksheet: [
        { q: 'Inverting amp, R1 = 20 kΩ, Rf = 100 kΩ. Gain?', choices: ['−5', '+5', '−0.2'], answer: 0, explain: '−Rf/R1 = −5.' },
        { q: 'Summing amp: 10 V/10 kΩ + 10 V/10 kΩ, Rf = 20 kΩ. Vo?', choices: ['−40 V', '−20 V', '+40 V'], answer: 0, explain: '−20k×(10/10k + 10/10k) = −40 V (ideal; real op-amp would saturate).' }
      ] },
    { id: 'ch4', part: 'circuits', num: 4, title: 'Nodal analysis', widget: 'nodal',
      lede: 'KCL at every non-reference node, currents written with Ohm\'s law, solve the system. The universal method — works even when meshes don\'t exist.',
      concepts: ['Topology: <code>b = l + n − 1</code>; series = same current, parallel = same voltage.', 'KCL: <code>Σix = 0</code> (in = out). KVL: <code>Σvm = 0</code> around a loop.', 'Procedure: ground → label v1..vn−1 → KCL with <code>I = (Va−Vb)/R</code> → solve.', 'Cramer\'s rule: 2×2 <code>D = a1b2 − a2b1</code>, <code>x = D1/D</code>.', 'Ground is a choice (earth vs chassis); 0 V reference, not a current sink.'],
      worksheet: [
        { q: 'Two non-reference nodes means how many KCL equations?', choices: ['2', '3', '1'], answer: 0, explain: 'One KCL per non-reference node.' },
        { q: 'Cramer needs…', choices: ['square system with det ≠ 0', 'symmetric matrix', 'integer coefficients'], answer: 0, explain: 'Otherwise no unique solution by division.' },
        { q: 'Solve by Cramer: 2x + y = 5, x + 3y = 6. (Drill, cf. Book §4.5)', choices: ['x = 1.8, y = 1.4', 'x = 2, y = 1', 'x = 1, y = 3'], answer: 0, explain: 'D = 5, Dx = 9, Dy = 7.' }
      ] },
    { id: 'ch5', part: 'circuits', num: 5, title: 'Mesh analysis', widget: 'mesh',
      lede: 'KVL around each window-pane loop. Faster than nodal for planar circuits with few meshes — and the matrix writes itself.',
      concepts: ['Mesh = loop with no loops inside; planar circuits only.', 'Assign clockwise <code>i1..in</code>, KVL per mesh with <code>V = iR</code>.', 'Shared resistors couple meshes: <code>Rii = ΣR</code>, <code>Rij = −R_shared</code>.', 'Direct stamp: <code>[R][i] = [v]</code>; solve by substitution, Cramer, or <code>I = R\\V</code>.', 'Branch current = difference of adjacent mesh currents.'],
      worksheet: [
        { q: 'Off-diagonal Rij in the mesh matrix is…', choices: ['−(shared R)', '+(shared R)', 'always zero'], answer: 0, explain: 'Neighbor mesh current flows opposite through shared R.' },
        { q: 'Mesh analysis fails (directly) for…', choices: ['nonplanar circuits', 'circuits with resistors', 'DC circuits'], answer: 0, explain: 'No meshes exist; use nodal.' }
      ] },
    { id: 'ch6', part: 'circuits', num: 6, title: 'Supernodes and supermeshes', widget: 'super',
      lede: 'Voltage sources between nodes (and current sources shared by meshes) break the standard stamp — enclose the problem, add the constraint equation.',
      concepts: ['Supernode: voltage source between two non-reference nodes → KCL over the enclosing surface + KVL constraint.', 'Never write both node KCLs (singular matrix). One surface KCL + <code>v2 − v1 = Vs</code>.', 'Dependent sources (VCVS/CCVS/VCCS/CCCS): stamp normally, then add the controlling-variable constraint.', 'Supermesh: current source shared by two meshes → fix one current or merge + constraint.', 'Same idea both domains: extra source, extra equation.'],
      worksheet: [
        { q: 'A 10 V source connects node 1 to node 2 (neither ground). Extra equation?', choices: ['v2 − v1 = 10', 'v1 + v2 = 10', 'i1 = i2'], answer: 0, explain: 'KVL constraint across the source.' },
        { q: 'The four dependent source types are…', choices: ['VCVS, VCCS, CCVS, CCCS', 'AC, DC, VC, CC', 'NPN, PNP, NMOS, PMOS'], answer: 0, explain: 'Voltage/current-controlled voltage/current sources.' },
        { q: 'A dependent source in nodal analysis is…', choices: ['stamped normally, then add its controlling-variable constraint', 'deleted like an independent source', 'always a supernode by itself'], answer: 0, explain: 'Treat as ordinary in KCL, then constrain (e.g. ix = (v3−v2)/R3).' }
      ] },
    { id: 'ch7', part: 'circuits', num: 7, title: 'Circuit theorems', widget: 'thevenin',
      lede: 'Linearity buys superposition, source transformation, and the crown jewels: any linear two-terminal network is a source plus one resistor.',
      concepts: ['Linearity: homogeneity + additivity (power <code>i²R</code> is NOT linear).', 'Superposition: kill independents (V→short, I→open), leave dependents on, sum responses.', 'Source transform: Vs series R ↔ Is parallel R, <code>Is = Vs/R</code>.', 'Thévenin: <code>Vth = Voc</code> series <code>Rth = Voc/Isc</code>. Norton: <code>IN = Isc</code> parallel <code>Rth</code>.', 'With dependents: <code>Rth = vo/io</code> test-source method.'],
      worksheet: [
        { q: 'To deactivate for Rth: voltage sources become…', choices: ['shorts', 'opens', 'dependents'], answer: 0, explain: '0 V = wire. Current sources open.' },
        { q: 'Norton current equals…', choices: ['short-circuit current Isc', 'open-circuit voltage', 'load current'], answer: 0, explain: 'IN = Isc = Vth/Rth.' },
        { q: 'Maximum power transfers to the load when…', choices: ['RL = Rth', 'RL = 0', 'RL → ∞'], answer: 0, explain: 'Matched: VL = Vth/2, Pmax = Vth²/4Rth.' }
      ] },
    { id: 'ch8', part: 'circuits', num: 8, title: 'Review + Glorified Quiz I', widget: 'quizgen',
      lede: 'Cumulative drill over Part I: 81 rapid-fire items plus ten quiz problems. Generate a fresh network below and solve Req before revealing.',
      concepts: ['Topology <code>b = l + n − 1</code>; KCL/KVL sums; dividers.', 'Elements: <code>v = iR</code>, <code>i = C dV/dt</code>, <code>v = L di/dt</code>, <code>Z = R + jX</code>.', 'Op-amps: inverting/non-inverting/summing/diff gains; LM741 saturates near rails.', 'Thévenin = Voc series Rth; Norton = Isc parallel Rth; superposition on/off rules.', 'Meters: ammeter in series (break circuit), voltmeter in parallel.'],
      worksheet: [
        { q: 'A 5 F capacitor holds 1250 C. Voltage?', choices: ['250 V', '6250 V', '50 V'], answer: 0, explain: 'V = Q/C = 1250/5 = 250 V.' },
        { q: 'For superposition, independent sources turn off as… (Book §8 drill)', choices: ['V→short, I→open', 'V→open, I→short', 'both removed with wires cut'], answer: 0, explain: '0 V is a wire; 0 A is a cut. Dependents stay on.' },
        { q: 'Ammeter vs voltmeter connection? (Book §8 drill)', choices: ['ammeter series (break circuit), voltmeter parallel', 'both in series', 'both in parallel'], answer: 0, explain: 'Current through, voltage across.' },
        { q: 'Δ of 10 Ω resistors → equivalent Y? (Book §8 drill)', choices: ['3.33 Ω', '30 Ω', '10 Ω'], answer: 0, explain: 'R_Y = R_Δ/3.' }
      ] },
    { id: 'ch9', part: 'systems', num: 9, title: 'Laplace I: what it is and why', widget: 'laplace',
      lede: 'Probe a signal with decaying sinusoids and the differential equation becomes algebra. Poles are where the transform blows up — and they run the show.',
      concepts: ['Definition: <code>L{f} = ∫₀^∞ e^(−st) f dt</code>; <code>s = σ + jω</code>.', '<code>L{1} = 1/s</code>, <code>L{e^at} = 1/(s−a)</code> (pole at s = a).', 'Derivatives become multiplication: <code>L{x′} = sX − x(0)</code>, second order <code>s²X − sx(0) − x′(0)</code>.', '<code>L{sin at} = a/(s²+a²)</code>, <code>L{∫x} = X/s</code>.', 'R→R, L→sL, C→1/sC (plus initial-condition sources).'],
      worksheet: [
        { q: 'L{δ(t)} = ?', choices: ['1', '1/s', 's'], answer: 0, explain: 'The impulse contains all frequencies equally.' },
        { q: 'Poles of 1/((s+2)(s+5))?', choices: ['s = −2, −5', 's = +2, +5', 's = 0, −7'], answer: 0, explain: 'Denominator roots.' },
        { q: 'L{dx/dt} = ?', choices: ['sX − x(0)', 'X/s', 's²X'], answer: 0, explain: 'Differentiation becomes multiplication minus the initial condition.' }
      ] },
    { id: 'ch10', part: 'systems', num: 10, title: 'Laplace II: how to use it', widget: 'polezero',
      lede: 'Zeros kill, poles explode. The damping ratio ζ and natural frequency ωn classify every second-order response at a glance.',
      concepts: ['Zero: numerator → 0 kills output. Pole: denominator → 0, response → ∞.', 'Standard form <code>s² + 2ζωn s + ωn²</code>; <code>ωn = 1/√(LC)</code>, <code>ζ = R/2·√(C/L)</code>.', 'ζ = 0 undamped ±jωn; 0<ζ<1 underdamped ring; ζ = 1 critical; ζ>1 overdamped crawl.', 'Inverse Laplace in practice: partial fractions + cover-up, not contour integrals.', 'Book example (note: text misprints C = 10; the factorization needs C = 0.1 = 100 mF): series RLC L=1, R=7 → zero s=10, poles s=−2,−5.'],
      worksheet: [
        { q: 'L{9} = ? (Book §10.5.1)', choices: ['9/s', '9s', '0'], answer: 0, explain: 'Linearity: 9·L{1} = 9/s.' },
        { q: 'L{e^(−3t/2)} = ? (Book §10.5.1)', choices: ['1/(s+3/2)', '1/(s−3/2)', 's/(s+3/2)'], answer: 0, explain: 'L{e^at} = 1/(s−a) with a = −3/2.' },
        { q: 'H = 4/(s²+4s+4). Damping?', choices: ['critically damped', 'underdamped', 'unstable'], answer: 0, explain: '(s+2)² — double pole at −2.' },
        { q: 'H = 4/(s²−4). Stable?', choices: ['no — pole at +2', 'yes', 'marginally'], answer: 0, explain: 'Right-half-plane pole grows without bound.' }
      ] },
    { id: 'ch11', part: 'systems', num: 11, title: 'Circuits as ODEs I: first-order', widget: 'rc',
      lede: 'One energy-storage element, one time constant τ = RC. Charge, watch the 63%, and read τ off the initial tangent.',
      concepts: ['Source-free RC: <code>V(t) = V(0)e^(−t/RC)</code>, pole at <code>s = −1/RC</code>.', 'Time constant <code>τ = RC</code>: 63% at 1τ, ~95% at 3τ, settled by 5τ.', 'Tangent at t=0 intercepts the axis at τ — read it off a scope trace.', 'Singular signals: step <code>u</code>, impulse <code>δ = du/dt</code> with <code>L{δ}=1</code>, ramp <code>L{r}=1/s²</code>.', 'ZIR (initial conditions) vs ZSR (forced): total = natural + forced, transient + steady-state.'],
      worksheet: [
        { q: 'After 1τ, a charging capacitor reaches…', choices: ['63% of final', '37% of final', '50% of final'], answer: 0, explain: '1 − e⁻¹ ≈ 0.632.' },
        { q: 'After 5τ the transient is…', choices: ['under 1% — settled', 'still 20%', 'exactly zero'], answer: 0, explain: 'e⁻⁵ ≈ 0.0067.' }
      ] },
    { id: 'ch12', part: 'systems', num: 12, title: 'Circuits as ODEs II: second-order', widget: 'rlc',
      lede: 'Series RLC is the same KVL you already know, now a second-order ODE — and the ζ/ωn map from Ch.10 predicts everything.',
      concepts: ['KVL: same series-RLC ODE as Ch.10 → <code>s² + R/L·s + 1/LC</code>.', 'Pick R for the regime you want: under / critical / over.', '95% settling ≈ 3/(ζωn) for the well-damped cases.', 'Capacitor 200 nF + inductor 50 mH: find R for each regime (try it below).', 'Bridge to Ch.13–14: response shape and stability.'],
      worksheet: [
        { q: 'H = 4/(s²+5s+6). Poles and verdict?', choices: ['−2,−3 stable', '+2,+3 stable', '−2,−3 unstable'], answer: 0, explain: '(s+2)(s+3), both left-half-plane.' },
        { q: 'H = 4/(s²+5s+4). Damping? (cf. HW-IV)', choices: ['overdamped, stable', 'underdamped, stable', 'overdamped, unstable'], answer: 0, explain: '(s+1)(s+4); ωn=2, ζ=1.25>1, both LHP.' }
      ] },
    { id: 'ch13', part: 'systems', num: 13, title: 'System response I: convolution', widget: 'conv',
      lede: 'For LTI systems the impulse response is the whole system: flip it, slide it, and the overlap area draws the output.',
      concepts: ['Any input ≈ sums of impulses: <code>x(t) = ∫x(τ)δ(t−τ)dτ</code>.', 'LTI = linear + shift-invariant. Then all you need is <code>h = T[δ]</code>.', 'Output: <code>y(t) = ∫x(τ)h(t−τ)dτ = x ∗ h</code> — h time-reversed and sliding.', 'Properties: commutative, associative, distributive.', 'Laplace turns it into multiplication: <code>L{f∗g} = F·G</code>.'],
      worksheet: [
        { q: 'Convolution in time equals what in Laplace?', choices: ['multiplication', 'addition', 'differentiation'], answer: 0, explain: 'The reason transfer functions multiply in series.' },
        { q: 'To know an LTI system completely you need…', choices: ['its impulse response h', 'its step response only', 'its schematic'], answer: 0, explain: 'h generates every response via convolution.' }
      ] },
    { id: 'ch14', part: 'systems', num: 14, title: 'System response II: stability', widget: 'stab',
      lede: 'Bounded in, bounded out? Poles in the left half-plane decay; right-half-plane poles grow; resonance and Q live on the edge.',
      concepts: ['BIBO: bounded input → bounded output. <code>y = t·x</code> with a step input is unstable.', 'Pole locations decide: Re(s) < 0 decay, > 0 grow, imaginary part oscillates.', 'Resonance: |H| peaks — series minimum |Z|, parallel maximum |Z|.', 'Q factor: <code>Q = fr/Δf</code>; high Q = narrow, sharp, low loss.', 'Marginal stability: poles exactly on the jω axis ring forever.'],
      worksheet: [
        { q: 'Poles at −1±3j. Stable?', choices: ['yes — decaying ring', 'no', 'marginal'], answer: 0, explain: 'Negative real part dominates.' },
        { q: 'High Q means…', choices: ['narrow sharp peak', 'wide flat response', 'instability'], answer: 0, explain: 'Q = fr/Δf; small bandwidth, low loss.' }
      ] },
    { id: 'ch15', part: 'signals', num: 15, title: 'System response III: active filters', widget: 'bode',
      lede: 'Op-amps plus R and C shape frequency: integrators, differentiators, and their practical low/high-pass fixes — read it off the Bode plot.',
      concepts: ['Inverting generalized: <code>Vo/Vin = −Zf/Zin</code>.', 'Ideal integrator <code>−1/(sRinCF)</code> fails at DC → add RF‖CF = practical low-pass.', 'Ideal differentiator <code>−sRFCin</code> amplifies noise → add series Rin = practical high-pass.', 'Non-inverting: <code>1 + ZF/ZG</code> times the RC divider.', 'Bode: corner at −3 dB, ±20 dB/decade per order, phase tells the story.'],
      worksheet: [
        { q: 'Practical integrator adds Rf across Cf to…', choices: ['stop DC saturation', 'raise gain', 'add noise'], answer: 0, explain: 'Finite DC gain: low-pass with corner 1/(RfCf).' },
        { q: 'One RC order rolls off at…', choices: ['20 dB/decade', '40 dB/decade', '3 dB/decade'], answer: 0, explain: '−3 dB at the corner, then −20 dB/dec.' }
      ] },
    { id: 'ch16', part: 'signals', num: 16, title: 'System response IV: feedback', widget: 'pid',
      lede: 'Feed the output back, compare against the reference, and let PID drive the error to zero. Loop gain runs the closed loop.',
      concepts: ['Loop: <code>Y = P·U, U = C·E, E = R − F·Y</code> → <code>Y = PC/(1+PCF)·R</code>.', 'Open-loop: no output dependence (light switch). Closed-loop: output steers input.', 'PID: <code>u = Kp·e + Ki∫e + Kd·de/dt</code>, <code>C(s) = Kp + Ki/s + Kd·s</code>.', 'P speeds up, I kills steady-state error, D damps overshoot.', 'Goal: <code>H ≈ 1</code> — fast, minimal overshoot, zero steady error.'],
      worksheet: [
        { q: 'Which term removes steady-state error?', choices: ['integral', 'proportional', 'derivative'], answer: 0, explain: 'I keeps pushing while any error persists.' },
        { q: 'Closed-loop transfer with loop gain L = PCF?', choices: ['PC/(1+L)', 'PC·L', 'PC − L'], answer: 0, explain: 'Feedback divides by one plus loop gain.' },
        { q: 'A bedroom light switch is…', choices: ['open-loop — no output dependence', 'closed-loop — the bulb feeds back', 'a PID controller'], answer: 0, explain: 'Book’s example: no dependence of input on output.' }
      ] },
    { id: 'ch17', part: 'bme', num: 17, title: 'Bioelectricity I: passive properties', widget: 'cole',
      lede: 'A cell is R1 + R2‖C. Sweep frequency, plot reactance vs resistance, and the Cole semicircle hands you R0, R∞, and τ — hydration and cell death move it visibly.',
      concepts: ['Cell model: <code>Zeq = R1 + R2/(1+jωR2C)</code>, <code>τ = R2C</code>.', 'Limits: <code>R0 = R1+R2</code> (DC), <code>R∞ = R1</code> (HF).', 'Cole semicircle: <code>X² + (R−(R0+R∞)/2)² = ((R0−R∞)/2)²</code>.', 'Capacitive X is negative (current leads voltage ~90°).', 'BME use: R–Xc tolerance ellipses track hydration/body composition (BIA, DRIVE wearable).'],
      worksheet: [
        { q: 'At very high frequency the cell capacitor is…', choices: ['a short — Z → R1', 'open — Z → R1+R2', 'resonant'], answer: 0, explain: 'C shorts, R2 bypassed: R∞ = R1.' },
        { q: 'Cell death (membranes failing) moves the semicircle…', choices: ['radius collapses', 'radius grows forever', 'center left'], answer: 0, explain: 'R2 → 0 as membranes break down: R0 → R∞.' }
      ] },
    { id: 'ch18', part: 'bme', num: 18, title: 'Bioelectricity II: active properties', widget: 'ap',
      lede: 'Na/K pumping sets the resting potential; voltage-gated m/h/n gates fire the all-or-none action potential; ECG leads read the heart\'s dipole.',
      concepts: ['Na/K-ATPase: 3 Na⁺ out / 2 K⁺ in → inside negative; <code>Cm ≈ 1 µF/cm²</code>.', 'Conductance-weighted rest: <code>Vm = (gkEk + gNaENa + …)/(gk + gNa + …)</code>.', 'HH: <code>INa = gNa·m³h·(Vm−ENa)</code>, <code>IK = gK·n⁴·(Vm−EK)</code>; rest −70 mV, threshold −55 mV.', 'ECG: Einthoven I = LA−RA, II = LL−RA, III = LL−LA; P-QRS-T sequence.', 'Chain: Ag/AgCl → follower → lead select → preamp (high Zin/CMRR) → driven-right-leg → isolation → ADC → analysis.'],
      worksheet: [
        { q: 'HH threshold and rest?', choices: ['−55 mV / −70 mV', '−70 mV / −55 mV', '0 mV / −90 mV'], answer: 0, explain: 'All-or-none above −55 mV.' },
        { q: 'Einthoven: lead I + lead III − lead II = ?', choices: ['0', 'lead II', '2× lead I'], answer: 0, explain: 'Kirchhoff around the limb triangle.' }
      ] },
    { id: 'ch19', part: 'bme', num: 19, title: 'Digital I: logic and components', widget: 'nor',
      lede: 'NOT/AND/OR from NAND/NOR alone, Si doping to transistors — plus knights-and-knaves logic puzzles as the worksheet.',
      concepts: ['NOT ¬A; AND (only 11→1); OR (only 00→0); NAND; NOR; XOR (01,10); XNOR.', 'Functional completeness: everything from NOR alone.', 'Si: 4 valence e⁻ lattice; N-type (P/As, free electron); P-type (B/Ga, hole).', 'NPN on when Vb > Ve; PNP on when base low vs emitter.', 'Worksheet stars knights (truth) vs knaves (lies) puzzles + build gates from NOR.'],
      worksheet: [
        { q: 'Roger says “both of us are knaves.” Roger and Oedipa are… (Book §19.6.2)', choices: ['lying knave + truthful knight', 'both knights', 'both knaves'], answer: 0, explain: 'Both knaves would make it true — impossible; so Roger lies (knave) and Oedipa tells truth (knight).' },
        { q: 'Pedro mumbles inaudibly; Apollonia claims he said “knave”; Peter calls that a lie. (Book §19.6.1)', choices: ['Peter is a knight; Pedro unknowable', 'Peter is a knave; Pedro is a knave', 'all three knights'], answer: 0, explain: 'Pedro must have said “knight” either way, so Apollonia lied (knave) and Peter told truth (knight). Pedro unknowable.' },
        { q: 'One yes/no question to a knight-or-knave to find buried gold? (Book §19.6.3)', choices: ['“If I asked you whether gold is buried, would you say yes?”', '“Are you a knight?”', '“Is 2+2=4?”'], answer: 0, explain: 'Knight reports truthfully; knave lies about his lie — both answer the gold question truthfully.' },
        { q: 'XOR outputs 1 for…', choices: ['01 and 10', '00 and 11', 'only 11'], answer: 0, explain: 'Exclusive or: exactly one high.' }
      ] },
    { id: 'ch20', part: 'bme', num: 20, title: 'Digital II: discretization and acquisition', widget: 'nyquist',
      lede: 'Sample above twice the max frequency or aliases lie to you; quantize with enough bits or noise eats the signal. (Book pages mostly link lab videos — the math below is the standard supplement.)',
      concepts: [        'Nyquist: <code>fs ≥ 2·fmax</code>; alias <code>falias = |f − k·fs|</code>.', 'Drag fs below Nyquist and watch a slow impostor appear.', 'Quantization: <code>LSB = VFS/2^N</code>; <code>SQNR ≈ 6.02N + 1.76 dB</code>.', 'More bits = smaller steps = cleaner ECG.'],
      worksheet: [
        { q: 'ECG content to 150 Hz needs fs of at least…', choices: ['300 Hz', '150 Hz', '75 Hz'], answer: 0, explain: 'Nyquist: fs ≥ 2·fmax.' },
        { q: '8-bit vs 12-bit ADC: SQNR improves by…', choices: ['~24 dB', '~4 dB', 'nothing'], answer: 0, explain: '6.02 dB per bit × 4 bits.' },
        { q: '10-bit ADC, 5 V full scale. LSB size?', choices: ['~4.9 mV', '~49 mV', '~0.49 mV'], answer: 0, explain: 'LSB = 5/1024 ≈ 4.88 mV.' }
      ] },
    { id: 'ch21', part: 'bme', num: 21, title: 'BME situations and standards', widget: 'device',
      lede: 'What counts as a medical device, how classes and pathways work, and which Act created each rule — answer the classifier below.',
      concepts: ['Device (21 USC §321(h)): instrument/implant/IVD for diagnosis/treatment/affecting structure — without primary chemical action.', 'Classes: I low/general controls, II moderate/performance standards, III high/PMA.', 'Pathways: exempt, 510(k) substantial equivalence, De Novo, PMA, IDE, HDE/HUD.', '1976 Amendments created classes + PMA/510(k)/IDE; 1990 Safe Devices; 1997 Modernization (De Novo, least-burdensome).', '2016 21st Century Cures: breakthrough path, digital-health carve-outs.'],
      worksheet: [
        { q: 'Life-supporting implant, no predicate. Pathway?', choices: ['PMA (Class III)', '510(k)', 'Exempt'], answer: 0, explain: 'High risk + novel = premarket approval.' },
        { q: 'A Class II device most often goes through…', choices: ['510(k)', 'PMA', 'nothing'], answer: 0, explain: 'Substantial equivalence to a predicate.' },
        { q: 'The 1976 Medical Device Amendments created…', choices: ['classes I/II/III + PMA/510(k)/IDE + GMP', 'the breakthrough path', 'digital-health carve-outs'], answer: 0, explain: 'The classification and premarket system; breakthrough came in 2016 Cures.' }
      ] },
    { id: 'ch22', part: 'bme', num: 22, title: 'Review + Glorified Quiz III', widget: 'review',
      lede: 'Thirty-one quiz items spanning the book (22.1–22.31) plus HW map. Use the navigator: each card links back to its chapter.',
      concepts: ['Wound wire, inductor potential, op-amp bandwidth/phase, gyrator.', 'Transfer functions (V/V/I/Z), Bode, high/low-pass, inverting integrator.', 'Poles/zeros → response shape; bridges/amplifiers; block diagrams.', 'Convolution and pulse-in; silent knights/knaves; ECG heart; cell current.'],
      worksheet: [
        { q: 'Step response with poles −2, −5 and a zero at 0? (cf. Book §10.5.5)', choices: ['decaying, zero initial slope', 'growing oscillation', 'pure sine'], answer: 0, explain: 'LHP poles decay; the zero at origin kills the DC term: y(0+) = y′(0+) = 0.' },
        { q: 'Poles at −3±4j. Decay rate and ring frequency? (Book §22.21–22.22 theme)', choices: ['e^(−3t) decay, 4 rad/s ring', 'e^(−4t) decay, 3 rad/s ring', 'e^(+3t) growth, 4 rad/s ring'], answer: 0, explain: 'Real part sets the envelope, imaginary part the oscillation.' },
        { q: 'A gyrator (Book §22.7) lets you…', choices: ['simulate inductance with a capacitor', 'amplify without power', 'measure charge directly'], answer: 0, explain: 'Impedance inversion: C behind a gyrator looks inductive.' },
        { q: 'Inverting integrator (§22.17) fed a step input outputs…', choices: ['a ramp', 'a step', 'an impulse'], answer: 0, explain: 'Vo = −1/RC∫Vi — the integral of a step is a ramp.' }
      ] }
  ];
  window.B211 = { PARTS: PARTS, CHAPTERS: CHAPTERS };
})();
