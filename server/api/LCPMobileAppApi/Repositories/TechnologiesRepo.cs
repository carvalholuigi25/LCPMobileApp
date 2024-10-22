using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class TechnologiesRepo : ControllerBase, ITechnologiesRepo
{
    private readonly MDBContext _context;

    public TechnologiesRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Technology>>> GetTechnologies(QueryParams queryParams)
    {
        var query =  _context.Technologies.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Technology>> GetTechnology(int? id)
    {
        var technology = await _context.Technologies.FindAsync(id);

        if (technology == null)
        {
            return NotFound();
        }

        return technology;
    }

    public async Task<ActionResult<Technology>> PostTechnology(Technology technology)
    {
        if(!string.IsNullOrEmpty(technology.NameTechnology!.Value.ToString()) &&  _context.Technologies.Where(x => x.NameTechnology == technology.NameTechnology).Count() == 1) {
            return BadRequest("The name of technology already exists!");
        }

        _context.Technologies.Add(technology);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetTechnology", new { id = technology.Id }, technology);
        return CreatedAtAction(nameof(GetTechnology), new { id = technology.Technology_Id }, technology);
    }

    public async Task<IActionResult> PutTechnology(int? id, Technology technology)
    {
        if (id != technology.Technology_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(technology.NameTechnology!.Value.ToString()) &&  _context.Technologies.Where(x => x.NameTechnology == technology.NameTechnology).Count() == 1) {
            return BadRequest("The name of technology already exists!");
        }

        _context.Entry(technology).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TechnologyExists(id))
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

    public async Task<IActionResult> DeleteTechnology(int? id)
    {
        var technology = await _context.Technologies.FindAsync(id);
        if (technology == null)
        {
            return NotFound();
        }

        _context.Technologies.Remove(technology);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Technologies.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool TechnologyExists(int? id)
    {
        return _context.Technologies.Any(e => e.Technology_Id == id);
    }

    private static IQueryable<Technology> GetFilterData(IQueryable<Technology> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "nameTechnology" => query.Where(i => i.NameTechnology!.Value.ToString().Contains(queryParams.Search)),
                    _ => query.Where(i => i.Technology_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Technology> GetSortByData(IQueryable<Technology> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "nameTechnology" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.NameTechnology) : query.OrderBy(i => i.NameTechnology),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Technology_Id) : query.OrderBy(i => i.Technology_Id),
            };
        }

        return query;
    }

    private static IQueryable<Technology> GetPaginationData(IQueryable<Technology> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}