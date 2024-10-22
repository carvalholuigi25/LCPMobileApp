using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly IPaymentsRepo _paymentsRepo;

        public PaymentsController(IPaymentsRepo paymentsRepo)
        {
            _paymentsRepo = paymentsRepo;
        }

        /// <summary>
        /// Gets all payments infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all payments infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about payments</response>
        /// <response code="400">If the payments infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments([FromQuery] QueryParams queryParams)
        {
            var payments = await _paymentsRepo.GetPayments(queryParams);
            var totalCount = await _paymentsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Payment> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = payments.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets payment info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets payment info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about payment</response>
        /// <response code="400">If the payment info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> GetPayment(int? id)
        {
            return await _paymentsRepo.GetPayment(id);
        }
        
        /// <summary>
        /// Creates a payment.
        /// </summary>
        /// <param name="payment"></param>
        /// <returns>A newly created payment</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created payment info</response>
        /// <response code="400">If the payment info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            return await _paymentsRepo.PostPayment(payment);
        }

        /// <summary>
        /// Updates specific payment info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="payment"></param>
        /// <returns>Updates specific payment info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all payments infos updated by id and its body</response>
        /// <response code="400">If the payments infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutPayment(int? id, Payment payment)
        {
            return await _paymentsRepo.PutPayment(id, payment);
        }

        /// <summary>
        /// Deletes specific payment info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific payment info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all payments infos are deleted by id</response>
        /// <response code="400">If the payments infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeletePayment(int? id)
        {
            return await _paymentsRepo.DeletePayment(id);
        }
    }
}
