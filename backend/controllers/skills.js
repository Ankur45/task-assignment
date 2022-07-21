const SkillSchema = require('../model/skillsRating');
const User = require('../model/userAuth');
const mongoose = require('mongoose');

class Skill {
  async addSkill(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });

      if (authenticateUser != 0) {
        let addSkill = new SkillSchema({
          _id: new mongoose.Types.ObjectId(),
          userId: req.body.userId,
          skillName: req.body.skill,
          rating: req.body.rating,
          created_at: new Date().getTime(),
        });

        await addSkill.save();

        res.status(201).json({
          success: 1,
          message: 'Skill successfully added',
          data: addSkill,
        });
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

  async getSkill(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });
      if (authenticateUser != 0) {
        let getTheSkill = await SkillSchema.find({
          userId: req.body.userId,
        });

        if (getTheSkill == 0) {
          res.status(200).json({
            success: 1,
            message: 'Skills Of User',
            data: [],
          });
        } else if (getTheSkill != 0) {
          res.status(200).json({
            success: 1,
            message: 'Skills Of User',
            data: getTheSkill,
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

module.exports = Skill;
