using ChefsOrder.Api.Data;
using ChefsOrder.Api.DTOs;
using ChefsOrder.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace ChefsOrder.Api.Services;

public class OrderService : IOrderService
{
    private readonly ChefsOrderDbContext _context;

    public OrderService(ChefsOrderDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<OrderDto>> GetOrdersAsync(int? userId = null)
    {
        var query = _context.Orders
            .Include(o => o.User)
            .Include(o => o.Vendor)
            .Include(o => o.OrderItems)
            .AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(o => o.UserId == userId.Value);
        }

        var orders = await query
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        return orders.Select(MapToDto);
    }

    public async Task<OrderDto?> GetOrderByIdAsync(int id)
    {
        var order = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Vendor)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        return order == null ? null : MapToDto(order);
    }

    public async Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto, int userId)
    {
        var vendor = await _context.Vendors.FindAsync(createOrderDto.VendorId)
            ?? throw new ArgumentException("Vendor not found");

        var user = await _context.Users.FindAsync(userId)
            ?? throw new ArgumentException("User not found");

        var orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString()[..8].ToUpper()}";

        var order = new Order
        {
            UserId = userId,
            VendorId = createOrderDto.VendorId,
            OrderNumber = orderNumber,
            OrderDate = DateTime.UtcNow,
            DeliveryDate = createOrderDto.DeliveryDate,
            Status = "Pending",
            Notes = createOrderDto.Notes,
            OrderItems = createOrderDto.OrderItems.Select(oi => new OrderItem
            {
                IngredientName = oi.IngredientName,
                Quantity = oi.Quantity,
                Unit = oi.Unit,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.UnitPrice.HasValue ? oi.UnitPrice.Value * oi.Quantity : null,
                Notes = oi.Notes
            }).ToList()
        };

        order.TotalAmount = order.OrderItems
            .Where(oi => oi.TotalPrice.HasValue)
            .Sum(oi => oi.TotalPrice!.Value);

        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        var createdOrder = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Vendor)
            .Include(o => o.OrderItems)
            .FirstAsync(o => o.Id == order.Id);

        return MapToDto(createdOrder);
    }

    public async Task<bool> UpdateOrderStatusAsync(int id, string status)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return false;

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteOrderAsync(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null) return false;

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return true;
    }

    private static OrderDto MapToDto(Order order)
    {
        return new OrderDto
        {
            Id = order.Id,
            UserId = order.UserId,
            UserName = order.User.Username,
            VendorId = order.VendorId,
            VendorName = order.Vendor.Name,
            OrderNumber = order.OrderNumber,
            OrderDate = order.OrderDate,
            DeliveryDate = order.DeliveryDate,
            Status = order.Status,
            Notes = order.Notes,
            TotalAmount = order.TotalAmount,
            OrderItems = order.OrderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                IngredientName = oi.IngredientName,
                Quantity = oi.Quantity,
                Unit = oi.Unit,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.TotalPrice,
                Notes = oi.Notes
            }).ToList(),
            CreatedAt = order.CreatedAt
        };
    }
}
