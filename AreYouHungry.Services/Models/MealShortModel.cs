using AreYouHungry.Models;
using System;
using System.Runtime.Serialization;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class MealShortModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "name")]
        public string Name { get; set; }

        [DataMember(Name = "price")]
        public decimal Price { get; set; }

        [DataMember(Name = "photo")]
        public string Photo { get; set; }

        [DataMember(Name = "mealCategory")]
        public string MealCategory { get; set; }

        public static Func<Meal, MealShortModel> FromMeal
        {
            get
            {
                return meal => new MealShortModel
                {
                    Id = meal.Id,
                    Name = meal.Name,
                    MealCategory = meal.MealCategory.Name,
                    Photo = meal.Photo,
                    Price = meal.Price
                };
            }
        }
    }
}