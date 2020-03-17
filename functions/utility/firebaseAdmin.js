const admin = require('firebase-admin');
const serviceAccountKey = require('../env/SERVICE_ACCOUNT_KEY.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

const db = admin.firestore();
const storage = admin.storage();

module.exports = {
  admin,
  db,
  storage
};
