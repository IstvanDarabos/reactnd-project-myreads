import React from 'react'
import Book from './Book'

function BookShelf(props) {
//  const BookShelf = {books, shelf, onEdit}= props
  return (
    <div className="bookshelf">
    <h2 className="bookshelf-title">{props.shelf}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.map((book) =>(
          <li key={book.id}>
            <Book book={book} onEdit={props.onEdit}/>
          </li>
        ))}
      </ol>
    </div>
  </div>
  )
}

export default BookShelf