var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var dataAccess = require('./dataAccess');
var HttpError = require('./error').HttpError;

app.use(bodyParser.urlencoded({ extended: true }))

// ----------------  Authorization error Handler-------------
app.use(function(req,res,next){
    if(req.headers.authorization === "123"){
        next();
    }
    else{
        throw new HttpError(401,"Authorization Error");
    }
})

// ---------------- API ----------------------
app.get('/users', function(req, res, next) {
    dataAccess.getUsers(function(err, users) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(users);
    });
});

app.get('/users/:id', function(req, res,next) {
    var user = req.params;
    dataAccess.getUserById(user, function(err, user) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(user);
    });
});

app.post('/users', function(req, res,next) {
    var name = req.body.name;
    var password = req.body.password;
    dataAccess.addUser(name,password, function(err) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(name);
    });
});

app.delete('/users/:id', function(req, res,next) {
    var user = req.params
    dataAccess.deleteUser(user, function(err, user) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(user);
    });
});
// --------------- Error Handler--------------
app.use(function(err, req, res, next) {

  	if (err instanceof HttpError) {
  		res.send(err.status,err.message);
 	}
    else if (err instanceof Error) {
 		res.send(err);
  	}
});


app.listen(3000);
console.log('Do not touch - there is magic');
