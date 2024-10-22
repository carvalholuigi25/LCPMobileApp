using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeLogsController : ControllerBase
    {
        private readonly ITimeLogsRepo _timelogsRepo;

        public TimeLogsController(ITimeLogsRepo timelogsRepo)
        {
            _timelogsRepo = timelogsRepo;
        }

        /// <summary>
        /// Gets all timelogs infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all timelogs infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about timelogs</response>
        /// <response code="400">If the timelogs infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<TimeLog>>> GetTimeLogs([FromQuery] QueryParams queryParams)
        {
            var timelogs = await _timelogsRepo.GetTimeLogs(queryParams);
            var totalCount = await _timelogsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<TimeLog> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = timelogs.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets timelogs info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets timelogs info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about timelogs</response>
        /// <response code="400">If the timelogs info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TimeLog>> GetTimeLogs(int? id)
        {
            return await _timelogsRepo.GetTimeLog(id);
        }
        
        /// <summary>
        /// Creates a timelogs.
        /// </summary>
        /// <param name="timelogs"></param>
        /// <returns>A newly created timelogs</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created timelogs info</response>
        /// <response code="400">If the timelogs info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<TimeLog>> PostTimeLogs(TimeLog timelogs)
        {
            return await _timelogsRepo.PostTimeLog(timelogs);
        }

        /// <summary>
        /// Updates specific timelogs info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="timelogs"></param>
        /// <returns>Updates specific timelogs info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all timelogs infos updated by id and its body</response>
        /// <response code="400">If the timelogs infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutTimeLogs(int? id, TimeLog timelogs)
        {
            return await _timelogsRepo.PutTimeLog(id, timelogs);
        }

        /// <summary>
        /// Deletes specific timelogs info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific timelogs info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all timelogs infos are deleted by id</response>
        /// <response code="400">If the timelogs infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteTimeLogs(int? id)
        {
            return await _timelogsRepo.DeleteTimeLog(id);
        }
    }
}
