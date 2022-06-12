using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Models
{
    public class WishlistItem
    {
        public int WishlistId { get; set; }

        public Wishlist Wishlist { get; set; }


        public int ItemId { get; set; }

        public Item Item { get; set; }


        public DateTime ModifiedOn_18118012 { get; set; }
    }
}
