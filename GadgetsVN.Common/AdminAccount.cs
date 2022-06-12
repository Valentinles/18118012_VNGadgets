using GadgetsVN.Data;
using GadgetsVN.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GadgetsVN.Common
{
    public class AdminAccount
    {
        public static void SetupAdminAccount(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                var dbContext = serviceScope.ServiceProvider.GetRequiredService<GadgetsVNDbContext>();

                var roleManager = serviceScope.ServiceProvider.GetService<RoleManager<IdentityRole>>();

                var userManager = serviceScope.ServiceProvider.GetRequiredService<UserManager<User>>();

                if (!roleManager.RoleExistsAsync("Admin").Result)
                {
                    roleManager.CreateAsync(new IdentityRole("Admin")).Wait();
                }

                if (userManager.FindByNameAsync("admin").Result == null)
                {
                    var adminUser = new User();
                    adminUser.UserName = "admin";
                    adminUser.Email = "admin@admin.com";

                    string adminPassword = "123456";
                    IdentityResult result = userManager.CreateAsync(adminUser, adminPassword).Result;

                    var adminCart = new Cart();
                    adminCart.ModifiedOn_18118012 = DateTime.Now;
                    adminCart.UserId = adminUser.Id;
                    adminCart.User = adminUser;

                    var adminWishlist = new Wishlist();
                    adminWishlist.ModifiedOn_18118012 = DateTime.Now;
                    adminWishlist.UserId = adminUser.Id;
                    adminWishlist.User = adminUser;

                    adminUser.Cart = adminCart;
                    adminUser.Wishlist = adminWishlist;

                    dbContext.Carts.Add(adminCart);
                    dbContext.Wishlists.Add(adminWishlist);
                    dbContext.SaveChanges();

                    if (result.Succeeded)
                    {
                        userManager.AddToRoleAsync(adminUser, "Admin").Wait();
                    }
                }
            }
        }
    }
}
