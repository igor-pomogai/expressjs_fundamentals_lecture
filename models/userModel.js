exports.User = function (reqBody) {
    this.name = reqBody.name;
    this.surname = reqBody.surname;
    this.email = reqBody.email;
    this.password = reqBody.password;
};