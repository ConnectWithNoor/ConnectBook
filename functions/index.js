const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

const serviceAccountKey = require('./env/SERVICE_ACCOUNT_KEY.json');

// initiallize firebase local server
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

const db = admin.firestore();

app.get('/screams', (req, res) => {
  db.collection('screams')
    .orderBy('createdAt', 'desc')
    .get()
    .then(data => {
      const screams = [];
      data.forEach(doc => {
        screams.push(doc.data());
      });
      return res.status(200).send(screams);
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: err.message, code: err.code });
    });
});

app.post('/scream', (req, res) => {
  const newScream = {
    body: req.body.body,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString()
  };

  db.collection('screams')
    .add(newScream)
    .then(doc => {
      return res
        .status(201)
        .send({ message: `document ${doc.id} created successfully` });
    })
    .catch(err => {
      console.log(err);
      return res.status(500).send({ error: err.message, code: err.code });
    });
});

exports.api = functions.https.onRequest(app);
