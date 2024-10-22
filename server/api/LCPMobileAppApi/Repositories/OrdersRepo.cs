using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Repositories;

public class OrdersRepo : ControllerBase, IOrdersRepo
{
    private readonly MDBContext _context;

    public OrdersRepo(MDBContext context)
    {
        _context = context;
    }

    public async Task<ActionResult<IEnumerable<Order>>> GetOrders(QueryParams queryParams)
    {
        var query =  _context.Orders.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        // Sorting
        query = GetSortByData(query, queryParams);

        // Pagination
        query = GetPaginationData(query, queryParams);

        return await query.ToListAsync();
    }

    public async Task<ActionResult<Order>> GetOrder(int? id)
    {
        var order = await _context.Orders.FindAsync(id);

        if (order == null)
        {
            return NotFound();
        }

        return order;
    }

    public async Task<ActionResult<Order>> PostOrder(Order order)
    {
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        return CreatedAtAction(nameof(GetOrder), new { id = order.Order_Id }, order);
    }

    public async Task<IActionResult> PutOrder(int? id, Order order)
    {
        if (id != order.Order_Id)
        {
            return BadRequest();
        }

        _context.Entry(order).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!OrderExists(id))
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

    public async Task<IActionResult> DeleteOrder(int? id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    public async Task<int> GetTotalCountAsync(QueryParams queryParams)
    {
        var query = _context.Orders.AsQueryable();

        // Filtering
        query = GetFilterData(query, queryParams);

        return await query.CountAsync();
    }

    private bool OrderExists(int? id)
    {
        return _context.Orders.Any(e => e.Order_Id == id);
    }

    private static IQueryable<Order> GetFilterData(IQueryable<Order> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.Search))
        {
            if (!string.IsNullOrEmpty(queryParams.SortBy))
            {
                query = queryParams.SortBy.ToLower() switch
                {
                    _ => query.Where(i => i.Order_Id == int.Parse(queryParams.Search)),
                };
            }
        }

        return query;
    }

    private static IQueryable<Order> GetSortByData(IQueryable<Order> query, QueryParams queryParams) {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            var sortorderval = queryParams.SortOrder!.Value.ToString();
            StringComparison strcom = StringComparison.OrdinalIgnoreCase;
            query = queryParams.SortBy.ToLower() switch
            {
                _ => sortorderval.Contains("desc", strcom) ? query.OrderByDescending(i => i.Order_Id) : query.OrderBy(i => i.Order_Id),
            };
        }

        return query;
    }

    private static IQueryable<Order> GetPaginationData(IQueryable<Order> query, QueryParams queryParams) {
        return query.Skip((queryParams.Page - 1) * queryParams.PageSize).Take(queryParams.PageSize);
    }
}