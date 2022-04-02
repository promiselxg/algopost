const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    token_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Coin',
    },
    review: {
      type: String,
      require: [true, 'This field cannot be left empty.'],
      trim: true,
    },
    rating: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
