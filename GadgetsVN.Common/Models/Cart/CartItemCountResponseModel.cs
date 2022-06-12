using GadgetsVN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Cart
{
    public class CartItemCountResponseModel
    {
        public string UserId { get; set; }

        public User User { get; set; }

        public int Count { get; set; }
    }
}
