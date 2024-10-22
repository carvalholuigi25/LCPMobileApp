using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface ITeamsRepo {
    Task<ActionResult<IEnumerable<Team>>> GetTeams(QueryParams queryParams);  
    Task<ActionResult<Team>> GetTeam(int? id); 
    Task<ActionResult<Team>> PostTeam(Team team);
    Task<IActionResult> PutTeam(int? id, Team team);
    Task<IActionResult> DeleteTeam(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}