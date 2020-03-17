// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const app = require('express')();

// --------------ROUTES---------------------------- //

const signup = require('./routes/signup');
const signin = require('./routes/signin');
const getScreams = require('./routes/getScreams');
const newScream = require('./routes/newScream');

const uploadImage = require('./routes/uploadImage');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');
const { imgUpload } = require('./utility/multer');

// --------------SETTING UP---------------------------- //

app.use('/getscreams', getScreams);
app.use('/newscream', protectedRoute, newScream);
app.use('/signup', signup);
app.use('/signin', signin);

// THIS ROUTE BELOW

app.use('/user/upload/image', imgUpload.single('productImage'), uploadImage);

exports.api = functions.https.onRequest(app);
