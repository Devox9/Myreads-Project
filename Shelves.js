import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import { getAll, update } from "../BooksAPI";

const Shelves = () => {
  const shelves = [
    { name: "Want To Read", type: "wantToRead" },
    { name: "Currently Reading", type: "currentlyReading" },
    { name: "Read", type: "read" },
  ];

  const [books, setBooks] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      setBooks(res);
    });
  }, []);
  console.log(books);

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

  return shelves.map((shelf) => (
    <div key={shelf.type} className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <BookList
          books={books.filter((book) => book.shelf === shelf.type)}
          updateShelf={updateShelf}
        />
      </div>
    </div>
  ));
};

export default Shelves;
