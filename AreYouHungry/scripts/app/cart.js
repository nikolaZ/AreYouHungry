var app = app || {};

(function (a) {

    var viewModel = kendo.observable({
        items: [],
        total: 0,
        deleteItem: deleteFromCart
    });

    var cartItems = new kendo.data.DataSource({
        data: [],
        change: function () {
            var totalPrice = 0;
            var items = cartItems.data();
            for (var i = 0; i < items.length; i++) {
                var cartItem = items[i];
                totalPrice += cartItem.get("quantity") * cartItem.get("item.price");
            }

            totalPrice = totalPrice.toFixed(2);

            tabstrip.badge(2, cartItems.aggregates().quantity.sum);

            viewModel.set("total", totalPrice);
            viewModel.set("items", items);
        },
        schema: {
            model: {
                fields: {
                    quantity: { type: "number" },
                    item: {},
                    deleteMode: { type: "boolean" }
                },
                subtotal: function () {
                    return (this.get("quantity") * this.get("item").price).toFixed(2);
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
        var item = e.button.context.kendoBindingTarget.source.item;
        var index = getIndex(item);
        var dataItem = cartItems.at(index);
        cartItems.remove(dataItem);
    }

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

    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }

    a.cart = {
        init: init,
        add: addToCart,
        quantity: getQuantity,
        find: findItem
    };

}(app));
