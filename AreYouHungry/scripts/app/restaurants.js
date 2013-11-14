var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        currentRestaurant: {},
        currentMenu: {},
        currentPhotos: {},
        goToMenu: goToMenu,
        goToPhotos: goToPhotos,
        goToReviewWriting: goToReviewWriting,
        goToMap: goToMap,
        addToCart: onAddToCart,
        purchasedQuantity: purchasedQuantity,
        ds: [],
        dds: {},
    });

    function purchasedQuantity(item) {
        var result = a.cart.quantity(item);
        return result;
    };

    function onAddToCart(e) {
        a.cart.add(e);

        // force rebinding
        var functionRebind = viewModel.get("purchasedQuantity");
        viewModel.set("purchasedQuantity", -1);
        viewModel.set("purchasedQuantity", functionRebind);
    };

    function goToMenu() {
        kendoApp.navigate("views/menu-view.html#menu-view?id=" + this.currentRestaurant.id);
    };

    function goToPhotos() {
        kendoApp.navigate("views/restaurant-photos-view.html#restaurant-photos-view?id=" + this.currentRestaurant.id);
    };

    function goToReviewWriting() {
        kendoApp.navigate("views/restaurant-photos-view.html#restaurant-photos-view?id=" + this.currentRestaurant.id);
    }

    function goToMap() {
        kendoApp.navigate("views/map-view.html#map-view?id=" + this.currentRestaurant.id);
    }

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
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/menu")
        .then(function (currentMenu) {
            viewModel.set("currentMenu", currentMenu);
        });
    }

    var photos = [];
    function photosInit(e) {
        debugger
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/photos")
        .then(function (currentPhotos) {
            viewModel.set("currentPhotos", currentPhotos);

            photos = currentPhotos;

            var ds = new kendo.data.DataSource({
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
            debugger
            var dds = new kendo.data.DataSource({
                data: currentPhotos
            });
            dds.read();

            var t = e.view.element.find("#scrollview-template").html();
            var template = kendo.template(t);
            var result = "";
            for (var i = 0; i < currentPhotos.length; i++) {
                result += template(currentPhotos[i]);
            }
            debugger
            var c = e.view.element.find("#scrollview")
                c = c.data("kendoMobileScrollView");
                console.log(c);
                c.content(result);
            debugger
        });
        

        var c = e.view.element.find("#scrollview");
        

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
}(app, kendoApp.app));
