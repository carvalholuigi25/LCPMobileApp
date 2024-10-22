using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class TeamsRepo : ControllerBase, ITeamsRepo
{
    private readonly MDBContext _context;

    public TeamsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Team>>> GetTeams(QueryParams queryParams)
    {
        var query =  _context.Teams.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Team>> GetTeam(int? id)
    {
        var team = await _context.Teams.FindAsync(id);

        if (team == null)
        {
            return NotFound();
        }

        return team;
    }

    public async Task<ActionResult<Team>> PostTeam(Team team)
    {
        if(!string.IsNullOrEmpty(team.NameMember) &&  _context.Teams.Where(x => x.NameMember == team.NameMember).Count() == 1) {
            return BadRequest("The name of team already exists!");
        }

        _context.Teams.Add(team);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetTeam", new { id = team.Id }, team);
        return CreatedAtAction(nameof(GetTeam), new { id = team.Team_Member_Id }, team);
    }

    public async Task<IActionResult> PutTeam(int? id, Team team)
    {
        if (id != team.Team_Member_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(team.NameMember) &&  _context.Teams.Where(x => x.NameMember == team.NameMember).Count() == 1) {
            return BadRequest("The name of team already exists!");
        }

        _context.Entry(team).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TeamExists(id))
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

    public async Task<IActionResult> DeleteTeam(int? id)
    {
        var team = await _context.Teams.FindAsync(id);
        if (team == null)
        {
            return NotFound();
        }

        _context.Teams.Remove(team);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Teams.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool TeamExists(int? id)
    {
        return _context.Teams.Any(e => e.Team_Member_Id == id);
    }

    private static IQueryable<Team> GetFilterData(IQueryable<Team> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "nameMember" => query.Where(i => i.NameMember.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Team_Member_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Team> GetSortByData(IQueryable<Team> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "nameMember" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.NameMember) : query.OrderBy(i => i.NameMember),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Team_Member_Id) : query.OrderBy(i => i.Team_Member_Id),
            };
        }

        return query;
    }

    private static IQueryable<Team> GetPaginationData(IQueryable<Team> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}