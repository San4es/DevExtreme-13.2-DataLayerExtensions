WebUI.Planets = function (params) {
    var ds = new DevExpress.data.DataSource({
            store: WebUI.db.Planets,
            map: function (planet) {
                return new WebUI.db.types.PlanetDTO(planet);
            }
        }),
        sq = ko.observable().extend({ throttle: 500 });

    sq.subscribe(function (value) {
        if (value)
            ds.filter("Name", "contains", value);
        else ds.filter(null);

        ds.load();
    });

    return {
        dataSource: ds,
        searchQuery: sq
    };
};