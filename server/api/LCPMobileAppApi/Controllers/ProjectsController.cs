using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Models;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.QParams;

namespace LCPMobileAppApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectsRepo _projectsRepo;

        public ProjectsController(IProjectsRepo projectsRepo)
        {
            _projectsRepo = projectsRepo;
        }

        /// <summary>
        /// Gets all projects infos.
        /// </summary>
        /// <param name="queryParams"></param>
        /// <returns>Gets all projects infos</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all infos about projects</response>
        /// <response code="400">If the projects infos are empty</response>
        [HttpGet]
        [Authorize(Policy = "AllUsers")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects([FromQuery] QueryParams queryParams)
        {
            var projects = await _projectsRepo.GetProjects(queryParams);
            var totalCount = await _projectsRepo.GetTotalCountAsync(queryParams);
            var response = new QueryParamsResp<Project> {
                TotalCount = totalCount,
                Page = queryParams.Page,
                PageSize = queryParams.PageSize,
                Data = projects.Value!.ToList()
            };

            return Ok(response);
        }

        /// <summary>
        /// Gets project info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Gets project info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the info about project</response>
        /// <response code="400">If the project info is empty</response>
        [HttpGet("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Project>> GetProject(int? id)
        {
            return await _projectsRepo.GetProject(id);
        }
        
        /// <summary>
        /// Creates a project.
        /// </summary>
        /// <param name="project"></param>
        /// <returns>A newly created project</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the newly created project info</response>
        /// <response code="400">If the project info is empty</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Project>> PostProject(Project project)
        {
            return await _projectsRepo.PostProject(project);
        }

        /// <summary>
        /// Updates specific project info by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="project"></param>
        /// <returns>Updates specific project info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all projects infos updated by id and its body</response>
        /// <response code="400">If the projects infos updated are empty by id and its body</response>
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> PutProject(int? id, Project project)
        {
            return await _projectsRepo.PutProject(id, project);
        }

        /// <summary>
        /// Deletes specific project info by id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Deletes the specific project info by id</returns>
        /// <remarks>
        /// </remarks>
        /// <response code="201">Returns the all projects infos are deleted by id</response>
        /// <response code="400">If the projects infos are deleted by id</response>
        [HttpDelete("{id}")]
        [Authorize(Policy = "StaffOnly")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteProject(int? id)
        {
            return await _projectsRepo.DeleteProject(id);
        }
    }
}
