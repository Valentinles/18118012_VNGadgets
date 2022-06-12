using GadgetsVN.Models;
using GadgetsVN.Common.Models.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GadgetsVN.Services.Contracts;

namespace GadgetsVN.Web.Controllers
{

    public class IdentityController : ApiController
    {
        private readonly UserManager<User> userManager;
        private readonly ApplicationSettings applicationSettings;
        private readonly ICartService cartService;
        private readonly IWishlistService wishlistService;

        public IdentityController(UserManager<User> userManager,
            IOptions<ApplicationSettings> applicationSettings,
            ICartService cartService,
            IWishlistService wishlistService)
        {
            this.userManager = userManager;
            this.applicationSettings = applicationSettings.Value;
            this.cartService = cartService;
            this.wishlistService = wishlistService;
        }

        [Route(nameof(Register))]
        public async Task<ActionResult> Register(RegisterRequestModel model)
        {
            var user = new User()
            {
                UserName = model.UserName,
                Email = model.Email
            };

            var result = await this.userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                var cartCreate = await this.cartService.CreateCart(user.Id);
                var wishlistCreate = await this.wishlistService.CreateWishlist(user.Id);
                if (cartCreate && wishlistCreate)
                {
                    return Ok();
                }
            }

            return BadRequest(result.Errors);
        }


        [Route(nameof(Login))]
        public async Task<ActionResult<object>> Login(LoginRequestModel model)
        {
            var user = await this.userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                return Unauthorized();
            }
            var passwordValid = await this.userManager.CheckPasswordAsync(user, model.Password);

            if (!passwordValid)
            {
                return Unauthorized();
            }
            var roles = await this.userManager.GetRolesAsync(user);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserName)
            };

            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token");
            claimsIdentity.AddClaims(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(this.applicationSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claimsIdentity),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var encryptedToken = tokenHandler.WriteToken(token);
            return new
            {
                Token = encryptedToken,
                Roles = roles
            };
        }
    }
}
