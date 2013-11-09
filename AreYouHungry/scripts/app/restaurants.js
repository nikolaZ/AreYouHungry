var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentRestaurant: []
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/details/" + id)
        .then(function (currentRestaurant) {
            viewModel.set("currentRestaurant", currentRestaurant);
        });
    }

    a.restaurant = {
        init: init
    };
}(app));
