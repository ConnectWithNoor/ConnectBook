// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const app = require('express')();

// --------------ROUTES---------------------------- //

const {
  getAllScreams,
  newScream,
  getScream,
  signin,
  signup,
  uploadImage,
  addUserDetails,
  getUserDetails
} = require('./routes');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');

// --------------SETTING UP---------------------------- //

// screams route
app.get('/getscreams', getAllScreams);
app.post('/newscream', protectedRoute, newScream);
app.get('/scream/:screamId', getScream);

// users route
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/user/upload/image', protectedRoute, uploadImage);
app.post('/user', protectedRoute, addUserDetails);
app.get('/user', protectedRoute, getUserDetails);

exports.api = functions.https.onRequest(app);

// app.listen(5000, () => console.log(`Example app listening on port 5000!`));
// 2:33
