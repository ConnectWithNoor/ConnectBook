// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

// --------------ROUTES---------------------------- //

app.use(cors());

// --------------ROUTES---------------------------- //

const {
  getAllScreams,
  newScream,
  getScream,
  signin,
  signup,
  uploadImage,
  addUserDetails,
  getUserDetails,
  commentOnScream,
  likeScream,
  unlikeScream,
  deleteScream,
  getAnyUserDetails,
  markNotificaionsRead,
  likeNotification,
  commentNotification,
  unLikeNotification,
  userImageUpdate
} = require('./routes');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');

// --------------SETTING UP---------------------------- //

// screams route
app.get('/getscreams', getAllScreams);
app.post('/newscream', protectedRoute, newScream);
app.get('/scream/:screamId', getScream);
app.delete('/scream/:screamId', protectedRoute, deleteScream);
app.post('/scream/:screamId/comment', protectedRoute, commentOnScream);
app.get('/scream/:screamId/like', protectedRoute, likeScream);
app.get('/scream/:screamId/unlike', protectedRoute, unlikeScream);

// users route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/user/upload/image', protectedRoute, uploadImage);
app.post('/user', protectedRoute, addUserDetails);
app.get('/user', protectedRoute, getUserDetails);
app.get('/user/:handle', getAnyUserDetails);
app.post('/notifications', protectedRoute, markNotificaionsRead);

exports.api = functions.https.onRequest(app);

// app.listen(5000, () => console.log(`Example app listening on port 5000!`));
// 3:58

// --------------SETTING UP---------------------------- //

// like notification trigger
exports.createNotificationOnLike = functions.firestore
  .document('likes/{id}')
  .onCreate(likeNotification);

// delete like notification on unlike trigger
exports.deleteNotificationOnUnline = functions.firestore
  .document('likes/{id}')
  .onDelete(unLikeNotification);

// comment notification trigger
exports.createNotificationOnComment = functions.firestore
  .document('comments/{id}')
  .onCreate(commentNotification);

// on user's image update
exports.onUserImageChange = functions.firestore
  .document('users/{id}')
  .onUpdate(userImageUpdate);
