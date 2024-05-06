using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using SegurosPotosiLibrary.Interfaces;
using SegurosPotosiLibrary.Models;
using SegurosPotosiLibrary.SegurosDbContext;

namespace SegurosPotosiApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : Controller
    {
        private readonly IAuthor _author;
        public AuthorController(IAuthor author, SegurosPotosiContext context)
        {
            _author = author;
            _author.SetContext(context);
        }
        [HttpGet]
        public string Index()
        {
            return JsonSerializer.Serialize(_author.GetAuthorList());
        }
        [HttpPost]
        public string Create(Author author)
        {
            return _author.Add(author) ? "Author created successfully" : "An error ocurred during the author creation";
        }
        [HttpPut]
        public string Update(Author author)
        {
            return _author.Update(author) ? "Author updated successfully" : "An error ocurred during the author update";
        }
        [HttpDelete]
        public string Delete(string DNI)
        {
            return _author.Delete(DNI) ? "Author deleted successfully" : "An error ocurred during the author delete";
        }
    }
}
