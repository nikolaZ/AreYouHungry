﻿using System;
using System.Linq;
using System.Data.Entity;
using AreYouHungry.Models;

namespace AreYouHungry.Data
{
    public interface IUowData : IDisposable
    {
        IRepository<Cuisine> Cuisines { get; }

        IRepository<Meal> Meals { get; }

        IRepository<MealCategory> MealCategories { get; }

        IRepository<Photo> Photos { get; }

        IRepository<Restaurant> Restaurants { get; }

        IRepository<Review> Reviews { get; }

        DbContext GetContext();

        int SaveChanges();
    }
}