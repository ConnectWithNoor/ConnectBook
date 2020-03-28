import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../redux/actions/dataActions';
import MyIconButton from './IconButton';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '2rem auto',
    minHeight: '15rem'
  },
  image: {
    minWidth: '20rem',
    backgroundSize: 'cover'
  },
  content: {
    padding: '3rem',
    height: '10rem'
  }
});

class Scream extends Component {
  likedScream = () => {
    const {
      user: { userData },
      scream
    } = this.props;
    if (
      userData.likes &&
      userData.likes.find(like => like.screamId === scream.screamId)
    ) {
      return true;
    }
    return false;
  };

  likeScream = () => {
    this.props.likeScream(this.props.scream.screamId);
  };

  unlikeScream = () => {
    this.props.unlikeScream(this.props.scream.screamId);
  };

  render() {
    const {
      classes,
      scream,
      user: { authenticated }
    } = this.props;

    dayjs.extend(relativeTime);

    const likeButton = !authenticated ? (
      <MyIconButton tip="Like">
        <Link to="/signin">
          <FavoriteBorder color="primary" />
        </Link>
      </MyIconButton>
    ) : this.likedScream() ? (
      <MyIconButton tip="Undo like" onClick={this.unlikeScream}>
        <FavoriteIcon color="primary" />
      </MyIconButton>
    ) : (
      <MyIconButton tip="Like" onClick={this.likeScream}>
        <FavoriteBorder color="primary" />
      </MyIconButton>
    );

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={scream.userImage}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${scream.userHandle}`}
            color="primary"
          >
            {scream.userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">{scream.body}</Typography>
          {likeButton}
          <span>{scream.likeCount} Likes</span>
          <MyIconButton tip="comments">
            <ChatIcon color="primary" />
          </MyIconButton>
          <span>{scream.commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.protoTypes = {
  classes: PropTypes.object.isRequired,
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionToprops = {
  likeScream,
  unlikeScream
};

export default connect(
  mapStateToProps,
  mapActionToprops
)(withStyles(styles)(Scream));
