const asyncHandler = require('express-async-handler');
const Coin = require('../models/coinModel');

//@desc     Get all coins
//@route    GET /api/coins
//@access   Public
const getCoins = asyncHandler(async (req, res) => {
  //  get all tokens where isApproved == true
  const token = await Coin.find({ isApproved: true });

  res.status(200).json({
    count: token.length,
    token,
  });
});

//@desc     Get all coins for logged user
//@route    GET /api/coins/:id
//@access   Private
const myCoins = asyncHandler(async (req, res) => {
  //  get login user id
  const { id } = req.params;
  //  check if ID param === logged in user
  if (id != req.user.id) {
    res.status(401);
    throw new Error('Access Denied');
  }
  //  fetch logged user data
  try {
    const coin = await Coin.find({ tokenOwner: id }).sort({ _id: -1 });

    res.status(200).json({
      coin,
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Update Coin
//@route    PUT /api/coins/:id
//@access   Private
const updateCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    //  get the token from DB
    const token = await Coin.findById(id);
    //  check if logged in user is the owner of this account or if the logged in user is an Admin
    if (req.user.id == token.tokenOwner || req.user.isAdmin) {
      const updatedCoin = await Coin.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCoin);
    } else {
      res.status(401);
      throw new Error(
        `Access Denied, you are not authorized to perform this action.`
      );
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Approve Coin
//@route    PUT /api/coins/approve/:id
//@access   Private/Admin
const approveCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.user.isAdmin) {
      //  get the token from DB
      const token = await Coin.findById(id);
      //  check if token is already approved
      if (token.isApproved == true) {
        res.status(401);
        throw new Error('Token already approved');
      } else {
        const approveCoin = await Coin.findByIdAndUpdate(
          id,
          {
            $set: { isApproved: req.body.isApproved },
          },
          { new: true }
        );

        res.status(200).json({ id, approved: approveCoin.isApproved });
      }
    } else {
      res.status(401);
      throw new Error(
        `Access Denied, you are not authorized to perform this action.`
      );
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Delete Coin
//@route    Delete /api/coins/:id
//@access   Private
const deleteCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  res.status(200).json({ msg: `delete coin ${id}` });
});

//@desc     Register new Coin
//@route    POST /api/coins/new
//@access   Private
const registerCoin = asyncHandler(async (req, res) => {
  //  check if user making this submission is the logged inn user

  const {
    token_name,
    token_symbol,
    token_network,
    token_stage,
    token_contract_address,
    token_description,
    token_logo,
    token_launch_date,
    token_chart_url,
    token_swap_url,
    token_website_url,
    token_telegram_url,
    token_twitter_url,
    token_discord_url,
  } = req.body;

  //  validate incoming variable
  if (
    !token_name ||
    !token_symbol ||
    !token_network ||
    !token_contract_address ||
    !token_description ||
    !token_logo ||
    !token_launch_date ||
    !token_website_url
  ) {
    res.status(401);
    throw new Error('Please fill out the required fields.');
  }

  //  check if token name already exist
  const checkTokenName = await Coin.findOne({
    $or: [
      { tokenName: token_name },
      { tokenSymbol: token_symbol },
      { tokenContractAddress: token_contract_address },
    ],
  });
  if (checkTokenName) {
    res.status(401);
    throw new Error(
      `token name or token symbol or token contract address already exist`
    );
  }

  //  Create Token
  try {
    const coin = await Coin.create({
      tokenName: token_name,
      tokenSymbol: token_symbol,
      tokenNetwork: token_network,
      tokenContractAddress: token_contract_address,
      tokenDescription: token_description,
      tokenLogo: token_logo,
      tokenStage: token_stage,
      tokenChartUrl: token_chart_url,
      tokenSwapUrl: token_swap_url,
      tokenTelegramUrl: token_telegram_url,
      tokenTwitterUrl: token_twitter_url,
      tokenDiscordUrl: token_discord_url,
      tokenWebsiteUrl: token_website_url,
      tokenLaunchDate: token_launch_date,
      tokenOwner: req.user.id,
    });
    //  Return User Record
    if (coin) {
      res.status(201).json({
        status: true,
        message: 'Token Submitted Successfully',
      });
      //  send email
    } else {
      res.status(400);
      throw new Error('Unable to register new token.');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getCoins,
  registerCoin,
  myCoins,
  updateCoin,
  deleteCoin,
  approveCoin,
};
