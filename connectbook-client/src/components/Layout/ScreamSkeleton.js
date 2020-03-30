import React, { Fragment } from 'react';
import avatar from '../../images/avatar.png';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  card: {
    position: 'relative',
    display: 'flex',
    minHeight: '15rem',
    margin: '2rem auto',
    padding: '2rem'
  },
  image: {
    maxWidth: '15rem',
    objectFit: 'cover',
    borderRadius: '50%'
  },
  content: {
    padding: '2rem',
    width: '100%'
  },
  handle: {
    width: '20rem',
    height: '2.5rem',
    backgroundColor: theme.palette.primary.main,
    marginBottom: '.7rem'
  },
  date: {
    width: '13rem',
    height: '2rem',
    backgroundColor: `rgba(0,0,0, 0.3)`,
    marginBottom: '1rem'
  },
  fullLine: {
    width: '90%',
    height: '1.2rem',
    backgroundColor: `rgba(0,0,0, 0.7)`,
    marginBottom: '.7rem'
  },
  halfLine: {
    width: '50%',
    height: '.6rem',
    backgroundColor: `rgba(0,0,0, 0.7)`,
    marginTop: '.7rem'
  }
});

const ScreamSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => {
    return (
      <Card className={classes.card} key={index}>
        <CardMedia component="img" className={classes.image} src={avatar} />
        <CardContent className={classes.content}>
          <div className={classes.handle} />
          <div className={classes.date} />
          <div className={classes.fullLine} />
          <div className={classes.fullLine} />
          <div className={classes.halfLine} />
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
