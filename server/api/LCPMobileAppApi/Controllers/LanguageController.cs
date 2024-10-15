using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using static LCPMobileAppApi.Functions.Functions;

namespace LCPMobileAppApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LanguageController : ControllerBase
{
    private readonly ILogger<LanguageController> _logger;
    private readonly IStringLocalizer<LanguageController> _loc;
    public LanguageController(ILogger<LanguageController> logger, IStringLocalizer<LanguageController> loc)
    {
        _logger = logger;
        _loc = loc;
    }

    /// <summary>
    /// Gets language by the country code iso
    /// </summary>
    /// <param name="culture"></param>
    /// <returns>Gets language by the country code iso (culture)</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     GET /api/language/hi?culture={culture}
    ///
    /// </remarks>
    /// <response code="201">Returns the info about language by the country code iso</response>
    /// <response code="400">If the language info by the country code iso is empty</response>
    [HttpGet("hi")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Get(string? culture = "en-US")
    {
        SetLangHeader(culture);
        _logger.LogInformation(_loc["hi"]);
        return Ok(_loc["hi"].ToString());
    }

    /// <summary>
    /// Gets welcome message
    /// </summary>
    /// <param name="name"></param>
    /// <param name="culture"></param>
    /// <returns>Gets welcome message by name and country code iso</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     GET /api/language/{name}?culture={culture}
    ///
    /// </remarks>
    /// <response code="201">Returns the info about welcome message by name and country code iso</response>
    /// <response code="400">If the language info about welcome message is empty</response>
    [HttpGet("{name}")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetByName(string name, string? culture = "en-US")
    {
        SetLangHeader(culture);
        return Ok(string.Format(_loc["welcome"], name));
    }

    /// <summary>
    /// Gets all strings of languages list
    /// </summary>
    /// <returns>Gets all strings of languages list.</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     GET /api/language/all
    ///
    /// </remarks>
    /// <response code="201">Returns the info about all strings of languages as list.</response>
    /// <response code="400">If the all strings of languages list is empty</response>
    [HttpGet("all")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult GetAll()
    {
        var message = _loc.GetAllStrings();
        return Ok(message);
    }

    /// <summary>
    /// Gets all languages list
    /// </summary>
    /// <param name="isdetailed"></param>
    /// <returns>Gets all languages list.</returns>
    /// <remarks>
    /// Sample request:
    ///
    ///     GET /api/language/list?isdetailed={isdetailed}
    ///
    /// </remarks>
    /// <response code="201">Returns the info about all languages as list.</response>
    /// <response code="400">If the all languages list are empty</response>
    [HttpGet("list")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetListLangs(bool isdetailed = true)
    {
        var message = await GetLanguagesList(isdetailed);
        return Ok(message);
    }

    private void SetLangHeader(string? culture = "en-US") 
    {
        Response.Headers["X-Language"] = culture;
    }
}