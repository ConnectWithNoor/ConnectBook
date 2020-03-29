import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyIconButton from '../Layout/IconButton';
import { postScream } from '../../redux/actions/dataActions';
import { themeStyles } from '../../utilities/theme';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close';

const styles = {
  ...themeStyles,
  submitBtn: {
    position: 'relative',
    margin: '1rem auto',
    float: 'right'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeBtn: {
    color: 'rgba(0, 0, 0, 0.54)',
    position: 'absolute',
    top: '5%',
    right: '5%'
  }
};

class PostScream extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, body: '', errors: {} });
  };

  postScream = e => {
    e.preventDefault();
    this.props.postScream({ body: this.state.body });
  };

  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  componentWillReceiveProps(nextProp) {
    if (nextProp.UI.errors) {
      this.setState({ errors: nextProp.UI.errors });
    }

    if (!nextProp.UI.errors && !nextProp.UI.loading) {
      this.handleClose();
    }
  }

  render() {
    const { errors } = this.state;
    const {
      UI: { loading },
      classes
    } = this.props;

    return (
      <Fragment>
        <MyIconButton tip="Post a Scream!" onClick={this.handleOpen}>
          <AddIcon />
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
          <DialogTitle>Post a new Scream</DialogTitle>
          <DialogContent>
            <form onSubmit={this.postScream}>
              <TextField
                name="body"
                type="text"
                label="Scream"
                multiline
                placeholder="Tell your friends something cool"
                error={errors.error ? true : false}
                helperText={errors.error}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progessSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.ui
});

const mapActionToProps = {
  postScream
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(PostScream));
