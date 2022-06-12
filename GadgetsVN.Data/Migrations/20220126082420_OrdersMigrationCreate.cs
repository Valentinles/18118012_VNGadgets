using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace GadgetsVN.Data.Migrations
{
    public partial class OrdersMigrationCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantity",
                schema: "18118012",
                table: "CartItems");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "18118012",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Orders",
                schema: "18118012",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CreatedOn = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsFinished = table.Column<bool>(type: "bit", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ProductId = table.Column<int>(type: "int", nullable: false),
                    ModifiedOn_18118012 = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalSchema: "18118012",
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Orders_Products_ProductId",
                        column: x => x.ProductId,
                        principalSchema: "18118012",
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4242));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4255));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4259));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4264));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4268));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4272));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(4277));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Items",
                keyColumn: "Id",
                keyValue: 1,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(3489));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Items",
                keyColumn: "Id",
                keyValue: 2,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 26, 10, 24, 20, 75, DateTimeKind.Local).AddTicks(3502));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Description", "ModifiedOn_18118012" },
                values: new object[] { "Very good laptop", new DateTime(2022, 1, 26, 10, 24, 20, 74, DateTimeKind.Local).AddTicks(4040) });

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Description", "ModifiedOn_18118012" },
                values: new object[] { "A good one", new DateTime(2022, 1, 26, 10, 24, 20, 74, DateTimeKind.Local).AddTicks(4322) });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId",
                schema: "18118012",
                table: "Orders",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                schema: "18118012",
                table: "Orders",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders",
                schema: "18118012");

            migrationBuilder.DropColumn(
                name: "Description",
                schema: "18118012",
                table: "Products");

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                schema: "18118012",
                table: "CartItems",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 1,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6426));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 2,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6438));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 3,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6443));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 4,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6447));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 5,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6452));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 6,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6456));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Categories",
                keyColumn: "Id",
                keyValue: 7,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(6461));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Items",
                keyColumn: "Id",
                keyValue: 1,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(5658));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Items",
                keyColumn: "Id",
                keyValue: 2,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 458, DateTimeKind.Local).AddTicks(5671));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 457, DateTimeKind.Local).AddTicks(6353));

            migrationBuilder.UpdateData(
                schema: "18118012",
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "ModifiedOn_18118012",
                value: new DateTime(2022, 1, 25, 12, 2, 50, 457, DateTimeKind.Local).AddTicks(6644));
        }
    }
}
