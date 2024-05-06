using System.Collections.Generic;
using System.Linq;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Models
{
    public class User : IUser
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public IEnumerable<Loan> Loans { get; set; }

        private SegurosPotosiContext _context;

        public bool Add(User user)
        {
            var userFound = _context.Users.Where(x => x.Email == user.Email).Count();
            if (userFound > 0) return false;
            _context.Add(user);
            return _context.SaveChanges() > 0;
        }

        public bool Update(User user)
        {
            var userFound = _context.Users.Where(x => x.Email == user.Email).FirstOrDefault();
            if (userFound != null)
            {
                userFound.Name = user.Name;
                userFound.Lastname = user.Lastname;
                _context.Update(userFound);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public bool Delete(string email)
        {
            var user = _context.Users.Where(x => x.Email == email).FirstOrDefault();
            if (user != null) return false;
            _context.Users.Remove(user);
            return user != null;
        }

        public List<User> GetUsers()
        {
            return _context.Users.ToList();
        }

        public void SetContext(SegurosPotosiContext context)
        {
            _context = context;
        }

        public bool Login(User user)
        {
            var userFound = _context.Users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
            return userFound != null;
        }
    }
}
