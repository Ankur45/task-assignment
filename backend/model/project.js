const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userId: String,
  projectName: String,
  description: String,
  skillsUse: Array,
  created_at: String,
  updated_at: String,
});

module.exports = mongoose.model('project', ProjectSchema);
