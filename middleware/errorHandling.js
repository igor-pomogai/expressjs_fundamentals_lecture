var util = require('util');

exports.HttpError = function (status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, exports.HttpError);
};

exports.errGen = function (err, next) {
    if (err && err.status) return next(new exports.HttpError(err.status, err.message));
    if (err) return next(err);
};

util.inherits(exports.HttpError, Error);

exports.HttpError.prototype.name = 'HttpError';