var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentRestaurant: {},
        currentMenu: {},
        goToMenu: function () {
            kendoApp.navigate("views/menu-view.html#menu-view?id=" + this.currentRestaurant.id);
        }
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/details/" + id)
        .then(function (currentRestaurant) {
            viewModel.set("currentRestaurant", currentRestaurant);
        });
    }

    function menuInit(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/menu/" + id)
        .then(function (currentMenu) {
            viewModel.set("currentMenu", currentMenu);
        });
    }

    a.restaurant = {
        init: init
    };

    a.restaurant.menu = {
        init: menuInit
    };
}(app));
