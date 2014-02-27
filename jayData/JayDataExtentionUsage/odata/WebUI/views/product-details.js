WebUI.ProductDetails = function (params) {
    var title = ko.observable("Loading..."),
        productID = params.id;

    if (isNaN(productID))
        WebUI.app.navigate();

    return {
        id: productID,

        product: new WebUI.ProductViewModel(),

        viewShown: function () {
            var self = this;
            WebUI.db.products
                .byKey(productID)
                .done(function (item) {
                    self.product.fromJS(item);
                });
        },

        handleDelete: function () {
            var self = this;
            DevExpress.ui.dialog
                .confirm("Are you sure you want to delete this item?", "Delete item")
                .then(function (result) {
                    if (result) self.handleConfirmDelete();
                });
        },

        handleConfirmDelete: function () {
            WebUI.db.products
                .remove(params.id)
                .done(function () {
                    WebUI.app.navigate("Products");
                });
        }
    };
};