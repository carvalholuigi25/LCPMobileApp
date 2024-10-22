using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IPhasesRepo {
    Task<ActionResult<IEnumerable<Phase>>> GetPhases(QueryParams queryParams);  
    Task<ActionResult<Phase>> GetPhase(int? id); 
    Task<ActionResult<Phase>> PostPhase(Phase phase);
    Task<IActionResult> PutPhase(int? id, Phase phase);
    Task<IActionResult> DeletePhase(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}