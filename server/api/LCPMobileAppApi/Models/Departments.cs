using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LCPMobileAppApi.Models;

public class Department
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Department_Id { get; set; }
    public string Department_Name { get; set; } = "Development";
    public int? Team_Member_Id { get; set; } = 1;
}