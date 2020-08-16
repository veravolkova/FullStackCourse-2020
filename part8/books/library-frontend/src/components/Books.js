import React, { useEffect, useState } from 'react'
import { Button, Typography } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS }  from '../queries'

const Books = (props) => {
  const [genres, setGenres] = useState([])
  const [booksByGenre, setBooksByGenre] = useState([])

  const books = useQuery(ALL_BOOKS)

  useEffect(() => {
    if (books.data && genres) {
      setBooksByGenre(books.data.allBooks.map(book => {
        book.genres.forEach(genre => {
          if (!genres.includes(genre))
            setGenres(genres.concat(genre))
        })
        return book
      }
      ))}
  }, [books.data, genres])


  if (books.loading )  {
    return <div>loading...</div>
  }

  //change
  const booksOfCertaintGenre = genre => {
    // console.log(props.currentUser.data)
    setBooksByGenre(books.data.allBooks.filter(book => book.genres.includes(genre)))
  }

  const reset = () => {
    setBooksByGenre(books.data.allBooks.map(book => book))
  }



  if (!props.show) {
    return null
  }


  return (
    <div>
      <Typography variant='h5'>Books</Typography>
      {genres.map((genre, index) =>
        <Button key={genre} onClick={() => booksOfCertaintGenre(genre)}>{genre}</Button>
      )}


      {(booksByGenre.length < books.data.allBooks.length) && (
        <Button onClick={() => reset()} color='secondary'>reset</Button>
      )}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
            booksByGenre.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          }

        </tbody>
      </table>

    </div>
  )
}

export default Books