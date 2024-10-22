using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoicesController : ControllerBase
    {
        private readonly IInvoicesRepo _invoicesRepo;

        public InvoicesController(IInvoicesRepo invoicesRepo)
        {
            _invoicesRepo = invoicesRepo;
        }

        /// <summary>
        /// Gets all invoices infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all invoices infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about invoices</response>
        /// <response code="400">If the invoices infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices([FromQuery] QueryParams queryParams)
        {
            var invoices = await _invoicesRepo.GetInvoices(queryParams);
            var totalCount = await _invoicesRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Invoice> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = invoices.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets invoice info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets invoice info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about invoice</response>
        /// <response code="400">If the invoice info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Invoice>> GetInvoice(int? id)
        {
            return await _invoicesRepo.GetInvoice(id);
        }
        
        /// <summary>
        /// Creates a invoice.
        /// </summary>
        /// <param name="invoice"></param>
        /// <returns>A newly created invoice</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created invoice info</response>
        /// <response code="400">If the invoice info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
        {
            return await _invoicesRepo.PostInvoice(invoice);
        }

        /// <summary>
        /// Updates specific invoice info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="invoice"></param>
        /// <returns>Updates specific invoice info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all invoices infos updated by id and its body</response>
        /// <response code="400">If the invoices infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutInvoice(int? id, Invoice invoice)
        {
            return await _invoicesRepo.PutInvoice(id, invoice);
        }

        /// <summary>
        /// Deletes specific invoice info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific invoice info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all invoices infos are deleted by id</response>
        /// <response code="400">If the invoices infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteInvoice(int? id)
        {
            return await _invoicesRepo.DeleteInvoice(id);
        }
    }
}
