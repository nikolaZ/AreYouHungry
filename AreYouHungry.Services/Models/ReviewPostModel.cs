using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace AreYouHungry.Services.Models
{
            [DataContract]
    public class ReviewPostModel
    {
        [DataMember(Name = "restaurantId")]
        public int RestaurantId { get; set; }

        [DataMember(Name = "rating")]
        public double Rating { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        [DataMember(Name = "photo")]
        public string Photo { get; set; }
    }
}