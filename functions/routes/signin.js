// --------------IMPORTS---------------------------- //

const express = require('express');
const validate = require('validate.js');
const { auth } = require('../utility/firebase');

// --------------CONSTANTS---------------------------- //

const route = express.Router();

// --------------ROUTE---------------------------- //

route.post('/', async (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password
  };

  //   validate user input

  if (validate.isEmpty(user.email)) {
    return res.status(400).send({ error: 'Please enter a valid email' });
  } else if (validate.isEmpty(user.password)) {
    return res.status(400).send({ error: 'Please enter a valid password' });
  }

  try {
    const signin = await auth.signInWithEmailAndPassword(
      user.email,
      user.password
    );

    const token = await signin.user.getIdToken();
    return res.status(202).send({
      message: `user ${signin.user.uid} signed in successfully`,
      token
    });
  } catch (err) {
    if (err.code === 'auth/wrong-password') {
      return res
        .status(403)
        .send({ error: 'Invalid Credentials. Please try again' });
    }
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code, err });
  }
});

module.exports = route;
