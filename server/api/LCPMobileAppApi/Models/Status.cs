using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Status
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Status_Id { get; set; }

    public EStatusTypes? StatusTypes { get; set; } = EStatusTypes.Planning;
}