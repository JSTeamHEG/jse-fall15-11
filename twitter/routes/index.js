var express = require('express');
var router = express.Router();
var db = require("../database.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = db.get("users", "Tom");
  res.render('index', { title: user.bio });
});

module.exports = router;
