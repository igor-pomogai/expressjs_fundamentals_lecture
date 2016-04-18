var dataAccess = require('./dataAccess');
var bodyParser = require('body-parser');
var httpError = require('./errorConstructor.js').httpError;

var express = require('express');
var app = express();


app.use(bodyParser.urlencoded({extended: true})); 

app.use(function (req, res, next) {
	if (+req.headers.authorization === 123) {
		next();
	} else {
		throw new httpError(401, 'Unauthorized - access denied due to bad header Authorization');
	}
});

app.get('/users', function (req, res) {
	res.send(dataAccess.getUserList());
});

app.post('/users', function (req, res) {
	res.send('ID of new user is ' + dataAccess.addUser(req.body.name, req.body.password));
});

app.use(function checkId(req, res, next) {
	console.log(req);
	if (dataAccess.getUserById(req.params)) {
		next();
	} else {
		throw new httpError(400, 'Bad Request \n No user with such ID\n check ID with: get + /users');
	}
});

app.get('/users/:id', function (req, res) {
	res.send(dataAccess.getUserById(req.params));
});

app.delete('/users', function (req, res) {
	res.send('You\'ve deleted user with ID ' + dataAccess.removeUser(req.body.id));	
});

app.use(function(req, res, next) {
	throw new httpError(400, 'Bad Request \n Use: \n - get + /users[id] \n - post + /users \n - delete + /users ');
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});