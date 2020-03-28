import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyIconButton from './IconButton';
import { postScream } from '../redux/actions/dataActions';

import withStyles from '@material-ui/core/styles/withStyles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircluarProgress from '@material-ui/core/CircluarProgress';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

const styles = {};

class PostScream extends Component {
  render() {
    return (
      <div>
        <MyIconButton tip="Post a Scream!">
          <AddIcon />
        </MyIconButton>
      </div>
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
