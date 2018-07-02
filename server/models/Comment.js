var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CommentSchema = new Schema(
  {
    comment: {type: String, required: true},
    created_date: {type: Date, required: true},
    writer: {type: Schema.ObjectId, ref: 'Account', required: true},
    task: {type: Schema.ObjectId, ref: 'Task', required: true}

 }
  
);



//Export model
module.exports = mongoose.model('Comment', CommentSchema);