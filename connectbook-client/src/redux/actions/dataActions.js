import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLINE_SCREAM
} from '../types';
import axios from 'axios';

// get all screams
export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });

  try {
    const screams = await axios.get('/getscreams');
    dispatch({ type: SET_SCREAMS, payload: screams.data });
  } catch (err) {
    dispatch({ type: SET_SCREAMS, payload: [] });
    console.log(err);
  }
};

// like a scream
export const likeScream = screamId => async dispatch => {
  try {
    const res = axios.get(`/scream/${screamId}/like`);
    dispatch({ type: LIKE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};

// unlike a scream
export const unlikeScream = screamId => async dispatch => {
  try {
    const res = axios.get(`/scream/${screamId}/unlike`);
    dispatch({ type: UNLINE_SCREAM, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
