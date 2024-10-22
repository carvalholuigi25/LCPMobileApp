using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class MilestonesRepo : ControllerBase, IMilestonesRepo
{
    private readonly MDBContext _context;

    public MilestonesRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Milestone>>> GetMilestones(QueryParams queryParams)
    {
        var query =  _context.Milestones.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Milestone>> GetMilestone(int? id)
    {
        var milestone = await _context.Milestones.FindAsync(id);

        if (milestone == null)
        {
            return NotFound();
        }

        return milestone;
    }

    public async Task<ActionResult<Milestone>> PostMilestone(Milestone milestone)
    {
        if(!string.IsNullOrEmpty(milestone.Milestone_Name) &&  _context.Milestones.Where(x => x.Milestone_Name == milestone.Milestone_Name).Count() == 1) {
            return BadRequest("The name of milestone already exists!");
        }

        _context.Milestones.Add(milestone);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetMilestone", new { id = milestone.Id }, milestone);
        return CreatedAtAction(nameof(GetMilestone), new { id = milestone.Milestone_Id }, milestone);
    }

    public async Task<IActionResult> PutMilestone(int? id, Milestone milestone)
    {
        if (id != milestone.Milestone_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(milestone.Milestone_Name) &&  _context.Milestones.Where(x => x.Milestone_Name == milestone.Milestone_Name).Count() == 1) {
            return BadRequest("The name of milestone already exists!");
        }

        _context.Entry(milestone).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!MilestoneExists(id))
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

    public async Task<IActionResult> DeleteMilestone(int? id)
    {
        var milestone = await _context.Milestones.FindAsync(id);
        if (milestone == null)
        {
            return NotFound();
        }

        _context.Milestones.Remove(milestone);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Milestones.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool MilestoneExists(int? id)
    {
        return _context.Milestones.Any(e => e.Milestone_Id == id);
    }

    private static IQueryable<Milestone> GetFilterData(IQueryable<Milestone> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "nameMilestone" => query.Where(i => i.Milestone_Name.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Milestone_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Milestone> GetSortByData(IQueryable<Milestone> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "nameMilestone" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Milestone_Name) : query.OrderBy(i => i.Milestone_Name),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Milestone_Id) : query.OrderBy(i => i.Milestone_Id),
            };
        }

        return query;
    }

    private static IQueryable<Milestone> GetPaginationData(IQueryable<Milestone> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}