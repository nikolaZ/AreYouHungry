var app = app || {};

(function (a) {
    const PageSize = 20;
    var page = 1;

    var viewModel = kendo.observable({
        cartLogs: [],
        cartLogsDs: [],
        username: {},
        getMore: function () {
            var header = a.utils.getAuthHeader();
            httpRequest.getJSON(app.servicesBaseUrl + "cartLogs", header)
            .then(function (cartLogs) {
                debugger
                console.log(viewModel.get("cartLogsDs"));
                $.merge(cartLogs, viewModel.get("cartLogsDs")._pristine);
                console.log(viewModel.get("cartLogsDs").data().length);
                console.log(viewModel.get("cartLogsDs").data());
                viewModel.get("cartLogsDs").data(cartLogs);
                console.log(viewModel.get("cartLogsDs").data());
                console.log(viewModel.get("cartLogsDs").data().length);
            })
        },      
    });

    // TODO: check for user and throw exception
    function init(e) {
        kendo.bind(e.view.element, viewModel);

        var header = a.utils.getAuthHeader();
        httpRequest.getJSON(app.servicesBaseUrl + "cartLogs", header)
        .then(function (cartLogs) {
            viewModel.set("cartLogs", cartLogs);

            var dataSource = new kendo.data.DataSource({
                data: cartLogs,
            });
            viewModel.set("cartLogsDs", dataSource);
            viewModel.set("username", cartLogs[0].username || "");
            //var lv = $(e.view.element).find("[data-bind='source: cartLogsDs']").data("kendoMobileListView");
            console.log(lv);
            //lv.dataSource.data(cartLogs);

            //lv.dataSource._group = {
            //    field: "logDateTime",
            //    dir: "desc"
            //};
           // lv.setDataSource(dataSource);

            //lv.dataSource.fetch();
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
