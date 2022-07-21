const User = require('../model/userAuth');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

class Users {
  async createUser(req, res) {
    try {
      //generate new password
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // check if user already exist
      // Validate if admin exist in our database

      if (req.body.password != req.body.confirmPassword) {
        return res.status(401).json({
          success: 0,
          message: 'Password and conform password didnot match',
        });
      }
      const oldUser = await User.findOne({email: req.body.email});

      if (oldUser) {
        return res.status(409).send('User Already Exist. Please Login');
      }

      //create new user
      let user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: req.body.confirmPassword,
        created_at: new Date().getTime(),
      });
      //save udmin and response
      await user.save();

      res.status(200).json({
        success: 1,
        message: 'SignUp Successfully',
        data: user,
      });
    } catch (err) {
      res.status(400).json({
        success: 0,
        message: err.message,
      });
    }
  }

  async signinUser(req, res) {
    try {
      let user = await User.findOne({email: req.body.email});
      if (!user) {
        return res.status(400).send({
          success: 0,
          message: 'User doesnot exist',
        });
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        return res.status(400).send({
          success: 0,
          message: 'Invalid password',
          result: {},
        });
      }

      let token = jwt.sign({id: user._id}, process.env.accessTokenSecret, {
        expiresIn: '12h',
      });

      let update = await User.findOneAndUpdate({_id: user._id}, {token: token});

      return res.status(200).send({
        success: 1,
        data: {
          message: 'User signed-in succesfully',
          userId: user._id,
          token: token,
        },
      });
    } catch (err) {
      return res.status(500).send({
        success: 0,
        message: err.message,
        result: {},
      });
    }
  }

  async updateData(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });

      if (authenticateUser != 0) {
        let update = await User.findByIdAndUpdate(authenticateUser[0]._id, {
          $set: req.body,
        });

        res.status(201).json({
          success: 1,
          message: 'updated successfully',
        });
      } else {
        res.status(400).json({
          success: 0,
          message: 'Authentication Fail',
        });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: 0,
        message: error.message,
      });
    }
  }
  async getUserDetail(req, res) {
    try {
      let authenticateUser = await User.find({
        _id: req.body.userId,
        token: req.body.token,
      });

      if (authenticateUser != 0) {
        res.status(200).json({
          success: 1,
          message: 'User Detail',
          data: authenticateUser,
        });
      } else {
        res.status(400).json({
          success: 0,
          message: 'Authentication Fail',
        });
      }
    } catch (error) {
      res.status(400).json({
        success: 0,
        message: error.message,
      });
    }
  }

  async logoutUser(req, res) {
    try {
      let logout = await User.findOneAndUpdate(
        {userId: req.body.userId},
        {
          token: '',
        }
      );

      res.status(201).json({
        success: 1,
        message: 'Successffuly logout',
      });
    } catch (error) {
      res.status(400).json({
        success: 0,
        message: error.message,
      });
    }
  }
}
module.exports = Users;
