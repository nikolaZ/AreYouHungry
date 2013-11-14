using AreYouHungry.Data;
using AreYouHungry.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace AreYouHungry.Services.Controllers
{
    public class MapsController : BaseApiController
    {
        private const double PIx = 3.141592653589793;
        private const int EarthRadius = 6371; // km

        IUowData db;

        public MapsController()
            : base(null)
        {
            this.db = new UowData();
        }

        public MapsController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        public HttpResponseMessage GetRestaurantMap(double lat, double lng)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All()
                      .Select(RestaurantMapModel.FromRestaurant).ToList()
                      .Where(r => CalculateDistance(lat, r.Latitude, lng, r.Longitude) < 3)
                      .Take(10);

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        private static double CalculateDistance(double lat2, double lat1, double lon1, double lon2)
        {
            double dLat = Radians(lat2 - lat1);
            double dLon = Radians(lon2 - lon1);
            lat1 = Radians(lat1);
            lat2 = Radians(lat2);

            double a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                    Math.Sin(dLon / 2) * Math.Sin(dLon / 2) * Math.Cos(lat1) * Math.Cos(lat2);

            double c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

            double distance = EarthRadius * c;

            return distance;
        }

        public static double Radians(double x)
        {
            return x * PIx / 180;
        }
	}
}