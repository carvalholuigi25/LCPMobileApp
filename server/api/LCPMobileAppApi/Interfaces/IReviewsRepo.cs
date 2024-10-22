using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IReviewsRepo {
    Task<ActionResult<IEnumerable<Review>>> GetReviews(QueryParams queryParams);  
    Task<ActionResult<Review>> GetReview(int? id); 
    Task<ActionResult<Review>> PostReview(Review review);
    Task<IActionResult> PutReview(int? id, Review review);
    Task<IActionResult> DeleteReview(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}