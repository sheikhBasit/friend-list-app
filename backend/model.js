const mongoose = require('mongoose');

// Define the Friend schema
const friendSchema = new mongoose.Schema({
  name: String,
  email: String,
    age: Number,
    password: String
});

// Create and export the Friend model
const Friend = mongoose.model('Friend', friendSchema);

module.exports = Friend;
