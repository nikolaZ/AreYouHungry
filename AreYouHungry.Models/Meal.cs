using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class Meal
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [Range(0.01, double.PositiveInfinity)]
        public decimal Price { get; set; }

        public virtual Photo Photo { get; set; }

        public virtual MealCategory MealCategory { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 3)]
        public string Description { get; set; }

        // Comments

        public Meal()
        {
        }
    }
}
