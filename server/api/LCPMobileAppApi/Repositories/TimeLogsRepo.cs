using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class TimeLogsRepo : ControllerBase, ITimeLogsRepo
{
    private readonly MDBContext _context;

    public TimeLogsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<TimeLog>>> GetTimeLogs(QueryParams queryParams)
    {
        var query =  _context.TimeLogs.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<TimeLog>> GetTimeLog(int? id)
    {
        var timelog = await _context.TimeLogs.FindAsync(id);

        if (timelog == null)
        {
            return NotFound();
        }

        return timelog;
    }

    public async Task<ActionResult<TimeLog>> PostTimeLog(TimeLog timelog)
    {
        _context.TimeLogs.Add(timelog);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetTimeLog", new { id = timelog.Id }, timelog);
        return CreatedAtAction(nameof(GetTimeLog), new { id = timelog.TimeLog_Id }, timelog);
    }

    public async Task<IActionResult> PutTimeLog(int? id, TimeLog timelog)
    {
        if (id != timelog.TimeLog_Id)
        {
            return BadRequest();
        }

        _context.Entry(timelog).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TimeLogExists(id))
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

    public async Task<IActionResult> DeleteTimeLog(int? id)
    {
        var timelog = await _context.TimeLogs.FindAsync(id);
        if (timelog == null)
        {
            return NotFound();
        }

        _context.TimeLogs.Remove(timelog);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.TimeLogs.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool TimeLogExists(int? id)
    {
        return _context.TimeLogs.Any(e => e.TimeLog_Id == id);
    }

    private static IQueryable<TimeLog> GetFilterData(IQueryable<TimeLog> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    _ => query.Where(i => i.TimeLog_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<TimeLog> GetSortByData(IQueryable<TimeLog> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.TimeLog_Id) : query.OrderBy(i => i.TimeLog_Id),
            };
        }

        return query;
    }

    private static IQueryable<TimeLog> GetPaginationData(IQueryable<TimeLog> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}