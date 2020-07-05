import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {  
  
  const addAnecdote  = async (event) =>{
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''    
    props.createAnecdote(content)
    props.setNotification('A new anecdote has been added', 5)  
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

export default connect(
  null, 
  { 
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)