using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

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
}