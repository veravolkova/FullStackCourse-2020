import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import AuthorForm from './components/AuthorForm'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Reccomend from './components/Reccomend'


import { Button } from '@material-ui/core'

import { ALL_AUTHORS, BOOK_ADDED, ALL_BOOKS, ME }  from './queries'

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
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const authors= useQuery(ALL_AUTHORS)
  const me = useQuery(ME)


  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added`)
    }
  })

  useEffect(() => {
    const tokenCached = localStorage.getItem('library-user-token')
    if (tokenCached) {
      setToken(tokenCached)
    }
  }, [])


  if (authors.loading || me.loading)  {
    return <div>loading...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
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
        <Button onClick={() => setPage('authors')}>authors</Button>
        <Button onClick={() => setPage('books')}>books</Button>

        {!token && (
          <Button onClick={() => setPage('login')}>login</Button>
        )}
        {token && (
          <>
            <Button onClick={() => setPage('reccomend')}>reccomend</Button>
            <Button onClick={() => setPage('add')}>add book</Button>
            <Button onClick={() => setPage('edit')}>edit author</Button>
          </>
        )}
        <Button onClick={logout}>logout</Button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
      />

      <AuthorForm
        notify={notify}
        show={page === 'edit'}
        setErrorMessage={notify}
        setPage={setPage}
        authors={authors.data.allAuthors}
      />

      <Books show={page === 'books'} />

      <NewBook
        setError={notify}
        show={page === 'add'}
        setErrorMessage={notify}
        setPage={setPage}
        updateCacheWith = {updateCacheWith}
      />

      <Reccomend
        show={page === 'reccomend'}
        setPage={setPage}
        token={token}
      />

      <LoginForm
        setToken={setToken}
        setErrorMessage={notify}
        setPage={setPage}
        show={page === 'login'}
      />

    </div>
  )
}

export default App