using AreYouHungry.Data;
using AreYouHungry.Services.Models;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        [Route("api/restaurants/top")]
        public HttpResponseMessage GetTop()
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All()
                      .OrderByDescending(r=> r.Rating).Take(5).Select(RestaurantShortModel.FromRestaurant);
                  
                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        public HttpResponseMessage GetAll()
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All().OrderByDescending(r => r.Rating)
                      .Select(RestaurantShortModel.FromRestaurant);

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

        [Route("api/restaurants/{restaurantId}/photos")]
        public HttpResponseMessage GetPhotos(int restaurantId)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All().Where(r => r.Id == restaurantId).FirstOrDefault().Photos
                      .Select(PhotoModel.FromPhoto);

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        [Route("api/restaurants/{restaurantId}/menu")]
        public HttpResponseMessage GetMenu(int restaurantId)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Meals.All().Where(r => r.Restaurant.Id == restaurantId)
                      .Select(MealShortModel.FromMeal);

                  HttpResponseMessage response = this.Request.CreateResponse(
                        HttpStatusCode.OK,
                        models);

                  return response;
              });

            return result;
        }

        [Route("api/restaurants/{restaurantId}/map")]
        public HttpResponseMessage GetRestaurantMap(int restaurantId)
        {
            var result = this.PerformOperationAndHandleExceptions(
              () =>
              {
                  var models = db.Restaurants.All().Where(r => r.Id == restaurantId)
                      .Select(RestaurantMapModel.FromRestaurant)
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