import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

import LocationOn from '@material-ui/icons/LocationOn';
import Linkicon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';

const styles = {};
class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;
    console.log(loading, authenticated);

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper className={classes.paper}>
          <div className={classes.profile}>
            <div className="profile-image">
              <img src={imageUrl} alt="profile" />
            </div>
            <hr />
            <div className="profile-details">
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                varient="h5"
              >
                @{handle}
              </MuiLink>
              <hr />
              {bio && <Typography varient="body2">{bio}</Typography>}
              <hr />
              {location && (
                <React.Fragment>
                  <LocationOn color="primary" />{' '}
                  <Typography varient="body2">{location}</Typography>
                  <hr />
                </React.Fragment>
              )}
              {website && (
                <React.Fragment>
                  <Linkicon color="primary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {' '}
                    {website}
                  </a>
                  <hr />
                </React.Fragment>
              )}
              <CalendarToday color="primary" />{' '}
              <Typography varient="body2">
                {dayjs(createdAt).format('MMM YYYY')}
              </Typography>
            </div>
          </div>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Typography varient="body2" align="center">
            No profile found, please login again
            <div className={classes.buttons}>
              <Button
                varient="contained"
                color="primary"
                component={Link}
                to="/signin"
              >
                Login
              </Button>
              <Button
                varient="contained"
                color="secondary"
                component={Link}
                to="/signup"
              >
                signup
              </Button>
            </div>
          </Typography>
        </Paper>
      )
    ) : (
      <p>loading ...</p>
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Profile));
