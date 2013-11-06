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
    public class CuisinesController : BaseApiController
    {
        public CuisinesController()
            : base(null)
        {
            this.db = new UowData();
        }

        public CuisinesController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        [Authorize]
        public HttpResponseMessage GetAll()
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Cuisines.All().Select(CuisineModel.FromCuisine);

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        public HttpResponseMessage GetCuisine(int id)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var cuisine = db.Cuisines.GetById(id);

                  if (cuisine == null)
                  {
                      throw new ArgumentNullException("id", "There is no cuisine with this id.");
                  }

                  CuisineExtendedModel model = new CuisineExtendedModel()
                  {
                      Name = cuisine.Name,
                      Restaurants = cuisine.Restaurants.Select(RestaurantShortModel.FromRestaurant)
                  };

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        model);

                  return response;
              });

            return result;
        }
    }
}