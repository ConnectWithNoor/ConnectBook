const firebase = require('firebase');

const firebaseConfig = require('../env/FIREBASE_CONFIG');

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

module.exports = {
  firebase,
  auth
};
