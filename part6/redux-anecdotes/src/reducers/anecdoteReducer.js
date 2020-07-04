import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {  
  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
        return action.data
    case 'ADD_VOTE':  
    const id = action.data.id  
    const anecdoteToVote = state.find(a => a.id === id) 
      const clickedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : clickedAnecdote 
      )    
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const addVotes = anecdote => {  
  return async dispatch => {    
    const clickedAnecdote = { 
      ...anecdote, 
      votes: anecdote.votes + 1
    }  
    const updatedAnecdote = await anecdoteService.updateVotes(clickedAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: updatedAnecdote,
    })
  }
}
 

export default anecdoteReducer

