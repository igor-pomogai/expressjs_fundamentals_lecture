var fs = require('fs');

function getUnicId() {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj.sort(function(a, b) {return a.id < b.id;});
	return obj[0].id + 1;
}

function addUser (name, password) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj.push({name: name, password: password, id: getUnicId()});	
	fs.writeFileSync('users.json', JSON.stringify(obj));
}

function removeUser (id) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj = obj.filter(function(item) {
		return item.id !== id;});
	fs.writeFileSync('users.json', JSON.stringify(obj));
}

function getUserList() {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj = obj.map(function(item) {
		delete item.password;
		return item;
	});
	return obj;
}

function getUserById(id) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj = obj.filter(function(item) {
		return item.id === +id.id;});
	return obj[0].name;
}

module.exports = {
	getUserById: getUserById,
	getUserList: getUserList,
	removeUser: removeUser,
	addUser: addUser,
};

// removeUser(1);
// addUser('natalka', "ygougo");
// console.log(getUserList());
// console.log(getUserById(3));