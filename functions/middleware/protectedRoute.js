// --------------IMPORTS---------------------------- //

const { admin, db } = require('../utility/firebaseAdmin');

// --------------MIDDLEWARE---------------------------- //

const protectedRoute = async (req, res, next) => {
  // if authorization header available
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    //   extract idToken from header and verify it
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      //   add decodedToken to req
      req.user = decodedToken;

      // extract user handle who tried to access the resource from database
      const user = await db
        .collection('users')
        .where('userId', '==', req.user.uid)
        .limit(1)
        .get();

      req.user.handle = user.docs[0].data().handle;
      req.user.imageUrl = user.docs[0].data().imageUrl;
      return next();
    } catch (err) {
      console.error('Invalid Token.');
      return res
        .status(403)
        .send({ error: `Access Denied. Unauthorized. `, err });
    }
  } else {
    console.error('No Token Found.');
    return res.status(403).send({ error: `Access Denied. No Token Found. ` });
  }
};

module.exports = protectedRoute;
