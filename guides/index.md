---
layout: page
title: Guides
permalink: /guides/
redirect_from: /places/
---

Interactive maps, museum passes, and event companions across the Bay Area, NYC, and beyond.

<div class="guides-table-wrap">
  <table class="guides-table">
    <thead>
      <tr>
        <th style="width: 29%;">Guide</th>
        <th style="width: 17%;">Location</th>
        <th style="width: 19%;">Format</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/hot-chocolate/">
            <span class="guide-icon">🍫</span> Hot Chocolate Spots
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">San Francisco</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Interactive Map</span></td>
        <td class="col-desc"><span class="guide-desc">Curated map of SF drinking chocolate, bakeries, and cafes with notes on signature drinks and status.</span></td>
      </tr>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/sandwich-spots/">
            <span class="guide-icon">🥪</span> Sandwich Spots
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">San Francisco</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Interactive Map</span></td>
        <td class="col-desc"><span class="guide-desc">Neighborhood guide to standout SF delis and sandwich counters with operating hours and orders.</span></td>
      </tr>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/museums/">
            <span class="guide-icon">🏛️</span> Museums &amp; Passes
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">Bay Area &amp; NYC</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Directory &amp; Map</span></td>
        <td class="col-desc"><span class="guide-desc">Directory of 150 museums with reciprocal admission networks (NARM, ROAM), student discounts, and free nights.</span></td>
      </tr>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/coffee-guide/">
            <span class="guide-icon">☕</span> Coffee Guide
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">San Francisco</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Visual Decoder</span></td>
        <td class="col-desc"><span class="guide-desc">Illustrated decoder for espresso drinks, milk ratios, cafe menu terminology, and local roasters.</span></td>
      </tr>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/civilizations/">
            <span class="guide-icon">📜</span> Civilization Readers
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">Multi-city</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Museum Primers</span></td>
        <td class="col-desc"><span class="guide-desc">53 pocket museum primers with timelines, gallery floor numbers, and 90-minute walkthrough tours.</span></td>
      </tr>
      <tr>
        <td class="col-guide">
          <a class="guide-name" href="{{ site.baseurl }}/fifa2026/">
            <span class="guide-icon">⚽</span> FIFA 2026
          </a>
        </td>
        <td class="col-meta"><span class="guide-badge badge-loc">North America</span></td>
        <td class="col-meta"><span class="guide-badge badge-type">Match Tracker</span></td>
        <td class="col-desc"><span class="guide-desc">Match schedule snapshot, stadium venues, and team rosters for the 2026 World Cup tournament.</span></td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  document.querySelectorAll('.guides-table tbody tr').forEach(function(row) {
    row.addEventListener('click', function(e) {
      if (e.target.tagName !== 'A') {
        var a = row.querySelector('a.guide-name');
        if (a) a.click();
      }
    });
  });
</script>
