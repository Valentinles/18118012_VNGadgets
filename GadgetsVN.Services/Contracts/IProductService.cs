using GadgetsVN.Common.Models.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Contracts
{
    public interface IProductService
    {
        Task<bool> CreateProduct(ProductRequestModel model);

        Task<List<ProductResponseModel>> GetAllProducts();

        Task<ProductResponseModel> GetProduct(int id);

        Task<bool> DeleteProduct(int id);

        Task<bool> UpdateProduct(ProductUpdateRequest model);

        Task<List<ProductResponseModel>> GetSearchedProducts(string searchParam);

        Task<List<ProductResponseModel>> FilterProducts(
            string brand, string category, decimal priceFrom, decimal priceTo, string priceSort);
    }
}
