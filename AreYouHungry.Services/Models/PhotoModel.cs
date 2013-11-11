using AreYouHungry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;

namespace AreYouHungry.Services.Models
{
    [DataContract]
    public class PhotoModel
    {
        [DataMember(Name="url")]
        public string Url { get; set; }

        public static Func<Photo, PhotoModel> FromPhoto
        {
            get
            {
                return photo => new PhotoModel
                {
                    Url = photo.Url
                };
            }
        }
    }
}
