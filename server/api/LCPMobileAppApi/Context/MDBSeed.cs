using LCPMobileAppApi.Models;
using LCPMobileAppApi.Models.Enums;
using Microsoft.EntityFrameworkCore;

public class MDBSeed
{
    private readonly ModelBuilder _modelBuilder;
    
    public MDBSeed(ModelBuilder modelBuilder)
    {
        _modelBuilder = modelBuilder;
    }

    public void Seed(bool isseed = false)
    {
        if(isseed) {
            _modelBuilder.Entity<User>().HasData(
                new User() { 
                    User_Id = 1, 
                    Username = "admin", 
                    FirstName = "Luis", 
                    LastName = "Carvalho", 
                    Password = BCrypt.Net.BCrypt.HashPassword("1234", 10, false), 
                    Role = EUsersRoles.admin 
                }
            );
        }
    }
}
