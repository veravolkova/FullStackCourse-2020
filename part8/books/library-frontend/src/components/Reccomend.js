import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Reccomend = (props) => {

  const [genre, setGenre] = useState(null)
  const me = props.me

  const books =
    useQuery(ALL_BOOKS, {
      variables: { genre: genre },
    })

  useEffect(() => {
    if (books.data && me.data && props.token) {
      setGenre(me.data.me.favoriteGenre)
    }
  }, [books.data, me])

  if (books.loading || me.loading) {
    return <div>loading...</div>
  }

  if (!props.show) {
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
          {
            books.data.allBooks.map(a =>
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