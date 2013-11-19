using System;
using AreYouHungry.Models;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Runtime.Serialization;
using System.Linq;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class CartLogModel
    {
        [DataMember(Name = "meals")]
        public virtual ICollection<CartLogMealModel> Meals { get; set; }

        [DataMember(Name = "total")]
        public decimal Total { get; set; }

        [DataMember(Name = "logDateTime")]
        public System.DateTime LogDateTime { get; set; }

        public static Func<CartLog, CartLogModel> FromCartLog
        {
            get
            {
                return cartLog => new CartLogModel
                {
                    Total = cartLog.Total,
                    LogDateTime = cartLog.LogDateTime,
                    Meals = cartLog.Meals.Select(meal => new CartLogMealModel()
                    {
                        Name = meal.Name,
                        Subtotal = meal.Subtotal,
                        Quantity = meal.Quantity,
                        Price = meal.Price,
                        RestaurantName = meal.RestaurantName
                    }).ToList()
                };
            }
        }
    }
}