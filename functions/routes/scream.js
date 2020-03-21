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
        ...item.data()
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
    newScream.screamId = scream.id;
    return res.status(201).send({
      message: `document ${scream.id} created successfully`,
      newScream
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
      console.error(err);
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
    await scream.ref.update({
      commentCount: scream.data().commentCount + 1
    });

    await db.collection('comments').add(newComment);

    return res.status(201).send({ message: 'New comment added', newComment });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Something went wrong', err });
  }
};

exports.likeScream = async (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  try {
    const scream = await screamDocument.get();

    if (!scream.exists) {
      return res.status(404).send({ error: 'scream not found' });
    } else {
      const screamData = {
        ...scream.data(),
        screamId: scream.id
      };

      const like = await likeDocument.get();

      // if not liked already
      if (like.empty) {
        const likeDetails = {
          screamId: req.params.screamId,
          userHandle: req.user.handle,
          createdAt: new Date().toISOString()
        };
        await db.collection('likes').add(likeDetails);
        screamData.likeCount = screamData.likeCount + 1;
        await screamDocument.update({ likeCount: screamData.likeCount });

        return res
          .status(201)
          .send({ message: 'scream liked successfully', screamData });
      } else {
        return res.status(400).send({ error: 'scream already liked' });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
};

exports.unlikeScream = async (req, res) => {
  const likeDocument = db
    .collection('likes')
    .where('userHandle', '==', req.user.handle)
    .where('screamId', '==', req.params.screamId)
    .limit(1);

  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  try {
    const scream = await screamDocument.get();

    if (!scream.exists) {
      return res.status(404).send({ error: 'scream not found' });
    } else {
      const screamData = {
        ...scream.data(),
        screamId: scream.id
      };

      const like = await likeDocument.get();

      // if not liked already
      if (like.empty) {
        return res.status(400).send({ error: 'scream already unliked' });
      } else {
        await db.doc(`/likes/${like.docs[0].id}`).delete();
        screamData.likeCount > 0 &&
          screamData.likeCount-- &&
          (await screamDocument.update({ likeCount: screamData.likeCount }));
        return res
          .status(201)
          .send({ message: 'scream unliked successfully', screamData });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
};

exports.deleteScream = async (req, res) => {
  const screamDocument = db.doc(`/screams/${req.params.screamId}`);
  const likesQuery = db
    .collection('likes')
    .where('screamId', '==', req.params.screamId);
  const commentQuery = db
    .collection('comments')
    .where('screamId', '==', req.params.screamId);

  try {
    const screamData = await screamDocument.get();

    if (!screamData.exists) {
      return res.status(404).send({ error: 'Scream doesnt exit' });
    }

    // if the user is not owner of the scream.
    if (screamData.data().userHandle !== req.user.handle) {
      return res.status(401).send({
        error: 'UnAuthorized, Only scream owners can delete their screams'
      });
    } else {
      await screamDocument.delete();

      // delete likes and comments on that scream
      const likes = await likesQuery.get();
      const comments = await commentQuery.get();

      if (!likes.empty) {
        likes.docs.forEach(async like => await like.ref.delete());
      }

      if (!comments.empty) {
        comments.docs.forEach(async comment => await comment.ref.delete());
      }

      return res.status(200).send({ message: 'Scream deleted successfully' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.code });
  }
};
