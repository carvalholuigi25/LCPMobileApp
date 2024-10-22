using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using LCPMobileAppApi.Models.Enums;
using LCPMobileAppApi.Models.UsersAuth;

namespace LCPMobileAppApi.Models;

public class Team
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Team_Member_Id { get; set; }
    
    [Required]
    public string NameMember { get; set;} = null!;
    
    [Required]
    public string PasswordMember { get; set;} = null!;

    public string? EmailMember { get; set; }
    public string? FirstNameMember { get; set; }
    public string? LastNameMember { get; set; }
    public string? AvatarMember { get; set; } = "avatars/guest.png";
    public string? CoverMember { get; set; } = "avatars/guest.png";
    public int? TeamInfo_Id { get; set; } = 1;
    public ETeamsMembersRoles? RoleMember { get; set; } = ETeamsMembersRoles.member;

    [JsonIgnore]
    public List<RefreshToken>? RefreshTokens { get; set; }
}

public class TeamMembersInfo {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? TeamInfo_Id { get; set; }
    public string? PhoneUser { get; set; }
    public string? AddressUser { get; set; }
    public string? CountryUser { get; set; }
    public string? CityUser { get; set; }
    public string? DistrictUser { get; set; }
    public string? DateBirthdayUser { get; set; }
}