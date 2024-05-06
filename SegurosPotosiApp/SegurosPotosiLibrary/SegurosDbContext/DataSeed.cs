using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SegurosPotosiLibrary.Models;

namespace SegurosPotosiLibrary.SegurosDbContext
{
    public class DataSeed
    {
        public static void Seed(SegurosPotosiContext context)
        {
            if (!context.Users.Any())
            {
                var user = new List<User>
            {
                new User()
                {
                    UserId =1,
                    Name="test",
                    Lastname = "test",
                    Email="test@test.com",
                    Password="test"
                }
            };
                context.AddRange(user);
                context.SaveChanges();
            }
        }
    }
}
