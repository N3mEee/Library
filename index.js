const $createButton = document.querySelector(".button-create");
const $addButton = document.querySelector(".button-add");
const $cancelButton = document.querySelector(".button-cancel");
const $form = document.querySelector(".form-container");
const $theme = document.querySelector(".theme");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.changeReadStatus = function(){
    this.read ? this.read = false : this.read = true;
}

function getBooksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        const bookObj = JSON.parse(localStorage[`book${i}`]);
        myLibrary.push(new Book(bookObj.title, bookObj.author, bookObj.pages, bookObj.read));
    }
}
getBooksFromLocalStorage();

function setBooksToLocalStorage() {
    localStorage.clear();
    for (let i = 0; i < myLibrary.length; i++) {
        localStorage.setItem(`book${i}`, JSON.stringify(myLibrary[i]));
    }
}
setBooksToLocalStorage();

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
    setBooksToLocalStorage();
}

function displayBook() {
    const $tbody = document.querySelector("tbody");
    $tbody.innerHTML = ``;
    for (let i = 0; i < myLibrary.length; i++) {
        const $row = document.createElement("tr");
        const $title = document.createElement("td");
        const $author = document.createElement("td");
        const $pages = document.createElement("td");
        const $read = document.createElement("td");
        const $edit = document.createElement("td");

        $title.textContent = myLibrary[i].title;
        $author.textContent = myLibrary[i].author;
        $pages.textContent = myLibrary[i].pages;
        $read.textContent = myLibrary[i].read ? "read" : "not read";
        //TODO: create the buttons without innerHTML and $edit.appendChild(the buttons)
        $edit.innerHTML = `<button class="edit">Edit</button>
                           <button class="delete">Delete</button>`;
        $edit.children[0].setAttribute("data-id", `${i}`);
        $edit.children[1].setAttribute("data-id", `${i}`);

        $row.appendChild($title);
        $row.appendChild($author);
        $row.appendChild($pages);
        $row.appendChild($read);
        $row.appendChild($edit);

        $tbody.appendChild($row);
    }
}
displayBook();

function setTheme() {
    const $body = document.querySelector("body");
    const $a = document.querySelectorAll("a");
    const $header = document.querySelector(".header");
    const $container = document.querySelector(".container");
    $body.classList.toggle("light");
    $header.classList.toggle("light");
    $container.classList.toggle("light");
    $a.forEach((element) => {
        element.classList.toggle("light");
    });
    $theme.textContent === "Light" ? ($theme.textContent = "Dark") : ($theme.textContent = "Light");
}

$createButton.addEventListener("click", function () {
    if (!$form.classList.contains("form-container-show")) {
        $form.classList.add("form-container-show");
    } else {
        $form.classList.remove("form-container-show");
    }
});

$addButton.addEventListener("click", function (event) {
    event.preventDefault();
    const $inputTitle = document.querySelector("input[name=title]");
    const $inputAuthor = document.querySelector("input[name=author]");
    const $inputPages = document.querySelector("input[name=pages]");
    const $inputRead = document.querySelector("input[name=read]");
    if ($inputTitle.validity.valueMissing || $inputAuthor.validity.valueMissing || $inputPages.validity.valueMissing) {
        const $pError = document.querySelector(".p-error");
        $pError.textContent = "Invalid title, author or pages";
    } else {
        addBookToLibrary($inputTitle.value, $inputAuthor.value, $inputPages.value, $inputRead.checked);
        displayBook();

        $inputTitle.value = "";
        $inputAuthor.value = "";
        $inputPages.value = "";
        $inputRead.checked = false;

        if (!$form.classList.contains("form-container-show")) {
            $form.classList.add("form-container-show");
        } else {
            $form.classList.remove("form-container-show");
        }
    }
});

$cancelButton.addEventListener("click", function (event) {
    if (!$form.classList.contains("form-container-show")) {
        $form.classList.add("form-container-show");
    } else {
        $form.classList.remove("form-container-show");
    }
});

document.querySelector("body").addEventListener("click", function (event) {
    //delete book
    if (event.target.className === "delete") {
        myLibrary.splice(event.target.dataset.id, 1);
        setBooksToLocalStorage();
        displayBook();
    }

    //toggle read
    if (event.target.className === "edit") {
        myLibrary[event.target.dataset.id].changeReadStatus();
        setBooksToLocalStorage();
        displayBook();
    }
});

$theme.addEventListener("click", function (event) {
    setTheme();
});
