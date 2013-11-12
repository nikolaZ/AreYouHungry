var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        cartLogs: []
    });

    // TODO: check for user and throw exception
    // TODO: refactor -> sendToken()
    function init(e) {
        kendo.bind(e.view.element, viewModel);

        var token = sessionStorage["accessToken"];
        var header = {
            Authorization: "Bearer " + token
        };

        httpRequest.getJSON(app.servicesBaseUrl + "cartLogs", header)
        .then(function (cartLogs) {
            console.log(cartLogs);
            console.log(cartLogs[0].meals);
            console.log(cartLogs[0].meals[0]);
            console.log(cartLogs[0].meals[0].name);
            viewModel.set("cartLogs", cartLogs);
        });
    }

    a.cartLogs = {
        init: init
    };
}(app));
