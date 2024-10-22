using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MilestonesController : ControllerBase
    {
        private readonly IMilestonesRepo _milestonesRepo;

        public MilestonesController(IMilestonesRepo milestonesRepo)
        {
            _milestonesRepo = milestonesRepo;
        }

        /// <summary>
        /// Gets all milestones infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all milestones infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about milestones</response>
        /// <response code="400">If the milestones infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Milestone>>> GetMilestones([FromQuery] QueryParams queryParams)
        {
            var milestones = await _milestonesRepo.GetMilestones(queryParams);
            var totalCount = await _milestonesRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Milestone> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = milestones.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets milestone info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets milestone info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about milestone</response>
        /// <response code="400">If the milestone info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Milestone>> GetMilestone(int? id)
        {
            return await _milestonesRepo.GetMilestone(id);
        }
        
        /// <summary>
        /// Creates a milestone.
        /// </summary>
        /// <param name="milestone"></param>
        /// <returns>A newly created milestone</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created milestone info</response>
        /// <response code="400">If the milestone info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Milestone>> PostMilestone(Milestone milestone)
        {
            return await _milestonesRepo.PostMilestone(milestone);
        }

        /// <summary>
        /// Updates specific milestone info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="milestone"></param>
        /// <returns>Updates specific milestone info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all milestones infos updated by id and its body</response>
        /// <response code="400">If the milestones infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutMilestone(int? id, Milestone milestone)
        {
            return await _milestonesRepo.PutMilestone(id, milestone);
        }

        /// <summary>
        /// Deletes specific milestone info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific milestone info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all milestones infos are deleted by id</response>
        /// <response code="400">If the milestones infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteMilestone(int? id)
        {
            return await _milestonesRepo.DeleteMilestone(id);
        }
    }
}
