using System;
using System.Data.Entity;
using System.Linq;
using AreYouHungry.Models;

namespace AreYouHungry.Data
{
    interface IDataContext
    {
        IDbSet<Cuisine> Cuisines { get; set; }

        IDbSet<Meal> Meals { get; set; }

        IDbSet<MealCategory> MealCategories { get; set; }

        IDbSet<Photo> Photos { get; set; }

        IDbSet<Restaurant> Restaurants { get; set; }

        IDbSet<Review> Reviews { get; set; }

        IDbSet<CartLog> CartLogs { get; set; }

        IDbSet<CartLogMeal> CartLogMeals { get; set; }
    }
}
