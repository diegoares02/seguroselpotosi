using System.Collections.Generic;
using System.Linq;
using SegurosPotosiLibrary.Base;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Models
{
    public class Author : Person, IAuthor
    {
        public int AuthorId { get; set; }
        public IEnumerable<Book> Books { get; set; }

        private SegurosPotosiContext _context;

        public bool Add(Author author)
        {
            var userFound = _context.Authors.Where(x => x.DNI == author.DNI).Count();
            if (userFound > 0) return false;
            _context.Add(author);
            return _context.SaveChanges() > 0;
        }

        public bool Update(Author author)
        {
            var authorFound = _context.Authors.Where(x => x.DNI == author.DNI).FirstOrDefault();
            if (authorFound != null)
            {
                authorFound.Name = author.Name;
                authorFound.Lastname = author.Lastname;
                _context.Update(authorFound);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public bool Delete(string authorDNI)
        {
            var author = _context.Authors.Where(x => x.DNI == authorDNI).FirstOrDefault();
            if (author != null) return false;
            _context.Authors.Remove(author);
            return author != null;
        }

        public void SetContext(SegurosPotosiContext context)
        {
            _context = context;
        }

        public List<Author> GetAuthorList()
        {
            return _context.Authors.ToList();
        }
    }
}
