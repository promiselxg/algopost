const express = require('express');
const {
  registerUser,
  loginUser,
  userProfile,
} = require('../controllers/userController');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
// Mount Routes
router.route('/register').post(registerUser);
router.route('/login').post(protect, loginUser);
router.route('/profile').get(protect, userProfile);

module.exports = router;
