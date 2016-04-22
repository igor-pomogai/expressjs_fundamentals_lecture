module.exports = function (app) {
    var dataAccess = require('./logic/dataAccess');
    var errGen = require('./middleware/errorHandling').errGen;
    var auth = require('./middleware/authChecker').authChecker;

    app.get('/user', auth, function (req, res, next) {
        dataAccess.getAllUsr(function (err, usr) {
            errGen(err, next);
            res.send(usr);
        });
    });

    app.get('/user/:id', auth, function (req, res, next) {
        var usrId = req.params.id;
        dataAccess.getUsrById(usrId, function (err, usr) {
            errGen(err, next);
            res.send(usr);
        })
    });

    app.post('/user', auth, function (req, res, next) {
        var usr = req.body;
        console.log(usr.name);
        dataAccess.addUsr(usr, function (err, usr) {
            errGen(err, next);
            res.send(usr);
        });

    });

    app.delete('/user/:id', auth, function (req, res, next) {
        var usrId = req.params.id;
        dataAccess.delUsr(usrId, function (err, usr) {
            errGen(err, next);
            res.send(usr);
        })
    });

    // Login endpoint
    app.get('/login', function (req, res, next) {
        if (!req.query.username || !req.query.password) {
            res.send('login failed');
        } else if (req.query.username === "user" || req.query.password === "123") {
            req.session.user = "user";
            req.session.admin = true;
            res.send("Login successful, welcome " + req.session.user + '!');
        }
    });

    app.get('/', function (req, res) {
        if (req.session.user === 'user') {
            res.send('Welcome ' + req.session.user);
        }
        else {
            res.send('Please login');
        }
    });
};