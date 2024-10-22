using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TechnologiesController : ControllerBase
    {
        private readonly ITechnologiesRepo _technologiesRepo;

        public TechnologiesController(ITechnologiesRepo technologiesRepo)
        {
            _technologiesRepo = technologiesRepo;
        }

        /// <summary>
        /// Gets all technologies infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all technologies infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about technologies</response>
        /// <response code="400">If the technologies infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Technology>>> GetTechnologies([FromQuery] QueryParams queryParams)
        {
            var technologies = await _technologiesRepo.GetTechnologies(queryParams);
            var totalCount = await _technologiesRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Technology> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = technologies.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets technology info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets technology info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about technology</response>
        /// <response code="400">If the technology info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Technology>> GetTechnology(int? id)
        {
            return await _technologiesRepo.GetTechnology(id);
        }
        
        /// <summary>
        /// Creates a technology.
        /// </summary>
        /// <param name="technology"></param>
        /// <returns>A newly created technology</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created technology info</response>
        /// <response code="400">If the technology info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Technology>> PostTechnology(Technology technology)
        {
            return await _technologiesRepo.PostTechnology(technology);
        }

        /// <summary>
        /// Updates specific technology info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="technology"></param>
        /// <returns>Updates specific technology info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all technologies infos updated by id and its body</response>
        /// <response code="400">If the technologies infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutTechnology(int? id, Technology technology)
        {
            return await _technologiesRepo.PutTechnology(id, technology);
        }

        /// <summary>
        /// Deletes specific technology info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific technology info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all technologies infos are deleted by id</response>
        /// <response code="400">If the technologies infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteTechnology(int? id)
        {
            return await _technologiesRepo.DeleteTechnology(id);
        }
    }
}
