import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from './BooksAPI'

class SearchBook extends Component {
    state = {
        results: this.props.books,
        error: ""
    }

    updateQuery = (event) => {
        var query = event.target.value.trim() 
        if (query) {
            BooksAPI.search(query, 10).then(results => {
                if (!results.error) {
                    this.setState({
                        error: "", 
                        results
                    })  
                } else {
                    this.setState({ error: "No books found." })
                }
            })
        }
    }

    render() {
        const { onUpdate } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" 
                            placeholder="Search by title or author"
                            onChange={ this.updateQuery }
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {   this.state.error ?
                            (<strong>{this.state.error}</strong>) :
                            (this.state.results.map(book => {
                                return (
                                    <li key={book.id}>
                                        <Book book={book} onUpdate={onUpdate}/>
                                    </li>)
                                })
                            )                      
                        }
                    </ol>
                </div>
            </div>
        )
    }
}

export default SearchBook