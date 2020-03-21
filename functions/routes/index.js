const { addUserDetails, getUserDetails, signin, signup } = require('./user');
const {
  getAllScreams,
  getScream,
  newScream,
  uploadImage,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
} = require('./scream');

module.exports = {
  addUserDetails,
  getAllScreams,
  getScream,
  getUserDetails,
  newScream,
  signin,
  signup,
  uploadImage,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream
};
