(function (global) {
    var app = global.app = global.app || {},
        kendoApp = global.kendoApp = global.kendoApp || {},
        os = kendo.support.mobileOS;

    document.addEventListener('deviceready', function () {
        navigator.splashscreen.hide();

        global.tabstrip = kendoApp.app.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");

    }, false);

    kendoApp.app = new kendo.mobile.Application(document.body, {
        layout: "tabstrip-layout",
        transition: "slide",
        loading: '<h1 class="loading-message">Loading...</h1>',
        skin: 'flat' 
    });

    global.app.servicesBaseUrl = "http://localhost:2715/api/";
    global.app.baseUrl = "http://localhost:2715/";

})(window);