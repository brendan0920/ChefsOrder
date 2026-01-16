namespace ChefsOrder.Api.Models;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public string IngredientName { get; set; } = string.Empty;
    public decimal Quantity { get; set; }
    public string Unit { get; set; } = string.Empty; // kg, lb, piece, etc.
    public decimal? UnitPrice { get; set; }
    public decimal? TotalPrice { get; set; }
    public string? Notes { get; set; }

    // Navigation property
    public Order Order { get; set; } = null!;
}
