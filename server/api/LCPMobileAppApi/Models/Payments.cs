using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Payment
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Payment_Id { get; set; }

    public int Orders_Id { get; set; } = 1;
    public DateTime? Payment_Date { get; set; } = DateTime.Now;
    public decimal Amount_Paid { get; set; } = decimal.One;
    public EPaymentsMethod Payment_Method { get; set; } = EPaymentsMethod.CreditCard;
    public int Payment_Status_Id { get; set; } = 1;
}

public class PaymentStatus {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Payment_Status_Id { get; set; }

    public EPaymentsStatus Payment_Status_Name { get; set; } = EPaymentsStatus.Pending;
}