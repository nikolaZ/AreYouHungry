(function(){
    document.addEventListener("deviceready", function() {
        
        window.app.servicesBaseUrl = "http://localhost:2715/api/";
        
        window.kendoApp = new kendo.mobile.Application(document.body, { layout: "tabstrip-layout" });
    });  
}());