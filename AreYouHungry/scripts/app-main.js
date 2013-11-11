(function () {
    document.addEventListener("deviceready", function () {

        window.app.servicesBaseUrl = "http://localhost:2715/api/";

        window.kendoApp = new kendo.mobile.Application(document.body, {
            layout: "tabstrip-layout",
            loading: '<h1 class="loading-message">Loading...</h1>'
        });

        window.tabstrip = kendoApp.view().footer.find(".km-tabstrip").data("kendoMobileTabStrip");
    });
}());