using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IStatusRepo _statusRepo;

        public StatusController(IStatusRepo statusRepo)
        {
            _statusRepo = statusRepo;
        }

        /// <summary>
        /// Gets all status infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all status infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about status</response>
        /// <response code="400">If the status infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Status>>> GetStatus([FromQuery] QueryParams queryParams)
        {
            var status = await _statusRepo.GetStatus(queryParams);
            var totalCount = await _statusRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Status> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = status.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets status info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets status info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about status</response>
        /// <response code="400">If the status info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Status>> GetStatusById(int? id)
        {
            return await _statusRepo.GetStatusById(id);
        }
        
        /// <summary>
        /// Creates a status.
        /// </summary>
        /// <param name="status"></param>
        /// <returns>A newly created status</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created status info</response>
        /// <response code="400">If the status info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Status>> PostStatus(Status status)
        {
            return await _statusRepo.PostStatus(status);
        }

        /// <summary>
        /// Updates specific status info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns>Updates specific status info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all status infos updated by id and its body</response>
        /// <response code="400">If the status infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutStatus(int? id, Status status)
        {
            return await _statusRepo.PutStatus(id, status);
        }

        /// <summary>
        /// Deletes specific status info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific status info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all status infos are deleted by id</response>
        /// <response code="400">If the status infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteStatus(int? id)
        {
            return await _statusRepo.DeleteStatus(id);
        }
    }
}
