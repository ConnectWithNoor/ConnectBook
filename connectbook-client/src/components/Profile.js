import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/style/withStyles';

import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, locations },
        loading
      }
    } = this.props;
    return <div>Ho jama lo</div>;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
