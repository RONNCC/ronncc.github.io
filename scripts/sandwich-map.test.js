"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");

const page = fs.readFileSync(path.join(__dirname, "../_posts/2026-08-04-sandwich-spots.md"), "utf8");
const script = page.match(/<script>\s*([\s\S]*?)<\/script>/)[1];

function mapSetup() {
  const setup = script.match(/var map = L\.map[\s\S]*?\.addTo\(map\);/);
  assert.ok(setup, "The page initializes a Leaflet map and tile layer");
  const result = {};
  const map = {
    setView(center, zoom) {
      result.center = center;
      result.zoom = zoom;
      return this;
    }
  };
  vm.runInNewContext(setup[0], {
    L: {
      map(id, options) {
        result.id = id;
        result.mapOptions = options;
        return map;
      },
      tileLayer(url, options) {
        result.url = url;
        result.tileOptions = options;
        return { addTo(target) { assert.equal(target, map); } };
      }
    }
  });
  return result;
}

test("sandwich page JavaScript parses and no longer references CARTO", () => {
  assert.doesNotThrow(() => new vm.Script(script));
  assert.doesNotMatch(page, /cartocdn|\bCARTO\b/i);
});

test("map uses keyless HTTPS OpenStreetMap tiles with supported zoom and attribution", () => {
  const { url, tileOptions, mapOptions } = mapSetup();
  assert.equal(url, "https://tile.openstreetmap.org/{z}/{x}/{y}.png");
  assert.equal(tileOptions.maxZoom, 19);
  assert.match(tileOptions.attribution, /&copy; <a href="https:\/\/www\.openstreetmap\.org\/copyright">OpenStreetMap<\/a> contributors/);
  assert.notEqual(mapOptions.attributionControl, false);
});

test("map keeps the sandwich container, SF starting view, and zoom controls", () => {
  const { id, center, zoom, mapOptions } = mapSetup();
  assert.equal(id, "ssMap");
  assert.deepEqual(Array.from(center), [37.771, -122.443]);
  assert.equal(zoom, 12.5);
  assert.equal(mapOptions.zoomControl, true);
});
