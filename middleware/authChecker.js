var HttpError = require('./errorHandling').HttpError;
exports.authChecker = function (req, res, next) {
    if (req.session && req.session.user === "user") {
        next();
    } else {
        throw new HttpError(401, "Access denied.")
    }
};