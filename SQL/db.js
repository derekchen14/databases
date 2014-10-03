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
  dbConnection.query('SELECT * FROM messages', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows);
    cb && cb(rows);
  })
};

exports.findUser = function(username, cb){
  dbConnection.query('SELECT * FROM users WHERE name IS '+username, function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows);
    cb && cb(rows);
  })
};

exports.saveUser = function(username, cb){
  dbConnection.query('INSERT INTO users (name) VALUES (' + username + ')', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows);
    cb && cb(rows);
  })
};

exports.saveMessage = function(message, userid, roomname, cb){
  dbConnection.query('INSERT INTO messages (message, userID, roomID) VALUES
    (' + message + ', ' + userid + ', ' + roomname + ')', function(err, rows, fields) {
    if (err) throw err;
    console.log('Rows: ', rows);
    cb && cb(rows);
  })
};
