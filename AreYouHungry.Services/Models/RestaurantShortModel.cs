using AreYouHungry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization;
using System.Text;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class RestaurantShortModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "address")]
        public string Address { get; set; }

        [DataMember(Name = "rating")]
        public double Rating { get; set; }

        [DataMember(Name = "logo")]
        public string Logo { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        public static Func<Restaurant, RestaurantShortModel> FromRestaurant
        {
            get
            {
                return r => new RestaurantShortModel
                {
                    Id = r.Id,
                    Name = r.Name,
                    Address = r.Address,
                    Rating = r.Rating,
                    Logo = r.Logo,
                    Description = r.Description
                };
            }
        }
    }
}
