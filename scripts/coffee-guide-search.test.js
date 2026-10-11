"use strict";

var assert = require("node:assert/strict");
var fs = require("node:fs");
var path = require("node:path");
var test = require("node:test");
var vm = require("node:vm");
var search = require("../guides/coffee-guide-search.js");

// Put Piccolo Latte first to reproduce the original data-order ranking bug.
var drinks = [
  {
    name: "Piccolo Latte",
    aliases: ["piccolo", "small latte", "ristretto latte"],
    category: "milk",
    shops: ["The Coffee Movement", "Pinhole"],
    meaning: "A tiny 3–4 oz latte with silky milk."
  },
  {
    name: "Cappuccino",
    aliases: ["competition cappuccino", "dry cappuccino"],
    category: "milk",
    meaning: "Espresso and steamed milk, foamier than a latte."
  },
  {
    name: "Flat White",
    aliases: ["microfoam coffee", "small latte"],
    category: "milk",
    meaning: "Velvety microfoam and espresso."
  },
  {
    name: "Latte",
    aliases: ["caffè latte", "iced latte", "oat latte"],
    category: "milk",
    shops: ["Saint Frank", "Ritual"],
    meaning: "The milk-forward classic, with espresso and steamed milk."
  }
];

function names(query) {
  return search.rank(drinks, query).map(function (result) { return result.item.name; });
}

test("exact drink name ranks above a longer name and incidental mentions", function () {
  var results = search.rank(drinks, "latte");
  assert.equal(results[0].item.name, "Latte");
  assert.ok(results.findIndex(function (result) { return result.item.name === "Piccolo Latte"; }) > 0);
  assert.ok(results.findIndex(function (result) { return result.item.name === "Cappuccino"; }) > 0);
});

test("a specific multiword query ranks its exact drink first", function () {
  assert.equal(names("piccolo latte")[0], "Piccolo Latte");
});

test("direct aliases remain searchable and relevant", function () {
  assert.equal(names("small latte")[0], "Piccolo Latte");
});

test("fuzzy spelling catches a typo and reranks the closest canonical name", function () {
  assert.equal(names("lattee")[0], "Latte");
  assert.equal(names("capuccino")[0], "Cappuccino");
  assert.equal(names("flta whte")[0], "Flat White");
});

test("normalization handles accents, punctuation, and partial words", function () {
  assert.equal(names("caffe latte")[0], "Latte");
  assert.equal(names("flat-white")[0], "Flat White");
  assert.equal(names("capp")[0], "Cappuccino");
});

test("empty queries preserve source order and unrelated queries do not match", function () {
  assert.deepEqual(names(""), drinks.map(function (drink) { return drink.name; }));
  assert.deepEqual(names("xyzzy-not-a-drink"), []);
});

test("the live guide ranks Latte ahead of Piccolo Latte", function () {
  var guide = fs.readFileSync(path.join(__dirname, "../guides/coffee-guide.md"), "utf8");
  var match = guide.match(/var drinks = (\[[\s\S]*?\n  \]);/);
  assert.ok(match, "the Coffee Guide drinks data is present");
  var guideDrinks = vm.runInNewContext(match[1]);
  var results = search.rank(guideDrinks, "latte").map(function (result) { return result.item.name; });

  assert.equal(results[0], "Latte");
  assert.ok(results.indexOf("Piccolo Latte") > 0);
  assert.equal(search.rank(guideDrinks, "lattee")[0].item.name, "Latte");
  assert.equal(search.rank(guideDrinks, "capuccino")[0].item.name, "Cappuccino");
});
