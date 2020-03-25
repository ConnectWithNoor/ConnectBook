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

class signin extends Component {
  state = {
    email: '',
    password: '',
    loading: false,
    error: null
  };
  handleSubmit = async e => {
    e.preventDefault();

    this.setState({
      loading: true,
      error: ''
    });

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    try {
      const res = await axios.post('/signin', userData);
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
    const { error, loading, email, password } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" />
          <Typography variant="h4">Signin</Typography>
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
              Sign in
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <div>
              Don't have an account? <Link to="/signup">Signup Here</Link>
            </div>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

signin.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(signin);
