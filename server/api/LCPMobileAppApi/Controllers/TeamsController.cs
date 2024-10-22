using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TeamsController : ControllerBase
    {
        private readonly ITeamsRepo _teamsRepo;

        public TeamsController(ITeamsRepo teamsRepo)
        {
            _teamsRepo = teamsRepo;
        }

        /// <summary>
        /// Gets all teams infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all teams infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about teams</response>
        /// <response code="400">If the teams infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Team>>> GetTeams([FromQuery] QueryParams queryParams)
        {
            var teams = await _teamsRepo.GetTeams(queryParams);
            var totalCount = await _teamsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Team> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = teams.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets team info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets team info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about team</response>
        /// <response code="400">If the team info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Team>> GetTeam(int? id)
        {
            return await _teamsRepo.GetTeam(id);
        }
        
        /// <summary>
        /// Creates a team.
        /// </summary>
        /// <param name="team"></param>
        /// <returns>A newly created team</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created team info</response>
        /// <response code="400">If the team info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Team>> PostTeam(Team team)
        {
            return await _teamsRepo.PostTeam(team);
        }

        /// <summary>
        /// Updates specific team info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="team"></param>
        /// <returns>Updates specific team info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all teams infos updated by id and its body</response>
        /// <response code="400">If the teams infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutTeam(int? id, Team team)
        {
            return await _teamsRepo.PutTeam(id, team);
        }

        /// <summary>
        /// Deletes specific team info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific team info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all teams infos are deleted by id</response>
        /// <response code="400">If the teams infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteTeam(int? id)
        {
            return await _teamsRepo.DeleteTeam(id);
        }
    }
}
