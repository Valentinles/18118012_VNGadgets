using GadgetsVN.Common.Models.Category;
using GadgetsVN.Data;
using GadgetsVN.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Implementations
{
    public class CategoryService : DataService, ICategoryService
    {
        public CategoryService(GadgetsVNDbContext context) : base(context)
        {           
        }

        public async Task<List<CategoryResponseModel>> GetCategories()
        {
            return await this.context.Categories.Select(c => new CategoryResponseModel
            {
                Id = c.Id,
                Title = c.Title
            }).ToListAsync();
        }
    }
}
