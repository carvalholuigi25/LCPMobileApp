using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Models;

namespace LCPMobileAppApi.Context;

public class DBContext : DbContext
{
    public DBContext(DbContextOptions<DBContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; } = null!;
}