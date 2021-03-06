import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostScream from '../Scream/PostScream';
import Notifications from './Notifications';
// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import MyIconButton from './IconButton';

import HomeIcon from '@material-ui/icons/Home';

import { connect } from 'react-redux';

const useStyles = makeStyles({
  label: {
    color: 'white'
  }
});

function Navbar(props) {
  const classes = useStyles();
  const { authenticated } = props;
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="nav-container">
          {authenticated ? (
            <Fragment>
              <PostScream />
              <Link to="/">
                <MyIconButton tip="Home">
                  <HomeIcon />
                </MyIconButton>
              </Link>
              <Notifications />
            </Fragment>
          ) : (
            <Fragment>
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
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Navbar);
