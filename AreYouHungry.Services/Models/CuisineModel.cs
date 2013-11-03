using AreYouHungry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Runtime.Serialization;
using System.Web;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class CuisineModel
    {
        [DataMember(Name = "name")]
        public string Name { get; set; }

        public static Expression<Func<Cuisine, CuisineModel>> FromCuisine
        {
            get
            {
                return c => new CuisineModel
                {
                    Name = c.Name
                };
            }
        }
    }
}