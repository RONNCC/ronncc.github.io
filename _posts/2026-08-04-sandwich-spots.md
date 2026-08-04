---
layout: post
title: "Sandwich Spots in SF"
categories: ["2026"]
permalink: /sandwich-spots/
---

<style>
.ss-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;padding:0;margin:0;line-height:1.5;color:#1a1a1a;width:100vw;position:relative;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}
@media(max-width:800px){.ss-app{margin:0;left:auto;right:auto;margin-left:0;margin-right:0;width:unset}}

/* ── 2-pane grid ── */
.ss-panes{display:grid;grid-template-columns:300px 1fr;height:calc(100vh - 80px);overflow:hidden;transition:grid-template-columns .25s ease}
.ss-panes.left-collapsed{grid-template-columns:40px 1fr}
@media(max-width:800px){.ss-panes{grid-template-columns:1fr;height:auto;overflow:auto}.ss-panes.left-collapsed{grid-template-columns:1fr}}
@media(min-width:1200px){.ss-panes{grid-template-columns:340px 1fr}}

/* ── left pane ── */
.ss-left{border-right:1px solid #e0e0e0;background:#fafafa;display:flex;flex-direction:column;min-height:0;overflow:hidden;position:relative;transition:all .25s ease}
.ss-panes.left-collapsed .ss-left{overflow:visible}
@media(max-width:800px){.ss-left{border-right:none;border-bottom:1px solid #e0e0e0;height:auto;overflow:auto}.ss-panes.left-collapsed .ss-left{height:auto}}
.ss-left-head{padding:16px 18px 12px;border-bottom:1px solid #e5e5e5;flex-shrink:0}
.ss-left-head h2{margin:0 0 4px;font-size:18px;font-weight:800;color:#1a1a1a}
.ss-left-head .ss-sub{font-size:13px;color:#777;margin:0 0 10px}
.ss-chips{display:flex;gap:6px;flex-wrap:wrap}
.ss-chip{border:1px solid #ddd;background:#fff;color:#666;font:600 12px/1 inherit;padding:5px 11px;border-radius:999px;cursor:pointer;transition:all .12s}
.ss-chip:hover{border-color:#aaa;color:#333}
.ss-chip.on{background:#c1440e;border-color:#c1440e;color:#fff}
.ss-chip .ss-ct{margin-left:4px;opacity:.65}
.ss-list{flex:1;overflow-y:auto;padding:8px;scrollbar-width:thin;scrollbar-color:#ccc transparent}
@media(max-width:800px){.ss-list{max-height:45vh}}

/* ── list item ── */
.ss-item{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;cursor:pointer;border:1px solid transparent;margin-bottom:4px;transition:all .12s}
.ss-item:hover{background:#faf0ea;border-color:#f0ddd0}
.ss-item.on{background:#fcf1e9;border-color:#e8c3a4;box-shadow:inset 3px 0 0 #c1440e}
.ss-icon{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:16px;flex-shrink:0;border:2px solid transparent}
.ss-icon.visited{background:#e8f5e9;border-color:#4caf50;color:#2e7d32}
.ss-icon.notyet{background:#fff3e0;border-color:#ff9800;color:#e65100}
.ss-icon.unknown{background:#f5f5f5;border-color:#bbb;color:#999}
.ss-item-body{min-width:0;flex:1}
.ss-item-name{font-weight:700;font-size:14px;color:#1a1a1a;line-height:1.3}
.ss-item-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-top:1px}
.ss-item-badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:999px;white-space:nowrap;flex-shrink:0;margin-top:2px}
.ss-item-badge.visited{background:#e8f5e9;color:#2e7d32}
.ss-item-badge.notyet{background:#fff3e0;color:#e65100}
.ss-item-badge.unknown{background:#f5f5f5;color:#888}

/* ── right pane ── */
.ss-right{display:flex;flex-direction:column;min-height:0;position:relative;overflow:hidden}
@media(max-width:800px){.ss-right{height:60vh}.ss-panes.left-collapsed .ss-right{height:calc(100vh - 60px)}}
.ss-map{flex:1;min-height:0}
.ss-map .leaflet-container{height:100%;width:100%}

/* ── detail panel (slides up from bottom of map) ── */
.ss-detail{position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e0e0e0;box-shadow:0 -4px 20px rgba(0,0,0,.12);border-radius:14px 14px 0 0;transform:translateY(100%);transition:transform .25s ease;z-index:1000;max-height:55%;overflow-y:auto}
.ss-detail.open{transform:translateY(0)}
@media(max-width:800px){.ss-detail{max-height:70%;border-radius:16px 16px 0 0}}
.ss-detail-handle{width:36px;height:4px;background:#ddd;border-radius:2px;margin:10px auto 0;cursor:pointer}
.ss-detail-inner{padding:14px 20px 20px}
.ss-detail h3{margin:0 0 2px;font-size:17px;font-weight:800;color:#1a1a1a}
.ss-detail-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px}
.ss-detail-drink{font-weight:700;font-size:14px;color:#c1440e;margin:0 0 10px}
.ss-detail-drink::before{content:"🥪 "}
.ss-detail-note{font-size:13.5px;color:#444;margin:0 0 10px;line-height:1.6}
.ss-detail-addr{font-size:12px;color:#888;margin:0 0 10px}
.ss-detail-addr::before{content:"📍 "}
.ss-detail-links{display:flex;flex-wrap:wrap;gap:6px}
.ss-detail-links a{font-size:12px;font-weight:600;text-decoration:none;background:#fbe9de;color:#c1440e;padding:4px 10px;border-radius:999px;border:1px solid #edc9ac}
.ss-detail-links a:hover{background:#f5dcc9}
.ss-detail-close{position:absolute;top:10px;right:14px;width:28px;height:28px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;display:grid;place-items:center;font-size:14px;color:#888}
.ss-detail-close:hover{background:#f5f5f5;color:#333}
.ss-detail-status{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;margin-bottom:12px}
.ss-detail-status.visited{background:#e8f5e9;color:#2e7d32}
.ss-detail-status.notyet{background:#fff3e0;color:#e65100}
.ss-detail-status.unknown{background:#f5f5f5;color:#888}

/* ── legend on map ── */
.ss-map-legend{position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border:1px solid #e0e0e0;border-radius:8px;padding:8px 12px;font-size:11px;color:#666;z-index:999;display:flex;flex-wrap:wrap;gap:8px}
.ss-map-legend span{display:flex;align-items:center;gap:4px}
.ss-map-legend .ss-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* ── leaflet popup ── */
.ss-map .leaflet-popup-content{font-family:inherit;font-size:13px;line-height:1.4;margin:8px 12px}
.ss-map .leaflet-popup-content strong{display:block;font-size:14px;margin-bottom:2px}
.ss-map .leaflet-popup-content a{color:#c1440e;font-weight:600;text-decoration:none;cursor:pointer}
.ss-map .leaflet-popup-content a:hover{text-decoration:underline}

/* ── custom colored pin markers ── */
.ss-map .ss-pin{background:transparent;border:none}
.ss-map .ss-pin svg{display:block;filter:drop-shadow(0 2px 3px rgba(0,0,0,.3))}

/* ── collapse toggle ── */
.ss-collapse-btn{position:absolute;top:10px;right:10px;z-index:20;width:30px;height:30px;border:none;background:#fff;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.12);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:#666;transition:background .12s}
.ss-collapse-btn:hover{background:#f0f0f0}
.ss-collapse-btn svg{width:16px;height:16px;transition:transform .25s ease}
.ss-panes.left-collapsed .ss-collapse-btn svg{transform:rotate(180deg)}
@media(max-width:800px){.ss-collapse-btn{display:none}}

/* ── collapsed left pane content ── */
.ss-panes.left-collapsed .ss-left-head{height:0;padding:0;overflow:hidden;border:none;margin:0}
.ss-panes.left-collapsed .ss-list{height:0;padding:0;overflow:hidden}
</style>

<div class="ss-app">
<div class="ss-panes">

<!-- LEFT PANE -->
<div class="ss-left">
  <button class="ss-collapse-btn" id="ssCollapseBtn" title="Collapse/expand list">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <div class="ss-left-head">
    <h2>Sandwich Spots</h2>
    <p class="ss-sub">Best sandwiches in San Francisco · Infatuation SF roundup</p>
    <div class="ss-chips">
      <button class="ss-chip on" data-filter="all">All<span class="ss-ct">20</span></button>
      <button class="ss-chip" data-filter="visited">Visited<span class="ss-ct">0</span></button>
      <button class="ss-chip" data-filter="notyet">Not yet<span class="ss-ct">20</span></button>
    </div>
  </div>
  <div class="ss-list" id="ssList"></div>
</div>

<!-- RIGHT PANE -->
<div class="ss-right">
  <div id="ssMap" class="ss-map"></div>
  <div class="ss-map-legend">
    <span><span class="ss-dot" style="background:#4caf50"></span>Visited (0)</span>
    <span><span class="ss-dot" style="background:#ff9800"></span>Not yet (20)</span>
  </div>

  <!-- DETAIL PANEL -->
  <div class="ss-detail" id="ssDetail">
    <div class="ss-detail-handle" id="ssDetailClose"></div>
    <button class="ss-detail-close" id="ssDetailX">&times;</button>
    <div class="ss-detail-inner" id="ssDetailInner"></div>
  </div>
</div>

</div>
</div>

<p style="max-width:900px;margin:16px auto 0;padding:0 20px;font-size:13px;color:#888">
  Reference: <a href="https://www.theinfatuation.com/san-francisco/guides/best-sandwich-spots-in-sf" target="_blank" rel="noopener">The Infatuation — The Best Sandwich Spots In San Francisco</a>
</p>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var SPOTS = [
    {key:'oceansubs', name:'Ocean Subs', nb:'Excelsior', lat:37.7215, lng:-122.4368,
     status:'notyet', drink:'Classic subs on toasted dutch crunch, tangy herb vinaigrette',
     note:'Just four subs on the menu, but each is so balanced with salty cold cuts, herb vinaigrette, and a crunchy-yet-chewy dutch crunch roll that regulars call it the city\'s best. (Infatuation: 9.0)',
     addr:'18 Ocean Ave, San Francisco, CA 94112',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/ocean-subs'}]},

    {key:'saigonsandwich', name:'Saigon Sandwich', nb:'Tenderloin', lat:37.7825, lng:-122.4166,
     status:'notyet', drink:'Bánh mì — widely considered the best in SF',
     note:'Cash-only Tenderloin institution for decades. Crackly fresh-baked rolls, well-spiced meat, mayo, pickled daikon and carrots — about $7 a sandwich. (Infatuation: 9.2)',
     addr:'560 Larkin St, San Francisco, CA 94102',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/saigon-sandwich'}]},

    {key:'palmcity', name:'Palm City', nb:'Sunset', lat:37.7638, lng:-122.5019,
     status:'notyet', drink:'Italian American hoagie — mortadella, \'nduja mayo, sesame roll',
     note:'A Sunset wine bar that also makes giant Philly-style hoagies. Fresh toppings like broccoli rabe and arugula keep the massive sandwiches tasting light. (Infatuation: 8.5)',
     addr:'4055 Irving St, San Francisco, CA 94122',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/palm-city'}]},

    {key:'deliboard', name:'Deli Board', nb:'SoMa', lat:37.7776, lng:-122.4102,
     status:'notyet', drink:'Pastrami, plus a daily-changing specials board',
     note:'Tank-sized sandwiches stuffed with everything from corned beef to tuna salad and falafel. Get anything with pastrami, and always ask for the Board sauce. (Infatuation: 8.4)',
     addr:'1058 Folsom St, San Francisco, CA 94103',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/deli-board'}]},

    {key:'outtasight', name:'Outta Sight Pizza', nb:'Tenderloin', lat:37.7846, lng:-122.4165,
     status:'notyet', drink:'Italian Combo — mortadella, pepperoni, ham, coppa',
     note:'Known for pizza, but the towering sandwiches deserve just as much attention. Watch for seasonal specials like the tuna melt and Green Gobbler. (Infatuation: 9.1)',
     addr:'422 Larkin St, San Francisco, CA 94102',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/outta-sight'}]},

    {key:'louscafe', name:'Lou\'s Cafe', nb:'Richmond', lat:37.7807, lng:-122.4658,
     status:'notyet', drink:'Tuna melt with garlic aioli',
     note:'Family-run Richmond spot (also FiDi & Parkside) known for big subs — tuna melt, hot pastrami brisket, meatballs in housemade marinara. (Infatuation: 8.8)',
     addr:'5017 Geary Blvd, San Francisco, CA 94118',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/lous-cafe'}]},

    {key:'lucindasdeli', name:'Lucinda\'s Deli & More', nb:'NoPa', lat:37.7739, lng:-122.4380,
     status:'notyet', drink:'Spicy tuna melt — jalapeños, cheddar, arugula, tomato',
     note:'Baguette sandwiches near Alamo Square stuffed burrito-thick, with expertly balanced salt, sweet, and spice. (Infatuation: 8.2)',
     addr:'535 Scott St, San Francisco, CA 94117',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/lucindas-deli-and-more'}]},

    {key:'saltys', name:'Salty\'s', nb:'Civic Center', lat:37.7807, lng:-122.4211,
     status:'notyet', drink:'The Glorious Bastard — turkey, ham, garlic mayo',
     note:'Gargantuan sandwiches near Van Ness. Also a simple, delicious egg-cheese-chipotle-maple-mayo breakfast sandwich before the lunch rush. (Infatuation: 8.4)',
     addr:'748 Van Ness Ave, San Francisco, CA 94102',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/salty-s'}]},

    {key:'sandys', name:'Sandy\'s', nb:'Haight', lat:37.7699, lng:-122.4436,
     status:'notyet', drink:'Muffuletta — original or mushroom, Duke\'s mayo, giardiniera',
     note:'SF\'s muffuletta king. Sesame bread made specially by an Oakland bakery, a thick spicy olive spread, and fermented cauliflower-carrot giardiniera. (Infatuation: 9.0)',
     addr:'1457 Haight St, San Francisco, CA 94117',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/sandys'}]},

    {key:'latortagorda', name:'La Torta Gorda', nb:'Mission', lat:37.7524, lng:-122.4085,
     status:'notyet', drink:'Mega Cubana torta — milanesa, sausage, pierna, ham, chorizo, egg, turkey, two cheeses',
     note:'Tortas live up to the oversized name. The Mega Cubana is large enough to feed five or six people; comes in junior or regular size.',
     addr:'2833 24th St, San Francisco, CA 94110',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/la-torta-gorda'}]},

    {key:'newkirks', name:'Newkirk\'s', nb:'Mission', lat:37.7583, lng:-122.4067,
     status:'notyet', drink:'BEC — bacon, egg, American cheese',
     note:'East Coast-style breakfast/deli sandwiches. The BEC is a gooey, salty wake-up call; also pastrami, grilled ribeye, and hash browns. (Infatuation: 8.0)',
     addr:'1006 Potrero Ave, San Francisco, CA 94110',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/newkirks'}]},

    {key:'oinkandoscar', name:'Oink & Oscar', nb:'SoMa', lat:37.7864, lng:-122.4041,
     status:'notyet', drink:'Porkstrami — smoky pork butt in most of the 16 sandwiches',
     note:'Fist-thick sandwiches; the porkstrami is the standout. Try the Oscar\'s Wild (hot honey butter) or The Morris Method (BBQ + jalapeño pickles). (Infatuation: 8.3)',
     addr:'87 Yerba Buena Ln, San Francisco, CA 94103',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/oink-and-oscar'}]},

    {key:'boysdeli', name:'The Boys\' Deli', nb:'Russian Hill', lat:37.7975, lng:-122.4217,
     status:'notyet', drink:'Spitfire — rotisserie chicken, bacon, jalapeños, sriracha mayo',
     note:'A counter inside Polk Street Market. Also check the rotating specials: brown sugar tri-tip or pulled rotisserie chicken with coleslaw and chipotle mayo. (Infatuation: 8.4)',
     addr:'2222 Polk St, San Francisco, CA 94109',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-boys-deli'}]},

    {key:'cielitolindo', name:'Cielito Lindo', nb:'Richmond', lat:37.7768, lng:-122.4949,
     status:'notyet', drink:'Milanesa or carne asada torta',
     note:'Known for quesabirria tacos, but the nine tortas — queso fresco, always — are huge and shouldn\'t be slept on. (Infatuation: 8.2)',
     addr:'3450 Balboa St, San Francisco, CA 94121',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/cielito-lindo'}]},

    {key:'yellowsubmarine', name:'The Yellow Submarine', nb:'Sunset', lat:37.7638, lng:-122.4652,
     status:'notyet', drink:'Italian Combo — cold cuts, vinegar-dressed lettuce',
     note:'Decades-old sub shop near Golden Gate Park. Cafeteria-style dining room; cash only.',
     addr:'503 Irving St, San Francisco, CA 94122',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-yellow-submarine'}]},

    {key:'doloresdeluxe', name:'Dolores Deluxe', nb:'Mission', lat:37.7524, lng:-122.4278,
     status:'notyet', drink:'Mole rotisserie chicken, or pastrami with spinach-artichoke dip',
     note:'A corner store near Dolores Park with a frequently rotating menu. Don\'t skip the leek omelette breakfast sandwich with spicy tomato jam.',
     addr:'3500 22nd St, San Francisco, CA 94114',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/dolores-deluxe'}]},

    {key:'thehornet', name:'The Hornet', nb:'Pacific Heights', lat:37.7897, lng:-122.4406,
     status:'notyet', drink:'Daily rotating menu — roasted pork & broccolini, or turkey/ham/bacon with banana peppers',
     note:'Takeout counter inside London Market. Consistently good despite the daily-changing menu — order online in case they sell out early. (Infatuation: 8.3)',
     addr:'2901 Sacramento St, San Francisco, CA 94115',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/the-hornet-sf'}]},

    {key:'guerraqualitymeats', name:'Guerra Quality Meats', nb:'Parkside', lat:37.7423, lng:-122.4726,
     status:'notyet', drink:'Sicilian — hot coppa, salami, provolone, tomato, lettuce, jalapeños',
     note:'Longstanding Italian butcher shop. Get it on a dutch crunch roll — buttery, dark golden brown, with a soft crackly top. (Infatuation: 8.0)',
     addr:'490 Taraval St, San Francisco, CA 94116',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/guerra-quality-meats'}]},

    {key:'kp49', name:'KP49', nb:'Union Square', lat:37.7889, lng:-122.4038,
     status:'notyet', drink:'Beef bourguignon sandwich',
     note:'One sandwich, done extremely well — slow-braised beef, caramelized onions and mushrooms, tangy house sauce. Eat fast before the panini bread gets soggy; chicken version available too.',
     addr:'49 Kearny St, San Francisco, CA 94108',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/kp49'}]},

    {key:'arguellomarket', name:'Arguello Market', nb:'Richmond', lat:37.7746, lng:-122.4586,
     status:'notyet', drink:'Roasted turkey sandwich on a dutch crunch roll',
     note:'A Richmond grocery store nicknamed "The Turkey Sandwich Emporium." Also has housemade pastas and salads — stock up on drinks and chips too.',
     addr:'782 Arguello Blvd, San Francisco, CA 94118',
     links:[{t:'Review',u:'https://www.theinfatuation.com/san-francisco/reviews/arguello-market'}]}
  ];

  var filter = 'all';
  var selected = null;

  function filtered(){
    return SPOTS.filter(function(s){ return filter==='all' || s.status===filter; });
  }

  function iconHTML(status){
    if(status==='visited') return '<div class="ss-icon visited">✓</div>';
    if(status==='notyet') return '<div class="ss-icon notyet">○</div>';
    return '<div class="ss-icon unknown">?</div>';
  }
  function badgeHTML(status){
    if(status==='visited') return '<div class="ss-item-badge visited">Visited</div>';
    if(status==='notyet') return '<div class="ss-item-badge notyet">Not yet</div>';
    return '<div class="ss-item-badge unknown">Unconfirmed</div>';
  }
  function statusLabel(status){
    if(status==='visited') return '<div class="ss-detail-status visited">✓ Visited</div>';
    if(status==='notyet') return '<div class="ss-detail-status notyet">○ Not yet</div>';
    return '<div class="ss-detail-status unknown">? Unconfirmed</div>';
  }

  function renderList(){
    var list = document.getElementById('ssList');
    var items = filtered();
    list.innerHTML = items.map(function(s){
      return '<div class="ss-item'+(selected===s.key?' on':'')+'" data-key="'+s.key+'">'
        + iconHTML(s.status)
        + '<div class="ss-item-body">'
        + '<div class="ss-item-name">'+s.name+'</div>'
        + '<div class="ss-item-nb">'+s.nb+'</div>'
        + '</div>'
        + badgeHTML(s.status)
        + '</div>';
    }).join('');
    list.querySelectorAll('.ss-item').forEach(function(el){
      el.addEventListener('click', function(){
        var key = el.getAttribute('data-key');
        select(key);
      });
    });
  }

  function showDetail(s){
    var inner = document.getElementById('ssDetailInner');
    var links = s.links.map(function(l){ return '<a href="'+l.u+'" target="_blank" rel="noopener">'+l.t+'</a>'; }).join('');
    inner.innerHTML = statusLabel(s.status)
      + '<h3>'+s.name+'</h3>'
      + '<div class="ss-detail-nb">'+s.nb+'</div>'
      + '<div class="ss-detail-drink">'+s.drink+'</div>'
      + '<p class="ss-detail-note">'+s.note+'</p>'
      + '<p class="ss-detail-addr">'+s.addr+'</p>'
      + '<div class="ss-detail-links">'+links+'</div>';
    document.getElementById('ssDetail').classList.add('open');
  }
  function hideDetail(){
    document.getElementById('ssDetail').classList.remove('open');
  }

  /* ── map setup ── */
  var map = L.map('ssMap',{zoomControl:true}).setView([37.771, -122.443], 12.5);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; OpenStreetMap &copy; CARTO'
  }).addTo(map);

  var STATUS_COLOR = {visited:'#4caf50', notyet:'#ff9800', unknown:'#999'};
  function statusIcon(status){
    var color = STATUS_COLOR[status] || STATUS_COLOR.notyet;
    return L.divIcon({
      className: 'ss-pin ss-pin-'+status,
      html: '<svg width="28" height="40" viewBox="0 0 28 40" xmlns="http://www.w3.org/2000/svg">'
        + '<path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 26 14 26s14-15.5 14-26c0-7.7-6.3-14-14-14z" fill="'+color+'" stroke="#fff" stroke-width="1.5"/>'
        + '<circle cx="14" cy="14" r="5.5" fill="#fff"/>'
        + '</svg>',
      iconSize: [28, 40],
      iconAnchor: [14, 40],
      popupAnchor: [0, -36]
    });
  }

  var markers = {};
  SPOTS.forEach(function(s){
    if(s.lat===null) return;
    var m = L.marker([s.lat, s.lng], {icon: statusIcon(s.status)}).addTo(map);
    m.bindPopup('<strong>'+s.name+'</strong>'+s.nb+'<br><a data-goto="'+s.key+'">View details →</a>');
    m.on('popupopen', function(){
      var link = document.querySelector('.leaflet-popup a[data-goto="'+s.key+'"]');
      if(link) link.addEventListener('click', function(e){ e.preventDefault(); select(s.key); });
    });
    m.on('click', function(){ select(s.key); });
    markers[s.key] = m;
  });

  function select(key){
    selected = key;
    renderList();
    var s = SPOTS.find(function(x){ return x.key===key; });
    if(!s) return;
    if(markers[key]){
      markers[key].openPopup();
      map.setView([s.lat, s.lng], 14, {animate:true});
    }
    showDetail(s);
    /* scroll list item into view */
    var el = document.querySelector('.ss-item[data-key="'+key+'"]');
    if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }

  /* ── filter chips ── */
  document.querySelectorAll('.ss-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      filter = chip.getAttribute('data-filter');
      document.querySelectorAll('.ss-chip').forEach(function(c){ c.classList.remove('on'); });
      chip.classList.add('on');
      selected = null;
      hideDetail();
      renderList();
      /* re-show/hide markers */
      SPOTS.forEach(function(s){
        if(!markers[s.key]) return;
        if(filter==='all' || s.status===filter) markers[s.key].addTo(map);
        else map.removeLayer(markers[s.key]);
      });
      /* fit map to visible markers */
      var visible = SPOTS.filter(function(s){ return s.lat!==null && (filter==='all' || s.status===filter); });
      if(visible.length){
        var fg = L.featureGroup(visible.map(function(s){ return markers[s.key]; }));
        map.fitBounds(fg.getBounds().pad(0.1));
      }
    });
  });

  /* ── detail close ── */
  document.getElementById('ssDetailClose').addEventListener('click', function(){
    selected = null; hideDetail(); renderList();
  });
  document.getElementById('ssDetailX').addEventListener('click', function(){
    selected = null; hideDetail(); renderList();
  });

  /* ── collapse toggle ── */
  document.getElementById('ssCollapseBtn').addEventListener('click', function(){
    document.querySelector('.ss-panes').classList.toggle('left-collapsed');
    setTimeout(function(){ map.invalidateSize(); }, 300);
  });

  renderList();
})();
</script>
