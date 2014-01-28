WebUI.Categories = function (params) {
    var ds = new DevExpress.data.DataSource(WebUI.db.categories),
        sq = ko.observable().extend({ throttle: 500 });

    sq.subscribe(function (value) {
        if (value)
            ds.filter("CategoryName", "contains", value);
        else
            ds.filter(null);
        ds.load();
    });

    return {
        dataSource: ds,
        searchQuery: sq
    };
};