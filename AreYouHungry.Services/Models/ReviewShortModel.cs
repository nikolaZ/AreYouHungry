using AreYouHungry.Models;
using System;
using System.Runtime.Serialization;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class ReviewShortModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "rating")]
        public double Rating { get; set; }

        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "dateTime")]
        public DateTime ReviewDateTime { get; set; }

        [DataMember(Name = "hasPhoto")]
        public bool HasPhoto { get; set; }

        public static Func<Review, ReviewShortModel> FromReview
        {
            get
            {
                return r => new ReviewShortModel
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    ReviewDateTime = r.Date,
                    Username = r.User.UserName,
                    HasPhoto = r.Photo != ""
                };
            }
        }
    }
}