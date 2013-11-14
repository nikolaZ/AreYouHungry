using AreYouHungry.Models;
using System;
using System.Runtime.Serialization;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class RestaurantMapModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "logo")]
        public string Logo { get; set; }

        [DataMember(Name = "longitude")]
        public double Longitude { get; set; }

        [DataMember(Name = "latitude")]
        public double Latitude { get; set; }

        public static Func<Restaurant, RestaurantMapModel> FromRestaurant
        {
            get
            {
                return r => new RestaurantMapModel
                {
                    Id = r.Id,
                    Name = r.Name,
                    Latitude = r.Latitude,
                    Longitude = r.Longitude,
                    Logo = r.Logo,
                };
            }
        }
    }
}