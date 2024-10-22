using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Ticket
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Ticket_Id { get; set; }
    public string Ticket_Title { get; set; } = "";
    public string? Ticket_Description { get; set; }
    public DateTime? Ticket_Created_Date { get; set; } = DateTime.Now;
    public DateTime? Ticket_Resolved_Date { get; set; } = DateTime.Now;
    public string? Ticket_Attachment { get; set; } = "tickets/images/timg.jpg";
    public int? Project_Id { get; set; } = 1;
    public int? Orders_Id { get; set; } = 1;
    public int? Status_Id { get; set; } = 1;
    public int? Assigned_To { get; set; } = 1;
}

public class TicketStatus {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Ticket_Status_Id { get; set; }
    public ETicketsStatus Ticket_Status_Name { get; set; } = ETicketsStatus.Pending;
}