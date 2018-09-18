// routes/index.js
var express = require('express');
var router = express.Router();

/* GET root */
router.get('/', function(req, res, next) {
  res.status(200)
    .json({
      url: req.url
    });
});

module.exports = router;