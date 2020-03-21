// no req, res because it is a db trigger not an API call

const { db } = require('../utility/firebaseAdmin');

exports.likeNotification = async snapshot => {
  try {
    const screamDocument = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    // no notification if
    if (screamDocument.exists) {
      // if not liking on self scream
      if (screamDocument.data().userHandle !== snapshot.data().userHandle) {
        const notificationDetails = {
          createdAt: new Date().toISOString(),
          recipient: screamDocument.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'like',
          read: false,
          screamId: snapshot.data().screamId
        };
        await db.doc(`/notifications/${snapshot.id}`).set(notificationDetails);
        return;
      } else {
        return;
      }
    } else {
      console.error('scream not found');
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.unLikeNotification = async snapshot => {
  try {
    await db.doc(`/notifications/${snapshot.id}`).delete();
    return;
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.commentNotification = async snapshot => {
  try {
    const screamDocument = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    if (screamDocument.exists) {
      // if not commenting on self scream
      if (screamDocument.data().userHandle !== snapshot.data().userHandle) {
        const notificationDetails = {
          createdAt: new Date().toISOString(),
          recipient: screamDocument.data().userHandle,
          sender: snapshot.data().userHandle,
          type: 'comment',
          read: false,
          screamId: snapshot.data().screamId
        };
        await db.doc(`/notifications/${snapshot.id}`).set(notificationDetails);
        return;
      } else {
        return;
      }
    } else {
      console.error('scream not found');
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.userImageUpdate = async change => {
  const batch = db.batch();
  if (change.before.data().imageUrl !== change.after.data().imageUrl) {
    try {
      console.log('123');
      const screamsDocument = await db
        .collection('screams')
        .where('userHandle', '==', change.before.data().handle)
        .get();

      const commentDocument = await db
        .collection('comments')
        .where('userHandle', '==', change.before.data().handle)
        .get();
      console.log('456');

      screamsDocument.docs.map(scream => {
        const screamData = db.doc(`/screams/${scream.id}`);
        batch.update(screamData, { userImage: change.after.data().imageUrl });
      });

      commentDocument.docs.map(comment => {
        const commentData = db.doc(`/comments/${comment.id}`);
        batch.update(commentData, { userImage: change.after.data().imageUrl });
      });

      await batch.commit();
      console.log('723');
      return;
    } catch (err) {
      console.error(err);
      return;
    }
  }
};
