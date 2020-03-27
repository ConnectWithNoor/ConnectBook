import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validatejs from 'validate.js';

import { editUserDetails } from '../redux/actions/userActions';
import { themeStyles } from '../utilities/theme';
import validateConstrains from '../utilities/validateConstrains';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';

import EditIcon from '@material-ui/icons/Edit';
import validate from 'validate.js';

const style = theme => ({
  ...themeStyles,
  button: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

class EditDetails extends Component {
  state = {
    bio: '',
    location: '',
    website: '',
    open: false,
    error: null
  };

  handleOpen = () => {
    this.setState({ open: true });
    this.mapUserDetailsToState(this.props.credentials);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  mapUserDetailsToState = credentials => {
    this.setState({
      bio: credentials.bio ? credentials.bio : '',
      location: credentials.location ? credentials.location : '',
      website: credentials.website ? credentials.website : '',
      error: null
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = () => {
    const { bio, location, website } = this.state;
    const userDetails = {
      bio,
      location,
      website
    };
    if (!website) {
      this.props.editUserDetails(userDetails);
      this.handleClose();
    } else {
      if (!validate({ website }, validateConstrains)) {
        this.props.editUserDetails(userDetails);
        this.handleClose();
      } else {
        this.setState({
          error: 'Please type a valid website url. i.e: http://www.website.com/'
        });
      }
    }
  };

  componentDidMount() {
    const { credentials } = this.props;
    this.mapUserDetailsToState(credentials);
  }

  render() {
    const { classes } = this.props;
    console.log(classes);
    return (
      <Fragment>
        <Tooltip title="Edit Details" placement="top">
          <IconButton onClick={this.handleOpen} className={classes.button}>
            <EditIcon color="primary" />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleOpen}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your details</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="bio"
                type="text"
                label="Bio"
                multiline
                placeholder="A short bio about yourself."
                className={classes.TextField}
                value={this.state.bio}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="location"
                type="text"
                label="Location"
                placeholder="Karachi Pakistan"
                className={classes.TextField}
                value={this.state.location}
                onChange={this.handleChange}
                fullWidth
              />
              <TextField
                name="website"
                type="text"
                label="Website"
                placeholder="http://www.yourwebsite.com/"
                className={classes.TextField}
                value={this.state.website}
                onChange={this.handleChange}
                fullWidth
              />
            </form>
            <Typography variant="body2" className={classes.text}>
              {this.state.error}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              onClick={this.handleClose}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={this.handleSubmit}
              color="primary"
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

EditDetails.propTypes = {
  user: PropTypes.object.isRequired,
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToprops = state => ({
  credentials: state.user.userData.credentials
});

const mapActionsToProps = {
  editUserDetails
};

export default connect(
  mapStateToprops,
  mapActionsToProps
)(withStyles(style)(EditDetails));
