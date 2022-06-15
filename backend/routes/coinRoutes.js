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
  getDailyVotes,
  upcomingCoinListing,
  getAllUpcomingCoin,
} = require('../controllers/coinController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const Role = require('../utils/roles');
const { queryFilter } = require('../middleware/queryMiddleware');
const Coin = require('../models/coinModel');
const WaitingList = require('../models/waitingListModel');
const { uploadFile } = require('../middleware/uploadMiddleware');
const router = express.Router();

// Mount Routes
router.route('/').get(queryFilter(Coin), getCoins);
router
  .route('/waitlist')
  .post(
    verifyToken,
    verifyUserRoles(Role.admin),
    uploadFile.single('file'),
    upcomingCoinListing
  )
  .get(queryFilter(WaitingList), getAllUpcomingCoin);
router.route('/votes').get(getDailyVotes);
router
  .route('/status')
  .get(verifyToken, verifyUserRoles(Role.admin), activeCoin);
router
  .route('/new')
  .post(
    verifyToken,
    verifyUserRoles(Role.user, Role.admin),
    uploadFile.single('file'),
    registerCoin
  );
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
