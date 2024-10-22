using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class StatusRepo : ControllerBase, IStatusRepo
{
    private readonly MDBContext _context;

    public StatusRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Status>>> GetStatus(QueryParams queryParams)
    {
        var query =  _context.Status.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Status>> GetStatusById(int? id)
    {
        var status = await _context.Status.FindAsync(id);

        if (status == null)
        {
            return NotFound();
        }

        return status;
    }

    public async Task<ActionResult<Status>> PostStatus(Status status)
    {
        _context.Status.Add(status);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetStatusById", new { id = status.Id }, status);
        return CreatedAtAction(nameof(GetStatusById), new { id = status.Status_Id }, status);
    }

    public async Task<IActionResult> PutStatus(int? id, Status status)
    {
        if (id != status.Status_Id)
        {
            return BadRequest();
        }

        _context.Entry(status).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!StatusExists(id))
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

    public async Task<IActionResult> DeleteStatus(int? id)
    {
        var status = await _context.Status.FindAsync(id);
        if (status == null)
        {
            return NotFound();
        }

        _context.Status.Remove(status);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Status.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool StatusExists(int? id)
    {
        return _context.Status.Any(e => e.Status_Id == id);
    }

    private static IQueryable<Status> GetFilterData(IQueryable<Status> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    _ => query.Where(i => i.Status_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Status> GetSortByData(IQueryable<Status> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Status_Id) : query.OrderBy(i => i.Status_Id),
            };
        }

        return query;
    }

    private static IQueryable<Status> GetPaginationData(IQueryable<Status> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}