namespace LCPMobileAppApi.Models.UsersAuth;

using System.Text.Json.Serialization;
using LCPMobileAppApi.Models;

public class AuthenticateResponse
{
    public int? Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string JwtToken { get; set; }

    [JsonIgnore] // refresh token is returned in http only cookie
    public string RefreshToken { get; set; }

    public AuthenticateResponse(User user, string jwtToken, string refreshToken)
    {
        Id = user.User_Id;
        FirstName = user.FirstName!;
        LastName = user.LastName!;
        Username = user.Username;
        JwtToken = jwtToken;
        RefreshToken = refreshToken;
    }
}