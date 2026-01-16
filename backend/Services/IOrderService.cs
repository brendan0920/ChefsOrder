using ChefsOrder.Api.DTOs;

namespace ChefsOrder.Api.Services;

public interface IOrderService
{
    Task<IEnumerable<OrderDto>> GetOrdersAsync(int? userId = null);
    Task<OrderDto?> GetOrderByIdAsync(int id);
    Task<OrderDto> CreateOrderAsync(CreateOrderDto createOrderDto, int userId);
    Task<bool> UpdateOrderStatusAsync(int id, string status);
    Task<bool> DeleteOrderAsync(int id);
}
