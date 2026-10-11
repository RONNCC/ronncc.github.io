/* Relevance-ranked, typo-tolerant search for the Coffee Guide. */
(function (root, factory) {
  "use strict";

  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.CoffeeGuideSearch = api;
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  var FIELD_DEFINITIONS = [
    { key: "name", weight: 1000 },
    { key: "aliases", weight: 820 },
    { key: "shops", weight: 340 },
    { key: "tags", weight: 300 },
    { key: "region", weight: 260 },
    { key: "category", weight: 220 },
    { key: "order", weight: 150 },
    { key: "ingredients", weight: 120 },
    { key: "meaning", weight: 90 }
  ];

  function normalize(value) {
    var text = String(value == null ? "" : value).toLowerCase();
    if (text.normalize) text = text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return text.replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
  }

  function tokenize(value) {
    var normalized = normalize(value);
    return normalized ? normalized.split(" ") : [];
  }

  function fuzzyLimit(term) {
    if (term.length < 4) return 0;
    return term.length >= 8 ? 2 : 1;
  }

  // Optimal-string-alignment distance counts a neighboring letter swap as one typo.
  function editDistance(a, b) {
    var rows = a.length + 1;
    var cols = b.length + 1;
    var matrix = [];
    var i, j, cost, deletion, insertion, substitution, distance;

    if (Math.abs(a.length - b.length) > Math.max(fuzzyLimit(a), fuzzyLimit(b))) return Infinity;
    for (i = 0; i < rows; i++) {
      matrix[i] = [];
      matrix[i][0] = i;
    }
    for (j = 0; j < cols; j++) matrix[0][j] = j;

    for (i = 1; i < rows; i++) {
      for (j = 1; j < cols; j++) {
        cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        deletion = matrix[i - 1][j] + 1;
        insertion = matrix[i][j - 1] + 1;
        substitution = matrix[i - 1][j - 1] + cost;
        matrix[i][j] = Math.min(deletion, insertion, substitution);

        if (i > 1 && j > 1 && a.charAt(i - 1) === b.charAt(j - 2) && a.charAt(i - 2) === b.charAt(j - 1)) {
          matrix[i][j] = Math.min(matrix[i][j], matrix[i - 2][j - 2] + 1);
        }
      }
    }

    distance = matrix[rows - 1][cols - 1];
    return distance;
  }

  function tokenQuality(queryToken, candidateToken) {
    var distance, limit;
    if (queryToken === candidateToken) return 1;
    if (queryToken.length >= 2 && candidateToken.indexOf(queryToken) === 0) return 0.74;
    if (queryToken.length >= 3 && candidateToken.indexOf(queryToken) !== -1) return 0.56;

    limit = fuzzyLimit(queryToken);
    if (!limit) return 0;
    distance = editDistance(queryToken, candidateToken);
    if (distance > limit) return 0;
    return distance === 1 ? 0.48 : 0.34;
  }

  function valuesFor(item, key) {
    var value = item && item[key];
    if (value == null) return [];
    return Array.isArray(value) ? value : [value];
  }

  function hasWholePhrase(text, phrase) {
    var at = text.indexOf(phrase);
    if (at === -1) return false;
    return (at === 0 || text.charAt(at - 1) === " ") &&
      (at + phrase.length === text.length || text.charAt(at + phrase.length) === " ");
  }

  function bestQuality(queryToken, candidateTokens) {
    var best = 0;
    var i, quality;
    for (i = 0; i < candidateTokens.length; i++) {
      quality = tokenQuality(queryToken, candidateTokens[i]);
      if (quality > best) best = quality;
      if (best === 1) break;
    }
    return best;
  }

  function scoreItem(item, query, queryTokens) {
    var fields = [];
    var i, j, values, normalized, def;
    var total = 0, best, quality, allMatched;
    var normalizedName = normalize(item && item.name);
    var nameTokens = tokenize(normalizedName);
    var aliasValues = valuesFor(item, "aliases");
    var aliasExact = false, aliasPhrase = false;
    var exactTitleTokens = true;

    for (i = 0; i < FIELD_DEFINITIONS.length; i++) {
      def = FIELD_DEFINITIONS[i];
      values = valuesFor(item, def.key);
      for (j = 0; j < values.length; j++) {
        normalized = normalize(values[j]);
        if (!normalized) continue;
        fields.push({ weight: def.weight, tokens: tokenize(normalized) });
      }
    }

    // Every query word must match somewhere, while each word gets its strongest
    // field match. This keeps multi-word searches useful without rewarding long
    // descriptions for repeating a term.
    for (i = 0; i < queryTokens.length; i++) {
      best = 0;
      for (j = 0; j < fields.length; j++) {
        quality = bestQuality(queryTokens[i], fields[j].tokens);
        if (quality > 0 && quality * fields[j].weight > best) best = quality * fields[j].weight;
      }
      if (!best) return null;
      total += best;
    }

    // Strong identity boosts: a canonical drink name beats a name that merely
    // mentions it, and a direct alias beats incidental mentions in copy.
    if (normalizedName === query) {
      total += 2500;
    } else if (hasWholePhrase(normalizedName, query)) {
      total += 170;
    }

    for (i = 0; i < aliasValues.length; i++) {
      normalized = normalize(aliasValues[i]);
      if (normalized === query) {
        aliasExact = true;
        break;
      }
      if (hasWholePhrase(normalized, query)) aliasPhrase = true;
    }
    if (aliasExact) total += 90;
    else if (aliasPhrase) total += 35;

    // A typo-corrected complete title ("lattee" → "Latte") should still beat
    // longer titles that only contain the corrected word ("Piccolo Latte").
    if (nameTokens.length === queryTokens.length) {
      allMatched = true;
      for (i = 0; i < queryTokens.length; i++) {
        quality = bestQuality(queryTokens[i], nameTokens);
        if (!quality) {
          allMatched = false;
          break;
        }
        if (quality !== 1) exactTitleTokens = false;
      }
      if (allMatched) total += exactTitleTokens ? 110 : 450;
    }

    return total;
  }

  function rank(items, query) {
    var normalizedQuery = normalize(query);
    var queryTokens = tokenize(normalizedQuery);
    var ranked = [];
    var i, score;

    for (i = 0; i < items.length; i++) {
      score = queryTokens.length ? scoreItem(items[i], normalizedQuery, queryTokens) : 0;
      if (score !== null) ranked.push({ item: items[i], index: i, score: score });
    }

    ranked.sort(function (a, b) {
      return b.score - a.score || a.index - b.index;
    });
    return ranked;
  }

  return {
    normalize: normalize,
    rank: rank
  };
}));
