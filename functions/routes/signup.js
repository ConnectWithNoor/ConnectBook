// --------------IMPORT---------------------------- //

const express = require('express');
const validate = require('validate.js');
const { db } = require('../utility/firebaseAdmin');
const { auth } = require('../utility/firebase');
const validateConstraints = require('../utility/validateConstraints');

// --------------CONSTANTS---------------------------- //

const route = express.Router();

// --------------ROUTE---------------------------- //

route.post('/', async (req, res) => {
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

module.exports = route;
