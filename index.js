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

function getBooksFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
        myLibrary.push(JSON.parse(localStorage.getItem(`book${i}`)));
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
    const $table = document.querySelector("tbody");
    $table.innerHTML = `<tr>
                            <th>Book</th>
                            <th>Author</th>
                            <th>Pages</th>
                            <th>Read?</th>
                            <th>Edit</th>
                        </tr>`;

    for (let i = 0; i < myLibrary.length; i++) {
        const $row = document.createElement("tr");
        const $title = document.createElement("td");
        const $author = document.createElement("td");
        const $pages = document.createElement("td");
        const $read = document.createElement("td");
        const $delete = document.createElement("td");

        $title.textContent = myLibrary[i].title;
        $author.textContent = myLibrary[i].author;
        $pages.textContent = myLibrary[i].pages;
        $read.textContent = myLibrary[i].read;
        $delete.innerHTML = `<button class="delete">Delete</button>`;
        $delete.children[0].setAttribute("data-id", `${i}`);

        $row.appendChild($title);
        $row.appendChild($author);
        $row.appendChild($pages);
        $row.appendChild($read);
        $row.appendChild($delete);

        $table.appendChild($row);
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
    ($theme.textContent === "Light") ? ($theme.textContent = "Dark") : ($theme.textContent = "Light");
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
    if (event.target.className === "delete") {
        myLibrary.splice(event.target.dataset.id, 1);
        setBooksToLocalStorage();
        displayBook();
    }
});

$theme.addEventListener("click", function (event) {
    setTheme();
});
