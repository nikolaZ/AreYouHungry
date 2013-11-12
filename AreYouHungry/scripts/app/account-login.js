var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        loginUsername: "admin",
        loginPassword: "123456",
        isAuthenticated: false,
        login: login,
        register: register,
        goToLogs: goToLogs
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
    }

    function login() {
        kendoApp.showLoading();

        var data = [];
        data.push("grant_type=password&username=");
        data.push(viewModel.get("loginUsername"));
        data.push("&password=");
        data.push(viewModel.get("loginPassword"));
        var dataString = data.join("");

        httpRequest.postJSON(a.baseUrl + "Token", dataString)
            .then(function (data) {
                kendoApp.hideLoading();
                sessionStorage["accessToken"] = data.access_token;
                viewModel.set("isAuthenticated", true);
            }, function () {
                kendoApp.hideLoading();
            });
        
    };

    function register() {
        kendoApp.navigate("views/account-register-view.html#account-register-view");
    };

    function goToLogs() {
        kendoApp.navigate("views/account-view.html#account-view");
    };

    a.login = {
            init: init
    };

}(app, kendoApp.app));
