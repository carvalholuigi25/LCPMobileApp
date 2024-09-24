using Microsoft.EntityFrameworkCore;

namespace LCPMobileAppApi.Context;

public class MDBContextMySQL : MDBContext
{   
    private readonly IConfiguration _config;

    public MDBContextMySQL(DbContextOptions<MDBContextMySQL> options, IConfiguration config) : base(options, config)
    {
        _config = config;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if(!optionsBuilder.IsConfigured) {
            optionsBuilder.UseMySql(_config.GetConnectionString("MySQL")!, new MySqlServerVersion(new Version()));
        }

        base.OnConfiguring(optionsBuilder);
    }
}