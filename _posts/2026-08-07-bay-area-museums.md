---
layout: post
title: "Bay Area & NYC Museums — Free Pass Guide"
categories: ["2026"]
permalink: /museums/
redirect_from: /2026/museums
---

<style>
.ms-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:0;margin:0;line-height:1.5;color:#1a1a1a;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}
@media(max-width:800px){.ms-app{margin:0;left:auto;right:auto;margin-left:0;margin-right:0;width:unset}}

/* ── top bar ── */
.ms-bar{background:#fff;border-bottom:1px solid #e5e5e5;padding:14px 20px}
.ms-bar h2{margin:0 0 2px;font-size:18px;font-weight:800;color:#1a1a1a}
.ms-bar .ms-sub{font-size:12.5px;color:#777;margin:0 0 12px}
.ms-toolbar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:10px}
.ms-count{margin-left:auto;font-size:12px;color:#888;font-weight:600;white-space:nowrap}
.ms-view-toggle{display:flex;gap:6px}
.ms-view-btn{border:1px solid #ddd;background:#fff;color:#666;font:600 12px/1 inherit;padding:6px 13px;border-radius:999px;cursor:pointer;transition:all .12s}
.ms-view-btn.on{background:#1a1a1a;border-color:#1a1a1a;color:#fff}
.ms-filter-label{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;font-weight:700;margin:0 0 6px}
.ms-chips{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px}
.ms-chip{border:1px solid #ddd;background:#fff;color:#666;font:600 12px/1 inherit;padding:5px 11px;border-radius:999px;cursor:pointer;transition:all .12s}
.ms-chip:hover{border-color:#aaa;color:#333}
.ms-chip.on{background:#0f6ab4;border-color:#0f6ab4;color:#fff}
.ms-chip.metro.on{background:#1a1a1a;border-color:#1a1a1a;color:#fff}
.ms-chip .ms-ct{margin-left:4px;opacity:.65}
.ms-loc-btn{display:flex;align-items:center;gap:6px;border:1px dashed #c9c9c9;background:#fff;color:#555;font:600 12px/1 inherit;padding:7px 12px;border-radius:999px;cursor:pointer;transition:all .12s}
.ms-loc-btn:hover{border-color:#0f6ab4;color:#0f6ab4}
.ms-loc-btn.on{background:#e8f2fb;border-color:#0f6ab4;color:#0f6ab4}
.ms-tip{background:#fffbe6;border:1px solid #f0d971;border-radius:10px;padding:10px 12px;font-size:12px;color:#6b5900;margin:0 0 12px;line-height:1.45}
.ms-tip b{color:#3d3200}
.ms-tip a{color:#0f6ab4;text-decoration:none;font-weight:700}
.ms-tip a:hover{text-decoration:underline}

/* ── content area ── */
.ms-content{position:relative;height:calc(100vh - 210px);overflow:hidden}
@media(max-width:800px){.ms-content{height:auto;overflow:auto}}

/* ── map ── */
.ms-map{display:none;width:100%;height:100%;position:absolute;top:0;left:0}
.ms-map.active{display:block}
.ms-map .leaflet-container{height:100%;width:100%}

/* ── list view ── */
.ms-list{display:none;overflow-y:auto;height:100%;padding:8px 12px;scrollbar-width:thin;scrollbar-color:#ccc transparent}
.ms-list.active{display:block}
.ms-list-item{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;border:1px solid transparent;margin-bottom:4px;transition:all .12s}
.ms-list-item:hover{background:#eaf1f8;border-color:#d4e3f2}
.ms-list-item.on{background:#eef5fc;border-color:#bcd6ee;box-shadow:inset 3px 0 0 #0f6ab4}
.ms-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;border:2px solid #fff;box-shadow:0 0 0 1px rgba(0,0,0,.12)}
.ms-list-item-body{min-width:0;flex:1}
.ms-list-item-name{font-weight:700;font-size:13.5px;color:#1a1a1a;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ms-list-item-meta{font-size:11px;color:#888;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ms-list-item-badges{display:flex;flex-wrap:wrap;gap:4px;margin-top:4px}
.ms-badge{font-size:9.5px;font-weight:700;padding:2px 6px;border-radius:6px;white-space:nowrap}
.ms-badge.both{background:#e8f5e9;color:#2e7d32}
.ms-badge.walker{background:#fff8e1;color:#b26a00}
.ms-badge.nl{background:#f5f5f5;color:#888}
.ms-badge.icon{background:#ede7f6;color:#6a1b9a}
.ms-badge.free{background:#e3f2fd;color:#1565c0}
.ms-badge.student{background:#f3e5f5;color:#7b1fa2}
.ms-badge.closed{background:#ffebee;color:#b71c1c}

/* ── table view ── */
.ms-tablewrap{display:none;overflow:auto;height:100%;min-height:0}
.ms-tablewrap.active{display:block}
.ms-table{width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;min-width:860px}
.ms-table th{position:sticky;top:0;background:#f2f2f2;color:#333;font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.03em;padding:9px 10px;border-bottom:1px solid #ddd;text-align:left;white-space:nowrap;cursor:pointer;user-select:none}
.ms-table th:hover{background:#e9e9e9}
.ms-table th .ms-arrow{opacity:.4;margin-left:3px}
.ms-table th.sorted .ms-arrow{opacity:1}
.ms-table td{padding:8px 10px;border-bottom:1px solid #eee;vertical-align:top}
.ms-table tr:hover td{background:#f4f8fd}
.ms-table .ms-mname{font-weight:700;color:#1a1a1a}
.ms-table .ms-cell-sub{font-size:10.5px;color:#999;text-transform:uppercase;letter-spacing:.02em}
.ms-table .ms-yes{color:#2e7d32;font-weight:700}
.ms-table .ms-no{color:#b3382c;font-weight:700}
.ms-table .ms-free{color:#1565c0;font-weight:700}
.ms-table .ms-maybe{color:#8a6d00;font-weight:600}
.ms-table .ms-card{border-radius:6px;font-weight:700;padding:2px 7px;font-size:11px}
.ms-table .ms-card.both{background:#e8f5e9;color:#2e7d32}
.ms-table .ms-card.walker{background:#fff8e1;color:#b26a00}
.ms-table .ms-card.free{background:#e3f2fd;color:#1565c0}
.ms-table .ms-card.nl{background:#f5f5f5;color:#888}
.ms-table tr.ms-click{cursor:pointer}

/* ── detail panel ── */
.ms-detail{position:relative;background:#fff;display:none;width:360px;max-width:360px;flex-shrink:0;align-self:stretch;max-height:100%;overflow-y:auto;border-left:1px solid #e0e0e0}
.ms-detail.open{display:block}
@media(max-width:899px){.ms-detail{position:fixed;bottom:0;left:0;right:0;width:auto;max-width:none;display:block;max-height:62vh;background:#fff;border-top:1px solid #e0e0e0;border-left:none;box-shadow:0 -4px 20px rgba(0,0,0,.12);border-radius:16px 16px 0 0;transform:translateY(100%);transition:transform .25s ease;z-index:1000;overflow-y:auto}
.ms-detail.open{transform:translateY(0)}}
@media(min-width:900px){
.ms-content{display:flex;flex-direction:row}
.ms-map{position:static;flex:1 1 auto;min-width:0;width:auto}
.ms-list.active,.ms-tablewrap.active{flex:1 1 auto;min-width:0}
.ms-detail-handle{display:none}
}
.ms-detail-handle{width:36px;height:4px;background:#ddd;border-radius:2px;margin:10px auto 0;cursor:pointer}
.ms-detail-inner{padding:14px 20px 20px}
.ms-detail h3{margin:0 0 2px;font-size:17px;font-weight:800}
.ms-detail-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px}
.ms-detail .ms-hours{font-size:13px;color:#333;margin:0 0 8px}
.ms-detail .ms-note{font-size:12px;color:#555;background:#f7f7f7;border-radius:8px;padding:8px 10px;margin:0 0 8px;line-height:1.45}
.ms-detail .ms-details-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12.5px;margin:0 0 10px}
.ms-detail .ms-cell{background:#f7f7f7;border-radius:8px;padding:8px 10px}
.ms-detail .ms-cell b{display:block;font-size:10px;text-transform:uppercase;letter-spacing:.03em;color:#999;margin-bottom:3px;font-weight:700}
.ms-detail-close{position:absolute;top:10px;right:14px;width:28px;height:28px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;display:grid;place-items:center;font-size:14px;color:#888}

/* ── legend ── */
.ms-legend{position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border:1px solid #e0e0e0;border-radius:8px;padding:8px 12px;font-size:11px;color:#666;z-index:999;display:flex;flex-wrap:wrap;gap:8px}
.ms-legend span{display:flex;align-items:center;gap:4px}

/* popups */
.ms-map .leaflet-popup-content{font-family:inherit;font-size:13px;line-height:1.4;margin:8px 12px}
.ms-map .leaflet-popup-content strong{display:block;font-size:14px;margin-bottom:1px}
.ms-map .leaflet-popup-content a{color:#0f6ab4;font-weight:600;text-decoration:none;cursor:pointer}
.ms-pin{background:transparent;border:none}
.ms-pin svg{display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))}
</style>

<div class="ms-app">
<div class="ms-bar">
  <h2 id="msTitle">NYC &amp; Bay Area Museums — Free Pass Guide</h2>
  <p class="ms-sub" id="msSub">NYC (~2h radius) + Bay Area. Filter by metro, region, and pass type. Tap a pin or row for hours, admission, and student/reciprocity details.</p>
  <div class="ms-toolbar">
    <button class="ms-loc-btn" id="msLoc">📍 Near me</button>
    <div class="ms-count" id="msCount"></div>
    <div class="ms-view-toggle">
      <button class="ms-view-btn on" data-view="map" id="msViewMap">🗺️ Map</button>
      <button class="ms-view-btn" data-view="list" id="msViewList">📋 List</button>
      <button class="ms-view-btn" data-view="table" id="msViewTable">📊 Table</button>
    </div>
  </div>
  <div class="ms-tip" id="msTip"></div>
  <div class="ms-filter-label">Metro</div>
  <div class="ms-chips" id="msMetroChips"></div>
  <div class="ms-filter-label">Region</div>
  <div class="ms-chips" id="msRegionChips"></div>
  <div class="ms-filter-label">Access</div>
  <div class="ms-chips" id="msAccessChips"></div>
</div>

<div class="ms-content">
  <div class="ms-detail" id="msDetail">
    <div class="ms-detail-handle" id="msDetailClose"></div>
    <button class="ms-detail-close" id="msDetailX">&times;</button>
    <div class="ms-detail-inner" id="msDetailInner"></div>
  </div>
  <div id="msMap" class="ms-map active"></div>
  <div class="ms-list" id="msList"></div>
  <div class="ms-tablewrap" id="msTableWrap">
    <table class="ms-table" id="msTable"><thead><tr></tr></thead><tbody></tbody></table>
  </div>
  <div class="ms-legend" id="msLegend"></div>
</div>
</div>

<p style="max-width:900px;margin:16px auto 0;padding:0 20px;font-size:12.5px;color:#888">
  Walker Travelers includes NARM/ROAM/MARP/Mod/Co (1,200+ museums). FAMSF Contributor NARM covers ~25 NYC NARM museums including Frick. ICOM at museum discretion; student ID benefits vary. Hours and reciprocity compiled Aug 2026 — verify before you go. NYC 2-hr radius includes Manhattan, outer boroughs, Hudson Valley, Long Island, Connecticut, and NJ/Philly edge (Princeton/Philadelphia ~1.5hr).
</p>

<details style="max-width:900px;margin:18px auto 0;padding:12px 16px;background:#f7f7f7;border-radius:10px;font-size:12.5px;color:#444;line-height:1.5">
<summary style="cursor:pointer;font-weight:800;color:#1a1a1a">Reciprocity &amp; student ID cheat sheet (NYC &amp; Bay Area)</summary>
<div style="margin-top:10px">
<p style="margin:0 0 8px"><b>Best single card for NYC:</b> Walker Travelers $125 — free at Guggenheim + Brooklyn (MARP), Frick (ROAM/NARM), New Museum/Dia Beacon/American Folk Art/Noguchi (Mod/Co/NARM). FAMSF Contributor $399 works at Frick + ~25 NARM museums but not Guggenheim/Brooklyn.</p>
<ul style="margin:0 0 8px;padding-left:18px">
<li><b>NARM (~1,560 museums):</b> Frick, Noguchi, MAD, El Museo, Asia Society, Studio Museum, Drawing Center, New-York Historical Society, MCNY, Poster House, Merchant's House, Queens Museum, Heckscher, Nassau, Parrish, Neuberger, Dia Beacon, Aldrich, Wadsworth Atheneum, Bruce, Newark Museum, Montclair, Grounds For Sculpture, PAFA — cheapest NARM via small museum $60–75 works citywide.</li>
<li><b>MARP/Mod/Co:</b> Guggenheim + Brooklyn (MARP); New Museum, Dia, Noguchi, American Folk Art (Mod/Co); Frick via ROAM.</li>
<li><b>ICOM (if eligible):</b> covers Met/MoMA/Whitney/Guggenheim/Frick (2 tickets, call ahead) — not for general public.</li>
</ul>
<p style="margin:0 0 8px"><b>Student ID — any university:</b> Met $17 (NY/NJ/CT students pay-what-you-wish → $0.01), MoMA $17, Whitney $24 but <b>free every day if 25 &amp; under</b>, Guggenheim $19 (pay-what-you-wish Mon/Sat 6–8pm), Frick $17 (free 10–18). <b>Partner IDs beat discounts:</b> NYU/Columbia/CUNY/Pratt/SVA IDs are free at Whitney, Frick, Brooklyn Museum, New Museum, Cooper Hewitt, MoMA — bring that ID first. MoMA PS1, Bronx Museum, Yale, Princeton, Loeb, Hessel, Neuberger, ICA Philadelphia, Zimmerli are free always.</p>
<p style="margin:0"><b>Free windows (no card):</b> Met &amp; AMNH pay-what-you-wish (NY residents / NY/NJ/CT students), MoMA UNIQLO free first Fri 4–8pm for NYC residents, PS1 free always, Whitney Fri 5–10pm + 2nd Sunday + ground floor free, Frick Wed 1:30–5:30 pay-what-you-wish, Morgan Fri 5–7pm free, Brooklyn Museum pay-what-you-can at desk + First Sat free, Guggenheim Mon/Sat 6–8pm PWYW, Cooper Hewitt daily 5–6pm PWYW.</p>
</div>
</details>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var REGION_COLOR = {
    "SF": "#0f6ab4",
    "East Bay": "#2e7d32",
    "South Bay": "#b26a00",
    "North Bay": "#6a1b9a",
    "Santa Cruz": "#d84315",
    "Manhattan": "#0f6ab4",
    "Brooklyn/Queens": "#2e7d32",
    "Bronx/SI": "#d84315",
    "Hudson Valley": "#6a1b9a",
    "Long Island": "#00695c",
    "Connecticut": "#e65100",
    "New Jersey / Philly": "#1565c0"
  };
  var METRO_CENTER = {
    "NYC": {lat:40.75, lng:-73.95, zoom:9},
    "Bay Area": {lat:37.6, lng:-122.1, zoom:8},
    "All": {lat:39.2, lng:-98, zoom:4}
  };

  var METRO_TIPS = {
    "NYC": "<b>NYC trip Aug 27–28, 2026:</b> Most Manhattan museums open Thu–Fri 10am–6pm. Met &amp; Cloisters closed Wed only — open Thu–Fri. Neue Galerie closed for summer hiatus (reopens Nov 12), Rubin physical galleries closed (traveling model). Free windows: MoMA PS1 &amp; Bronx Museum free always, Whitney free 25 &amp; under + Fri 5–10pm, Frick pay-what-you-wish Wed 1:30–5:30, Met &amp; AMNH pay-what-you-wish for NY/NJ/CT students &amp; NY residents. — Verify hours before you go.",
    "Bay Area": "<b>Bay Area pass tips:</b> First Tuesday free at de Young, Legion of Honor, and Asian Art Museum. SFMOMA offers free admission for 18 &amp; under plus Free Family Days. Stanford Cantor Arts Center &amp; Anderson Collection, Triton Museum, and BAMPFA (students/18 &amp; under) are free always. NARM/Walker gets you into 40+ Bay Area museums.",
    "All": "<b>Guide overview:</b> 149 curated institutions across the Greater New York City area (~2h radius) and San Francisco Bay Area. Filter by metro, sub-region, or pass type (Walker/NARM, ICOM, Student, Free). Tap any pin or row for hours, admission, and reciprocity details."
  };

  var METRO_SUBTITLES = {
    "NYC": "NYC (~2h radius including outer boroughs, Hudson Valley, Long Island, CT, NJ/Philly). Filter by region and pass type.",
    "Bay Area": "San Francisco, East Bay, South Bay, North Bay, and Santa Cruz. Filter by region and pass type.",
    "All": "San Francisco Bay Area + Greater NYC (~2h radius). Filter by metro, region, and pass type."
  };

  var MUSEUMS = [
    // ── Bay Area (70) ──
    {key:'sfmoma', name:'SFMOMA', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78592, lng:-122.40074, hours:'Mon–Tue 10–5; Wed closed; Thu 12–8; Fri–Sun 10–5', walker:'yes', icom:'yes', card:'both', student:'discount', admission:'$30 adults; $22 seniors; free 18 & under', addr:'151 3rd St, San Francisco, CA 94103'},
    {key:'deyoung', name:'de Young Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.77150, lng:-122.46909, hours:'Closed Mon; Tue–Sun 9:30–5:15; free 1st Tue', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$22 adults; discounts seniors/students; free <18', addr:'50 Hagiwara Tea Garden Dr, San Francisco, CA 94118'},
    {key:'legion', name:'Legion of Honor', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78456, lng:-122.50096, hours:'Closed Mon; Tue–Sun 9:30–5:15; free 1st Tue', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$22 adults; same-day de Young included', addr:'100 34th Ave, San Francisco, CA 94121'},
    {key:'asianart', name:'Asian Art Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78031, lng:-122.41599, hours:'Tue–Wed closed; Thu 1–8; Fri–Mon 10–5; free 1st Sun', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$22 adults; $17 students/seniors', addr:'200 Larkin St, San Francisco, CA 94102'},
    {key:'disneyfm', name:'Walt Disney Family Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.80136, lng:-122.45872, hours:'Mon 10–5:30 (summer); Tue–Wed closed; Thu–Sun 10–5:30', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$25 adults, $20 students/seniors', addr:'104 Montgomery St, San Francisco, CA 94129'},
    {key:'cjm', name:'Contemporary Jewish Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78604, lng:-122.40367, hours:'Closed Mon–Wed; Thu–Sun 11–5', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$18 adults, $14 students/seniors', addr:'736 Mission St, San Francisco, CA 94103'},
    {key:'mcd', name:'Museum of Craft & Design', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.75693, lng:-122.38796, hours:'Closed Mon–Wed; Thu–Sun 12–5; pay-what-you-wish Wed', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$12 adults, $10 students/seniors, free <12', addr:'2569 3rd St, San Francisco, CA 94107'},
    {key:'moad', name:'MoAD', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78647, lng:-122.40147, hours:'Closed Mon–Tue; Wed–Sat 11–6; Sun 12–5; free 2nd Sat', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$12 adults, $6 students/seniors', addr:'685 Mission St, San Francisco, CA 94105'},
    {key:'cartoon', name:'Cartoon Art Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.80638, lng:-122.42179, hours:'Closed Mon; Tue–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$10 adults, $7 students/seniors', addr:'781 Beach St, San Francisco, CA 94109'},
    {key:'ybca', name:'Yerba Buena Center for the Arts', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78623, lng:-122.40219, hours:'Thu–Sun 11–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free / donation', addr:'701 Mission St, San Francisco, CA 94103'},
    {key:'glbt', name:'GLBT Historical Society', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.76077, lng:-122.43561, hours:'Tue–Sat 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $6 students', addr:'4127 18th St, San Francisco, CA 94114'},
    {key:'chsa', name:'Chinese Historical Society', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.79374, lng:-122.40882, hours:'Thu–Sun 11–4', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$8 adults, $5 students', addr:'965 Clay St, San Francisco, CA 94108'},
    {key:'chineseculture', name:'Chinese Culture Center', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.79514, lng:-122.40431, hours:'Tue–Sat 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'750 Kearny St, San Francisco, CA 94108'},
    {key:'letterform', name:'Letterform Archive', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.77540, lng:-122.40997, hours:'Thu–Sat 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $5 students', addr:'1188 Folsom St, San Francisco, CA 94103'},
    {key:'tenderloin', name:'Tenderloin Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78392, lng:-122.41412, hours:'Tue–Sat 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $6 students', addr:'398 Eddy St, San Francisco, CA 94102'},
    {key:'haas', name:'Haas-Lilienthal House', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.79328, lng:-122.42499, hours:'Wed–Sat 12–3', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$15 adults, $12 students', addr:'2007 Franklin St, San Francisco, CA 94109'},
    {key:'museoit', name:'Museo Italo Americano', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.80697, lng:-122.43142, hours:'Thu–Sun 12–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Fort Mason)', addr:'2 Marina Blvd, Bldg C, San Francisco, CA 94123'},
    {key:'sfwa', name:'San Francisco Women Artists Gallery', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.76388, lng:-122.46500, hours:'Tue–Sat 11–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'647 Irving St, San Francisco, CA 94122'},
    {key:'grayarea', name:'Gray Area', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.75444, lng:-122.41826, hours:'Thu–Sat 12–6', walker:'free', icom:'free', card:'free', student:'free', admission:'Free gallery admission', addr:'2665 Mission St, San Francisco, CA 94110'},
    {key:'pampanito', name:'USS Pampanito', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.80999, lng:-122.41644, hours:'Daily 10–5:30', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$22 adults, $15 students', addr:'Pier 45, Fisherman’s Wharf, San Francisco, CA 94133'},
    {key:'rootdivision', name:'Root Division', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.77844, lng:-122.41145, hours:'Wed–Sat 2–6', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1131 Mission St, San Francisco, CA 94103'},
    {key:'sfhs', name:'San Francisco Historical Society', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78274, lng:-122.40727, hours:'Wed–Sun 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Old Mint)', addr:'88 5th St, San Francisco, CA 94103'},
    {key:'icasf', name:'Institute of Contemporary Art SF', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.78157, lng:-122.39848, hours:'Thu–Sun 12–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'725 Harrison St, San Francisco, CA 94107'},
    {key:'explo', name:'Exploratorium', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.80090, lng:-122.39853, hours:'Closed Mon; Tue–Sat 10–5; Sun 12–5', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$45 adults, $35 students/youth', addr:'Pier 15, The Embarcadero, San Francisco, CA 94111'},
    {key:'cas', name:'California Academy of Sciences', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.76983, lng:-122.46609, hours:'Mon–Sat 9:30–5; Sun 11–5', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$42–47 adults, $34–38 students/youth', addr:'55 Music Concourse Dr, San Francisco, CA 94118'},
    {key:'cablecar', name:'Cable Car Museum', city:'San Francisco', region:'SF', metro:'Bay Area', lat:37.79476, lng:-122.41185, hours:'Closed Mon; Tue–Thu 10–4; Fri–Sun 10–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1201 Mason St, San Francisco, CA 94108'},
    {key:'omca', name:'Oakland Museum of California', city:'Oakland', region:'East Bay', metro:'Bay Area', lat:37.79860, lng:-122.26360, hours:'Wed–Sun 11–5; Fri until 9', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$22 adults; $17 students; free 1st Sun', addr:'1000 Oak St, Oakland, CA 94607'},
    {key:'chabot', name:'Chabot Space & Science Center', city:'Oakland', region:'East Bay', metro:'Bay Area', lat:37.81850, lng:-122.18070, hours:'Wed–Sun 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$28 adults, $23 students/youth', addr:'10000 Skyline Blvd, Oakland, CA 94619'},
    {key:'camron', name:'Camron-Stanford House', city:'Oakland', region:'East Bay', metro:'Bay Area', lat:37.80150, lng:-122.26220, hours:'Sat–Sun 11–4', walker:'yes', icom:'no', card:'walker', student:'free', admission:'$5 adults; free students/members', addr:'1418 Lakeside Dr, Oakland, CA 94612'},
    {key:'juniorcenter', name:'Junior Center of Art & Science', city:'Oakland', region:'East Bay', metro:'Bay Area', lat:37.80750, lng:-122.25560, hours:'Tue–Sat 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free / donation', addr:'558 Bellevue Ave, Oakland, CA 94610'},
    {key:'hornet', name:'USS Hornet Museum', city:'Alameda', region:'East Bay', metro:'Bay Area', lat:37.77270, lng:-122.30290, hours:'Daily 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$25 adults, $20 students', addr:'707 W Hornet Ave, Alameda, CA 94501'},
    {key:'bampfa', name:'UC Berkeley Art Museum (BAMPFA)', city:'Berkeley', region:'East Bay', metro:'Bay Area', lat:37.87100, lng:-122.26640, hours:'Wed–Sun 11–7', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$14 adults; free 18 & under & UC Berkeley students', addr:'2155 Centre St, Berkeley, CA 94720'},
    {key:'ucbg', name:'UC Botanical Garden at Berkeley', city:'Berkeley', region:'East Bay', metro:'Bay Area', lat:37.87480, lng:-122.23840, hours:'Daily 9–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$12 adults, $7 students', addr:'200 Centennial Dr, Berkeley, CA 94720'},
    {key:'berkeleyac', name:'Berkeley Art Center', city:'Berkeley', region:'East Bay', metro:'Bay Area', lat:37.88420, lng:-122.26860, hours:'Wed–Sun 12–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Live Oak Park)', addr:'1275 Walnut St, Berkeley, CA 94709'},
    {key:'kala', name:'Kala Art Institute', city:'Berkeley', region:'East Bay', metro:'Bay Area', lat:37.85299, lng:-122.28723, hours:'Tue–Sat 12–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'2990 San Pablo Ave, Berkeley, CA 94702'},
    {key:'dougadams', name:'Doug Adams Gallery', city:'Berkeley', region:'East Bay', metro:'Bay Area', lat:37.87554, lng:-122.26187, hours:'Tue–Thu 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (GTU)', addr:'2400 Ridge Rd, Berkeley, CA 94709'},
    {key:'richmondac', name:'Richmond Art Center', city:'Richmond', region:'East Bay', metro:'Bay Area', lat:37.93739, lng:-122.34411, hours:'Tue–Sat 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'2540 Barrett Ave, Richmond, CA 94804'},
    {key:'niad', name:'NIAD Art Center', city:'Richmond', region:'East Bay', metro:'Bay Area', lat:37.93920, lng:-122.34760, hours:'Mon–Fri 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'551 23rd St, Richmond, CA 94804'},
    {key:'blackhawk', name:'Blackhawk Museum', city:'Danville', region:'East Bay', metro:'Bay Area', lat:37.80130, lng:-121.91760, hours:'Fri–Sun 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$15 adults, $10 students', addr:'3700 Blackhawk Plaza Cir, Danville, CA 94506'},
    {key:'bancroft', name:'Ruth Bancroft Garden', city:'Walnut Creek', region:'East Bay', metro:'Bay Area', lat:37.92350, lng:-122.03650, hours:'Tue–Sun 9–4', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$12 adults, $8 students', addr:'1552 Bancroft Rd, Walnut Creek, CA 94598'},
    {key:'lindsay', name:'Lindsay Wildlife Experience', city:'Walnut Creek', region:'East Bay', metro:'Bay Area', lat:37.92340, lng:-122.07570, hours:'Wed–Sun 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$17 adults, $15 students/youth', addr:'1931 1st Ave, Walnut Creek, CA 94597'},
    {key:'stmarys', name:'Saint Mary’s College Museum of Art', city:'Moraga', region:'East Bay', metro:'Bay Area', lat:37.84140, lng:-122.10920, hours:'Wed–Sun 11–4:30', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1928 St Marys Rd, Moraga, CA 94575'},
    {key:'sjmuseum', name:'San Jose Museum of Art', city:'San Jose', region:'South Bay', metro:'Bay Area', lat:37.33370, lng:-121.89000, hours:'Tue–Thu 11–6; Fri 11–9; Sat–Sun 11–6', walker:'yes', icom:'unknown', card:'walker', student:'free', admission:'$10 adults; free students/youth', addr:'45 W San Fernando St, San Jose, CA 95113'},
    {key:'sjquilts', name:'San Jose Museum of Quilts & Textiles', city:'San Jose', region:'South Bay', metro:'Bay Area', lat:37.32820, lng:-121.88420, hours:'Tue–Sun 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $8 students', addr:'520 S 1st St, San Jose, CA 95113'},
    {key:'sjica', name:'San Jose Institute of Contemporary Art', city:'San Jose', region:'South Bay', metro:'Bay Area', lat:37.32780, lng:-121.88390, hours:'Thu–Sun 12–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'560 S 1st St, San Jose, CA 95113'},
    {key:'cham', name:'Chinese American Historical Museum', city:'San Jose', region:'South Bay', metro:'Bay Area', lat:37.32950, lng:-121.90100, hours:'Sat–Sun 11–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (History Park)', addr:'80 S Montgomery St, San Jose, CA 95110'},
    {key:'paloaltphm', name:'Palo Alto History Museum', city:'Palo Alto', region:'South Bay', metro:'Bay Area', lat:37.44601, lng:-122.15927, hours:'Wed–Sun 10–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'380 Hamilton Ave, Palo Alto, CA 94301'},
    {key:'paloaltac', name:'Palo Alto Art Center', city:'Palo Alto', region:'South Bay', metro:'Bay Area', lat:37.44400, lng:-122.13900, hours:'Tue–Sat 10–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1313 Newell Rd, Palo Alto, CA 94303'},
    {key:'cantor', name:'Cantor Arts Center (Stanford)', city:'Stanford', region:'South Bay', metro:'Bay Area', lat:37.43300, lng:-122.17090, hours:'Wed–Sun 11–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Rodin sculpture garden)', addr:'328 Lomita Dr, Stanford, CA 94305'},
    {key:'anderson', name:'Anderson Collection (Stanford)', city:'Stanford', region:'South Bay', metro:'Bay Area', lat:37.43380, lng:-122.17080, hours:'Wed–Sun 11–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'314 Lomita Dr, Stanford, CA 94305'},
    {key:'curi', name:'CuriOdyssey', city:'San Mateo', region:'South Bay', metro:'Bay Area', lat:37.59060, lng:-122.31970, hours:'Tue–Sun 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$22 adults, $17 students/children', addr:'1651 Coyote Point Dr, San Mateo, CA 94401'},
    {key:'smchm', name:'San Mateo County History Museum', city:'Redwood City', region:'South Bay', metro:'Bay Area', lat:37.48700, lng:-122.22970, hours:'Tue–Sun 10–4', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$6 adults, $4 students/seniors', addr:'2200 Broadway, Redwood City, CA 94063'},
    {key:'losaltos', name:'Los Altos History Museum', city:'Los Altos', region:'South Bay', metro:'Bay Area', lat:37.38090, lng:-122.11200, hours:'Thu–Sun 10–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'51 S San Antonio Rd, Los Altos, CA 94022'},
    {key:'numlg', name:'New Museum Los Gatos', city:'Los Gatos', region:'South Bay', metro:'Bay Area', lat:37.22050, lng:-121.97910, hours:'Thu–Sun 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $6 students', addr:'106 E Main St, Los Gatos, CA 95030'},
    {key:'campbell', name:'Campbell Museums', city:'Campbell', region:'South Bay', metro:'Bay Area', lat:37.28770, lng:-121.94390, hours:'Tue–Sun 12–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'51 N Central Ave, Campbell, CA 95008'},
    {key:'sunnyhp', name:'Sunnyvale Heritage Park', city:'Sunnyvale', region:'South Bay', metro:'Bay Area', lat:37.35650, lng:-122.02550, hours:'Tue, Thu, Sun 12–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'550 E Remington Dr, Sunnyvale, CA 94087'},
    {key:'triton', name:'Triton Museum of Art', city:'Santa Clara', region:'South Bay', metro:'Bay Area', lat:37.35620, lng:-121.95510, hours:'Tue–Sun 11–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1505 Warburton Ave, Santa Clara, CA 95050'},
    {key:'desaisset', name:'de Saisset Museum', city:'Santa Clara', region:'South Bay', metro:'Bay Area', lat:37.34990, lng:-121.94070, hours:'Tue–Sun 11–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Santa Clara Univ)', addr:'500 El Camino Real, Santa Clara, CA 95053'},
    {key:'schulz', name:'Charles M. Schulz Museum', city:'Santa Rosa', region:'North Bay', metro:'Bay Area', lat:38.46035, lng:-122.73583, hours:'Daily 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$15 adults, $10 students', addr:'2301 Hardies Ln, Santa Rosa, CA 95403'},
    {key:'dirosa', name:'di Rosa Center for Contemporary Art', city:'Napa', region:'North Bay', metro:'Bay Area', lat:38.25700, lng:-122.35172, hours:'Thu–Sun 10–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$22 adults, $15 students', addr:'5200 Carneros Hwy, Napa, CA 94559'},
    {key:'sonomava', name:'Sonoma Valley Museum of Art', city:'Sonoma', region:'North Bay', metro:'Bay Area', lat:38.29098, lng:-122.45846, hours:'Wed–Sun 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $7 students, free <18', addr:'551 Broadway, Sonoma, CA 95476'},
    {key:'sonomacount', name:'Museums of Sonoma County', city:'Santa Rosa', region:'North Bay', metro:'Bay Area', lat:38.44185, lng:-122.71837, hours:'Tue–Sun 11–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $7 students', addr:'425 7th St, Santa Rosa, CA 95401'},
    {key:'healdsburg', name:'Healdsburg Museum', city:'Healdsburg', region:'North Bay', metro:'Bay Area', lat:38.61118, lng:-122.86722, hours:'Wed–Sun 11–4', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'221 Matheson St, Healdsburg, CA 95448'},
    {key:'mailami', name:'Museum of the American Indian', city:'Novato', region:'North Bay', metro:'Bay Area', lat:38.11525, lng:-122.60313, hours:'Tue–Sun 12:30–4:30', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'2200 Novato Blvd, Novato, CA 94947'},
    {key:'marinh', name:'Marin History Museum', city:'San Rafael', region:'North Bay', metro:'Bay Area', lat:37.97462, lng:-122.52915, hours:'Wed–Sun 12–4', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $5 students', addr:'1125 B St, San Rafael, CA 94901'},
    {key:'sausalito', name:'Sausalito Center for the Arts', city:'Sausalito', region:'North Bay', metro:'Bay Area', lat:37.85691, lng:-122.47982, hours:'Tue–Sun 11–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'750 Bridgeway, Sausalito, CA 94965'},
    {key:'scmah', name:'Santa Cruz Museum of Art & History', city:'Santa Cruz', region:'Santa Cruz', metro:'Bay Area', lat:36.97448, lng:-122.02537, hours:'Thu–Sun 12–6', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$12 adults, $7 students', addr:'705 Front St, Santa Cruz, CA 95060'},
    {key:'ucsarb', name:'UC Santa Cruz Arboretum', city:'Santa Cruz', region:'Santa Cruz', metro:'Bay Area', lat:36.98271, lng:-122.06142, hours:'Daily 9–5', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$10 adults, $5 students', addr:'1156 High St, Santa Cruz, CA 95064'},
    {key:'scal', name:'Santa Cruz Art League', city:'Santa Cruz', region:'Santa Cruz', metro:'Bay Area', lat:36.97331, lng:-122.01710, hours:'Thu–Sun 12–5', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'526 Broadway, Santa Cruz, CA 95060'},
    {key:'seymour', name:'Seymour Marine Discovery Center', city:'Santa Cruz', region:'Santa Cruz', metro:'Bay Area', lat:36.94916, lng:-122.06487, hours:'Thu–Sun 10–4', walker:'yes', icom:'no', card:'walker', student:'discount', admission:'$12 adults, $9 students', addr:'100 McAllister Way, Santa Cruz, CA 95060'},

    // ── NYC — Manhattan (31) ──
    {key:'met-fifth-ave', name:'The Metropolitan Museum of Art', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7794, lng:-73.9632, hours:'Sun–Tue & Thu 10–5, Fri–Sat 10–9, Wed closed — OPEN Thu–Fri', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $22 seniors, $17 students; NY residents & NY/NJ/CT students pay-what-you-wish at desk; free <12', addr:'1000 5th Ave, New York, NY 10028'},
    {key:'met-cloisters', name:'The Met Cloisters', city:'New York', region:'Manhattan', metro:'NYC', lat:40.8649, lng:-73.9317, hours:'Thu–Tue 10–5, Wed closed — OPEN Thu–Fri', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $17 students; same-day Met ticket included; NY/NJ/CT students pay-what-you-wish', addr:'99 Margaret Corbin Dr, New York, NY 10040'},
    {key:'moma', name:'Museum of Modern Art (MoMA)', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7614, lng:-73.9776, hours:'Daily 10:30–5:30, Fri to 8:30 — OPEN Thu–Fri; UNIQLO free 1st Fri monthly 4–8pm for NYC residents', walker:'yes', icom:'no', card:'both', student:'discount', admission:'$30 adults, $22 seniors, $17 students, free <16', addr:'11 W 53rd St, New York, NY 10019'},
    {key:'whitney', name:'Whitney Museum of American Art', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7396, lng:-74.0089, hours:'Mon & Wed–Sun 10:30–6, Fri to 10, Tue closed — OPEN Thu–Fri', walker:'yes', icom:'yes', card:'both', student:'free', admission:'$30 adults, $24 students/seniors; FREE 25 & under always; free Fri 5–10pm & 2nd Sun', addr:'99 Gansevoort St, New York, NY 10014'},
    {key:'guggenheim', name:'Solomon R. Guggenheim Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7829, lng:-73.9589, hours:'Daily 10:30–5:30, Mon & Sat to 8 — OPEN Thu–Fri; pay-what-you-wish Mon & Sat 6–8pm', walker:'yes', icom:'likely', card:'both', student:'discount', admission:'$30 adults, $19 students/seniors, free <12', addr:'1071 5th Ave, New York, NY 10128'},
    {key:'frick', name:'The Frick Collection', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7714, lng:-73.9672, hours:'Wed–Mon 10:30–5:30, Tue closed — OPEN Thu–Fri; pay-what-you-wish Wed 1:30–5:30', walker:'yes', icom:'likely', card:'both', student:'discount', admission:'$30 adults, $22 seniors, $17 students, free 10–18 (under 10 not admitted)', addr:'1 E 70th St, New York, NY 10021'},
    {key:'amnh', name:'American Museum of Natural History', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7813, lng:-73.9740, hours:'Daily 10–5:30 — OPEN Thu–Fri', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $24 students/seniors; NY/NJ/CT residents pay-what-you-wish at ticket counters; free <3', addr:'200 Central Park West, New York, NY 10024'},
    {key:'nyhs', name:'New-York Historical Society', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7794, lng:-73.9741, hours:'Tue–Thu 11–5, Fri 11–8, Sat–Sun 11–5 — OPEN Thu–Fri; pay-what-you-wish Fri 5–8pm', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$24 adults, $19 seniors/students, free <5', addr:'170 Central Park West, New York, NY 10024'},
    {key:'mcny', name:'Museum of the City of New York', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7925, lng:-73.9519, hours:'Mon, Thu, Fri 10–5, Sat–Sun 10–6, Tue–Wed closed — OPEN Thu–Fri', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'Suggested $23 adults, $18 seniors, $14 students, free <20', addr:'1220 5th Ave at 103rd St, New York, NY 10029'},
    {key:'neue-galerie', name:'Neue Galerie', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7812, lng:-73.9605, hours:'⚠️ CLOSED summer 2026 — reopens Nov 12, 2026; bookstore & café open Oct 1', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$28 adults, $15 students — CLOSED FOR RENOVATION', addr:'1048 5th Ave, New York, NY 10028'},
    {key:'jewish-museum', name:'The Jewish Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7854, lng:-73.9572, hours:'Wed–Sun 11–6, Thu to 8 — OPEN Thu–Fri; free Saturdays always', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$18 adults, $12 seniors, $10 students, free <18', addr:'1109 5th Ave at 92nd St, New York, NY 10128'},
    {key:'cooper-hewitt', name:'Cooper Hewitt, Smithsonian Design Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7846, lng:-73.9580, hours:'Daily 10–6 — OPEN Thu–Fri; pay-what-you-wish daily 5–6pm', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$20 adults, $14 seniors, $8 students, free <18', addr:'2 E 91st St, New York, NY 10128'},
    {key:'morgan-library', name:'The Morgan Library & Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7487, lng:-73.9815, hours:'Tue–Thu 10:30–5, Fri to 7, Sat–Sun 10:30–5, Mon closed — OPEN Thu–Fri; free Fri 5–7pm (RSVP required)', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$25 adults, $17 seniors, $13 students, free <12', addr:'225 Madison Ave at 36th St, New York, NY 10016'},
    {key:'asia-society', name:'Asia Society Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7694, lng:-73.9645, hours:'Tue–Sun 11–5 — OPEN Thu–Fri; free Fridays', walker:'yes', icom:'yes', card:'walker', student:'discount', admission:'$15 adults, $10 students, free <16', addr:'725 Park Ave at 70th St, New York, NY 10021'},
    {key:'new-museum', name:'New Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7223, lng:-73.9929, hours:'Tue–Sun 11–6, Thu to 9 — OPEN Thu–Fri; pay-what-you-wish Thu 7–9pm', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$25 adults, $18 seniors, $19 students, free <18', addr:'235 Bowery, New York, NY 10002'},
    {key:'studio-museum', name:'The Studio Museum in Harlem', city:'New York', region:'Manhattan', metro:'NYC', lat:40.8080, lng:-73.9484, hours:'Wed–Thu & Sun 11–6, Fri–Sat 11–9 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'Suggested $16 adults, $9 students, free <16', addr:'144 W 125th St, New York, NY 10027'},
    {key:'el-museo', name:'El Museo del Barrio', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7931, lng:-73.9515, hours:'Thu–Sun 11–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'Suggested $9 adults, $5 students, free <12', addr:'1230 5th Ave, New York, NY 10029'},
    {key:'folk-art', name:'American Folk Art Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7700, lng:-73.9837, hours:'Wed–Sun 11:30–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'2 Lincoln Square, Columbus Ave at 66th St, New York, NY 10023'},
    {key:'mad', name:'Museum of Arts and Design (MAD)', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7675, lng:-73.9819, hours:'Tue–Sun 10–6, Thu to 8 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$20 adults, $16 seniors, $14 students, free <18', addr:'2 Columbus Circle, New York, NY 10019'},
    {key:'icp', name:'International Center of Photography (ICP)', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7182, lng:-73.9888, hours:'Daily 10:30–6:30, Thu to 8 — OPEN Thu–Fri; $5 admission Thu 5–8pm', walker:'no', icom:'yes', card:'nl', paid:'yes', student:'discount', admission:'$18 adults, $14 seniors, $12 students, free <14', addr:'84 Ludlow St, New York, NY 10002'},
    {key:'drawing-center', name:'The Drawing Center', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7240, lng:-74.0044, hours:'Wed–Sun 12–6, Thu to 8 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'35 Wooster St, New York, NY 10013'},
    {key:'tenement-museum', name:'Tenement Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7188, lng:-73.9900, hours:'Daily 10–6 — OPEN Thu–Fri (guided apartment tours)', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $25 students/seniors (advance booking recommended)', addr:'103 Orchard St, New York, NY 10002'},
    {key:'intrepid-museum', name:'Intrepid Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7645, lng:-73.9996, hours:'Daily 10–5 — OPEN Thu–Fri; select Free Fridays 5–9pm', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$36 adults, $34 students/seniors, free <5', addr:'Pier 86, W 46th St & 12th Ave, New York, NY 10036'},
    {key:'merchants-house', name:'Merchant’s House Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7277, lng:-73.9924, hours:'Thu–Sun 1–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$15 adults, $10 students/seniors, free <12', addr:'29 E 4th St, New York, NY 10003'},
    {key:'poster-house', name:'Poster House', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7431, lng:-73.9924, hours:'Thu–Sun 10–6 — OPEN Thu–Fri; Free Fridays all day', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$12 adults, $8 students/seniors, free <18', addr:'119 W 23rd St, New York, NY 10011'},
    {key:'skyscraper-museum', name:'The Skyscraper Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7055, lng:-74.0173, hours:'Wed–Sat 12–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (reserve online)', addr:'39 Battery Pl, New York, NY 10280'},
    {key:'nmai-ny', name:'National Museum of the American Indian (Smithsonian)', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7041, lng:-74.0137, hours:'Daily 10–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Smithsonian at Bowling Green)', addr:'1 Bowling Green, New York, NY 10004'},
    {key:'japan-society', name:'Japan Society Gallery', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7529, lng:-73.9688, hours:'Thu–Sun 12–7 — OPEN Thu–Fri; free Fri 7–9pm during exhibitions', walker:'no', icom:'unknown', card:'nl', paid:'yes', student:'discount', admission:'$12 adults, $10 students/seniors, free <16', addr:'333 E 47th St, New York, NY 10017'},
    {key:'swiss-institute', name:'Swiss Institute', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7285, lng:-73.9880, hours:'Wed–Sun 12–6, Fri 12–8 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (contemporary non-profit space)', addr:'38 St Marks Pl, New York, NY 10003'},
    {key:'society-illustrators', name:'Society of Illustrators Museum', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7610, lng:-73.9710, hours:'Wed–Sat 11–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$18 adults, $12 students/seniors, free <10', addr:'128 E 63rd St, New York, NY 10065'},
    {key:'leslie-lohman', name:'Leslie-Lohman Museum of Art', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7223, lng:-74.0025, hours:'Wed–Sun 12–6, Thu to 8 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'free', admission:'Suggested $10 donation (pay-what-you-wish)', addr:'26 Wooster St, New York, NY 10013'},
    {key:'national-academy', name:'National Academy of Design', city:'New York', region:'Manhattan', metro:'NYC', lat:40.7521, lng:-74.0045, hours:'Tue–Sat 12–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always during exhibitions', addr:'519 W 26th St, 2nd Floor, New York, NY 10001'},

    // ── NYC — Brooklyn/Queens (9) ──
    {key:'brooklyn-museum', name:'Brooklyn Museum', city:'Brooklyn', region:'Brooklyn/Queens', metro:'NYC', lat:40.6712, lng:-73.9636, hours:'Wed–Sun 11–6 — OPEN Thu–Fri; free 1st Sat 5–11pm monthly', walker:'yes', icom:'likely', card:'both', student:'discount', admission:'Suggested $20 adults, $14 students, free 13–19 & <12', addr:'200 Eastern Pkwy, Brooklyn, NY 11238'},
    {key:'noguchi-museum', name:'The Noguchi Museum', city:'Long Island City', region:'Brooklyn/Queens', metro:'NYC', lat:40.7668, lng:-73.9381, hours:'Wed–Sun 11–6 — OPEN Thu–Fri; free first Fri monthly', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$16 adults, $6 students/seniors, free <12', addr:'9-01 33rd Rd, Long Island City, NY 11106'},
    {key:'moma-ps1', name:'MoMA PS1', city:'Long Island City', region:'Brooklyn/Queens', metro:'NYC', lat:40.7476, lng:-73.9472, hours:'Thu–Mon 12–6, Sat 10–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always through 2026–2028', addr:'22-25 Jackson Ave, Long Island City, NY 11101'},
    {key:'queens-museum', name:'Queens Museum', city:'Corona', region:'Brooklyn/Queens', metro:'NYC', lat:40.7459, lng:-73.8467, hours:'Wed–Fri 12–5, Sat–Sun 11–5 — OPEN Thu–Fri', walker:'yes', icom:'yes', card:'walker', student:'discount', admission:'Pay-what-you-wish suggested $8 adults, $6 students, free <12', addr:'Flushing Meadows Corona Park, Queens, NY 11368'},
    {key:'socrates-sculpture-park', name:'Socrates Sculpture Park', city:'Long Island City', region:'Brooklyn/Queens', metro:'NYC', lat:40.7681, lng:-73.9357, hours:'Daily 9–sunset — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (outdoor waterfront park)', addr:'32-01 Vernon Blvd, Long Island City, NY 11106'},
    {key:'moving-image', name:'Museum of the Moving Image', city:'Astoria', region:'Brooklyn/Queens', metro:'NYC', lat:40.7564, lng:-73.9238, hours:'Thu 2–6, Fri 2–8, Sat–Sun 11–6 — OPEN Thu–Fri; free Thu 2–6pm', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$20 adults, $15 students/seniors, free <3', addr:'36-01 35th Ave, Astoria, NY 11106'},
    {key:'sculpturecenter', name:'SculptureCenter', city:'Long Island City', region:'Brooklyn/Queens', metro:'NYC', lat:40.7465, lng:-73.9443, hours:'Thu–Mon 12–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (suggested $5)', addr:'44-19 Purves St, Long Island City, NY 11101'},
    {key:'transit-museum', name:'New York Transit Museum', city:'Brooklyn', region:'Brooklyn/Queens', metro:'NYC', lat:40.6906, lng:-73.9897, hours:'Thu–Sun 10–4 — OPEN Thu–Fri (vintage subway station)', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$10 adults, $5 children 2–17 & seniors, free <2', addr:'99 Schermerhorn St, Brooklyn, NY 11201'},
    {key:'brooklyn-botanic', name:'Brooklyn Botanic Garden', city:'Brooklyn', region:'Brooklyn/Queens', metro:'NYC', lat:40.6677, lng:-73.9634, hours:'Tue–Sun 10–6 — OPEN Thu–Fri; community pay-what-you-wish tiers', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$22 adults, $16 students/seniors, free <12', addr:'990 Washington Ave, Brooklyn, NY 11225'},

    // ── NYC — Bronx/SI (5) ──
    {key:'bronx-museum-of-the-arts', name:'Bronx Museum of the Arts', city:'Bronx', region:'Bronx/SI', metro:'NYC', lat:40.8314, lng:-73.9290, hours:'Wed–Sun 11–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1040 Grand Concourse at 165th St, Bronx, NY 10456'},
    {key:'wave-hill', name:'Wave Hill', city:'Riverdale', region:'Bronx/SI', metro:'NYC', lat:40.8995, lng:-73.9132, hours:'Tue–Sun 10–5:30 — OPEN Thu–Fri; Free admission Thursdays all day', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$10 adults, $6 students/seniors, free <6', addr:'4900 Independence Ave, Bronx, NY 10471'},
    {key:'staten-island-museum', name:'Staten Island Museum', city:'Staten Island', region:'Bronx/SI', metro:'NYC', lat:40.6438, lng:-74.1388, hours:'Wed–Sun 11–5 — OPEN Thu–Fri', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'Suggested $8 adults, $5 students/seniors, free <2', addr:'1000 Richmond Terrace, Bldg A, Staten Island, NY 10301'},
    {key:'alice-austen', name:'Alice Austen House', city:'Staten Island', region:'Bronx/SI', metro:'NYC', lat:40.6149, lng:-74.0631, hours:'Tue–Fri 12–5, Sat–Sun 11–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'Suggested $6 adults, $4 students, free <12', addr:'2 Hylan Blvd, Staten Island, NY 10305'},
    {key:'snug-harbor', name:'Snug Harbor & Newhouse Center', city:'Staten Island', region:'Bronx/SI', metro:'NYC', lat:40.6429, lng:-74.1017, hours:'Wed–Sun 10–5 — OPEN Thu–Fri', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'Grounds free; Newhouse Center galleries $5 adults, $4 students', addr:'1000 Richmond Terrace, Staten Island, NY 10301'},

    // ── NYC — Hudson Valley (8) ──
    {key:'dia-beacon', name:'Dia Beacon', city:'Beacon', region:'Hudson Valley', metro:'NYC', lat:41.5048, lng:-73.9830, hours:'Fri–Mon 10–5 (closed Thu) — OPEN Fri (great for day 2)', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$25 adults, $12 students/seniors, $5 children 5–11', addr:'3 Beekman St, Beacon, NY 12508'},
    {key:'storm-king', name:'Storm King Art Center', city:'New Windsor', region:'Hudson Valley', metro:'NYC', lat:41.4268, lng:-74.0608, hours:'Wed–Mon 10–6, Sat to 8 — OPEN Thu–Fri (500-acre outdoor sculpture park)', walker:'no', icom:'likely', card:'nl', paid:'yes', student:'discount', admission:'$25 adults, $15 students/youth, free <4', addr:'1 Museum Rd, New Windsor, NY 12553'},
    {key:'hudson-river-museum', name:'Hudson River Museum', city:'Yonkers', region:'Hudson Valley', metro:'NYC', lat:40.9634, lng:-73.8966, hours:'Wed–Fri 12–5, Sat–Sun 11–5 — OPEN Thu–Fri; free 1st Fri 5–8pm', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$13 adults, $9 students/seniors, $8 youth', addr:'511 Warburton Ave, Yonkers, NY 10701'},
    {key:'hessel-museum', name:'Hessel Museum of Art at CCS Bard', city:'Annandale-on-Hudson', region:'Hudson Valley', metro:'NYC', lat:42.0203, lng:-73.9142, hours:'Wed–Sun 11–5 — OPEN Thu–Fri (Apr–Dec)', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Bard College)', addr:'33 Garden Rd, Annandale-on-Hudson, NY 12504'},
    {key:'loeb-art-center', name:'Frances Lehman Loeb Art Center, Vassar', city:'Poughkeepsie', region:'Hudson Valley', metro:'NYC', lat:41.6850, lng:-73.8950, hours:'Tue–Sun 10–5, Thu to 7 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Vassar College)', addr:'124 Raymond Ave, Poughkeepsie, NY 12604'},
    {key:'magazzino-italian-art', name:'Magazzino Italian Art', city:'Cold Spring', region:'Hudson Valley', metro:'NYC', lat:41.4340, lng:-73.9640, hours:'Mon, Fri–Sun 11–6 (closed Thu) — OPEN Fri (plan Fri)', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$20 adults, $10 students/seniors, free <12', addr:'2700 Route 9, Cold Spring, NY 10516'},
    {key:'neuberger-museum', name:'Neuberger Museum of Art, SUNY Purchase', city:'Purchase', region:'Hudson Valley', metro:'NYC', lat:41.0470, lng:-73.7160, hours:'Wed–Sun 12–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'735 Anderson Hill Rd, Purchase, NY 10577'},
    {key:'katonah-museum', name:'Katonah Museum of Art', city:'Katonah', region:'Hudson Valley', metro:'NYC', lat:41.2583, lng:-73.6847, hours:'Tue–Sat 10–5, Sun 12–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$12 adults, $6 students/seniors, free <12', addr:'134 Jay St, Katonah, NY 10536'},

    // ── NYC — Long Island (4) ──
    {key:'parrish-art-museum', name:'Parrish Art Museum', city:'Water Mill', region:'Long Island', metro:'NYC', lat:40.9047, lng:-72.3655, hours:'Thu–Mon 11–5, Fri to 8 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'free', admission:'$20 adults, $15 seniors, free students & <18', addr:'279 Montauk Hwy, Water Mill, NY 11976'},
    {key:'nassau-county-museum', name:'Nassau County Museum of Art', city:'Roslyn Harbor', region:'Long Island', metro:'NYC', lat:40.8270, lng:-73.6450, hours:'Tue–Sun 11–4:45 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$15 adults, $10 seniors, $5 students/youth', addr:'1 Museum Dr, Roslyn Harbor, NY 11576'},
    {key:'heckscher-museum', name:'Heckscher Museum of Art', city:'Huntington', region:'Long Island', metro:'NYC', lat:40.8748, lng:-73.4227, hours:'Thu–Sun 12–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (suggested $5)', addr:'2 Prime Ave, Huntington, NY 11743'},
    {key:'pollock-krasner', name:'Pollock-Krasner House & Study Center', city:'East Hampton', region:'Long Island', metro:'NYC', lat:41.0205, lng:-72.1583, hours:'Thu–Sun by reservation (May–Oct) — OPEN Thu–Fri', walker:'no', icom:'no', card:'nl', paid:'yes', student:'discount', admission:'$20 adults, $15 students (guided studio tours)', addr:'830 Springs-Fireplace Rd, East Hampton, NY 11937'},

    // ── NYC — Connecticut (11) ──
    {key:'yale-art-gallery', name:'Yale University Art Gallery', city:'New Haven', region:'Connecticut', metro:'NYC', lat:41.3083, lng:-72.9312, hours:'Tue–Fri 10–5, Thu to 8, Sat–Sun 11–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always', addr:'1111 Chapel St, New Haven, CT 06510'},
    {key:'yale-british-art', name:'Yale Center for British Art', city:'New Haven', region:'Connecticut', metro:'NYC', lat:41.3087, lng:-72.9309, hours:'Tue–Sat 10–5, Sun 11–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Louis Kahn building)', addr:'1080 Chapel St, New Haven, CT 06510'},
    {key:'wadsworth-atheneum', name:'Wadsworth Atheneum Museum of Art', city:'Hartford', region:'Connecticut', metro:'NYC', lat:41.7643, lng:-72.6730, hours:'Wed–Fri 12–5, Sat–Sun 10–5 — OPEN Thu–Fri; Hartford residents free; Happy Hour free 4–5pm daily', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$22 adults, $17 seniors, $10 students, free <12', addr:'600 Main St, Hartford, CT 06103'},
    {key:'aldrich-museum', name:'The Aldrich Contemporary Art Museum', city:'Ridgefield', region:'Connecticut', metro:'NYC', lat:41.2810, lng:-73.4970, hours:'Wed–Sun 12–5 — OPEN Thu–Fri; 3rd Saturday free', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$18 adults, $12 seniors, $8 students, free <18', addr:'258 Main St, Ridgefield, CT 06877'},
    {key:'bruce-museum', name:'Bruce Museum', city:'Greenwich', region:'Connecticut', metro:'NYC', lat:41.0250, lng:-73.6250, hours:'Tue–Sun 10–5 — OPEN Thu–Fri; Free admission Tuesdays', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$20 adults, $15 seniors/students, free <5', addr:'1 Museum Dr, Greenwich, CT 06830'},
    {key:'new-britain-museum', name:'New Britain Museum of American Art', city:'New Britain', region:'Connecticut', metro:'NYC', lat:41.6670, lng:-72.7810, hours:'Tue, Wed, Fri–Sun 10–5, Thu to 8 — OPEN Thu–Fri; free Sat 10am–12pm', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$15 adults, $12 seniors, $10 students, free <12', addr:'56 Lexington St, New Britain, CT 06052'},
    {key:'florence-griswold', name:'Florence Griswold Museum', city:'Old Lyme', region:'Connecticut', metro:'NYC', lat:41.3210, lng:-72.3310, hours:'Tue–Sat 10–5, Sun 1–5 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$14 adults, $13 seniors/students, free <12', addr:'96 Lyme St, Old Lyme, CT 06371'},
    {key:'lyman-allyn', name:'Lyman Allyn Art Museum', city:'New London', region:'Connecticut', metro:'NYC', lat:41.3550, lng:-72.0940, hours:'Tue–Sat 10–5, Sun 1–5 — OPEN Thu–Fri; free 1st weekend monthly', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$12 adults, $9 seniors, $7 students, free <12', addr:'625 Williams St, New London, CT 06320'},
    {key:'hill-stead-museum', name:'Hill-Stead Museum', city:'Farmington', region:'Connecticut', metro:'NYC', lat:41.7206, lng:-72.8120, hours:'Tue–Sun 10–4 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$18 adults, $16 seniors, $12 students, $10 youth 6–12', addr:'35 Mountain Rd, Farmington, CT 06032'},
    {key:'fairfield-art', name:'Fairfield University Art Museum', city:'Fairfield', region:'Connecticut', metro:'NYC', lat:41.1578, lng:-73.2564, hours:'Tue–Sat 11–4 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Bellarmine Hall & Walsh Galleries)', addr:'1073 N Benson Rd, Fairfield, CT 06824'},
    {key:'mattatuck-museum', name:'Mattatuck Museum', city:'Waterbury', region:'Connecticut', metro:'NYC', lat:41.5562, lng:-73.0440, hours:'Tue–Sat 11–5, Sun 11–4 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$15 adults, $10 seniors/students, free <5', addr:'144 W Main St, Waterbury, CT 06702'},

    // ── NYC — New Jersey / Philly (11) ──
    {key:'newark-museum-of-art', name:'The Newark Museum of Art', city:'Newark', region:'New Jersey / Philly', metro:'NYC', lat:40.7429, lng:-74.1719, hours:'Thu–Sun 12–5 — OPEN Thu–Fri; free for Newark residents', walker:'yes', icom:'likely', card:'walker', student:'discount', admission:'$10 adults, $8 students/seniors, free <2', addr:'49 Washington St, Newark, NJ 07102'},
    {key:'montclair-art-museum', name:'Montclair Art Museum', city:'Montclair', region:'New Jersey / Philly', metro:'NYC', lat:40.8180, lng:-74.2200, hours:'Fri–Sun 11–5 (closed Thu) — OPEN Fri (plan Fri); free 1st Thu evenings', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$17 adults, $14 seniors, $12 students, free <12', addr:'3 South Mountain Ave, Montclair, NJ 07042'},
    {key:'mana-contemporary', name:'Mana Contemporary', city:'Jersey City', region:'New Jersey / Philly', metro:'NYC', lat:40.7329, lng:-74.0736, hours:'Thu–Sat 11–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (public exhibitions & guided tours)', addr:'888 Newark Ave, Jersey City, NJ 07306'},
    {key:'princeton-art-museum', name:'Princeton University Art Museum', city:'Princeton', region:'New Jersey / Philly', metro:'NYC', lat:40.3431, lng:-74.6561, hours:'Mon–Wed 10–5, Thu–Fri 10–8, Sat 10–5, Sun 12–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (new Adjaye-designed museum building)', addr:'McCormick Hall, Princeton University, Princeton, NJ 08544'},
    {key:'morven-museum', name:'Morven Museum & Garden', city:'Princeton', region:'New Jersey / Philly', metro:'NYC', lat:40.3458, lng:-74.6672, hours:'Wed–Sun 10–4 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$10 adults, $8 seniors/students, free <6', addr:'55 Stockton St, Princeton, NJ 08540'},
    {key:'zimmerli-museum', name:'Zimmerli Art Museum at Rutgers', city:'New Brunswick', region:'New Jersey / Philly', metro:'NYC', lat:40.4998, lng:-74.4468, hours:'Wed–Fri 11–6, Sat–Sun 12–5 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (Rutgers University)', addr:'71 Hamilton St, New Brunswick, NJ 08901'},
    {key:'grounds-for-sculpture', name:'Grounds For Sculpture', city:'Hamilton', region:'New Jersey / Philly', metro:'NYC', lat:40.2363, lng:-74.7190, hours:'Daily 10–6 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$22–25 adults, $18 seniors, $12–15 students', addr:'80 Sculptors Way, Hamilton, NJ 08619'},
    {key:'barnes-foundation', name:'Barnes Foundation', city:'Philadelphia', region:'New Jersey / Philly', metro:'NYC', lat:39.9606, lng:-75.1725, hours:'Thu–Mon 11–5 — OPEN Thu–Fri; free 1st Sun monthly (PECO)', walker:'no', icom:'unknown', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $28 seniors, $5 students, free <12', addr:'2025 Benjamin Franklin Pkwy, Philadelphia, PA 19130'},
    {key:'philadelphia-museum-of-art', name:'Philadelphia Museum of Art', city:'Philadelphia', region:'New Jersey / Philly', metro:'NYC', lat:39.9656, lng:-75.1810, hours:'Thu–Mon 10–5, Fri to 8:45 — OPEN Thu–Fri; pay-what-you-wish 1st Sun & Fri after 5pm', walker:'no', icom:'unknown', card:'nl', paid:'yes', student:'discount', admission:'$30 adults, $28 seniors, $14 students, free <18', addr:'2600 Benjamin Franklin Pkwy, Philadelphia, PA 19130'},
    {key:'pafa', name:'Pennsylvania Academy of the Fine Arts', city:'Philadelphia', region:'New Jersey / Philly', metro:'NYC', lat:39.9555, lng:-75.1633, hours:'Thu–Sun 10–4 — OPEN Thu–Fri', walker:'yes', icom:'unknown', card:'walker', student:'discount', admission:'$18 adults, $15 seniors, $12 students, free <12', addr:'118-128 N Broad St, Philadelphia, PA 19102'},
    {key:'ica-philadelphia', name:'Institute of Contemporary Art (ICA) Philadelphia', city:'Philadelphia', region:'New Jersey / Philly', metro:'NYC', lat:39.9536, lng:-75.1952, hours:'Wed–Sun 12–6 — OPEN Thu–Fri', walker:'free', icom:'free', card:'free', student:'free', admission:'Free always (UPenn campus)', addr:'118 S 36th St, Philadelphia, PA 19104'}
  ];

  // deduplication safety
  var _seen={}; MUSEUMS = MUSEUMS.filter(function(m){ if(_seen[m.key]) return false; _seen[m.key]=1; return true; });

  var filters = { metro:'NYC', region:null, access:null };
  var sort = 'name', sortDir = 1;
  var view = 'map', selected = null, myLoc = null;

  function esc(s){ return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function matches(m){
    if(filters.metro && filters.metro!=='All' && m.metro!==filters.metro) return false;
    if(filters.region && m.region!==filters.region) return false;
    if(filters.access){
      if(filters.access==='walker'){
        if(m.walker!=='yes' && m.walker!=='free') return false;
      } else if(filters.access==='icom'){
        if(m.icom!=='yes' && m.icom!=='likely' && m.icom!=='free') return false;
      } else if(filters.access==='student'){
        if(m.student!=='free' && m.student!=='discount') return false;
      } else if(filters.access==='studentfree'){
        if(m.student!=='free') return false;
      } else if(filters.access==='free'){
        if(m.walker!=='free' && m.icom!=='free' && m.card!=='free') return false;
      } else if(filters.access==='paid'){
        if(m.paid!=='yes' && !(m.card==='nl' && m.walker==='no')) return false;
      }
    }
    return true;
  }

  function filtered(){
    var out = MUSEUMS.filter(matches);
    if(myLoc){
      out.forEach(function(m){
        var dLat=m.lat-myLoc.lat, dLng=m.lng-myLoc.lng;
        m._d = Math.sqrt(dLat*dLat+dLng*dLng);
      });
      out.sort(function(a,b){ return a._d-b._d; });
    } else {
      out.sort(function(a,b){
        var va=a[sort]||'', vb=b[sort]||'';
        if(typeof va==='string') return va.localeCompare(vb)*sortDir;
        return (va-vb)*sortDir;
      });
    }
    return out;
  }

  function cardLabel(m){
    if(m.card==='both') return {t:'Both', c:'both'};
    if(m.card==='walker') return {t:'Walker', c:'walker'};
    if(m.card==='free') return {t:'Free', c:'free'};
    return {t:(m.paid==='yes'||m.card==='nl'?'Neither':'N/A'), c:'nl'};
  }
  function walkerLabel(m){
    if(m.walker==='yes') return {t:'✓', c:'yes'};
    if(m.walker==='free') return {t:'Free', c:'free'};
    return {t:'✗', c:'no'};
  }
  function icomLabel(m){
    if(m.icom==='yes') return {t:'✓', c:'yes'};
    if(m.icom==='likely') return {t:'≈', c:'likely'};
    if(m.icom==='free') return {t:'Free', c:'free'};
    return {t:'✗', c:'no'};
  }
  function studentLabel(m){
    if(m.student==='free') return {t:'Free', c:'free'};
    if(m.student==='discount') return {t:'$', c:'yes'};
    return {t:'✗', c:'no'};
  }

  function pinHTML(m){
    var color = REGION_COLOR[m.region] || '#999';
    return '<svg width="26" height="38" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">'
      + '<path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="'+color+'" stroke="#fff" stroke-width="1.5"/>'
      + '<circle cx="14" cy="14" r="5.5" fill="#fff"/></svg>';
  }

  function icon(m){
    return '<div class="ms-dot" style="background:'+(REGION_COLOR[m.region]||'#999')+'"></div>';
  }

  function badgesHTML(m){
    var cl = cardLabel(m);
    var h = '<span class="ms-badge '+cl.c+'">'+cl.t+'</span>';
    if(m.walker==='free'||m.icom==='free'||m.card==='free') h += '<span class="ms-badge free">Free entry</span>';
    if(m.student==='free') h += '<span class="ms-badge student">Student free</span>';
    else if(m.student==='discount') h += '<span class="ms-badge student" style="background:#fff8e1;color:#7b1fa2">Student $</span>';
    if(m.paid==='yes'||(m.card==='nl'&&m.walker==='no')) h += '<span class="ms-badge nl">Paid</span>';
    if((m.hours||'').indexOf('CLOSED')>=0) h += '<span class="ms-badge closed">Closed</span>';
    return h;
  }

  var map, markers = {};

  function updateHeaderAndTip(){
    var m = filters.metro || 'NYC';
    var titleEl = document.getElementById('msTitle');
    var subEl = document.getElementById('msSub');
    var tipEl = document.getElementById('msTip');
    if(titleEl){
      titleEl.textContent = (m==='NYC'?'NYC Museums — Free Pass & Guide':(m==='Bay Area'?'Bay Area Museums — Free Pass & Guide':'Bay Area & NYC Museums — Free Pass Guide'));
    }
    if(subEl && METRO_SUBTITLES[m]){
      subEl.textContent = METRO_SUBTITLES[m];
    }
    if(tipEl && METRO_TIPS[m]){
      tipEl.innerHTML = METRO_TIPS[m];
    }
  }

  function renderChips(){
    updateHeaderAndTip();

    // metro chips
    var metroCounts = {};
    MUSEUMS.forEach(function(m){ metroCounts[m.metro]=(metroCounts[m.metro]||0)+1; });
    var metroList = Object.keys(metroCounts).map(function(k){ return {val:k, n:metroCounts[k]}; });
    metroList.sort(function(a,b){
      var order={'NYC':0,'Bay Area':1,'All':2};
      return (order[a.val]!==undefined?order[a.val]:99) - (order[b.val]!==undefined?order[b.val]:99);
    });
    var allCount = MUSEUMS.length;
    var metroEl = document.getElementById('msMetroChips');
    var mh = '';
    metroList.forEach(function(it){
      mh += '<button class="ms-chip metro'+(filters.metro===it.val?' on':'')+'" data-f="metro" data-v="'+it.val+'">'+esc(it.val)+'<span class="ms-ct">'+it.n+'</span></button>';
    });
    mh += '<button class="ms-chip metro'+(filters.metro==='All'?' on':'')+'" data-f="metro" data-v="All">All <span class="ms-ct">'+allCount+'</span></button>';
    metroEl.innerHTML = mh;

    // region chips filtered by metro
    var reg={}, wal=0, ico=0, fre=0, paid=0, stuFree=0, stuAny=0;
    var pool = filters.metro==='All' ? MUSEUMS : MUSEUMS.filter(function(m){ return m.metro===filters.metro; });
    pool.forEach(function(m){
      reg[m.region]=(reg[m.region]||0)+1;
      if(m.walker==='yes'||m.walker==='free') wal++;
      if(m.icom==='yes'||m.icom==='likely'||m.icom==='free') ico++;
      if(m.walker==='free'||m.icom==='free'||m.card==='free') fre++;
      if(m.paid==='yes'||(m.card==='nl'&&m.walker==='no')) paid++;
      if(m.student==='free') stuFree++;
      if(m.student==='free'||m.student==='discount') stuAny++;
    });
    var regionList = Object.keys(reg).map(function(k){ return {val:k, n:reg[k]}; });
    regionList.sort(function(a,b){ return b.n - a.n; });
    chipContainer('msRegionChips','region', regionList, pool.length);
    var accessList = [
      {val:'walker', n:wal, label:'Walker / NARM ✓'},
      {val:'icom', n:ico, label:'ICOM ✓'},
      {val:'studentfree', n:stuFree, label:'Student free'},
      {val:'student', n:stuAny, label:'Student $'},
      {val:'free', n:fre, label:'Free always'},
      {val:'paid', n:paid, label:'Paid'}
    ];
    chipContainer('msAccessChips','access', accessList, null);
  }

  function chipContainer(id, field, list, poolTotal){
    var el = document.getElementById(id);
    var allN = (field==='region' && poolTotal!==null) ? poolTotal : null;
    var h = '<button class="ms-chip'+(filters[field]===null?' on':'')+'" data-f="'+field+'" data-v="">All '+(allN!==null?'<span class="ms-ct">'+allN+'</span>':'')+'</button>';
    list.forEach(function(it){
      var label = it.label || it.val;
      h += '<button class="ms-chip'+(filters[field]===it.val?' on':'')+'" data-f="'+field+'" data-v="'+it.val+'">'+esc(label)+'<span class="ms-ct">'+it.n+'</span></button>';
    });
    el.innerHTML = h;
  }

  function renderList(){
    var list = document.getElementById('msList');
    list.innerHTML = filtered().map(function(m){
      return '<div class="ms-list-item'+(selected===m.key?' on':'')+'" data-key="'+m.key+'">'
        + icon(m)
        + '<div class="ms-list-item-body">'
        + '<div class="ms-list-item-name">'+esc(m.name)+'</div>'
        + '<div class="ms-list-item-meta">'+esc(m.city)+' · '+esc(m.region)+' · '+esc(m.metro)+'</div>'
        + '<div class="ms-list-item-badges">'+badgesHTML(m)+'</div>'
        + '</div></div>';
    }).join('');
    list.querySelectorAll('.ms-list-item').forEach(function(el){
      el.addEventListener('click', function(){ select(el.getAttribute('data-key')); });
    });
  }

  var COLS = [
    {key:'name', label:'Museum'},
    {key:'city', label:'City'},
    {key:'region', label:'Region'},
    {key:'hours', label:'Hours'},
    {key:'walker', label:'Walker/NARM'},
    {key:'icom', label:'ICOM'},
    {key:'student', label:'Student'},
    {key:'card', label:'Best Card'}
  ];
  function renderTable(){
    var items = filtered();
    var thead = document.querySelector('#msTable thead tr');
    thead.innerHTML = COLS.map(function(c){
      return '<th data-sort="'+c.key+'" class="'+(sort===c.key?'sorted':'')+'">'+c.label+'<span class="ms-arrow">'+(sort===c.key?(sortDir>0?'↑':'↓'):'⇅')+'</span></th>';
    }).join('');
    var tbody = document.querySelector('#msTable tbody');
    tbody.innerHTML = items.map(function(m){
      var wl = walkerLabel(m), il = icomLabel(m), sl = studentLabel(m), cl = cardLabel(m);
      return '<tr class="ms-click" data-key="'+m.key+'">'
        + '<td><div class="ms-mname">'+esc(m.name)+'</div></td>'
        + '<td>'+esc(m.city)+'<div class="ms-cell-sub">'+esc(m.region)+' · '+esc(m.metro)+'</div></td>'
        + '<td>'+esc(m.region)+'</td>'
        + '<td>'+esc(m.hours)+'</td>'
        + '<td class="ms-'+wl.c+'">'+wl.t+'</td>'
        + '<td class="ms-'+il.c+'">'+il.t+'</td>'
        + '<td class="ms-'+sl.c+'">'+sl.t+'</td>'
        + '<td><span class="ms-card '+cl.c+'">'+cl.t+'</span></td>'
        + '</tr>';
    }).join('');
    thead.querySelectorAll('th').forEach(function(th){
      th.addEventListener('click', function(){
        var k = th.getAttribute('data-sort');
        if(sort===k) sortDir*=-1; else { sort=k; sortDir=1; }
        renderTable(); renderList();
      });
    });
    tbody.querySelectorAll('tr').forEach(function(tr){
      tr.addEventListener('click', function(){ select(tr.getAttribute('data-key')); });
    });
  }

  function renderLegend(){
    var el = document.getElementById('msLegend');
    var pool = filters.metro==='All' ? Object.keys(REGION_COLOR) : Object.keys(REGION_COLOR).filter(function(r){
      return MUSEUMS.some(function(m){ return m.metro===filters.metro && m.region===r; });
    });
    el.innerHTML = pool.map(function(r){
      return '<span><span class="ms-dot" style="background:'+REGION_COLOR[r]+';width:10px;height:10px;border-radius:50%;display:inline-block"></span>'+r+'</span>';
    }).join('');
  }

  function showDetail(m){
    var inner = document.getElementById('msDetailInner');
    var wl = walkerLabel(m), ic = icomLabel(m), sl = studentLabel(m), cl = cardLabel(m);
    var studentText = m.student==='free' ? 'Free with student ID' : (m.student==='discount' ? 'Discount with student ID ('+esc(m.admission)+')' : 'No student discount');
    var isClosed = (m.hours||'').indexOf('CLOSED')>=0;
    inner.innerHTML = '<h3>'+esc(m.name)+'</h3>'
      + '<div class="ms-detail-nb">'+esc(m.city)+' · '+esc(m.region)+' · '+esc(m.metro)+' · '+esc(m.addr)+'</div>'
      + '<p class="ms-hours">🕐 '+esc(m.hours)+'</p>'
      + (isClosed ? '<div class="ms-note" style="background:#ffebee;color:#b71c1c"><b>⚠️ Closed for your travel dates</b> — verify reopening before visiting.</div>' : '')
      + '<div class="ms-note"><b>🎟️ Admission:</b> '+esc(m.admission||'See site')+'</div>'
      + '<div class="ms-details-grid">'
      + '<div class="ms-cell"><b>Walker (NARM/ROAM/MARP)</b>'+wl.t+(m.walker==='yes'?' — show card + ID':'')+'</div>'
      + '<div class="ms-cell"><b>ICOM</b>'+ic.t+'</div>'
      + '<div class="ms-cell"><b>Student ID</b>'+sl.t+'<div style="font-size:11px;color:#666;margin-top:2px">'+studentText+'</div></div>'
      + '<div class="ms-cell"><b>Best card</b>'+cl.t+'</div>'
      + '</div>'
      + '<div class="ms-note" style="font-size:11.5px">Reciprocity is a courtesy — bring physical/digital card + photo ID, call ahead for NARM/ICOM, and check for ticketed exhibitions excluded from reciprocity. NYC partner IDs (NYU/Columbia/CUNY/Pratt/SVA) often beat any paid membership.</div>';
    document.getElementById('msDetail').classList.add('open');
    if(map && window.innerWidth>=900){ setTimeout(function(){ map.invalidateSize(); },120); }
  }
  function hideDetail(){
    document.getElementById('msDetail').classList.remove('open');
    if(map && window.innerWidth>=900){ setTimeout(function(){ map.invalidateSize(); },120); }
  }

  function select(key){
    selected = key;
    renderList();
    var m = MUSEUMS.find(function(x){ return x.key===key; });
    if(!m) return;
    if(markers[key] && view==='map'){
      markers[key].openPopup();
      if(map) map.setView([m.lat,m.lng], 14, {animate:true});
    }
    showDetail(m);
    var el = document.querySelector('.ms-list-item[data-key="'+key+'"]') || document.querySelector('tr[data-key="'+key+'"]');
    if(view==='list' && el){ try{ el.scrollIntoView({behavior:'smooth',block:'center'}); }catch(e){} }
  }

  function setupMap(){
    var center = METRO_CENTER[filters.metro] || METRO_CENTER['NYC'];
    map = L.map('msMap', {zoomControl:true}).setView([center.lat, center.lng], center.zoom);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
    MUSEUMS.forEach(function(m){
      var mk = L.marker([m.lat, m.lng], {icon: L.divIcon({className:'ms-pin', html:pinHTML(m), iconSize:[26,38], iconAnchor:[13,38], popupAnchor:[0,-34]})}).addTo(map);
      mk.bindPopup('<strong>'+esc(m.name)+'</strong>'+esc(m.city)+' · '+esc(m.metro)+'<br><a data-goto="'+m.key+'">View details →</a>');
      mk.on('popupopen', function(){
        var a=document.querySelector('.leaflet-popup a[data-goto="'+m.key+'"]');
        if(a) a.addEventListener('click', function(e){ e.preventDefault(); select(m.key); });
      });
      mk.on('click', function(){ select(m.key); });
      markers[m.key] = mk;
    });
    renderLegend();
  }

  function applyMapFilter(){
    var visible = filtered();
    MUSEUMS.forEach(function(m){
      var mk = markers[m.key];
      if(!mk) return;
      var show = visible.indexOf(m)>=0;
      if(show) mk.addTo(map);
      else map.removeLayer(mk);
    });
    if(visible.length && map){
      if(visible.length === 1){
        map.setView([visible[0].lat, visible[0].lng], 13, {animate:true});
      } else {
        var fg = L.featureGroup(visible.map(function(m){ return markers[m.key]; }).filter(Boolean));
        map.fitBounds(fg.getBounds().pad(0.08), {maxZoom:12});
      }
    } else if(map){
      var c = METRO_CENTER[filters.metro] || METRO_CENTER['NYC'];
      map.setView([c.lat, c.lng], c.zoom);
    }
    renderLegend();
  }

  function setView(v){
    view = v;
    document.getElementById('msViewMap').classList.toggle('on', v==='map');
    document.getElementById('msViewList').classList.toggle('on', v==='list');
    document.getElementById('msViewTable').classList.toggle('on', v==='table');
    document.getElementById('msMap').classList.toggle('active', v==='map');
    document.getElementById('msList').classList.toggle('active', v==='list');
    document.getElementById('msTableWrap').classList.toggle('active', v==='table');
    if(v==='map'){ setTimeout(function(){ if(map) map.invalidateSize(); }, 100); }
    else if(v==='list'){ renderList(); }
    else if(v==='table'){ renderTable(); }
  }

  function updateAll(){
    var items = filtered();
    document.getElementById('msCount').textContent = items.length+' / '+MUSEUMS.length+' museums';
    renderList();
    if(view==='table') renderTable();
    if(view==='map') applyMapFilter();
    else renderLegend();
  }

  function bindChips(){
    ['metro','region','access'].forEach(function(field){
      var elId = field==='metro'?'msMetroChips': field==='region'?'msRegionChips':'msAccessChips';
      document.getElementById(elId).addEventListener('click', function(e){
        var chip = e.target.closest('.ms-chip');
        if(!chip) return;
        var val = chip.getAttribute('data-v');
        if(field==='metro'){
          filters.metro = val || 'NYC';
          filters.region = null;
          selected = null; hideDetail();
          var c = METRO_CENTER[filters.metro] || METRO_CENTER['NYC'];
          if(map) map.setView([c.lat, c.lng], c.zoom);
        } else {
          filters[field] = (filters[field]===val) ? null : val;
          selected = null; hideDetail();
        }
        renderChips(); updateAll();
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function(){
    renderChips(); bindChips(); setupMap(); updateAll();
    document.getElementById('msViewMap').addEventListener('click', function(){ setView('map'); });
    document.getElementById('msViewList').addEventListener('click', function(){ setView('list'); });
    document.getElementById('msViewTable').addEventListener('click', function(){ setView('table'); });
    document.getElementById('msLoc').addEventListener('click', function(){
      if(!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(function(pos){
        myLoc={lat:pos.coords.latitude, lng:pos.coords.longitude};
        document.getElementById('msLoc').classList.add('on');
        document.getElementById('msLoc').textContent='📍 '+myLoc.lat.toFixed(2)+','+myLoc.lng.toFixed(2);
        updateAll();
      }, function(){});
    });
    document.getElementById('msDetailClose').addEventListener('click', function(){ selected=null; hideDetail(); renderList(); });
    document.getElementById('msDetailX').addEventListener('click', function(){ selected=null; hideDetail(); renderList(); });
  });
})();
</script>
