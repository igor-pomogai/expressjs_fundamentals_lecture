var express = require('express');
var dataAccess = require('./dataAccess');
var app = express();



app.get('/users', function (req, res) {
	res.send(dataAccess.getUserList());
});

app.get('/users/:id', function (req, res) {
	res.send(dataAccess.getUserById(req.params));
});



app.post('/users', function (req, res) {
	// res.send('Hello World!');
	console.log(req.query);
});





app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});