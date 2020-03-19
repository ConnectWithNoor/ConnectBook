// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const app = require('express')();

// --------------ROUTES---------------------------- //

const {
  getScreams,
  newScream,
  signin,
  signup,
  uploadImage,
  addUserDetails,
  getUserDetails
} = require('./routes');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');

// --------------SETTING UP---------------------------- //

app.use('/getscreams', getScreams);
app.use('/newscream', protectedRoute, newScream);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/user/upload/img', protectedRoute, uploadImage);
app.use('/user', protectedRoute, addUserDetails);
app.use('/user', protectedRoute, getUserDetails);

exports.api = functions.https.onRequest(app);

// app.listen(5000, () => console.log(`Example app listening on port 5000!`));
