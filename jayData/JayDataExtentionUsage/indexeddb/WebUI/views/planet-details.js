WebUI.PlanetDetails = function (params) {
    var id = params.id;

    if (isNaN(id))
        return WebUI.app.navigate();


    return {
        id: id,

        planet: new WebUI.db.types.PlanetDTO(),

        viewShown: function () {
            var self = this;
            WebUI.db.Planets
                .byKey(id)
                .done(function (item) {
                    self.planet.fromJS(item);
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
            WebUI.db.Planets
                .remove(id)
                .done(function () {
                    WebUI.app.navigate("Planets");
                });
        }
    };
};