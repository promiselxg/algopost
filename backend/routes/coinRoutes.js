const express = require('express');
const { getCoins, registerCoin } = require('../controllers/coinController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Mount Routes
router.route('/').get(getCoins);
router.route('/new').post(protect, registerCoin);

module.exports = router;
