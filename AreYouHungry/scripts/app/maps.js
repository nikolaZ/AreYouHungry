var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        isGoogleMapsInitialized: false
    });

    function init(e) {
        kendoApp.showLoading();

        kendo.bind(e.view.element, viewModel);

        if (typeof google === "undefined") {
            return;
        }

        viewModel.set("isGoogleMapsInitialized", true);

        var that = this,
                position;

        navigator.geolocation.getCurrentPosition(
                function (position) {
                    debugger
                    position = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

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
                    map.panTo(position);

                    initMap(position, map);

                    kendoApp.hideLoading();
                },
                function (error) {
                    //default map coordinates
                    position = new google.maps.LatLng(43.459336, -80.462494);
                    map.panTo(position);

                    that.hideLoading();

                    navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                        function () { }, "Location failed", 'OK');
                },
                {
                    timeout: 30000,
                    enableHighAccuracy: true
                }
            );

    }

    function initMap(position, map) {
        // TODO: get latitude and longitude from restaurant
        debugger
        console.log(position);
        var lat = position.ob;
        var long = position.pb;

        httpRequest.getJSON(app.servicesBaseUrl + "maps?lat="+ lat + "&lng=" + long)
        .then(function (data) {
            debugger
            getMarkers(map, data);

        }, function () {
            // TODO: error

        });

    }

    function attachMessage(marker) {
        var infowindow = new google.maps.InfoWindow({
            content: marker.content
        });

        google.maps.event.addListener(marker.marker, 'click', function () {
            console.log(infowindow);
            infowindow.open(marker.marker.map, marker.marker);
            marker.marker.map.panTo(marker.marker.getPosition());
            marker.marker.map.setZoom(16);
        });
    };

    function getMarkers(map, data) {
        debugger
        for (var i = 0; i < data.length; i++) {
            var marker = new Marker(data[i].latitude, data[i].longitude, data[i].name, data[i].name, map);
            attachMessage(marker);
        }
    };

    var Marker = function(lat, long, title, content, map) {
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

    a.maps = {
        init: init
    };

}(app, kendoApp.app));
