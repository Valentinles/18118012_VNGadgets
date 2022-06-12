using GadgetsVN.Common.Models.Cart;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Contracts
{
    public interface ICartService
    {
        Task<bool> CreateCart(string userId);

        Task<CartResponseModel> UserCart(string userId);

        Task<CartItemCountResponseModel> UserCartItemsCount(string userId);


        Task<bool> AddItemToCart(int productId, string userId);

        Task<bool> RemoveItemFromCart(int productId, string userId);

        Task<bool> IsItemInCart(int productId, string userId);
    }
}
