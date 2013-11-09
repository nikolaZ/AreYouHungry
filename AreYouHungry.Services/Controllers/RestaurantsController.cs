using AreYouHungry.Data;
using AreYouHungry.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AreYouHungry.Services.Controllers
{
    public class RestaurantsController : BaseApiController
    {
        IUowData db;

        public RestaurantsController()
            : base(null)
        {
            this.db = new UowData();
        }

        public RestaurantsController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        public HttpResponseMessage GetTop()
        {
            var user = User.Identity.Name;
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All().OrderByDescending(r=> r.Rating).Take(5).Select(RestaurantShortModel.FromRestaurant);
                  
                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        [Route("api/restaurants/details/{restaurantId}")]
        public HttpResponseMessage GetDetails(int restaurantId)
        {
            var user = User.Identity.Name;
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All().Where(r => r.Id == restaurantId)
                      .Select(RestaurantShortModel.FromRestaurant)
                      .FirstOrDefault();

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }
    }
}