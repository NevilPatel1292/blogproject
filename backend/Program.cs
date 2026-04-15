using Microsoft.EntityFrameworkCore;
using Blogproj.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();

// PostgreSQL database
builder.Services.AddDbContext<BlogprojContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("BlogprojContext")));

// Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS (allow frontend)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

var app = builder.Build();
var port = Environment.GetEnvironmentVariable("PORT") ?? "10000";

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// ✅ Enable CORS
app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run($"http://0.0.0.0:{port}");
