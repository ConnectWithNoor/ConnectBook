import React from 'react';
import { Link } from 'react-router-dom';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  label: {
    color: 'white'
  }
});

function Navbar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          <Button
            color="inherit"
            className={classes.label}
            component={Link}
            to="/signin"
          >
            Signin
          </Button>
          <Button
            color="inherit"
            className={classes.label}
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            className={classes.label}
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
