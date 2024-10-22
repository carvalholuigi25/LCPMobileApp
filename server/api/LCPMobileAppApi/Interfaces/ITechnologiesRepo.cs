using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface ITechnologiesRepo {
    Task<ActionResult<IEnumerable<Technology>>> GetTechnologies(QueryParams queryParams);  
    Task<ActionResult<Technology>> GetTechnology(int? id); 
    Task<ActionResult<Technology>> PostTechnology(Technology technology);
    Task<IActionResult> PutTechnology(int? id, Technology technology);
    Task<IActionResult> DeleteTechnology(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}