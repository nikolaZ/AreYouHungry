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
            AutomaticMigrationDataLossAllowed = true;
            ContextKey = "Data.DataContext";
        }

        protected override void Seed(AreYouHungry.Data.DataContext context)
        {
            //// Unique Constraints
            SetUniqueConstraints(context);

            if (!context.Restaurants.Any())
            {
                //// Cuisines
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

                var fastFoodCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Fast Food"
                });

                var fishCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Fish and fish specialties"
                });

                var indianCuisine = context.Cuisines.Add(new AreYouHungry.Models.Cuisine()
                {
                    Name = "Indian"
                });


                //// Meal Categories
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
                    Photo = "http://www.jazzybonez.com/images/meals.jpg",
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals.Add(new Meal()
                {
                    MealCategory = mainCourseCategory,
                    Name = "Musaka",
                    Price = 2.3M,
                    Photo = "http://www.jazzybonez.com/images/meals.jpg",
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

                //// Menu 2
                List<Meal> meals2 = new List<Meal>();

                meals2.Add(new Meal()
                {
                    MealCategory = spaghettiCategory,
                    Name = "Spaghetti with ham",
                    Price = 4.3M,
                    Photo = "http://www.jazzybonez.com/images/meals.jpg",
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals2.Add(new Meal()
                {
                    MealCategory = soupCategory,
                    Name = "Chicken soup",
                    Price = 2.1M,
                    Photo = "http://www.jazzybonez.com/images/meals.jpg",
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals2.Add(new Meal()
                {
                    MealCategory = mainCourseCategory,
                    Name = "Chicken with mushrooms",
                    Price = 5.3M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals2.Add(new Meal()
                {
                    MealCategory = mainCourseCategory,
                    Name = "Mushrooms risotto",
                    Price = 3.8M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals2.Add(new Meal()
                {
                    MealCategory = saladCategory,
                    Name = "Shopska Salad",
                    Price = 4.5M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                meals2.Add(new Meal()
                {
                    MealCategory = dessertCategory,
                    Name = "Pancakes",
                    Price = 2.2M,
                    Description = "asajnuilbwq jkaccns acsccacscawq fv btbe beb  ca sc"
                });

                context.Restaurants.Add(new Restaurant()
                {
                    Name = "Classico",
                    Logo = "http://www.gallodesign.mx/imagenes/corporativo/clientes/classico-logo.jpg",
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
                    Photos = new List<Photo>()
                    {
                        new Photo()
                        {
                            Url = "http://cateringconsultants.org.uk/wp-content/uploads/2013/04/restaurant.jpg"
                        },
                                                new Photo()
                        {
                            Url = "http://www.southpacifichotel.com.hk/images/photo-tour-pics/lu_lu_restaurant.jpg"
                        },
                                                new Photo()
                        {
                            Url = "http://www.digitaltrends.com/wp-content/uploads/2012/08/restaurant.jpeg"
                        },
                                                new Photo()
                        {
                            Url = "http://media.treehugger.com/assets/images/2011/10/Acorn-Restaurant1.jpg"
                        },
                    },
                    WorkingHours = "Mon - Sat : 09:00 - 22:30"
                });

                context.Restaurants.Add(new Restaurant()
                {
                    Name = "The House",
                    Logo = "http://enphoto500x500.mnstatic.com/crab-house-restaurant_2700081.jpg",
                    Description = "Recently opened restaurant.",
                    Address = "Sofia, Studentski grad, 8mi dekemvri 9",
                    Menu = meals2,
                    PhoneNumbers = new List<string>()
                    {
                        "0878777567"
                    },
                    Cuisines = new List<Cuisine>()
                    {
                        vegCuisine, bulCuisine, itaCuisine
                    },
                    WorkingHours = "Mon - Sat : 08:00 - 23:30"
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
