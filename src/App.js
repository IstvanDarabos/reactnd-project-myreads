import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksList from './BooksList';
import SearchBook from './SearchBook';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  };


componentDidMount() {
  BooksAPI.getAll().then((books) => {this.setState({ books })
  this.setState({ results: [] })
  }).catch(e => console.log(`Error: ${e.message}`))
}

  editBook = (book, shelf) => {
    let updatedShelf = this.state.books.filter((b) => (b !== book))
    let newBook = book
    newBook.shelf = shelf
    updatedShelf.push(newBook)
    this.setState(state => ({books: updatedShelf}))

    BooksAPI.update(book, shelf)
  }

  searchBooks = (keyword) => {
    BooksAPI.search(keyword, 200).then(results => {
      if(Array.isArray(results)){
        return(this.setState({results}))
      }else{
        return(this.setState({results:[]}))
      }
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList
           books={this.state.books}
           onEdit={this.editBook}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBook
            books={this.state.books}
            results={this.state.results}
            onEdit={this.editBook}
            onSearch={this.searchBook}
          />)}
        />
      </div>
    );
  }
}
export default BooksApp;
