var app = app || {};

(function(a) {
    var viewModel = kendo.observable({
        cuisines:[]
    });
    
    function init(e) {
        kendo.bind(e.view.element, viewModel);
        
        httpRequest.getJSON(app.servicesBaseUrl + "cuisines")
        .then(function (cuisines) {
            viewModel.set("cuisines", cuisines);
        });
    }
    
    a.cuisines = {
        init:init
    };
}(app));