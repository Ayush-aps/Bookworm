// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes for user signup and login (POST requests)
router.post('/signup', userController.signup);
router.post('/login', userController.login);

module.exports = router;
