var app = app || {};

(function (a, kendoApp) {
    var DirectionsEnum = {
        ASC: "asc",
        DESC: "desc",
    };

    const PageSize = 20;
    var _page = 1;
    var _direction = DirectionsEnum.DESC;
    var _view = {};

    var viewModel = kendo.observable({
        cartLogs: [],
        cartLogsDs: [],
        hasPages: true,
        logoff: function () {
            var header = a.utils.getAuthHeader();
            httpRequest.postJSON(a.servicesBaseUrl + "account/logout", header, {})
                    .then(function (cartLogs) {

                        sessionStorage.clear();
                        a.utils.beep(1);
                        kendoApp.navigate("views/account-login-view.html#account-login-view");

                    }, function (error) {
                        a.utils.showError("Log off failed.");
                    });
        },
        getMore: function () {
            kendoApp.showLoading();

            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {
                if (cartLogs.length > 0) {
                    var first = viewModel.get("cartLogsDs")._pristine;
                    var second = cartLogs;
                    var u = $.merge($.merge([], first), second);

                    viewModel.get("cartLogsDs").data(u);
                }

                if (cartLogs.length == 0 || cartLogs.length < PageSize) {
                    viewModel.set("hasPages", false);
                }

                kendoApp.hideLoading();

                _page++;
            }, function (error) {
                kendoApp.hideLoading();
                a.utils.showError("Loading more elements failed.");
            });
        }, 
        getOldest: function () {
            kendoApp.showLoading();

            if (_direction == DirectionsEnum.ASC) {
                return;
            }

            _direction = DirectionsEnum.ASC;
            _page = 1;
            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {
                kendoApp.hideLoading();
                viewModel.set("cartLogs", cartLogs);

                var dataSource = new kendo.data.DataSource({
                    data: cartLogs,
                });
                viewModel.set("cartLogsDs", dataSource);

                _page++;
                _view.element.data("kendoMobileView").scroller.reset();
            }, function (error) {
                kendoApp.hideLoading();

                a.utils.showError("Loading oldest elements failed.");
            });

            viewModel.set("hasPages", true);
        },
        getNewest: function () {
            kendoApp.showLoading();

            if (_direction == DirectionsEnum.DESC) {
                return;
            }

            _direction = DirectionsEnum.DESC;
            _page = 1;
            var header = a.utils.getAuthHeader();
            var url = app.servicesBaseUrl + "cartLogs?pageSize=" + PageSize + "&page=" + _page + "&direction=" + _direction;
            httpRequest.getJSON(url, header)
            .then(function (cartLogs) {
                kendoApp.hideLoading();
                viewModel.set("cartLogs", cartLogs);

                var dataSource = new kendo.data.DataSource({
                    data: cartLogs,
                });
                viewModel.set("cartLogsDs", dataSource);

                _page++;
                _view.element.data("kendoMobileView").scroller.reset();
            }, function (error) {
                kendoApp.hideLoading();
                a.utils.showError("Loading newest elements failed.");
            });

            viewModel.set("hasPages", true);
        },
    });


    function init(e) {
        kendoApp.showLoading();
        kendo.bind(e.view.element, viewModel);
        _view = e.view;

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
            kendoApp.hideLoading();
        }, function (error) {
            kendoApp.hideLoading();
        });
    }   

    a.cartLogs = {
        init: init
    };
}(app, kendoApp.app));
