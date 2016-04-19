var fs = require('fs');
var uuid = require('uuid');

module.exports = {
    getUsers : getUsers, //Function to get Users list
    getUserById:getUserById,//Function to get user by unic Id
    addUser:addUser,//Function to add new user
    deleteUser:deleteUser//Function to delete user by id
}

function getUsers(cb) {
    fs.readFile('users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) return cb(err);

        try {
            var users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        cb(null, users);
    });
}

function getUserById (id,cb){

    fs.readFile('users.json',{encoding: 'utf-8'},function(err,data){
        if (err) return cb(err);
            var users;
        try {
             users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        var  finedUsers = users.filter(function(item){
            return item.id === id.id
        })
        cb(null,finedUsers[0]);

    });

}

function addUser(name,password,cb){

    fs.readFile('users.json',{encoding: 'utf-8'},function(err,data){

        if (err) return cb(err);
        var users = []
        try {
             users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        if(name.length === 0){
             return cb({
                status: 400,
                message: 'Please enter username'
            });

        }
        else if(password.length === 0){
            return cb({
               status: 400,
               message: 'Please enter user password'
           });
        }
        users.push({name:name,id:uuid.v1(),password:password});
        fs.writeFileSync('users.json',JSON.stringify(users));
        cb(null,name);
    })
}

function deleteUser(id,cb){
    fs.readFile('users.json',{encoding: 'utf-8'},function(err,data){

        if (err) return cb(err);
        var users = []
        try {
             users = JSON.parse(data);
        } catch(e) {
            return cb(e);
        }

        var deleted = false;
        for(var i = 0;i<users.length;i++){
            if(users[i].id == id.id){
                deleted=true
                users.splice(i,1);
            }
        }
        if (!deleted) return cb({status: 400, message: 'User to delete - not found'})
        fs.writeFileSync('users.json',JSON.stringify(users));
        cb(null,deleted);
    })
}
