namespace ChefsOrder.Api.DTOs;

public class CreateOrderDto
{
    public int VendorId { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string? Notes { get; set; }
    public List<CreateOrderItemDto> OrderItems { get; set; } = new();
}

public class CreateOrderItemDto
{
    public string IngredientName { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty;
    public decimal? UnitPrice { get; set; }
    public string? Notes { get; set; }
}
