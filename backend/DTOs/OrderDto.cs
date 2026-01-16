namespace ChefsOrder.Api.DTOs;

public class OrderDto
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public int VendorId { get; set; }
    public string VendorName { get; set; } = string.Empty;
    public string OrderNumber { get; set; } = string.Empty;
    public DateTime OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string Status { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public decimal TotalAmount { get; set; }
    public List<OrderItemDto> OrderItems { get; set; } = new();
    public DateTime CreatedAt { get; set; }
}

public class OrderItemDto
{
    public int Id { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public decimal? UnitPrice { get; set; }
    public decimal? TotalPrice { get; set; }
    public string? Notes { get; set; }
}
