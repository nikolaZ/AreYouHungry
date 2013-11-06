using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class CuisineExtendedModel
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "restaurants")]
        public IEnumerable<RestaurantShortModel> Restaurants { get; set; }
    }
}