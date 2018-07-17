var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ColumnSchema = new Schema(
  {
    name: {type: String, required: true}
 }
  
);


//Export model
module.exports = mongoose.model('Column', ColumnSchema);