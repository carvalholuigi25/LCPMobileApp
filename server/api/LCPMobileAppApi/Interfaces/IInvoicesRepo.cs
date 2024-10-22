using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IInvoicesRepo {
    Task<ActionResult<IEnumerable<Invoice>>> GetInvoices(QueryParams queryParams);  
    Task<ActionResult<Invoice>> GetInvoice(int? id); 
    Task<ActionResult<Invoice>> PostInvoice(Invoice invoice);
    Task<IActionResult> PutInvoice(int? id, Invoice invoice);
    Task<IActionResult> DeleteInvoice(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}