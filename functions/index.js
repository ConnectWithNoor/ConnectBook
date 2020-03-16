const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = require('express')();

// initial admin sdk in a cloud functions in Node Environment.
admin.initializeApp(functions.config().firebase);

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
      return res.status(500).send({ error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
