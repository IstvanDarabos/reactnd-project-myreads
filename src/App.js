import React from 'react'
import { Link, Route } from 'react-router-dom'
import Bookslist from './BooksList'
import SearchBooks from './SearchBook'
import Bookshelf from './Bookshelf'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'
/* variable errors */
class BooksApp extends React.Component {
  state = {
    books: [],
    results: [],
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }
  
  editBook = (book, shelf) => {
    this.setState(state => {
      state.books.map(b => {
        b.self = b.id === book.id ? shelf : b.shelf
        return b
      })
    })
    BooksAPI.update(book, shelf)
  }
  
  searchBooks = (keyword) => {
    BooksAPI.search(keyword, 200).then(results => {
      if(Array.isArray(results)){
        return(this.setState({results}))
      }else{
        return(this.setState({results: [] }))
      }
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <SearchBooks
            books={this.state.books}
            results={this.state.results}
            onEdit={this.editBook}
            onSearch={this.searchBooks}/>
        )} />
        <Route exact path='/' render={() => (
          <Book books={this.state.books} onEdit={this.editBook}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
