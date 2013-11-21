var app = app || {};

(function (a) {

    var formatDate = function (input) {
        var parsed = kendo.parseDate(input);
        var result = kendo.toString(parsed, "dd/MM/yyyy HH:mm");
        return result;
    }

    var formatMoney = function (input) {
        var result = kendo.toString(input, "c");
        return result;
    }

    var getAuthHeader = function () {
        var token = sessionStorage["accessToken"];
        var header = {
            Authorization: "Bearer " + token
        };

        return header;
    }

    var beep = function (count) {
        navigator.notification.beep(count);
    };

    var closeErrorModal = function () {
        $("#error-view").show().data().kendoMobileModalView.close();
    }

    var showError = function (message) {
        $("#error-view").find("#message").text(message);
        $("#error-view").show().data().kendoMobileModalView.open();
    }

    a.utils = {
        formatDate: formatDate,
        formatMoney: formatMoney,
        getAuthHeader: getAuthHeader,
        beep: beep,
        closeErrorModal: closeErrorModal,
        showError: showError
    }

}(app))