import axios from 'axios';
import {
  SET_USER,
  SET_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  UNLOAD_UI,
  MARK_NOTIFICATION_READ
} from '../types';

export const signinUser = (userData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post('/signin', userData);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: UNLOAD_UI });

    history.push('/');
  } catch (err) {
    console.log(err.response.data.error);
    dispatch({ type: SET_ERRORS, payload: err.response.data.error });
  }
};

export const signupUser = (newUserData, history) => async dispatch => {
  dispatch({ type: LOADING_UI });

  try {
    const res = await axios.post('/signup', newUserData);
    setAuthorizationHeader(res.data.token);
    dispatch(getUserData());
    dispatch({ type: UNLOAD_UI });
    history.push('/');
  } catch (err) {
    console.log(err.response.data.error);
    // dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_ERRORS, payload: err.response.data.error });
  }
};

export const signoutUser = () => dispatch => {
  localStorage.removeItem('idToken');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const getUserData = () => async dispatch => {
  dispatch({ type: LOADING_USER });
  try {
    const res = await axios.get('/user');
    dispatch({ type: SET_USER, payload: res.data });
  } catch (err) {
    console.log(err.response);
  }
};

export const uploadImage = formData => async dispatch => {
  dispatch({ type: LOADING_USER });

  try {
    await axios.post('/user/upload/image', formData);
    dispatch(getUserData());
  } catch (err) {
    console.log(err.response.data);
  }
};

export const editUserDetails = userDetails => async dispatch => {
  dispatch({ type: LOADING_USER });

  try {
    await axios.post('/user', userDetails);
    dispatch(getUserData());
  } catch (err) {
    console.log(err.response.data);
  }
};

export const markNotificationsRead = notificationIds => async dispatch => {
  try {
    await axios.post('/notifications', notificationIds);
    dispatch({ type: MARK_NOTIFICATION_READ });
  } catch (err) {
    console.log(err);
  }
};

const setAuthorizationHeader = token => {
  localStorage.setItem('idToken', `Bearer ${token}`);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
