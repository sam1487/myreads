import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

const BookShelf = (props) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books && props.books.map(book => (
          <li key={book.id}>
            <Book book={book} onUpdateShelf={props.onUpdateShelf} />
          </li>
        ))}
      </ol>
    </div>
  )
};

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default BookShelf;