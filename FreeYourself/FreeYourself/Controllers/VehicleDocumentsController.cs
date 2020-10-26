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
    public class VehicleDocumentsController : Controller
    {

        private readonly AppDbContext _ctx;

        public VehicleDocumentsController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IActionResult> GetAllVehicleDocuments()
        {
            var results = await _ctx.VehicleDocuments.ToListAsync();
            return Ok(results);
        }

        [Microsoft.AspNetCore.Mvc.Route("{id}")]
        public async Task<IActionResult> GetVehicleDocumentById(int id)
        {
            var vehicleDocument = await _ctx.VehicleDocuments.FirstOrDefaultAsync(vehicleDocument => vehicleDocument.Id == id);
            return Ok(vehicleDocument);
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicleDocument([FromBody] VehicleDocument vehicleDocument)
        {
            _ctx.VehicleDocuments.Add(vehicleDocument);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
