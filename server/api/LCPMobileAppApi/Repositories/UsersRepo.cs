using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;

namespace LCPMobileAppApi.Repositories;

public class UsersRepo : ControllerBase, IUsersRepo
{
    private readonly MDBContext _context;

    public UsersRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<User>>> GetUsers(QueryParams queryParams)
    {
        var query =  _context.Users.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<User>> GetUser(int? id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    public async Task<ActionResult<User>> PostUser(User user)
    {
        if(!string.IsNullOrEmpty(user.Password)) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, 10, false);
        }

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetUser", new { id = user.Id }, user);
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    public async Task<IActionResult> PutUser(int? id, User user)
    {
        if (id != user.Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(user.Password)) {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password, 10, false);
        }

        _context.Entry(user).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!UserExists(id))
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

    public async Task<IActionResult> DeleteUser(int? id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Users.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool UserExists(int? id)
    {
        return _context.Users.Any(e => e.Id == id);
    }

    private static IQueryable<User> GetFilterData(IQueryable<User> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "username" => query.Where(i => i.Username.Contains(queryParams.Search)),
                    "firstname" => query.Where(i => i.FirstName!.Contains(queryParams.Search)),
                    "lastname" => query.Where(i => i.LastName!.Contains(queryParams.Search)),
                    "role" => query.Where(i => i.Role.ToString()!.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<User> GetSortByData(IQueryable<User> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            query = queryParams.SortBy.ToLower() switch
            {
                "username" => queryParams.SortOrder == "desc" ? query.OrderByDescending(i => i.Username) : query.OrderBy(i => i.Username),
                "firstname" => queryParams.SortOrder == "desc" ? query.OrderByDescending(i => i.FirstName) : query.OrderBy(i => i.FirstName),
                "lastname" => queryParams.SortOrder == "desc" ? query.OrderByDescending(i => i.LastName) : query.OrderBy(i => i.LastName),
                "role" => queryParams.SortOrder == "desc" ? query.OrderByDescending(i => i.Role) : query.OrderBy(i => i.Role),
                _ => queryParams.SortOrder == "desc" ? query.OrderByDescending(i => i.Id) : query.OrderBy(i => i.Id),
            };
        }

        return query;
    }

    private static IQueryable<User> GetPaginationData(IQueryable<User> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}