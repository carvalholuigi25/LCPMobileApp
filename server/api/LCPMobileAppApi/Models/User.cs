using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
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

    [JsonIgnore]
    public List<RefreshToken>? RefreshTokens { get; set; }
}