using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IStatusRepo {
    Task<ActionResult<IEnumerable<Status>>> GetStatus(QueryParams queryParams);  
    Task<ActionResult<Status>> GetStatusById(int? id); 
    Task<ActionResult<Status>> PostStatus(Status status);
    Task<IActionResult> PutStatus(int? id, Status status);
    Task<IActionResult> DeleteStatus(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}