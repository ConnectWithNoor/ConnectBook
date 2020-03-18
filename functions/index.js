// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const express = require('express');
const app = express();

// --------------ROUTES---------------------------- //

const signup = require('./routes/signup');
const signin = require('./routes/signin');
const getScreams = require('./routes/getScreams');
const newScream = require('./routes/newScream');

const uploadImage = require('./routes/uploadImage');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');

// --------------SETTING UP---------------------------- //

app.use('/getscreams', getScreams);
app.use('/newscream', protectedRoute, newScream);
app.use('/signup', signup);
app.use('/signin', signin);

app.use('/user/upload/image', uploadImage);

exports.api = functions.https.onRequest(app);
