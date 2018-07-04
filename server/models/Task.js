var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    task_type: {type: String},
    status: {type: Schema.ObjectId, ref:'Column'},
    Assignee: {type: String},//make this refer to Account schema object in the future?
    Reporter: {type: String},//make this refer to Account schema object in the future?
    created_date: {type: Date, default: Date.now,  required: true},
    updated_date: {type:Date},
    overview: {type: String},
    details: {type: String}
 }
  
);



//Export model
module.exports = mongoose.model('Task', TaskSchema);