// --------------IMPORTS---------------------------- //

const express = require('express');
const admin = require('firebase-admin');
const validate = require('validate.js');

// --------------CONSTANTS---------------------------- //

const route = express.Router();
const db = admin.firestore();

// --------------ROUTE---------------------------- //

route.post('/', async (req, res) => {
  if (validate.isEmpty(req.body.body)) {
    return res.status(400).send({ error: 'Body must not be empty' });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
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

module.exports = route;
