using LCPMobileAppApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace LCPMobileAppApi.Interfaces;

public interface IUsersRepo {
    Task<ActionResult<IEnumerable<User>>> GetUsers();  
    Task<ActionResult<User>> GetUser(int? id); 
    Task<ActionResult<User>> PostUser(User user);
    Task<IActionResult> PutUser(int? id, User user);
    Task<IActionResult> DeleteUser(int? id);
}