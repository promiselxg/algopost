const mongoose = require('mongoose');

const tokenVerificationSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token_asa: {
      type: String,
      required: true,
    },
    creators_address: {
      type: String,
      required: true,
    },
    transaction: {
      type: Number,
      required: true,
    },
    creators_token_id: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('TokenVerification', tokenVerificationSchema);
