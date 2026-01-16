using ChefsOrder.Api.Data;
using ChefsOrder.Api.DTOs;
using ChefsOrder.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChefsOrder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ChefsOrderDbContext _context;

    public OrdersController(ChefsOrderDbContext context)
    {
        _context = context;
    }

    // GET: api/orders
    [HttpGet]
    public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrders([FromQuery] int? userId = null)
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

        return Ok(orders.Select(o => new OrderDto
        {
            Id = o.Id,
            UserId = o.UserId,
            UserName = o.User.Username,
            VendorId = o.VendorId,
            VendorName = o.Vendor.Name,
            OrderNumber = o.OrderNumber,
            OrderDate = o.OrderDate,
            DeliveryDate = o.DeliveryDate,
            Status = o.Status,
            Notes = o.Notes,
            TotalAmount = o.TotalAmount,
            OrderItems = o.OrderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                IngredientName = oi.IngredientName,
                Quantity = oi.Quantity,
                Unit = oi.Unit,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.TotalPrice,
                Notes = oi.Notes
            }).ToList(),
            CreatedAt = o.CreatedAt
        }));
    }

    // GET: api/orders/5
    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.User)
            .Include(o => o.Vendor)
            .Include(o => o.OrderItems)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound();
        }

        return Ok(new OrderDto
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
        });
    }

    // POST: api/orders
    [HttpPost]
    public async Task<ActionResult<OrderDto>> CreateOrder([FromBody] CreateOrderDto createOrderDto)
    {
        // For now, using userId = 1 as default. In production, this should come from authentication
        var userId = 1;

        var vendor = await _context.Vendors.FindAsync(createOrderDto.VendorId);
        if (vendor == null)
        {
            return BadRequest("Vendor not found");
        }

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        var orderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";

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
            .FirstOrDefaultAsync(o => o.Id == order.Id);

        return CreatedAtAction(nameof(GetOrder), new { id = order.Id }, new OrderDto
        {
            Id = createdOrder!.Id,
            UserId = createdOrder.UserId,
            UserName = createdOrder.User.Username,
            VendorId = createdOrder.VendorId,
            VendorName = createdOrder.Vendor.Name,
            OrderNumber = createdOrder.OrderNumber,
            OrderDate = createdOrder.OrderDate,
            DeliveryDate = createdOrder.DeliveryDate,
            Status = createdOrder.Status,
            Notes = createdOrder.Notes,
            TotalAmount = createdOrder.TotalAmount,
            OrderItems = createdOrder.OrderItems.Select(oi => new OrderItemDto
            {
                Id = oi.Id,
                IngredientName = oi.IngredientName,
                Quantity = oi.Quantity,
                Unit = oi.Unit,
                UnitPrice = oi.UnitPrice,
                TotalPrice = oi.TotalPrice,
                Notes = oi.Notes
            }).ToList(),
            CreatedAt = createdOrder.CreatedAt
        });
    }

    // PUT: api/orders/5/status
    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(int id, [FromBody] string status)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        order.Status = status;
        order.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/orders/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteOrder(int id)
    {
        var order = await _context.Orders.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }

        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
