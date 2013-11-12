using System;
using System.Linq;
using System.Data.Entity;
using AreYouHungry.Models;

namespace AreYouHungry.Data
{
    public interface IUowData : IDisposable
    {
        IRepository<ApplicationUser> Users { get; }

        IRepository<Cuisine> Cuisines { get; }

        IRepository<Meal> Meals { get; }

        IRepository<MealCategory> MealCategories { get; }

        IRepository<Photo> Photos { get; }

        IRepository<Restaurant> Restaurants { get; }

        IRepository<Review> Reviews { get; }

        IRepository<CartLog> CartLogs { get; }

        IRepository<CartLogMeal> CartLogMeals { get; }

        DbContext GetContext();

        int SaveChanges();
    }
}
