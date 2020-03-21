const { db } = require('../utility/firebaseAdmin');
const { auth } = require('../utility/firebase');
const validate = require('validate.js');
const validateConstraints = require('../utility/validateConstraints');

exports.addUserDetails = async (req, res) => {
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
};

exports.getUserDetails = async (req, res) => {
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

      const notifications = await db
        .collection('notifications')
        .where('recipient', '==', req.user.handle)
        .orderBy('createdAt', 'desc')
        .get();
      userData.notifications = notifications.docs.map(noti => {
        return {
          ...noti.data(),
          notificationId: noti.id
        };
      });
      return res.status(200).send({ message: 'user data fetched', userData });
    } else {
      console.error('user data doesnt exist');
      return res.status(400).send({ error: 'user data doesnt exist' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
};

exports.signin = async (req, res) => {
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
};

exports.signup = async (req, res) => {
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
        userId: newUser.user.uid,
        imageUrl:
          'https://firebasestorage.googleapis.com/v0/b/connectbook-5628f.appspot.com/o/avatar.png?alt=media'
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
};

exports.getAnyUserDetails = async (req, res) => {
  const userData = {};
  try {
    const userSnap = await db.doc(`/users/${req.params.handle}`).get();
    if (userSnap.exists) {
      userData.user = userSnap.data();

      const screamSnap = await db
        .collection('screams')
        .where('userHandle', '==', req.params.handle)
        .orderBy('createdAt', 'desc')
        .get();

      userData.screams = screamSnap.docs.map(scream => ({
        ...scream.data(),
        screamId: scream.id
      }));

      return res.status(200).send(userData);
    } else {
      res.status(404).send({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code, err });
  }
};

exports.markNotificaionsRead = async (req, res) => {
  // try {
  //   let batch = db.batch();
  //   req.body.forEach(async notificationId => {
  //     const notification = db.doc(`/notifications/${notificationId}`);
  //     batch.update(notification, { read: true });
  //   });
  //   await batch.commit();
  //   return res.status(200).send({ message: 'notifications marked read' });
  // } catch (err) {
  //   console.error(err);
  //   return res.status(500).send({ error: err.message, code: err.code, err });
  // }
};
