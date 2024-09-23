using LCPMobileAppApi.Context;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Repositories;
using Microsoft.EntityFrameworkCore;
using NSwag;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<MDBContext>();
builder.Services.AddControllers();
builder.Services.AddOpenApiDocument(options => {
     options.PostProcess = document =>
     {
         document.Info = new OpenApiInfo
         {
             Version = "v1",
             Title = "LCPMobileApp API",
             Description = "LCPMobileApp API",
             TermsOfService = "https://github.com/carvalholuigi25/LCPMobileApp",
             Contact = new OpenApiContact
             {
                 Name = "LCPMobileApp API Contact",
                 Url = "https://github.com/carvalholuigi25/LCPMobileApp"
             },
             License = new OpenApiLicense
             {
                 Name = "LCPMobileApp API License",
                 Url = "https://github.com/carvalholuigi25/LCPMobileApp"
             }
         };
     };
});

builder.Services.AddScoped<IUsersRepo, UsersRepo>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();

    app.UseReDoc(options =>
    {
        options.Path = "/redoc";
    });
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// using (var scope = app.Services.CreateScope()) {
//     var db = scope.ServiceProvider.GetRequiredService<MDBContext>();
//     await MDBContext.InitializeAsync(db);
// }

app.Run();
