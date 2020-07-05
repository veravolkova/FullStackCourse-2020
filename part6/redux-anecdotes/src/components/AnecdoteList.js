import React from "react";
import { connect } from 'react-redux'
import { addVotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
 
  const vote = (anecdoteToVote) => {     
    props.addVotes(anecdoteToVote);
    props.setNotification(`you voted ${anecdoteToVote.content}`,5)
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotes
        .sort((a, b) => (a.votes < b.votes ? 1 : -1))
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};
  
const mapStateToProps = (state) => {
  if ( state.filter === "" ) {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
      anecdotes: state.anecdotes.filter((anecdote) =>   
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())      
    )
  }
}

const mapDispatchToProps = {
  addVotes,
  setNotification,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default ConnectedAnecdoteList


