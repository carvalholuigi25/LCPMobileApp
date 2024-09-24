using System.Text.Json.Serialization;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Helpers;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Repositories;
using LCPMobileAppApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using NSwag;
using NSwag.Generation.Processors.Security;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var env = builder.Environment;

if (config.GetSection("DefDBMode").Value == "MySQL")
{
    builder.Services.AddDbContext<MDBContext, MDBContextMySQL>();
}
else if (config.GetSection("DefDBMode").Value == "PostgresSQL")
{
    builder.Services.AddDbContext<MDBContext, MDBContextPostgresSQL>();
}
else if (config.GetSection("DefDBMode").Value == "SQLite")
{
    builder.Services.AddDbContext<MDBContext, MDBContextSQLite>();
}
else if (config.GetSection("DefDBMode").Value == "SQLServer")
{
    builder.Services.AddDbContext<MDBContext, MDBContextSQLServer>();
}
else
{
    builder.Services.AddDbContext<MDBContext>();
}

builder.Services.AddCors();

builder.Services.AddControllers()
    .AddJsonOptions(x =>
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull
    );

builder.Services.AddOpenApiDocument(options =>
{
    options.PostProcess = document =>
    {
        document.Info = new NSwag.OpenApiInfo
        {
            Version = "v1",
            Title = "LCPMobileApp API",
            Description = "LCPMobileApp API",
            TermsOfService = "https://github.com/carvalholuigi25/LCPMobileApp",
            Contact = new NSwag.OpenApiContact
            {
                Name = "LCPMobileApp API Contact",
                Url = "https://github.com/carvalholuigi25/LCPMobileApp"
            },
            License = new NSwag.OpenApiLicense
            {
                Name = "LCPMobileApp API License",
                Url = "https://github.com/carvalholuigi25/LCPMobileApp"
            }
        };
    };

    options.AddSecurity("Bearer", Enumerable.Empty<string>(), new OpenApiSecurityScheme
    {
        Type = OpenApiSecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        BearerFormat = "JWT", 
        Description = "Type into the textbox: {your JWT token}."
    });

    options.OperationProcessors.Add(new AspNetCoreOperationSecurityScopeProcessor("Bearer"));
});

builder.Services.Configure<AppSettings>(config.GetSection("AppSettings"));

builder.Services.AddScoped<IUsersRepo, UsersRepo>();
builder.Services.AddScoped<IJwtUtils, JwtUtils>();
builder.Services.AddScoped<IUserService, UserService>();

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
app.UseAuthentication();

app.UseCors(x => x
    .SetIsOriginAllowed(origin => true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.UseMiddleware<ErrorHandlerMiddleware>();

app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
