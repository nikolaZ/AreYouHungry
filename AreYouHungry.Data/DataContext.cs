using AreYouHungry.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;

namespace AreYouHungry.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public IDbSet<Cuisine> Cuisines { get; set; }

        public IDbSet<Meal> Meals { get; set; }

        public IDbSet<MealCategory> MealCategories { get; set; }

        public IDbSet<Photo> Photos { get; set; }

        public IDbSet<Restaurant> Restaurants { get; set; }

        public IDbSet<Review> Reviews { get; set; }

        public DataContext()
            : base("AreYouHungry1")
        {
        }
    }
}