var express = require('express');
var router = express.Router();

var config = require('../config');
var orch = require('orchestrate');
var db = orch(config.dbkey);

var orchDB = require("../database-orch.js");
var plainDB = require("../database.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  //var user = db.get("users", "Tom");
  res.render('login');
});
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var user;
  console.log(username);
  db.search("users", username)
  .then(function(result){
    user = result.body;
    console.log("Search succeeded: ", user);
    if (user.count >= 1) {
      if(user.results[0].value.username === username && user.results[0].value.password === password) {
        res.render('main', {username: username});
      } else {
        res.render('login', {error: 'Unable to authenticate user'});
      }
    }
  })

});

module.exports = router;
