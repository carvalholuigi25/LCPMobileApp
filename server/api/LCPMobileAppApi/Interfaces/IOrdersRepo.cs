using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IOrdersRepo {
    Task<ActionResult<IEnumerable<Order>>> GetOrders(QueryParams queryParams);  
    Task<ActionResult<Order>> GetOrder(int? id); 
    Task<ActionResult<Order>> PostOrder(Order order);
    Task<IActionResult> PutOrder(int? id, Order order);
    Task<IActionResult> DeleteOrder(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}