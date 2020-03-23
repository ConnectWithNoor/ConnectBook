import React, { Component } from 'react';
import Link from 'react-router-dom/Link';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
  render() {
    return (
      <div className="h5">
        <AppBar position="fixed">
          <Toolbar class="nav-container">
            <Button
              class="nav-button"
              color="inherit"
              component={Link}
              to="/signin"
            >
              Sign in
            </Button>
            <Button class="nav-button" color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button
              class="nav-button"
              color="inherit"
              component={Link}
              to="/signup"
            >
              Sign up
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
