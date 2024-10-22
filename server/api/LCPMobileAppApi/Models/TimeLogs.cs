using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LCPMobileAppApi.Models;

public class TimeLog
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? TimeLog_Id { get; set; }

    public int Team_Member_Id { get; set; } = 1;
    public int Phase_Id { get; set; } = 1;
    public decimal? Hours_Logged { get; set; } = 1;
    public DateTime? Date_Logged { get; set; } = DateTime.Now;
}