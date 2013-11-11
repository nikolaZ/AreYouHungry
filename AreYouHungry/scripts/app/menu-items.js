var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentMenuItem: {},
        addToCart: app.cart.add
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "meals/" + id)
        .then(function (currentMenuItem) {
            viewModel.set("currentMenuItem", currentMenuItem);
        });
    }

    a.menuItem = {
        init: init
    };
}(app));

