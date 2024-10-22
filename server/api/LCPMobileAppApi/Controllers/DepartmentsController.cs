using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentsRepo _departmentsRepo;

        public DepartmentsController(IDepartmentsRepo departmentsRepo)
        {
            _departmentsRepo = departmentsRepo;
        }

        /// <summary>
        /// Gets all departments infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all departments infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about departments</response>
        /// <response code="400">If the departments infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Department>>> GetDepartments([FromQuery] QueryParams queryParams)
        {
            var departments = await _departmentsRepo.GetDepartments(queryParams);
            var totalCount = await _departmentsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Department> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = departments.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets department info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets department info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about department</response>
        /// <response code="400">If the department info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Department>> GetDepartment(int? id)
        {
            return await _departmentsRepo.GetDepartment(id);
        }
        
        /// <summary>
        /// Creates a department.
        /// </summary>
        /// <param name="department"></param>
        /// <returns>A newly created department</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created department info</response>
        /// <response code="400">If the department info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Department>> PostDepartment(Department department)
        {
            return await _departmentsRepo.PostDepartment(department);
        }

        /// <summary>
        /// Updates specific department info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="department"></param>
        /// <returns>Updates specific department info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all departments infos updated by id and its body</response>
        /// <response code="400">If the departments infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutDepartment(int? id, Department department)
        {
            return await _departmentsRepo.PutDepartment(id, department);
        }

        /// <summary>
        /// Deletes specific department info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific department info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all departments infos are deleted by id</response>
        /// <response code="400">If the departments infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteDepartment(int? id)
        {
            return await _departmentsRepo.DeleteDepartment(id);
        }
    }
}
