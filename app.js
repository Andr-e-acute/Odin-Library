const library = [];

// todo change to class syntax
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  // this.info = function info () {
  //   return `${title} by  ${author},${pages} pages, ${
  //     read ? "already read" : "not read yet"
  //   }`;
  // };
}
// const book1 = new Book("The Hobbit", "J.R.R. Tolkien", 295, false);

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  library.push(newBook);
}
//  sample books
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("short", "s", 1, true);
addBookToLibrary(
  "Long book title 1234567891234567890",
  "Long book author 1234567891234567890",
  3412785098578,
  false
);
addBookToLibrary("default", "unread", 9999, false);
addBookToLibrary("default", "read", 1, true);

// display books on site

const bookshelf = document.querySelector("#bookshelf");
const addCard= bookshelf.querySelector('.add.book')

function displayBooks() {
  // deletes the add + card.
  // bookshelf.innerText = "";

  library.forEach((bookElement) => {
    const book = document.createElement("div");
    book.classList.add("book");
    
    Object.keys(bookElement).forEach((property) => {
      const prop = document.createElement("div");
      prop.classList.add(`${property}`);
      if(property==='status'){
        prop.classList.add(`${bookElement[property]}`)
      }
      else{
        prop.innerText = bookElement[property];
      }
      book.appendChild(prop);
      
    });
    //todo insert before  or after add Card 
    // bookshelf.appendChild(book);
    bookshelf.insertBefore(book,addCard)
  });
}
displayBooks();
