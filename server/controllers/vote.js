'use strict';

var router = require('express').Router();

router.get('/', function (req, res) {
  res.send({vote: 1});
});

module.exports = router;
