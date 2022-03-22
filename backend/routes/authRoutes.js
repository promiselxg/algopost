const express = require('express');
const { registerUser } = require('../controllers/userController');
const router = express.Router();

// Mount Routes
router.route('/register').post(registerUser);

module.exports = router;
