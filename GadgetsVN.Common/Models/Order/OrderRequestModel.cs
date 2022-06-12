using GadgetsVN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Order
{
    public class OrderRequestModel
    {
        public int Quantity { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public int ProductId { get; set; }

        public GadgetsVN.Models.Product Product { get; set; }
    }
}
