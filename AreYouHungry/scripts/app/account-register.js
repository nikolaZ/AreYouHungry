var app = app || {};

(function (a, kendoApp) {
    var _validator = {};

    var viewModel = kendo.observable({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        phone: "",
        login: login,
        register: register
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);

        _validator = e.view.element.find("#register-form").kendoValidator(
            {
                rules: {
                    custom: function (input) {
                        if (input.is("[name=password]")) {
                            var length = input.val().length;

                            input.attr("validationmessage", "Password must be between 6 and 16 chars");
                            return length > 5 && length < 16;
                        }

                        if (input.is("[name=username]")) {
                            var length = input.val().length;

                            input.attr("validationmessage", "Username must be between 5 and 16 chars");
                            return length > 4 && length < 16;
                        }

                        if (input.is("[name=confirmPassword]")) {
                            var value = input.val();
                            var pass = $(document).find("#register-password");
                            var compareValue = pass.val();
                            input.attr("validationmessage", "Passwords do not match");
                           return value === compareValue;
                        }

                        return true;
                    },
                }
            }).data("kendoValidator");
    }

    function login() {
        kendoApp.navigate("views/account-login-view.html#account-login-view");
    };

    function register() {
        kendoApp.showLoading();

        if (_validator.validate()) {

            var model = {
                "UserName": viewModel.get("username"),
                "Password": viewModel.get("password"),
                "ConfirmPassword": viewModel.get("confirmPassword"),
                "Email": viewModel.get("email"),
                "Phone": viewModel.get("phone")
            };

            httpRequest.postJSON(a.servicesBaseUrl + "Account/Register", model)
               .then(function (data) {
                   kendoApp.hideLoading();
                   sessionStorage["accessToken"] = data.access_token;

                   a.utils.beep(1);
                   kendoApp.navigate("views/account-login-view.html#account-view");
               }, function (error) {
                   kendoApp.hideLoading();

                   var desc = JSON.parse(error.ModelState);

                   a.utils.showError("Register failed." + desc[0] || "");
               });
        }
        else {
            kendoApp.hideLoading();
        }
    };

    a.register = {
            init: init
    };

    console.log(a.register);

}(app, kendoApp.app));

