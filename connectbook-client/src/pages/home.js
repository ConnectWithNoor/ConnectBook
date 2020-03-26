import React, { Component } from 'react';
import Scream from '../components/Scream';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import decodeToken from '../utilities/decodeToken';
import Profile from '../components/Profile';
class home extends Component {
  state = {
    screams: null
  };
  async componentDidMount() {
    decodeToken();
    try {
      const res = await axios.get('/getscreams');
      this.setState({ screams: res.data });
    } catch (err) {
      console.error(err);
    }
  }
  render() {
    let recentScreamsMarkup = this.state.screams
      ? this.state.screams.map(scream => (
          <Scream key={scream.screamId} scream={scream} />
        ))
      : 'loading';
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {recentScreamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

export default home;
