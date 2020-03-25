import jwtDecode from 'jwt-decode';

export default idToken => {
  const token = localStorage.getItem(idToken);

  if (token) {
    const decodedToken = jwtDecode(token);
    const expiryTime = new Date(decodedToken.exp * 1000);

    if (expiryTime < Date.now()) {
      // if token is expired
      window.location.href = '/login';
      return false;
    } else {
      return true;
    }
  }
};
