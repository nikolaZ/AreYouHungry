var app = app || {};

(function (a, kendoApp) {
    const PhotosLocation = "Content/ReviewsPhotos/";

    var viewModel = kendo.observable({
        id: -1,
        review: {},
        photoUrl: ""
    });

    function init(e) {
        kendo.bind(e.view.element, viewModel);
        var id = parseInt(e.view.params.id);

        viewModel.set("id", id);

        httpRequest.getJSON(app.servicesBaseUrl + "reviews/" + id)
        .then(function (review) {
            viewModel.set("review", review);
            viewModel.set("photoUrl", a.baseUrl + PhotosLocation + review.photo);
        });
    }

    a.reviews = {};

    a.reviews.details = {
        init: init
    };

}(app, kendoApp.app));
