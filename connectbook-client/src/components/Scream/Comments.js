import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';

import { themeStyles } from '../../utilities/theme';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const styles = {
  ...themeStyles,
  commentImage: {
    maxWidth: '100%',
    height: 100,
    objectFit: 'cover',
    borderRadius: '50%'
  },
  commentData: {
    marginLeft: '2rem'
  }
};

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;

          return (
            <Fragment key={createdAt}>
              <Grid item sm={2}>
                <img
                  src={userImage}
                  alt="comment"
                  className={classes.commentImage}
                />
              </Grid>
              <Grid item sm={9}>
                <div className={classes.commentData}>
                  <Typography
                    variant="h5"
                    component={Link}
                    to={`/users/${userHandle}`}
                    color="primary"
                  >
                    {userHandle}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                  </Typography>
                  <hr />
                  <Typography variant="body1" className={classes.m1}>
                    {body}
                  </Typography>
                </div>
              </Grid>
              {index !== comments.length - 1 && (
                <span className={classes.visibleSeparator} />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Comments);
