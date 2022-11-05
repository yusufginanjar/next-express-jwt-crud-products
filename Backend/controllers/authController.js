const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


function format(user) {
  const { id, email } = user
  return {
   id,
   email,
   accessToken : user.generateToken ()
  }}

module.exports = {
 
  login: async (req, res) => {
    try {
      User.authenticate(req.body)
      .then(user => {
      res.json(
      format(user)
      )
      })
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },

  register: async (req, res) => {
    const { email, password, username } = req.body;
    if (!email || !password || !username) return res.status(400).json({ message: 'Please fill all the field' });
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    User.create({
      email,
      password: hash,
      username,
      bio: '',
    }).then((user) => {
      res.json({
        message: 'Register Success',
        data: user,
      });
    }).catch((err) => {
      res.json({
        message: err.message,
      });
    });
  },

  logout: async (req, res) => {
    try {
      res.status(200).json({ message: 'Logout Success' });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
