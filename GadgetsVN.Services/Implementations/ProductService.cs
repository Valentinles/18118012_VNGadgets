using GadgetsVN.Data;
using GadgetsVN.Models;
using GadgetsVN.Common.Models.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GadgetsVN.Services.Contracts;
using Microsoft.EntityFrameworkCore;

namespace GadgetsVN.Services.Implementations
{
    public class ProductService : DataService, IProductService
    {
        public ProductService(GadgetsVNDbContext context) : base(context) { }

        public async Task<bool> CreateProduct(ProductRequestModel model)
        {
            try
            {
                var product = new Product()
                {
                    Brand = model.Brand,
                    DeviceModel = model.DeviceModel,
                    ImageUrl = model.ImageUrl,
                    Warranty = model.Warranty,
                    Price = model.Price,
                    Quantity = model.Quantity,
                    CategoryId = model.CategoryId,
                    ModifiedOn_18118012 = DateTime.Now,
                    Description = model.Description
                };

                var item = new Item()
                {
                    ProductId = product.Id,
                    Product = product,
                    ModifiedOn_18118012 = DateTime.Now
                };

                await this.context.Items.AddAsync(item);
                await this.context.Products.AddAsync(product);
                this.context.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> DeleteProduct(int id)
        {
            try
            {
                var product = await this.context.Products.FirstOrDefaultAsync(x => x.Id == id);
                this.context.Products.Remove(product);
                this.context.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateProduct(ProductUpdateRequest model)
        {
            try
            {
                var product = await this.context.Products.FirstOrDefaultAsync(x => x.Id == model.Id);
                product.Brand = model.Brand;
                product.DeviceModel = model.DeviceModel;
                product.ImageUrl = model.ImageUrl;
                product.Warranty = model.Warranty; ;
                product.Price = model.Price;
                product.Quantity = model.Quantity;
                product.CategoryId = model.CategoryId;
                product.Category = await this.context.Categories.FirstOrDefaultAsync(x => x.Id == model.CategoryId);
                product.ModifiedOn_18118012 = DateTime.Now;
                product.Description = model.Description;
                this.context.Products.Update(product);
                this.context.SaveChanges();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<ProductResponseModel>> GetAllProducts()
        {
            return await this.context.Products.Include(x => x.Category).Select(p => new ProductResponseModel
            {
                Id = p.Id,
                Brand = p.Brand,
                DeviceModel = p.DeviceModel,
                ImageUrl = p.ImageUrl,
                Warranty = p.Warranty,
                Price = p.Price,
                Quantity = p.Quantity,
                CategoryId = p.CategoryId,
                Category = p.Category,
                Description = p.Description
            }).ToListAsync();
        }

        public async Task<ProductResponseModel> GetProduct(int id)
        {
            return await this.context.Products.Include(x => x.Category).Where(x => x.Id == id).Select(p => new ProductResponseModel
            {
                Id = p.Id,
                Brand = p.Brand,
                DeviceModel = p.DeviceModel,
                ImageUrl = p.ImageUrl,
                Warranty = p.Warranty,
                Price = p.Price,
                Quantity = p.Quantity,
                CategoryId = p.CategoryId,
                Category = p.Category,
                Description = p.Description
            }).FirstOrDefaultAsync();
        }

        public async Task<List<ProductResponseModel>> GetSearchedProducts(string searchParam)
        {
            return await this.context.Products
                .Include(x => x.Category)
                .Where(x => x.Brand.Contains(searchParam) || x.DeviceModel.Contains(searchParam))
                .Select(p => new ProductResponseModel
                {
                    Id = p.Id,
                    Brand = p.Brand,
                    DeviceModel = p.DeviceModel,
                    ImageUrl = p.ImageUrl,
                    Warranty = p.Warranty,
                    Price = p.Price,
                    Quantity = p.Quantity,
                    CategoryId = p.CategoryId,
                    Category = p.Category,
                    Description = p.Description
                }).ToListAsync();
        }

        public Task<List<ProductResponseModel>> FilterProducts(
            string brand, string category, decimal priceFrom, decimal priceTo, string priceSort)
        {
            var result = this.context.Products.Include(c => c.Category).AsQueryable();
            if (brand != "" && brand != null)
            {
                result = result.Where(x => x.Brand == brand);
            }
            if (category != "" && category != null)
            {
                result = result.Where(x => x.Category.Title == category);
            }
            result = result.Where(x => x.Price >= priceFrom);
            result = result.Where(x => x.Price <= priceTo);
            if (priceSort == "desc")
            {
                result = result.OrderByDescending(x => x.Price);
            }
            else
            {
                result = result.OrderBy(x => x.Price);
            }

            return result.Select(p => new ProductResponseModel
            {
                Id = p.Id,
                Brand = p.Brand,
                DeviceModel = p.DeviceModel,
                ImageUrl = p.ImageUrl,
                Warranty = p.Warranty,
                Price = p.Price,
                Quantity = p.Quantity,
                CategoryId = p.CategoryId,
                Category = p.Category,
                Description = p.Description
            }).ToListAsync();
        }
    }
}
