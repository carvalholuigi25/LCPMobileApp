using Microsoft.EntityFrameworkCore;

namespace LCPMobileAppApi.Context;

public class MDBContextPostgresSQL : MDBContext
{   
    private readonly IConfiguration _config;

    public MDBContextPostgresSQL(DbContextOptions<MDBContextPostgresSQL> options, IConfiguration config) : base(options, config)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured) {
            optionsBuilder.UseNpgsql(_config.GetConnectionString("PostgresSQL")!);
        }

        base.OnConfiguring(optionsBuilder);
    }
}