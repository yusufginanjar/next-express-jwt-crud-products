const express = require('express');

const router = express();
const apiController = require('../controllers/authController');

// Login Page
router.post('/login', apiController.login);
router.post('/register', apiController.register);
router.delete('/logout', apiController.logout);

module.exports = router; 
