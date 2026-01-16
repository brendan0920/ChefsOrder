using ChefsOrder.Api.Data;
using ChefsOrder.Api.DTOs;
using ChefsOrder.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace ChefsOrder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly ChefsOrderDbContext _context;

    public UsersController(ChefsOrderDbContext context)
    {
        _context = context;
    }

    // GET: api/users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _context.Users
            .OrderBy(u => u.Username)
            .ToListAsync();

        return Ok(users.Select(u => new UserDto
        {
            Id = u.Id,
            Username = u.Username,
            Email = u.Email,
            FirstName = u.FirstName,
            LastName = u.LastName,
            PhoneNumber = u.PhoneNumber,
            RestaurantName = u.RestaurantName,
            CreatedAt = u.CreatedAt
        }));
    }

    // GET: api/users/5
    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return Ok(new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            PhoneNumber = user.PhoneNumber,
            RestaurantName = user.RestaurantName,
            CreatedAt = user.CreatedAt
        });
    }

    // POST: api/users
    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        // Check if username or email already exists
        if (await _context.Users.AnyAsync(u => u.Username == createUserDto.Username))
        {
            return BadRequest("Username already exists");
        }

        if (await _context.Users.AnyAsync(u => u.Email == createUserDto.Email))
        {
            return BadRequest("Email already exists");
        }

        // Hash password (simple SHA256 for now - in production, use bcrypt or similar)
        var passwordHash = HashPassword(createUserDto.Password);

        var user = new User
        {
            Username = createUserDto.Username,
            Email = createUserDto.Email,
            PasswordHash = passwordHash,
            FirstName = createUserDto.FirstName,
            LastName = createUserDto.LastName,
            PhoneNumber = createUserDto.PhoneNumber,
            RestaurantName = createUserDto.RestaurantName,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserDto
        {
            Id = user.Id,
            Username = user.Username,
            Email = user.Email,
            FirstName = user.FirstName,
            LastName = user.LastName,
            PhoneNumber = user.PhoneNumber,
            RestaurantName = user.RestaurantName,
            CreatedAt = user.CreatedAt
        });
    }

    // PUT: api/users/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UserDto userDto)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        user.Email = userDto.Email;
        user.FirstName = userDto.FirstName;
        user.LastName = userDto.LastName;
        user.PhoneNumber = userDto.PhoneNumber;
        user.RestaurantName = userDto.RestaurantName;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/users/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(hashedBytes);
    }
}
