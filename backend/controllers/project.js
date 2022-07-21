const ProjectSchema = require('../model/project');
const User = require('../model/userAuth');
const mongoose = require('mongoose');
const skills = require('../model/skillsRating');

class Project {
  async addNewProject(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });
      if (authenticateUser != 0) {
        let find = await skills.find({
          userId: req.body.userId,
          skillName: req.body.skillsUse,
        });
        if (find == 0) {
          res.status(400).json({
            success: 0,
            message:
              'You didnot have this skill in your Skill section pls Add this first',
          });
        } else if (find != 0) {
          let addProject = new ProjectSchema({
            _id: new mongoose.Types.ObjectId(),
            userId: req.body.userId,
            projectName: req.body.projectName,
            description: req.body.description,
            skillsUse: req.body.skillsUse,
            created_at: new Date().getTime(),
          });
          await addProject.save();

          res.status(201).json({
            success: 1,
            message: 'Project successfully Added',
            data: addProject,
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: 'Authentication Fail',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  }

  async getProject(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });
      if (authenticateUser != 0) {
        let getTheProject = await ProjectSchema.find({
          userId: req.body.userId,
        });
        if (getTheProject == 0) {
          res.status(200).json({
            success: 1,
            message: 'Project List',
            data: [],
          });
        } else if (getTheProject != 0) {
          res.status(200).json({
            success: 1,
            message: 'Project List',
            data: getTheProject,
          });
        }
      } else {
        res.status(400).json({
          success: 0,
          message: 'Authentication Fail',
        });
      }
    } catch (error) {
      res.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  }
}

module.exports = Project;
