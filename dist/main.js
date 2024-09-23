"use strict";
const showButton = document.querySelector("#showDialog");
const dialog = document.querySelector("dialog");
const cancelBtn = document.querySelector("#cancelBtn");
const confirmBtn = document.querySelector("#confirmBtn");
const form = document.querySelector("form");
const main = document.querySelector("main");
showButton.addEventListener("click", () => {
    dialog.showModal();
});
confirmBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close("");
});
cancelBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close("default");
});
dialog.addEventListener("close", () => {
    dialog.returnValue === "default"
        ? console.log("No return value.")
        : addBookToLibrary();
});
class Book {
    constructor(id, title, author, pages, read) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
    }
}
let myLibrary = [];
let bookId = 0;
function addBookToLibrary() {
    const title = form.querySelector("#title");
    const author = form.querySelector("#author");
    const pages = form.querySelector("#pages");
    const status = form.querySelector("#status");
    // Verifica qual opção foi selecionada
    const isRead = status.value === "read";
    const newBook = new Book(bookId, title.value === "" ? 'Untitled' : title.value, author.value === "" ? 'No Author' : author.value, Number(pages.value), isRead);
    myLibrary.push(newBook);
    bookId++;
    // Limpa o formulário
    title.value = "";
    author.value = "";
    pages.value = "";
    status.value = "notread"; // Reseta para "Not read"
    // Atualiza a interface com o novo livro
    const container = document.createElement("div");
    container.className = "container";
    const h1Title = document.createElement("h1");
    h1Title.textContent = newBook.title;
    const h2Author = document.createElement("h2");
    h2Author.textContent = newBook.author;
    const divInfo = document.createElement("div");
    const pagesSpan = document.createElement("span");
    pagesSpan.textContent = `${newBook.pages} pages`;
    const readSelection = document.createElement('select');
    const optionRead = document.createElement('option');
    optionRead.textContent = "Read";
    optionRead.value = 'read';
    const optionNotRead = document.createElement('option');
    optionNotRead.textContent = 'Not readed';
    optionNotRead.value = 'notread';
    readSelection.appendChild(optionRead);
    readSelection.appendChild(optionNotRead);
    readSelection.value = newBook.read ? "read" : "notread";
    readSelection.addEventListener('change', () => {
        const index = myLibrary.findIndex(book => book.id === newBook.id);
        myLibrary[index].read = readSelection.value === 'read';
    });
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("deleteButton");
    deleteButton.textContent = 'Remove book';
    deleteButton.addEventListener('click', () => {
        container.remove();
        myLibrary = myLibrary.filter((book) => {
            return book.id !== newBook.id;
        });
    });
    divInfo.appendChild(pagesSpan);
    divInfo.appendChild(readSelection);
    container.appendChild(h1Title);
    container.appendChild(h2Author);
    container.appendChild(divInfo);
    container.appendChild(deleteButton);
    main.appendChild(container);
}
