(function(){
    document.addEventListener("deviceready", function() {
        
        app.servicesBaseUrl = "http://localhost:2715/api/";
        
        var kendoApp = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    });  
}());