namespace ChefsOrder.Api.Models;

public class Message
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int? VendorId { get; set; }
    public string Subject { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User User { get; set; } = null!;
    public Vendor? Vendor { get; set; }
}
