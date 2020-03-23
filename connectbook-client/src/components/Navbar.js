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
          <Toolbar>
            <Button color="inherit" component={Link} to="/signin">
              Signin
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default Navbar;
