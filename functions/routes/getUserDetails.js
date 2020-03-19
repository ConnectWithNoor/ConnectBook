const express = require('express');
const { db } = require('../utility/firebaseAdmin');
const route = express.Router();

route.get('/', async (req, res) => {
  let userData = {};
  try {
    const doc = await db.doc(`/users/${req.user.handle}`).get();
    if (doc.exists) {
      userData.credentials = doc.data();

      const likes = await db
        .collection('likes')
        .where('userHandle', '==', req.user.handle)
        .get();

      userData.likes = likes.docs.map(like => like.data());

      return res.status(200).send({ message: 'user data fetched', userData });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
});

module.exports = route;
