var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentRestaurant: {}
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/details/" + id)
        .then(function (currentRestaurant) {
            viewModel.set("currentRestaurant", currentRestaurant);
        });

        initMap(e);
    }

    function initMap(e){
        // TODO: get latitude and longitude
        var lat = 42.6480217;
        var long = 23.3769659;
        var mapOptions = {
            zoom: 10,
            center: new google.maps.LatLng(lat, long),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        console.log(e);
        var element = $(window.document).find("#map");
        debugger
        var map = new google.maps.Map(element,
        mapOptions);

        var marker = new Marker(lat, long, "Ime na Restorant", "tekst za restoranta", map);

        var infowindow = new google.maps.InfoWindow({
            content: marker.content
        });

        google.maps.event.addListener(marker.marker, 'click', function () {
            console.log(infowindow);
            infowindow.open(marker.marker.map, marker.marker);
            marker.marker.map.panTo(marker.marker.getPosition());
            marker.marker.map.setZoom(10);
        });
    }

    function Marker(lat, long, title, content, map) {
        this.lat = lat;
        this.long = long;
        this.title = title;
        this.content = content;
        this.map = map;
        this.position = new google.maps.LatLng(this.lat, this.long);
        this.marker = new google.maps.Marker({
            position: this.position,
            map: this.map,
            title: this.title,
        });
        this.info = new google.maps.InfoWindow({
            content: this.content
        });
    };

    //google.maps.event.addDomListener(window, 'load', initMap);

    a.maps = {
        init: init
    };
}(app));
