using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.QParams;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface ITimeLogsRepo {
    Task<ActionResult<IEnumerable<TimeLog>>> GetTimeLogs(QueryParams queryParams);  
    Task<ActionResult<TimeLog>> GetTimeLog(int? id); 
    Task<ActionResult<TimeLog>> PostTimeLog(TimeLog timelog);
    Task<IActionResult> PutTimeLog(int? id, TimeLog timelog);
    Task<IActionResult> DeleteTimeLog(int? id);
    Task<int> GetTotalCountAsync(QueryParams queryParams);
}