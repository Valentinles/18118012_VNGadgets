using GadgetsVN.Common.Models.Wishlist;
using GadgetsVN.Data;
using GadgetsVN.Models;
using GadgetsVN.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Implementations
{
    public class WishlistService : DataService, IWishlistService
    {
        public WishlistService(GadgetsVNDbContext context) : base(context)
        {
        }
        public async Task<bool> CreateWishlist(string userId)
        {
            try
            {
                var user = await this.context.Users.FindAsync(userId);
                if (user != null)
                {
                    var wishlist = new Wishlist()
                    {
                        UserId = user.Id,
                        User = user,
                        ModifiedOn_18118012 = DateTime.Now
                    };

                    user.Wishlist = wishlist;
                    this.context.Users.Update(user);
                    await this.context.Wishlists.AddAsync(wishlist);
                    this.context.SaveChanges();
                }
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<WishlistItemCountResponseModel> UserWishlistItemsCount(string userId)
        {
            var user = await this.context.Users.FindAsync(userId);
            var wishlist = await this.context.Wishlists.Include(c => c.Items).FirstOrDefaultAsync(x => x.UserId == userId);
            var result = new WishlistItemCountResponseModel()
            {
                Count = wishlist.Items.Count
            };

            return result;
        }

        public async Task<WishlistResponseModel> UserWishlist(string userId)
        {
            var user = await this.context.Users.FindAsync(userId);
            var wishlist = await this.context.Wishlists.Include(w => w.Items)
                .ThenInclude(i => i.Item.Product)
                .ThenInclude(c => c.Category)
                .Select(c => new WishlistResponseModel()
                {
                    Items = c.Items,
                    UserId = c.UserId,

                }).FirstOrDefaultAsync(x => x.UserId == userId);

            return wishlist;
        }

        public async Task<bool> AddItemToWishlist(int productId, string userId)
        {
            try
            {
                var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
                var user = await this.context.Users.FindAsync(userId);

                var wishlist = await this.context.Wishlists.Include(w => w.Items)
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                var wishlistItem = new WishlistItem()
                {
                    WishlistId = wishlist.Id,
                    Wishlist = wishlist,
                    ItemId = item.Id,
                    Item = item,
                    ModifiedOn_18118012 = DateTime.Now
                };
                await this.context.WishlistItems.AddAsync(wishlistItem);
                this.context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveItemFromWishlist(int productId, string userId)
        {
            try
            {
                var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
                var user = await this.context.Users.FindAsync(userId);

                var wishlist = await this.context.Wishlists.Include(w => w.Items)
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                var wishlistItem = await this.context.WishlistItems.FirstOrDefaultAsync(ci => ci.ItemId == item.Id);
                this.context.WishlistItems.Remove(wishlistItem);
                this.context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> IsItemWishlisted(int productId, string userId)
        {
            var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
            if (item == null)
            {
                return false;
            }
            var user = await this.context.Users.FindAsync(userId);

            var wishlist = await this.context.Wishlists.Include(w => w.Items)
                .FirstOrDefaultAsync(x => x.UserId == userId);
            var isWishlisted = await this.context.WishlistItems
                .FirstOrDefaultAsync(x => x.Item.ProductId == productId && x.WishlistId == user.Wishlist.Id);
            if (isWishlisted != null)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
