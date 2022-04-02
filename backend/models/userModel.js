const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please enter a username'],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, 'Please enter your First Name'],
      trim: true,
    },
    lastname: {
      type: String,
      default: '',
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please add an email address'],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a Password'],
    },
    role: {
      type: Array,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);
