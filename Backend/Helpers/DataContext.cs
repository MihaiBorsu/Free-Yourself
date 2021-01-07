using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using WebApi.Entities;

namespace WebApi.Helpers
{
    public class DataContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public DataContext(): base()
        {
        }

         protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=tcp:freeyourselfserver.database.windows.net,1433;Initial Catalog=FreeYourselfDb;Persist Security Info=False;User ID=freeyourself;Password=Password1!;MultipleActiveResultSets=True;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        public DataContext(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // protected override void OnConfiguring(DbContextOptionsBuilder options)
        // {
        //     // connect to sql server database
        //     options.UseSqlServer(Configuration.GetConnectionString("WebApiDatabase"));
        // }

        public DbSet<Vehicle> Vehicles { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Guild> Guilds { get; set; }

        public DbSet<Workout> Workouts { get; set; }

        // public DbSet<Vehicle> Vehicles { get; set; }
        // public DbSet<Guild> Guilds { get; set; }
    }
}