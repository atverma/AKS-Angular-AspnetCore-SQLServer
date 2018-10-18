using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace SampleWebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;
        private IOptions<AppConfiguration> _appSettings;

        public UsersController(IOptions<AppConfiguration> appSettings, UserContext context)
        {
            _appSettings = appSettings;
            _context = context;
        }

        // GET api/values
        [HttpGet]
        public async Task<ActionResult<IEnumerable<string>>> Get()
        {
            using (_context)
            {
                return (await _context.Users.ToListAsync<User>()).Select(u => u.UserName).ToList();
            }
        }
    }
}
