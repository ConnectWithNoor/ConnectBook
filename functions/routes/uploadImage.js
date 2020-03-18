const express = require('express');
const Busboy = require('busboy');
const { storage, db } = require('../utility/firebaseAdmin');
const path = require('path');
const os = require('os');
const fs = require('fs');

const FIREBASE_CONFIG = require('../env/FIREBASE_CONFIG');

const route = express.Router();

route.post('/', (req, res) => {
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
});

module.exports = route;
