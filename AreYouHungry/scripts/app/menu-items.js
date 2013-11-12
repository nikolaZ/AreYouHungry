var app = app || {};

(function (a) {
    var viewModel = kendo.observable({
        currentMenuItem: {},
        addToCart: onAddToCart,
        purchasedQuantity: purchasedQuantity
    });

    function purchasedQuantity(item) {
        var currentItem = item.currentMenuItem || item;
        var result = a.cart.quantity(currentItem);
        return result;
    };

    function onAddToCart(e) {
        a.cart.add(e);

        rebindPurchasedQty();
    };

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        httpRequest.getJSON(a.servicesBaseUrl + "meals/" + id)
        .then(function (currentMenuItem) {
            viewModel.set("currentMenuItem", currentMenuItem);

            viewModel.purchasedQuantity(currentMenuItem);
            rebindPurchasedQty();         
        });
    }

    var rebindPurchasedQty = function () {
        // force rebinding
        var functionRebind = viewModel.get("purchasedQuantity");
        viewModel.set("purchasedQuantity", -1);
        viewModel.set("purchasedQuantity", functionRebind);
    };

    a.menuItem = {
        init: init
    };
}(app));

