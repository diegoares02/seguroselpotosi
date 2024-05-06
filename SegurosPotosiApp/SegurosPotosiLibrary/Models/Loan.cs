using System;
using System.Linq;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Models
{
    public class Loan : ILoan
    {
        public int LoanId { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime LoanDate { get; set; }
        public DateTime ExpectedReturnDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public Book Book { get; set; }
        public User User { get; set; }

        private SegurosPotosiContext _context;

        public void SetContext(SegurosPotosiContext context)
        {
            _context = context;
        }

        public bool BorrowBook(string ISBN, string email, DateTime loanDate, DateTime expectedReturnDate)
        {
            Loan loan = new Loan();
            Book book = _context.Books.FirstOrDefault(x => x.ISBN == ISBN);
            User user = _context.Users.FirstOrDefault(x => x.Email == email);
            if (book.AvailableCopy == 0) return false;
            loan.BookId = book.BookId;
            loan.UserId = user.UserId;
            loan.LoanDate = loanDate;
            loan.ExpectedReturnDate = expectedReturnDate;
            loan.ReturnDate = null;
            book.AvailableCopy -= 1;
            _context.Books.Update(book);
            _context.Loans.Add(loan);
            return _context.SaveChanges() > 0;
        }

        public bool ReturnBook(string ISBN, string email, DateTime loanDate, DateTime returnDate)
        {
            Book book = _context.Books.FirstOrDefault(x => x.ISBN == ISBN);
            User user = _context.Users.FirstOrDefault(x => x.Email == email);
            Loan loan = _context.Loans.FirstOrDefault(x => x.BookId == book.BookId && x.UserId == user.UserId && x.LoanDate == loanDate);
            if (loan != null) return false;
            loan.ReturnDate = returnDate;
            book.AvailableCopy += 1;
            _context.Books.Update(book);
            _context.Loans.Update(loan);
            return _context.SaveChanges() > 0;
        }
    }
}
