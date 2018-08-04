import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';

function SearchBook(props) {

  const {books, results, onEdit, onSearch} = props;

  let matchingBooks = [];
  if (results.length > 0) {
    matchingBooks = results.map(book => {
      let match = books.find(b => b.id === book.id);
      if (!match) {
        book.shelf = 'none';
      }
      return match ? match : book;
    });
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => onSearch(event.target.value.trim())}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {matchingBooks && (matchingBooks.map(book => (
            <li key={book.id}>
              <Book
                book={book}
                onEdit={onEdit}
              />
            </li>
          )))}
        </ol>
      </div>
    </div>
  )
}

SearchBook.propTypes = {
  books: PropTypes.array.isRequired,
  results: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default SearchBook;
