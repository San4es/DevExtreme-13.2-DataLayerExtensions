using DataService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.OData.Batch;
using System.Web.Http.OData.Builder;
using Microsoft.Data.Edm;

namespace DataService
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            using (var context = new NORTHWNDContext())
            {
                config.EnableCors(new EnableCorsAttribute("*", "*", "*", "DataServiceVersion, MaxDataServiceVersion"));
                config.Routes.MapODataRoute(
                    routeName: "odata",
                    routePrefix: "",
                    model: context.GetEdm(),
                    batchHandler: new DefaultODataBatchHandler(GlobalConfiguration.DefaultServer)
                );
            }
        }
    }
}
