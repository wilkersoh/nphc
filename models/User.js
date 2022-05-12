const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [ true, 'Please add a user id' ],
      unique: true
    },
    login: {
      type: String,
      required: [ true, 'Please add a login value'],
      unique: true
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
  { timestamps: true }
)

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
