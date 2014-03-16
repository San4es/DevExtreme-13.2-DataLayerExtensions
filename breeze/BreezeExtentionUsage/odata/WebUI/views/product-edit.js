WebUI.ProductEdit = function (params) {
    return {
        product: new WebUI.ProductViewModel(),

        categoriesSource: {
            store: WebUI.db.categories,
            select: ["CategoryID", "CategoryName"]
        },

        suppliersSource: {
            store: WebUI.db.suppliers,
            select: ["SupplierID", "CompanyName"]
        },

        handleSave: function () {
            if (!isNaN(params.id))
                this.update();
            else
                this.insert();
        },

        load: function () {
            var self = this;
            WebUI.db.products.byKey(params.id).done(function (data) {
                self.product.fromJS(data);
            });
        },

        update: function () {
            WebUI.db.products.update(params.id, this.product.toJS()).done(function () {
                WebUI.app.navigate("ProductDetails/" + params.id, { target: "back" });
            });
        },

        insert: function () {
            var addedProduct = this.product.toJS();
            if (addedProduct.CategoryID && addedProduct.SupplierID)
                WebUI.db.products.insert(addedProduct).done(function () {
                    WebUI.app.navigate("Products", { target: "back" });
                });
            else
                DevExpress.ui.dialog.alert("Product can not be added because category or supplier field is not defined.", "Error");
        },

        viewShown: function () {
            if (params.id !== undefined)
                this.load();
        }
    };

};