class Book {
	constructor(title, author, pages, isRead) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
	}
}

class Library {
	constructor() {
		this.bookSet = [];
	}

	addBook(book) {
		if (this.bookSet.includes(book)) {
			return;
		} else {
			this.bookSet.push(book);
		}
	}
}

function formRefresh(form) {
	form.title.value = "";
	form.author.value = "";
	form.pages.value = 0;
	form.isRead = "off";
}

function addBookToDOM() {
	//today
	var today = new Date();

	var date =
		today.getFullYear() +
		"-" +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();

	//today end

	const book = library.bookSet[library.bookSet.length - 1];
	const newBookDiv = document.createElement("div");
	newBookDiv.classList.add("book");
	newBookDiv.innerHTML = `
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Date Published : ${date}</p>
        <div>
        <label for="selectmenu">Have you read it? </label>
        <select id = "selectmenu">
            <option name = "isRead">Yes</option>
            <option name = "isRead">No</option>
        </select>
        </div>
    `;
	const lowerMainSection = document.querySelector(".lowerMainSection");
	lowerMainSection.appendChild(newBookDiv);
}

const library = new Library();
localStorage.setItem("library", library);

const addBook = document.querySelector(".addBook");
addBook.addEventListener("click", () => {
	const formContainer = document.querySelector(".formContainer");
	formContainer.style.display = "flex";
});

const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", function (event) {
	event.preventDefault();
	const title = this.title.value;
	const author = this.author.value;
	const pages = this.pages.value;
	const isRead = this.isRead.value;
	formRefresh(newBookForm);

	const newBook = new Book(title, author, pages, isRead);
	library.addBook(newBook);

	const formContainer = document.querySelector(".formContainer");
	formContainer.style.display = "none";

	addBookToDOM();

	return false;
});
