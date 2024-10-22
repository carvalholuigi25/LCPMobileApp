using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class TicketsRepo : ControllerBase, ITicketsRepo
{
    private readonly MDBContext _context;

    public TicketsRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Ticket>>> GetTickets(QueryParams queryParams)
    {
        var query =  _context.Tickets.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Ticket>> GetTicket(int? id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
        {
            return NotFound();
        }

        return ticket;
    }

    public async Task<ActionResult<Ticket>> PostTicket(Ticket ticket)
    {
        if(!string.IsNullOrEmpty(ticket.Ticket_Title) &&  _context.Tickets.Where(x => x.Ticket_Title == ticket.Ticket_Title).Count() == 1) {
            return BadRequest("The name of ticket already exists!");
        }

        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetTicket", new { id = ticket.Id }, ticket);
        return CreatedAtAction(nameof(GetTicket), new { id = ticket.Ticket_Id }, ticket);
    }

    public async Task<IActionResult> PutTicket(int? id, Ticket ticket)
    {
        if (id != ticket.Ticket_Id)
        {
            return BadRequest();
        }

        if(!string.IsNullOrEmpty(ticket.Ticket_Title) &&  _context.Tickets.Where(x => x.Ticket_Title == ticket.Ticket_Title).Count() == 1) {
            return BadRequest("The name of ticket already exists!");
        }

        _context.Entry(ticket).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TicketExists(id))
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

    public async Task<IActionResult> DeleteTicket(int? id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null)
        {
            return NotFound();
        }

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Tickets.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool TicketExists(int? id)
    {
        return _context.Tickets.Any(e => e.Ticket_Id == id);
    }

    private static IQueryable<Ticket> GetFilterData(IQueryable<Ticket> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    "ticketTitle" => query.Where(i => i.Ticket_Title.Contains(queryParams.Search)),
                    _ => query.Where(i => i.Ticket_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Ticket> GetSortByData(IQueryable<Ticket> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                "ticketTitle" => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Ticket_Title) : query.OrderBy(i => i.Ticket_Title),
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Ticket_Id) : query.OrderBy(i => i.Ticket_Id),
            };
        }

        return query;
    }

    private static IQueryable<Ticket> GetPaginationData(IQueryable<Ticket> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}