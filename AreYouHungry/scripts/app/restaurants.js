var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentRestaurant: {},
        currentMenu: {},
        currentPhotos: {},
        goToMenu: goToMenu,
        goToPhotos: goToPhotos,
        addToCart: app.cart.add,
        ds:[]
    });

function goToMenu() {
    kendoApp.navigate("views/menu-view.html#menu-view?id=" + this.currentRestaurant.id);
};

function goToPhotos() {
    kendoApp.navigate("views/restaurant-photos-view.html#restaurant-photos-view?id=" + this.currentRestaurant.id);
};

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/details/" + id)
        .then(function (currentRestaurant) {
            viewModel.set("currentRestaurant", currentRestaurant);
        });

        tabstrip.badge(0, 5);
    }

    function menuInit(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/menu")
        .then(function (currentMenu) {
            viewModel.set("currentMenu", currentMenu);
        });
    }

    var photos = [];



    function photosInit(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/photos")
        .then(function (currentPhotos) {
            viewModel.set("currentPhotos", currentPhotos);
         
            photos = currentPhotos;

            ds = new kendo.data.DataSource({
                type: "json",
                transport: {
                    read: {
                        url: "http://localhost:2715/api/restaurants/1/photos"
                        //url: "http://demos.kendoui.com/service/Northwind.svc/Products"
                    }
                },
                serverPaging: false,
                pageSize: 22,
                schema: {
                    model: {
                        url: "url"
                    }
                }
            });

            viewModel.set("ds", ds);
        });

        var c = e.view.element.find("#scrollview");
        var t = e.view.element.find("#scrollview-template").html();

        kendo.bind($(c), viewModel);
    }

    a.restaurant = {
        init: init
    };

    a.restaurant.menu = {
        init: menuInit
    };

    a.restaurant.photos = {
        init: photosInit
    };
}(app));
