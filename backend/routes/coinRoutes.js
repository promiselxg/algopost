const express = require("express");
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
  deleteCoinListing,
  updateCoinListing,
  tokenVerification,
  getCoin,
  getBookmark,
  getCoinReview,
  addRate,
  getCoinRating,
  getUserRatings,
  getvotes24,
} = require("../controllers/coinController");
const { verifyToken } = require("../middleware/authMiddleware");
const { verifyUserRoles } = require("../middleware/roleMiddleware");
const Role = require("../utils/roles");
const { queryFilter } = require("../middleware/queryMiddleware");
const Coin = require("../models/coinModel");
const WaitingList = require("../models/waitingListModel");
const { uploadFile } = require("../middleware/uploadMiddleware");
const router = express.Router();

// Mount Routes
router.route("/").get(queryFilter(Coin), getCoins);
router.route("/getCoin").get(getCoin);
router.route("/verfication").post(tokenVerification);
router
  .route("/waitlist")
  .post(
    verifyToken,
    verifyUserRoles(Role.admin),
    uploadFile.single("file"),
    upcomingCoinListing
  )
  .get(queryFilter(WaitingList), getAllUpcomingCoin);
router
  .route("/waitlist/:id")
  .delete(verifyToken, verifyUserRoles(Role.admin), deleteCoinListing)
  .put(verifyToken, verifyUserRoles(Role.admin), updateCoinListing);
router.route("/votes").get(getDailyVotes);
router
  .route("/status")
  .get(verifyToken, verifyUserRoles(Role.admin), activeCoin);
//  Register Token
router
  .route("/new")
  .post(
    verifyToken,
    verifyUserRoles(Role.user, Role.admin),
    uploadFile.single("file"),
    registerCoin
  );
router
  .route("/approve/:id")
  .put(verifyToken, verifyUserRoles(Role.admin), approveCoin);

router
  .route("/:id/vote")
  .put(verifyToken, verifyUserRoles(Role.user), voteCoin)
  .get(verifyToken, verifyUserRoles(Role.user), myVotedCoins);

router
  .route("/:id")
  .get(verifyToken, verifyUserRoles(Role.user), myCoins)
  .put(verifyToken, verifyUserRoles(Role.user, Role.admin), updateCoin)
  .delete(verifyToken, verifyUserRoles(Role.admin, Role.user), deleteCoin);
//  Bookmark token
router
  .route("/:id/bookmark")
  .post(verifyToken, verifyUserRoles(Role.user), bookMarkCoin)
  .get(verifyToken, verifyUserRoles(Role.user), getBookmark);
//  Review
router
  .route("/:id/review")
  .post(verifyToken, verifyUserRoles(Role.user), addCoinReview)
  .get(getCoinReview);
//  Rating
router
  .route("/:id/ratings")
  .get(getCoinRating)
  .post(verifyToken, verifyUserRoles(Role.user), addRate);
//get user ratings
router
  .route("/:id/userrating")
  .get(verifyToken, verifyUserRoles(Role.user), getUserRatings);

//get 24hrs votes
router.route("/:id/votes24").get(getvotes24);

module.exports = router;
