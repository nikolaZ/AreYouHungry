using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class CartLog
    {
        public int Id { get; set; }

        [Required]
        public virtual ICollection<CartLogMeal> Meals { get; set; }

        [Required]
        public virtual ApplicationUser User { get; set; }

        [Required]
        [Range(0.01, double.PositiveInfinity)]
        public decimal Total { get; set; }

        [Required]
        public DateTime LogDateTime { get; set; }

        public CartLog()
        {
            this.Meals = new HashSet<CartLogMeal>();
        }
    }
}
