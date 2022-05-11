const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [ true, 'Please add a user id' ],
      unique: true
    },
    login: {
      type: Boolean,
    },
    name: {
      type: String,
      required: [ true, 'Please add a title' ],
      unique: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: [ true, 'Please add a salary'],
    }
  },
)

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
