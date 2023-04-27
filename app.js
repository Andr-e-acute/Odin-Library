const library = [];
const bookshelf = document.querySelector("#bookshelf");
const addCard = bookshelf.querySelector(".display-form.book");

const addFormButtons = document.querySelectorAll(".display-form");
const form = document.querySelector("#form");
const hideFormButtons = document.querySelectorAll(".hide-form");

const toggleButtonDisplay= document.querySelector('.circleButton.display-form');
const toggleButtonHide= document.querySelector('.circleButton.hide-form');


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

// add display form Buttons
function displayForm() {
  form.classList = "";
  toggleButtonDisplay.style.display='none';
  toggleButtonHide.style.display='';
}
function hideForm() {
  form.classList = "display-none";
  toggleButtonDisplay.style.display='';
  toggleButtonHide.style.display='none';

}
hideFormButtons.forEach((button) => {
  button.addEventListener("click", hideForm);
});
addFormButtons.forEach((button) => {
  button.addEventListener("click", displayForm);
});

// display books on site

function displayBooks() {
  // deletes the add + card.
  // bookshelf.innerText = "";

  library.forEach((bookElement) => {
    const book = document.createElement("div");
    book.classList.add("book");

    Object.keys(bookElement).forEach((property) => {
      const prop = document.createElement("div");
      prop.classList.add(`${property}`);
      if (property === "status") {
        prop.classList.add(`${bookElement[property]}`);
      } else {
        prop.innerText = bookElement[property];
      }
      book.appendChild(prop);
    });
    // todo insert before  or after add Card

    // bookshelf.appendChild(book);
    bookshelf.insertBefore(book, addCard);
  });
}
displayBooks();
