const express = require('express');
const { getCoins, registerCoin } = require('../controllers/coinController');
const router = express.Router();

// Mount Routes
router.route('/').get(getCoins).post(registerCoin);

module.exports = router;
