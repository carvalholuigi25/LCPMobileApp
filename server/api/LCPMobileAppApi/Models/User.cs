using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace LCPMobileAppApi.Models;

public class User
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Id { get; set; }

    [Required]
    public string Username { get; set; } = null!;
    
    [Required]
    public string Password { get; set; } = null!;

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public Roles? Role { get; set; } = Roles.user;

    [JsonIgnore]
    public List<RefreshToken>? RefreshTokens { get; set; }
}

public enum Roles {
    [EnumMember(Value = "guest")]
    guest,
    [EnumMember(Value = "user")]
    user,
    [EnumMember(Value = "moderator")]
    moderator,
    [EnumMember(Value = "admin")]
    admin
}