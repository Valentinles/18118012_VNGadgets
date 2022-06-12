using GadgetsVN.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace GadgetsVN.Data
{
    public class GadgetsVNDbContext : IdentityDbContext<User>
    {
        public GadgetsVNDbContext(DbContextOptions<GadgetsVNDbContext> options)
            : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<Item> Items { get; set; }

        public DbSet<Cart> Carts { get; set; }

        public DbSet<CartItem> CartItems { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }

        public DbSet<WishlistItem> WishlistItems { get; set; }

        public DbSet<Order> Orders { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("18118012");

            modelBuilder.Entity<CartItem>().HasKey(i => new { i.CartId, i.ItemId });

            modelBuilder.Entity<WishlistItem>().HasKey(i => new { i.WishlistId, i.ItemId });

            modelBuilder.Entity<Product>().HasData(
                new Product
                {
                    Id = 1,
                    Brand = "Asus",
                    DeviceModel = "ROG X",
                    Description = "Very good laptop",
                    ImageUrl = "https://www.technopolis.bg/medias/sys_master/h38/hf9/15514882080798.jpg",
                    Warranty = 2,
                    Price = 1500,
                    Quantity = 5,
                    CategoryId = 2,
                    ModifiedOn_18118012 = DateTime.Now
                },
                new Product
                {
                    Id = 2,
                    Brand = "Lenovo",
                    DeviceModel = "Legion",
                    Description = "A good one",
                    ImageUrl = "https://www.technopolis.bg/medias/sys_master/h48/h1a/16633996705822.jpg",
                    Warranty = 2,
                    Price = 1200,
                    Quantity = 5,
                    CategoryId = 2,
                    ModifiedOn_18118012 = DateTime.Now
                });

            modelBuilder.Entity<Item>().HasData(
                new Item
                {
                    Id = 1,
                    ProductId = 1,
                    ModifiedOn_18118012 = DateTime.Now
                },
                new Item 
                {
                    Id = 2,
                    ProductId = 2,
                    ModifiedOn_18118012 = DateTime.Now
                });

            modelBuilder.Entity<Category>().HasData(
               new Category
               {
                   Id = 1,
                   Title = "PC",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 2,
                   Title = "Laptop",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 3,
                   Title = "Gaming Console",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 4,
                   Title = "Mouse",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 5,
                   Title = "Keyboard",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 6,
                   Title = "Monitor",
                   ModifiedOn_18118012 = DateTime.Now
               },
               new Category
               {
                   Id = 7,
                   Title = "Gaming Controller",
                   ModifiedOn_18118012 = DateTime.Now
               });

            base.OnModelCreating(modelBuilder);
        }
    }
}
