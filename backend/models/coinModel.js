const mongoose = require('mongoose');

const coinSchema = mongoose.Schema(
  {
    tokenOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
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
      type: String,
      required: [true, 'Please enter a discription'],
    },
    tokenLogo: {
      type: String,
      required: [true, 'Please enter an address to your token logo'],
    },
    tokenStage: {
      type: Boolean,
      default: false,
    },
    tokenChartUrl: {
      type: String,
      default: '',
    },
    tokenSwapUrl: {
      type: String,
      default: '',
    },
    tokenTelegramUrl: {
      type: String,
      default: '',
    },
    tokenTwitterUrl: {
      type: String,
      default: '',
    },
    tokenDiscordUrl: {
      type: String,
      default: '',
    },
    tokenWebsiteUrl: {
      type: String,
      default: '',
    },
    tokenLaunchDate: {
      type: String,
      default: '',
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Coin', coinSchema);
