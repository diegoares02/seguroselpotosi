using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using SegurosPotosiLibrary.Models;

namespace SegurosPotosiLibrary.SegurosDbContext
{
    public class SegurosPotosiContext:DbContext
    {
        public SegurosPotosiContext(DbContextOptions<SegurosPotosiContext> options) : base(options)
        {
            
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Book> Books { get; set; }
    }
}
