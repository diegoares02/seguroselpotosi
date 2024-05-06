using System.Collections.Generic;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiLibrary.Interfaces
{
    public interface IAuthor
    {
        List<Author> GetAuthorList();
        bool Add(Author user);
        bool Update(Author user);
        bool Delete(string name);
        void SetContext(SegurosPotosiContext context);
    }
}
