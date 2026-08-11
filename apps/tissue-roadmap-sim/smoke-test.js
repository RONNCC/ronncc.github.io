#!/usr/bin/env node
/* Minimal offline regression check for route stops and simulation progression. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = __dirname;
const context = { window: {}, console };
vm.createContext(context);

for (const file of ['factory.js', 'spec.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), context, { filename: file });
}

context.Factory = context.window.Factory;
context.Spec = context.window.Spec;
vm.runInContext(fs.readFileSync(path.join(root, 'sim.js'), 'utf8'), context, { filename: 'sim.js' });

const { Factory, Sim } = context.window;
for (const stop of Factory.STOPS) {
  const station = Factory.STATIONS.find(item => item.id === stop.id);
  const position = Factory.MAIN.at(stop.at);
  if (!station || Math.hypot(position.x - station.x, position.y - station.y) > 0.01) {
    throw new Error(`Station stop does not match its route position: ${stop.id}`);
  }
}

Sim.start('SN-001');
Sim.nextStation();
if (Sim.state.phase !== 'dwell' || Sim.state.currentStation !== Factory.ORDER[0]) {
  throw new Error('Next-station control did not arrive at the first station.');
}
Sim.nextStation();
if (Sim.state.phase !== 'read') {
  throw new Error('Next-station control did not complete the active dwell.');
}
Sim.nextStation();
if (Sim.state.phase !== 'travel' || Sim.state.stage !== 1) {
  throw new Error('Next-station control did not continue the reviewed station.');
}

Sim.start('SN-001');
for (let frame = 0; frame < 12000 && !Sim.state.finished; frame++) {
  Sim.update(1 / 30);
  if (Sim.state.phase === 'read') Sim.continueStation();
}
if (!Sim.state.finished || Sim.state.stage !== Factory.ORDER.length) {
  throw new Error(`Simulation stalled at stage ${Sim.state.stage} (${Sim.state.phase}).`);
}

console.log(`TERM Lab Park smoke test passed: ${Sim.state.stage} stations completed.`);
