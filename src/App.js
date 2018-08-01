import React from 'react'
import { Link, Route } from 'react-router-dom'
import Bookslist from './BooksList'
import SearchBooks from './SearchBook'
import Bookshelf from './Bookshelf'
import Book from './Book'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    results: []
  }
  
  componentDidMount() {
    BooksAPI.getAll().then((result) => {
      this.setState({ booksList: result })
    })
  }
  
  changeSearchBookshelf=(books) => {
    this.setState( {books: books} )
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
          <SearchBooks onUpdateBookStatus={this.updateBookStatus} onSearchBooks={this.searchBooks}/>
        )} />
        <Route exact path='/' render={() => (
          <books books={this.state.books} onUpdateBookStatus={this.updateBookStatus}/>
        )} />
      </div>
    )
  }
}

export default BooksApp
