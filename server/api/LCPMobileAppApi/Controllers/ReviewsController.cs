using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly IReviewsRepo _reviewsRepo;

        public ReviewsController(IReviewsRepo reviewsRepo)
        {
            _reviewsRepo = reviewsRepo;
        }

        /// <summary>
        /// Gets all reviews infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all reviews infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about reviews</response>
        /// <response code="400">If the reviews infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Review>>> GetReviews([FromQuery] QueryParams queryParams)
        {
            var reviews = await _reviewsRepo.GetReviews(queryParams);
            var totalCount = await _reviewsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Review> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = reviews.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets review info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets review info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about review</response>
        /// <response code="400">If the review info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Review>> GetReview(int? id)
        {
            return await _reviewsRepo.GetReview(id);
        }
        
        /// <summary>
        /// Creates a review.
        /// </summary>
        /// <param name="review"></param>
        /// <returns>A newly created review</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created review info</response>
        /// <response code="400">If the review info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Review>> PostReview(Review review)
        {
            return await _reviewsRepo.PostReview(review);
        }

        /// <summary>
        /// Updates specific review info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="review"></param>
        /// <returns>Updates specific review info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all reviews infos updated by id and its body</response>
        /// <response code="400">If the reviews infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutReview(int? id, Review review)
        {
            return await _reviewsRepo.PutReview(id, review);
        }

        /// <summary>
        /// Deletes specific review info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific review info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all reviews infos are deleted by id</response>
        /// <response code="400">If the reviews infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteReview(int? id)
        {
            return await _reviewsRepo.DeleteReview(id);
        }
    }
}
