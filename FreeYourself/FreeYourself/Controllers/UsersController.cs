using FreeYourself.DataAccessLayer;
using FreeYourself.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FreeYourself.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly AppDbContext _ctx;

        public UsersController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IActionResult> GetAllUsers()
        {
            var results = await _ctx.Users.ToListAsync();
            return Ok(results);
        }

        [Microsoft.AspNetCore.Mvc.Route("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _ctx.Users.FirstOrDefaultAsync(user => user.Id == id);
            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            _ctx.Users.Add(user);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
