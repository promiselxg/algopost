const express = require('express');
const {
  getCoins,
  registerCoin,
  myCoins,
  updateCoin,
  deleteCoin,
  approveCoin,
} = require('../controllers/coinController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Mount Routes
router.route('/').get(getCoins);
router.route('/new').post(protect, registerCoin);
router.route('/approve/:id').put(protect, approveCoin);
router
  .route('/:id')
  .get(protect, myCoins)
  .put(protect, updateCoin)
  .delete(protect, deleteCoin);

module.exports = router;
