var express = require('express');
var router = express.Router();
var db = require("../database.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  var user = db.get("users", "Tom");
  res.render('login', { title: user.bio });
});
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var user = db.get('users', username);
  if (username === user.username && password === user.password) {
    res.render('main', {username: username});
  } else {
    res.render('login', {error: 'Unable to find user'});
  }
})

module.exports = router;
