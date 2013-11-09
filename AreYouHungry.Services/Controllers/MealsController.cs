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
    public class MealsController : BaseApiController
    {
        IUowData db;

        public MealsController()
            : base(null)
        {
            this.db = new UowData();
        }

        public MealsController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        public HttpResponseMessage GetDetails(int id)
        {
            var user = User.Identity.Name;
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Meals.All().Where(r => r.Id == id)
                      .Select(MealExtendedModel.FromMeal)
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