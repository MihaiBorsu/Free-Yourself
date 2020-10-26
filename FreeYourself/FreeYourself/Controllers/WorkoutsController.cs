using FreeYourself.DataAccessLayer;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FreeYourself.DataAccessLayer;
using FreeYourself.Models;
using Microsoft.EntityFrameworkCore;

namespace FreeYourself.Controllers
{
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class WorkoutsController: Controller
    {
        private readonly AppDbContext _ctx;

        public WorkoutsController(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IActionResult> GetAllWorkouts()
        {
            var results = await _ctx.Workouts.ToListAsync();
            return Ok(results);
        }

        [Microsoft.AspNetCore.Mvc.Route("{id}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var book = await _ctx.Workouts.FirstOrDefaultAsync(workout => workout.Id == id);
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> CreateWorkout([FromBody] Workout workout)
        {
            _ctx.Workouts.Add(workout);
            await _ctx.SaveChangesAsync();
            return Ok();
        }
    }
}
