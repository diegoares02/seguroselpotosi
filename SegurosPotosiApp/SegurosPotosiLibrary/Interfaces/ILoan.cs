using System;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Interfaces
{
    public interface ILoan
    {
        bool BorrowBook(string ISBN,string email,DateTime loanDate, DateTime expectedReturnDate);
        bool ReturnBook(string ISBN, string email, DateTime loanDate, DateTime returnDate);
        void SetContext(SegurosPotosiContext context);
    }
}
