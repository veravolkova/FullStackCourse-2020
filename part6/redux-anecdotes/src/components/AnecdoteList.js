import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVotes } from '../reducers/anecdoteReducer'

/* const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li onClick={ handleClick }>
      { anecdote.content } { anecdote.votes } 
    </li>
  )
} */

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
    <div>
    <h2>Anecdotes</h2>
     {anecdotes
        .sort((a, b) => a.votes < b.votes ? 1 : -1)
        .map(anecdote =>
            <div key={anecdote.id}>
                <div> 
                    {anecdote.content}
                </div>
            <div> 
                has {anecdote.votes}
                <button onClick={() => dispatch(addVotes(anecdote.id))}>vote</button>
            </div>
      </div>
    )}  
  </div>
  )
}

export default AnecdoteList