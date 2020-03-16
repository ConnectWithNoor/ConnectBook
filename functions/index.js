// -----------------IMPORTS------------------------- //

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebase = require('firebase');
const app = require('express')();
const validate = require('validate.js');

const serviceAccountKey = require('./env/SERVICE_ACCOUNT_KEY.json');
const firebaseConfig = require('./env/FIREBASE_CONFIG');

// ----------------INITIALIZATION-------------------------- //

// initiallize firestore local server
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

// initialize firebase for auth
firebase.initializeApp(firebaseConfig);

// --------------CONSTANTANTS---------------------------- //

const db = admin.firestore();
const auth = firebase.auth();

const validateConstraints = {
  from: {
    email: true
  },
  confirmPassword: {
    equality: 'password',
    length: {
      minimum: 8
    }
  }
};

// ----------------ROUTES-------------------------- //

// get all screams
app.get('/getscreams', async (req, res) => {
  try {
    const data = await db
      .collection('screams')
      .orderBy('createdAt', 'desc')
      .get();

    const screams = await data.docs.map(item => {
      return {
        screamId: item.id,
        body: item.data().body,
        userHandle: item.data().userHandle,
        createdAt: item.data().createdAt
      };
    });
    return res.status(200).send(screams);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code });
  }
});

// post new scream

app.post('/newscream', async (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  try {
    const scream = await db.collection('screams').add(newScream);
    return res
      .status(201)
      .send({ message: `document ${scream.id} created successfully` });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code });
  }
});

// signup new registration

app.post('/signup', async (req, res) => {
  const newUserInfo = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle
  };

  //   validating the user input

  if (validate.isEmpty(newUserInfo.email)) {
    return res.status(400).send({ error: 'Please enter a valid email' });
  } else if (validate.isEmpty(newUserInfo.password)) {
    return res.status(400).send({ error: 'Please enter a valid password' });
  } else if (validate.isEmpty(newUserInfo.confirmPassword)) {
    return res.status(400).send({ error: 'Please enter a valid password' });
  } else if (validate.isEmpty(newUserInfo.handle)) {
    return res.status(400).send({ error: 'Please enter a valid handle' });
  } else if (validate({ from: newUserInfo.email }, validateConstraints)) {
    return res.status(400).send({ error: 'Please enter a valid email' });
  } else if (
    validate(
      {
        password: newUserInfo.password,
        confirmPassword: newUserInfo.confirmPassword
      },
      validateConstraints
    )
  ) {
    return res.status(400).send({
      error: 'Password must match or must be minumum 8 characters long'
    });
  }

  try {
    //  validate the newUserInfo details on firebase
    const isUser = await db.doc(`/users/${newUserInfo.handle}`).get();
    if (isUser.exists) {
      // if handle already exists return error
      return res.status(400).send({ error: `this handle is already taken` });
    } else {
      // proceed signup request
      const newUser = await auth.createUserWithEmailAndPassword(
        newUserInfo.email,
        newUserInfo.password
      );
      // get newUser token
      const token = await newUser.user.getIdToken();

      const userCredentials = {
        handle: newUserInfo.handle,
        email: newUserInfo.email,
        createdAt: new Date().toISOString(),
        userId: newUser.user.uid
      };

      // create new document on collection('/users')wrt userHandle
      const data = await db
        .doc(`/users/${newUserInfo.handle}`)
        .set(userCredentials);

      return res.status(201).send({
        message: `user ${newUser.user.uid} signed up successfully`,
        token
      });
    }
  } catch (err) {
    if (err.code === 'auth/email-already-in-use') {
      return res.status(400).send({ error: `this email is already taken` });
    }
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code, err });
  }
});

exports.api = functions.https.onRequest(app);
