const $createButton = document.querySelector(".button-create");
const $addButton = document.querySelector(".button-add");
const $cancelButton = document.querySelector(".button-cancel");
const $form = document.querySelector(".form-container");

let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function displayBook() {
    const $table = document.querySelector("tbody");
    $table.innerHTML = `<tr>
                            <th>Book</th>
                            <th>Pages</th>
                            <th>Author</th>
                            <th>Read?</th>
                        </tr>`;

    for (let i = 0; i < myLibrary.length; i++) {
        const $row = document.createElement("tr");
        const $title = document.createElement("td");
        const $author = document.createElement("td");
        const $pages = document.createElement("td");
        const $read = document.createElement("td");

        $title.textContent = myLibrary[i].title;
        $author.textContent = myLibrary[i].author;
        $pages.textContent = myLibrary[i].pages;
        $read.textContent = myLibrary[i].read;

        $row.appendChild($title);
        $row.appendChild($author);
        $row.appendChild($pages);
        $row.appendChild($read);

        $table.appendChild($row);
    }
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
        const $pError = document.querySelector(".p-error")
        $pError.textContent = "Invalid title, author or pages";
    } else {
        addBookToLibrary($inputTitle.value, $inputAuthor.value, $inputPages.value, $inputRead.checked);
        displayBook();

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
