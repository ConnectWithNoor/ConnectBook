import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  DELETE_SCREAM,
  LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS
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
    const res = await axios.get(`/scream/${screamId}/like`);
    dispatch({ type: LIKE_SCREAM, payload: res.data.screamData });
  } catch (err) {
    console.log(err);
  }
};

// unlike a scream
export const unlikeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({ type: UNLIKE_SCREAM, payload: res.data.screamData });
  } catch (err) {
    console.log(err);
  }
};

// delete scream
export const deleteScream = screamId => async dispatch => {
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (err) {
    console.log(err.response.data);
  }
};

// post scream

export const postScream = newScream => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post('/newscream', newScream);
    dispatch({ type: POST_SCREAM, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
  } catch (err) {
    console.log(err.response);
    dispatch({ type: SET_ERRORS, payload: err.response.data });
  }
};
