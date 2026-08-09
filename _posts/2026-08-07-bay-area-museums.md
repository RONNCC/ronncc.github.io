---
layout: post
title: "Bay Area Museums & Free Pass Guide"
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
.ms-chip .ms-ct{margin-left:4px;opacity:.65}
.ms-loc-btn{display:flex;align-items:center;gap:6px;border:1px dashed #c9c9c9;background:#fff;color:#555;font:600 12px/1 inherit;padding:7px 12px;border-radius:999px;cursor:pointer;transition:all .12s}
.ms-loc-btn:hover{border-color:#0f6ab4;color:#0f6ab4}
.ms-loc-btn.on{background:#e8f2fb;border-color:#0f6ab4;color:#0f6ab4}

/* ── content area ── */
.ms-content{position:relative;height:calc(100vh - 180px);overflow:hidden}
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

/* ── table view ── */
.ms-tablewrap{display:none;overflow:auto;height:100%;min-height:0}
.ms-tablewrap.active{display:block}
.ms-table{width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;min-width:720px}
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
.ms-table .ms-free{color:#b26a00;font-weight:700}
.ms-table .ms-maybe{color:#8a6d00;font-weight:600}
.ms-table .ms-card{border-radius:6px;font-weight:700;padding:2px 7px;font-size:11px}
.ms-table .ms-card.both{background:#e8f5e9;color:#2e7d32}
.ms-table .ms-card.walker{background:#fff8e1;color:#b26a00}
.ms-table .ms-card.nl{background:#f5f5f5;color:#888}
.ms-table tr.ms-click{cursor:pointer}

/* ── detail panel ── */
.ms-detail{position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e0e0e0;box-shadow:0 -4px 20px rgba(0,0,0,.12);border-radius:14px 14px 0 0;transform:translateY(100%);transition:transform .25s ease;z-index:1000;max-height:55%;overflow-y:auto}
.ms-detail.open{transform:translateY(0)}
@media(max-width:800px){.ms-detail{max-height:70%;border-radius:16px 16px 0 0}}
.ms-detail-handle{width:36px;height:4px;background:#ddd;border-radius:2px;margin:10px auto 0;cursor:pointer}
.ms-detail-inner{padding:14px 20px 20px}
.ms-detail h3{margin:0 0 2px;font-size:17px;font-weight:800}
.ms-detail-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-bottom:8px}
.ms-detail .ms-hours{font-size:13px;color:#333;margin:0 0 8px}
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
  <h2>Bay Area Museums</h2>
  <p class="ms-sub">Filter by region or pass type. Tap a pin or row to see details.</p>
  <div class="ms-toolbar">
    <button class="ms-loc-btn" id="msLoc">📍 Near me</button>
    <div class="ms-count" id="msCount"></div>
    <div class="ms-view-toggle">
      <button class="ms-view-btn on" data-view="map" id="msViewMap">🗺️ Map</button>
      <button class="ms-view-btn" data-view="list" id="msViewList">📋 List</button>
      <button class="ms-view-btn" data-view="table" id="msViewTable">📊 Table</button>
    </div>
  </div>
  <div class="ms-filter-label">Region</div>
  <div class="ms-chips" id="msRegionChips"></div>
  <div class="ms-filter-label">Access</div>
  <div class="ms-chips" id="msAccessChips"></div>
</div>

<div class="ms-content">
  <div id="msMap" class="ms-map active"></div>
  <div class="ms-list" id="msList"></div>
  <div class="ms-tablewrap" id="msTableWrap">
    <table class="ms-table" id="msTable"><thead><tr></tr></thead><tbody></tbody></table>
  </div>
  <div class="ms-legend" id="msLegend"></div>

  <div class="ms-detail" id="msDetail">
    <div class="ms-detail-handle" id="msDetailClose"></div>
    <button class="ms-detail-close" id="msDetailX">&times;</button>
    <div class="ms-detail-inner" id="msDetailInner"></div>
  </div>
</div>
</div>

<p style="max-width:900px;margin:16px auto 0;padding:0 20px;font-size:12.5px;color:#888">
  Walker Travelers pass (NARM/ROAM/MARP), ICOM membership, and hours compiled from each institution; verify before you go.
</p>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var REGION_COLOR = {
    "SF": "#0f6ab4",
    "East Bay": "#2e7d32",
    "South Bay": "#b26a00",
    "North": "#6a1b9a",
    "Coast/Santa Cruz": "#d84315"
  };

  var MUSEUMS = [
    {key:'sfmoma', name:'SFMOMA', city:'San Francisco', region:'SF', lat:37.78592, lng:-122.40074, hours:'Mon–Tue 10–5; Wed closed; Thu 12–8; Fri–Sun 10–5', walker:'yes', icom:'yes', card:'both', addr:'151 3rd St, San Francisco, CA'},
    {key:'deyoung', name:'de Young Museum', city:'San Francisco', region:'SF', lat:37.77150, lng:-122.46909, hours:'Closed Mon; Tue–Sun 9:30–5:15', walker:'yes', icom:'likely', card:'walker', addr:'50 Hagiwara Tea Garden Dr, San Francisco, CA'},
    {key:'legion', name:'Legion of Honor', city:'San Francisco', region:'SF', lat:37.78456, lng:-122.50096, hours:'Closed Mon; Tue–Sun 9:30–5:15', walker:'yes', icom:'likely', card:'walker', addr:'100 34th Ave, San Francisco, CA'},
    {key:'asianart', name:'Asian Art Museum', city:'San Francisco', region:'SF', lat:37.78031, lng:-122.41599, hours:'Tue–Wed closed; Thu 1–8; Fri–Mon 10–5', walker:'yes', icom:'likely', card:'walker', addr:'200 Larkin St, San Francisco, CA'},
    {key:'disneyfm', name:'Walt Disney Family Museum', city:'San Francisco', region:'SF', lat:37.80136, lng:-122.45872, hours:'Mon 10–5:30 (summer); Tue–Wed closed; Thu–Sun 10–5:30', walker:'yes', icom:'unknown', card:'both', addr:'104 Montgomery St, San Francisco, CA'},
    {key:'cjm', name:'Contemporary Jewish Museum', city:'San Francisco', region:'SF', lat:37.78604, lng:-122.40367, hours:'Closed Mon–Wed; Thu–Sun 11–5', walker:'yes', icom:'likely', card:'both', addr:'736 Mission St, San Francisco, CA'},
    {key:'mcd', name:'Museum of Craft & Design', city:'San Francisco', region:'SF', lat:37.75693, lng:-122.38796, hours:'Closed Mon–Wed; Thu–Sun 12–5', walker:'yes', icom:'likely', card:'both', addr:'2569 3rd St, San Francisco, CA'},
    {key:'moad', name:'MoAD', city:'San Francisco', region:'SF', lat:37.78647, lng:-122.40147, hours:'Closed Mon–Tue; Wed–Sat 11–6; Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'685 Mission St, San Francisco, CA'},
    {key:'cartoon', name:'Cartoon Art Museum', city:'San Francisco', region:'SF', lat:37.80638, lng:-122.42179, hours:'Tue–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'781 Beach St, San Francisco, CA'},
    {key:'ybca', name:'Yerba Buena Center for the Arts', city:'San Francisco', region:'SF', lat:37.78623, lng:-122.40219, hours:'Thu–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'701 Mission St, San Francisco, CA'},
    {key:'glbt', name:'GLBT Historical Society', city:'San Francisco', region:'SF', lat:37.76077, lng:-122.43561, hours:'Tue–Sat 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'4127 18th St, San Francisco, CA'},
    {key:'chsa', name:'Chinese Historical Society', city:'San Francisco', region:'SF', lat:37.79374, lng:-122.40882, hours:'Thu–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'965 Clay St, San Francisco, CA'},
    {key:'chineseculture', name:'Chinese Culture Center', city:'San Francisco', region:'SF', lat:37.79514, lng:-122.40431, hours:'Tue–Sat 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'750 Kearny St, San Francisco, CA'},
    {key:'letterform', name:'Letterform Archive', city:'San Francisco', region:'SF', lat:37.77540, lng:-122.40997, hours:'Thu–Sat 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'1188 Folsom St, San Francisco, CA'},
    {key:'tenderloin', name:'Tenderloin Museum', city:'San Francisco', region:'SF', lat:37.78392, lng:-122.41412, hours:'Tue–Sat 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'398 Eddy St, San Francisco, CA'},
    {key:'haas', name:'Haas-Lilienthal House', city:'San Francisco', region:'SF', lat:37.79328, lng:-122.42499, hours:'Wed–Sat 12–3', walker:'yes', icom:'unknown', card:'walker', addr:'2007 Franklin St, San Francisco, CA'},
    {key:'museoit', name:'Museo Italo Americano', city:'San Francisco', region:'SF', lat:37.80697, lng:-122.43142, hours:'Thu–Sun 12–4', walker:'yes', icom:'unknown', card:'walker', addr:'2 Marina Blvd (Fort Mason), San Francisco, CA'},
    {key:'sfwa', name:'San Francisco Women Artists Gallery', city:'San Francisco', region:'SF', lat:37.76388, lng:-122.46500, hours:'Tue–Sat 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'647 Irving St, San Francisco, CA'},
    {key:'grayarea', name:'Gray Area', city:'San Francisco', region:'SF', lat:37.75444, lng:-122.41826, hours:'Thu–Sat 12–6', walker:'yes', icom:'unknown', card:'walker', addr:'2665 Mission St, San Francisco, CA'},
    {key:'pampanito', name:'USS Pampanito', city:'San Francisco', region:'SF', lat:37.80999, lng:-122.41644, hours:'Daily 10–5:30', walker:'yes', icom:'unknown', card:'walker', addr:'Pier 45, San Francisco, CA'},
    {key:'rootdivision', name:'Root Division', city:'San Francisco', region:'SF', lat:37.77844, lng:-122.41145, hours:'Wed–Sat 2–6', walker:'yes', icom:'unknown', card:'walker', addr:'1131 Mission St, San Francisco, CA'},
    {key:'sfhs', name:'San Francisco Historical Society', city:'San Francisco', region:'SF', lat:37.78274, lng:-122.40727, hours:'Wed–Sun 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'88 5th St (Old Mint), San Francisco, CA'},
    {key:'icasf', name:"Institute of Contemporary Art SF", city:'San Francisco', region:'SF', lat:37.78157, lng:-122.39848, hours:'Thu–Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'725 Harrison St, San Francisco, CA'},
    {key:'explo', name:'Exploratorium', city:'San Francisco', region:'SF', lat:37.80090, lng:-122.39853, hours:'Closed Mon; Tue–Sat 10–5; Sun 12–5', walker:'no', icom:'unknown', card:'nl', addr:'Pier 15, San Francisco, CA'},
    {key:'cas', name:'California Academy of Sciences', city:'San Francisco', region:'SF', lat:37.76983, lng:-122.46609, hours:'Mon–Sat 9:30–5; Sun 11–5', walker:'no', icom:'unknown', card:'nl', addr:'55 Music Concourse Dr, San Francisco, CA'},
    {key:'cablecar', name:'Cable Car Museum', city:'San Francisco', region:'SF', lat:37.79476, lng:-122.41185, hours:'Closed Mon; Tue–Thu 10–4; Fri–Sun 10–5', walker:'free', icom:'free', card:'nl', addr:'1201 Mason St, San Francisco, CA'},
    {key:'omca', name:'Oakland Museum of California', city:'Oakland', region:'East Bay', lat:37.79860, lng:-122.26360, hours:'Wed–Sun 11–5; Fri until 9', walker:'yes', icom:'unknown', card:'walker', addr:'1000 Oak St, Oakland, CA'},
    {key:'chabot', name:'Chabot Space & Science Center', city:'Oakland', region:'East Bay', lat:37.81850, lng:-122.18070, hours:'Wed–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'10000 Skyline Blvd, Oakland, CA'},
    {key:'camron', name:'Camron-Stanford House', city:'Oakland', region:'East Bay', lat:37.80150, lng:-122.26220, hours:'Sat–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'1418 Lakeside Dr, Oakland, CA'},
    {key:'juniorcenter', name:'Junior Center of Art & Science', city:'Oakland', region:'East Bay', lat:37.80750, lng:-122.25560, hours:'Tue–Sat 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'558 Bellevue Ave, Oakland, CA'},
    {key:'hornet', name:'USS Hornet Museum', city:'Alameda', region:'East Bay', lat:37.77270, lng:-122.30290, hours:'Daily 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'707 W Hornet Ave, Alameda, CA'},
    {key:'bampfa', name:'UC Berkeley Art Museum (BAMPFA)', city:'Berkeley', region:'East Bay', lat:37.87100, lng:-122.26640, hours:'Wed–Sun 11–7', walker:'yes', icom:'unknown', card:'walker', addr:'2155 Centre St, Berkeley, CA'},
    {key:'ucbg', name:'UC Botanical Garden at Berkeley', city:'Berkeley', region:'East Bay', lat:37.87480, lng:-122.23840, hours:'Daily 9–5', walker:'yes', icom:'unknown', card:'walker', addr:'200 Centennial Dr, Berkeley, CA'},
    {key:'berkeleyac', name:'Berkeley Art Center', city:'Berkeley', region:'East Bay', lat:37.88420, lng:-122.26860, hours:'Wed–Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'1275 Walnut St, Berkeley, CA'},
    {key:'kala', name:'Kala Art Institute', city:'Berkeley', region:'East Bay', lat:37.85299, lng:-122.28723, hours:'Tue–Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'2990 San Pablo Ave, Berkeley, CA'},
    {key:'dougadams', name:'Doug Adams Gallery', city:'Berkeley', region:'East Bay', lat:37.87554, lng:-122.26187, hours:'Tue–Thu 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'2400 Ridge Rd, Berkeley, CA'},
    {key:'richmondac', name:'Richmond Art Center', city:'Richmond', region:'East Bay', lat:37.93739, lng:-122.34411, hours:'Tue–Sat 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'2540 Barrett Ave, Richmond, CA'},
    {key:'niad', name:'NIAD Art Center', city:'Richmond', region:'East Bay', lat:37.93920, lng:-122.34760, hours:'Mon–Fri 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'551 23rd St, Richmond, CA'},
    {key:'sjmuseum', name:'San Jose Museum of Art', city:'San Jose', region:'South Bay', lat:37.33370, lng:-121.89000, hours:'Tue–Thu 11–6; Fri 11–9; Sat–Sun 11–6', walker:'yes', icom:'unknown', card:'walker', addr:'45 W San Fernando St, San Jose, CA'},
    {key:'sjquilts', name:'San Jose Museum of Quilts & Textiles', city:'San Jose', region:'South Bay', lat:37.32820, lng:-121.88420, hours:'Tue–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'520 S 1st St, San Jose, CA'},
    {key:'sjica', name:'San Jose Institute of Contemporary Art', city:'San Jose', region:'South Bay', lat:37.32780, lng:-121.88390, hours:'Thu–Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'560 S 1st St, San Jose, CA'},
    {key:'cham', name:'Chinese Historical Museum', city:'San Jose', region:'South Bay', lat:37.32950, lng:-121.90100, hours:'Sat–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'80 S Montgomery St, San Jose, CA'},
    {key:'paloaltphm', name:'Palo Alto History Museum', city:'Palo Alto', region:'South Bay', lat:37.44601, lng:-122.15927, hours:'Wed–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'380 Hamilton Ave, Palo Alto, CA'},
    {key:'paloaltac', name:'Palo Alto Art Center', city:'Palo Alto', region:'South Bay', lat:37.44400, lng:-122.13900, hours:'Tue–Sat 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'1313 Newell Rd, Palo Alto, CA'},
    {key:'cantor', name:'Cantor Arts Center (Stanford)', city:'Stanford', region:'South Bay', lat:37.43300, lng:-122.17090, hours:'Wed–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'328 Lomita Dr, Stanford, CA'},
    {key:'anderson', name:'Anderson Collection (Stanford)', city:'Stanford', region:'South Bay', lat:37.43380, lng:-122.17080, hours:'Wed–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'314 Lomita Dr, Stanford, CA'},
    {key:'curi', name:'CuriOdyssey', city:'San Mateo', region:'South Bay', lat:37.59060, lng:-122.31970, hours:'Tue–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'1651 Coyote Point Dr, San Mateo, CA'},
    {key:'smchm', name:'San Mateo County History Museum', city:'Redwood City', region:'South Bay', lat:37.48700, lng:-122.22970, hours:'Tue–Sun 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'2200 Broadway, Redwood City, CA'},
    {key:'losaltos', name:'Los Altos History Museum', city:'Los Altos', region:'South Bay', lat:37.38090, lng:-122.11200, hours:'Thu–Sun 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'51 S San Antonio Rd, Los Altos, CA'},
    {key:'numlg', name:'New Museum Los Gatos', city:'Los Gatos', region:'South Bay', lat:37.22050, lng:-121.97910, hours:'Thu–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'106 E Main St, Los Gatos, CA'},
    {key:'campbell', name:'Campbell Museums', city:'Campbell', region:'South Bay', lat:37.28770, lng:-121.94390, hours:'Tue–Sun 12–4', walker:'yes', icom:'unknown', card:'walker', addr:'51 N Central Ave, Campbell, CA'},
    {key:'sunnyhp', name:'Sunnyvale Heritage Park', city:'Sunnyvale', region:'South Bay', lat:37.35650, lng:-122.02550, hours:'Tue, Thu, Sun 12–4', walker:'yes', icom:'unknown', card:'walker', addr:'550 E Remington Dr, Sunnyvale, CA'},
    {key:'triton', name:'Triton Museum of Art', city:'Santa Clara', region:'South Bay', lat:37.35620, lng:-121.95510, hours:'Tue–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'1505 Warburton Ave, Santa Clara, CA'},
    {key:'desaisset', name:'de Saisset Museum', city:'Santa Clara', region:'South Bay', lat:37.34990, lng:-121.94070, hours:'Tue–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'500 El Camino Real, Santa Clara, CA'},
    {key:'schulz', name:'Charles M. Schulz Museum', city:'Santa Rosa', region:'North', lat:38.46035, lng:-122.73583, hours:'Daily 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'2301 Hardies Ln, Santa Rosa, CA'},
    {key:'dirosa', name:'di Rosa Center for Contemporary Art', city:'Napa', region:'North', lat:38.25700, lng:-122.35172, hours:'Thu–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'5200 Carneros Hwy, Napa, CA'},
    {key:'sonomava', name:'Sonoma Valley Museum of Art', city:'Sonoma', region:'North', lat:38.29098, lng:-122.45846, hours:'Wed–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'551 Broadway, Sonoma, CA'},
    {key:'sonomacount', name:'Museums of Sonoma County', city:'Santa Rosa', region:'North', lat:38.44185, lng:-122.71837, hours:'Tue–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'425 7th St, Santa Rosa, CA'},
    {key:'healdsburg', name:'Healdsburg Museum', city:'Healdsburg', region:'North', lat:38.61118, lng:-122.86722, hours:'Wed–Sun 11–4', walker:'yes', icom:'unknown', card:'walker', addr:'221 Matheson St, Healdsburg, CA'},
    {key:'mailami', name:'Museum of the American Indian', city:'Novato', region:'North', lat:38.11525, lng:-122.60313, hours:'Tue–Sun 12:30–4:30', walker:'yes', icom:'unknown', card:'walker', addr:'2200 Novato Blvd, Novato, CA'},
    {key:'marinh', name:'Marin History Museum', city:'San Rafael', region:'North', lat:37.97462, lng:-122.52915, hours:'Wed–Sun 12–4', walker:'yes', icom:'unknown', card:'walker', addr:'1125 B St, San Rafael, CA'},
    {key:'sausalito', name:'Sausalito Center for the Arts', city:'Sausalito', region:'North', lat:37.85691, lng:-122.47982, hours:'Tue–Sun 11–5', walker:'yes', icom:'unknown', card:'walker', addr:'750 Bridgeway, Sausalito, CA'},
    {key:'blackhawk', name:'Blackhawk Museum', city:'Danville', region:'East Bay', lat:37.80130, lng:-121.91760, hours:'Fri–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'3700 Black Hawk Plaza Cir, Danville, CA'},
    {key:'bancroft', name:'Ruth Bancroft Garden', city:'Walnut Creek', region:'East Bay', lat:37.92350, lng:-122.03650, hours:'Tue–Sun 9–4', walker:'yes', icom:'unknown', card:'walker', addr:'1552 Bancroft Rd, Walnut Creek, CA'},
    {key:'lindsay', name:'Lindsay Wildlife Experience', city:'Walnut Creek', region:'East Bay', lat:37.92340, lng:-122.07570, hours:'Wed–Sun 10–5', walker:'yes', icom:'unknown', card:'walker', addr:'1931 1st Ave, Walnut Creek, CA'},
    {key:'stmarys', name:"Saint Mary's College Museum of Art", city:'Moraga', region:'East Bay', lat:37.84140, lng:-122.10920, hours:'Wed–Sun 11–4:30', walker:'yes', icom:'unknown', card:'walker', addr:'1928 St Marys Rd, Moraga, CA'},
    {key:'scmah', name:'Santa Cruz Museum of Art & History', city:'Santa Cruz', region:'Coast/Santa Cruz', lat:36.97448, lng:-122.02537, hours:'Thu–Sun 12–6', walker:'yes', icom:'unknown', card:'walker', addr:'705 Front St, Santa Cruz, CA'},
    {key:'ucsarb', name:'UC Santa Cruz Arboretum', city:'Santa Cruz', region:'Coast/Santa Cruz', lat:36.98271, lng:-122.06142, hours:'Daily 9–5', walker:'yes', icom:'unknown', card:'walker', addr:'1156 High St, Santa Cruz, CA'},
    {key:'scal', name:'Santa Cruz Art League', city:'Santa Cruz', region:'Coast/Santa Cruz', lat:36.97331, lng:-122.01710, hours:'Thu–Sun 12–5', walker:'yes', icom:'unknown', card:'walker', addr:'526 Broadway, Santa Cruz, CA'},
    {key:'seymour', name:'Seymour Marine Discovery Center', city:'Santa Cruz', region:'Coast/Santa Cruz', lat:36.94916, lng:-122.06487, hours:'Thu–Sun 10–4', walker:'yes', icom:'unknown', card:'walker', addr:'100 McAllister Way, Santa Cruz, CA'}
  ];

  var filters = { region:null, access:null };
  var sort = 'name', sortDir = 1;
  var view = 'map', selected = null, myLoc = null;

  function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

  function matches(m){
    if(filters.region && m.region!==filters.region) return false;
    if(filters.access){
      if(filters.access==='walker'){
        if(m.walker!=='yes' && m.walker!=='free') return false;
      } else if(filters.access==='icom'){
        if(m.icom!=='yes' && m.icom!=='likely') return false;
      } else if(filters.access==='free'){
        if(m.walker!=='free' && m.icom!=='free') return false;
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
        var va=a[sort], vb=b[sort];
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
    return {t:'No pass', c:'nl'};
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
    if(m.walker==='free'||m.icom==='free') h += '<span class="ms-badge free">Free entry</span>';
    return h;
  }

  var map, markers = {};

  function renderChips(){
    var reg={}, wal=0, ico=0, fre=0;
    MUSEUMS.forEach(function(m){
      reg[m.region]=(reg[m.region]||0)+1;
      if(m.walker==='yes'||m.walker==='free') wal++;
      if(m.icom==='yes'||m.icom==='likely') ico++;
      if(m.walker==='free'||m.icom==='free') fre++;
    });
    var regionList = Object.keys(reg).map(function(k){ return {val:k, n:reg[k]}; });
    chipContainer('msRegionChips','region', regionList);
    var accessList = [{val:'walker', n:wal, label:'Walker ✓'}, {val:'icom', n:ico, label:'ICOM ✓'}, {val:'free', n:fre, label:'Free'}];
    chipContainer('msAccessChips','access', accessList);
  }

  function chipContainer(id, field, list){
    var el = document.getElementById(id);
    var h = '<button class="ms-chip'+(filters[field]===null?' on':'')+'" data-f="'+field+'" data-v="">All <span class="ms-ct">'+MUSEUMS.length+'</span></button>';
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
        + '<div class="ms-list-item-meta">'+esc(m.city)+'</div>'
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
    {key:'walker', label:'Walker'},
    {key:'icom', label:'ICOM'},
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
      var wl = walkerLabel(m), il = icomLabel(m), cl = cardLabel(m);
      return '<tr class="ms-click" data-key="'+m.key+'">'
        + '<td><div class="ms-mname">'+esc(m.name)+'</div></td>'
        + '<td>'+esc(m.city)+'<div class="ms-cell-sub">'+esc(m.region)+'</div></td>'
        + '<td>'+esc(m.region)+'</td>'
        + '<td>'+esc(m.hours)+'</td>'
        + '<td class="ms-'+wl.c+'">'+wl.t+'</td>'
        + '<td class="ms-'+il.c+'">'+il.t+'</td>'
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
    el.innerHTML = Object.keys(REGION_COLOR).map(function(r){
      return '<span><span class="ms-dot" style="background:'+REGION_COLOR[r]+';width:10px;height:10px;border-radius:50%;display:inline-block"></span>'+r+'</span>';
    }).join('');
  }

  function showDetail(m){
    var inner = document.getElementById('msDetailInner');
    var wl = walkerLabel(m), ic = icomLabel(m), cl = cardLabel(m);
    inner.innerHTML = '<h3>'+esc(m.name)+'</h3>'
      + '<div class="ms-detail-nb">'+esc(m.city)+' · '+esc(m.region)+' · '+esc(m.addr)+'</div>'
      + '<p class="ms-hours">🕐 '+esc(m.hours)+'</p>'
      + '<div class="ms-details-grid">'
      + '<div class="ms-cell"><b>Walker Travelers</b>'+wl.t+(m.walker==='yes'?' (NARM/ROAM)':'')+'</div>'
      + '<div class="ms-cell"><b>ICOM</b>'+ic.t+'</div>'
      + '<div class="ms-cell"><b>Best card</b>'+cl.t+'</div>'
      + (m.walker==='free'||m.icom==='free'?'<div class="ms-cell"><b>Entry</b>Free</div>':'')
      + '</div>';
    document.getElementById('msDetail').classList.add('open');
  }
  function hideDetail(){
    document.getElementById('msDetail').classList.remove('open');
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
    if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }

  function setupMap(){
    map = L.map('msMap', {zoomControl:true}).setView([37.5, -122.1], 8);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution:'&copy; OpenStreetMap &copy; CARTO'
    }).addTo(map);
    MUSEUMS.forEach(function(m){
      var mk = L.marker([m.lat, m.lng], {icon: L.divIcon({className:'ms-pin', html:pinHTML(m), iconSize:[26,38], iconAnchor:[13,38], popupAnchor:[0,-34]})}).addTo(map);
      mk.bindPopup('<strong>'+esc(m.name)+'</strong>'+esc(m.city)+'<br><a data-goto="'+m.key+'">View details →</a>');
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
      var fg = L.featureGroup(visible.map(function(m){ return markers[m.key]; }).filter(Boolean));
      map.fitBounds(fg.getBounds().pad(0.08), {maxZoom:12});
    }
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
  }

  function bindChips(){
    ['region','access'].forEach(function(field){
      var elId = field==='region'?'msRegionChips':'msAccessChips';
      document.getElementById(elId).addEventListener('click', function(e){
        var chip = e.target.closest('.ms-chip');
        if(!chip) return;
        var val = chip.getAttribute('data-v');
        filters[field] = (filters[field]===val) ? null : val;
        selected = null; hideDetail();
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
