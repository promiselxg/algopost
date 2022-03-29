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
  getApprovedCoins,
} = require('../controllers/coinController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Mount Routes
router.route('/').get(getCoins);
router.route('/approved').get(getApprovedCoins);
router.route('/new').post(verifyToken, registerCoin);
router.route('/approve/:id').put(verifyToken, approveCoin);
router
  .route('/:id/vote')
  .put(verifyToken, voteCoin)
  .get(verifyToken, myVotedCoins);
router
  .route('/:id')
  .get(verifyToken, myCoins)
  .put(verifyToken, updateCoin)
  .delete(verifyToken, deleteCoin);

module.exports = router;
