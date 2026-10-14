/* Visited status for the SF spot maps (/sandwich-spots/, /hot-chocolate/).
 *
 * The single source of truth is a secret GitHub gist containing a YAML
 * file (visited.yml). Only the gist owner can edit it; the pages fetch it
 * on every load, so an edit shows up on every device without a deploy.
 *
 *   sandwiches:
 *     oceansubs: visited      # comments are fine
 *     palmcity: notyet
 *   hot_chocolate:
 *     dandelion: visited
 *
 * This file deliberately parses only that small YAML subset (two-level
 * maps of scalars, plus an optional nested `status:` field) so the pages
 * do not need a YAML library. Unknown lines are ignored; unknown values
 * fall back to the default baked into the post.
 *
 * Browser: window.VisitedStatus.load(section, callback)
 * Node:    module.exports (used by scripts/visited-status.test.js)
 */
(function (root, factory) {
  "use strict";

  var api = factory(root);
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.VisitedStatus = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function (root) {
  "use strict";

  /* ── Where the YAML lives ──────────────────────────────────────────── */
  var GIST_OWNER = "RONNCC";
  var GIST_ID = "__GIST_ID__"; // ← paste the id from https://gist.github.com/<owner>/<id>
  var GIST_FILE = "visited.yml";

  var GIST_URL = "https://gist.github.com/" + GIST_OWNER + "/" + GIST_ID;
  // No revision hash in the path → always the latest revision. CORS is open.
  var RAW_URL = "https://gist.githubusercontent.com/" + GIST_OWNER + "/" + GIST_ID + "/raw/" + GIST_FILE;
  var API_URL = "https://api.github.com/gists/" + GIST_ID;

  function isConfigured() {
    return /^[0-9a-f]{20,}$/i.test(GIST_ID);
  }

  /* ── Status vocabulary ─────────────────────────────────────────────── */
  var STATUSES = ["visited", "notyet", "unknown"];
  var STATUS_ALIASES = {
    visited: ["visited", "visit", "yes", "y", "true", "done", "went", "been", "x", "✓", "✔", "check"],
    notyet: ["notyet", "not yet", "not", "no", "n", "false", "todo", "to do", "pending", "soon", "unvisited", "later", "○", "o"],
    unknown: ["unknown", "unconfirmed", "?", "maybe", "tbd", "unsure"]
  };
  var ALIAS_LOOKUP = {};
  STATUSES.forEach(function (status) {
    STATUS_ALIASES[status].forEach(function (alias) { ALIAS_LOOKUP[alias] = status; });
  });

  function squash(text) {
    return String(text == null ? "" : text).trim().toLowerCase().replace(/[\s_-]+/g, " ");
  }

  // "visited" | "Not-Yet" | "yes" | "visited 2026-10-12" → canonical status, else null.
  function normalizeStatus(value) {
    if (value === true) return "visited";
    if (value === false) return "notyet";
    var v = squash(value);
    if (!v) return null;
    if (Object.prototype.hasOwnProperty.call(ALIAS_LOOKUP, v)) return ALIAS_LOOKUP[v];
    var head = v.split(" ")[0];
    if (Object.prototype.hasOwnProperty.call(ALIAS_LOOKUP, head)) return ALIAS_LOOKUP[head];
    return null;
  }

  /* ── Tiny YAML-subset parser ───────────────────────────────────────── */
  function stripComment(line) {
    var inSingle = false, inDouble = false;
    for (var i = 0; i < line.length; i++) {
      var ch = line.charAt(i);
      if (ch === "'" && !inDouble) inSingle = !inSingle;
      else if (ch === '"' && !inSingle) inDouble = !inDouble;
      else if (ch === "#" && !inSingle && !inDouble && (i === 0 || /\s/.test(line.charAt(i - 1)))) {
        return line.slice(0, i);
      }
    }
    return line;
  }

  function unquote(text) {
    var t = String(text).trim();
    if (t.length >= 2) {
      var first = t.charAt(0), last = t.charAt(t.length - 1);
      if ((first === '"' && last === '"') || (first === "'" && last === "'")) return t.slice(1, -1);
    }
    return t;
  }

  var KEY_VALUE = /^\s*(?:-\s+)?("[^"]*"|'[^']*'|[^:#'"][^:#]*?)\s*:(?:\s*(.*))?$/;

  // Returns { section: { key: rawValue } } for every top-level mapping.
  function parse(text) {
    var sections = {};
    var current = null;   // name of the section being filled
    var entry = null;     // last key seen inside the section (for nested `status:`)
    var entryIndent = -1;
    var lines = String(text == null ? "" : text).replace(/\r\n?/g, "\n").split("\n");

    for (var i = 0; i < lines.length; i++) {
      var line = stripComment(lines[i].replace(/\t/g, "  ")).replace(/\s+$/, "");
      var trimmed = line.trim();
      if (!trimmed || trimmed === "---" || trimmed === "...") continue;

      var match = KEY_VALUE.exec(line);
      if (!match) continue;

      var indent = line.length - line.replace(/^\s+/, "").length;
      var key = unquote(match[1]);
      var value = match[2] == null ? "" : unquote(match[2]);
      if (value === "~" || value === "null") value = "";

      if (indent === 0) {
        current = value === "" ? key : null;      // `section:` opens a map; `a: b` at top level is ignored
        if (current && !sections[current]) sections[current] = {};
        entry = null;
        entryIndent = -1;
      } else if (current) {
        if (entry !== null && indent > entryIndent) {
          // nested field under an entry, e.g.  oceansubs:\n    status: visited\n    date: ...
          if (key === "status" || key === "visited") sections[current][entry] = value;
        } else {
          entry = key;
          entryIndent = indent;
          if (value !== "") sections[current][key] = value;
        }
      }
    }
    return sections;
  }

  // { key: canonicalStatus } for one section; unrecognised values are dropped.
  function statusesFor(text, section) {
    var raw = parse(text)[section] || {};
    var out = {};
    Object.keys(raw).forEach(function (key) {
      var status = normalizeStatus(raw[key]);
      if (status) out[key] = status;
    });
    return out;
  }

  /* ── Fetching ──────────────────────────────────────────────────────── */
  function fetchText(url) {
    return root.fetch(url, { cache: "no-store", credentials: "omit" }).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status + " for " + url);
      return res.text();
    });
  }

  function fetchFromApi() {
    return root.fetch(API_URL, { cache: "no-store", credentials: "omit", headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status + " for " + API_URL);
        return res.json();
      })
      .then(function (gist) {
        var file = gist && gist.files && gist.files[GIST_FILE];
        if (!file || typeof file.content !== "string") throw new Error("gist has no " + GIST_FILE);
        return file.content;
      });
  }

  // Resolves with the YAML text. Tries, in order:
  //   1. raw gist URL with a cache-buster (the raw CDN otherwise caches ~5 min)
  //   2. plain raw gist URL
  //   3. the gists REST API (60 req/h/IP unauthenticated, so only as a fallback)
  function fetchYaml(options) {
    options = options || {};
    var override = options.url || (root && root.VISITED_STATUS_URL);
    var base = override || RAW_URL;

    if (!root || typeof root.fetch !== "function") return Promise.reject(new Error("fetch is not available"));
    if (!override && !isConfigured()) return Promise.reject(new Error("visited-status gist id is not configured"));

    var busted = base + (base.indexOf("?") === -1 ? "?" : "&") + "t=" + Date.now();
    return fetchText(busted)
      .catch(function () { return fetchText(base); })
      .catch(function (err) {
        if (override) throw err;
        return fetchFromApi();
      });
  }

  // load("sandwiches", function (err, statuses) {...}) → also returns a Promise.
  function load(section, callback, options) {
    var cb = typeof callback === "function" ? callback : function () {};
    return fetchYaml(options).then(function (text) {
      var statuses = statusesFor(text, section);
      cb(null, statuses);
      return statuses;
    }, function (err) {
      cb(err, {});
      return {};
    });
  }

  return {
    GIST_OWNER: GIST_OWNER,
    GIST_ID: GIST_ID,
    GIST_FILE: GIST_FILE,
    GIST_URL: GIST_URL,
    RAW_URL: RAW_URL,
    API_URL: API_URL,
    STATUSES: STATUSES,
    isConfigured: isConfigured,
    normalizeStatus: normalizeStatus,
    parse: parse,
    statusesFor: statusesFor,
    fetchYaml: fetchYaml,
    load: load
  };
}));
