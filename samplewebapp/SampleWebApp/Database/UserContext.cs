using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

public interface IUserContext
{
    DbSet<User> Users { get; set; }
}


public class UserContext : DbContext, IUserContext
{
    IOptions<AppConfiguration> _appSettings;

    public UserContext(DbContextOptions options, IOptions<AppConfiguration> appSettings) : base(options)
    {
        _appSettings = appSettings;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_appSettings.Value.DatabaseConnectionString);
    }

    public DbSet<User> Users { get; set; }
}