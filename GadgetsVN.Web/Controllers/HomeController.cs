using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace GadgetsVN.Web.Controllers
{
    public class HomeController : ApiController
    {
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
        [Route(nameof(Tst))]
        public ActionResult Tst()
        {
            return Ok("Works");
        }

        [Authorize]
        [Route(nameof(DrugTest))]
        public ActionResult DrugTest()
        {
            return Ok("Works Yes");
        }
    }
}
