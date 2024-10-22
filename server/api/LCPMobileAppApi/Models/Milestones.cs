using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LCPMobileAppApi.Models;

public class Milestone
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Milestone_Id { get; set; }

    public string Milestone_Name { get; set; } = string.Empty;

    public string Milestone_Description { get; set; } = string.Empty;

    public DateTime? Milestone_DueDate { get; set; } = DateTime.Now;
    public int? Project_Id { get; set; } = 1;
}