const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, 'firstName is required'],
    min: 3,
    max: 50,
  },
  token: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    max: 50,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    min: 8,
  },
  contact: Number,
  aboutMe: String,
  confirmPassword: String,

  created_at: String,
  updated_at: String,
});

module.exports = mongoose.model('Admin', AdminSchema);
