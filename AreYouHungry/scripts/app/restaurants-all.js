﻿var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        restaurants: {},
        rds: {},       
        sortByRating: function (e) {
            console.log(e);
            var lv = $(e.view.document).find("[data-bind='source: rds']").data("kendoMobileListView");
            debugger

            lv.dataSource._group = {
                field: "rate",
                dir: "desc"
            };

            //lv.dataSource._group = {
            //    field: "letter",
            //};

            lv.dataSource.fetch();
        }
    });

    function init(e) {
        kendoApp.showLoading();

        kendo.bind(e.view.element, viewModel);

        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/all")
        .then(function (restaurants) {
            kendoApp.hideLoading();

            viewModel.set("restaurants", restaurants);

            var lv = e.view.element.find("[data-bind='source: rds']").data("kendoMobileListView");
            
            var setDs = new kendo.data.DataSource({
                data: restaurants,
                group: {
                    field: "letter",
                    dir: "asc"
                },
                schema: {
                    parse: function (data) {
                        for (var i = 0; i < data.length; i++) {
                            data[i].letter = data[i].name.charAt(0);
                            data[i].rate = data[i].rating | 0;
                        }
                        return data;
                    }
                },
            })

            lv.setDataSource(setDs);

            lv.dataSource.fetch();
        }, function () {

            kendoApp.hideLoading();
        });
    }

    a.restaurantsAll = {
        init: init
    };
}(app, kendoApp.app));
