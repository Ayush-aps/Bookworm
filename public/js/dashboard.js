document.addEventListener("DOMContentLoaded", function () {
    filterBooks();
});

function searchBooks() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let books = document.querySelectorAll(".book-item");

    books.forEach(book => {
        let title = book.getAttribute("data-title").toLowerCase();
        book.style.display = title.includes(input) ? "" : "none";
    });
}

function filterBooks() {
    let statusFilter = document.getElementById("filterStatus").value;
    let books = document.querySelectorAll(".book-item");

    books.forEach(book => {
        let status = book.getAttribute("data-status");
        book.style.display = (statusFilter === "all" || status === statusFilter) ? "" : "none";
    });
}

function sortBooks() {
    let sortType = document.getElementById("sortOptions").value;
    let bookList = document.getElementById("bookList");
    let books = Array.from(bookList.getElementsByClassName("book-item"));

    books.sort((a, b) => {
        if (sortType === "name") {
            return a.getAttribute("data-title").localeCompare(b.getAttribute("data-title"));
        } else if (sortType === "chapters") {
            return parseInt(a.getAttribute("data-chapters")) - parseInt(b.getAttribute("data-chapters"));
        } else if (sortType === "rating") {
            return parseFloat(b.getAttribute("data-rating")) - parseFloat(a.getAttribute("data-rating"));
        }
    });

    books.forEach(book => bookList.appendChild(book));
}
