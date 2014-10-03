var db = require('./db');
var serverHelpers = require('./server-helpers');
// wham! magic.
var parseData = serverHelpers.collectData;
var saveMessage = db.saveMessage;
var saveUser = db.saveUser;
var findAllMessages = db.findAllMessages;
var findUser = db.findUser;


exports.postMessage = function(req, res) {
  console.log('post message');
  // declare this variable so we can retain access to it throughout the entire promise chain.
  var message;

  var resultsCallback = function (results) {
    console.log('results callback ', results);
      if (!Array.isArray(results)) results = [results];
      console.log("chat thing from results Callback: ", results[0]);
      var chat = {
        message: message.message,
        username: results[0].id,
        roomname: message.roomname
      };

      saveMessage(chat.message, chat.username, chat.roomname, function () {
        serverHelpers.sendResponse(res, message);
      });
  };

  parseData(req, function(_, msg) {
      message = msg;
      findUser(msg.username, function (err, results) {
        // no results/0 results
        if (!results || !results.length) {
          // create the user, then post the message
          saveUser(msg.username, function(rows){
            console.log('user returned rows: ' , rows);
            resultsCallback(rows);
          });
        } else {
          // user exists, post the message to this user
          console.log(msg.username + ' exists');
          console.log('with rows: ', results);
          resultsCallback(results);
        }
      });
  });
};

exports.getMessages = function(req, res) {
  findAllMessages(function(rows) {
    console.log('request handler - get messages: ' , rows);
      serverHelpers.sendResponse(res, rows);
  });
};

exports.sendOptionsResponse = function(req, res) {
  serverHelpers.sendResponse(res, null);
};
