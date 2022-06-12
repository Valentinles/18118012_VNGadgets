using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Models
{
    public class CartItem 
    {
        public int CartId { get; set; }

        public Cart Cart { get; set; }


        public int ItemId { get; set; }

        public Item Item { get; set; }


        public DateTime ModifiedOn_18118012 { get; set; }
    }
}
