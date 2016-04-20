function User (userObj) {
	this.name = userObj.name || 'Ivan';
	this.surname = userObj.surname || 'Popov';
	this.email = userObj.email || 'example@gmail.com';
}

module.exports = User;