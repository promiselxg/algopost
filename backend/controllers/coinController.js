//@desc     get all coins
//@route    GET /api/coins
//@access   Public
const getCoins = (req, res) => {
  res.status(200).json({ message: 'Coin Route' });
};

//@desc     Register new Coin
//@route    POST /api/coins
//@access   Private
const registerCoin = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add a text field');
  }
  res.status(200).json({ message: 'Register Coin Route' });
};

module.exports = {
  getCoins,
  registerCoin,
};
