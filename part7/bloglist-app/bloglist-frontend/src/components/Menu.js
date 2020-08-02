import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Toolbar, AppBar} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }, 
  title: {
    flexGrow: 1,
  },
}));

const Menu = ({user, handleLogout}) => { 
    /* const padding = {
        paddingRight: 5
      }     */
      const classes = useStyles();

    return (
      <div className={classes.root}>
  <AppBar position='static'>
    <Toolbar>    
    <Button color="inherit" component={Link} to="/">
      home
    </Button> 
    <Button color="inherit" component={Link} to="/blogs">
      blogs
    </Button> 
    <Button color="inherit" component={Link} to="/create">
      create
    </Button>
 {/*<Button  color="inherit" component={Link} to="/login">
     login
    </Button> */}
   {user? 
       <Button color="inherit"  component={Link} to="/logout" onClick={handleLogout}>
        logout
       </Button>
    :
    <Button color="inherit" component={Link} to="/login">
    login
   </Button>
}
  </Toolbar>
</AppBar>   
</div>
    )
  }

export default Menu


