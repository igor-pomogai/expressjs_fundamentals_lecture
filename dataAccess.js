var fs = require('fs');

module.exports = {
	addUser: function(name, password) {
		var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
		id = getUnicId();
		obj.push({name: name, password: password, id: id});	
		fs.writeFileSync('users.json', JSON.stringify(obj));
		return id;
	},
	removeUser: function  (id) {
		var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
		objNew = obj.filter(function(item) {
			return item.id !== +id;
		});
		fs.writeFileSync('users.json', JSON.stringify(objNew));
		return id;
	},
	getUserList: function() {
		var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
		var arrToString = '';
		obj.forEach(function(item) {
			arrToString = arrToString + '\nid: ' + item.id + ', name: ' + item.name;
		});
		return arrToString;
	},
	getUserById: function(id) {
		var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
		obj = obj.filter(function(item) {
			return item.id === +id.id;});
		return (obj[0])? obj[0].name : false;
	}
};

function getUnicId() {
	var obj = JSON.parse(fs.readFileSync('users.json', 'utf8'));
	obj.sort(function(a, b) {return a.id < b.id;});
	return obj[0].id + 1;
}