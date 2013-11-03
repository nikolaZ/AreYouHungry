using System.ComponentModel.DataAnnotations;

namespace AreYouHungry.Models
{
    public class Photo
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150, MinimumLength = 3)]
        public string Url { get; set; }
    }
}
