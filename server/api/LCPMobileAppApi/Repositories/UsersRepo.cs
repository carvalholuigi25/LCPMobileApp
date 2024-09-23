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

    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
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

    private bool UserExists(int? id)
    {
        return _context.Users.Any(e => e.Id == id);
    }
}