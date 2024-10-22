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

    public DbSet<Department> Departments { get; set; } = null!;
    public DbSet<Invoice> Invoices { get; set; } = null!;
    public DbSet<Milestone> Milestones { get; set; } = null!;
    public DbSet<Order> Orders { get; set; } = null!;
    public DbSet<Payment> Payments { get; set; } = null!;
    public DbSet<Phase> Phases { get; set; } = null!;
    public DbSet<Project> Projects { get; set; } = null!;
    public DbSet<Review> Reviews { get; set; } = null!;
    public DbSet<Status> Status { get; set; } = null!;
    public DbSet<Team> Teams { get; set; } = null!;
    public DbSet<Technology> Technologies { get; set; } = null!;
    public DbSet<Ticket> Tickets { get; set; } = null!;
    public DbSet<TimeLog> TimeLogs { get; set; } = null!;
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        new MDBSeed(modelBuilder).Seed(false);
    }
}