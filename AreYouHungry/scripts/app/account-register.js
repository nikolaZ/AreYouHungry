var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        username: "",
        password: "",
        email: "",
        phone: "",
        login: login,
        register: register
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }

    function login() {
        kendoApp.navigate("views/account-login-view.html#account-login-view");
    };

    function register() {
        kendoApp.showLoading();

        var model = {
            "UserName": "admin",
            "Password": "123456",
            "ConfirmPassword": "123456",
            "Email": "sample string 4",
            "Phone": "0899349213"
        };

        httpRequest.postJSON(a.servicesBaseUrl + "Account/Register", model)
           .then(function (data) {
               kendoApp.hideLoading();
               sessionStorage["accessToken"] = data.access_token;
           }, function () {
               kendoApp.hideLoading();
           });
    };

    a.register = {
            init: init
    };

    console.log(a.register);

}(app, kendoApp.app));

