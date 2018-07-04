var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    task_type: {type: String},
    status: {type: Schema.ObjectId, ref:'Column'},
    Assignee: {type: Schema.ObjectId, ref: 'Account'},//make this a string?
    Reporter: {type: Schema.ObjectId, ref: 'Account'},//make this a string?
    created_date: {type: Date, default: Date.now,  required: true},
    updated_date: {type:Date},
    overview: {type: String},
    details: {type: String}
 }
  
);



//Export model
module.exports = mongoose.model('Task', TaskSchema);