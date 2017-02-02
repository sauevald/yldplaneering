var map = new L.Map('map', {
    center: [59.2993, 24.541],
    zoom: 11
});

map.attributionControl.setPrefix('');

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Aluskaart &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var pohi = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    minZoom: 15,
    layers: 'pohi_vv',
    crs: L.CRS.EPSG4326,
    attribution: 'Põhikaart &copy; <a href="http://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
});

var orto = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    layers: 'EESTIFOTO',
    crs: L.CRS.EPSG4326,
    attribution: 'Ortofoto &copy; <a href="http://geoportaal.maaamet.ee/est/Teenused/Avalik-WMS-teenus-p65.html" target="_blank">Maa-amet</a>'
});

var hybriid = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    layers: 'HYBRID',
    crs: L.CRS.EPSG4326
});
var kataster = L.tileLayer.wms("http://kaart.maaamet.ee/wms/alus-geo?", {
    format: 'image/png',
    transparent: true,
    minZoom: 15,
    layers: 'TOPOYKSUS_6569',
    crs: L.CRS.EPSG4326
});

var sauevyp = L.tileLayer('http://mapwarper.net/maps/tile/17658/{z}/{x}/{y}.png', {
    attribution: '<a href="http://sauevald.kovtp.ee/et/uldplaneering" target="_blank">Saue valla üldplaneering 2016</a>',
    opacity: 0.8
}).addTo(map);
var sauelyp = L.tileLayer('http://mapwarper.net/maps/tile/2259/{z}/{x}/{y}.png', {
    attribution: '<a href="http://saue.kovtp.ee/uldplaneering" target="_blank">Saue linna üldplaneering 2010</a>'
});
var kernuyp = L.tileLayer('http://mapwarper.net/layers/tile/667/{z}/{x}/{y}.png', {
    attribution: '<a href="http://kernu.kovtp.ee/uldplaneering" target="_blank">Kernu valla üldplaneering 2006</a>'
});
var nissiyp = L.tileLayer('http://mapwarper.net/maps/tile/17668/{z}/{x}/{y}.png', {
    attribution: '<a href="http://nissi.kovtp.ee/uldplaneering" target="_blank">Nissi valla üldplaneering 2014</a>'
});

L.control.locate({
    strings: {
        title: "Näita minu asukohta"
    }
}).addTo(map);

function formatJSON(rawjson) {
  var json = {},
    res, key, loc;

  res = rawjson.addresses;

  for (var i in res) {

    key = res[i].ipikkaadress;

    loc = L.latLng(res[i].viitepunkt_b, res[i].viitepunkt_l);

    json[key] = loc;
  }

  return json;
};

var searchOpts = {
  url: 'https://inaadress.maaamet.ee/inaadress/gazetteer?features=KATASTRIYKSUS&address={s}',
  jsonpParam: 'callback',
  formatData: formatJSON,
  zoom: 18,
  minLength: 2,
  autoType: false,
  textPlaceholder: 'Otsi katastriüksuse aadressi',
  marker: {
    icon: false,
    animate: false
  }
};

map.addControl(new L.Control.Search(searchOpts));


var allMapLayers = {
    'osm': osm,
    'pohi': pohi,
    'orto': orto,
    'hybriid': hybriid,
    'kataster': kataster,
    'sauevyp': sauevyp,
    'sauelyp': sauelyp,
    'kernuyp': kernuyp,
    'nissiyp': nissiyp
};

L.control.layers({
    'OpenStreetMap': osm,
    'Põhikaart (z15+)': pohi,
    'Ortofoto': orto
}, {
    'Hübriidkaart': hybriid,
    'Katastripiirid (z15+)': kataster,
    'Saue valla ÜP': sauevyp,
    'Saue linna ÜP': sauelyp,
    'Kernu valla ÜP': kernuyp,
    'Nissi valla ÜP': nissiyp
}, {
    position: 'topleft'
}).addTo(map);


var info = L.control();
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this._div.innerHTML = (
        "<h1><a href=\'\/yldplaneering\' title=\'Saue valla üldplaneering\'>Saue valla üldplaneering</a></h1><a href=\'https:\/\/sauevald.ee\' title=\'Saue valla veebileht\'>sauevald.ee</a> | <a href=\'https:\/\/tabor.ee\' title=\'Teostus: Tormi Tabor\' target=\'_blank\'>Teostus: Tormi Tabor</a> | <a href=\'https:\/\/github.com\/sauevald\/yldplaneering\/issues\' title=\'Anna kaardirakendusele tagasisidet\' target=\'_blank\'>Ettepanekud</a>"
    );
    return this._div;
};
info.addTo(map);

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
        }
    });
});

L.hash(map, allMapLayers);
