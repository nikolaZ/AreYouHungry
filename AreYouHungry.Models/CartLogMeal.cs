using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class CartLogMeal
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [Range(1, 99)]
        public int Quantity { get; set; }

        [Required]
        [Range(0.01, double.PositiveInfinity)]
        public decimal Price { get; set; }

        [Required]
        public decimal Subtotal { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string RestaurantName { get; set; }
    }
}
