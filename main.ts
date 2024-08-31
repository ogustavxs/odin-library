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
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read ? 'already read' : 'not read yet'}`;
      }
}

const myLibrary: Book[] = [];

function addBookToLibrary (title: string, author: string, pages: number, read: boolean) {
    myLibrary.push(new Book(title, author, pages, read))
}

addBookToLibrary('harry pother', 'J.K Rowlens', 230, false)
console.log(myLibrary)