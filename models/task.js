var mongoose = require('mongoose');

// Defines a Schema for the Task-Model
var taskSchema = mongoose.Schema({

  local : {
    user: String,
	  name: String,
    date: { type: Date, default: Date.now },
    time: String,
	  place: String,
	  text: String,
  }
});


module.exports = mongoose.model('task', taskSchema);
