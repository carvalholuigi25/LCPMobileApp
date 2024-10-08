using Microsoft.AspNetCore.Mvc;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Models.UsersAuth;
using LCPMobileAppApi.Services;
// using LCPMobileAppApi.Attributes;

namespace LCPMobileAppApi.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]
    [HttpPost("authenticate")]
    public IActionResult Authenticate(AuthenticateRequest model)
    {
        var response = _userService.Authenticate(model, IpAddress());
        SetTokenCookie(response.RefreshToken);
        return Ok(response);
    }

    [AllowAnonymous]
    [HttpPost("refresh-token")]
    // [IgnoreAPI]
    public IActionResult RefreshToken()
    {
        var refreshToken = Request.Cookies["refreshToken"];
        var response = _userService.RefreshToken(refreshToken!, IpAddress());
        SetTokenCookie(response.RefreshToken);
        return Ok(response);
    }

    [Authorize(Roles = "admin,moderator")]
    [HttpPost("revoke-token")]
    // [IgnoreAPI]
    public IActionResult RevokeToken(RevokeTokenRequest model)
    {
        // accept refresh token in request body or cookie
        var token = model.Token ?? Request.Cookies["refreshToken"];

        if (string.IsNullOrEmpty(token))
            return BadRequest(new { message = "Token is required" });

        _userService.RevokeToken(token, IpAddress());
        return Ok(new { message = "Token revoked" });
    }

    [Authorize(Roles = "admin,moderator")]
    [HttpGet]
    // [IgnoreAPI]
    public IActionResult GetAll()
    {
        var users = _userService.GetAll();
        return Ok(users);
    }

    [Authorize(Roles = "admin,moderator")]
    [HttpGet("{id}")]
    // [IgnoreAPI]
    public IActionResult GetById(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user);
    }

    [Authorize(Roles = "admin,moderator")]
    [HttpGet("{id}/refresh-tokens")]
    // [IgnoreAPI]
    public IActionResult GetRefreshTokens(int id)
    {
        var user = _userService.GetById(id);
        return Ok(user.RefreshTokens);
    }

    // helper methods

    private void SetTokenCookie(string token)
    {
        // append cookie with refresh token to the http response
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Expires = DateTime.UtcNow.AddDays(7)
        };
        Response.Cookies.Append("refreshToken", token, cookieOptions);
    }

    private string IpAddress()
    {
        // get source ip address for the current request
        if (Request.Headers.ContainsKey("X-Forwarded-For"))
            return Request.Headers["X-Forwarded-For"]!;
        else
            return HttpContext.Connection.RemoteIpAddress!.MapToIPv4().ToString();
    }
}