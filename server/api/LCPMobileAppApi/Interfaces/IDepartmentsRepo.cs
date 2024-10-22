using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IDepartmentsRepo {
    Task<ActionResult<IEnumerable<Department>>> GetDepartments(QueryParams queryParams);  
    Task<ActionResult<Department>> GetDepartment(int? id); 
    Task<ActionResult<Department>> PostDepartment(Department department);
    Task<IActionResult> PutDepartment(int? id, Department department);
    Task<IActionResult> DeleteDepartment(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}