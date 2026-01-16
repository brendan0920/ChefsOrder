namespace ChefsOrder.Api.Models;

public class Order
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int VendorId { get; set; }
    public string OrderNumber { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; } = DateTime.UtcNow;
    public DateTime? DeliveryDate { get; set; }
    public string Status { get; set; } = "Pending"; // Pending, Confirmed, Delivered, Cancelled
    public string? Notes { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigation properties
    public User User { get; set; } = null!;
    public Vendor Vendor { get; set; } = null!;
    public ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
}
