using System.Collections.Generic;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Interfaces
{
    public interface IUser
    {
        List<User> GetUsers();
        bool Add(User user);
        bool Update(User user);
        bool Delete(string email);
        bool Login(User user);
        void SetContext(SegurosPotosiContext context);
    }
}
