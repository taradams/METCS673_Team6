var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MessageSchema = new Schema(
  {
    Author: {type: Schema.ObjectId, ref: 'Account', required:true},
    created_date: {type: Date, default: Date.now,  required: true},
    message: {type: String, required: true}
 }
  
);



//Export model
module.exports = mongoose.model('Message', TaskSchema);