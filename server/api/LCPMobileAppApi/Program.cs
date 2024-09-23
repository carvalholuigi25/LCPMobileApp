using Microsoft.EntityFrameworkCore;
using LCPMobileAppApi.Context;
using NSwag;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

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

builder.Services.AddDbContext<DBContext>(opt =>
    opt.UseInMemoryDatabase("DBContext"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
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

app.Run();
