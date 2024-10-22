using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrdersRepo _ordersRepo;

        public OrdersController(IOrdersRepo ordersRepo)
        {
            _ordersRepo = ordersRepo;
        }

        /// <summary>
        /// Gets all orders infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all orders infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about orders</response>
        /// <response code="400">If the orders infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders([FromQuery] QueryParams queryParams)
        {
            var orders = await _ordersRepo.GetOrders(queryParams);
            var totalCount = await _ordersRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Order> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = orders.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets order info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets order info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about order</response>
        /// <response code="400">If the order info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Order>> GetOrder(int? id)
        {
            return await _ordersRepo.GetOrder(id);
        }
        
        /// <summary>
        /// Creates a order.
        /// </summary>
        /// <param name="order"></param>
        /// <returns>A newly created order</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created order info</response>
        /// <response code="400">If the order info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            return await _ordersRepo.PostOrder(order);
        }

        /// <summary>
        /// Updates specific order info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="order"></param>
        /// <returns>Updates specific order info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all orders infos updated by id and its body</response>
        /// <response code="400">If the orders infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutOrder(int? id, Order order)
        {
            return await _ordersRepo.PutOrder(id, order);
        }

        /// <summary>
        /// Deletes specific order info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific order info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all orders infos are deleted by id</response>
        /// <response code="400">If the orders infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteOrder(int? id)
        {
            return await _ordersRepo.DeleteOrder(id);
        }
    }
}
