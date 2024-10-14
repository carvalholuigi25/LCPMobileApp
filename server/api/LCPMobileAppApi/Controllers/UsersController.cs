using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepo _usersRepo;

        public UsersController(IUsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        // GET: api/Users
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers([FromQuery] QueryParams queryParams)
        {
            var users = await _usersRepo.GetUsers(queryParams);
            var totalCount = await _usersRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<User> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = users.Value!.ToList()
            };

            return Ok(response);
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<User>> GetUser(int? id)
        {
            return await _usersRepo.GetUser(id);
        }
        
        /// <summary>
        /// Creates a User.
        /// </summary>
        /// <param name="user"></param>
        /// <returns>A newly created User</returns>
        /// <remarks>
        /// Sample request:
        ///
        ///     POST /api/Users
        ///     {
        ///         "id": 1,
        ///         "username": "yourusername",
        ///         "password": "yourpassword"
        ///     }
        ///
        /// </remarks>
        /// <response code="201">Returns the newly created user</response>
        /// <response code="400">If the user is null</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            return await _usersRepo.PostUser(user);
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> PutUser(int? id, User user)
        {
            return await _usersRepo.PutUser(id, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteUser(int? id)
        {
            return await _usersRepo.DeleteUser(id);
        }
    }
}
