using Antlr.Runtime.Misc;
using AreYouHungry.Models;
using System.Linq.Expressions;
using System.Runtime.Serialization;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class CartLogMealModel
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "quantity")]
        public int Quantity { get; set; }

        [DataMember(Name = "price")]
        public decimal Price { get; set; }

        [DataMember(Name = "subtotal")]
        public decimal Subtotal { get; set; }

        [DataMember(Name = "restaurantName")]
        public string RestaurantName { get; set; }
    }
}
