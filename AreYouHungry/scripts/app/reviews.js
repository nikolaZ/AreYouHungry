var app = app || {};

(function (a, kendoApp) {
    const PageSize = 20;
    var _page = 1;

    var viewModel = kendo.observable({
        id: -1,
        name: "",
        reviews: {},
        getMore: function () {
            var id = viewModel.get("id");
            httpRequest.getJSON(app.servicesBaseUrl + "reviews?restaurantId=" + id + "&pageSize=" + PageSize + "&page=" + _page)
            .then(function (reviews) {
                $.merge(reviews, viewModel.get("reviews")._pristine);
                viewModel.get("reviews").data(reviews);
            })
        },
    });

    function init(e) {
        // TODO: decide if data will be loaded every time or only on init
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        var name = e.view.params.name;

        viewModel.set("id", id);
        viewModel.set("name", name);

        _page = 1;

        httpRequest.getJSON(app.servicesBaseUrl + "reviews?restaurantId=" + id + "&pageSize=" + PageSize + "&page=" + _page)
        .then(function (reviews) {
            var dataSource = new kendo.data.DataSource({
                data: reviews,
            });
            viewModel.set("reviews", dataSource);
            _page++;
        });
    }

    a.restaurant.reviews = {
        init: init
    };

}(app, kendoApp.app));