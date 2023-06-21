const mongoose = require("mongoose");

const coinSchema = mongoose.Schema(
  {
    token_owner: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
    },
    token_name: {
      type: String,
      required: [true, "Please enter a token name"],
      unique: true,
      trim: true,
    },
    token_asa: {
      type: String,
      required: [true, "Please provide the ASA for this token"],
      unique: true,
    },
    token_symbol: {
      type: String,
      required: [true, "Please enter a token symbol"],
      unique: true,
      trim: true,
    },
    token_network: {
      type: String,
      required: [true, "Please provide a token network"],
      trim: true,
    },
    token_contract_address: {
      type: String,
      required: [true, "Please enter your contract address"],
      unique: true,
      trim: true,
    },
    token_description: {
      type: String,
      trim: true,
      required: [true, "Please enter a discription"],
    },
    token_role: {
      type: String,
    },
    token_categories: {
      type: [String],
    },
    token_partnerships: {
      type: [String],
    },
    token_type: {
      type: String,
    },
    token_logo: {
      type: [String],
      trim: true,
      required: [true, "Please enter an address to your token logo"],
    },
    image_id: {
      type: [String],
      required: [true, "Image ID Missing"],
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    token_stage: {
      type: Boolean,
      default: false,
    },
    token_chart_url: {
      type: String,
      default: "",
      trim: true,
    },
    token_swap_url: {
      type: String,
      default: "",
      trim: true,
    },
    token_website_url: {
      type: String,
      default: "",
      trim: true,
    },
    token_launch_date: {
      type: String,
      default: "",
      trim: true,
    },
    token_telegram_url: {
      type: String,
      default: "",
      trim: true,
    },
    token_twitter_url: {
      type: String,
      default: "",
      trim: true,
    },
    token_discord_url: {
      type: String,
      default: "",
      trim: true,
    },
    vote: {
      type: Number,
      default: 0,
    },
    token_status: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Coin", coinSchema);
