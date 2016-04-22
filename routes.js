module.exports = function(app) {
    var dataAccess = require('./logic/dataAccess');
    app.get('/user', dataAccess.getAllUsr);
    app.get('/user/:id', dataAccess.getUsrById);
    app.post('/user', dataAccess.addUsr);
    app.delete('/user/:id', dataAccess.delUsr);
};