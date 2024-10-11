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

    [HttpGet("hi")]
    public IActionResult Get(string? culture = "en-US")
    {
        SetLangHeader(culture);
        _logger.LogInformation(_loc["hi"]);
        return Ok(_loc["hi"].ToString());
    }

    [HttpGet("{name}")]
    public IActionResult GetByName(string name, string? culture = "en-US")
    {
        SetLangHeader(culture);
        return Ok(string.Format(_loc["welcome"], name));
    }

    [HttpGet("all")]
    public IActionResult GetAll()
    {
        var message = _loc.GetAllStrings();
        return Ok(message);
    }

    [HttpGet("list")]
    public IActionResult GetListLangs(bool isdetailed = true)
    {
        var message = isdetailed ? GetLanguagesDetailedList() : (dynamic)GetLanguagesList();
        return Ok(message);
    }

    private void SetLangHeader(string? culture = "en-US") 
    {
        Response.Headers["X-Language"] = culture;
    }
}