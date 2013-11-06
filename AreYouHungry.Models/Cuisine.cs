using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class Cuisine
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Name { get; set; }

        public virtual ICollection<Restaurant> Restaurants { get; set; }

        public Cuisine()
        {
            this.Restaurants = new HashSet<Restaurant>();
        }
    }
}
