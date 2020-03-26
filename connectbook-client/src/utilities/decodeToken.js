import jwtDecode from 'jwt-decode';

export default idToken => {
  const token = localStorage.getItem(idToken);
  if (token) {
    const decodedToken = jwtDecode(token);
    const expiryTime = decodedToken.exp * 1000;

    if (expiryTime < Date.now()) {
      // if token is expired
      window.location.href = '/signin';
      return false;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
