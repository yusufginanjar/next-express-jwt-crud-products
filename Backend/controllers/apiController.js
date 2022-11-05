const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
 
  
  getUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found!' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        await user.update({
          username: req.body.username,
          email: req.body.email,
          score: req.body.score,
          url: req.body.url,
          bio: req.body.bio,
        });
        res.json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  },

  landingPage: async (req, res) => {
    try {
      res.status(200).json({
        message: 'Test API',
        user: req.user??'No User',
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  
};
