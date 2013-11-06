using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class MealCategory
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }
    }
}
