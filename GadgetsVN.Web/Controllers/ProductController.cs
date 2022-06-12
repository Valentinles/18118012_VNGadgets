using GadgetsVN.Services.Contracts;
using GadgetsVN.Common.Models.Product;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace GadgetsVN.Web.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
    public class ProductController : ApiController
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [Route(nameof(Create))]
        [HttpPost]
        public async Task<ActionResult> Create(ProductRequestModel model)
        {
            var createProduct = await this.productService.CreateProduct(model);
            if (createProduct)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [Route(nameof(AllProducts))]
        [HttpGet]
        public async Task<ActionResult<ProductResponseModel>> AllProducts()
        {
            var products = await this.productService.GetAllProducts();

            return Ok(products);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductResponseModel>> Product(int id)
        {
            var product = await this.productService.GetProduct(id);

            return Ok(product);
        }

        [HttpPost("delete/{id}")]
        public async Task<ActionResult<string>> Delete(int id)
        {

            var productDelete = await this.productService.DeleteProduct(id);
            if (productDelete)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost("update/{id}")]
        public async Task<ActionResult<string>> Update(ProductUpdateRequest model)
        {

            var productUpdate = await this.productService.UpdateProduct(model);
            if (productUpdate)
            {
                return Ok();
            }
            else
            {
                return BadRequest();

            }
        }

        [AllowAnonymous]
        [Route(nameof(Search))]
        public async Task<ActionResult<ProductResponseModel>> Search([FromQuery] string searchTerm)
        {
            var products = await this.productService.GetSearchedProducts(searchTerm);

            return Ok(products);
        }

        [AllowAnonymous]
        [Route(nameof(Filter))]
        public async Task<ActionResult<ProductResponseModel>> Filter(
            [FromQuery] string brand, string category, decimal priceFrom, decimal priceTo, string priceSort)
        {
            var products = await this.productService.FilterProducts(brand, category, priceFrom, priceTo, priceSort);

            return Ok(products);
        }
    }
}

