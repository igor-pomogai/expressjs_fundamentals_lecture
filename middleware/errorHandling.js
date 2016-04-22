var util = require('util');

exports.HttpError = function (status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
};

util.inherits(exports.HttpError, Error);

exports.HttpError.prototype.name = 'HttpError';