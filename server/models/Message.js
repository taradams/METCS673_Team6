var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    author: {type: String, default:"Elmo"}, //change this to Account object when implemented
    created_date: {type: Date, default: Date.now,  required: true},
    content: {type: String, required: true}
 }
  
);



//Export model
module.exports = mongoose.model('Message', MessageSchema);