using AreYouHungry.Data;
using AreYouHungry.Models;
using AreYouHungry.Services.Models;
using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace AreYouHungry.Services.Controllers
{
    public class ReviewsController : BaseApiController
    {
        IUowData db;

        public ReviewsController()
            : base(null)
        {
            this.db = new UowData();
        }

        public ReviewsController(IUowData db)
            : base(db)
        {
            this.db = db;
        }

        [Authorize]
        public HttpResponseMessage PostReview(ReviewPostModel review)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var username = User.Identity.Name;
                  var user = db.Users.All().FirstOrDefault(u => u.UserName == username);

                  var restaurant = db.Restaurants.All().FirstOrDefault(r => r.Id == review.RestaurantId);

                  Review reviewToAdd = new Review()
                  {
                      User = user,
                      Restaurant = restaurant,
                      Rating = review.Rating,
                      Text = review.Description,
                      Date = DateTime.Now
                  };

                  if (!string.IsNullOrWhiteSpace(review.Photo))
                  {
                      var path = HttpContext.Current.Server.MapPath("~/Content/ReviewsPhotos/");
                      string fileName = Guid.NewGuid().ToString();
                      fileName += ".jpg";
                      try
                      {
                          File.WriteAllBytes(path + fileName, Convert.FromBase64String(review.Photo));
                          reviewToAdd.Photo = fileName;
                      }
                      catch (Exception)
                      {
                          
                          throw;
                      }
                  }

                  var model = "";

                  db.Reviews.Add(reviewToAdd);
                  db.SaveChanges();

                  // TODO: transaction for editing rating

                  restaurant.Rating = (restaurant.Rating + review.Rating) / 2;
                  db.SaveChanges();

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        model);

                  return response;
              });

            return result;
        }

        public HttpResponseMessage GetAll(int restaurantId, int pageSize = 20, int page = 1)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Reviews.All()
                      .Where(rw => rw.Restaurant.Id == restaurantId)
                      .OrderByDescending(r => r.Date)
                      .Skip((page - 1) * pageSize)
                      .Take(pageSize)
                      .Select(ReviewShortModel.FromReview);

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }


        public HttpResponseMessage GetReview(int id)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var model = db.Reviews.All()
                      .Where(r=> r.Id == id)
                      .Select(ReviewDetailsModel.FromReview)
                      .FirstOrDefault();

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        model);

                  return response;
              });

            return result;
        }
    }
}