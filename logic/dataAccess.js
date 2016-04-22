var userModel = require('./../models/userModel');
var fs = require('fs');

exports.getAllUsr = function (cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
        } catch (e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users);
    });
};

exports.delUsr = function (id, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
            [].splice.call(users, id, 1);
            fs.writeFile('./users.json', JSON.stringify(users), function (err) {
                if (err) throw err;
            });
        } catch (e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users);
    });
}

exports.getUsrById = function (id, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
        } catch (e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users[id]);
    });
}

exports.addUsr = function (userObj, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function (err, data) {
        if (err) throw err;
        try {
            var users = JSON.parse(data);
            var newUser = new userModel(userObj);
            users.push(newUser);
            fs.writeFile('./users.json', JSON.stringify(users), function (err) {
                if (err) return err;
            });
        } catch (e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });
        cb(null, users);
    });
}