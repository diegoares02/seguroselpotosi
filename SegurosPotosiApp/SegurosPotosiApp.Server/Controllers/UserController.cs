using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;
using Newtonsoft.Json.Linq;

namespace SegurosPotosiApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUser _user;
        public UserController(IUser user, SegurosPotosiContext context)
        {
            _user = user;
            _user.SetContext(context);
            DataSeed.Seed(context);
        }
        [HttpGet]
        [Authorize]
        public string Index()
        {
            return JsonSerializer.Serialize(_user.GetUsers());
        }
        [HttpPost("/user/login")]
        public string Login([FromBody] User user)
        {
            if (_user.Login(user))
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("segurospotosi123456Test"));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken("segurospotosi123456Test",
                  "segurospotosi123456Test",
                  null,
                  expires: DateTime.Now.AddMinutes(180),
                  signingCredentials: credentials);
                var userSucessResponse = new
                {
                    user = user.Email,
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                };
                return JsonSerializer.Serialize(userSucessResponse);
            };
            var userFailResponse = new
            {
                user = user.Email,
                token = "User login failed"
            };
            return JsonSerializer.Serialize(userFailResponse);
        }
        [HttpPost]
        public string Create(User user)
        {
            return _user.Add(user) ? "User created successfully" : "An error ocurred during the user creation";
        }
        [HttpPut]
        public string Update(User user)
        {
            return _user.Update(user) ? "User updated successfully" : "An error ocurred during the user update";
        }
        [HttpDelete]
        public string Delete(string email)
        {
            return _user.Delete(email) ? "User deleted successfully" : "An error ocurred during the user delete";
        }
    }
}
