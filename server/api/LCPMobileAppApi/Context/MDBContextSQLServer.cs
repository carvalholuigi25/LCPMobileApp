using Microsoft.EntityFrameworkCore;

namespace LCPMobileAppApi.Context;

public class MDBContextSQLServer : MDBContext
{   
    private readonly IConfiguration _config;

    public MDBContextSQLServer(DbContextOptions<MDBContextSQLServer> options, IConfiguration config) : base(options, config)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured) {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("SQLServer")!);
        }

        base.OnConfiguring(optionsBuilder);
    }
}