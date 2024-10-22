using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IPaymentsRepo {
    Task<ActionResult<IEnumerable<Payment>>> GetPayments(QueryParams queryParams);  
    Task<ActionResult<Payment>> GetPayment(int? id); 
    Task<ActionResult<Payment>> PostPayment(Payment payment);
    Task<IActionResult> PutPayment(int? id, Payment payment);
    Task<IActionResult> DeletePayment(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}