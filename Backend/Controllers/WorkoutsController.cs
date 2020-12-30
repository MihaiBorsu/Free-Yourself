using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using System.IdentityModel.Tokens.Jwt;
using WebApi.Helpers;
using Microsoft.Extensions.Options;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using WebApi.Services;
using WebApi.Entities;
using WebApi.Models.Workouts;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class WorkoutsController : ControllerBase
    {
        private IWorkoutService _workoutService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public WorkoutsController(
            IWorkoutService workoutService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _workoutService = workoutService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var workout = _mapper.Map<Workout>(model);
            workout.Date = DateTime.Today;

            try
            {
                // create workout
                _workoutService.Create(workout);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var workouts = _workoutService.GetAll();
            var model = _mapper.Map<IList<UpdateModel>>(workouts);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var workout = _workoutService.GetById(id);
            var model = _mapper.Map<UpdateModel>(workout);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var workout = _mapper.Map<Workout>(model);
            workout.Id = id;

            try
            {
                // update workout
                _workoutService.Update(workout);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _workoutService.Delete(id);
            return Ok();
        }

        [HttpGet("dashboard")]
        public IActionResult GetDashboard([FromBody]DashboardModel model)
        {
            model.DailyXp = _workoutService.GetTotalUserXPInOneDay(DateTime.Today, model.userId);
            model.WeeklyXp = _workoutService.GetTotalUserXPInLast7Days(DateTime.Today, model.userId);
            model.MonthlyXp = _workoutService.GetTotalUserXpInLastMounth(DateTime.Today, model.userId);
            model.YearlyXp = _workoutService.GetTotalUserXPInOneDay(DateTime.Today, model.userId);
            model.SevenDaysXp = _workoutService.GetUserXpInEachLast7Days(DateTime.Today, model.userId);
            model.TwelveMonthsXp = _workoutService.GetUserXpInEachLast12Months(DateTime.Today, model.userId);

            // var workout = _mapper.Map<Workout>(model);

            return Ok(model);
        }
    }
}
