using GadgetsVN.Common.Models.Cart;
using GadgetsVN.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GadgetsVN.Web.Controllers
{
    [Authorize]
    public class CartController : ApiController
    {
        private readonly ICartService cartService;

        public CartController(ICartService cartService)
        {
            this.cartService = cartService;
        }

        [Route(nameof(MyCart))]
        [HttpGet]
        public async Task<ActionResult<CartResponseModel>> MyCart()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var cart = await this.cartService.UserCart(userId);

            return Ok(cart);
        }

        [Route(nameof(MyCartCount))]
        [HttpGet]
        public async Task<ActionResult> MyCartCount()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var cartCount = await this.cartService.UserCartItemsCount(userId);

            return Ok(cartCount);
        }

        [Route(nameof(AddItem))]
        [HttpPost]
        public async Task<ActionResult> AddItem(CartItemRequestModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var addToCart = await this.cartService.AddItemToCart(model.ProductId, userId);
            if (addToCart)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Route(nameof(RemoveItem))]
        [HttpPost]
        public async Task<ActionResult> RemoveItem(CartItemRequestModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var removeItem = await this.cartService.RemoveItemFromCart(model.ProductId, userId);
            if (removeItem)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("isitemincart/{id}")]
        public async Task<ActionResult> IsItemInCart(int id)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var isItemInCart = await this.cartService.IsItemInCart(id, userId);
            if (isItemInCart)
            {
                return Ok();
            }
            else
            {
                return NoContent();
            }
        }
    }
}
