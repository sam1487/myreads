import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../../BooksAPI'
import BookShelf from '../View/BookShelf'
import PropTypes from 'prop-types';

class SearchPage extends React.Component {
  state = {
    query: '',
    loading: false,
    results: [],
  }

  search = async (query) => {
    if (!query) {
      this.setState({ loading: false, results: [] });
      return;
    }

    this.setState({
      loading: true
    }, () => {
      BooksAPI.search(query).then((books) => {
        if (books.error) {
          books = [];
        }
        this.setState({
          results: books,
          loading: false,
        });
      });
    });
  }

  handleQueryChange = (text) => {
    this.setState({
      query: text.toLowerCase()
    }, () => {
      this.search(this.state.query);
    });
  }

  render() {
    const { books } = this.props;
    const { results } = this.state;

    const bookMap = {};
    books.forEach(book => bookMap[book.id] = book);

    const mergedResults = (results || []).map(book => {
      if (bookMap.hasOwnProperty(book.id)) {
        book.shelf = bookMap[book.id].shelf;
      }
      return book;
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/"><button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.handleQueryChange(event.target.value)} />
          </div>
          {this.state.loading && <div className="loader"></div>}
        </div>

        <div className="search-books-results">
          <BookShelf books={mergedResults} onUpdateShelf={this.props.onUpdateShelf} />
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  books: PropTypes.array.isRequired,
  onUpdateShelf: PropTypes.func.isRequired,
}

export default SearchPage