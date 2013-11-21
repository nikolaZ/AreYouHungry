var app = app || {};

(function (a, kendoApp) {

        var viewModel = kendo.observable({
            topRestaurants: []
        });

        function init(e) {
            kendo.bind(e.view.element, viewModel);

            kendoApp.showLoading();

            httpRequest.getJSON(app.servicesBaseUrl + "restaurants/top")
            .then(function (topRestaurants) {

                kendoApp.hideLoading();

                viewModel.set("topRestaurants", topRestaurants);

            }, function () {
                navigator.notification.alert("Unable to determine current location. Cannot connect to GPS satellite.",
                       function () { }, "Location failed", 'OK');
                kendoApp.hideLoading();
                $("#error-view").show().data().kendoMobileModalView.open();

            });
        }

        a.home = {
            init: init
        };

}(app, kendoApp.app));