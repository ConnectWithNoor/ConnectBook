import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import Skeleton from '@material-ui/lab/Skeleton';

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    minHeight: '15rem',
    margin: '2rem auto',
    padding: '2rem'
  },
  image: {
    width: '20rem',
    height: '15rem'
  },
  content: {
    padding: '2rem',
    width: '100%'
  },
  handle: {
    width: '20rem',
    height: '2.5rem',
    marginBottom: '.7rem'
  },
  date: {
    width: '13rem',
    height: '2rem',
    marginBottom: '1rem'
  },
  fullLine: {
    width: '90%',
    height: '1.2rem',
    marginBottom: '.7rem'
  },
  halfLine: {
    width: '50%',
    height: '.6rem',
    marginTop: '.7rem'
  }
});

const ScreamSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => {
    return (
      <Card className={classes.card} key={index}>
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
            className={classes.date}
          />
          <Skeleton
            variant="text"
            animation="wave"
            className={classes.fullLine}
            component="div"
          />
          <Skeleton
            variant="text"
            animation="wave"
            className={classes.fullLine}
            component="div"
          />
          <Skeleton
            variant="text"
            animation="wave"
            className={classes.halfLine}
            component="div"
          />
        </CardContent>
      </Card>
    );
  });

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScreamSkeleton);
