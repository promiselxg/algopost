const mongoose = require("mongoose");

const ratingSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    token_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "Coin",
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rating", ratingSchema);
