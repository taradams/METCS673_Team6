var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var Schema = mongoose.Schema;

var AccountSchema = new Schema(
  {
    first_name: {type: String, required: true, max: 100},
    last_name: {type: String, required: true, max: 100},
    email: {type: String, required:true, max: 100},
    username: {type:String, required: true, min:3, max:35},
    password: {type: String, required:true, min: 8, max:24}
  }
);


//authenticate input against database
/*
AccountSchema.statics.authenticate = function (email, password, callback) {
  Account.findOne({ email: email })
    .exec(function (err, account) {
      if (err) {
        return callback(err)
      } else if (!account) {
        var err = new Error('Account not found.');
        err.status = 401;
        return callback(err);
      }else {
        var err1 = new Error('pword');
      bcrypt.compare(password, account.password, function (err1, result) {
        if (result === true) {
          return callback(null, account);
        } else {
          return callback();
        }
      
      })
    }
    });
};


AccountSchema.pre('save', function (next) {
  var account = this;
  bcrypt.hash(account.password, 10, function (err, hash){
    if (err) {
      return next(err);
    }
    account.password = hash;
    next();
  })
});
*/

// Virtual for Account's first name
AccountSchema
.virtual('name')
.get(function () {
  return this.first_name;
});


//Export model

var Account = mongoose.model('Account', AccountSchema);
module.exports = Account;