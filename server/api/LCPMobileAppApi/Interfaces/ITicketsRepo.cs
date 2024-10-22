using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface ITicketsRepo {
    Task<ActionResult<IEnumerable<Ticket>>> GetTickets(QueryParams queryParams);  
    Task<ActionResult<Ticket>> GetTicket(int? id); 
    Task<ActionResult<Ticket>> PostTicket(Ticket ticket);
    Task<IActionResult> PutTicket(int? id, Ticket ticket);
    Task<IActionResult> DeleteTicket(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}