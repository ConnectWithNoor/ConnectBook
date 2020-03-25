import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core/';

import AppIcon from '../images/icon.png';
import { style } from '../utilities/theme';

class signup extends Component {
  state = {
    email: '',
    password: '',
    confirmPassword: '',
    handle: '',
    loading: false,
    error: ''
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
      error: ''
    });

    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    try {
      const res = await axios.post('/signup', newUserData);
      console.log(res.data);
      await localStorage.setItem('idToken', `Bearer ${res.data.token}`);
      this.setState({
        loading: false
      });
      this.props.history.push('/');
    } catch (err) {
      this.setState({
        error: err.response.data.error,
        loading: false
      });
    }
    // }
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const {
      error,
      loading,
      email,
      password,
      confirmPassword,
      handle
    } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" />
          <Typography variant="h4">Signup</Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              value={email}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              value={password}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              className={classes.textField}
              value={confirmPassword}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              className={classes.textField}
              value={handle}
              onChange={this.handleChange}
              fullWidth
              required
            />
            <Typography variant="body1" className={classes.error}>
              {error}
            </Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Signup
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <div>
              Already have an account? <Link to="/signin">Signin Now</Link>
            </div>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signup.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(signup);
