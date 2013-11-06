﻿using AreYouHungry.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;

namespace AreYouHungry.Data
{
    public class UowData : IUowData
    {
        private readonly DataContext context;
        private readonly Dictionary<Type, object> repositories = new Dictionary<Type, object>();
        
        public UowData()
            : this(new DataContext())
        {
        }

        public UowData(DataContext context)
        {
            this.context = context;
        }

        //public IDbSet<Cuisine> Cuisines { get; set; }

        //public IDbSet<Meal> Meals { get; set; }

        //public IDbSet<MealCategory> MealCategories { get; set; }

        //public IDbSet<Photo> Photos { get; set; }

        //public IDbSet<Restaurant> Restaurants { get; set; }

        //public IDbSet<Review> Reviews { get; set; }
        public IRepository<Cuisine> Cuisines
        {
            get
            {
                return this.GetRepository<Cuisine>();
            }
        }

        public IRepository<Meal> Meals
        {
            get
            {
                return this.GetRepository<Meal>();
            }
        }

        public IRepository<MealCategory> MealCategories
        {
            get
            {
                return this.GetRepository<MealCategory>();
            }
        }

        public IRepository<Photo> Photos
        {
            get
            {
                return this.GetRepository<Photo>();
            }
        }

        public IRepository<Restaurant> Restaurants
        {
            get
            {
                return this.GetRepository<Restaurant>();
            }
        }

        public IRepository<Review> Reviews
        {
            get
            {
                return this.GetRepository<Review>();
            }
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            if (!this.repositories.ContainsKey(typeof(T)))
            {
                var type = typeof(GenericRepository<T>);

                this.repositories.Add(typeof(T), Activator.CreateInstance(type, this.context));
            }

            return (IRepository<T>)this.repositories[typeof(T)];
        }

        public int SaveChanges()
        {
            try
            {
                return this.context.SaveChanges();
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public DbContext GetContext()
        {
            return this.context;
        }

        public void Dispose()
        {
            this.context.Dispose();
        }
    }
}