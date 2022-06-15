const mongoose = require('mongoose');

const voteSchema = mongoose.Schema(
  {
    token_name: {
      type: String,
      required: [true, 'Token Name is required'],
      trim: true,
    },
    token_supply: {
      type: Number,
      required: [true, 'Token Supply is required'],
      trim: true,
    },
    token_asa: {
      type: String,
      required: [true, 'Token ASA is required'],
    },
    website: {
      type: String,
      required: [true, 'Token Website is required'],
      trim: true,
    },
    token_logo: {
      type: String,
      required: [true, 'Token Logo is required'],
    },
    image_id: {
      type: String,
      required: true,
    },
    listing_date: {
      type: Date,
      required: [true, 'Token Listing Date is required'],
      trim: true,
    },
    listed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WaitingList', voteSchema);
