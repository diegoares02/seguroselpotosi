using System;
using SegurosPotosiLibrary.Models;

namespace SegurosPotosiLibrary.Base
{
    public abstract class Person
    {
        public string DNI { get; set; }
        public string Name { get; set; }
        public string Lastname { get; set; }
        public int Age { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Avatar { get; set; }
    }
    public abstract class PersonFactory
    {
        public abstract Person GetPerson();
    }
    public class AuthorConstructor : PersonFactory
    {
        public override Person GetPerson()
        {
            return new Author();
        }
    }
}
