var app = app || {};


(function(a) {
    var viewModel = kendo.observable({
        topRestaurants:[]
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        httpRequest.getJSON(app.servicesBaseUrl + "restaurants/top")
        .then(function (topRestaurants) {
            viewModel.set("topRestaurants", topRestaurants);            
        });
    }
    
    a.home = {
        init:init
    };
}(app));