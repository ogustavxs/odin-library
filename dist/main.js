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
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
    }
}
const myLibrary = [];
function addBookToLibrary() {
    const title = form.querySelector("#title");
    const author = form.querySelector("#author");
    const pages = form.querySelector("#pages");
    const read = form.querySelector("#status");
    const newBook = new Book(title.value, author.value, Number(pages.value), Boolean(read.checked));
    myLibrary.push(newBook);
    // Limpa o formulário
    title.value = "";
    author.value = "";
    pages.value = "";
    read.checked = false;
    // Atualiza a interface com o novo livro
    const container = document.createElement("div");
    container.className = "container";
    const h1Title = document.createElement("h1");
    h1Title.textContent = newBook.title;
    const h2Author = document.createElement("h2");
    h2Author.textContent = newBook.author;
    const divInfo = document.createElement("div");
    const pagesSpan = document.createElement("span");
    pagesSpan.textContent = `${newBook.pages}`;
    const readSpan = document.createElement("span");
    readSpan.textContent = newBook.read ? "already read" : "not read yet";
    divInfo.appendChild(pagesSpan);
    divInfo.appendChild(readSpan);
    container.appendChild(h1Title);
    container.appendChild(h2Author);
    container.appendChild(divInfo);
    main.appendChild(container);
}
