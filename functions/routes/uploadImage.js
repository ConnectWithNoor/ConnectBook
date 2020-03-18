const express = require('express');
const route = express.Router();

route.post('/', upload.single('image'), (req, res) => {
  console.log(req.file);
  return res.send('test');
});

module.exports = route;
