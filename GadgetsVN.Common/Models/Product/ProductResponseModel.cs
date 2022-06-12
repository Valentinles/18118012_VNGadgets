using GadgetsVN.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common.Models.Product
{
    public class ProductResponseModel : ProductRequestModel
    {
        public int Id { get; set; }

        public GadgetsVN.Models.Category Category { get; set; }
    }
}
