const express = require('express');
const {
  registerUser,
  loginUser,
  userProfile,
} = require('../controllers/userController');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
// Mount Routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(verifyToken, userProfile);

module.exports = router;
