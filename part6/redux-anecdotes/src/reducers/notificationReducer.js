const initialState = "initial message";

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':  
        return action.data
      case 'REMOVE_NOTIFICATION':
        return initialState      
      default:
        return state
    }
}

export const setNotification = (content) => {   
    return {
        type: "SET_NOTIFICATION",
        data: content   
     };
  };
  
export const removeNotification = () => {
    return {
      type: "REMOVE_NOTIFICATION",
    };
  };

export default notificationReducer

