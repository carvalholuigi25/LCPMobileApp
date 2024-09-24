using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Models;

namespace LCPMobileAppApi.Context;

public class MDBContext : DbContext
{   
    private readonly IConfiguration _config;

    public MDBContext(DbContextOptions options, IConfiguration config) : base(options)
    {
        _config = config;
    }

    public DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured) {
            var defdbm = _config.GetSection("DefDBMode").Value ?? "MemoryDB";

            if(defdbm == "MemoryDB") {
                optionsBuilder.UseInMemoryDatabase("DBContext");
            }
        }

        base.OnConfiguring(optionsBuilder);
    }
}