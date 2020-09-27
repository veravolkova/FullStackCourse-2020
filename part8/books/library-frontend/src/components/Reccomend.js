import React, { useEffect } from 'react'
import { Typography } from '@material-ui/core'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Reccomend = (props) => {

  const { loading, data: favGenreData } = useQuery(ME)
  const [getFavBooks, { loading: booksLoading, data: recBooksData },
  ] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (favGenreData.me) {
      getFavBooks({
        variables: { genre: favGenreData.me.favoriteGenre },
      })
      console.log(favGenreData.me.favoriteGenre)
    }
  }, [favGenreData, getFavBooks])

  if (!props.show || loading) {
    return null
  }

  return (
    <div>
      <Typography variant='h5'>Books you may like</Typography>
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
          {booksLoading ? null :
            recBooksData.allBooks.map(a =>
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

export default Reccomend