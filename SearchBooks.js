import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAll, search, update } from "../BooksAPI";
import BookList from "../component/BookList";

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      setAllBooks(res);
    });
  }, []);

  const onSearchHandler = (event) => {
    event.target.value === ""
      ? setBooks([])
      : search(event.target.value, 30).then((res) =>
          setBooks(
            res.error
              ? []
              : res.map((book) => {
                  return {
                    ...book,
                    shelf:
                      allBooks.find((allBook) => allBook.id === book.id)
                        ?.shelf ?? "none",
                  };
                })
          )
        );
  };

  const updateShelf = (shelf, bookId) => {
    update({ id: bookId }, shelf).then(() => {
      setBooks(
        books.map((book) => {
          if (book.id === bookId) book.shelf = shelf;
          return book;
        })
      );
    });
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={onSearchHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <BookList books={books} updateShelf={updateShelf} />
      </div>
    </div>
  );
};

export default SearchBooks;
