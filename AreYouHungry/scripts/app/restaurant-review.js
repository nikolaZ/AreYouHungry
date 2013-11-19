var app = app || {};

(function (a, kendoApp) {
    var viewModel = kendo.observable({
        id: -1,
        name: "",
        pictureDataUrl: "",
        pictureSrc: "",
        rating: 0,
        text: "",
        takePicture: function () {
            navigator.camera.getPicture(function (imageBase64) {
                viewModel.set("pictureSrc", "data:image/jpeg;base64," + imageBase64);

                viewModel.set("havePicture", true);
                viewModel.set("pictureDataUrl", imageBase64);

            }, function (error) {
                // TODO: error handling
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
                // TODO: error handling
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
        },
        submit: function () {
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
                    console.log("yes");
                })
        }
    });

    function reviewInit(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);
        var name = e.view.params.name;

        viewModel.set("id", id);
        viewModel.set("name", name);
    }

    a.restaurant.review = {
        init: reviewInit
    };

}(app, kendoApp.app));