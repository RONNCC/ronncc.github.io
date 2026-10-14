"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const VisitedStatus = require("../js/visited-status.js");

const LOADER_SRC = fs.readFileSync(path.join(__dirname, "../js/visited-status.js"), "utf8");
const SANDWICH_PAGE = fs.readFileSync(path.join(__dirname, "../_posts/2026-08-04-sandwich-spots.md"), "utf8");
const HOT_CHOCOLATE_PAGE = fs.readFileSync(path.join(__dirname, "../_posts/2026-08-03-hot-chocolate.md"), "utf8");

const SAMPLE_YAML = `---
# Visited status — source of truth
sandwiches:
  oceansubs: notyet            # Ocean Subs — Excelsior
  saigonsandwich: visited
  palmcity: "visited"
  deliboard: 'Not-Yet'
  outtasight: yes
  louscafe: false
  sandys: visited 2026-10-12 got the pastrami
  kp49:
    status: visited
    date: 2026-10-12
  newkirks: "#notacomment"
  saltys:
  boysdeli:todo
  thehornet: banana

top_level_scalar: ignored

hot_chocolate:
\tdandelion: ?
  zazie: unknown
  spro: ~
`;

/* ── normalizeStatus ─────────────────────────────────────────────── */

test("normalizeStatus maps the documented aliases onto the three statuses", () => {
  const n = VisitedStatus.normalizeStatus;
  for (const v of ["visited", "Visited", " VISITED ", "yes", "y", "true", "done", "x", "✓", true]) {
    assert.equal(n(v), "visited", `${v} → visited`);
  }
  for (const v of ["notyet", "not yet", "Not-Yet", "not_yet", "no", "n", "false", "todo", "pending", false]) {
    assert.equal(n(v), "notyet", `${v} → notyet`);
  }
  for (const v of ["unknown", "?", "unconfirmed", "tbd"]) {
    assert.equal(n(v), "unknown", `${v} → unknown`);
  }
  assert.equal(n("visited 2026-10-12"), "visited", "a trailing note after the status is tolerated");
  for (const v of ["", "   ", null, undefined, "banana", "#notacomment", 42]) {
    assert.equal(n(v), null, `${JSON.stringify(v)} → null`);
  }
});

/* ── parse / statusesFor ─────────────────────────────────────────── */

test("parse understands the two-level YAML subset used by the gist", () => {
  const parsed = VisitedStatus.parse(SAMPLE_YAML);
  assert.deepEqual(Object.keys(parsed).sort(), ["hot_chocolate", "sandwiches"], "only mapping sections are kept");
  assert.deepEqual(parsed.sandwiches, {
    oceansubs: "notyet",
    saigonsandwich: "visited",
    palmcity: "visited",
    deliboard: "Not-Yet",
    outtasight: "yes",
    louscafe: "false",
    sandys: "visited 2026-10-12 got the pastrami",
    kp49: "visited",
    newkirks: "#notacomment",
    boysdeli: "todo",
    thehornet: "banana"
  });
  assert.equal("saltys" in parsed.sandwiches, false, "a key with no value is left to the page default");
  assert.deepEqual(parsed.hot_chocolate, { dandelion: "?", zazie: "unknown" }, "tabs are tolerated and ~ means unset");
});

test("statusesFor returns canonical statuses for one section and drops junk", () => {
  assert.deepEqual(VisitedStatus.statusesFor(SAMPLE_YAML, "sandwiches"), {
    oceansubs: "notyet",
    saigonsandwich: "visited",
    palmcity: "visited",
    deliboard: "notyet",
    outtasight: "visited",
    louscafe: "notyet",
    sandys: "visited",
    kp49: "visited",
    boysdeli: "notyet"
  });
  assert.deepEqual(VisitedStatus.statusesFor(SAMPLE_YAML, "hot_chocolate"), { dandelion: "unknown", zazie: "unknown" });
  assert.deepEqual(VisitedStatus.statusesFor(SAMPLE_YAML, "coffee"), {}, "missing section → empty map");
  assert.deepEqual(VisitedStatus.statusesFor("", "sandwiches"), {});
  assert.deepEqual(VisitedStatus.statusesFor(null, "sandwiches"), {});
  assert.deepEqual(VisitedStatus.statusesFor("just some text\nno colons here", "sandwiches"), {});
});

test("parse handles CRLF files and a Windows-style edit of the gist", () => {
  const crlf = "sandwiches:\r\n  oceansubs: visited\r\n  palmcity: notyet\r\n";
  assert.deepEqual(VisitedStatus.statusesFor(crlf, "sandwiches"), { oceansubs: "visited", palmcity: "notyet" });
});

/* ── fetch chain ─────────────────────────────────────────────────── */

// Evaluate the loader in a sandbox with a fake fetch so the real network is
// never touched. `gistId` lets us exercise both the configured and the
// placeholder states regardless of what js/visited-status.js currently holds.
function loadInSandbox({ gistId, responses }) {
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url, init });
    const bare = url.split("?")[0];
    const hit = responses.find((r) => (r.match instanceof RegExp ? r.match.test(url) : bare.endsWith(r.match)));
    if (!hit) throw new TypeError("network down: " + url);
    if (hit.throws) throw new TypeError("network down: " + url);
    return {
      ok: hit.status ? hit.status < 400 : true,
      status: hit.status || 200,
      text: async () => hit.body,
      json: async () => JSON.parse(hit.body)
    };
  };
  const src = gistId ? LOADER_SRC.replace("__GIST_ID__", gistId) : LOADER_SRC;
  const sandbox = { fetch, console, Promise, module: { exports: {} } };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(src, sandbox, { filename: "visited-status.js" });
  return { api: sandbox.module.exports, calls };
}

// Objects created inside the vm realm have a foreign Object.prototype, which
// deepStrictEqual rejects; round-trip through JSON before comparing.
const plain = (value) => JSON.parse(JSON.stringify(value));

const FAKE_ID = "0123456789abcdef0123456789abcdef";
const RAW = `https://gist.githubusercontent.com/RONNCC/${FAKE_ID}/raw/visited.yml`;
const API = `https://api.github.com/gists/${FAKE_ID}`;
const BODY = "sandwiches:\n  oceansubs: visited\n";

test("load() uses the cache-busted raw gist URL first", async () => {
  const { api, calls } = loadInSandbox({ gistId: FAKE_ID, responses: [{ match: /raw\/visited\.yml\?t=\d+$/, body: BODY }] });
  assert.equal(api.isConfigured(), true);
  assert.equal(api.RAW_URL, RAW);
  assert.equal(api.GIST_URL, `https://gist.github.com/RONNCC/${FAKE_ID}`);

  let cbArgs;
  const result = await api.load("sandwiches", (...args) => { cbArgs = args; });
  assert.deepEqual(plain(result), { oceansubs: "visited" });
  assert.deepEqual(plain(cbArgs), [null, { oceansubs: "visited" }]);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, new RegExp("^" + RAW.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\?t=\\d+$"));
  assert.equal(calls[0].init.cache, "no-store");
  assert.equal(calls[0].init.credentials, "omit");
});

test("load() falls back to the plain raw URL, then to the gists API", async () => {
  const plainRaw = loadInSandbox({
    gistId: FAKE_ID,
    responses: [
      { match: /\?t=\d+$/, status: 404, body: "" },
      { match: "/raw/visited.yml", body: BODY }
    ]
  });
  assert.deepEqual(plain(await plainRaw.api.load("sandwiches")), { oceansubs: "visited" });
  assert.deepEqual(plainRaw.calls.map((c) => c.url.split("?")[0]), [RAW, RAW]);

  const viaApi = loadInSandbox({
    gistId: FAKE_ID,
    responses: [
      { match: "/raw/visited.yml", throws: true },
      { match: API, body: JSON.stringify({ files: { "visited.yml": { content: BODY } } }) }
    ]
  });
  assert.deepEqual(plain(await viaApi.api.load("sandwiches")), { oceansubs: "visited" });
  assert.deepEqual(viaApi.calls.map((c) => c.url.split("?")[0]), [RAW, RAW, API]);
  assert.equal(viaApi.calls[2].init.headers.Accept, "application/vnd.github+json");
});

test("load() reports failure (and an empty map) when every source fails", async () => {
  const { api, calls } = loadInSandbox({ gistId: FAKE_ID, responses: [] });
  let cbArgs;
  const result = await api.load("sandwiches", (...args) => { cbArgs = args; });
  assert.deepEqual(plain(result), {});
  assert.match(String(cbArgs[0] && cbArgs[0].message), /network down/, "callback receives the error");
  assert.deepEqual(plain(cbArgs[1]), {});
  assert.equal(calls.length, 3, "raw (busted), raw (plain), API");
});

test("load() refuses to hit the network while the gist id is still the placeholder", async () => {
  const { api, calls } = loadInSandbox({ gistId: null, responses: [{ match: /./, body: BODY }] });
  assert.equal(api.isConfigured(), false);
  let err;
  await api.load("sandwiches", (e) => { err = e; });
  assert.match(err.message, /not configured/);
  assert.equal(calls.length, 0);
});

test("an explicit URL (window.VISITED_STATUS_URL / options.url) bypasses the gist entirely", async () => {
  const { api, calls } = loadInSandbox({ gistId: null, responses: [{ match: "/visited.yml", body: BODY }] });
  assert.deepEqual(plain(await api.load("sandwiches", null, { url: "/visited.yml" })), { oceansubs: "visited" });
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^\/visited\.yml\?t=\d+$/);

  const failing = loadInSandbox({ gistId: FAKE_ID, responses: [] });
  await failing.api.load("sandwiches", null, { url: "/visited.yml" });
  assert.deepEqual(failing.calls.map((c) => c.url.split("?")[0]), ["/visited.yml", "/visited.yml"], "no API fallback for a custom URL");
});

/* ── the pages ───────────────────────────────────────────────────── */

function inlineScript(page) {
  return page.match(/<script>\s*([\s\S]*?)<\/script>/)[1];
}

function spotKeys(page) {
  return Array.from(inlineScript(page).matchAll(/\{key:'([a-z0-9_]+)'/g), (m) => m[1]);
}

test("both map pages load the shared visited-status script and ask for their own section", () => {
  for (const [name, page, section] of [["sandwich", SANDWICH_PAGE, "sandwiches"], ["hot chocolate", HOT_CHOCOLATE_PAGE, "hot_chocolate"]]) {
    assert.match(page, /<script src="\/js\/visited-status\.js\?v=\d+"><\/script>/, `${name} page includes the loader`);
    assert.ok(page.indexOf("/js/visited-status.js") < page.indexOf("<script>\n(function(){"), `${name}: loader is included before the page script`);
    assert.match(inlineScript(page), new RegExp(`VS\\.load\\('${section}'`), `${name} page loads section ${section}`);
    assert.doesNotThrow(() => new vm.Script(inlineScript(page)), `${name} inline script parses`);
    assert.match(page, /visibilitychange/, `${name} page re-syncs when the tab regains focus`);
    assert.match(page, /GIST_URL/, `${name} page links to the gist for editing`);
  }
});

test("the gist is the only place visited marks live — no localStorage, toggles, or reset button", () => {
  assert.doesNotMatch(SANDWICH_PAGE, /localStorage|sessionStorage/);
  assert.doesNotMatch(SANDWICH_PAGE, /toggleSpotVisited|ssResetBtn|ss-check-btn|ss-detail-toggle-btn|Mark as Visited/);
  assert.doesNotMatch(HOT_CHOCOLATE_PAGE, /localStorage|sessionStorage/);
});

test("spot keys are unique and look like YAML-friendly identifiers", () => {
  for (const [name, page, expectedCount] of [["sandwich", SANDWICH_PAGE, 21], ["hot chocolate", HOT_CHOCOLATE_PAGE, 11]]) {
    const keys = spotKeys(page);
    assert.equal(keys.length, expectedCount, `${name}: ${expectedCount} spots`);
    assert.equal(new Set(keys).size, keys.length, `${name}: keys are unique`);
    for (const k of keys) assert.match(k, /^[a-z0-9_]+$/, `${name}: ${k}`);
  }
});

test("every spot keeps a fallback status for when the gist is unreachable", () => {
  const sandwiches = inlineScript(SANDWICH_PAGE).match(/defaultStatus:'(visited|notyet)'/g) || [];
  assert.equal(sandwiches.length, 21);
  const hotChocolate = inlineScript(HOT_CHOCOLATE_PAGE).match(/\bstatus:'(visited|notyet|unknown)'/g) || [];
  assert.equal(hotChocolate.length, 11);
});
