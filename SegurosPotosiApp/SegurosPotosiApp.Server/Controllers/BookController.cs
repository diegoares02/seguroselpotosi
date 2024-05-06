using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BookController : Controller
    {
        private readonly IBook _book;
        public BookController(IBook book, SegurosPotosiContext context)
        {
            _book = book;
            _book.SetContext(context);
        }
        [HttpGet]
        public string Index()
        {
            return JsonSerializer.Serialize(_book.GetBooks());
        }
        [HttpPost]
        public string Create(Book book)
        {
            return _book.Add(book) ? "Book created successfully" : "An error ocurred during the book creation";
        }
        [HttpPut]
        public string Update(Book book)
        {
            return _book.Update(book) ? "Book updated successfully" : "An error ocurred during the book update";
        }
        [HttpDelete]
        public string Delete(string ISBN)
        {
            return _book.Delete(ISBN) ? "Book deleted successfully" : "An error ocurred during the book delete";
        }
    }
}
