import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/Scream/Scream';
import StaticProfile from '../components/Profile/StaticProfile';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import Grid from '@material-ui/core/Grid';
import { connect } from 'react-redux';
import { getHandleInfo } from '../redux/actions/dataActions';

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };

  async componentDidMount() {
    const { handle, screamId } = this.props.match.params;

    if (screamId) {
      this.setState({ screamIdParam: screamId });
    }

    this.props.getHandleInfo(handle);
    try {
      const res = await axios.get(`/user/${handle}`);

      this.setState({
        profile: res.data.user
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <LinearProgress size={100} color="primary" />
    ) : screams.length < 0 ? (
      <Typography variant="h5" color="secondary">
        No Screams Found of user @{this.props.match.params.handle}
      </Typography>
    ) : !screamIdParam ? (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map(scream => {
        if (scream.screamId === screamIdParam) {
          return <Scream key={scream.screamId} scream={scream} openDialog />;
        } else {
          return <Scream key={scream.screamId} scream={scream} />;
        }
      })
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {screamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          {this.state.profile ? (
            <StaticProfile profile={this.state.profile} />
          ) : (
            <LinearProgress size={100} color="primary" />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getHandleInfo: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStatesToProps = state => ({
  data: state.data
});

const mapActionsToProp = {
  getHandleInfo
};

export default connect(mapStatesToProps, mapActionsToProp)(user);
