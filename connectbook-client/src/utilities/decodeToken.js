import jwtDecode from 'jwt-decode';
import { SET_AUTHENTICATED } from '../redux/types';
import { signoutUser, getUserData } from '../redux/actions/userActions';
import store from '../redux/store';
import axios from 'axios';

export default idToken => {
  const token = localStorage.getItem(idToken);
  if (token) {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;

    if (expiryTime < Date.now()) {
      // if token is expired
      store.dispatch(signoutUser());
      window.location.href = '/signin';
    } else {
      store.dispatch({ type: SET_AUTHENTICATED });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      store.dispatch(getUserData());
    }
  }
};
