using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GadgetsVN.Models
{
    public class User : IdentityUser
    {
        public Cart Cart { get; set; }

        public Wishlist Wishlist { get; set; }

        public List<Order> Orders { get; set; }

        public DateTime ModifiedOn_18118012 { get; set; } = DateTime.Now;
    }
}
