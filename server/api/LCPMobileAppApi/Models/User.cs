using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using LCPMobileAppApi.Models.Enums;
using LCPMobileAppApi.Models.UsersAuth;

namespace LCPMobileAppApi.Models;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? User_Id { get; set; }
    [Required]
    public string Username { get; set; } = null!;
    [Required]
    public string Password { get; set; } = null!;
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Avatar { get; set; } = "avatars/guest.png";
    public string? Cover { get; set; } = "avatars/guest.png";
    public int? Usersinfo_Id { get; set; } = 1;
    public EUsersRoles? Role { get; set; } = EUsersRoles.user;

    [JsonIgnore]
    public List<RefreshToken>? RefreshTokens { get; set; }
}

public class UsersInfo {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Usersinfo_Id { get; set; }
    public string? PhoneUser { get; set; }
    public string? AddressUser { get; set; }
    public string? CountryUser { get; set; }
    public string? CityUser { get; set; }
    public string? DistrictUser { get; set; }
    public string? DateBirthdayUser { get; set; }
}