using GadgetsVN.Common.Models.Category;
using GadgetsVN.Services.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GadgetsVN.Web.Controllers
{
    public class CategoryController : ApiController
    {
        private readonly ICategoryService categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [Route(nameof(AllCategories))]
        [HttpGet]
        public async Task<ActionResult<CategoryResponseModel>> AllCategories()
        {
            var categories = await this.categoryService.GetCategories();

            return Ok(categories);
        }
    }
}
