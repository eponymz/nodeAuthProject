var mongoose = require('mongoose');
const keys = require('../config/dev');

mongoose.connect(keys.mongoURI);

//mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
  username: {
    type: String,
    index: true
  },
  password: {
    type: String
  },
  email: {
    type: String
  },
  name: {
    type: String
  },
  profileImage: {
    type: String
  }
});

var User = (module.exports = mongoose.model('User', UserSchema));

module.exports.createUser = function(newUser, callback) {
  newUser.save(callback);
};
