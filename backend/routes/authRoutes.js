const express = require('express');
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  registeredUsers,
  deleteUser,
} = require('../controllers/userController');
const Role = require('../config/roles');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');

// Mount Routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/profile')
  .get(verifyToken, verifyUserRoles(Role.user, Role.admin), userProfile);
router
  .route('/:id/update')
  .put(verifyToken, verifyUserRoles(Role.user, Role.admin), updateProfile);
router
  .route('/users')
  .get(verifyToken, verifyUserRoles(Role.admin), registeredUsers);
router.route('/users/:id').delete(verifyToken, deleteUser);

module.exports = router;
