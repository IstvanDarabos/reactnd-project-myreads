import React, {Component} from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import PropTypes from 'prop-types'

class Search extends Component {
  state = {
    results: []
  }
  
  changeManager = (event) => {
    this.props.onSearch(event.target.value)
  }
  
  search = (e) => {
    const query = e.target.value;
    if (!query) {
      this.setState({results: []});
      return;
    }
    
    BooksAPI.search(query, 20).then(results => {
      if (results.error) {
        results = [];
      }
      results = results.map( (book) => {
        const bookInShelf = this.props.books.find(b => b.id === book.id);
        if (bookInShelf) {
          book.shelf = bookInShelf.shelf;
        }
        return book;
      });
      this.setState({results});
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.changeManager}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.results && this.state.results.map(book => (
              <li key={book.id}>
                <Book book={book} BooksList={this.props.BooksList} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;