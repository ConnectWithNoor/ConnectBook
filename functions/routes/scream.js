const { db, storage } = require('../utility/firebaseAdmin');
const validate = require('validate.js');
const Busboy = require('busboy');
const path = require('path');
const os = require('os');
const fs = require('fs');

const FIREBASE_CONFIG = require('../env/FIREBASE_CONFIG');

exports.getAllScreams = async (req, res) => {
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
};

exports.getScream = async (req, res) => {
  try {
    const scream = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!scream._createTime) {
      return res.status(404).send({ message: 'No such scream found' });
    } else {
      const screamData = {
        ...scream.data(),
        screamId: scream.id
      };

      const comments = await db
        .collection('comments')
        .orderBy('createdAt', 'desc')
        .where('screamId', '==', screamData.screamId)
        .get();

      screamData.comments = comments.docs.map(comment => comment.data());

      return res.status(200).send({ message: 'success', screamData });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'something went wrong', err });
  }
};

exports.newScream = async (req, res) => {
  if (validate.isEmpty(req.body.body)) {
    return res.status(400).send({ error: 'Body must not be empty' });
  }

  const newScream = {
    body: req.body.body,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
    userImage: req.user.imageUrl,
    likeCount: 0,
    commentCount: 0
  };

  try {
    const scream = await db.collection('screams').add(newScream);
    const resScream = newScream;
    resScream.screamId = sceam.id;
    return res.status(201).send({
      message: `document ${scream.id} created successfully`,
      resScream
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message, code: err.code });
  }
};

exports.uploadImage = async (req, res) => {
  const busBoy = new Busboy({ headers: req.headers });

  let imgFileName;
  let imageUpload;

  busBoy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res
        .status(403)
        .send({ error: 'Invalid file type. only .jpeg and .png is allowed' });
    }
    const imgExt = filename.split('.').pop();
    // 37423847.png
    imgFileName = `${Math.round(Math.random() * 100000000)}.${imgExt}`;
    const imgPath = path.join(os.tmpdir(), imgFileName);
    imageUpload = {
      imgPath,
      mimetype
    };
    file.pipe(fs.createWriteStream(imgPath));
  });

  busBoy.on('finish', async () => {
    try {
      await storage.bucket().upload(imageUpload.imgPath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageUpload.mimetype
          }
        }
      });
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_CONFIG.storageBucket}/o/${imgFileName}?alt=media`;
      await db.doc(`/users/${req.user.handle}`).update({ imageUrl });

      return res.status(200).send({
        message: 'Image uploaded successfully'
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({ error: 'Something went wrong', err });
    }
  });

  busBoy.end(req.rawBody);
};

exports.commentOnScream = async (req, res) => {
  if (validate.isEmpty(req.body.body)) {
    return res.status(400).send({ error: 'Comment must not be empty' });
  }

  const newComment = {
    ...req.body,
    createdAt: new Date().toISOString(),
    screamId: req.params.screamId,
    userHandle: req.user.handle,
    userImage: req.user.imageUrl
  };

  try {
    const scream = await db.doc(`/screams/${req.params.screamId}`).get();
    if (!scream._createTime) {
      return res.status(404).send({ error: 'Scream Not Found' });
    }
    await db.collection('comments').add(newComment);

    return res.status(201).send({ message: 'New comment added', newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Something went wrong', err });
  }
};

exports.likeScream = async (req, res) => {};

exports.unlikeScream = async (req, res) => {};
