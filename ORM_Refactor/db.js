var Sequelize = require('sequelize');
var sqz = new Sequelize("chat", "derekAndrew", "secureSecret");

var User = sqz.define('User', {
  name: Sequelize.STRING,
  friends:Sequelize.INTEGER
});

var Message = sqz.define('Message', {
  userID: Sequelize.INTEGER,
  message: Sequelize.STRING,
  roomName: Sequelize.STRING
});

var Room = sqz.define('Room', {
  roomName: Sequelize.STRING
});

exports.findAllMessages = function(cb){
  Message.findAll().success(function(messages){
    cb(messages);
  });
};

exports.saveMessage = function(message, userid, roomname, cb){
  var newMessage = Message.build({message: message,
    userID: userid,
    roomName: roomname
  });
  newMessage.save().success(function(data){
    cb(data);
  });
};

exports.findUser = function(username, cb){
  User.findAll({where: {name: username}}).success(function(users){
    cb(users);
  })
};

exports.saveUser = function(username, cb){
  var newUser = User.build({name:username});
  newUser.save().success(function(){
    exports.findUser(username, cb);
  });
};
