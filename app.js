class Book {
	constructor(title, author, pages, isRead, date) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.isRead = isRead;
		this.date = date;
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
			const bookset = JSON.parse(localStorage.getItem("bookset"));
			bookset.push(book);
			localStorage.setItem("bookset", JSON.stringify(bookset));
		}
	}
}

function formRefresh(form) {
	form.title.value = "";
	form.author.value = "";
	form.pages.value = 0;
	form.isRead = "off";
}

function addBooksToDOM() {
	const bookset = JSON.parse(localStorage.getItem("bookset"));
	bookset.forEach((book, index) => {
		const newBookDiv = document.createElement("div");
		newBookDiv.classList.add("book");
		newBookDiv.innerHTML = `
        <div class= "cross"> x </div>
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Date Published : ${book.date}</p>
        <div>
        <label for="selectmenu">Have you read it? </label>
        <select id = "selectmenu">
            <option name = "isRead">Yes</option>
            <option name = "isRead">No</option>
        </select>
        </div>
    `;

		const crossButton = newBookDiv.querySelector(".cross");

		crossButton.addEventListener("click", function () {
			removeBook(this.parentElement.querySelector("h2").textContent);
			this.parentElement.remove();
		});

		const lowerMainSection = document.querySelector(".lowerMainSection");
		lowerMainSection.appendChild(newBookDiv);
	});
}

function removeBook(title) {
	let bookset = JSON.parse(localStorage.getItem("bookset"));
	bookset = bookset.filter((book) => {
		return book.title !== title;
	});
	localStorage.setItem("bookset", JSON.stringify(bookset));
}

function addBookToDOM(book) {
	const newBookDiv = document.createElement("div");
	newBookDiv.classList.add("book");
	newBookDiv.innerHTML = `
        <div class= "cross"> x </div>
        <h2>${book.title}</h2>
        <p>Author: ${book.author}</p>
        <p>Number of pages: ${book.pages}</p>
        <p>Date Published : ${book.date}</p>
        <div>
        <label for="selectmenu">Have you read it? </label>
        <select id = "selectmenu">
            <option name = "isRead">Yes</option>
            <option name = "isRead">No</option>
        </select>
        </div>
    `;

	const crossButton = newBookDiv.querySelector(".cross");
	crossButton.addEventListener("click", function () {
		removeBook(this.parentElement.querySelector("h2").textContent);
		this.parentElement.remove();
	});

	const lowerMainSection = document.querySelector(".lowerMainSection");
	lowerMainSection.appendChild(newBookDiv);
}

const library = new Library();
if (!localStorage.getItem("bookset")) {
	localStorage.setItem("bookset", JSON.stringify(library.bookSet));
} else {
	addBooksToDOM();
}

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
	let today = new Date();

	let date =
		today.getFullYear() +
		"-" +
		(today.getMonth() + 1) +
		"-" +
		today.getDate();
	formRefresh(newBookForm);

	const newBook = new Book(title, author, pages, isRead, date);
	addBookToDOM(newBook);
	library.addBook(newBook);

	const formContainer = document.querySelector(".formContainer");
	formContainer.style.display = "none";

	return false;
});

// const allCrossButtons = document.querySelectorAll(".cross");
// allCrossButtons.forEach((crossButton) => {
// 	crossButton.addEventListener("click", function () {
// 		removeBook(this.parentElement.querySelector("h2").textContent);
// 		this.parentElement.remove();
// 	});
// });
