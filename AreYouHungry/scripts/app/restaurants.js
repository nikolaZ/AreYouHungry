var app = app || {};

// TODO: refactor viewmodel
(function (a, kendoApp) {
    var viewModel = kendo.observable({
        currentRestaurant: {},
        currentMenu: {},
        currentPhotos: {},
        goToMenu: goToMenu,
        goToPhotos: goToPhotos,
        goToReviewWriting: goToReviewWriting,
        goToReviews: goToReviews,
        goToMap: goToMap,
        addToCart: onAddToCart,
        purchasedQuantity: purchasedQuantity,
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
        debugger
        kendoApp.navigate("views/menu-view.html#menu-view?id=" + this.currentRestaurant.id);
    };

    function goToPhotos() {
        kendoApp.navigate("views/restaurant-photos-view.html#restaurant-photos-view?id=" + this.currentRestaurant.id);
    };

    function goToReviewWriting() {
        kendoApp.navigate("views/review-write-view.html#restaurant-review-view?id=" + this.currentRestaurant.id + "&name=" + this.currentRestaurant.name);
    }

    function goToReviews() {
        kendoApp.navigate("views/restaurant-reviews-view.html#restaurant-reviews?id=" + this.currentRestaurant.id + "&name=" + this.currentRestaurant.name);
    }

    function goToMap() {
        kendoApp.navigate("views/restaurant-map-view.html#map-view?id=" + this.currentRestaurant.id);
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
        debugger
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/menu")
        .then(function (currentMenu) {
            viewModel.set("currentMenu", currentMenu);
        });
    }


    function photosInit(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/" + id + "/photos")
        .then(function (currentPhotos) {
            viewModel.set("currentPhotos", currentPhotos);

            var c = e.view.element.find("#container");

            var orientation = "";
            switch (window.orientation) {
                case -90:
                    orientation = "horizontal";
                    break;
                case 90:
                    orientation = "horizontal";
                    break;
                default:
                    orientation = "vertical";
                    break;
            }

            var t = e.view.element.find("#gallery-" + orientation + "-template").html();
            var template = kendo.template(t);
            var result = "";
            for (var i = 0; i < currentPhotos.length; i++) {
                result += template(currentPhotos[i]);
            }

            c.append(result);
        });

        window.addEventListener('orientationchange', doOnOrientationChange);

        function slideShow() {
            setInterval(function () {
                slideBy1(c, 1, viewModel.get("currentPhotos").length);
            }, 4000);
        }
    }

    function doOnOrientationChange() {
        switch (window.orientation) {
            case -90:
                debugger
                var images = $(document).find(".slide-image");
                images.removeClass("vertical");
                images.addClass("horizontal");
                break;
            case 90:
                var images = $(document).find(".slide-image");
                images.removeClass("vertical");
                images.addClass("horizontal");
                break;
            default:
                var images = $(document).find(".slide-image");
                images.removeClass("horizontal");
                images.addClass("vertical");
                break;
        }
    }

    var current = 0;

    function slideBy1(container, delta, imgsCount) {
        current = (current + delta + imgsCount) % imgsCount;
        container.css("left", (-(current * 100) + '%'));
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

    a.gallery = {
        swipe: function (e) {
            var cc = $(document).find("#container");
            var imgCount = viewModel.get("currentPhotos").length;

            if (e.direction == "right") {
                slideBy1(cc, 1, imgCount)
            }
            else {
                slideBy1(cc, -1, imgCount)
            }
        },
        hold: function () {

            // TODO: zoom view

        }
    };

}(app, kendoApp.app));
