var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');

// Defines a Schema for the User-Model
var userSchema = mongoose.Schema({

  local : {
    email			: String,
    password	: String,
    name     : String,
    token			: String,
  }
});


// Generates a password-hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checks if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

// Creates a hashed Token
userSchema.methods.generateToken = function(token) {
  return bcrypt.hashSync(token, bcrypt.genSaltSync(8), null);
};

module.exports = mongoose.model('User', userSchema);
