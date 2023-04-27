const library = [];
const bookshelf = document.querySelector("#bookshelf");
const addCard = bookshelf.querySelector(".display-form.bookCard");

const addFormButtons = document.querySelectorAll(".display-form");
const form = document.querySelector("#form");
const hideFormButtons = document.querySelectorAll(".hide-form");

const toggleButtonDisplay = document.querySelector(
  ".circleButton.display-form"
);
const toggleButtonHide = document.querySelector(".circleButton.hide-form");
const addBookButton = document.querySelector("#add-book");

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
function deleteBook(parentElement) {
  const index = parentElement.id.slice(-1);
  library.splice(index, 1);
  parentElement.remove();
}
function toggleStatus(e) {
  const index = e.parentElement.parentElement.id.slice(-1);
  library[index].status = !library[index].status;
  e.classList = `read-${library[index].status}`;
  e.innerText = library[index].status ? "read" : " not read";
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

function displayBooks() {
  for (let i = 0; i < library.length; i += 1) {
    // only add when there is no such book
    if (!document.getElementById(`bookId${i}`)) {
      const book = document.createElement("div");
      book.classList = "book bookCard";
      book.setAttribute("id", `bookId${i}`);
      // loop over each property and create corespondent div's
      Object.keys(library[i]).forEach((property) => {
        // status is special
        if (property === "status") {
          const statusButtons = document.createElement("div");
          statusButtons.classList = "statusButtons";

          const statusButton = document.createElement("button");
          statusButton.setAttribute("type", "button");
          statusButton.classList = `read-${library[i][property]}`;
          statusButton.innerText = library[i][property] ? "read" : " not read";

          const deleteButton = document.createElement("button");
          deleteButton.setAttribute("type", "button");
          deleteButton.classList = "delete-Card";
          deleteButton.innerText = "delete";
          deleteButton.addEventListener("click", (e) => {
            deleteBook(e.target.parentElement.parentElement);
          });
          statusButtons.appendChild(statusButton);
          statusButtons.appendChild(deleteButton);
          statusButton.addEventListener("click", (e) => {
            toggleStatus(e.target);
          });
          book.appendChild(statusButtons);
        } else {
          const prop = document.createElement("div");
          prop.classList.add(`${property}`);
          prop.innerText = library[i][property];
          book.appendChild(prop);
        }
      });

      bookshelf.insertBefore(book, addCard);
    }
  }
}
displayBooks();
// add display form Buttons
function displayForm() {
  form.classList = "";
  toggleButtonDisplay.style.display = "none";
  toggleButtonHide.style.display = "";
}
function hideForm() {
  form.classList = "display-none";
  toggleButtonDisplay.style.display = "";
  toggleButtonHide.style.display = "none";
}
hideFormButtons.forEach((button) => {
  button.addEventListener("click", hideForm);
});
addFormButtons.forEach((button) => {
  button.addEventListener("click", displayForm);
});
addBookButton.addEventListener("click", () => {
  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("status").checked
  );
  hideForm();
  displayBooks();
});
