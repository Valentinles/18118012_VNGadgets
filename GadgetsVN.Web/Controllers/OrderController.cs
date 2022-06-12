using GadgetsVN.Common.Models.Order;
using GadgetsVN.Services.Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    public class OrderController : ApiController
    {
        private readonly IOrderService orderService;

        public OrderController(IOrderService orderService)
        {
            this.orderService = orderService;
        }

        [Route(nameof(Create))]
        [HttpPost]
        public async Task<ActionResult> Create(List<OrderRequestModel> model)
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            var createOrder = await this.orderService.CreateOrder(model, userId);
            if (createOrder)
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [Route(nameof(MyOrders))]
        [HttpGet]
        public async Task<ActionResult<OrderResponseModel>> MyOrders()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            try
            {
                var orders = await this.orderService.UserOrders(userId);

                return Ok(orders);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Route(nameof(MyOrdersExport))]
        [HttpGet]
        public async Task<ActionResult> MyOrdersExport()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            try
            {
                var orders = await this.orderService.UserOrders(userId);
                var content = await this.orderService.ExportOrders(userId, orders);
                return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "VN_Gadgets_Orders.xlsx");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [Route(nameof(AllOrdersExport))]
        [HttpGet]
        public async Task<ActionResult> AllOrdersExport()
        {
            var userId = this.User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier).Value;

            try
            {
                var orders = await this.orderService.GetAllOrders();
                var content = await this.orderService.ExportOrders(userId, orders);
                return File(content,
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "VN_Gadgets_Orders.xlsx");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [Route(nameof(AllOrders))]
        [HttpGet]
        public async Task<ActionResult<OrderResponseModel>> AllOrders()
        {
            var orders = await this.orderService.GetAllOrders();

            return Ok(orders);
        }
    }
}
