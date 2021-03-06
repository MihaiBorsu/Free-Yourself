﻿using System;
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
using WebApi.Models.Users;

namespace WebApi.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(model.Username, model.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info and authentication token
            return Ok(new
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
                Country = user.Country,
                City = user.City,
                PhoneNumber = user.PhoneNumber,
                Description = user.Description,
                // FirstName = user.FirstName,
                // LastName = user.LastName,
                Token = tokenString
            });
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody]RegisterModel model)
        {
            // map model to entity
            var user = _mapper.Map<User>(model);

            var userToAuthenticate = new AuthenticateModel();
            userToAuthenticate.Username = model.Username;
            userToAuthenticate.Password = model.Password;

            try
            {
                // create user
                _userService.Create(user, model.Password);
                // return Ok();
                return Authenticate(userToAuthenticate);
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
            var users = _userService.GetAll();
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var model = _mapper.Map<UserModel>(user);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UpdateModel model)
        {
            // map model to entity and set id
            var user = _mapper.Map<User>(model);
            var user_old = _mapper.Map<User>(model);
            user.Id = id;

            try
            {
                // update old_guild reffrence with guild id fron db
                user_old.GuildId = _userService.getUserGuildIdFromDB(user);
                Console.WriteLine("OLD GUILD ID IS " + user_old.GuildId);

                // update user
                _userService.Update(user, model.Password);

                // update new and old guild with total xp
                // check if user has guild first
                if (user.GuildId != null)
                    _userService.UpdateGuildWithTotalXP(user);

                if (user_old.GuildId != null)
                    _userService.UpdateGuildWithTotalXP(user_old);
                else
                    Console.WriteLine("old guild total xp not updated");

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
            _userService.Delete(id);
            return Ok();
        }

        [HttpGet("in_guild/{guildId}")]
        public IActionResult GetUsersFromGuild(int guildId)
        {
            var users = _userService.GetUsersFromGuild(guildId);
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }

        [HttpGet("ranking")]
        public IActionResult GetuserRanking()
        {
            var users = _userService.GetuserRanking();
            var model = _mapper.Map<IList<UserModel>>(users);
            return Ok(model);
        }
    }
}
