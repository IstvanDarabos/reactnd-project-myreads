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
    this.setState(state => {
      state.books.map(b => {
        b.shelf = b.id === book.id ? shelf : b.shelf;
        return b;
      })
    });
    BooksAPI.update(book, shelf);
  };

/*
  searchBook = (keyword) => {
    alert("ráment")
    if (keyword) {
      BooksAPI.search(keyword, 200)
        .then(results => {
          this.setState({results});
      })
      .catch(error => console.log(error));
    }else{
      this.setState({results: [] });
    }
  };
  */

  
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <BooksList books={this.state.books} onEdit={this.editBook}/>
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
