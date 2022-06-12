using GadgetsVN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Cart
{
    public class CartResponseModel
    {
        public string UserId { get; set; }

        public List<CartItem> Items { get; set; }
    }
}
