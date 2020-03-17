// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const app = require('express')();

const serviceAccountKey = require('./env/SERVICE_ACCOUNT_KEY.json');
const firebaseConfig = require('./env/FIREBASE_CONFIG');

// ----------------INITIALIZATION-------- ------------------ //

// initiallize firestore local server
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// initialize firebase for auth
firebase.initializeApp(firebaseConfig);

// --------------ROUTES---------------------------- //

const signup = require('./routes/signup');
const signin = require('./routes/signin');
const getScreams = require('./routes/getScreams');
const newScream = require('./routes/newScream');

// --------------MIDDLEWARE---------------------------- //
const protectedRoute = require('./middleware/protectedRoute');

// --------------SETTING UP---------------------------- //

app.use('/getscreams', getScreams);
app.use('/newscream', protectedRoute, newScream);
app.use('/signup', signup);
app.use('/signin', signin);

exports.api = functions.https.onRequest(app);
