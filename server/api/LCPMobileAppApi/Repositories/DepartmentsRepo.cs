using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class DepartmentsRepo : ControllerBase, IDepartmentsRepo
{
    private readonly MDBContext _context;

    public DepartmentsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Department>>> GetDepartments(QueryParams queryParams)
    {
        var query =  _context.Departments.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Department>> GetDepartment(int? id)
    {
        var department = await _context.Departments.FindAsync(id);

        if (department == null)
        {
            return NotFound();
        }

        return department;
    }

    public async Task<ActionResult<Department>> PostDepartment(Department department)
    {
        if(!string.IsNullOrEmpty(department.Department_Name) &&  _context.Departments.Where(x => x.Department_Name == department.Department_Name).Count() == 1) {
            return BadRequest("The name of department already exists!");
        }

        _context.Departments.Add(department);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetDepartment", new { id = department.Id }, department);
        return CreatedAtAction(nameof(GetDepartment), new { id = department.Department_Id }, department);
    }

    public async Task<IActionResult> PutDepartment(int? id, Department department)
    {
        if (id != department.Department_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(department.Department_Name) &&  _context.Departments.Where(x => x.Department_Name == department.Department_Name).Count() == 1) {
            return BadRequest("The name of department already exists!");
        }

        _context.Entry(department).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DepartmentExists(id))
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

    public async Task<IActionResult> DeleteDepartment(int? id)
    {
        var department = await _context.Departments.FindAsync(id);
        if (department == null)
        {
            return NotFound();
        }

        _context.Departments.Remove(department);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Departments.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool DepartmentExists(int? id)
    {
        return _context.Departments.Any(e => e.Department_Id == id);
    }

    private static IQueryable<Department> GetFilterData(IQueryable<Department> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "nameDepartment" => query.Where(i => i.Department_Name.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Department_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Department> GetSortByData(IQueryable<Department> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "nameDepartment" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Department_Name) : query.OrderBy(i => i.Department_Name),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Department_Id) : query.OrderBy(i => i.Department_Id),
            };
        }

        return query;
    }

    private static IQueryable<Department> GetPaginationData(IQueryable<Department> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}