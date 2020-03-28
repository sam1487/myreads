import React from 'react'
import { Link } from 'react-router-dom'
import BookShelf from '../View/BookShelf';
import PropTypes from 'prop-types';


class HomePage extends React.Component {

  render() {
    const { books, onUpdateShelf } = this.props;
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookShelf
                books={books && books.filter((book) => book.shelf === 'currentlyReading')}
                onUpdateShelf={onUpdateShelf} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelf
                books={books && books.filter((book) => book.shelf === 'wantToRead')}
                onUpdateShelf={onUpdateShelf} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf
                books={books && books.filter((book) => book.shelf === 'read')}
                onUpdateShelf={onUpdateShelf} />
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" ><button>Add a book</button></Link>
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default HomePage