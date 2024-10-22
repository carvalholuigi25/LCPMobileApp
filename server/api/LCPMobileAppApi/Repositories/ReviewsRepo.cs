using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class ReviewsRepo : ControllerBase, IReviewsRepo
{
    private readonly MDBContext _context;

    public ReviewsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Review>>> GetReviews(QueryParams queryParams)
    {
        var query =  _context.Reviews.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Review>> GetReview(int? id)
    {
        var review = await _context.Reviews.FindAsync(id);

        if (review == null)
        {
            return NotFound();
        }

        return review;
    }

    public async Task<ActionResult<Review>> PostReview(Review review)
    {
        if(!string.IsNullOrEmpty(review.Review_Title) &&  _context.Reviews.Where(x => x.Review_Title == review.Review_Title).Count() == 1) {
            return BadRequest("The name of review already exists!");
        }

        _context.Reviews.Add(review);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetReview", new { id = review.Id }, review);
        return CreatedAtAction(nameof(GetReview), new { id = review.Review_Id }, review);
    }

    public async Task<IActionResult> PutReview(int? id, Review review)
    {
        if (id != review.Review_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(review.Review_Title) &&  _context.Reviews.Where(x => x.Review_Title == review.Review_Title).Count() == 1) {
            return BadRequest("The name of review already exists!");
        }

        _context.Entry(review).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ReviewExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    public async Task<IActionResult> DeleteReview(int? id)
    {
        var review = await _context.Reviews.FindAsync(id);
        if (review == null)
        {
            return NotFound();
        }

        _context.Reviews.Remove(review);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Reviews.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool ReviewExists(int? id)
    {
        return _context.Reviews.Any(e => e.Review_Id == id);
    }

    private static IQueryable<Review> GetFilterData(IQueryable<Review> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "reviewTitle" => query.Where(i => i.Review_Title.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Review_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Review> GetSortByData(IQueryable<Review> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "reviewTitle" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Review_Title) : query.OrderBy(i => i.Review_Title),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Review_Id) : query.OrderBy(i => i.Review_Id),
            };
        }

        return query;
    }

    private static IQueryable<Review> GetPaginationData(IQueryable<Review> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}