const {
  addUserDetails,
  getUserDetails,
  signin,
  signup,
  getAnyUserDetails,
  markNotificaionsRead
} = require('./user');

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

const {
  likeNotification,
  commentNotification,
  unLikeNotification
} = require('./triggers');

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
  deleteScream,
  getAnyUserDetails,
  markNotificaionsRead,
  likeNotification,
  commentNotification,
  unLikeNotification
};
