L.MyHash = function(map, options) {
  L.Hash.call(this, map, options);
};

L.MyHash.prototype = L.Util.create(L.Hash.prototype);
L.MyHash.prototype.constructor = L.MyHash;

L.Util.extend(L.MyHash.prototype, {
  parseHash: function(hash) {
    console.log('parseHash: ' + hash);
    var parsed = L.Hash.prototype.parseHash.call(this, hash);
    console.log('parseHash: ' + JSON.stringify(parsed));
    return parsed;
  },

  formatHash: function(map) {
    var formatted = L.Hash.prototype.formatHash.call(this, map);
    console.log('formatHash: ' + formatted);
    return formatted;
  },

  update: function() {
    L.Hash.prototype.update.call(this);
    console.log('update');
  }
});

L.myHash = function(map, options) {
  return new L.MyHash(map, options);
};

var map = new L.Map('map', {
  center: [59.2993, 24.541],
  zoom: 11
});

map.attributionControl.setPrefix('Teostus: Tormi Tabor');

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Aluskaart &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
});

// KEMITi aluskaardid
// mustvalge aluskaart
var blacktile = L.tileLayer(
  'https://gsavalik.envir.ee/geoserver/gwc/service/tms/1.0.0/baasandmed:black@EPSG:3857@png/{z}/{x}/{-y}.png', {
    minZoom: 0,
    maxZoom: 14,
    continuousWorld: false,
    noWrap: false,
    attribution: 'MV aluskaart - andmed: <a href="https://www.maaamet.ee/" target="_blank" rel="noopener noreferrer">Maa-amet</a>, <a href="http://keskkonnaagentuur.ee" target="_blank" rel="noopener noreferrer">Keskkonnaregister (KAUR)</a> ning <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>; teostus <a href="https://github.com/e-gov/kem-gsavalik/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">KEMIT ja kaastöölised</a>'
  }
);

var blackwms = L.tileLayer.wms(
  'https://gsavalik.envir.ee/geoserver/baasandmed/ows', {
    layers: 'baasandmed:black',
    transparent: true,
    format: 'image/png',
    minZoom: 15,
    maxZoom: 20,
    version: '1.1.1',
    crs: L.CRS.EPSG4326,
    attribution: 'MV aluskaart - andmed: <a href="https://www.maaamet.ee/" target="_blank" rel="noopener noreferrer">Maa-amet</a>, <a href="http://keskkonnaagentuur.ee" target="_blank" rel="noopener noreferrer">Keskkonnaregister (KAUR)</a> ning <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap contributors</a>; teostus <a href="https://github.com/e-gov/kem-gsavalik/blob/master/LICENSE" target="_blank" rel="noopener noreferrer">KEMIT ja kaastöölised</a>'
  }
);

var black = L.layerGroup([blacktile, blackwms]);

var pohi = L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus-geo?", {
  format: 'image/png',
  transparent: true,
  minZoom: 15,
  layers: 'pohi_vv',
  crs: L.CRS.EPSG4326,
  attribution: 'Põhikaart &copy; <a href="https://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
});

// var orto = L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus-geo?", {
//     format: 'image/png',
//     transparent: true,
//     layers: 'EESTIFOTO',
//     crs: L.CRS.EPSG4326,
//     attribution: 'Ortofoto &copy; <a href="http://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
// });

var orto = new L.TileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/foto@GMC/{z}/{x}/{-y}.png', {
  attribution: 'Ortofoto &copy; <a href="https://www.maaamet.ee/" target="_blank" rel="noopener noreferrer">Maa-Amet</a>'
}).addTo(map);

// var hybriid = L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus-geo?", {
//     format: 'image/png',
//     transparent: true,
//     layers: 'HYBRID',
//     crs: L.CRS.EPSG4326
// });

var hybriid = new L.TileLayer('https://tiles.maaamet.ee/tm/tms/1.0.0/hybriid@GMC/{z}/{x}/{-y}.png', {}).addTo(map);

var kataster = L.tileLayer.wms("https://kaart.maaamet.ee/wms/alus-geo?", {
  format: 'image/png',
  transparent: true,
  minZoom: 15,
  layers: 'TOPOYKSUS_6569',
  crs: L.CRS.EPSG4326
});

var puurkaev = L.tileLayer(
  'https://gsavalik.envir.ee/geoserver/gwc/service/tms/1.0.0/eelis:kr_puurk_sankaitseala@EPSG:3857@png/{z}/{x}/{-y}.png', {
    minZoom: 0,
    maxZoom: 14,
    continuousWorld: false,
    noWrap: false,
    attribution: "Puurkaevud: EELIS - <a href=\"http://keskkonnaagentuur.ee\" target=\"_blank\" rel=\"noopener noreferrer\">Keskkonnaagentuur</a>",
  }
);

var sauevyp = L.tileLayer('https://mapwarper.net/maps/tile/17658/{z}/{x}/{y}.png', {
  attribution: '<a href="https://sauevald.ee/uldplaneering" target="_blank">Saue valla üldplaneering 2016</a>',
  opacity: 0.8
}).addTo(map);
var sauelyp = L.tileLayer('https://mapwarper.net/maps/tile/22978/{z}/{x}/{y}.png', {
  attribution: '<a href="https://sauevald.ee/uldplaneering" target="_blank">Saue linna üldplaneering 2010</a>'
}).addTo(map);
var kernuyp = L.tileLayer('https://mapwarper.net/layers/tile/667/{z}/{x}/{y}.png', {
  attribution: '<a href="https://sauevald.ee/uldplaneering" target="_blank">Kernu valla üldplaneering 2006</a>'
}).addTo(map);
var nissiyp = L.tileLayer('https://mapwarper.net/maps/tile/17668/{z}/{x}/{y}.png', {
  attribution: '<a href="https://sauevald.ee/uldplaneering" target="_blank">Nissi valla üldplaneering 2014</a>'
}).addTo(map);

var harjump = L.tileLayer('https://mapwarper.net/maps/tile/36628/{z}/{x}/{y}.png', {
  attribution: '<a href="https://maakonnaplaneering.ee/harju-maakonnaplaneering" target="_blank">Harju maakonnaplaneering 2030+. Tehnilised võrgustikud</a>'
});
var harjumpbase = L.tileLayer('https://mapwarper.net/maps/tile/36628/{z}/{x}/{y}.png', {
  attribution: '<a href="https://maakonnaplaneering.ee/harju-maakonnaplaneering" target="_blank">Harju maakonnaplaneering 2030+. Tehnilised võrgustikud</a>'
});

L.control.locate({
  strings: {
    title: "Näita minu asukohta"
  }
}).addTo(map);

function formatJSON(rawjson) {
  var json = {},
    res, key, loc = [];
  res = rawjson.addresses;
  for (var i in res) {
    key = res[i].ipikkaadress;
    loc = L.latLng(res[i].viitepunkt_b, res[i].viitepunkt_l);
    json[key] = loc;
  }
  return json;
};

map.addControl(new L.Control.Search({
  url: 'https://inaadress.maaamet.ee/inaadress/gazetteer?features=KATASTRIYKSUS&address={s}',
  jsonpParam: 'callback',
  formatData: formatJSON,
  textPlaceholder: 'Otsi katastriüksust aadressi/tunnuse järgi',
  marker: L.circleMarker([0, 0], {
    radius: 20,
    color: "#ffcc00"
  }),
  autoCollapse: true,
  autoType: false,
  minLength: 2,
  zoom: 18
}));

var allMapLayers = {
  'osm': osm,
  'pohi': pohi,
  'orto': orto,
  'harjumpbase': harjumpbase,
  'hybriid': hybriid,
  'kataster': kataster,
  'sauevyp': sauevyp,
  'sauelyp': sauelyp,
  'kernuyp': kernuyp,
  'nissiyp': nissiyp,
  'harjump': harjump
};

L.control.layers({
  'OpenStreetMap': osm,
  'Põhikaart (z15+)': pohi,
  'Ortofoto': orto,
  'Harju MP 2035+': harjumpbase
}, {
  'Hübriidkaart': hybriid,
  'Katastripiirid (z15+)': kataster,
  'Saue valla ÜP': sauevyp,
  'Saue linna ÜP': sauelyp,
  'Kernu valla ÜP': kernuyp,
  'Nissi valla ÜP': nissiyp,
  'Harju MP 2035+': harjump
}).addTo(map);

$(function() {
  $("#slider").slider({
    orientation: "vertical",
    range: "min",
    min: 0,
    max: 100,
    value: 80,
    slide: function(e, ui) {
      sauevyp.setOpacity(ui.value / 100);
      sauelyp.setOpacity(ui.value / 100);
      kernuyp.setOpacity(ui.value / 100);
      nissiyp.setOpacity(ui.value / 100);
      harjump.setOpacity(ui.value / 100);
    }
  });
});

// L.hash(map, allMapLayers);

var layerHashKeys = {
  'osm': osm,
  'o': orto,
  'm': harjumpbase,
  'h': hybriid,
  'k': kataster,
  'p': pohi,
  'sv': sauevyp,
  'sl': sauelyp,
  'ke': kernuyp,
  'ni': nissiyp,
  'hm': harjump,
  'pk': puurkaev
};
L.myHash(map, layerHashKeys);
