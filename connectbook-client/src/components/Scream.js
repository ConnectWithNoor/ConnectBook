import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: '2rem'
  },
  image: {
    minWidth: '20rem'
  },
  content: {
    padding: '3rem',
    objectFit: 'cover'
  }
});

class Scream extends Component {
  render() {
    const { classes, scream } = this.props;
    console.log(scream);
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
            {scream.createdAt}
          </Typography>
          <Typography variant="body1">{scream.body}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(Scream);
