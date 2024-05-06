using Microsoft.EntityFrameworkCore;
using SegurosPotosiLibrary.Models;

namespace SegurosPotosiLibrary.SegurosDbContext
{
    public class SegurosPotosiContext : DbContext
    {
        public SegurosPotosiContext(DbContextOptions<SegurosPotosiContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasData(
                new User()
                {
                    UserId = 1,
                    Name = "test",
                    Lastname = "test",
                    Email = "test@test.com",
                    Password = "test"
                });
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get; set; }
        public DbSet<Loan> Loans { get; set; }


    }
}
