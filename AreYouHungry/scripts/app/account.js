var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        cartLogs: [],
        cartLogsDs: [],
        getMore: function () {
            headers = {
                Authorization: "Bearer " + sessionStorage["accessToken"]
            };
            httpRequest.getJSON(app.servicesBaseUrl + "cartLogs", headers)
            .then(function (cartLogs) {
                debugger
                console.log(viewModel.get("cartLogsDs"));
                $.merge(cartLogs, viewModel.get("cartLogsDs")._pristine);
                console.log(viewModel.get("cartLogsDs").data().length);
                viewModel.get("cartLogsDs").data(cartLogs);
                console.log(viewModel.get("cartLogsDs").data().length);
            })
        }
    });

    // TODO: check for user and throw exception
    // TODO: refactor -> sendToken()
    function init(e) {
        kendo.bind(e.view.element, viewModel);

        httpRequest.getJSON(app.servicesBaseUrl + "cartLogs", { Authorization: "Bearer " + sessionStorage["accessToken"] })
        .then(function (cartLogs) {
            viewModel.set("cartLogs", cartLogs);

            var dataSource = new kendo.data.DataSource({
                data: cartLogs,
                //group: "logDateTime"
            });
            viewModel.set("cartLogsDs", dataSource);
        });
    }   
            //ds = new kendo.data.DataSource({
                //data: cartLogs,
                //group: "logDateTime" 
            //});
            //ds.read();

            //for (var i = 0; i < cartLogs.length; i++) {
            //    ds.add(cartLogs[i]);

            //}

           // console.log(ds.data());
           // viewModel.set("cartLogsDs", ds);

        //});

        

        //console.log(dataSourceS.data());
        //viewModel.set("cartLogsDs", dataSourceS);
   // }

    a.cartLogs = {
        init: init
    };
}(app));
