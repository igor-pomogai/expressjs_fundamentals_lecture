exports.authChecker = function (req, res, next) {
    if (req.session.auth) {
        next();
    } else {
        res.redirect("/");
    }
};