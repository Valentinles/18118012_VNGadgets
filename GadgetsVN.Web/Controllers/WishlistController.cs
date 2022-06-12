using GadgetsVN.Common.Models.Wishlist;
using GadgetsVN.Services.Contracts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GadgetsVN.Web.Controllers
{
    [Authorize]
    public class WishlistController : ApiController
    {
        private readonly IWishlistService wishlistService;

        public WishlistController(IWishlistService wishlistService)
        {
            this.wishlistService = wishlistService;
        }

        [Route(nameof(MyWishlist))]
        [HttpGet]
        public async Task<ActionResult<WishlistResponseModel>> MyWishlist()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            try
            {
                var wishlist = await this.wishlistService.UserWishlist(userId);

                return Ok(wishlist);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
           
        }

        [Route(nameof(MyWishlistCount))]
        [HttpGet]
        public async Task<ActionResult> MyWishlistCount()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var wishlistCount = await this.wishlistService.UserWishlistItemsCount(userId);

            return Ok(wishlistCount);
        }

        [Route(nameof(AddItem))]
        [HttpPost]
        public async Task<ActionResult> AddItem(WishlistRequestModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var addToWishlist = await this.wishlistService.AddItemToWishlist(model.ProductId, userId);
            if (addToWishlist)
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
        public async Task<ActionResult> RemoveItem(WishlistRequestModel model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var removeItem = await this.wishlistService.RemoveItemFromWishlist(model.ProductId, userId);
            if (removeItem)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("iswishlisted/{id}")]
        public async Task<ActionResult> IsWishlisted(int id)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var isWishlisted = await this.wishlistService.IsItemWishlisted(id, userId);
            if (isWishlisted)
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
