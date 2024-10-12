using AspNetCoreRateLimit;
using LCPMobileAppApi.Authorization;
using LCPMobileAppApi.Context;
using LCPMobileAppApi.Functions;
using LCPMobileAppApi.Helpers;
using LCPMobileAppApi.Hubs;
using LCPMobileAppApi.Interfaces;
using LCPMobileAppApi.Localization;
using LCPMobileAppApi.Operations;
using LCPMobileAppApi.Repositories;
using LCPMobileAppApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Localization;
using NSwag;
using NSwag.Generation.Processors.Security;
using Serilog;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
var env = builder.Environment;

var logger = new LoggerConfiguration()
    .ReadFrom.Configuration(config)
    .Enrich.FromLogContext()
    .CreateLogger();

builder.Logging.ClearProviders();
builder.Logging.AddSerilog(logger);

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

builder.Services.AddRouting(options => options.LowercaseUrls = true);

builder.Services.AddControllers()
    .AddJsonOptions(x => {
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

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
    options.OperationProcessors.Add(new ExcludeSpecificActionsProcessor());
});

builder.Services.AddEndpointsApiExplorer();

builder.Services.Configure<AppSettings>(config.GetSection("AppSettings"));

builder.Services.AddScoped<IUsersRepo, UsersRepo>();
builder.Services.AddScoped<IJwtUtils, JwtUtils>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddLocalization();
builder.Services.AddSingleton<LocalizationMiddleware>();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddMemoryCache();
builder.Services.AddSingleton<IStringLocalizerFactory, JsonStringLocalizerFactory>();

builder.Services.Configure<IpRateLimitOptions>(builder.Configuration.GetSection("IpRateLimiting"));
builder.Services.AddSingleton<IRateLimitConfiguration, RateLimitConfiguration>();
builder.Services.AddInMemoryRateLimiting();

builder.Services.AddSignalR();

var app = builder.Build();

var supportedCultures = await Functions.GetLanguagesCultureList();

var options = new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture(supportedCultures[0], supportedCultures[0]),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures,
    RequestCultureProviders = new List<IRequestCultureProvider>
    {
        new QueryStringRequestCultureProvider(),
        new CookieRequestCultureProvider()
    }
};

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseCors(x => x
    .SetIsOriginAllowed(origin => true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());

app.UseRequestLocalization(options);
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseMiddleware<LocalizationMiddleware>();
app.UseHttpsRedirection();
app.UseIpRateLimiting();
app.UseAuthorization();
app.UseAuthentication();

app.UseOpenApi();
app.UseSwaggerUi(settings => 
{
    settings.PersistAuthorization = true;
});

app.UseReDoc(options =>
{
    options.Path = "/docs";
});

app.UseMiddleware<ErrorHandlerMiddleware>();
app.UseMiddleware<JwtMiddleware>();

app.MapControllers();
app.MapHub<ChatHub>("/chathub");

app.Run();
