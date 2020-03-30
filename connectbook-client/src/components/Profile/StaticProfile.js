import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import dayjs from 'dayjs';
import MuiLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CalendarToday from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import Linkicon from '@material-ui/icons/Link';

const styles = {
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '1rem'
  },
  image_Wrapper: {},
  image: {
    height: '20rem',
    width: '20rem',
    borderRadius: '50%',
    objectFit: 'cover'
  },
  handle: {
    fontSize: '2.5rem',
    marginBottom: '2rem'
  },
  content: {
    width: '65%',
    display: 'flex',
    marginBottom: '1rem',
    marginLeft: '10%',
    '&:last-child': {
      marginBottom: '0rem'
    }
  },
  text: {
    marginLeft: '5%',
    fontSize: '1.4rem'
  },
  buttons: {
    marginTop: '2rem'
  },
  buttonItem: {
    marginRight: '2rem'
  },
  fileUpload: {
    marginTop: '1.5rem',
    textTransform: 'uppercase'
  },
  icons: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
};

const StaticProfile = props => {
  const { classes, profile } = props;

  return (
    <Card className={classes.card}>
      <div className={classes.image_Wrapper}>
        <CardMedia
          component="img"
          alt={`username ${profile.handle}`}
          src={profile.imageUrl}
          className={classes.image}
        />
      </div>
      <CardContent className={classes.card}>
        <MuiLink
          component={Link}
          to={`/users/${profile.handle}`}
          color="primary"
          varient="h5"
          className={classes.handle}
        >
          @{profile.handle}
        </MuiLink>
        <hr />
        {profile.bio && (
          <div className={classes.content}>
            <AccountBoxOutlinedIcon color="primary" />
            <Typography
              varient="body2"
              component="span"
              className={classes.text}
            >
              {profile.bio}
            </Typography>
          </div>
        )}
        <hr />
        {profile.location && (
          <div className={classes.content}>
            <LocationOn color="primary" />
            <Typography
              varient="body2"
              component="span"
              className={classes.text}
            >
              {profile.location}
            </Typography>
            <hr />
          </div>
        )}
        {profile.website && (
          <div className={classes.content}>
            <Linkicon color="primary" />
            <MuiLink
              component="a"
              target="_blank"
              href={`${profile.website}`}
              color="primary"
              varient="body2"
              className={classes.text}
            >
              Click to Visit
            </MuiLink>
            <hr />
          </div>
        )}
        <div className={classes.content}>
          <CalendarToday color="primary" />
          <Typography varient="body2" component="span" className={classes.text}>
            {`Joined ${dayjs(profile.createdAt).format('MMM YYYY')}`}
          </Typography>
        </div>
        <div className={classes.icons}></div>
      </CardContent>
    </Card>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
