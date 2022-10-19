const asyncHandler = require("express-async-handler");
const { cloudinary } = require("../utils/cloudinary");
const Coin = require("../models/coinModel");
const WaitingList = require("../models/waitingListModel");
const TokenVerification = require("../models/tokenVerificationModel");
const Vote = require("../models/voteModel");
const User = require("../models/userModel");
const Review = require("../models/reviewModel");
const Bookmark = require("../models/bookmarkModel");
const ROLES = require("../utils/roles");
const Rating = require("../models/ratingModel");
const axios = require("axios");

function isToday(date) {
  const today = new Date();
  const refinedDate = new Date(date);
  // 👇️ Today's date
  console.log(today);
  const itIsToday =
    today.getFullYear === refinedDate.getFullYear &&
    today.getMonth === refinedDate.getMonth &&
    today.getDate() === refinedDate.getDate();
  console.log({ itIsToday });
  return itIsToday;
}

//@desc     Get all coins
//@route    GET /api/coins
//@access   Public
const getCoins = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});
//@desc     Get all 24hrs vote
//@route    GET /:id/votes24
//@access   Public
const getvotes24 = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log({ id });
  if (!id) return res.status(400).send("Kindly provide a valid token asa.");
  try {
    const start = new Date().toDateString();
    const votes24hrs = await Vote.find({
      token_id: id,
      updatedAt: { $gte: start },
    });
    res.status(200).json({ votesCount: votes24hrs.length });
  } catch (e) {
    console.log(e.message);
    return res.status(401).send("An error occured");
  }
});
//@desc     Get a particular coin info
//@route    GET /api/coins/getCoin?token=token_asa
//@access   Public
const getCoin = asyncHandler(async (req, res) => {
  try {
    const partiCularToken = await Coin.find({ token_asa: req.query.token });
    // const bookMarkSearch = await Bookmark.findOne({
    //   user_id: req.user.id,
    //   token_id: partiCularToken[0]._id,
    // });
    res.status(200).json(partiCularToken);
  } catch (e) {
    res.status(400).send("Token not found!.");
  }
});

//@desc     Get all coins for logged user or get user bookmarked token
//@route    GET /api/coins/:id or /api/coins/:id?bookmarked=true
//@access   Private
const myCoins = asyncHandler(async (req, res) => {
  //  get login user id
  const { id } = req.params;
  const query = req.query.bookmarked;
  //  check if ID param === logged in user
  if (id != req.user.id) {
    res.status(401);
    throw new Error("Access Denied");
  }
  //  fetch logged user data
  try {
    // if ?bookmarked=true query string is included
    if (query && query.toString().toLowerCase() === "true") {
      const bookmarkedCoin = await Bookmark.find({ user_id: id })
        .sort({ _id: -1 })
        .select("-__v");
      return res.status(200).json({
        success: true,
        count: bookmarkedCoin.length,
        data: bookmarkedCoin,
      });
    } else {
      const coin = await Coin.find({ token_owner: id }).sort({ _id: -1 });

      res.status(200).json({
        status: true,
        count: coin.length,
        data: coin,
      });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Get voted token for logged in user.
//@route    GET /api/coins/:id/vote
//@access   Private
const myVotedCoins = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    try {
      //  check if user ID exits
      const userExist = await User.findById(id);
      if (userExist) {
        try {
          //  check coin collection to see if user has a voted coin
          const coinCheck = await Vote.find(
            { user_id: req.user.id },
            { token_id: 1, _id: 0 }
          );
          return res.status(200).json({
            count: coinCheck.length,
            data: coinCheck,
          });
        } catch (error) {
          res.status(404);
          throw new Error(error);
        }
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
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
    if (!token) {
      res.status(404);
      throw new Error("Token not found.");
    }
    //  check if logged in user is the owner of this account or if the logged in user is an Admin
    if (req.user.id == token.token_owner || req.user.isAdmin) {
      const updatedCoin = await Coin.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedCoin);
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

//@desc     Upvote Coin
//@route    PUT /api/coins/:id/vote
//@access   Private
const voteCoin = asyncHandler(async (req, res) => {
  //  get token id
  const { id } = req.params;
  const { reapchaId } = req.body;
  // console.log({ reapchaId });
  try {
    //  check if token exist
    const resep = await axios.get(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SECRET_KEY}&response=${reapchaId}`
    );
    console.log({ captchadata: resep.data });
    if (!resep.data.success) {
      res.status(400);
      throw new Error("Captcha Verification failed.");
    }
    const token = await Coin.findById(id);
    if (!token) {
      res.status(404);
      throw new Error("Coin ID not found.");
    }
    //  check if token is approved
    if (!token.isApproved) {
      res.status(400);
      throw new Error(`token not yet available for voting.`);
    }
    // check Vote DB to see if this user has already voted for this coin
    const voteCheck = await Vote.findOne({
      token_id: id,
      user_id: req.user.id,
    });
    // if (isToday(new Date(voteCheck.updatedAt))) return res.

    // upvote token
    const voteToken = await Coin.findByIdAndUpdate(id, {
      vote: token.vote + 1,
    });
    if (voteCheck) {
      if (isToday(voteCheck.updatedAt)) {
        res.status(401);
        throw new Error("You not vote twice within a day");
        return;
      }
      const updatevote = await Vote.findByIdAndUpdate(voteCheck._id, {
        user_id: req.user.id,
        token_id: id,
      });
      if (voteToken && updatevote) {
        return res
          .status(200)
          .json({ status: true, message: "vote successfull." });
      }
    }
    if (!voteCheck) {
      //  create vote reference on voteDB
      const voteRef = await Vote.create({ user_id: req.user.id, token_id: id });
      //  check if
      if (voteToken && voteRef) {
        return res
          .status(200)
          .json({ status: true, message: "vote successfull." });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400);
    throw new Error(error);
  }
});
//@desc     Approve Coin
//@route    PUT /api/coins/approve/:id
//@access   Private/Admin
const approveCoin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    // if (req.user.role[1] === ROLES.admin) {
    //  get the token from DB
    const token = await Coin.findById(id);
    //  check if token is already approved
    if (token.isApproved == true) {
      res.status(401);
      throw new Error("Token already approved");
    } else {
      const approveCoin = await Coin.findByIdAndUpdate(
        id,
        {
          $set: { isApproved: req.body.isApproved },
        },
        { new: true }
      );

      return res.status(200).json({ id, approved: approveCoin.isApproved });
    }
    // } else {
    //   res.status(401);
    //   throw new Error(
    //     `Access Denied, you are not authorized to perform this action.`
    //   );
    // }
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
  //  check if coin exist
  if (id) {
    try {
      //  get coin details from DB
      const token = await Coin.findById(id);
      if (!token) {
        res.status(404);
        throw new Error("Token not found.");
      }
      //  check if logged in user is the owner of this token or if logged in user is Admin
      if (
        req.user.id == token.token_owner ||
        req.user.role[1] === ROLES.admin
      ) {
        if (await Coin.findByIdAndDelete(id)) {
          return res.status(200).json({ status: true, id });
        } else {
          res.status(400);
          throw new Error(`Error occured, unable to remove token ${id}`);
        }
      } else {
        res.status(401);
        throw new Error(
          `Access Denied, you are not authorized to perform this action.`
        );
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } else {
    res.status(400);
    throw new Error(`Access Denied`);
  }
});

//@desc     Register new Coin
//@route    POST /api/coins/new
//@access   Private
const registerCoin = asyncHandler(async (req, res) => {
  //  check if user making this submission is the logged in user
  // const photos = req.body.photos;
  // const  inputForm  = req.body;
  // console.log(JSON.parse(req.body))
  // console.log(req.body)
  // return false;
  const {
    token_name,
    token_symbol,
    token_network,
    token_asa,
    token_stage,
    token_contract_address,
    token_description,
    token_launch_date,
    token_chart_url,
    token_swap_url,
    token_website_url,
    token_telegram_url,
    token_twitter_url,
    token_discord_url,
    photos,
    token_role,
    token_categories,
    token_partnerships,
    token_type,
  } = req.body;

  try {
    //  validate incoming variable
    console.log({
      token_name,
      token_symbol,
      token_network,
      token_asa,
      token_launch_date,
      token_website_url,
      token_contract_address,
      token_description,
    });
    if (
      !token_name ||
      !token_symbol ||
      !token_network ||
      !token_asa ||
      !token_contract_address ||
      !token_description ||
      !token_launch_date ||
      !token_website_url
    ) {
      res.status(400);
      throw new Error("Please fill out the required fields.");
    }
    // //  check if image is > 1MB
    // if (req.file.size > process.env.IMAGE_MAX_SIZE) {
    //   res.status(400);
    //   throw new Error('Selected Image Must be less than 1MB.');
    // }
    //  check if token name already exist
    const checkTokenName = await Coin.findOne({
      $or: [
        { token_name },
        { token_symbol },
        { token_contract_address },
        { token_asa },
      ],
    });
    if (checkTokenName) {
      res.status(400);
      throw new Error(
        "token name or token symbol or token contract address already exist."
      );
    } else {
      //  Submit new token
      // let secure_url;
      // let public_id
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        photos,
        {
          upload_preset: "token",
        }
      );
      console.log({ secure_url, public_id });
      // console.log(secure_url + ' ' + public_id);
      // return false;
      // let secure_url = 'spaknlas,nc askln,cd'
      // let public_id = 'akshajsnansja'

      const coin = await Coin.create({
        token_name,
        token_owner: req.user.id,
        token_asa,
        token_symbol,
        token_network,
        token_contract_address,
        token_description,
        token_logo: [secure_url],
        image_id: [public_id],
        token_stage,
        token_chart_url,
        token_swap_url,
        token_website_url,
        token_launch_date,
        token_telegram_url,
        token_twitter_url,
        token_discord_url,
        token_role,
        token_categories,
        token_partnerships,
        token_type,
      });
      //  Return User Record
      if (coin) {
        return res.status(201).json({
          status: true,
          message: "Token Submitted Successfully",
        });
        //  send email
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Bookmark a token
//@route    POST /api/coins/:id/bookmark
//@access   Private
const bookMarkCoin = asyncHandler(async (req, res) => {
  //  get requested token id
  const { id } = req.params;
  try {
    if (!id) {
      res.status(400);
      throw new Error("Requested asset does not exist.");
    }
    //  check DB to see if id exist
    const coinExist = await Coin.findById(id);
    if (!coinExist) {
      res.status(400);
      throw new Error("Requested asset does not exist.");
    }
    //  bookmark coin
    if (
      await Bookmark.findOne({
        user_id: req.user.id,
        token_id: id,
      })
    ) {
      await Bookmark.findOneAndDelete({
        user_id: req.user.id,
        token_id: id,
      });
      return res
        .status(200)
        .json({ status: true, message: "Bookmark successfully removed" });
    } else {
      await Bookmark.create({
        user_id: req.user.id,
        token_id: id,
      });
      res.status(200).json({ status: true, message: "Bookmark successfully" });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//@desc     Get a token book mark status
//@route    GET /api/coins/:id/bookmark
//@access   Private
const getBookmark = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (
    await Bookmark.findOne({
      user_id: req.user.id,
      token_id: id,
    })
  ) {
    res.status(200).json({ bookmark: true });
  } else {
    res.status(400).send("Bookmark not found");
  }
});

//@desc     Get active/not approved token
//@route    GET /api/coins/status?active=true or false
//@access   Private
const activeCoin = asyncHandler(async (req, res) => {
  const query = req.query.active;
  try {
    if (query) {
      const data = await Coin.find({ isApproved: query });
      if (data) {
        res.status(200).json({ status: true, count: data.length, data });
      }
    } else {
      res.status(401);
      throw new Error("Access Denied");
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

//@desc     Add Review/Comment
//@route    POST /api/coins/:id/review
//@access   Private
const addCoinReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { review, rating } = req.body;
  console.log({ review, rating });
  try {
    if (!id || !review) {
      res.status(401);
      throw new Error("Invalid Request.");
    } else {
      //  check if ID exist in DB
      const tokenExist = await Coin.findById(id);
      if (tokenExist) {
        const data = await Review.create({
          user_id: req.user.id,
          token_id: id,
          review,
          rating,
        });
        if (data) {
          res.status(201).json({
            status: true,
            data: {
              token_id: data.token_id,
              review: data.review,
              rating: data.rating,
            },
          });
        }
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Add Review/Comment
//@route    GET /api/coins/:id/review
//@access   Pubic
const getCoinReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).send("An error occured");
  }
  try {
    const reviews = await Review.find({ token_id: id }).populate("user_id");
    // console.log({ reviews: reviews[0]?.user_id });
    // console.log({ reviews });
    return res.status(200).json(reviews.reverse());
  } catch (e) {
    return res.status(200).json([]);
  }
});

//@desc     Get All Votes By Date
//@route    GET /api/votes?date=2022-06-15
//@access   Public
const getDailyVotes = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) {
    res.status(400);
    throw new Error("Missing Date String.");
  }
  const tomorrow = new Date(date);
  tomorrow.setDate(tomorrow.getDate() + 1);

  try {
    const votes = await Coin.find({
      updatedAt: {
        $gte: new Date(date),
        $lt: new Date(tomorrow),
      },
    }).select("token_owner token_name, token_asa token_symbol token_logo");
    res.status(200).json({
      status: true,
      data: votes,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Add to token to waiting list
//@route    POST /api/coins/waitlist
//@access   Private
const upcomingCoinListing = asyncHandler(async (req, res) => {
  if (req.file.filename.toString() !== "") {
    const { token_name, token_supply, token_url, listing_date, token_asa } =
      req.body;
    if (
      !token_name ||
      !token_supply ||
      !token_url ||
      !listing_date ||
      !token_asa
    ) {
      return res
        .status(401)
        .json({ status: false, message: "fill out the required fields." });
    }
    try {
      //  check if token already exist in waiting list
      const tokenExist = await WaitingList.findOne({
        token_name: token_name,
        token_supply: token_supply,
        token_asa: token_asa,
        listed: false,
      });
      if (tokenExist) {
        res.status(401);
        throw new Error("Token already in waiting list.");
      }
      //  upload image to cloudinary
      const fileStr = req.file.path;
      const uploadImageResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: "token",
      });
      if (!uploadImageResponse) {
        res.status(400);
        throw new Error("Image upload failed.");
      }
      //  add token to waiting list
      const data = await WaitingList.create({
        token_name,
        token_supply,
        token_asa,
        website: token_url,
        token_logo: uploadImageResponse.secure_url,
        image_id: uploadImageResponse.public_id.split("/")[1],
        listing_date,
      });
      if (data) {
        return res.status(201).json({
          status: true,
          message: "Token successfully added to the waiting list.",
        });
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  }
});

//@desc     Add to token to waiting list
//@route    GET /api/coins/waitlist
//@access   Public
const getAllUpcomingCoin = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
  // try {
  //   const response = await WaitingList.find().sort({ _id: -1 });
  //   return res.status(200).json({
  //     status: true,
  //     data: response,
  //   });
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error);
  // }
});

//@desc     Remove Coin from waiting list
//@route    DELETE /api/coins/waitlist/:id
//@access   Private
const deleteCoinListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    //  get coin details from DB
    const token = await WaitingList.findById(id);
    if (!token) {
      res.status(404);
      throw new Error("Token not found.");
    }
    if (await WaitingList.findByIdAndDelete(id)) {
      return res.status(200).json({ status: true, id });
    } else {
      res.status(400);
      throw new Error(
        `Error occured, unable to remove token from waiting list.`
      );
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Update an Upcoming token.
//@route    PUT /api/coins/waitlist/:id
//@access   Private
const updateCoinListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const coinExist = await WaitingList.findById(id);
    if (!coinExist) {
      return res.status(404).json({
        status: false,
        message: "Request ID does not exist.",
      });
    }
    try {
      await WaitingList.findByIdAndUpdate(id, {
        $set: { listed: req.body.listed },
      });
      return res.status(200).json({
        status: true,
        message: "Token Listing Status updated successfully.",
      });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Update an Upcoming token.
//@route    PUT /api/coins/waitlist/:id
//@access   Private
const tokenVerification = asyncHandler(async (req, res) => {
  const {
    email,
    token_asa,
    creators_address,
    transaction,
    creators_token_id,
    isValid,
  } = JSON.parse(req.body);

  if (!email || !token_asa || !creators_address || !creators_token_id) {
    console.log(req.body);
    return res.status(400).json({
      status: false,
      message: `Please fill out the required fields.`,
      data: {
        email,
        token_asa,
        creators_address,
        transaction,
        creators_token_id,
        isValid,
      },
    });
  }
  try {
    //  check if token already exist.
    const tokenExist = await TokenVerification.findOne({
      email: email,
      token_asa: token_asa,
    });
    if (tokenExist) {
      return res.status(400).json({
        status: false,
        message: "Token already submitted for verification",
      });
    }
    const newToken = await TokenVerification.create({
      email,
      token_asa,
      creators_address,
      transaction,
      creators_token_id,
      isValid,
    });
    if (newToken) {
      return res.status(201).json({
        status: true,
        message: "Token successfully submitted for verification.",
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Update an Upcoming token.
//@route    post /:id/ratings
//@access   Private
const addRate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  if (!id) return res.status(400).send("Please provide a valid token id");
  if (!rate) return res.status(400).send("Please provide a valid ratings");
  if (parseInt(rate) > 5) {
    return res.status(400).send("Rating number cannot be greater than 5");
  }
  try {
    if (await Coin.findById(id)) {
      const findUserOldReview = await Rating.findOne({
        user_id: req.user.id,
        token_id: id,
      });
      if (!findUserOldReview) {
        console.log({ rate, type: typeof rate, user: req.user.id });
        const reviewCoin = await Rating.create({
          user_id: req.user.id,
          token_id: id,
          rating: parseInt(rate),
        });
        return res.status(200).send("Token Reviewed");
      } else {
        console.log({ findUserOldReview });
        const updateReview = await Rating.findByIdAndUpdate(
          findUserOldReview._id,
          {
            $set: {
              user_id: req.user.id,
              token_id: id,
              rating: parseInt(rate),
            },
          },
          { new: true }
        );
      }
      return res.status(200).send("Token updated");
    } else {
      return res.status(400).send("Coin does not exist in our database.");
    }
  } catch (e) {
    return res.status(400).send("An error occured.");
  }
});

//@desc     Get a user rating for a token.
//@route    Get /:id/userrating
//@access   Private
const getUserRatings = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Kindly provide a valid token address.");
  try {
    const tokenRatings = await Rating.findOne({
      token_id: id,
      user_id: req.user.id,
    });
    console.log({ tokenRatings });
    if (tokenRatings) {
      return res.status(200).json({ rating: tokenRatings.rating });
    } else {
      return res.status(200).json({ rating: 0 });
    }
  } catch (e) {
    return res.status(400).send("An error occurred.");
  }
});

//@desc     Get all token ratings.
//@route    Get /:id/ratings
//@access   Public
const getCoinRating = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Kindly provide a valid token address.");
  try {
    const allTokenRatings = await Rating.find({ token_id: id });
    if (allTokenRatings.length > 0) {
      const allRates = allTokenRatings.map((v) => v.rating);
      const totalRatings = allRates.reduce((total, token) => total + token);
      const rating = totalRatings / allRates.length;
      console.log({ rating });
      return res.status(200).json({ rating });
    } else {
      console.log({ allTokenRatings });
      return res.status(200).json({ rating: 0 });
    }
  } catch (e) {
    return res.status(400).send("An error occurred.");
  }
});
module.exports = {
  getvotes24,
  getCoinReview,
  getCoinRating,
  getUserRatings,
  addRate,
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
  deleteCoinListing,
  updateCoinListing,
  tokenVerification,
  getCoin,
  getBookmark,
};
