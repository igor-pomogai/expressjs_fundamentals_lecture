var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var httpError = require('./errorConstructor.js').httpError;
var dataAccess = require('./dataAccess');

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	var head = Number(req.headers.authorization);
	if(head === 123) {
		next();
	}else {
		throw new httpError(401, 'Unauthorized - access denied due' +
		 'to bad header Authorization');
	}
});

app.get('/users', function (req, res, next) {
	dataAccess.getUsers(function(err, users) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send(users);
	});
});

app.get('/users/:id', function (req, res, next) {
	dataAccess.getUserById(req.params.id, function (err, user) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send(user);
	});
});

app.delete('/users/:id', function (req, res, next) {
	dataAccess.deleteUser(req.params.id, function (err, user) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		console.log(user);
		res.send('user with id ' + req.params.id + ' was deleted');
	});
});

app.post('/users', function (req, res, next) {
	var newUser = {name: req.body.name, password: req.body.password};
	dataAccess.addUser(newUser, function (err, user) {
		if (err && err.status) return next(new httpError(err.status, err.message));
		if (err) return next(err);
		res.send('You have created user: ' + user.name + ' id: ' + user.id);
	});
});

app.use(function(req, res, next) {
	next(new httpError(400, 'Bad Request'));
});

app.use(function(err, req, res, next) {
	if (err instanceof httpError) {
		res.status(err.status).send(err.message);
	} else {
		res.send('Unknown error:\n' + err);
	}
});

app.listen(3000, function() {
   console.log("Server is runnig on port 3000");
});
