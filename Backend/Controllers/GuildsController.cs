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
using WebApi.Models.Guilds;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class GuildsController : ControllerBase
    {
        private IGuildService _guildService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public GuildsController(
            IGuildService guildService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _guildService = guildService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var guild = _mapper.Map<Guild>(model);

            try
            {
                // create guild
                _guildService.Create(guild);
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
            var guilds = _guildService.GetAll();
            var model = _mapper.Map<IList<UpdateModel>>(guilds);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var guild = _guildService.GetById(id);
            var model = _mapper.Map<UpdateModel>(guild);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var guild = _mapper.Map<Guild>(model);
            guild.Id = id;

            try
            {
                // update guild
                _guildService.Update(guild);
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
            _guildService.Delete(id);
            return Ok();
        }
    }
}
