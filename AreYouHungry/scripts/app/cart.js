var app = app || {};

(function (a) {
    var _view;

    var viewModel = kendo.observable({
        items: [],
        isCartEmpty: true,
        total: 0.01,
        totalRaw: 0,
        noItemsPrice: {},
        deleteItem: deleteFromCart,
        checkout: checkout
    });

    var cartItems = new kendo.data.DataSource({
        data: [],
        change: function () {
            var totalPrice = 0;
            var items = cartItems.data();

            if (items.length > 0) {
                viewModel.set("isCartEmpty", false);
            }
            else {
                viewModel.set("isCartEmpty", true);
            }

            for (var i = 0; i < items.length; i++) {
                var cartItem = items[i];
                totalPrice += cartItem.get("quantity") * cartItem.get("item.price");
            }

            totalPrice = totalPrice.toFixed(2);

            setBadge(totalPrice);

            // TODO Refactoring of statement
            viewModel.set("total", kendo.toString(parseFloat(totalPrice), "c"));
            viewModel.set("totalRaw", totalPrice);
            viewModel.set("items", items);
        },
        schema: {
            model: {
                fields: {
                    quantity: { type: "number", validation: { min: 1}},
                    item: {},
                    deleteMode: { type: "boolean" }
                },
                subtotal: function () {
                    var result = (this.get("quantity") * this.get("item").price).toFixed(2);
                    var parsedResult = parseFloat(result);
                    return kendo.toString(parsedResult, "c");
                },
                subtotalRaw: function () {
                    var result = (this.get("quantity") * this.get("item").price).toFixed(2);
                    var parsedResult = parseFloat(result);
                    return parsedResult;
                }
            }
        },
        aggregate: [{ field: "quantity", aggregate: "sum" }, ]
    });

    var addToCart = function (e) {
        var item = {};

        if (e.data.currentMenuItem) {
            item = e.data.currentMenuItem;
        }
        else {
            item = e.data;
        }

        var foundItem = findItem(item);

        if (foundItem) {
            foundItem.set("quantity", foundItem.quantity + 1);
        }
        else {
            cartItems.add({
                item: item,
                quantity: 1,
            });
        }
    };

    function deleteFromCart(e) {
        var item = e.data.item;
        var index = getIndex(item);
        var dataItem = cartItems.at(index);
        cartItems.remove(dataItem);

        // TODO: refactoring
        debugger
        var c = _view.scrollerContent.height();
        var cc = _view.scroller.element.height();
        var u = _view.scroller.scrollTop;

        // rescroll if neccessary
        if (_view.scrollerContent.height() < _view.scroller.element.height()) {
                _view.element.data("kendoMobileView").scroller.reset();
        }
        else if (u + cc > c) {
            _view.element.data("kendoMobileView").scroller.scrollTo(0, -cc);
        }
    }

    function checkout() {
        // TODO: check for user and throw exception

        var model = {
            total: viewModel.get("totalRaw"),
            meals: []
        };

        var items = cartItems.data();
        for (var i = 0; i < items.length; i++) {
            var cartItem = items[i];
            var meal = {
                name: cartItem.item.name,
                quantity: cartItem.quantity,
                price: cartItem.item.price,
                subtotal: cartItem.subtotalRaw(),
                restaurantName: cartItem.item.restaurantName
            };

            model.meals.push(meal);
        }

        var token = sessionStorage["accessToken"];
        var header = {
            Authorization: "Bearer " + token
        };
        httpRequest.postJSON(a.servicesBaseUrl + "cartlogs", model, header)
            .then(function () {
                console.log("yes");
        })
    };

    var getQuantity = function (item) {
        var foundItem = findItem(item);
        if (foundItem) {
            return foundItem.quantity;
        }

        return 0;
    }

    var findItem = function (item) {
        var length = cartItems.data().length;
        var data = cartItems.data();

        for (var index = 0; index < length; index++) {
            if (data[index].item.id === item.id) {
                return data[index];
            }
        }

        return undefined;
    };

    var getIndex = function (item) {
        var length = cartItems.data().length;
        var data = cartItems.data();

        for (var index = 0; index < length; index++) {
            if (data[index].item.id === item.id) {
                return index;
            }
        }

        return -1;
    };

    var setBadge = function (totalPrice) {
        if (cartItems.aggregates().quantity) {
            tabstrip.badge(2, cartItems.aggregates().quantity.sum);
        }
        else {
            var zero = (totalPrice - totalPrice).toFixed(0);
            tabstrip.badge(2, zero);
        }
    };

    var swipe = function (e) {
        var direction = e.direction;
        var item = e.sender.events.currentTarget.kendoBindingTarget.source.item;
        var found = findItem(item);
        var quantity = found.get("quantity");
        if (direction == "left") {
            if (quantity <= 1) {
                quantity = 2;
            }

            found.set("quantity", quantity - 1);
        }
        else if (direction == "right") {
            found.set("quantity", quantity + 1);
        }
    };

    var hold = function (e) {
        var item = e.event.currentTarget.kendoBindingTarget.source.item;
        var found = findItem(item);
        var deleteMode = found.get("deleteMode");
        found.set("deleteMode", !deleteMode);
    };

    function init(e) {
        _view = e.view;
        kendo.bind(e.view.element, viewModel);
        var noItemsPrice = 0;
        var parsedResult = parseFloat(noItemsPrice);
        var ret = kendo.toString(parsedResult, "c");
        viewModel.set("noItemsPrice", ret);
    }

    a.cart = {
        init: init,
        add: addToCart,
        quantity: getQuantity,
        find: findItem,
        swipe: swipe,
        hold: hold
    };

}(app));
