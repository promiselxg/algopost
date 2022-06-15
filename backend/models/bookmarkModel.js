const mongoose = require('mongoose');

const bookmarkSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    token_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Coin',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Bookmark', bookmarkSchema);
