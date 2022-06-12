using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Order
{
    public class OrderResponseModel : OrderRequestModel
    {
        public int Id { get; set; }

        public bool IsFinished { get; set; }

        public DateTime CreatedOn { get; set; }
    }
}
