import React from 'react'
import { Link } from "react-router-dom";
import * as BooksAPI from './BooksAPI';
import Book from './Book';
// import BooksGrid from '../list-books/books-grid';

class SearchBooks extends React.Component {
    state = {
        query: "",
        books: []
    }

    doSearch = (event) => {
        if (event.target.value) {
            this.setState({query: event.target.value});
            search(event.target.value).then((data) => {
                this.setState({books: data});
            }).catch((error) => {
                console.log(error);
            })
        }
        
    }

    updateBook = (book, to) => {
        update(book, to).then((data) => {
            const from = book.shelf;
            if (from) {
                books[from].splice(books[from].indexOf(book), 1);
            }
            let books = this.state.books;
            book.shelf = to;
            this.setState({books});
        }).catch((error) => {
            console.log(error);
        });
    }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
            placeholder="Search by title or author"
            value={this.state.searchQuery}
            onChange={this.doSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <BooksGrid books={this.state.books} updateBook={this.updateBook}></BooksGrid>
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook;