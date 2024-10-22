using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Invoice
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Invoice_Id { get; set; }
    public DateTime Invoice_Date { get; set; } = DateTime.Now;
    public DateTime Invoice_DueDate { get; set; } = DateTime.Now;
    public decimal Invoice_TotalAmount { get; set; } = 1;
    public decimal Invoice_TaxAmount { get; set; } = 1;
    public int Invoice_Discount { get; set; } = 100;
    public decimal Invoice_AmountDue { get; set; } = 1;
    public int? Orders_Id { get; set; } = 1;
    public int? User_Id { get; set; } = 1;
    public int? Status_Id { get; set; } = 1;
    public int? Payments_Id { get; set; } = 1;
}

public class InvoiceStatus {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Invoice_Status_Id { get; set; }
    public EInvoicesStatus Invoice_Status_Name { get; set; } = EInvoicesStatus.Pending;
}