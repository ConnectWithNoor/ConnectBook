import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core/';

import AppIcon from '../images/icon.png';
import { style } from '../utilities/theme';

import { connect } from 'react-redux';
import { signinUser } from '../redux/actions/userActions';

class signin extends Component {
  state = {
    email: '',
    password: '',
    error: null
  };

  handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.signinUser(userData, this.props.history);
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const {
      classes,
      ui: { loading, errors }
    } = this.props;
    const { email, password } = this.state;
    console.log(errors);
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
              {errors}
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
  classes: PropTypes.object.isRequired,
  signinUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  ui: state.ui
});

const mapActionstoProps = {
  signinUser
};

export default connect(
  mapStateToProps,
  mapActionstoProps
)(withStyles(style)(signin));
