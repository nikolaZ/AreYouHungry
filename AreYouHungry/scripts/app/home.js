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

                // test purposes
                //setTimeout(function () {
                //    kendoApp.hideLoading();

                //}, 4000);

                kendoApp.hideLoading();

                viewModel.set("topRestaurants", topRestaurants);

            }, function () {

                kendoApp.hideLoading();
                $("#error-view").show().data().kendoMobileModalView.open();

            });
        }

        a.home = {
            init: init
        };

}(app, kendoApp.app));