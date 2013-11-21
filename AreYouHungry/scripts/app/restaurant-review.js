var app = app || {};

(function (a, kendoApp) {
    var _validator = {};
    var _view = {};

    var viewModel = kendo.observable({
        id: -1,
        name: "",
        pictureDataUrl: "",
        pictureSrc: "",
        rating: 0,
        text: "",
        ratingError: "",
        takePicture: function () {
            navigator.camera.getPicture(function (imageBase64) {
                viewModel.set("pictureSrc", "data:image/jpeg;base64," + imageBase64);

                viewModel.set("havePicture", true);
                viewModel.set("pictureDataUrl", imageBase64);

            }, function (error) {

            }, {
                destinationType: Camera.DestinationType.DATA_URL
            });
        },
        loadPicture: function () {
            navigator.camera.getPicture(function (imageBase64) {
                viewModel.set("pictureSrc", "data:image/jpeg;base64," + imageBase64);

                viewModel.set("havePicture", true);
                viewModel.set("pictureDataUrl", imageBase64);
            }, function (error) {

            }, {
                quality: 50,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY
            });
        },
        havePicture: false,
        onChange: function (e) {
            var simpleTemplate = kendo.template('<span class="stars"><span style="width: #: value * 24 #px"></span></span>');
            var ddl = $(document).find("#rating").data("kendoDropDownList");
            var dataItem = ddl.dataItem();
            if (dataItem && parseInt(dataItem.value)) {
                ddl.span.html(simpleTemplate(dataItem));
                viewModel.set("rating", dataItem.value);
            }
        },
        cancel: function () {
            viewModel.set("pictureSrc", "");

            viewModel.set("havePicture", false);
            viewModel.set("pictureDataUrl", "");

            _view.element.data("kendoMobileView").scroller.reset();
        },
        submit: function () {

            if (!parseInt(viewModel.get("rating"))) {
                viewModel.set("ratingError", "Select Rating");
                return;
            }
            else {
                viewModel.set("ratingError", "");
            }

            kendoApp.showLoading();

            if (_validator.validate()) {

                var model = {
                    restaurantId: viewModel.get("id"),
                    rating: viewModel.get("rating"),
                    description: viewModel.get("text"),
                };

                if (viewModel.get("havePicture")) {
                    model.photo = viewModel.get("pictureDataUrl");
                }

                var header = a.utils.getAuthHeader();
                httpRequest.postJSON(a.servicesBaseUrl + "reviews", model, header)
                    .then(function () {
                        kendoApp.hideLoading();
                        a.utils.beep(1);

                        viewModel.set("rating", 0);
                        viewModel.set("text", "");

                        kendoApp.navigate("views/restaurant-view.html#details?id=" + model.restaurantId);
                    }, function (error) {
                        kendoApp.hideLoading();
                        a.utils.showError("Review submitting failed.");
                    })
            }
            else {
                kendoApp.hideLoading();
            }
        }
    });

    function reviewInit(e) {
        var id = parseInt(e.view.params.id);

        kendo.bind(e.view.element, viewModel);

        var name = e.view.params.name;
        _view = e.view;

        viewModel.set("id", id);
        viewModel.set("name", name);

        _validator = e.view.element.find("#review").kendoValidator(
        {
            rules: {
                custom: function (textarea) {
                    if (textarea.is("[name=description]")) {
                        var length = textarea.val().length;

                        textarea.attr("validationmessage", "Review must be longer than 10 chars");
                        return length > 10 && length < 351;
                    }
                    return true;
                }
            }
        }).data("kendoValidator");
    }


    function checkIsAuth(e) {
        var auth = sessionStorage["accessToken"];

        if (!(auth && auth.length > 0)) {
            e.preventDefault();
            $("body").data().kendoMobilePane.navigate("#:back");
            a.utils.showError("You have to login first to write reviews.");
            return false;
        }
    }

    a.restaurant.review = {
        init: reviewInit,
        beforeShow: checkIsAuth
    };

}(app, kendoApp.app));