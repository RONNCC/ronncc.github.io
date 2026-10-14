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

test("parse understands the two-level YAML subset used by the status file", () => {
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

test("parse handles CRLF files and a Windows-style edit of the status file", () => {
  const crlf = "sandwiches:\r\n  oceansubs: visited\r\n  palmcity: notyet\r\n";
  assert.deepEqual(VisitedStatus.statusesFor(crlf, "sandwiches"), { oceansubs: "visited", palmcity: "notyet" });
});

/* ── fetch chain ─────────────────────────────────────────────────── */

// Evaluate the loader in a sandbox with a fake fetch so the real network is
// never touched. `sourceUrl` swaps the configured SOURCE_URL so both the
// site-hosted and the gist-hosted shapes are exercised regardless of which
// one js/visited-status.js currently points at.
function loadInSandbox({ sourceUrl, responses }) {
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
  const src = sourceUrl ? LOADER_SRC.replace(/var SOURCE_URL = "[^"]*";/, `var SOURCE_URL = ${JSON.stringify(sourceUrl)};`) : LOADER_SRC;
  const sandbox = { fetch, console, Promise, module: { exports: {} } };
  sandbox.globalThis = sandbox;
  vm.runInNewContext(src, sandbox, { filename: "visited-status.js" });
  return { api: sandbox.module.exports, calls };
}

// Objects created inside the vm realm have a foreign Object.prototype, which
// deepStrictEqual rejects; round-trip through JSON before comparing.
const plain = (value) => JSON.parse(JSON.stringify(value));

const FILE = "sf-spots-visited-status.yml";
const FAKE_ID = "0123456789abcdef0123456789abcdef";
const GIST_RAW = `https://gist.githubusercontent.com/RONNCC/${FAKE_ID}/raw/${FILE}`;
const GIST_API = `https://api.github.com/gists/${FAKE_ID}`;
const BODY = "sandwiches:\n  oceansubs: visited\n";
const escapeRe = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

test("the default source is the YAML served from this repo, with a matching edit link", () => {
  assert.equal(VisitedStatus.SOURCE_URL, `/data/${FILE}`);
  assert.equal(VisitedStatus.SOURCE_NAME, FILE);
  assert.equal(VisitedStatus.EDIT_URL, `https://github.com/RONNCC/ronncc.github.io/edit/master/data/${FILE}`);
  assert.ok(fs.existsSync(path.join(__dirname, "..", "data", FILE)), `data/${FILE} exists`);
  assert.doesNotMatch(fs.readFileSync(path.join(__dirname, "..", "data", FILE), "utf8"), /^---/, "must not start with --- or Jekyll treats it as front matter");
});

test("gistFor recognises gist raw URLs (with or without a revision) and nothing else", () => {
  assert.deepEqual(VisitedStatus.gistFor(GIST_RAW), { id: FAKE_ID, file: FILE, apiUrl: GIST_API });
  assert.deepEqual(VisitedStatus.gistFor(`https://gist.githubusercontent.com/RONNCC/${FAKE_ID}/raw/abc123def/${FILE}`), { id: FAKE_ID, file: FILE, apiUrl: GIST_API });
  assert.equal(VisitedStatus.gistFor(`/data/${FILE}`), null);
  assert.equal(VisitedStatus.gistFor(`https://sghose.me/data/${FILE}`), null);
  assert.equal(VisitedStatus.gistFor(""), null);
});

test("load() fetches SOURCE_URL with a cache-buster first", async () => {
  const { api, calls } = loadInSandbox({ responses: [{ match: new RegExp(`/data/${escapeRe(FILE)}\\?t=\\d+$`), body: BODY }] });
  let cbArgs;
  const result = await api.load("sandwiches", (...args) => { cbArgs = args; });
  assert.deepEqual(plain(result), { oceansubs: "visited" });
  assert.deepEqual(plain(cbArgs), [null, { oceansubs: "visited" }]);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, new RegExp(`^/data/${escapeRe(FILE)}\\?t=\\d+$`));
  assert.equal(calls[0].init.cache, "no-store");
  assert.equal(calls[0].init.credentials, "omit");
});

test("load() falls back to the plain URL; a site-hosted file has no third fallback", async () => {
  const plainUrl = loadInSandbox({
    responses: [
      { match: /\?t=\d+$/, status: 404, body: "" },
      { match: `/data/${FILE}`, body: BODY }
    ]
  });
  assert.deepEqual(plain(await plainUrl.api.load("sandwiches")), { oceansubs: "visited" });
  assert.deepEqual(plainUrl.calls.map((c) => c.url.split("?")[0]), [`/data/${FILE}`, `/data/${FILE}`]);

  const failing = loadInSandbox({ responses: [] });
  let cbArgs;
  const result = await failing.api.load("sandwiches", (...args) => { cbArgs = args; });
  assert.deepEqual(plain(result), {});
  assert.match(String(cbArgs[0] && cbArgs[0].message), /network down/, "callback receives the error");
  assert.deepEqual(plain(cbArgs[1]), {});
  assert.equal(failing.calls.length, 2, "busted + plain, then give up");
});

test("once SOURCE_URL points at a gist, the gists API is the last-resort fallback", async () => {
  const viaApi = loadInSandbox({
    sourceUrl: GIST_RAW,
    responses: [
      { match: `/raw/${FILE}`, throws: true },
      { match: GIST_API, body: JSON.stringify({ files: { [FILE]: { content: BODY } } }) }
    ]
  });
  assert.equal(viaApi.api.SOURCE_NAME, FILE);
  assert.deepEqual(plain(await viaApi.api.load("sandwiches")), { oceansubs: "visited" });
  assert.deepEqual(viaApi.calls.map((c) => c.url.split("?")[0]), [GIST_RAW, GIST_RAW, GIST_API]);
  assert.equal(viaApi.calls[2].init.headers.Accept, "application/vnd.github+json");

  const allDown = loadInSandbox({ sourceUrl: GIST_RAW, responses: [] });
  let err;
  await allDown.api.load("sandwiches", (e) => { err = e; });
  assert.match(String(err && err.message), /network down/);
  assert.equal(allDown.calls.length, 3, "raw (busted), raw (plain), API");
});

test("an explicit URL (window.VISITED_STATUS_URL / options.url) overrides SOURCE_URL", async () => {
  const { api, calls } = loadInSandbox({ responses: [{ match: "/local.yml", body: BODY }] });
  assert.deepEqual(plain(await api.load("sandwiches", null, { url: "/local.yml" })), { oceansubs: "visited" });
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /^\/local\.yml\?t=\d+$/);

  const failing = loadInSandbox({ sourceUrl: GIST_RAW, responses: [] });
  await failing.api.load("sandwiches", null, { url: "/local.yml" });
  assert.deepEqual(failing.calls.map((c) => c.url.split("?")[0]), ["/local.yml", "/local.yml"], "no gist API fallback for an override URL");
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
    assert.match(page, /VS\.EDIT_URL/, `${name} page links to the YAML for editing`);
    assert.match(page, /VS\.SOURCE_NAME/, `${name} page names the YAML file in its sync note`);
  }
});

test("the YAML is the only place visited marks live — no localStorage, toggles, or reset button", () => {
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

test("data/sf-spots-visited-status.yml covers every spot key in both posts (and nothing else)", () => {
  const yaml = fs.readFileSync(path.join(__dirname, "..", "data", FILE), "utf8");
  for (const [name, page, section] of [["sandwich", SANDWICH_PAGE, "sandwiches"], ["hot chocolate", HOT_CHOCOLATE_PAGE, "hot_chocolate"]]) {
    const statuses = VisitedStatus.statusesFor(yaml, section);
    assert.deepEqual(Object.keys(statuses).sort(), spotKeys(page).sort(), `${name}: YAML keys match the post's spot keys`);
  }
  assert.deepEqual(Object.keys(VisitedStatus.parse(yaml)).sort(), ["hot_chocolate", "sandwiches"], "only the two known sections");
  const hotChocolate = VisitedStatus.statusesFor(yaml, "hot_chocolate");
  const sandwiches = VisitedStatus.statusesFor(yaml, "sandwiches");
  assert.ok(Object.values(sandwiches).every((v) => v === "visited" || v === "notyet"), "sandwich page only knows visited/notyet");
  assert.ok(Object.values(hotChocolate).every((v) => VisitedStatus.STATUSES.includes(v)));
});

test("every spot keeps a fallback status for when the YAML is unreachable", () => {
  const sandwiches = inlineScript(SANDWICH_PAGE).match(/defaultStatus:'(visited|notyet)'/g) || [];
  assert.equal(sandwiches.length, 21);
  const hotChocolate = inlineScript(HOT_CHOCOLATE_PAGE).match(/\bstatus:'(visited|notyet|unknown)'/g) || [];
  assert.equal(hotChocolate.length, 11);
});
