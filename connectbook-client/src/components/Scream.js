import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

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
  render() {
    const { classes, scream } = this.props;
    dayjs.extend(relativeTime);
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
        </CardContent>
      </Card>
    );
  }
}

Scream.protoTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Scream);
