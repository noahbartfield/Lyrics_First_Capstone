using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Capstone.Interfaces;
using Capstone.Models.ViewModels;
using Capstone.Routes.V1;
using Capstone.Helpers;
using System.Collections.Generic;
using Capstone.Data;
using System.Linq;

namespace Capstone.Controllers.V1
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userSerice;
        private readonly ApplicationDbContext _context;


        public UserController(IUserService userService, ApplicationDbContext context)
        {
            _userSerice = userService;
            _context = context;
        }

        [HttpGet(Api.User.GetUsers)]
        public List<ApplicationUserSearchViewModel> GetUsers(string q)
        {
            var searchedUsers = _context.ApplicationUsers.Select(u => new { u.Id, u.UserName }).Where(u => u.UserName.Contains(q)).OrderBy(u => u.UserName).ToList();
            List<ApplicationUserSearchViewModel> listOfUsers = new List<ApplicationUserSearchViewModel>();
            foreach (var au in searchedUsers)
            {
                ApplicationUserSearchViewModel newAU = new ApplicationUserSearchViewModel
                {
                    Id = au.Id,
                    Username = au.UserName
                };
                listOfUsers.Add(newAU);
            }
            
            return listOfUsers;
        }

        [HttpGet(Api.User.GetUser)]
        public ApplicationUserSearchViewModel GetUser(string Id)
        {
            var user = _context.ApplicationUsers.Select(u => new { u.Id, u.UserName }).Where(u => u.Id == Id).ToList();
            List<ApplicationUserSearchViewModel> listOfOneUser = new List<ApplicationUserSearchViewModel>();
            foreach (var au in user)
            {
                ApplicationUserSearchViewModel newAU = new ApplicationUserSearchViewModel
                {
                    Id = au.Id,
                    Username = au.UserName
                };
                listOfOneUser.Add(newAU);
            }
            
            return listOfOneUser[0];
        }

        [HttpPost(Api.User.Register)]
        public async Task<IActionResult> Register([FromBody] UserRegistrationViewModel user)
        {
            var authResponse = await _userSerice.RegisterUserAsync(user);

            if (!authResponse.Success)
                return BadRequest(authResponse);
            
            return Ok(authResponse);
        }

        [HttpPost(Api.User.Login)]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel user)
        {
            var authResponse = await _userSerice.LoginAsync(
                user.Email,
                user.Password);

            if (!authResponse.Success)
                return BadRequest(authResponse);

            return Ok(authResponse);
        }

        [HttpPost(Api.User.Refresh)]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestViewModel refresh)
        {
            var authResponse = await _userSerice.RefreshTokenAsync(
                refresh.Token,
                refresh.RefreshToken);

            if (!authResponse.Success)
                return BadRequest(authResponse);

            return Ok(authResponse);
        }
    }
}