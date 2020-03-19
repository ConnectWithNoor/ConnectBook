const express = require('express');
const { db } = require('../utility/firebaseAdmin');
const route = express.Router();

route.post('/', async (req, res) => {
  const userDetails = {
    bio: req.body.bio,
    website: req.body.website,
    location: req.body.location
  };

  try {
    await db.doc(`/users/${req.user.handle}`).update(userDetails);

    return res
      .status(201)
      .send({ message: 'Details added successfully', userDetails });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
});

module.exports = route;
