using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Models;

namespace LCPMobileAppApi.Context;

public class MDBContext : DbContext
{   
    private readonly IConfiguration _config;

    public MDBContext(DbContextOptions<MDBContext> options, IConfiguration config) : base(options)
    {
        _config = config;
    }

    public DbSet<User> Users { get; set; } = null!;

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var defdbm = _config.GetSection("DefDBMode").Value ?? "MemoryDB";

        if(defdbm == "SQLite") {
            optionsBuilder.UseSqlite(_config.GetConnectionString("SQLite")!);
        } else if(defdbm == "SQLServer") {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("SQLServer")!);
        } else if(defdbm == "PostgresSQL") {
            optionsBuilder.UseNpgsql(_config.GetConnectionString("PostgresSQL")!);
        }  else if(defdbm == "MySQL") {
            optionsBuilder.UseMySql(_config.GetConnectionString("MySQL")!, new MySqlServerVersion(new Version()));
        } else {
            optionsBuilder.UseInMemoryDatabase("DBContext");
        }
    }

    public static async Task InitializeAsync(MDBContext db)
    {
        await db.Database.MigrateAsync();
        
        // already seeded
        if (db.Users.Any())
            return;
    }
}