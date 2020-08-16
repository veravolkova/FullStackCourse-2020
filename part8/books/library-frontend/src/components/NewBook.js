import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK }  from '../queries'

import {
  Button,
  TextField,
} from '@material-ui/core'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    onError: (error) => {
      props.setErrorMessage(error.graphQLErrors[0].message)
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    addBook({
      variables: { title, published, author, genres, genre }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')

    props.setPage('books')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          <TextField
            label='title'
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          <TextField
            label='author'
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
          <TextField
            label='published'
            id='published'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>

        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <Button onClick={addGenre} >add genre</Button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <Button type='submit'>create book</Button>
      </form>
    </div>
  )
}

export default NewBook