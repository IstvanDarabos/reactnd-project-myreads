import React from 'react'
import Book from './Book'

function BookShelf(props) {
  const { books, shelf, onEdit } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <li key={book.id}>
              <Book book={book} onEdit={onEdit}/>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf
