import React from 'react'
import { Alert } from '@material-ui/lab'

// eslint-disable-next-line react/prop-types
const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  }

  return (    
     <Alert severity={type}>
      {message}
     </Alert>  
  )
}
export default Notification


