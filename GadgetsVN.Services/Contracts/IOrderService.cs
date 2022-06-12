using GadgetsVN.Common.Models.Order;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Services.Contracts
{
    public interface IOrderService
    {
        Task<bool> CreateOrder(List<OrderRequestModel> orders, string userId);

        Task<List<OrderResponseModel>> GetAllOrders();

        Task<List<OrderResponseModel>> UserOrders(string userId);

        Task<MemoryStream> ExportOrders(string userId, List<OrderResponseModel> orders);
    }
}
