import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { connect } from 'react-redux';
import Link from 'react-router-dom/Link';
import EditDetails from './EditDetails';
import { uploadImage, signoutUser } from '../redux/actions/userActions';
import MyIconButton from './IconButton';

import LocationOn from '@material-ui/icons/LocationOn';
import Linkicon from '@material-ui/icons/Link';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import CalendarToday from '@material-ui/icons/CalendarToday';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import MuiLink from '@material-ui/core/Link';
import LinearProgress from '@material-ui/core/LinearProgress';
import withStyles from '@material-ui/core/styles/withStyles';

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
class Profile extends Component {
  handleImageChange = e => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadImage(formData);
  };

  handleLogout = () => {
    this.props.signoutUser();
  };

  render() {
    const {
      classes,
      user: { userData, loading, authenticated }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Card className={classes.card}>
          <div className={classes.image_Wrapper}>
            <CardMedia
              component="img"
              alt={`username ${userData.credentials.handle}`}
              src={userData.credentials.imageUrl}
              className={classes.image}
            />
          </div>
          <Button
            variant="contained"
            className={classes.fileUpload}
            component="label"
            onChange={this.handleImageChange}
          >
            upload image
            <input type="file" hidden="hidden" />
          </Button>
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
                {`Joined ${dayjs(userData.credentials.createdAt).format(
                  'MMM YYYY'
                )}`}
              </Typography>
            </div>
            <div className={classes.icons}>
              <MyIconButton tip="Signout" onClick={this.handleLogout}>
                <KeyboardReturn color="secondary" />
              </MyIconButton>
              <EditDetails />
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
      <LinearProgress color="primary" size={30} />
    );

    return profileMarkup;
  }
}

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  signoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionstoProps = {
  signoutUser,
  uploadImage
};

export default connect(
  mapStateToProps,
  mapActionstoProps
)(withStyles(styles)(Profile));
