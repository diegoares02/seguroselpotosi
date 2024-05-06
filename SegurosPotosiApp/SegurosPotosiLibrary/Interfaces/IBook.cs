using System.Collections.Generic;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Interfaces
{
    public interface IBook
    {
        List<Book> GetBooks();
        bool Add(Book book);
        bool Update(Book book);
        bool Delete(string name);
        void SetContext(SegurosPotosiContext context);
    }
}
