namespace AreYouHungry.Data.Migrations
{
    using AreYouHungry.Models;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    public sealed class Configuration : DbMigrationsConfiguration<AreYouHungry.Data.DataContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            ContextKey = "Data.DataContext";
        }

        protected override void Seed(AreYouHungry.Data.DataContext context)
        {
            //// Unique Constraints
            SetUniqueConstraints(context);

            if (!context.Restaurants.Any())
            {

                var bulCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Bulgarian"
                });

                var chiCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Chinese"
                });

                var itaCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Italian"
                });

                var vegCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Vegeterian"
                });

                var saladCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Salad"
                });

                var grillCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Grill"
                });

                var pizzaCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Pizza"
                });

                var aLaMinuteCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "A La Minute"
                });

                var spaghettiCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Spaghetti"
                });

                var mainCourseCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Main course"
                });

                var appetizerCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Appetizer"
                });

                var dessertCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Dessert"
                });

                var coldStarterCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Cold Starter"
                });

                var warmStarterCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Warm Starter"
                });

                var soupCategory = context.MealCategories.Add(new AreYouHungry.Models.MealCategory()
                {
                    Name = "Soup"
                });

                List<Meal> meals = new List<Meal>();

                meals.Add(new Meal()
                {
                    MealCategory = spaghettiCategory,
                    Name = "Spaghetti Boloneze",
                    Price = 4.3M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals.Add(new Meal()
                {
                    MealCategory = mainCourseCategory,
                    Name = "Musaka",
                    Price = 2.3M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals.Add(new Meal()
                {
                    MealCategory = saladCategory,
                    Name = "Russian Salad",
                    Price = 3.3M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals.Add(new Meal()
                {
                    MealCategory = dessertCategory,
                    Name = "Baklava",
                    Price = 3.8M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                context.Restaurants.Add(new Restaurant()
                {
                    Name = "Classico",
                    Description = "Best restaurant ever. Offer everything you might want.",
                    Address = "Sofia, Mladost 1, Aleksandar Malinov 42",
                    Menu = meals,
                    PhoneNumbers = new List<string>()
                    {
                        "0898765567",
                        "0887879856"
                    },
                    Cuisines = new List<Cuisine>()
                    {
                        vegCuisine, bulCuisine
                    },
                    WorkingHours = "Mon - Sat : 09:00 - 22:30"
                });
            }

            context.SaveChanges();
        }

        private static void SetUniqueConstraints(AreYouHungry.Data.DataContext context)
        {
            context.Database.ExecuteSqlCommand(
                "IF OBJECT_ID('uc_Cuisines_Name', 'UQ') IS NULL" +
                " ALTER TABLE Cuisines ADD CONSTRAINT uc_Cuisines_Name UNIQUE(Name)");

            context.Database.ExecuteSqlCommand(
                "IF OBJECT_ID('uc_MealCategories_Name', 'UQ') IS NULL" +
                " ALTER TABLE MealCategories ADD CONSTRAINT uc_MealCategories_Name UNIQUE(Name)");

            context.Database.ExecuteSqlCommand(
                "IF OBJECT_ID('uc_Meal', 'UQ') IS NULL" +
                " ALTER TABLE Meals ADD CONSTRAINT uc_Meal UNIQUE(Name, Price, Restaurant_Id)");

            context.Database.ExecuteSqlCommand(
                "IF OBJECT_ID('uc_Restaurant', 'UQ') IS NULL" +
                " ALTER TABLE Restaurants ADD CONSTRAINT uc_Restaurant UNIQUE(Name, Address)");
        }
    }
}
