/// <reference path="../js/jquery-1.10.2.min.js" />
/// <reference path="../js/knockout-3.0.0.js" />
/// <reference path="../js/dx.all.js" />

(function() {
    "use strict";

    var planets = [
        {
            Name: "Earth",
            Mass: "5.97219×10^24 kg",
            Aphelion: "147098291 km",
            Perihelion: "152098233 km",
            Populated: true,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/6/6f/Earth_Eastern_Hemisphere.jpg"
        },
        {
            Name: "Venus",
            Mass: "4.8676×10^24 kg",
            Aphelion: "108939000 km",
            Perihelion: "107477000 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/8/85/Venus_globe.jpg"
        },
        {
            Name: "Mercury",
            Mass: "3.3022×10^23 kg",
            Aphelion: "69816900 km",
            Perihelion: "46001200 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/3/3f/Mercury_Globe-MESSENGER_mosaic_centered_at_0degN-0degE.jpg"
        },
        {
            Name: "Mars",
            Mass: "6.4185×10^23 kg",
            Aphelion: "249209300 km",
            Perihelion: "206669000 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/e/e4/Water_ice_clouds_hanging_above_Tharsis_PIA02653_black_background.jpg"
        },
        {
            Name: "Jupiter",
            Mass: "1.8986×10^27 kg",
            Aphelion: "816520800 km",
            Perihelion: "740573600 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/5/5a/Jupiter_by_Cassini-Huygens.jpg"
        },
        {
            Name: "Saturn",
            Mass: "5.6846×10^26 kg",
            Aphelion: "1513325783 km",
            Perihelion: "1353572956 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/2/25/Saturn_PIA06077.jpg"
        },
        {
            Name: "Uranus",
            Mass: "8.6810×10^25 kg",
            Aphelion: "3004419704 km",
            Perihelion: "2748938461 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/3/3d/Uranus2.jpg"
        },
        {
            Name: "Neptune",
            Mass: "1.0243×10^26 kg",
            Aphelion: "4553946490 km",
            Perihelion: "4452940833 km",
            Populated: false,
            ImageSrc: "http://upload.wikimedia.org/wikipedia/commons/0/06/Neptune.jpg"
        }];

    function clear() {
        var ctx = WebUI.db.context;
        return ctx.Planets.toArray()
            .then(function (planets) {
                $.each(planets, function (idx, planet) {
                    ctx.Planets.remove(planet);
                });
                return ctx.saveChanges();
            });
    }

    function fill() {
        var ctx = WebUI.db.context;
        $.each(planets, function (idx, data) {
            ctx.Planets.add(new WebUI.db.types.Planet(data));
        });

        return ctx.saveChanges();
    }

    function init() {
        WebUI.db.Planets = new DevExpress.data.JayDataStore({
            queryable: WebUI.db.context.Planets,
            autoCommit: true
        });
    }

    function PlanetDTO(entity) {
        this.Id = ko.observable();
        this.Name = ko.observable();
        this.Mass = ko.observable();
        this.Aphelion = ko.observable();
        this.Perihelion = ko.observable();
        this.Populated = ko.observable();
        this.ImageSrc = ko.observable();

        this.fromJS(entity);
    }

    PlanetDTO.prototype = {
        toJS: function () {
            return {
                Id: this.Id(),
                Name: this.Name(),
                Mass: this.Mass(),
                Aphelion: this.Aphelion(),
                Perihelion: this.Perihelion(),
                Populated: this.Populated(),
                ImageSrc: this.ImageSrc()
            };
        },
        fromJS: function (entity) {
            if (!entity)
                return;
            this.Id(entity.Id);
            this.Name(entity.Name);
            this.Mass(entity.Mass);
            this.Aphelion(entity.Aphelion);
            this.Perihelion(entity.Perihelion);
            this.Populated(entity.Populated);
            this.ImageSrc(entity.ImageSrc);
        }
    };

    $data.Entity.extend("WebUI.db.types.Planet", {
        Id: {
            key: true,
            type: "int",
            computed: true
        },
        Name: { type: "string" },
        Mass: { type: "string" },
        Aphelion: { type: "string" },
        Perihelion: { type: "string" },
        Populated: { type: "boolean" },
        ImageSrc: { type: "string" }
    });

    $data.EntityContext.extend("WebUI.db.types.Context", {
        Planets: {
            type: $data.EntitySet,
            elementType: WebUI.db.types.Planet
        }
    });

    WebUI.db.types.PlanetDTO = PlanetDTO;

    WebUI.db.context = new WebUI.db.types.Context({
        name: "indexedDb",
        databaseName: "Example"
    });
    
    WebUI.db.context.onReady()
        .then(clear)
        .then(fill)
        .then(init);
})();