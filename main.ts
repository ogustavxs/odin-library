const showButton = document.querySelector("#showDialog") as HTMLButtonElement;
const dialog = document.querySelector("dialog") as HTMLDialogElement;
const cancelBtn = document.querySelector("#cancelBtn") as HTMLButtonElement;
const confirmBtn = document.querySelector("#confirmBtn") as HTMLButtonElement;
const form = document.querySelector("form") as HTMLFormElement;
const main = document.querySelector("main") as HTMLElement;

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
	title: string;
	author: string;
	pages: number;
	read: boolean;

	constructor(title: string, author: string, pages: number, read: boolean) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info(): string {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
	}
}

const myLibrary: Book[] = [];

function addBookToLibrary() {
	const title = form.querySelector("#title") as HTMLInputElement;
	const author = form.querySelector("#author") as HTMLInputElement;
	const pages = form.querySelector("#pages") as HTMLInputElement;
	const read = form.querySelector("#status") as HTMLInputElement;
	const newBook = new Book(
		title.value,
		author.value,
		Number(pages.value),
		Boolean(read.checked), // Use `checked` para obter o valor booleano de um checkbox
	);
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
