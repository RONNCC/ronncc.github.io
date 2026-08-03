---
layout: post
title: "Hot Chocolate Spots in SF"
categories: ["2026"]
permalink: /hot-chocolate/
---

<style>
.hc-app{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;margin:-20px -30px 0;padding:0;line-height:1.5;color:#1a1a1a}
@media(max-width:800px){.hc-app{margin:-20px -16px 0}}

/* ── 2-pane grid ── */
.hc-panes{display:grid;grid-template-columns:clamp(320px,30vw,520px) 1fr;height:calc(100vh - 80px);overflow:hidden;transition:grid-template-columns .25s ease}
.hc-panes.left-collapsed{grid-template-columns:52px 1fr}
@media(max-width:800px){.hc-panes{grid-template-columns:1fr;height:auto;overflow:auto}.hc-panes.left-collapsed{grid-template-columns:1fr}}

/* ── left pane ── */
.hc-left{border-right:1px solid #e0e0e0;background:#fafafa;display:flex;flex-direction:column;min-height:0;overflow:hidden;position:relative;transition:all .25s ease}
.hc-panes.left-collapsed .hc-left{overflow:visible}
@media(max-width:800px){.hc-left{border-right:none;border-bottom:1px solid #e0e0e0;height:auto;overflow:auto}.hc-panes.left-collapsed .hc-left{height:auto}}
.hc-left-head{padding:16px 18px 12px;border-bottom:1px solid #e5e5e5;flex-shrink:0}
.hc-left-head h2{margin:0 0 4px;font-size:18px;font-weight:800;color:#1a1a1a}
.hc-left-head .hc-sub{font-size:13px;color:#777;margin:0 0 10px}
.hc-chips{display:flex;gap:6px;flex-wrap:wrap}
.hc-chip{border:1px solid #ddd;background:#fff;color:#666;font:600 12px/1 inherit;padding:5px 11px;border-radius:999px;cursor:pointer;transition:all .12s}
.hc-chip:hover{border-color:#aaa;color:#333}
.hc-chip.on{background:#6a1b9a;border-color:#6a1b9a;color:#fff}
.hc-chip .hc-ct{margin-left:4px;opacity:.65}
.hc-list{flex:1;overflow-y:auto;padding:8px;scrollbar-width:thin;scrollbar-color:#ccc transparent}
@media(max-width:800px){.hc-list{max-height:45vh}}

/* ── list item ── */
.hc-item{display:flex;align-items:flex-start;gap:12px;padding:12px 14px;border-radius:10px;cursor:pointer;border:1px solid transparent;margin-bottom:4px;transition:all .12s}
.hc-item:hover{background:#f0ecf5;border-color:#e0d8ec}
.hc-item.on{background:#f3eef9;border-color:#c8b8e0;box-shadow:inset 3px 0 0 #6a1b9a}
.hc-icon{width:36px;height:36px;border-radius:50%;display:grid;place-items:center;font-size:16px;flex-shrink:0;border:2px solid transparent}
.hc-icon.visited{background:#e8f5e9;border-color:#4caf50;color:#2e7d32}
.hc-icon.notyet{background:#fff3e0;border-color:#ff9800;color:#e65100}
.hc-icon.unknown{background:#f5f5f5;border-color:#bbb;color:#999}
.hc-item-body{min-width:0;flex:1}
.hc-item-name{font-weight:700;font-size:14px;color:#1a1a1a;line-height:1.3}
.hc-item-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-top:1px}
.hc-item-detail{font-size:12.5px;color:#666;margin-top:4px;line-height:1.4;display:none}
.hc-item.on .hc-item-detail{display:block}
.hc-item-badge{font-size:10px;font-weight:700;padding:2px 7px;border-radius:999px;white-space:nowrap;flex-shrink:0;margin-top:2px}
.hc-item-badge.visited{background:#e8f5e9;color:#2e7d32}
.hc-item-badge.notyet{background:#fff3e0;color:#e65100}
.hc-item-badge.unknown{background:#f5f5f5;color:#888}

/* ── right pane ── */
.hc-right{display:flex;flex-direction:column;min-height:0;position:relative;overflow:hidden}
@media(max-width:800px){.hc-right{height:60vh}.hc-panes.left-collapsed .hc-right{height:calc(100vh - 60px)}}
.hc-map{flex:1;min-height:0}
.hc-map .leaflet-container{height:100%;width:100%}

/* ── detail panel (slides up from bottom of map) ── */
.hc-detail{position:absolute;bottom:0;left:0;right:0;background:#fff;border-top:1px solid #e0e0e0;box-shadow:0 -4px 20px rgba(0,0,0,.12);border-radius:14px 14px 0 0;transform:translateY(100%);transition:transform .25s ease;z-index:1000;max-height:55%;overflow-y:auto}
.hc-detail.open{transform:translateY(0)}
@media(max-width:800px){.hc-detail{max-height:70%;border-radius:16px 16px 0 0}}
.hc-detail-handle{width:36px;height:4px;background:#ddd;border-radius:2px;margin:10px auto 0;cursor:pointer}
.hc-detail-inner{padding:14px 20px 20px}
.hc-detail h3{margin:0 0 2px;font-size:17px;font-weight:800;color:#1a1a1a}
.hc-detail-nb{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:.04em;margin-bottom:10px}
.hc-detail-drink{font-weight:700;font-size:14px;color:#6a1b9a;margin:0 0 10px}
.hc-detail-drink::before{content:"☕ "}
.hc-detail-note{font-size:13.5px;color:#444;margin:0 0 10px;line-height:1.6}
.hc-detail-addr{font-size:12px;color:#888;margin:0 0 10px}
.hc-detail-addr::before{content:"📍 "}
.hc-detail-links{display:flex;flex-wrap:wrap;gap:6px}
.hc-detail-links a{font-size:12px;font-weight:600;text-decoration:none;background:#f3e9f7;color:#6a1b9a;padding:4px 10px;border-radius:999px;border:1px solid #e0c8ea}
.hc-detail-links a:hover{background:#e8d6f0}
.hc-detail-close{position:absolute;top:10px;right:14px;width:28px;height:28px;border-radius:50%;border:1px solid #ddd;background:#fff;cursor:pointer;display:grid;place-items:center;font-size:14px;color:#888}
.hc-detail-close:hover{background:#f5f5f5;color:#333}
.hc-detail-status{display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:700;padding:3px 10px;border-radius:999px;margin-bottom:12px}
.hc-detail-status.visited{background:#e8f5e9;color:#2e7d32}
.hc-detail-status.notyet{background:#fff3e0;color:#e65100}
.hc-detail-status.unknown{background:#f5f5f5;color:#888}

/* ── legend on map ── */
.hc-map-legend{position:absolute;bottom:12px;left:12px;background:rgba(255,255,255,.92);backdrop-filter:blur(6px);border:1px solid #e0e0e0;border-radius:8px;padding:8px 12px;font-size:11px;color:#666;z-index:999;display:flex;flex-wrap:wrap;gap:8px}
.hc-map-legend span{display:flex;align-items:center;gap:4px}
.hc-map-legend .hc-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0}

/* ── leaflet popup ── */
.hc-map .leaflet-popup-content{font-family:inherit;font-size:13px;line-height:1.4;margin:8px 12px}
.hc-map .leaflet-popup-content strong{display:block;font-size:14px;margin-bottom:2px}
.hc-map .leaflet-popup-content a{color:#6a1b9a;font-weight:600;text-decoration:none;cursor:pointer}
.hc-map .leaflet-popup-content a:hover{text-decoration:underline}

/* ── collapse toggle ── */
.hc-collapse-btn{position:absolute;top:10px;right:10px;z-index:20;width:30px;height:30px;border:none;background:#fff;border-radius:8px;box-shadow:0 1px 4px rgba(0,0,0,.12);cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:15px;color:#666;transition:background .12s}
.hc-collapse-btn:hover{background:#f0f0f0}
.hc-collapse-btn svg{width:16px;height:16px;transition:transform .25s ease}
.hc-panes.left-collapsed .hc-collapse-btn svg{transform:rotate(180deg)}
@media(max-width:800px){.hc-collapse-btn{display:none}}

/* ── collapsed left pane content ── */
.hc-panes.left-collapsed .hc-left-head{height:0;padding:0;overflow:hidden;border:none;margin:0}
.hc-panes.left-collapsed .hc-list{height:0;padding:0;overflow:hidden}
</style>

<div class="hc-app">
<div class="hc-panes">

<!-- LEFT PANE -->
<div class="hc-left">
  <button class="hc-collapse-btn" id="hcCollapseBtn" title="Collapse/expand list">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
  </button>
  <div class="hc-left-head">
    <h2>Hot Chocolate Spots</h2>
    <p class="hc-sub">Best hot chocolate in San Francisco · Eater SF roundup</p>
    <div class="hc-chips">
      <button class="hc-chip on" data-filter="all">All<span class="hc-ct">11</span></button>
      <button class="hc-chip" data-filter="visited">Visited<span class="hc-ct">1</span></button>
      <button class="hc-chip" data-filter="notyet">Not yet<span class="hc-ct">8</span></button>
      <button class="hc-chip" data-filter="unknown">Unconfirmed<span class="hc-ct">2</span></button>
    </div>
  </div>
  <div class="hc-list" id="hcList"></div>
</div>

<!-- RIGHT PANE -->
<div class="hc-right">
  <div id="hcMap" class="hc-map"></div>
  <div class="hc-map-legend">
    <span><span class="hc-dot" style="background:#4caf50"></span>Visited</span>
    <span><span class="hc-dot" style="background:#ff9800"></span>Not yet</span>
    <span><span class="hc-dot" style="background:#bbb"></span>Unconfirmed</span>
  </div>

  <!-- DETAIL PANEL -->
  <div class="hc-detail" id="hcDetail">
    <div class="hc-detail-handle" id="hcDetailClose"></div>
    <button class="hc-detail-close" id="hcDetailX">&times;</button>
    <div class="hc-detail-inner" id="hcDetailInner"></div>
  </div>
</div>

</div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var SPOTS = [
    {key:'buenavista', name:'Buena Vista Cafe', nb:'Fisherman\'s Wharf', lat:37.8063, lng:-122.4206,
     status:'notyet', drink:'Irish whiskey hot chocolate',
     note:'A 1952-founded institution right at the Powell-Hyde cable car turnaround, better known for Irish Coffee — but its boozy hot chocolate is a lesser-known menu star. Mon–Thu 9am–11pm, Sat/Sun from 8am.',
     addr:'2765 Hyde St (@ Beach), SF, CA 94109',
     links:[{t:'Website',u:'http://www.thebuenavista.com/'},{t:'Instagram',u:'https://www.instagram.com/p/DQpE59Sjt1R/'}]},

    {key:'ghirardelli', name:'The Original Ghirardelli Ice Cream & Chocolate Shop', nb:'Fisherman\'s Wharf', lat:37.8057, lng:-122.4227,
     status:'notyet', drink:'Ghirardelli chocolate-based hot cocoa',
     note:'Flagship shop of the SF-founded chocolate brand at Ghirardelli Square — the brand is so iconic that even In-N-Out uses Ghirardelli powder for its free kids\' cocoa.',
     addr:'900 North Point St, Ste F301, SF, CA 94109',
     links:[{t:'Website',u:'https://www.ghirardelli.com/'}]},

    {key:'xox', name:'XOX Truffles', nb:'North Beach', lat:37.8016, lng:-122.4119,
     status:'notyet', drink:'European-style drinking chocolate',
     note:'A small, well-regarded chocolatier on Columbus Ave that makes its drinking chocolate from house-made dark chocolate ganache. Mon–Sat 9am–6pm, Sun 10:30am–6pm.',
     addr:'754 Columbus Ave, SF, CA 94133',
     links:[{t:'Yelp',u:'https://www.yelp.com/biz/xox-truffles-san-francisco'}]},

    {key:'fairmont', name:'Gingerbread House at Fairmont SF', nb:'Nob Hill', lat:37.7924, lng:-122.4098,
     status:'notyet', drink:'Seasonal hot chocolate at the life-size gingerbread house',
     note:'Holiday season only (late Nov–early Jan), so it\'s not a year-round stop — a 22-ft walk-through gingerbread display inside the Fairmont with hot chocolate served alongside.',
     addr:'950 Mason St, SF, CA 94108',
     links:[{t:'Website',u:'https://www.fairmont-san-francisco.com/explore/holidays/'},{t:'Instagram',u:'https://www.instagram.com/reel/DRX1Mcdkk40/'}]},

    {key:'dandelion', name:'Dandelion Chocolate (Valencia)', nb:'Mission', lat:37.7614, lng:-122.4219,
     status:'notyet', drink:'Single-origin hot chocolate; also Mexican-style and frozen',
     note:'Bean-to-bar chocolatier with a creamy, mildly sweet hot chocolate in the $6.50–7.50 range. Also at the Ferry Building, 16th St Factory, and Fillmore.',
     addr:'740 Valencia St, SF, CA 94110',
     links:[{t:'Website',u:'https://www.dandelionchocolate.com/pages/valencia-street'}]},

    {key:'oaxaquena', name:'La Oaxaqueña Bakery & Restaurant', nb:'Mission', lat:37.7629, lng:-122.4198,
     status:'notyet', drink:'Champurrado (Oaxacan-style hot chocolate)',
     note:'Traditional champurrado — a masa-thickened, cinnamon-spiced Mexican hot chocolate — alongside an Oaxacan and Salvadoran menu. Open till 2:30am.',
     addr:'2128 Mission St, SF, CA 94110',
     links:[{t:'Yelp',u:'https://www.yelp.com/biz/la-oaxaque%C3%B1a-san-francisco-2'}]},

    {key:'zazie', name:'Zazie', nb:'Cole Valley', lat:37.766, lng:-122.450,
     status:'notyet', drink:'Signature "Baked Hot Chocolate" with golden marshmallows (GF)',
     note:'Tip-free brunch institution that serves its baked hot chocolate warm in a bowl, topped with golden marshmallows.',
     addr:'941 Cole St, SF, CA 94117',
     links:[{t:'Website',u:'https://www.zaziesf.com/dinner-menu-options.html'},{t:'Yelp',u:'https://www.yelp.com/biz/zazie-san-francisco'}]},

    {key:'icecream', name:'The Ice Cream Bar', nb:'Cole Valley', lat:37.7676, lng:-122.4501,
     status:'notyet', drink:'Soda-fountain-style hot chocolate',
     note:'A 1930s-inspired soda fountain down the street from Zazie, with house-made syrups and seasonal specials.',
     addr:'~815 Cole St, SF, CA 94117', links:[]},

    {key:'spro', name:'SPRO Coffee Lab', nb:'Castro', lat:37.7628, lng:-122.4287,
     status:'notyet', drink:'Chocolate latte / house hot chocolate',
     note:'Multiple SF locations (Church St, Golden Gate Ave, West Portal, and a newly opened Spear St shop as of July 2026) — check which one is closest to you.',
     addr:'500 Church St, SF, CA 94114',
     links:[{t:'Yelp',u:'https://www.yelp.com/biz/spro-coffee-lab-san-francisco-8'}]},

    {key:'christopherelbow', name:'Christopher Elbow Chocolates', nb:'Location unconfirmed', lat:null, lng:null,
     status:'visited', drink:'Craft drinking chocolate',
     note:'Artisan chocolatier featured on the Eater map — the exact SF address isn\'t confirmed.',
     addr:'(location within SF unconfirmed)',
     links:[{t:'Eater',u:'https://sf.eater.com/venue/74859/christopher-elbow-chocolates'}]},

    {key:'keikos', name:'Keiko\'s Coffee Shop', nb:'Location unconfirmed', lat:null, lng:null,
     status:'unknown', drink:'House hot chocolate',
     note:'Featured on the Eater map — findable via Instagram; the exact address isn\'t confirmed.',
     addr:'(address unconfirmed)',
     links:[{t:'Eater',u:'https://sf.eater.com/venue/908880/keikos-coffee-shop'}]}
  ];

  var filter = 'all';
  var selected = null;

  function filtered(){
    return SPOTS.filter(function(s){ return filter==='all' || s.status===filter; });
  }

  function iconHTML(status){
    if(status==='visited') return '<div class="hc-icon visited">✓</div>';
    if(status==='notyet') return '<div class="hc-icon notyet">○</div>';
    return '<div class="hc-icon unknown">?</div>';
  }
  function badgeHTML(status){
    if(status==='visited') return '<div class="hc-item-badge visited">Visited</div>';
    if(status==='notyet') return '<div class="hc-item-badge notyet">Not yet</div>';
    return '<div class="hc-item-badge unknown">Unconfirmed</div>';
  }
  function statusLabel(status){
    if(status==='visited') return '<div class="hc-detail-status visited">✓ Visited</div>';
    if(status==='notyet') return '<div class="hc-detail-status notyet">○ Not yet</div>';
    return '<div class="hc-detail-status unknown">? Unconfirmed</div>';
  }

  function renderList(){
    var list = document.getElementById('hcList');
    var items = filtered();
    list.innerHTML = items.map(function(s){
      return '<div class="hc-item'+(selected===s.key?' on':'')+'" data-key="'+s.key+'">'
        + iconHTML(s.status)
        + '<div class="hc-item-body">'
        + '<div class="hc-item-name">'+s.name+'</div>'
        + '<div class="hc-item-nb">'+s.nb+'</div>'
        + '<div class="hc-item-detail">'+s.note+'</div>'
        + '</div>'
        + badgeHTML(s.status)
        + '</div>';
    }).join('');
    list.querySelectorAll('.hc-item').forEach(function(el){
      el.addEventListener('click', function(){
        var key = el.getAttribute('data-key');
        select(key);
      });
    });
  }

  function showDetail(s){
    var inner = document.getElementById('hcDetailInner');
    var links = s.links.map(function(l){ return '<a href="'+l.u+'" target="_blank" rel="noopener">'+l.t+'</a>'; }).join('');
    inner.innerHTML = statusLabel(s.status)
      + '<h3>'+s.name+'</h3>'
      + '<div class="hc-detail-nb">'+s.nb+'</div>'
      + '<div class="hc-detail-drink">'+s.drink+'</div>'
      + '<p class="hc-detail-note">'+s.note+'</p>'
      + '<p class="hc-detail-addr">'+s.addr+'</p>'
      + '<div class="hc-detail-links">'+links+'</div>';
    document.getElementById('hcDetail').classList.add('open');
  }
  function hideDetail(){
    document.getElementById('hcDetail').classList.remove('open');
  }

  /* ── map setup ── */
  var map = L.map('hcMap',{zoomControl:true}).setView([37.784, -122.425], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',{
    attribution:'&copy; OpenStreetMap &copy; CARTO'
  }).addTo(map);

  var markers = {};
  SPOTS.forEach(function(s){
    if(s.lat===null) return;
    var m = L.marker([s.lat, s.lng]).addTo(map);
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
    var el = document.querySelector('.hc-item[data-key="'+key+'"]');
    if(el) el.scrollIntoView({behavior:'smooth',block:'center'});
  }

  /* ── filter chips ── */
  document.querySelectorAll('.hc-chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      filter = chip.getAttribute('data-filter');
      document.querySelectorAll('.hc-chip').forEach(function(c){ c.classList.remove('on'); });
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
  document.getElementById('hcDetailClose').addEventListener('click', function(){
    selected = null; hideDetail(); renderList();
  });
  document.getElementById('hcDetailX').addEventListener('click', function(){
    selected = null; hideDetail(); renderList();
  });

  /* ── collapse toggle ── */
  document.getElementById('hcCollapseBtn').addEventListener('click', function(){
    document.querySelector('.hc-panes').classList.toggle('left-collapsed');
    setTimeout(function(){ map.invalidateSize(); }, 300);
  });

  renderList();
})();
</script>
