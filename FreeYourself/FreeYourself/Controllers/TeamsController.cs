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
    public class TeamsController : Controller
    {
        private readonly AppDbContext _ctx;

        public TeamsController(AppDbContext ctx) 
        {
            _ctx = ctx;
        }

        public async Task<IActionResult> GetAllTeams()
        {
            var results = await _ctx.Teams.ToListAsync();
            return Ok(results);
        }

        [Microsoft.AspNetCore.Mvc.Route("{id}")]
        public async Task<IActionResult> GetTeamById(int id)
        {
            var team = await _ctx.Teams.FirstOrDefaultAsync(team => team.Id == id);
            return Ok(team);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTeam([FromBody] Team team)
        {
            _ctx.Teams.Add(team);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
