using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IMilestonesRepo {
    Task<ActionResult<IEnumerable<Milestone>>> GetMilestones(QueryParams queryParams);  
    Task<ActionResult<Milestone>> GetMilestone(int? id); 
    Task<ActionResult<Milestone>> PostMilestone(Milestone milestone);
    Task<IActionResult> PutMilestone(int? id, Milestone milestone);
    Task<IActionResult> DeleteMilestone(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}