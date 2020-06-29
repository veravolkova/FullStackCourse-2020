import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()
  
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
  }

  return (
    <div>
        <h2>Add new anecdote</h2>
        <form onSubmit={addAnecdote}>
        <input name="content" />
        <button type="submit">add</button>
        </form> 
    </div>
  )
}

export default AnecdoteForm