using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Models
{
    public class Book : IBook
    {
        public int BookId { get; set; }
        public string Title { get; set; }
        public int AuthorId { get; set; }
        public int YearPublished { get; set; }
        public string ISBN { get; set; }
        public int AvailableCopy { get; set; }
        public int TotalCopy { get; set; }
        public Author Author { get; set; }
        public IEnumerable<Loan> Loans { get; set; }

        private SegurosPotosiContext _context;
        public bool Add(Book book)
        {
            var bookFound = _context.Books.Where(x => x.ISBN == book.ISBN).Count();
            if (bookFound > 0) return false;
            _context.Add(book);
            return _context.SaveChanges() > 0;
        }

        public bool Update(Book book)
        {
            var bookFound = _context.Books.Where(x => x.ISBN == book.ISBN).FirstOrDefault();
            if (bookFound != null)
            {
                bookFound.AvailableCopy = book.AvailableCopy;
                bookFound.TotalCopy = book.TotalCopy;
                _context.Update(bookFound);
                return _context.SaveChanges() > 0;
            }
            return false;
        }

        public bool Delete(string ISBN)
        {
            var book = _context.Books.Where(x => x.ISBN == ISBN).FirstOrDefault();
            if (book != null) return false;
            _context.Books.Remove(book);
            return book != null;
        }

        public void SetContext(SegurosPotosiContext context)
        {
            _context = context;
        }

        public List<Book> GetBooks()
        {
            return _context.Books.ToList();
        }
    }
}
