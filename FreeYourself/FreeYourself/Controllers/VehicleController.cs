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
    public class VehicleController : Controller
    {

        private readonly AppDbContext _ctx;

        public VehicleController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IActionResult> GetAllVehicles()
        {
            var results = await _ctx.Vehicles.ToListAsync();
            return Ok(results);
        }

        [Microsoft.AspNetCore.Mvc.Route("{id}")]
        public async Task<IActionResult> GetVehicleById(int id)
        {
            var vehicle = await _ctx.Vehicles.FirstOrDefaultAsync(vehicle => vehicle.Id == id);
            return Ok(vehicle);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] Vehicle Vehicle)
        {
            _ctx.Vehicles.Add(Vehicle);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
