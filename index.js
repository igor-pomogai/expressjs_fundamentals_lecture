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

app.get('/users', function (req, res, next) {
	dataAccess.getUserList(function(err, users) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send(users);
	});
});

app.get('/users/:id', function (req, res, next) {
	dataAccess.getUserById(req.params.id, function(err, userName) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send(userName);
	});
});

app.delete('/users/:id', function (req, res, next) {
	dataAccess.removeUser(req.params.id, function(err) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send('You\'ve deleted user with ID ' + req.params.id);
	});
});

app.post('/users', function (req, res, next) {
	var user = {name: req.body.name, password: req.body.password};
	dataAccess.addUser(user, function(err, userId) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send('You\'ve created new user, ID = ' + userId);
	});
});

app.use(function(req, res, next) {
	next(new httpError(400, 'Bad Request \n Use: \n - get + /users/[id] \n - post + /users \n - delete + /users/id'));
});

app.use(function(err, req, res, next) {
	if (err instanceof httpError) {
		res.status(err.status).send(err.message);
	} else {
		res.send('Unknown error:\n' + err);
		// throw err;
	}
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});