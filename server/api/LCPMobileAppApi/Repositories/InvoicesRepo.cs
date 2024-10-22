using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class InvoicesRepo : ControllerBase, IInvoicesRepo
{
    private readonly MDBContext _context;

    public InvoicesRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(QueryParams queryParams)
    {
        var query =  _context.Invoices.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Invoice>> GetInvoice(int? id)
    {
        var invoice = await _context.Invoices.FindAsync(id);

        if (invoice == null)
        {
            return NotFound();
        }

        return invoice;
    }

    public async Task<ActionResult<Invoice>> PostInvoice(Invoice invoice)
    {
        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetInvoice", new { id = invoice.Id }, invoice);
        return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Invoice_Id }, invoice);
    }

    public async Task<IActionResult> PutInvoice(int? id, Invoice invoice)
    {
        if (id != invoice.Invoice_Id)
        {
            return BadRequest();
        }

        _context.Entry(invoice).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!InvoiceExists(id))
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

    public async Task<IActionResult> DeleteInvoice(int? id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            return NotFound();
        }

        _context.Invoices.Remove(invoice);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Invoices.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool InvoiceExists(int? id)
    {
        return _context.Invoices.Any(e => e.Invoice_Id == id);
    }

    private static IQueryable<Invoice> GetFilterData(IQueryable<Invoice> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    _ => query.Where(i => i.Invoice_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Invoice> GetSortByData(IQueryable<Invoice> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Invoice_Id) : query.OrderBy(i => i.Invoice_Id),
            };
        }

        return query;
    }

    private static IQueryable<Invoice> GetPaginationData(IQueryable<Invoice> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}