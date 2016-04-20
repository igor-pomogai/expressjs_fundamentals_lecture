var User = require('./User'); 
var fs = require('fs');
function getUsers(cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users);
    });
}

function deleteUser(id, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
            [].splice.call(users, id,1);
            fs.writeFile('./users.json', JSON.stringify(users), function(err)  {
                if (err) throw err;
            });
        } catch(e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users);
    });
}

function getUserById(id, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });

        cb(null, users[id]);
    });
}

function createUser(userObj, cb) {
    fs.readFile('./users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) throw err;
        try {
            var users = JSON.parse(data);
            var newUser = new User(userObj);
            users.push(newUser);
            fs.writeFile('./users.json', JSON.stringify(users), function(err)  {
                if (err) return err;
            });
        } catch(e) {
            return cb(e);
        }

        if (users.length === 0) return cb({
            status: 400,
            message: 'Users not found'
        });
        cb(null, users);
    });
}

module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.getUserById= getUserById;
module.exports.createUser = createUser;