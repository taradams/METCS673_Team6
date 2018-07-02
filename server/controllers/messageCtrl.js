//import model
var Message = require('./../models/Message');


//display messages
exports.display_messages = function(req, res) {
    //looks at our Message Schema
    Message.find(function(err, messages) {
      if (err)
        res.send(err);
      //responds with a json object of our database comments.
      res.json(messages)
    });
  };


//add new message
exports.new_message = function(req,res) {
    var message = new Message();
    (req.body.message) ? message.message = req.body.message : null;

    message.save(function(err) {
      if (err)
        res.send(err);
      res.json({ message: 'Message successfully added!' });
    });
};
