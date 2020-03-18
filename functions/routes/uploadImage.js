const express = require('express');
const route = express.Router();

route.post('/', (req, res) => {
  console.log(req.file);
  return res.send('test');
});

module.exports = route;
