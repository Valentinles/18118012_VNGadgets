using GadgetsVN.Common.Models.Category;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Contracts
{
    public interface ICategoryService
    {
        Task<List<CategoryResponseModel>> GetCategories();
    }
}
