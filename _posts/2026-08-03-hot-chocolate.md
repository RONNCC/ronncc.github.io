---
layout: post
title: "Hot Chocolate Spots in SF"
categories: ["2026"]
permalink: /hot-chocolate/
---

<p>
  A map of the best hot chocolate spots in San Francisco, based on Eater SF's roundup.
  Click a pin to jump to its description below — or scroll the list and tap a spot to find it on the map.
</p>

<style>
.hc-wrap{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.5}
.hc-map{position:relative;width:100%;height:480px;border-radius:10px;overflow:hidden;border:1px solid #e5e5e5;margin:8px 0 4px}
.hc-map .leaflet-container{height:100%;width:100%}
.hc-map .leaflet-popup-content{font-size:13px;line-height:1.4}
.hc-map .leaflet-popup-content strong{display:block;font-size:14px;margin-bottom:2px}
.hc-map .leaflet-popup-content a{color:#6a1b9a;font-weight:600;text-decoration:none}
.hc-map .leaflet-popup-content a:hover{text-decoration:underline}
.hc-legend{display:flex;flex-wrap:wrap;gap:6px 14px;font-size:12px;color:#666;margin:6px 0 18px}
.hc-legend .hc-dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:5px;vertical-align:middle}
.hc-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:14px}
.hc-card{border:1px solid #e5e5e5;border-radius:10px;padding:14px 16px;background:#fff;transition:box-shadow .15s,border-color .15s}
.hc-card.hc-flash{box-shadow:0 0 0 3px rgba(106,27,154,.35);border-color:#6a1b9a}
.hc-card h3{margin:0 0 4px;font-size:17px;line-height:1.25}
.hc-nb{font-size:12px;color:#888;margin-bottom:8px;text-transform:uppercase;letter-spacing:.04em}
.hc-drink{font-weight:600;margin:0 0 8px}
.hc-drink::before{content:"☕ "}
.hc-note{font-size:14px;color:#444;margin:0 0 10px}
.hc-addr{font-size:12px;color:#888;margin:0 0 8px}
.hc-addr::before{content:"📍 "}
.hc-links{display:flex;flex-wrap:wrap;gap:6px}
.hc-links a{font-size:12px;font-weight:600;text-decoration:none;background:#f3e9f7;color:#6a1b9a;padding:3px 9px;border-radius:999px;border:1px solid #e0c8ea}
.hc-links a:hover{background:#e8d6f0}
.hc-hint{font-size:13px;color:#999;margin:14px 0 6px}
@media(max-width:600px){.hc-map{height:360px}}
</style>

<div class="hc-wrap">
  <div id="hcMap" class="hc-map"></div>
  <div class="hc-legend">
    <span><span class="hc-dot" style="background:#6a1b9a"></span>On the map</span>
    <span><span class="hc-dot" style="background:#ccc"></span>Location unconfirmed</span>
  </div>
  <p class="hc-hint">Click a pin or a card below to jump between the two.</p>

  <div class="hc-grid">

    <div class="hc-card" data-key="buenavista">
      <h3>Buena Vista Cafe</h3>
      <div class="hc-nb">Fisherman's Wharf</div>
      <p class="hc-drink">Irish whiskey hot chocolate</p>
      <p class="hc-note">A 1952-founded institution right at the Powell-Hyde cable car turnaround, better known for Irish Coffee — but its boozy hot chocolate is a lesser-known menu star. Mon–Thu 9am–11pm, Sat/Sun from 8am.</p>
      <p class="hc-addr">2765 Hyde St (@ Beach), SF, CA 94109</p>
      <div class="hc-links"><a href="http://www.thebuenavista.com/" target="_blank" rel="noopener">Website</a><a href="https://www.instagram.com/p/DQpE59Sjt1R/" target="_blank" rel="noopener">Instagram</a></div>
    </div>

    <div class="hc-card" data-key="ghirardelli">
      <h3>The Original Ghirardelli Ice Cream &amp; Chocolate Shop</h3>
      <div class="hc-nb">Fisherman's Wharf</div>
      <p class="hc-drink">Ghirardelli chocolate-based hot cocoa</p>
      <p class="hc-note">Flagship shop of the SF-founded chocolate brand at Ghirardelli Square — the brand is so iconic that even In-N-Out uses Ghirardelli powder for its free kids' cocoa.</p>
      <p class="hc-addr">900 North Point St, Ste F301, SF, CA 94109</p>
      <div class="hc-links"><a href="https://www.ghirardelli.com/" target="_blank" rel="noopener">Website</a></div>
    </div>

    <div class="hc-card" data-key="xox">
      <h3>XOX Truffles</h3>
      <div class="hc-nb">North Beach</div>
      <p class="hc-drink">European-style drinking chocolate</p>
      <p class="hc-note">A small, well-regarded chocolatier on Columbus Ave that makes its drinking chocolate from house-made dark chocolate ganache. Mon–Sat 9am–6pm, Sun 10:30am–6pm.</p>
      <p class="hc-addr">754 Columbus Ave, SF, CA 94133</p>
      <div class="hc-links"><a href="https://www.yelp.com/biz/xox-truffles-san-francisco" target="_blank" rel="noopener">Yelp</a></div>
    </div>

    <div class="hc-card" data-key="fairmont">
      <h3>Gingerbread House at Fairmont SF</h3>
      <div class="hc-nb">Nob Hill</div>
      <p class="hc-drink">Seasonal hot chocolate at the life-size gingerbread house</p>
      <p class="hc-note">Holiday season only (late Nov–early Jan), so it's not a year-round stop — a 22-ft walk-through gingerbread display inside the Fairmont with hot chocolate served alongside.</p>
      <p class="hc-addr">950 Mason St, SF, CA 94108</p>
      <div class="hc-links"><a href="https://www.fairmont-san-francisco.com/explore/holidays/" target="_blank" rel="noopener">Website</a><a href="https://www.instagram.com/reel/DRX1Mcdkk40/" target="_blank" rel="noopener">Instagram</a></div>
    </div>

    <div class="hc-card" data-key="dandelion">
      <h3>Dandelion Chocolate (Valencia)</h3>
      <div class="hc-nb">Mission</div>
      <p class="hc-drink">Single-origin hot chocolate; also Mexican-style and frozen</p>
      <p class="hc-note">Bean-to-bar chocolatier with a creamy, mildly sweet hot chocolate in the $6.50–7.50 range. Also at the Ferry Building, 16th St Factory, and Fillmore.</p>
      <p class="hc-addr">740 Valencia St, SF, CA 94110</p>
      <div class="hc-links"><a href="https://www.dandelionchocolate.com/pages/valencia-street" target="_blank" rel="noopener">Website</a></div>
    </div>

    <div class="hc-card" data-key="oaxaquena">
      <h3>La Oaxaqueña Bakery &amp; Restaurant</h3>
      <div class="hc-nb">Mission</div>
      <p class="hc-drink">Champurrado (Oaxacan-style hot chocolate)</p>
      <p class="hc-note">Traditional champurrado — a masa-thickened, cinnamon-spiced Mexican hot chocolate — alongside an Oaxacan and Salvadoran menu. Open till 2:30am.</p>
      <p class="hc-addr">2128 Mission St, SF, CA 94110</p>
      <div class="hc-links"><a href="https://www.yelp.com/biz/la-oaxaque%C3%B1a-san-francisco-2" target="_blank" rel="noopener">Yelp</a></div>
    </div>

    <div class="hc-card" data-key="zazie">
      <h3>Zazie</h3>
      <div class="hc-nb">Cole Valley</div>
      <p class="hc-drink">Signature "Baked Hot Chocolate" with golden marshmallows (GF)</p>
      <p class="hc-note">Tip-free brunch institution that serves its baked hot chocolate warm in a bowl, topped with golden marshmallows.</p>
      <p class="hc-addr">941 Cole St, SF, CA 94117</p>
      <div class="hc-links"><a href="https://www.zaziesf.com/dinner-menu-options.html" target="_blank" rel="noopener">Website</a><a href="https://www.yelp.com/biz/zazie-san-francisco" target="_blank" rel="noopener">Yelp</a></div>
    </div>

    <div class="hc-card" data-key="icecream">
      <h3>The Ice Cream Bar</h3>
      <div class="hc-nb">Cole Valley</div>
      <p class="hc-drink">Soda-fountain-style hot chocolate</p>
      <p class="hc-note">A 1930s-inspired soda fountain down the street from Zazie, with house-made syrups and seasonal specials.</p>
      <p class="hc-addr">~815 Cole St, SF, CA 94117</p>
      <div class="hc-links"></div>
    </div>

    <div class="hc-card" data-key="spro">
      <h3>SPRO Coffee Lab</h3>
      <div class="hc-nb">Castro</div>
      <p class="hc-drink">Chocolate latte / house hot chocolate</p>
      <p class="hc-note">Multiple SF locations (Church St, Golden Gate Ave, West Portal, and a newly opened Spear St shop as of July 2026) — check which one is closest to you.</p>
      <p class="hc-addr">500 Church St, SF, CA 94114</p>
      <div class="hc-links"><a href="https://www.yelp.com/biz/spro-coffee-lab-san-francisco-8" target="_blank" rel="noopener">Yelp</a></div>
    </div>

    <div class="hc-card" data-key="christopherelbow">
      <h3>Christopher Elbow Chocolates</h3>
      <div class="hc-nb">Location unconfirmed</div>
      <p class="hc-drink">Craft drinking chocolate</p>
      <p class="hc-note">Artisan chocolatier featured on the Eater map — the exact SF address isn't confirmed.</p>
      <p class="hc-addr">(location within SF unconfirmed)</p>
      <div class="hc-links"><a href="https://sf.eater.com/venue/74859/christopher-elbow-chocolates" target="_blank" rel="noopener">Eater</a></div>
    </div>

    <div class="hc-card" data-key="keikos">
      <h3>Keiko's Coffee Shop</h3>
      <div class="hc-nb">Location unconfirmed</div>
      <p class="hc-drink">House hot chocolate</p>
      <p class="hc-note">Featured on the Eater map — findable via Instagram; the exact address isn't confirmed.</p>
      <p class="hc-addr">(address unconfirmed)</p>
      <div class="hc-links"><a href="https://sf.eater.com/venue/908880/keikos-coffee-shop" target="_blank" rel="noopener">Eater</a></div>
    </div>

  </div>
</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
<script>
(function(){
  var spots = [
    {key:'buenavista', name:'Buena Vista Cafe', nb:'Fisherman\'s Wharf', lat:37.8063, lng:-122.4206},
    {key:'ghirardelli', name:'Ghirardelli Chocolate Shop', nb:'Fisherman\'s Wharf', lat:37.8057, lng:-122.4227},
    {key:'xox', name:'XOX Truffles', nb:'North Beach', lat:37.8016, lng:-122.4119},
    {key:'fairmont', name:'Fairmont Gingerbread House', nb:'Nob Hill', lat:37.7924, lng:-122.4098},
    {key:'dandelion', name:'Dandelion Chocolate', nb:'Mission', lat:37.7614, lng:-122.4219},
    {key:'oaxaquena', name:'La Oaxaqueña', nb:'Mission', lat:37.7629, lng:-122.4198},
    {key:'zazie', name:'Zazie', nb:'Cole Valley', lat:37.766, lng:-122.450},
    {key:'icecream', name:'The Ice Cream Bar', nb:'Cole Valley', lat:37.7676, lng:-122.4501},
    {key:'spro', name:'SPRO Coffee Lab', nb:'Castro', lat:37.7628, lng:-122.4287}
  ];
  var map = L.map('hcMap').setView([37.784, -122.425], 13);
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  }).addTo(map);
  var markers = {};
  spots.forEach(function(s){
    var marker = L.marker([s.lat, s.lng]).addTo(map);
    var card = document.querySelector('.hc-card[data-key="'+s.key+'"]');
    marker.bindPopup('<strong>'+s.name+'</strong>'+s.nb+'<br><a href="#'+s.key+'">See description &darr;</a>');
    marker.on('click', function(){ flash(s.key); });
    markers[s.key] = marker;
  });
  function flash(key){
    var card = document.querySelector('.hc-card[data-key="'+key+'"]');
    if(!card) return;
    card.scrollIntoView({behavior:'smooth', block:'center'});
    card.classList.add('hc-flash');
    setTimeout(function(){ card.classList.remove('hc-flash'); }, 1600);
  }
  document.querySelectorAll('.hc-card').forEach(function(card){
    card.addEventListener('click', function(){
      var key = card.getAttribute('data-key');
      if(markers[key]){
        markers[key].openPopup();
        map.setView([markers[key].getLatLng().lat, markers[key].getLatLng().lng], 14, {animate:true});
      }
    });
  });
})();
</script>
