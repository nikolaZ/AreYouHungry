var app = app || {};

(function (a) {
    var DirectionsEnum = {
        ASC: "asc",
        DESC: "desc",
    };

    const PageSize = 20;
    var _page = 1;
    var _direction = DirectionsEnum.DESC;

    var viewModel = kendo.observable({
        cartLogs: [],
        cartLogsDs: [],
        hasPages: true,
        getMore: function () {
            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {

                if (cartLogs.length > 0) {

                    var first = viewModel.get("cartLogsDs")._pristine;
                    var second = cartLogs;
                    var u = $.merge($.merge([], first), second);

                    viewModel.get("cartLogsDs").data(u);

                    // TODO: hide button and show when reinit
                }

                if (cartLogs.length == 0 || cartLogs.length < PageSize) {
                    viewModel.set("hasPages", false);
                }

                _page++;
            });
        }, // TODO: Scroll to Top
        getOldest: function () {
            if (_direction == DirectionsEnum.ASC) {
                return;
            }

            _direction = DirectionsEnum.ASC;
            _page = 1;
            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {
                viewModel.set("cartLogs", cartLogs);

                var dataSource = new kendo.data.DataSource({
                    data: cartLogs,
                });
                viewModel.set("cartLogsDs", dataSource);

                _page++;
            });

            viewModel.set("hasPages", true);
        },
        getNewest: function () {
            if (_direction == DirectionsEnum.DESC) {
                return;
            }

            _direction = DirectionsEnum.DESC;
            _page = 1;
            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {
                viewModel.set("cartLogs", cartLogs);

                var dataSource = new kendo.data.DataSource({
                    data: cartLogs,
                });
                viewModel.set("cartLogsDs", dataSource);

                _page++;
            });

            viewModel.set("hasPages", true);
        },
    });

    // TODO: check for user and throw exception
    function init(e) {
        kendo.bind(e.view.element, viewModel);

        var header = a.utils.getAuthHeader();
        var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
        httpRequest.getJSON(url , header)
        .then(function (cartLogs) {
            viewModel.set("cartLogs", cartLogs);

            var dataSource = new kendo.data.DataSource({
                data: cartLogs,
            });
            viewModel.set("cartLogsDs", dataSource);

            _page++;
        });
    }   

    a.cartLogs = {
        init: init
    };
}(app));
