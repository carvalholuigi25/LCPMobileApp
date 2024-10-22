using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class PhasesRepo : ControllerBase, IPhasesRepo
{
    private readonly MDBContext _context;

    public PhasesRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Phase>>> GetPhases(QueryParams queryParams)
    {
        var query =  _context.Phases.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Phase>> GetPhase(int? id)
    {
        var phase = await _context.Phases.FindAsync(id);

        if (phase == null)
        {
            return NotFound();
        }

        return phase;
    }

    public async Task<ActionResult<Phase>> PostPhase(Phase phase)
    {
        if(!string.IsNullOrEmpty(phase.NamePhase) &&  _context.Phases.Where(x => x.NamePhase == phase.NamePhase).Count() == 1) {
            return BadRequest("The name of phase already exists!");
        }

        _context.Phases.Add(phase);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetPhase", new { id = phase.Id }, phase);
        return CreatedAtAction(nameof(GetPhase), new { id = phase.Phase_Id }, phase);
    }

    public async Task<IActionResult> PutPhase(int? id, Phase phase)
    {
        if (id != phase.Phase_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(phase.NamePhase) &&  _context.Phases.Where(x => x.NamePhase == phase.NamePhase).Count() == 1) {
            return BadRequest("The name of phase already exists!");
        }

        _context.Entry(phase).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!PhaseExists(id))
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

    public async Task<IActionResult> DeletePhase(int? id)
    {
        var phase = await _context.Phases.FindAsync(id);
        if (phase == null)
        {
            return NotFound();
        }

        _context.Phases.Remove(phase);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Phases.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool PhaseExists(int? id)
    {
        return _context.Phases.Any(e => e.Phase_Id == id);
    }

    private static IQueryable<Phase> GetFilterData(IQueryable<Phase> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "namephase" => query.Where(i => i.NamePhase.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Phase_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Phase> GetSortByData(IQueryable<Phase> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "namephase" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.NamePhase) : query.OrderBy(i => i.NamePhase),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Phase_Id) : query.OrderBy(i => i.Phase_Id),
            };
        }

        return query;
    }

    private static IQueryable<Phase> GetPaginationData(IQueryable<Phase> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}