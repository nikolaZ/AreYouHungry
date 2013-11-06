using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class Review
    {
        public int Id { get; set; }

        //public ApplicationUser User { get; set; }

        public double Rating { get; set; }

        [Required]
        [StringLength(350, MinimumLength = 3)]
        public string Text { get; set; }

        [StringLength(100, MinimumLength = 3)]
        public string Pros { get; set; }

        [StringLength(100, MinimumLength = 3)]
        public string Cons { get; set; }

        public DateTime Date { get; set; }

        public virtual ICollection<Photo> Photos { get; set; }

        public Review()
        {
            this.Photos = new HashSet<Photo>();
        }
    }
}
