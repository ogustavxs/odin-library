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
	id: number;
	title: string;
	author: string;
	pages: number;
	read: boolean;

	constructor(id:number, title: string, author: string, pages: number, read: boolean) {
		this.id = id
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	info(): string {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? "already read" : "not read yet"}`;
	}
}

let myLibrary: Book[] = [];

let bookId = 0

function addBookToLibrary() {
	const title = form.querySelector("#title") as HTMLInputElement;
	const author = form.querySelector("#author") as HTMLInputElement;
	const pages = form.querySelector("#pages") as HTMLInputElement;
	const status = form.querySelector("#status") as HTMLSelectElement;

	// Verifica qual opção foi selecionada
	const isRead = status.value === "read";

	const newBook = new Book(
		bookId,
		title.value === "" ? 'Untitled' : title.value,
		author.value === "" ? 'No Author' : author.value,
		Number(pages.value),
		isRead, // Usa o valor do `select` para definir o status de leitura
	);

	myLibrary.push(newBook);
	bookId++

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

	const readSelection = document.createElement('select')
	const optionRead = document.createElement('option')
	optionRead.textContent = "Read"
	optionRead.value = 'read'
	const optionNotRead = document.createElement('option')
	optionNotRead.textContent = 'Not readed'
	optionNotRead.value = 'notread'

	readSelection.appendChild(optionRead)
	readSelection.appendChild(optionNotRead)
	readSelection.value = newBook.read ? "read" : "notread";

	
	readSelection.addEventListener('change', () => {
		const index = myLibrary.findIndex(book => book.id === newBook.id);
		myLibrary[index].read = readSelection.value  === 'read'
	})

	const deleteButton = document.createElement("button");
	deleteButton.classList.add("deleteButton")
	deleteButton.textContent = 'Remove book'
	deleteButton.addEventListener('click', () => {
		container.remove()
		myLibrary = myLibrary.filter((book) => {
			return book.id !== newBook.id
		})
	})
	divInfo.appendChild(pagesSpan);
	divInfo.appendChild(readSelection);
	container.appendChild(h1Title);
	container.appendChild(h2Author);
	container.appendChild(divInfo);
	container.appendChild(deleteButton)
	main.appendChild(container);
}

