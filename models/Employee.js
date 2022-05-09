const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
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
})

module.exports = mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
