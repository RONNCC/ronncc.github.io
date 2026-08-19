---
layout: post
title: "Sandwich Spots in SF"
categories: ["2026"]
permalink: /sandwich-spots/
---

<style>
.ss-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:0;margin:0;line-height:1.5;color:#1a1a1a;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw;box-sizing:border-box}
.ss-app *{box-sizing:border-box}
@media(max-width:800px){.ss-app{margin:0;left:auto;right:auto;margin-left:0;margin-right:0;width:100%}}

/* ── 2-pane grid ── */
.ss-panes{display:grid;grid-template-columns:360px 1fr;height:calc(100vh - 80px);overflow:hidden;transition:grid-template-columns .25s ease}
.ss-panes.left-collapsed{grid-template-columns:40px 1fr}
@media(max-width:800px){.ss-panes{grid-template-columns:1fr;height:auto;overflow:auto}.ss-panes.left-collapsed{grid-template-columns:1fr}}
@media(min-width:1300px){.ss-panes{grid-template-columns:390px 1fr}}

/* ── left pane ── */
.ss-left{border-right:1px solid #e0e0e0;background:#fafafa;display:flex;flex-direction:column;min-height:0;overflow:hidden;position:relative;transition:all .25s ease}
.ss-panes.left-collapsed .ss-left{overflow:visible}
@media(max-width:800px){.ss-left{border-right:none;border-bottom:1px solid #e0e0e0;height:auto;overflow:auto}.ss-panes.left-collapsed .ss-left{height:auto}}
.ss-left-head{padding:14px 16px 12px;border-bottom:1px solid #e5e5e5;flex-shrink:0;background:#fff}
.ss-head-top{display:flex;align-items:flex-start;justify-content:space-between;gap:8px}
.ss-left-head h2{margin:0 0 2px;font-size:18px;font-weight:800;color:#1a1a1a}
.ss-left-head .ss-sub{font-size:12.5px;color:#777;margin:0 0 8px}
.ss-time-bar{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:600;color:#555;background:#f3f3f3;padding:3px 8px;border-radius:6px;margin-bottom:10px}
.ss-time-bar .ss-clock-icon{font-size:11px}

/* ── search bar ── */
.ss-search-wrap{position:relative;margin-bottom:10px}
.ss-search-input{width:100%;padding:7px 28px 7px 10px;border:1px solid #ddd;border-radius:8px;font-size:12.5px;font-family:inherit;background:#fff;outline:none;transition:border-color .15s}
.ss-search-input:focus{border-color:#c1440e;box-shadow:0 0 0 2px rgba(193,68,14,.12)}
.ss-search-clear{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#999;cursor:pointer;font-size:14px;display:none;padding:0;line-height:1}
.ss-search-clear.active{display:block}

/* ── filter chips ── */
.ss-filter-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.ss-chip{border:1px solid #ddd;background:#fff;color:#666;font:600 12px/1 inherit;padding:5px 10px;border-radius:999px;cursor:pointer;transition:all .12s;display:inline-flex;align-items:center;gap:4px;user-select:none}
.ss-chip:hover{border-color:#aaa;color:#333}
.ss-chip.on{background:#c1440e;border-color:#c1440e;color:#fff}
.ss-chip .ss-ct{margin-left:2px;opacity:.75;font-weight:700;font-size:11px}
.ss-chip-toggle{border:1px solid #2e7d32;color:#2e7d32;background:#f1f8f2}
.ss-chip-toggle:hover{background:#e2f2e5;border-color:#2e7d32}
.ss-chip-toggle.on{background:#2e7d32;border-color:#2e7d32;color:#fff}
.ss-chip-toggle.on .ss-dot-live{background:#fff}
.ss-dot-live{width:7px;height:7px;border-radius:50%;background:#2e7d32;display:inline-block}

/* ── spot list ── */
.ss-list{flex:1;overflow-y:auto;padding:8px;scrollbar-width:thin;scrollbar-color:#ccc transparent}
@media(max-width:800px){.ss-list{max-height:48vh}}
.ss-no-results{padding:24px 16px;text-align:center;color:#888;font-size:13.5px}

/* ── list item card ── */
.ss-item{display:flex;align-items:flex-start;gap:10px;padding:10px 12px;border-radius:10px;cursor:pointer;border:1px solid #ebebeb;background:#fff;margin-bottom:6px;transition:all .12s;position:relative}
.ss-item:hover{background:#fffaf6;border-color:#f2dacb;transform:translateY(-1px);box-shadow:0 2px 6px rgba(0,0,0,.04)}
.ss-item.on{background:#fcf1e9;border-color:#e8c3a4;box-shadow:inset 3px 0 0 #c1440e, 0 2px 8px rgba(193,68,14,.08)}

/* toggle check button in list */
.ss-check-btn{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-size:13px;flex-shrink:0;border:2px solid #ddd;background:#fff;color:#aaa;cursor:pointer;transition:all .15s;margin-top:2px;padding:0}
.ss-check-btn:hover{transform:scale(1.08)}
.ss-check-btn.visited{background:#e8f5e9;border-color:#4caf50;color:#2e7d32;font-weight:bold}
.ss-check-btn.notyet{background:#fff8ee;border-color:#ff9800;color:#e65100}

.ss-item-body{min-width:0;flex:1}
.ss-item-top{display:flex;align-items:baseline;justify-content:space-between;gap:6px;margin-bottom:2px}
.ss-item-name{font-weight:700;font-size:13.5px;color:#1a1a1a;line-height:1.25}
.ss-item-nb{font-size:10.5px;color:#888;text-transform:uppercase;letter-spacing:.04em;font-weight:600}
.ss-item-drink{font-size:12px;color:#555;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:4px;line-height:1.3}
.ss-item-meta{display:flex;align-items:center;flex-wrap:wrap;gap:5px;font-size:11px}

/* live hours pill in list */
.ss-hours-pill{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:6px;line-height:1.2}
.ss-hours-pill.open{background:#e8f5e9;color:#2e7d32;border:1px solid #c8e6c9}
.ss-hours-pill.closed{background:#fbe9e7;color:#c62828;border:1px solid #ffccbc}
.ss-hours-pill .ss-pill-dot{width:5px;height:5px;border-radius:50%}
.ss-hours-pill.open .ss-pill-dot{background:#2e7d32}
.ss-hours-pill.closed .ss-pill-dot{background:#c62828}

.ss-item-badge{font-size:10px;font-weight:700;padding:2px 6px;border-radius:6px;white-space:nowrap}
.ss-item-badge.visited{background:#e8f5e9;color:#2e7d32}
.ss-item-badge.notyet{background:#fff3e0;color:#e65100}

/* ── right pane ── */
.ss-right{display:flex;flex-direction:column;min-height:0;position:relative;overflow:hidden}
@media(max-width:800px){.ss-right{height:60vh}.ss-panes.left-collapsed .ss-right{height:calc(100vh - 60px)}}
.ss-map{flex:1;min-height:0}
.ss-map .leaflet-container{height:100%;width:100%}

/* ── detail panel ── */
.ss-detail{position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e0e0e0;box-shadow:0 -4px 24px rgba(0,0,0,.15);border-radius:14px 14px 0 0;transform:translateY(100%);transition:transform .25s ease;z-index:1000;max-height:65%;overflow-y:auto}
.ss-detail.open{transform:translateY(0)}
@media(max-width:800px){.ss-detail{max-height:75%;border-radius:16px 16px 0 0}}
.ss-detail-handle{width:36px;height:4px;background:#ddd;border-radius:2px;margin:10px auto 0;cursor:pointer}
.ss-detail-inner{padding:14px 20px 22px}

/* detail top bar */
.ss-detail-status-row{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.ss-detail-status-badge{display:inline-flex;align-items:center;gap:5px;font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px}
.ss-detail-status-badge.visited{background:#e8f5e9;color:#2e7d32}
.ss-detail-status-badge.notyet{background:#fff3e0;color:#e65100}

.ss-detail-toggle-btn{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;border:1px solid #ddd;background:#fff;cursor:pointer;transition:all .15s;font-family:inherit}
.ss-detail-toggle-btn:hover{border-color:#999;background:#f5f5f5}
.ss-detail-toggle-btn.is-visited{border-color:#4caf50;color:#2e7d32;background:#f1f8f2}
.ss-detail-toggle-btn.is-visited:hover{background:#e4f4e6}

.ss-detail h3{margin:0 0 2px;font-size:18px;font-weight:800;color:#1a1a1a}
.ss-detail-nb{font-size:11.5px;color:#888;text-transform:uppercase;letter-spacing:.04em;margin-bottom:12px;font-weight:600}

/* hours box in detail */
.ss-hours-box{background:#f9f9f9;border:1px solid #eee;border-radius:10px;padding:10px 14px;margin-bottom:12px}
.ss-hours-status-line{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;flex-wrap:wrap}
.ss-hours-live{display:inline-flex;align-items:center;gap:6px;font-size:13px;font-weight:800}
.ss-hours-live.open{color:#2e7d32}
.ss-hours-live.closed{color:#c62828}
.ss-hours-live .ss-dot-glow{width:8px;height:8px;border-radius:50%;display:inline-block}
.ss-hours-live.open .ss-dot-glow{background:#2e7d32;box-shadow:0 0 0 3px rgba(46,125,50,.2)}
.ss-hours-live.closed .ss-dot-glow{background:#c62828;box-shadow:0 0 0 3px rgba(198,40,40,.2)}
.ss-hours-summary{font-size:12px;color:#666;font-weight:600}
.ss-sched-table{width:100%;border-collapse:collapse;font-size:11.5px;margin-top:6px;color:#444}
.ss-sched-table td{padding:3px 4px;border-top:1px solid #ececec}
.ss-sched-table tr.ss-sched-today{font-weight:700;color:#1a1a1a;background:#fff3eb}
.ss-sched-table tr.ss-sched-today td:first-child::after{content:" (Today)";font-size:10px;color:#c1440e;font-weight:700;margin-left:4px}
.ss-sched-table td:last-child{text-align:right}

.ss-detail-drink{font-weight:700;font-size:14px;color:#c1440e;margin:0 0 10px;background:#fef6f2;padding:8px 12px;border-radius:8px;border:1px solid #fae1d2;line-height:1.4}
.ss-detail-drink::before{content:"🥪 Standout: ";font-weight:800}
.ss-detail-note{font-size:13.5px;color:#333;margin:0 0 10px;line-height:1.6}
.ss-detail-addr{font-size:12.5px;color:#666;margin:0 0 12px;display:flex;align-items:flex-start;gap:6px}
.ss-detail-addr a{color:#c1440e;text-decoration:none;font-weight:600}
.ss-detail-addr a:hover{text-decoration:underline}

.ss-detail-links{display:flex;flex-wrap:wrap;gap:6px;margin-top:6px}
.ss-detail-links a{font-size:12px;font-weight:600;text-decoration:none;background:#fbe9de;color:#c1440e;padding:5px 12px;border-radius:999px;border:1px solid #edc9ac;transition:all .12s}
.ss-detail-links a:hover{background:#f5dcc9;transform:translateY(-1px)}
.ss-detail-close{position:absolute;top:10px;right:14px;width:28px;height:28px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;display:grid;place-items:center;font-size:14px;color:#888;transition:all .12s}
.ss-detail-close:hover{background:#f5f5f5;color:#333}

/* ── legend on map ── */
.ss-map-legend{position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.94);backdrop-filter:blur(6px);border:1px solid #e0e0e0;border-radius:8px;padding:8px 12px;font-size:11px;color:#555;z-index:999;display:flex;flex-wrap:wrap;gap:10px;box-shadow:0 2px 8px rgba(0,0,0,.08)}
.ss-map-legend span{display:flex;align-items:center;gap:5px;font-weight:600}
.ss-map-legend .ss-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}

/* ── leaflet popup ── */
.ss-map .leaflet-popup-content{font-family:inherit;font-size:12.5px;line-height:1.4;margin:8px 12px}
.ss-map .leaflet-popup-content strong{display:block;font-size:14px;margin-bottom:2px;color:#1a1a1a}
.ss-popup-meta{font-size:11px;color:#777;margin-bottom:4px}
.ss-popup-hours{margin:4px 0 6px}
.ss-map .leaflet-popup-content a{color:#c1440e;font-weight:700;text-decoration:none;cursor:pointer}
.ss-map .leaflet-popup-content a:hover{text-decoration:underline}

/* ── custom colored pin markers ── */
.ss-map .ss-pin{background:transparent;border:none}
.ss-map .ss-pin svg{display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.35));transition:transform .15s}
.ss-map .ss-pin:hover svg{transform:scale(1.12)}

/* ── collapse toggle ── */
.ss-collapse-btn{position:absolute;top:10px;right:10px;z-index:20;width:30px;height:30px;border:none;background:#fff;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.12);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:#666;transition:background .12s}
.ss-collapse-btn:hover{background:#f0f0f0}
.ss-collapse-btn svg{width:16px;height:16px;transition:transform .25s ease}
.ss-panes.left-collapsed .ss-collapse-btn svg{transform:rotate(180deg)}
@media(max-width:800px){.ss-collapse-btn{display:none}}

/* ── collapsed left pane content ── */
.ss-panes.left-collapsed .ss-left-head{height:0;padding:0;overflow:hidden;border:none;margin:0}
.ss-panes.left-collapsed .ss-list{height:0;padding:0;overflow:hidden}

.ss-footer-note{max-width:900px;margin:16px auto 0;padding:0 20px;font-size:12.5px;color:#888;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px}
.ss-reset-btn{background:none;border:none;color:#999;text-decoration:underline;font-size:11.5px;cursor:pointer;padding:0}
.ss-reset-btn:hover{color:#c1440e}
</style>

<div class="ss-app">
<div class="ss-panes">

<!-- LEFT PANE -->
<div class="ss-left">
  <button class="ss-collapse-btn" id="ssCollapseBtn" title="Collapse/expand list">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <div class="ss-left-head">
    <div class="ss-head-top">
      <h2>Sandwich Spots</h2>
    </div>
    <p class="ss-sub">Best sandwiches in San Francisco · Infatuation SF roundup</p>
    
    <div class="ss-time-bar" id="ssTimeBar">
      <span class="ss-clock-icon">🕒</span>
      <span id="ssCurrentTimeText">SF Time: Loading...</span>
    </div>

    <!-- Search input -->
    <div class="ss-search-wrap">
      <input type="text" id="ssSearchInput" class="ss-search-input" placeholder="🔍 Search spots, neighborhood, sandwiches..." autocomplete="off" />
      <button class="ss-search-clear" id="ssSearchClear" title="Clear search">&times;</button>
    </div>

    <!-- Filter chips -->
    <div class="ss-filter-row">
      <button class="ss-chip on" data-status="all">All<span class="ss-ct" id="ctAll">22</span></button>
      <button class="ss-chip" data-status="notyet">○ Not yet<span class="ss-ct" id="ctNotyet">15</span></button>
      <button class="ss-chip" data-status="visited">✓ Visited<span class="ss-ct" id="ctVisited">7</span></button>
      <button class="ss-chip ss-chip-toggle" id="ssOpenNowToggle"><span class="ss-dot-live"></span>Open now<span class="ss-ct" id="ctOpenNow">0</span></button>
    </div>
  </div>
  <div class="ss-list" id="ssList"></div>
</div>

<!-- RIGHT PANE -->
<div class="ss-right">
  <div id="ssMap" class="ss-map"></div>
  <div class="ss-map-legend" id="ssMapLegend">
    <span><span class="ss-dot" style="background:#2e7d32"></span>Visited (<span id="legVisited">7</span>)</span>
    <span><span class="ss-dot" style="background:#c1440e"></span>Not yet (<span id="legNotyet">15</span>)</span>
    <span><span class="ss-dot-live"></span>Open Now (<span id="legOpenNow">0</span>)</span>
  </div>

  <!-- DETAIL PANEL -->
  <div class="ss-detail" id="ssDetail">
    <div class="ss-detail-handle" id="ssDetailClose"></div>
    <button class="ss-detail-close" id="ssDetailX" title="Close details">&times;</button>
    <div class="ss-detail-inner" id="ssDetailInner"></div>
  </div>
</div>

</div>
</div>

<div class="ss-footer-note">
  <span>
    Reference: <a href="https://www.theinfatuation.com/san-francisco/guides/best-sandwich-spots-in-sf" target="_blank" rel="noopener">The Infatuation — The Best Sandwich Spots In San Francisco</a> · Hours approximated via Google Maps/official listings.
  </span>
  <button class="ss-reset-btn" id="ssResetBtn" title="Reset visited marks to original defaults">Reset visited marks</button>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var STORAGE_KEY = 'sf_sandwiches_visited_v2';
  var DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var FULL_DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var SPOTS = [
    {key:'oceansubs', name:'Ocean Subs', nb:'Excelsior', lat:37.72416, lng:-122.43587,
     defaultStatus:'notyet', drink:'Classic subs on toasted dutch crunch, tangy herb vinaigrette',
     note:'Just four subs on the menu, but each is so balanced with salty cold cuts, herb vinaigrette, and a crunchy-yet-chewy dutch crunch roll that regulars call it the city\'s best. (Infatuation: 9.0)',
     addr:'18 Ocean Ave, San Francisco, CA 94112',
     hoursStr:'Tue–Sat 10:00 AM – 4:00 PM (Closed Sun–Mon)',
     schedule:{0:[], 1:[], 2:[[600,960]], 3:[[600,960]], 4:[[600,960]], 5:[[600,960]], 6:[[600,960]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/ocean-subs'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Ocean+Subs+18+Ocean+Ave+San+Francisco+CA+94112'}]},

    {key:'saigonsandwich', name:'Saigon Sandwich', nb:'Tenderloin', lat:37.7825, lng:-122.4166,
     defaultStatus:'visited', drink:'Bánh mì — widely considered the best in SF',
     note:'Cash-only Tenderloin institution for decades. Crackly fresh-baked rolls, well-spiced meat, mayo, pickled daikon and carrots — about $7 a sandwich. (Infatuation: 9.2)',
     addr:'560 Larkin St, San Francisco, CA 94102',
     hoursStr:'Mon–Tue 7:00 AM – 5:30 PM, Wed–Sun 7:00 AM – 6:00 PM',
     schedule:{0:[[420,1080]], 1:[[420,1050]], 2:[[420,1050]], 3:[[420,1080]], 4:[[420,1080]], 5:[[420,1080]], 6:[[420,1080]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/saigon-sandwich'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Saigon+Sandwich+560+Larkin+St+San+Francisco+CA+94102'}]},

    {key:'palmcity', name:'Palm City', nb:'Sunset', lat:37.7623709, lng:-122.5016052,
     defaultStatus:'notyet', drink:'Italian American hoagie — mortadella, \'nduja mayo, sesame roll',
     note:'A Sunset wine bar that also makes giant Philly-style hoagies. Fresh toppings like broccoli rabe and arugula keep the massive sandwiches tasting light. (Infatuation: 8.5)',
     addr:'4055 Irving St, San Francisco, CA 94122',
     hoursStr:'Mon–Tue 4:00 PM – 10:00 PM, Wed–Sun 12:30 PM – 9:00 PM',
     schedule:{0:[[750,1260]], 1:[[960,1320]], 2:[[960,1320]], 3:[[750,1260]], 4:[[750,1260]], 5:[[750,1260]], 6:[[750,1260]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/palm-city'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Palm+City+4055+Irving+St+San+Francisco+CA+94122'}]},

    {key:'deliboard', name:'Deli Board', nb:'SoMa', lat:37.77756, lng:-122.40703,
     defaultStatus:'notyet', drink:'Pastrami, plus a daily-changing specials board',
     note:'Tank-sized sandwiches stuffed with everything from corned beef to tuna salad and falafel. Get anything with pastrami, and always ask for the Board sauce. (Infatuation: 8.4)',
     addr:'1058 Folsom St, San Francisco, CA 94103',
     hoursStr:'Tue–Sun 11:00 AM – 3:00 PM (Closed Mon)',
     schedule:{0:[[660,900]], 1:[], 2:[[660,900]], 3:[[660,900]], 4:[[660,900]], 5:[[660,900]], 6:[[660,900]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/deli-board'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Deli+Board+1058+Folsom+St+San+Francisco+CA+94103'}]},

    {key:'outtasight', name:'Outta Sight Pizza', nb:'Tenderloin', lat:37.78184, lng:-122.41711,
     defaultStatus:'visited', drink:'Italian Combo — mortadella, pepperoni, ham, coppa',
     note:'Known for pizza, but the towering sandwiches deserve just as much attention. Watch for seasonal specials like the tuna melt and Green Gobbler. (Infatuation: 9.1)',
     addr:'422 Larkin St, San Francisco, CA 94102',
     hoursStr:'Daily 11:00 AM – 9:00 PM',
     schedule:{0:[[660,1260]], 1:[[660,1260]], 2:[[660,1260]], 3:[[660,1260]], 4:[[660,1260]], 5:[[660,1260]], 6:[[660,1260]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/outta-sight'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Outta+Sight+Pizza+422+Larkin+St+San+Francisco+CA+94102'}]},

    {key:'louscafe', name:'Lou\'s Cafe', nb:'Richmond', lat:37.78043, lng:-122.47328,
     defaultStatus:'notyet', drink:'Tuna melt with garlic aioli',
     note:'Family-run Richmond spot (also FiDi & Parkside) known for big subs — tuna melt, hot pastrami brisket, meatballs in housemade marinara. (Infatuation: 8.8)',
     addr:'5017 Geary Blvd, San Francisco, CA 94118',
     hoursStr:'Mon–Fri 8:00 AM – 7:00 PM, Sat 8:00 AM – 4:00 PM, Sun 9:00 AM – 4:00 PM',
     schedule:{0:[[540,960]], 1:[[480,1140]], 2:[[480,1140]], 3:[[480,1140]], 4:[[480,1140]], 5:[[480,1140]], 6:[[480,960]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/lous-cafe'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Lous+Cafe+5017+Geary+Blvd+San+Francisco+CA+94118'}]},

    {key:'lucindasdeli', name:'Lucinda\'s Deli & More', nb:'NoPa', lat:37.7747912, lng:-122.4362738,
     defaultStatus:'notyet', drink:'Spicy tuna melt — jalapeños, cheddar, arugula, tomato',
     note:'Baguette sandwiches near Alamo Square stuffed burrito-thick, with expertly balanced salt, sweet, and spice. (Infatuation: 8.2)',
     addr:'535 Scott St, San Francisco, CA 94117',
     hoursStr:'Tue–Fri 11:00 AM – 4:00 PM, Sat 10:00 AM – 4:00 PM, Sun 11:00 AM – 3:00 PM (Closed Mon)',
     schedule:{0:[[660,900]], 1:[], 2:[[660,960]], 3:[[660,960]], 4:[[660,960]], 5:[[660,960]], 6:[[600,960]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/lucindas-deli-and-more'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Lucindas+Deli+535+Scott+St+San+Francisco+CA+94117'}]},

    {key:'saltys', name:'Salty\'s', nb:'Civic Center', lat:37.7824536, lng:-122.4204318,
     defaultStatus:'notyet', drink:'The Glorious Bastard — turkey, ham, garlic mayo',
     note:'Gargantuan sandwiches near Van Ness. Also a simple, delicious egg-cheese-chipotle-maple-mayo breakfast sandwich before the lunch rush. (Infatuation: 8.4)',
     addr:'748 Van Ness Ave, San Francisco, CA 94102',
     hoursStr:'Mon–Fri 7:00 AM – 2:30 PM (Closed Sat–Sun)',
     schedule:{0:[], 1:[[420,870]], 2:[[420,870]], 3:[[420,870]], 4:[[420,870]], 5:[[420,870]], 6:[]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/salty-s'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Saltys+748+Van+Ness+Ave+San+Francisco+CA+94102'}]},

    {key:'sandys', name:'Sandy\'s', nb:'Haight', lat:37.76991, lng:-122.44632,
     defaultStatus:'visited', drink:'Muffuletta — original or mushroom, Duke\'s mayo, giardiniera',
     note:'SF\'s muffuletta king. Sesame bread made specially by an Oakland bakery, a thick spicy olive spread, and fermented cauliflower-carrot giardiniera. (Infatuation: 9.0)',
     addr:'1457 Haight St, San Francisco, CA 94117',
     hoursStr:'Mon–Thu 11:00 AM – 4:00 PM, Fri 11:00 AM – 5:00 PM, Sat–Sun 10:00 AM – 5:00 PM',
     schedule:{0:[[600,1020]], 1:[[660,960]], 2:[[660,960]], 3:[[660,960]], 4:[[660,960]], 5:[[660,1020]], 6:[[600,1020]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/sandys'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Sandys+1457+Haight+St+San+Francisco+CA+94117'}]},

    {key:'latortagorda', name:'La Torta Gorda', nb:'Mission', lat:37.7524, lng:-122.4085,
     defaultStatus:'visited', drink:'Mega Cubana torta — milanesa, sausage, pierna, ham, chorizo, egg, turkey, two cheeses',
     note:'Tortas live up to the oversized name. The Mega Cubana is large enough to feed five or six people; comes in junior or regular size.',
     addr:'2833 24th St, San Francisco, CA 94110',
     hoursStr:'Mon–Fri 9:00 AM – 6:00 PM, Sat–Sun 10:00 AM – 4:00 PM',
     schedule:{0:[[600,960]], 1:[[540,1080]], 2:[[540,1080]], 3:[[540,1080]], 4:[[540,1080]], 5:[[540,1080]], 6:[[600,960]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/la-torta-gorda'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=La+Torta+Gorda+2833+24th+St+San+Francisco+CA+94110'}]},

    {key:'newkirks', name:'Newkirk\'s', nb:'Mission', lat:37.75595, lng:-122.40672,
     defaultStatus:'notyet', drink:'BEC — bacon, egg, American cheese',
     note:'East Coast-style breakfast/deli sandwiches. The BEC is a gooey, salty wake-up call; also pastrami, grilled ribeye, and hash browns. (Infatuation: 8.0)',
     addr:'1006 Potrero Ave, San Francisco, CA 94110',
     hoursStr:'Tue–Fri 8:00 AM – 3:00 PM, Sat 9:00 AM – 2:00 PM, Sun 9:00 AM – 1:00 PM (Closed Mon)',
     schedule:{0:[[540,780]], 1:[], 2:[[480,900]], 3:[[480,900]], 4:[[480,900]], 5:[[480,900]], 6:[[540,840]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/newkirks'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Newkirks+1006+Potrero+Ave+San+Francisco+CA+94110'}]},

    {key:'oinkandoscar', name:'Oink & Oscar', nb:'SoMa', lat:37.7852313, lng:-122.4037583,
     defaultStatus:'notyet', drink:'Porkstrami — smoky pork butt in most of the 16 sandwiches',
     note:'Fist-thick sandwiches; the porkstrami is the standout. Try the Oscar\'s Wild (hot honey butter) or The Morris Method (BBQ + jalapeño pickles). (Infatuation: 8.3)',
     addr:'87 Yerba Buena Ln, San Francisco, CA 94103',
     hoursStr:'Daily 11:00 AM – 2:00 PM',
     schedule:{0:[[660,840]], 1:[[660,840]], 2:[[660,840]], 3:[[660,840]], 4:[[660,840]], 5:[[660,840]], 6:[[660,840]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/oink-and-oscar'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Oink+and+Oscar+87+Yerba+Buena+Ln+San+Francisco+CA+94103'}]},

    {key:'boysdeli', name:'The Boys\' Deli', nb:'Russian Hill', lat:37.7975, lng:-122.4217,
     defaultStatus:'notyet', drink:'Spitfire — rotisserie chicken, bacon, jalapeños, sriracha mayo',
     note:'A counter inside Polk Street Market. Also check the rotating specials: brown sugar tri-tip or pulled rotisserie chicken with coleslaw and chipotle mayo. (Infatuation: 8.4)',
     addr:'2222 Polk St, San Francisco, CA 94109',
     hoursStr:'Mon–Sat 9:00 AM – 8:00 PM, Sun 9:00 AM – 7:00 PM',
     schedule:{0:[[540,1140]], 1:[[540,1200]], 2:[[540,1200]], 3:[[540,1200]], 4:[[540,1200]], 5:[[540,1200]], 6:[[540,1200]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-boys-deli'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=The+Boys+Deli+2222+Polk+St+San+Francisco+CA+94109'}]},

    {key:'cielitolindo', name:'Cielito Lindo', nb:'Richmond', lat:37.7759806, lng:-122.4959281,
     defaultStatus:'notyet', drink:'Milanesa or carne asada torta',
     note:'Known for quesabirria tacos, but the nine tortas — queso fresco, always — are huge and shouldn\'t be slept on. (Infatuation: 8.2)',
     addr:'3440 Balboa St, San Francisco, CA 94121',
     hoursStr:'Daily 8:30 AM – 7:30 PM',
     schedule:{0:[[510,1170]], 1:[[510,1170]], 2:[[510,1170]], 3:[[510,1170]], 4:[[510,1170]], 5:[[510,1170]], 6:[[510,1170]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/cielito-lindo'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Cielito+Lindo+3440+Balboa+St+San+Francisco+CA+94121'}]},

    {key:'yellowsubmarine', name:'The Yellow Submarine', nb:'Sunset', lat:37.7640406, lng:-122.4632773,
     defaultStatus:'notyet', drink:'Italian Combo — cold cuts, vinegar-dressed lettuce',
     note:'Decades-old sub shop near Golden Gate Park. Cafeteria-style dining room; cash only.',
     addr:'503 Irving St, San Francisco, CA 94122',
     hoursStr:'Tue–Sat 11:00 AM – 6:00 PM, Sun 11:00 AM – 5:00 PM (Closed Mon)',
     schedule:{0:[[660,1020]], 1:[], 2:[[660,1080]], 3:[[660,1080]], 4:[[660,1080]], 5:[[660,1080]], 6:[[660,1080]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-yellow-submarine'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=The+Yellow+Submarine+503+Irving+St+San+Francisco+CA+94122'}]},

    {key:'doloresdeluxe', name:'Dolores Deluxe', nb:'Mission', lat:37.75512, lng:-122.42573,
     defaultStatus:'visited', drink:'Mole rotisserie chicken, or pastrami with spinach-artichoke dip',
     note:'A corner store near Dolores Park with a frequently rotating menu. Don\'t skip the leek omelette breakfast sandwich with spicy tomato jam.',
     addr:'3500 22nd St, San Francisco, CA 94114',
     hoursStr:'Daily 7:30 AM – 7:00 PM',
     schedule:{0:[[450,1140]], 1:[[450,1140]], 2:[[450,1140]], 3:[[450,1140]], 4:[[450,1140]], 5:[[450,1140]], 6:[[450,1140]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/dolores-deluxe'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Dolores+Deluxe+3500+22nd+St+San+Francisco+CA+94114'}]},

    {key:'thehornet', name:'The Hornet', nb:'Pacific Heights', lat:37.7888729, lng:-122.4407675,
     defaultStatus:'notyet', drink:'Daily rotating menu — roasted pork & broccolini, or turkey/ham/bacon with banana peppers',
     note:'Takeout counter inside London Market. Consistently good despite the daily-changing menu — order online in case they sell out early. (Infatuation: 8.3)',
     addr:'2901 Sacramento St, San Francisco, CA 94115',
     hoursStr:'Wed–Sat 11:30 AM – 3:30 PM (Closed Sun–Tue)',
     schedule:{0:[], 1:[], 2:[], 3:[[690,930]], 4:[[690,930]], 5:[[690,930]], 6:[[690,930]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-hornet-sf'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=The+Hornet+2901+Sacramento+St+San+Francisco+CA+94115'}]},

    {key:'guerraqualitymeats', name:'Guerra Quality Meats', nb:'Parkside', lat:37.74339, lng:-122.4712239,
     defaultStatus:'notyet', drink:'Sicilian — hot coppa, salami, provolone, tomato, lettuce, jalapeños',
     note:'Longstanding Italian butcher shop. Get it on a dutch crunch roll — buttery, dark golden brown, with a soft crackly top. (Infatuation: 8.0)',
     addr:'490 Taraval St, San Francisco, CA 94116',
     hoursStr:'Mon–Fri 9:00 AM – 7:00 PM, Sat–Sun 9:00 AM – 6:00 PM',
     schedule:{0:[[540,1080]], 1:[[540,1140]], 2:[[540,1140]], 3:[[540,1140]], 4:[[540,1140]], 5:[[540,1140]], 6:[[540,1080]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/guerra-quality-meats'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Guerra+Quality+Meats+490+Taraval+St+San+Francisco+CA+94116'}]},

    {key:'kp49', name:'KP49', nb:'Union Square', lat:37.7889, lng:-122.4038,
     defaultStatus:'visited', drink:'Beef bourguignon sandwich',
     note:'One sandwich, done extremely well — slow-braised beef, caramelized onions and mushrooms, tangy house sauce. Eat fast before the panini bread gets soggy; chicken version available too.',
     addr:'49 Kearny St, San Francisco, CA 94108',
     hoursStr:'Mon–Fri 7:00 AM – 6:00 PM, Sat 8:30 AM – 5:00 PM, Sun 10:00 AM – 4:00 PM',
     schedule:{0:[[600,960]], 1:[[420,1080]], 2:[[420,1080]], 3:[[420,1080]], 4:[[420,1080]], 5:[[420,1080]], 6:[[510,1020]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/kp49'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=KP49+Sandwiches+49+Kearny+St+San+Francisco+CA+94108'}]},

    {key:'arguellomarket', name:'Arguello Market', nb:'Richmond', lat:37.775658, lng:-122.4581416,
     defaultStatus:'notyet', drink:'Roasted turkey sandwich on a dutch crunch roll',
     note:'A Richmond grocery store nicknamed "The Turkey Sandwich Emporium." Also has housemade pastas and salads — stock up on drinks and chips too.',
     addr:'782 Arguello Blvd, San Francisco, CA 94118',
     hoursStr:'Mon–Sat 7:30 AM – 8:00 PM, Sun 7:30 AM – 7:00 PM',
     schedule:{0:[[450,1140]], 1:[[450,1200]], 2:[[450,1200]], 3:[[450,1200]], 4:[[450,1200]], 5:[[450,1200]], 6:[[450,1200]]},
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/arguello-market'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Arguello+Market+782+Arguello+Blvd+San+Francisco+CA+94118'}]},

    {key:'guerreromarket', name:'Guerrero Market & Deli', nb:'Mission', lat:37.75989, lng:-122.42351,
     defaultStatus:'visited', drink:'Roast pork banh mi, or a classic deli sandwich',
     note:'Mission District grocery & deli. Updated August 2026 — roast pork banh mi was great, fresh baguette and good balance of flavors.',
     addr:'701 Guerrero St, San Francisco, CA 94110',
     hoursStr:'Mon 11:00 AM – 8:00 PM, Tue–Sat 11:00 AM – 8:30 PM, Sun 11:00 AM – 8:00 PM',
     schedule:{0:[[660,1200]], 1:[[660,1200]], 2:[[660,1230]], 3:[[660,1230]], 4:[[660,1230]], 5:[[660,1230]], 6:[[660,1230]]},
     links:[{t:'Yelp',u:'https://www.yelp.com/biz/guerrero-market-and-deli-san-francisco'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=Guerrero+Market+and+Deli+701+Guerrero+St+San+Francisco+CA+94110'}]},

    {key:'sfmeatco', name:'SF Meat Co.', nb:'Hayes Valley', lat:37.77604, lng:-122.42316,
     defaultStatus:'notyet', drink:'Mortadella muffaletta, or house meatball on Dutch crunch',
     note:'Hayes Valley butcher shop (est. 2023) at 320 Fell making generous sandwiches on freshly baked Boudin bread — Dutch crunch, sweet roll, rye, or sourdough. Mortadella muffaletta and house meatballs are the crowd-pleasers; also a Reuben, roast beef, and build-your-own.',
     addr:'320 Fell St, San Francisco, CA 94102',
     hoursStr:'Daily 10:00 AM – 6:00 PM',
     schedule:{0:[[600,1080]], 1:[[600,1080]], 2:[[600,1080]], 3:[[600,1080]], 4:[[600,1080]], 5:[[600,1080]], 6:[[600,1080]]},
     links:[{t:'Menu',u:'https://sfmeatco.com/menu'},
            {t:'Yelp',u:'https://www.yelp.com/biz/san-francisco-meat-co-san-francisco-7'},
            {t:'Directions',u:'https://www.google.com/maps/search/?api=1&query=San+Francisco+Meat+Co+320+Fell+St+San+Francisco+CA+94102'}]}
  ];

  /* ── User Visited state from localStorage ── */
  function loadVisitedOverrides(){
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch(e){
      return {};
    }
  }

  function saveVisitedOverride(key, status){
    try {
      var overrides = loadVisitedOverrides();
      overrides[key] = status;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
    } catch(e){}
  }

  function clearAllOverrides(){
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch(e){}
  }

  function getSpotStatus(spot){
    var overrides = loadVisitedOverrides();
    if(overrides && typeof overrides[spot.key] === 'string'){
      return overrides[spot.key];
    }
    return spot.defaultStatus;
  }

  /* ── SF Time calculation & Open/Closed evaluation ── */
  function getSFTime(){
    var str = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });
    var d = new Date(str);
    return {
      day: d.getDay(),
      minutes: d.getHours() * 60 + d.getMinutes(),
      hours: d.getHours(),
      mins: d.getMinutes(),
      date: d
    };
  }

  function formatTimeMinutes(mins){
    var h = Math.floor(mins / 60);
    var m = mins % 60;
    var ampm = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 || 12;
    return m === 0 ? (h12 + " " + ampm) : (h12 + ":" + (m < 10 ? "0" : "") + m + " " + ampm);
  }

  function getOpenStatus(spot, sfTime){
    if(!sfTime) sfTime = getSFTime();
    var schedule = spot.schedule || {};
    var todayIntervals = schedule[sfTime.day] || [];

    for(var i = 0; i < todayIntervals.length; i++){
      var iv = todayIntervals[i];
      if(sfTime.minutes >= iv[0] && sfTime.minutes < iv[1]){
        var minsLeft = iv[1] - sfTime.minutes;
        var closingSoon = minsLeft <= 45;
        return {
          isOpen: true,
          badgeClass: 'open',
          statusText: closingSoon ? 'Closes soon' : 'Open now',
          detailText: 'Closes at ' + formatTimeMinutes(iv[1]),
          fullText: 'Open now · Closes at ' + formatTimeMinutes(iv[1])
        };
      }
    }

    // If later today
    for(var j = 0; j < todayIntervals.length; j++){
      var ivNext = todayIntervals[j];
      if(sfTime.minutes < ivNext[0]){
        return {
          isOpen: false,
          badgeClass: 'closed',
          statusText: 'Closed',
          detailText: 'Opens today at ' + formatTimeMinutes(ivNext[0]),
          fullText: 'Closed · Opens today at ' + formatTimeMinutes(ivNext[0])
        };
      }
    }

    // Next opening over the next 7 days
    for(var offset = 1; offset <= 7; offset++){
      var nextDay = (sfTime.day + offset) % 7;
      var intervals = schedule[nextDay] || [];
      if(intervals.length > 0){
        var dayLabel = (offset === 1) ? 'tomorrow' : DAY_NAMES[nextDay];
        return {
          isOpen: false,
          badgeClass: 'closed',
          statusText: 'Closed',
          detailText: 'Opens ' + dayLabel + ' at ' + formatTimeMinutes(intervals[0][0]),
          fullText: 'Closed · Opens ' + dayLabel + ' at ' + formatTimeMinutes(intervals[0][0])
        };
      }
    }

    return {
      isOpen: false,
      badgeClass: 'closed',
      statusText: 'Closed',
      detailText: 'Currently closed',
      fullText: 'Closed'
    };
  }

  function formatScheduleForDay(intervals){
    if(!intervals || intervals.length === 0) return 'Closed';
    return intervals.map(function(iv){
      return formatTimeMinutes(iv[0]) + ' – ' + formatTimeMinutes(iv[1]);
    }).join(', ');
  }

  /* ── Filter state ── */
  var statusFilter = 'all'; // 'all' | 'visited' | 'notyet'
  var openNowFilter = false; // boolean
  var searchQuery = '';
  var selectedKey = null;

  function matches(s){
    var currentStatus = getSpotStatus(s);
    if(statusFilter !== 'all' && currentStatus !== statusFilter) return false;

    var openInfo = getOpenStatus(s);
    if(openNowFilter && !openInfo.isOpen) return false;

    if(searchQuery){
      var q = searchQuery.toLowerCase();
      var searchable = (s.name + ' ' + s.nb + ' ' + s.drink + ' ' + s.note + ' ' + s.addr).toLowerCase();
      if(searchable.indexOf(q) === -1) return false;
    }

    return true;
  }

  function filtered(){
    return SPOTS.filter(matches);
  }

  function updateCounts(){
    var sfTime = getSFTime();
    var allCt = SPOTS.length;
    var visCt = 0;
    var notCt = 0;
    var openCt = 0;

    SPOTS.forEach(function(s){
      var st = getSpotStatus(s);
      if(st === 'visited') visCt++; else notCt++;
      var op = getOpenStatus(s, sfTime);
      if(op.isOpen) openCt++;
    });

    document.getElementById('ctAll').textContent = allCt;
    document.getElementById('ctVisited').textContent = visCt;
    document.getElementById('ctNotyet').textContent = notCt;
    document.getElementById('ctOpenNow').textContent = openCt;

    document.getElementById('legVisited').textContent = visCt;
    document.getElementById('legNotyet').textContent = notCt;
    document.getElementById('legOpenNow').textContent = openCt;

    // Time text
    var timeFormatted = sfTime.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    var dayFormatted = FULL_DAY_NAMES[sfTime.day];
    document.getElementById('ssCurrentTimeText').textContent = 'SF Time: ' + dayFormatted + ' ' + timeFormatted;
  }

  function escapeHTML(str){
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  /* ── List rendering ── */
  function renderList(){
    var list = document.getElementById('ssList');
    var items = filtered();
    var sfTime = getSFTime();

    if(items.length === 0){
      list.innerHTML = '<div class="ss-no-results">No sandwich spots found matching your filter criteria.</div>';
      return;
    }

    list.innerHTML = items.map(function(s){
      var currentStatus = getSpotStatus(s);
      var openInfo = getOpenStatus(s, sfTime);
      var isVis = (currentStatus === 'visited');
      var checkIcon = isVis ? '✓' : '○';
      var badgeText = isVis ? 'Visited' : 'Not yet';

      return '<div class="ss-item' + (selectedKey === s.key ? ' on' : '') + '" data-key="' + s.key + '">'
        + '<button class="ss-check-btn ' + currentStatus + '" data-toggle="' + s.key + '" title="Click to mark as ' + (isVis ? 'not visited' : 'visited') + '">' + checkIcon + '</button>'
        + '<div class="ss-item-body">'
        +   '<div class="ss-item-top">'
        +     '<span class="ss-item-name">' + escapeHTML(s.name) + '</span>'
        +     '<span class="ss-item-nb">' + escapeHTML(s.nb) + '</span>'
        +   '</div>'
        +   '<div class="ss-item-drink">' + escapeHTML(s.drink) + '</div>'
        +   '<div class="ss-item-meta">'
        +     '<span class="ss-hours-pill ' + openInfo.badgeClass + '"><span class="ss-pill-dot"></span>' + openInfo.fullText + '</span>'
        +     '<span class="ss-item-badge ' + currentStatus + '">' + badgeText + '</span>'
        +   '</div>'
        + '</div>'
        + '</div>';
    }).join('');

    list.querySelectorAll('.ss-item').forEach(function(el){
      el.addEventListener('click', function(e){
        if(e.target.closest('.ss-check-btn')) return; // handled by check button
        var key = el.getAttribute('data-key');
        select(key);
      });
    });

    list.querySelectorAll('.ss-check-btn').forEach(function(btn){
      btn.addEventListener('click', function(e){
        e.stopPropagation();
        var key = btn.getAttribute('data-toggle');
        toggleSpotVisited(key);
      });
    });
  }

  /* ── Detail Panel rendering ── */
  function showDetail(s){
    var inner = document.getElementById('ssDetailInner');
    var currentStatus = getSpotStatus(s);
    var sfTime = getSFTime();
    var openInfo = getOpenStatus(s, sfTime);
    var isVis = (currentStatus === 'visited');

    var links = s.links.map(function(l){
      return '<a href="' + l.u + '" target="_blank" rel="noopener">' + escapeHTML(l.t) + ' ↗</a>';
    }).join('');

    // Build 7-day schedule rows
    var scheduleRows = '';
    for(var dayIdx = 0; dayIdx < 7; dayIdx++){
      var isToday = (dayIdx === sfTime.day);
      var dayName = FULL_DAY_NAMES[dayIdx];
      var schedStr = formatScheduleForDay(s.schedule[dayIdx]);
      scheduleRows += '<tr class="' + (isToday ? 'ss-sched-today' : '') + '">'
        + '<td>' + dayName + '</td>'
        + '<td>' + schedStr + '</td>'
        + '</tr>';
    }

    inner.innerHTML = '<div class="ss-detail-status-row">'
      + '<span class="ss-detail-status-badge ' + currentStatus + '">' + (isVis ? '✓ Visited' : '○ Not yet visited') + '</span>'
      + '<button class="ss-detail-toggle-btn' + (isVis ? ' is-visited' : '') + '" id="ssDetailToggleBtn">'
      +   (isVis ? 'Mark as Not Visited' : '✓ Mark as Visited')
      + '</button>'
      + '</div>'
      + '<h3>' + escapeHTML(s.name) + '</h3>'
      + '<div class="ss-detail-nb">' + escapeHTML(s.nb) + ' · San Francisco</div>'
      
      + '<div class="ss-hours-box">'
      +   '<div class="ss-hours-status-line">'
      +     '<span class="ss-hours-live ' + openInfo.badgeClass + '"><span class="ss-dot-glow"></span>' + openInfo.fullText + '</span>'
      +     '<span class="ss-hours-summary">' + escapeHTML(s.hoursStr) + '</span>'
      +   '</div>'
      +   '<table class="ss-sched-table"><tbody>' + scheduleRows + '</tbody></table>'
      + '</div>'

      + '<div class="ss-detail-drink">' + escapeHTML(s.drink) + '</div>'
      + '<p class="ss-detail-note">' + escapeHTML(s.note) + '</p>'
      + '<p class="ss-detail-addr"><span>📍</span><span>' + escapeHTML(s.addr) + ' (<a href="https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(s.name + ' ' + s.addr) + '" target="_blank" rel="noopener">Directions on Google Maps</a>)</span></p>'
      + '<div class="ss-detail-links">' + links + '</div>';

    document.getElementById('ssDetail').classList.add('open');

    var toggleBtn = document.getElementById('ssDetailToggleBtn');
    if(toggleBtn){
      toggleBtn.addEventListener('click', function(){
        toggleSpotVisited(s.key);
      });
    }
  }

  function hideDetail(){
    document.getElementById('ssDetail').classList.remove('open');
  }

  /* ── Map Setup & Markers ── */
  var map = L.map('ssMap', {zoomControl:true}).setView([37.771, -122.443], 12.5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:'&copy; OpenStreetMap &copy; CARTO'
  }).addTo(map);

  var STATUS_COLOR = {visited: '#2e7d32', notyet: '#c1440e'};

  function createMarkerIcon(status){
    var color = STATUS_COLOR[status] || STATUS_COLOR.notyet;
    var innerSymbol = (status === 'visited')
      ? '<path d="M10 14.5l2.5 2.5 5.5-5.5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>'
      : '<circle cx="14" cy="14" r="4.5" fill="#fff"/>';

    return L.divIcon({
      className: 'ss-pin ss-pin-' + status,
      html: '<svg width="30" height="42" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">'
        + '<path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="' + color + '" stroke="#fff" stroke-width="1.8"/>'
        + innerSymbol
        + '</svg>',
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -38]
    });
  }

  var markers = {};
  SPOTS.forEach(function(s){
    if(s.lat === null) return;
    var currentStatus = getSpotStatus(s);
    var m = L.marker([s.lat, s.lng], {icon: createMarkerIcon(currentStatus)}).addTo(map);

    function updatePopupContent(){
      var st = getSpotStatus(s);
      var sfTime = getSFTime();
      var op = getOpenStatus(s, sfTime);
      var popupHTML = '<strong>' + escapeHTML(s.name) + '</strong>'
        + '<div class="ss-popup-meta">' + escapeHTML(s.nb) + ' · <span style="color:' + (st === 'visited' ? '#2e7d32' : '#c1440e') + ';font-weight:700">' + (st === 'visited' ? '✓ Visited' : '○ Not yet') + '</span></div>'
        + '<div class="ss-popup-hours"><span class="ss-hours-pill ' + op.badgeClass + '"><span class="ss-pill-dot"></span>' + op.fullText + '</span></div>'
        + '<div style="margin-top:6px"><a data-goto="' + s.key + '">View details & menu →</a></div>';
      m.setPopupContent(popupHTML);
    }

    m.bindPopup('');
    m.on('popupopen', function(){
      updatePopupContent();
      var link = document.querySelector('.leaflet-popup a[data-goto="' + s.key + '"]');
      if(link) link.addEventListener('click', function(e){ e.preventDefault(); select(s.key); });
    });
    m.on('click', function(){ select(s.key); });
    markers[s.key] = m;
  });

  function refreshMapMarkers(){
    var visible = filtered();
    SPOTS.forEach(function(s){
      var m = markers[s.key];
      if(!m) return;
      var currentStatus = getSpotStatus(s);
      m.setIcon(createMarkerIcon(currentStatus));

      var isVisible = (visible.indexOf(s) >= 0);
      if(isVisible){
        m.addTo(map);
      } else {
        map.removeLayer(m);
      }
    });

    if(visible.length > 0){
      var activeMarkers = visible.map(function(s){ return markers[s.key]; }).filter(Boolean);
      if(activeMarkers.length){
        var fg = L.featureGroup(activeMarkers);
        map.fitBounds(fg.getBounds().pad(0.12), {maxZoom: 14});
      }
    }
  }

  function select(key){
    selectedKey = key;
    renderList();
    var s = SPOTS.find(function(x){ return x.key === key; });
    if(!s) return;
    if(markers[key]){
      markers[key].openPopup();
      map.setView([s.lat, s.lng], 14, {animate:true});
    }
    showDetail(s);
    var el = document.querySelector('.ss-item[data-key="' + key + '"]');
    if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
  }

  function toggleSpotVisited(key){
    var s = SPOTS.find(function(x){ return x.key === key; });
    if(!s) return;
    var current = getSpotStatus(s);
    var next = (current === 'visited') ? 'notyet' : 'visited';
    saveVisitedOverride(key, next);

    updateCounts();
    renderList();
    refreshMapMarkers();
    if(selectedKey === key){
      showDetail(s);
    }
  }

  /* ── Filter events ── */
  document.querySelectorAll('.ss-chip[data-status]').forEach(function(chip){
    chip.addEventListener('click', function(){
      statusFilter = chip.getAttribute('data-status');
      document.querySelectorAll('.ss-chip[data-status]').forEach(function(c){ c.classList.remove('on'); });
      chip.classList.add('on');
      selectedKey = null;
      hideDetail();
      renderList();
      refreshMapMarkers();
    });
  });

  var openNowBtn = document.getElementById('ssOpenNowToggle');
  openNowBtn.addEventListener('click', function(){
    openNowFilter = !openNowFilter;
    openNowBtn.classList.toggle('on', openNowFilter);
    selectedKey = null;
    hideDetail();
    renderList();
    refreshMapMarkers();
  });

  var searchInput = document.getElementById('ssSearchInput');
  var searchClear = document.getElementById('ssSearchClear');

  searchInput.addEventListener('input', function(e){
    searchQuery = e.target.value.trim();
    searchClear.classList.toggle('active', searchQuery.length > 0);
    renderList();
    refreshMapMarkers();
  });

  searchClear.addEventListener('click', function(){
    searchInput.value = '';
    searchQuery = '';
    searchClear.classList.remove('active');
    renderList();
    refreshMapMarkers();
  });

  /* ── Reset button ── */
  document.getElementById('ssResetBtn').addEventListener('click', function(){
    if(confirm('Reset all visited markings back to default?')){
      clearAllOverrides();
      updateCounts();
      renderList();
      refreshMapMarkers();
      if(selectedKey){
        var s = SPOTS.find(function(x){ return x.key === selectedKey; });
        if(s) showDetail(s);
      }
    }
  });

  /* ── Detail close events ── */
  document.getElementById('ssDetailClose').addEventListener('click', function(){
    selectedKey = null; hideDetail(); renderList();
  });
  document.getElementById('ssDetailX').addEventListener('click', function(){
    selectedKey = null; hideDetail(); renderList();
  });

  /* ── Collapse toggle ── */
  document.getElementById('ssCollapseBtn').addEventListener('click', function(){
    document.querySelector('.ss-panes').classList.toggle('left-collapsed');
    setTimeout(function(){ map.invalidateSize(); }, 300);
  });

  /* ── Auto-refresh clock & status every minute ── */
  setInterval(function(){
    updateCounts();
    renderList();
  }, 60000);

  // Initial load
  updateCounts();
  renderList();
  refreshMapMarkers();
})();
</script>
