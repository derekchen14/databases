var mysql = require('mysql');
var dbConnection = mysql.createConnection({
  user: "derekAndrew",
  password: "secureSecret",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/

exports.findAllMessages = function(cb){
  console.log('try to find messages');
  dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
    if (err) throw err;
    // console.log('fields: ', fields);
    console.log('error? ', err);
    console.log('Rows: ', rows);
    cb(rows);
  })
};

exports.saveMessage = function(message, userid, roomname, cb){
  console.log('try to save message ' ,message, ' userid ', userid, ' room ', roomname);
  // userid = escapeIt(userid);
  message = escapeIt(message);
  roomname = escapeIt(roomname);
  dbConnection.query('INSERT INTO messages (message, userID, roomName) VALUES ("' + message + '", ' + userid + ', "' + roomname + '")', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows-------: ', rows);
    cb && cb(rows);
  })
};

exports.findUser = function(username, cb){
  console.log('try to find user: ', username);
  username = escapeIt(username);
  dbConnection.query('SELECT * FROM users WHERE name = "'+username+'"', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows);
    cb && cb(rows);
  })
};

exports.saveUser = function(username, cb){
  console.log('try to save user');
  username = escapeIt(username);
  dbConnection.query('INSERT INTO users (name) VALUES ("' + username + '")', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows, " fields ", fields);
    exports.findUser(username, cb);
  })
};

var escapeIt = function(string){
  //look for and replace single quotes with \'
  return string.replace("'", "\\'");
};

