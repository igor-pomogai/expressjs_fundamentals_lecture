var fs = require('fs');

function getUnicId() {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj.sort(function(a, b) {return a.id < b.id;});
	return obj[0].id + 1;
}

function addUser (name, password) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	id = getUnicId();
	obj.push({name: name, password: password, id: id});	
	fs.writeFileSync('users.json', JSON.stringify(obj));
	return id;
}

function removeUser (id) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	objNew = obj.filter(function(item) {
		return item.id !== +id;
	});
	fs.writeFileSync('users.json', JSON.stringify(objNew));
	return id;
}

function getUserList() {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	var arrToString = '';
	obj.forEach(function(item) {
		arrToString = arrToString + 'id: ' + item.id + ', name: ' + item.name + '\n';
	});
	return arrToString;
}

function getUserById(id) {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj = obj.filter(function(item) {
		return item.id === +id.id;});
	return (obj[0])? obj[0].name : false;
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