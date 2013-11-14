var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        currentRestaurant: {}
    });

    function init(e) {
        kendoApp.showLoading();

        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/details/" + id)
        .then(function (currentRestaurant) {
            viewModel.set("currentRestaurant", currentRestaurant);
            initMap(currentRestaurant);
            console.log(currentRestaurant);
            kendoApp.hideLoading();

        }, function () {
            // TODO: error and default location
            kendoApp.hideLoading();
        });
    }

    function initMap(restaurant){
        // TODO: get latitude and longitude from restaurant
        var lat = 42.6480217;
        var long = 23.3769659;
        var mapOptions = {
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_BOTTOM
            },
            mapTypeControl: false,
            streetViewControl: false
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var geocoder = new google.maps.Geocoder();
        
        var position = new google.maps.LatLng(lat, long);
        map.panTo(position);

        var _lastMarker = new google.maps.Marker({
            map: map,
            position: position
        });

        var infowindow = new google.maps.InfoWindow({
            content: "<strong>" + restaurant.name + "</strong>"
        });

        google.maps.event.addListener(_lastMarker, 'click', function () {
            infowindow.open(map, _lastMarker);
            map.panTo(_lastMarker.getPosition());
            map.setZoom(25);
        });
    }

    a.maps = {
        init: init
    };

}(app, kendoApp.app));
