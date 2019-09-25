const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 5 },
    email: { type: String },
    password: { type: String, required: true, minlength: 8 },
  },
);

module.exports = mongoose.model('User', UserSchema);
