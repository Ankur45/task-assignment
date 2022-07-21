const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: String,
  skillName: String,
  rating: String,
  created_at: String,
  updated_at: String,
});

module.exports = mongoose.model('skill', SkillSchema);
