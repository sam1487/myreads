import React from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import HomePage from './Components/Page/HomePage'
import SearchPage from './Components/Page/SearchPage'
import * as BooksAPI from './BooksAPI'

class BooksApp extends React.Component {
  state = {
    allBooks: []
  }

  fetchBooks = async () => {
    const books = await BooksAPI.getAll();
    this.setState({
      allBooks: books
    });
  }

  componentDidMount() {
    this.fetchBooks();

  }

  updateShelf = async (book, newShelf) => {
    await BooksAPI.update(book, newShelf);
    this.fetchBooks();
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <HomePage
            books={this.state.allBooks}
            onUpdateShelf={this.updateShelf} />
        )} />
        <Route exact path="/search" render={() => (
          <SearchPage
            books={this.state.allBooks}
            onUpdateShelf={this.updateShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
