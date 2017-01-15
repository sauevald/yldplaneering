var map = new L.Map('map', {
    center: [59.2993, 24.541],
    zoom: 11
});

map.attributionControl.setPrefix('');

var opacity = 0.8;

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Aluskaart &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var sauevyp = L.tileLayer('http://mapwarper.net/maps/tile/17658/{z}/{x}/{y}.png', {
    attribution: '<a href="http://sauevald.kovtp.ee/et/uldplaneering" target="_blank">Saue valla üldplaneering 2016</a>',
    opacity: opacity
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

var allMapLayers = {
    'osm': osm,
    'sauevyp': sauevyp,
    'sauelyp': sauelyp,
    'kernuyp': kernuyp,
    'nissiyp': nissiyp
};

L.control.layers({
    'OpenStreetMap': osm
}, {
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
        "<h1><a href=\'\/yldplaneering\' title=\'Saue valla üldplaneering\'>Saue valla üldplaneering</a></h1><a href=\'https:\/\/sauevald.ee\' title=\'Saue valla veebileht\'>sauevald.ee</a> | <a href=\'https:\/\/github.com\/sauevald\/yldplaneering\/issues\' title=\'Anna tagasisidet\' target=\'_blank\'>Tagasiside</a> | <a href=\'https:\/\/buildig.com\' title=\'Teostus: BUILDIG\' target=\'_blank\'>Teostus: BUILDIG</a>"
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
