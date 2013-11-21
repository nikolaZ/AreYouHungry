var app = app || {};

(function (a, kendoApp) {
    var _validator = {};

    var viewModel = kendo.observable({
        loginUsername: "admin",
        loginPassword: "123456",
        isAuthenticated: false,
        login: login,
        register: register
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);

        _validator = e.view.element.find("#login-form").kendoValidator(
            {
                rules: {
                    custom: function (input) {
                        if (input.is("[name=password]")) {
                            var length = input.val().length;

                            input.attr("validationmessage", "Password must be between 6 and 16 chars");
                            return length > 5 && length < 16;
                        }
                        return true;
                    }
                }
            }).data("kendoValidator");
    }

    function beforeShow(e) {
        if (viewModel.get("isAuthenticated")) {
            e.preventDefault();
            kendoApp.navigate("views/account-view.html#account-view");
        }
    }

    function login() {
        
        kendoApp.showLoading();

        if (_validator.validate()) {

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

                    a.utils.beep(1);

                    kendoApp.navigate("views/account-view.html#account-view");
                }, function (error) {
                    kendoApp.hideLoading();

                    var desc = JSON.parse(error.responseText);

                    a.utils.showError("Login failed." + desc.error_description || "");
                });
        }
        else {
            kendoApp.hideLoading();
        }
    };

    function register() {
        kendoApp.navigate("views/account-register-view.html#account-register-view");
    };

    a.login = {
        init: init,
        beforeShow: beforeShow
    };

}(app, kendoApp.app));
