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

class Book {
  constructor(title = "", author = "", pages = "", status = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

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
function validateNewBook() {
  console.log("validateNewBook called");
}

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
        // status is special refractor?
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
        }
        // create title author pages
        else {
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
displayBooks();

// eventListeners
hideFormButtons.forEach((button) => {
  button.addEventListener("click", hideForm);
});
addFormButtons.forEach((button) => {
  button.addEventListener("click", displayForm);
});
addBookButton.addEventListener("click", (e) => {
  const actForm = e.target.closest(".form-container").querySelector("form");
  const inputElements = [...actForm.querySelectorAll("input")];
  const valid = inputElements.every((input) => input.validity.valid);

  if (valid) {
    addBookToLibrary(
      document.getElementById("title").value,
      document.getElementById("author").value,
      document.getElementById("pages").value,
      document.getElementById("status").checked
    );
    hideForm();
    displayBooks();
  } else {
    const errorText = "Please fill all the fields";
    const parentContainer = e.target.closest("div");
    console.log(parentContainer);
    const error = document.querySelector(".error");
    error.classList.add("active");
    error.textContent = errorText;
    parentContainer
      .closest(".form-container")
      .insertBefore(error, parentContainer);
  }
});
