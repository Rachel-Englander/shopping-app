using Data.Entities;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;

namespace Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(b =>
            {
                b.Property(x => x.Name).IsRequired();
                b.HasData(
                    new Category { Id = 100, Name = "חלב" },
                    new Category { Id = 200, Name = "בשר" },
                    new Category { Id = 300, Name = "דגים" });
            });
        }
    }
}
