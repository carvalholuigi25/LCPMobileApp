using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IProjectsRepo {
    Task<ActionResult<IEnumerable<Project>>> GetProjects(QueryParams queryParams);  
    Task<ActionResult<Project>> GetProject(int? id); 
    Task<ActionResult<Project>> PostProject(Project project);
    Task<IActionResult> PutProject(int? id, Project project);
    Task<IActionResult> DeleteProject(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}