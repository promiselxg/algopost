const express = require('express');
const {
  getCoins,
  registerCoin,
  myCoins,
  updateCoin,
  deleteCoin,
  approveCoin,
  voteCoin,
  myVotedCoins,
  bookMarkCoin,
  activeCoin,
  addCoinReview,
} = require('../controllers/coinController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const Role = require('../config/roles');
const router = express.Router();

// Mount Routes
router.route('/').get(verifyToken, verifyUserRoles(Role.admin), getCoins);
router
  .route('/status')
  .get(verifyToken, verifyUserRoles(Role.admin), activeCoin);
router
  .route('/new')
  .post(verifyToken, verifyUserRoles(Role.admin), registerCoin);
router
  .route('/approve/:id')
  .put(verifyToken, verifyUserRoles(Role.admin), approveCoin);
router
  .route('/:id/vote')
  .put(verifyToken, verifyUserRoles(Role.user), voteCoin)
  .get(verifyToken, verifyUserRoles(Role.user), myVotedCoins);
router
  .route('/:id')
  .get(verifyToken, verifyUserRoles(Role.user), myCoins)
  .put(verifyToken, verifyUserRoles(Role.user, Role.admin), updateCoin)
  .delete(verifyToken, verifyUserRoles(Role.admin, Role.user), deleteCoin);
router
  .route('/:id/bookmark')
  .post(verifyToken, verifyUserRoles(Role.user), bookMarkCoin);
router
  .route('/:id/review')
  .post(verifyToken, verifyUserRoles(Role.user), addCoinReview);

module.exports = router;
