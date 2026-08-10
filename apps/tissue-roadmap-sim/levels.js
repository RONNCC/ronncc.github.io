// TERM Lab Park — level registry (orchestrator-owned merge file)
// Concatenates core (Phases 0-2) + eng (Phases 3-4) level data.
// Loaded AFTER levels-core.js and levels-eng.js, BEFORE app.js.
(function () {
  'use strict';

  window.TERM = window.TERM || {};

  var core = window.TERM_LEVELS_CORE || [];
  var eng = window.TERM_LEVELS_ENG || [];

  // Merge with stable ids, de-duplicating defensively.
  var seen = new Set();
  var levels = core.concat(eng).filter(function (lvl) {
    if (!lvl || !lvl.id || seen.has(lvl.id)) return false;
    seen.add(lvl.id);
    return true;
  });

  // Phase ordering within the merged list: keep core-then-eng order as authored.
  window.TERM.LEVELS = levels;
  window.TERM.LEVEL_COUNT = levels.length;
})();
