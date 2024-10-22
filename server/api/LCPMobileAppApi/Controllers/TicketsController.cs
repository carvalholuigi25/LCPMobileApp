using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly ITicketsRepo _ticketsRepo;

        public TicketsController(ITicketsRepo ticketsRepo)
        {
            _ticketsRepo = ticketsRepo;
        }

        /// <summary>
        /// Gets all tickets infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all tickets infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about tickets</response>
        /// <response code="400">If the tickets infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets([FromQuery] QueryParams queryParams)
        {
            var tickets = await _ticketsRepo.GetTickets(queryParams);
            var totalCount = await _ticketsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Ticket> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = tickets.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets ticket info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets ticket info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about ticket</response>
        /// <response code="400">If the ticket info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Ticket>> GetTicket(int? id)
        {
            return await _ticketsRepo.GetTicket(id);
        }
        
        /// <summary>
        /// Creates a ticket.
        /// </summary>
        /// <param name="ticket"></param>
        /// <returns>A newly created ticket</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created ticket info</response>
        /// <response code="400">If the ticket info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
        {
            return await _ticketsRepo.PostTicket(ticket);
        }

        /// <summary>
        /// Updates specific ticket info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="ticket"></param>
        /// <returns>Updates specific ticket info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all tickets infos updated by id and its body</response>
        /// <response code="400">If the tickets infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutTicket(int? id, Ticket ticket)
        {
            return await _ticketsRepo.PutTicket(id, ticket);
        }

        /// <summary>
        /// Deletes specific ticket info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific ticket info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all tickets infos are deleted by id</response>
        /// <response code="400">If the tickets infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteTicket(int? id)
        {
            return await _ticketsRepo.DeleteTicket(id);
        }
    }
}
