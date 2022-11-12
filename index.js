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

function addBookToLibrary() {
    myLibrary.push(new Book("Game Of Thrones", "Marcel Pavel", 123, "Nope"));
    myLibrary.push(new Book("Alice In Romania", "Grigore Lese", 326, "Yep"));
    myLibrary.push(new Book("Garcea", "Florin Salam", 27, "Nope"));
}
addBookToLibrary();

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

displayBook();
