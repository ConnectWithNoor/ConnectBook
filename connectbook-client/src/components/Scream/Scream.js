import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyIconButton from '../Layout/IconButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import LikeButton from './LikeButton';

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    minHeight: '15rem',
    margin: '2rem auto'
  },
  image: {
    minWidth: '20rem',
    backgroundSize: 'cover'
  },
  content: {
    padding: '2rem'
  },
  text: {
    marginTop: '1rem'
  }
});

class Scream extends Component {
  render() {
    const {
      classes,
      scream,
      user: {
        authenticated,
        userData: { credentials }
      }
    } = this.props;

    dayjs.extend(relativeTime);

    const deleteButton =
      credentials &&
      authenticated &&
      scream.userHandle === credentials.handle ? (
        <DeleteScream screamId={scream.screamId} />
      ) : null;

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
          {deleteButton}
          <Typography variant="body2" color="textSecondary">
            {dayjs(scream.createdAt).fromNow()}
          </Typography>
          <Typography variant="body1" className={classes.text}>
            {scream.body}
          </Typography>
          <LikeButton screamId={scream.screamId} />
          <span>{scream.likeCount} Likes</span>
          <MyIconButton tip="comments">
            <ChatIcon color="primary" />
          </MyIconButton>
          <span>{scream.commentCount} comments</span>
          <ScreamDialog
            screamId={scream.screamId}
            userHandle={scream.userHandle}
            openDialog={this.props.openDialog}
          />
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
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
