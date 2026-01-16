using ChefsOrder.Api.Data;
using ChefsOrder.Api.DTOs;
using ChefsOrder.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChefsOrder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MessagesController : ControllerBase
{
    private readonly ChefsOrderDbContext _context;

    public MessagesController(ChefsOrderDbContext context)
    {
        _context = context;
    }

    // GET: api/messages
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MessageDto>>> GetMessages([FromQuery] int? userId = null, [FromQuery] int? vendorId = null)
    {
        var query = _context.Messages
            .Include(m => m.User)
            .Include(m => m.Vendor)
            .AsQueryable();

        if (userId.HasValue)
        {
            query = query.Where(m => m.UserId == userId.Value);
        }

        if (vendorId.HasValue)
        {
            query = query.Where(m => m.VendorId == vendorId.Value);
        }

        var messages = await query
            .OrderByDescending(m => m.CreatedAt)
            .ToListAsync();

        return Ok(messages.Select(m => new MessageDto
        {
            Id = m.Id,
            UserId = m.UserId,
            UserName = m.User.Username,
            VendorId = m.VendorId,
            VendorName = m.Vendor?.Name,
            Subject = m.Subject,
            Content = m.Content,
            IsRead = m.IsRead,
            CreatedAt = m.CreatedAt
        }));
    }

    // GET: api/messages/5
    [HttpGet("{id}")]
    public async Task<ActionResult<MessageDto>> GetMessage(int id)
    {
        var message = await _context.Messages
            .Include(m => m.User)
            .Include(m => m.Vendor)
            .FirstOrDefaultAsync(m => m.Id == id);

        if (message == null)
        {
            return NotFound();
        }

        // Mark as read when retrieved
        message.IsRead = true;
        await _context.SaveChangesAsync();

        return Ok(new MessageDto
        {
            Id = message.Id,
            UserId = message.UserId,
            UserName = message.User.Username,
            VendorId = message.VendorId,
            VendorName = message.Vendor?.Name,
            Subject = message.Subject,
            Content = message.Content,
            IsRead = message.IsRead,
            CreatedAt = message.CreatedAt
        });
    }

    // POST: api/messages
    [HttpPost]
    public async Task<ActionResult<MessageDto>> CreateMessage([FromBody] CreateMessageDto createMessageDto)
    {
        // For now, using userId = 1 as default. In production, this should come from authentication
        var userId = 1;

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
        {
            return BadRequest("User not found");
        }

        Vendor? vendor = null;
        if (createMessageDto.VendorId.HasValue)
        {
            vendor = await _context.Vendors.FindAsync(createMessageDto.VendorId.Value);
            if (vendor == null)
            {
                return BadRequest("Vendor not found");
            }
        }

        var message = new Message
        {
            UserId = userId,
            VendorId = createMessageDto.VendorId,
            Subject = createMessageDto.Subject,
            Content = createMessageDto.Content,
            IsRead = false,
            CreatedAt = DateTime.UtcNow
        };

        _context.Messages.Add(message);
        await _context.SaveChangesAsync();

        var createdMessage = await _context.Messages
            .Include(m => m.User)
            .Include(m => m.Vendor)
            .FirstOrDefaultAsync(m => m.Id == message.Id);

        return CreatedAtAction(nameof(GetMessage), new { id = message.Id }, new MessageDto
        {
            Id = createdMessage!.Id,
            UserId = createdMessage.UserId,
            UserName = createdMessage.User.Username,
            VendorId = createdMessage.VendorId,
            VendorName = createdMessage.Vendor?.Name,
            Subject = createdMessage.Subject,
            Content = createdMessage.Content,
            IsRead = createdMessage.IsRead,
            CreatedAt = createdMessage.CreatedAt
        });
    }

    // PUT: api/messages/5/read
    [HttpPut("{id}/read")]
    public async Task<IActionResult> MarkAsRead(int id)
    {
        var message = await _context.Messages.FindAsync(id);
        if (message == null)
        {
            return NotFound();
        }

        message.IsRead = true;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/messages/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteMessage(int id)
    {
        var message = await _context.Messages.FindAsync(id);
        if (message == null)
        {
            return NotFound();
        }

        _context.Messages.Remove(message);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
