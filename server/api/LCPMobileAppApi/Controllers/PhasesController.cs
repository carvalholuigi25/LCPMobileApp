using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhasesController : ControllerBase
    {
        private readonly IPhasesRepo _phasesRepo;

        public PhasesController(IPhasesRepo phasesRepo)
        {
            _phasesRepo = phasesRepo;
        }

        /// <summary>
        /// Gets all phases infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all phases infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about phases</response>
        /// <response code="400">If the phases infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Phase>>> GetPhases([FromQuery] QueryParams queryParams)
        {
            var phases = await _phasesRepo.GetPhases(queryParams);
            var totalCount = await _phasesRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Phase> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = phases.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets phase info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets phase info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about phase</response>
        /// <response code="400">If the phase info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Phase>> GetPhase(int? id)
        {
            return await _phasesRepo.GetPhase(id);
        }
        
        /// <summary>
        /// Creates a phase.
        /// </summary>
        /// <param name="phase"></param>
        /// <returns>A newly created phase</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created phase info</response>
        /// <response code="400">If the phase info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Phase>> PostPhase(Phase phase)
        {
            return await _phasesRepo.PostPhase(phase);
        }

        /// <summary>
        /// Updates specific phase info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="phase"></param>
        /// <returns>Updates specific phase info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all phases infos updated by id and its body</response>
        /// <response code="400">If the phases infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutPhase(int? id, Phase phase)
        {
            return await _phasesRepo.PutPhase(id, phase);
        }

        /// <summary>
        /// Deletes specific phase info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific phase info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all phases infos are deleted by id</response>
        /// <response code="400">If the phases infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeletePhase(int? id)
        {
            return await _phasesRepo.DeletePhase(id);
        }
    }
}
