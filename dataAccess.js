var fs = require('fs');
var uuid = require('uuid');


module.exports = {
    getUsers: getUsers,
    getUserById: getUserById,
    deleteUser: deleteUser,
    addUser: addUser,
};

function addUser(newUser, cb) {
   fs.readFile('users.json', {encoding: 'utf-8'}, function(err, data) {
      if (err) {
           return cb(err);
      }
      var users;
      try {
           users = JSON.parse(data);
      } catch (e) {
           return cb(e);
      }

      if(newUser.name && newUser.password) {
         newUser.id = uuid.v4();
         users.push(newUser);

         fs.writeFile('users.json', JSON.stringify(users), function(err) {
				if (err) {
					return cb(err);
				}
				cb(null, newUser);
			});

      }else {
         return cb({
            status: 400,
            message: "You didn`t input valid data"
         });
      }
      console.log(users);
   });
}

function deleteUser(userId, cb) {
   fs.readFile('users.json', {encoding: 'utf-8'}, function(err, data) {
      if (err) {
           return cb(err);
      }
      var users;
      try {
           users = JSON.parse(data);
      } catch (e) {
           return cb(e);
      }
      var newArray = users.filter(function(elem) {
         return elem.id !== userId;
      }) ;
      console.log(newArray);
      // console.log(uniqUser);
      if(newArray.length === users.length - 1) {
         fs.writeFile('users.json', JSON.stringify(newArray), function(err) {
				if (err) return cb(err);
			});
         return cb(null, newArray);
      }else {
         return cb({
             status: 404,
             message: 'User with this id is not found'
         });
      }
   });
}

// function deleteUser2(userId, cb) {
//    fs.readFile('users.json',{encoding:'utf-8'}, function (err, data) {
//       var users = JSON.parse(data);
//       console.log(users);
//       var newArray;
//       for (var key in users) {
//          if (users[key].id === userId) {
//                 uniqUser = users[key].name;
//          }else {
//       }
//    }
//
//       console.log(uniqUser);
//    });
// }

function getUserById(userId, cb) {
    fs.readFile('users.json', {encoding: 'utf-8'}, function(err, data) {
        if (err) return cb(err);
        var users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            return cb(e);
        }
        for (var key in users) {
            if (users[key].id === userId) {
                var uniqUser = users[key].name;
            }
        }

        if (uniqUser) {
            return cb(null, uniqUser);
        } else {
            return cb({
                status: 404,
                message: 'User with this id is not found'
            });
        }
    });
}

function getUsers(cb) {
    fs.readFile('users.json', {
        encoding: 'utf-8'
    }, function(err, data) {
        if (err) {
            return cb(err);
        }
        var users;
        try {
            users = JSON.parse(data);
        } catch (e) {
            return cb(e);
        }
        cb(null, users);
    });
}
