var app = app || {};

(function (a) {

    var viewModel = kendo.observable({
        items: [],
        total: 0
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

            viewModel.set("total", totalPrice);
            viewModel.set("items", items);
        },
        schema: {
            model: {
                fields: {
                    quantity: { type: "number" },
                    item: {}
                }
            }
        }
    });

    addToCart = function (e) {
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
                sums: 0
            });
        }

        var y = cartItems.data();
        var tt = viewModel.total;
    }

    findItem = function (item) {
        var length = cartItems.data().length;
        var data = cartItems.data();

        for (var index = 0; index < length; index++) {
            if (data[index].item.id === item.id) {
                return data[index];
            }
        }

        return undefined;
    }

    a.cart = {
        add: addToCart
    };

}(app));
