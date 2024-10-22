using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Review
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Review_Id { get; set; }
    public string Review_Title { get; set; } = string.Empty;
    public string Review_Desc { get; set; } = string.Empty;
    public string? Review_Comment { get; set; }
    public int? Review_Rate { get; set; } = 10;
    public string? Review_Image { get; set; } = "images/review/img.jpg";
    public bool? Review_IsFeatured { get; set; } = false;
    public DateTime? Review_Date { get; set; } = DateTime.Now;
    public EReviewsStatus? Review_Status { get; set; } = EReviewsStatus.Pending;
    public EReviewsPrivacy? Review_Privacy { get; set; } = EReviewsPrivacy.Public;
    public int? Project_Id { get; set; } = 1;
    public int? User_Id { get; set; } = 1;
    public int? Orders_Id { get; set; } = 1;
    public int? Team_Member_Id { get; set; } = 1;
}