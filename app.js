var express     =   require("express");
var bodyParser  =   require("body-parser");
var dataAccess  =    require('./dataAccess');
var app         =   express();
var util = require('util');

function HttpError(status, code, message) {
    this.status = status;
    this.message = message;
    this.code = getCodeInfo(code);
    Error.captureStackTrace(this, HttpError);
}
util.inherits(HttpError, Error);
HttpError.prototype.name = 'HttpError';
function authChecker(req, res, next) {
    if (req.session.auth) {
        next();
    } else {
       res.redirect("/");
    }
}


app.use(authChecker);
app.use(HttpError);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));
app.listen(3000);


app.get('/users', function(req, res, next) {
    dataAccess.getUsers(function(err, users) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(users);
    });
});

app.delete('/users/:user_id', function(req, res, next) {
	var deleteId = req.params.user_id;
	dataAccess.deleteUser(deleteId, function(err, users) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(users);
    });

})

app.get('/users/:user_id', function(req, res, next) {
    var getId = req.params.user_id;
    dataAccess.getUserById(getId, function(err, user) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(user);
    });
});


app.post('/users', function(req, res, next) {
    var newUser = req.body;
    console.log(newUser.name);
    dataAccess.createUser(newUser, function(err, users) {
        if (err && err.status) return next(new HttpError(err.status, err.message));
        if (err) return next(err);
        res.send(users);
    });

})