using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class ProjectsRepo : ControllerBase, IProjectsRepo
{
    private readonly MDBContext _context;

    public ProjectsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Project>>> GetProjects(QueryParams queryParams)
    {
        var query =  _context.Projects.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Project>> GetProject(int? id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
        {
            return NotFound();
        }

        return project;
    }

    public async Task<ActionResult<Project>> PostProject(Project project)
    {
        if(!string.IsNullOrEmpty(project.NameProject) &&  _context.Projects.Where(x => x.NameProject == project.NameProject).Count() == 1) {
            return BadRequest("The name of project already exists!");
        }

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetProject", new { id = project.Id }, project);
        return CreatedAtAction(nameof(GetProject), new { id = project.Project_Id }, project);
    }

    public async Task<IActionResult> PutProject(int? id, Project project)
    {
        if (id != project.Project_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(project.NameProject) &&  _context.Projects.Where(x => x.NameProject == project.NameProject).Count() == 1) {
            return BadRequest("The name of project already exists!");
        }

        _context.Entry(project).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ProjectExists(id))
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

    public async Task<IActionResult> DeleteProject(int? id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Projects.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool ProjectExists(int? id)
    {
        return _context.Projects.Any(e => e.Project_Id == id);
    }

    private static IQueryable<Project> GetFilterData(IQueryable<Project> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "nameproject" => query.Where(i => i.NameProject.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Project_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Project> GetSortByData(IQueryable<Project> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "nameproject" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.NameProject) : query.OrderBy(i => i.NameProject),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Project_Id) : query.OrderBy(i => i.Project_Id),
            };
        }

        return query;
    }

    private static IQueryable<Project> GetPaginationData(IQueryable<Project> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}