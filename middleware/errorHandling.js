var util = require('util');

exports.httpErr = function (status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this, HttpError);
};

util.inherits(httpErr, Error);

httpErr.prototype.name = 'HttpError';