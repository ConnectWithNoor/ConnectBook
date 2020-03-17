// --------------IMPORTS---------------------------- //

const express = require('express');
const { db } = require('../utility/firebaseAdmin');

// --------------CONSTANTS---------------------------- //

const route = express.Router();

// --------------ROUTE---------------------------- //

route.get('/', async (req, res) => {
  try {
    const data = await db
      .collection('screams')
      .orderBy('createdAt', 'desc')
      .get();

    const screams = data.docs.map(item => {
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

module.exports = route;
