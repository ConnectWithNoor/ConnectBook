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
