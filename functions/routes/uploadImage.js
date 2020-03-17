const { admin, storage } = require('../utility/firebaseAdmin');

const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
  console.log(req.file);
  return res.send({
    message: 'good',
    file: req.file
  });
});

module.exports = route;
