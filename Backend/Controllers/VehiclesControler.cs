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
// using WebApi.Models.Users;
// using WebApi.Models.Guilds;
using WebApi.Models.Vehicles;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class VehiclesController : ControllerBase
    {
        private IVehicleService _vehicleService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public VehiclesController(
            IVehicleService vehicleService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _vehicleService = vehicleService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }


        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var vehicle = _mapper.Map<Vehicle>(model);

            try
            {
                // create vehicle
                _vehicleService.Create(vehicle);
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
            var vehicles = _vehicleService.GetAll();
            var model = _mapper.Map<IList<UpdateModel>>(vehicles);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var vehicle = _vehicleService.GetById(id);
            var model = _mapper.Map<UpdateModel>(vehicle);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var vehicle = _mapper.Map<Vehicle>(model);
            vehicle.Id = id;

            try
            {
                // update vehicle
                _vehicleService.Update(vehicle);
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
            _vehicleService.Delete(id);
            return Ok();
        }
    }
}
