import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from '../types';

export const signinUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post('/signin', userData);
    localStorage.setItem('idToken', `Bearer ${res.data.token}`);
    axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
    await dispatch(getUserData());
    await dispatch({ type: CLEAR_ERRORS });
    history.push('/');
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data.error });
  }
};

export const getUserData = () => async dispatch => {
  try {
    const res = await axios.get('/user');
    await dispatch({ type: SET_USER, payload: res.data });
  } catch (err) {
    console.log(err);
  }
};
