WebUI.Products = function (params) {
    var categoryID = params.id,
        dataSource = new DevExpress.data.DataSource(WebUI.db.products);

    if (!isNaN(categoryID))
        dataSource.filter("CategoryID", "=", categoryID);

    return {
        dataSource: dataSource
    };
};