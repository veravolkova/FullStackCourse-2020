import React from 'react'

const Anecdote = ({ anecdote }) => {
  return (       
    <div>   
      { console.log(anecdote)}     
      <h4>{anecdote.content}</h4>
      <h4>{anecdote.author}</h4>
      <h4>{anecdote.info}</h4>
      <a href={anecdote.info}>more info</a>
    </div>
  )
}

export default Anecdote

