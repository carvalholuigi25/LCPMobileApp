using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LCPMobileAppApi.Models;

public class Phase
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Phase_Id { get; set; }

    [Required]
    public string NamePhase { get; set; } = null!;
    public string? DescPhase { get; set; }
    
    [Required]
    public DateTime DueDate { get; set; } = DateTime.Now;
     
    public int? Project_Id { get; set; } = 1;
    public int? Assigned_To { get; set; } = 1;
    public int? Status_Id { get; set; } = 1;
}

public class PhaseDependencies {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Phase_Dependency_Id { get; set; }

    public int Phase_Id { get; set; } = 1;

    public int? Phase_Dependent_On_Phase_Id { get; set; } = 1;
}