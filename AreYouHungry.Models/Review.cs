using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class Review
    {
        public int Id { get; set; }

        [Required]
        public virtual ApplicationUser User { get; set; }

        [Required]
        public virtual Restaurant Restaurant { get; set; }

        [Required]
        public double Rating { get; set; }

        [Required]
        [StringLength(350, MinimumLength = 3)]
        public string Text { get; set; }

        [StringLength(100, MinimumLength = 3)]
        public string Pros { get; set; }

        [StringLength(100, MinimumLength = 3)]
        public string Cons { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public string Photo { get; set; }

        public Review()
        {
        }
    }
}
