using Microsoft.EntityFrameworkCore;
using SegurosPotosiLibrary.Models;

namespace SegurosPotosiLibrary.SegurosDbContext
{
    public interface ISegurosPotosiContext
    {
        DbSet<User> Users { get; set; }
        DbSet<Book> Books { get; set; }
        DbSet<Author> Authors { get; set; }
        DbSet<Loan> Loans { get; set; }
    }
    public class SegurosPotosiContext : DbContext,ISegurosPotosiContext
    {
        public SegurosPotosiContext(DbContextOptions<SegurosPotosiContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
        public DbSet<Author> Authors { get ; set; }
        public DbSet<Loan> Loans { get ; set; }

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
    }
}
