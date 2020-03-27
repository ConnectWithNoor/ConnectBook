import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';

import LocationOn from '@material-ui/icons/LocationOn';
import Linkicon from '@material-ui/icons/Link';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CalendarToday from '@material-ui/icons/CalendarToday';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import MuiLink from '@material-ui/core/Link';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '3rem'
  },
  image: {
    borderRadius: '100rem',
    width: '50%'
  },
  handle: {
    fontSize: '2.5rem',
    marginBottom: '1rem'
  },
  content: {
    width: '60%',
    display: 'flex',
    marginBottom: '1rem',
    marginLeft: '10%'
  },
  text: {
    marginLeft: '15%'
  },
  buttons: {
    marginTop: '2rem'
  },
  buttonItem: {
    marginRight: '2rem'
  }
};
class Profile extends Component {
  render() {
    const {
      classes,
      user: { userData, loading, authenticated }
    } = this.props;

    // let profileMarkup = !loading ? (
    //   authenticated ? (
    //     <Paper className={classes.paper}>
    //       <div className={classes.profile}>
    //         <div className="profile-image">
    //           <img src={userData.credentials.imageUrl} alt="profile" />
    //         </div>
    //         <hr />
    //         <div className="profile-details">
    //           <MuiLink
    //             component={Link}
    //             to={`/users/${userData.credentials.handle}`}
    //             color="primary"
    //             varient="h5"
    //           >
    //             @{userData.credentials.handle}
    //           </MuiLink>
    //           <hr />
    //           {userData.credentials.bio && (
    //             <Typography varient="body2">
    //               {userData.credentials.bio}
    //             </Typography>
    //           )}
    //           <hr />
    //           {userData.credentials.location && (
    //             <React.Fragment>
    //               <LocationOn color="primary" />{' '}
    //               <Typography varient="body2">
    //                 {userData.credentials.location}
    //               </Typography>
    //               <hr />
    //             </React.Fragment>
    //           )}
    //           {userData.credentials.website && (
    //             <React.Fragment>
    //               <Linkicon color="primary" />
    //               <a
    //                 href={userData.credentials.website}
    //                 target="_blank"
    //                 rel="noopener noreferrer"
    //               >
    //                 {' '}
    //                 {userData.credentials.website}
    //               </a>
    //               <hr />
    //             </React.Fragment>
    //           )}
    //           <CalendarToday color="primary" />{' '}
    //           <Typography varient="body2">
    //             {dayjs(userData.credentials.createdAt).format('MMM YYYY')}
    //           </Typography>
    //         </div>
    //       </div>
    //     </Paper>
    //   ) : (
    //     <Paper className={classes.paper}>
    //       <Typography varient="body2" align="center">
    //         No profile found, please login again
    //         <div className={classes.buttons}>
    //           <Button
    //             varient="contained"
    //             color="primary"
    //             component={Link}
    //             to="/signin"
    //           >
    //             Login
    //           </Button>
    //           <Button
    //             varient="contained"
    //             color="secondary"
    //             component={Link}
    //             to="/signup"
    //           >
    //             signup
    //           </Button>
    //         </div>
    //       </Typography>
    //     </Paper>
    //   )
    // ) : (
    //   <p>loading ...</p>
    // );

    let profileMarkup = !loading ? (
      authenticated ? (
        <Card className={classes.card}>
          <CardMedia
            component="img"
            alt={`username ${userData.credentials.handle}`}
            src={userData.credentials.imageUrl}
            className={classes.image}
          />
          <CardContent className={classes.card}>
            <MuiLink
              component={Link}
              to={`/users/${userData.credentials.handle}`}
              color="primary"
              varient="h5"
              className={classes.handle}
            >
              @{userData.credentials.handle}
            </MuiLink>
            <hr />
            {userData.credentials.bio && (
              <div className={classes.content}>
                <AccountBoxOutlinedIcon color="primary" />
                <Typography
                  varient="body2"
                  component="span"
                  className={classes.text}
                >
                  {userData.credentials.bio}
                </Typography>
              </div>
            )}
            <hr />
            {userData.credentials.location && (
              <div className={classes.content}>
                <LocationOn color="primary" />
                <Typography
                  varient="body2"
                  component="span"
                  className={classes.text}
                >
                  {userData.credentials.location}
                </Typography>
                <hr />
              </div>
            )}
            {userData.credentials.website && (
              <div className={classes.content}>
                <Linkicon color="primary" />
                <MuiLink
                  component="a"
                  target="_blank"
                  ref="nooppener norefferer"
                  href={`${userData.credentials.website}`}
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
              <Typography
                varient="body2"
                component="span"
                className={classes.text}
              >
                {dayjs(userData.credentials.createdAt).format('MMM YYYY')}
              </Typography>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className={classes.card}>
          <Typography varient="body2">
            No profile found, please login again
            <div className={classes.buttons}>
              <Button
                variant="outlined"
                color="primary"
                component={Link}
                to="/signin"
                className={classes.buttonItem}
              >
                Signin
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                component={Link}
                to="/signup"
                className={classes.buttonItem}
              >
                signup
              </Button>
            </div>
          </Typography>
        </Card>
      )
    ) : (
      <p>loading</p>
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
