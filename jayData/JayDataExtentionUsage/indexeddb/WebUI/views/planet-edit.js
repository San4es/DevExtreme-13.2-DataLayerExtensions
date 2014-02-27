WebUI.PlanetEdit = function (params) {
    var id = params.id;

    return {
        planet: new WebUI.db.types.PlanetDTO(),

        handleSave: function () {
            if (!isNaN(id))
                this.update();
            else
                this.insert();
        },

        load: function () {
            var self = this;
            WebUI.db.Planets.byKey(id).done(function (data) {
                self.planet.fromJS(data);
            });
        },

        update: function () {
            WebUI.db.Planets.update(id, this.planet.toJS()).done(function () {
                WebUI.app.navigate("PlanetDetails/" + id, { target: "back" });
            });
        },

        insert: function () {
            WebUI.db.Planets.insert(this.planet.toJS()).done(function () {
                WebUI.app.navigate("Planets", { target: "back" });
            });
        },

        viewShown: function () {
            if (id !== undefined)
                this.load();
        }
    };
};