const initialState = {
  content: "initial message"
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':  
        clearTimeout(state.timeout);
        return action.data
      case 'HIDE_NOTIFICATION':       
        return initialState  
            
      default:
        return state
    }
}

export const setNotification = (content, seconds) => {   
  return async dispatch => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        content,
        timeout: setTimeout(() => {
          dispatch(hideNotification())     
        }, seconds*1000)  
      }  
    })         
   };
};
  
export const hideNotification = () => {
  return {
      type: "HIDE_NOTIFICATION",
    };
  };  

export default notificationReducer 
