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

    a.utils = {
        formatDate: formatDate,
        formatMoney: formatMoney,
        getAuthHeader: getAuthHeader
    }

}(app))