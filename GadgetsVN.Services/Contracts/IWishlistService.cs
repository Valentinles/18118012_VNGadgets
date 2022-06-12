using GadgetsVN.Common.Models.Wishlist;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Contracts
{
    public interface IWishlistService
    {
        Task<bool> CreateWishlist(string userId);

        Task<WishlistResponseModel> UserWishlist(string userId);

        Task<WishlistItemCountResponseModel> UserWishlistItemsCount(string userId);

        Task<bool> AddItemToWishlist(int productId, string userId);

        Task<bool> RemoveItemFromWishlist(int productId, string userId);

        Task<bool> IsItemWishlisted(int productId, string userId);
    }
}
