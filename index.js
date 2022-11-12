const CREATE = document.querySelector("button");
let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages ${this.read}`;
    };
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBook() {
    for (let i = 0; i < myLibrary.length; i++) {
        const TABLE = document.querySelector("tbody");
        const ROW = document.createElement("tr");
        const TITLE = document.createElement("td");
        const AUTHOR = document.createElement("td");
        const PAGES = document.createElement("td");
        const READ = document.createElement("td");

        TITLE.textContent = myLibrary[i].title;
        AUTHOR.textContent = myLibrary[i].author;
        PAGES.textContent = myLibrary[i].pages;
        READ.textContent = myLibrary[i].read;

        ROW.appendChild(TITLE);
        ROW.appendChild(AUTHOR);
        ROW.appendChild(PAGES);
        ROW.appendChild(READ);

        TABLE.appendChild(ROW);
    }
}

CREATE.addEventListener("click", function () {
    addBookToLibrary(prompt("Title?"), prompt("Author?"), prompt("Pages?"), prompt("Read?"));
    displayBook();
});
