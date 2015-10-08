//npm install express
//npm install body-parser
//and node multi-server.js
//when reload page in browser (localhost:3000)
// any time make changes in this file, need to reload server (node multi-server.js in console) ctrl+c to leave

var express = require('express');

var bodyParser = require('body-parser');

var config = require('/.config');
var orch = require('orchestrate');
var db = orch(config.dbkey);

var app = express();

var database = require('./demos/database.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(express.static(__dirname));



function showData(collname) {
	console.log(collname+' data store is now: ', database[collname]);
}

function getOne(collname) {
	app.get('/'+collname+'/:id', function (req, res) {
		var id = req.params.id;
		console.log('Sending model #%s...',id);
		res.send(database[collname][id]);
	});
}

function putOne(collname) {
	app.put('/'+collname+'/:id', function (req, res) {
		var id = req.params.id;
		console.log('Receiving model #%s...',id);
		database[collname][id] = req.body;
		showData(collname);
		res.send({});
	});
}

function postOne(collname) {
	app.post('/'+collname, function (req, res) {
		console.log('Receiving new model...');
		var newid = collname.length;
		console.log('Assigning id of %s',newid);
		var obj = req.body;
		obj.id = newid;
		database[collname][newid] = obj;
		showData(collname);
		res.send(obj);
	});
}

function getAll(collname) {
	app.get('/'+collname, function (req, res) {
		console.log('Sending all models...');
		showData(collname);
		res.send(database[collname]);
	});
}

function makeRoutes(collname) {
	getOne(collname);
	postOne(collname);
	putOne(collname);
	getAll(collname);
}

Object.keys(database).forEach(makeRoutes);

app.listen(3000);
Object.keys(database).forEach(showData);
