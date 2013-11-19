using AreYouHungry.Data;
using AreYouHungry.Models;
using AreYouHungry.Services.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace AreYouHungry.Services.Controllers
{
    public class CartLogsController : BaseApiController
    {
        IUowData db;

        public CartLogsController()
            : base(null)
        {
            this.db = new UowData();
        }

        public CartLogsController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        [Authorize]
        public HttpResponseMessage PostCartLog(CartLogModel model)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  if (!ModelState.IsValid)
                  {
                      return this.Request.CreateResponse(
                        HttpStatusCode.BadRequest, ModelState);
                  }

                  var username = User.Identity.Name;
                  var user = db.Users.All().FirstOrDefault(u => u.UserName == username);

                  List<CartLogMeal> meals = model.Meals.Select(meal => new CartLogMeal()
                  {
                      Name = meal.Name,
                      Price = meal.Price,
                      Quantity = meal.Quantity,
                      Subtotal = meal.Subtotal,
                      RestaurantName = meal.RestaurantName
                  }).ToList();

                  CartLog log = new CartLog()
                  {
                      LogDateTime = DateTime.Now,
                      Meals = meals,
                      User = user,
                      Total = model.Total
                  };

                  db.CartLogs.Add(log);
                  db.SaveChanges();

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK);

                  return response;
              });

            return result;
        }

        [Authorize]
        public HttpResponseMessage GetCartLogs(int pageSize, int page, string direction)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var username = User.Identity.Name;

                  IEnumerable<CartLogModel> models;

                  if (direction == "asc")
                  {
                      models = db.CartLogs.All()
                      .Where(log => log.User.UserName == username)
                      .OrderBy(log => log.LogDateTime)
                          .Skip((page - 1) * pageSize)
                         .Take(pageSize)
                      .Select(CartLogModel.FromCartLog);
                  }
                  else
                  {
                      models = db.CartLogs.All()
                      .Where(log => log.User.UserName == username)
                      .OrderByDescending(log => log.LogDateTime)
                          .Skip((page - 1) * pageSize)
                         .Take(pageSize)
                      .Select(CartLogModel.FromCartLog);
                  }

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK, models);

                  return response;
              });

            return result;
        }
    }
}
