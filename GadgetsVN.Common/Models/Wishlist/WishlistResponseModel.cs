using GadgetsVN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Wishlist
{
    public class WishlistResponseModel
    {
        public string UserId { get; set; }

        public List<WishlistItem> Items { get; set; }
    }
}
