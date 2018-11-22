// routes/index.js
var express = require('express');
var hal = require('hal');
var router = express.Router();

/* GET root */
router.get('/', function(req, res, next) {
  res.json(new hal.Resource({}, '/'));
});

module.exports = router;