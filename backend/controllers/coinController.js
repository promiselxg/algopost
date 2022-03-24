const asyncHandler = require('express-async-handler');
const Coin = require('../models/coinModel');
//@desc     get all coins
//@route    GET /api/coins
//@access   Public
const getCoins = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Coin Route' });
});

//@desc     Register new Coin
//@route    POST /api/coins
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
        _id: coin.id,
        token: coin.tokenName,
        launch_date: coin.tokenLaunchDate,
        description: coin.tokenDescription,
        status: coin.isApproved,
        token_owner: coin.tokenOwner,
        tokenInfo: {
          symbol: coin.tokenSymbol,
          network: coin.tokenNetwork,
          contract_address: coin.tokenContractAddress,
          stage: coin.tokenStage,
          logo: coin.tokenLogo,
        },
        metadata: {
          swap_url: coin.tokenSwapUrl,
          website_url: coin.tokenWebsiteUrl,
          chart_url: coin.tokenChartUrl,
          telegram_url: coin.tokenTelegramUrl,
          twitter_url: coin.tokenTwitterUrl,
          discord_url: coin.tokenDiscordUrl,
        },
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
};
