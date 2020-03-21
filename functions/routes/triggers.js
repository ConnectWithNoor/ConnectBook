// no req, res because it is a db trigger not an API call

const { db } = require('../utility/firebaseAdmin');

exports.likeNotification = async snapshot => {
  try {
    const screamDocument = await db
      .doc(`/screams/${snapshot.data().screamId}`)
      .get();
    if (screamDocument.exists) {
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
      console.error('scream not found');
      return;
    }
  } catch (err) {
    console.error(err);
    return;
  }
};

exports.unLikeNotification = async snapshot => {
  //   try {
  //     await db.doc(`/notifications/${snapshot.id}`).delete();
  //     return;
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
};

exports.commentNotification = async snapshot => {
  //   try {
  //     const screamDocument = await db
  //       .doc(`/screams/${snapshot.data().screamId}`)
  //       .get();
  //     if (screamDocument.exists) {
  //       const notificationDetails = {
  //         createdAt: new Date().toISOString(),
  //         recipient: screamDocument.data().userHandle,
  //         sender: snapshot.data().userHandle,
  //         type: 'comment',
  //         read: false,
  //         screamId: snapshot.data().screamId
  //       };
  //       await db.doc(`/notifications/${snapshot.id}`).set(notificationDetails);
  //       return;
  //     } else {
  //       console.error('scream not found');
  //       return;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     return;
  //   }
};
