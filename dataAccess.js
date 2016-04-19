var fs = require('fs');
var uuid = require('uuid');

module.exports = {
	addUser: addUser,
	removeUser: removeUser,
	getUserList: getUserList,
	getUserById: getUserById
};


function getUserList(cb) {
	fs.readFile('users.json', {encoding: 'utf-8'}, function(err, data) {
		if (err) {
			return cb(err);
		}
		var users;
		try {
			users = JSON.parse(data);
		} catch(e) {
			return cb(e);
		}	
		cb(null, users);		
	});
}

function getUserById(userId, cb) {
	fs.readFile('users.json', {encoding: 'utf8'}, function(err, data) {
		if (err) {
			return cb(err);
		}
		var users;
		try {
			users = JSON.parse(data);
		} catch(e) {
			return cb(e);
		}
		var userArr = users.filter(function(item) {
			return item.id === userId;
		});
		if (userArr.length === 0) {
			return cb({
				status: 404,
				message: 'No user with this ID'
			});
		} else {
			cb(null, userArr[0].name);
		}
	});
}

function removeUser(userId, cb) {
	fs.readFile('users.json', {encoding: 'utf8'}, function(err, data) {
		if (err) {
			return cb(err);
		}
		var users;
		try {
			users = JSON.parse(data);	
		} catch(e) {
			return cb(e);
		}
		var usersNew = users.filter(function(item) {
			return item.id !== userId;
		});
		if (usersNew.length !== users.length - 1) {
			return cb({
				status: 404,
				message: 'No user with this ID'
			});
		} else {
			fs.writeFile('users.json', JSON.stringify(usersNew), function(err) {
				if (err) {
					return cb(err);
				}
				cb();
			});
		}
	});
}

function addUser(user, cb) {
	fs.readFile('users.json', {encoding: 'utf8'}, function(err, data) {
		if (err) {
			return cb(err);
		}
		var users;
		try {
			users = JSON.parse(data);	
		} catch(e) {
			return cb(e);
		}
		if (user.name.length < 3 || user.password.length < 3) {
			return cb({
				status: 400,
				message: 'Not acceptable inputs length'
			});
		} else {
			var userId = uuid.v4();
			users.push({name: user.name, password: user.password, id: userId});
			fs.writeFile('users.json', JSON.stringify(users), function(err) {
				if (err) {
					return cb(err);
				}
				cb(null, userId);
			});
		}
	});
}