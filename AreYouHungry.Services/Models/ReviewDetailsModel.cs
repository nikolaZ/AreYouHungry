using AreYouHungry.Models;
using System;
using System.Runtime.Serialization;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class ReviewDetailsModel
    {
        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Name = "rating")]
        public double Rating { get; set; }

        [DataMember(Name = "username")]
        public string Username { get; set; }

        [DataMember(Name = "dateTime")]
        public DateTime ReviewDateTime { get; set; }

        [DataMember(Name = "photo")]
        public string Photo { get; set; }

        [DataMember(Name = "description")]
        public string Description { get; set; }

        public static Func<Review, ReviewDetailsModel> FromReview
        {
            get
            {
                return r => new ReviewDetailsModel
                {
                    Id = r.Id,
                    Rating = r.Rating,
                    ReviewDateTime = r.Date,
                    Username = r.User.UserName,
                    Photo = r.Photo,
                    Description = r.Text
                };
            }
        }
    }
}