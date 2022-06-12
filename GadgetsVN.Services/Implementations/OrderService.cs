using GadgetsVN.Common.Models.Order;
using GadgetsVN.Data;
using GadgetsVN.Models;
using GadgetsVN.Services.Contracts;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Implementations
{
    public class OrderService : DataService, IOrderService
    {
        public OrderService(GadgetsVNDbContext context) : base(context)
        {
        }


        public async Task<bool> CreateOrder(List<OrderRequestModel> orders, string userId)
        {
            var user = await this.context.Users.FindAsync(userId);
            try
            {
                if (user != null)
                {
                    foreach (var ord in orders)
                    {
                        var product = await this.context.Products.FirstOrDefaultAsync(x => x.Id == ord.ProductId);
                        if (product != null && product.Quantity >= 1)
                        {
                            if (ord.Quantity <= product.Quantity)
                            {
                                var order = new Order()
                                {
                                    Quantity = ord.Quantity,
                                    IsFinished = false,
                                    CreatedOn = DateTime.Now,
                                    UserId = user.Id,
                                    User = user,
                                    ProductId = ord.ProductId,
                                    Product = ord.Product
                                };

                                product.Quantity -= ord.Quantity;
                                this.context.Products.Update(product);
                                await this.context.Orders.AddAsync(order);
                                this.context.SaveChanges();
                            }
                            else
                            {
                                return false;
                            }
                        }
                        else
                        {
                            return false;
                        }

                    }
                }
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<List<OrderResponseModel>> GetAllOrders()
        {
            return await this.context.Orders
                .Include(x => x.User)
                .Include(x => x.Product)
                .ThenInclude(c => c.Category)
                .Select(o => new OrderResponseModel
                {
                    Id = o.Id,
                    IsFinished = o.IsFinished,
                    UserId = o.UserId,
                    User = o.User,
                    ProductId = o.ProductId,
                    Product = o.Product,
                    Quantity = o.Quantity,
                    CreatedOn = o.CreatedOn
                }).ToListAsync();
        }

        public async Task<List<OrderResponseModel>> UserOrders(string userId)
        {
            var user = await this.context.Users.FindAsync(userId);
            var orders = new List<OrderResponseModel>();

            if (user != null)
            {
                orders = await this.context.Orders.Where(x => x.UserId == user.Id)
                    .Include(x => x.User)
                    .Include(x => x.Product)
                    .ThenInclude(c => c.Category)
                    .Select(o => new OrderResponseModel
                    {
                        Id = o.Id,
                        IsFinished = o.IsFinished,
                        UserId = o.UserId,
                        User = o.User,
                        ProductId = o.ProductId,
                        Product = o.Product,
                        Quantity = o.Quantity,
                        CreatedOn = o.CreatedOn
                    }).ToListAsync();
            }
            return orders;
        }

        public async Task<MemoryStream> ExportOrders(string userId, List<OrderResponseModel> orders)
        {
            var user = await this.context.Users.FindAsync(userId);
            var stream = new MemoryStream();
            if (user != null)
            {
                using (var xlPackage = new ExcelPackage(stream))
                {
                    var worksheet = xlPackage.Workbook.Worksheets.Add("Orders_" + user.UserName);
                    var namedStyle = xlPackage.Workbook.Styles.CreateNamedStyle("HyperLink");
                    namedStyle.Style.Font.UnderLine = true;
                    namedStyle.Style.Font.Color.SetColor(Color.Blue);
                    const int startRow = 5;
                    var row = startRow;

                    worksheet.Cells["A1"].Value = user.UserName + " Orders";
                    using (var r = worksheet.Cells["A1:H1"])
                    {
                        r.Merge = true;
                        r.Style.Font.Color.SetColor(Color.White);
                        r.Style.HorizontalAlignment = ExcelHorizontalAlignment.CenterContinuous;
                        r.Style.Fill.PatternType = ExcelFillStyle.Solid;
                        r.Style.Fill.BackgroundColor.SetColor(Color.FromArgb(23, 55, 93));
                    }

                    worksheet.Cells["A4"].Value = "Delivered";
                    worksheet.Cells["B4"].Value = "UserName";
                    worksheet.Cells["C4"].Value = "Brand";
                    worksheet.Cells["D4"].Value = "Model";
                    worksheet.Cells["E4"].Value = "Category";
                    worksheet.Cells["F4"].Value = "Quantity";
                    worksheet.Cells["G4"].Value = "Unit Price (Euro)";
                    worksheet.Cells["H4"].Value = "Total Price (Euro)";
                    worksheet.Cells["A4:H4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                    worksheet.Cells["A4:H4"].Style.Fill.BackgroundColor.SetColor(Color.FromArgb(184, 204, 228));
                    worksheet.Cells["A4:H4"].Style.Font.Bold = true;

                    row = 5;
                    foreach (var order in orders)
                    {
                        worksheet.Cells[row, 1].Value = order.IsFinished;
                        worksheet.Cells[row, 2].Value = order.User.UserName;
                        worksheet.Cells[row, 3].Value = order.Product.Brand;
                        worksheet.Cells[row, 4].Value = order.Product.DeviceModel;
                        worksheet.Cells[row, 5].Value = order.Product.Category.Title;
                        worksheet.Cells[row, 6].Value = order.Quantity;
                        worksheet.Cells[row, 7].Value = order.Product.Price;
                        worksheet.Cells[row, 8].Value = order.Quantity * order.Product.Price;
                        row++;
                    }

                    xlPackage.Workbook.Properties.Title = "Orders List";
                    xlPackage.Workbook.Properties.Author = user.UserName;
                    xlPackage.Workbook.Properties.Subject = user.UserName+ " List";
                    xlPackage.Save();
                    
                }
                stream.Position = 0;
            }
            return stream;
        }

    }
}
