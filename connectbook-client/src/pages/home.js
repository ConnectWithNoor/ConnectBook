import React, { Component } from 'react';
import Scream from '../components/Scream/Scream';
import Grid from '@material-ui/core/Grid';
import decodeToken from '../utilities/decodeToken';
import Profile from '../components/Profile/Profile';
import { connect } from 'react-redux';
import { getScreams } from '../redux/actions/dataActions';
import PropTypes from 'prop-types';

import ScreamSkeleton from '../components/Layout/ScreamSkeleton';

class home extends Component {
  async componentDidMount() {
    decodeToken();
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;

    let recentScreamsMarkup = loading ? (
      // <LinearProgress color="primary" size={30} />
      <ScreamSkeleton />
    ) : (
      screams.map(scream => <Scream key={scream.screamId} scream={scream} />)
    );
    return (
      <Grid container spacing={4}>
        <Grid item sm={8} xs={12}>
          {loading ? <ScreamSkeleton /> : recentScreamsMarkup}
        </Grid>

        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const stateStateToProps = state => ({
  data: state.data
});

const stateActionToProps = {
  getScreams
};

export default connect(stateStateToProps, stateActionToProps)(home);
