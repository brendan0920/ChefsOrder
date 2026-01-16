using ChefsOrder.Api.Data;
using ChefsOrder.Api.DTOs;
using ChefsOrder.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChefsOrder.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VendorsController : ControllerBase
{
    private readonly ChefsOrderDbContext _context;

    public VendorsController(ChefsOrderDbContext context)
    {
        _context = context;
    }

    // GET: api/vendors
    [HttpGet]
    public async Task<ActionResult<IEnumerable<VendorDto>>> GetVendors([FromQuery] bool? activeOnly = null)
    {
        var query = _context.Vendors.AsQueryable();

        if (activeOnly == true)
        {
            query = query.Where(v => v.IsActive);
        }

        var vendors = await query
            .OrderBy(v => v.Name)
            .ToListAsync();

        return Ok(vendors.Select(v => new VendorDto
        {
            Id = v.Id,
            Name = v.Name,
            Email = v.Email,
            PhoneNumber = v.PhoneNumber,
            Address = v.Address,
            ContactPerson = v.ContactPerson,
            Notes = v.Notes,
            IsActive = v.IsActive,
            CreatedAt = v.CreatedAt
        }));
    }

    // GET: api/vendors/5
    [HttpGet("{id}")]
    public async Task<ActionResult<VendorDto>> GetVendor(int id)
    {
        var vendor = await _context.Vendors.FindAsync(id);

        if (vendor == null)
        {
            return NotFound();
        }

        return Ok(new VendorDto
        {
            Id = vendor.Id,
            Name = vendor.Name,
            Email = vendor.Email,
            PhoneNumber = vendor.PhoneNumber,
            Address = vendor.Address,
            ContactPerson = vendor.ContactPerson,
            Notes = vendor.Notes,
            IsActive = vendor.IsActive,
            CreatedAt = vendor.CreatedAt
        });
    }

    // POST: api/vendors
    [HttpPost]
    public async Task<ActionResult<VendorDto>> CreateVendor([FromBody] CreateVendorDto createVendorDto)
    {
        var vendor = new Vendor
        {
            Name = createVendorDto.Name,
            Email = createVendorDto.Email,
            PhoneNumber = createVendorDto.PhoneNumber,
            Address = createVendorDto.Address,
            ContactPerson = createVendorDto.ContactPerson,
            Notes = createVendorDto.Notes,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Vendors.Add(vendor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetVendor), new { id = vendor.Id }, new VendorDto
        {
            Id = vendor.Id,
            Name = vendor.Name,
            Email = vendor.Email,
            PhoneNumber = vendor.PhoneNumber,
            Address = vendor.Address,
            ContactPerson = vendor.ContactPerson,
            Notes = vendor.Notes,
            IsActive = vendor.IsActive,
            CreatedAt = vendor.CreatedAt
        });
    }

    // PUT: api/vendors/5
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVendor(int id, [FromBody] UpdateVendorDto updateVendorDto)
    {
        var vendor = await _context.Vendors.FindAsync(id);
        if (vendor == null)
        {
            return NotFound();
        }

        vendor.Name = updateVendorDto.Name;
        vendor.Email = updateVendorDto.Email;
        vendor.PhoneNumber = updateVendorDto.PhoneNumber;
        vendor.Address = updateVendorDto.Address;
        vendor.ContactPerson = updateVendorDto.ContactPerson;
        vendor.Notes = updateVendorDto.Notes;
        vendor.IsActive = updateVendorDto.IsActive;
        vendor.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    // DELETE: api/vendors/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVendor(int id)
    {
        var vendor = await _context.Vendors.FindAsync(id);
        if (vendor == null)
        {
            return NotFound();
        }

        _context.Vendors.Remove(vendor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
