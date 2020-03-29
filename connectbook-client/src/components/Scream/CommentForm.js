import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { submitComment } from '../../redux/actions/dataActions';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { themeStyles } from '../../utilities/theme';

const styles = {
  ...themeStyles,
  button: {
    marginTop: '1rem',
    float: 'right'
  }
};

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  };

  handleChange = e => {
    this.setState({
      body: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    await this.props.submitComment(this.props.screamId, {
      body: this.state.body
    });
    this.setState({
      body: ''
    });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    } else {
      this.setState({
        errors: {}
      });
    }
  }

  render() {
    const {
      classes,
      authenticated,
      screamId,
      UI: { loading }
    } = this.props;
    const { errors, body } = this.state;

    const commentFormMarkup = authenticated ? (
      <Grid item sm={12}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment on Scream"
            error={errors.error ? true : false}
            helperText={errors.error}
            value={body}
            onChange={this.handleChange}
            fullWidth
            className={classes.TextField}
          ></TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Submit
          </Button>
        </form>
        <span className={classes.visibleSeparator} />
      </Grid>
    ) : null;
    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  submitComment: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStatesToProps = state => ({
  UI: state.ui,
  authenticated: state.user.authenticated
});

const mapActionsToProps = {
  submitComment
};

export default connect(
  mapStatesToProps,
  mapActionsToProps
)(withStyles(styles)(CommentForm));
