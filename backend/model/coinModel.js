const mongoose = require('mongoose');

const coinSchema = mongoose.Schema(
  {
    tokenOwner: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    tokenName: {
      type: String,
      required: [true, 'Please enter a token name'],
      unique: true,
    },
    tokenSymbol: {
      type: String,
      required: [true, 'Please enter a token symbol'],
      unique: true,
    },
    tokenNetwork: {
      type: String,
      required: [true, 'Please provide a token network'],
      enum: ['Binance', 'Ethereum', 'Polygon', 'Tron', 'Solana'],
    },
    tokenContractAddress: {
      type: String,
      required: [true, 'Please enter your contract address'],
      unique: true,
    },
    tokenDescription: {
      type: Array,
      required: [true, 'Please enter a discription'],
    },
    tokenLogo: {
      type: String,
      required: [true, 'Please enter an address to your token logo'],
    },
    chartUrl: {
      type: String,
      default: '',
    },
    swapUrl: {
      type: String,
      default: '',
    },
    telegramUrl: {
      type: String,
      default: '',
    },
    twitterUrl: {
      type: String,
      default: '',
    },
    discordUrl: {
      type: String,
      default: '',
    },
    websiteUrl: {
      type: String,
      default: '',
    },
    tokenLaunchDate: {
      type: Date,
      default: '',
    },
    approved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Coin', coinSchema);
