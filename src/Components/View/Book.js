import React from 'react'
import PropTypes from 'prop-types';


class Book extends React.Component {
  changeShelf = (selectedShelf) => {
    this.props.onUpdateShelf(this.props.book, selectedShelf);
  }

  getShelfElement = () => {
    const element = document.getElementById(this.props.book.id);
    return element;
  }

  componentDidMount() {
    if (this.props.book.shelf) {
      this.getShelfElement().value = this.props.book.shelf;
    } else {
      this.getShelfElement().value = null;
    }
  }


  render() {
    const { book } = this.props;
    if (!book) {
      return null;
    }
    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }} />}
          <div className="book-shelf-changer">
            <select id={book.id} onChange={(event) => this.changeShelf(event.target.value)}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
      </div>
    );
  }
}

Book.propTypes = {
  book: PropTypes.object.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default Book;