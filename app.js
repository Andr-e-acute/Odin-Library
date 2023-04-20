const myLibary=[];

// todo change to class syntax
function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function info () {
    return `${title} by  ${author},${pages} pages, ${
      read ? "already read" : "not read yet"
    }`;
  };
}
// const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

function addBookToLibary(title,author,pages,read){
  const newBook =new Book(title, author, pages,read);
  myLibary.push(newBook);
}