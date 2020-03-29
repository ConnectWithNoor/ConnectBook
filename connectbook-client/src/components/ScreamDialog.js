import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MyIconButton from './IconButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getScream } from '../redux/actions/dataActions';
import { themeStyles } from '../utilities/theme';
import LikeButton from './LikeButton';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import CloseIcon from '@material-ui/icons/Close';
import ChatIcon from '@material-ui/icons/Chat';

const styles = {
  ...themeStyles,
  expandBtn: {
    position: 'absolute',
    left: '90%'
  },
  profileImage: {
    objectFit: 'cover',
    borderRadius: '50%',
    height: '15rem',
    width: '15rem'
  },
  closeBtn: {
    position: 'absolute',
    right: '5%',
    top: '5%'
  },
  dialogContent: {
    padding: '2rem'
  },
  m3: {
    margin: '.3rem auto'
  },
  m1: {
    margin: '1rem auto'
  },
  spinnerDiv: {
    textAlign: 'center',
    margin: '5rem auto'
  }
};

class ScreamDialog extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const {
      classes,
      scream,
      UI: { loading }
    } = this.props;

    const dialogMakrup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={150} color="primary" thickness={2} />
      </div>
    ) : (
      <Grid container spacing={2}>
        <Grid item sm={4}>
          <img
            src={scream.userImage}
            alt="Profile"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={8}>
          <Typography
            color="primary"
            compoenent={Link}
            to={`/users/${scream.userHandle}`}
            variant="h5"
          >
            @{scream.userHandle}
          </Typography>
          <hr className={classes.m3} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).format('h:mm a, MMMM DD YYYY')}
          </Typography>
          <hr className={classes.m1} />
          <Typography variant="body1">{scream.body}</Typography>
          <LikeButton screamId={scream.screamId} />
          <span>{scream.likeCount} Likes</span>
          <MyIconButton tip="comments">
            <ChatIcon color="primary" />
          </MyIconButton>
          <span>{scream.commentCount} comments</span>
        </Grid>
      </Grid>
    );
    return (
      <Fragment>
        <MyIconButton
          tip="Expand scream"
          onClick={this.handleOpen}
          tipClassName={classes.expandBtn}
        >
          <UnfoldMoreIcon color="primary" />
        </MyIconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyIconButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeBtn}
          >
            <CloseIcon />
          </MyIconButton>

          <DialogContent className={classes.dialogContent}>
            {dialogMakrup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.ui
});

const mapActionsToProps = {
  getScream
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
