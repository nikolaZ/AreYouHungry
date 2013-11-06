using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AreYouHungry.Models
{
    public class Restaurant
    {
        public int Id { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [StringLength(350, MinimumLength = 3)]
        public string Address { get; set; }

        public string WorkingHours { get; set; }

        public double Rating { get; set; }

        public virtual ICollection<Cuisine> Cuisines { get; set; }

        public ICollection<string> PhoneNumbers { get; set; }

        [Required]
        [Column(TypeName = "ntext")]
        public string Description { get; set; }

        public virtual ICollection<Meal> Menu { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public Restaurant()
        {
            this.Cuisines = new HashSet<Cuisine>();
            this.PhoneNumbers = new HashSet<string>();
            this.Photos = new HashSet<Photo>();
            this.Menu = new HashSet<Meal>();
        }
    }
}
