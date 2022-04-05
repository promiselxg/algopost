const mongoose = require('mongoose');

const adSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    url: {
      type: String,
      default: '',
    },
    image_url: {
      type: String,
      required: [true, 'Please select an Image'],
    },
    image_id: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Ad', adSchema);
