using GadgetsVN.Common.Models.Cart;
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
    public class CartService : DataService, ICartService
    {
        public CartService(GadgetsVNDbContext context) : base(context)
        {
        }

        public async Task<bool> CreateCart(string userId)
        {
            try
            {
                var user = await this.context.Users.FindAsync(userId);
                if (user != null)
                {
                    var cart = new Cart()
                    {
                        UserId = user.Id,
                        User = user,
                        ModifiedOn_18118012 = DateTime.Now
                    };

                    user.Cart = cart;
                    this.context.Users.Update(user);
                    await this.context.Carts.AddAsync(cart);
                    this.context.SaveChanges();
                }
                return true;

            }
            catch (Exception)
            {

                return false;
            }
        }

        public async Task<CartResponseModel> UserCart(string userId)
        {
            var user = await this.context.Users.FindAsync(userId);

            var cart = await this.context.Carts.Include(c => c.Items)
                .ThenInclude(i => i.Item.Product)
                .ThenInclude(c=>c.Category)
                .Select(c => new CartResponseModel()
                {
                    Items = c.Items,
                    UserId = c.UserId,

                }).FirstOrDefaultAsync(x => x.UserId == userId);

            return cart;
        }

        public async Task<CartItemCountResponseModel> UserCartItemsCount(string userId)
        {
            var user = await this.context.Users.FindAsync(userId);
            var cart = await this.context.Carts.Include(c => c.Items).FirstOrDefaultAsync(x => x.UserId == userId);
            var result = new CartItemCountResponseModel()
            {
                Count = cart.Items.Count
        };

            return result;
        }

        public async Task<bool> AddItemToCart(int productId, string userId)
        {
            try
            {
                var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
                var user = await this.context.Users.FindAsync(userId);

                var cart = await this.context.Carts.Include(c => c.Items)
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                var cartItem = new CartItem()
                {
                    CartId = cart.Id,
                    Cart = cart,
                    ItemId = item.Id,
                    Item = item,
                    ModifiedOn_18118012 = DateTime.Now
                };
                await this.context.CartItems.AddAsync(cartItem);
                this.context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> RemoveItemFromCart(int productId, string userId)
        {
            try
            {
                var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
                var user = await this.context.Users.FindAsync(userId);

                var cart = await this.context.Carts.Include(c => c.Items)
                    .FirstOrDefaultAsync(x => x.UserId == userId);

                var cartItem = await this.context.CartItems.FirstOrDefaultAsync(ci => ci.ItemId == item.Id);
                this.context.CartItems.Remove(cartItem);
                this.context.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> IsItemInCart(int productId, string userId)
        {
            var item = await this.context.Items.FirstOrDefaultAsync(i => i.ProductId == productId);
            if (item == null)
            {
                return false;
            }
            var user = await this.context.Users.FindAsync(userId);

            var cart = await this.context.Carts.Include(w => w.Items)
                .FirstOrDefaultAsync(x => x.UserId == userId);
            var isInCart = await this.context.CartItems
               .FirstOrDefaultAsync(x => x.Item.ProductId == productId && x.CartId == user.Cart.Id);
            if (isInCart != null)
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
