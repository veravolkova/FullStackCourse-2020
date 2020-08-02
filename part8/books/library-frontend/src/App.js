
import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'

import { ALL_BOOKS, ALL_AUTHORS }  from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{ color: 'red' }}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const authors= useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  if (authors.loading || books.loading )  {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Notify errorMessage={errorMessage} />


      <Authors authors={authors.data.allAuthors}
        show={page === 'authors'}
      />

      {/* props setError */}
      <AuthorForm authors={authors.data.allAuthors} notify={notify}
        show={page === 'authors'}
      />

      <Books books={books.data.allBooks}
        show={page === 'books'}
      />
      {/* props setError */}
      <NewBook setError={notify}
        show={page === 'add'}
      />

    </div>
  )
}

export default App