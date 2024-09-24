using Microsoft.EntityFrameworkCore;

namespace LCPMobileAppApi.Context;

public class MDBContextSQLite : MDBContext
{   
    private readonly IConfiguration _config;

    public MDBContextSQLite(DbContextOptions<MDBContextSQLite> options, IConfiguration config) : base(options, config)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured) {
            optionsBuilder.UseSqlite(_config.GetConnectionString("SQLite")!);
        }

        base.OnConfiguring(optionsBuilder);
    }
}