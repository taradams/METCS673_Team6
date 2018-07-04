var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TaskSchema = new Schema(
  {
    task_type: {type: String, required: true},
    status: {type: Schema.ObjectId, ref:'Column'},
    Assignee: {type: Schema.ObjectId, ref: 'Account'},
    Reporter: {type: Schema.ObjectId, ref: 'Account', required:true},
    created_date: {type: Date, default: Date.now,  required: true},
    updated_date: {type:Date},
    overview: {type: String, required: true},
    details: {type: String}
 }
  
);



//Export model
module.exports = mongoose.model('Task', TaskSchema);