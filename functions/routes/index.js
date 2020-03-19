const { addUserDetails, getUserDetails, signin, signup } = require('./user');
const {
  getAllScreams,
  getScream,
  newScream,
  uploadImage
} = require('./scream');

module.exports = {
  addUserDetails,
  getAllScreams,
  getScream,
  getUserDetails,
  newScream,
  signin,
  signup,
  uploadImage
};
