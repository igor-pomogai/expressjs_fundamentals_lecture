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
	if (req.body.name.length < 3 || req.body.password.length < 8) {
		throw new httpError(406, 'Not acceptable inputs length');
	}
	res.send('ID of new user is ' + dataAccess.addUser(req.body.name, req.body.password));
});

app.use('/users/:id', function (req, res, next) {
	if (req.method === 'GET') {
		if (dataAccess.getUserById(req.params)) {
			next();
		} else 
		throw new httpError(400, 'Not found \nNo user with such ID\ncheck ID with: get + /users');
	} else {
		next();
	}
});

app.get('/users/:id', function (req, res) {
	res.send(dataAccess.getUserById(req.params));
});


app.use('/users', function (req, res, next) {
	if (req.method === 'DELETE') {
		if (dataAccess.getUserById(req.body) !== false) {
			next();
		} else {
			throw new httpError(400, 'Not found \nNo user with such ID\ncheck ID with: get + /users');
		}
	} else {
		next();
	}
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