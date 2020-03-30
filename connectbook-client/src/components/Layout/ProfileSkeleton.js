import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = {
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    jutifyContent: 'center',
    padding: '1rem'
  },
  image: {
    height: '15rem',
    width: '15rem'
  },
  handle: {
    margin: 'auto 15%',
    marginBottom: '1.5rem',
    height: '4rem'
  },
  content: {
    width: '100%',
    flexDirection: 'column'
  },
  text: {
    margin: 'auto 20%',
    marginBottom: '1rem',
    height: '2.5rem'
  }
};

const ProfileSkeleton = props => {
  const { classes } = props;

  return (
    <Card className={classes.card}>
      <Skeleton variant="circle" animation="wave" className={classes.image} />

      <CardContent className={classes.content}>
        <Skeleton
          variant="text"
          component="div"
          animation="wave"
          className={classes.handle}
        />
        <Skeleton
          variant="text"
          component="div"
          animation="wave"
          className={classes.text}
        />
        <Skeleton
          variant="text"
          component="div"
          animation="wave"
          className={classes.text}
        />
        <Skeleton
          variant="text"
          component="div"
          animation="wave"
          className={classes.text}
        />
      </CardContent>
    </Card>
  );
};

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ProfileSkeleton);
