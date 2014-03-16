/// <reference path="../js/jquery-1.10.2.min.js" />
/// <reference path="../js/knockout-3.0.0.js" />
/// <reference path="../js/dx.all.js" />

(function() {
    "use strict";

    breeze.config.initializeAdapterInstance("dataService", "OData", false);

    var dataNS = DevExpress.data;
    var manager = new breeze.EntityManager({
        dataService: new breeze.DataService({
            serviceName: "http://localhost:53055/",
            hasServerMetadata: true,
            adapterName: "OData"
        })
    });

    WebUI.ProductViewModel = function (data) {
        this.ProductID = ko.observable();
        this.ProductName = ko.observable();
        this.SupplierID = ko.observable();
        this.CategoryID = ko.observable();
        this.QuantityPerUnit = ko.observable();
        this.UnitPrice = ko.observable();
        this.UnitsInStock = ko.observable();
        this.UnitsOnOrder = ko.observable();
        this.ReorderLevel = ko.observable();
        this.Discontinued = ko.observable();

        this.Category = new WebUI.CategoryViewModel();
        this.Supplier = new WebUI.SupplierViewModel();

        if (data)
            this.fromJS(data);

        this.UnitPriceFormatted = ko.computed(function () {
            return Globalize.format(this.UnitPrice(), "c");
        }, this);
    };

    $.extend(WebUI.ProductViewModel.prototype, {
        toJS: function () {
            return {
                ProductID: this.ProductID(),
                ProductName: this.ProductName(),
                SupplierID: this.SupplierID(),
                CategoryID: this.CategoryID(),
                QuantityPerUnit: this.QuantityPerUnit(),
                UnitPrice: String(this.UnitPrice() || 0),
                UnitsInStock: this.UnitsInStock(),
                UnitsOnOrder: this.UnitsOnOrder(),
                ReorderLevel: this.ReorderLevel(),
                Discontinued: this.Discontinued(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.ProductID(data.ProductID());
                this.ProductName(data.ProductName());
                this.SupplierID(data.SupplierID());
                this.CategoryID(data.CategoryID());
                this.QuantityPerUnit(data.QuantityPerUnit());
                this.UnitPrice(Number(data.UnitPrice()));
                this.UnitsInStock(data.UnitsInStock());
                this.UnitsOnOrder(data.UnitsOnOrder());
                this.ReorderLevel(data.ReorderLevel());
                this.Discontinued(data.Discontinued());
                
                this.Category.fromJS(data.Category());
                this.Supplier.fromJS(data.Supplier());
                console.log(this.Category);
                console.log(this.Supplier);
            }
        }
    });

    WebUI.SupplierViewModel = function (data) {
        this.SupplierID = ko.observable();
        this.CompanyName = ko.observable();
        this.ContactName = ko.observable();
        this.ContactTitle = ko.observable();
        this.Address = ko.observable();
        this.City = ko.observable();
        this.Region = ko.observable();
        this.PostalCode = ko.observable();
        this.Country = ko.observable();
        this.Phone = ko.observable();
        this.Fax = ko.observable();
        this.HomePage = ko.observable();
        if (data)
            this.fromJS(data);
    };

    $.extend(WebUI.SupplierViewModel.prototype, {
        toJS: function () {
            return {
                SupplierID: this.SupplierID(),
                CompanyName: this.CompanyName(),
                ContactName: this.ContactName(),
                ContactTitle: this.ContactTitle(),
                Address: this.Address(),
                City: this.City(),
                Region: this.Region(),
                PostalCode: this.PostalCode(),
                Country: this.Country(),
                Phone: this.Phone(),
                Fax: this.Fax(),
                HomePage: this.HomePage(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.SupplierID(data.SupplierID());
                this.CompanyName(data.CompanyName());
                this.ContactName(data.ContactName());
                this.ContactTitle(data.ContactTitle());
                this.Address(data.Address());
                this.City(data.City());
                this.Region(data.Region());
                this.PostalCode(data.PostalCode());
                this.Country(data.Country());
                this.Phone(data.Phone());
                this.Fax(data.Fax());
                this.HomePage(data.HomePage());

            }
        }
    });

    WebUI.CategoryViewModel = function (data) {
        this.CategoryID = ko.observable();
        this.CategoryName = ko.observable();
        this.Description = ko.observable();
        this.Picture = ko.observable();
        if (data)
            this.fromJS(data);
    };

    $.extend(WebUI.CategoryViewModel.prototype, {
        toJS: function () {
            return {
                CategoryID: this.CategoryID(),
                CategoryName: this.CategoryName(),
                Description: this.Description(),
                Picture: this.Picture(),
            };
        },

        fromJS: function (data) {
            if (data) {
                this.CategoryID(data.CategoryID());
                this.CategoryName(data.CategoryName());
                this.Description(data.Description());
                this.Picture(data.Picture());
            }
        }
    });

    WebUI.db = {
        categories: new dataNS.BreezeStore({
            entityManager: manager,
            resourceName: "Categories",
            autoCommit: true
        }),
        suppliers: new dataNS.BreezeStore({
            entityManager: manager,
            resourceName: "Suppliers",
            autoCommit: true
        }),
        products: new dataNS.BreezeStore({
            entityManager: manager,
            resourceName: "Products",
            entityQuery: new breeze.EntityQuery("Products").expand("Category, Supplier"),
            autoCommit: true
        })
    };
})();