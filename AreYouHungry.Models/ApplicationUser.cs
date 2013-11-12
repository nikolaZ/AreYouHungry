using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AreYouHungry.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string Email { get; set; }

        public string Phone { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }

        public virtual ICollection<CartLog> CartLogs { get; set; }

        public ApplicationUser()
        {
            this.Reviews = new HashSet<Review>();
            this.CartLogs = new HashSet<CartLog>();
        }
    }
}