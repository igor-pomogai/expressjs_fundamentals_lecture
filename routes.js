module.exports = function (app) {
    var dataAccess = require('./logic/dataAccess');
    var errGen = require('./middleware/errorHandling').errGen;
    var auth = require('./middleware/authChecker').authChecker;

    app.get('/user', auth, function (req, res, next) {
        dataAccess.getAllUsr(function (err, users) {
            errGen(err, next);
            res.send(users);
        });
    });

    app.get('/user/:id', dataAccess.getUsrById);

    app.post('/user', function (req, res, next) {
        var usr = req.body;
        console.log(usr.name);
        dataAccess.addUsr(usr, function (err, users) {
            errGen(err, next);
            res.send(users);
        });

    });

    app.delete('/user/:id', dataAccess.delUsr);

    // Login endpoint
    app.get('/login', function (req, res) {
        if (!req.query.username || !req.query.password) {
            res.send('login failed');
        } else if (req.query.username === "user" || req.query.password === "123") {
            req.session.user = "user";
            req.session.admin = true;
            res.send("login success!");
        }
    });
};