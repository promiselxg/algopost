const express = require('express');
const {
  getCoins,
  registerCoin,
  myCoins,
  updateCoin,
  deleteCoin,
  approveCoin,
} = require('../controllers/coinController');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

// Mount Routes
router.route('/').get(getCoins);
router.route('/new').post(verifyToken, registerCoin);
router.route('/approve/:id').put(verifyToken, approveCoin);
router
  .route('/:id')
  .get(verifyToken, myCoins)
  .put(verifyToken, updateCoin)
  .delete(verifyToken, deleteCoin);

module.exports = router;
