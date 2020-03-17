const multer = require('multer');

const imgFileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid File Type'), false);
  }
};

const imgUpload = multer({
  limits: {
    fileSize: 1024 * 1024 * 5 // 5mb
  },
  fileFilter: imgFileFilter
});

module.exports = {
  imgUpload
};
