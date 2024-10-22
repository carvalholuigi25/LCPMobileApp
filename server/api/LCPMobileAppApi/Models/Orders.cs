using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using LCPMobileAppApi.Models.Enums;

namespace LCPMobileAppApi.Models;

public class Order
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Order_Id { get; set; }
    public DateTime? Order_Date { get; set; } = DateTime.Now;
    public decimal? Order_Total_Amount { get; set; }
    public int? User_Id { get; set; }
    public int? Status_Id { get; set; }
}

public class OrderItems
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Order_Items_Id { get; set; }
    public int Order_Id { get; set; } = 1;
    public int Project_Id { get; set; } = 1;
    public decimal Unit_Price { get; set; } = 1;
    public int Quantity { get; set; } = 1;
    public int Discount { get; set; } = 100;
    public decimal? Subtotal { get; set; } = 1;
}

public class Ordertatus {
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    [Key]
    public int? Order_Status_Id { get; set; }

    public EOrderStatus Order_Status_Name { get; set; } = EOrderStatus.Pending;
}