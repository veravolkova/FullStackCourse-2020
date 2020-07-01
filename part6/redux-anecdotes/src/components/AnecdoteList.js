import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addVotes } from "../reducers/anecdoteReducer";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);

  const vote = (anecdoteToVote) => {
    dispatch(addVotes(anecdoteToVote.id));
    dispatch(setNotification(`You voted for ${anecdoteToVote.content}`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
 
  const anecdotesFiltered = () => {
    if (filter === "") {
      return anecdotes;
    } else {
      return anecdotes.filter((anecdote) =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotesFiltered()
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

export default AnecdoteList;
