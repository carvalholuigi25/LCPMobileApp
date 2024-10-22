using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Project
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Project_Id { get; set; }
    public string NameProject { get; set; } = null!;
    public string? DescProject { get; set; }
    public DateTime? StartDate { get; set; } = DateTime.Now;
    public DateTime? EndDate { get; set; } = DateTime.Now;
    public string? Attachments { get; set; }
    public string? SourceCodeUrl { get; set; }
    public int? User_Id { get; set;} = 1;
    public int? Project_Type_Id { get; set; } = 1;
    public int? Technology_Id { get; set; } = 1;
    public int? Status_Id { get; set; } = 1;
}

public class ProjectTechnologies {
    public int? Project_Id { get; set; } = 1;
    public int? Technology_Id { get; set; } = 1;
}

public class ProjectTypes {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Project_Type_Id { get; set; } = 1;
    public EProjectTypes? ProjectsTypes { get; set; } = EProjectTypes.Website;
}

public class ProjectBudgets {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Project_Budget_Id { get; set; } = 1;
    public int Project_Id { get; set; } = 1;
    public decimal? Project_Estimated_Budget { get; set; }
    public decimal? Project_Actual_Budget { get; set; }
    public decimal? Project_Budget_Variance { get; set; }
}