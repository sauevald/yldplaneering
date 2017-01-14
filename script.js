var map = new L.Map('map', {
    center: [59.2993, 24.541],
    zoom: 11
});

map.attributionControl.setPrefix('');

var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Aluskaart &copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var sauevyp = L.tileLayer('http://mapwarper.net/maps/tile/17658/{z}/{x}/{y}.png', {
    attribution: '<a href="http://sauevald.kovtp.ee/et/uldplaneering" target="_blank">Saue valla üldplaneering 2016</a>'
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
var harkuyp = L.tileLayer('http://mapwarper.net/maps/tile/2247/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.harku.ee/et/uldplaneering" target="_blank">Harku valla üldplaneering 2013</a>'
});
var sakuyp = L.tileLayer('http://mapwarper.net/maps/tile/17673/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.sakuvald.ee/uldplaneering" target="_blank">Saku valla üldplaneering 2009</a>'
});
var nommeypt = L.tileLayer('http://mapwarper.net/maps/tile/15739/{z}/{x}/{y}.png', {
    attribution: '<a href="http://www.tallinn.ee/est/ehitus/Nomme-linnaosa-uldplaneering" target="_blank">Nõmme linnaosa üldplaneeringu draft (2016, teed)</a>'
});

var allMapLayers = {
    'osm': osm,
    'sauevyp': sauevyp,
    'sauelyp': sauelyp,
    'kernuyp': kernuyp,
    'nissiyp': nissiyp,
    'harkuyp': harkuyp,
    'sakuyp': sakuyp,
    'nommeypt': nommeypt
};

L.control.layers({
    'OpenStreetMap': osm
}, {
    'Saue valla ÜP': sauevyp,
    'Saue linna ÜP': sauelyp,
    'Kernu valla ÜP': kernuyp,
    'Nissi valla ÜP': nissiyp,
    'Harku valla ÜP': harkuyp,
    'Saku valla ÜP': sakuyp,
    'Nõmme LO ÜP draft, teed': nommeypt
}, {
    position: 'topleft'
}).addTo(map);


var info = L.control();
info.onAdd = function(map) {
    this._div = L.DomUtil.create('div', 'info');
    this._div.innerHTML = (
        "<h1><a href=\'\/\' title=\'Saue valla üldplaneering 2016\'>Saue valla üldplaneering</a></h1><a href=\'https:\/\/sauevald.ee\' title=\'Saue valla veebileht\'>sauevald.ee</a> | <a href=\'https:\/\/tabor.ee\' title=\'Lehe haldaja\' target=\'_blank\'>Teostus Tormi Tabor</a> | <a href=\'https:\/\/github.com\/sauevald\/yldplaneering\/issues\' title=\'Anna tagasisidet\' target=\'_blank\'>Tagasiside</a>"
    );
    return this._div;
};
info.addTo(map);

L.hash(map, allMapLayers);
