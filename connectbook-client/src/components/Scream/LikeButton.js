import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import MyIconButton from '../Layout/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {
  likedScream = () => {
    const {
      user: { userData }
    } = this.props;
    if (
      userData.likes &&
      userData.likes.find(like => like.screamId === this.props.screamId)
    ) {
      return true;
    }
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.screamId);
  };

  render() {
    const {
      user: { authenticated }
    } = this.props;
    const LikeButton = !authenticated ? (
      <Link to="/signin">
        <MyIconButton tip="Like">
          <FavoriteBorder color="primary" />
        </MyIconButton>
      </Link>
    ) : this.likedScream() ? (
      <MyIconButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyIconButton>
    ) : (
      <MyIconButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyIconButton>
    );

    return LikeButton;
  }
}

LikeButton.protoTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToprops = {
  likeScream,
  unlikeScream
};

export default connect(mapStateToProps, mapActionToprops)(LikeButton);
