import React from 'react';
import { Link, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import BookShelf from './BookShelf';

function Bookslist(props) {

  const {books, onNewBook} = props;
  const nowReadBooks = [];
  const wantToReadBooks = [];
  const readBooks = [];

  books.forEach((book) => {
    switch(book.shelf) {
      case 'Currently Reading':
        nowReadBooks.push(book);
        break;
      case 'wantToRead':
        wantToReadBooks.push(book);
        break;
      case 'read':
        readBooks.push(book);
        break;
      default:
        break;
    }
  });

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <BookShelf
            books={nowReadBooks}
            shelf={"Currently Reading"}
            onEdit={props.onEdit}
          />
          <BookShelf
            books={wantToReadBooks}
            shelf={"Want to Read"}
            onEdit={props.onEdit}
          />
          <BookShelf
            books={readBooks}
            shelf={"Read"}
            onEdit={props.onEdit}
          />
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );

}
/*
BooksList.propTypes = {
  books: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired
};

export default BooksList;
*/